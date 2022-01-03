$(document).ready(function () {
    if ($("#rfqdate_div").length) {
        $('#rfqdate_div').datetimepicker({
            format: 'DD-MM-YYYY',
            //minDate: new Date()
        });
    }
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
    if ($("#ActivationDate_div").length) {
        $('#ActivationDate_div').datetimepicker({
            format: 'DD-MM-YYYY',
            minDate: new Date()
        });
    }
$("#contractItemTableId").on("click", '.matlLongTextClass', function() {
        $("#matlLongTextModal").modal("show");
        var longtext = $(this).parent().children().eq(1).val();
        $('div.longtext').text(longtext);
    });
    $("#queryconlinemodaltn").click(function () {
//alert("inside");
        var reason = $("#queryreasoncontract").val();
        //alert(reason);
        var queryto = $("#queryraisedtocontract").val();
        var queryEmail = $("#querymailaddresscontract").val();
        alert(queryEmail);
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
            callback: function (lobibox, type) {
                console.log("type: " + type);
                if (type === 'yes')
                {
                    console.log("ok");
                    $("#querycontractmodal").modal("hide");
                    $("#overlay").css("display", "block");
                    $("#querycontractform").submit();
                } else if (type === 'no')
                {
                    console.log("no");
                }
            }
        });


// $("#rejectprform").submit();
    });
    $("#uploadSignedContractCopyBtn").click(function () {
        $("#uploadSignedContractCopyModal").modal("show");
    });
    $("#uploaddocumentContractModalBtn").click(function () {
        //  alert($("input[name='file_docDiv1']").val());
//        $("#overlay").css("display", "block");
//        event.preventDefault();
        if ($("input[name='file_docDiv1']").val().trim() == "") {
            // $("#uploadSignedContractCopyModal").modal("hide");
            Lobibox.alert("error",
                    {
                        msg: "Please add Signed Contract Copy!"

                    });
            return false;
        }

        if ($("input[name='file_docDiv2']").val().trim() == "") {
            alert("inside");
            // $("#uploadSignedContractCopyModal").modal("hide");
            Lobibox.alert("error",
                    {
                        msg: "Please add Workman Compensation Insurance Policy Copy!"

                    });
            return false;
        }

        if ($("input[name='file_docDiv3']").val().trim() == "") {
            alert("inside");
            // $("#uploadSignedContractCopyModal").modal("hide");
            Lobibox.alert("error",
                    {
                        msg: "Please add Public Liability Copy!"

                    });
            return false;
        }
        if ($("input[name='file_docDiv5']").val().trim() == "") {
            alert("inside");
            // $("#uploadSignedContractCopyModal").modal("hide");
            Lobibox.alert("error",
                    {
                        msg: "Please add BizSafe Level Cerificate Copy!"

                    });
            return false;
        }
        if ($("input[name='file_docDiv6']").val().trim() == "") {
            alert("inside");
            // $("#uploadSignedContractCopyModal").modal("hide");
            Lobibox.alert("error",
                    {
                        msg: "Please add Risk Assessment of Job Copy!"

                    });
            return false;
        }
        $("#uploadSignedContractCopyModal").modal("hide");
//        if ($("input[name='file_docDiv2']").val().trim() !== "") {
//            $("#uploadSignedContractCopyModal").modal("hide");
//        }
//        else
//        {
//            Lobibox.alert("error",
//                    {
//                        msg: "Please add Signed Contract Copy!"
//
//                    });
//            return false;
//        }

    });
    $("#createcontractform").submit(function (e) {

        e.preventDefault();

        var FieldsJSONObject = {};
        
        var WebServiceCallIp = $("#WebServiceCallIp").val();
        
        var FieldsJSONArray = [];
        var contractRefId = $('#contractRefId').val();
        //Agreement
        var finalagreementvalue = $('#finalagreementvalue').val();
        var agreementtype = $('#agreementtype').val();
        var agreementdate = $('#agreementdate').val();
        if (agreementdate === '')
        {
            Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please Choose Agreement Date!"
                        //  $('#AgreedPaymentTerms').focus();
            });
            return false;
        }
        var validitystartdate = $('#validitystartdate').val();
        if (validitystartdate === '')
        {
            Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please Choose Validity Start Date!"
                        //  $('#AgreedPaymentTerms').focus();
            });
            return false;
        }
        var validityenddate = $('#validityenddate').val();
        if (validityenddate === '')
        {
            Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please Choose Validity End Date!"
                        //  $('#AgreedPaymentTerms').focus();
            });
            return false;
        }
        var duration = $('#duration').val();
        var currency = $('#currency').val();
        //OLA
        var PurchOrganization = $('#PurchOrganization').val();
        if (PurchOrganization === '')
        {
            Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please Choose PurchOrganization!"
                        //  $('#AgreedPaymentTerms').focus();
            });
            return false;
        }
        var PurchaseGroup = $('#PurchaseGroup').val();
        if (PurchaseGroup === '')
        {
            Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please Choose PurchaseGroup!"
                        //  $('#AgreedPaymentTerms').focus();
            });
            return false;
        }
        var ItemIntervalNumber = $('#ItemIntervalNumber').val();
        var SubItemInterval = $('#SubItemInterval').val();
         var GRMessage = $('#GRMessage').val();
        //Terms of Delivery
        var AgreedPaymentTerms = $('#AgreedPaymentTerms').val();
        if (AgreedPaymentTerms === '')
        {
            Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please Choose Agreed Payment Terms!"
                        //  $('#AgreedPaymentTerms').focus();
            });
            return false;
        }
        var paymentindays = $('#paymentindays').val();
        var paymentinperc = $('#paymentinperc').val();
        var paymentindays2 = $('#paymentindays2').val();
        var paymentinperc2 = $('#paymentinperc2').val();
        var paymentindaysnet = $('#paymentindaysnet').val();
        var ExchangeRate = $('#ExchangeRate').val();
        var ExchangeRateFixed = $('#ExchangeRateFixed').val();
        
        // var IncotermsPart1 = $('#IncotermsPart1').val();
        var IncotermsPart1 = document.getElementById('IncoTermsPart1').value;
        if (IncotermsPart1 === '')
        {
            Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please Choose Incoterms Part 1!"
                        //  $('#AgreedPaymentTerms').focus();
            });
            return false;
        }
        console.log(IncotermsPart1);
        var IncotermsPart2 = $('#IncotermsPart2').val();
        //Reference Data
        var YourReference = $('#YourReference').val();
        var rfqid = $('#rfqid').val();
        var SalesPerson = $('#SalesPerson').val();
        var OurReference = $('#OurReference').val();
        var Telephone = $('#Telephone').val();
        var SupplVendor = $('#SupplVendor').val();
        var InvoicingParty = $('#InvoicingParty').val();
        
        var vendorcode = $('#vendorcode').val();
        var vendorname = $('#vendorname').val();
        var rfqno = $('#rfqno').val();

//framing into json ---abhishek
        FieldsJSONObject["contractRefId"] = contractRefId;
        FieldsJSONObject["duration"] = duration;
        FieldsJSONObject["validitystartdate"] = validitystartdate;
        FieldsJSONObject["validityenddate"] = validityenddate;
        FieldsJSONObject["finalagreementvalue"] = finalagreementvalue;
        FieldsJSONObject["agreementtype"] = agreementtype;
        FieldsJSONObject["agreementdate"] = agreementdate;
        FieldsJSONObject["currency"] = currency;
        //2nd
        FieldsJSONObject["PurchOrganization"] = PurchOrganization;
        FieldsJSONObject["PurchaseGroup"] = PurchaseGroup;
        FieldsJSONObject["ItemIntervalNumber"] = ItemIntervalNumber;
        FieldsJSONObject["SubItemInterval"] = SubItemInterval;
        FieldsJSONObject["GRMessage"] = GRMessage;
        //3rd
        FieldsJSONObject["AgreedPaymentTerms"] = AgreedPaymentTerms;
        FieldsJSONObject["paymentindays"] = paymentindays;
        FieldsJSONObject["paymentinperc"] = paymentinperc;
        FieldsJSONObject["paymentindays2"] = paymentindays2;
        FieldsJSONObject["paymentinperc2"] = paymentinperc2;
        FieldsJSONObject["paymentindaysnet"] = paymentindaysnet;
        FieldsJSONObject["ExchangeRate"] = ExchangeRate;
        FieldsJSONObject["ExchangeRateFixed"] = ExchangeRateFixed;
        FieldsJSONObject["IncotermsPart1"] = IncotermsPart1;
        console.log(IncotermsPart1);
        FieldsJSONObject["IncotermsPart2"] = IncotermsPart2;
        //4th
        FieldsJSONObject["YourReference"] = YourReference;
        FieldsJSONObject["SalesPerson"] = SalesPerson;
        FieldsJSONObject["OurReference"] = OurReference;
        FieldsJSONObject["Telephone"] = Telephone;
        FieldsJSONObject["SupplVendor"] = SupplVendor;
        FieldsJSONObject["InvoicingParty"] = InvoicingParty;
        
        FieldsJSONObject["vendorcode"] = vendorcode;
        FieldsJSONObject["vendorname"] = vendorname;
        FieldsJSONObject["rfqno"] = rfqno;

        ///

        FieldsJSONArray.push(FieldsJSONObject);
        var FieldsJSONArrayString = JSON.stringify(FieldsJSONArray);
        console.log("QuantityWeightAsJsonString: " + FieldsJSONArrayString);
//5516-arjun
        var table = document.getElementById('serviceTableId');
        var jsonArr = [];
        var jsonServ = [];
        var jsonAcc=[];
        $('#contractItemTableId tr').each(function (row, tr) {
            var linkID=$(tr).find("td #linkId").val();
           
            var jsonObj = {
                "contractRefId": contractRefId,
                "itemnumber": $(tr).find("td #itemnumber").val(),
                "accassignment": $(tr).find("td #accassignment").val(),
                "itemcategory": $(tr).find("td #itemcategory").val(),
                "materialCode": $(tr).find("td #materialCode").val(),
                "shorttext": $(tr).find("td #shorttext").val(),
                "targQty": $(tr).find("td #targQty").val(),
                "matllongtext": $(tr).find("td #matllongtext").val(),
                "uom": $(tr).find("td #uom").val(),
                "ppu": $(tr).find("td #ppu").val(),
                "opu": $(tr).find("td #opu").val(),
                "np": $(tr).find("td #np").val(),
                "plant": $(tr).find("td #plant").val(),
                "matlgroup": $(tr).find("td #matlgroup").val(),
                "Sloc": $(tr).find("td #Sloc").val(),
                "itemText": $('#ItemText').val(),
                "ItemNote": $("#ItemNote").val(),
                "noteToApprover": $("#NoteToApprover").val(),
                "linkId": linkID,
            }
            jsonArr.push(jsonObj);
       
        var Distribution=$('#distribution').val();
        console.log(Distribution)
        if($(tr).find("td #accassignment").val()!='U'){
        if (Distribution === "Single Account Assignment") {
            
            var jsonObj = {
            "contractRefId": contractRefId,
            "unloadingPoint": $("#unloadingPoint").val(),
            "recipient": $("#recipient").val(),            
            "accLinkID": $("#accLinkID").val(),
            "gLAccount": $("#gLAccount").val(),
            "coArea": $("#coArea").val(),
            "costCenterAccAsgn": $("#costCenterAccAsgn").val(),
            "accAsgnOrder": $("#accAsgnOrder").val(),
            "accAsgnAsset": $("#accAsgnAsset").val(),
            "accAsgnWBSElementInput": $("#accAsgnWBSElementInput").val(),
            "accAsgnSalesOrder": $("#accAsgnSalesOrder").val(),
            "assAsgnItemNumber": $("#assAsgnItemNumber").val(),
            "assAsgnDelivSch": $("#assAsgnDelivSch").val(),
            "assAsgnQuantity": $("#assAsgnQuantity").val(),
            "assAsgnPercentage": $("#assAsgnPercentage").val(),
            "accAsgnfund": $("#accAsgnfund").val(),
            "accAsgnfunctionalArea": $("#accAsgnfunctionalArea").val(),
            "accAsgnFundCenterInput": $("#accAsgnFundCenterInput").val(),
            "accAsgnCommItemInput": $("#accAsgnCommItemInput").val(),
            "accAsgnNActNumInput": $("#accAsgnNActNumInput").val(),
            "distribution": $("#distribution").val()
        }
            jsonAcc.push(jsonObj);
            
        }else{
        $('#costCenteraccountAssignmentTebleId tr').each(function (row, tr) {
            var jsonObj = {
            "contractRefId": contractRefId,
            "unloadingPoint": $(tr).find("td .accAsgnUnloadingPoint").val(),
            "recipient": $(tr).find("td .accAsgnRecipients").val(),            
            "accLinkID": $(tr).find("td .acclinkIDClass").val(),
            "gLAccount": $(tr).find("td .accAsgnGLAccount").val(),
            "coArea": $(tr).find("td .accAsgnCOArea").val(),
            "costCenterAccAsgn": $(tr).find("td .accAsgnCostCetner").val(),
            "accAsgnOrder": $(tr).find("td .accAsgnOrder").val(),
            "accAsgnAsset": $(tr).find("td .accAsgnAssets").val(),
            "accAsgnWBSElementInput": $(tr).find("td .accAsgnWBSElement").val(),
            "accAsgnSalesOrder": $(tr).find("td .accAsgnSalesOrder").val(),
            "assAsgnItemNumber": $(tr).find("td .accAsgnItemNumber").val(),
            "assAsgnDelivSch": $(tr).find("td .accAsgnDeliverySchedule").val(),
            "assAsgnQuantity": $(tr).find("td .accAsgnQuantity").val(),
            "assAsgnPercentage": $(tr).find("td .accAsgnPercentage").val(),
            "accAsgnfund": $(tr).find("td .accAsgnFund").val(),
            "accAsgnfunctionalArea": $(tr).find("td .accAsgnFunctionalArea").val(),
            "accAsgnFundCenterInput": $(tr).find("td .accAsgnFundCenter").val(),
            "accAsgnCommItemInput": $(tr).find("td .accAsgnCommitmentItem").val(),
            "accAsgnNActNumInput": $(tr).find("td .accAsgnNetActNumber").val(),
            "distribution": $("#distribution").val()
            }
            jsonAcc.push(jsonObj);
        });
        
    }
        }
    if($(tr).find("td #itemcategory").val()==="D"){
        $('#contractServiceTableId tr').each(function (row, tr) {
            var jsonObj = {
                "contractRefId": contractRefId,
                "itemnumber": $(tr).find("td #itemnumber").val(),
                "ServiceNumber": $(tr).find("td #ServiceNumber").val(),
                "ShortText": $(tr).find("td #ShortText").val(),
                "Unit": $(tr).find("td #Unit").val(),
                "Serv_Quantity": $(tr).find("td #Serv_Quantity").val(),
                "GrossPrice": $(tr).find("td #GrossPrice").val(),
                "Currency": $(tr).find("td #Currency").val(),
                "Edition": $(tr).find("td #Edition").val(),
                "serlinkId": $(tr).find("td #serlinkId").val(),
                "contlinkId": $(tr).find("td #contlinkId").val(),
            }
            jsonServ.push(jsonObj);
        });
    }
        
        
     });
     jsonArr.shift();
         jsonAcc.shift();
        jsonServ.shift();
        console.log(jsonArr);
        var FieldsJSONArrayStringList = JSON.stringify(jsonArr);
        var AccItemJSONList = JSON.stringify(jsonAcc);
        console.log(jsonServ);
        var ServiceItemJSONList = JSON.stringify(jsonServ);
        console.log("ServiceItemJSONList: " + ServiceItemJSONList);

        var _csrf = $("input[name=_csrf]").val();
        $.ajax({
            type: "POST",
            url: "rfqcontractdata.do",
            async: false,
            dataType: 'json',
            // convert form data to json format
            data:
                    {
                        "FieldsJSONArrayString": FieldsJSONArrayString,
                        "FieldsJSONArrayStringList": FieldsJSONArrayStringList,
                        "ServiceItemJSONList": ServiceItemJSONList,
                        "AccItemJSONList": AccItemJSONList,
                        "rfqid":rfqid,
                        "reqType":"Create",
                        _csrf: _csrf,
                    },
            complete: function (response) {
                console.log(response);
               
                var obj = $.parseJSON(response.responseText);
                console.log("status: " + obj.status);
           //     alert(obj.status)
                if (obj.status === "Success") {
                    alert('OLA has been created with refNo:-'+obj.WorkItemNo);
                    
                    //vendorresponsescontractList
//                 var   serviceUrl = WebServiceCallIp + "/WebServiceCall/CreateOLAServlet";
//                 console.log(serviceUrl);
window.location = "/BuyerPortal/vendorresponsescontract.do";

//                    $.ajax({
//                        type: "POST",
//                        url: "vendorresponsescontractList.do",
//                        async: false,
//                        dataType: "json",
//                                            
//                        // convert form data to json format
//                        data:
//                                {
//                                    "WORkITEMNO": obj.WorkItemNo,
//                                    _csrf: _csrf,
//                                },
//                        complete: function (response1) {
//                            console.log(response1)
//
//                        }
//                    })


                } else {
                    console.log(" Data not saved!");

                }

            }


        });


    });
    
     $("#editcontractform").submit(function (e) {

        e.preventDefault();

        var FieldsJSONObject = {};
        
        var WebServiceCallIp = $("#WebServiceCallIp").val();
        var flag=$('#flag').val();
        var FieldsJSONArray = [];
        var contractRefId = $('#contractRefId').val();
        //Agreement
        var finalagreementvalue = $('#finalagreementvalue').val();
        var agreementtype = $('#agreementtype').val();
        var agreementdate = $('#agreementdate').val();
        if (agreementdate === '')
        {
            Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please Choose Agreement Date!"
                        //  $('#AgreedPaymentTerms').focus();
            });
            return false;
        }
        var validitystartdate = $('#validitystartdate').val();
        if (validitystartdate === '')
        {
            Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please Choose Validity Start Date!"
                        //  $('#AgreedPaymentTerms').focus();
            });
            return false;
        }
        var validityenddate = $('#validityenddate').val();
        if (validityenddate === '')
        {
            Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please Choose Validity End Date!"
                        //  $('#AgreedPaymentTerms').focus();
            });
            return false;
        }
        var duration = $('#duration').val();
        var currency = $('#currency').val();
        //OLA
        var PurchOrganization = $('#PurchOrganization').val();
        if (PurchOrganization === '')
        {
            Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please Choose PurchOrganization!"
                        //  $('#AgreedPaymentTerms').focus();
            });
            return false;
        }
        var PurchaseGroup = $('#PurchaseGroup').val();
        if (PurchaseGroup === '')
        {
            Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please Choose PurchaseGroup!"
                        //  $('#AgreedPaymentTerms').focus();
            });
            return false;
        }
        var ItemIntervalNumber = $('#ItemIntervalNumber').val();
        var SubItemInterval = $('#SubItemInterval').val();
         var GRMessage = $('#GRMessage').val();
        //Terms of Delivery
        var AgreedPaymentTerms = $('#AgreedPaymentTerms').val();
        if (AgreedPaymentTerms === '')
        {
            Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please Choose Agreed Payment Terms!"
                        //  $('#AgreedPaymentTerms').focus();
            });
            return false;
        }
        var paymentindays = $('#paymentindays').val();
        var paymentinperc = $('#paymentinperc').val();
        var paymentindays2 = $('#paymentindays2').val();
        var paymentinperc2 = $('#paymentinperc2').val();
        var paymentindaysnet = $('#paymentindaysnet').val();
        var ExchangeRate = $('#ExchangeRate').val();
        var ExchangeRateFixed = $('#ExchangeRateFixed').val();
        
        // var IncotermsPart1 = $('#IncotermsPart1').val();
        var IncotermsPart1 = document.getElementById('IncoTermsPart1').value;
        if (IncotermsPart1 === '')
        {
            Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please Choose Incoterms Part 1!"
                        //  $('#AgreedPaymentTerms').focus();
            });
            return false;
        }
        console.log(IncotermsPart1);
        var IncotermsPart2 = $('#IncotermsPart2').val();
        //Reference Data
        var YourReference = $('#YourReference').val();
        var rfqid = $('#rfqid').val();
        var SalesPerson = $('#SalesPerson').val();
        var OurReference = $('#OurReference').val();
        var Telephone = $('#Telephone').val();
        var SupplVendor = $('#SupplVendor').val();
        var InvoicingParty = $('#InvoicingParty').val();
        
        var vendorcode = $('#vendorcode').val();
        var vendorname = $('#vendorname').val();
        var rfqno = $('#rfqno').val();

//framing into json ---abhishek
        FieldsJSONObject["contractRefId"] = contractRefId;
        FieldsJSONObject["duration"] = duration;
        FieldsJSONObject["validitystartdate"] = validitystartdate;
        FieldsJSONObject["validityenddate"] = validityenddate;
        FieldsJSONObject["finalagreementvalue"] = finalagreementvalue;
        FieldsJSONObject["agreementtype"] = agreementtype;
        FieldsJSONObject["agreementdate"] = agreementdate;
        FieldsJSONObject["currency"] = currency;
        //2nd
        FieldsJSONObject["PurchOrganization"] = PurchOrganization;
        FieldsJSONObject["PurchaseGroup"] = PurchaseGroup;
        FieldsJSONObject["ItemIntervalNumber"] = ItemIntervalNumber;
        FieldsJSONObject["SubItemInterval"] = SubItemInterval;
        FieldsJSONObject["GRMessage"] = GRMessage;
        //3rd
        FieldsJSONObject["AgreedPaymentTerms"] = AgreedPaymentTerms;
        FieldsJSONObject["paymentindays"] = paymentindays;
        FieldsJSONObject["paymentinperc"] = paymentinperc;
        FieldsJSONObject["paymentindays2"] = paymentindays2;
        FieldsJSONObject["paymentinperc2"] = paymentinperc2;
        FieldsJSONObject["paymentindaysnet"] = paymentindaysnet;
        FieldsJSONObject["ExchangeRate"] = ExchangeRate;
        FieldsJSONObject["ExchangeRateFixed"] = ExchangeRateFixed;
        FieldsJSONObject["IncotermsPart1"] = IncotermsPart1;
        console.log(IncotermsPart1);
        FieldsJSONObject["IncotermsPart2"] = IncotermsPart2;
        //4th
        FieldsJSONObject["YourReference"] = YourReference;
        FieldsJSONObject["SalesPerson"] = SalesPerson;
        FieldsJSONObject["OurReference"] = OurReference;
        FieldsJSONObject["Telephone"] = Telephone;
        FieldsJSONObject["SupplVendor"] = SupplVendor;
        FieldsJSONObject["InvoicingParty"] = InvoicingParty;
        
        FieldsJSONObject["vendorcode"] = vendorcode;
        FieldsJSONObject["vendorname"] = vendorname;
        FieldsJSONObject["rfqno"] = rfqno;

        ///

        FieldsJSONArray.push(FieldsJSONObject);
        var FieldsJSONArrayString = JSON.stringify(FieldsJSONArray);
        console.log("QuantityWeightAsJsonString: " + FieldsJSONArrayString);
