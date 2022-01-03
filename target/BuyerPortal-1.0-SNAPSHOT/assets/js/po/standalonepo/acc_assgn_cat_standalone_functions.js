/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function callOnlyMainAcAsgnFun(accountAssignmentCategory, reqFrom) {
    if (accountAssignmentCategory === 'K') {
        accAsgnCat_K_Dist_SAA(reqFrom);
    } else if (accountAssignmentCategory === 'N') {
        accAsgnCat_N_Dist_SAA(reqFrom);
    } else if (accountAssignmentCategory === 'A') {
        accAsgnCat_A_Dist_SAA(reqFrom);
    } else if (accountAssignmentCategory === 'B') {
        accAsgnCat_B_Dist_SAA(reqFrom);
    } else if (accountAssignmentCategory === 'C') {
        accAsgnCat_C_Dist_SAA(reqFrom);
    } else if (accountAssignmentCategory === 'D') {
        accAsgnCat_D_Dist_SAA(reqFrom);
    } else if (accountAssignmentCategory === 'E') {
        accAsgnCat_E_Dist_SAA(reqFrom);
    } else if (accountAssignmentCategory === 'F') {
        accAsgnCat_F_Dist_SAA(reqFrom);
    } else if (accountAssignmentCategory === 'G') {
        accAsgnCat_G_Dist_SAA(reqFrom);
    } else if (accountAssignmentCategory === 'M') {
        accAsgnCat_M_Dist_SAA(reqFrom);
    } else if (accountAssignmentCategory === 'P') {
        accAsgnCat_P_Dist_SAA(reqFrom);
    } else if (accountAssignmentCategory === 'Q') {
        accAsgnCat_Q_Dist_SAA(reqFrom);
    } else if (accountAssignmentCategory === 'R') {
        accAsgnCat_R_Dist_SAA(reqFrom);
    } else if (accountAssignmentCategory === 'T') {
        accAsgnCat_T_Dist_SAA(reqFrom);
    } else if (accountAssignmentCategory === 'U') {
        accAsgnCat_U_Dist_SAA(reqFrom);
    } else if (accountAssignmentCategory === 'X') {
        accAsgnCat_X_Dist_SAA(reqFrom);
    } else if (accountAssignmentCategory === 'Z') {
        accAsgnCat_Z_Dist_SAA(reqFrom);
    }
}

function callAllAcAsgnFun(accountAssignmentCategory, reqFrom) {
    if (accountAssignmentCategory === 'K') {
        accAsgnCat_K_Dist_SAA(reqFrom);
        service_AccAsgnCat_K(reqFrom);
        limits_AccAsgnCat_K(reqFrom);
    } else if (accountAssignmentCategory === 'N') {
        accAsgnCat_N_Dist_SAA(reqFrom);
        service_AccAsgnCat_N(reqFrom);
        limits_AccAsgnCat_N(reqFrom);
    } else if (accountAssignmentCategory === 'A') {
        accAsgnCat_A_Dist_SAA(reqFrom);
        service_AccAsgnCat_A(reqFrom);
        limits_AccAsgnCat_A(reqFrom);
    } else if (accountAssignmentCategory === 'B') {
        accAsgnCat_B_Dist_SAA(reqFrom);
    } else if (accountAssignmentCategory === 'C') {
        accAsgnCat_C_Dist_SAA(reqFrom);
        service_AccAsgnCat_C(reqFrom);
        limits_AccAsgnCat_C(reqFrom);
    } else if (accountAssignmentCategory === 'D') {
        accAsgnCat_D_Dist_SAA(reqFrom);
    } else if (accountAssignmentCategory === 'E') {
        accAsgnCat_E_Dist_SAA(reqFrom);
    } else if (accountAssignmentCategory === 'F') {
        accAsgnCat_F_Dist_SAA(reqFrom);
        service_AccAsgnCat_F(reqFrom);
        limits_AccAsgnCat_F(reqFrom);
    } else if (accountAssignmentCategory === 'G') {
        accAsgnCat_G_Dist_SAA(reqFrom);
    } else if (accountAssignmentCategory === 'M') {
        accAsgnCat_M_Dist_SAA(reqFrom);
    } else if (accountAssignmentCategory === 'P') {
        accAsgnCat_P_Dist_SAA(reqFrom);
        service_AccAsgnCat_P(reqFrom);
        limits_AccAsgnCat_P(reqFrom);
    } else if (accountAssignmentCategory === 'Q') {
        accAsgnCat_Q_Dist_SAA(reqFrom);
    } else if (accountAssignmentCategory === 'R') {
        accAsgnCat_R_Dist_SAA(reqFrom);
        service_AccAsgnCat_R(reqFrom);
        limits_AccAsgnCat_R(reqFrom);
    } else if (accountAssignmentCategory === 'T') {
        accAsgnCat_T_Dist_SAA(reqFrom);
    } else if (accountAssignmentCategory === 'U') {
        accAsgnCat_U_Dist_SAA(reqFrom);
    } else if (accountAssignmentCategory === 'X') {
        accAsgnCat_X_Dist_SAA(reqFrom);
        service_AccAsgnCat_X(reqFrom);
        limits_AccAsgnCat_X(reqFrom);
    } else if (accountAssignmentCategory === 'Z') {
        accAsgnCat_Z_Dist_SAA(reqFrom);
        service_AccAsgnCat_Z(reqFrom);
        limits_AccAsgnCat_Z(reqFrom);
    }
}

