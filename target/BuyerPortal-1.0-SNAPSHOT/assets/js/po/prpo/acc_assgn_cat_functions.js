/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function service_AccAsgnCat_A(reqFrom) {
    console.log("reqFrom :" + reqFrom);
    hideServiceAccAsgnField(reqFrom);
    showFieldBasedAssAsgnCat_A();
}
function service_AccAsgnCat_C(reqFrom) {
    console.log("reqFrom :" + reqFrom);
    hideServiceAccAsgnField(reqFrom);
    showFieldBasedAssAsgnCat_C();
}
function service_AccAsgnCat_F(reqFrom) {
    console.log("reqFrom :" + reqFrom);
    hideServiceAccAsgnField(reqFrom);
    showFieldBasedAssAsgnCat_F();
}
function service_AccAsgnCat_K(reqFrom) {
    console.log("reqFrom :" + reqFrom);
    hideServiceAccAsgnField(reqFrom);
    showFieldBasedAssAsgnCat_K();
}
function service_AccAsgnCat_N(reqFrom) {
    console.log("reqFrom :" + reqFrom);
    hideServiceAccAsgnField(reqFrom);
    showFieldBasedAssAsgnCat_N();
}
function service_AccAsgnCat_P(reqFrom) {
    console.log("reqFrom :" + reqFrom);
    hideServiceAccAsgnField(reqFrom);
    showFieldBasedAssAsgnCat_P();
}
function service_AccAsgnCat_R(reqFrom) {
    console.log("reqFrom :" + reqFrom);
    hideServiceAccAsgnField(reqFrom);
    showFieldBasedAssAsgnCat_R();
}
function service_AccAsgnCat_X(reqFrom) {
    console.log("reqFrom :" + reqFrom);
    hideServiceAccAsgnField(reqFrom);
    showFieldBasedAssAsgnCat_X();
}
function service_AccAsgnCat_Z(reqFrom) {
    console.log("reqFrom :" + reqFrom);
    hideServiceAccAsgnField(reqFrom);
    showFieldBasedAssAsgnCat_Z();
}


function limits_AccAsgnCat_A(reqFrom) {
    hidelimitsAccAsgnModelField(reqFrom);
    showLimitTabModelFieldAccAsgn_A();
}

function limits_AccAsgnCat_C(reqFrom) {
    hidelimitsAccAsgnModelField(reqFrom);
    showLimitTabModelFieldAccAsgn_C();
}
function limits_AccAsgnCat_F(reqFrom) {
    hidelimitsAccAsgnModelField(reqFrom);
    showLimitTabModelFieldAccAsgn_F();
}
function limits_AccAsgnCat_K(reqFrom) {
    hidelimitsAccAsgnModelField(reqFrom);
    showLimitTabModelFieldAccAsgn_K();
}
function limits_AccAsgnCat_N(reqFrom) {
    hidelimitsAccAsgnModelField(reqFrom);
    showLimitTabModelFieldAccAsgn_N();
}
function limits_AccAsgnCat_P(reqFrom) {
    hidelimitsAccAsgnModelField(reqFrom);
    showLimitTabModelFieldAccAsgn_P();
}
function limits_AccAsgnCat_R(reqFrom) {
    hidelimitsAccAsgnModelField(reqFrom);
    showLimitTabModelFieldAccAsgn_R();
}
function limits_AccAsgnCat_X(reqFrom) {
    hidelimitsAccAsgnModelField(reqFrom);
    showLimitTabModelFieldAccAsgn_X();
}
function limits_AccAsgnCat_Z(reqFrom) {
    hidelimitsAccAsgnModelField(reqFrom);
    showLimitTabModelFieldAccAsgn_Z();
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
//        $("#quantities").addClass("active");
//        $("#quantities-tab").addClass("active");
//        $("#quantities-tab").addClass("show");
        $("#material").addClass("active");
        $("#material-tab").addClass("active");
        $("#material-tab").addClass("show");
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
    if (reqFrom === "onLoad" || reqFrom === "lineItemTrChange" || reqFrom === "AccAsgnModel" || reqFrom === "itemCatDropDown") {

        var tdrow = "<tr><td>" + "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblQuantity" style="width: 150px;" value="">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblPercentage" value="" style="width: 100px;">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblGLAccount" value="" style="width: 100px;">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCOArea" value="" style="width: 100px;">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCostCetner" value="" style="width: 100px;">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFund" value="" style="width: 100px;">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFunctionalArea" value="" style="width: 100px;">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFundCenter" value="" style="width: 100px;">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCommitmentItem" value="" style="width: 100px;">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblOrder" value="" style="width: 100px;">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblAssets" value="" style="width: 100px;">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblWBSElement" value="" style="width: 100px;">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblSalesOrder" value="" style="width: 100px;">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblNetActNumber" value="" style="width: 100px;">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblItemNumber" value="" style="width: 100px;">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblDeliverySchedule" value="" style="width: 100px;">' +
                "</td></tr>";
        $("#serviceTabAccAsgnTebleId").children("tbody").append(tdrow);
    } else if (reqFrom === "serviceTableCheckBox") {
        var linkid;
        var serviceLinkid = serviceTabTableCurrentTd.parent().children(".ServiceLinkId").val();
        $("#material_headerClass tbody tr").each(function() {
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var insertionid = $("#ItemNumberSelect").val();
            if (insertionid === id) {
                linkid = $(this).find("td").eq(0).children('.linkId_Class').val();
            }
        });
        var serviceLineItemNumber = serviceTabTableCurrentTd.parent().parent().find("td").eq(2).children(".lineItemNumberServices").val();
        var lineItemNumber = $("#ItemNumberSelect").val();
        getServiceAccountAssignmentByServiceLineItemNumberAndLineItemNumber(serviceLineItemNumber, lineItemNumber, serviceLinkid);
    }
}
function getServiceAccountAssignmentByServiceLineItemNumberAndLineItemNumber(serviceLineItemNumber, lineItemNumber, serviceLinkid) {
    console.log("Inside getServiceAccountAssignmentByServiceLineItemNumberAndLineItemNumber");
    var PoFrom = $("#PoFrom").val();
    $.ajax({
        type: "GET",
        url: "ajaxcontroller.do",
        async: false,
        data: {
            "reqFrom": "getServiceAccountAssignmentByServiceLineItemNumberAndLineItemNumber",
            "serviceLineItemNumber": serviceLineItemNumber,
            "lineItemNumber": lineItemNumber,
            "serviceLinkid": serviceLinkid
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            console.log("NoOfAccAss: " + obj.length);
            var tdrow;
            var distribution = "";
            $("#serviceTabAccAsgnTebleId tbody tr").remove();

            if (obj.length !== 0) {
                for (var i = 0; i < obj.length; i++) {
                    console.log("NETVALUE:" + obj[i].NETVALUE);
                    if (obj[i].DISTRIBUTION === '') {
                        console.log("Distribution Single:" + obj[i].DISTRIBUTION);
                        $("#gLAccountService").val(obj[i].GLACCOUNT);
                        $("#coAreaService").val(obj[i].COAREA);
                        $("#costCenterService").val(obj[i].COSTCENTER);
                        $("#OrderService").val(obj[i].ORDER);
                        $("#AssetService").val(obj[i].ASSET);
                        $("#WBSElementInputService").val(obj[i].WBSELEMENT);
                        $("#SalesOrderService").val(obj[i].SALESORDER);
                        $("#ItemNumberService").val(obj[i].ITEMNUMBER);
                        $("#DelivSchService").val(obj[i].DELIVERYSCHEDULE);
                        $("#fundService").val(obj[i].FUND);
                        $("#functionalAreaService").val(obj[i].FUNCTIONALAREA);
                        $("#FundCenterServiceInput").val(obj[i].FUNDCENTER);
                        $("#CommItemServiceInput").val(obj[i].COMMITMENTITEM);
                        $("#NActNumServiceInput").val(obj[i].NETWORK);
                        $("#ServiceLinkNumberId").val(obj[i].LINKNUMBER);
                        $("#ServiceNetValueId").val(obj[i].NETVALUE);
                        $("#LineNoSerAccId").val(obj[i].LineNoSerAcc);
                        $("#accountAssignmentchangeScreenbtn").attr("disabled", true);
                        if (PoFrom === "editpo" || PoFrom === "editApprovedPo") {
                            $("#serviceAccountAssignmentDistribution").val(obj[i].DISTRIBUTION);
                            $('#accountAssignmentchangeScreenbtn').css("display", "");
                            ServiceAccountAssignmentArrayIsEmpty();
                        } else {
                            $('#accountAssignmentchangeScreenbtn').css("display", "none");
                        }
                        $('#serviceInpAccAsgnmentSubmitBtn').prop("disabled", false);
                    } else if (obj[i].DISTRIBUTION === '1' || obj[i].DISTRIBUTION === '2') {
                        console.log("Distribution Quant OR Per:" + obj[i].DISTRIBUTION);
                        $("#serviceAccountAssignmentDistribution").val(obj[i].DISTRIBUTION);
                        $('#accountAssignmentchangeScreenbtn').css("display", "");
                        tdrow = "<tr><td><input type='hidden' class='LineNoSerAcc' value='" + (obj[i].LineNoSerAcc === undefined ? '' : obj[i].LineNoSerAcc) + "'><input type=checkbox class=deleteServiceLine style='display:none;'><input type=hidden class=serAccAsgnIdent value='" + (i + 1) + "'>" +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblQuantity" style="width: 150px;" value=' + formatNumberByComma(obj[i].QUANTITY) + ' max=' + obj[i].QUANTITY + '>' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblPercentage" style="width: 100px;" disabled value=' + obj[i].PERCENTAGE + ' max=' + obj[i].PERCENTAGE + '>' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblGLAccount" style="width: 100px;" value=' + (obj[i].GLACCOUNT === undefined ? '' : obj[i].GLACCOUNT) + '>' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCOArea" style="width: 100px;" value=' + (obj[i].COAREA === undefined ? '' : obj[i].COAREA) + '>' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCostCetner" style="width: 100px;" value=' + (obj[i].COSTCENTER === undefined ? '' : obj[i].COSTCENTER) + '>' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFund" style="width: 100px;" value=' + (obj[i].FUND === undefined ? '' : obj[i].FUND) + '>' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFunctionalArea" style="width: 100px;" value=' + (obj[i].FUNCTIONALAREA === undefined ? '' : obj[i].FUNCTIONALAREA) + '>' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFundCenter" style="width: 100px;" value=' + (obj[i].FUNDCENTER === undefined ? '' : obj[i].FUNDCENTER) + '>' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCommitmentItem" style="width: 100px;" value=' + (obj[i].COMMITMENTITEM === undefined ? '' : obj[i].COMMITMENTITEM) + '>' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblOrder" style="width: 100px;" value=' + (obj[i].ORDER === undefined ? '' : obj[i].ORDER) + '>' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblAssets" style="width: 100px;" value=' + (obj[i].ASSET === undefined ? '' : obj[i].ASSET) + '>' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblWBSElement" style="width: 100px;" value=' + (obj[i].WBSELEMENT === undefined ? '' : obj[i].WBSELEMENT) + '>' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblSalesOrder" style="width: 100px;" value=' + (obj[i].SALESORDER === undefined ? '' : obj[i].SALESORDER) + '>' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblNetActNumber" style="width: 100px;" value=' + (obj[i].NETWORK === undefined ? '' : obj[i].NETWORK) + '>' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblItemNumber" style="width: 100px;" value=' + (obj[i].ITEMNUMBER === undefined ? '' : obj[i].ITEMNUMBER) + '>' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblDeliverySchedule" style="width: 100px;" value=' + (obj[i].DELIVERYSCHEDULE === undefined ? '' : obj[i].DELIVERYSCHEDULE) + '>\n\
                                <input type="hidden" class="form-control form-rounded input-height netValue" value=' + (obj[i].NETVALUE === undefined ? '' : obj[i].NETVALUE) + '>\n\
                                <input type="hidden" class="form-control form-rounded input-height linkNumber" value=' + (obj[i].LINKNUMBER === undefined ? '' : obj[i].LINKNUMBER) + '>' +
                                "</td></tr>";
                        $("#serviceInpAccAsgnmentSubmitBtn").attr("disabled", true);
                        $("#serviceTabAccAsgnTebleId tbody").append(tdrow);
                        if (PoFrom === "editpo" || PoFrom === "editApprovedPo") {
                            if (obj[i].DISTRIBUTION === '1') {
                                $("#distOnQuantBases").prop("checked", true);
                                $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                                    $(this).find("td").eq(1).children(".serviceAccAsgnTblQuantity").prop("disabled", false);
                                    $(this).find("td").eq(2).children(".serviceAccAsgnTblPercentage").prop("disabled", true);
                                });
                            } else if (obj[i].DISTRIBUTION === '2') {
                                $("#distByPercentage").prop("checked", true);
                                $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
                                    $(this).find("td").eq(1).children(".serviceAccAsgnTblQuantity").prop("disabled", true);
                                    $(this).find("td").eq(2).children(".serviceAccAsgnTblPercentage").prop("disabled", false);
                                });
                            }
                        }
                    }
                }
            } else {
                $("#serviceInpAccAsgnmentSubmitBtn").prop("disabled", false);
                ServiceAccountAssignmentArrayIsEmpty();
                $("#LineNoSerAccId").val("");
            }
        }
    });
    var PoFrom = $("#PoFrom").val();
    if (PoFrom === "editpo" || PoFrom === "editApprovedPo") {
        $("#serviceTabAccAsgnTebleId tbody tr").each(function() {
            $(this).find("td").eq(0).children(".deleteServiceLine").css("display", "");
        });
    }

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