//5516-arjun
        var table = document.getElementById('serviceTableId');
        var jsonArr = [];
        var jsonServ = [];
        var jsonAcc=[];
        $('#contractItemTableId tr').each(function (row, tr) {
            var linkID=$(tr).find("td #linkId").val();
           
            var jsonObj = {
                "contractRefId": contractRefId,
                "itemnumber": $(tr).find("td #itemnumber").val(),
                "accassignment": $(tr).find("td #accassignment").val(),
                "itemcategory": $(tr).find("td #itemcategory").val(),
                "materialCode": $(tr).find("td #materialCode").val(),
                "shorttext": $(tr).find("td #shorttext").val(),
                "targQty": $(tr).find("td #targQty").val(),
                "matllongtext": $(tr).find("td #matllongtext").val(),
                "uom": $(tr).find("td #uom").val(),
                "ppu": $(tr).find("td #ppu").val(),
                "opu": $(tr).find("td #opu").val(),
                "np": $(tr).find("td #np").val(),
                "plant": $(tr).find("td #plant").val(),
                "matlgroup": $(tr).find("td #matlgroup").val(),
                "Sloc": $(tr).find("td #Sloc").val(),
                "linkId": linkID,
            }
            jsonArr.push(jsonObj);
       
        var Distribution=$('#distribution').val();
        console.log(Distribution)
        if($(tr).find("td #accassignment").val()!='U'){
        if (Distribution === "Single Account Assignment") {
            
            var jsonObj = {
            "contractRefId": contractRefId,
            "unloadingPoint": $("#unloadingPoint").val(),
            "recipient": $("#recipient").val(),            
            "accLinkID": $("#accLinkID").val(),
            "gLAccount": $("#gLAccount").val(),
            "coArea": $("#coArea").val(),
            "costCenterAccAsgn": $("#costCenterAccAsgn").val(),
            "accAsgnOrder": $("#accAsgnOrder").val(),
            "accAsgnAsset": $("#accAsgnAsset").val(),
            "accAsgnWBSElementInput": $("#accAsgnWBSElementInput").val(),
            "accAsgnSalesOrder": $("#accAsgnSalesOrder").val(),
            "assAsgnItemNumber": $("#assAsgnItemNumber").val(),
            "assAsgnDelivSch": $("#assAsgnDelivSch").val(),
            "assAsgnQuantity": $("#assAsgnQuantity").val(),
            "assAsgnPercentage": $("#assAsgnPercentage").val(),
            "accAsgnfund": $("#accAsgnfund").val(),
            "accAsgnfunctionalArea": $("#accAsgnfunctionalArea").val(),
            "accAsgnFundCenterInput": $("#accAsgnFundCenterInput").val(),
            "accAsgnCommItemInput": $("#accAsgnCommItemInput").val(),
            "accAsgnNActNumInput": $("#accAsgnNActNumInput").val(),
            "distribution": $("#distribution").val()
        }
            jsonAcc.push(jsonObj);
            
        }else{
        $('#costCenteraccountAssignmentTebleId tr').each(function (row, tr) {
            var jsonObj = {
            "contractRefId": contractRefId,
            "unloadingPoint": $(tr).find("td .accAsgnUnloadingPoint").val(),
            "recipient": $(tr).find("td .accAsgnRecipients").val(),            
            "accLinkID": $(tr).find("td .acclinkIDClass").val(),
            "gLAccount": $(tr).find("td .accAsgnGLAccount").val(),
            "coArea": $(tr).find("td .accAsgnCOArea").val(),
            "costCenterAccAsgn": $(tr).find("td .accAsgnCostCetner").val(),
            "accAsgnOrder": $(tr).find("td .accAsgnOrder").val(),
            "accAsgnAsset": $(tr).find("td .accAsgnAssets").val(),
            "accAsgnWBSElementInput": $(tr).find("td .accAsgnWBSElement").val(),
            "accAsgnSalesOrder": $(tr).find("td .accAsgnSalesOrder").val(),
            "assAsgnItemNumber": $(tr).find("td .accAsgnItemNumber").val(),
            "assAsgnDelivSch": $(tr).find("td .accAsgnDeliverySchedule").val(),
            "assAsgnQuantity": $(tr).find("td .accAsgnQuantity").val(),
            "assAsgnPercentage": $(tr).find("td .accAsgnPercentage").val(),
            "accAsgnfund": $(tr).find("td .accAsgnFund").val(),
            "accAsgnfunctionalArea": $(tr).find("td .accAsgnFunctionalArea").val(),
            "accAsgnFundCenterInput": $(tr).find("td .accAsgnFundCenter").val(),
            "accAsgnCommItemInput": $(tr).find("td .accAsgnCommitmentItem").val(),
            "accAsgnNActNumInput": $(tr).find("td .accAsgnNetActNumber").val(),
            "distribution": $("#distribution").val()
            }
            jsonAcc.push(jsonObj);
        });
        
    }
        }
    if($(tr).find("td #itemcategory").val()==="D"){
        $('#contractServiceTableId tr').each(function (row, tr) {
            var jsonObj = {
                "contractRefId": contractRefId,
                "itemnumber": $(tr).find("td #itemnumber").val(),
                "ServiceNumber": $(tr).find("td #ServiceNumber").val(),
                "ShortText": $(tr).find("td #ShortText").val(),
                "Unit": $(tr).find("td #Unit").val(),
                "Serv_Quantity": $(tr).find("td #Serv_Quantity").val(),
                "GrossPrice": $(tr).find("td #GrossPrice").val(),
                "Currency": $(tr).find("td #Currency").val(),
                "Edition": $(tr).find("td #Edition").val(),
                "serlinkId": $(tr).find("td #serlinkId").val(),
                "contlinkId": $(tr).find("td #contlinkId").val(),
            }
            jsonServ.push(jsonObj);
        });
    }
        
        
     });
     jsonArr.shift();
         jsonAcc.shift();
        jsonServ.shift();
        console.log(jsonArr);
        var FieldsJSONArrayStringList = JSON.stringify(jsonArr);
        var AccItemJSONList = JSON.stringify(jsonAcc);
        console.log(jsonServ);
        var ServiceItemJSONList = JSON.stringify(jsonServ);
        console.log("ServiceItemJSONList: " + ServiceItemJSONList);

        var _csrf = $("input[name=_csrf]").val();
        $.ajax({
            type: "POST",
            url: "rfqcontractdata.do",
            async: false,
            dataType: 'json',
            // convert form data to json format
            data:
                    {
                        "FieldsJSONArrayString": FieldsJSONArrayString,
                        "FieldsJSONArrayStringList": FieldsJSONArrayStringList,
                        "ServiceItemJSONList": ServiceItemJSONList,
                        "AccItemJSONList": AccItemJSONList,
                        "rfqid":rfqid,
                        "reqType":flag,
                        _csrf: _csrf,
                    },
            complete: function (response) {
                console.log(response);
               
                var obj = $.parseJSON(response.responseText);
                console.log("status: " + obj.status);
           //     alert(obj.status)
                if (obj.status === "Success") {
                    Lobibox.confirm({
                        closeButton: false,
                        buttons: {
                            ok: {
                                'class': 'lobibox-btn lobibox-btn-default',
                                text: 'OK',
                                closeOnClick: true
                            }
                        },
                        msg         : "Are you sure you want to delete this user?"
                    })

                    alert('OLA ' + obj.WorkItemNo + ' has been modified successfully');
                    window.location = "/BuyerPortal/manageola.do";
                } else {
                    console.log(" Data not saved!");

                }

            }


        });


    });
    
    $("#editRFQOLA").click(function(event) {
        $('#flag').val("Edit");
    })
     $("#cancelRFQOLA").click(function(event) {
        $('#flag').val("Cancel");
    })
    
    
    $("#savePoLineItemData").click(function(event) {
        var contractRefId = $('#contractRefId').val();
        var jsonArr = [];
  
        $('#contractItemTableId tr').each(function (row, tr) {
            var linkID=$(tr).find("td #linkId").val();
            
            var jsonObj = {
                 "contractRefId": contractRefId,
                "itemnumber": $(tr).find("td #itemnumber").val(),
                "accassignment": $(tr).find("td #accassignment").val(),
                "itemcategory": $(tr).find("td #itemcategory").val(),
                "materialCode": $(tr).find("td #materialCode").val(),
                "shorttext": $(tr).find("td #shorttext").val(),
                "targQty": $(tr).find("td #targQty").val(),
                "matllongtext": $(tr).find("td #matllongtext").val(),
                "uom": $(tr).find("td #uom").val(),
                "ppu": $(tr).find("td #ppu").val(),
                "opu": $(tr).find("td #opu").val(),
                "np": $(tr).find("td #np").val(),
                "plant": $(tr).find("td #plant").val(),
                "matlgroup": $(tr).find("td #matlgroup").val(),
                 "Sloc": $(tr).find("td #Sloc").val(),
                "linkId": linkID,
            }
            jsonArr.push(jsonObj);
        
        });
        jsonArr.shift();


        console.log(jsonArr);
        var FieldsJSONArrayStringList = JSON.stringify(jsonArr);
        console.log("FieldsJSONArrayStringList: " + FieldsJSONArrayStringList);
        
        var jsonAcc=[];
        var Distribution=$('#distribution').val();
        console.log(Distribution)
        if (Distribution === "Single Account Assignment") {
            
            var jsonObj = {
            "contractRefId": contractRefId,
            "unloadingPoint": $("#unloadingPoint").val(),
            "recipient": $("#recipient").val(),            
            "accLinkID": $("#accLinkID").val(),
            "gLAccount": $("#gLAccount").val(),
            "coArea": $("#coArea").val(),
            "costCenterAccAsgn": $("#costCenterAccAsgn").val(),
            "accAsgnOrder": $("#accAsgnOrder").val(),
            "accAsgnAsset": $("#accAsgnAsset").val(),
            "accAsgnWBSElementInput": $("#accAsgnWBSElementInput").val(),
            "accAsgnSalesOrder": $("#accAsgnSalesOrder").val(),
            "assAsgnItemNumber": $("#assAsgnItemNumber").val(),
            "assAsgnDelivSch": $("#assAsgnDelivSch").val(),
            "assAsgnQuantity": $("#assAsgnQuantity").val(),
            "assAsgnPercentage": $("#assAsgnPercentage").val(),
            "accAsgnfund": $("#accAsgnfund").val(),
            "accAsgnfunctionalArea": $("#accAsgnfunctionalArea").val(),
            "accAsgnFundCenterInput": $("#accAsgnFundCenterInput").val(),
            "accAsgnCommItemInput": $("#accAsgnCommItemInput").val(),
            "accAsgnNActNumInput": $("#accAsgnNActNumInput").val(),
            "distribution": $("#distribution").val()
        }
            jsonAcc.push(jsonObj);
            
        }else{
        $('#costCenteraccountAssignmentTebleId tr').each(function (row, tr) {
            var jsonObj = {
            "contractRefId": contractRefId,
            "unloadingPoint": $(tr).find("td .accAsgnUnloadingPoint").val(),
            "recipient": $(tr).find("td .accAsgnRecipients").val(),            
            "accLinkID": $(tr).find("td .acclinkIDClass").val(),
            "gLAccount": $(tr).find("td .accAsgnGLAccount").val(),
            "coArea": $(tr).find("td .accAsgnCOArea").val(),
            "costCenterAccAsgn": $(tr).find("td .accAsgnCostCetner").val(),
            "accAsgnOrder": $(tr).find("td .accAsgnOrder").val(),
            "accAsgnAsset": $(tr).find("td .accAsgnAssets").val(),
            "accAsgnWBSElementInput": $(tr).find("td .accAsgnWBSElement").val(),
            "accAsgnSalesOrder": $(tr).find("td .accAsgnSalesOrder").val(),
            "assAsgnItemNumber": $(tr).find("td .accAsgnItemNumber").val(),
            "assAsgnDelivSch": $(tr).find("td .accAsgnDeliverySchedule").val(),
            "assAsgnQuantity": $(tr).find("td .accAsgnQuantity").val(),
            "assAsgnPercentage": $(tr).find("td .accAsgnPercentage").val(),
            "accAsgnfund": $(tr).find("td .accAsgnFund").val(),
            "accAsgnfunctionalArea": $(tr).find("td .accAsgnFunctionalArea").val(),
            "accAsgnFundCenterInput": $(tr).find("td .accAsgnFundCenter").val(),
            "accAsgnCommItemInput": $(tr).find("td .accAsgnCommitmentItem").val(),
            "accAsgnNActNumInput": $(tr).find("td .accAsgnNetActNumber").val(),
            "distribution": $("#distribution").val()
            }
            jsonAcc.push(jsonObj);
        });
         jsonAcc.shift();
    }
       

        console.log(jsonAcc);
        var AccItemJSONList = JSON.stringify(jsonAcc);
        
        
        
        
        var jsonServ = [];

        $('#contractServiceTableId tr').each(function (row, tr) {
            var jsonObj = {
                "contractRefId": contractRefId,
                "itemnumber": $(tr).find("td #itemnumber").val(),
                "ServiceNumber": $(tr).find("td #ServiceNumber").val(),
                "ShortText": $(tr).find("td #ShortText").val(),
                "Unit": $(tr).find("td #Unit").val(),
                "Serv_Quantity": $(tr).find("td #Serv_Quantity").val(),
                "GrossPrice": $(tr).find("td #GrossPrice").val(),
                "Currency": $(tr).find("td #Currency").val(),
                "Edition": $(tr).find("td #Edition").val(),
                "serlinkId": $(tr).find("td #serlinkId").val(),
                "contlinkId": $(tr).find("td #contlinkId").val(),
            }
            jsonServ.push(jsonObj);
        });
        jsonServ.shift();

        console.log(jsonServ);
        var ServiceItemJSONList = JSON.stringify(jsonServ);
        console.log("ServiceItemJSONList: " + ServiceItemJSONList);

        var _csrf = $("input[name=_csrf]").val();
        $.ajax({
            type: "POST",
            url: "rfqcontractdata.do",
            async: false,
            dataType: 'json',
            // convert form data to json format
            data:
                    {
                        "FieldsJSONArrayString": null,
                        "FieldsJSONArrayStringList": FieldsJSONArrayStringList,
                        "ServiceItemJSONList": ServiceItemJSONList,
                        "AccItemJSONList":AccItemJSONList,
                        
                        _csrf: _csrf,
                    },
            complete: function (response) {
                console.log(response);
               
                var obj = $.parseJSON(response.responseText);
                console.log("status: " + obj.status);
                
                if (obj.status === "success") {
                    console.log(" Data saved successfully ");
                    alert(" Data saved successfully ");
                } else {
                    console.log(" Data not saved!");
                    alert("  Data not saved! ");

                }
            }


        })
    });


    var currentMaterialTR = "";
    $("#contractItemTableId").on("click", ".materialGrpClass", function () {
        currentMaterialTR = $(this).parent();
        $("#MatlGroupModal").modal("show");
        getAllMaterialGroup();
        //$("#materialGroupReqFrom").val("FromPRTable");
    });

    var current_td;

    $("#contractItemTableId").on("click", ".accountAssignmentClass", function () {
        $("#accountAssignmentCategoryModal").modal("show");
        current_td = $(this).parent();
        getAllAccountAssignmentCategory();
    });

    $("#contractItemTableId").on("click", ".delete-contract-line", function () {
        $(this).closest('tr').remove();
        $('#contractItemTableId').focus();

    });
    $("#contractServiceTableId").on("click", ".delete-con-serv-line", function () {
        $(this).closest('tr').remove();
        $('#contractServiceTableId').focus();
    });
    var serviceTabTableCurrentTd;
    var checkboxServicesArr = [];
    $("#contractServiceTableId").on("click", ".checkboxServices", function () {

        checkboxServicesArr = [];
        $("#serviceTabAccAssgnModelBtn_div").css("display", "");
        checkboxServicesArr = [];
        var isConditionChecked = $(this).prop("checked");
        $("#serviceTableId tbody tr").each(function () {
            $(this).find("td").eq(0).children(".checkboxServices").prop("checked", false);
        });
        if (isConditionChecked === true) {
            $(this).prop("checked", true);
        } else {
            $(this).prop("checked", false);
        }
        serviceTabTableCurrentTd = $(this);
    });




    var matlGroupTable = null;
    function getAllMaterialGroup() {
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {
                "reqFrom": "getAllMaterialGroup"
            },
            complete: function (responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log("Obj lengtth :" + obj.length);
                var row = "";
                for (var i = 0; i < obj.length; i++) {
                    row += "<tr class='checkMaterialGroupTableClass'>>"

                            + "<td>" + obj[i].CODE + "</td>"
                            + "<td>" + obj[i].DESC + "</td>"
                            + "</tr>";
                }
                $("#MatlGroupTableId tbody").append(row);
                if ($.fn.DataTable.isDataTable('#MatlGroupTableId')) {
                    matlGroupTable.destroy();
                    matlGroupTable = null;
                    $("#MatlGroupTableId").children('tbody').html(row);
                    matlGroupTable = $('table.MatlGroupTableClass').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    matlGroupTable.buttons().container()
                            .appendTo('#MatlGroupTableId_wrapper .col-md-6:eq(0)');
                } else {
                    $('#MatlGroupTableId thead tr').clone(true).appendTo('#MatlGroupTableId thead');
                    $('#MatlGroupTableId thead tr:eq(1) th').each(function (i) {
                        $('#MatlGroupTableId thead tr:eq(0) th').addClass("table-header-color");
                        var title = $(this).text();
                        if (title === '') {
                            $(this).html('');
                        } else {
                            $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                        }
                        $('input', this).on('keyup change', function () {
                            if (matlGroupTable.column(i).search() !== this.value) {
                                matlGroupTable
                                        .column(i)
                                        .search(this.value)
                                        .draw();
                            }
                        });
                    });
                    matlGroupTable = $('table.MatlGroupTableClass').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    matlGroupTable.buttons().container()
                            .appendTo('#MatlGroupTableId_wrapper .col-md-6:eq(0)');
                }
            }
        });
    }

    var accAsgnCatTable = null;
    function getAllAccountAssignmentCategory() {

        $.ajax({
            type: "GET",
            url: "poajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "getAllAccountAssignmentCategory"
            },
            complete: function (responseJson) {
                var jsonAccAsgnArr = $.parseJSON(responseJson.responseText);
                jsonAccAsgnArr = JSON.parse(JSON.stringify(jsonAccAsgnArr));
                console.log("jsonAccAsgnArr length :" + jsonAccAsgnArr.length);
                var row = "";
                for (var i = 0; i < jsonAccAsgnArr.length; i++) {
                    row += "<tr class='accountAssignmentCategoryTable-btn'>"
                            + "<td>" + jsonAccAsgnArr[i].accountAssignmentCode + "</td>"
                            + "<td>" + jsonAccAsgnArr[i].accountAssignmentCategory + "</td>"
                            + "</tr>";
                }
                $("#accountAssignmentCategoryTableId tbody tr").remove();
                $("#accountAssignmentCategoryTableId tbody").append(row);
                if ($.fn.DataTable.isDataTable('#accountAssignmentCategoryTableId')) {
                    accAsgnCatTable.destroy();
                    accAsgnCatTable = null;
                    $("#accountAssignmentCategoryTableId").children('tbody').html(row);
                    accAsgnCatTable = $('table.accountAssignmentCategoryTable-Class').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    accAsgnCatTable.buttons().container()
                            .appendTo('#accountAssignmentCategoryTableId_wrapper .col-md-6:eq(0)');
                } else {
                    $('#accountAssignmentCategoryTableId thead tr').clone(true).appendTo('#accountAssignmentCategoryTableId thead');
                    $('#accountAssignmentCategoryTableId thead tr:eq(1) th').each(function (i) {
                        $('#accountAssignmentCategoryTableId thead tr:eq(0) th').addClass("table-header-color");
                        var title = $(this).text();
                        if (title === '') {
                            $(this).html('');
                        } else {
                            $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                        }
                        $('input', this).on('keyup change', function () {
                            if (accAsgnCatTable.column(i).search() !== this.value) {
                                accAsgnCatTable
                                        .column(i)
                                        .search(this.value)
                                        .draw();
                            }
                        });
                    });
                    accAsgnCatTable = $('table.accountAssignmentCategoryTable-Class').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    accAsgnCatTable.buttons().container()
                            .appendTo('#accountAssignmentCategoryTableId_wrapper .col-md-6:eq(0)');
                }
            }
        });
    }
    var currentTd;
    $("#contractItemTableId").on("click", ".itemCategoryClass", function () {
//      
//        $("#itemCategoryModal").modal("show");
//        currentTd = $(this).parent();
//        
//    });
//    $("#ItemCategory").click(function() {
        $("#itemCategoryModal").modal("show");
        currentTd = $(this).parent();
        getAllItemCategory();
        //$("#ro_ItemCategory").val("ProfitabilitySegment");
    });
    var itemCategoryTable = null;
    function getAllItemCategory() {
        $.ajax({
            type: "GET",
            url: "doajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "getAllItemCategory"
            },
            complete: function (responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log("Obj length :" + obj.length);
                var row = "";
                for (var i = 0; i < obj.length; i++) {
                    row += "<tr class='itemCategoryModalTableTrClass'>"

                            + "<td>" + obj[i].ITEMM_CATEGORY + "</td>"
                            + "<td>" + obj[i].DESCRIPTION + "</td>"
                            + "</tr>";
                }
                $("#itemCategoryTableId tbody tr").remove();
                $("#itemCategoryTableId tbody").append(row);
                if ($.fn.DataTable.isDataTable('#itemCategoryTableId')) {
                    itemCategoryTable.destroy();
                    itemCategoryTable = null;
                    $("#itemCategoryTableId").children('tbody').html(row);
                    itemCategoryTable = $('table.itemCategoryTable-Class').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    itemCategoryTable.buttons().container()
                            .appendTo('#itemCategoryTableId_wrapper .col-md-6:eq(0)');
                } else {
                    $('#itemCategoryTableId thead tr').clone(true).appendTo('#itemCategoryTableId thead');
                    $('#itemCategoryTableId thead tr:eq(1) th').each(function (i) {
                        $('#itemCategoryTableId thead tr:eq(0) th').addClass("table-header-color");
                        var title = $(this).text();
                        if (title === '') {
                            $(this).html('');
                        } else {
                            $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                        }
                        $('input', this).on('keyup change', function () {
                            if (itemCategoryTable.column(i).search() !== this.value) {
                                itemCategoryTable
                                        .column(i)
                                        .search(this.value)
                                        .draw();
                            }
                        });
                    });
                    itemCategoryTable = $('table.itemCategoryTable-Class').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    itemCategoryTable.buttons().container()
                            .appendTo('#itemCategoryTableId_wrapper .col-md-6:eq(0)');
                }
            }
        });
    }

    $("#IncoTermsPart1").click(function () {
        $("#incoTermsModal").modal("show");
        getAllMasterIncoTerms();
    });
    var currentPrLineRow;
    var prAccAss = '';
    var lobiboxNotifyAlert = null;
    $("#contractItemTableId").on("click", ".materialCodeClass", function() {
        currentPrLineRow = $(this).parent();
 var accAsgn = "";
        var errorMsg = "";
        accAsgn = $(this).parent().parent().find("td").children(".accountAssignmentClass").val();
        prAccAss = accAsgn;

        console.log("prAccAss :" + prAccAss);
        console.log("accAsgn :" + accAsgn);

        if (accAsgn === "") {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            errorMsg = "Please select Account Assignment!";
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $("#overlay").css("display", "none");
            $(this).parent().parent().find("td").eq(2).children(".accountAssignmentClass").focus();
            return false;
        }
        

        $("#overlay").css("display", "block");
        $("#lastMatSno").val("");
        $("#materialRecordCount").val("");
        $("#materialCodeShortText_SearchText").val("");

        setTimeout(function() {
            getMaterialMaster(prAccAss);
            $("#overlay").css("display", "none");
            $("#materialMasterModal").modal("show");
        }, 1000);
    });
    
    var material = null;
    function getMaterialMaster(accAsgn) {

        console.log("accAsgn :" + accAsgn);
        $.ajax({
            type: "GET",
            url: "poajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "getMasterMaterialGeneralByAccAsgnAndCoCode",
                "accAsgn": accAsgn,
             //   "companyCode": $("#companycodeHeader").val(),
                "companyCode": "0640",
                "recordCount": "100",
                "materialCodeOrShortText": $("#materialCodeShortText_SearchText").val(),
                "lastMatSno": $("#lastMatSno").val()
            },
            complete: function(responseJson) {
                var jsonArr = $.parseJSON(responseJson.responseText);
                jsonArr = JSON.parse(JSON.stringify(jsonArr));
                console.log("Obj length :" + jsonArr.length);

                var materialRecordCount = $("#materialRecordCount").val();
                if (materialRecordCount === "")
                {
                    materialRecordCount = 100;
                }
                if (materialRecordCount === "All")
                {
                    $("#searchMaterialCodePrevBtn").prop("disabled", true);
                    $("#searchMaterialCodeNextBtn").prop("disabled", true);
                }
                else
                {
                    $("#searchMaterialCodePrevBtn").prop("disabled", false);
                    $("#searchMaterialCodeNextBtn").prop("disabled", false);
                }

                if (materialRecordCount !== "All")
                {
                    if (jsonArr.length < Number(materialRecordCount))
                    {
                        $("#searchMaterialCodeNextBtn").prop("disabled", true);
                    }
                    else
                    {
                        $("#searchMaterialCodePrevBtn").prop("disabled", false);
                        $("#searchMaterialCodeNextBtn").prop("disabled", false);
                    }
                }
                var row = "";
                for (var i = 0; i < jsonArr.length; i++) {
                    console.log(jsonArr[i])
                    row += "<tr class='materialMasterTableTrClass'>"
                            + "<td><input type='hidden' class='materialSno' value='" + (jsonArr[i].sno === undefined ? "" : jsonArr[i].sno) + "'><input type='hidden' class='materialGLCode' value='" + (jsonArr[i].GLCode === undefined ? "" : jsonArr[i].GLCode) + "'><input type='hidden' class='materialZGLCode' value='" + (jsonArr[i].ZGLCode === undefined ? "" : jsonArr[i].ZGLCode) + "'>" + (jsonArr[i].materialCode === undefined ? "" : jsonArr[i].materialCode) + "</td>"
                            + "<td>" + (jsonArr[i].companyCode === undefined ? "" : jsonArr[i].companyCode) + "</td>"
                            + "<td>" + (jsonArr[i].plantCode === undefined ? "" : jsonArr[i].plantCode) + "</td>"
                            + "<td>" + (jsonArr[i].shortText === undefined ? "" : jsonArr[i].shortText) + "</td>"
                            + "<td>" + "<a href='#' class='matlLongTextClass' title='Long Text' data-toggle='tooltip' data-placement='auto'>\n\
                                <i class='fa fa-file' aria-hidden='true'></i>\n\
                                </a><input type='hidden' name='longTextHiddenClass' class='longTextHiddenClass' value='" + (jsonArr[i].longText === undefined ? "" : jsonArr[i].longText) + "'>"
                            + "</td>"
                            + "<td>" + (jsonArr[i].storageLocation === undefined ? "" : jsonArr[i].storageLocation) + "</td>"
                            + "<td>" + (jsonArr[i].purchaseGroup === undefined ? "" : jsonArr[i].purchaseGroup) + "</td>"
                            + "<td>" + (jsonArr[i].materialGroup === undefined ? "" : jsonArr[i].materialGroup) + "</td>"
                            + "<td>" + (jsonArr[i].baseUOM === undefined ? "" : jsonArr[i].baseUOM) + "</td>"
                            + "<td>" + (jsonArr[i].UOMStore === undefined ? "" : jsonArr[i].UOMStore) + "</td>"
                            + "<td>" + (jsonArr[i].oldMaterialNo === undefined ? "" : jsonArr[i].oldMaterialNo) + "</td>"
                            + "<td>" + (jsonArr[i].valuePrice === undefined ? "" : jsonArr[i].valuePrice) + "</td>"
                            + "<td>" + (jsonArr[i].countryOfOrigin === undefined ? "" : jsonArr[i].countryOfOrigin) + "</td>"
                            + "<td>" + (jsonArr[i].priceunit === undefined ? "" : jsonArr[i].priceunit) + "</td>"
                            + "<td>" + (jsonArr[i].GLCode === undefined ? "" : jsonArr[i].GLCode) + "</td>"
                            + "<td>" + (jsonArr[i].ZGLCode === undefined ? "" : jsonArr[i].ZGLCode) + "</td>"
                            + "</tr>";

                    if (i === 0)
                    {
                        $("#firstMatSno").val(jsonArr[i].sno);
                    }
                    if (i === jsonArr.length - 1)
                    {
                        $("#lastMatSno").val(jsonArr[i].sno);
                    }
                }
                $("#materialMasterTable").append(row);
                if ($.fn.DataTable.isDataTable('#materialMasterTable')) {
                    material.destroy();
                    material = null;
                    $("#materialMasterTable").children('tbody').html(row);
                    material = $('table.materialMasterTable ').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    material.buttons().container()
                            .appendTo('#materialMasterTable_wrapper .col-md-6:eq(0)');
                } else {
                    $('#materialMasterTable thead tr').clone(true).appendTo('#materialMasterTable thead');
                    $('#materialMasterTable thead tr:eq(1) th').each(function(i) {
                        $('#materialMasterTable thead tr:eq(0) th').addClass("table-header-color");
                        var title = $(this).text();
                        if (title === '') {
                            $(this).html('');
                        } else {
                            $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                        }
                        $('input', this).on('keyup change', function() {
                            if (material.column(i).search() !== this.value) {
                                material
                                        .column(i)
                                        .search(this.value)
                                        .draw();
                            }
                        });
                    });
                    material = $('table.materialMasterTable').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    material.buttons().container()
                            .appendTo('#materialMasterTable_wrapper .col-md-6:eq(0)');
                }
            }
        });
    }
    
    $("#materialMasterTable").on("click", ".materialMasterTableTrClass", function() {
        
        var code = $(this).find("td").eq(0).text();
        var shortText = $(this).find("td").eq(3).text();
        var longText = $(this).find("td").eq(4).children(".longTextHiddenClass").val();
        var uom = $(this).find("td").eq(8).text();
        var stLoc = $(this).find("td").eq(5).text();
        var matlGroup = $(this).find("td").eq(7).text();
        var glCode = $(this).find("td").eq(0).children(".materialGLCode").val();
        var zglCode = $(this).find("td").eq(0).children(".materialZGLCode").val();
        var plant = $(this).find("td").eq(2).text();
         var perUnit = $(this).find("td").eq(13).text();
       // var accountCategory = $("#accountAssignmentCategory").val();
        var storageLoc = $(this).find("td").eq(5).text();
        $("#materialGlCode").val(glCode);
        $("#materialZGlCode").val(zglCode);
        var prType = $("#prType").val();
        var category = $("#accountAssignmentCategory").val();
        if (category === "Z") {
            $("#gLAccount").val(zglCode);
            $("#accAsgnCommItemInput").val(zglCode);
            if (prType === "Service") {
                $("#gLAccountService").val(zglCode);
                $("#CommItemServiceInput").val(zglCode);

            }
        } else if (category !== "A") {
            $("#gLAccount").val(glCode);
            $("#accAsgnCommItemInput").val(glCode);
            if (prType === "Service") {
                $("#gLAccountService").val(glCode);
                $("#CommItemServiceInput").val(glCode);
               
            }
        }


         currentPrLineRow.parent().parent().find("td").children(".materialCodeClass").css("border-color", "");
        currentPrLineRow.parent().parent().find("td").children(".materialCodeClass").val(code);
        currentPrLineRow.parent().parent().find("td").children(".shortTextClass").val(shortText);
        currentPrLineRow.parent().parent().find("td").children(".matlLongtxtClass").val(longText);
        currentPrLineRow.parent().parent().find("td").children(".uomClass").val(uom);
        currentPrLineRow.parent().parent().find("td").children(".orderPriUnClass").val(uom);
        currentPrLineRow.parent().parent().find("td").children(".SlocClass").val(stLoc);
        currentPrLineRow.parent().parent().find("td").children(".materialGrpClass").val(matlGroup);
        currentPrLineRow.parent().parent().find("td").children(".materialGrpClass").css("border-color", "");
        currentPrLineRow.parent().parent().find("td").children(".hgLAccountClass").val(glCode);
        currentPrLineRow.parent().parent().find("td").children(".hzgLAccountClass").val(zglCode);
        currentPrLineRow.parent().parent().find("td").children(".plantClass").val(plant);
        currentPrLineRow.parent().parent().find("td").children(".SlocClass").val(storageLoc);
        currentPrLineRow.parent().parent().find("td").children(".perUnitClass").val(perUnit);
        
//        $("#Plant").val(plant);
//        $("#pOUnit").val(uom);
//        $("#pOUnitSKU").val(uom);
//        $("#unitOrderUnit").val(uom);
//        $("#unitOrderUnit2").val(uom);
//        $("#unitOrderPriceUnit").val(uom);
//        $("#unitSKUUnit").val(uom);
//        $("#MaterialPOText").val(shortText);
        $("#materialMasterModal").modal("hide");
//        $("#conditionTableIdLineLevel tbody tr").each(function() {
//            $(this).find("td").eq(7).children(".UoMLineLevel").val(uom);
//            $(this).find("td").eq(6).children(".ConditionPricingUnitLineLevel").val(uom);
//        });
//        $("#conditionTableId tbody tr").each(function() {
//            $(this).find("td").eq(7).children(".UoMHeader").val(uom);
//            $(this).find("td").eq(6).children(".ConditionPricingUnitHeader").val(uom);
//        });
        
    });