function callOnlyLimitAcAsgnFun(accountAssignmentCategory, reqFrom) {
    if (accountAssignmentCategory === 'K') {
        limits_AccAsgnCat_K(reqFrom);
    } else if (accountAssignmentCategory === 'N') {
        limits_AccAsgnCat_N(reqFrom);
    } else if (accountAssignmentCategory === 'A') {
        limits_AccAsgnCat_A(reqFrom);
    } else if (accountAssignmentCategory === 'C') {
        limits_AccAsgnCat_C(reqFrom);
    } else if (accountAssignmentCategory === 'F') {
        limits_AccAsgnCat_F(reqFrom);
    } else if (accountAssignmentCategory === 'P') {
        limits_AccAsgnCat_P(reqFrom);
    } else if (accountAssignmentCategory === 'R') {
        limits_AccAsgnCat_R(reqFrom);
    } else if (accountAssignmentCategory === 'X') {
        limits_AccAsgnCat_X(reqFrom);
    } else if (accountAssignmentCategory === 'Z') {
        limits_AccAsgnCat_Z(reqFrom);
    }
}

//Account Assignment Function Start
function accAsgnCat_K_Dist_SAA(reqFrom) {
    hideAllField();
    blockAllFields(reqFrom);
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

function accAsgnCat_N_Dist_SAA(reqFrom) {
    hideAllField();
    blockAllFields(reqFrom);
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
function accAsgnCat_A_Dist_SAA(reqFrom) {
    hideAllField();
    blockAllFields(reqFrom);
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
function accAsgnCat_B_Dist_SAA(reqFrom) {

    hideAllField();
    blockAllFields(reqFrom);
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
function accAsgnCat_C_Dist_SAA(reqFrom) {
    hideAllField();
    blockAllFields(reqFrom);
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
function accAsgnCat_D_Dist_SAA(reqFrom) {

    hideAllField();
    blockAllFields(reqFrom);
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
function accAsgnCat_E_Dist_SAA(reqFrom) {

    hideAllField();
    blockAllFields(reqFrom);
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
function accAsgnCat_F_Dist_SAA(reqFrom) {

    hideAllField();
    blockAllFields(reqFrom);
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
function accAsgnCat_G_Dist_SAA(reqFrom) {
    hideAllField();
    blockAllFields(reqFrom);
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
function accAsgnCat_M_Dist_SAA(reqFrom) {
    hideAllField();
    blockAllFields(reqFrom);
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
function accAsgnCat_P_Dist_SAA(reqFrom) {
    hideAllField();
    blockAllFields(reqFrom);
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
function accAsgnCat_Q_Dist_SAA(reqFrom) {
    hideAllField();
    blockAllFields(reqFrom);
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
function accAsgnCat_R_Dist_SAA(reqFrom) {
    hideAllField();
    blockAllFields(reqFrom);
    $("#accAsgn_li").css("display", "block");
    $("#costCenteraccountAssignmentTebleId tbody tr").each(function() {
        $(this).find("td").eq(12).css("display", "none");
        $(this).find("td").eq(13).css("display", "none");
        $(this).find("td").eq(14).css("display", "none");
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
    $("#costCenteraccountAssignmentTebleId thead tr").find("th").eq(14).css("display", "none");
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
function accAsgnCat_T_Dist_SAA(reqFrom) {
    hideAllField();
    blockAllFields(reqFrom);
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
function accAsgnCat_U_Dist_SAA() {
    hideAllField();
    if ($("#account_assignment").hasClass("active") === true) {

        $("#accAsgn_li").css("display", "none");
        $("#account_assignment-tab").removeClass("active");
        $("#account_assignment").removeClass("active");
//        $("#quantities").addClass("active");
//        $("#quantities-tab").addClass("active");
//        $("#quantities-tab").addClass("show");
        $("#material_linelevel").addClass("active");
        $("#material_linelevel-tab").addClass("active");
        $("#material_linelevel-tab").addClass("show");
    } else {
        $("#accAsgn_li").css("display", "none");
    }

    $("#profitabilitysegmentmodelbtn").css("display", "none");
}
function accAsgnCat_X_Dist_SAA(reqFrom) {
    hideAllField();
    blockAllFields(reqFrom);
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
function accAsgnCat_Z_Dist_SAA(reqFrom) {
    $("#unloadingPointLabel").css("display", "none");
    $("#unloadingPoint").css("display", "none");
    $("#recipientLabel").css({
        "margin-left": "5px"
    });
    $("#recipient").css({
        "margin-left": "20px"
    });
    hideAllField();
    blockAllFields(reqFrom);
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
//Account Assignment Function End
//Bittu Account Assignment Hide function Start
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
    $("#gLAccount").prop("disabled", true);
    //    $("#coArea").prop("disabled", false);
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
    var rowCount = costCenteraccountAssignmentTebleId.rows.length;
    for (var i = rowCount - 1; i >= 0; i--) {
        costCenteraccountAssignmentTebleId.deleteRow(i);
        if (i === 0) {
            return false;
        }
    }
}
//Bittu Account Assignment Hide Function End
//Bittu Account Assignment Block Function Start
function blockAllFields(reqFrom) {
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
    var linkid;
    var accAsgn;
    $("#material_headerClass tbody tr").each(function() {
        var dropDownItemNumber = $("#ItemNumberSelect").val();
        var prTableItemNumber = $(this).find("td").eq(1).html();
        if (prTableItemNumber === dropDownItemNumber) {
            accAsgn = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
            linkid = $(this).find("td").eq(0).children(".linkid").val();
        }
    });
    if (reqFrom === "afterSave") {
        getNGBPCmplxPOCreationLineItemPOAccountAssignment(linkid);
    } else if (reqFrom === 'itemCatDropDown' || reqFrom === 'lineTable') {
        getNGBPCmplxPOCreationLineItemPOAccountAssignmentOnLineItemChange(linkid, reqFrom);
    } else {
        var quantity = "";
        $("#material_headerClass tbody tr").each(function() {
            var dropDownItemNumber = $("#ItemNumberSelect").val();
            var prTableItemNumber = $(this).find("td").eq(1).html();
            if (prTableItemNumber === dropDownItemNumber) {
                quantity = removeCommaInNumber($(this).find("td").eq(8).children(".quantity_Class").val());
            }
        });
        var percentage = 100;
        var unloadingPoint = $("#unloadingPoint").val();
        var recipient = $("#recipient").val();
        var glCode = $("#gLAccount").val();
        var coArea = $("#coArea").val();
        var costCenterAccAsgn = $("#costCenterAccAsgn").val();
        var accAsgnOrder = $("#accAsgnOrder").val();
        var accAsgnAsset = $("#accAsgnAsset").val();
        var accAsgnWBSElementInput = $("#accAsgnWBSElementInput").val();
        var accAsgnSalesOrder = $("#accAsgnSalesOrder").val();
        var assAsgnItemNumber = $("#assAsgnItemNumber").val();
        var assAsgnDelivSch = $("#assAsgnDelivSch").val();
        var accAsgnfund = $("#accAsgnfund").val();
        var accAsgnfunctionalArea = $("#accAsgnfunctionalArea").val();
        var accAsgnFundCenterInput = $("#accAsgnFundCenterInput").val();
        var accAsgnCommItemInput = $("#accAsgnCommItemInput").val();
        var accAsgnNActNumInput = $("#accAsgnNActNumInput").val();
        console.log("unloadingPoint :" + unloadingPoint);
        console.log("recipient :" + recipient);
        console.log("coArea :" + coArea);
        console.log("costCenterAccAsgn :" + costCenterAccAsgn);
        console.log("accAsgnOrder :" + accAsgnOrder);
        console.log("accAsgnAsset :" + accAsgnAsset);
        console.log("accAsgnWBSElementInput :" + accAsgnWBSElementInput);
        console.log("accAsgnSalesOrder :" + accAsgnSalesOrder);
        console.log("assAsgnItemNumber :" + assAsgnItemNumber);
        console.log("assAsgnDelivSch :" + assAsgnDelivSch);
        console.log("accAsgnfund :" + accAsgnfund);
        console.log("accAsgnfunctionalArea :" + accAsgnfunctionalArea);
        console.log("accAsgnFundCenterInput :" + accAsgnFundCenterInput);
        console.log("accAsgnCommItemInput :" + accAsgnCommItemInput);
        console.log("accAsgnNActNumInput :" + accAsgnNActNumInput);
        var tdrow = "";
        tdrow += "<tr><td>" + "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnQuantity" style="width: 150px;" value="' + formatNumberByComma(quantity) + '">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnPercentage" style="width: 100px;" value="' + formatAmountByComma(percentage) + '">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnGLAccount" style="width: 100px;" value="' + glCode + '">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnCOArea" style="width: 100px;" value="' + coArea + '">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnCostCetner" style="width: 100px;" value="' + costCenterAccAsgn + '">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnFund" style="width: 100px;" value="' + accAsgnfund + '">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnFunctionalArea" style="width: 100px;" value="' + accAsgnfunctionalArea + '">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnFundCenter" style="width: 100px;" value="' + accAsgnFundCenterInput + '">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnCommitmentItem" style="width: 100px;" value="' + accAsgnCommItemInput + '">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnUnloadingPoint" style="width: 100px;" value="' + unloadingPoint + '">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnRecipients" style="width: 100px;" value="' + recipient + '">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnOrder" style="width: 100px;" value="' + accAsgnOrder + '">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnAssets" style="width: 100px;" value="' + accAsgnAsset + '">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnWBSElement" style="width: 100px;" value="' + accAsgnWBSElementInput + '">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnSalesOrder" style="width: 100px;" value="' + accAsgnSalesOrder + '">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnNetActNumber" style="width: 100px;" value="' + accAsgnNActNumInput + '">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnItemNumber" style="width: 100px;" value="' + assAsgnItemNumber + '">' +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height accAsgnDeliverySchedule" style="width: 100px;" value="' + assAsgnDelivSch + '">' +
                "</td></tr>";
        $("#costCenteraccountAssignmentTebleId").children("tbody").append(tdrow);
    }
}
//Bittu Account Assignment Block Function End

//Bittu Service Account Assignment function start
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
//Bittu Service Account Assignemnt function End


//Bittu hideServiceAccAsgnField function start
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
        var tdrow = "<tr><td>" + "</td><td>" + '<input type=text class="form-control form-rounded input-height serviceAccAsgnTblQuantity" value="" style="width: 150px;">' +
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
        getNGBPCmplxPOCreationLineItemPOAccountAssignmentValuesByLinkIdAndServiceLineItemNumber(linkid, serviceLineItemNumber, PoId);
    }

}
//Bittu hideServiceAccAsgnField function End

//Bittu showServiceAssignmentField function Start
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

//Bittu showServiceAssignmentField function End


//Bittu Limit Account Assignment function start
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
//Bittu Limit Account Assignment function End

//Bittu hidelimitsAccAsgnModelField function Start
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
    if (reqFrom === 'limitButton') {
        var linkid;
        $("#material_headerClass tbody tr").each(function() {
            var dropDownItemNumber = $("#ItemNumberSelect").val();
            var prTableItemNumber = $(this).find("td").eq(1).html();
            if (prTableItemNumber === dropDownItemNumber) {
                linkid = $(this).find("td").eq(0).children(".linkid").val();
            }
        });
        $.ajax({
            type: "GET",
            url: "poajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "getLimitAccountAssignemntByLinkId",
                "linkid": linkid
            },
            complete: function(responseJson) {
                var jsonArr = $.parseJSON(responseJson.responseText);
                jsonArr = JSON.parse(JSON.stringify(jsonArr));
                var row = "";
                console.log("Limit length :" + jsonArr.length);
                if (jsonArr.length > 0) {
                    $("#gLAccountInp_Limits").val(jsonArr[i].GLACCOUNT);
                    $("#coAreaInp_Limits").val(jsonArr[i].cOArea === undefined ? '' : jsonArr[i].cOArea);
                    $("#costCenterInp_Limits").val(jsonArr[i].costCenter === undefined ? '' : jsonArr[i].costCenter);
                    $("#orderInp_Limits").val(jsonArr[i].limitAccAsgnTblOrder === undefined ? '' : jsonArr[i].limitAccAsgnTblOrder);
                    $("#assetInp_Limits").val(jsonArr[i].asset === undefined ? '' : jsonArr[i].asset);
                    $("#wBSElementInp_Limits").val(jsonArr[i].wBSElement === undefined ? '' : jsonArr[i].wBSElement);
                    $("#salesOrderInp_Limits").val(jsonArr[i].salesOrder === undefined ? '' : jsonArr[i].salesOrder);
                    $("#itemNumberInp_Limits").val(jsonArr[i].itemNumber === undefined ? '' : jsonArr[i].itemNumber);
                    $("#delivSchInp_Limits").val(jsonArr[i].deliverySchedule === undefined ? '' : jsonArr[i].deliverySchedule);
                    $("#fundInp_Limits").val(jsonArr[i].fund === undefined ? '' : jsonArr[i].fund);
                    $("#functionalAreaInp_Limits").val(jsonArr[i].functionalArea === undefined ? '' : jsonArr[i].functionalArea);
                    $("#fundCenterInp_Limits").val(jsonArr[i].fundCenter === undefined ? '' : jsonArr[i].fundCenter);
                    $("#commItemServiceInp_Limits").val(jsonArr[i].commitmentItem === undefined ? '' : jsonArr[i].commitmentItem);
                    $("#nActNumServiceInp_Limits").val(jsonArr[i].netActNumber === undefined ? '' : jsonArr[i].netActNumber);
                } else {

                }
            }
        });
    } else {
        var tdrow = "<tr><td>" +
                "</td><td>" + '<input type=text class="form-control form-rounded input-height limitAccAsgnTblPercentage" value="100">' +
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
    }
}
//Bittu hidelimitsAccAsgnModelField function End

//Bittu showLimitTabModelField function Start
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

//Bittu showLimitTabModelField function End