function showLimitTabModelFieldAccAsgn_A() {
    $("#wBSElementInp_Limits").prop("disabled", true);
    $("#gLAccountInp_Limits").prop("disabled", true);
    $("#gLAccountLabel_Limits").css({"margin-left": "10px"});
    $("#gLAccountInp_Limits").css({"margin-left": "10px"});
    $("#coAreaLabel_Limits").css({"margin-left": "10px"});
    $("#coAreaInp_Limits").css({"margin-left": "10px"});
    $("#companyCodeLabel_Limits").css({"margin-left": "10px"});
    $("#companyCodeInp_Limits").css({"margin-left": "30px"});
    $("#orderLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#orderInp_Limits").css({"display": "inline", "margin-left": "45px"});
    $("#assetLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#assetInp_Limits").css({"display": "inline", "margin-left": "30px"});
    $("#wBSElementLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#wBSElementInp_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#limitTabAccAsgnTebleId tbody tr").each(function() {
        $(this).find("td").eq(4).css("display", "none");
        $(this).find("td").eq(5).css("display", "none");
        $(this).find("td").eq(6).css("display", "none");
        $(this).find("td").eq(7).css("display", "none");
        $(this).find("td").eq(8).css("display", "none");
        $(this).find("td").eq(12).css("display", "none");
        $(this).find("td").eq(13).css("display", "none");
        $(this).find("td").eq(14).css("display", "none");
        $(this).find("td").eq(15).css("display", "none");
        $(this).find("td").eq(2).children(".limitAccAsgnTblGLAccount").prop("disabled", "true");
        $(this).find("td").eq(3).children(".limitAccAsgnTblCOArea").prop("disabled", "true");
        $(this).find("td").eq(11).children(".limitAccAsgnTblWBSElement").prop("disabled", "true");
    });
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(4).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(5).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(6).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(7).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(8).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(12).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(13).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(14).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(15).css("display", "none");
}
function showLimitTabModelFieldAccAsgn_C() {
    $("#gLAccountLabel_Limits").css({"margin-left": "10px"});
    $("#gLAccountInp_Limits").css({"margin-left": "10px"});
    $("#coAreaLabel_Limits").css({"margin-left": "10px"});
    $("#coAreaInp_Limits").css({"margin-left": "35px"});
    $("#companyCodeLabel_Limits").css({"margin-left": "10px"});
    $("#companyCodeInp_Limits").css({"margin-left": "10px"});
    $("#salesOrderLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#salesOrderInp_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#itemNumLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#itemNumberInp_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#delivSchLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#delivSchInp_Limits").css({"display": "inline", "margin-left": "30px"});
    $("#limitTabAccAsgnTebleId tbody tr").each(function() {
        $(this).find("td").eq(4).css("display", "none");
        $(this).find("td").eq(5).css("display", "none");
        $(this).find("td").eq(6).css("display", "none");
        $(this).find("td").eq(7).css("display", "none");
        $(this).find("td").eq(8).css("display", "none");
        $(this).find("td").eq(9).css("display", "none");
        $(this).find("td").eq(10).css("display", "none");
        $(this).find("td").eq(11).css("display", "none");
        $(this).find("td").eq(13).css("display", "none");
        $(this).find("td").eq(3).children(".limitAccAsgnTblCOArea").prop("disabled", "true");
    });
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(4).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(5).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(6).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(7).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(8).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(9).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(10).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(11).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(13).css("display", "none");
}
function showLimitTabModelFieldAccAsgn_F() {
    $("#gLAccountLabel_Limits").css({"margin-left": "10px"});
    $("#gLAccountInp_Limits").css({"margin-left": "30px"});
    $("#coAreaLabel_Limits").css({"margin-left": "10px"});
    $("#coAreaInp_Limits").css({"margin-left": "10px"});
    $("#companyCodeLabel_Limits").css({"margin-left": "10px"});
    $("#companyCodeInp_Limits").css({"margin-left": "10px"});
    $("#costCenterLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#costCenterInp_Limits").css({"display": "inline", "margin-left": "30px"});
    $("#orderLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#orderInp_Limits").css({"display": "inline", "margin-left": "25px"});
    $("#fundLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#fundInp_Limits").css({"display": "inline", "margin-left": "45px"});
    $("#functionalAreaLabel_Limits").css({"display": "inline", "margin-left": "10px", "margin-top": "15px"});
    $("#functionalAreaInp_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#fundCenterLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#fundCenterInp_Limits").css({"display": "inline", "margin-left": "22px"});
    $("#commItemLabel_Limits").css({"display": "inline", "margin-left": "50px"});
    $("#commItemServiceInp_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#fundInp_Limits").prop("disabled", true);
    $("#functionalAreaInp_Limits").prop("disabled", true);
    $("#fundCenterInp_Limits").prop("disabled", true);
    $("#commItemServiceInp_Limits").prop("disabled", true);
    $("#fundInp_Limits").after("<br><br/>");
    $("#functionalAreaInp_Limits").after("<br><br/>");
    $("#limitTabAccAsgnTebleId tbody tr").each(function() {
        $(this).find("td").eq(10).css("display", "none");
        $(this).find("td").eq(11).css("display", "none");
        $(this).find("td").eq(12).css("display", "none");
        $(this).find("td").eq(13).css("display", "none");
        $(this).find("td").eq(14).css("display", "none");
        $(this).find("td").eq(15).css("display", "none");
        $(this).find("td").eq(3).children(".limitAccAsgnTblCOArea").prop("disabled", "true");
        $(this).find("td").eq(5).children(".limitAccAsgnTblFund").prop("disabled", "true");
        $(this).find("td").eq(6).children(".limitAccAsgnTblFunctionalArea").prop("disabled", "true");
        $(this).find("td").eq(7).children(".limitAccAsgnTblFundCenter").prop("disabled", "true");
        $(this).find("td").eq(8).children(".limitAccAsgnTblCommitmentItem").prop("disabled", "true");
    });
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(10).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(11).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(12).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(13).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(14).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(15).css("display", "none");
}
function showLimitTabModelFieldAccAsgn_K() {
    $("#gLAccountLabel_Limits").css({"margin-left": "10px"});
    $("#gLAccountInp_Limits").css({"margin-left": "30px"});
    $("#coAreaLabel_Limits").css({"margin-left": "10px"});
    $("#coAreaInp_Limits").css({"margin-left": "10px"});
    $("#companyCodeLabel_Limits").css({"margin-left": "10px"});
    $("#companyCodeInp_Limits").css({"margin-left": "35px"});
    $("#costCenterLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#costCenterInp_Limits").css({"display": "inline", "margin-left": "30px"});
    $("#fundLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#fundInp_Limits").css({"display": "inline", "margin-left": "30px"});
    $("#functionalAreaLabel_Limits").css({"display": "inline", "margin-left": "10px", "margin-top": "15px"});
    $("#functionalAreaInp_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#fundCenterLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#fundCenterInp_Limits").css({"display": "inline", "margin-left": "22px"});
    $("#commItemLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#commItemServiceInp_Limits").css({"display": "inline", "margin-left": "45px"});
    $("#gLAccountInp_Limits").prop("disabled", true);
    $("#fundInp_Limits").prop("disabled", true);
    $("#functionalAreaInp_Limits").prop("disabled", true);
    $("#fundCenterInp_Limits").prop("disabled", true);
    $("#commItemServiceInp_Limits").prop("disabled", true);
    $("#functionalAreaInp_Limits").after("<br><br/>");
    $("#fundCenterInp_Limits").after("<br><br/>");
    $("#limitTabAccAsgnTebleId tbody tr").each(function() {
        $(this).find("td").eq(9).css("display", "none");
        $(this).find("td").eq(10).css("display", "none");
        $(this).find("td").eq(11).css("display", "none");
        $(this).find("td").eq(12).css("display", "none");
        $(this).find("td").eq(13).css("display", "none");
        $(this).find("td").eq(14).css("display", "none");
        $(this).find("td").eq(15).css("display", "none");
        $(this).find("td").eq(2).children(".limitAccAsgnTblGLAccount").prop("disabled", "true");
        $(this).find("td").eq(3).children(".limitAccAsgnTblCOArea").prop("disabled", "true");
        $(this).find("td").eq(5).children(".limitAccAsgnTblFund").prop("disabled", "true");
        $(this).find("td").eq(6).children(".limitAccAsgnTblFunctionalArea").prop("disabled", "true");
        $(this).find("td").eq(7).children(".limitAccAsgnTblFundCenter").prop("disabled", "true");
        $(this).find("td").eq(8).children(".limitAccAsgnTblCommitmentItem").prop("disabled", "true");
    });
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(9).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(10).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(11).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(12).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(13).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(14).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(15).css("display", "none");
}
function showLimitTabModelFieldAccAsgn_N() {
    $("#gLAccountLabel_Limits").css({"margin-left": "10px"});
    $("#gLAccountInp_Limits").css({"margin-left": "30px"});
    $("#coAreaLabel_Limits").css({"margin-left": "10px"});
    $("#coAreaInp_Limits").css({"margin-left": "20px"});
    $("#companyCodeLabel_Limits").css({"margin-left": "10px"});
    $("#companyCodeInp_Limits").css({"margin-left": "35px"});
    $("#costCenterLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#costCenterInp_Limits").css({"display": "inline", "margin-left": "30px"});
    $("#nActNumLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#nActNumServiceInp_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#costCenterInp_Limits").prop("disabled", true);
    $("#limitTabAccAsgnTebleId tbody tr").each(function() {
        $(this).find("td").eq(5).css("display", "none");
        $(this).find("td").eq(6).css("display", "none");
        $(this).find("td").eq(7).css("display", "none");
        $(this).find("td").eq(8).css("display", "none");
        $(this).find("td").eq(9).css("display", "none");
        $(this).find("td").eq(10).css("display", "none");
        $(this).find("td").eq(11).css("display", "none");
        $(this).find("td").eq(12).css("display", "none");
        $(this).find("td").eq(14).css("display", "none");
        $(this).find("td").eq(15).css("display", "none");
        $(this).find("td").eq(3).children(".limitAccAsgnTblCOArea").prop("disabled", "true");
        $(this).find("td").eq(4).children(".limitAccAsgnTblCostCetner").prop("disabled", "true");
    });
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(5).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(6).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(7).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(8).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(9).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(10).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(11).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(12).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(14).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(15).css("display", "none");
}
function showLimitTabModelFieldAccAsgn_P() {
    $("#gLAccountLabel_Limits").css({"margin-left": "10px"});
    $("#gLAccountInp_Limits").css({"margin-left": "25px"});
    $("#coAreaLabel_Limits").css({"margin-left": "10px"});
    $("#coAreaInp_Limits").css({"margin-left": "20px"});
    $("#companyCodeLabel_Limits").css({"margin-left": "10px"});
    $("#companyCodeInp_Limits").css({"margin-left": "35px"});
    $("#wBSElementLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#wBSElementInp_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#nActNumLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#nActNumServiceInp_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#limitTabAccAsgnTebleId tbody tr").each(function() {
        $(this).find("td").eq(4).css("display", "none");
        $(this).find("td").eq(5).css("display", "none");
        $(this).find("td").eq(6).css("display", "none");
        $(this).find("td").eq(7).css("display", "none");
        $(this).find("td").eq(8).css("display", "none");
        $(this).find("td").eq(9).css("display", "none");
        $(this).find("td").eq(10).css("display", "none");
        $(this).find("td").eq(12).css("display", "none");
        $(this).find("td").eq(14).css("display", "none");
        $(this).find("td").eq(15).css("display", "none");
        $(this).find("td").eq(3).children(".limitAccAsgnTblCOArea").prop("disabled", "true");
    });
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(4).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(5).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(6).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(7).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(8).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(9).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(10).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(12).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(14).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(15).css("display", "none");
}
function showLimitTabModelFieldAccAsgn_R() {
    $("#gLAccountLabel_Limits").css({"margin-left": "10px"});
    $("#gLAccountInp_Limits").css({"margin-left": "20px"});
    $("#coAreaLabel_Limits").css({"margin-left": "10px"});
    $("#coAreaInp_Limits").css({"margin-left": "30px"});
    $("#companyCodeLabel_Limits").css({"margin-left": "10px"});
    $("#companyCodeInp_Limits").css({"margin-left": "35px"});
    $("#costCenterLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#costCenterInp_Limits").css({"display": "inline", "margin-left": "20px"});
    $("#salesOrderLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#salesOrderInp_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#itemNumLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#itemNumberInp_Limits").css({"display": "inline", "margin-left": "25px"});
    $("#delivSchLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#delivSchInp_Limits").css({"display": "inline", "margin-left": "43px"});
    $("#fundLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#fundInp_Limits").css({"display": "inline", "margin-left": "50px"});
    $("#functionalAreaLabel_Limits").css({"display": "inline", "margin-left": "10px", "margin-top": "15px"});
    $("#functionalAreaInp_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#fundCenterLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#fundCenterInp_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#commItemLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#commItemServiceInp_Limits").css({"display": "inline", "margin-left": "33px"});
    $("#itemNumberInp_Limits").after("<br><br/>");
    $("#functionalAreaInp_Limits").after("<br><br/>");
    $("#fundCenterInp_Limits").after("<br><br/>");
    $("#fundInp_Limits").prop("disabled", true);
    $("#functionalAreaInp_Limits").prop("disabled", true);
    $("#fundCenterInp_Limits").prop("disabled", true);
    $("#commItemServiceInp_Limits").prop("disabled", true);
    $("#limitTabAccAsgnTebleId tbody tr").each(function() {
        $(this).find("td").eq(9).css("display", "none");
        $(this).find("td").eq(10).css("display", "none");
        $(this).find("td").eq(11).css("display", "none");
        $(this).find("td").eq(13).css("display", "none");
        $(this).find("td").eq(3).children(".limitAccAsgnTblCOArea").prop("disabled", "true");
        $(this).find("td").eq(5).children(".limitAccAsgnTblFund").prop("disabled", "true");
        $(this).find("td").eq(6).children(".limitAccAsgnTblFunctionalArea").prop("disabled", "true");
        $(this).find("td").eq(7).children(".limitAccAsgnTblFundCenter").prop("disabled", "true");
        $(this).find("td").eq(8).children(".limitAccAsgnTblCommitmentItem").prop("disabled", "true");
        $(this).find("td").eq(1).children(".limitAccAsgnTblQuantity").css("width", "100px");
        $(this).find("td").eq(2).children(".limitAccAsgnTblGLAccount").css("width", "100px");
        $(this).find("td").eq(3).children(".limitAccAsgnTblCOArea").css("width", "100px");
        $(this).find("td").eq(4).children(".limitAccAsgnTblCostCetner").css("width", "100px");
        $(this).find("td").eq(5).children(".limitAccAsgnTblFund").css("width", "100px");
        $(this).find("td").eq(6).children(".limitAccAsgnTblFunctionalArea").css("width", "100px");
        $(this).find("td").eq(7).children(".limitAccAsgnTblFundCenter").css("width", "100px");
        $(this).find("td").eq(8).children(".limitAccAsgnTblCommitmentItem").css("width", "100px");
        $(this).find("td").eq(12).children(".limitAccAsgnTblSalesOrder").css("width", "100px");
        $(this).find("td").eq(14).children(".limitAccAsgnTblItemNumber").css("width", "100px");
    });
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(9).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(10).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(11).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(13).css("display", "none");
}
function showLimitTabModelFieldAccAsgn_X() {
    $("#gLAccountLabel_Limits").css({"margin-left": "10px"});
    $("#gLAccountInp_Limits").css({"margin-left": "10px"});
    $("#coAreaLabel_Limits").css({"margin-left": "10px"});
    $("#coAreaInp_Limits").css({"margin-left": "35px"});
    $("#companyCodeLabel_Limits").css({"margin-left": "10px"});
    $("#companyCodeInp_Limits").css({"margin-left": "28px"});
    $("#costCenterLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#costCenterInp_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#orderLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#orderInp_Limits").css({"display": "inline", "margin-left": "50px"});
    $("#wBSElementLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#wBSElementInp_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#salesOrderLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#salesOrderInp_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#itemNumLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#itemNumberInp_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#delivSchLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#delivSchInp_Limits").css({"display": "inline", "margin-left": "45px"});
    $("#wBSElementInp_Limits").after("<br><br/>");
    $("#limitTabAccAsgnTebleId tbody tr").each(function() {
        $(this).find("td").eq(5).css("display", "none");
        $(this).find("td").eq(6).css("display", "none");
        $(this).find("td").eq(7).css("display", "none");
        $(this).find("td").eq(8).css("display", "none");
        $(this).find("td").eq(10).css("display", "none");
        $(this).find("td").eq(13).css("display", "none");
        $(this).find("td").eq(3).children(".limitAccAsgnTblCOArea").prop("disabled", "true");
    });
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(5).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(6).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(7).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(8).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(10).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(13).css("display", "none");
}
function showLimitTabModelFieldAccAsgn_Z() {
    $("#gLAccountLabel_Limits").css({"margin-left": "10px"});
    $("#gLAccountInp_Limits").css({"margin-left": "10px"});
    $("#coAreaLabel_Limits").css({"margin-left": "10px"});
    $("#coAreaInp_Limits").css({"margin-left": "10px"});
    $("#companyCodeLabel_Limits").css({"margin-left": "10px"});
    $("#companyCodeInp_Limits").css({"margin-left": "28px"});
    $("#costCenterLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#costCenterInp_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#orderLabel_Limits").css({"display": "inline", "margin-left": "10px"});
    $("#orderInp_Limits").css({"display": "inline", "margin-left": "30px"});
    $("#limitTabAccAsgnTebleId tbody tr").each(function() {
        $(this).find("td").eq(5).css("display", "none");
        $(this).find("td").eq(6).css("display", "none");
        $(this).find("td").eq(7).css("display", "none");
        $(this).find("td").eq(8).css("display", "none");
        $(this).find("td").eq(10).css("display", "none");
        $(this).find("td").eq(11).css("display", "none");
        $(this).find("td").eq(12).css("display", "none");
        $(this).find("td").eq(13).css("display", "none");
        $(this).find("td").eq(14).css("display", "none");
        $(this).find("td").eq(15).css("display", "none");
        $(this).find("td").eq(3).children(".limitAccAsgnTblCOArea").prop("disabled", "true");
    });
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(5).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(6).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(7).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(8).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(10).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(11).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(12).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(13).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(14).css("display", "none");
    $("#limitTabAccAsgnTebleId thead tr").find("th").eq(15).css("display", "none");
}

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
//    if (($("#PoFrom").val() !== "createpo" && $("#PoFrom").val() !== "byrfq") && $("#PrType").val() === "Material") {
    if ($("#PrType").val() === "Material") 
    {
        $("#gLAccount").prop("disabled", true);
        $("#costCenterAccAsgn").prop("disabled", false);
        $("#accAsgnOrder").prop("disabled", false);
        $("#accAsgnAsset").prop("disabled", false);
        $("#accAsgnWBSElementInput").prop("disabled", false);
        $("#accAsgnSalesOrder").prop("disabled", false);
        $("#assAsgnItemNumber").prop("disabled", false);
        $("#assAsgnDelivSch").prop("disabled", false);
        $("#accAsgnfund").prop("disabled", false);
        $("#accAsgnfunctionalArea").prop("disabled", false);
        $("#accAsgnFundCenterInput").prop("disabled", false);
        $("#accAsgnCommItemInput").prop("disabled", false);
        $("#accAsgnNActNumInput").prop("disabled", false);        
    } 
    else if ($("#PrType").val() === "Service") 
    {
        $("#recipient").prop("disabled", true);
        $("#unloadingPoint").prop("disabled", true);
        $("#gLAccount").prop("disabled", true);
        $("#costCenterAccAsgn").prop("disabled", true);
        $("#accAsgnOrder").prop("disabled", true);
        $("#accAsgnAsset").prop("disabled", true);
        $("#accAsgnWBSElementInput").prop("disabled", true);
        $("#accAsgnSalesOrder").prop("disabled", true);
        $("#assAsgnItemNumber").prop("disabled", true);
        $("#assAsgnDelivSch").prop("disabled", true);
        $("#accAsgnfund").prop("disabled", true);
        $("#accAsgnfunctionalArea").prop("disabled", true);
        $("#accAsgnFundCenterInput").prop("disabled", true);
        $("#accAsgnCommItemInput").prop("disabled", true);
        $("#accAsgnNActNumInput").prop("disabled", true);
    }
    var rowCount = costCenteraccountAssignmentTebleId.rows.length;
    for (var i = rowCount - 1; i >= 0; i--) {
        costCenteraccountAssignmentTebleId.deleteRow(i);
        if (i === 0) {
            return false;
        }
    }
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
    $("#costCenteraccountAssignmentTebleId").children("thead").append(row);
    if (requestFrom === 'AccAsgnModel' || requestFrom === 'onLoad' || requestFrom === 'distribution') {
        var linkid;
        var prType;
        $("#material_headerClass tbody tr").each(function() {
            var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var insertionid = $("#ItemNumberSelect").val();
            if (insertionid === id) {
                linkid = $(this).find("td").eq(0).children(".linkId_Class").val();
                prType = $(this).find("td").eq(0).children(".prType_Class").val();
            }
        });
        if (prType === 'Capital PR for Services' || prType === 'PR for Services') {
//            alert("requestFrom :" + requestFrom);
//                $("#PrType").val("Service");
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

            pupolateDataInAccountAssignmentTable(jsonResponseWhenDataGetAfterSaveOnLoad, requestFrom);
        }
        if (prType === 'Capital PR for Materials' || prType === 'PR for Goods' || prType === 'Sub Contracting PR') {
            $("#PrType").val("Material");
            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data:
                        {
                            "reqFrom": "getCmplxPRToPOLineItemPRAccountAssignmentByLinkId",
                            "linkid": linkid,
                            "type": "Material"
                        },
                dataType: "json",
                complete: function(responseJson)
                {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("Acc_Assmt Len: " + obj.length);
                    console.log("MainAccAssInfo: " + JSON.stringify(obj));
                    accountAssignment(obj);
                }
            });
        }
    } else if (requestFrom === "itemCatDropDown" || requestFrom === "lineTable" || requestFrom === "serviceTableCheckbox") {
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
        getAccountAssignmentByLineItemNumber(lineItemNumber, linkid, prType, requestFrom);
    }
}
function accountAssignment(obj) {
    var PoFrom = $("#PoFrom").val();
    var tdrow;
    if (obj.length === 1) {
        $("#distribution").val("Single Account Assignment");
        $("#POAccAssPartialInvoiceIndicator").val(obj[0].PARTIAL_INVOICE_INDICATOR);
        $("#unloadingPoint").val(obj[0].UNLOADINGPOINT);
        $("#recipient").val(obj[0].RECEPIENT);
        $("#gLAccount").val(obj[0].GLACCOUNT);
        $("#coArea").val(obj[0].COAREA);
        $("#costCenterAccAsgn").val(obj[0].COSTCENTER);
        $("#accAsgnOrder").val(obj[0].ORDER);
        $("#accAsgnAsset").val(obj[0].ASSET);
        $("#accAsgnWBSElementInput").val(obj[0].WBSELEMENT);
        $("#accAsgnSalesOrder").val(obj[0].SALESORDER);
        $("#assAsgnItemNumber").val(obj[0].ITEMNUMBER);
        $("#assAsgnDelivSch").val(obj[0].DELIVERYSCHEDULE);
        $("#accAsgnfund").val(obj[0].FUND);
        $("#accAsgnfunctionalArea").val(obj[0].FUNCTIONALAREA);
        $("#accAsgnFundCenterInput").val(obj[0].FUNDCENTER);
        $("#accAsgnCommItemInput").val(obj[0].COMMITMENTITEM);
        $("#accAsgnNActNumInput").val(obj[0].NETWORK);
        $("#costCenterAccountAssignmentchangeScreenbtn").css("display", "none");
        $(".multipleCostCenterDiv").css("display", "none");
        $(".costCenterDiv").css("display", "block");
        $("#saveAccAsgnFieldBtn").css("display", "none");
    } else {
        $("#distribution").val("Distrib. By Percentage");
        $("#distribution").prop("disabled",false);
        $(".multipleCostCenterDiv").css("display", "block");
        $(".costCenterDiv").css("display", "none");
        for (var i = 0; i < obj.length; i++) {
            $("#POAccAssPartialInvoiceIndicator").val(obj[i].PARTIAL_INVOICE_INDICATOR);
            $("#costCenterAccountAssignmentTablechangeScreenbtn").css("display", "none");
            $("#saveAccAsgnFieldBtn").css("display", "");
            tdrow += "<tr><td>" + "</td><td>" + '<input type=text ' + (PoFrom !== 'createpo' && PoFrom !== 'byrfq' ? '' : '') + ' class="form-control form-rounded input-height accAsgnQuantity" style="width: 150px;" value=' + formatNumberByComma(obj[i].QUANTITY) + ' max=' + obj[i].QUANTITY + '>' +
                    "</td><td>" + '<input type=text ' + (PoFrom !== 'createpo' && PoFrom !== 'byrfq' ? '' : '') + ' class="form-control form-rounded input-height accAsgnPercentage" style="width: 100px;" value=' + formatAmountByComma(obj[i].PERCENTAGE) + ' max=' + obj[i].PERCENTAGE + '>' +
                    "</td><td>" + '<input type=text ' + (PoFrom !== 'createpo' && PoFrom !== 'byrfq' ? '' : '') + ' class="form-control form-rounded input-height accAsgnGLAccount" style="width: 100px;" value=' + (obj[i].GLACCOUNT === undefined ? '' : obj[i].GLACCOUNT) + ' disabled="true">' +
                    "</td><td>" + '<input type=text ' + (PoFrom !== 'createpo' && PoFrom !== 'byrfq' ? '' : '') + ' class="form-control form-rounded input-height accAsgnCOArea" style="width: 100px;" value=' + (obj[i].COAREA === undefined ? '' : obj[i].COAREA) + '>' +
                    "</td><td>" + '<input type=text ' + (PoFrom !== 'createpo' && PoFrom !== 'byrfq' ? '' : '') + ' class="form-control form-rounded input-height accAsgnCostCetner" style="width: 100px;" value=' + (obj[i].COSTCENTER === undefined ? '' : obj[i].COSTCENTER) + '>' +
                    "</td><td>" + '<input type=text ' + (PoFrom !== 'createpo' && PoFrom !== 'byrfq' ? '' : '') + ' class="form-control form-rounded input-height accAsgnFund" style="width: 100px;" value=' + (obj[i].FUND === undefined ? '' : obj[i].FUND) + '>' +
                    "</td><td>" + '<input type=text ' + (PoFrom !== 'createpo' && PoFrom !== 'byrfq' ? '' : '') + ' class="form-control form-rounded input-height accAsgnFunctionalArea" style="width: 100px;" value=' + (obj[i].FUNCTIONALAREA === undefined ? '' : obj[i].FUNCTIONALAREA) + '>' +
                    "</td><td>" + '<input type=text ' + (PoFrom !== 'createpo' && PoFrom !== 'byrfq' ? '' : '') + ' class="form-control form-rounded input-height accAsgnFundCenter" style="width: 100px;" value=' + (obj[i].FUNDCENTER === undefined ? '' : obj[i].FUNDCENTER) + '>' +
                    "</td><td>" + '<input type=text ' + (PoFrom !== 'createpo' && PoFrom !== 'byrfq' ? '' : '') + ' class="form-control form-rounded input-height accAsgnCommitmentItem" style="width: 100px;" value=' + (obj[i].COMMITMENTITEM === undefined ? '' : obj[i].COMMITMENTITEM) + '>' +
                    "</td><td>" + '<input type=text ' + (PoFrom !== 'createpo' && PoFrom !== 'byrfq' ? '' : '') + ' class="form-control form-rounded input-height accAsgnUnloadingPoint" style="width: 100px;" value=' + (obj[i].UNLOADINGPOINT === undefined ? '' : obj[i].UNLOADINGPOINT) + '>' +
                    "</td><td>" + '<input type=text ' + (PoFrom !== 'createpo' && PoFrom !== 'byrfq' ? '' : '') + ' class="form-control form-rounded input-height accAsgnRecipients" style="width: 100px;" value=' + (obj[i].RECEPIENT === undefined ? '' : obj[i].RECEPIENT) + '>' +
                    "</td><td>" + '<input type=text ' + (PoFrom !== 'createpo' && PoFrom !== 'byrfq' ? '' : '') + ' class="form-control form-rounded input-height accAsgnOrder" style="width: 100px;" value=' + (obj[i].ORDER === undefined ? '' : obj[i].ORDER) + '>' +
                    "</td><td>" + '<input type=text ' + (PoFrom !== 'createpo' && PoFrom !== 'byrfq' ? '' : '') + ' class="form-control form-rounded input-height accAsgnAssets" style="width: 100px;" value=' + (obj[i].ASSET === undefined ? '' : obj[i].ASSET) + '>' +
                    "</td><td>" + '<input type=text ' + (PoFrom !== 'createpo' && PoFrom !== 'byrfq' ? '' : '') + ' class="form-control form-rounded input-height accAsgnWBSElement" style="width: 100px;" value=' + (obj[i].WBSELEMENT === undefined ? '' : obj[i].WBSELEMENT) + '>' +
                    "</td><td>" + '<input type=text ' + (PoFrom !== 'createpo' && PoFrom !== 'byrfq' ? '' : '') + ' class="form-control form-rounded input-height accAsgnSalesOrder" style="width: 100px;" value=' + (obj[i].SALESORDER === undefined ? '' : obj[i].SALESORDER) + '>' +
                    "</td><td>" + '<input type=text ' + (PoFrom !== 'createpo' && PoFrom !== 'byrfq' ? '' : '') + ' class="form-control form-rounded input-height accAsgnNetActNumber" style="width: 100px;" value=' + (obj[i].NETWORK === undefined ? '' : obj[i].NETWORK) + '>' +
                    "</td><td>" + '<input type=text ' + (PoFrom !== 'createpo' && PoFrom !== 'byrfq' ? '' : '') + ' class="form-control form-rounded input-height accAsgnItemNumber" style="width: 100px;" value=' + (obj[i].ITEMNUMBER === undefined ? '' : obj[i].ITEMNUMBER) + '>' +
                    "</td><td>" + '<input type=text ' + (PoFrom !== 'createpo' && PoFrom !== 'byrfq' ? '' : '') + ' class="form-control form-rounded input-height accAsgnDeliverySchedule" style="width: 100px;" value=' + (obj[i].DELIVERYSCHEDULE === undefined ? '' : obj[i].DELIVERYSCHEDULE) + '>\n\
                        <input type=hidden class="form-control form-rounded input-height accAsgnLinkNumber" value=' + (obj[i].LINKNUMBER === undefined ? '' : obj[i].LINKNUMBER) + '>' +
                    "</td></tr>";
        }
        $("#costCenteraccountAssignmentTebleId").children("tbody").append(tdrow);
    }
}