//    var currentQtyTR;
//    $("#contractItemTableId").on("click", ".targQtyClass", function () {
//       currentQtyTR = $(this).parent()
//       var perUnit=currentQtyTR.parent().parent().find("td").children(".perUnitClass").val();
//        getAllMasterPlant();
//    });
    
    var currentPlantTR;
    $("#contractItemTableId").on("click", ".plantClass", function () {
        $("#PlantModal").modal("show");
        currentPlantTR = $(this).parent()
        getAllMasterPlant();
    });
    
    var plantTable = '';
    function getAllMasterPlant() {

        $.ajax({
            type: "GET",
            url: "doajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "getAllMasterPlant"
            },
            complete: function (responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log("Obj lengtth :" + obj.length);
                var row = "";
                for (var i = 0; i < obj.length; i++) {
                    row += "<tr class='plantTrClass'>  "
//                            + "<td><input type='checkbox' class='checkRefDocTableClass'></td>"
                            + "<td>" + obj[i].PLANT + "</td>"
                            + "<td>" + obj[i].DESCRIPTION + "</td>"
                            + "</tr>";
                }
                $("#plantTableId tbody tr").remove();
                $("#plantTableId tbody").append(row);
                if ($.fn.DataTable.isDataTable('#plantTableId')) {
                    plantTable.destroy();
                    plantTable = null;
                    $("#plantTableId").children('tbody').html(row);
                    plantTable = $('table.plantTableClass').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    plantTable.buttons().container()
                            .appendTo('#plantTableId_wrapper .col-md-6:eq(0)');
                } else {
                    $('#plantTableId thead tr').clone(true).appendTo('#plantTableId thead');
                    $('#plantTableId thead tr:eq(1) th').each(function (i) {
                        $('#plantTableId thead tr:eq(0) th').addClass("table-header-color");
                        var title = $(this).text();
                        if (title === '') {
                            $(this).html('');
                        } else {
                            $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                        }
                        $('input', this).on('keyup change', function () {
                            if (plantTable.column(i).search() !== this.value) {
                                plantTable
                                        .column(i)
                                        .search(this.value)
                                        .draw();
                            }
                        });
                    });
                    plantTable = $('table.plantTableClass').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    plantTable.buttons().container()
                            .appendTo('#plantTableId_wrapper .col-md-6:eq(0)');
                }
            }
        });
    }

    var incoTerms = null;
    function getAllMasterIncoTerms() {
        $.ajax({
            type: "GET",
            url: "standalonepoajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "getAllMasterIncoTerms"
            },
            complete: function (responseJson) {
                var jsonArr = $.parseJSON(responseJson.responseText);
                jsonArr = JSON.parse(JSON.stringify(jsonArr));
                console.log("Obj length :" + jsonArr.length);
                var row = "";
                for (var i = 0; i < jsonArr.length; i++) {
                    row += "<tr class='incoTermsTrClass'>"
                            + "<td>" + jsonArr[i].incoterms + "</td>"
                            + "<td>" + jsonArr[i].incotermsDesc + "</td>"
                            + "</tr>";
                }
                $("#incoTermsTable tbody tr").remove();
                $("#incoTermsTable tbody").append(row);
                if ($.fn.DataTable.isDataTable('#incoTermsTable')) {
                    incoTerms.destroy();
                    incoTerms = null;
                    $("#incoTermsTable").children('tbody').html(row);
                    incoTerms = $('table.incoTermsTable').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    incoTerms.buttons().container()
                            .appendTo('#incoTermsTable_wrapper .col-md-6:eq(0)');
                } else {
                    $('#incoTermsTable thead tr').clone(true).appendTo('#incoTermsTable thead');
                    $('#incoTermsTable thead tr:eq(1) th').each(function (i) {
                        $('#incoTermsTable thead tr:eq(0) th').addClass("table-header-color");
                        var title = $(this).text();
                        if (title === '') {
                            $(this).html('');
                        } else {
                            $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                        }
                        $('input', this).on('keyup change', function () {
                            if (incoTerms.column(i).search() !== this.value) {
                                incoTerms
                                        .column(i)
                                        .search(this.value)
                                        .draw();
                            }
                        });
                    });
                    incoTerms = $('table.incoTermsTable').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    incoTerms.buttons().container()
                            .appendTo('#incoTermsTable_wrapper .col-md-6:eq(0)');
                }
            }
        });
    }
    // $("#serviceTableId").on("click", ".ServicesNumber_Services", function() {
    var serviceTabClick;
//   $(".ServiceNumberClass").click(function () {
    $("#contractServiceTableId").on("click", ".ServiceNumberClass", function () {
        $("#ServiceNumberModal").modal("show");
        getAllServiceMaster();
        serviceTabClick = $(this);
    });

    var serviceNumberTable = null;
    function getAllServiceMaster() {
        var materialGroup = "";
         $("#contractItemTableId tbody tr").each(function () {
            var itemNumber = $(this).find("td").children(".lineItemNumberServices").val();
            var dropDownItemNumber = $(".ItemNumberSelectClass").val();
            if (dropDownItemNumber === itemNumber) {
                materialGroup = $(this).find("td").children(".materialGrpClass").val();
            }
        });
        $.ajax({
            type: "GET",
            url: "doajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "getServiceMasterByMaterialGroup",
                "materialGroup": materialGroup
            },
            complete: function (responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log("Obj length :" + obj.length);
                var row = "";
                for (var i = 0; i < obj.length; i++) {
                    row += "<tr class='serviceNumberTrClass'>"
                            //  + "<td><input type='checkbox' class='serviceNumberTableCheckboxClass'></td>"
                            + "<td>" + obj[i].ACTIVITY_NUMBER + "</td>"
                            + "<td>" + obj[i].ShortText + "</td>"
                            + "<td style='display: none;'>" + obj[i].UOM + "</td>"
                            + "</tr>";
                }
                $("#serviceNumberTableId tbody tr").remove();
                $("#serviceNumberTableId tbody").append(row);
                if ($.fn.DataTable.isDataTable('#serviceNumberTableId')) {
                    serviceNumberTable.destroy();
                    serviceNumberTable = null;
                    $("#serviceNumberTableId").children('tbody').html(row);
                    serviceNumberTable = $('table.serviceNumberTableClass').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    serviceNumberTable.buttons().container()
                            .appendTo('#serviceNumberTableId_wrapper .col-md-6:eq(0)');
                } else {
                    $('#serviceNumberTableId thead tr').clone(true).appendTo('#serviceNumberTableId thead');
                    $('#serviceNumberTableId thead tr:eq(1) th').each(function (i) {
                        $('#serviceNumberTableId thead tr:eq(0) th').addClass("table-header-color");
                        var title = $(this).text();
                        if (title === '') {
                            $(this).html('');
                        } else {
                            $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                        }
                        $('input', this).on('keyup change', function () {
                            if (serviceNumberTable.column(i).search() !== this.value) {
                                serviceNumberTable
                                        .column(i)
                                        .search(this.value)
                                        .draw();
                            }
                        });
                    });
                    serviceNumberTable = $('table.serviceNumberTableClass').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    serviceNumberTable.buttons().container()
                            .appendTo('#serviceNumberTableId_wrapper .col-md-6:eq(0)');
                }
            }
        });
    }

    $("#updatecontractrfqdetailsform").submit(function (e) {
//        alert('submit intercepted');
        e.preventDefault();

        Lobibox.confirm({
            msg: "Are you sure you want to update RFQ?",
            callback: function (lobibox, type) {
                console.log("type: " + type);
                if (type === 'yes')
                {
                    console.log("ok 1");
                    e.currentTarget.submit();
                    console.log("ok 2");
//                    return true;
                } else if (type === 'no')
                {
                    console.log("no");
//                    return false;
                }
            }
        });
//        return false;
    });

    //Girivasu
//    var current_td;
//
//$("#contractItemTableId").on("click", ".accountAssignmentClass", function() {
//        $("#accountAssignmentCategoryModal").modal("show");
//        current_td = $(this).parent();
//    });
//    var currentTd;
//   $("#contractItemTableId").on("click",".itemCategoryClass",function () {
//      
//        $("#itemCategoryModal").modal("show");
//        currentTd = $(this).parent();
//        
//    });


    $("#accountAssignmentCategoryTableId").on("click", ".accountAssignmentCategoryTable-btn", function () {
        var accountAssignmentCategory = $(this).find("td").eq(0).html();

        current_td.children(".accountAssignmentClass").val(accountAssignmentCategory);
        $("#accountAssignmentCategoryModal").modal("hide");
    });

    // $(".incoTermsTrClass").click(function () {
    $("#incoTermsTable").on("click", ".incoTermsTrClass", function () {
        var incoTerms = $(this).find("td").eq(0).html();
        $("#IncoTermsPart1").val(incoTerms);
        $("#incoTermsModal").modal("hide");
    });


    $("#itemCategoryTableId").on("click", ".itemCategoryModalTableTrClass", function () {
        var itemCat = $(this).find("td").eq(0).html();
        currentTd.children(".itemCategoryClass").val(itemCat);

        $("#itemCategoryModal").modal("hide");
    });



    $("#MatlGroupTableId").on("click", ".checkMaterialGroupTableClass", function () {
        var matGrp = $(this).find("td").eq(0).html();
        currentMaterialTR.children(".materialGrpClass").val(matGrp);

        $("#MatlGroupModal").modal("hide");
    });
    $("#plantTableId").on("click", ".plantTrClass", function () {
        var plant = $(this).find("td").eq(0).html();
        currentPlantTR.children(".plantClass").val(plant);

        $("#PlantModal").modal("hide");
    });

    $("#serviceNumberTableId").on("click", ".serviceNumberTrClass", function () {
        var service = $(this).find("td").eq(0).html();
        var shortText = $(this).find("td").eq(1).html();
        var uom = $(this).find("td").eq(2).html();
        serviceTabClick.parent().parent().find("td").children(".ServiceNumberClass").val(service);
        serviceTabClick.parent().parent().find("td").children(".ShortTextClass").val(shortText);
        serviceTabClick.parent().parent().find("td").children(".UnitClass").val(uom);

        $("#ServiceNumberModal").modal("hide");
    });
    $("#accountAssignmentAddBtn").click(function () {
        $("#accountAssignmentModal").modal("show");
        
        var accountAssignmentCategory;
         var selectedItem = $('#ItemNumberSelect').val();
    $("#contractItemTableId tbody tr").each(function () {
        var conTableItemNumber = $(this).find("td").children(".lineItemNumberServices").val();
        if (conTableItemNumber === selectedItem) {
            accountAssignmentCategory = $(this).find("td").children(".accountAssignmentClass").val();
        }
    });
        
        if (accountAssignmentCategory === 'K') {
                    service_AccAsgnCat_K("serviceTableCheckBox");
                } else if (accountAssignmentCategory === 'N') {
                    service_AccAsgnCat_N("serviceTableCheckBox");
                } else if (accountAssignmentCategory === 'A') {
                    service_AccAsgnCat_A("serviceTableCheckBox");
                } else if (accountAssignmentCategory === 'C') {
                    service_AccAsgnCat_C("serviceTableCheckBox");
                } else if (accountAssignmentCategory === 'F') {
                    service_AccAsgnCat_F("serviceTableCheckBox");
                } else if (accountAssignmentCategory === 'P') {
                    service_AccAsgnCat_P("serviceTableCheckBox");
                } else if (accountAssignmentCategory === 'R') {
                    service_AccAsgnCat_R("serviceTableCheckBox");
                } else if (accountAssignmentCategory === 'X') {
                    service_AccAsgnCat_X("serviceTableCheckBox");
                } else if (accountAssignmentCategory === 'Z') {
                    service_AccAsgnCat_Z("serviceTableCheckBox");
                }
      //  hideServiceAccAsgnField("AccAsgnModel");
      //  showFieldBasedAssAsgnCat_K();
        // $("#serviceTebAccAsgnReqFrom").val("InputFields");
    });
    
    function service_AccAsgnCat_A(reqFrom) {
        hideServiceAccAsgnField(reqFrom);
        showFieldBasedAssAsgnCat_A();
    }
    function service_AccAsgnCat_C(reqFrom) {
        hideServiceAccAsgnField(reqFrom);
        showFieldBasedAssAsgnCat_C();
    }
    function service_AccAsgnCat_F(reqFrom) {
        hideServiceAccAsgnField(reqFrom);
        showFieldBasedAssAsgnCat_F();
    }
    function service_AccAsgnCat_K(reqFrom) {
        hideServiceAccAsgnField(reqFrom);
        showFieldBasedAssAsgnCat_K();
    }
    function service_AccAsgnCat_N(reqFrom) {
        hideServiceAccAsgnField(reqFrom);
        showFieldBasedAssAsgnCat_N();
    }
    function service_AccAsgnCat_P(reqFrom) {
        hideServiceAccAsgnField(reqFrom);
        showFieldBasedAssAsgnCat_P();
    }
    function service_AccAsgnCat_R(reqFrom) {
        hideServiceAccAsgnField(reqFrom);
        showFieldBasedAssAsgnCat_R();
    }
    function service_AccAsgnCat_X(reqFrom) {
        hideServiceAccAsgnField(reqFrom);
        showFieldBasedAssAsgnCat_X();
    }
    function service_AccAsgnCat_Z(reqFrom) {

        hideServiceAccAsgnField(reqFrom);
        showFieldBasedAssAsgnCat_Z();
    }
       function showFieldBasedAssAsgnCat_A() {

        $("#WBSElementInputService").prop("disabled", true);
        $("#gLAccountService").prop("disabled", true);
        $("#gLAccountServiceLabel").css({"margin-left": "10px"});
        $("#gLAccountService").css({"margin-left": "10px"});
        $("#coAreaServiceLabel").css({"margin-left": "10px"});
        $("#coAreaService").css({"margin-left": "10px"});
        $("#companyCodeServiceLabel").css({"margin-left": "10px"});
        $("#companyCodeService").css({"margin-left": "30px"});
        $("#serviceOrderLabel").css({"display": "inline", "margin-left": "10px"});
        $("#OrderService").css({"display": "inline", "margin-left": "45px"});
        $("#AssetServiceLabel").css({"display": "inline", "margin-left": "10px"});
        $("#AssetService").css({"display": "inline", "margin-left": "30px"});
        $("#wBSElementServiceLabel").css({"display": "inline", "margin-left": "10px"});
        $("#WBSElementInputService").css({"display": "inline", "margin-left": "10px"});
        $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
            $(this).find("td").eq(5).css("display", "none");
            $(this).find("td").eq(6).css("display", "none");
            $(this).find("td").eq(7).css("display", "none");
            $(this).find("td").eq(8).css("display", "none");
            $(this).find("td").eq(9).css("display", "none");
            $(this).find("td").eq(13).css("display", "none");
            $(this).find("td").eq(14).css("display", "none");
            $(this).find("td").eq(15).css("display", "none");
            $(this).find("td").eq(16).css("display", "none");
            $(this).find("td").eq(3).children(".serviceAccAsgnTblGLAccount").prop("disabled", "true");
            $(this).find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
            $(this).find("td").eq(12).children(".serviceAccAsgnTblWBSElement").prop("disabled", "true");
        });
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(5).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(6).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(7).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(8).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(9).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(13).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(14).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(15).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(16).css("display", "none");
    }
    function showFieldBasedAssAsgnCat_C() {
        $("#gLAccountServiceLabel").css({"margin-left": "10px"});
        $("#gLAccountService").css({"margin-left": "10px"});
        $("#coAreaServiceLabel").css({"margin-left": "10px"});
        $("#coAreaService").css({"margin-left": "35px"});
        $("#companyCodeServiceLabel").css({"margin-left": "10px"});
        $("#companyCodeService").css({"margin-left": "10px"});
        $("#SalesOrderServiceLabel").css({"display": "inline", "margin-left": "10px"});
        $("#SalesOrderService").css({"display": "inline", "margin-left": "10px"});
        $("#ItemNumServiceLabel").css({"display": "inline", "margin-left": "10px"});
        $("#ItemNumberService").css({"display": "inline", "margin-left": "10px"});
        $("#DelivSchServiceLabel").css({"display": "inline", "margin-left": "10px"});
        $("#DelivSchService").css({"display": "inline", "margin-left": "30px"});
        $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
            $(this).find("td").eq(5).css("display", "none");
            $(this).find("td").eq(6).css("display", "none");
            $(this).find("td").eq(7).css("display", "none");
            $(this).find("td").eq(8).css("display", "none");
            $(this).find("td").eq(9).css("display", "none");
            $(this).find("td").eq(10).css("display", "none");
            $(this).find("td").eq(11).css("display", "none");
            $(this).find("td").eq(12).css("display", "none");
            $(this).find("td").eq(14).css("display", "none");
            $(this).find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
        });
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(5).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(6).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(7).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(8).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(9).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(10).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(11).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(12).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(14).css("display", "none");
    }
    function showFieldBasedAssAsgnCat_F() {
        $("#gLAccountServiceLabel").css({"margin-left": "10px"});
        $("#gLAccountService").css({"margin-left": "30px"});
        $("#coAreaServiceLabel").css({"margin-left": "10px"});
        $("#coAreaService").css({"margin-left": "10px"});
        $("#companyCodeServiceLabel").css({"margin-left": "10px"});
        $("#companyCodeService").css({"margin-left": "10px"});
        $("#CostCenterServiceLabel").css({"display": "inline", "margin-left": "10px"});
        $("#costCenterService").css({"display": "inline", "margin-left": "30px"});
        $("#serviceOrderLabel").css({"display": "inline", "margin-left": "10px"});
        $("#OrderService").css({"display": "inline", "margin-left": "25px"});
        $("#FundServiceLabel").css({"display": "inline", "margin-left": "10px"});
        $("#fundService").css({"display": "inline", "margin-left": "45px"});
        $("#functionalAreaServiceLabel").css({"display": "inline", "margin-left": "10px", "margin-top": "15px"});
        $("#functionalAreaService").css({"display": "inline", "margin-left": "10px"});
        $("#FundCenterServiceLabel").css({"display": "inline", "margin-left": "10px"});
        $("#FundCenterServiceInput").css({"display": "inline", "margin-left": "22px"});
        $("#CommItemServiceLabel").css({"display": "inline", "margin-left": "50px"});
        $("#CommItemServiceInput").css({"display": "inline", "margin-left": "10px"});
        $("#fundService").prop("disabled", true);
        $("#functionalAreaService").prop("disabled", true);
        $("#FundCenterServiceInput").prop("disabled", true);
        $("#CommItemServiceInput").prop("disabled", true);
        $("#fundService").after("<br><br/>");
        $("#functionalAreaService").after("<br><br/>");
        $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
            $(this).find("td").eq(11).css("display", "none");
            $(this).find("td").eq(12).css("display", "none");
            $(this).find("td").eq(13).css("display", "none");
            $(this).find("td").eq(14).css("display", "none");
            $(this).find("td").eq(15).css("display", "none");
            $(this).find("td").eq(16).css("display", "none");
            $(this).find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
            $(this).find("td").eq(6).children(".serviceAccAsgnTblFund").prop("disabled", "true");
            $(this).find("td").eq(7).children(".serviceAccAsgnTblFunctionalArea").prop("disabled", "true");
            $(this).find("td").eq(8).children(".serviceAccAsgnTblFundCenter").prop("disabled", "true");
            $(this).find("td").eq(9).children(".serviceAccAsgnTblCommitmentItem").prop("disabled", "true");
        });
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(11).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(12).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(13).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(14).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(15).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(16).css("display", "none");
    }

    function showFieldBasedAssAsgnCat_K() {
        $("#gLAccountServiceLabel").css({"margin-left": "10px"});
        $("#gLAccountService").css({"margin-left": "30px"});
        $("#coAreaServiceLabel").css({"margin-left": "10px"});
        $("#coAreaService").css({"margin-left": "10px"});
        $("#companyCodeServiceLabel").css({"margin-left": "10px"});
        $("#companyCodeService").css({"margin-left": "35px"});
        $("#CostCenterServiceLabel").css({"display": "inline", "margin-left": "10px"});
        $("#costCenterService").css({"display": "inline", "margin-left": "30px"});
        $("#FundServiceLabel").css({"display": "inline", "margin-left": "10px"});
        $("#fundService").css({"display": "inline", "margin-left": "30px"});
        $("#functionalAreaServiceLabel").css({"display": "inline", "margin-left": "10px", "margin-top": "15px"});
        $("#functionalAreaService").css({"display": "inline", "margin-left": "10px"});
        $("#FundCenterServiceLabel").css({"display": "inline", "margin-left": "10px"});
        $("#FundCenterServiceInput").css({"display": "inline", "margin-left": "22px"});
        $("#CommItemServiceLabel").css({"display": "inline", "margin-left": "10px"});
        $("#CommItemServiceInput").css({"display": "inline", "margin-left": "45px"});
        $("#gLAccountService").prop("disabled", true);
        $("#fundService").prop("disabled", true);
        $("#functionalAreaService").prop("disabled", true);
        $("#FundCenterServiceInput").prop("disabled", true);
        $("#CommItemServiceInput").prop("disabled", true);
        $("#functionalAreaService").after("<br><br/>");
        $("#FundCenterServiceInput").after("<br><br/>");
        $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
            $(this).find("td").eq(10).css("display", "none");
            $(this).find("td").eq(11).css("display", "none");
            $(this).find("td").eq(12).css("display", "none");
            $(this).find("td").eq(13).css("display", "none");
            $(this).find("td").eq(14).css("display", "none");
            $(this).find("td").eq(15).css("display", "none");
            $(this).find("td").eq(16).css("display", "none");
            $(this).find("td").eq(3).children(".serviceAccAsgnTblGLAccount").prop("disabled", "true");
            $(this).find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
            $(this).find("td").eq(6).children(".serviceAccAsgnTblFund").prop("disabled", "true");
            $(this).find("td").eq(7).children(".serviceAccAsgnTblFunctionalArea").prop("disabled", "true");
            $(this).find("td").eq(8).children(".serviceAccAsgnTblFundCenter").prop("disabled", "true");
            $(this).find("td").eq(9).children(".serviceAccAsgnTblCommitmentItem").prop("disabled", "true");
        });
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(10).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(11).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(12).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(13).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(14).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(15).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(16).css("display", "none");
    }
    function showFieldBasedAssAsgnCat_N() {
        $("#gLAccountServiceLabel").css({"margin-left": "10px"});
        $("#gLAccountService").css({"margin-left": "30px"});
        $("#coAreaServiceLabel").css({"margin-left": "10px"});
        $("#coAreaService").css({"margin-left": "20px"});
        $("#companyCodeServiceLabel").css({"margin-left": "10px"});
        $("#companyCodeService").css({"margin-left": "35px"});
        $("#CostCenterServiceLabel").css({"display": "inline", "margin-left": "10px"});
        $("#costCenterService").css({"display": "inline", "margin-left": "30px"});
        $("#NActNumServiceLabel").css({"display": "inline", "margin-left": "10px"});
        $("#NActNumServiceInput").css({"display": "inline", "margin-left": "10px"});
        $("#costCenterService").prop("disabled", true);
        $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
            $(this).find("td").eq(6).css("display", "none");
            $(this).find("td").eq(7).css("display", "none");
            $(this).find("td").eq(8).css("display", "none");
            $(this).find("td").eq(9).css("display", "none");
            $(this).find("td").eq(10).css("display", "none");
            $(this).find("td").eq(11).css("display", "none");
            $(this).find("td").eq(12).css("display", "none");
            $(this).find("td").eq(13).css("display", "none");
            $(this).find("td").eq(15).css("display", "none");
            $(this).find("td").eq(16).css("display", "none");
            $(this).find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
            $(this).find("td").eq(5).children(".serviceAccAsgnTblCostCetner").prop("disabled", "true");
        });
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(6).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(7).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(8).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(9).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(10).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(11).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(12).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(13).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(15).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(16).css("display", "none");
    }
    function showFieldBasedAssAsgnCat_P() {
        $("#gLAccountServiceLabel").css({"margin-left": "10px"});
        $("#gLAccountService").css({"margin-left": "25px"});
        $("#coAreaServiceLabel").css({"margin-left": "10px"});
        $("#coAreaService").css({"margin-left": "20px"});
        $("#companyCodeServiceLabel").css({"margin-left": "10px"});
        $("#companyCodeService").css({"margin-left": "35px"});
        $("#wBSElementServiceLabel").css({"display": "inline", "margin-left": "10px"});
        $("#WBSElementInputService").css({"display": "inline", "margin-left": "10px"});
        $("#NActNumServiceLabel").css({"display": "inline", "margin-left": "10px"});
        $("#NActNumServiceInput").css({"display": "inline", "margin-left": "10px"});
        $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
            $(this).find("td").eq(5).css("display", "none");
            $(this).find("td").eq(6).css("display", "none");
            $(this).find("td").eq(7).css("display", "none");
            $(this).find("td").eq(8).css("display", "none");
            $(this).find("td").eq(9).css("display", "none");
            $(this).find("td").eq(10).css("display", "none");
            $(this).find("td").eq(11).css("display", "none");
            $(this).find("td").eq(13).css("display", "none");
            $(this).find("td").eq(15).css("display", "none");
            $(this).find("td").eq(16).css("display", "none");
            $(this).find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
        });
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(5).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(6).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(7).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(8).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(9).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(10).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(11).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(13).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(15).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(16).css("display", "none");
    }
    function showFieldBasedAssAsgnCat_R() {
        $("#gLAccountServiceLabel").css({"margin-left": "10px"});
        $("#gLAccountService").css({"margin-left": "20px"});
        $("#coAreaServiceLabel").css({"margin-left": "10px"});
        $("#coAreaService").css({"margin-left": "30px"});
        $("#companyCodeServiceLabel").css({"margin-left": "10px"});
        $("#companyCodeService").css({"margin-left": "35px"});
        $("#CostCenterServiceLabel").css({"display": "inline", "margin-left": "10px"});
        $("#costCenterService").css({"display": "inline", "margin-left": "20px"});
        $("#SalesOrderServiceLabel").css({"display": "inline", "margin-left": "10px"});
        $("#SalesOrderService").css({"display": "inline", "margin-left": "10px"});
        $("#ItemNumServiceLabel").css({"display": "inline", "margin-left": "10px"});
        $("#ItemNumberService").css({"display": "inline", "margin-left": "25px"});
        $("#DelivSchServiceLabel").css({"display": "inline", "margin-left": "10px"});
        $("#DelivSchService").css({"display": "inline", "margin-left": "43px"});
        $("#FundServiceLabel").css({"display": "inline", "margin-left": "10px"});
        $("#fundService").css({"display": "inline", "margin-left": "50px"});
        $("#functionalAreaServiceLabel").css({"display": "inline", "margin-left": "10px", "margin-top": "15px"});
        $("#functionalAreaService").css({"display": "inline", "margin-left": "10px"});
        $("#FundCenterServiceLabel").css({"display": "inline", "margin-left": "10px"});
        $("#FundCenterServiceInput").css({"display": "inline", "margin-left": "10px"});
        $("#CommItemServiceLabel").css({"display": "inline", "margin-left": "10px"});
        $("#CommItemServiceInput").css({"display": "inline", "margin-left": "33px"});
        $("#ItemNumberService").after("<br><br/>");
        $("#functionalAreaService").after("<br><br/>");
        $("#FundCenterServiceInput").after("<br><br/>");
        $("#fundService").prop("disabled", true);
        $("#functionalAreaService").prop("disabled", true);
        $("#FundCenterServiceInput").prop("disabled", true);
        $("#CommItemServiceInput").prop("disabled", true);
        $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
            $(this).find("td").eq(10).css("display", "none");
            $(this).find("td").eq(11).css("display", "none");
            $(this).find("td").eq(12).css("display", "none");
            $(this).find("td").eq(14).css("display", "none");
            $(this).find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
            $(this).find("td").eq(6).children(".serviceAccAsgnTblFund").prop("disabled", "true");
            $(this).find("td").eq(7).children(".serviceAccAsgnTblFunctionalArea").prop("disabled", "true");
            $(this).find("td").eq(8).children(".serviceAccAsgnTblFundCenter").prop("disabled", "true");
            $(this).find("td").eq(9).children(".serviceAccAsgnTblCommitmentItem").prop("disabled", "true");
        });
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(10).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(11).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(12).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(14).css("display", "none");
    }
    function showFieldBasedAssAsgnCat_X() {
        $("#gLAccountServiceLabel").css({"margin-left": "10px"});
        $("#gLAccountService").css({"margin-left": "10px"});
        $("#coAreaServiceLabel").css({"margin-left": "10px"});
        $("#coAreaService").css({"margin-left": "35px"});
        $("#companyCodeServiceLabel").css({"margin-left": "10px"});
        $("#companyCodeService").css({"margin-left": "28px"});
        $("#CostCenterServiceLabel").css({"display": "inline", "margin-left": "10px"});
        $("#costCenterService").css({"display": "inline", "margin-left": "10px"});
        $("#serviceOrderLabel").css({"display": "inline", "margin-left": "10px"});
        $("#OrderService").css({"display": "inline", "margin-left": "50px"});
        $("#wBSElementServiceLabel").css({"display": "inline", "margin-left": "10px"});
        $("#WBSElementInputService").css({"display": "inline", "margin-left": "10px"});
        $("#SalesOrderServiceLabel").css({"display": "inline", "margin-left": "10px"});
        $("#SalesOrderService").css({"display": "inline", "margin-left": "10px"});
        $("#ItemNumServiceLabel").css({"display": "inline", "margin-left": "10px"});
        $("#ItemNumberService").css({"display": "inline", "margin-left": "10px"});
        $("#DelivSchServiceLabel").css({"display": "inline", "margin-left": "10px"});
        $("#DelivSchService").css({"display": "inline", "margin-left": "45px"});
        $("#WBSElementInputService").after("<br><br/>");
        $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
            $(this).find("td").eq(6).css("display", "none");
            $(this).find("td").eq(7).css("display", "none");
            $(this).find("td").eq(8).css("display", "none");
            $(this).find("td").eq(9).css("display", "none");
            $(this).find("td").eq(11).css("display", "none");
            $(this).find("td").eq(14).css("display", "none");
            $(this).find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
        });
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(6).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(7).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(8).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(9).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(11).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(14).css("display", "none");
    }
    function showFieldBasedAssAsgnCat_Z() {
        $("#gLAccountServiceLabel").css({"margin-left": "10px"});
        $("#gLAccountService").css({"margin-left": "10px"});
        $("#coAreaServiceLabel").css({"margin-left": "10px"});
        $("#coAreaService").css({"margin-left": "10px"});
        $("#companyCodeServiceLabel").css({"margin-left": "10px"});
        $("#companyCodeService").css({"margin-left": "28px"});
        $("#CostCenterServiceLabel").css({"display": "inline", "margin-left": "10px"});
        $("#costCenterService").css({"display": "inline", "margin-left": "10px"});
        $("#serviceOrderLabel").css({"display": "inline", "margin-left": "10px"});
        $("#OrderService").css({"display": "inline", "margin-left": "30px"});
        $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
            $(this).find("td").eq(6).css("display", "none");
            $(this).find("td").eq(7).css("display", "none");
            $(this).find("td").eq(8).css("display", "none");
            $(this).find("td").eq(9).css("display", "none");
            $(this).find("td").eq(11).css("display", "none");
            $(this).find("td").eq(12).css("display", "none");
            $(this).find("td").eq(13).css("display", "none");
            $(this).find("td").eq(14).css("display", "none");
            $(this).find("td").eq(15).css("display", "none");
            $(this).find("td").eq(16).css("display", "none");
            $(this).find("td").eq(4).children(".serviceAccAsgnTblCOArea").prop("disabled", "true");
        });
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(6).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(7).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(8).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(9).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(11).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(12).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(13).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(14).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(15).css("display", "none");
        $("#serviceTabAccAsgnTebleId thead tr").find("th").eq(16).css("display", "none");
    }
    
     function hideServiceAccAsgnField(reqFrom) {

        console.log("reqFrom in hideServiceAccAsgnField :" + reqFrom);
        $("#CostCenterServiceLabel").css("display", "none");
        $("#costCenterService").css("display", "none");
        $("#serviceOrderLabel").css("display", "none");
        $("#OrderService").css("display", "none");
        $("#AssetServiceLabel").css("display", "none");
        $("#AssetService").css("display", "none");
        $("#wBSElementServiceLabel").css("display", "none");
        $("#WBSElementInputService").css("display", "none");
        $("#SalesOrderServiceLabel").css("display", "none");
        $("#SalesOrderService").css("display", "none");
        $("#ItemNumServiceLabel").css("display", "none");
        $("#ItemNumberService").css("display", "none");
        $("#DelivSchServiceLabel").css("display", "none");
        $("#DelivSchService").css("display", "none");
        $("#FundServiceLabel").css("display", "none");
        $("#fundService").css("display", "none");
        $("#functionalAreaServiceLabel").css("display", "none");
        $("#functionalAreaService").css("display", "none");
        $("#FundCenterServiceLabel").css("display", "none");
        $("#FundCenterServiceInput").css("display", "none");
        $("#CommItemServiceLabel").css("display", "none");
        $("#CommItemServiceInput").css("display", "none");
        $("#NActNumServiceLabel").css("display", "none");
        $("#NActNumServiceInput").css("display", "none");
        $("#gLAccountService").prop("disabled", false);
        $("#costCenterService").prop("disabled", false);
        $("#OrderService").prop("disabled", false);
        $("#AssetService").prop("disabled", false);
        $("#WBSElementInputService").prop("disabled", false);
        $("#SalesOrderService").prop("disabled", false);
        $("#ItemNumberService").prop("disabled", false);
        $("#DelivSchService").prop("disabled", false);
        $("#fundService").prop("disabled", false);
        $("#functionalAreaService").prop("disabled", false);
        $("#FundCenterServiceInput").prop("disabled", false);
        $("#FundCenterServiceInput").prop("disabled", false);
        $("#CommItemServiceInput").prop("disabled", false);
        $("#NActNumServiceInput").prop("disabled", false);
        $("#accountAssignmentForm br").remove();
        var rowCount = serviceTabAccAsgnTebleId.rows.length;
        for (var i = rowCount - 1; i >= 0; i--) {
            serviceTabAccAsgnTebleId.deleteRow(i);
        }
        var row;
        row = "<tr><th class='border-0 th-color'>" +
                "</th><th class='border-0 th-color'>" + 'Quant' +
                "</th><th class='border-0 th-color'>" + '%' +
                "</th><th class='border-0 th-color'>" + 'GL A/C' +
                "</th><th class='border-0 th-color'>" + 'CO Area' +
                "</th><th class='border-0 th-color'>" + 'Cost Center' +
                "</th><th class='border-0 th-color'>" + 'Fund' +
                "</th><th class='border-0 th-color'>" + 'Fun Area' +
                "</th><th class='border-0 th-color'>" + 'Fund Center' +
                "</th><th class='border-0 th-color'>" + 'Com Item' +
                "</th><th class='border-0 th-color'>" + 'Order' +
                "</th><th class='border-0 th-color'>" + 'Asset' +
                "</th><th class='border-0 th-color'>" + 'WBS Elements' +
                "</th><th class='border-0 th-color'>" + 'Sales Order' +
                "</th><th class='border-0 th-color'>" + 'Network/Activity Number' +
                "</th><th class='border-0 th-color'>" + 'Item Number' +
                "</th><th class='border-0 th-color'>" + 'Delivery Schedule' +
                "</th></tr>";
        $("#serviceTabAccAsgnTebleId").children("thead").append(row);
        if (reqFrom === "onLoad" || reqFrom === "lineItemTrChange" || reqFrom === "AccAsgnModel") {
            var tdrow = "<tr><td>" + "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblQuantity" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblPercentage" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblGLAccount" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCOArea" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCostCetner" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFund" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFunctionalArea" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFundCenter" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCommitmentItem" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblOrder" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblAssets" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblWBSElement" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblSalesOrder" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblNetActNumber" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblItemNumber" value="">' +
                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblDeliverySchedule" value="">' +
                    "</td></tr>";
            $("#serviceTabAccAsgnTebleId").children("tbody").append(tdrow);
        } else if (reqFrom === "serviceTableCheckBox" || reqFrom === "serviceTableCheckBox") {
            var linkid;
            var serviceLineItemNumber = serviceTabTableCurrentTd.parent().parent().find("td").eq(1).children(".lineItemNumberServices").val();
            console.log("serviceLineItemNumber in service :" + serviceLineItemNumber);
            var PoId = $("#poid").val();
            $("#material_headerClass tbody tr").each(function() {
                var dropDownItemNumber = $("#ItemNumberSelect").val();
                var prTableItemNumber = $(this).find("td").eq(1).html();
                if (prTableItemNumber === dropDownItemNumber) {
                    linkid = $(this).find("td").eq(0).children(".linkid").val();
                }
            });
            getSerAccAssignmentValuesByLinkIDANDPId(linkid, serviceLineItemNumber, PoId);
        }

    }

    
    


