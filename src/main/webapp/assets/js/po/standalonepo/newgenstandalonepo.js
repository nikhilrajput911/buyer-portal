/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    $("#paymentTermsDelivery").change(function() {
        var paymentTerm = $(this).val();
        console.log("paymentTerm: " + paymentTerm);

        if (paymentTerm !== "")
        {
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

//            fetchPaymentInDays("");

            $.ajax({
                type: "GET",
                url: serviceUrl,
                contentType: "application/xml",
                dataType: "xml",
//                data: URLParam,
                async: true,
                success: function(data, textStatus, jqXHR) {
                    console.log("success: " + data);
                    fetchStandAlonePaymentInDays(data);
                }
            });
        }
    });

    var lobiboxNotifyAlert = null;
    $(".createStandalonePoBtn").click(function() {
//        extractSAPResponseForPreCheck("");
        var isPreCheck = "No";
        var operation = $(this).prop("value");
        console.log("operation: " + operation);
        if (operation === "Pre Check")
        {
            isPreCheck = "Yes";
        }
        console.log("isPreCheck: " + isPreCheck);
        var vendorNameCode = $("#vendorcodeHeader").val(); // $("#vendorcodeHeader :selected").text();
        var vendorCode = vendorNameCode.substring(vendorNameCode.lastIndexOf('-') + 1, vendorNameCode.length);
        var vendorName = vendorNameCode.substring(0, vendorNameCode.lastIndexOf('-'));
        console.log(vendorCode + ", " + vendorName);
        var companycode = $("#companycodeHeader").val();
        var typeOfPOHeader = $("#typeOfPOHeader").val();

        //var companycode = $("#companycodeHeader").val();
        var vendor = $("#vendorSno").val(); // $("#vendorcodeHeader").val();
        //var typeOfPOHeader = $("#typeOfPOHeader").val();
        var downPaymentReqd = $("#downPaymentReqd").val();
        var purchasingOrg = $("#purchasingOrg").val();
        var purchasingGroup = $("#purchasingGroup").val();
        var currencyDeliveryInvoice = $("#currencyDeliveryInvoice").val();
        var ExchangeRate = $("#ExchangeRate").val();
        var paymentTerms = $("#paymentTermsDelivery").val();
        var streetVendorAddress = $("#streetVendorAddress").val();
        var houseNumberVendorAddress = $("#houseNumberVendorAddress").val();
        var Salesperson = $("#Salesperson").val();
        var requestType = $("#requestType").val();

        vendorName = handleSpecialCharacter(vendorName);

        console.log("After Special Character: " + vendorName);
        if (companycode === "") {
            Lobibox.alert("error", {
                msg: "Please select companycode!"
            });
            return false;
        }

        if (typeOfPOHeader === "") {
            Lobibox.alert("error", {
                msg: "Please select type of PO!"
            });
            return false;
        }

        if (vendorName === "") {
            Lobibox.alert("error", {
                msg: "Please select Vendor Name!"
            });
            return false;
        }

        $(".collapseDivHeader").find(".active").removeClass("active");

        if (currencyDeliveryInvoice === "") {
            Lobibox.alert("error", {
                msg: "Please enter Currency in Delivery / Invoice Tab"
            });
            $("#deliveryInvoice").addClass("active");
            $("#deliveryInvoice-tab").addClass("active");
            $("#deliveryInvoice-tab").addClass("show");
            return false;
        }
        if (ExchangeRate === "") {
            Lobibox.alert("error", {
                msg: "Please enter ExchangeRate in Delivery / Invoice Tab."
            });
            $("#deliveryInvoice").addClass("active");
            $("#deliveryInvoice-tab").addClass("active");
            $("#deliveryInvoice-tab").addClass("show");
            return false;
        }
        if (paymentTerms === "") {
            Lobibox.alert("error", {
                msg: "Please enter Payment Terms in Delivery / Invoice Tab."
            });
            $("#deliveryInvoice").addClass("active");
            $("#deliveryInvoice-tab").addClass("active");
            $("#deliveryInvoice-tab").addClass("show");
            return false;
        }
        if (streetVendorAddress === "") {
            Lobibox.alert("error", {
                msg: "Please enter Street in Vendor Address Tab."
            });
            $("#vendorAddress").addClass("active");
            $("#vendorAddress-tab").addClass("active");
            $("#vendorAddress-tab").addClass("show");
            return false;
        }
        if (houseNumberVendorAddress === "") {
            Lobibox.alert("error", {
                msg: "Please enter House Number in Vendor Address Tab."
            });
            $("#vendorAddress").addClass("active");
            $("#vendorAddress-tab").addClass("active");
            $("#vendorAddress-tab").addClass("show");
            return false;
        }

        /*Edited by Bittu on 15/09/2020*/

//        if (Salesperson === "") {
//            Lobibox.alert("error", {
//                msg: "Please enter Salesperson in Communication Tab."
//            });
//            $("#communication").addClass("active");
//            $("#communication-tab").addClass("active");
//            $("#communication-tab").addClass("show");
//            return false;
//        }
        var accAssCat_temp1 = "";
        var itemCat_temp1 = "";
        $("#material_headerClass tbody tr").each(function(index) {
            if (index === 0) {
                accAssCat_temp1 = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
                itemCat_temp1 = $(this).find("td").eq(3).children(".itemCategoryClass").val();
            }
        });
        var typeOfPOHeader = $("#typeOfPOHeader").val();
        var validityFromHeader = $("#validityFromHeader").val();
        var validityToHeader = $("#validityToHeader").val();
        console.log("validityFromHeader: " + validityFromHeader);
        console.log("validityToHeader: " + validityToHeader);
        if (typeOfPOHeader === "Inter Company" || typeOfPOHeader === "Ferrous PO - Local" ||
                (typeOfPOHeader === "PO for Services" && accAssCat_temp1 === "U" && itemCat_temp1 === "D"))
        {
            if (validityFromHeader === "") {
                Lobibox.alert("error", {
                    msg: "Please enter Validity From in Additional Data tab!"
                });
                $("#additionaldata").addClass("active");
                $("#additionaldata-tab").addClass("active");
                $("#additionaldata-tab").addClass("show");
                $("#validityFromHeader").focus();
                return false;
            }
            if (validityToHeader === "") {
                Lobibox.alert("error", {
                    msg: "Please enter Validity From in Additional Data tab!"
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

//        var poNotesToApprover = $("#pONotetoApproverHeaderTextsLimits").val();
//        if (poNotesToApprover === "") {
//            Lobibox.alert("error", {
//                msg: "Please enter PO Note to Approver in Header Text Tab!"
//            });
//
//            $("#headerText_linelevel").addClass("active");
//            $("#headerText_linelevel-tab").addClass("active");
//            $("#headerText_linelevel-tab").addClass("show");
//            $("#pONotetoApproverHeaderTextsLimits").focus();
//            return false;
//        }
        
        if (purchasingOrg === "") {
            Lobibox.alert("error", {
                msg: "Please enter Purchasing Organization in Org. Data Tab"
            });
            $("#org_data").addClass("active");
            $("#org_data-tab").addClass("active");
            $("#org_data-tab").addClass("show");
            return false;
        }
        if (purchasingGroup === "") {
            Lobibox.alert("error", {
                msg: "Please select Purchasing Group in Org. Data Tab"
            });
            $("#org_data").addClass("active");
            $("#org_data-tab").addClass("active");
            $("#org_data-tab").addClass("show");
            return false;
        }

        var prLength = $("#material_headerClass tbody tr").length;
        if (prLength === 0) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            var errorMsg = "Please add PO Line";
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            return false;
        }

        var IncoTermsPart1 = $("#IncoTermsPart1").val();
        var typeOfPO = $("#typeOfPOHeader").val();
        if (IncoTermsPart1.trim() === "SC") {
            if (typeOfPO === 'Non-Ferrous PO - Imp' || typeOfPO === 'Ferrous Joint Pur' || typeOfPO === 'Ferrous PO - Import' || typeOfPO === 'Ferrous PO - Local'
                    || typeOfPO === 'Non-Ferrous PO - Loc') {
                var ZoneCollectionScrap = $("#ZoneCollectionScrap").val();
                if (ZoneCollectionScrap === "") {
//                    if (lobiboxNotifyAlert !== null)
//                    {
//                        lobiboxNotifyAlert.remove();
//                    }
//                    errorMsg = "Please select Zone in Customer Data Data Tab!";
//                    lobiboxNotifyAlert = Lobibox.notify("error", {
//                        rounded: true,
//                        delayIndicator: false,
//                        msg: errorMsg
//                    });
                    Lobibox.alert("error", {
                        msg: "Please select Zone in Customer Data Tab!"
                    });
                    $("#org_data").removeClass("active");
                    $("#org_data-tab").removeClass("active");
                    $("#org_data-tab").removeClass("show");

                    $("#customerdata").addClass("active");
                    $("#customerdata-tab").addClass("active");
                    $("#customerdata-tab").addClass("show");
                    $("#ZoneCollectionScrap").focus();
                    return false;
                }
            }
        }

        var prMaterialGroupArr = [];
        $("#material_headerClass tbody tr").each(function() {
            var matGroup = $(this).find("td").eq(17).children(".matlGroup").val();
            prMaterialGroupArr.push(matGroup);
        });

        var arePrMaterialGroupsSame = "Yes";
        console.log("prMaterialGroupArr: " + prMaterialGroupArr);
        console.log("prMaterialGroupArr length: " + prMaterialGroupArr.length);
        for (var i = 0; i < prMaterialGroupArr.length; i++)
        {
            console.log("Checking material groups...");
            if (prMaterialGroupArr[i] !== prMaterialGroupArr[0])
            {
                console.log("Material Groups are different.");
                arePrMaterialGroupsSame = "No";
            }
            console.log("Checked material groups.");
        }
        console.log("arePrMaterialGroupsSame: " + arePrMaterialGroupsSame);
        if (arePrMaterialGroupsSame === "No")
        {
            Lobibox.alert("error", {
                msg: "All PO Line Item should have same material group"
            });
            return false;
        }

        var isPrSavedAfterEditDetails = $("#isPrSavedAfterEditDetails").val();
        console.log("isPrSavedAfterEditDetails: " + isPrSavedAfterEditDetails);

        var isAnyFieldValueChanged = $("#isAnyFieldValueChanged").val();
        console.log("isAnyFieldValueChanged: " + isAnyFieldValueChanged);

        if (isPrSavedAfterEditDetails === "No" && isAnyFieldValueChanged === "Yes")
        {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Data has been modified, kindly save the data first !"
            });
            return false;
        }

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
                msg: "Please Save PO Line " + prIndex
            });
            return false;
        }


        var isLineLevelDataSavedSaved = "Yes";
        var prLineIndex = -1;
        $("#material_headerClass tbody tr").each(function(index) {
            if ($(this).find("td").eq(0).children(".isLineLevelDataSavedSaved").val() === "No")
            {
                isLineLevelDataSavedSaved = "No";
                prLineIndex = index + 1;
                return false;
            }
        });
        if (isLineLevelDataSavedSaved === "No")
        {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Please save " + prLineIndex + " PO Line Data!"
            });