function getAccountAssignmentByLineItemNumber(lineItemNumber, linkid, prType, requestFrom) {
    $.ajax({
        type: "GET",
        url: "ajaxcontroller.do",
        async: false,
        data: {
            "reqFrom": "getAccountAssignmentByLineItemNumber",
            "lineItemNumber": lineItemNumber,
            "linkid": linkid,
            "prType": prType
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            var tdrow = "";
            $("#costCenteraccountAssignmentTebleId tbody tr").remove();
            if (obj.length !== 0) {
                if (prType === "Material") {
                    var PoFrom = $("#PoFrom").val();
                    for (var i = 0; i < obj.length; i++) {
                        console.log("Percentage :" + obj[i].PERCENTAGE);
                        console.log("PARTIAL_INVOICE_INDICATOR :" + obj[i].PARTIAL_INVOICE_INDICATOR);
                        console.log("DISTRIBUTION:::: :" + obj[i].DISTRIBUTION);
                        $("#POAccAssPartialInvoiceIndicator").val(obj[i].PARTIAL_INVOICE_INDICATOR);
                        var distribution = obj[i].DISTRIBUTION;
                        $("#CoCode").val(obj[i].COCODE);
                        if (obj[i].DISTRIBUTION === "") {
                            $("#distribution").val("Single Account Assignment");
                            setDistInPOHiddenField("Single Account Assignment");
                            $("#unloadingPoint").val(obj[i].UNLOADINGPOINT);
                            $("#recipient").val(obj[i].RECEPIENT);
                            $("#gLAccount").val(obj[i].GLACCOUNT);
                            $("#coArea").val(obj[i].COAREA);
                            $("#costCenterAccAsgn").val(obj[i].COSTCENTER);
                            $("#accAsgnOrder").val(obj[i].ORDER);
                            $("#accAsgnAsset").val(obj[i].ASSET);
                            $("#accAsgnWBSElementInput").val(obj[i].WBSELEMENT);
                            $("#accAsgnSalesOrder").val(obj[i].SALESORDER);
                            $("#assAsgnItemNumber").val(obj[i].ITEMNUMBER);
                            $("#assAsgnDelivSch").val(obj[i].DELIVERYSCHEDULE);
                            $("#accAsgnfund").val(obj[i].FUND);
                            $("#accAsgnfunctionalArea").val(obj[i].FUNCTIONALAREA);
                            $("#accAsgnFundCenterInput").val(obj[i].FUNDSCENTER);
                            $("#accAsgnCommItemInput").val(obj[i].COMMITMENTITEM);
                            $("#accAsgnNActNumInput").val(obj[i].NETWORK);
                           
                            $("#costCenterAccountAssignmentchangeScreenbtn").css("display", "none");
                            var PoFrom = $("#PoFrom").val();
                            if (PoFrom === "editpo" || PoFrom === "editApprovedPo" || PoFrom === "shortcutPo") {
                                 ArrayIsEmptyOnLineItemChange();
                                var prNumber = "";
                                $("#material_headerClass tbody tr").each(function() {
                                    var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                                    var insertionid = $("#ItemNumberSelect").val();
                                    if (insertionid === id) {
                                        prNumber = $(this).find("td").eq(0).children(".prNumber_Class").val();
                                    }
                                });
                                if (prNumber === "") {
                                    $("#costCenterAccountAssignmentchangeScreenbtn").css("display", "");
                                } else {
                                    $("#costCenterAccountAssignmentchangeScreenbtn").css("display", "none");
                                }
                            }
                            $("#saveAccAsgnFieldBtn").css("display", "none");
                            if (requestFrom === "itemCatDropDown" || requestFrom === "serviceTableCheckbox") {
                                $(".multipleCostCenterDiv").css("display", "none");
                                $(".costCenterDiv").css("display", "block");
                            }
                        } else if (obj[i].DISTRIBUTION === "1" || obj[i].DISTRIBUTION === "2") {
                            $("#costCenterAccountAssignmentchangeScreenbtn").css("display", "");
                            $("#saveAccAsgnFieldBtn").css("display", "");
                            if (obj[i].DISTRIBUTION === "1") {
                                $("#distribution").val("Distrib. On Quantity Basis");
                            } else if (obj[i].DISTRIBUTION === "2") {
                                $("#distribution").val("Distrib. By Percentage");
                            }

                            tdrow = "<tr><td>" + "</td><td>" + '<input type=text ' + (PoFrom !== 'createpo' && PoFrom !== 'byrfq' ? '' : '') + ' class="form-control form-rounded input-height accAsgnQuantity" style="width: 150px;" max="' + obj[i].QUANTITY + '" value="' + formatNumberByComma(obj[i].QUANTITY) + '">' +
                                    "</td><td>" + '<input type=text ' + (PoFrom !== 'createpo' && PoFrom !== 'byrfq' ? '' : '') + ' class="form-control form-rounded input-height accAsgnPercentage" style="width: 100px;" max="' + obj[i].PERCENTAGE + '" value="' + formatAmountByComma(obj[i].PERCENTAGE) + '">' +
                                    "</td><td>" + '<input type=text ' + (PoFrom !== 'createpo' && PoFrom !== 'byrfq' ? '' : '') + ' class="form-control form-rounded input-height accAsgnGLAccount" style="width: 100px;" value=' + (obj[i].GLACCOUNT === undefined ? '' : obj[i].GLACCOUNT) + ' disabled="true">' +
                                    "</td><td>" + '<input type=text ' + (PoFrom !== 'createpo' && PoFrom !== 'byrfq' ? '' : '') + ' class="form-control form-rounded input-height accAsgnCOArea" style="width: 100px;" value=' + (obj[i].COAREA === undefined ? '' : obj[i].COAREA) + '>' +
                                    "</td><td>" + '<input type=text ' + (PoFrom !== 'createpo' && PoFrom !== 'byrfq' ? '' : '') + ' class="form-control form-rounded input-height accAsgnCostCetner" style="width: 100px;" value=' + (obj[i].COSTCENTER === undefined ? '' : obj[i].COSTCENTER) + '>' +
                                    "</td><td>" + '<input type=text ' + (PoFrom !== 'createpo' && PoFrom !== 'byrfq' ? '' : '') + ' class="form-control form-rounded input-height accAsgnFund" style="width: 100px;" value=' + (obj[i].FUND === undefined ? '' : obj[i].FUND) + '>' +
                                    "</td><td>" + '<input type=text ' + (PoFrom !== 'createpo' && PoFrom !== 'byrfq' ? '' : '') + ' class="form-control form-rounded input-height accAsgnFunctionalArea" style="width: 100px;" value=' + (obj[i].FUNCTIONALAREA === undefined ? '' : obj[i].FUNCTIONALAREA) + '>' +
                                    "</td><td>" + '<input type=text ' + (PoFrom !== 'createpo' && PoFrom !== 'byrfq' ? '' : '') + ' class="form-control form-rounded input-height accAsgnFundCenter" style="width: 100px;" value=' + (obj[i].FUNDSCENTER === undefined ? '' : obj[i].FUNDSCENTER) + '>' +
                                    "</td><td>" + '<input type=text ' + (PoFrom !== 'createpo' && PoFrom !== 'byrfq' ? '' : '') + ' class="form-control form-rounded input-height accAsgnCommitmentItem" style="width: 100px;" value=' + (obj[i].COMMITMENTITEM === undefined ? '' : obj[i].COMMITMENTITEM) + '>' +
                                    "</td><td>" + '<input type=text ' + (PoFrom !== 'createpo' && PoFrom !== 'byrfq' ? '' : '') + ' class="form-control form-rounded input-height accAsgnUnloadingPoint" style="width: 100px;" value=' + (obj[i].UNLOADINGPOINT === undefined ? '' : obj[i].UNLOADINGPOINT) + '>' +
                                    "</td><td>" + '<input type=text ' + (PoFrom !== 'createpo' && PoFrom !== 'byrfq' ? '' : '') + ' class="form-control form-rounded input-height accAsgnRecipients" style="width: 100px;" value=' + (obj[i].RECEPIENT === undefined ? '' : obj[i].RECEPIENT) + '>' +
                                    "</td><td>" + '<input type=text ' + (PoFrom !== 'createpo' && PoFrom !== 'byrfq' ? '' : '') + ' class="form-control form-rounded input-height accAsgnOrder" style="width: 100px;" value=' + (obj[i].ORDER === undefined ? '' : obj[i].ORDER) + '>' +
                                    "</td><td>" + '<input type=text ' + (PoFrom !== 'createpo' && PoFrom !== 'byrfq' ? '' : '') + ' class="form-control form-rounded input-height accAsgnAssets" style="width: 100px;" value=' + (obj[i].ASSET === undefined ? '' : obj[i].ASSET) + '>' +
                                    "</td><td>" + '<input type=text ' + (PoFrom !== 'createpo' && PoFrom !== 'byrfq' ? '' : '') + ' class="form-control form-rounded input-height accAsgnWBSElement" style="width: 100px;" value=' + (obj[i].WBSELEMENT === undefined ? '' : obj[i].WBSELEMENT) + '>' +
                                    "</td><td>" + '<input type=text ' + (PoFrom !== 'createpo' && PoFrom !== 'byrfq' ? '' : '') + ' class="form-control form-rounded input-height accAsgnSalesOrder" style="width: 100px;" value=' + (obj[i].SALESORDER === undefined ? '' : obj[i].SALESORDER) + '>' +
                                    "</td><td>" + '<input type=text ' + (PoFrom !== 'createpo' && PoFrom !== 'byrfq' ? '' : '') + ' class="form-control form-rounded input-height accAsgnNetActNumber" style="width: 100px;" value=' + (obj[i].NETWORK === undefined ? '' : obj[i].NETWORK) + '>' +
                                    "</td><td>" + '<input type=text ' + (PoFrom !== 'createpo' && PoFrom !== 'byrfq' ? '' : '') + ' class="form-control form-rounded input-height accAsgnItemNumber" style="width: 100px;" value=' + (obj[i].ITEMNUMBER === undefined ? '' : obj[i].ITEMNUMBER) + '>' +
                                    "</td><td>" + '<input type=text ' + (PoFrom !== 'createpo' && PoFrom !== 'byrfq' ? '' : '') + ' class="form-control form-rounded input-height accAsgnDeliverySchedule" style="width: 100px;" value="' + (obj[i].DELIVERYSCHEDULE === undefined ? "" : obj[i].DELIVERYSCHEDULE) + '">\n\
                                        <input type=hidden class="form-control form-rounded input-height accAsgnLinkNumber" value=' + (obj[i].LINKNUMBER === undefined ? '' : obj[i].LINKNUMBER) + '>' +
                                    "</td></tr>";
                            if (requestFrom === "itemCatDropDown" || requestFrom === "serviceTableCheckbox") {
                                $(".multipleCostCenterDiv").css("display", "block");
                                $(".costCenterDiv").css("display", "none");
                                $("#costCenterAccountAssignmentTablechangeScreenbtn").css("display", "none");
//                                    console.log("Row in getAccountAssignmentByLineItemNumber :" + tdrow);
//                                    $("#costCenteraccountAssignmentTebleId").children("tbody").append(tdrow);
                                var PoFrom = $("#PoFrom").val();
                                if (PoFrom === "editpo" || PoFrom === "editApprovedPo" || PoFrom === "shortcutPo") {
                                    var prNumber = "";
                                    $("#material_headerClass tbody tr").each(function() {
                                        var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                                        var insertionid = $("#ItemNumberSelect").val();
                                        if (insertionid === id) {
                                            prNumber = $(this).find("td").eq(0).children(".prNumber_Class").val();
                                        }
                                    });
                                    if (prNumber === "") {
                                        $("#costCenterAccountAssignmentTablechangeScreenbtn").css("display", "");
                                    } else {
                                        $("#costCenterAccountAssignmentTablechangeScreenbtn").css("display", "none");
                                    }
                                }
                                $("#costCenteraccountAssignmentTebleId").children("tbody").append(tdrow);
                                console.log("Row in getAccountAssignmentByLineItemNumber :" + tdrow);
                                if (PoFrom === "editpo" || PoFrom === "editApprovedPo" || PoFrom === "shortcutPo" || PoFrom === "createpo" || PoFrom === "byrfq") {
                                    if (obj[i].DISTRIBUTION === "1") {
                                        $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
                                            $(this).find("td").eq(2).children(".accAsgnPercentage").prop("disabled", true);
                                        });
                                    } else if (obj[i].DISTRIBUTION === "2") {
                                        $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
                                            $(this).find("td").eq(1).children(".accAsgnQuantity").prop("disabled", true);
                                        });
                                    }
                                }
                            }
                        }
                    }
                } else if (prType === "Service") {
                    if (obj.length === 1) {
                        $("#distribution").val("Single Account Assignment");
                        $("#unloadingPoint").val(obj[0].UNLOADINGPOINT);
                        $("#recipient").val(obj[0].RECEPIENT);
                        $("#gLAccount").val(obj[0].GLACCOUNT);
                        $("#coArea").val(obj[0].COAREA);
                        $("#costCenterAccAsgn").val(obj[0].COSTCENTER);
                        $("#accAsgnOrder").val(obj[0].ORDER);
                        $("#accAsgnAsset").val(obj[0].ASSET);
                        $("#accAsgnWBSElementInput").val(obj[0].WBSELEMENT);
                        $("#accAsgnSalesOrder").val(obj[0].SALESORDER);
                        $("#assAsgnItemNumber").val(obj[0].ITEMNUMBER);
                        $("#assAsgnDelivSch").val(obj[0].DELIVERYSCHEDULE);
                        $("#accAsgnfund").val(obj[0].FUND);
                        $("#accAsgnfunctionalArea").val(obj[0].FUNCTIONALAREA);
                        $("#accAsgnFundCenterInput").val(obj[0].FUNDSCENTER);
                        $("#accAsgnCommItemInput").val(obj[0].COMMITMENTITEM);
                        $("#accAsgnNActNumInput").val(obj[0].NETWORK);
//                            ArrayIsEmptyOnLineItemChange();
                        $("#costCenterAccountAssignmentchangeScreenbtn").css("display", "none");
                        $("#saveAccAsgnFieldBtn").css("display", "none");
                        if (requestFrom === "itemCatDropDown" || requestFrom === "serviceTableCheckbox") {
                            $(".multipleCostCenterDiv").css("display", "none");
                            $(".costCenterDiv").css("display", "block");
                        }
                    } else {
                        for (var i = 0; i < obj.length; i++) {
                            console.log("Percentage :" + obj[i].PERCENTAGE);
                            console.log("PARTIAL_INVOICE_INDICATOR :" + obj[i].PARTIAL_INVOICE_INDICATOR);
                            $("#POAccAssPartialInvoiceIndicator").val(obj[i].PARTIAL_INVOICE_INDICATOR);
                            var distribution = obj[i].DISTRIBUTION;
                            $("#costCenterAccountAssignmentchangeScreenbtn").css("display", "");
                            $("#saveAccAsgnFieldBtn").css("display", "");
                            $("#distribution").val("Distrib. By Percentage");
                            setDistInPOHiddenField("Distrib. By Percentage");
                            tdrow += "<tr><td><input type=hidden class=deleteFlag value='" + obj[i].DELETEFLAG + "'>" +
                                    "</td><td>" + '<input type=text readonly="true" class="form-control form-rounded input-height accAsgnQuantity" style="width: 150px;" max="' + (obj[i].QUANTITY) + '" value="' + formatNumberByComma(obj[i].QUANTITY) + '">' +
                                    "</td><td>" + '<input type=text readonly="true" class="form-control form-rounded input-height accAsgnPercentage" style="width: 100px;" max="' + obj[i].PERCENTAGE + '" value="' + formatAmountByComma(obj[i].PERCENTAGE) + '">' +
                                    "</td><td>" + '<input type=text readonly="true" class="form-control form-rounded input-height accAsgnGLAccount" style="width: 100px;" value=' + (obj[i].GLACCOUNT === undefined ? '' : obj[i].GLACCOUNT) + '>' +
                                    "</td><td>" + '<input type=text readonly="true" class="form-control form-rounded input-height accAsgnCOArea" style="width: 100px;" value=' + (obj[i].COAREA === undefined ? '' : obj[i].COAREA) + '>' +
                                    "</td><td>" + '<input type=text readonly="true" class="form-control form-rounded input-height accAsgnCostCetner" style="width: 100px;" value=' + (obj[i].COSTCENTER === undefined ? '' : obj[i].COSTCENTER) + '>' +
                                    "</td><td>" + '<input type=text readonly="true" class="form-control form-rounded input-height accAsgnFund" style="width: 100px;" value=' + (obj[i].FUND === undefined ? '' : obj[i].FUND) + '>' +
                                    "</td><td>" + '<input type=text readonly="true" class="form-control form-rounded input-height accAsgnFunctionalArea" style="width: 100px;" value=' + (obj[i].FUNCTIONALAREA === undefined ? '' : obj[i].FUNCTIONALAREA) + '>' +
                                    "</td><td>" + '<input type=text readonly="true" class="form-control form-rounded input-height accAsgnFundCenter" style="width: 100px;" value=' + (obj[i].FUNDSCENTER === undefined ? '' : obj[i].FUNDSCENTER) + '>' +
                                    "</td><td>" + '<input type=text readonly="true" class="form-control form-rounded input-height accAsgnCommitmentItem" style="width: 100px;" value=' + (obj[i].COMMITMENTITEM === undefined ? '' : obj[i].COMMITMENTITEM) + '>' +
                                    "</td><td>" + '<input type=text readonly="true" class="form-control form-rounded input-height accAsgnUnloadingPoint" style="width: 100px;" value=' + (obj[i].UNLOADINGPOINT === undefined ? '' : obj[i].UNLOADINGPOINT) + '>' +
                                    "</td><td>" + '<input type=text readonly="true" class="form-control form-rounded input-height accAsgnRecipients" style="width: 100px;" value=' + (obj[i].RECEPIENT === undefined ? '' : obj[i].RECEPIENT) + '>' +
                                    "</td><td>" + '<input type=text readonly="true" class="form-control form-rounded input-height accAsgnOrder" style="width: 100px;" value=' + (obj[i].ORDER === undefined ? '' : obj[i].ORDER) + '>' +
                                    "</td><td>" + '<input type=text readonly="true" class="form-control form-rounded input-height accAsgnAssets" style="width: 100px;" value=' + (obj[i].ASSET === undefined ? '' : obj[i].ASSET) + '>' +
                                    "</td><td>" + '<input type=text readonly="true" class="form-control form-rounded input-height accAsgnWBSElement" style="width: 100px;" value=' + (obj[i].WBSELEMENT === undefined ? '' : obj[i].WBSELEMENT) + '>' +
                                    "</td><td>" + '<input type=text readonly="true" class="form-control form-rounded input-height accAsgnSalesOrder" style="width: 100px;" value=' + (obj[i].SALESORDER === undefined ? '' : obj[i].SALESORDER) + '>' +
                                    "</td><td>" + '<input type=text readonly="true" class="form-control form-rounded input-height accAsgnNetActNumber" style="width: 100px;" value=' + (obj[i].NETWORK === undefined ? '' : obj[i].NETWORK) + '>' +
                                    "</td><td>" + '<input type=text readonly="true" class="form-control form-rounded input-height accAsgnItemNumber" style="width: 100px;" value=' + (obj[i].ITEMNUMBER === undefined ? '' : obj[i].ITEMNUMBER) + '>' +
                                    "</td><td>" + '<input type=text readonly="true" class="form-control form-rounded input-height accAsgnDeliverySchedule" style="width: 100px;" value="' + (obj[i].DELIVERYSCHEDULE === undefined ? "" : obj[i].DELIVERYSCHEDULE) + '">\n\
                                    <input type=hidden class="form-control form-rounded input-height accAsgnLinkNumber" value=' + (obj[i].LINKNUMBER === undefined ? '' : obj[i].LINKNUMBER) + '>' +
                                    "</td></tr>";
                            if (requestFrom === "itemCatDropDown" || requestFrom === "serviceTableCheckbox") {
                                $(".multipleCostCenterDiv").css("display", "block");
                                $(".costCenterDiv").css("display", "none");
                                $("#costCenterAccountAssignmentTablechangeScreenbtn").css("display", "none");
                            }
                        }
                        console.log("Row in getAccountAssignmentByLineItemNumber :" + tdrow);
                        $("#costCenteraccountAssignmentTebleId").children("tbody").append(tdrow);
//                            $("#costCenteraccountAssignmentTebleId tbody tr").each(function(){
//                               var deleteflag = $(this).find("td").eq(0).children(".deleteFlag").val(); 
//                            });
                    }
                }
            } else {
                var PoFrom = $("#PoFrom").val();
                if (PoFrom === "editpo" || PoFrom === "editApprovedPo" || PoFrom === "shortcutPo") {
                    $(".multipleCostCenterDiv").css("display", "none");
                    $(".costCenterDiv").css("display", "block");
                    ArrayIsEmptyOnLineItemChange();
                    $("#costCenterAccountAssignmentchangeScreenbtn").css("display", "");
                    $(".costCenterDiv :input").val("");
                    $("#distribution").val("Single Account Assignment");
                    var gLCode = "";
                    var zGLCOde = "";
                    $("#material_headerClass tbody tr").each(function() {
                        var id = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
                        var insertionid = $("#ItemNumberSelect").val();
                        if (insertionid === id) {
                            gLCode = $(this).find("td").eq(0).children(".prgLCode").val();
                            zGLCOde = $(this).find("td").eq(0).children(".przGLCode").val();
                        }
                    });
                    var category = $("#accountAssignmentCategory").val();
                    if (category !== "Z") {
                        $("#gLAccount").val(gLCode);
//                            $("#gLAccountService").val(gLCode);
                        $("#accAsgnCommItemInput").val(gLCode);
                    }
                    if (category === "Z") {
                        $("#gLAccount").val(zGLCOde);
//                            $("#gLAccountService").val(zGLCOde);
                        $("#accAsgnCommItemInput").val(zGLCOde);
                    }
                }
            }
        }
    });
}