function getSerAccAssignmentValuesByLinkIDANDPId(linkid, serviceLineItemNumber, PoId) {
    $.ajax({
        type: "GET",
        url: "poajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "getNGBPCmplxPOCreationLineItemPOAccountAssignmentValuesByLinkIdAndServiceLineItemNumber",
            "linkid": linkid,
            "serviceLineItemNumber": serviceLineItemNumber,
            "PoId": PoId
        },
        complete: function(responseJson) {
            var jsonArr = $.parseJSON(responseJson.responseText);
            jsonArr = JSON.parse(JSON.stringify(jsonArr));
            var tdrow = "";
            if (jsonArr.length > 0) {
                var distribution = jsonArr[0].distribution;
                console.log("distribution in service Account Assignment :" + distribution);
                if (distribution === "") {
                    for (var i = 0; i < jsonArr.length; i++) {
                        console.log("Quantity after save :" + jsonArr[i].quantity);
                        console.log("Distribution Single:" + jsonArr[i].distribution);
                        $("#gLAccountService").val(jsonArr[i].glAccount);
                        $("#coAreaService").val(jsonArr[i].coArea);
                        $("#costCenterService").val(jsonArr[i].costCenter);
                        $("#OrderService").val(jsonArr[i].accOrder);
                        $("#AssetService").val(jsonArr[i].accAsset);
                        $("#WBSElementInputService").val(jsonArr[i].accWBSElement);
                        $("#SalesOrderService").val(jsonArr[i].salesOrder);
                        $("#ItemNumberService").val(jsonArr[i].itemNumber);
                        $("#DelivSchService").val(jsonArr[i].deliverySchedule);
                        $("#fundService").val(jsonArr[i].fund);
                        $("#functionalAreaService").val(jsonArr[i].functionalArea);
                        $("#FundCenterServiceInput").val(jsonArr[i].fundsCentre);
                        $("#CommItemServiceInput").val(jsonArr[i].commitmentItem);
                        $("#NActNumServiceInput").val(jsonArr[i].network);
//                        $("#ServiceLinkNumberId").val(jsonArr[i].LINKNUMBER);
                        //                        $("#ServiceNetValueId").val(jsonArr[i].NETVALUE);

                        ServiceAccountAssignmentArrayIsEmpty();
                    }
                } else if (distribution === "1" || distribution === "2") {
                    //                    $('#accountAssignmentForm').trigger("reset");
                    for (var i = 0; i < jsonArr.length; i++) {
                        $("#serviceTabAccAsgnTebleId tbody tr").remove();
                        var quantity = parseFloat(jsonArr[i].quantity).toFixed(1);
                        var percentage = parseFloat(jsonArr[i].percentage).toFixed(1);
                        if (i === 0) {

                            tdrow += "<tr><td>" + "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblQuantity" max=' + (jsonArr[i].quantity === undefined ? "" : quantity) + ' value=' + (jsonArr[i].quantity === undefined ? "" : quantity) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblPercentage" max=' + (jsonArr[i].percentage === undefined ? "" : percentage) + ' value=' + (jsonArr[i].percentage === undefined ? "" : percentage) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblGLAccount" value=' + (jsonArr[i].glAccount === undefined ? "" : jsonArr[i].glAccount) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCOArea" value=' + (jsonArr[i].coArea === undefined ? "" : jsonArr[i].coArea) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCostCetner" value=' + (jsonArr[i].costCenter === undefined ? "" : jsonArr[i].costCenter) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFund" value=' + (jsonArr[i].fund === undefined ? "" : jsonArr[i].fund) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFunctionalArea" value=' + (jsonArr[i].functionalArea === undefined ? "" : jsonArr[i].functionalArea) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFundCenter" value=' + (jsonArr[i].fundsCentre === undefined ? "" : jsonArr[i].fundsCentre) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCommitmentItem" value=' + (jsonArr[i].commitmentItem === undefined ? "" : jsonArr[i].commitmentItem) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblOrder" value=' + (jsonArr[i].accOrder === undefined ? "" : jsonArr[i].accOrder) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblAssets" value=' + (jsonArr[i].accAsset === undefined ? "" : jsonArr[i].accAsset) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblWBSElement" value=' + (jsonArr[i].accWBSElement === undefined ? "" : jsonArr[i].accWBSElement) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblSalesOrder" value=' + (jsonArr[i].salesOrder === undefined ? "" : jsonArr[i].salesOrder) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblNetActNumber" value=' + (jsonArr[i].network === undefined ? "" : jsonArr[i].network) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblItemNumber" value=' + (jsonArr[i].itemNumber === undefined ? "" : jsonArr[i].itemNumber) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblDeliverySchedule" value=' + (jsonArr[i].deliverySchedule === undefined ? "" : jsonArr[i].deliverySchedule) + '>' +
                                    "</td></tr>";
                        } else {
                            tdrow += "<tr><td><i class='fa fa-window-close deleterowClass' aria-hidden='true' style='width:22px;'>" + "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblQuantity" max=' + (jsonArr[i].quantity === undefined ? "" : quantity) + ' value=' + (jsonArr[i].quantity === undefined ? "" : quantity) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblPercentage" max=' + (jsonArr[i].percentage === undefined ? "" : percentage) + ' value=' + (jsonArr[i].percentage === undefined ? "" : percentage) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblGLAccount" value=' + (jsonArr[i].glAccount === undefined ? "" : jsonArr[i].glAccount) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCOArea" value=' + (jsonArr[i].coArea === undefined ? "" : jsonArr[i].coArea) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCostCetner" value=' + (jsonArr[i].costCenter === undefined ? "" : jsonArr[i].costCenter) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFund" value=' + (jsonArr[i].fund === undefined ? "" : jsonArr[i].fund) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFunctionalArea" value=' + (jsonArr[i].functionalArea === undefined ? "" : jsonArr[i].functionalArea) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFundCenter" value=' + (jsonArr[i].fundsCentre === undefined ? "" : jsonArr[i].fundsCentre) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCommitmentItem" value=' + (jsonArr[i].commitmentItem === undefined ? "" : jsonArr[i].commitmentItem) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblOrder" value=' + (jsonArr[i].accOrder === undefined ? "" : jsonArr[i].accOrder) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblAssets" value=' + (jsonArr[i].accAsset === undefined ? "" : jsonArr[i].accAsset) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblWBSElement" value=' + (jsonArr[i].accWBSElement === undefined ? "" : jsonArr[i].accWBSElement) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblSalesOrder" value=' + (jsonArr[i].salesOrder === undefined ? "" : jsonArr[i].salesOrder) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblNetActNumber" value=' + (jsonArr[i].network === undefined ? "" : jsonArr[i].network) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblItemNumber" value=' + (jsonArr[i].itemNumber === undefined ? "" : jsonArr[i].itemNumber) + '>' +
                                    "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblDeliverySchedule" value=' + (jsonArr[i].deliverySchedule === undefined ? "" : jsonArr[i].deliverySchedule) + '>' +
                                    "</td></tr>";
                        }

                    }
                    console.log(tdrow);
                    $("#serviceTabAccAsgnTebleId tbody").append(tdrow);
                }
                //                }
            } else {

                ServiceAccountAssignmentArrayIsEmpty();
            }
        }
    });
}

function ServiceAccountAssignmentArrayIsEmpty() {
    $("#serviceTabAccAsgnTebleId tbody tr").remove();
    var tdrow = "<tr><td>" + "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblQuantity" value="">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblPercentage" value="">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblGLAccount" value="">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCOArea" value="">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCostCetner" value="">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFund" value="">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFunctionalArea" value="">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFundCenter" value="">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCommitmentItem" value="">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblOrder" value="">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblAssets" value="">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblWBSElement" value="">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblSalesOrder" value="">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblNetActNumber" value="">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblItemNumber" value="">' +
            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblDeliverySchedule" value="">' +
            "</td></tr>";
    $("#serviceTabAccAsgnTebleId").children("tbody").append(tdrow);
}


$(".ItemNumberSelectClass").change(function () {
    var item = $(this).val();
    var accountAssignmentCategory = "";
    var itemCat = "";
    var linkID = "";
    var isPrSaved = "";
    var glCode = "";
    var zglCode = "";
    var quantity = "";
    $("#lineItemInfoTab").show();
    
    
    
    var dropDownItemNumber = $(this).val();
    $("#contractItemTableId tbody tr").each(function () {
        var conTableItemNumber = $(this).find("td").children(".lineItemNumberServices").val();
        if (conTableItemNumber === dropDownItemNumber) {
            accountAssignmentCategory = $(this).find("td").children(".accountAssignmentClass").val();
            itemCat = $(this).find("td").children(".itemCategoryClass").val();
            isPrSaved = $(this).find("td").children(".isPrSaved").val();
            linkID = $(this).find("td").children(".linkIdClass").val();
            glCode = $(this).find("td").children(".hgLAccountClass").val();
            zglCode = $(this).find("td").children(".hzgLAccountClass").val();
            quantity=$(this).find("td").children(".targQtyClass").val();
            
        }
    });
    console.log($("#distribution").val());
    if($("#distribution").val()==="Single Account Assignment"){
    $("#costCenterAccountAssignmentchangeScreenbtn").hide(); 
    
    }else{
        $("#costCenterAccountAssignmentchangeScreenbtn").show(); 
        
    }
    

    if (itemCat === "D") {
        $("#services-tab-justify").css("display", "block");
        $("#accountassignment-tab-justify").css("display", "none");
        $("#contractServiceTableId tbody tr").remove();
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {
                "reqFrom": "getContServiceByLinkID",
                "linkID": linkID
            },
            complete: function(responseJson)
            {
                var obj = $.parseJSON(responseJson.responseText);
                var row = "";
                if (obj.length !== 0) {
                    var tdrow="";
                    for (var i = 0; i < obj.length; i++) {
                     tdrow += "<tr>"
                            + "  <td>  <input type='hidden' id='contlinkId' name='contlinkId' value='" + (obj[i].LinkId === undefined ? '' : obj[i].LinkId) + "'>"
                            + "    <input type='hidden' id='serlinkId' name='serlinkId' value='" + (obj[i].ServLinkId === undefined ? '' : obj[i].ServLinkId) + "'>"
                            + "    <input type='checkbox' class='checkboxServices' id='' name=''></td>"
                            + "   <td><input type='text' class='form-control form-rounded serviceItemNumber tableInputField' value='" + (obj[i].Line_Item_No === undefined ? '' : obj[i].Line_Item_No) + "' disabled='true'  id='itemnumber' name='itemnumber'></td>"
                            + "   <td><input type='text' class='form-control form-rounded ServiceNumberClass tableInputField' value='" + (obj[i].ServiceNo === undefined ? '' : obj[i].ServiceNo) + "' id='ServiceNumber' name='ServiceNumber'></td>"
                            + "   <td><input type='text' class='form-control form-rounded  ShortTextClass tableInputField' value='" + (obj[i].ShortText === undefined ? '' : obj[i].ShortText) + "' id='ShortText' disabled name='ShortText'></td>"
                            + "   <td><input type='text' class='form-control form-rounded UnitClass tableInputField ' value='" + (obj[i].Unit === undefined ? '' : obj[i].Unit) + "'  disabled id='Unit' name='Unit'></td>"
                            + "   <td><input type='number' value='1' class='form-control form-rounded Serv_QuantityClass tableInputField check-negative-value' value='" + (obj[i].Quantity === undefined ? '' : obj[i].Quantity) + "'  min='0' id='Serv_Quantity' name='Serv_Quantity'></td>"
                            + "   <td><input type='number'  class='form-control form-rounded GrossPriceClass tableInputField check-negative-value' value='" + (obj[i].GrossPrice === undefined ? '' : obj[i].GrossPrice) + "'  min='0' id='GrossPrice' name='GrossPrice'></td>"
                            + "   <td><input type='Text'  class='form-control form-rounded CurrencyClass tableInputField '   id='Currency' value='" + (obj[i].Currency === undefined ? '' : obj[i].Currency) + "' name='Currency'></td>"
                            + "   <td><input type='text' class='form-control form-rounded  tableInputField EditionClass ' id='Edition' value='" + (obj[i].Edition === undefined ? '' : obj[i].Edition) + "' name='Edition'></td>"
                            + "    <td><a href='#' title='Delete' class='delete-con-serv-line'><i class='fas fa-trash-alt'></i></a></td>"
                            + "</tr>";
                }
                $("#contractServiceTableId tbody").append(tdrow);
            }
        }
        });

    } else {
        
        $("#services-tab-justify").css("display", "none");
        $("#accountassignment-tab-justify").css("display", "block");
        
        
      //  $("#contractServiceTableId tbody tr").remove();
//        $.ajax({
//            type: "GET",
//            url: "ajaxcontroller.do",
//            async: false,
//            data: {
//                "reqFrom": "getContAccByLinkID",
//                "linkID": linkID
//            },
           // complete: function(responseJson)
//            {
//                var obj = $.parseJSON(responseJson.responseText);
//                var row = "";
//                if (obj.length !== 0) {
//                    var tdrow="";
//                    for (var i = 0; i < obj.length; i++) {
//                            var Distribution = (obj[i].Distribution === undefined ? '' : obj[i].Distribution);
//                            $("#distribution").val(Distribution);
//                            if (Distribution === "Single Account Assignment") {
//                                
//                                $("#unloadingPoint").val(obj[i].UnLoadPnt === undefined ? '' : obj[i].UnLoadPnt);
//                                $("#recipient").val(obj[i].Receipient === undefined ? '' : obj[i].Receipient);
//                                $("#accountAssignmentCategoryDisplay").val(accountAssignmentCategory);
//                                $("#accLinkID").val(obj[i].LinkId === undefined ? '' : obj[i].LinkId);
//                                $("#gLAccount").val(obj[i].GLCode === undefined ? '' : obj[i].GLCode);
//                                $("#coArea").val(obj[i].CoArea === undefined ? '' : obj[i].CoArea);
//                                $("#costCenterAccAsgn").val(obj[i].CostCenter === undefined ? '' : obj[i].CostCenter);
//                                $("#accAsgnOrder").val(obj[i].Order === undefined ? '' : obj[i].Order);
//                                $("#accAsgnAsset").val(obj[i].Asset === undefined ? '' : obj[i].Asset);
//                                $("#accAsgnWBSElementInput").val(obj[i].WBS === undefined ? '' : obj[i].WBS);
//                                $("#accAsgnSalesOrder").val(obj[i].SalesOrder === undefined ? '' : obj[i].SalesOrder);
//                                $("#assAsgnItemNumber").val(obj[i].ItemNo === undefined ? '' : obj[i].ItemNo);
//                                $("#assAsgnDelivSch").val(obj[i].DelSch === undefined ? '' : obj[i].DelSch);
//                                $("#assAsgnQuantity").val(obj[i].Quantity === undefined ? '' : obj[i].Quantity);
//                                $("#assAsgnPercentage").val(obj[i].Percentage === undefined ? '' : obj[i].Percentage);
//                                $("#accAsgnfund").val(obj[i].Fund === undefined ? '' : obj[i].Fund);
//                                $("#accAsgnfunctionalArea").val(obj[i].FunArea === undefined ? '' : obj[i].FunArea);
//                                $("#accAsgnFundCenterInput").val(obj[i].FunCenter === undefined ? '' : obj[i].FunCenter);
//                                $("#accAsgnCommItemInput").val(obj[i].ComItem === undefined ? '' : obj[i].ComItem);
//                                $("#accAsgnNActNumInput").val(obj[i].NetWork === undefined ? '' : obj[i].NetWork);
////                                $("#assAsgnQuantity").val(obj[i].ActivityNo === undefined ? '' : obj[i].ActivityNo);//
//                                 tdrow += "<tr>"
//                     tdrow +=  "  <td>"
//                     tdrow +=  "    <input type='hidden' class='form-control form-rounded input-height acclinkIDClass' value='" + obj[i].LinkId+"'></td>";
//                     tdrow +=  "<td><input type='text' class='form-control form-rounded input-height accAsgnQuantity' value='" + obj[i].Quantity+"' max='" + obj[i].Quantity+"'></td> ";
//                     tdrow += "<td><input type='text' class='form-control form-rounded input-height accAsgnPercentage' value='" + obj[i].Percentage+"' max='" + obj[i].Percentage+"'></td>";
//                     tdrow +=  "<td><input type='text' class='form-control form-rounded input-height accAsgnGLAccount' value='" + obj[i].GLCode+"'></td>" ; 
//                     tdrow +=  "<td><input type='text' class='form-control form-rounded input-height accAsgnCOArea' value='" + obj[i].CoArea+"'></td> ";  
//                     tdrow +=  "<td><input type='text' class='form-control form-rounded input-height accAsgnCostCetner' value='" + obj[i].CostCenter+"'></td> ";           
//                     tdrow +=  "<td><input type='text' class='form-control form-rounded input-height accAsgnFund' value='" + obj[i].Fund+"'></td>  ";
//                      tdrow +=  "<td><input type='text' class='form-control form-rounded input-height accAsgnFunctionalArea' value='" + obj[i].FunArea+"'></td>"      
//                      tdrow +=  "<td><input type='text' class='form-control form-rounded input-height accAsgnFundCenter' value='" + obj[i].FunCenter+"'></td>  ";           
//                      tdrow +=  "<td><input type='text' class='form-control form-rounded input-height accAsgnCommitmentItem' value='" + obj[i].ComItem+"'></td> ";        
//                     tdrow +=  "<td><input type='text' class='form-control form-rounded input-height accAsgnUnloadingPoint' value='" + obj[i].UnLoadPnt+"'></td>";            
//                     tdrow +=  "<td><input type='text' class='form-control form-rounded input-height accAsgnRecipients' value='" +obj[i].Receipient+"'></td> ";               
//                     tdrow +=  "<td><input type='text' class='form-control form-rounded input-height accAsgnOrder' value='" + obj[i].Order+"'></td>  " ;                  
//                     tdrow +=  "<td><input type='text' class='form-control form-rounded input-height accAsgnAssets' value='" + obj[i].Asset+"'></td>"   ;                 
//                      tdrow +=  "<td><input type='text' class='form-control form-rounded input-height accAsgnWBSElement' value='" + obj[i].WBS+"'></td>";
//                      tdrow +=  "<td><input type= class='form-control form-rounded input-height accAsgnSalesOrder' value='" + obj[i].SalesOrder+"'></td> " ;              
//                     tdrow +=  "<td><input type='text' class='form-control form-rounded input-height accAsgnNetActNumber' value='" + obj[i].NetWork+"'></td>";               
//                     tdrow +=  "<td><input type='text' class='form-control form-rounded input-height accAsgnItemNumber' value='" +obj[i].ItemNo+"'></td>  "  ;             
//                     tdrow +=  "<td><input type='text' class='form-control form-rounded input-height accAsgnDeliverySchedule' value='" + obj[i].DelSch+"'></td>";
//                     tdrow += "<td><a href='#' title='Delete' class='delete-con-serv-line'><i class='fas fa-trash-alt'></i></a></td>"
//                     tdrow +=  "</tr>";
//                   console.log(tdrow)
//                          // $("#costCenteraccountAssignmentTebleId tbody tr").remove();
//                $("#costCenteraccountAssignmentTebleId tbody").append(tdrow);
//                            } else {
//                                                   
//                     tdrow += "<tr>"
//                     tdrow +=  "  <td>"
//                     tdrow +=  "    <input type='hidden' class='form-control form-rounded input-height acclinkIDClass' value='" + obj[i].LinkId+"'></td>";
//                     tdrow +=  "<td><input type='text' class='form-control form-rounded input-height accAsgnQuantity' value='" + obj[i].Quantity+"' max='" + obj[i].Quantity+"'></td> ";
//                     tdrow += "<td><input type='text' class='form-control form-rounded input-height accAsgnPercentage' value='" + obj[i].Percentage+"' max='" + obj[i].Percentage+"'></td>";
//                     tdrow +=  "<td><input type='text' class='form-control form-rounded input-height accAsgnGLAccount' value='" + obj[i].GLCode+"'></td>" ; 
//                     tdrow +=  "<td><input type='text' class='form-control form-rounded input-height accAsgnCOArea' value='" + obj[i].CoArea+"'></td> ";  
//                     tdrow +=  "<td><input type='text' class='form-control form-rounded input-height accAsgnCostCetner' value='" + obj[i].CostCenter+"'></td> ";           
//                     tdrow +=  "<td><input type='text' class='form-control form-rounded input-height accAsgnFund' value='" + obj[i].Fund+"'></td>  ";
//                      tdrow +=  "<td><input type='text' class='form-control form-rounded input-height accAsgnFunctionalArea' value='" + obj[i].FunArea+"'></td>"      
//                      tdrow +=  "<td><input type='text' class='form-control form-rounded input-height accAsgnFundCenter' value='" + obj[i].FunCenter+"'></td>  ";           
//                      tdrow +=  "<td><input type='text' class='form-control form-rounded input-height accAsgnCommitmentItem' value='" + obj[i].ComItem+"'></td> ";        
//                     tdrow +=  "<td><input type='text' class='form-control form-rounded input-height accAsgnUnloadingPoint' value='" + obj[i].UnLoadPnt+"'></td>";            
//                     tdrow +=  "<td><input type='text' class='form-control form-rounded input-height accAsgnRecipients' value='" +obj[i].Receipient+"'></td> ";               
//                     tdrow +=  "<td><input type='text' class='form-control form-rounded input-height accAsgnOrder' value='" + obj[i].Order+"'></td>  " ;                  
//                     tdrow +=  "<td><input type='text' class='form-control form-rounded input-height accAsgnAssets' value='" + obj[i].Asset+"'></td>"   ;                 
//                      tdrow +=  "<td><input type='text' class='form-control form-rounded input-height accAsgnWBSElement' value='" + obj[i].WBS+"'></td>";
//                      tdrow +=  "<td><input type= class='form-control form-rounded input-height accAsgnSalesOrder' value='" + obj[i].SalesOrder+"'></td> " ;              
//                     tdrow +=  "<td><input type='text' class='form-control form-rounded input-height accAsgnNetActNumber' value='" + obj[i].NetWork+"'></td>";               
//                     tdrow +=  "<td><input type='text' class='form-control form-rounded input-height accAsgnItemNumber' value='" +obj[i].ItemNo+"'></td>  "  ;             
//                     tdrow +=  "<td><input type='text' class='form-control form-rounded input-height accAsgnDeliverySchedule' value='" + obj[i].DelSch+"'></td>";
//                     tdrow += "<td><a href='#' title='Delete' class='delete-con-serv-line'><i class='fas fa-trash-alt'></i></a></td>"
//                     tdrow +=  "</tr>";
//                }
//            }
//            $("#costCenteraccountAssignmentTebleId tbody tr").remove();
//                $("#costCenteraccountAssignmentTebleId tbody").append(tdrow);
//            }else{
//                $("#assAsgnQuantity").val(quantity);
//                //$("#assAsgnPercentage").val("100");
//                $("#accLinkID").val(linkID);
//                
//                 $("#accountAssignmentCategoryDisplay").val(accountAssignmentCategory);
//                 $("#assAsgnItemNumber").val("10");
//                 
//                if (accountAssignmentCategory === 'Z') {
//                $("#gLAccount").val(zglCode);
//                 $("#accAsgnCommItemInput").val(zglCode);
//                
//                }else{
//                   
//                $("#gLAccount").val(glCode);
//                $("#accAsgnCommItemInput").val(glCode);
//            }
//            }
//            
//        }
//        });
        
        

    }
    
    if (accountAssignmentCategory === 'K') {
                accAsgnCat_K_Dist_SAA("onLoad");
                service_AccAsgnCat_K("onLoad");
               // limits_AccAsgnCat_K("onLoad");
            } else if (accountAssignmentCategory === 'N') {
                accAsgnCat_N_Dist_SAA("onLoad");
                service_AccAsgnCat_N("onLoad");
                //limits_AccAsgnCat_N("onLoad");
            } else if (accountAssignmentCategory === 'A') {
                accAsgnCat_A_Dist_SAA("onLoad");
                service_AccAsgnCat_A("onLoad");
               // limits_AccAsgnCat_A("onLoad");
            } else if (accountAssignmentCategory === 'B') {
                accAsgnCat_B_Dist_SAA("onLoad");
            } else if (accountAssignmentCategory === 'C') {
                accAsgnCat_C_Dist_SAA("onLoad");
                service_AccAsgnCat_C("onLoad");
               // limits_AccAsgnCat_C("onLoad");
            } else if (accountAssignmentCategory === 'D') {
                accAsgnCat_D_Dist_SAA("onLoad");
            } else if (accountAssignmentCategory === 'E') {
                accAsgnCat_E_Dist_SAA("onLoad");
            } else if (accountAssignmentCategory === 'F') {
                accAsgnCat_F_Dist_SAA("onLoad");
                service_AccAsgnCat_F("onLoad");
               // limits_AccAsgnCat_F("onLoad");
            } else if (accountAssignmentCategory === 'G') {
                accAsgnCat_G_Dist_SAA("onLoad");
            } else if (accountAssignmentCategory === 'M') {
                accAsgnCat_M_Dist_SAA("onLoad");
            } else if (accountAssignmentCategory === 'P') {
                accAsgnCat_P_Dist_SAA("onLoad");
                service_AccAsgnCat_P("onLoad");
               // limits_AccAsgnCat_P("onLoad");
            } else if (accountAssignmentCategory === 'Q') {
                accAsgnCat_Q_Dist_SAA("onLoad");
            } else if (accountAssignmentCategory === 'R') {
                accAsgnCat_R_Dist_SAA("onLoad");
                service_AccAsgnCat_R("onLoad");
               // limits_AccAsgnCat_R("onLoad");
            } else if (accountAssignmentCategory === 'T') {
                accAsgnCat_T_Dist_SAA("onLoad");
            } else if (accountAssignmentCategory === 'U') {
                accAsgnCat_U_Dist_SAA("onLoad");
            } else if (accountAssignmentCategory === 'X') {
                accAsgnCat_X_Dist_SAA("onLoad");
                service_AccAsgnCat_X("onLoad");
               // limits_AccAsgnCat_X("onLoad");
            } else if (accountAssignmentCategory === 'Z') {
                accAsgnCat_Z_Dist_SAA("onLoad");
                service_AccAsgnCat_Z("onLoad");
              //  limits_AccAsgnCat_Z("onLoad");
            }
    $(".tab-regular").css("display", "block");
});

