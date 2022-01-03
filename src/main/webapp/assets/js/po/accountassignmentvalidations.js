/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//$(document).ready(function() {
//
//});

var lobiboxNotifyAlert = null;
function lineLevelValidation(distribution, accountAssignment, reqFrom) {
    var unloadingPoint = "";
    var recipient = "";
    var gLAccount = "";
    var coArea = "";
    var costCenter = "";
    var order = "";
    var asset = "";
    var wBSElement = "";
    var salesOrder = "";
    var itemNumber = "";
    var deliverySchedule = "";
    var fund = "";
    var functionalAear = "";
    var fundCenter = "";
    var commitmentItem = "";
    var network = "";
    var profitabilitySegment = "";
    var errorMsg = "";
    var isCorrect = "Yes";

//SUNNY KUMAR PRAJAPATI
    var accAsgn = "";
    var itemCat = "";
    var prTableItemNumber = "";
    $("#material_headerClass tbody tr").each(function() {
        var dropDownItemNumber = $("#ItemNumberSelect").val();
//        prTableItemNumber = $(this).find("td").eq(1).html();
        if(reqFrom === "standalone"){
            prTableItemNumber = $(this).find("td").eq(1).html();
        } else if(reqFrom === "pr"){
            prTableItemNumber = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
        }
//        alert("prTableItemNumber :" + prTableItemNumber + " ,dropDownItemNumber :" + dropDownItemNumber);
        if (prTableItemNumber === dropDownItemNumber) {
            accAsgn = $(this).find("td").eq(2).children(".accountAssignmentClass").val();
            itemCat = $(this).find("td").eq(3).children(".itemCategoryClass").val();
        }
    });
//    alert("accAsgn :" + accAsgn + " ,itemCat :" + itemCat);
    var poType = $("#typeOfPOHeader").val();
    if (poType === "Inter Company" && accAsgn === "" && itemCat === "") {
    } else {
        if (accountAssignment === "A" || accountAssignment === "B" || accountAssignment === "C" || accountAssignment === "D" || accountAssignment === "E"
                || accountAssignment === "F" || accountAssignment === "G" || accountAssignment === "K" || accountAssignment === "M" || accountAssignment === "N"
                || accountAssignment === "P" || accountAssignment === "Q" || accountAssignment === "R" || accountAssignment === "T" || accountAssignment === "X"
                || accountAssignment === "Z") {
            //Unloading Point

            
            if (distribution === "Single Account Assignment") {
                unloadingPoint = $("#unloadingPoint").val();
                recipient = $("#recipient").val();
                gLAccount = $("#gLAccount").val();
                order = $("#accAsgnOrder").val();
                asset = $("#accAsgnAsset").val();

                /*Edited by Bittu on 15/09/2020*/

//                if (accountAssignment !== "Z") {
//                    if (unloadingPoint === "") {
//                        if (lobiboxNotifyAlert !== null)
//                        {
//                            lobiboxNotifyAlert.remove();
//                        }
//                        errorMsg = "Please enter Unoading Point in Account Assignment Tab!";
//                        $("#unloadingPoint").css("border-color", "red");
//                        lobiboxNotifyAlert = Lobibox.notify("error", {
//                            rounded: true,
//                            delayIndicator: false,
//                            msg: errorMsg
//                        });
//                        isCorrect = "No";
//                        $("#account_assignment").addClass("active");
//                        $("#account_assignment-tab").addClass("active");
//                        $("#account_assignment-tab").addClass("show");
//                        return false;
//                    }
//                }


                //Recipeint
//                if (recipient === "") {
//                    if (lobiboxNotifyAlert !== null)
//                    {
//                        lobiboxNotifyAlert.remove();
//                    }
//                    errorMsg = "Please enter recipient in Account Assignment Tab!";
//                    $("#recipient").css("border-color", "red");
//                    lobiboxNotifyAlert = Lobibox.notify("error", {
//                        rounded: true,
//                        delayIndicator: false,
//                        msg: errorMsg
//                    });
//                    isCorrect = "No";
//                    $("#account_assignment").addClass("active");
//                    $("#account_assignment-tab").addClass("active");
//                    $("#account_assignment-tab").addClass("show");
//                    return false;
//                }
                //GL Account
                if (accountAssignment !== "K" && accountAssignment !== "A") {
                    if (gLAccount === "") {
                        if (lobiboxNotifyAlert !== null)
                        {
                            lobiboxNotifyAlert.remove();
                        }
                        errorMsg = "Please enter GL Account in Account Assignment Tab!";
                        $("#gLAccount").css("border-color", "red");
                        lobiboxNotifyAlert = Lobibox.notify("error", {
                            rounded: true,
                            delayIndicator: false,
                            msg: errorMsg
                        });
                        isCorrect = "No";
                        $("#account_assignment").addClass("active");
                        $("#account_assignment-tab").addClass("active");
                        $("#account_assignment-tab").addClass("show");
                        return false;
                    }
                }

                if (accountAssignment === "K" || accountAssignment === "T" || accountAssignment === "X") {
                    costCenter = $("#costCenterAccAsgn").val();
                    if (costCenter === "") {
                        if (lobiboxNotifyAlert !== null)
                        {
                            lobiboxNotifyAlert.remove();
                        }
                        errorMsg = "Please enter Cost Center in Account Assignment Tab!";
                        $("#costCenterAccAsgn").css("border-color", "red");
                        lobiboxNotifyAlert = Lobibox.notify("error", {
                            rounded: true,
                            delayIndicator: false,
                            msg: errorMsg
                        });
                        isCorrect = "No";
                        $("#account_assignment").addClass("active");
                        $("#account_assignment-tab").addClass("active");
                        $("#account_assignment-tab").addClass("show");
                        return false;
                    }
                }

                if (accountAssignment === "A" || accountAssignment === "F" || accountAssignment === "T" || accountAssignment === "X" || accountAssignment === "Z") {
                    if (order === "") {
                        if (lobiboxNotifyAlert !== null)
                        {
                            lobiboxNotifyAlert.remove();
                        }
                        errorMsg = "Please enter Order in Account Assignment Tab!";
                        $("#accAsgnOrder").css("border-color", "red");
                        lobiboxNotifyAlert = Lobibox.notify("error", {
                            rounded: true,
                            delayIndicator: false,
                            msg: errorMsg
                        });
                        isCorrect = "No";
                        $("#account_assignment").addClass("active");
                        $("#account_assignment-tab").addClass("active");
                        $("#account_assignment-tab").addClass("show");
                        return false;
                    }
                }
                if (accountAssignment === "A") {
                    if (asset === "") {
                        if (lobiboxNotifyAlert !== null)
                        {
                            lobiboxNotifyAlert.remove();
                        }
                        errorMsg = "Please enter Asset in Account Assignment Tab!";
                        $("#accAsgnAsset").css("border-color", "red");
                        lobiboxNotifyAlert = Lobibox.notify("error", {
                            rounded: true,
                            delayIndicator: false,
                            msg: errorMsg
                        });
                        isCorrect = "No";
                        $("#account_assignment").addClass("active");
                        $("#account_assignment-tab").addClass("active");
                        $("#account_assignment-tab").addClass("show");
                        return false;
                    }
                }
                if (accountAssignment === "D" || accountAssignment === "P" || accountAssignment === "Q" || accountAssignment === "T" || accountAssignment === "X") {
                    wBSElement = $("#accAsgnWBSElementInput").val();
                    if (wBSElement === "") {
                        if (lobiboxNotifyAlert !== null)
                        {
                            lobiboxNotifyAlert.remove();
                        }
                        errorMsg = "Please enter WBS Element in Account Assignment Tab!";
                        $("#accAsgnWBSElementInput").css("border-color", "red");
                        lobiboxNotifyAlert = Lobibox.notify("error", {
                            rounded: true,
                            delayIndicator: false,
                            msg: errorMsg
                        });
                        isCorrect = "No";
                        $("#account_assignment").addClass("active");
                        $("#account_assignment-tab").addClass("active");
                        $("#account_assignment-tab").addClass("show");
                        return false;
                    }
                }

                if (accountAssignment === "C" || accountAssignment === "D" || accountAssignment === "E" || accountAssignment === "M"
                        || accountAssignment === "T" || accountAssignment === "X") {
                    salesOrder = $("#accAsgnSalesOrder").val();

                    if (salesOrder === "") {
                        if (lobiboxNotifyAlert !== null)
                        {
                            lobiboxNotifyAlert.remove();
                        }
                        errorMsg = "Please enter Sales Order in Account Assignment Tab!";
                        $("#accAsgnSalesOrder").css("border-color", "red");
                        lobiboxNotifyAlert = Lobibox.notify("error", {
                            rounded: true,
                            delayIndicator: false,
                            msg: errorMsg
                        });
                        isCorrect = "No";
                        $("#account_assignment").addClass("active");
                        $("#account_assignment-tab").addClass("active");
                        $("#account_assignment-tab").addClass("show");
                        return false;
                    }

                }
                if (accountAssignment === "C" || accountAssignment === "D" || accountAssignment === "E" || accountAssignment === "M" || accountAssignment === "R"
                        || accountAssignment === "T" || accountAssignment === "X") {

                    itemNumber = $("#assAsgnItemNumber").val();
                    deliverySchedule = $("#assAsgnDelivSch").val();
                    if (itemNumber === "") {
                        if (lobiboxNotifyAlert !== null)
                        {
                            lobiboxNotifyAlert.remove();
                        }
                        errorMsg = "Please enter Item Number in Account Assignment Tab!";
                        $("#assAsgnItemNumber").css("border-color", "red");
                        lobiboxNotifyAlert = Lobibox.notify("error", {
                            rounded: true,
                            delayIndicator: false,
                            msg: errorMsg
                        });
                        isCorrect = "No";
                        $("#account_assignment").addClass("active");
                        $("#account_assignment-tab").addClass("active");
                        $("#account_assignment-tab").addClass("show");
                        return false;
                    }
                    if (deliverySchedule === "") {
                        if (lobiboxNotifyAlert !== null)
                        {
                            lobiboxNotifyAlert.remove();
                        }
                        errorMsg = "Please enter Delivery Schedule in Account Assignment Tab!";
                        $("#assAsgnDelivSch").css("border-color", "red");
                        lobiboxNotifyAlert = Lobibox.notify("error", {
                            rounded: true,
                            delayIndicator: false,
                            msg: errorMsg
                        });
                        isCorrect = "No";
                        $("#account_assignment").addClass("active");
                        $("#account_assignment-tab").addClass("active");
                        $("#account_assignment-tab").addClass("show");
                        return false;
                    }
                }
                if (accountAssignment === "T") {
                    commitmentItem = $("#accAsgnCommItemInput").val();
                    if (commitmentItem === "") {
                        if (lobiboxNotifyAlert !== null)
                        {
                            lobiboxNotifyAlert.remove();
                        }
                        errorMsg = "Please enter Commitment Item in Account Assignment Tab!";
                        $("#accAsgnCommItemInput").css("border-color", "red");
                        lobiboxNotifyAlert = Lobibox.notify("error", {
                            rounded: true,
                            delayIndicator: false,
                            msg: errorMsg
                        });
                        isCorrect = "No";
                        $("#account_assignment").addClass("active");
                        $("#account_assignment-tab").addClass("active");
                        $("#account_assignment-tab").addClass("show");
                        return false;
                    }
                }
                if (accountAssignment === "N" || accountAssignment === "P" || accountAssignment === "T") {
                    network = $("#accAsgnNActNumInput").val();
                    if (network === "") {
                        if (lobiboxNotifyAlert !== null)
                        {
                            lobiboxNotifyAlert.remove();
                        }
                        errorMsg = "Please enter Network/Activity in Account Assignment Tab!";
                        $("#accAsgnNActNumInput").css("border-color", "red");
                        lobiboxNotifyAlert = Lobibox.notify("error", {
                            rounded: true,
                            delayIndicator: false,
                            msg: errorMsg
                        });
                        isCorrect = "No";
                        $("#account_assignment").addClass("active");
                        $("#account_assignment-tab").addClass("active");
                        $("#account_assignment-tab").addClass("show");
                        return false;
                    }
                }
            } else if (distribution === "Distrib. On Quantity Basis" || distribution === "Distrib. By Percentage") {
                var rows = $("#costCenteraccountAssignmentTebleId tbody tr");
                var accAsgnLen = $("#costCenteraccountAssignmentTebleId tbody tr").length;
                for (var i = 0; i < accAsgnLen; i++) {
                    unloadingPoint = $(rows[i]).find('td').eq(10).children(".accAsgnUnloadingPoint").val();
                    recipient = $(rows[i]).find('td').eq(11).children(".accAsgnRecipients").val();
                    gLAccount = $(rows[i]).find('td').eq(3).children(".accAsgnGLAccount").val();
                    costCenter = $(rows[i]).find('td').eq(5).children(".accAsgnCostCetner").val();

                    if (accountAssignment === "K" || accountAssignment === "T" || accountAssignment === "X") {
                        if (costCenter === "") {
                            if (lobiboxNotifyAlert !== null)
                            {
                                lobiboxNotifyAlert.remove();
                            }
                            errorMsg = "Please enter Cost Center in Account Assignment Tab!";
                            $(rows[i]).find('td').eq(5).children(".accAsgnCostCetner").css("border-color", "red");
                            lobiboxNotifyAlert = Lobibox.notify("error", {
                                rounded: true,
                                delayIndicator: false,
                                msg: errorMsg
                            });
                            isCorrect = "No";
                            $("#account_assignment").addClass("active");
                            $("#account_assignment-tab").addClass("active");
                            $("#account_assignment-tab").addClass("show");
                            return false;
                        }
                    }
                    if (accountAssignment === "T") {
                        commitmentItem = $(rows[i]).find('td').eq(9).children(".accAsgnCommitmentItem").val();
                        if (commitmentItem === "") {
                            if (lobiboxNotifyAlert !== null)
                            {
                                lobiboxNotifyAlert.remove();
                            }
                            errorMsg = "Please enter Commitment Item in Account Assignment Tab!";
                            $(rows[i]).find('td').eq(9).children(".accAsgnCommitmentItem").css("border-color", "red");
                            lobiboxNotifyAlert = Lobibox.notify("error", {
                                rounded: true,
                                delayIndicator: false,
                                msg: errorMsg
                            });
                            isCorrect = "No";
                            $("#account_assignment").addClass("active");
                            $("#account_assignment-tab").addClass("active");
                            $("#account_assignment-tab").addClass("show");
                            return false;
                        }
                    }

                    /*Edited by Bittu on 15/09/2020*/

//                    if (accountAssignment !== "Z") {
//                        if (unloadingPoint === "") {
//                            if (lobiboxNotifyAlert !== null)
//                            {
//                                lobiboxNotifyAlert.remove();
//                            }
//                            errorMsg = "Please enter Unoading Point in Account Assignment Tab!";
//                            $(rows[i]).find('td').eq(10).children(".accAsgnUnloadingPoint").css("border-color", "red");
//                            lobiboxNotifyAlert = Lobibox.notify("error", {
//                                rounded: true,
//                                delayIndicator: false,
//                                msg: errorMsg
//                            });
//                            isCorrect = "No";
//                            $("#account_assignment").addClass("active");
//                            $("#account_assignment-tab").addClass("active");
//                            $("#account_assignment-tab").addClass("show");
//                            return false;
//                        }
//                    }

//                    if (recipient === "") {
//                        if (lobiboxNotifyAlert !== null)
//                        {
//                            lobiboxNotifyAlert.remove();
//                        }
//                        errorMsg = "Please enter recipient in Account Assignment Tab!";
//                        $(rows[i]).find('td').eq(11).children(".accAsgnRecipients").css("border-color", "red");
//                        lobiboxNotifyAlert = Lobibox.notify("error", {
//                            rounded: true,
//                            delayIndicator: false,
//                            msg: errorMsg
//                        });
//                        isCorrect = "No";
//                        $("#account_assignment").addClass("active");
//                        $("#account_assignment-tab").addClass("active");
//                        $("#account_assignment-tab").addClass("show");
//                        return false;
//                    }
                    if (accountAssignment !== "K" && accountAssignment !== "A") {
                        if (gLAccount === "") {
                            if (lobiboxNotifyAlert !== null)
                            {
                                lobiboxNotifyAlert.remove();
                            }
                            errorMsg = "Please enter GL Account in Account Assignment Tab!";
                            gLAccount = $(rows[i]).find('td').eq(3).children(".accAsgnGLAccount").css("border-color", "red");
                            lobiboxNotifyAlert = Lobibox.notify("error", {
                                rounded: true,
                                delayIndicator: false,
                                msg: errorMsg
                            });
                            isCorrect = "No";
                            $("#account_assignment").addClass("active");
                            $("#account_assignment-tab").addClass("active");
                            $("#account_assignment-tab").addClass("show");
                            return false;
                        }
                    }
                    order = $(rows[i]).find('td').eq(12).children(".accAsgnOrder").val();
//                    alert("accountAssignment :" + accountAssignment + "order :" + order);
                    if (accountAssignment === "A" || accountAssignment === "F" || accountAssignment === "T" || accountAssignment === "X"
                            || accountAssignment === "Z") {
                        if (order === "") {
                            if (lobiboxNotifyAlert !== null)
                            {
                                lobiboxNotifyAlert.remove();
                            }
                            errorMsg = "Please enter Order in Account Assignment Tab!";
                            $(rows[i]).find('td').eq(12).children(".accAsgnOrder").css("border-color", "red");
                            lobiboxNotifyAlert = Lobibox.notify("error", {
                                rounded: true,
                                delayIndicator: false,
                                msg: errorMsg
                            });
                            isCorrect = "No";
                            $("#account_assignment").addClass("active");
                            $("#account_assignment-tab").addClass("active");
                            $("#account_assignment-tab").addClass("show");
                            return false;
                        }
                    }
                    asset = $(rows[i]).find('td').eq(13).children(".accAsgnAssets").val();
                    if (accountAssignment === "A") {
                        if (asset === "") {
                            if (lobiboxNotifyAlert !== null)
                            {
                                lobiboxNotifyAlert.remove();
                            }
                            errorMsg = "Please enter Asset in Account Assignment Tab!";
                            $(rows[i]).find('td').eq(13).children(".accAsgnAssets").css("border-color", "red");
                            lobiboxNotifyAlert = Lobibox.notify("error", {
                                rounded: true,
                                delayIndicator: false,
                                msg: errorMsg
                            });
                            isCorrect = "No";
                            $("#account_assignment").addClass("active");
                            $("#account_assignment-tab").addClass("active");
                            $("#account_assignment-tab").addClass("show");
                            return false;
                        }
                    }

                    if (accountAssignment === "D" || accountAssignment === "P" || accountAssignment === "Q" || accountAssignment === "T" || accountAssignment === "X") {
                        wBSElement = $(rows[i]).find('td').eq(14).children(".accAsgnWBSElement").val();
                        if (wBSElement === "") {
                            if (lobiboxNotifyAlert !== null)
                            {
                                lobiboxNotifyAlert.remove();
                            }
                            errorMsg = "Please enter WBS Element in Account Assignment Tab!";
                            $(rows[i]).find('td').eq(14).children(".accAsgnWBSElement").css("border-color", "red");
                            lobiboxNotifyAlert = Lobibox.notify("error", {
                                rounded: true,
                                delayIndicator: false,
                                msg: errorMsg
                            });
                            isCorrect = "No";
                            $("#account_assignment").addClass("active");
                            $("#account_assignment-tab").addClass("active");
                            $("#account_assignment-tab").addClass("show");
                            return false;
                        }
                    }
                    if (accountAssignment === "C" || accountAssignment === "D" || accountAssignment === "E" || accountAssignment === "M"
                            || accountAssignment === "T" || accountAssignment === "X") {
                        salesOrder = $(rows[i]).find('td').eq(15).children(".accAsgnSalesOrder").val();
                        if (salesOrder === "") {
                            if (lobiboxNotifyAlert !== null)
                            {
                                lobiboxNotifyAlert.remove();
                            }
                            errorMsg = "Please enter Sales Order in Account Assignment Tab!";
                            $(rows[i]).find('td').eq(15).children(".accAsgnSalesOrder").css("border-color", "red");
                            lobiboxNotifyAlert = Lobibox.notify("error", {
                                rounded: true,
                                delayIndicator: false,
                                msg: errorMsg
                            });
                            isCorrect = "No";
                            $("#account_assignment").addClass("active");
                            $("#account_assignment-tab").addClass("active");
                            $("#account_assignment-tab").addClass("show");
                            return false;
                        }

                    }
                    if (accountAssignment === "N" || accountAssignment === "P" || accountAssignment === "T") {
                        network = $(rows[i]).find('td').eq(16).children(".accAsgnNetActNumber").val();
                        if (network === "") {
                            if (lobiboxNotifyAlert !== null)
                            {
                                lobiboxNotifyAlert.remove();
                            }
                            errorMsg = "Please enter Network/Activity in Account Assignment Tab!";
                            $(rows[i]).find('td').eq(16).children(".accAsgnNetActNumber").css("border-color", "red");
                            lobiboxNotifyAlert = Lobibox.notify("error", {
                                rounded: true,
                                delayIndicator: false,
                                msg: errorMsg
                            });
                            isCorrect = "No";
                            $("#account_assignment").addClass("active");
                            $("#account_assignment-tab").addClass("active");
                            $("#account_assignment-tab").addClass("show");
                            return false;
                        }
                    }

                    if (accountAssignment === "C" || accountAssignment === "D" || accountAssignment === "E" || accountAssignment === "M" || accountAssignment === "R"
                            || accountAssignment === "T" || accountAssignment === "X") {
                        deliverySchedule = $(rows[i]).find('td').eq(18).children(".accAsgnDeliverySchedule").val();
                        itemNumber = $(rows[i]).find('td').eq(17).children(".accAsgnItemNumber").val();

                        if (itemNumber === "") {
                            if (lobiboxNotifyAlert !== null)
                            {
                                lobiboxNotifyAlert.remove();
                            }
                            errorMsg = "Please enter Item Number in Account Assignment Tab!";
                            $(rows[i]).find('td').eq(17).children(".accAsgnItemNumber").css("border-color", "red");
                            lobiboxNotifyAlert = Lobibox.notify("error", {
                                rounded: true,
                                delayIndicator: false,
                                msg: errorMsg
                            });
                            isCorrect = "No";
                            $("#account_assignment").addClass("active");
                            $("#account_assignment-tab").addClass("active");
                            $("#account_assignment-tab").addClass("show");
                            return false;
                        }
                        if (deliverySchedule === "") {
                            if (lobiboxNotifyAlert !== null)
                            {
                                lobiboxNotifyAlert.remove();
                            }
                            errorMsg = "Please enter Delivery Schedule in Account Assignment Tab!";
                            $(rows[i]).find('td').eq(18).children(".accAsgnDeliverySchedule").css("border-color", "red");
                            lobiboxNotifyAlert = Lobibox.notify("error", {
                                rounded: true,
                                delayIndicator: false,
                                msg: errorMsg
                            });
                            isCorrect = "No";
                            $("#account_assignment").addClass("active");
                            $("#account_assignment-tab").addClass("active");
                            $("#account_assignment-tab").addClass("show");
                            return false;
                        }
                    }
                }
            }

        }
    }
    return true;
}
function ServiceAccountAssignmentValidation(distribution, accountAssignment) {
//    alert(accountAssignment);
    var unloadingPoint = "";
    var recipient = "";
    var gLAccount = "";
    var coArea = "";
    var costCenter = "";
    var order = "";
    var asset = "";
    var wBSElement = "";
    var salesOrder = "";
    var itemNumber = "";
    var deliverySchedule = "";
    var fund = "";
    var functionalAear = "";
    var fundCenter = "";
    var commitmentItem = "";
    var network = "";
    var profitabilitySegment = "";
    var errorMsg = "";
    var isCorrect = "";

    if (accountAssignment === "A" || accountAssignment === "C" || accountAssignment === "F" || accountAssignment === "K" || accountAssignment === "N"
            || accountAssignment === "P" || accountAssignment === "R" || accountAssignment === "X" || accountAssignment === "Z") {

        if (distribution === "Single Account Assignment") {
            unloadingPoint = $("#unloadingPoint").val();
//            recipient = $("#recipient").val();
            gLAccount = $("#gLAccountService").val();
            order = $("#OrderService").val();
            asset = $("#AssetService").val();

            //GL Account
            if (accountAssignment !== "K" || accountAssignment !== "A") {
                if (gLAccount === "") {
                    if (lobiboxNotifyAlert !== null)
                    {
                        lobiboxNotifyAlert.remove();
                    }
                    errorMsg = "Please enter GL Account!";
                    $("#gLAccountService").css("border-color", "red");
                    lobiboxNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    isCorrect = "No";
                    return false;
                }
            }

            if (accountAssignment === "K" || accountAssignment === "T" || accountAssignment === "X") {
                costCenter = $("#costCenterService").val();
                if (costCenter === "") {
                    if (lobiboxNotifyAlert !== null)
                    {
                        lobiboxNotifyAlert.remove();
                    }
                    errorMsg = "Please enter Cost Center!";
                    $("#costCenterService").css("border-color", "red");
                    lobiboxNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    isCorrect = "No";
                    return false;
                }
            }

            if (accountAssignment === "A" || accountAssignment === "F" || accountAssignment === "T" || accountAssignment === "X" || accountAssignment === "Z") {
                if (order === "") {
                    if (lobiboxNotifyAlert !== null)
                    {
                        lobiboxNotifyAlert.remove();
                    }
                    errorMsg = "Please enter Order!";
                    $("#OrderService").css("border-color", "red");
                    lobiboxNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    isCorrect = "No";
                    return false;
                }
            }
            if (accountAssignment === "A") {
                if (asset === "") {
                    if (lobiboxNotifyAlert !== null)
                    {
                        lobiboxNotifyAlert.remove();
                    }
                    errorMsg = "Please enter Asset in Account Assignment Tab!";
                    $("#AssetService").css("border-color", "red");
                    lobiboxNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    isCorrect = "No";
                    return false;
                }
            }
            if (accountAssignment === "D" || accountAssignment === "P" || accountAssignment === "Q" || accountAssignment === "T" || accountAssignment === "X") {
                wBSElement = $("#WBSElementInputService").val();
                if (wBSElement === "") {
                    if (lobiboxNotifyAlert !== null)
                    {
                        lobiboxNotifyAlert.remove();
                    }
                    errorMsg = "Please enter WBS Element in Account Assignment Tab!";
                    $("#WBSElementInputService").css("border-color", "red");
                    lobiboxNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    isCorrect = "No";
                    return false;
                }
            }
            if (accountAssignment === "C" || accountAssignment === "D" || accountAssignment === "E" || accountAssignment === "M" ||
                    accountAssignment === "T" || accountAssignment === "X") {
                salesOrder = $("#SalesOrderService").val();

                if (salesOrder === "") {
                    if (lobiboxNotifyAlert !== null)
                    {
                        lobiboxNotifyAlert.remove();
                    }
                    errorMsg = "Please enter Sales Order!";
                    $("#SalesOrderService").css("border-color", "red");
                    lobiboxNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    isCorrect = "No";
                    return false;
                }

            }
            if (accountAssignment === "C" || accountAssignment === "D" || accountAssignment === "E" || accountAssignment === "M" || accountAssignment === "R" ||
                    accountAssignment === "T" || accountAssignment === "X") {
                itemNumber = $("#ItemNumberService").val();
                deliverySchedule = $("#DelivSchService").val();
                if (itemNumber === "") {
                    if (lobiboxNotifyAlert !== null)
                    {
                        lobiboxNotifyAlert.remove();
                    }
                    errorMsg = "Please enter Item Number!";
                    $("#ItemNumberService").css("border-color", "red");
                    lobiboxNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    isCorrect = "No";
                    return false;
                }
                if (deliverySchedule === "") {
                    if (lobiboxNotifyAlert !== null)
                    {
                        lobiboxNotifyAlert.remove();
                    }
                    errorMsg = "Please enter Delivery Schedule!";
                    $("#DelivSchService").css("border-color", "red");
                    lobiboxNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    isCorrect = "No";
                    return false;
                }
            }
            if (accountAssignment === "T") {
                if (lobiboxNotifyAlert !== null)
                {
                    lobiboxNotifyAlert.remove();
                }
                commitmentItem = $("#CommItemServiceInput").val();
                if (commitmentItem === "") {
                    errorMsg = "Please enter Commitment Item!";
                    $("#CommItemServiceInput").css("border-color", "red");
                    lobiboxNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    isCorrect = "No";
                    return false;
                }
            }
            if (accountAssignment === "N" || accountAssignment === "P" || accountAssignment === "T") {
                network = $("#NActNumServiceInput").val();
                if (network === "") {
                    if (lobiboxNotifyAlert !== null)
                    {
                        lobiboxNotifyAlert.remove();
                    }
                    errorMsg = "Please enter Network/Activity!";
                    $("#NActNumServiceInput").css("border-color", "red");
                    lobiboxNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    isCorrect = "No";
                    return false;
                }
            }
//            if(accountAssignment === "R"){
//                $("#serviceTableId tbody tr").each(function(){
//                   var isProfitabilitySegmentDataSaved = $(this).children(".isProfitabilitySegmentDataSaved").val();
//                   if(isProfitabilitySegmentDataSaved === "No"){
//                       
//                   }
//                });
//            }
        }
    }
}
function ServiceAccountAssignmentValidationforMultipleDistribution(accountAssignment) {
    var unloadingPoint = "";
    var recipient = "";
    var gLAccount = "";
    var coArea = "";
    var costCenter = "";
    var order = "";
    var asset = "";
    var wBSElement = "";
    var salesOrder = "";
    var itemNumber = "";
    var deliverySchedule = "";
    var fund = "";
    var functionalAear = "";
    var fundCenter = "";
    var commitmentItem = "";
    var network = "";
    var profitabilitySegment = "";
    var errorMsg = "";
    var accAsgnLen = $("#serviceTabAccAsgnTebleId tbody tr").length;
    var isCorrect = "";
    var rows = $("#serviceTabAccAsgnTebleId tbody tr");
    if (accountAssignment === "A" || accountAssignment === "C" || accountAssignment === "F" || accountAssignment === "K" || accountAssignment === "N"
            || accountAssignment === "P" || accountAssignment === "R" || accountAssignment === "X" || accountAssignment === "Z") {
        for (var i = 0; i < accAsgnLen; i++) {
            gLAccount = $(rows[i]).find('td').eq(3).children(".serviceAccAsgnTblGLAccount").val();
            costCenter = $(rows[i]).find('td').eq(5).children(".serviceAccAsgnTblCostCetner").val();
            if (accountAssignment !== "K" || accountAssignment !== "A") {
                if (gLAccount === "") {
                    if (lobiboxNotifyAlert !== null)
                    {
                        lobiboxNotifyAlert.remove();
                    }
                    errorMsg = "Please enter GL Account!";
                    $(rows[i]).find('td').eq(3).children(".serviceAccAsgnTblGLAccount").css("border-color", "red");
                    lobiboxNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    isCorrect = "No";
                    return false;
                }
            }
            if (accountAssignment === "K" || accountAssignment === "T" || accountAssignment === "X") {
                if (costCenter === "") {
                    if (lobiboxNotifyAlert !== null)
                    {
                        lobiboxNotifyAlert.remove();
                    }
                    errorMsg = "Please enter Cost Center in Account Assignment Tab!";
                    $(rows[i]).find('td').eq(5).children(".serviceAccAsgnTblCostCetner").css("border-color", "red");
                    lobiboxNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    isCorrect = "No";
                    return false;
                }
            }
            if (accountAssignment === "T") {
                commitmentItem = $(rows[i]).find('td').eq(9).children(".serviceAccAsgnTblCommitmentItem").val();
                if (commitmentItem === "") {
                    if (lobiboxNotifyAlert !== null)
                    {
                        lobiboxNotifyAlert.remove();
                    }
                    errorMsg = "Please enter Commitment Item!";
                    $(rows[i]).find('td').eq(9).children(".serviceAccAsgnTblCommitmentItem").css("border-color", "red");
                    lobiboxNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    isCorrect = "No";
                    return false;
                }
            }

            order = $(rows[i]).find('td').eq(10).children(".serviceAccAsgnTblOrder").val();
            if (accountAssignment === "A" || accountAssignment === "F" || accountAssignment === "T" || accountAssignment === "X" || accountAssignment === "Z") {
                if (order === "") {
                    if (lobiboxNotifyAlert !== null)
                    {
                        lobiboxNotifyAlert.remove();
                    }
                    errorMsg = "Please enter Order!";
                    $(rows[i]).find('td').eq(10).children(".serviceAccAsgnTblOrder").css("border-color", "red");
                    lobiboxNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    isCorrect = "No";
                    return false;
                }
            }
            asset = $(rows[i]).find('td').eq(11).children(".serviceAccAsgnTblAssets").val();
            if (accountAssignment === "A") {
                if (asset === "") {
                    if (lobiboxNotifyAlert !== null)
                    {
                        lobiboxNotifyAlert.remove();
                    }
                    errorMsg = "Please enter Asset!";
                    $(rows[i]).find('td').eq(11).children("serviceAccAsgnTblAssets").css("border-color", "red");
                    lobiboxNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    isCorrect = "No";
                    return false;
                }
            }

            if (accountAssignment === "D" || accountAssignment === "P" || accountAssignment === "Q" || accountAssignment === "T" || accountAssignment === "X") {
                wBSElement = $(rows[i]).find('td').eq(12).children(".serviceAccAsgnTblWBSElement").val();
                if (wBSElement === "") {
                    if (lobiboxNotifyAlert !== null)
                    {
                        lobiboxNotifyAlert.remove();
                    }
                    errorMsg = "Please enter WBS Element!";
                    $(rows[i]).find('td').eq(12).children(".serviceAccAsgnTblWBSElement").css("border-color", "red");
                    lobiboxNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    isCorrect = "No";
                    return false;
                }
            }
            if (accountAssignment === "C" || accountAssignment === "D" || accountAssignment === "E" || accountAssignment === "M"
                    || accountAssignment === "T" || accountAssignment === "X") {
                salesOrder = $(rows[i]).find('td').eq(13).children(".serviceAccAsgnTblSalesOrder").val();
                if (salesOrder === "") {
                    if (lobiboxNotifyAlert !== null)
                    {
                        lobiboxNotifyAlert.remove();
                    }
                    errorMsg = "Please enter Sales Order!";
                    $(rows[i]).find('td').eq(13).children(".serviceAccAsgnTblSalesOrder").css("border-color", "red");
                    lobiboxNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    isCorrect = "No";
                    return false;
                }

            }
            if (accountAssignment === "N" || accountAssignment === "P" || accountAssignment === "T") {
                network = $(rows[i]).find('td').eq(14).children(".serviceAccAsgnTblNetActNumber").val();
                if (network === "") {
                    if (lobiboxNotifyAlert !== null)
                    {
                        lobiboxNotifyAlert.remove();
                    }
                    errorMsg = "Please enter Network/Activity!";
                    $(rows[i]).find('td').eq(14).children(".serviceAccAsgnTblNetActNumber").css("border-color", "red");
                    lobiboxNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    isCorrect = "No";
                    return false;
                }
            }

            if (accountAssignment === "C" || accountAssignment === "D" || accountAssignment === "E" || accountAssignment === "M" || accountAssignment === "R"
                    || accountAssignment === "T" || accountAssignment === "X") {
                deliverySchedule = $(rows[i]).find('td').eq(16).children(".serviceAccAsgnTblDeliverySchedule").val();
                itemNumber = $(rows[i]).find('td').eq(15).children(".serviceAccAsgnTblItemNumber").val();

                if (itemNumber === "") {
                    if (lobiboxNotifyAlert !== null)
                    {
                        lobiboxNotifyAlert.remove();
                    }
                    errorMsg = "Please enter Item Number!";
                    $(rows[i]).find('td').eq(15).children(".serviceAccAsgnTblItemNumber").css("border-color", "red");
                    lobiboxNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    isCorrect = "No";
                    return false;
                }
                if (deliverySchedule === "") {
                    if (lobiboxNotifyAlert !== null)
                    {
                        lobiboxNotifyAlert.remove();
                    }
                    errorMsg = "Please enter Delivery Schedule!";
                    $(rows[i]).find('td').eq(16).children(".serviceAccAsgnTblDeliverySchedule").css("border-color", "red");
                    lobiboxNotifyAlert = Lobibox.notify("error", {
                        rounded: true,
                        delayIndicator: false,
                        msg: errorMsg
                    });
                    isCorrect = "No";
                    return false;
                }
            }

        }
    }

//    }
}