function hidelimitsAccAsgnModelField(reqFrom) {

    $("#costCenterLabel_Limits").css("display", "none");
    $("#costCenterInp_Limits").css("display", "none");
    $("#orderLabel_Limits").css("display", "none");
    $("#orderInp_Limits").css("display", "none");
    $("#assetLabel_Limits").css("display", "none");
    $("#assetInp_Limits").css("display", "none");
    $("#wBSElementLabel_Limits").css("display", "none");
    $("#wBSElementInp_Limits").css("display", "none");
    $("#salesOrderLabel_Limits").css("display", "none");
    $("#salesOrderInp_Limits").css("display", "none");
    $("#itemNumLabel_Limits").css("display", "none");
    $("#itemNumberInp_Limits").css("display", "none");
    $("#delivSchLabel_Limits").css("display", "none");
    $("#delivSchInp_Limits").css("display", "none");
    $("#fundLabel_Limits").css("display", "none");
    $("#fundInp_Limits").css("display", "none");
    $("#functionalAreaLabel_Limits").css("display", "none");
    $("#functionalAreaInp_Limits").css("display", "none");
    $("#fundCenterLabel_Limits").css("display", "none");
    $("#fundCenterInp_Limits").css("display", "none");
    $("#commItemLabel_Limits").css("display", "none");
    $("#commItemServiceInp_Limits").css("display", "none");
    $("#nActNumLabel_Limits").css("display", "none");
    $("#nActNumServiceInp_Limits").css("display", "none");
    $("#gLAccountInp_Limits").prop("disabled", false);
    $("#costCenterInp_Limits").prop("disabled", false);
    $("#orderInp_Limits").prop("disabled", false);
    $("#assetInp_Limits").prop("disabled", false);
    $("#wBSElementInp_Limits").prop("disabled", false);
    $("#salesOrderInp_Limits").prop("disabled", false);
    $("#itemNumberInp_Limits").prop("disabled", false);
    $("#delivSchInp_Limits").prop("disabled", false);
    $("#fundInp_Limits").prop("disabled", false);
    $("#functionalAreaInp_Limits").prop("disabled", false);
    $("#fundCenterInp_Limits").prop("disabled", false);
    $("#commItemServiceInp_Limits").prop("disabled", false);
    $("#nActNumServiceInp_Limits").prop("disabled", false);
    $("#limitsAccountAssignmentForm br").remove();
    var rowCount = limitTabAccAsgnTebleId.rows.length;
    for (var i = rowCount - 1; i >= 0; i--) {
        limitTabAccAsgnTebleId.deleteRow(i);
    }

    var row;
    row = "<tr><th class='border-0 th-color'>" +
            "</th><th class='border-0 th-color'>" + 'Per' +
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
    $("#limitTabAccAsgnTebleId").children("thead").append(row);
    if (reqFrom === 'serviceTableCheckBox') {
//            var serviceLineItemNumber = 10
        var itemCode = $("#ItemNumberSelect").val();
        getLimitAccountAssignmentByServiceLineItemNumberAndLineItemNumber(itemCode);
    }
}