$("#AgreedPaymentTerms").change(function() {
        var paymentTerm = $(this).val();
        console.log("paymentTerm: " + paymentTerm);

        if (paymentTerm !== "")
        {
            $("#overlay").css("display", "block");

            var xmlInput = "<POPaymentTermsIP>";
            xmlInput += "<PaymentTerm>" + paymentTerm + "</PaymentTerm>";
            xmlInput += "</POPaymentTermsIP>";

            console.log("xmlInput: " + xmlInput);

            var WebServiceCallIp = $("#WebServiceCallIp").val();
            console.log("WebServiceCallIp: " + WebServiceCallIp);

            var URLParam = xmlInput;
            console.log("URLParam: " + URLParam);

            var serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_ListPaymentTerms?PaymentTerm=" + paymentTerm;
            console.log("serviceUrl: " + serviceUrl);

            var local_dev_uat = $("#local_dev_uat").val();
           
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
    });
    
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
            $("#paymentindays").val(PaymentDays1);
        else
            $("#paymentindays").val("");

        if (PaymentDays2 !== "0" && Number(PaymentDays2) !== 0)
            $("#paymentinperc").val(PaymentDays2);
        else
            $("#paymentinperc").val("");

        if (PaymentDays3 !== "0" && Number(PaymentDays3) !== 0)
            $("#paymentindaysnet").val(PaymentDays3);
        else
            $("#paymentindaysnet").val("");
    }
    else
    {
        $("#paymentindays").val("");
        $("#paymentinperc").val("");
        $("#paymentindaysnet").val("");
    }
}