//            $("#createStandalonePoBtn").prop("disabled", true);
            return false;
        }
        $("#overlay").css("display", "block");

        setTimeout(function() {

            var docDate = $("#docDateHeader").val();
            var arr1 = docDate.split("-");
            var day = arr1[0].trim();
            var month = arr1[1].trim();
            var year = arr1[2].trim();
            var newDocDate = year + "-" + month + "-" + day;
//        $("#overlay").css("display", "block");
            var isAckReq = "";                                          //Bittu 09 July 2020
            if ($("#isAckReq").prop("checked") === true) {
                isAckReq = true;
            } else {
                isAckReq = false;
            }
            var TestRun = "";
            if (isPreCheck === "Yes")
            {
                TestRun = "X";
            }
            console.log("TestRun: " + TestRun);
            var xmlString = "<POCreation>"
                    + "<GeneralData>"
                    + "<PID></PID>"
                    + "<RequestFlag>C</RequestFlag>"
                    + "<UniqueID></UniqueID>"
                    + "<UserId>" + $("#creatorId").text() + "</UserId>"
                    + "<InitiatorId>" + $("#creatorId").text() + "</InitiatorId>"
                    + "<InitiatorEmailId>" + $("#creatorEmailId").text() + "</InitiatorEmailId>"
                    + "<CompanyCode>" + $("#companycodeHeader").val() + "</CompanyCode>"
                    + "<RequestType>Create Purchase Order</RequestType>"
                    + "<PurchaseSubCategory></PurchaseSubCategory>"
                    + "<PurchaseOrderNumber></PurchaseOrderNumber>"
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
                    + "<PO_SequenceNO></PO_SequenceNO>"
                    + "<RFQNo></RFQNo>"
                    + "<Addtn_ValidFrom>" + validityFromHeader + "</Addtn_ValidFrom>"
                    + "<Addtn_ValidTo>" + validityToHeader + "</Addtn_ValidTo>"
                    + "<Comments></Comments>"
                    + "<isVendorAckReq>" + isAckReq + "</isVendorAckReq>"
                    + "<TestRun>" + TestRun + "</TestRun>"
                    + "</GeneralData>";

            console.log("PO creation is :" + xmlString);

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

            var POHeaderTextData = "<POHeaderTextData>"
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
                    + "<Headertext>" + handleSpecialCharacter($("#headerTextHeader").val()) + "</Headertext>"
                    + "<LinkId></LinkId>"
                    + "</POHeaderTextData>";

            console.log("POHeaderTextData: " + POHeaderTextData);

            /*Tag Added by Bittu on 20 Sept 2020*/
            var POStatusData = "";
            POStatusData = "<POStatusData>"
                    + "<Ordered></Ordered>"
                    + "<Delivered></Delivered>"
                    + "<Stilltodeliv></Stilltodeliv>"
                    + "<Invoiced></Invoiced>"
                    + "<OrderedTotalPrice></OrderedTotalPrice>"
                    + "<DeliveredTotalPrice></DeliveredTotalPrice>"
                    + "<StilltodelivTotalPrice></StilltodelivTotalPrice>"
                    + "<InvoicedTotalPrice></InvoicedTotalPrice>"
                    + "<DownpaymtsTotalPrice></DownpaymtsTotalPrice>"
                    + "<OrderedCurrency></OrderedCurrency>"
                    + "<DeliveredCurrency></DeliveredCurrency>"
                    + "<StilltodelivCurrency></StilltodelivCurrency>"
                    + "<InvoicedCurrency></InvoicedCurrency>"
                    + "<DownpaymtsCurrency></DownpaymtsCurrency>"
                    + "</POStatusData>";
            console.log("POStatusData: " + POStatusData);

            var totalPoAmount = 0;
            var totalPoAmountExcludingVendor = 0;
            var POLineItemData = "";
            var POServiceData = "";
            var POServiceRefData = "";
            var PackageNo = "";
            var POAccntAssignvalData = "";
            var AccAssValDistribution = "";
            var ServiceAccAssDist = "";
            var POLimitsData = "";
            $("#material_headerClass tbody tr").each(function(index) {
                var prItemNumber = $(this).find("td").eq(1).text();
                var delvDateCat = $(this).find("td").eq(13).children('.pODeliveryDateCetegory').val();
                console.log("prItemNumber in newgenstandalonepo:" + prItemNumber);
                console.log(index);
                console.log("delvDateCat: " + delvDateCat);
                var linkid = $(this).find("td").eq(0).children(".linkid").val();
                console.log("linkid : " + linkid);
                if (PackageNo === "")
                    PackageNo = index + 1;

                var reqDate = $(this).find("td").eq(14).children('.requisitionDateClass').val();
                var delDate = $(this).find("td").eq(15).children('.deliveryDateClass').val();

                console.log("Requisition Date :" + reqDate);
                console.log("Delivery Date :" + delDate);

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

                var taxCode = $(this).find("td").eq(0).children(".prTaxCode").val();
                var prNumber = $(this).find("td").eq(0).children(".prNumber").val();

                console.log("taxCode: " + taxCode);

                var shortText = "";
                if ($(this).find("td").eq(5).text() !== "")
                {
                    shortText = handleSpecialCharacter($(this).find("td").eq(6).children(".prShortText").val());
                }
                var MaterialLongText = "";
                if ($(this).find("td").eq(7).text() !== "")
                {
                    MaterialLongText = handleSpecialCharacter($(this).find("td").eq(7).text());
                }

                var PODistribution = $(this).find("td").eq(0).children(".PODistribution").val();
                var POPartialInvoiceIndicator = $(this).find("td").eq(0).children(".POPartialInvoiceIndicator").val();

                console.log("PODistribution1: " + PODistribution);
                console.log("POPartialInvoiceIndicator1: " + POPartialInvoiceIndicator);

//                if (PODistribution === "Single Account Assignment")
//                {
//                    PODistribution = "";
//                }

                var pr_quantity = removeCommaInNumber($(this).find("td").eq(8).children(".quantity_Class").val());
                var pr_netPrice = removeCommaInNumber($(this).find("td").eq(9).children(".prNetPrice").val());
                var pr_currency = $(this).find("td").eq(11).children(".currencyClass").val();
                var pr_linkId = $(this).find("td").eq(0).children(".linkid").val();

                console.log("pr_quantity in stansalone :" + pr_quantity);
                console.log("pr_netPrice in stansalone :" + pr_netPrice);
                console.log("pr_currency in stansalone :" + pr_currency);
                console.log("pr_linkId in stansalone :" + pr_linkId);
                console.log("taxCode in stansalone :" + taxCode);

                var prTaxAmount = 0;
                if (isPreCheck !== "Yes")
                {
                    totalPoAmount = totalPoAmount + totalPoAmountFunction(pr_quantity, pr_netPrice, pr_currency, taxCode, pr_linkId, vendorCode, "IncludingVendor");
                    console.log("index: " + (index + 1) + ", totalPoAmount: " + totalPoAmount);

                    totalPoAmountExcludingVendor = totalPoAmountExcludingVendor + totalPoAmountFunction(pr_quantity, pr_netPrice, pr_currency, taxCode, pr_linkId, vendorCode, "ExcludingVendor");
                    console.log("index: " + (index + 1) + ", totalPoAmountExcludingVendor: " + totalPoAmountExcludingVendor);

                    prTaxAmount = prTaxAmountFunction(pr_quantity, pr_netPrice, pr_currency, taxCode);
                    console.log("index: " + (index + 1) + ", prTaxAmount: " + prTaxAmount);
                }
                var prReturnsItem = $(this).find("td").eq(33).children(".prReturnsItem").prop("checked");

                var prFreeOfCharge = $(this).find("td").eq(34).children(".prFreeOfCharge").prop("checked");


                POLineItemData += "<POLineItemData>"
                        + "<PRLinkID>" + $(this).find("td").eq(0).children(".linkid").val() + "</PRLinkID>"
                        + "<PRNumber></PRNumber>"
                        + "<PRItemNumber></PRItemNumber>"
                        + "<ItemNumber>" + $(this).find("td").eq(1).text().toString().trim() + "</ItemNumber>"
                        + "<AccountAssignment>" + $(this).find("td").eq(2).children(".accountAssignmentClass").val() + "</AccountAssignment>"
                        + "<ItemCategory>" + $(this).find("td").eq(3).children(".itemCategoryClass").val() + "</ItemCategory>"
                        + "<Criticality>" + $(this).find("td").eq(5).children('.poCriticality').val() + "</Criticality>"
                        + "<ShortText>" + shortText + "</ShortText>"
                        + "<Quantity>" + removeCommaInNumber($(this).find("td").eq(8).children('.quantity_Class').val()) + "</Quantity>"
                        + "<PriceUnit>" + removeCommaInNumber($(this).find("td").eq(10).children('.prPerUnit').val()) + "</PriceUnit>"
                        + "<ValPrice></ValPrice>"
                        + "<NetPrice>" + removeCommaInNumber($(this).find("td").eq(9).children('.prNetPrice').val()) + "</NetPrice>"
                        + "<Currency>" + $(this).find("td").eq(11).children('.currencyClass').val() + "</Currency>"
                        + "<DeliveryDateCategory>" + $(this).find("td").eq(13).children('.pODeliveryDateCetegory').val() + "</DeliveryDateCategory>"
                        + "<Total></Total>"
                        + "<RequisitionDate>" + RequisitionDate + "</RequisitionDate>"
                        + "<DeliveryDate>" + DeliveryDate + "</DeliveryDate>"
                        + "<MaterialGroup>" + $(this).find("td").eq(17).children('.matlGroup').val() + "</MaterialGroup>"
                        + "<PurchasingGroup>" + $(this).find("td").eq(19).children('.purchaseGroupClass').val() + "</PurchasingGroup>"
                        + "<StorageLocation>" + $(this).find("td").eq(20).children('.storageLocationClass').val() + "</StorageLocation>"
                        + "<RequisitionerID></RequisitionerID>"
                        + "<TrackingNumber>" + $(this).find("td").eq(29).children('.trackingNumber').val() + "</TrackingNumber>"
                        + "<QuantityUnit>" + removeCommaInNumber($(this).find("td").eq(9).children('.prNetPrice').val()) + "</QuantityUnit>"
                        + "<QuantityOrderedUnit></QuantityOrderedUnit>"
                        + "<OpenQuantity></OpenQuantity>"
                        + "<RequestDate></RequestDate>"
                        + "<ReleaseDate></ReleaseDate>"
                        + "<PlDelivTime></PlDelivTime>"
                        + "<GRProcTime></GRProcTime>"
                        + "<Closed></Closed>"
                        + "<FixedID></FixedID>"
                        + "<MaterialCode>" + $(this).find("td").eq(4).children('.materialCodeClass').val() + "</MaterialCode>"
                        + "<Description></Description>"
                        + "<Plant>" + $(this).find("td").eq(16).children(".plantClass").val() + "</Plant>"
                        + "<Unit>" + $(this).find("td").eq(31).children(".prUom").val() + "</Unit>"
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
                        + "<InfoRecord>" + $(this).find("td").eq(22).text() + "</InfoRecord>"
                        + "<DesiredVendor></DesiredVendor>"
                        + "<PurchasingOrganization>" + $(this).find("td").eq(18).children('.purchaseOrgClass').val() + "</PurchasingOrganization>"
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
                        + "<RequsitionEmail>thirumalaikumar.m@newgen.co.in</RequsitionEmail>"
                        + "<LinkId></LinkId>"
                        + "<Distribution>" + PODistribution + "</Distribution>"
                        + "<PartialInvoiceIndicator></PartialInvoiceIndicator>"
                        + "<BP_assign_date></BP_assign_date>"
                        + "<BP_quantity_remaining></BP_quantity_remaining>"
                        + "<BP_rfq_status></BP_rfq_status>"
                        + "<BP_status></BP_status>"
                        + "<BP_buyerdetails_id></BP_buyerdetails_id>"
                        + "<BP_ItemCode></BP_ItemCode>"
                        + "<BP_PRCreator>" + $(this).find("td").eq(24).text() + "</BP_PRCreator>"
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
                        + "<PackageNo>" + PackageNo + "</PackageNo>"
                        + "<TaxCode>" + (taxCode === undefined ? "" : taxCode) + "</TaxCode>"
                        + "<taxamount>" + prTaxAmount + "</taxamount>"
                        + "<PR_PID></PR_PID>"
                        + "<DeleteFlag></DeleteFlag>"                                                   //Bittu 09July2020
                        + "<LineType>N</LineType>"
                        + "<RFQ_No>" + $(this).find("td").eq(35).children('.prRfqNo').val() + "</RFQ_No>"
                        + "<RFQ_ItemNo>" + $(this).find("td").eq(36).children('.prRfqItemNo').val() + "</RFQ_ItemNo>"
                        + "<immaterial>" + $(this).find("td").eq(32).children('.prImMaterial').val() + "</immaterial>"
                        + "<returnsitem>" + prReturnsItem + "</returnsitem>"
                        + "<freeofcharge>" + prFreeOfCharge + "</freeofcharge>"
                        + "<OPU>" + $(this).find("td").eq(12).children(".prOrderPriceUnit").val() + "</OPU>"
                        + "</POLineItemData>";

                console.log("POLineItemData in newgen standalonePO :" + POLineItemData);

                POServiceRefData += "<POServiceRefData>"
                        + "<PackageNo>" + PackageNo + "</PackageNo>"
                        + "<SubPackageNo>" + (PackageNo + 1) + "</SubPackageNo>"
                        + "<LineNo>" + PackageNo + "</LineNo>"
                        + "</POServiceRefData>";

                $.ajax({
                    type: "GET",
                    url: "standalonepoajaxrequest.do",
                    async: false,
                    data: {
                        "reqFrom": "findNGBPCmplxPoCreationLimitsByLinkID",
                        "linkId": linkid
                    },
                    complete: function(responseJson) {
                        var jsonLimitsArr = $.parseJSON(responseJson.responseText);
                        jsonLimitsArr = JSON.parse(JSON.stringify(jsonLimitsArr));
                        console.log("jsonLimitsArr: " + jsonLimitsArr);
                        for (var i = 0; i < jsonLimitsArr.length; i++)
                        {
                            if ((jsonLimitsArr[i].overallLimit !== "" && jsonLimitsArr[i].overallLimit !== undefined)
                                    || (jsonLimitsArr[i].expectedValue !== "" && jsonLimitsArr[i].expectedValue !== undefined)
                                    || (jsonLimitsArr[i].noLimit !== "" && jsonLimitsArr[i].noLimit !== undefined && jsonLimitsArr[i].noLimit !== "false"))
                            {
                                POLimitsData += "<POLimitsData>"
                                        + "<ItemNumber>" + prItemNumber + "</ItemNumber>"
                                        + "<PackageNo>" + PackageNo + "</PackageNo>"
                                        + "<OverallLimit>" + (jsonLimitsArr[i].overallLimit === undefined ? "" : jsonLimitsArr[i].overallLimit) + "</OverallLimit>"
                                        + "<ExpectedValue>" + (jsonLimitsArr[i].expectedValue === undefined ? "" : jsonLimitsArr[i].expectedValue) + "</ExpectedValue>"
                                        + "<NoLimit>" + (jsonLimitsArr[i].noLimit === undefined ? "" : jsonLimitsArr[i].noLimit) + "</NoLimit>"
                                        + "<ActualValue>" + (jsonLimitsArr[i].actualVal === undefined ? "" : jsonLimitsArr[i].actualVal) + "</ActualValue>"
                                        + "<LinkId>" + linkid + "</LinkId>"
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
                        "reqFrom": "findServicesByLinkId",
                        "linkid": linkid
                    },
                    complete: function(responseJson) {
                        var obj = $.parseJSON(responseJson.responseText);
                        var linkId = "";
                        var servicelinkId = "";
                        var lineNo = "";

                        for (var i = 0; i < obj.length; i++) {
                            console.log("ServiceNumber :" + obj[i].ServiceNumber);
                            ServiceAccAssDist = obj[i].ServiceAccAssDist === undefined ? '' : obj[i].ServiceAccAssDist;
                            console.log("ServiceAccAssDist1 :" + ServiceAccAssDist);
                            lineNo = i + 1;

                            if (ServiceAccAssDist === "" || ServiceAccAssDist === "0")
                                ServiceAccAssDist = "";
                            else if (ServiceAccAssDist === "1" || Number(ServiceAccAssDist) === 1)
                                ServiceAccAssDist = "Distrib. On Quantity Basis";
                            else if (ServiceAccAssDist === "2" || Number(ServiceAccAssDist) === 2)
                                ServiceAccAssDist = "Distrib. By Percentage";

                            console.log("ServiceAccAssDist2 :" + ServiceAccAssDist);

                            linkId = obj[i].LinkId;
                            servicelinkId = obj[i].ServiceLinkId;

                            console.log("servicelinkId 1: " + servicelinkId);

                            if (servicelinkId !== undefined && servicelinkId !== "" && Number(servicelinkId) < 10)
                            {
                                servicelinkId = "0" + servicelinkId;
                            }

                            console.log("linkId: " + linkId);
                            console.log("servicelinkId 2: " + servicelinkId);

                            POServiceData += "<POServiceData>"
                                    + "<Distribution>" + ServiceAccAssDist + "</Distribution>"  // New Tag Added on 04:41 PM 23-01-2020
                                    + "<LineItemNumber>" + obj[i].LineItemNumber + "</LineItemNumber>"//yha pe changed hai obj[i].ServiceLineItemNumber 
                                    + "<ServiceNumber>" + obj[i].ServiceNumber + "</ServiceNumber>"
                                    + "<ShortText>" + (obj[i].ShortText !== undefined ? handleSpecialCharacter(obj[i].ShortText) : '') + "</ShortText>"
                                    + "<Quantity>" + obj[i].Quantity + "</Quantity>"
                                    + "<Unit>" + obj[i].Unit + "</Unit>"
                                    + "<GrossPrice>" + obj[i].GrossPrice + "</GrossPrice>"
                                    + "<Currency>" + obj[i].Currency + "</Currency>"
                                    + "<NetPrice>" + obj[i].NetPrice + "</NetPrice>"
                                    + "<Edition>" + obj[i].Edition + "</Edition>"
                                    + "<LineItemLongText>" + (obj[i].LongItemLongText !== undefined ? handleSpecialCharacter(obj[i].LongItemLongText) : '') + "</LineItemLongText>"
                                    + "<OverfTolerance>" + obj[i].OverfTolarence + "</OverfTolerance>"
                                    + "<CostCentre></CostCentre>"
                                    + "<GLCode></GLCode>"
                                    + "<CommitmentItem></CommitmentItem>"
                                    + "<Fund></Fund>"
                                    + "<FundCenter></FundCenter>"
                                    + "<FunctionalArea></FunctionalArea>"
                                    + "<ServiceLongText>" + (obj[i].serviceText === undefined ? '' : obj[i].serviceText) + "</ServiceLongText>"
                                    + "<LinkId>" + linkId + "</LinkId>"
                                    + "<ServiceLinkID>" + servicelinkId + "</ServiceLinkID>"
                                    + "<PackageNo>" + (PackageNo + 1) + "</PackageNo>"
                                    + "<LineNo>" + lineNo + "</LineNo>"
                                    + "<DeleteFlag></DeleteFlag>"
                                    + "<actualquantity>" + (obj[i].actualQuantity === undefined ? '' : obj[i].actualQuantity) + "</actualquantity>"
                                    + "</POServiceData>";

                            $.ajax({
                                type: "GET",
                                url: "ajaxcontroller.do",
                                async: false,
                                data: {
                                    "reqFrom": "findServicesAccAssByLinkIdAndLineItemNumber",
                                    "linkid": linkid,
                                    "lineItemNumber": obj[i].LineItemNumber
                                },
                                complete: function(responseJson) {
                                    var obj = $.parseJSON(responseJson.responseText);
                                    var SerialNo = "";
                                    for (var i = 0; i < obj.length; i++) {
                                        console.log("ServiceNumber :" + obj[i].Distribution);
                                        AccAssValDistribution = obj[i].Distribution === undefined ? '' : obj[i].Distribution;
                                        console.log("AccAssValDistribution 1: " + AccAssValDistribution);

                                        if (AccAssValDistribution === "")
                                            AccAssValDistribution = "Single Account Assignment";
                                        else if (AccAssValDistribution === "1" || Number(AccAssValDistribution) === 1)
                                            AccAssValDistribution = "Distrib. On Quantity Basis";
                                        else if (AccAssValDistribution === "2" || Number(AccAssValDistribution) === 2)
                                            AccAssValDistribution = "Distrib. By Percentage";

                                        console.log("AccAssValDistribution 2: " + AccAssValDistribution);
                                        console.log("obj[i].serialNumber :" + obj[i].serialNumber);

                                        SerialNo = obj[i].SerialNumber === undefined ? "" : obj[i].SerialNumber;
                                        if (SerialNo !== "" && SerialNo.toString().length === 1)
                                        {
                                            SerialNo = "0" + SerialNo;
                                        }

                                        var Percentage = obj[i].Percentage === undefined ? "" : obj[i].Percentage;
                                        console.log("Percentage 1: " + Percentage);
                                        if (Percentage !== "" && Percentage !== undefined)
                                        {
                                            if (Percentage.toString().includes("."))
                                            {
                                                var PercentageArr = Percentage.toString().split(".");
                                                console.log("PercentageArr[1]: " + PercentageArr[1]);
                                                if (PercentageArr[1].toString() === "0" || PercentageArr[1].toString() === "00")
                                                {
                                                    Percentage = PercentageArr[0];
                                                }
                                            }
                                            else
                                            {
                                                Percentage = obj[i].Percentage === undefined ? "" : obj[i].Percentage;
                                            }
                                        }
                                        console.log("Percentage 2: " + Percentage);

                                        var Quantity = obj[i].Quantity === undefined ? "" : obj[i].Quantity;
                                        console.log("Quantity 1: " + Quantity);
                                        if (Quantity !== "" && Quantity !== undefined)
                                        {
                                            if (Quantity.toString().includes("."))
                                            {
                                                var QuantityArr = Quantity.toString().split(".");
                                                console.log("QuantityArr[1]: " + QuantityArr[1]);
                                                if (QuantityArr[1].toString() === "0" || QuantityArr[1].toString() === "00")
                                                {
                                                    Quantity = QuantityArr[0];
                                                }
                                            }
                                            else
                                            {
                                                Quantity = obj[i].Quantity === undefined ? "" : obj[i].Quantity;
                                            }
                                        }
                                        console.log("Quantity 2: " + Quantity);

                                        var CommItem = obj[i].GLAccount === undefined ? "" : obj[i].GLAccount;
                                        console.log("Service CommItem 1: " + CommItem);
                                        if (CommItem !== "")
                                        {
                                            CommItem = Number(CommItem);
                                        }
                                        console.log("Service CommItem 2: " + CommItem);

                                        POAccntAssignvalData += "<POAccntAssignvalData>"
                                                + "<Distribution>" + AccAssValDistribution + "</Distribution>"
                                                + "<Quantity>" + Quantity + "</Quantity>"
                                                + "<Percentage>" + Percentage + "</Percentage>"
                                                + "<ActivityNumber></ActivityNumber>"
                                                + "<LinkNumber></LinkNumber>"
                                                + "<LinkID>" + servicelinkId + "</LinkID>"
                                                + "<NETVALUE></NETVALUE>"
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
                                                + "<CommitmentItem>" + CommItem + "</CommitmentItem>"
                                                + "<Fund>" + obj[i].Fund + "</Fund>"
                                                + "<FundsCentre>" + obj[i].FundsCentre + "</FundsCentre>"
                                                + "<FunctionalArea>" + obj[i].FunctionalArea + "</FunctionalArea>"
                                                + "<ItemNumber>" + obj[i].ItemNumber + "</ItemNumber>"
                                                + "<DeliverySchedule>" + obj[i].DeliverySchedule + "</DeliverySchedule>"
                                                + "<PackageNo>" + (PackageNo + 1) + "</PackageNo>"
                                                + "<LineNo>" + lineNo + "</LineNo>"
                                                + "<SerialNo>" + SerialNo + "</SerialNo>"
                                                + "<SerNoLine>" + (i + 1) + "</SerNoLine>"  // New Tag Added on 01:06 PM 24-01-2020
                                                + "<DeleteFlag></DeleteFlag>"
                                                + "</POAccntAssignvalData>";
                                    }
                                }
                            });
                        }
                    }
                });
                PackageNo = PackageNo + 2;
            });

            $("#totalPoAmt").val(Number(totalPoAmount).toFixed(2));
            $("#totalPoAmtExcludingVendor").val(Number(totalPoAmountExcludingVendor).toFixed(2));

            var POInvoiceData = "";
            var POAccntAssignData = "";
            var AccAssDistribution = "";
            var SerialNo = "";
            $("#material_headerClass tbody tr").each(function() {
                var linkid = $(this).find("td").eq(0).children(".linkid").val();
                var prItemNumber = $(this).find("td").eq(1).text();
                console.log("prItemNumber :::" + prItemNumber);
//            alert("linkid in FindInvoiceByLinkid: " + linkid);
                var itmNo = "";
                $.ajax({
                    type: "GET",
                    url: "poajaxrequest.do",
                    async: false,
                    data: {
                        "reqFrom": "FindInvoiceByLinkid",
                        "linkid": linkid
                    },
                    complete: function(responseJson) {
                        var jsonInvoiceArr = $.parseJSON(responseJson.responseText);
                        jsonInvoiceArr = JSON.parse(JSON.stringify(jsonInvoiceArr));
//                    console.log("jsonInvoiceArr length: " + jsonInvoiceArr.length);
                        console.log("jsonInvoiceArr: " + JSON.stringify(jsonInvoiceArr));
                        console.log("jsonInvoiceArr length: " + jsonInvoiceArr.length);
                        for (var i = 0; i < jsonInvoiceArr.length; i++)
                        {
                            itmNo = jsonInvoiceArr[i].linkID.toString().split("-")[2];
                            console.log(" itmNo in InvoiceItemNumber: " + itmNo);

                            var serviceBasedIV = "";
                            if ($("#prType").val() === "Service") {
                                serviceBasedIV = (jsonInvoiceArr[i].serviceBasedIV === undefined ? "" : jsonInvoiceArr[i].serviceBasedIV);
                            }
                            console.log("serviceBasedIV: " + serviceBasedIV);

                            POInvoiceData += "<POInvoiceData>"
                                    + "<ItemNumber>" + prItemNumber + "</ItemNumber>"
                                    + "<InvoiceReceipt>" + (jsonInvoiceArr[i].invoiceReceipt === undefined ? "" : jsonInvoiceArr[i].invoiceReceipt) + "</InvoiceReceipt>"
                                    + "<FinalInvoice>" + (jsonInvoiceArr[i].finalInvoice === undefined ? "" : jsonInvoiceArr[i].finalInvoice) + "</FinalInvoice>"
                                    + "<GRBasedIV>" + (jsonInvoiceArr[i].grBasedIV === undefined ? "" : jsonInvoiceArr[i].grBasedIV) + "</GRBasedIV>"
                                    + "<DPCategory>" + (jsonInvoiceArr[i].dpCategory === undefined ? "" : jsonInvoiceArr[i].dpCategory) + "</DPCategory>"
                                    + "<TaxCode>" + (jsonInvoiceArr[i].taxCode === undefined ? "" : jsonInvoiceArr[i].taxCode) + "</TaxCode>"
                                    + "<SRVBasedIV>" + serviceBasedIV + "</SRVBasedIV>"
                                    + "<LinkId>" + (jsonInvoiceArr[i].linkID === undefined ? "" : jsonInvoiceArr[i].linkID) + "</LinkId>"
                                    + "</POInvoiceData>";
                        }
                    }
                });
                console.log("POInvoiceData: " + POInvoiceData);

                $.ajax({
                    type: "GET",
                    url: "poajaxrequest.do",
                    async: false,
                    data: {
                        "reqFrom": "getNGBPCmplxPOCreationLineItemPOAccountAssignmentOnLineItemChange",
                        "linkid": linkid
                    },
                    complete: function(responseJson) {
//                    var arr = $.parseJSON(responseJson.responseText);
                        console.log("JSON Response  :: " + responseJson);
                        var jsonArr = $.parseJSON(responseJson.responseText);
                        jsonArr = JSON.parse(JSON.stringify(jsonArr));
                        console.log("AccAss Len: " + jsonArr.length);
                        for (var i = 0; i < jsonArr.length; i++) {
//                        console.log("LINKNUMBER :" + jsonArr[i].LINKNUMBER);
                            console.log("PARTIAL_INVOICE_INDICATOR :" + jsonArr[i].partialInvoiceIndicator);

                            AccAssDistribution = jsonArr[i].distribution === undefined ? '' : jsonArr[i].distribution;

                            if (AccAssDistribution === "")
                                AccAssDistribution = "Single Account Assignment";
                            else if (AccAssDistribution === "1")
                                AccAssDistribution = "Distrib. On Quantity Basis";
                            else if (AccAssDistribution === "2")
                                AccAssDistribution = "Distrib. By Percentage";

                            console.log("AccAssDistribution :" + AccAssDistribution);

                            var PrType = $("#prType").val();

                            SerialNo = i + 1;
                            if (SerialNo.toString().length === 1)
                            {
                                SerialNo = "0" + SerialNo;
                            }

                            if (PrType === "Service")
                            {
                                console.log("AccAss.serialNumber: " + jsonArr[i].serialNumber);
                                SerialNo = jsonArr[i].serialNumber === undefined ? '' : jsonArr[i].serialNumber;
                                console.log("SerialNo: " + SerialNo);
                                if (SerialNo.toString().length === 1)
                                {
                                    SerialNo = "0" + SerialNo;
                                }
                            }

                            var Percentage = jsonArr[i].percentage === undefined ? "" : jsonArr[i].percentage;
                            console.log("Percentage 1: " + Percentage);
                            if (Percentage !== "" && Percentage !== undefined)
                            {
                                if (Percentage.toString().includes("."))
                                {
                                    var PercentageArr = Percentage.toString().split(".");
                                    console.log("PercentageArr[1]: " + PercentageArr[1]);
                                    if (PercentageArr[1].toString() === "0" || PercentageArr[1].toString() === "00")
                                    {
                                        Percentage = PercentageArr[0];
                                    }
                                }
                                else
                                {
                                    Percentage = jsonArr[i].percentage === undefined ? "" : jsonArr[i].percentage;
                                }
                            }
                            console.log("Percentage 2: " + Percentage);

                            var Quantity = jsonArr[i].quantity === undefined ? "" : jsonArr[i].quantity;
                            console.log("Quantity 1: " + Quantity);
                            if (Quantity !== "" && Quantity !== undefined)
                            {
                                if (Quantity.toString().includes("."))
                                {
                                    var QuantityArr = Quantity.toString().split(".");
                                    console.log("QuantityArr[1]: " + QuantityArr[1]);
                                    if (QuantityArr[1].toString() === "0" || QuantityArr[1].toString() === "00")
                                    {
                                        Quantity = QuantityArr[0];
                                    }
                                }
                                else
                                {
                                    Quantity = jsonArr[i].quantity === undefined ? "" : jsonArr[i].quantity;
                                }
                            }
                            console.log("Quantity 2: " + Quantity);

                            var CommItem = jsonArr[i].glAccount === undefined ? "" : jsonArr[i].glAccount;
                            console.log("CommItem 1: " + CommItem);
                            if (CommItem !== "")
                            {
                                CommItem = Number(CommItem);
                            }
                            console.log("CommItem 2: " + CommItem);

                            POAccntAssignData += "<POAccntAssignData>"                  // I am accessing insertionorder id in place of link number.
//                                + "<SerialNo>" + (jsonArr[i].insertionOrderId === undefined ? "" : jsonArr[i].insertionOrderId) + "</SerialNo>"
                                    + "<SerialNo>" + SerialNo + "</SerialNo>"
                                    + "<AccountAssignmentCategory>" + (jsonArr[i].accountAssignmentCategory === undefined ? "" : jsonArr[i].accountAssignmentCategory) + "</AccountAssignmentCategory>"
                                    + "<Distribution>" + AccAssDistribution + "</Distribution>"
                                    + "<PartialInvoiceIndicator></PartialInvoiceIndicator>"
                                    + "<CoCode>" + (jsonArr[i].coCode === undefined ? "" : jsonArr[i].coCode) + "</CoCode>"
                                    + "<UnloadingPoint>" + (jsonArr[i].unloadingPoint === undefined ? "" : jsonArr[i].unloadingPoint) + "</UnloadingPoint>"
                                    + "<Recipient>" + (jsonArr[i].recipient === undefined ? "" : jsonArr[i].recipient) + "</Recipient>"
                                    + "<GLAccount>" + (jsonArr[i].glAccount === undefined ? "" : jsonArr[i].glAccount) + "</GLAccount>"
                                    + "<COArea>" + (jsonArr[i].coArea === undefined ? "" : jsonArr[i].coArea) + "</COArea>"
                                    + "<CostCenter>" + (jsonArr[i].costCenter === undefined ? "" : jsonArr[i].costCenter) + "</CostCenter>"
                                    + "<AccOrder>" + (jsonArr[i].accOrder === undefined ? "" : jsonArr[i].accOrder) + "</AccOrder>"
                                    + "<Asset>" + (jsonArr[i].asset === undefined ? "" : jsonArr[i].asset) + "</Asset>"
                                    + "<WBSElement>" + (jsonArr[i].wbsElement === undefined ? "" : jsonArr[i].wbsElement) + "</WBSElement>"
                                    + "<SalesOrder>" + (jsonArr[i].salesOrder === undefined ? "" : jsonArr[i].salesOrder) + "</SalesOrder>"
                                    + "<ItemNumber>" + (jsonArr[i].itemNumber === undefined ? "" : jsonArr[i].itemNumber) + "</ItemNumber>"
                                    + "<ItmNo>" + prItemNumber + "</ItmNo>"
                                    + "<DeliverySchedule>" + (jsonArr[i].deliverySchedule === undefined ? "" : jsonArr[i].deliverySchedule) + "</DeliverySchedule>"
                                    + "<Quantity>" + Quantity + "</Quantity>"
                                    + "<Percentage>" + Percentage + "</Percentage>"
                                    + "<Fund>" + (jsonArr[i].fund === undefined ? "" : jsonArr[i].fund) + "</Fund>"
                                    + "<FunctionalArea>" + (jsonArr[i].functionalArea === undefined ? "" : jsonArr[i].functionalArea) + "</FunctionalArea>"
                                    + "<FundsCentre>" + (jsonArr[i].fundsCentre === undefined ? "" : jsonArr[i].fundsCentre) + "</FundsCentre>"
                                    + "<CommitmentItem>" + CommItem + "</CommitmentItem>"
                                    + "<Network>" + (jsonArr[i].network === undefined ? "" : jsonArr[i].network) + "</Network>"
                                    + "<ActivityNumber>" + (jsonArr[i].activityNumber === undefined ? "" : jsonArr[i].activityNumber) + "</ActivityNumber>"
                                    + "<LinkID></LinkID>"
                                    + "<PRLinkID>" + (jsonArr[i].linkID === undefined ? "" : jsonArr[i].linkID) + "</PRLinkID>"
                                    + "<DeleteFlag></DeleteFlag>"
                                    + "</POAccntAssignData>";
                        }
                    }
                });
            });
            var prType = $("#prType").val();
//        var POAccntAssignData = "";

            var PODeliveryData = "";
            var PODeliveryAddressData = "";
            var POTextsData = "";
            var POConfirmationsData = "";
            var POCondCtrlData = "";
            var POQuantityWeightsData = "";

            var POLineItemCustomerData = "";
            var PODeliveryScheduleData = "";
            var POLineItemConditionsData = "";
            var POComponentData = "";
            var POLineItemProfitabilitySegmentData = "";
            var POMaterialData = "";
//        var itemNumber;
            $("#material_headerClass tbody tr").each(function() {
                var linkid = $(this).find("td").eq(0).children(".linkid").val();
                var accAss = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
                var itemCat = $(this).find("td").eq(3).children(".itemCategoryClass").val();
                var prItemNumber = $(this).find("td").eq(1).text();
                console.log("linkid: " + linkid);
                console.log("itemNumber in newgenstandalone: " + prItemNumber);

                var isFOCEnabled = $(this).find("td").eq(34).children(".prFreeOfCharge").prop("checked");
                console.log("isFOCEnabled in newgenstandalone: " + isFOCEnabled);

//            $.ajax({
//                type: "GET",
//                url: "poajaxrequest.do",
//                async: false,
//                data: {
//                    "reqFrom": "getNGBPCmplxPOCreationLineItemPOAccountAssignmentOnLineItemChange",
//                    "linkid": linkid
//                },
//                complete: function(responseJson) {
////                    var arr = $.parseJSON(responseJson.responseText);
//                    console.log("JSON Response  :: " + responseJson);
//                    var jsonArr = $.parseJSON(responseJson.responseText);
//                    jsonArr = JSON.parse(JSON.stringify(jsonArr));
//                    console.log("AccAss Len: " + jsonArr.length);
//                    for (var i = 0; i < jsonArr.length; i++) {
//                        console.log("LINKNUMBER :" + jsonArr[i].LINKNUMBER);
//
//                        POAccntAssignData += "<POAccntAssignData>"                  // I am accessing insertionorder id in place of link number.
//                                + "<SerialNo>" + (jsonArr[i].insertionOrderId === undefined ? "" : jsonArr[i].insertionOrderId) + "</SerialNo>"
//                                + "<AccountAssignmentCategory>" + (jsonArr[i].accountAssignmentCategory === undefined ? "" : jsonArr[i].accountAssignmentCategory) + "</AccountAssignmentCategory>"
//                                + "<Distribution>" + (jsonArr[i].distribution === undefined ? "" : jsonArr[i].distribution) + "</Distribution>"
//                                + "<PartialInvoiceIndicator></PartialInvoiceIndicator>"
//                                + "<CoCode>" + (jsonArr[i].coCode === undefined ? "" : jsonArr[i].coCode) + "</CoCode>"
//                                + "<UnloadingPoint>" + (jsonArr[i].unloadingPoint === undefined ? "" : jsonArr[i].unloadingPoint) + "</UnloadingPoint>"
//                                + "<Recipient>" + (jsonArr[i].recipient === undefined ? "" : jsonArr[i].recipient) + "</Recipient>"
//                                + "<GLAccount>" + (jsonArr[i].gLAccount === undefined ? "" : jsonArr[i].gLAccount) + "</GLAccount>"
//                                + "<COArea>" + (jsonArr[i].cOArea === undefined ? "" : jsonArr[i].cOArea) + "</COArea>"
//                                + "<CostCenter>" + (jsonArr[i].costCenter === undefined ? "" : jsonArr[i].costCenter) + "</CostCenter>"
//                                + "<AccOrder>" + (jsonArr[i].accOrder === undefined ? "" : jsonArr[i].accOrder) + "</AccOrder>"
//                                + "<Asset>" + (jsonArr[i].asset === undefined ? "" : jsonArr[i].asset) + "</Asset>"
//                                + "<WBSElement>" + (jsonArr[i].wBSElement === undefined ? "" : jsonArr[i].wBSElement) + "</WBSElement>"
//                                + "<SalesOrder>" + (jsonArr[i].salesOrder === undefined ? "" : jsonArr[i].salesOrder) + "</SalesOrder>"
//                                + "<ItemNumber>" + (jsonArr[i].itemNumber === undefined ? "" : jsonArr[i].itemNumber) + "</ItemNumber>"
//                                + "<ItmNo></ItmNo>"             //We don't have Item Number in stand alone table
//                                + "<DeliverySchedule>" + (jsonArr[i].deliverySchedule === undefined ? "" : jsonArr[i].deliverySchedule) + "</DeliverySchedule>"
//                                + "<Quantity>" + (jsonArr[i].quantity === undefined ? "" : jsonArr[i].quantity) + "</Quantity>"
//                                + "<Percentage>" + (jsonArr[i].percentage === undefined ? "" : jsonArr[i].percentage) + "</Percentage>"
//                                + "<Fund>" + (jsonArr[i].fund === undefined ? "" : jsonArr[i].fund) + "</Fund>"
//                                + "<FunctionalArea>" + (jsonArr[i].functionalArea === undefined ? "" : jsonArr[i].functionalArea) + "</FunctionalArea>"
//                                + "<FundsCentre>" + (jsonArr[i].fundsCentre === undefined ? "" : jsonArr[i].fundsCentre) + "</FundsCentre>"
//                                + "<CommitmentItem>" + (jsonArr[i].commitmentItem === undefined ? "" : jsonArr[i].commitmentItem) + "</CommitmentItem>"
//                                + "<Network>" + (jsonArr[i].network === undefined ? "" : jsonArr[i].network) + "</Network>"
//                                + "<ActivityNumber>" + (jsonArr[i].activityNumber === undefined ? "" : jsonArr[i].activityNumber) + "</ActivityNumber>"
//                                + "<LinkID>" + (jsonArr[i].linkID === undefined ? "" : jsonArr[i].linkID) + "</LinkID>"
//                                + "<PRLinkID></PRLinkID>"
//                                + "</POAccntAssignData>";
//                    }
//                }
//            });
                var poid = $("#poid").val();
//            var itemNumber = $(".ItemNumberSelectClass").val();

                console.log("poid in newgenstandalonepo :" + poid + "itemNumber in newgenstandalonepo :" + prItemNumber);
                $.ajax({
                    type: "GET",
                    url: "doajaxrequest.do",
                    async: false,
                    data: {
                        "reqFrom": "getExtPOCreationByPOidAndItemNumber",
                        "linkid": linkid
                    },
                    complete: function(responseJson) {
                        var jsonObj = $.parseJSON(responseJson.responseText);
                        jsonObj = JSON.parse(JSON.stringify(jsonObj));
                        console.log("jsonObj in getExtPOCreationByPOidAndItemNumber: " + JSON.stringify(jsonObj));
//                        console.log("Linkid in POLimitsData :" + jsonObj.pOCreationLimits[0].linkID);
                        var itmNo = "";
                        console.log("getExtPOCreationByPOidAndItemNumber Json length :" + jsonObj.length);

                        PODeliveryData += "<PODeliveryData>"
                                + "<ItemNumber>" + prItemNumber + "</ItemNumber>"
                                + "<OverDelTol>" + (jsonObj.invDel.overDelTol === undefined ? "" : jsonObj.invDel.overDelTol) + "</OverDelTol>"
                                + "<UnderDelTol>" + (jsonObj.invDel.underDelTol === undefined ? "" : jsonObj.invDel.underDelTol) + "</UnderDelTol>"
                                + "<ShippingInstructions>" + (jsonObj.invDel.shippingInstructions === undefined ? "" : jsonObj.invDel.shippingInstructions) + "</ShippingInstructions>"
                                + "<StockType>" + (jsonObj.invDel.stockType === undefined ? "" : jsonObj.invDel.stockType) + "</StockType>"
                                + "<FstRem_Exped>" + (jsonObj.invDel.fstRemExped === undefined ? "" : jsonObj.invDel.fstRemExped) + "</FstRem_Exped>"
                                + "<SecRem_Exped>" + (jsonObj.invDel.secRemExped === undefined ? "" : jsonObj.invDel.secRemExped) + "</SecRem_Exped>"
                                + "<ThrdRem_Exped>" + (jsonObj.invDel.thrdRemExped === undefined ? "" : jsonObj.invDel.thrdRemExped) + "</ThrdRem_Exped>"
                                + "<ValuationType>" + (jsonObj.invDel.valuationType === undefined ? "" : jsonObj.invDel.valuationType) + "</ValuationType>"
                                + "<RemShelfLife>" + (jsonObj.invDel.remShelfLife === undefined ? "" : jsonObj.invDel.remShelfLife) + "</RemShelfLife>"
                                + "<QAControlLife>" + (jsonObj.invDel.qaControlLife === undefined ? "" : jsonObj.invDel.qaControlLife) + "</QAControlLife>"
                                + "<NoExpend>" + (jsonObj.invDel.noExpend === undefined ? "" : jsonObj.invDel.noExpend) + "</NoExpend>"
                                + "<PlDelTime>" + (jsonObj.invDel.plDelTime === undefined ? "" : jsonObj.invDel.plDelTime) + "</PlDelTime>"
                                + "<GrProcTime>" + (jsonObj.invDel.grProcTime === undefined ? "" : jsonObj.invDel.grProcTime) + "</GrProcTime>"
                                + "<LatestGRDate></LatestGRDate>"
                                + "<IncoTerms1>" + (jsonObj.invDel.incoTerms1 === undefined ? "" : jsonObj.invDel.incoTerms1) + "</IncoTerms1>"
                                + "<IncoTerm2>" + (jsonObj.invDel.incoTerms2 === undefined ? "" : jsonObj.invDel.incoTerms2) + "</IncoTerm2>"
                                + "<GoodsReceipt>" + (jsonObj.invDel.goodsReceipt === undefined ? "" : jsonObj.invDel.goodsReceipt) + "</GoodsReceipt>"
                                + "<GRNonVal>" + (jsonObj.invDel.gRNonVal === undefined ? "" : jsonObj.invDel.gRNonVal) + "</GRNonVal>"
                                + "<DelvCompleted>" + (jsonObj.invDel.delvCompleted === undefined ? "" : jsonObj.invDel.delvCompleted) + "</DelvCompleted>"
                                + "<Unlimited></Unlimited>"
                                + "<Netweight>" + (jsonObj.invDel.netweight2 === undefined ? "" : jsonObj.invDel.netweight2) + "</Netweight>"
                                + "<Grossweight>" + (jsonObj.invDel.grossweight2 === undefined ? "" : jsonObj.invDel.grossweight2) + "</Grossweight>"
                                + "<Volume>" + (jsonObj.invDel.volume2 === undefined ? "" : jsonObj.invDel.volume2) + "</Volume>"
                                + "<Points>" + (jsonObj.invDel.points2 === undefined ? "" : jsonObj.invDel.points2) + "</Points>"
                                + "<LinkId>" + (jsonObj.invDel.linkID === undefined ? "" : jsonObj.invDel.linkID) + "</LinkId>"
                                + "</PODeliveryData>";
                        console.log("Postal Code :" + jsonObj.pOCreationDel.postalCode);

                        PODeliveryAddressData += "<PODeliveryAddressData>"
                                + "<ItemNo>" + prItemNumber + "</ItemNo>"
                                + "<Title>" + handleSpecialCharacter((jsonObj.pOCreationDel[0].title === undefined ? "" : jsonObj.pOCreationDel[0].title)) + "</Title>"
                                + "<Name1>" + handleSpecialCharacter((jsonObj.pOCreationDel[0].name1 === undefined ? "" : jsonObj.pOCreationDel[0].name1)) + "</Name1>"
                                + "<Name2>" + handleSpecialCharacter((jsonObj.pOCreationDel[0].name2 === undefined ? "" : jsonObj.pOCreationDel[0].name2)) + "</Name2>"
                                + "<Street>" + handleSpecialCharacter((jsonObj.pOCreationDel[0].street === undefined ? "" : jsonObj.pOCreationDel[0].street)) + "</Street>"
                                + "<HouseNo>" + handleSpecialCharacter((jsonObj.pOCreationDel[0].houseNumber === undefined ? "" : jsonObj.pOCreationDel[0].houseNumber)) + "</HouseNo>"
                                + "<PostalCode>" + handleSpecialCharacter((jsonObj.pOCreationDel[0].postalCode === undefined ? "" : jsonObj.pOCreationDel[0].postalCode)) + "</PostalCode>"
                                + "<City>" + handleSpecialCharacter((jsonObj.pOCreationDel[0].city === undefined ? "" : jsonObj.pOCreationDel[0].city)) + "</City>"
                                + "<Country>" + handleSpecialCharacter((jsonObj.pOCreationDel[0].country === undefined ? "" : jsonObj.pOCreationDel[0].country)) + "</Country>"
                                + "<Region></Region>"
                                + "<LinkId>" + (jsonObj.pOCreationDel[0].linkID === undefined ? "" : jsonObj.pOCreationDel[0].linkID) + "</LinkId>"
                                + "</PODeliveryAddressData>";
                        console.log("Delivery Text :" + jsonObj.pOCreationText.deliveryText);

//                    if (jsonObj.pOCreationText.linkID !== undefined) {
//                        itmNo = jsonObj.pOCreationText.linkID.toString().split("-")[2];
//                        console.log(" itmNo in InvoiceItemNumber: " + itmNo);
//                    } else {
//                        itmNo = "";
//                    }
                        POTextsData += "<POTextsData>"
                                + "<ItemNumber>" + prItemNumber + "</ItemNumber>"
                                + "<ItemText>" + handleSpecialCharacter((jsonObj.pOCreationText[0].itemText === undefined ? "" : jsonObj.pOCreationText[0].itemText)) + "</ItemText>"
                                + "<InfoRecordPOText>" + handleSpecialCharacter((jsonObj.pOCreationText[0].infoRecordPOText === undefined ? "" : jsonObj.pOCreationText[0].infoRecordPOText)) + "</InfoRecordPOText>"
                                + "<MaterialPOText>" + handleSpecialCharacter((jsonObj.pOCreationText[0].materialPOText === undefined ? "" : jsonObj.pOCreationText[0].materialPOText)) + "</MaterialPOText>"
                                + "<PONoteToApprover>" + handleSpecialCharacter((jsonObj.pOCreationText[0].pONoteToApprover === undefined ? "" : jsonObj.pOCreationText[0].pONoteToApprover)) + "</PONoteToApprover>"
                                + "<DeliveryText>" + handleSpecialCharacter((jsonObj.pOCreationText[0].deliveryText === undefined ? "" : jsonObj.pOCreationText[0].deliveryText)) + "</DeliveryText>"
                                + "<PrnotetoApproval>" + handleSpecialCharacter((jsonObj.pOCreationText[0].pRNoteToApproval === undefined ? "" : jsonObj.pOCreationText[0].pRNoteToApproval)) + "</PrnotetoApproval>"
                                + "<LinkId>" + (jsonObj.pOCreationText[0].linkID === undefined ? "" : jsonObj.pOCreationText[0].linkID) + "</LinkId>"
                                + "</POTextsData>";
                        console.log("Order Ack :" + jsonObj.pOCreationcon.orderAck);

//                    if (jsonObj.pOCreationcon.linkID !== undefined) {
//                        itmNo = jsonObj.pOCreationcon.linkID.toString().split("-")[2];
//                        console.log(" itmNo in InvoiceItemNumber: " + itmNo);
//                    } else {
//                        itmNo = "";
//                    }

                        POConfirmationsData += "<POConfirmationsData>"
                                + "<ItemNumber>" + prItemNumber + "</ItemNumber>"
                                + "<ConfControl>" + (jsonObj.pOCreationcon[0].confControl === undefined ? "" : jsonObj.pOCreationcon[0].confControl) + "</ConfControl>"
                                + "<OrderAck>" + (jsonObj.pOCreationcon[0].orderAck === undefined ? "" : jsonObj.pOCreationcon[0].orderAck) + "</OrderAck>"
                                + "<ConfirmnReq>" + (jsonObj.pOCreationcon[0].confirmnReq === undefined ? "" : jsonObj.pOCreationcon[0].confirmnReq) + "</ConfirmnReq>"
                                + "<RejectInd>" + (jsonObj.pOCreationcon[0].rejectInd === undefined ? "" : jsonObj.pOCreationcon[0].rejectInd) + "</RejectInd>"
                                + "<LinkId>" + (jsonObj.pOCreationcon[0].linkID === undefined ? "" : jsonObj.pOCreationcon[0].linkID) + "</LinkId>"
                                + "</POConfirmationsData>";
                        console.log("LinkId in POCondCtrlData :" + jsonObj.pOCreationcond[0].linkID);

//                    if (jsonObj.pOCreationcond.linkID !== undefined) {
//                        itmNo = jsonObj.pOCreationcond.linkID.toString().split("-")[2];
//                        console.log(" itmNo in InvoiceItemNumber: " + itmNo);
//                    } else {
//                        itmNo = "";
//                    }

                        POCondCtrlData += "<POCondCtrlData>"
                                + "<ItemNumber>" + prItemNumber + "</ItemNumber>"
                                + "<PrintPrice>" + (jsonObj.pOCreationcond[0].printPrice === undefined ? "" : jsonObj.pOCreationcond[0].printPrice) + "</PrintPrice>"
                                + "<EstimatedPrice>" + (jsonObj.pOCreationcond[0].estimatedPrice === undefined ? "" : jsonObj.pOCreationcond[0].estimatedPrice) + "</EstimatedPrice>"
                                + "<LinkId>" + (jsonObj.pOCreationcond[0].linkID === undefined ? "" : jsonObj.pOCreationcond[0].linkID) + "</LinkId>"
                                + "</POCondCtrlData>";

                        var POQuantitySKU = "";
                        var POQuantitySKUUnit = "";
                        var Order2 = "";
                        var OrderUnit2 = "";
                        var SKU = "";
                        var SKUUnit = "";

                        if (prType !== "Service")
                        {
                            POQuantitySKU = jsonObj.quanWeight.poQuantitySKU === undefined ? "" : jsonObj.quanWeight.poQuantitySKU;
                            POQuantitySKUUnit = jsonObj.quanWeight.poQuantitySKUUnit === undefined ? "" : jsonObj.quanWeight.poQuantitySKUUnit;

                            Order2 = jsonObj.quanWeight.order2 === undefined ? "" : jsonObj.quanWeight.order2;
                            OrderUnit2 = jsonObj.quanWeight.orderUnit2 === undefined ? "" : jsonObj.quanWeight.orderUnit2;

                            SKU = jsonObj.quanWeight.sku === undefined ? "" : jsonObj.quanWeight.sku;
                            SKUUnit = jsonObj.quanWeight.skuUnit === undefined ? "" : jsonObj.quanWeight.skuUnit;
                        }

                        POQuantityWeightsData += "<POQuantityWeightsData>"
                                + "<ItemNumber>" + prItemNumber + "</ItemNumber>"
                                + "<POQuantity>" + (jsonObj.quanWeight.poQuantity === undefined ? "" : jsonObj.quanWeight.poQuantity) + "</POQuantity>"
                                + "<POQuantityUnit>" + (jsonObj.quanWeight.poQuantityUnit === undefined ? "" : jsonObj.quanWeight.poQuantityUnit) + "</POQuantityUnit>"
                                + "<POQuantitySKU>" + POQuantitySKU + "</POQuantitySKU>"
                                + "<POQuantitySKUUnit>" + POQuantitySKUUnit + "</POQuantitySKUUnit>"
                                + "<Order1>" + (jsonObj.quanWeight.order1 === undefined ? "" : jsonObj.quanWeight.order1) + "</Order1>"
                                + "<OrderUnit1>" + (jsonObj.quanWeight.orderUnit1 === undefined ? "" : jsonObj.quanWeight.orderUnit1) + "</OrderUnit1>"
                                + "<Order2>" + Order2 + "</Order2>"
                                + "<OrderUnit2>" + OrderUnit2 + "</OrderUnit2>"
                                + "<OrderPrice>" + (jsonObj.quanWeight.orderPrice === undefined ? "" : jsonObj.quanWeight.orderPrice) + "</OrderPrice>"
                                + "<OrderPriceUnit>" + (jsonObj.quanWeight.orderPriceUnit === undefined ? "" : jsonObj.quanWeight.orderPriceUnit) + "</OrderPriceUnit>"
                                + "<SKU>" + SKU + "</SKU>"
                                + "<SKUUnit>" + SKUUnit + "</SKUUnit>"
                                + "<Netweight>" + (jsonObj.quanWeight.netweight === undefined ? "" : jsonObj.quanWeight.netweight) + "</Netweight>"
                                + "<Grossweight>" + (jsonObj.quanWeight.grossweight === undefined ? "" : jsonObj.quanWeight.grossweight) + "</Grossweight>"
                                + "<Volume>" + (jsonObj.quanWeight.volume === undefined ? "" : jsonObj.quanWeight.volume) + "</Volume>"
                                + "<Points>" + (jsonObj.quanWeight.points === undefined ? "" : jsonObj.quanWeight.points) + "</Points>"
                                + "<netweightUnit>" + (jsonObj.quanWeight.netWeightUnit === undefined ? "" : jsonObj.quanWeight.netWeightUnit) + "</netweightUnit>"
                                + "<grosswgtunit>" + (jsonObj.quanWeight.grossWeightUnit === undefined ? "" : jsonObj.quanWeight.grossWeightUnit) + "</grosswgtunit>"
                                + "<netwgtperprice>" + (jsonObj.quanWeight.netWeightPerPrice === undefined ? "" : jsonObj.quanWeight.netWeightPerPrice) + "</netwgtperprice>"
                                + "<grosswgtperprice>" + (jsonObj.quanWeight.grossWeightPerPrice === undefined ? "" : jsonObj.quanWeight.grossWeightPerPrice) + "</grosswgtperprice>"
                                + "<volumeperprice>" + (jsonObj.quanWeight.volumePerPrice === undefined ? "" : jsonObj.quanWeight.volumePerPrice) + "</volumeperprice>"
                                + "<pointsperprice>" + (jsonObj.quanWeight.pointsPerPrice === undefined ? "" : jsonObj.quanWeight.pointsPerPrice) + "</pointsperprice>"
                                + "<netwgtorderunit>" + (jsonObj.quanWeight.netWeightOrderUnit === undefined ? "" : jsonObj.quanWeight.netWeightOrderUnit) + "</netwgtorderunit>"
                                + "<grosswgtorderunit>" + (jsonObj.quanWeight.grossWeightOrderUnit === undefined ? "" : jsonObj.quanWeight.grossWeightOrderUnit) + "</grosswgtorderunit>"
                                + "<volumeorderunit>" + (jsonObj.quanWeight.volumeOrderUnit === undefined ? "" : jsonObj.quanWeight.volumeOrderUnit) + "</volumeorderunit>"
                                + "<pointsorderunit>" + (jsonObj.quanWeight.pointsOrderUnit === undefined ? "" : jsonObj.quanWeight.pointsOrderUnit) + "</pointsorderunit>"
                                + "<netweight2>" + (jsonObj.quanWeight.netweight2 === undefined ? "" : jsonObj.quanWeight.netweight2) + "</netweight2>"
                                + "<grossweight2>" + (jsonObj.quanWeight.grossweight2 === undefined ? "" : jsonObj.quanWeight.grossweight2) + "</grossweight2>"
                                + "<volume2>" + (jsonObj.quanWeight.volume2 === undefined ? "" : jsonObj.quanWeight.volume2) + "</volume2>"
                                + "<points2>" + (jsonObj.quanWeight.points2 === undefined ? "" : jsonObj.quanWeight.points2) + "</points2>"
                                + "<netweight2Unit>" + (jsonObj.quanWeight.netWeightUnit2 === undefined ? "" : jsonObj.quanWeight.netWeightUnit2) + "</netweight2Unit>"
                                + "<grosswgt2unit>" + (jsonObj.quanWeight.grossWeightUnit2 === undefined ? "" : jsonObj.quanWeight.grossWeightUnit2) + "</grosswgt2unit>"
                                + "<LinkID>" + (jsonObj.quanWeight.linkID === undefined ? "" : jsonObj.quanWeight.linkID) + "</LinkID>"
                                + "</POQuantityWeightsData>";

                        $.ajax({
                            type: "GET",
                            url: "poajaxrequest.do",
                            async: false,
                            data: {
                                "reqFrom": "getDeliveryScheduleByLinkId",
                                "linkid": linkid
                            },
                            complete: function(responseJson) {

//                            var jsonArr = $.parseJSON(responseJson.responseText);
//                            jsonArr = JSON.parse(JSON.stringify(jsonArr));
                                var obj = $.parseJSON(responseJson.responseText);

                                if (obj.jArraDeliverySchedule.length !== 0) {
                                    for (var i = 0; i < obj.jArraDeliverySchedule.length; i++) {
                                        console.log("obj.jArraDeliverySchedule.length: " + obj.jArraDeliverySchedule.length);
                                        var deliveryDate = obj.jArraDeliverySchedule[i].DELIVERY_DATE === undefined ? '' : obj.jArraDeliverySchedule[i].DELIVERY_DATE;
                                        var deliDateCat = obj.jArraDeliverySchedule[i].DELIVERY_DATE_CAT === undefined ? '' : obj.jArraDeliverySchedule[i].DELIVERY_DATE_CAT;
                                        var purReqNumber = obj.jArraDeliverySchedule[i].PURCHASE_REQUEST_NUMBER === undefined ? '' : obj.jArraDeliverySchedule[i].PURCHASE_REQUEST_NUMBER;
                                        var reqItemNumber = obj.jArraDeliverySchedule[i].REQUEST_ITEM_NUMBER === undefined ? '' : obj.jArraDeliverySchedule[i].REQUEST_ITEM_NUMBER;
                                        var scheduledQuantity = obj.jArraDeliverySchedule[i].SCHEDULED_QUANTITY === undefined ? '' : obj.jArraDeliverySchedule[i].SCHEDULED_QUANTITY;
                                        var time = obj.jArraDeliverySchedule[i].TIME === undefined ? '' : obj.jArraDeliverySchedule[i].TIME;
                                        var linkID = obj.jArraDeliverySchedule[i].LINKID === undefined ? '' : obj.jArraDeliverySchedule[i].LINKID;
                                        var stDelDate = obj.jArraDeliverySchedule[i].stDelDate === undefined ? '' : obj.jArraDeliverySchedule[i].stDelDate;
                                        var gRQty = obj.jArraDeliverySchedule[i].GR_QUANTITY === undefined ? '' : obj.jArraDeliverySchedule[i].GR_QUANTITY;
                                        var openquantity = obj.jArraDeliverySchedule[i].OPEN_QUANTITY === undefined ? '' : obj.jArraDeliverySchedule[i].OPEN_QUANTITY;

                                        console.log("deliveryDate 1:" + deliveryDate);
                                        console.log("deliDateCat:" + deliDateCat);
                                        console.log("stDelDate 1:" + stDelDate);

                                        if (deliveryDate !== undefined && deliveryDate !== "" && deliDateCat === "D")
                                        {
                                            var deliveryDateArr = deliveryDate.toString().split(".");
                                            console.log("deliveryDateArr len: " + deliveryDateArr.length);
                                            deliveryDate = deliveryDateArr[2] + "-" + deliveryDateArr[1] + "-" + deliveryDateArr[0];
                                            console.log("deliveryDate 2:" + deliveryDate);
                                        }
                                        if (stDelDate !== undefined && stDelDate !== "") {
                                            var stDelDateArr = stDelDate.toString().split(".");
                                            console.log("stDelDateArr len: " + stDelDateArr.length);
                                            stDelDate = stDelDateArr[2] + "-" + stDelDateArr[1] + "-" + stDelDateArr[0];
                                            console.log("stDelDate 2:" + stDelDate);
                                        }

                                        PODeliveryScheduleData += "<PODeliveryScheduleData>"
                                                + "<ItemNo>" + prItemNumber + "</ItemNo>"
                                                + "<DelDateCatg>" + deliDateCat + "</DelDateCatg>"
                                                + "<DelDate>" + deliveryDate + "</DelDate>"
                                                + "<ScheduledQuantity>" + scheduledQuantity + "</ScheduledQuantity>"
                                                + "<DelTime>" + time + "</DelTime>"
                                                + "<PRNumber></PRNumber>"
                                                + "<ReqItemNo>" + reqItemNumber + "</ReqItemNo>"
                                                + "<Scheduledqty></Scheduledqty>"
                                                + "<Statisticaldeliverydate>" + stDelDate + "</Statisticaldeliverydate>"
                                                + "<GRQty>" + gRQty + "</GRQty>"
                                                + "<openquantity>" + openquantity + "</openquantity>"
                                                + "<LinkId>" + linkID + "</LinkId>"
                                                + "</PODeliveryScheduleData>";
                                    }
                                }
                                console.log("PODeliveryScheduleData :" + PODeliveryScheduleData);
                            }

                        });
                        if (isFOCEnabled === false) {
                            $.ajax({
                                type: "GET",
                                url: "poajaxrequest.do",
                                async: false,
                                data: {
                                    "reqFrom": "getConditionsByLinkId",
                                    "linkid": linkid
                                },
                                complete: function(responseJson) {
                                    var jsonArr = $.parseJSON(responseJson.responseText);
                                    jsonArr = JSON.parse(JSON.stringify(jsonArr));
                                    var row = "";
                                    var itmNo = "";

                                    for (var i = 0; i < jsonArr.length; i++)
                                    {
                                        var condName = "";
                                        if (jsonArr[i].name !== undefined)
                                        {
                                            condName = handleSpecialCharacter(jsonArr[i].name);
                                        }
                                        var vendorName = "";
                                        if (jsonArr[i].vendorName !== undefined)
                                        {
                                            vendorName = handleSpecialCharacter(jsonArr[i].vendorName);
                                        }


                                        itmNo = jsonArr[i].linkID.toString().split("-")[2];
                                        console.log(" itmNo in InvoiceItemNumber: " + itmNo);
                                        POLineItemConditionsData += "<POLineItemConditionsData>"
                                                + "<ItemNumber>" + prItemNumber + "</ItemNumber>"
                                                + "<CondUnit>" + (jsonArr[i].uoM === undefined ? "" : jsonArr[i].uoM) + "</CondUnit>"
                                                + "<CondSTNo>" + (jsonArr[i].stNumber === undefined ? "" : jsonArr[i].stNumber) + "</CondSTNo>"
                                                + "<CondCount>" + (jsonArr[i].conditionCount === undefined ? "" : jsonArr[i].conditionCount) + "</CondCount>"
                                                + "<CondChangeId>" + (jsonArr[i].changeId === undefined ? "" : jsonArr[i].changeId) + "</CondChangeId>"
                                                + "<CondType>" + (jsonArr[i].condType === undefined ? "" : jsonArr[i].condType) + "</CondType>"
                                                + "<CondName>" + condName + "</CondName>"
                                                + "<CondVal>" + (jsonArr[i].condVal === undefined ? "" : jsonArr[i].condVal) + "</CondVal>"
                                                + "<CondCrncy>" + (jsonArr[i].currency === undefined ? "" : jsonArr[i].currency) + "</CondCrncy>"
                                                + "<Amount>" + (jsonArr[i].amount === undefined ? "" : jsonArr[i].amount) + "</Amount>"
//                                                + "<CondPricUnit>" + (jsonArr[i].condPricUnit === undefined ? "" : jsonArr[i].condPricUnit) + "</CondPricUnit>"
                                                + "<CondPricUnit>" + (jsonArr[i].perQuantity === undefined ? "" : jsonArr[i].perQuantity) + "</CondPricUnit>"
                                                + "<Currency>" + (jsonArr[i].currency1 === undefined ? "" : jsonArr[i].currency1) + "</Currency>"
                                                + "<AccountKey>" + (jsonArr[i].kvsl1 === undefined ? "" : jsonArr[i].kvsl1) + "</AccountKey>"
                                                + "<Accruals>" + (jsonArr[i].kvsl2 === undefined ? "" : jsonArr[i].kvsl2) + "</Accruals>"
                                                + "<Application>" + (jsonArr[i].kappl === undefined ? "" : jsonArr[i].kappl) + "</Application>"
                                                + "<VendorName>" + vendorName + "</VendorName>"
                                                + "<VendorCode>" + (jsonArr[i].vendorCode === undefined ? "" : jsonArr[i].vendorCode) + "</VendorCode>"
                                                + "<CondPriceDate>" + (jsonArr[i].condPriceDate === undefined ? "" : jsonArr[i].condPriceDate) + "</CondPriceDate>"
                                                + "<CondCurncyExchangeRate>" + (jsonArr[i].condCurncyExchangeRate === undefined ? "" : jsonArr[i].condCurncyExchangeRate) + "</CondCurncyExchangeRate>"
                                                + "<POCurrencyExchangeRate>" + (jsonArr[i].poCurrencyExchangeRate === undefined ? "" : jsonArr[i].poCurrencyExchangeRate) + "</POCurrencyExchangeRate>"
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
                                                + "<Status>" + (jsonArr[i].ngStatus === undefined ? "" : jsonArr[i].ngStatus) + "</Status>"
                                                + "<Numerator>" + (jsonArr[i].numerator === undefined ? "" : jsonArr[i].numerator) + "</Numerator>"
                                                + "<BaseUOM>" + (jsonArr[i].baseUOM === undefined ? "" : jsonArr[i].baseUOM) + "</BaseUOM>"
                                                + "<Denominator>" + (jsonArr[i].denominatorforconv === undefined ? "" : jsonArr[i].denominatorforconv) + "</Denominator>"
                                                + "<Uom-Extra>" + (jsonArr[i].uomextra === undefined ? "" : jsonArr[i].uomextra) + "</Uom-Extra>"
                                                + "<LinkId>" + (jsonArr[i].linkID === undefined ? "" : jsonArr[i].linkID) + "</LinkId>"
                                                + "</POLineItemConditionsData>";
                                    }
                                }
                            });
                        }
                        console.log("accAss: " + accAss);
                        console.log("itemCat: " + itemCat);
                        if (accAss === "" && itemCat === "L")
                        {
                            $.ajax({
                                type: "GET",
                                url: "poajaxrequest.do",
                                async: false,
                                data: {
                                    "reqFrom": "getNGBPCmplxPOCreationLineItemComponentByLinkId",
                                    "linkid": linkid
                                },
                                complete: function(responseJson) {
                                    var jsonArr = $.parseJSON(responseJson.responseText);
                                    jsonArr = JSON.parse(JSON.stringify(jsonArr));
                                    console.log("jsonArr: " + jsonArr);

                                    for (var i = 0; i < jsonArr.length; i++)
                                    {
                                        var requirementDate = jsonArr[i].requirementDate === undefined ? "" : jsonArr[i].requirementDate;
                                        var latestRequirementDate = jsonArr[i].latestRequirementDate === undefined ? "" : jsonArr[i].latestRequirementDate;

                                        if (requirementDate !== undefined && requirementDate !== "") {
                                            var requirementDateArr = requirementDate.toString().split(".");
                                            console.log("requirementDateArr len: " + requirementDateArr.length);
                                            requirementDate = requirementDateArr[2] + "-" + requirementDateArr[1] + "-" + requirementDateArr[0];
                                            console.log("requirementDate 2:" + requirementDate);
                                        }
                                        if (latestRequirementDate !== undefined && latestRequirementDate !== "") {
                                            var latestRequirementDateArr = latestRequirementDate.toString().split(".");
                                            console.log("latestRequirementDateArr len: " + latestRequirementDateArr.length);
                                            latestRequirementDate = latestRequirementDateArr[2] + "-" + latestRequirementDateArr[1] + "-" + latestRequirementDateArr[0];
                                            console.log("latestRequirementDate 2:" + latestRequirementDate);
                                        }

                                        console.log("jsonArr[i].linkId: " + jsonArr[i].linkId);

                                        POComponentData += "<POComponentsData>"
                                                + "<POItem>" + prItemNumber + "</POItem>"
                                                + "<schedline>" + (i + 1) + "</schedline>" // 1,2,3...
                                                + "<itemno>" + (i + 1) + "</itemno>" // 1,2,3...
                                                + "<ChangeId></ChangeId>" // 1,2,3...
                                                + "<MaterialCode>" + (jsonArr[i].materialCode === undefined ? "" : jsonArr[i].materialCode) + "</MaterialCode>"
                                                + "<Description>" + (jsonArr[i].description === undefined ? "" : jsonArr[i].description) + "</Description>"
                                                + "<Quantity>" + (jsonArr[i].quantity === undefined || Number(jsonArr[i].quantity) === 0 ? "" : jsonArr[i].quantity) + "</Quantity>"
                                                + "<Plant>" + (jsonArr[i].plant === undefined ? "" : jsonArr[i].plant) + "</Plant>"
                                                + "<Unit>" + (jsonArr[i].unit === undefined ? "" : jsonArr[i].unit) + "</Unit>"
                                                + "<FixedQty></FixedQty>"
                                                + "<ProdStorageLocation>" + (jsonArr[i].productStorageLocation === undefined ? "" : jsonArr[i].productStorageLocation) + "</ProdStorageLocation>"
                                                + "<RequirementDate>" + requirementDate + "</RequirementDate>"
                                                + "<LinkId>" + (jsonArr[i].linkId === undefined ? "" : jsonArr[i].linkId) + "</LinkId>"
                                                + "<qtyfixed>" + (jsonArr[i].qtyIsFixed === undefined ? "" : jsonArr[i].qtyIsFixed) + "</qtyfixed>"
                                                + "<latestreqdate>" + latestRequirementDate + "</latestreqdate>"
                                                + "<distribkey>" + (jsonArr[i].distributionKey === undefined ? "" : jsonArr[i].distributionKey) + "</distribkey>"
                                                + "<batch>" + (jsonArr[i].batch === undefined ? "" : jsonArr[i].batch) + "</batch>"
                                                + "</POComponentsData>";
                                    }
                                }
                            });
                        }
                        console.log("POComponentData: " + POComponentData);

                        $.ajax({
                            type: "GET",
                            url: "standalonepoajaxrequest.do",
                            async: false,
                            data: {
                                "reqFrom": "getNGBPCmplxPOCreationLineItemMaterialByLinkId",
                                "linkid": linkid
                            },
                            complete: function(responseJson) {
                                var jsonArr = $.parseJSON(responseJson.responseText);
                                jsonArr = JSON.parse(JSON.stringify(jsonArr));
                                console.log("jsonArr: " + jsonArr);

                                for (var i = 0; i < jsonArr.length; i++)
                                {
                                    console.log("jsonArr[i].revisionLevel: " + jsonArr[i].revisionLevel);

                                    POMaterialData += "<POMaterialData>"
                                            + "<ItemNo>" + prItemNumber + "</ItemNo>"
                                            + "<MfrPartNumber></MfrPartNumber>"
                                            + "<Manufacturer></Manufacturer>"
                                            + "<revisionlevel>" + (jsonArr[i].revisionLevel === undefined ? "" : jsonArr[i].revisionLevel) + "</revisionlevel>"
                                            + "<VendMatno>" + (jsonArr[i].vendMatNo === undefined ? "" : jsonArr[i].vendMatNo) + "</VendMatno>"
                                            + "<EANUPC>" + (jsonArr[i].eanUpc === undefined ? "" : jsonArr[i].eanUpc) + "</EANUPC>"
                                            + "<Vendorsubrange>" + (jsonArr[i].vendorSubrange === undefined ? "" : jsonArr[i].vendorSubrange) + "</Vendorsubrange>"
                                            + "<Batch>" + (jsonArr[i].batch === undefined ? "" : jsonArr[i].batch) + "</Batch>"
                                            + "<vendorbatch>" + (jsonArr[i].vendorBatch === undefined ? "" : jsonArr[i].vendorBatch) + "</vendorbatch>"
                                            + "<infoupdate>" + (jsonArr[i].infoUpdate === undefined ? "" : jsonArr[i].infoUpdate) + "</infoupdate>"
                                            + "<MfrPartNumber>" + (jsonArr[i].mfrPartNumber === undefined ? "" : jsonArr[i].mfrPartNumber) + "</MfrPartNumber>"
                                            + "<Manufacturer>" + (jsonArr[i].manufacturer === undefined ? "" : jsonArr[i].manufacturer) + "</Manufacturer>"
                                            + "<LinkId>" + (jsonArr[i].linkId === undefined ? "" : jsonArr[i].linkId) + "</LinkId>"
                                            + "</POMaterialData>";
                                }
                            }
                        });
                        console.log("POMaterialData: " + POMaterialData);

                        $.ajax({
                            type: "GET",
                            url: "poajaxrequest.do",
                            async: false,
                            data: {
                                "reqFrom": "FindProfitabilitySegmentByLinkId",
                                "linkId": linkid
                            },
                            complete: function(responseJson) {
                                var jsonProfitabilitySegmentDataArr = $.parseJSON(responseJson.responseText);
                                jsonProfitabilitySegmentDataArr = JSON.parse(JSON.stringify(jsonProfitabilitySegmentDataArr));
                                console.log("jsonProfitabilitySegmentDataArr: " + jsonProfitabilitySegmentDataArr);

                                for (var i = 0; i < jsonProfitabilitySegmentDataArr.length; i++)
                                {
                                    console.log("InvoiceItemNumber: " + jsonProfitabilitySegmentDataArr[i].prItemNumber);

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

                    }
                });
                console.log("POLimitsData: " + POLimitsData);

            });

            var POConditionsData = "";
            $("#conditionTableId tbody tr").each(function() {
                console.log($(this).find("td").eq(1).children(".ConditionTypeHeader").val());

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
//                        + "<CondPricUnit>" + $(this).find("td").eq(6).children(".ConditionPricingUnitHeader").val() + "</CondPricUnit>"
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

//        xmlString += POPartnersData;
            xmlString += POCommunicationData;
            xmlString += POCustomerData;
            xmlString += POVendorAddressData;
            xmlString += POHeaderTextData;
            xmlString += PODeliveryInvoiceData;
            xmlString += POLineItemData;
            xmlString += POAccntAssignData;
            xmlString += POInvoiceData;
            xmlString += POStatusData;
            //        xmlString += POLineItemCustomerData;
            if (prType === "Service") {
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
            xmlString += POComponentData;
            xmlString += POLineItemCustomerData;
            xmlString += PODeliveryScheduleData;
            xmlString += POConditionsData;
            xmlString += POLineItemConditionsData;
            xmlString += POMaterialData;
            xmlString += "</POCreation>";

            console.log("InputXml: " + xmlString);

            var x2js = new X2JS();
            console.log("x2js.xml_str2json(xmlString): " + x2js.xml_str2json(xmlString));

            var sapJsonObject = x2js.xml_str2json(xmlString);
            console.log("sapJsonObject: " + sapJsonObject);
            sapJsonObject.POCreation.GeneralData.TotalPOAmount = $("#totalPoAmt").val();
            sapJsonObject.POCreation.GeneralData.TotalPOAmtPOVendor = $("#totalPoAmtExcludingVendor").val();

            var sapJsonPoDataAsString = JSON.stringify(sapJsonObject);
            console.log("sapJsonPoDataAsString before encodeURIComponent: " + sapJsonPoDataAsString);
            sapJsonPoDataAsString = encodeURIComponent(sapJsonPoDataAsString);
            console.log("sapJsonPoDataAsString after encodeURIComponent: " + sapJsonPoDataAsString);

            var WebServiceCallIp = $("#WebServiceCallIp").val();
            console.log("WebServiceCallIp: " + WebServiceCallIp);

            var sapUrl = WebServiceCallIp + "/WebServiceCall/PO_CreatePOSAP";
            console.log("sapUrl :" + sapUrl);

            var xmlStringArr = xmlString.split("<PurchaseOrderNumber>");
            var URLParam = xmlStringArr[0] + "<PurchaseOrderNumber>" + "" + xmlStringArr[1];

            var serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_CreatePONG";
            console.log("NGServiceUrl 1: " + serviceUrl);

            var local_dev_uat = $("#local_dev_uat").val();
            console.log("local_dev_uat: " + local_dev_uat);

            if (local_dev_uat === "dev" || local_dev_uat === "uat")
            {
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
                                
                                var extPoid = $("#poid").val();
                                console.log("extPoid: " + extPoid);
                                updateExtDraftPoDetailsOnPoCreation(extPoid);
                                
                                var message = "";
                                var GeneratedPoNumber = "";

                                $.ajax({
                                    type: "GET",
                                    url: "standalonepoajaxrequest.do",
                                    async: false,
                                    data: {
                                        "reqFrom": "generatePoRunningSequence",
                                        "prType": $("#prType").val()
                                    },
                                    complete: function(responseJson) {
                                        var obj = $.parseJSON(responseJson.responseText);
                                        console.log("GeneratedPoNumber: " + obj.GeneratedPoNumber);
                                        GeneratedPoNumber = obj.GeneratedPoNumber;
                                        message = message + "Running Sequence: <b>" + obj.GeneratedPoNumber + "</b>";
                                    }
                                });

                                URLParam = xmlStringArr[0] + "<PurchaseOrderNumber>" + PoNumber + xmlStringArr[1];
                                console.log("URLParam: " + URLParam);

                                var ngJsonObject = x2js.xml_str2json(URLParam);
                                console.log("SAP ngJsonObject: " + ngJsonObject);
                                ngJsonObject.POCreation.GeneralData.PO_SequenceNO = GeneratedPoNumber;
                                ngJsonObject.POCreation.GeneralData.TotalPOAmount = $("#totalPoAmt").val();
                                ngJsonObject.POCreation.GeneralData.TotalPOAmtPOVendor = $("#totalPoAmtExcludingVendor").val();

                                var ngJsonPoDataAsString = JSON.stringify(ngJsonObject);
                                console.log("ngJsonPoDataAsString before encodeURIComponent: " + ngJsonPoDataAsString);
                                ngJsonPoDataAsString = encodeURIComponent(ngJsonPoDataAsString);
                                console.log("ngJsonPoDataAsString after encodeURIComponent: " + ngJsonPoDataAsString);

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

                                        if(PID !== "" && PID !== undefined) 
                                        {
                                            console.log("PID is not blank!");
                                            message = message + "<br>PO Number: <b>" + PoNumber + "</b><br>Message: " + SAPMessage + "<br>Work Item: <b>" + PID + "</b><br>Message: " + WIMessage;
                                            var TempAttachmentId = $("#TempAttachmentId").val();
                                            if (TempAttachmentId !== "") {
                                                $.ajax({
                                                    type: "GET",
                                                    url: "standalonepoajaxrequest.do",
                                                    async: false,
                                                    data: {
                                                        "reqFrom": "UploadStandalonePoDocumentsToDMS",
                                                        "PoNumber": PoNumber,
                                                        "PID": PID,
                                                        "poHeaderId": $("#poid").val()
                                                    },
                                                    complete: function(responseJson) {
                                                        var obj = $.parseJSON(responseJson.responseText);
                                                        console.log("MainCode: " + obj.MainCode);
                                                        console.log("Pid: " + obj.Pid);
                                                        console.log("Message: " + obj.Message);

                                                        message = message + "<br>Document Upload: " + obj.Message;
                                                    }
                                                });
                                            }
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
                                            $("#tempPoNumber").val(PoNumber);
                                            $("#poSequenceNumber").val(GeneratedPoNumber);

                                            Lobibox.notify("warning", {
                                                rounded: true,
                                                delayIndicator: false,
                                                msg: "Work item not generated, please wait..."
                                            });
                                            $("#overlay").css("display", "block");

                                            var extId = $("#poid").val();
                                            console.log("extId: " + extId);                                        
                                            setTimeout(
                                                function()
                                                {
                                                    updateExtDraftPoDetailsOnErrorTransaction(extId);
                                                    $("#overlay").css("display", "none");
                                                    message = "<br>PO Number: <b>" + PoNumber + "</b><br>Message: " + SAPMessage + "<br>Work Item: <b>Not generated</b>";
                                                    Lobibox.alert("info", {
                                                        msg: message,
                                                        callback: function(lobibox, type) {
                                                            location.href = "errorTransactionsSA.do";
                                                        }
                                                    });
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
                    $("#overlay").css("display", "block");
                    var message = "";
                    
                    var tempPoNumber = $("#tempPoNumber").val();
                    var poSequenceNumber = $("#poSequenceNumber").val();
                    console.log("tempPoNumber: " + tempPoNumber);
                    console.log("poSequenceNumber: " + poSequenceNumber);
                    
                    URLParam = xmlStringArr[0] + "<PurchaseOrderNumber>" + tempPoNumber + xmlStringArr[1];
                    console.log("URLParam: " + URLParam);

                    var ngJsonObject = x2js.xml_str2json(URLParam);
                    console.log("SAP ngJsonObject: " + ngJsonObject);
                    ngJsonObject.POCreation.GeneralData.PO_SequenceNO = poSequenceNumber;
                    ngJsonObject.POCreation.GeneralData.TotalPOAmount = $("#totalPoAmt").val();
                    ngJsonObject.POCreation.GeneralData.TotalPOAmtPOVendor = $("#totalPoAmtExcludingVendor").val();

                    var ngJsonPoDataAsString = JSON.stringify(ngJsonObject);
                    console.log("ngJsonPoDataAsString before encodeURIComponent: " + ngJsonPoDataAsString);
                    ngJsonPoDataAsString = encodeURIComponent(ngJsonPoDataAsString);
                    console.log("ngJsonPoDataAsString after encodeURIComponent: " + ngJsonPoDataAsString);
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

                            if(PID !== "" && PID !== undefined) 
                            {
                                console.log("PID is not blank!");
                                message = "Work Item: <b>" + PID + "</b><br>Message: <b>" + WIMessage + "</b>";
                                var TempAttachmentId = $("#TempAttachmentId").val();
                                if (TempAttachmentId !== "") {
                                    $.ajax({
                                        type: "GET",
                                        url: "standalonepoajaxrequest.do",
                                        async: false,
                                        data: {
                                            "reqFrom": "UploadStandalonePoDocumentsToDMS",
                                            "PoNumber": PoNumber,
                                            "PID": PID,
                                            "poHeaderId": $("#poid").val()
                                        },
                                        complete: function(responseJson) {
                                            var obj = $.parseJSON(responseJson.responseText);
                                            console.log("MainCode: " + obj.MainCode);
                                            console.log("Pid: " + obj.Pid);
                                            console.log("Message: " + obj.Message);

                                            message = message + "<br>Document Upload: " + obj.Message;
                                        }
                                    });
                                }
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
                                message = "Work Item: <b>" + PID + "</b><br>Message: <b>" + WIMessage + "</b>";
                                Lobibox.alert("info", {
                                    msg: message,
                                    callback: function(lobibox, type) {
                                        location.href = "errorTransactionsSA.do";
                                    }
                                });
                            }
                        }
                    });
                }
            }
            else
            {
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
                    var localGeneratedPoNumber = "";
                    
                    var message = "PO Number: <b>" + PoNumber + "</b><br>Message: " + SAPMessage + "<br>Work Item: <b>" + PID + "</b><br>Message: " + WIMessage;
                    $.ajax({
                        type: "GET",
                        url: "standalonepoajaxrequest.do",
                        async: false,
                        data: {
                            "reqFrom": "generatePoRunningSequence",
                            "prType": $("#prType").val()
                        },
                        complete: function(responseJson) {
                            var obj = $.parseJSON(responseJson.responseText);
                            console.log("GeneratedPoNumber: " + obj.GeneratedPoNumber);
                            localGeneratedPoNumber = obj.GeneratedPoNumber;
                            message = message + "<br>Running Sequence: <b>" + obj.GeneratedPoNumber + "</b>";
                        }
                    });
                    if(PID !== "" && PID !== undefined) 
                    {    
                        Lobibox.alert("info", {
                            msg: message,
                            callback: function(lobibox, type) {
                            }
                        });
                    }
                    else
                    {
                        console.log("%cPID is blank!", "color: red");
                        $("#errorTransactionStatus").val("Yes");
                        $("#tempPoNumber").val(PoNumber);
                        $("#poSequenceNumber").val(localGeneratedPoNumber);

                        Lobibox.notify("warning", {
                            rounded: true,
                            delayIndicator: false,
                            msg: "Work item not generated, please wait..."
                        });
                        $("#overlay").css("display", "block");

                        var extId = $("#poid").val();
                        console.log("extId: " + extId);                                        
                        setTimeout(
                            function()
                            {
                                updateExtDraftPoDetailsOnErrorTransaction(extId);
                                $("#overlay").css("display", "none");
                                message = "<br>PO Number: <b>" + PoNumber + "</b><br>Message: " + SAPMessage + "<br>Work Item: <b>Not generated</b>";
                                Lobibox.alert("info", {
                                    msg: message,
                                    callback: function(lobibox, type) {
                                        location.href = "errorTransactionsSA.do";
                                    }
                                });
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
        }, 1000);


    });

    $("#updatePoBtn").click(function() {
        var vendorNameCode = $("#vendorcodeHeader").val(); // $("#vendorcodeHeader :selected").text();
        var vendorCode = vendorNameCode.substring(vendorNameCode.lastIndexOf('-') + 1, vendorNameCode.length);
        var vendorName = vendorNameCode.substring(0, vendorNameCode.lastIndexOf('-'));
        console.log(vendorCode + ", " + vendorName);

        vendorName = handleSpecialCharacter(vendorName);

        console.log("After Special Character: " + vendorName);
//        var docDate = $("#docDateHeader").val();
        //        var arr1 = docDate.split("-"); //        var day = arr1[0].trim();
//        var month = arr1[1].trim();
//        var year = arr1[2].trim();
        //        var newDocDate = year + "-" + month + "-" + day;

        var xmlString = "<POCreation>"
                + "<GeneralData>" + "<UniqueID></UniqueID>"
                + "<UserId>" + $("#creatorId").text() + "</UserId>"
                + "<InitiatorId>" + $("#creatorId").text() + "</InitiatorId>"
                + "<InitiatorEmailId>" + $("#creatorEmailId").text() + "</InitiatorEmailId>"
                + "<CompanyCode>" + $("#companycodeHeader").val() + "</CompanyCode>"
                + "<RequestType>Amend Purchase Order</RequestType>"
                + "<PurchaseSubCategory></PurchaseSubCategory>"
                + "<PurchaseOrderNumber>" + $("#fetchPoNumber").val() + "</PurchaseOrderNumber>"
                + "<PurchaseOrderType>" + $("#typeOfPOHeader").val() + "</PurchaseOrderType>"
                + "<ReferenceDocumentType>" + $("#referenceDocType").val() + "</ReferenceDocumentType>"
                + "<ReferenceDocumentNumber>" + $("#referenceDocNumber").val() + "</ReferenceDocumentNumber>"
                + "<ReferenceDocumentLine>" + $("#referenceDocLine").val() + "</ReferenceDocumentLine>"
                + "<VendorName>" + vendorName + "</VendorName>"
                + "<VendorCode>" + vendorCode + "</VendorCode>"
                + "<DocumentDate></DocumentDate>"
                + "<DownpaymentReqd>" + $("#downPaymentReqd").val() + "</DownpaymentReqd>" + "<value>" + $("#downPaymentReqdValue").val() + "</value>"
                + "<PurchasingOrg>" + $("#purchasingOrg").val() + "</PurchasingOrg>"
                + "<PurchasingGrp>" + $("#purchasingGroup").val() + "</PurchasingGrp>"
                + "<CollectiveNumber>" + $("#CollectiveNumber").val() + "</CollectiveNumber>"
                + "</GeneralData>";


        var POLineItemData = "";
        var POServiceData = "";
        var POServiceRefData = "";
        var PackageNo = "";
        var POAccntAssignvalData = "";
//        var prType = "";
        $("#material_headerClass tbody tr").each(function(index) {
            console.log(index);
            var linkid = $(this).find("td").eq(0).children(".linkid").val();
            console.log("linkid : " + linkid);
            if (PackageNo === "")
                PackageNo = index + 1;

            console.log("Requisition Date :" + $(this).find("td").eq(14).text());
            console.log("Delivery Date :" + $(this).find("td").eq(15).text());
            var reqDate = $(this).find("td").eq(14).children('.requisitionDateClass').val();
            var delDate = $(this).find("td").eq(15).children('.deliveryDateClass').val();
            //            alert("reqDate :" + reqDate + "delDate :" + delDate);

            //            var RequisitionDate = new Date(new Date(reqDate)).toDateString("yyyy-MM-dd"); 
            //            var DeliveryDate = new Date(new Date(delDate)).toDateString("yyyy-MM-dd");

            var date = new Date(reqDate);
            var day = date.getDate();
            var month = date.getMonth();
            var year = date.getFullYear();
            if (month < 10) {
                month = "0" + month;
            }
            if (day < 10) {
                day = "0" + day;
            }
            var RequisitionDate = year + "-" + month + "-" + day;


            var date1 = new Date(delDate);
            var day1 = date1.getDate();
            var month1 = date1.getMonth();
            var year1 = date1.getFullYear();
            if (month1 < 10) {
                month1 = "0" + month1;
            }
            if (day1 < 10) {
                day1 = "0" + day1;
            }
            var DeliveryDate = year1 + "-" + month1 + "-" + day1;

//            alert("DeliveryDate :" + DeliveryDate);

            var taxCode = '';
            $.ajax({
                type: "GET",
                url: "doajaxrequest.do",
                async: false,
                data: {
                    "reqFrom": "FindInvoiceByLinkid",
                    "linkid": linkid
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

            var shortText = "";
            if ($(this).find("td").eq(5).text() !== "")
            {
                shortText = handleSpecialCharacter($(this).find("td").eq(6).text());
            }
            var MaterialLongText = "";
            if ($(this).find("td").eq(7).text() !== "")
            {
                MaterialLongText = handleSpecialCharacter($(this).find("td").eq(7).text());
            }
//            alert("BIttu");
            POLineItemData += "<POLineItemData>"
                    + "<PRLinkID>" + $(this).find("td").eq(0).children(".linkid").val() + "</PRLinkID>"
                    + "<PRNumber></PRNumber>"
                    + "<PRItemNumber>" + $(this).find("td").eq(1).text().toString().trim() + "</PRItemNumber>"
                    + "<ItemNumber>" + $(this).find("td").eq(1).text().toString().trim() + "</ItemNumber>"
                    + "<AccountAssignment>" + $(this).find("td").eq(2).children(".accountAssignmentClass").val() + "</AccountAssignment>"
                    + "<ItemCategory>" + $(this).find("td").eq(3).children(".itemCategoryClass").val() + "</ItemCategory>"
                    + "<Criticality>" + $(this).find("td").eq(5).children('.poCriticality').val() + "</Criticality>"
                    + "<ShortText>" + shortText + "</ShortText>"
                    + "<Quantity>" + removeCommaInNumber($(this).find("td").eq(8).children('.quantity_Class').val()) + "</Quantity>" + "<PriceUnit>" + $(this).find("td").eq(10).text() + "</PriceUnit>"
                    + "<ValPrice></ValPrice>"
                    + "<NetPrice>" + $(this).find("td").eq(9).text() + "</NetPrice>"
                    + "<Currency>" + $(this).find("td").eq(11).children('.currencyClass').val() + "</Currency>"
                    + "<DeliveryDateCategory>" + $(this).find("td").eq(13).text() + "</DeliveryDateCategory>"
                    + "<Total></Total>"
                    + "<RequisitionDate>" + RequisitionDate + "</RequisitionDate>"
                    + "<DeliveryDate>" + DeliveryDate + "</DeliveryDate>"
                    + "<MaterialGroup>" + $(this).find("td").eq(17).children(".matlGroup").val() + "</MaterialGroup>"
                    + "<PurchasingGroup>" + $(this).find("td").eq(19).children('.purchaseGroupClass').val() + "</PurchasingGroup>"
                    + "<StorageLocation>" + $(this).find("td").eq(20).children('.storageLocationClass').val() + "</StorageLocation>"
                    + "<RequisitionerID></RequisitionerID>"
                    + "<TrackingNumber></TrackingNumber>"
                    + "<QuantityUnit></QuantityUnit>"
                    + "<QuantityOrderedUnit></QuantityOrderedUnit>"
                    + "<OpenQuantity></OpenQuantity>"
                    + "<RequestDate></RequestDate>" + "<ReleaseDate></ReleaseDate>"
                    + "<PlDelivTime></PlDelivTime>"
                    + "<GRProcTime></GRProcTime>" + "<Closed></Closed>"
                    + "<FixedID></FixedID>"
                    + "<MaterialCode>" + $(this).find("td").eq(4).children('.materialCodeClass').val() + "</MaterialCode>"
                    + "<Description></Description>"
                    + "<Plant>" + $(this).find("td").eq(16).children(".plantClass").val() + "</Plant>"
                    + "<Unit></Unit>"
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
                    + "<FixedVendor></FixedVendor>" + "<InfoRecord>" + $(this).find("td").eq(22).text() + "</InfoRecord>"
                    + "<DesiredVendor></DesiredVendor>"
                    + "<PurchasingOrganization>" + $(this).find("td").eq(18).children('.purchaseOrgClass').val() + "</PurchasingOrganization>"
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
                    + "<RequsitionEmail>thirumalaikumar.m@newgen.co.in</RequsitionEmail>"
                    + "<LinkId></LinkId>"
                    + "<Distribution></Distribution>"
                    + "<PartialInvoiceIndicator></PartialInvoiceIndicator>"
                    + "<BP_assign_date></BP_assign_date>"
                    + "<BP_quantity_remaining></BP_quantity_remaining>"
                    + "<BP_rfq_status></BP_rfq_status>"
                    + "<BP_status></BP_status>"
                    + "<BP_buyerdetails_id></BP_buyerdetails_id>"
                    + "<BP_ItemCode></BP_ItemCode>"
                    + "<BP_PRCreator>" + $(this).find("td").eq(24).text() + "</BP_PRCreator>"
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
                    + "<UOMStore></UOMStore>" + "<PO_Requestor></PO_Requestor>"
                    + "<PO_RequestorEmail></PO_RequestorEmail>"
                    + "<PR_TrackingNumber></PR_TrackingNumber>"
                    + "<QuotationNumber></QuotationNumber>"
                    + "<HigherLevelItem></HigherLevelItem>"
                    + "<SubitemCategory></SubitemCategory>"
                    + "<Batch></Batch>"
                    + "<LinkId></LinkId>"
                    + "<PackageNo>" + PackageNo + "</PackageNo>"
                    + "<TaxCode>" + taxCode === undefined ? "" : taxCode + "</TaxCode>"
                    + "</POLineItemData>";

            POServiceRefData += "<POServiceRefData>"
                    + "<PackageNo>" + PackageNo + "</PackageNo>"
                    + "<SubPackageNo>" + (PackageNo + 1) + "</SubPackageNo>"
                    + "<LineNo>" + PackageNo + "</LineNo>"
                    + "</POServiceRefData>";

            $.ajax({type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data: {
                    "reqFrom": "findServicesByLinkId",
                    "linkid": linkid
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
//                alert("Service Len: " + obj.length);
                    for (var i = 0; i < obj.length; i++) {
                        console.log("ServiceNumber :" + obj[i].ServiceNumber);

                        POServiceData += "<POServiceData>"
                                + "<LineItemNumber>" + obj[i].LineItemNumber + "</LineItemNumber>"
                                + "<ServiceNumber>" + obj[i].ServiceNumber + "</ServiceNumber>"
                                + "<ShortText>" + obj[i].ShortText + "</ShortText>"
                                + "<Quantity>" + obj[i].Quantity + "</Quantity>"
                                + "<Unit>" + obj[i].Unit + "</Unit>"
                                + "<GrossPrice>" + obj[i].GrossPrice + "</GrossPrice>"
                                + "<Currency>" + obj[i].Currency + "</Currency>"
                                + "<NetPrice>" + obj[i].NetPrice + "</NetPrice>"
                                + "<Edition>" + obj[i].Edition + "</Edition>"
                                + "<LineItemLongText>" + obj[i].LongItemLongText + "</LineItemLongText>"
                                + "<OverfTolerance>" + obj[i].OverfTolarence + "</OverfTolerance>"
                                + "<CostCentre></CostCentre>"
                                + "<GLCode></GLCode>"
                                + "<CommitmentItem></CommitmentItem>"
                                + "<Fund></Fund>"
                                + "<FundCenter></FundCenter>"
                                + "<FunctionalArea></FunctionalArea>" + "<ServiceLongText></ServiceLongText>"
                                + "<LinkId></LinkId>"
                                + "<ServiceLinkID></ServiceLinkID>"
                                + "<PackageNo>" + (PackageNo + 1) + "</PackageNo>"
                                + "<LineNo>" + (PackageNo + 1) + "</LineNo>"
                                + "<DeleteFlag></DeleteFlag>"
                                + "</POServiceData>";

                        $.ajax({
                            type: "GET",
                            url: "ajaxcontroller.do",
                            async: false,
                            data: {
                                "reqFrom": "findServicesAccAssByLinkIdAndLineItemNumber",
                                "linkid": linkid,
                                "lineItemNumber": obj[i].LineItemNumber
                            },
                            complete: function(responseJson) {
                                var obj = $.parseJSON(responseJson.responseText);
                                //                            alert("Service Account Assignment Len: " + obj.length);
                                for (var i = 0; i < obj.length; i++) {
                                    console.log("ServiceNumber :" + obj[i].Distribution);

                                    POAccntAssignvalData += "<POAccntAssignvalData>"
                                            + "<Distribution>" + obj[i].Distribution + "</Distribution>"
                                            + "<Quantity>" + obj[i].Quantity + "</Quantity>" + "<Percentage>" + obj[i].Percentage + "</Percentage>"
                                            + "<ActivityNumber></ActivityNumber>" + "<LinkNumber></LinkNumber>"
                                            + "<LinkID></LinkID>"
                                            + "<NETVALUE></NETVALUE>" + "<CostCenter>" + obj[i].CostCenter + "</CostCenter>"
                                            + "<PRLinkID></PRLinkID>"
                                            + "<Acc_Order>" + obj[i].Acc_Order + "</Acc_Order>"
                                            + "<Acc_Asset>" + obj[i].Acc_Asset + "</Acc_Asset>"
                                            + "<Acc_WBSElement>" + obj[i].Acc_WBSElement + "</Acc_WBSElement>"
                                            + "<SalesOrder>" + obj[i].SalesOrder + "</SalesOrder>"
                                            + "<Network></Network>" + "<Activity></Activity>"
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
                                            + "<PackageNo>" + (PackageNo + 1) + "</PackageNo>"
                                            + "<LineNo>" + (PackageNo + 1) + "</LineNo>"
                                            + "<SerialNo>" + obj[i].LinkNumber + "</SerialNo>"
                                            + "<DeleteFlag></DeleteFlag>"
                                            + "</POAccntAssignvalData>";
                                }
                            }
                        });
                    }
                }
            });
            PackageNo = PackageNo + 2;
        });
        var POInvoiceData = "";
        $("#material_headerClass tbody tr").each(function() {
            var linkid = $(this).find("td").eq(0).children(".linkid").val();
//            alert("linkid in FindInvoiceByLinkid: " + linkid);

            $.ajax({
                type: "GET",
                url: "poajaxrequest.do",
                async: false,
                data: {
                    "reqFrom": "FindInvoiceByLinkid",
                    "linkid": linkid
                },
                complete: function(responseJson) {
                    var jsonInvoiceArr = $.parseJSON(responseJson.responseText);
                    jsonInvoiceArr = JSON.parse(JSON.stringify(jsonInvoiceArr));

                    for (var i = 0; i < jsonInvoiceArr.length; i++)
                    {
                        console.log("InvoiceItemNumber: " + jsonInvoiceArr[i].linkID);
                        POInvoiceData += "<POInvoiceData>"
                                + "<ItemNumber>" + (jsonInvoiceArr[i].linkID === undefined ? "" : jsonInvoiceArr[i].linkID.toString().split("-")[2]) + "</ItemNumber>"
                                + "<InvoiceReceipt>" + (jsonInvoiceArr[i].invoiceReceipt === undefined ? "" : jsonInvoiceArr[i].invoiceReceipt) + "</InvoiceReceipt>"
                                + "<FinalInvoice>" + (jsonInvoiceArr[i].finalInvoice === undefined ? "" : jsonInvoiceArr[i].finalInvoice) + "</FinalInvoice>"
                                + "<GRBasedIV>" + (jsonInvoiceArr[i].grBasedIV === undefined ? "" : jsonInvoiceArr[i].grBasedIV) + "</GRBasedIV>"
                                + "<DPCategory>" + (jsonInvoiceArr[i].dpCategory === undefined ? "" : jsonInvoiceArr[i].dpCategory) + "</DPCategory>"
                                + "<TaxCode>" + (jsonInvoiceArr[i].taxCode === undefined ? "" : jsonInvoiceArr[i].taxCode) + "</TaxCode>"
                                + "<LinkId>" + jsonInvoiceArr[i].linkID + "</LinkId>"
                                + "</POInvoiceData>";
                    }
                }
            });
            console.log("POInvoiceData: " + POInvoiceData);
        });
        var prType = $("#prType").val();
        //    console.log("PrType: " + prType);

        var POAccntAssignData = "";

        $("#material_headerClass tbody tr").each(function() {
            var linkid = $(this).find("td").eq(0).children(".linkid").val();
            console.log("linkid: " + linkid);

            $.ajax({
                type: "GET",
                url: "doajaxrequest.do",
                async: false,
                data: {
                    "reqFrom": "getAccountAssignmentByLinkId",
                    "linkid": linkid
                },
                complete: function(responseJson) {
                    var arr = $.parseJSON(responseJson.responseText);
                    console.log("AccAss Len: " + arr.length);
                    for (var i = 0; i < arr.length; i++) {
                        console.log("LINKNUMBER :" + arr[i].LINKNUMBER);

                        POAccntAssignData += "<POAccntAssignData>"
                                + "<SerialNo>" + (arr[i].LINKNUMBER === undefined ? '' : arr[i].LINKNUMBER) + "</SerialNo>"
                                + "<AccountAssignmentCategory>" + (arr[i].ACC_ASS_CAT === undefined ? '' : arr[i].ACC_ASS_CAT) + "</AccountAssignmentCategory>"
                                + "<Distribution>" + (arr[i].DISTRIBUTION === undefined ? '' : arr[i].DISTRIBUTION) + "</Distribution>"
                                + "<PartialInvoiceIndicator></PartialInvoiceIndicator>"
                                + "<CoCode>" + (arr[i].COCODE === undefined ? '' : arr[i].COCODE) + "</CoCode>"
                                + "<UnloadingPoint>" + (arr[i].UNLOADINGPOINT === undefined ? '' : arr[i].UNLOADINGPOINT) + "</UnloadingPoint>"
                                + "<Recipient>" + (arr[i].RECEPIENT === undefined ? '' : arr[i].RECEPIENT) + "</Recipient>" + "<GLAccount>" + (arr[i].GLACCOUNT === undefined ? '' : arr[i].GLACCOUNT) + "</GLAccount>"
                                + "<COArea>" + (arr[i].COAREA === undefined ? '' : arr[i].COAREA) + "</COArea>"
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
                                + "<FunctionalArea>" + (arr[i].FUNCTIONALAREA === undefined ? '' : arr[i].FUNCTIONALAREA) + "</FunctionalArea>"
                                + "<FundsCentre>" + (arr[i].FUNDSCENTER === undefined ? '' : arr[i].FUNDSCENTER) + "</FundsCentre>"
                                + "<CommitmentItem>" + (arr[i].COMMITMENTITEM === undefined ? '' : arr[i].COMMITMENTITEM) + "</CommitmentItem>"
                                + "<Network>" + (arr[i].LINKNUMBER === undefined ? '' : arr[i].LINKNUMBER) + "</Network>"
                                + "<ActivityNumber>" + (arr[i].ACTIVITYNUMBER === undefined ? '' : arr[i].ACTIVITYNUMBER) + "</ActivityNumber>"
                                + "<LinkID></LinkID>"
                                + "<PRLinkID></PRLinkID>"
                                + "</POAccntAssignData>";
                    }
                }
            });
        });

//    xmlString += POPartnersData;
        xmlString += POLineItemData;
        xmlString += POAccntAssignData;
        xmlString += POInvoiceData;
        //        xmlString += PODeliveryInvoiceData;
        //        xmlString += POCustomerData;
//        xmlString += POHeaderTextData;
        //        xmlString += POLineItemCustomerData;
        if (prType === "Service") {
            xmlString += POServiceRefData;
            xmlString += POServiceData;
            xmlString += POAccntAssignvalData;
            //            xmlString += POLimitsData;
        }

        xmlString += "</POCreation>";

        console.log("xmlString: " + xmlString);
        var dmsip = $("#dmsip").val();
        console.log("dmsip :" + dmsip);
        var serviceUrl = dmsip + "/PR2POWebservice/ng/service/POCreation";
        console.log("serviceUrl: " + serviceUrl);
        var sapUrl = dmsip + "/PR2POWebservice/ng/sapservice/POCreation";
        console.log("sapUrl :" + sapUrl);
        var xmlStringArr = xmlString.split("<PurchaseOrderNumber>");
        console.log("xmlStringArr[0]: " + xmlStringArr[0]);
        console.log("xmlStringArr[1]: " + xmlStringArr[1]);

        var URLParam = xmlStringArr[0] + "<PurchaseOrderNumber>" + "" + xmlStringArr[1];
//        var URLParam = xmlString;
        console.log("URLParam: " + URLParam);

//        getPOResponse("");                      //Localhost
//        getSAPResponse("");                     //Localhost     
//        $("#overlay").css("display", "none");  //Localhost

        $.ajax({
            type: "POST",
            url: sapUrl,
            contentType: "application/xml",
            dataType: "xml",
            data: xmlString,
            async: false,
            success: function(data, textStatus, jqXHR) {
                console.log("SAP Response: " + data);
                var PONumber = getSAPResponse(data);
                console.log("PONumber: " + PONumber);

                if (PONumber !== "")
                {
                    URLParam = xmlStringArr[0] + "<PurchaseOrderNumber>" + PONumber + xmlStringArr[1];
                    console.log("URLParam: " + URLParam);
//                    $("#overlay").css("display", "none");
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
function fetchStandAlonePaymentInDays(xmlre)
{
//    var xmlString = XMLToString(xmlre);             //Convert the XML Object to a String
//    var xmlDoc = $.parseXML(xmlString);                 //Parse the XML String to get data

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

//    var message = "MainCode: " + MainCode + "<br>Message: " + Message;

//    Lobibox.alert("info", {
//        msg: message
//    });
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
function getPOResponseFromLocal(xmlre)
{
    var xmlString = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"   //Localhost
            + "<Output>"
            + "<MainCode>0</MainCode>"
            + "<ProcessInstanceID>PC-0000000158-process</ProcessInstanceID>"
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
function handleSpecialCharacter(str)
{
    str = str.replace(/&/g, '&amp;');
    str = str.replace(/"/g, '&quot;');
    str = str.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
    str = str.replace("|", "%7C");
    return str;
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

    PoResponseJsonObject["PID"] = pid;
    PoResponseJsonObject["Message"] = msg;

    return PoResponseJsonObject;
}
function totalPoAmountFunction(quantity, netPrice, currency, taxCode, linkId, vendorCode, includeOrExcludeVendor)
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

    var ConditionAmountSum = 0;

    $.ajax({
        type: "GET",
        url: "standalonepoajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "FindSumOfConditionAmtByLinkIdInStandAlone",
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

    var prAndConditionAmount = (Number(quantity) * Number(netPrice)) + Number(ConditionAmountSum);
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

            TaxPer = getTaxResponseInStandalone(data);
            console.log("TaxPer: " + TaxPer);
        }
    });

    var totalPoAmt = (Number(quantity) * Number(netPrice)) + Number(TaxPer) + Number(ConditionAmountSum);
    console.log("totalPoAmt: " + totalPoAmt);
    return totalPoAmt;
}
function prTaxAmountFunction(quantity, netPrice, currency, taxCode)
{
    console.log("prTaxAmountFunction");
    var companyCode = $("#companycodeHeader").val();
    console.log("companyCode: " + companyCode);

    console.log("quantity: " + quantity);
    console.log("netPrice: " + netPrice);
    console.log("currency: " + currency);
    console.log("taxCode: " + taxCode);

    var WebServiceCallIp = $("#WebServiceCallIp").val();
    console.log("WebServiceCallIp: " + WebServiceCallIp);

    var prAmount = (Number(quantity) * Number(netPrice));
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
            TaxPer = getTaxResponseInStandalone(data);
            console.log("TaxPer: " + TaxPer);
        }
    });

    var prTaxAmt = Number(prAmount) + Number(TaxPer);
    console.log("prTaxAmt: " + prTaxAmt);
    return prTaxAmt;
}
function getTaxResponseInStandalone(xmlsap) {

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

function setOverDelivTolAndUnderDelvTolInDelvTab(requestFrom)
{
    var vendorNameCode = $("#vendorcodeHeader").val(); // $("#vendorcodeHeader :selected").text();
    console.log("%cInfoRecord requestFrom 1: " + requestFrom, "color: blue");
    var vendorCode = vendorNameCode.substring(vendorNameCode.lastIndexOf('-') + 1, vendorNameCode.length);
    var purchasingOrg = $("#purchasingOrg").val();
    var insertionid = $(".ItemNumberSelectClass").val();
    var materialCode = "";
    var itemCat = "";
    $("#material_headerClass tbody tr").each(function() {
        var id = $(this).find("td").eq(1).text();
        if (id === insertionid) {
            materialCode = $(this).find("td").eq(4).children(".materialCodeClass").val();
            itemCat = $(this).find("td").eq(3).children(".itemCategoryClass").val();
            return;
        }
    });
    console.log("vendorCode: " + vendorCode);
    console.log("materialCode: " + materialCode);
    console.log("purchasingOrg: " + purchasingOrg);
    console.log("itemCat: " + itemCat);

    if (itemCat !== "D" && materialCode !== "") {
        getOverDelivTolAndUnderDelvTolInDelvTab(vendorCode, materialCode, purchasingOrg, requestFrom);
    }
}

function getOverDelivTolAndUnderDelvTolInDelvTab(vendorCode, materialCode, purchaseOrg, requestFrom)
{
    var WebServiceCallIp = $("#WebServiceCallIp").val();
    console.log("WebServiceCallIp: " + WebServiceCallIp);

    var serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_getToleranceData?VENDOR=" + vendorCode + "&MATERIAL=" + materialCode + "&PURCH_ORG=" + purchaseOrg + "&POType=standalone";
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
                    setPoLineLevelDataFromInfoRecord(overDetlvTolAndUnserDelvTolResponseJsonObj, requestFrom);
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
            setPoLineLevelDataFromInfoRecord(overDetlvTolAndUnserDelvTolResponseJsonObj, requestFrom);
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
                + "<VAR_ORD_UN>Active</VAR_ORD_UN>"
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

function fetchInfoRecordDetails(materialCode)
{   
    console.log("In fetchInfoRecordDetails:");
    var vendorNameCode = $("#vendorcodeHeader").val(); // $("#vendorcodeHeader :selected").text();
    var vendorCode = vendorNameCode.substring(vendorNameCode.lastIndexOf('-') + 1, vendorNameCode.length);
    var purchasingOrg = $("#purchasingOrg").val();
    
    var WebServiceCallIp = $("#WebServiceCallIp").val();
    console.log("WebServiceCallIp: " + WebServiceCallIp);

    var serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_getToleranceData?VENDOR=" + vendorCode + "&MATERIAL=" + materialCode + "&PURCH_ORG=" + purchasingOrg + "&POType=standalone";
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