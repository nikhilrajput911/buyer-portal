/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var currentPrRow = '';
var serviceTableCurrentClick = "";
var gLAccountCurrent = "";
var costCenterCurrent = "";
var orderCurrent = "";
var assetCurrent = "";
var wbsElementCurrent = "";
var salesOrderCurrent = "";
var itemNumberCurrent = "";
var netActCurrent = "";
var delDateCateCurrent = "";
var serviceNumberCurrent = "";
var condTypeLineCurrent = "";
var materialCodeCurrent = "";
var plantComponentCurrent = "";
var materialCodedPrCurrent = "";
$(document).ready(function() {

    $("#clearAccAsgnModalBtn").click(function() {
        var itemCat = currentPrRow.find("td").eq(3).children(".itemCategoryClass").val();
        currentPrRow.find("td").eq(2).children(".accountAssignmentClass").val("");
        $("#accountAssignmentCategoryModal").modal("hide");
        if (itemCat === "L") {
            $("#component_li").css("display", "block");
        } else {
            $("#component_li").css("display", "none");

        }
    });
    $("#clearItemCategoryModalBtn").click(function() {
        currentPrRow.find("td").eq(3).children(".itemCategoryClass").val("");
        $("#itemCategoryModal").modal("hide");
    });

    $("#clearCurrencyModalBtn").click(function() {
        var reqFrom = $("#ro_Currency").val();
        if (reqFrom === "PRLineTable") {
            currentPrRow.find("td").eq(11).children(".currencyClass").val("");
        } else if (reqFrom === "DeliveryInvoice") {
            $("#CurrencyDeliveryInvoice").val("");
        } else if (reqFrom === "ServieTable") {
            serviceTableCurrentClick.parent().parent().find("td").eq(8).children(".currency_Services").val("");
        }
        $("#CurrencyMasterModal").modal("hide");
    });
    $("#clearConitionTypeModalBtn").click(function() {
        conitionClick.find("td").eq(1).children("input[name=ConditionTypeHeader]").val("");
        $("#ConditionTypeHeaderModal").modal("hide");
    });
    $("#clearGlAccountModalBtn").click(function() {
        var requestFrom = $("#ro_GLCOde").val();
        if (requestFrom === "FromInputField") {
            $("#gLAccount").val("");
        } else if (requestFrom === 'FromTable') {
            gLAccountCurrent.find("td").eq(3).children(".accAsgnGLAccount").val("");
        } else if (requestFrom === 'FromServiceTabInputField') {
            $("#gLAccountService").val("");
            $("#accountAssignmentModal").modal("show");
        } else if (requestFrom === "FromServiceTabAccAsgnTableInputField") {
            gLAccountCurrent.find("td").eq(3).children(".serviceAccAsgnTblGLAccount").val("");
            $("#changeAccountAssignmentScreenModal").modal("show");
        } else if (requestFrom === "FromLimitTabInputField") {
            $("#gLAccountInp_Limits").val("");
            $("#limitsAccAssignmentModal").modal("show");
        } else if (requestFrom === "FromLimitTabAccAsgnTableInputField") {
            gLAccountCurrent.find("td").eq(2).children(".limitAccAsgnTblGLAccount").val("");
            $("#limitsChangeAccAsgnScreenModal").modal("show");
        }
        $("#gLAccountModal").modal("hide");
    });
    $("#clearCostCenterModalBtn").click(function() {
        var requestFrom = $("#ro_costCenter").val();
        if (requestFrom === 'FromInputField') {
            $("#costCenterAccAsgn").val("");
        } else if (requestFrom === 'FromTable') {
            costCenterCurrent.find("td").eq(5).children(".accAsgnCostCetner").val("");
        } else if (requestFrom === 'FromServiceTabInputField') {
            $("#costCenterService").val("");
        } else if (requestFrom === 'FromLimitTabInputField') {
            $("#costCenterInp_Limits").val("");
            $("#limitsAccAssignmentModal").modal("show");
        } else if (requestFrom === "FromLimitTabAccAsgnTableInputField") {
            costCenterCurrent.find("td").eq(4).children(".limitAccAsgnTblCostCetner").val("");
            $("#limitsChangeAccAsgnScreenModal").modal("show");
        } else if (requestFrom === 'FromServiceTabAccAsgnTableInputField') {
            costCenterCurrent.find("td").eq(5).children(".serviceAccAsgnTblCostCetner").val("");
            $("#changeAccountAssignmentScreenModal").modal("show");
        }
        $('#costCenterModal').modal("hide");
    });
    $("#clearOrderModalBtn").click(function() {
        var requestFrom = $("#ro_Order").val();

        if (requestFrom === 'FromField') {
            $("#accAsgnOrder").val("");
        } else if (requestFrom === 'FromTable') {
            orderCurrent.find("td").eq(12).children(".accAsgnOrder").val("");
        } else if (requestFrom === 'FromServiceTabInputField') {
            $("#OrderService").val("");
            $("#accountAssignmentModal").modal("show");
        } else if (requestFrom === 'FromServiceTabAccAsgnTableInputField') {
            orderCurrent.find("td").eq(10).children(".serviceAccAsgnTblOrder").val("");
            $("#changeAccountAssignmentScreenModal").modal("show");
        } else if (requestFrom === "FromLimitTabInputField") {
            $("#orderInp_Limits").val("");
            $("#limitsAccAssignmentModal").modal("show");
        } else if (requestFrom === 'FromLimitTabAccAsgnTableInputField') {
            orderCurrent.find("td").eq(9).children(".limitAccAsgnTblOrder").val("");
            $("#limitsChangeAccAsgnScreenModal").modal("show");
        }
        $("#accAsgnOrderModal").modal("hide");
    });
    $("#clearAssetModalBtn").click(function() {
        var requestFrom = $("#ro_Asset").val();
        if (requestFrom === 'FromInputField') {
            $("#accAsgnAsset").val("");
        } else if (requestFrom === 'FromTable') {
            assetCurrent.find("td").eq(13).children(".accAsgnAssets").val("");
        } else if (requestFrom === "FromServiceTabInputField") {
            $("#AssetService").val("");
            $("#accountAssignmentModal").modal("show");
        } else if (requestFrom === 'FromServiceTabAccAsgnTableInputField') {
            assetCurrent.find("td").eq(11).children(".serviceAccAsgnTblAssets").val("");
            $("#changeAccountAssignmentScreenModal").modal("show");
        } else if (requestFrom === 'FromLimitTabInputField') {
            $("#assetInp_Limits").val("");
            $("#limitsAccAssignmentModal").modal('show');
        } else if (requestFrom === 'FromLimitTabAccAsgnTableInputField') {
            assetCurrent.find("td").eq(10).children(".limitAccAsgnTblAssets").val("");
            $("#limitsChangeAccAsgnScreenModal").modal("show");
        }

        $("#accAsgnAssetModal").modal("hide");
    });
    $("#clearWbsElementModalBtn").click(function() {
        var requestFrom = $("#ro_WBSElement").val();
        if (requestFrom === 'FromInputField') {
            $("#accAsgnWBSElementInput").val("");
        } else if (requestFrom === 'FromTable') {
            wbsElementCurrent.find("td").eq(14).children(".accAsgnWBSElement").val("");
        } else if (requestFrom === 'FromServiceTabInputField') {
            $("#WBSElementInputService").val("");
            $("#accountAssignmentModal").modal("show");
        } else if (requestFrom === "FromServiceTabAccAsgnTableInputField") {
            wbsElementCurrent.find("td").eq(12).children(".serviceAccAsgnTblWBSElement").val("");
            $("#changeAccountAssignmentScreenModal").modal("show");
        } else if (requestFrom === "FromLimitTabInputField") {
            $("#wBSElementInp_Limits").val("");
            $("#limitsAccAssignmentModal").modal('show');
        } else if (requestFrom === "FromLimitTabAccAsgnTableInputField") {
            wbsElementCurrent.find("td").eq(11).children(".limitAccAsgnTblWBSElement").val("");
            $("#limitsChangeAccAsgnScreenModal").modal("show");
        } else if (requestFrom === "ProfitabilitySegment") {
            $("#WBSElement").val("");
//            $("#limitsChangeAccAsgnScreenModal").modal("show");
        }
        $("#WBSElementModal").modal("hide");
    });
    $("#clearSalesOrderModalBtn").click(function() {
        var reqFrom = $("#ro_SalesOrder").val();
        if (reqFrom === "ProfitabilitySegment") {
            $("#salesOrderProfitabilitySegment").val("");
        } else if (reqFrom === "AccountAssignmentTabField") {
            $("#accAsgnSalesOrder").val("");
        } else if (reqFrom === "AccountAssignmentTable") {
            salesOrderCurrent.val("");
        } else if (reqFrom === "ServiceAccountAssignmentTabField") {
            $("#SalesOrderService").val("");
        } else if (reqFrom === 'ServiceAccountAssignmentTable') {
            salesOrderCurrent.val("");
        } else if (reqFrom === "LimitAccountAssignmentTabField") {
            $("#salesOrderInp_Limits").val("");
        } else if (reqFrom === 'LimitAccountAssignmentTable') {
            salesOrderCurrent.val("");
        }
        $("#SalesOrderModal").modal("hide");
    });
    $("#clearItemNumberModalBtn").click(function() {
        var reqFrom = $("#ro_ItemNumber").val();
        if (reqFrom === "ProfitabilitySegment") {
            $("#itemNumberProfitabilitySegment").val("");
        } else if (reqFrom === "AccountAssignmentTabField") {
            $("#assAsgnItemNumber").val("");
        } else if (reqFrom === "AccountAssignmentTable") {
            itemNumberCurrent.val("");
        } else if (reqFrom === 'ServiceAccountAssignmentTabField') {
            $("#ItemNumberService").val("");
        } else if (reqFrom === "ServiceAccountAssignmentTable") {
            itemNumberCurrent.val("");
        } else if (reqFrom === "LimitAccountAssignmentTabField") {
            $("#itemNumberInp_Limits").val("");
        } else if (reqFrom === "LimitAccountAssignmentTable") {
            itemNumberCurrent.val("");
        }
        $("#ItemNumberModal").modal("hide");
    });
    $("#clearNetActModalBtn").click(function() {
        var requestFrom = $("#ro_NetworkNumber").val();
        if (requestFrom === 'FromInputField') {
            $("#accAsgnNActNumInput").val("");
        } else if (requestFrom === 'FromTable') {
            netActCurrent.find("td").eq(16).children(".accAsgnNetActNumber").val("");
        } else if (requestFrom === "FromServiceTabInputField") {
            $("#NActNumServiceInput").val("");
            $('#accountAssignmentModal').modal("show");
        } else if (requestFrom === 'FromServiceTabAccAsgnTableInputField') {
            netActCurrent.find("td").eq(14).children(".serviceAccAsgnTblNetActNumber").val("");
            $("#changeAccountAssignmentScreenModal").modal("show");
        } else if (requestFrom === "FromLimitTabInputField") {
            $("#nActNumServiceInp_Limits").val("");
            $('#limitsAccAssignmentModal').modal("show");
        } else if (requestFrom === "FromLimitTabAccAsgnTableInputField") {
            netActCurrent.find("td").eq(13).children(".limitAccAsgnTblNetActNumber").val("");
            $("#limitsChangeAccAsgnScreenModal").modal("show");
        }
        $("#networkActivityNumberModal").modal("hide");
    });
    $("#clearCustomerCodeModalBtn").click(function() {
        var reqType = $("#customerSeeded").val();
        if (reqType === "CustomerCode") {
            $("#CustomerCode").val("");
        } else if (reqType === "ProjectNumber1") {
            $("#ProjectNumber1").val("");
        } else if (reqType === "ShipToParty") {
            $("#ShipToParty").val("");
        }
        $("#CustomerCodeModal").modal("hide");
    });
    $("#clearBillingTypeModalBtn").click(function() {
        $("#BillingType").val("");
        $("#BillingTypeModal").modal("hide");
    });
    $("#clearBusinessAreaModalBtn").click(function() {
        $('#BusinessArea').val("");
        $("#BusinessAreaModal").modal("hide");
    });
    $("#clearSalesOrgModalBtn").click(function() {
        $("#SalesOrganization").val("");
        $("#SalesOrgModal").modal("hide");
    });
    $("#clearDistrChnlModalBtn").click(function() {
        $("#DistrChannel").val("");
        $("#DistrChannelModal").modal("hide");
    });
    $("#clearProfitCenterModalBtn").click(function() {
        $("#ProfitCentre").val("");
        $("#ProfitCenterModal").modal("hide");
    });
    $("#clearPartnerPcModalBtn").click(function() {
        $("#PartnerPC").val("");
        $("#PartnerPCModal").modal("hide");
    });
    $("#clearCountryModalBtn").click(function() {
        $("#countryProfitabilitySegment").val("");
        $("#CountryModal").modal("hide");
    });
    $("#clearSalesOfcBtn").click(function() {
        $("#SalesOffice").val("");
        $("#SalesOfficeModal").modal("hide");
    });
    $("#clearMatlGrpModalBtn").click(function() {
        var reqFrom = $("#materialGroupReqFrom").val();
        if (reqFrom === "FromField") {
            $("#MatlGroup").val("");
        } else if (reqFrom === "FromPRTable") {
            currentPrRow.find("td").eq(17).children(".matlGroup").val("");
        }
        $("#MatlGroupModal").modal("hide");
    });
    $("#clearProdHierModalBtn").click(function() {
        $("#Prodhierarchy").val("");
        $("#ProdHierarchyModal").modal("hide");
    });
    $("#clearHigherLvlItmModalBtn").click(function() {
        $("#HigherLevItem").val("");
        $("#HigherLevItemModal").modal("hide");
    });
    $("#clearIndsTryCodeModalBtn").click(function() {
        $("#Industry").val("");
        $("#IndCodeModal").modal("hide");
    });
    $("#clearCustomerGrpModalBtn").click(function() {
        $("#CustomerGroup").val("");
        $("#CustomerGroupModal").modal("hide");
    });
    $("#clearProdHierLvl1ModalBtn").click(function() {
        $("#ProductHierLevel1").val("");
        $("#ProdHierLev1Modal").modal("hide");
    });
    $("#clearProdHierLvl2ModalBtn").click(function() {
        $("#ProductHierLevel2").val("");
        $("#ProdHierLev2Modal").modal("hide");
    });
    $("#clearProdHierLvl3ModalBtn").click(function() {
        $("#ProductHierLevel3").val("");
        $("#ProdHierLev3Modal").modal("hide");
    });
    $("#clearMaterialTypeModalBtn").click(function() {
        $("#MaterialType").val("");
        $("#MaterialTypeModal").modal("hide");
    });
    $("#clearreferenceDocModalBtn").click(function() {
        $("#ReferenceDoc").val("");
        $("#ReferenceDocModal").modal("hide");
    });
    $("#clearProjectIndModalBtn").click(function() {
        $("#ProjectIndicator").val("");
        $("#ProjectIndModal").modal("hide");
    });
    $("#clearValuationTypeModalBtn").click(function() {
        $("#valuationTypeProfitabilitySegment").val("");
        $("#ValuationTypeModal").modal("hide");
    });
    $("#clearCustomerClassModalBtn").click(function() {
        $("#CustomerClass").val("");
        $("#CustomerClassModal").modal("hide");
    });
    $("#clearMatlSourceIndModalBtn").click(function() {
        $("#MaterialSourceInd").val("");
        $("#MaterialSourceIndModal").modal("hide");
    });
    $("#clearContractTypeModalBtn").click(function() {
        $("#ContractType").val("");
        $("#ContractTypeModal").modal("hide");
    });
    $("#clearIndCodeModalBtn").click(function() {
        $("#IndustryCode1").val("");
        $("#IndustryCode1Modal").modal("hide");
    });
    $("#clearIndField001ModalBtn").click(function() {
        $("#IndustryField001").val("");
        $("#IndField001Modal").modal("hide");
    });
    $("#clearIndCode2ModalBtn").click(function() {
        $("#IndustryCode2").val("");
        $("#IndustryCode2Modal").modal("hide");
    });
    $("#clearIndCode3ModalBtn").click(function() {
        $("#IndustryCode3").val("");
        $("#IndustryCode3Modal").modal("hide");
    });
    $("#clearSalesDocTypeModalBtn").click(function() {
        $("#SalesDocType").val("");
        $("#SalesDocTypeModal").modal("hide");
    });
    $("#clearRefItemModalBtn").click(function() {
        $("#ReferenceItem").val("");
        $("#ReferenceItemModal").modal("hide");
    });
    $("#clearDelDateCatModalBtn").click(function() {
        var reqFrom = $("#reqFromDelDateCat").val();
        if (reqFrom === "FromDelSchTable") {
            delDateCateCurrent.val("");
        } else if (reqFrom === "FromPR") {
            delDateCateCurrent.val("");
        }
        $("#DeliverySchedule-DelDateCategoryField-Picklist-Model").modal("hide");
    });

    $("#clearIncoTermsModalBtn").click(function() {
        var reqFrom = $("#incotermsReqFrom").val();
        if (reqFrom === "IncoTermsPart1") {
            $("#IncoTermsPart1").val("");
        } else if (reqFrom === "IncoTermsPart2") {
            $("#IncoTermsPart2").val("");
        } else if (reqFrom === "IncoTermsPart1_LineLevel") {
            $("#IncoTermsPart1_LineLevel").val("");
        } else if (reqFrom === "IncoTermsPart2_LineLevel") {
            $("#incoTermsPart2Delivery").val("");
        }
        $("#incoTermsModal").modal("hide");
//        $("#IncoTermsPart1").val("");
    });
    $("#clearServiceNumnerModalBtn").click(function() {
        serviceNumberCurrent.find("td").eq(3).children(".ServicesNumber_Services ").val("");
        $("#ServiceNumberModal").modal("hide");
    });
    $("#clearTaxCodeModalBtn").click(function() {
        $("#TaxCode").val("");
        $("#TaxCodeModal").modal("hide");
    });
    $("#clearConditionTypeModalBtn").click(function() {
        condTypeLineCurrent.val("");
        condTypeLineCurrent.parent().parent().find("td").eq(2).children('.NameConditionsLineLevel').val("");
        $("#ConditionTypeModal").modal("hide");
    });
    $("#clearMaterialCodeModalBtn").click(function() {
        materialCodeCurrent.find("td").eq(0).children(".comMaterial").val("");
        materialCodeCurrent.find("td").eq(1).children(".comDescription").val("");
        materialCodeCurrent.find("td").eq(5).children(".comProdStorageLoc").val("");
        $("#MaterialCodeModal").modal("hide");
    });
    $("#clearPlantModalBtn").click(function() {
        plantComponentCurrent.find("td").eq(2).children(".comPlant").val("");
        $("#PlantModal").modal("hide");
    });
    $("#clearMatPrModalBtn").click(function() {
        materialCodedPrCurrent.find("td").eq(4).children(".materialCodeClass").val("");
        materialCodedPrCurrent.find("td").eq(6).children(".prShortText").val("");
        materialCodedPrCurrent.find("td").eq(7).text("");
        materialCodedPrCurrent.find("td").eq(31).text("");
        materialCodedPrCurrent.find("td").eq(20).children(".storageLocationClass").val("");
        materialCodedPrCurrent.find("td").eq(17).children(".matlGroup").val("");
        materialCodedPrCurrent.find("td").eq(16).children(".plantClass").val("");
        materialCodedPrCurrent.find("td").eq(20).children(".storageLocationClass").val("");
        $("#materialMasterModal").modal("hide");
    });
    $("#clearDepartmentModalBtn").click(function() {
        currentPrRow.find("td").eq(25).children(".prDeptNameClass").val("");
        $("#DepartmentMasterModal").modal("hide");
    });
    $("#clearTrackNumberModalBtn").click(function() {
        currentPrRow.find("td").eq(29).children(".trackingNumber").val("");
        $("#trackingNumnerModal").modal("hide");
    });
    $("#clearPlantPrModalBtn").click(function() {
        currentPrRow.find("td").eq(16).children(".plantClass").val("");
        $("#plantMasterModal").modal("hide");
    });
    $("#clearStLocModalBtn").click(function() {
        currentPrRow.find("td").eq(20).children(".storageLocationClass").val("");
        $("#StorageLocationMasterModal").modal("hide");
    });
});