function getLimitAccountAssignmentByServiceLineItemNumberAndLineItemNumber(lineItemNumber) {

    $.ajax({
        type: "GET",
        url: "doajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "getLimitAccountAssignmentByServiceLineItemNumberAndLineItemNumber",
            "lineItemNumber": lineItemNumber
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            var tdrow;
            if (obj.length === 0) {
                var tdrow = "<tr><td>" +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblPercentage" style="width: 60px;" value="100">' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblGLAccount" value="">' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblCOArea" value="">' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblCostCetner" value="">' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblFund" value="">' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblFunctionalArea" value="">' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblFundCenter" value="">' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblCommitmentItem" value="">' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblOrder" value="">' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblAssets" value="">' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblWBSElement" value="">' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblSalesOrder" value="">' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblNetActNumber" value="">' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblItemNumber" value="">' +
                        "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblDeliverySchedule" value="">' +
                        "</td></tr>";
                $("#limitTabAccAsgnTebleId").children("tbody").append(tdrow);
            } else {
                for (var i = 0; i < obj.length; i++) {
                    var distribution = obj[i].DISTRIBUTION;
                    if (distribution === '') {
                        console.log("Distribution Single:" + obj[i].DISTRIBUTION);
                        $("#gLAccountInp_Limits").val(obj[i].GLACCOUNT);
                        $("#coAreaInp_Limits").val(obj[i].COAREA);
                        $("#costCenterInp_Limits").val(obj[i].COSTCENTER);
                        $("#orderInp_Limits").val(obj[i].ORDER);
                        $("#assetInp_Limits").val(obj[i].ASSET);
                        $("#wBSElementInp_Limits").val(obj[i].WBSELEMENT);
                        $("#salesOrderInp_Limits").val(obj[i].SALESORDER);
                        $("#itemNumberInp_Limits").val(obj[i].ITEMNUMBER);
                        $("#delivSchInp_Limits").val(obj[i].DELIVERYSCHEDULE);
                        $("#fundInp_Limits").val(obj[i].FUND);
                        $("#functionalAreaInp_Limits").val(obj[i].FUNCTIONALAREA);
                        $("#fundCenterInp_Limits").val(obj[i].FUNDCENTER);
                        $("#commItemServiceInp_Limits").val(obj[i].COMMITMENTITEM);
                        $("#nActNumServiceInp_Limits").val(obj[i].NETWORK);
//                        $("#ServiceLinkNumberId").val(obj[i].LINKNUMBER);
//                        $("#ServiceNetValueId").val(obj[i].NETVALUE);
                    } else if (distribution === '2') {

                        tdrow += "<tr><td>" + "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblPercentage" style="width: 60px;" value=' + 100 + '>' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblGLAccount" value=' + (obj[i].GLACCOUNT === undefined ? '' : obj[i].GLACCOUNT) + '>' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblCOArea" value=' + (obj[i].COAREA === undefined ? '' : obj[i].COAREA) + '>' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblCostCetner" value=' + (obj[i].COSTCENTER === undefined ? '' : obj[i].COSTCENTER) + '>' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblFund" value=' + (obj[i].FUND === undefined ? '' : obj[i].FUND) + '>' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblFunctionalArea" value=' + (obj[i].FUNCTIONALAREA === undefined ? '' : obj[i].FUNCTIONALAREA) + '>' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblFundCenter" value=' + (obj[i].FUNDCENTER === undefined ? '' : obj[i].FUNDCENTER) + '>' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblCommitmentItem" value=' + (obj[i].COMMITMENTITEM === undefined ? '' : obj[i].COMMITMENTITEM) + '>' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblOrder" value=' + (obj[i].ORDER === undefined ? '' : obj[i].ORDER) + '>' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblAssets" value=' + (obj[i].ASSET === undefined ? '' : obj[i].ASSET) + '>' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblWBSElement" value=' + (obj[i].WBSELEMENT === undefined ? '' : obj[i].WBSELEMENT) + '>' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblSalesOrder" value=' + (obj[i].SALESORDER === undefined ? '' : obj[i].SALESORDER) + '>' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblNetActNumber" value=' + (obj[i].NETWORK === undefined ? '' : obj[i].NETWORK) + '>' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblItemNumber" value=' + (obj[i].ITEMNUMBER === undefined ? '' : obj[i].ITEMNUMBER) + '>' +
                                "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblDeliverySchedule" value=' + (obj[i].DELIVERYSCHEDULE === undefined ? '' : obj[i].DELIVERYSCHEDULE) + '>' +
                                "</td></tr>";
                    }
                }
                $("#limitTabAccAsgnTebleId tbody tr").remove();
                $("#limitTabAccAsgnTebleId tbody").append(tdrow);
            }
        }
    });
}

