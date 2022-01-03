$(document).ready(function() {

    var PoFrom = $("#PoFrom").val();
    if (PoFrom === "shortcutPo")
    {
        $("#requestTypeDiv").css("display", "block");
        $("#referenceDocTypeDiv").css("display", "block");
        $("#poNumberDiv").css("display", "block");
        $("#prTypeDiv").css("display", "block");
        $("#referenceDocType").val("");
        $("#lineLevelTabsDiv").css("display", "none");

        var draftPo = $("#draftPo").val();
        console.log("draftPo: " + draftPo);
        if (draftPo !== "Yes")
        {
            var itemNumberSelect = "<option value=''>Select</option>";
            $("#ItemNumberSelect").append(itemNumberSelect);
        }

    }

    $("#requestType").change(function() {
        var referenceDocType = $("#referenceDocType").val();
        var prType = $("#prType").val();
        console.log("referenceDocType: " + referenceDocType);
        if ($(this).val() !== "")
        {
            $(".preCheckPoBtn").css("display", "block");
            $(".saveAndCloseBtn").css("display", "block");
            $("#referenceDocType").prop("disabled", false);
            if ($(this).val() === "Create Purchase Order")
            {
                if (referenceDocType !== "")
                {
                    $("#prType").prop("disabled", false);
                }
                if (referenceDocType === "Purchase Requisition" && prType !== "")
                {
                    $("#addNewPrLineBtn").prop("disabled", false);
                    $("#addRfqLineBtn").prop("disabled", true);
                }
                else if (referenceDocType === "RFQ" && prType !== "")
                {
                    $("#addRfqLineBtn").prop("disabled", false);
                    $("#addNewPrLineBtn").prop("disabled", true);
                }
            }
            else
            {
                $("#prType").val("");
                $("#prType").prop("disabled", true);

                $("#addRfqLineBtn").prop("disabled", false);
                $("#addNewPrLineBtn").prop("disabled", false);
            }

            if ($(this).val() === "Amend Purchase Order" || $(this).val() === "Delete Purchase Order")
            {
                $("#poNumber").prop("disabled", false);
            }
            else
            {
                $("#poNumber").val("");
                $("#poNumber").prop("disabled", true);
            }

            if ($(this).val() === "Create Purchase Order")
            {
                $(".createPoBtnClass").css("display", "block");
                $(".amendPoBtnClass").css("display", "none");
                $(".cancelPoBtnClass").css("display", "none");
            }
            else if ($(this).val() === "Amend Purchase Order")
            {
                $(".createPoBtnClass").css("display", "none");
                $(".amendPoBtnClass").css("display", "block");
                $(".cancelPoBtnClass").css("display", "none");
            }
            else if ($(this).val() === "Delete Purchase Order")
            {
                $(".createPoBtnClass").css("display", "none");
                $(".amendPoBtnClass").css("display", "none");
                $(".cancelPoBtnClass").css("display", "block");
                $(".cancelPoBtnClass").css("right", "45%");
            }
        }
        else
        {
            $("#referenceDocType").val("");
            $("#referenceDocType").prop("disabled", true);

            $("#prType").val("");
            $("#prType").prop("disabled", true);

            $("#poNumber").val("");
            $("#poNumber").prop("disabled", true);

            $("#addRfqLineBtn").prop("disabled", true);
            $("#addNewPrLineBtn").prop("disabled", true);

            $(".createPoBtnClass").css("display", "none");
            $(".amendPoBtnClass").css("display", "none");
            $(".cancelPoBtnClass").css("display", "none");
            $(".saveAndCloseBtn").css("display", "none");
            $(".preCheckPoBtn").css("display", "none");
        }
    });

    $("#referenceDocType").change(function() {
        var requestType = $("#requestType").val();
        var prType = $("#prType").val();
        console.log("requestType: " + requestType);
        console.log("prType: " + prType);
        if ($(this).val() !== "")
        {
            $("#prType").prop("disabled", false);

            if ($(this).val() === "Purchase Requisition" && requestType === "Create Purchase Order" && prType !== "")
            {
                $("#addNewPrLineBtn").prop("disabled", false);
                $("#addRfqLineBtn").prop("disabled", true);
            }
            else if ($(this).val() === "RFQ" && requestType === "Create Purchase Order" && prType !== "")
            {
                $("#addRfqLineBtn").prop("disabled", false);
                $("#addNewPrLineBtn").prop("disabled", true);
            }
        }
        else
        {
            $("#prType").val("");
            $("#prType").prop("disabled", true);
            $("#addNewPrLineBtn").prop("disabled", true);
            $("#addRfqLineBtn").prop("disabled", true);
        }
    });

    $("#prType").change(function() {
        var requestType = $("#requestType").val();
        var referenceDocType = $("#referenceDocType").val();
        if ($(this).val() !== "")
        {
            $("#PrType").val($(this).val());
            if (requestType === "Create Purchase Order" && referenceDocType === "Purchase Requisition")
            {
                $("#addNewPrLineBtn").prop("disabled", false);
                $("#addRfqLineBtn").prop("disabled", true);
                $("#addEmptyPoLineBtn").prop("disabled", false);
            }
            else if (requestType === "Create Purchase Order" && referenceDocType === "RFQ")
            {
                $("#addRfqLineBtn").prop("disabled", false);
                $("#addNewPrLineBtn").prop("disabled", true);
                $("#addEmptyPoLineBtn").prop("disabled", false);
            }
            hideDeliveryTabFieldsByPoType();
        }
        else
        {
            $("#addNewPrLineBtn").prop("disabled", true);
            $("#addRfqLineBtn").prop("disabled", true);
            $("#addEmptyPoLineBtn").prop("disabled", true);
        }
    });

    var currencyHeader;
    $("#companycodeHeader").change(function() {
        $("#overlay").css("display", "block");
        var companyCodeHeader = $(this).val();
        console.log("companyCodeHeader: " + companyCodeHeader);
        $("#companyCodeService").val(companyCodeHeader);
        $("#CoCode").val(companyCodeHeader);
        setTimeout(function() {
            if (companyCodeHeader === '0640' || companyCodeHeader === '0641') {
                $("#CurrencyDeliveryInvoice").val("SGD");
                currencyHeader = "SGD";
            } else if (companyCodeHeader === '0680') {
                $("#CurrencyDeliveryInvoice").val("MYR");
                currencyHeader = "MYR";
            }
//            $("#serviceTableId tbody tr").each(function() {
//                $(this).find("td").eq(7).children(".currency_Services").val(currencyHeader);
//            });
//            $("#material_headerClass tbody tr").each(function() {
//                $(this).find("td").eq(11).children(".currencyClass").val(currencyHeader);
//                $(this).find("td").eq(30).text(companyCodeHeader);
//            });
//            var conCurr1;
//            $("#conditionTableIdLineLevel tbody tr").each(function() {
//                conCurr1 = $(this).find("td").eq(4).children(".CurrencyLineLevel").val();
//                if (conCurr1 !== "%") {
//                    $(this).find("td").eq(4).children(".CurrencyLineLevel").val(currencyHeader);
//                }
//            });
            getVendorByCompanycode(companyCodeHeader);
            $("#overlay").css("display", "none");
        }, 1000);
    });
});