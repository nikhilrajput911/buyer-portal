/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(function() {
    (function() {
        Lobibox.base.DEFAULTS = $.extend({}, Lobibox.base.DEFAULTS, {
            iconSource: 'fontAwesome'
        });
        Lobibox.notify.DEFAULTS = $.extend({}, Lobibox.notify.DEFAULTS, {
            iconSource: 'fontAwesome'
        });
    })();

});


if ($("table.buyerdetailstable").length) {

    $(document).ready(function() {

        $('#buyerdetailstable thead tr').clone(true).appendTo('#buyerdetailstable thead');
        $('#buyerdetailstable thead tr:eq(1) th').each(function(i) {
            $('#buyerdetailstable thead tr:eq(0) th').addClass("table-header-color");
            var title = $(this).text();
            if (title === "")
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

        var table = $('table.buyerdetailstable').DataTable({
//            "scrollY": 200,
//            "scrollX": true,
            lengthChange: false,
            orderCellsTop: true,
            buttons: [
                {
                    extend: 'collection',
                    text: 'Export',
//                    buttons: ['copy', 'excel', 'pdf', 'print']
                    buttons: [
                        {extend: 'excel', title: 'Buyers'},
                        {extend: 'pdf', title: 'Buyers'},
                        {extend: 'print', title: 'Buyers'}
                    ]
                }
            ]
        });

        table.buttons().container()
                .appendTo('#buyerdetailstable_wrapper .col-md-6:eq(0)');
    });
}

$(document).ready(function() {


    $('.collapse').on('shown.bs.collapse', function() {
        $(this).parent().find(".fa-angle-down").removeClass("fa-angle-down").addClass("fa-angle-up");
    }).on('hidden.bs.collapse', function() {
        $(this).parent().find(".fa-angle-up").removeClass("fa-angle-up").addClass("fa-angle-down");
    });

    $("#buyerdetailstable").on("click", ".editbuyerlinkclass", function() {

        $("#editbuyerdiv").css("display", "block");
        $("#managebuyer").removeClass("show");
        $("#managebuyerspan").removeClass("fa-angle-up").addClass("fa-angle-down");

//        var status = $(this).parent().parent().find("td").eq(2).html();
        var username = $(this).parent().parent().find("td").eq(2).html();
        var firstname = $(this).parent().parent().find("td").eq(3).html();
        var lastname = $(this).parent().parent().find("td").eq(4).html();
        var emailid = $(this).parent().parent().find("td").eq(5).html();

        var buyerteamlead = $(this).parent().parent().find("td").eq(6).children(".teamleadname").val();
        var buyerteamleadId = $(this).parent().parent().find("td").eq(6).children(".teamleadid").val();

        var teamlead = $(this).parent().parent().find("td").eq(7).html();
        var buyeradmin = $(this).parent().parent().find("td").eq(8).html();
        var notifybuyer = $(this).parent().parent().find("td").eq(9).html();
        var id = $(this).parent().parent().find("td").eq(14).html();
        var purchasegroup = $(this).parent().parent().find("td").eq(12).html();
        var companycode = $(this).parent().parent().find("td").eq(13).html();

        var role = "";
        $.ajax(
                {
                    type: "GET",
                    url: "ajaxcontroller.do",
                    async: false,
                    data:
                            {
                                "reqFrom": "getBuyerById",
                                "buyerid": id
                            },
                    complete: function(responseJson) {
                        var obj = $.parseJSON(responseJson.responseText);
                        role = obj.Role;
                    }
                });
        console.log("role: " + role);
        $("#role").val(role);
        if (role === 'ROLE_TEAM_LEAD')
        {
            $("#buyer_team_lead_div").css("display", "none");
        }

        $("#update_teamlead").val(teamlead);
        $("#update_buyeradmin").val(buyeradmin);
        $("#update_notifybuyer").val(notifybuyer);

        $("#update_purchaseGroup").val("");
        $("#update_username").val("");
        $("#update_password").val("");
        $("#update_firstname").val("");
        $("#update_lastname").val("");
        $("#update_emailid").val("");
        $("#update_adminY").prop("checked", false);
        $("#update_adminN").prop("checked", false);
        $("#update_notifybuyerY").prop("checked", false);
        $("#update_notifybuyerN").prop("checked", false);
        $("#update_teamleadY").prop("checked", false);
        $("#update_teamleadN").prop("checked", false);

        $("#update_username").css("border-color", "");
        $("#update_password").css("border-color", "");
        $("#update_firstname").css("border-color", "");
        $("#update_lastname").css("border-color", "");
        $("#update_emailid").css("border-color", "");

        $('#u_p1').text("");
        $('#u_p2').text("");
        $('#u_p3').text("");
        $('#u_p4').text("");
        $('#u_p5').text("");
        $('#u_p6').text("");
        $('#u_p7').text("");
        $('#u_p8').text("");
        $('#u_p9').text("");

        $("#update_firstname").val(firstname);
        $("#update_lastname").val(lastname);
        $("#update_emailid").val(emailid);
        
        var cocode = companycode.split(',');

        $("#ro_update_teamlead").val(companycode);
        $('#update_companyCode').selectpicker('val', cocode);

        $('#update_buyerteamlead').selectpicker('val', buyerteamleadId);

        if (buyeradmin === 'Yes') {
            $("#update_adminY").prop("checked", true);
        }
        else {
            $("#update_adminN").prop("checked", true);
        }
        if (notifybuyer === 'Yes') {
            $("#update_notifybuyerY").prop("checked", true);
        }
        else {
            $("#update_notifybuyerN").prop("checked", true);
        }
        if (teamlead === 'Yes') {
            $("#update_teamleadY").prop("checked", true);
        }
        else {
            $("#update_teamleadN").prop("checked", true);
        }

        $("#updated_id").val(id);

        $.ajax({
            type: "GET",
            url: "buyerVendorGetAjaxRequest.do",
            async: false,
            data: {
                "reqFrom": "findMasterPurchasingGroupByCode",
                "purchasingGroupCodeString": purchasegroup
            },
            complete: function(responseJson) {
                var purchasingGroupCodeJsonArr = $.parseJSON(responseJson.responseText);
                purchasingGroupCodeJsonArr = JSON.parse(JSON.stringify(purchasingGroupCodeJsonArr));
                console.log("purchasingGroupCodeJsonArr.length: " + purchasingGroupCodeJsonArr.length);
                if (purchasingGroupCodeJsonArr.length !== 0) 
                {                    
                    var masterPurchasingGroupSnoArr = []; 
                    for (var i = 0; i < purchasingGroupCodeJsonArr.length; i++) 
                    {
                        masterPurchasingGroupSnoArr.push(purchasingGroupCodeJsonArr[i].sno);
                    }
                    console.log("masterPurchasingGroupSnoArr: " + masterPurchasingGroupSnoArr);
                    $("#update_MasterPurchaseGroupSno").val(masterPurchasingGroupSnoArr.toString());
                    $('#update_purchaseGroup').selectpicker('val', masterPurchasingGroupSnoArr);
                }
            }
        });

    });
    
    $("#update_purchaseGroup").change(function() {
        $("#update_MasterPurchaseGroupSno").val($(this).val());
    });
    
    $("#update_companyCode").change(function() {
        $("#ro_update_teamlead").val($(this).val());
    });

    $("#username").change(function() {
        var username = $('#username');
//        var uname_regex = /^[0-9a-zA-Z]{4,20}$/;
//        if (!uname_regex.test(username.val())) {
//            $("#username").css("border-color", "red");
//            $('#p1').text("* please enter atleast 4 characters  *");
//            return false;
//        }
//        else {
//            $("#username").css("border-color", "");
//            $('#p1').text("");

//            alert(username.val());
        $.ajax(
                {
                    type: "GET",
                    url: "ajaxcontroller.do",
                    async: false,
                    data:
                            {
                                "reqFrom": "UsernameAvailibility",
                                "username": username.val()
                            },
                    complete: function(responseJson) {
                        var obj = $.parseJSON(responseJson.responseText);

                        if (obj.size != 0) {
//                                $('#p1').text("* username already axists  *");
//                                $("#createbuyerbtn").attr("disabled", true);
                            Lobibox.alert("error", {
                                msg: " username already exists  "
                            });
                            $("#username").val("");
                        }
//                            else{
//                                $("#createbuyerbtn").attr("disabled", false);
//                            }
//                            alert(obj.size);
                    }
//                        error: function(data) {
//                            alert("dataFail");
//                        }
                });
//        }

    });


    $("#createbuyerbtn").click(function() {

//        Lobibox.confirm({
//            msg: "Are you sure you want to create buyer?",
//            callback: function(lobibox, type) {
//                console.log("type: " + type);
//                if (type === 'yes')
//                {
//                    console.log("ok");
//                    $("#createbyuerform").submit();
//                }
//                else if (type === 'no')
//                {
//                    console.log("no");
//                }
//            }
//        });
    });

    $("#updatebuyerbtn").click(function() {

//        Lobibox.confirm({
//            msg: "Are you sure you want to update buyer?",
//            callback: function(lobibox, type) {
//                console.log("type: " + type);
//                if (type === 'yes')
//                {
//                    console.log("ok");
//                    $("#updatebuyerform").submit();
//                }
//                else if (type === 'no')
//                {
//                    console.log("no");
//                }
//            }
//        });
    });

    $("#forgot_username").change(function() {
//        alert("bittu");
        var username = $('#forgot_username').val();
//        alert(username.val());
        $.ajax(
                {
                    type: "GET",
                    url: "ajaxcontroller.do",
                    async: false,
                    data:
                            {
                                "reqFrom": "UsernameAvailibility",
                                "username": username
                            },
                    complete: function(responseJson) {
                        var obj = $.parseJSON(responseJson.responseText);
//                        alert(obj.size);
                        if (obj.size === 0) {
//                            alert("username not available");
                            Lobibox.alert("error", {
                                msg: " username not available  "
                            });
                            $("#forgot_username").val("");
                        }
                        else {
                            getQueAns(username);
                        }
                    }
                });

        function getQueAns(username) {
            $.ajax(
                    {
                        type: "GET",
                        url: "ajaxcontroller.do",
                        async: false,
                        data:
                                {
                                    "reqFrom": "getsecqueans",
                                    "username": username
                                },
                        complete: function(responseJson) {
//                           alert("success");
                            var obj = $.parseJSON(responseJson.responseText);
                            var question1 = "";
                            var question2 = "";
                            var question3 = "";
                            var answer1 = "";
                            var answer2 = "";
                            var answer3 = "";
                            var buyerid = "";

//                            alert(obj.Data.length);
                            if (obj.Data.length > 0) {
                                question1 = obj.Data[0].question;
                                question2 = obj.Data[1].question;
                                question3 = obj.Data[2].question;
                                answer1 = obj.Data[0].answer;
                                answer2 = obj.Data[1].answer;
                                answer3 = obj.Data[2].answer;
                                buyerid = obj.Data[0].buyerid;

                            } else {

                                Lobibox.alert("error", {
                                    msg: " Please update your security Questions  "
                                });

                            }
                            $("#question1").val(question1);
                            $("#question2").val(question2);
                            $("#question3").val(question3);

                            $("#secQueAns1").val(answer1);
                            $("#secQueAns2").val(answer2);
                            $("#secQueAns3").val(answer3);

                            $("#buyerid").val(buyerid);

                        }
                    });
        }

    });


    $('#resetpasswordid').click(function() {
        var answer1 = $('#answer1').val();
        var secQueAns1 = $('#secQueAns1').val();
        var answer2 = $('#answer2').val();
        var secQueAns2 = $('#secQueAns2').val();
        var answer3 = $('#answer3').val();
        var secQueAns3 = $('#secQueAns3').val();
        var question1 = $('#question1').val();
        var question2 = $('#question2').val();
        var question3 = $('#question3').val();
        if ((answer1 !== secQueAns1)) {
            $("#answer1").css("border-color", "red");
        }
        if ((answer2 !== secQueAns2)) {
            $("#answer2").css("border-color", "red");
        }
        if ((answer3 !== secQueAns3)) {
            $("#answer3").css("border-color", "red");
        }

        if ((answer1 === secQueAns1) && (question1 !== "") && (answer2 === secQueAns2) && (question2 !== "") && (answer3 === secQueAns3) && (question3 !== "")) {
            $('#resetpasswordmodal').modal('show');
        }
    });


    $("#answer1").change(function() {
        $("#answer1").css("border-color", "");
    });
    $("#answer2").change(function() {
        $("#answer2").css("border-color", "");
    });
    $("#answer3").change(function() {
        $("#answer3").css("border-color", "");
    });

    $("#resetpasswordid").click(function() {
        var buyerid = $('#buyerid').val();
//       alert(buyerid);
        $("#buyerid").val(buyerid);
    });

    $("#buyerdetailstable").on("click", ".deleteBuyer", function() {
//    $(".deleteBuyer").click(function() {
//       alert("Bittu");
//        var buyerid = $(this).parent().val();
        var buyerid = $(this).parent().find("td").eq(14).text();
//        alert(buyerid);
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {
                "reqFrom": "deleteBuyerById",
                "buyerid": buyerid
            },
            complete: function() {
                location.href = "createbuyer.do";
            }

        });
    });
    $("input[name='buyeradmin']").click(function() {
//        alert("sad");
        var id = $(this).prop("id");
//        alert(id);
        if (id === "adminyes")
        {
            $("#ro_buyeradmin").val("Yes");
        }
        else if (id === "adminno")
        {
            $("#ro_buyeradmin").val("No");
        }
    });
    $("input[name='notifybuyer']").click(function() {
//        alert("sad");
        var id = $(this).prop("id");
//        alert(id);
        if (id === "notifybuyeryes")
        {
            $("#ro_notifybuyer").val("Yes");
        }
        else if (id === "notifybuyerno")
        {
            $("#ro_notifybuyer").val("No");
        }
    });
    $("input[name='teamlead']").click(function() {
//        alert("sad");
        var id = $(this).prop("id");
//        alert(id);
        if (id === "teamleadyes")
        {
            $("#ro_teamlead").val("Yes");
        }
        else if (id === "teamleadno")
        {
            $("#ro_teamlead").val("No");
        }
    });

    $("input[name='update_admin']").click(function() {
//        alert("sad");
        var id = $(this).prop("id");
//        alert(id);
        if (id === "update_adminY")
        {
            $("#update_buyeradmin").val("Yes");
        }
        else if (id === "update_adminN")
        {
            $("#update_buyeradmin").val("No");
        }
    });
    $("input[name='update_notifybuyer']").click(function() {
//        alert("sad");
        var id = $(this).prop("id");
//        alert(id);
        if (id === "update_notifybuyerY")
        {
            $("#update_notifybuyer").val("Yes");
        }
        else if (id === "update_notifybuyerN")
        {
            $("#update_notifybuyer").val("No");
        }
    });
    $("input[name='update_teamlead']").click(function() {
//        alert("sad");
        var id = $(this).prop("id");
//        alert(id);
        if (id === "update_teamleadY")
        {
            $("#update_teamlead").val("Yes");
        }
        else if (id === "update_teamleadN")
        {
            $("#update_teamlead").val("No");
        }
    });

    $("#resetpasswordbtn").click(function() {
//       alert("Bittu");
        var buyerid = $("#updated_id").val();
//        alert(buyerid);
        location.href = "resetbuyerpassword.do?buyerid=" + buyerid;
    });

//    if ($("#msg").val() !== "")
//    {
//        var defailt_password = $("#defailt_password").val();
//        Lobibox.alert("success", {
//            msg: 'Default Password is ' + defailt_password
//        });
//    }
//    $("#buyerteamlead").change(function() {
//        var tl = $(this).val();
////        alert(tl);
//        $("#parsley-id-15").remove();
//    });

});