function getAccountAssignmentValuesByLinkId(linkid) {

    var tdrow = "";
    $.ajax({
        type: "GET",
        url: "ajaxcontroller.do",
        async: false,
        data: {
            "reqFrom": "getCmplxPRToPOLineItemPRAccountAssignmentValuesByLinkId",
            "linkid": linkid
        },
        complete: function(responseJson) {
            var obj = $.parseJSON(responseJson.responseText);
            for (var i = 0; i < obj.length; i++) {
                console.log("Commitment Item :" + obj[i].COMMITMENTITEM);
                console.log("G/L Account :" + obj[i].GLACCOUNT);
            }
            for (var i = 0; i < obj.length; i++) {

                if (obj[i].DISTRIBUTION === 'Single Account Assignment') {
                    console.log("Distribution :" + obj[i].DISTRIBUTION);
                    $("#gLAccountService").val(obj[i].GLACCOUNT);
                    $("#coAreaService").val(obj[i].COAREA);
//                        $("#companyCodeService").val();
                    $("#costCenterService").val(obj[i].COSTCENTER);
                    $("#OrderService").val(obj[i].ORDER);
                    $("#AssetService").val(obj[i].ASSET);
                    $("#WBSElementInputService").val(obj[i].WBSELEMENT);
                    $("#SalesOrderService").val(obj[i].SALESORDER);
                    $("#ItemNumberService").val(obj[i].ITEMNUMBER);
                    $("#DelivSchService").val(obj[i].DELIVERYSCHEDULE);
                    $("#fundService").val(obj[i].FUND);
                    $("#functionalAreaService").val(obj[i].FUNCTIONALAREA);
                    $("#FundCenterServiceInput").val(obj[i].FUNDCENTER);
                    $("#CommItemServiceInput").val(obj[i].COMMITMENTITEM);
                    $("#NActNumServiceInput").val(obj[i].NETWORK);
                } else if (obj[i].DISTRIBUTION === 'Distrib. On Quantity Basis' || obj[i].DISTRIBUTION === 'Distrib. By Percentage') {
                    console.log("Distribution :" + obj[i].DISTRIBUTION);
                    tdrow += "<tr><td>" + "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblQuantity" style="width: 150px;" value=' + formatNumberByComma(obj[i].QUANTITY) + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblPercentage" style="width: 100px;" value=' + obj[i].PERCENTAGE + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblGLAccount" style="width: 100px;" value=' + (obj[i].GLACCOUNT === undefined ? '' : obj[i].GLACCOUNT) + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCOArea" style="width: 100px;" value=' + (obj[i].COAREA === undefined ? '' : obj[i].COAREA) + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCostCetner" style="width: 100px;" value=' + (obj[i].COSTCENTER === undefined ? '' : obj[i].COSTCENTER) + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFund" style="width: 100px;" value=' + (obj[i].FUND === undefined ? '' : obj[i].FUND) + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFunctionalArea" style="width: 100px;" value=' + (obj[i].FUNCTIONALAREA === undefined ? '' : obj[i].FUNCTIONALAREA) + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblFundCenter" style="width: 100px;" value=' + (obj[i].FUNDCENTER === undefined ? '' : obj[i].FUNDCENTER) + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblCommitmentItem" style="width: 100px;" value=' + (obj[i].COMMITMENTITEM === undefined ? '' : obj[i].COMMITMENTITEM) + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblOrder" style="width: 100px;" value=' + (obj[i].ORDER === undefined ? '' : obj[i].ORDER) + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblAssets" style="width: 100px;" value=' + (obj[i].ASSET === undefined ? '' : obj[i].ASSET) + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblWBSElement" style="width: 100px;" value=' + (obj[i].WBSELEMENT === undefined ? '' : obj[i].WBSELEMENT) + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblSalesOrder" style="width: 100px;" value=' + (obj[i].SALESORDER === undefined ? '' : obj[i].SALESORDER) + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblNetActNumber" style="width: 100px;" value=' + (obj[i].NETWORK === undefined ? '' : obj[i].NETWORK) + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblItemNumber" style="width: 100px;" value=' + (obj[i].ITEMNUMBER === undefined ? '' : obj[i].ITEMNUMBER) + '>' +
                            "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblDeliverySchedule" style="width: 100px;" value=' + (obj[i].DELIVERYSCHEDULE === undefined ? '' : obj[i].DELIVERYSCHEDULE) + '>' +
                            "</td></tr>";
                }
            }
            $("#serviceTabAccAsgnTebleId tbody tr").remove();
            $("#serviceTabAccAsgnTebleId tbody").append(tdrow);
        }
    });
}