$("#backChangedScreen").click(function() {
        $("#changeAccountAssignmentScreenModal").modal("hide");
        $("#accountAssignmentModal").modal("show");
        $("#serviceTebAccAsgnReqFrom").val("InputFields");
    });
    $("#accountAssignmentchangeScreenbtn").click(function() {
        $("#accountAssignmentModal").modal("hide");
        $("#changeAccountAssignmentScreenModal").modal("show");
        $("#serviceTebAccAsgnReqFrom").val("Table");
        $("#accountAssignmentTebleId tbody tr").remove();
        var gLCode = $("#gLCode").val();
        var costCenter = $("#costCenter").val();
        var commitmentItem = $("#commitmentItemservices").val();
        var fund = $("#fundServices").val();
        var fundCenter = $("#fundCenterServices").val();
        var functionalArea = $("#functionalAreaServices").val();
        var quantityService = serviceTabTableCurrentTd.parent().parent().find("td").eq(4).children(".quantity_Services").val();
//        alert(quantityService);
        var itemNumber = $("itemNumberAccountAssignment").val();
        var percentage = 100;
//        $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(1).children(".serviceAccAsgnTblQuantity").val(quantityService);
//        $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(1).children(".serviceAccAsgnTblQuantity").attr({
//            "max": quantityService,
//            "value": quantityService
//        });
//        $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(2).children(".serviceAccAsgnTblPercentage").val(percentage);
//        $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(2).children(".serviceAccAsgnTblPercentage").attr({
//            "max": percentage,
//            "value": percentage
//        });
//        $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(1).children(".serviceAccAsgnTblQuantity").attr("disabled", false);
//        $("#serviceTabAccAsgnTebleId tbody tr").find("td").eq(2).children(".serviceAccAsgnTblPercentage").attr("disabled", true);

        var lineItem = serviceTabTableCurrentTd.parent().parent().find("td").eq(1).children(".lineItemNumberServices").val();
        var serviceNumber = serviceTabTableCurrentTd.parent().parent().find("td").eq(2).children(".ServicesNumber_Services").val();
        var shortText = serviceTabTableCurrentTd.parent().parent().find("td").eq(3).children(".shortText_Services").val();
        var uom = serviceTabTableCurrentTd.parent().parent().find("td").eq(5).children(".servicesUnit_Services").val();
        //        alert(quantityService);
        console.log("lineItem :" + lineItem);
        console.log("quantityService :" + quantityService);
        console.log("serviceNumber :" + serviceNumber);
        console.log("shortText :" + shortText);
        $("#accountAssignLine").val(lineItem);
        $("#accountAssignQuantity").val(parseFloat(quantityService));
        $("#accountAssignActivity").val(serviceNumber);
        $("#accountAssignShortText").val(shortText);
        $("#accountAssignuom").val(uom);
    });
    
     $("#costCenterAccountAssignmentchangeScreenbtn").click(function() {
        $(".costCenterDiv").css("display", "none");
        $(".multipleCostCenterDiv").css("display", "block");
    });
    
    
    $("#distribution").change(function() {
        var rowCount = $("#costCenteraccountAssignmentTebleId tr").closest("tr").length;
        var distribution = $("#distribution").val();
        
        if (rowCount > 2) {
            if (distribution === 'Distrib. On Quantity Basis') {
                $("#costCenterAccountAssignmentchangeScreenbtn").show(); 
                var insertionid = $(".ItemNumberSelectClass").val();
                $("#contractItemTableId tbody tr").each(function() {
                     var itemNumber = $(this).find("td").children(".lineItemNumberServices").val();
                    if (insertionid === itemNumber) {
                        var accountAssignmentCategory = $(this).find("td").children(".accountAssignmentClass").val();
                        if (accountAssignmentCategory === 'K') {
                            accAsgnCat_K_Dist_SAA("distribution");
                        } else if (accountAssignmentCategory === 'N') {
                            accAsgnCat_N_Dist_SAA("distribution");
                        } else if (accountAssignmentCategory === 'A') {
                            accAsgnCat_A_Dist_SAA("distribution");
                        } else if (accountAssignmentCategory === 'B') {
                            accAsgnCat_B_Dist_SAA("distribution");
                        } else if (accountAssignmentCategory === 'C') {
                            accAsgnCat_C_Dist_SAA("distribution");
                        } else if (accountAssignmentCategory === 'D') {
                            accAsgnCat_D_Dist_SAA("distribution");
                        } else if (accountAssignmentCategory === 'E') {
                            accAsgnCat_E_Dist_SAA("distribution");
                        } else if (accountAssignmentCategory === 'F') {
                            accAsgnCat_F_Dist_SAA("distribution");
                        } else if (accountAssignmentCategory === 'G') {
                            accAsgnCat_G_Dist_SAA("distribution");
                        } else if (accountAssignmentCategory === 'M') {
                            accAsgnCat_M_Dist_SAA("distribution");
                        } else if (accountAssignmentCategory === 'P') {
                            accAsgnCat_P_Dist_SAA("distribution");
                        } else if (accountAssignmentCategory === 'Q') {
                            accAsgnCat_Q_Dist_SAA("distribution");
                        } else if (accountAssignmentCategory === 'R') {
                            accAsgnCat_R_Dist_SAA("distribution");
                        } else if (accountAssignmentCategory === 'T') {
                            accAsgnCat_T_Dist_SAA("distribution");
                        } else if (accountAssignmentCategory === 'U') {
                            accAsgnCat_U_Dist_SAA("distribution");
                        } else if (accountAssignmentCategory === 'X') {
                            accAsgnCat_X_Dist_SAA("distribution");
                        } else if (accountAssignmentCategory === 'Z') {
                            accAsgnCat_Z_Dist_SAA("distribution");
                        }
                    }
                });
            } else if (distribution === 'Distrib. By Percentage') {
                $("#costCenterAccountAssignmentchangeScreenbtn").show(); 
                var insertionid = $(".ItemNumberSelectClass").val();
                $("#contractItemTableId tbody tr").each(function() {
                     var itemNumber = $(this).find("td").children(".lineItemNumberServices").val();
                    if (insertionid === itemNumber) {
                        var accountAssignmentCategory = $(this).find("td").children(".accountAssignmentClass").val();
                        if (accountAssignmentCategory === 'K') {
                            accAsgnCat_K_Dist_SAA("distribution");
                        } else if (accountAssignmentCategory === 'N') {
                            accAsgnCat_N_Dist_SAA("distribution");
                        } else if (accountAssignmentCategory === 'A') {
                            accAsgnCat_A_Dist_SAA("distribution");
                        } else if (accountAssignmentCategory === 'B') {
                            accAsgnCat_B_Dist_SAA("distribution");
                        } else if (accountAssignmentCategory === 'C') {
                            accAsgnCat_C_Dist_SAA("distribution");
                        } else if (accountAssignmentCategory === 'D') {
                            accAsgnCat_D_Dist_SAA("distribution");
                        } else if (accountAssignmentCategory === 'E') {
                            accAsgnCat_E_Dist_SAA("distribution");
                        } else if (accountAssignmentCategory === 'F') {
                            accAsgnCat_F_Dist_SAA("distribution");
                        } else if (accountAssignmentCategory === 'G') {
                            accAsgnCat_G_Dist_SAA("distribution");
                        } else if (accountAssignmentCategory === 'M') {
                            accAsgnCat_M_Dist_SAA("distribution");
                        } else if (accountAssignmentCategory === 'P') {
                            accAsgnCat_P_Dist_SAA("distribution");
                        } else if (accountAssignmentCategory === 'Q') {
                            accAsgnCat_Q_Dist_SAA("distribution");
                        } else if (accountAssignmentCategory === 'R') {
                            accAsgnCat_R_Dist_SAA("distribution");
                        } else if (accountAssignmentCategory === 'T') {
                            accAsgnCat_T_Dist_SAA("distribution");
                        } else if (accountAssignmentCategory === 'U') {
                            accAsgnCat_U_Dist_SAA("distribution");
                        } else if (accountAssignmentCategory === 'X') {
                            accAsgnCat_X_Dist_SAA("distribution");
                        } else if (accountAssignmentCategory === 'Z') {
                            accAsgnCat_Z_Dist_SAA("distribution");
                        }

                    }
                });
                $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
                    $(this).find("td").eq(2).children(".accAsgnPercentage").prop("disabled", false);
                    $(this).find("td").eq(1).children(".accAsgnQuantity").prop("disabled", true);
                });
            } else if (distribution === 'Single Account Assignment') {
                var rowCount = costCenteraccountAssignmentTebleId.rows.length;
                var quantity;
                for (var i = rowCount - 1; i > 1; i--) {
                    costCenteraccountAssignmentTebleId.deleteRow(i);
                }
                var insertionid = $(".ItemNumberSelectClass").val();
                $("#material_headerClass tbody tr").each(function() {
                    var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                    if (insertionid === id) {
                        quantity = $(this).find('td').eq(5).text();
                    }
                });
                var percentage = 100;
                $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(1).children(".accAsgnQuantity").val(quantity);
                $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(1).children(".accAsgnQuantity").attr({
                    "max": quantity,
                    "value": quantity
                });
                $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(2).children(".accAsgnPercentage").val(percentage);
                $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(2).children(".accAsgnPercentage").attr({
                    "max": percentage,
                    "value": percentage
                });
                $("#costCenteraccountAssignmentTebleId :input").prop("disabled", true);
            }
        }
        else {
            
            var tdrow = "<tr>"
                            + "  <td>\n\
                                 <input type='hidden' class='form-control form-rounded input-height acclinkIDClass' value=''></td>"
                            + "<td><input type='text' class='form-control form-rounded input-height accAsgnQuantity' value='' max=''></td> "        
                            + "<td><input type='text' class='form-control form-rounded input-height accAsgnPercentage' value='' max=''></td>"       
                            + "<td><input type='text' class='form-control form-rounded input-height accAsgnGLAccount' value=''></td>"                 
                            + "<td><input type='text' class='form-control form-rounded input-height accAsgnCOArea' value=''></td> "                   
                            + "<td><input type='text' class='form-control form-rounded input-height accAsgnCostCetner' value=''></td> "               
                            + "<td><input type='text' class='form-control form-rounded input-height accAsgnFund' value=''></td>  "                    
                            + "<td><input type='text' class='form-control form-rounded input-height accAsgnFunctionalArea' value=''></td>"           
                            + "<td><input type='text' class='form-control form-rounded input-height accAsgnFundCenter' value=''></td>  "              
                            + "<td><input type='text' class='form-control form-rounded input-height accAsgnCommitmentItem' value=''></td> "           
                            + "<td><input type='text' class='form-control form-rounded input-height accAsgnUnloadingPoint' value=''></td>"            
                            + "<td><input type='text' class='form-control form-rounded input-height accAsgnRecipients' value=''></td> "               
                            + "<td><input type='text' class='form-control form-rounded input-height accAsgnOrder' value=''></td>  "                   
                            + "<td><input type='text' class='form-control form-rounded input-height accAsgnAssets' value=''></td>"                    
                            + "<td><input type='text' class='form-control form-rounded input-height accAsgnWBSElement' value=''></td>"
                           + "<td><input type= class='form-control form-rounded input-height accAsgnSalesOrder' value=''></td> "               
                           + "<td><input type='text' class='form-control form-rounded input-height accAsgnNetActNumber' value=''></td>"               
                           + "<td><input type='text' class='form-control form-rounded input-height accAsgnItemNumber' value=''></td>  "               
                           + "<td><input type='text' class='form-control form-rounded input-height accAsgnDeliverySchedule' value=''>"
                           + "</td>='#' title='Delete' class='delete-con-serv-line'><i class='fas fa-trash-alt'></i></a></td>"
                           + "</tr>";
                 //  $("#costCenteraccountAssignmentTebleId tbody").append(tdrow);
            if (distribution === 'Distrib. On Quantity Basis') {
                alert(distribution)
                $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(1).children(".accAsgnQuantity").prop("disabled", false);
                $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(2).children(".accAsgnPercentage").prop("disabled", true);
                $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(10).children(".accAsgnUnloadingPoint").prop("disabled", false);
                $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(11).children(".accAsgnRecipients").prop("disabled", false);
                $("#costCenterAccountAssignmentchangeScreenbtn").show(); 
                var insertionid = $(".ItemNumberSelectClass").val();
                alert(insertionid)
                $("#contractItemTableId tbody tr").each(function() {
                     var itemNumber = $(this).find("td").children(".lineItemNumberServices").val();
                      alert(itemNumber)
                    if (insertionid === itemNumber) {
                        var accountAssignmentCategory = $(this).find("td").children(".accountAssignmentClass").val();
                        alert(accountAssignmentCategory)
                        if (accountAssignmentCategory === 'K') {
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(5).children(".accAsgnCostCetner").prop("disabled", false);
                        }
                        if (accountAssignmentCategory === 'N') {
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(16).children(".accAsgnNetActNumber").prop("disabled", false);
                        }
                        if (accountAssignmentCategory === 'A') {
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(12).children(".accAsgnOrder").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(13).children(".accAsgnAssets").prop("disabled", false);
                        }
                        if (accountAssignmentCategory === 'B') {
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", false);
                        }
                        if (accountAssignmentCategory === 'C') {
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(15).children(".accAsgnSalesOrder").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(17).children(".accAsgnItemNumber").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(18).children(".accAsgnDeliverySchedule").prop("disabled", false);
                        }
                        if (accountAssignmentCategory === 'D') {
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(14).children(".accAsgnWBSElement").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(15).children(".accAsgnSalesOrder").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(17).children(".accAsgnItemNumber").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(18).children(".accAsgnDeliverySchedule").prop("disabled", false);
                        }
                        if (accountAssignmentCategory === 'E') {
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(15).children(".accAsgnSalesOrder").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(17).children(".accAsgnItemNumber").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(18).children(".accAsgnDeliverySchedule").prop("disabled", false);
                        }
                        if (accountAssignmentCategory === 'F') {
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(5).children(".accAsgnCostCetner").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(12).children(".accAsgnOrder").prop("disabled", false);
                        }
                        if (accountAssignmentCategory === 'G') {
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", false);
                        }
                        if (accountAssignmentCategory === 'K') {
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(5).children(".accAsgnCostCetner").prop("disabled", false);
                        }
                        if (accountAssignmentCategory === 'M') {
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(15).children(".accAsgnSalesOrder").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(17).children(".accAsgnItemNumber").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(18).children(".accAsgnDeliverySchedule").prop("disabled", false);
                        }
                        if (accountAssignmentCategory === 'P') {
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(14).children(".accAsgnWBSElement").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(16).children(".accAsgnNetActNumber").prop("disabled", false);
                        }
                        if (accountAssignmentCategory === 'Q') {
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(14).children(".accAsgnWBSElement").prop("disabled", false);
                        }
                        if (accountAssignmentCategory === 'R') {
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(5).children(".accAsgnCostCetner").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(14).children(".accAsgnWBSElement").prop("disabled", false);
                        }
                        if (accountAssignmentCategory === 'T') {
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(5).children(".accAsgnCostCetner").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(9).children(".accAsgnCommitmentItem").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(14).children(".accAsgnWBSElement").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(12).children(".accAsgnOrder").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(15).children(".accAsgnSalesOrder").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(17).children(".accAsgnItemNumber").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(18).children(".accAsgnDeliverySchedule").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(16).children(".accAsgnNetActNumber").prop("disabled", false);
                        }
                        if (accountAssignmentCategory === 'X') {
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(5).children(".accAsgnCostCetner").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(14).children(".accAsgnWBSElement").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(12).children(".accAsgnOrder").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(15).children(".accAsgnSalesOrder").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(17).children(".accAsgnItemNumber").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(18).children(".accAsgnDeliverySchedule").prop("disabled", false);
                        }
                        if (accountAssignmentCategory === 'Z') {
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(5).children(".accAsgnCostCetner").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(12).children(".accAsgnOrder").prop("disabled", false);
                        }
                    }
                });
            } else if (distribution === 'Distrib. By Percentage') {
                $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(2).children(".accAsgnPercentage").prop("disabled", false);
                $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(1).children(".accAsgnQuantity").prop("disabled", true);
                $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(10).children(".accAsgnUnloadingPoint").prop("disabled", false);
                $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(11).children(".accAsgnRecipients").prop("disabled", false);
                $("#costCenterAccountAssignmentchangeScreenbtn").show(); 
                var insertionid = $(".ItemNumberSelectClass").val();
                $("#contractItemTableId tbody tr").each(function() {
                     var itemNumber = $(this).find("td").children(".lineItemNumberServices").val();
                    if (insertionid === itemNumber) {
                        var accountAssignmentCategory = $(this).find("td").children(".accountAssignmentClass").val();
                        if (accountAssignmentCategory === 'K') {
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(5).children(".accAsgnCostCetner").prop("disabled", false);
                        }
                        if (accountAssignmentCategory === 'N') {
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(16).children(".accAsgnNetActNumber").prop("disabled", false);
                        }
                        if (accountAssignmentCategory === 'A') {
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(12).children(".accAsgnOrder").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(13).children(".accAsgnAssets").prop("disabled", false);
                        }
                        if (accountAssignmentCategory === 'B') {
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", false);
                        }
                        if (accountAssignmentCategory === 'C') {
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(15).children(".accAsgnSalesOrder").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(17).children(".accAsgnItemNumber").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(18).children(".accAsgnDeliverySchedule").prop("disabled", false);
                        }
                        if (accountAssignmentCategory === 'D') {
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(14).children(".accAsgnWBSElement").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(15).children(".accAsgnSalesOrder").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(17).children(".accAsgnItemNumber").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(18).children(".accAsgnDeliverySchedule").prop("disabled", false);
                        }
                        if (accountAssignmentCategory === 'E') {
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(15).children(".accAsgnSalesOrder").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(17).children(".accAsgnItemNumber").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(18).children(".accAsgnDeliverySchedule").prop("disabled", false);
                        }
                        if (accountAssignmentCategory === 'F') {
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(5).children(".accAsgnCostCetner").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(12).children(".accAsgnOrder").prop("disabled", false);
                        }
                        if (accountAssignmentCategory === 'G') {
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", false);
                        }
                        if (accountAssignmentCategory === 'K') {
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(5).children(".accAsgnCostCetner").prop("disabled", false);
                        }
                        if (accountAssignmentCategory === 'M') {
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(15).children(".accAsgnSalesOrder").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(17).children(".accAsgnItemNumber").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(18).children(".accAsgnDeliverySchedule").prop("disabled", false);
                        }
                        if (accountAssignmentCategory === 'P') {
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(14).children(".accAsgnWBSElement").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(16).children(".accAsgnNetActNumber").prop("disabled", false);
                        }
                        if (accountAssignmentCategory === 'Q') {
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(14).children(".accAsgnWBSElement").prop("disabled", false);
                        }
                        if (accountAssignmentCategory === 'R') {
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(5).children(".accAsgnCostCetner").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(14).children(".accAsgnWBSElement").prop("disabled", false);
                        }
                        if (accountAssignmentCategory === 'T') {
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(5).children(".accAsgnCostCetner").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(9).children(".accAsgnCommitmentItem").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(14).children(".accAsgnWBSElement").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(12).children(".accAsgnOrder").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(15).children(".accAsgnSalesOrder").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(17).children(".accAsgnItemNumber").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(18).children(".accAsgnDeliverySchedule").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(16).children(".accAsgnNetActNumber").prop("disabled", false);
                        }
                        if (accountAssignmentCategory === 'X') {
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(5).children(".accAsgnCostCetner").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(14).children(".accAsgnWBSElement").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(12).children(".accAsgnOrder").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(15).children(".accAsgnSalesOrder").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(17).children(".accAsgnItemNumber").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(18).children(".accAsgnDeliverySchedule").prop("disabled", false);
                        }
                        if (accountAssignmentCategory === 'Z') {
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(5).children(".accAsgnCostCetner").prop("disabled", false);
                            $("#costCenteraccountAssignmentTebleId tbody tr").find("td").eq(12).children(".accAsgnOrder").prop("disabled", false);
                        }
                    }
                });
            } else if (distribution === 'Single Account Assignment') {
                alert('jbzxkjvh')
                 $("#costCenterAccountAssignmentchangeScreenbtn").hide();
                $("#costCenteraccountAssignmentTebleId :input").prop("disabled", true);
            }
        }
    });
    
    function hideAllField() {

        $("#unloadingPointLabel").css("display", "none");
        $("#unloadingPoint").css("display", "none");
        $("#accAsgCostCenterLabel").css("display", "none");
        $("#costCenterAccAsgn").css("display", "none");
        $("#assAsgnorderLabel").css("display", "none");
        $("#accAsgnOrder").css("display", "none");
        $("#accAsgnAssetLabel").css("display", "none");
        $("#accAsgnAsset").css("display", "none");
        $("#wBSElementLabel").css("display", "none");
        $("#accAsgnWBSElementInput").css("display", "none");
        $("#accAsgnSalesOrderLabel").css("display", "none");
        $("#accAsgnSalesOrder").css("display", "none");
        $("#assAsgnItemNumLabel").css("display", "none");
        $("#assAsgnItemNumber").css("display", "none");
        $("#assAsgnDelivSchLabel").css("display", "none");
        $("#assAsgnDelivSch").css("display", "none");
        $("#accAsgnFundLabel").css("display", "none");
        $("#accAsgnfund").css("display", "none");
        $("#accAsgnfunctionalAreaLabel").css("display", "none");
        $("#accAsgnfunctionalArea").css("display", "none");
        $("#accAsgnFundCenterLabel").css("display", "none");
        $("#accAsgnFundCenterInput").css("display", "none");
        $("#accAsgnCommItemLabel").css("display", "none");
        $("#accAsgnCommItemInput").css("display", "none");
        $("#accAsgnNActNumLabel").css("display", "none");
        $("#accAsgnNActNumInput").css("display", "none");
        //    $("#accAsgnFundCenterInput").after("<br><br/>").remove();
        $('.costCenterDiv br').remove();
//        $("#gLAccount").prop("disabled", false);
//        $("#costCenterAccAsgn").prop("disabled", false);
//        $("#accAsgnOrder").prop("disabled", false);
//        $("#accAsgnAsset").prop("disabled", false);
//        $("#accAsgnWBSElementInput").prop("disabled", false);
//        $("#accAsgnSalesOrder").prop("disabled", false);
//        $("#assAsgnItemNumber").prop("disabled", false);
//        $("#assAsgnDelivSch").prop("disabled", false);
//        $("#accAsgnfund").prop("disabled", false);
//        $("#accAsgnfunctionalArea").prop("disabled", false);
//        $("#accAsgnFundCenterInput").prop("disabled", false);
//        $("#accAsgnCommItemInput").prop("disabled", false);
//        $("#accAsgnNActNumInput").prop("disabled", false);

//        var rowCount = costCenteraccountAssignmentTebleId.rows.length;
//        for (var i = rowCount - 1; i >= 0; i--) {
//            costCenteraccountAssignmentTebleId.deleteRow(i);
//            if (i === 0) {
//                return false;
//            }
//        }
    }
    
    
    function blockAllFields(requestFrom) {

        var row;
        row = "<tr><th class='border-0 th-color'>" +
                "</th><th class='border-0 th-color'>" + 'Quant' +
                "</th><th class='border-0 th-color'>" + '%' +
                "</th><th class='border-0 th-color'>" + 'GL A/C' +
                "</th><th class='border-0 th-color'>" + 'CO Area' +
                "</th><th class='border-0 th-color'>" + 'Cost Center' +
                "</th><th class='border-0 th-color'>" + 'Fund' +
                "</th><th class='border-0 th-color'>" + 'Fun Area' +
                "</th><th class='border-0 th-color'>" + 'Fund Center' +
                "</th><th class='border-0 th-color'>" + 'Com Item' +
                "</th><th class='border-0 th-color'>" + 'Unloading Point' +
                "</th><th class='border-0 th-color'>" + 'Recipients' +
                "</th><th class='border-0 th-color'>" + 'Order' +
                "</th><th class='border-0 th-color'>" + 'Asset' +
                "</th><th class='border-0 th-color'>" + 'WBS Elements' +
                "</th><th class='border-0 th-color'>" + 'Sales Order' +
                "</th><th class='border-0 th-color'>" + 'Network/Activity Number' +
                "</th><th class='border-0 th-color'>" + 'Item Number' +
                "</th><th class='border-0 th-color'>" + 'Delivery Schedule' +
                "</th></tr>";
        //$("#costCenteraccountAssignmentTebleId").children("thead").append(row);
        if (requestFrom === 'AccAsgnModel' || requestFrom === 'onLoad' || requestFrom === 'distribution') {

            var linkID;
            var accountAssignmentCategory;
            var glCode;
            var zglCode;
            var quantity;
           var dropDownItemNumber=$("#ItemNumberSelect").val();
            $("#contractItemTableId tbody tr").each(function () {
        var conTableItemNumber = $(this).find("td").children(".lineItemNumberServices").val();
        if (conTableItemNumber === dropDownItemNumber) {
            accountAssignmentCategory= $(this).find("td").children(".accountAssignmentClass").val();
            linkID = $(this).find("td").children(".linkIdClass").val();
           // linkID = $(this).find("td").children(".linkIdClass").val();
            glCode = $(this).find("td").children(".hgLAccountClass").val();
            zglCode = $(this).find("td").children(".hzgLAccountClass").val();
            quantity=$(this).find("td").children(".targQtyClass").val();
                }
            });
            $("#accountAssignmentCategoryDisplay").val(accountAssignmentCategory);
//            if (prType === 'Capital PR for Services' || prType === 'PR for Services') {
//                $("#PrType").val("Service");
//
//                $.ajax({
//                    type: "GET",
//                    url: "ajaxcontroller.do",
//                    async: false,
//                    data:
//                            {
//                                "reqFrom": "getCmplxPRToPOLineItemPRAccountAssignmentByLinkId",
//                                "linkid": linkid,
//                                "type": "Service"
//                            },
//                    dataType: "json",
//                    complete: function(responseJson)
//                    {
//                        var obj = $.parseJSON(responseJson.responseText);
//                        console.log("Acc_Assmt Len: " + obj.length);
//                        accountAssignment(obj);
//                    }
//                });
//            }
//            if (prType === 'Capital PR for Materials' || prType === 'PR for Goods') {
//
//                $("#PrType").val("Material");
                $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {
                "reqFrom": "getContAccByLinkID",
                "linkID": linkID
            },
            complete: function(responseJson)
            {
                var obj = $.parseJSON(responseJson.responseText);
                var row = "";
                if (obj.length !== 0) {
                       
                        accountAssignment(obj);
                    }else {
                        $(".costCenterDiv").css("display", "block");
                        $(".multipleCostCenterDiv").css("display", "none");
                        $("#assAsgnQuantity").val(quantity);
                        $("#accLinkID").val(linkID);
                        $("#accountAssignmentCategoryDisplay").val(accountAssignmentCategory);
                        $("#assAsgnItemNumber").val("10");
                        if (accountAssignmentCategory === 'Z') {
                            $("#gLAccount").val(zglCode);
                            $("#accAsgnCommItemInput").val(zglCode);

                        } else {

                            $("#gLAccount").val(glCode);
                            $("#accAsgnCommItemInput").val(glCode);
                        }
    }
                }
                });
            //}
        }
        else if (requestFrom === "itemCatDropDown" || requestFrom === "lineTable" || requestFrom === "serviceTableCheckbox") {
            var lineItemNumber = $("#ItemNumberSelect").val();
            var linkid;
            var prType = $("#PrType").val();
            $("#material_headerClass tbody tr").each(function() {
                var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                var insertionid = $("#ItemNumberSelect").val();
                if (insertionid === id) {
                    linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
//                    prType = $(this).find("td").eq(0).children(".prType_Class").val();
                }
            });
            getAccountAssignmentByLineItemNumber(lineItemNumber, linkid, prType);
        }
    }
    
       function accountAssignment(obj) {
        var tdrow;
//        alert(obj.length);
        for (var i = 0; i < obj.length; i++) {
            $("#distribution").val(obj[i].Distribution);
           
            if (obj[i].Distribution === "Single Account Assignment") {

               $(".costCenterDiv").css("display", "block");
                        $(".multipleCostCenterDiv").css("display", "none");

                $("#unloadingPoint").val(obj[i].UnLoadPnt === undefined ? '' : obj[i].UnLoadPnt);
                $("#recipient").val(obj[i].Receipient === undefined ? '' : obj[i].Receipient);
                
                $("#accLinkID").val(obj[i].LinkId === undefined ? '' : obj[i].LinkId);
                $("#gLAccount").val(obj[i].GLCode === undefined ? '' : obj[i].GLCode);
                $("#coArea").val(obj[i].CoArea === undefined ? '' : obj[i].CoArea);
                $("#costCenterAccAsgn").val(obj[i].CostCenter === undefined ? '' : obj[i].CostCenter);
                $("#accAsgnOrder").val(obj[i].Order === undefined ? '' : obj[i].Order);
                $("#accAsgnAsset").val(obj[i].Asset === undefined ? '' : obj[i].Asset);
                $("#accAsgnWBSElementInput").val(obj[i].WBS === undefined ? '' : obj[i].WBS);
                $("#accAsgnSalesOrder").val(obj[i].SalesOrder === undefined ? '' : obj[i].SalesOrder);
                $("#assAsgnItemNumber").val(obj[i].ItemNo === undefined ? '' : obj[i].ItemNo);
                $("#assAsgnDelivSch").val(obj[i].DelSch === undefined ? '' : obj[i].DelSch);
                $("#assAsgnQuantity").val(obj[i].Quantity === undefined ? '' : obj[i].Quantity);
                $("#assAsgnPercentage").val(obj[i].Percentage === undefined ? '' : obj[i].Percentage);
                $("#accAsgnfund").val(obj[i].Fund === undefined ? '' : obj[i].Fund);
                $("#accAsgnfunctionalArea").val(obj[i].FunArea === undefined ? '' : obj[i].FunArea);
                $("#accAsgnFundCenterInput").val(obj[i].FunCenter === undefined ? '' : obj[i].FunCenter);
                $("#accAsgnCommItemInput").val(obj[i].ComItem === undefined ? '' : obj[i].ComItem);
                $("#accAsgnNActNumInput").val(obj[i].NetWork === undefined ? '' : obj[i].NetWork);
                $("#costCenterAccountAssignmentchangeScreenbtn").css("display", "none");
                $("#saveAccAsgnFieldBtn").css("display", "none");
                tdrow += "<tr>"
                tdrow += "  <td>"
                tdrow += "    <input type='hidden' class='form-control form-rounded input-height acclinkIDClass' value='" + obj[i].LinkId + "'></td>";
                tdrow += "<td><input type='text' class='form-control form-rounded input-height accAsgnQuantity' value='" + obj[i].Quantity + "' max='" + obj[i].Quantity + "'></td> ";
                tdrow += "<td><input type='text' class='form-control form-rounded input-height accAsgnPercentage' value='" + obj[i].Percentage + "' max='" + obj[i].Percentage + "'></td>";
                tdrow += "<td><input type='text' class='form-control form-rounded input-height accAsgnGLAccount' value='" + obj[i].GLCode + "'></td>";
                tdrow += "<td><input type='text' class='form-control form-rounded input-height accAsgnCOArea' value='" + obj[i].CoArea + "'></td> ";
                tdrow += "<td><input type='text' class='form-control form-rounded input-height accAsgnCostCetner' value='" + obj[i].CostCenter + "'></td> ";
                tdrow += "<td><input type='text' class='form-control form-rounded input-height accAsgnFund' value='" + obj[i].Fund + "'></td>  ";
                tdrow += "<td><input type='text' class='form-control form-rounded input-height accAsgnFunctionalArea' value='" + obj[i].FunArea + "'></td>"
                tdrow += "<td><input type='text' class='form-control form-rounded input-height accAsgnFundCenter' value='" + obj[i].FunCenter + "'></td>  ";
                tdrow += "<td><input type='text' class='form-control form-rounded input-height accAsgnCommitmentItem' value='" + obj[i].ComItem + "'></td> ";
                tdrow += "<td><input type='text' class='form-control form-rounded input-height accAsgnUnloadingPoint' value='" + obj[i].UnLoadPnt + "'></td>";
                tdrow += "<td><input type='text' class='form-control form-rounded input-height accAsgnRecipients' value='" + obj[i].Receipient + "'></td> ";
                tdrow += "<td><input type='text' class='form-control form-rounded input-height accAsgnOrder' value='" + obj[i].Order + "'></td>  ";
                tdrow += "<td><input type='text' class='form-control form-rounded input-height accAsgnAssets' value='" + obj[i].Asset + "'></td>";
                tdrow += "<td><input type='text' class='form-control form-rounded input-height accAsgnWBSElement' value='" + obj[i].WBS + "'></td>";
                tdrow += "<td><input type='text' class='form-control form-rounded input-height accAsgnSalesOrder' value='" + obj[i].SalesOrder + "'></td> ";
                tdrow += "<td><input type='text' class='form-control form-rounded input-height accAsgnNetActNumber' value='" + obj[i].NetWork + "'></td>";
                tdrow += "<td><input type='text' class='form-control form-rounded input-height accAsgnItemNumber' value='" + obj[i].ItemNo + "'></td>  ";
                tdrow += "<td><input type='text' class='form-control form-rounded input-height accAsgnDeliverySchedule' value='" + obj[i].DelSch + "'></td>";
                tdrow += "<td><a href='#' title='Delete' class='delete-con-serv-line'><i class='fas fa-trash-alt'></i></a></td>"
                tdrow += "</tr>";
                $("#costCenteraccountAssignmentTebleId  tbody tr").remove();
                $("#costCenteraccountAssignmentTebleId").children("tbody").append(tdrow);
            } else {
                
                $("#costCenterAccountAssignmentchangeScreenbtn").css("display", "");
               $(".costCenterDiv").css("display", "none");
                        $(".multipleCostCenterDiv").css("display", "block");
                tdrow += "<tr>"
                tdrow += "  <td>"
                tdrow += "    <input type='hidden' class='form-control form-rounded input-height acclinkIDClass' value='" + obj[i].LinkId + "'></td>";
                tdrow += "<td><input type='text' class='form-control form-rounded input-height accAsgnQuantity' value='" + obj[i].Quantity + "' max='" + obj[i].Quantity + "'></td> ";
                tdrow += "<td><input type='text' class='form-control form-rounded input-height accAsgnPercentage' value='" + obj[i].Percentage + "' max='" + obj[i].Percentage + "'></td>";
                tdrow += "<td><input type='text' class='form-control form-rounded input-height accAsgnGLAccount' value='" + obj[i].GLCode + "'></td>";
                tdrow += "<td><input type='text' class='form-control form-rounded input-height accAsgnCOArea' value='" + obj[i].CoArea + "'></td> ";
                tdrow += "<td><input type='text' class='form-control form-rounded input-height accAsgnCostCetner' value='" + obj[i].CostCenter + "'></td> ";
                tdrow += "<td><input type='text' class='form-control form-rounded input-height accAsgnFund' value='" + obj[i].Fund + "'></td>  ";
                tdrow += "<td><input type='text' class='form-control form-rounded input-height accAsgnFunctionalArea' value='" + obj[i].FunArea + "'></td>"
                tdrow += "<td><input type='text' class='form-control form-rounded input-height accAsgnFundCenter' value='" + obj[i].FunCenter + "'></td>  ";
                tdrow += "<td><input type='text' class='form-control form-rounded input-height accAsgnCommitmentItem' value='" + obj[i].ComItem + "'></td> ";
                tdrow += "<td><input type='text' class='form-control form-rounded input-height accAsgnUnloadingPoint' value='" + obj[i].UnLoadPnt + "'></td>";
                tdrow += "<td><input type='text' class='form-control form-rounded input-height accAsgnRecipients' value='" + obj[i].Receipient + "'></td> ";
                tdrow += "<td><input type='text' class='form-control form-rounded input-height accAsgnOrder' value='" + obj[i].Order + "'></td>  ";
                tdrow += "<td><input type='text' class='form-control form-rounded input-height accAsgnAssets' value='" + obj[i].Asset + "'></td>";
                tdrow += "<td><input type='text' class='form-control form-rounded input-height accAsgnWBSElement' value='" + obj[i].WBS + "'></td>";
                tdrow += "<td><input type='text' class='form-control form-rounded input-height accAsgnSalesOrder' value='" + obj[i].SalesOrder + "'></td> ";
                tdrow += "<td><input type='text' class='form-control form-rounded input-height accAsgnNetActNumber' value='" + obj[i].NetWork + "'></td>";
                tdrow += "<td><input type='text' class='form-control form-rounded input-height accAsgnItemNumber' value='" + obj[i].ItemNo + "'></td>  ";
                tdrow += "<td><input type='text' class='form-control form-rounded input-height accAsgnDeliverySchedule' value='" + obj[i].DelSch + "'></td>";
                tdrow += "<td><a href='#' title='Delete' class='delete-con-serv-line'><i class='fas fa-trash-alt'></i></a></td>"
                tdrow +=  "</tr>";
            }
        }
        $("#costCenteraccountAssignmentTebleId  tbody tr").remove();
        $("#costCenteraccountAssignmentTebleId").children("tbody").append(tdrow);
    }
       
    
     function accAsgnCat_K_Dist_SAA(requestFrom) {

        hideAllField();
        blockAllFields(requestFrom);
        $("#accAsgn_li").css("display", "block");
        $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
            $(this).find("td").eq(12).css("display", "none");
            $(this).find("td").eq(13).css("display", "none");
            $(this).find("td").eq(14).css("display", "none");
            $(this).find("td").eq(15).css("display", "none");
            $(this).find("td").eq(16).css("display", "none");
            $(this).find("td").eq(17).css("display", "none");
            $(this).find("td").eq(18).css("display", "none");
            $(this).find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", "true");
            $(this).find("td").eq(4).children(".accAsgnCOArea").prop("disabled", "true");
            $(this).find("td").eq(6).children(".accAsgnFund").prop("disabled", "true");
            $(this).find("td").eq(7).children(".accAsgnFunctionalArea").prop("disabled", "true");
            $(this).find("td").eq(8).children(".accAsgnFundCenter").prop("disabled", "true");
            $(this).find("td").eq(9).children(".accAsgnCommitmentItem").prop("disabled", "true");
        });
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(12).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(13).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(14).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(15).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(16).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(17).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(18).css("display", "none");
        $("#unloadingPoint").css({"margin-left": "10px"});
        $("#recipientLabel").css({"margin-left": "10px"});
        $("#recipient").css({"margin-left": "10px"});
        $("#gLAccountLabel").css({"margin-left": "10px"});
        $("#gLAccount").css({"margin-left": "30px"});
        $("#coAreaLabel").css({"margin-left": "60px"});
        $("#coArea").css({"margin-left": "35px"});
        $("#unloadingPointLabel").css({"display": "inline", "margin-left": "0px"});
        $("#unloadingPoint").css({"display": "inline", "margin-left": "10px"});
        $("#accAsgCostCenterLabel").css({"display": "inline", "margin-left": "0px"});
        $("#costCenterAccAsgn").css({"display": "inline", "margin-left": "10px"});
        $("#accAsgnFundLabel").css({"display": "inline", "margin-left": "10px"});
        $("#accAsgnfund").css({"display": "inline", "margin-left": "35px"});
        $("#accAsgnfunctionalAreaLabel").css({"display": "inline", "margin-left": "10px"});
        $("#accAsgnfunctionalArea").css({"display": "inline", "margin-left": "10px"});
        $("#accAsgnFundCenterLabel").css({"display": "inline", "margin-left": "10px"});
        $("#accAsgnFundCenterInput").css({"display": "inline", "margin-left": "10px"});
        $("#accAsgnCommItemLabel").css({"display": "inline", "margin-left": "10px"});
        $("#accAsgnCommItemInput").css({"display": "inline", "margin-left": "10px"});
        $("#gLAccount").prop("disabled", true);
        $("#coArea").prop("disabled", true);
        $("#accAsgnfund").prop("disabled", true);
        $("#accAsgnfunctionalArea").prop("disabled", true);
        $("#accAsgnFundCenterInput").prop("disabled", true);
        $("#accAsgnCommItemInput").prop("disabled", true);
        $("#profitabilitysegmentmodelbtn").css("display", "none");
    }

    function accAsgnCat_N_Dist_SAA(requestFrom) {


        hideAllField();
        blockAllFields(requestFrom);
        $("#accAsgn_li").css("display", "block");
        $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
            $(this).find("td").eq(6).css("display", "none");
            $(this).find("td").eq(7).css("display", "none");
            $(this).find("td").eq(8).css("display", "none");
            $(this).find("td").eq(9).css("display", "none");
            $(this).find("td").eq(12).css("display", "none");
            $(this).find("td").eq(13).css("display", "none");
            $(this).find("td").eq(14).css("display", "none");
            $(this).find("td").eq(15).css("display", "none");
            $(this).find("td").eq(17).css("display", "none");
            $(this).find("td").eq(18).css("display", "none");
            $(this).find("td").eq(4).children(".accAsgnCOArea").prop("disabled", "true");
            $(this).find("td").eq(5).children(".accAsgnCostCetner").prop("disabled", "true");
        });
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(6).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(7).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(8).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(9).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(12).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(13).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(14).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(15).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(17).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(18).css("display", "none");
        $("#profitabilitysegmentmodelbtn").css("display", "none");
        $("#coArea").prop("disabled", true);
        $("#unloadingPoint").css({
            "margin-left": "10px"
        });
        $("#recipientLabel").css({
            "margin-left": "15px"
        });
        $("#recipient").css({
            "margin-left": "10px"
        });
        $("#gLAccountLabel").css({
            "margin-left": "15px"
        });
        $("#gLAccount").css({
            "margin-left": "10px"
        });
        $("#coAreaLabel").css({
            "margin-left": "10px"
        });
        $("#coArea").css({
            "margin-left": "10px"
        });
        $("#unloadingPointLabel").css({"display": "inline", "margin-left": "0px"});
        $("#unloadingPoint").css({"display": "inline", "margin-left": "10px"});
        $("#accAsgCostCenterLabel").css({
            "display": "inline",
            "margin-left": "0px"
        });
        $("#costCenterAccAsgn").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#costCenterAccAsgn").prop("disabled", true);
        $("#accAsgnNActNumLabel").css({
            "display": "inline",
            "margin-left": '15px'
        });
        $("#accAsgnNActNumInput").css({
            "display": "inline",
            "margin-left": '3px'
        });
    }
    function accAsgnCat_A_Dist_SAA(requestFrom) {
        hideAllField();
        blockAllFields(requestFrom);
        $("#accAsgn_li").css("display", "block");
        $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
            $(this).find("td").eq(5).css("display", "none");
            $(this).find("td").eq(6).css("display", "none");
            $(this).find("td").eq(7).css("display", "none");
            $(this).find("td").eq(8).css("display", "none");
            $(this).find("td").eq(9).css("display", "none");
            $(this).find("td").eq(15).css("display", "none");
            $(this).find("td").eq(16).css("display", "none");
            $(this).find("td").eq(17).css("display", "none");
            $(this).find("td").eq(18).css("display", "none");
            $(this).find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", "true");
            $(this).find("td").eq(4).children(".accAsgnCOArea").prop("disabled", "true");
            $(this).find("td").eq(14).children(".accAsgnWBSElement").prop("disabled", "true");
        });
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(5).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(6).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(7).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(8).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(9).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(15).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(16).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(17).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(18).css("display", "none");
        $("#profitabilitysegmentmodelbtn").css("display", "none");
        $("#gLAccount").prop("disabled", true);
        $("#coArea").prop("disabled", true);
        $("#accAsgnWBSElementInput").prop("disabled", true);
        $("#unloadingPoint").css({"margin-left": "10px"});
        $("#recipientLabel").css({"margin-left": "10px"});
        $("#recipient").css({"margin-left": "10px"});
        $("#gLAccountLabel").css({"margin-left": "10px"});
        $("#gLAccount").css({"margin-left": "20px"});
        $("#coAreaLabel").css({"margin-left": "10px"});
        $("#coArea").css({"margin-left": "10px"});
        $("#unloadingPointLabel").css({"display": "inline", "margin-left": "0px"});
        $("#unloadingPoint").css({"display": "inline", "margin-left": "10px"});
        $("#assAsgnorderLabel").css({"display": "inline", "margin-left": "0px"});
        $("#accAsgnOrder").css({"display": "inline", "margin-left": "45px"});
        $("#accAsgnAssetLabel").css({"display": "inline", "margin-left": "10px"});
        $("#accAsgnAsset").css({"display": "inline", "margin-left": "35px"});
        $("#wBSElementLabel").css({"display": "inline", "margin-left": "10px"});
        $("#accAsgnWBSElementInput").css({"display": "inline", "margin-left": "10px"});
    }
    function accAsgnCat_B_Dist_SAA(requestFrom) {

        hideAllField();
        blockAllFields(requestFrom);
        $("#accAsgn_li").css("display", "block");
        $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
            $(this).find("td").eq(5).css("display", "none");
            $(this).find("td").eq(6).css("display", "none");
            $(this).find("td").eq(7).css("display", "none");
            $(this).find("td").eq(8).css("display", "none");
            $(this).find("td").eq(9).css("display", "none");
            $(this).find("td").eq(12).css("display", "none");
            $(this).find("td").eq(13).css("display", "none");
            $(this).find("td").eq(14).css("display", "none");
            $(this).find("td").eq(15).css("display", "none");
            $(this).find("td").eq(16).css("display", "none");
            $(this).find("td").eq(17).css("display", "none");
            $(this).find("td").eq(18).css("display", "none");
            $(this).find("td").eq(4).children(".accAsgnCOArea").prop("disabled", "true");
        });
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(5).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(6).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(7).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(8).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(9).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(12).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(13).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(14).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(15).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(16).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(17).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(18).css("display", "none");
        $("#profitabilitysegmentmodelbtn").css("display", "none");
        
        $("#coArea").prop("disabled", true);
        $("#unloadingPoint").css({
            "margin-left": "10px"
        });
        $("#recipientLabel").css({
            "margin-left": "10px"
        });
        $("#recipient").css({
            "margin-left": "10px"
        });
        $("#gLAccountLabel").css({
            "margin-left": "10px"
        });
        $("#gLAccount").css({
            "margin-left": "10px"
        });
        $("#coAreaLabel").css({
            "margin-left": "10px"
        });
        $("#coArea").css({
            "margin-left": "10px"
        });
        $("#unloadingPointLabel").css({"display": "inline", "margin-left": "0px"});
        $("#unloadingPoint").css({"display": "inline", "margin-left": "10px"});
    }
    function accAsgnCat_C_Dist_SAA(requestFrom) {

        hideAllField();
        blockAllFields(requestFrom);
        $("#accAsgn_li").css("display", "block");
        $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
            $(this).find("td").eq(5).css("display", "none");
            $(this).find("td").eq(6).css("display", "none");
            $(this).find("td").eq(7).css("display", "none");
            $(this).find("td").eq(8).css("display", "none");
            $(this).find("td").eq(9).css("display", "none");
            $(this).find("td").eq(12).css("display", "none");
            $(this).find("td").eq(13).css("display", "none");
            $(this).find("td").eq(14).css("display", "none");
            $(this).find("td").eq(16).css("display", "none");
            $(this).find("td").eq(4).children(".accAsgnCOArea").prop("disabled", "true");
        });
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(5).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(6).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(7).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(8).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(9).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(12).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(13).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(14).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(16).css("display", "none");
        $("#profitabilitysegmentmodelbtn").css("display", "none");
        $("#unloadingPoint").css({
            "margin-left": "5px"
        });
        $("#recipientLabel").css({
            "margin-left": "10px"
        });
        $("#recipient").css({
            "margin-left": "30px"
        });
        $("#gLAccountLabel").css({
            "margin-left": "15px"
        });
        $("#gLAccount").css({
            "margin-left": "10px"
        });
        $("#coAreaLabel").css({
            "margin-left": "10px"
        });
        $("#coArea").css({
            "margin-left": "10px"
        });
        $("#unloadingPointLabel").css({"display": "inline", "margin-left": "0px"});
        $("#unloadingPoint").css({"display": "inline", "margin-left": "10px"});
        $("#accAsgnSalesOrderLabel").css({
            "display": "inline",
            "margin-left": "0px"
        });
        $("#accAsgnSalesOrder").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#assAsgnItemNumLabel").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#assAsgnItemNumber").css({
            "display": "inline",
            "margin-left": "5px"
        });
        $("#assAsgnDelivSchLabel").css({
            "display": "inline",
            "margin-left": "15px"
        });
        $("#assAsgnDelivSch").css({
            "display": "inline",
            "margin-left": "35px"
        });
    }
    function accAsgnCat_D_Dist_SAA(requestFrom) {

        hideAllField(requestFrom);
        blockAllFields();
        $("#accAsgn_li").css("display", "block");
        $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
            $(this).find("td").eq(5).css("display", "none");
            $(this).find("td").eq(6).css("display", "none");
            $(this).find("td").eq(7).css("display", "none");
            $(this).find("td").eq(8).css("display", "none");
            $(this).find("td").eq(9).css("display", "none");
            $(this).find("td").eq(12).css("display", "none");
            $(this).find("td").eq(13).css("display", "none");
            $(this).find("td").eq(16).css("display", "none");
            $(this).find("td").eq(4).children(".accAsgnCOArea").prop("disabled", "true");
        });
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(5).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(6).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(7).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(8).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(9).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(12).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(13).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(16).css("display", "none");
        $("#profitabilitysegmentmodelbtn").css("display", "none");
        $("#unloadingPoint").css({
            "margin-left": "20px"
        });
        $("#recipientLabel").css({
            "margin-left": "15px"
        });
        $("#recipient").css({
            "margin-left": "25px"
        });
        $("#gLAccountLabel").css({
            "margin-left": "15px"
        });
        $("#gLAccount").css({
            "margin-left": "10px"
        });
        $("#coAreaLabel").css({
            "margin-left": "10px"
        });
        $("#coArea").css({
            "margin-left": "10px"
        });
        $("#unloadingPointLabel").css({"display": "inline", "margin-left": "0px"});
        $("#unloadingPoint").css({"display": "inline", "margin-left": "10px"});
        $("#wBSElementLabel").css({
            "display": "inline",
            "margin-left": "0px"
        });
        $("#accAsgnWBSElementInput").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#accAsgnSalesOrderLabel").css({
            "display": "inline",
            "margin-left": "15px"
        });
        $("#accAsgnSalesOrder").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#assAsgnItemNumLabel").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#assAsgnItemNumber").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#assAsgnDelivSchLabel").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#assAsgnDelivSch").css({
            "display": "inline",
            "margin-left": "15px"
        });
    }
    function accAsgnCat_E_Dist_SAA(requestFrom) {

        hideAllField();
        blockAllFields(requestFrom);
        $("#accAsgn_li").css("display", "block");
        $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
            $(this).find("td").eq(5).css("display", "none");
            $(this).find("td").eq(6).css("display", "none");
            $(this).find("td").eq(7).css("display", "none");
            $(this).find("td").eq(8).css("display", "none");
            $(this).find("td").eq(9).css("display", "none");
            $(this).find("td").eq(12).css("display", "none");
            $(this).find("td").eq(13).css("display", "none");
            $(this).find("td").eq(14).css("display", "none");
            $(this).find("td").eq(16).css("display", "none");
            $(this).find("td").eq(4).children(".accAsgnCOArea").prop("disabled", "true");
        });
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(5).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(6).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(7).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(8).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(9).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(12).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(13).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(14).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(16).css("display", "none");
        $("#profitabilitysegmentmodelbtn").css("display", "none");
        $("#unloadingPoint").css({
            "margin-left": "10px"
        });
        $("#recipientLabel").css({
            "margin-left": "10px"
        });
        $("#recipient").css({
            "margin-left": "30px"
        });
        $("#gLAccountLabel").css({
            "margin-left": "10px"
        });
        $("#gLAccount").css({
            "margin-left": "10px"
        });
        $("#coAreaLabel").css({
            "margin-left": "10px"
        });
        $("#coArea").css({
            "margin-left": "10px"
        });
        $("#unloadingPointLabel").css({"display": "inline", "margin-left": "0px"});
        $("#unloadingPoint").css({"display": "inline", "margin-left": "10px"});
        $("#accAsgnSalesOrderLabel").css({
            "display": "inline",
            "margin-left": "0px"
        });
        $("#accAsgnSalesOrder").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#assAsgnItemNumLabel").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#assAsgnItemNumber").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#assAsgnDelivSchLabel").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#assAsgnDelivSch").css({
            "display": "inline",
            "margin-left": "35px"
        });
    }
    function accAsgnCat_F_Dist_SAA(requestFrom) {

        hideAllField();
        blockAllFields(requestFrom);
        $("#accAsgn_li").css("display", "block");
        $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
            $(this).find("td").eq(13).css("display", "none");
            $(this).find("td").eq(14).css("display", "none");
            $(this).find("td").eq(15).css("display", "none");
            $(this).find("td").eq(16).css("display", "none");
            $(this).find("td").eq(17).css("display", "none");
            $(this).find("td").eq(18).css("display", "none");
            $(this).find("td").eq(4).children(".accAsgnCOArea").prop("disabled", "true");
            $(this).find("td").eq(6).children(".accAsgnFund").prop("disabled", "true");
            $(this).find("td").eq(7).children(".accAsgnFunctionalArea").prop("disabled", "true");
            $(this).find("td").eq(8).children(".accAsgnFundCenter").prop("disabled", "true");
            $(this).find("td").eq(9).children(".accAsgnCommitmentItem").prop("disabled", "true");
        });
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(13).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(14).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(15).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(16).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(17).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(18).css("display", "none");
        $("#profitabilitysegmentmodelbtn").css("display", "none");
        $("#unloadingPoint").css({
            "margin-left": "10px"
        });
        $("#recipientLabel").css({
            "margin-left": "10px"
        });
        $("#recipient").css({
            "margin-left": "10px"
        });
        $("#gLAccountLabel").css({
            "margin-left": "10px"
        });
        $("#gLAccount").css({
            "margin-left": "10px"
        });
        $("#coAreaLabel").css({
            "margin-left": "10px"
        });
        $("#coArea").css({
            "margin-left": "50px"
        });
        $("#unloadingPointLabel").css({"display": "inline", "margin-left": "0px"});
        $("#unloadingPoint").css({"display": "inline", "margin-left": "10px"});
        $("#accAsgCostCenterLabel").css({
            "display": "inline",
            "margin-left": "0px"
        });
        $("#costCenterAccAsgn").css("display", "inline");
        $("#assAsgnorderLabel").css({
            "display": "inline",
            "margin-left": "15px"
        });
        $("#accAsgnOrder").css({
            "display": "inline",
            "margin-left": "30px"
        });
        $("#accAsgnFundLabel").css({
            "display": "inline",
            "margin-left": "15px"
        });
        $("#accAsgnfund").css({
            "display": "inline",
            "margin-left": "43px"
        });
        $("#accAsgnfunctionalAreaLabel").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#accAsgnfunctionalArea").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#accAsgnFundCenterLabel").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#accAsgnFundCenterInput").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#accAsgnFundCenterInput").after("<br><br/>");
        $("#accAsgnCommItemLabel").css({
            "display": "inline",
            "margin-left": "0px"
        });
        $("#accAsgnCommItemInput").css({
            "display": "inline",
            "margin-left": "20px"
        });
        $("#accAsgnfund").prop("disabled", true);
        $("#accAsgnfunctionalArea").prop("disabled", true);
        $("#accAsgnFundCenterInput").prop("disabled", true);
        $("#accAsgnCommItemInput").prop("disabled", true);
    }
    function accAsgnCat_G_Dist_SAA(requestFrom) {
        hideAllField();
        blockAllFields(requestFrom);
        $("#accAsgn_li").css("display", "block");
        $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
            $(this).find("td").eq(5).css("display", "none");
            $(this).find("td").eq(6).css("display", "none");
            $(this).find("td").eq(7).css("display", "none");
            $(this).find("td").eq(8).css("display", "none");
            $(this).find("td").eq(9).css("display", "none");
            $(this).find("td").eq(12).css("display", "none");
            $(this).find("td").eq(13).css("display", "none");
            $(this).find("td").eq(14).css("display", "none");
            $(this).find("td").eq(15).css("display", "none");
            $(this).find("td").eq(16).css("display", "none");
            $(this).find("td").eq(17).css("display", "none");
            $(this).find("td").eq(18).css("display", "none");
            $(this).find("td").eq(4).children(".accAsgnCOArea").prop("disabled", "true");
        });
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(5).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(6).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(7).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(8).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(9).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(12).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(13).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(14).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(15).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(16).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(17).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(18).css("display", "none");
        $("#unloadingPoint").css({
            "margin-left": "10px"
        });
        $("#recipientLabel").css({
            "margin-left": "10px"
        });
        $("#recipient").css({
            "margin-left": "10px"
        });
        $("#gLAccountLabel").css({
            "margin-left": "10px"
        });
        $("#gLAccount").css({
            "margin-left": "10px"
        });
        $("#coAreaLabel").css({
            "margin-left": "10px"
        });
        $("#coArea").css({
            "margin-left": "10px"
        });
        $("#unloadingPointLabel").css({"display": "inline", "margin-left": "0px"});
        $("#unloadingPoint").css({"display": "inline", "margin-left": "10px"});
        $("#profitabilitysegmentmodelbtn").css("display", "none");
    }
    function accAsgnCat_M_Dist_SAA(requestFrom) {
        hideAllField();
        blockAllFields(requestFrom);
        $("#accAsgn_li").css("display", "block");
        $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
            $(this).find("td").eq(5).css("display", "none");
            $(this).find("td").eq(6).css("display", "none");
            $(this).find("td").eq(7).css("display", "none");
            $(this).find("td").eq(8).css("display", "none");
            $(this).find("td").eq(9).css("display", "none");
            $(this).find("td").eq(12).css("display", "none");
            $(this).find("td").eq(13).css("display", "none");
            $(this).find("td").eq(14).css("display", "none");
            $(this).find("td").eq(16).css("display", "none");
            $(this).find("td").eq(17).css("display", "none");
            $(this).find("td").eq(18).css("display", "none");
            $(this).find("td").eq(4).children(".accAsgnCOArea").prop("disabled", "true");
        });
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(5).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(6).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(7).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(8).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(9).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(12).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(13).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(14).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(16).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(17).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(18).css("display", "none");
        $("#profitabilitysegmentmodelbtn").css("display", "none");
        $("#unloadingPoint").css({
            "margin-left": "10px"
        });
        $("#recipientLabel").css({
            "margin-left": "10px"
        });
        $("#recipient").css({
            "margin-left": "27px"
        });
        $("#gLAccountLabel").css({
            "margin-left": "15px"
        });
        $("#gLAccount").css({
            "margin-left": "10px"
        });
        $("#coAreaLabel").css({
            "margin-left": "10px"
        });
        $("#coArea").css({
            "margin-left": "10px"
        });
        $("#unloadingPointLabel").css({"display": "inline", "margin-left": "0px"});
        $("#unloadingPoint").css({"display": "inline", "margin-left": "10px"});
        $("#accAsgnSalesOrderLabel").css({
            "display": "inline",
            "margin-left": "0px"
        });
        $("#accAsgnSalesOrder").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#assAsgnItemNumLabel").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#assAsgnItemNumber").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#assAsgnDelivSchLabel").css({
            "display": "inline",
            "margin-left": "15px"
        });
        $("#assAsgnDelivSch").css({
            "display": "inline",
            "margin-left": "30px"
        });
    }
    function accAsgnCat_P_Dist_SAA(requestFrom) {
        hideAllField();
        blockAllFields(requestFrom);
        $("#accAsgn_li").css("display", "block");
        $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
            $(this).find("td").eq(5).css("display", "none");
            $(this).find("td").eq(6).css("display", "none");
            $(this).find("td").eq(7).css("display", "none");
            $(this).find("td").eq(8).css("display", "none");
            $(this).find("td").eq(9).css("display", "none");
            $(this).find("td").eq(12).css("display", "none");
            $(this).find("td").eq(13).css("display", "none");
            $(this).find("td").eq(15).css("display", "none");
            $(this).find("td").eq(17).css("display", "none");
            $(this).find("td").eq(18).css("display", "none");
            $(this).find("td").eq(4).children(".accAsgnCOArea").prop("disabled", "true");
        });
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(5).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(6).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(7).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(8).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(9).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(12).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(13).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(15).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(17).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(18).css("display", "none");
        $("#profitabilitysegmentmodelbtn").css("display", "none");
        $("#unloadingPoint").css({
            "margin-left": "20px"
        });
        $("#recipientLabel").css({
            "margin-left": "10px"
        });
        $("#recipient").css({
            "margin-left": "20px"
        });
        $("#gLAccountLabel").css({
            "margin-left": "10px"
        });
        $("#gLAccount").css({
            "margin-left": "10px"
        });
        $("#coAreaLabel").css({
            "margin-left": "10px"
        });
        $("#coArea").css({
            "margin-left": "10px"
        });
        $("#unloadingPointLabel").css({"display": "inline", "margin-left": "0px"});
        $("#unloadingPoint").css({"display": "inline", "margin-left": "10px"});
        $("#wBSElementLabel").css({
            "display": "inline",
            "margin-left": "0px"
        });
        $("#accAsgnWBSElementInput").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#accAsgnNActNumLabel").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#accAsgnNActNumInput").css({
            "display": "inline",
            "margin-left": "10px"
        });
    }
    function accAsgnCat_Q_Dist_SAA(requestFrom) {
        hideAllField();
        blockAllFields(requestFrom);
        $("#accAsgn_li").css("display", "block");
        $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
            $(this).find("td").eq(5).css("display", "none");
            $(this).find("td").eq(6).css("display", "none");
            $(this).find("td").eq(7).css("display", "none");
            $(this).find("td").eq(8).css("display", "none");
            $(this).find("td").eq(9).css("display", "none");
            $(this).find("td").eq(12).css("display", "none");
            $(this).find("td").eq(13).css("display", "none");
            $(this).find("td").eq(16).css("display", "none");
            $(this).find("td").eq(4).children(".accAsgnCOArea").prop("disabled", "true");
            $(this).find("td").eq(15).children(".accAsgnSalesOrder").prop("disabled", "true");
            $(this).find("td").eq(17).children(".accAsgnItemNumber").prop("disabled", "true");
            $(this).find("td").eq(18).children(".accAsgnDeliverySchedule").prop("disabled", "true");
        });
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(5).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(6).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(7).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(8).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(9).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(12).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(13).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(16).css("display", "none");
        $("#profitabilitysegmentmodelbtn").css("display", "none");
        $("#unloadingPoint").css({
            "margin-left": "20px"
        });
        $("#recipientLabel").css({
            "margin-left": "10px"
        });
        $("#recipient").css({
            "margin-left": "25px"
        });
        $("#gLAccountLabel").css({
            "margin-left": "15px"
        });
        $("#gLAccount").css({
            "margin-left": "10px"
        });
        $("#coAreaLabel").css({
            "margin-left": "10px"
        });
        $("#coArea").css({
            "margin-left": "10px"
        });
        $("#unloadingPointLabel").css({"display": "inline", "margin-left": "0px"});
        $("#unloadingPoint").css({"display": "inline", "margin-left": "10px"});
        $("#wBSElementLabel").css({
            "display": "inline",
            "margin-left": "0px"
        });
        $("#accAsgnWBSElementInput").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#accAsgnSalesOrderLabel").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#accAsgnSalesOrder").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#assAsgnItemNumLabel").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#assAsgnItemNumber").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#assAsgnDelivSchLabel").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#assAsgnDelivSch").css({
            "display": "inline",
            "margin-left": "15px"
        });
        $("#accAsgnSalesOrder").prop("disabled", true);
        $("#assAsgnItemNumber").prop("disabled", true);
        $("#assAsgnDelivSch").prop("disabled", true);
    }
    function accAsgnCat_R_Dist_SAA(requestFrom) {
        hideAllField();
        blockAllFields(requestFrom);
        $("#accAsgn_li").css("display", "block");
        $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
            $(this).find("td").eq(12).css("display", "none");
            $(this).find("td").eq(13).css("display", "none");
//            $(this).find("td").eq(15).css("display", "none");
            $(this).find("td").eq(16).css("display", "none");
            $(this).find("td").eq(4).children(".accAsgnCOArea").prop("disabled", "true");
            $(this).find("td").eq(6).children(".accAsgnFund").prop("disabled", "true");
            $(this).find("td").eq(7).children(".accAsgnFunctionalArea").prop("disabled", "true");
            $(this).find("td").eq(8).children(".accAsgnFundCenter").prop("disabled", "true");
            $(this).find("td").eq(9).children(".accAsgnCommitmentItem").prop("disabled", "true");
        });
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(12).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(13).css("display", "none");
//        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(15).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(16).css("display", "none");
        $("#profitabilitysegmentmodelbtn").css("display", "block");
        $("#unloadingPoint").css({
            "margin-left": "10px"
        });
        $("#recipientLabel").css({
            "margin-left": "10px"
        });
        $("#recipient").css({
            "margin-left": "25px"
        });
        $("#gLAccountLabel").css({
            "margin-left": "10px"
        });
        $("#gLAccount").css({
            "margin-left": "13px"
        });
        $("#coAreaLabel").css({
            "margin-left": "10px"
        });
        $("#coArea").css({
            "margin-left": "10px"
        });
        $("#unloadingPointLabel").css({"display": "inline", "margin-left": "0px"});
        $("#unloadingPoint").css({"display": "inline", "margin-left": "10px"});
        $("#accAsgCostCenterLabel").css({
            "display": "inline",
            "margin-left": "0px"
        });
        $("#costCenterAccAsgn").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#accAsgnSalesOrderLabel").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#accAsgnSalesOrder").css({
            "display": "inline",
            "margin-left": "13px"
        });
        $("#assAsgnItemNumLabel").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#assAsgnItemNumber").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#assAsgnDelivSchLabel").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#assAsgnDelivSch").css({
            "display": "inline",
            "margin-left": "15px"
        });
        $("#accAsgnFundLabel").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#accAsgnfund").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#accAsgnfund").after("<br><br/>");
        $("#accAsgnfunctionalAreaLabel").css({
            "display": "inline",
            "margin-left": "0px"
        });
        $("#accAsgnfunctionalArea").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#accAsgnFundCenterLabel").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#accAsgnFundCenterInput").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#accAsgnCommItemLabel").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#accAsgnfund").prop("disabled", true);
        $("#accAsgnfunctionalArea").prop("disabled", true);
        $("#accAsgnFundCenterInput").prop("disabled", true);
        $("#accAsgnCommItemInput").prop("disabled", true);
        $("#accAsgnCommItemInput").css("display", "inline");
    }
    function accAsgnCat_T_Dist_SAA(requestFrom) {
        hideAllField();
        blockAllFields(requestFrom);
        $("#accAsgn_li").css("display", "block");
        $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
            $(this).find("td").eq(6).css("display", "none");
            $(this).find("td").eq(7).css("display", "none");
            $(this).find("td").eq(8).css("display", "none");
            $(this).find("td").eq(13).css("display", "none");
            $(this).find("td").eq(4).children(".accAsgnCOArea").prop("disabled", "true");
        });
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(6).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(7).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(8).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(13).css("display", "none");
        $("#profitabilitysegmentmodelbtn").css("display", "block");
        $("#unloadingPoint").css({
            "margin-left": "10px"
        });
        $("#recipientLabel").css({
            "margin-left": "10px"
        });
        $("#recipient").css({
            "margin-left": "10px"
        });
        $("#gLAccountLabel").css({
            "margin-left": "10px"
        });
        $("#gLAccount").css({
            "margin-left": "25px"
        });
        $("#coAreaLabel").css({
            "margin-left": "10px"
        });
        $("#coArea").css({
            "margin-left": "25px"
        });
        $("#unloadingPointLabel").css({"display": "inline", "margin-left": "0px"});
        $("#unloadingPoint").css({"display": "inline", "margin-left": "10px"});
        $("#accAsgCostCenterLabel").css({
            "display": "inline",
            "margin-left": "0px"
        });
        $("#costCenterAccAsgn").css("display", "inline");
        $("#assAsgnorderLabel").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#accAsgnOrder").css({
            "display": "inline",
            "margin-left": "35px"
        });
        $("#wBSElementLabel").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#accAsgnWBSElementInput").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#accAsgnSalesOrderLabel").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#accAsgnSalesOrder").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#assAsgnItemNumLabel").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#assAsgnItemNumber").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#assAsgnDelivSchLabel").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#assAsgnDelivSch").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#assAsgnDelivSch").after("<br><br/>");
        $("#accAsgnCommItemLabel").css({
            "display": "inline",
            "margin-left": "0px"

        });
        $("#accAsgnCommItemInput").css({
            "display": "inline",
            "margin-left": "20px",
            "width": "290px"
        });
        $("#accAsgnNActNumLabel").css({
            "display": "inline",
            "margin-left": "15px"
        });
        $("#accAsgnNActNumInput").css({
            "display": "inline",
            "margin-left": "25px"
        });
    }
    function accAsgnCat_U_Dist_SAA(requestFrom) {
        hideAllField();
        if ($("#account_assignment").hasClass("active") === true) {

            $("#accAsgn_li").css("display", "none");
            $("#account_assignment-tab").removeClass("active");
            $("#account_assignment").removeClass("active");
            $("#quantities").addClass("active");
            $("#quantities-tab").addClass("active");
            $("#quantities-tab").addClass("show");
        } else {
            $("#accAsgn_li").css("display", "none");
        }

        $("#profitabilitysegmentmodelbtn").css("display", "none");
    }
    function accAsgnCat_X_Dist_SAA(requestFrom) {
        hideAllField();
        blockAllFields(requestFrom);
        $("#accAsgn_li").css("display", "block");
        $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
            $(this).find("td").eq(6).css("display", "none");
            $(this).find("td").eq(7).css("display", "none");
            $(this).find("td").eq(8).css("display", "none");
            $(this).find("td").eq(9).css("display", "none");
            $(this).find("td").eq(13).css("display", "none");
            $(this).find("td").eq(16).css("display", "none");
            $(this).find("td").eq(4).children(".accAsgnCOArea").prop("disabled", "true");
        });
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(6).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(7).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(8).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(9).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(13).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(16).css("display", "none");
        $("#profitabilitysegmentmodelbtn").css("display", "none");
        $("#unloadingPoint").css({
            "margin-left": "10px"
        });
        $("#recipientLabel").css({
            "margin-left": "10px"
        });
        $("#recipient").css({
            "margin-left": "10px"
        });
        $("#gLAccountLabel").css({
            "margin-left": "15px"
        });
        $("#gLAccount").css({
            "margin-left": "20px"
        });
        $("#coAreaLabel").css({
            "margin-left": "10px"
        });
        $("#coArea").css({
            "margin-left": "27px"
        });
        $("#unloadingPointLabel").css({"display": "inline", "margin-left": "0px"});
        $("#unloadingPoint").css({"display": "inline", "margin-left": "10px"});
        $("#accAsgCostCenterLabel").css({
            "display": "inline",
            "margin-left": "0px"
        });
        $("#costCenterAccAsgn").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#assAsgnorderLabel").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#accAsgnOrder").css({
            "display": "inline",
            "margin-left": "35px"
        });
        $("#wBSElementLabel").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#accAsgnWBSElementInput").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#accAsgnSalesOrderLabel").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#accAsgnSalesOrder").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#assAsgnItemNumLabel").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#assAsgnItemNumber").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#assAsgnDelivSchLabel").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#assAsgnDelivSch").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#assAsgnDelivSch").after("<br><br/>");
    }
    function accAsgnCat_Z_Dist_SAA(requestFrom) {
//        $("#unloadingPointLabel").css("display", "none");
//        $("#unloadingPoint").css("display", "none");
        $("#recipientLabel").css({
            "margin-left": "5px"
        });
        $("#recipient").css({
            "margin-left": "20px"
        });
        hideAllField();
        blockAllFields(requestFrom);
        $("#accAsgn_li").css("display", "block");
        $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {

            $(this).find("td").eq(6).css("display", "none");
            $(this).find("td").eq(7).css("display", "none");
            $(this).find("td").eq(8).css("display", "none");
            $(this).find("td").eq(9).css("display", "none");
            $(this).find("td").eq(10).css("display", "none");
            $(this).find("td").eq(13).css("display", "none");
            $(this).find("td").eq(14).css("display", "none");
            $(this).find("td").eq(15).css("display", "none");
            $(this).find("td").eq(16).css("display", "none");
            $(this).find("td").eq(17).css("display", "none");
            $(this).find("td").eq(18).css("display", "none");
            $(this).find("td").eq(4).children(".accAsgnCOArea").prop("disabled", "true");
        });
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(6).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(7).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(8).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(9).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(10).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(13).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(14).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(15).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(16).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(17).css("display", "none");
        $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(18).css("display", "none");
        $("#profitabilitysegmentmodelbtn").css("display", "none");
        $("#gLAccountLabel").css({
            "margin-left": "10px"
        });
        $("#gLAccount").css({
            "margin-left": "10px"
        });
        $("#coAreaLabel").css({
            "margin-left": "10px"
        });
        $("#coArea").css({
            "margin-left": "10px"
        });
        $("#accAsgCostCenterLabel").css({
            "display": "inline",
            "margin-left": "5px"
        });
        $("#costCenterAccAsgn").css({
            "display": "inline",
            "margin-left": "5px"
        });
        $("#assAsgnorderLabel").css({
            "display": "inline",
            "margin-left": "10px"
        });
        $("#accAsgnOrder").css({
            "display": "inline",
            "margin-left": "45px"
        });
    }
    
    $("#gLAccount").click(function() {
        $("#gLAccountModal").modal("show");
        getAllGLCode();
        $("#ro_GLCOde").val("FromInputField");
    });
    var gLAccountTable = null;
    function getAllGLCode() {
        $.ajax({
            type: "GET",
            url: "doajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "getAllGLCode",
                "companyCode": $("#companycodeHeader").val()
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log("Obj length :" + obj.length);
                var row = "";
                for (var i = 0; i < obj.length; i++) {
                    row += "<tr>"
                            + "<td><input type='checkbox' class='gLCodeCheckboxClass'></td>"
                            + "<td>" + obj[i].CODE + "</td>"
                            + "<td>" + obj[i].DESCRIPTION + "</td>"
                            + "</tr>";
                }

                $("#gLAccountTableId tbody").append(row);
                if ($.fn.DataTable.isDataTable('#gLAccountTableId')) {
                    gLAccountTable.destroy();
                    gLAccountTable = null;
                    $("#gLAccountTableId").children('tbody').html(row);
                    gLAccountTable = $('table.gLAccountTable-Class').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    gLAccountTable.buttons().container()
                            .appendTo('#gLAccountTableId_wrapper .col-md-6:eq(0)');
                } else {
                    $('#gLAccountTableId thead tr').clone(true).appendTo('#gLAccountTableId thead');
                    $('#gLAccountTableId thead tr:eq(1) th').each(function(i) {
                        $('#gLAccountTableId thead tr:eq(0) th').addClass("table-header-color");
                        var title = $(this).text();
                        if (title === '') {
                            $(this).html('');
                        } else {
                            $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                        }
                        $('input', this).on('keyup change', function() {
                            if (gLAccountTable.column(i).search() !== this.value) {
                                gLAccountTable
                                        .column(i)
                                        .search(this.value)
                                        .draw();
                            }
                        });
                    });
                    gLAccountTable = $('table.gLAccountTable-Class').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    gLAccountTable.buttons().container()
                            .appendTo('#gLAccountTableId_wrapper .col-md-6:eq(0)');
                }
            }
        });
    }
    $("#coArea").click(function() {
        $("#coAreaModal").modal("show");
    });
    $("#costCenterAccAsgn").click(function() {
        $("#ro_costCenter").val("FromInputField");
        getAllCostCenter();
        $("#costCenterModal").modal("show");
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

    $("#fund").click(function() {
        $("#fundModal").modal("show");
    });
    $("#functionalArea").click(function() {
        $("#functionalAreaModal").modal("show");
    });
    $("#fundCenter").click(function() {
        $("#fundCenterModal").modal("show");
    });
    $("#commitmentItem").click(function() {
        $("#commitmentItemModal").modal("show");
    });
    $("#accAsgnOrder").click(function() {
        $("#accAsgnOrderModal").modal("show");
        getAllInterOrder();
        $("#ro_Order").val("FromField");
    });
    var orderTable = null;
    function getAllInterOrder() {

        var accAsgn;
        $("#material_headerClass tbody tr").each(function() {
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var insertionid = $("#ItemNumberSelect").val();
            if (insertionid === id) {
                accAsgn = $(this).find("td").eq(1).children(".accountAssignmentClass").val();
            }
        });
        $.ajax({
            type: "GET",
            url: "doajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "getAllInterOrder",
                "accAsgn": accAsgn
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log("Obj length :" + obj.length);
                var row = "";
                for (var i = 0; i < obj.length; i++) {
                    row += "<tr>"
                            + "<td><input type='checkbox' class='accAsgnOrderCheckboxClass'></td>"
                            + "<td>" + (obj[i].internalOrder === undefined ? "" : obj[i].internalOrder) + "</td>"
                            + "<td>" + (obj[i].IODescription === undefined ? "" : obj[i].IODescription) + "</td>"
                            + "</tr>";
                }
                $("#accAsgnOrderTableId tbody").append(row);
                if ($.fn.DataTable.isDataTable('#accAsgnOrderTableId')) {
                    orderTable.destroy();
                    orderTable = null;
                    $("#accAsgnOrderTableId").children('tbody').html(row);
                    orderTable = $('table.accAsgnOrderTable-Class').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    orderTable.buttons().container()
                            .appendTo('#accAsgnOrderTableId_wrapper .col-md-6:eq(0)');
                } else {
                    $('#accAsgnOrderTableId thead tr').clone(true).appendTo('#accAsgnOrderTableId thead');
                    $('#accAsgnOrderTableId thead tr:eq(1) th').each(function(i) {
                        $('#accAsgnOrderTableId thead tr:eq(0) th').addClass("table-header-color");
                        var title = $(this).text();
                        if (title === '') {
                            $(this).html('');
                        } else {
                            $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                        }
                        $('input', this).on('keyup change', function() {
                            if (orderTable.column(i).search() !== this.value) {
                                orderTable
                                        .column(i)
                                        .search(this.value)
                                        .draw();
                            }
                        });
                    });
                    orderTable = $('table.accAsgnOrderTable-Class').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    orderTable.buttons().container()
                            .appendTo('#accAsgnOrderTableId_wrapper .col-md-6:eq(0)');
                }
            }
        });
    }
    $("#accAsgnCommItemInput").click(function() {
        $("#commitmentItemModal").modal("show");
        getAllCommitmentItem();
        $("#ro_CommitItem").val("FromInputField");
    });
    var commitmentItemTable = null;
    function getAllCommitmentItem() {
        $.ajax({
            type: "GET",
            url: "doajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "getAllCommitmentItem"
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log("Obj length :" + obj.length);
                var row = "";
                for (var i = 0; i < obj.length; i++) {
                    row += "<tr>"
                            + "<td><input type='checkbox' class='commmentItemCheckboxClass'></td>"
                            + "<td>" + obj[i].ITEM + "</td>"
                            + "<td>" + obj[i].NAME + "</td>"
                            + "</tr>";
                }
                $("#commitmentItemTableId tbody").append(row);
                if ($.fn.DataTable.isDataTable('#commitmentItemTableId')) {
                    commitmentItemTable.destroy();
                    commitmentItemTable = null;
                    $("#commitmentItemTableId").children('tbody').html(row);
                    commitmentItemTable = $('table.commitmentItemTable-Class').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    commitmentItemTable.buttons().container()
                            .appendTo('#commitmentItemTableId_wrapper .col-md-6:eq(0)');
                } else {
                    $('#commitmentItemTableId thead tr').clone(true).appendTo('#commitmentItemTableId thead');
                    $('#commitmentItemTableId thead tr:eq(1) th').each(function(i) {
                        $('#commitmentItemTableId thead tr:eq(0) th').addClass("table-header-color");
                        var title = $(this).text();
                        if (title === '') {
                            $(this).html('');
                        } else {
                            $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                        }
                        $('input', this).on('keyup change', function() {
                            if (commitmentItemTable.column(i).search() !== this.value) {
                                commitmentItemTable
                                        .column(i)
                                        .search(this.value)
                                        .draw();
                            }
                        });
                    });
                    commitmentItemTable = $('table.commitmentItemTable-Class').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    commitmentItemTable.buttons().container()
                            .appendTo('#commitmentItemTableId_wrapper .col-md-6:eq(0)');
                }
            }
        });
    }
    $("#accAsgnWBSElementInput").click(function() {
        $("#WBSElementModal").modal("show");
        getAllMasterWBSElement();
        $("#ro_WBSElement").val("FromInputField");
    });
    var wBSElementTable = null;
    function getAllMasterWBSElement() {
        $.ajax({
            type: "GET",
            url: "doajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "getAllMasterWBSElement"
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log("Obj length :" + obj.length);
                var row = "";
                for (var i = 0; i < obj.length; i++) {
                    row += "<tr>"
                            + "<td><input type='checkbox' class='wBSElementCheckboxClass'></td>"
                            + "<td>" + obj[i].CODE + "</td>"
                            + "<td>" + obj[i].DESCRIPTION + "</td>"
                            + "</tr>";
                }
                $("#WBSElementTableId tbody").append(row);
                if ($.fn.DataTable.isDataTable('#WBSElementTableId')) {
                    wBSElementTable.destroy();
                    wBSElementTable = null;
                    $("#WBSElementTableId").children('tbody').html(row);
                    wBSElementTable = $('table.WBSElementClass').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    wBSElementTable.buttons().container()
                            .appendTo('#WBSElementTableId_wrapper .col-md-6:eq(0)');
                } else {
                    $('#WBSElementTableId thead tr').clone(true).appendTo('#WBSElementTableId thead');
                    $('#WBSElementTableId thead tr:eq(1) th').each(function(i) {
                        $('#WBSElementTableId thead tr:eq(0) th').addClass("table-header-color");
                        var title = $(this).text();
                        if (title === '') {
                            $(this).html('');
                        } else {
                            $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                        }
                        $('input', this).on('keyup change', function() {
                            if (wBSElementTable.column(i).search() !== this.value) {
                                wBSElementTable
                                        .column(i)
                                        .search(this.value)
                                        .draw();
                            }
                        });
                    });
                    wBSElementTable = $('table.WBSElementClass').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    wBSElementTable.buttons().container()
                            .appendTo('#WBSElementTableId_wrapper .col-md-6:eq(0)');
                }
            }
        });
    }
    $("#accAsgnNActNumInput").click(function() {
        $("#networkActivityNumberModal").modal("show");
        getAllMasterNetwork();
        $("#ro_NetworkNumber").val("FromInputField");
    });
    var networkActivityTable = null;
    function getAllMasterNetwork() {
        $.ajax({
            type: "GET",
            url: "doajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "getAllMasterNetwork",
                "companyCode": $("#companycodeHeader").val()
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log("Obj length :" + obj.length);
                var row = "";
                for (var i = 0; i < obj.length; i++) {
                    row += "<tr>"
                            + "<td><input type='checkbox' class='networkActivityNumberCheckboxClass'></td>"
                            + "<td>" + obj[i].NETWORK + "</td>"
                            + "<td>" + obj[i].DESCRIPTION + "</td>"
                            + "</tr>";
                }
                $("#networkActivityNumberTableId tbody").append(row);
                if ($.fn.DataTable.isDataTable('#networkActivityNumberTableId')) {
                    networkActivityTable.destroy();
                    networkActivityTable = null;
                    $("#networkActivityNumberTableId").children('tbody').html(row);
                    networkActivityTable = $('table.networkActivityNumberClass').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    networkActivityTable.buttons().container()
                            .appendTo('#networkActivityNumberTableId_wrapper .col-md-6:eq(0)');
                } else {
                    $('#networkActivityNumberTableId thead tr').clone(true).appendTo('#networkActivityNumberTableId thead');
                    $('#networkActivityNumberTableId thead tr:eq(1) th').each(function(i) {
                        $('#networkActivityNumberTableId thead tr:eq(0) th').addClass("table-header-color");
                        var title = $(this).text();
                        if (title === '') {
                            $(this).html('');
                        } else {
                            $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                        }
                        $('input', this).on('keyup change', function() {
                            if (networkActivityTable.column(i).search() !== this.value) {
                                networkActivityTable
                                        .column(i)
                                        .search(this.value)
                                        .draw();
                            }
                        });
                    });
                    networkActivityTable = $('table.networkActivityNumberClass').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    networkActivityTable.buttons().container()
                            .appendTo('#networkActivityNumberTableId_wrapper .col-md-6:eq(0)');
                }
            }
        });
    }
    $("#accAsgnAsset").click(function() {
        $("#accAsgnAssetModal").modal("show");
        getAllMasterAsset();
        $("#ro_Asset").val("FromInputField");
    });
    
     var assetTable = null;
    function getAllMasterAsset() {
        $.ajax({
            type: "GET",
            url: "doajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "getAllMasterAsset",
                "companyCode": $("#companycodeHeader").val()
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log("Obj length :" + obj.length);
                var row = "";
                for (var i = 0; i < obj.length; i++) {
                    row += "<tr>"
                            + "<td><input type='checkbox' class='accAsgnAssetCheckboxClass'></td>"
                            + "<td>" + obj[i].ASSET + "</td>"
                            + "<td>" + obj[i].DESCRIPTION + "</td>"
                            + "</tr>";
                }
                $("#accAsgnAssetTableId tbody").append(row);
                if ($.fn.DataTable.isDataTable('#accAsgnAssetTableId')) {
                    assetTable.destroy();
                    assetTable = null;
                    $("#accAsgnAssetTableId").children('tbody').html(row);
                    assetTable = $('table.accAsgnAssetClass').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    assetTable.buttons().container()
                            .appendTo('#accAsgnAssetTableId_wrapper .col-md-6:eq(0)');
                } else {
                    $('#accAsgnAssetTableId thead tr').clone(true).appendTo('#accAsgnAssetTableId thead');
                    $('#accAsgnAssetTableId thead tr:eq(1) th').each(function(i) {
                        $('#accAsgnAssetTableId thead tr:eq(0) th').addClass("table-header-color");
                        var title = $(this).text();
                        if (title === '') {
                            $(this).html('');
                        } else {
                            $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search" />');
                        }
                        $('input', this).on('keyup change', function() {
                            if (assetTable.column(i).search() !== this.value) {
                                assetTable
                                        .column(i)
                                        .search(this.value)
                                        .draw();
                            }
                        });
                    });
                    assetTable = $('table.accAsgnAssetClass').DataTable({
                        lengthChange: false,
                        orderCellsTop: true
                    });
                    assetTable.buttons().container()
                            .appendTo('#accAsgnAssetTableId_wrapper .col-md-6:eq(0)');
                }
            }
        });
    }
    
     $("#costCenterTableId").on("click", ".costCenterCheckboxClass", function() {
        $(".costCenterCheckboxClass").prop("checked", false);
        var costCenter = $(this).parent().parent().find("td").eq(1).html();
        console.log(costCenter);
        var companycode = $("#companycodeHeader").val();
        var requestFrom = $("#ro_costCenter").val();
        var fund;
        var coArea;
        var fUNCTIONALAREA;
        $("#costCenterModal").modal("hide");
        var costCenterId = $(this).val();
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {"reqFrom": "getFromCostCenter",
                "costCenter": costCenter
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log("FUND :" + obj.FUND);
                console.log("FUNDCENTER :" + obj.FUNDCENTER);
                console.log("FUNCTIONALAREA :" + obj.FUNCTIONALAREA);
                //console.log("COMMITMENTITEM :" + obj.COMMITMENTITEM);
                fUNCTIONALAREA=obj.FUNCTIONALAREA;
                console.log("COAREA :" + obj.COAREA);
                coArea = obj.COAREA;
            }
        });
        var companycode = $("#companycodeHeader").val();
        $("#accAsgnfunctionalArea").val(companycode);
        $("#companyCodeService").val(companycode);
        $("#functionalAreaService").val(companycode);
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {"reqFrom": "getFundFMAreaByComCode",
                "companyCode": "0640"
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log("FUND :" + obj.FUND);
                fund = obj.FUND;
            }
        });
        
        if (requestFrom === 'FromInputField') {
           
            $("#costCenterAccAsgn").val(costCenter);
            $("#accAsgnFundCenterInput").val(costCenter);
            $("#accAsgnfund").val(fund);
            $("#accAsgnfunctionalArea").val(fUNCTIONALAREA);
            
            
            $("#coArea").val(coArea);
        } else if (requestFrom === 'FromTable') {
            currentClick.find("td").eq(4).children(".accAsgnCOArea").val(coArea);
            currentClick.find("td").eq(5).children(".accAsgnCostCetner").val(costCenter);
            currentClick.find("td").eq(6).children(".accAsgnFund").val(fund);
            currentClick.find("td").eq(8).children(".accAsgnFundCenter").val(costCenter);
            currentClick.find("td").eq(8).children(".accAsgnFunctionalArea").val(fUNCTIONALAREA);
            currentClick.find("td").eq(7).children(".accAsgnFunctionalArea").val(companycode);
        } else if (requestFrom === 'FromServiceTabInputField') {
            $("#costCenterService").val(costCenter);
            $("#FundCenterServiceInput").val(costCenter);
            $("#fundService").val(fund);
            $("#coAreaService").val(coArea);
        } else if (requestFrom === 'FromLimitTabInputField') {
            $("#costCenterInp_Limits").val(costCenter);
            $("#fundCenterInp_Limits").val(costCenter);
            $("#fundInp_Limits").val(fund);
            $("#coAreaInp_Limits").val(coArea);
            $("#companyCodeInp_Limits").val(companycode);
            $("#functionalAreaInp_Limits").val(companycode);
            $('#costCenterModal').modal("hide");
            $("#limitsAccAssignmentModal").modal("show");
        } else if (requestFrom === "FromLimitTabAccAsgnTableInputField") {
            currentClick.find("td").eq(3).children(".limitAccAsgnTblCOArea").val(coArea);
            currentClick.find("td").eq(4).children(".limitAccAsgnTblCostCetner").val(costCenter);
            currentClick.find("td").eq(5).children(".limitAccAsgnTblFund").val(fund);
            currentClick.find("td").eq(7).children(".limitAccAsgnTblFundCenter").val(costCenter);
            currentClick.find("td").eq(6).children(".limitAccAsgnTblFunctionalArea").val(companycode);
            currentClick.find("td").eq(4).children(".limitAccAsgnTblCostCetner").css("border-color", "");
            $('#costCenterModal').modal("hide");
            $("#limitsChangeAccAsgnScreenModal").modal("show");
        } else if (requestFrom === 'FromServiceTabAccAsgnTableInputField') {
            currentClick.find("td").eq(4).children(".serviceAccAsgnTblCOArea").val(coArea);
            currentClick.find("td").eq(5).children(".serviceAccAsgnTblCostCetner").val(costCenter);
            currentClick.find("td").eq(6).children(".serviceAccAsgnTblFund").val(fund);
            currentClick.find("td").eq(8).children(".serviceAccAsgnTblFundCenter").val(costCenter);
            currentClick.find("td").eq(7).children(".serviceAccAsgnTblFunctionalArea").val(companycode);
            currentClick.find("td").eq(5).children(".serviceAccAsgnTblCostCetner").css("border-color", "");
            $('#costCenterModal').modal("hide");
            $("#changeAccountAssignmentScreenModal").modal("show");
        }
    });