function limitAccountAssignmentValidationForSingle(accountAssignment) {
    var unloadingPoint = "";
    var recipient = "";
    var gLAccount = "";
    var coArea = "";
    var costCenter = "";
    var order = "";
    var asset = "";
    var wBSElement = "";
    var salesOrder = "";
    var itemNumber = "";
    var deliverySchedule = "";
    var fund = "";
    var functionalAear = "";
    var fundCenter = "";
    var commitmentItem = "";
    var network = "";
    var profitabilitySegment = "";
    var errorMsg = "";
    var isCorrect = "";
    alert(accountAssignment);
    if (accountAssignment === "A" || accountAssignment === "C" || accountAssignment === "F" || accountAssignment === "K" || accountAssignment === "N"
            || accountAssignment === "P" || accountAssignment === "R" || accountAssignment === "X" || accountAssignment === "Z") {

        unloadingPoint = $("#unloadingPoint").val();
//            recipient = $("#recipient").val();
        gLAccount = $("#gLAccountInp_Limits").val();




        if (accountAssignment !== "K" && accountAssignment !== "A") {
            if (gLAccount === "") {
                if (lobiboxNotifyAlert !== null)
                {
                    lobiboxNotifyAlert.remove();
                }
                errorMsg = "Please enter GL Account!";
                $("#gLAccountInp_Limits").css("border-color", "red");
                lobiboxNotifyAlert = Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: errorMsg
                });
                isCorrect = "No";
                return false;
            }
        }

        if (accountAssignment === "F" || accountAssignment === "K" || accountAssignment === "R" || accountAssignment === "T" || accountAssignment === "X" || accountAssignment === "Z") {
            costCenter = $("#costCenterInp_Limits").val();
            if (costCenter === "") {
                if (lobiboxNotifyAlert !== null)
                {
                    lobiboxNotifyAlert.remove();
                }
                errorMsg = "Please enter Cost Center!";
                $("#costCenterInp_Limits").css("border-color", "red");
                lobiboxNotifyAlert = Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: errorMsg
                });
                isCorrect = "No";
                return false;
            }
        }

        if (accountAssignment === "A" || accountAssignment === "F" || accountAssignment === "T" || accountAssignment === "X" || accountAssignment === "Z") {
            order = $("#orderInp_Limits").val();

            if (order === "") {
                if (lobiboxNotifyAlert !== null)
                {
                    lobiboxNotifyAlert.remove();
                }
                errorMsg = "Please enter Order!";
                $("#orderInp_Limits").css("border-color", "red");
                lobiboxNotifyAlert = Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: errorMsg
                });
                isCorrect = "No";
                return false;
            }
        }
        asset = $("#assetInp_Limits").val();
        if (accountAssignment === "A") {
            if (asset === "") {
                if (lobiboxNotifyAlert !== null)
                {
                    lobiboxNotifyAlert.remove();
                }
                errorMsg = "Please enter Asset!";
                $("#assetInp_Limits").css("border-color", "red");
                lobiboxNotifyAlert = Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: errorMsg
                });
                isCorrect = "No";
                return false;
            }
        }
        if (accountAssignment === "D" || accountAssignment === "P" || accountAssignment === "Q" || accountAssignment === "T" || accountAssignment === "X") {
            wBSElement = $("#wBSElementInp_Limits").val();
            if (wBSElement === "") {
                if (lobiboxNotifyAlert !== null)
                {
                    lobiboxNotifyAlert.remove();
                }
                errorMsg = "Please enter WBS Element!";
                $("#wBSElementInp_Limits").css("border-color", "red");
                lobiboxNotifyAlert = Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: errorMsg
                });
                isCorrect = "No";
                return false;
            }
        }
        if (accountAssignment === "C" || accountAssignment === "D" || accountAssignment === "E" || accountAssignment === "M"
                || accountAssignment === "T" || accountAssignment === "X") {
            salesOrder = $("#salesOrderInp_Limits").val();

            if (salesOrder === "") {
                if (lobiboxNotifyAlert !== null)
                {
                    lobiboxNotifyAlert.remove();
                }
                errorMsg = "Please enter Sales Order!";
                $("#salesOrderInp_Limits").css("border-color", "red");
                lobiboxNotifyAlert = Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: errorMsg
                });
                isCorrect = "No";
                return false;
            }

        }
        if (accountAssignment === "C" || accountAssignment === "D" || accountAssignment === "E" || accountAssignment === "M" || accountAssignment === "R"
                || accountAssignment === "T" || accountAssignment === "X") {
            itemNumber = $("#itemNumberInp_Limits").val();
            deliverySchedule = $("#delivSchInp_Limits").val();
            if (itemNumber === "") {
                if (lobiboxNotifyAlert !== null)
                {
                    lobiboxNotifyAlert.remove();
                }
                errorMsg = "Please enter Item Number!";
                $("#itemNumberInp_Limits").css("border-color", "red");
                lobiboxNotifyAlert = Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: errorMsg
                });
                isCorrect = "No";
                return false;
            }
            if (deliverySchedule === "") {
                if (lobiboxNotifyAlert !== null)
                {
                    lobiboxNotifyAlert.remove();
                }
                errorMsg = "Please enter Delivery Schedule!";
                $("#delivSchInp_Limits").css("border-color", "red");
                lobiboxNotifyAlert = Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: errorMsg
                });
                isCorrect = "No";
                return false;
            }
        }
        if (accountAssignment === "T") {
            commitmentItem = $("#commItemLabel_Limits").val();
            if (commitmentItem === "") {
                if (lobiboxNotifyAlert !== null)
                {
                    lobiboxNotifyAlert.remove();
                }
                errorMsg = "Please enter Commitment Item!";
                $("#commItemLabel_Limits").css("border-color", "red");
                lobiboxNotifyAlert = Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: errorMsg
                });
                isCorrect = "No";
                return false;
            }
        }
        if (accountAssignment === "N" || accountAssignment === "P" || accountAssignment === "T") {
            network = $("#nActNumServiceInp_Limits").val();
            if (network === "") {
                if (lobiboxNotifyAlert !== null)
                {
                    lobiboxNotifyAlert.remove();
                }
                errorMsg = "Please enter Network/Activity!";
                $("#nActNumServiceInp_Limits").css("border-color", "red");
                lobiboxNotifyAlert = Lobibox.notify("error", {
                    rounded: true,
                    delayIndicator: false,
                    msg: errorMsg
                });
                isCorrect = "No";
                return false;
            }
        }
    }
}