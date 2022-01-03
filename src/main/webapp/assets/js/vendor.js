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

var vendorNotificationTable = "";
if ($("table.vendornotification").length) {

    $(document).ready(function() {

        $('#vendornotification thead tr').clone(true).appendTo('#vendornotification thead');
        $('#vendornotification thead tr:eq(1) th').each(function(i) {
            $('#vendornotification thead tr:eq(0) th').addClass("table-header-color");
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

        var table = $('table.vendornotification').DataTable({
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
                        {extend: 'excel', title: 'Vendors'},
                        {extend: 'pdf', title: 'Vendors'},
                        {extend: 'print', title: 'Vendors'}
                    ]
                }
            ]
        });
        vendorNotificationTable = table;

        table.buttons().container()
                .appendTo('#vendornotification_wrapper .col-md-6:eq(0)');
    });
}

if ($("table.prospectdetailstable").length) {

    $(document).ready(function() {

        $('#prospectdetailstable thead tr').clone(true).appendTo('#prospectdetailstable thead');
        $('#prospectdetailstable thead tr:eq(1) th').each(function(i) {
            $('#prospectdetailstable thead tr:eq(0) th').addClass("table-header-color");
            var title = $(this).text();
            if (title === "")
            {
                $(this).html('');
            }
            else
            {
                $(this).html('<input type="text" class="form-control form-rounded" placeholder="Search ' + title + '" />');
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

        var table = $('table.prospectdetailstable').DataTable({
//            "scrollY": 200,
//            "scrollX": true,
            lengthChange: false,
            orderCellsTop: true,
            buttons: [
                {
                    extend: 'collection',
                    text: 'Export',
                    buttons: ['excel', 'pdf', 'print']
                }
            ],
            columnDefs: [
                {"width": "20%", "targets": 2},
                {"width": "20%", "targets": 11}
            ]
        });

        table.buttons().container()
                .appendTo('#prospectdetailstable_wrapper .col-md-6:eq(0)');
    });
}


if ($("table.vendordetails").length) {

    $(document).ready(function() {

        $('#vendordetails thead tr').clone(true).appendTo('#vendordetails thead');
        $('#vendordetails thead tr:eq(1) th').each(function(i) {
            $('#vendordetails thead tr:eq(0) th').addClass("table-header-color");
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

        var table = $('table.vendordetails').DataTable({
//            "scrollY": 200,
//            "scrollX": true,
            lengthChange: false,
            orderCellsTop: true,
            buttons: [
                {
                    extend: 'collection',
//                    extend: 'pdfHtml5',
                    orientation: 'landscape',
                    pageSize: 'A4',
                    text: 'Export',
                    buttons: ['excel', 'pdf', 'print']
                }
            ]

        });

        table.buttons().container()
                .appendTo('#vendordetails_wrapper .col-md-6:eq(0)');
    });
}


if ($("table.authorizevendor-class").length) {

    $(document).ready(function() {

        $('#authorizevendor_id thead tr').clone(true).appendTo('#authorizevendor_id thead');
        $('#authorizevendor_id thead tr:eq(1) th').each(function(i) {
            $('#authorizevendor_id thead tr:eq(0) th').addClass("table-header-color");
            var title = $(this).text();
            if (title === "" || title === "Edit Details" || title === "S.No")
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

        var table = $('table.authorizevendor-class').DataTable({
            lengthChange: false,
            orderCellsTop: true,
            buttons: [
                {
                    extend: 'collection',
                    text: 'Export',
//                    buttons: ['copy', 'excel', 'pdf', 'print']
                    buttons: [
                        {extend: 'excel', title: 'Autorize Vendors'},
                        {extend: 'pdf', title: 'Autorize Vendors'},
                        {extend: 'print', title: 'Autorize Vendors'}
                    ]
                }
            ]
        });

        table.buttons().container()
                .appendTo('#authorizevendor_id_wrapper .col-md-6:eq(0)');
    });
}

$(document).ready(function() {

    $("#overlay").css("display", "none");

    var requestFrom = $("#requestFrom").val();
    console.log("requestFrom: " + requestFrom);
    if (requestFrom === "vendorDetails")
    {
        console.log("requestFrom 2: " + requestFrom);
//        $.ajax({
//            type: "GET",
//            url: "standalonepoajaxrequest.do",
//            async: true,
//            data: {
//                "reqFrom": "FindMasterVendorByIsMappedNot"
//            },
//            complete: function(responseJson) {
//                var jsonVendorArr = $.parseJSON(responseJson.responseText);
//                console.log("jsonVendorArr lengtth :" + jsonVendorArr.length);
//                jsonVendorArr = JSON.parse(JSON.stringify(jsonVendorArr));
//
//                var option = "";
//                for (var i = 0; i < jsonVendorArr.length; i++) {
//                    option += "<option value='" + jsonVendorArr[i].vendorCode + "'>" + jsonVendorArr[i].vendorCode + " - " + jsonVendorArr[i].vendorName + "</option>";
//                }
//                $("#code").append(option);
//                $('.selectpicker').selectpicker('refresh');
//            }
//        });
    }

    $("#prospectdetailstable").on("click", ".editprospectlinkclass", function() {
        console.log("edit prospect");

        $("#editprospectdiv").css("display", "block");
        $("#manageprospect").removeClass("show");
        $("#manageprospectspan").removeClass("fa-angle-up").addClass("fa-angle-down");

        var prospect_id = $(this).parent().children(".propect-id").val();

        var update_prospectvendorname = $(this).parent().parent().find("td").eq(2).html();
        var update_country = $(this).parent().parent().find("td").eq(3).html();
        var update_address = $(this).parent().parent().find("td").eq(4).html();
        var update_contactfirstname = $(this).parent().parent().find("td").eq(5).html();
        var update_countrycode = $(this).parent().parent().find("td").eq(6).html();
        var update_contactnumberOff = $(this).parent().parent().find("td").eq(7).html();
        var update_contactnumberHp = $(this).parent().parent().find("td").eq(8).html();
        var update_emailaddress = $(this).parent().parent().find("td").eq(9).html();
        var update_faxnumber = $(this).parent().parent().find("td").eq(10).html();

//        alert(update_country);

        $("#prospect_id").val(prospect_id);

        $("#update_prospectvendorname").val(update_prospectvendorname);
        $("#update_country").val(update_country);
        $("#update_address").val(update_address);
        $("#update_contactfirstname").val(update_contactfirstname);
        $("#update_countrycode").val(update_countrycode);
        $("#update_contactnumberOff").val(update_contactnumberOff);
        $("#update_contactnumberHp").val(update_contactnumberHp);
        $("#update_emailaddress").val(update_emailaddress);
        $("#update_faxnumber").val(update_faxnumber);

        var code = "";
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {
                "reqFrom": "findVendorById",
                "vendorid": prospect_id
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
//                alert(obj.Code);
                code = obj.Code;
                if (code !== undefined)
                {
                    $('#vendorcode').selectpicker('val', code);
                }
                else
                {
                    $('#vendorcode').selectpicker('val', '');
                }
            }

        });
    });

    $("#vendordetails").on("click", ".editvendorlinkclass", function() {
        $("#editvendordiv").css("display", "block");
        $("#managevendor").removeClass("show");
        $("#managevendorspan").removeClass("fa-angle-up").addClass("fa-angle-down");

//        var status = $(this).parent().parent().find("td").eq(1).html();
//        var code = $(this).parent().parent().find("td").eq(2).html();
        var organization = $(this).parent().parent().find("td").eq(2).html();
        var firstname = $(this).parent().parent().find("td").eq(3).html();
        var lastname = $(this).parent().parent().find("td").eq(4).html();
        var city = $(this).parent().parent().find("td").eq(5).html();
        var country = $(this).parent().parent().find("td").eq(6).html();
        var address = $(this).parent().parent().find("td").eq(7).html();
        var postalcode = $(this).parent().parent().find("td").eq(8).html();
        var email = $(this).parent().parent().find("td").eq(9).html();
        var spocname = $(this).parent().parent().find("td").eq(10).html();
        var spocemail = $(this).parent().parent().find("td").eq(11).html();
        var vendoremailauto = $(this).parent().parent().find("td").eq(12).html();
        var contactnumberoff = $(this).parent().parent().find("td").eq(13).html();
        var contactnumbermob = $(this).parent().parent().find("td").eq(14).html();
        var contactnumberfax = $(this).parent().parent().find("td").eq(15).html();
        var paymentterm = $(this).parent().parent().find("td").eq(16).html();
        var ordercurrency = $(this).parent().parent().find("td").eq(17).html();
        var natureofpurchase = $(this).parent().parent().find("td").eq(18).html();
        var companyregnumber = $(this).parent().parent().find("td").eq(19).html();
        var gstregnumber = $(this).parent().parent().find("td").eq(20).html();
        var notifyvendor = $(this).parent().parent().find("td").eq(21).html();
        var vendorusername = $(this).parent().parent().find("td").eq(22).html();
        var id = $(this).parent().parent().find("td").eq(25).html();

        var code = "";
        var vendorName = "";
        var vendorAddress = "";
        $("#address2").text("");
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data: {
                "reqFrom": "findVendorById",
                "vendorid": id
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log("Vendor Code: " + obj.Code);
                code = obj.Code;
                vendorAddress = obj.ADDRESS;
                $("#address2").text(vendorAddress);
            }
        });
        if (code !== "" && code !== undefined)
        {
            $.ajax({
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data: {
                    "reqFrom": "findMasterVendorByVendorCode",
                    "vendorCode": code
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    console.log("Master obj.VENDORNAME: " + obj.VENDORNAME);
                    console.log("Master obj.VENDORCODE: " + obj.VENDORCODE);
                    vendorName = obj.VENDORNAME;
//                    var option = "";
//                    option += "<option value='" + obj.VENDORCODE + "'>"+ obj.VENDORCODE + " - "  + obj.VENDORNAME +  "</option>";
//                    $("#update_code").append(option);
//                    $('.selectpicker').selectpicker('refresh');
                }
            });
        }
        $("#update_code").val("");
        $("#update_organization").val("");
        $("#update_firstname").val("");
        $("#update_lastname").val("");
        $("#update_address").val("");
        $("#update_emailid").val("");
        $("#update_contactfirstname").val("");
        $("#update_contactlastname").val("");
        $("#update_contactnumber").val("");
        $("#update_contactemailid").val("");
        $("#update_username").val("");
        $("#update_password").val("");

        $("#update_code").css("border-color", "");
        $("#update_organization").css("border-color", "");
        $("#update_firstname").css("border-color", "");
        $("#update_lastname").css("border-color", "");
        $("#update_address").css("border-color", "");
        $("#update_emailid").css("border-color", "");
        $("#update_contactfirstname").css("border-color", "");
        $("#update_contactlastname").css("border-color", "");
        $("#update_contactnumber").css("border-color", "");
        $("#update_contactemailid").css("border-color", "");
        $("#update_username").css("border-color", "");
        $("#update_password").css("border-color", "");


        $("#u_p1").text("");
        $("#u_p2").text("");
        $("#u_p3").text("");
        $("#u_p4").text("");
        $("#u_p5").text("");
        $("#u_p6").text("");
        $("#u_p7").text("");
        $("#u_p8").text("");
        $("#u_p9").text("");
        $("#u_p10").text("");
        $("#u_p11").text("");



//        alert(country);
        $("#update_code").val(code + " - " + vendorName);
//        $('.selectpicker').selectpicker('refresh');
//        alert(organization);
        $("#update_organization").val(organization);
        $("#update_firstname").val(firstname);
        $("#update_lastname").val(lastname);
        $("#update_city").val(city);
        $("#update_country").val(country);
        $("#update_address").val(address);
        $("#update_postalcode").val(postalcode);
        $("#update_emailid").val(email);
        $("#update_spocname").val(spocname);
        $("#update_spocemail").val(spocemail);
        $("#update_vendoremailAuto").val(vendoremailauto);
        $("#update_contactnumberoff").val(contactnumberoff);
        $("#update_contactnumbermob").val(contactnumbermob);
        $("#update_contactnumberfax").val(contactnumberfax);
        $("#update_paymentTerms").val(paymentterm);
        $("#update_ordercurrency").val(ordercurrency);
        $("#update_natureOfPurchase").val(natureofpurchase);
        $("#update_companyRegNumber").val(companyregnumber);
        $("#update_gstRegNumber").val(gstregnumber);
        $("#update_username").val(vendorusername);
        $("#update_id").val(id);
        //  $("#update_password").val(vendorpassword);
        if (notifyvendor == 'Yes') {
            $("#update_notifyvendorY").prop("checked", true);
        }
        else {

            $("#update_notifyvendorN").prop("checked", true);
        }
        $("#updatevendor_id").val(id);
    });


    $("#username").change(function()
    {
        var vname = $('#username');
        var status = checkUsername(vname.val());
        if (status) {
//            $('#p22').text("* username already exists  *");
            Lobibox.alert("error", {
                msg: " username already exists  "
            });
            $("#username").val("");
        } else {
            $('#p22').text("");
        }
        return false;
    });


//
    $("#createvendorbtn").click(function() {

//        Lobibox.confirm({
//            msg: "Are you sure you want to Create Vendor ?",
//            callback: function(lobibox, type) {
//                console.log("type: " + type);
//                if (type === 'yes')
//                {
//                    console.log("ok");
//                    $("#createvendorform").submit();
//                }
//                else if (type === 'no')
//                {
//                    console.log("no");
//                }
//            }
//        });
    });

    $("#vendorCodeName").click(function() {
        console.log("vendorCodeName click");
        $("#lastVMSno").val("1");
        $("#overlay").css("display", "block");
        $("#vendorMasterModal").modal("hide");
        setTimeout(function() {
            findVendorsFromVendorMaster();
            $("#overlay").css("display", "none");
            $("#vendorMasterModal").modal("show");
        }, 1000);
    });
    
    $("#vendorMasterTable").on("click", ".vendorMasterTr", function() {
        console.log("vendorMasterTr click");
        var vendorCode = $(this).find("td").eq(0).text();
        var vendorName = $(this).find("td").eq(1).text();
        
        console.log("vendorCode: " + vendorCode);
        console.log("vendorName: " + vendorName);
        
        $('#code').val(vendorCode);
        $('#vendorCodeName').val(vendorName);
        $("#vendorMasterModal").modal("hide");
        
        autoPopulateVendorDetailsFromVendorMasterByCode(vendorCode);
    });
    
//    $("#vendorCodeName").change(function() {
//        var code = $("#code").val();
//        console.log("code: " + code);
//
//        $.ajax({
//            type: "GET",
//            url: "ajaxcontroller.do",
//            async: false,
//            data: {
//                "reqFrom": "findMasterVendorByVendorCode",
//                "vendorCode": code
//            },
//            complete: function(responseJson) {
//                var obj = $.parseJSON(responseJson.responseText);
//                var name = obj.VENDORNAME;
//                var organization = obj.ORGANIZATION;
//                var address = obj.ADDRESS;
//                var paymentterm = obj.PAYMENTTERM;
//                var compcode = obj.COMPANY_CODE;
//
//                var city = obj.CITY;
//                var contactNo = obj.CONTACT_NO;
//                var country = obj.COUNTRY;
//                var postalCode = obj.POSTAL_CODE;
//
//                $("#organization").val(organization + " - " + compcode);
//                $("#firstname").val(name);
//                $("#address").val(address);
//                $("#paymentTerms").val(paymentterm);
//
//                $("#city").val(city);
//                $("#country").val(country);
//                $("#postalcode").val(postalCode);
//                $("#contactnumberoff").val(contactNo);
//            }
//        });
//    });

//for update

    $("#update_username").change(function()
    {
        var vname = $('#update_username');
        var status = checkUsername(vname.val());
        if (status) {
//            $('#u_p22').text("* username already exists  *");
            Lobibox.alert("error", {
                msg: " username already exists  "
            });
            $("#update_username").val("");
        } else {
            $('#u_p22').text("");
        }
    });




    $("#updatevendorbtn").click(function() {

//        Lobibox.confirm({
//            msg: "Are you sure you want to Update Vendor ?",
//            callback: function(lobibox, type) {
//                console.log("type: " + type);
//                if (type === 'yes')
//                {
//                    console.log("ok");
//                    $("#updatevendorform").submit();
//                }
//                else if (type === 'no')
//                {
//                    console.log("no");
//                }
//            }
//        });
    });

//    $("#update_prospectvendorname").change(function() {
////        alert("dvv");
//        var name = $(this).val();
//        console.log("name: " + name);
//        var size = checkProspectAvailibility(name);
////        alert(size);
//        console.log("size: " + size);
//        if (size > 0)
//        {
//            Lobibox.alert("error", {
//                msg: "Prospect Already Added!"
//            });
//            $(this).val("");
//        }
//    });
//
    $("#vendors").change(function() {
//        alert($(this).val());
//        alert($("#vendors option:selected").parent().prop("label"));
//        alert($("#vendors option:selected").val());

        var selected = $(':selected', this);
//        alert(selected.closest('optgroup').prop('label'));

        $("#vendorids").val($(this).val());
    });

//    $('select.selectpicker').on('change', function() {
//        var selected = $('#vendors option:selected').val();
//        alert(selected);
//    });

    $("#country").change(function() {
        var country = $("#country").val();
        $.ajax({
            type: "GET",
            url: "standalonepoajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "findCountryCodeByCountryName",
                "country": country
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log(obj.Data.COUNTRYCODE);
                var countrycode = obj.Data.COUNTRYCODE;
                $("#countrycode").val(countrycode);
            }
        });
    });

    $("#update_country").change(function() {
        var update_country = $("#update_country").val();
//        alert(update_country);
        $.ajax({
            type: "GET",
            url: "standalonepoajaxrequest.do",
            async: false,
            data: {
                "reqFrom": "findCountryCodeByCountryName",
                "country": update_country
            },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
                console.log(obj.Data.COUNTRYCODE);
                var countrycode = obj.Data.COUNTRYCODE;
                $("#update_countrycode").val(countrycode);

            }
        });
    });
    $("#vendordetails").on("click", ".delete-vendor", function() {
        var vendorid = $(this).parent().parent().find("td").eq(25).text();
//        alert(vendorid);
        Lobibox.confirm({
            msg: "Are you sure you want to delete this vendor ?",
            callback: function(lobibox, type) {
                console.log("type: " + type);
                if (type === 'yes')
                {
                    console.log("ok");
                    $.ajax({
                        type: "GET",
                        url: "ajaxcontroller.do",
                        async: false,
                        data: {
                            "reqFrom": "ChangeVendorStatus",
                            "vendorid": vendorid,
                            "operation": "Delete"
                        },
                        complete: function() {
                            Lobibox.alert("success", //AVAILABLE TYPES: "error", "info", "success", "warning"
                                    {
                                        msg: "Vendor deleted successfully."
                                    });
                            location.href = "createvendor.do";
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
    $("#vendordetails").on("click", ".block-vendor", function() {
        var vendorid = $(this).parent().parent().find("td").eq(25).text();
//        alert(vendorid);
        Lobibox.confirm({
            msg: "Are you sure you want to block this vendor ?",
            callback: function(lobibox, type) {
                console.log("type: " + type);
                if (type === 'yes')
                {
                    console.log("ok");
                    $.ajax({
                        type: "GET",
                        url: "ajaxcontroller.do",
                        async: false,
                        data: {
                            "reqFrom": "ChangeVendorStatus",
                            "vendorid": vendorid,
                            "operation": "Block"
                        },
                        complete: function() {
                            Lobibox.alert("success", //AVAILABLE TYPES: "error", "info", "success", "warning"
                                    {
                                        msg: "Vendor blocked successfully."
                                    });
                            location.href = "createvendor.do";
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
    $("#vendordetails").on("click", ".unblock-vendor", function() {
        var vendorid = $(this).parent().parent().find("td").eq(25).text();
//        alert(vendorid);
        Lobibox.confirm({
            msg: "Are you sure you want to unblock this vendor ?",
            callback: function(lobibox, type) {
                console.log("type: " + type);
                if (type === 'yes')
                {
                    console.log("ok");
                    $.ajax({
                        type: "GET",
                        url: "ajaxcontroller.do",
                        async: false,
                        data: {
                            "reqFrom": "ChangeVendorStatus",
                            "vendorid": vendorid,
                            "operation": "Active"
                        },
                        complete: function() {
                            Lobibox.alert("success", //AVAILABLE TYPES: "error", "info", "success", "warning"
                                    {
                                        msg: "Vendor unblocked successfully."
                                    });
                            location.href = "createvendor.do";
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

    $("#prospectdetailstable").on("click", ".delete-prospect", function() {
        var vendorid = $(this).parent().parent().find("td").eq(0).find(".propect-id").val();
//        alert(vendorid);
        Lobibox.confirm({
            msg: "Are you sure you want to delete this prospect ?",
            callback: function(lobibox, type) {
                console.log("type: " + type);
                if (type === 'yes')
                {
                    console.log("ok");
                    $.ajax({
                        type: "GET",
                        url: "ajaxcontroller.do",
                        async: false,
                        data: {
                            "reqFrom": "ChangeVendorStatus",
                            "vendorid": vendorid,
                            "operation": "Delete"
                        },
                        complete: function() {
                            Lobibox.alert("success", //AVAILABLE TYPES: "error", "info", "success", "warning"
                                    {
                                        msg: "Prospect deleted successfully."
                                    });
                            location.href = "propectmanagement.do";
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

    $("#prospectdetailstable").on("click", ".block-prospect", function() {
        var vendorid = $(this).parent().parent().find("td").eq(0).find(".propect-id").val();
//        alert(vendorid);
        Lobibox.confirm({
            msg: "Are you sure you want to block this prospect ?",
            callback: function(lobibox, type) {
                console.log("type: " + type);
                if (type === 'yes')
                {
                    console.log("ok");
                    $.ajax({
                        type: "GET",
                        url: "ajaxcontroller.do",
                        async: false,
                        data: {
                            "reqFrom": "ChangeVendorStatus",
                            "vendorid": vendorid,
                            "operation": "Block"
                        },
                        complete: function() {
                            Lobibox.alert("success", //AVAILABLE TYPES: "error", "info", "success", "warning"
                                    {
                                        msg: "Prospect Blocked successfully."
                                    });
                            location.href = "propectmanagement.do";
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
    $("#prospectdetailstable").on("click", ".unblock-prospect", function() {
        var vendorid = $(this).parent().parent().find("td").eq(0).find(".propect-id").val();
//        alert(vendorid);
        Lobibox.confirm({
            msg: "Are you sure you want to unblock this prospect ?",
            callback: function(lobibox, type) {
                console.log("type: " + type);
                if (type === 'yes')
                {
                    console.log("ok");
                    $.ajax({
                        type: "GET",
                        url: "ajaxcontroller.do",
                        async: false,
                        data: {
                            "reqFrom": "ChangeVendorStatus",
                            "vendorid": vendorid,
                            "operation": "Active"
                        },
                        complete: function() {
                            Lobibox.alert("success", //AVAILABLE TYPES: "error", "info", "success", "warning"
                                    {
                                        msg: "Prospect Unblocked successfully."
                                    });
                            location.href = "propectmanagement.do";
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

    $("#changevendorpasswordbtn").click(function() {
        //alert("sunil");
        var vendorid = $("#updatevendor_id").val();
        //alert(vendorid);
        location.href = "resetvendorpassword.do?vendorid=" + vendorid;

    });

//    $("#prospectvendorname").change(function() {
////        alert("dvv");
//        var name = $(this).val();
//        console.log("name: " + name);
//        var size = checkProspectAvailibility(name);
////        alert(size);
//        console.log("size: " + size);
//        if (size > 0)
//        {
//            Lobibox.alert("error", {
//                msg: "Prospect Already Added!"
//            });
//            $(this).val("");
//        }
//    });
    var totalVendorIds = [];
    $("#sendMessageToAllVendorsModalBtn").click(function() {
        $("#sendMessageToAllVendorModal").modal("hide");
        $("#overlay").css("display", "block");
        var vendorIds = "";
        var noOfVendor = $(vendorNotificationTable.rows().data()).length;

        for (var i = 0; i < noOfVendor; i++)
        {
//            vendorIds += $(vendorNotificationTable.rows().data()[i][0]).val() + ",";
            totalVendorIds.push($(vendorNotificationTable.rows().data()[i][0]).val());
        }
        console.log("totalVendorIds: " + totalVendorIds);

        if ($("#vendorids").val() === "") {
            $("#vendorids").val(totalVendorIds);
        }
        $("#sendmessagetoallvendorform").submit();
    });

    var vendorIds = [];
    $("#vendornotification").on("click", ".vendor-checkbox-class", function() {
        var vendorId = $(this).val();
        var isChecked = $(this).prop("checked");
        if (isChecked == true) {
            vendorIds.push(vendorId);
        } else {
            var index = vendorIds.indexOf(vendorId);
            vendorIds.splice(index, 1);
        }
        console.log("vendorIds: " + vendorIds);
        $("#vendorids").val(vendorIds);
    });

    $("#customFile").change(function(e) {
//       alert($(this).val()); 
        var fileName = e.target.files[0].name;
//       alert(fileName);
        $("#file_name").html(fileName);
    });

});

function checkUsername(uname) {
    var status = false;
    $.ajax(
            {
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data:
                        {
                            "reqFrom": "VendorUsernameAvailibility",
                            "username": uname
                        },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
                    if (obj.size != 0) {
                        status = true;
                    }
                },
            });
    return status;
}
function checkProspectAvailibility(name)
{
    var size = '';

    $.ajax(
            {
                type: "GET",
                url: "ajaxcontroller.do",
                async: false,
                data:
                        {
                            "reqFrom": "CheckProspectAvailibility",
                            "name": name
                        },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
//                    alert(obj.size);
                    size = obj.size;
                },
                error: function(data) {
                    alert("dataFail");
                }
            });
    return size;
}