$("#costCenteraccountAssignmentTebleId").on("change", ".accAsgnQuantity", function() {

        var totalQuant  ;
        var accAssignment  ;
        $("#contractItemTableId tbody tr").each(function () {
            var itemNumber = $(this).find("td").children(".lineItemNumberServices").val();
            var dropDownItemNumber = $(".ItemNumberSelectClass").val();
            if (dropDownItemNumber === itemNumber) {
                totalQuant = $(this).find("td").children(".targQtyClass").val();
                accAssignment= $(this).find("td").children(".accountAssignmentClass").val();
            }
        });
        var quantity = $(this).val();
        var current_tr = $(this).parent().parent();
        console.log("quantity :" + quantity);
        console.log("totalQuant :" + totalQuant);
        console.log("Max Quant :" + this.max);
        var remainingQuantity = parseFloat(this.max) - parseFloat(quantity);
        var percentage = (quantity / (totalQuant) * 100).toFixed(2);
        var remPer = (remainingQuantity / totalQuant * 100).toFixed(2);
       var glCode = $(this).parent().parent().find("td").children(".accAsgnGLAccount").val();
        console.log(glCode);
        console.log("remainingQuantity :" + remainingQuantity);
        console.log("remPer :" + remPer);
        if (parseFloat(this.value) < parseFloat(this.max)) {
            $(this).attr({
                "max": quantity,
                "value": quantity
            });
            $(this).val(quantity);
            $(this).parent().parent().find("td").eq(2).children(".accAsgnPercentage").attr({
                "max": percentage,
                "value": percentage
            });
            $(this).parent().parent().find("td").eq(2).children(".accAsgnPercentage").val(percentage);
            $("#contractItemTableId tbody tr").each(function () {
            var itemNumber = $(this).find("td").children(".lineItemNumberServices").val();
            var dropDownItemNumber = $(".ItemNumberSelectClass").val();
            if (dropDownItemNumber === itemNumber) {
                  var linkID = $(this).find("td").children(".linkIdClass").val();
                  var rowCount = $("#costCenteraccountAssignmentTebleId tr").closest("tr").length;
                     var row = "<tr><td>" + '<input type=hidden class="form-control form-rounded input-height acclinkIDClass" value=' + linkID+ '><i class="fa fa-window-close deleteAccAsgnTableRowClass" aria-hidden="true" style="width:22px;">' +
                           // + '<input type=hidden class="form-control form-rounded input-height acclinkIDClass" value=' + linkID+ '>'+
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnQuantity" value=' + remainingQuantity + ' max=' + remainingQuantity + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnPercentage" disabled value=' + remPer + ' max=' + remPer + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnGLAccount" value='+glCode+'>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnCOArea" disabled value="">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnCostCetner" value="">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnFund" value="">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnFunctionalArea" value="">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnFundCenter" value="">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnCommitmentItem" value='+glCode+'>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnUnloadingPoint" value="">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnRecipients" value="">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnOrder" value="">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnAssets" value="">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnWBSElement" value="">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnSalesOrder" value="">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnNetActNumber" value="">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnItemNumber" value=' + (rowCount *10) + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnDeliverySchedule" value="">' +
                            "</td></tr>";
                    $("#costCenteraccountAssignmentTebleId").children("tbody").append(row);
                    accAsgnTblQuantPerChange(current_tr, accAssignment);
                }
            });
        } else {
            $(this).val(this.max);
        }

    });
    $("#costCenteraccountAssignmentTebleId").on("change", ".accAsgnPercentage", function() {
         var totalQuant  ;
        var accAssignment  ;
        $("#contractItemTableId tbody tr").each(function () {
            var itemNumber = $(this).find("td").children(".lineItemNumberServices").val();
            var dropDownItemNumber = $(".ItemNumberSelectClass").val();
            if (dropDownItemNumber === itemNumber) {
                totalQuant = $(this).find("td").children(".targQtyClass").val();
                accAssignment= $(this).find("td").children(".accountAssignmentClass").val();
            }
        });
        var percentage = $(this).val();
        var current_tr = $(this).parent().parent();
        var maxQuantity = $(this).parent().parent().find("td").eq(1).children(".accAsgnQuantity").attr("max");
        var glCode = $(this).parent().parent().find("td").children(".accAsgnGLAccount").val();
        console.log(glCode);
        console.log("percentage :" + percentage);
        console.log("totalQuant :" + totalQuant);
        console.log("max :" + maxQuantity);
        var remPer = this.max - percentage;
        var quantFromPer = parseInt(totalQuant) * parseInt(percentage) / 100;
        var remainingQuantity = maxQuantity - parseFloat(quantFromPer);
        if (parseFloat(this.value) < parseFloat(this.max)) {
            $(this).attr({
                "max": percentage,
                "value": percentage
            });
            $(this).parent().parent().find("td").eq(1).children(".accAsgnQuantity").attr({
                "max": quantFromPer,
                "value": quantFromPer
            });
            $(this).parent().parent().find("td").eq(1).children(".accAsgnQuantity").val(quantFromPer);
            //       
            $("#contractItemTableId tbody tr").each(function () {
            var itemNumber = $(this).find("td").children(".lineItemNumberServices").val();
            var dropDownItemNumber = $(".ItemNumberSelectClass").val();
            if (dropDownItemNumber === itemNumber) {
                var linkID = $(this).find("td").children(".linkIdClass").val();
                var rowCount = $("#costCenteraccountAssignmentTebleId tr").closest("tr").length;
                    var row = "<tr><td>" + '<input type=hidden class="form-control form-rounded input-height acclinkIDClass" value=' + linkID+ '><i class="fa fa-window-close deleteAccAsgnTableRowClass" aria-hidden="true" style="width:22px;">' +
                           // + '<input type=hidden class="form-control form-rounded input-height acclinkIDClass" value=' + linkID+ '>'+
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnQuantity" disabled value=' + remainingQuantity + ' max=' + remainingQuantity + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnPercentage" value=' + remPer + ' max=' + remPer + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnGLAccount" value='+glCode+'>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnCOArea" disabled value="">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnCostCetner" value="">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnFund" value="">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnFunctionalArea" value="">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnFundCenter" value="">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnCommitmentItem" value='+glCode+'>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnUnloadingPoint" value="">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnRecipients" value="">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnOrder" value="">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnAssets" value="">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnWBSElement" value="">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnSalesOrder" value="">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnNetActNumber" value="">' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnItemNumber" value=' + (rowCount *10) + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnDeliverySchedule" value="">' +
                            "</td></tr>";
                    $("#costCenteraccountAssignmentTebleId").children("tbody").append(row);
                    accAsgnTblQuantPerChange(current_tr, accAssignment);
                }
            });
        } else {
            $(this).val(this.max);
        }
    });
    function accAsgnTblQuantPerChange(current_tr, material_header_table_AccAsgn) {
        if (material_header_table_AccAsgn === 'K') {
            current_tr.next().find("td").eq(12).css("display", "none");
            current_tr.next().find("td").eq(13).css("display", "none");
            current_tr.next().find("td").eq(14).css("display", "none");
            current_tr.next().find("td").eq(15).css("display", "none");
            current_tr.next().find("td").eq(16).css("display", "none");
            current_tr.next().find("td").eq(17).css("display", "none");
            current_tr.next().find("td").eq(18).css("display", "none");
            current_tr.next().find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", true);
            current_tr.next().find("td").eq(6).children(".accAsgnFund").prop("disabled", true);
            current_tr.next().find("td").eq(7).children(".accAsgnFunctionalArea").prop("disabled", true);
            current_tr.next().find("td").eq(8).children(".accAsgnFundCenter").prop("disabled", true);
            current_tr.next().find("td").eq(9).children(".accAsgnCommitmentItem").prop("disabled", true);
        } else if (material_header_table_AccAsgn === 'N') {
            current_tr.next().find("td").eq(6).css("display", "none");
            current_tr.next().find("td").eq(7).css("display", "none");
            current_tr.next().find("td").eq(8).css("display", "none");
            current_tr.next().find("td").eq(9).css("display", "none");
            current_tr.next().find("td").eq(12).css("display", "none");
            current_tr.next().find("td").eq(13).css("display", "none");
            current_tr.next().find("td").eq(14).css("display", "none");
            current_tr.next().find("td").eq(15).css("display", "none");
            current_tr.next().find("td").eq(17).css("display", "none");
            current_tr.next().find("td").eq(18).css("display", "none");
            current_tr.next().find("td").eq(5).children(".accAsgnCostCetner").prop("disabled", true);
        } else if (material_header_table_AccAsgn === 'A') {
            current_tr.next().find("td").eq(5).css("display", "none");
            current_tr.next().find("td").eq(6).css("display", "none");
            current_tr.next().find("td").eq(7).css("display", "none");
            current_tr.next().find("td").eq(8).css("display", "none");
            current_tr.next().find("td").eq(9).css("display", "none");
            current_tr.next().find("td").eq(15).css("display", "none");
            current_tr.next().find("td").eq(16).css("display", "none");
            current_tr.next().find("td").eq(17).css("display", "none");
            current_tr.next().find("td").eq(18).css("display", "none");
            current_tr.next().find("td").eq(3).children(".accAsgnGLAccount").prop("disabled", true);
            current_tr.next().find("td").eq(14).children(".accAsgnWBSElement").prop("disabled", true);
        } else if (material_header_table_AccAsgn === 'B') {
            current_tr.next().find("td").eq(5).css("display", "none");
            current_tr.next().find("td").eq(6).css("display", "none");
            current_tr.next().find("td").eq(7).css("display", "none");
            current_tr.next().find("td").eq(8).css("display", "none");
            current_tr.next().find("td").eq(9).css("display", "none");
            current_tr.next().find("td").eq(12).css("display", "none");
            current_tr.next().find("td").eq(13).css("display", "none");
            current_tr.next().find("td").eq(14).css("display", "none");
            current_tr.next().find("td").eq(15).css("display", "none");
            current_tr.next().find("td").eq(16).css("display", "none");
            current_tr.next().find("td").eq(17).css("display", "none");
            current_tr.next().find("td").eq(18).css("display", "none");
        } else if (material_header_table_AccAsgn === 'C') {
            current_tr.next().find("td").eq(5).css("display", "none");
            current_tr.next().find("td").eq(6).css("display", "none");
            current_tr.next().find("td").eq(7).css("display", "none");
            current_tr.next().find("td").eq(8).css("display", "none");
            current_tr.next().find("td").eq(9).css("display", "none");
            current_tr.next().find("td").eq(12).css("display", "none");
            current_tr.next().find("td").eq(13).css("display", "none");
            current_tr.next().find("td").eq(14).css("display", "none");
            current_tr.next().find("td").eq(16).css("display", "none");
        } else if (material_header_table_AccAsgn === 'D') {
            current_tr.next().find("td").eq(5).css("display", "none");
            current_tr.next().find("td").eq(6).css("display", "none");
            current_tr.next().find("td").eq(7).css("display", "none");
            current_tr.next().find("td").eq(8).css("display", "none");
            current_tr.next().find("td").eq(9).css("display", "none");
            current_tr.next().find("td").eq(12).css("display", "none");
            current_tr.next().find("td").eq(13).css("display", "none");
            current_tr.next().find("td").eq(16).css("display", "none");
        } else if (material_header_table_AccAsgn === 'E') {
            current_tr.next().find("td").eq(5).css("display", "none");
            current_tr.next().find("td").eq(6).css("display", "none");
            current_tr.next().find("td").eq(7).css("display", "none");
            current_tr.next().find("td").eq(8).css("display", "none");
            current_tr.next().find("td").eq(9).css("display", "none");
            current_tr.next().find("td").eq(12).css("display", "none");
            current_tr.next().find("td").eq(13).css("display", "none");
            current_tr.next().find("td").eq(14).css("display", "none");
            current_tr.next().find("td").eq(16).css("display", "none");
        } else if (material_header_table_AccAsgn === 'F') {
            current_tr.next().find("td").eq(13).css("display", "none");
            current_tr.next().find("td").eq(14).css("display", "none");
            current_tr.next().find("td").eq(15).css("display", "none");
            current_tr.next().find("td").eq(16).css("display", "none");
            current_tr.next().find("td").eq(17).css("display", "none");
            current_tr.next().find("td").eq(18).css("display", "none");
            current_tr.next().find("td").eq(6).children(".accAsgnFund").prop("disabled", true);
            current_tr.next().find("td").eq(7).children(".accAsgnFunctionalArea").prop("disabled", true);
            current_tr.next().find("td").eq(8).children(".accAsgnFundCenter").prop("disabled", true);
            current_tr.next().find("td").eq(9).children(".accAsgnCommitmentItem").prop("disabled", true);
        } else if (material_header_table_AccAsgn === 'G') {
            current_tr.next().find("td").eq(5).css("display", "none");
            current_tr.next().find("td").eq(6).css("display", "none");
            current_tr.next().find("td").eq(7).css("display", "none");
            current_tr.next().find("td").eq(8).css("display", "none");
            current_tr.next().find("td").eq(9).css("display", "none");
            current_tr.next().find("td").eq(12).css("display", "none");
            current_tr.next().find("td").eq(13).css("display", "none");
            current_tr.next().find("td").eq(14).css("display", "none");
            current_tr.next().find("td").eq(15).css("display", "none");
            current_tr.next().find("td").eq(16).css("display", "none");
            current_tr.next().find("td").eq(17).css("display", "none");
            current_tr.next().find("td").eq(18).css("display", "none");
        } else if (material_header_table_AccAsgn === 'M') {
            current_tr.next().find("td").eq(5).css("display", "none");
            current_tr.next().find("td").eq(6).css("display", "none");
            current_tr.next().find("td").eq(7).css("display", "none");
            current_tr.next().find("td").eq(8).css("display", "none");
            current_tr.next().find("td").eq(9).css("display", "none");
            current_tr.next().find("td").eq(12).css("display", "none");
            current_tr.next().find("td").eq(13).css("display", "none");
            current_tr.next().find("td").eq(14).css("display", "none");
            current_tr.next().find("td").eq(16).css("display", "none");
        } else if (material_header_table_AccAsgn === 'P') {
            current_tr.next().find("td").eq(5).css("display", "none");
            current_tr.next().find("td").eq(6).css("display", "none");
            current_tr.next().find("td").eq(7).css("display", "none");
            current_tr.next().find("td").eq(8).css("display", "none");
            current_tr.next().find("td").eq(9).css("display", "none");
            current_tr.next().find("td").eq(12).css("display", "none");
            current_tr.next().find("td").eq(13).css("display", "none");
            current_tr.next().find("td").eq(15).css("display", "none");
            current_tr.next().find("td").eq(17).css("display", "none");
            current_tr.next().find("td").eq(18).css("display", "none");
        } else if (material_header_table_AccAsgn === 'Q') {
            current_tr.next().find("td").eq(5).css("display", "none");
            current_tr.next().find("td").eq(6).css("display", "none");
            current_tr.next().find("td").eq(7).css("display", "none");
            current_tr.next().find("td").eq(8).css("display", "none");
            current_tr.next().find("td").eq(9).css("display", "none");
            current_tr.next().find("td").eq(12).css("display", "none");
            current_tr.next().find("td").eq(13).css("display", "none");
            current_tr.next().find("td").eq(16).css("display", "none");
            current_tr.next().find("td").eq(15).children(".accAsgnSalesOrder").prop("disabled", true);
            current_tr.next().find("td").eq(17).children(".accAsgnItemNumber").prop("disabled", true);
            current_tr.next().find("td").eq(18).children(".accAsgnDeliverySchedule").prop("disabled", true);
        } else if (material_header_table_AccAsgn === 'R') {
            current_tr.next().find("td").eq(12).css("display", "none");
            current_tr.next().find("td").eq(13).css("display", "none");
            current_tr.next().find("td").eq(15).css("display", "none");
            current_tr.next().find("td").eq(16).css("display", "none");
            current_tr.next().find("td").eq(6).children(".accAsgnFund").prop("disabled", true);
            current_tr.next().find("td").eq(7).children(".accAsgnFunctionalArea").prop("disabled", true);
            current_tr.next().find("td").eq(8).children(".accAsgnFundCenter").prop("disabled", true);
            current_tr.next().find("td").eq(9).children(".accAsgnCommitmentItem").prop("disabled", true);
        } else if (material_header_table_AccAsgn === 'T') {
            current_tr.next().find("td").eq(6).css("display", "none");
            current_tr.next().find("td").eq(7).css("display", "none");
            current_tr.next().find("td").eq(8).css("display", "none");
            current_tr.next().find("td").eq(13).css("display", "none");
        } else if (material_header_table_AccAsgn === 'X') {
            current_tr.next().find("td").eq(6).css("display", "none");
            current_tr.next().find("td").eq(7).css("display", "none");
            current_tr.next().find("td").eq(8).css("display", "none");
            current_tr.next().find("td").eq(9).css("display", "none");
            current_tr.next().find("td").eq(13).css("display", "none");
            current_tr.next().find("td").eq(16).css("display", "none");
        } else if (material_header_table_AccAsgn === 'Z') {
            current_tr.next().find("td").eq(6).css("display", "none");
            current_tr.next().find("td").eq(7).css("display", "none");
            current_tr.next().find("td").eq(8).css("display", "none");
            current_tr.next().find("td").eq(9).css("display", "none");
            current_tr.next().find("td").eq(10).css("display", "none");
            current_tr.next().find("td").eq(13).css("display", "none");
            current_tr.next().find("td").eq(14).css("display", "none");
            current_tr.next().find("td").eq(15).css("display", "none");
            current_tr.next().find("td").eq(16).css("display", "none");
            current_tr.next().find("td").eq(17).css("display", "none");
            current_tr.next().find("td").eq(18).css("display", "none");
        }
    }
    var currentClick;
     $("#costCenteraccountAssignmentTebleId").on('click', '.accAsgnCostCetner', function() {
        $("#ro_costCenter").val("FromTable");
        currentClick = $(this).parent().parent();
        $("#costCenterModal").modal("show");
        getAllCostCenter();
    });
//Girivasu
});