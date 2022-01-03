/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {

    $("#overlay").css("display", "none");

    $('#rfqvaliduntil').datetimepicker({
        format: 'DD.MM.YYYY',
        minDate: new Date()
    });
    
    //Girivasu
    $('#rfqcloseson').datetimepicker({
        format: 'DD-MM-YYYY',
        minDate: new Date()
    });
    //Girivasu

    $("#rfpdataform").submit(function(e) {
//        alert('submit intercepted');
//        e.preventDefault();

//        Lobibox.confirm({
//            msg: "Are you sure you want to update RFQ?",
//            callback: function(lobibox, type) {
//                console.log("type: " + type);
//                if (type === 'yes')
//                {
//                    console.log("ok 1");
//                    e.currentTarget.submit();
//                    console.log("ok 2");
////                    return true;
//                }
//                else if (type === 'no')
//                {
//                    console.log("no");
////                    return false;
//                }
//            }
//        });
////        return false;
    });
    var itemNumberCount = 10;
    $("#addRowBtn").click(function() {
//        alert("asdsad");
        var rfpCreationDate = $("#rfpCreationDate").val();

        itemNumberCount += 10;
        var row = "<tr>"
                + "<td><a href='#' title='Delete Row' class='deleteRow'><i class='fas fa-trash-alt'></i></a></td>"
//                + "<td>1</td>"
                + "<td><input type='text' value='" + itemNumberCount + "' class='itemNumberClass' name='itemNumberClass' readonly></td>"
                + "<td><input type='hidden' class='plantIdClass' name='plantIdClass'><input type='text' class='plantClass'></td>"
                + "<td><input type='hidden' class='materialIdClass' name='materialIdClass'><input type='text' class='materialCodeClass'> <input type='text' class='oldMaterialCodeClass'> <input type='text' class='shortTextClass'></td>"
                + "<td><input type='text' class='plantCodeClass'> <input type='text' class='plantDescClass'></td>"
                + "<td><input type='date' name='deliveryDateClass' class='deliveryDateClass' min='" + rfpCreationDate + "'> <input type='text'></td>"
                + "<td><input type='text' class='longTextLineClass'></td>"
                + "<td><input type='text' class='itemTextClass'></td>"
                + "<td><input type='text' class='uomClass'></td>"
                + "<td><input type='number' name='quantityClass'> <input type='text' class='uomStoreClass'></td>"
                + "<td><input type='text' class='localPurchaseClass' name='localPurchaseClass'></td>"
                + "<td><input type='text' class='storageLocationClass'></td>"
                + "<td><input type='text'> <input type='text'></td>"
                + "<td><input type='text' name='notesToSupplierClass'></td>"
                + "<td><input type='text' class='miqaMaterialClass' readonly></td>"
                + "</tr>";

        $("#rfp_line_items_data_table tbody").append(row);
    });

    $("#rfp_line_items_data_table").on("click", ".deleteRow", function() {
//       alert("sdasd"); 
        itemNumberCount -= 10;
        $(this).parent().parent().remove();
    });

    var currentPlantRow = '';
    $("#rfp_line_items_data_table").on("click", ".plantClass", function() {
//       alert("sdasd"); 
        currentPlantRow = $(this).parent().parent();
        $("#plantMasterModal").modal("show");
    });

    var currentMaterialRow = '';
    $("#rfp_line_items_data_table").on("click", ".materialCodeClass", function() {
//       alert("sdasd"); 
        currentMaterialRow = $(this).parent().parent();
        $("#materialMasterModal").modal("show");
    });
    $(".longTextClass").click(function() {
        $("#longTextModal").modal("show");
        var longtext = $(this).parent().children().eq(1).val();
        $('div.longtext').text(longtext);
    });
    $(".plantRowClass").click(function() {
        var plantId = $(this).find('td').eq(0).children(".plantMasterIdClass").val();
        var plantName = $(this).find('td').eq(0).text();
        var platCode = $(this).find('td').eq(1).text();
        var platDesc = $(this).find('td').eq(2).text();
        console.log(plantName.trim());
        currentPlantRow.find('td').eq(2).children(".plantIdClass").val(plantId);
        currentPlantRow.find('td').eq(2).children(".plantClass").val(plantName.trim());
        currentPlantRow.find('td').eq(4).children(".plantDescClass").val(platDesc);
        $("#plantMasterModal").modal("hide");
    });
    $(".materialRowClass").click(function() {
        var materialId = $(this).find('td').eq(0).children(".materialMasterIdClass").val();
        var materialCode = $(this).find('td').eq(0).text();
        var companyCode = $(this).find('td').eq(1).text();
        var plantCode = $(this).find('td').eq(2).text();
        var shortText = $(this).find('td').eq(3).text();
        var longText = $(this).find('td').eq(4).children(".longTextHiddenClass").val();
        var storageLocation = $(this).find('td').eq(5).text();
        var baseUOM = $(this).find('td').eq(8).text();
        var UOMStore = $(this).find('td').eq(9).text();
        var oldMaterialNo = $(this).find('td').eq(10).text();
        var countryOfOrigin = $(this).find('td').eq(12).text();
        var localPurchase = '';
        console.log("materialCode: " + materialCode.trim());
        console.log("companyCode: " + companyCode);
        console.log("plantCode: " + plantCode);
        console.log("shortText: " + shortText);
        console.log("longText: " + longText);
        console.log("storageLocation: " + storageLocation);
        console.log("baseUOM: " + baseUOM);
        console.log("UOMStore: " + UOMStore);
        console.log("oldMaterialNo: " + oldMaterialNo);
        console.log("countryOfOrigin: " + countryOfOrigin);
        if (countryOfOrigin === 'SG')
        {
            localPurchase = 'Y';
        } else if (countryOfOrigin === 'FO')
        {
            localPurchase = 'N';
        }
        console.log("localPurchase: " + localPurchase);
        currentMaterialRow.find('td').eq(3).children(".materialIdClass").val(materialId);
        currentMaterialRow.find('td').eq(3).children(".materialCodeClass").val(materialCode.trim());
        currentMaterialRow.find('td').eq(3).children(".oldMaterialCodeClass").val(oldMaterialNo);
        currentMaterialRow.find('td').eq(3).children(".shortTextClass").val(shortText);
        currentMaterialRow.find('td').eq(4).children(".plantCodeClass").val(plantCode);
        currentMaterialRow.find('td').eq(6).children(".longTextLineClass").val(longText);
        currentMaterialRow.find('td').eq(8).children(".uomClass").val(baseUOM);
        currentMaterialRow.find('td').eq(9).children(".uomStoreClass").val(UOMStore);
        currentMaterialRow.find('td').eq(10).children(".localPurchaseClass").val(localPurchase);
        currentMaterialRow.find('td').eq(11).children(".storageLocationClass").val(storageLocation);
        currentMaterialRow.find('td').eq(14).children(".miqaMaterialClass").val(countryOfOrigin);

        $("#materialMasterModal").modal("hide");
    });

    $("#contactpersonename").change(function() {
        var contactpersonename = $("#contactpersonename").val();
        if (contactpersonename === '') {
            $("#parsley-id-11").addClass("parsley-errors-list");
            $("#parsley_contactpersonename").text("This value is required.");
        } else {
//        var name_regex = /^[a-zA-Z]+$/;
            var name_regex = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
            if (!name_regex.test(contactpersonename)) {
//                        alert(deliveryterms);
                $("#parsley-id-11").addClass("parsley-errors-list");
                $("#parsley_contactpersonename").text("Please enter only characters.");
                return false;
            } else {
                $("#parsley-id-11").removeClass("parsley-errors-list");
                $("#parsley_contactpersonename").text("");
            }
        }
    });

    $("#contactpersonetelno").change(function() {
//   alert("Bittu"); 
        var contactpersonetelno = $("#contactpersonetelno").val();
//    alert(contactpersonetelno);
        var tel_regx = /^((\(\d{3}\) ?)|(\d{3}))?\d{3}\d{4}$/;
        if (contactpersonetelno === '') {
            $("#parsley-id-22").addClass("parsley-errors-list");
            $("#parsley_contactpersonetelno").text("This value is required.");
            return false;
        } else
        if (tel_regx.test(contactpersonetelno)) {
            $("#parsley-id-22").removeClass("parsley-errors-list");
            $("#parsley_contactpersonetelno").text("");
        } else if ($.isNumeric(contactpersonetelno)) {
            $("#parsley-id-22").addClass("parsley-errors-list");
            $("#parsley_contactpersonetelno").text("This field should contain exactly 10 digits.");
            return false;
        } else {
            $("#parsley-id-22").addClass("parsley-errors-list");
            $("#parsley_contactpersonetelno").text("This value seems to be invalid.");
            return false;
        }
        if (contactpersonetelno.length !== 10)
        {
            $("#parsley-id-22").addClass("parsley-errors-list");
            $("#parsley_contactpersonetelno").text("This field should contain exactly 10 digits.");
            return false;
        }
    });
    $("#contactpersoneemail").change(function() {
        var contactpersoneemail = $("#contactpersoneemail").val();
        var email_reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
//    var email_reg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
        if (contactpersoneemail === '')
        {
            $("#parsley-id-33").addClass("parsley-errors-list");
            $("#parsley_contactpersoneemail").text("This value is required.");
            return false;
        }
        else if (email_reg.test(contactpersoneemail))
        {
//        alert(contactpersoneemail);
            $("#parsley-id-33").removeClass("parsley-errors-list");
            $("#parsley_contactpersoneemail").text(" ");
        }
        else
        {
            $("#parsley-id-33").addClass("parsley-errors-list");
            $("#parsley_contactpersoneemail").text("This value seems to be invalid.");
            return false;
        }
        var email = contactpersoneemail.split(".");
        if (email.length === 2 && email[1].length === 2)
        {
            $("#parsley-id-33").addClass("parsley-errors-list");
            $("#parsley_contactpersoneemail").text("This value seems to be invalid.");
            return false;
        }
    });
    $("#deliveryterms").change(function() {
        var deliveryterms = $("#deliveryterms").val();
        if (deliveryterms === '') {
            $("#parsley-id-44").addClass("parsley-errors-list");
            $("#parsley_deliveryterms").text("This value is required.");
        } else {
            var terms_regex = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
            if (!terms_regex.test(deliveryterms)) {
//                        alert(deliveryterms);
                $("#parsley-id-44").addClass("parsley-errors-list");
                $("#parsley_deliveryterms").text("Please enter only characters.");
                return false;
            } else {
                $("#parsley-id-44").removeClass("parsley-errors-list");
                $("#parsley_deliveryterms").text("");
            }
        }
    });
    $("#paymentterms").change(function() {
        $("#parsley-id-55").removeClass("parsley-errors-list");
        $("#parsley_paymentterms").text("");
    });
    $("#rfqvaliduntil").blur(function() {
        $("#parsley-id-66").removeClass("parsley-errors-list");
        $("#parsley_rfqvaliduntil").text("");
    });
    $("#expecteddeliverydate").blur(function() {
        $("#parsley-id-77").removeClass("parsley-errors-list");
        $("#parsley_expecteddeliverydate").text("");
    });
    $("#rfpType").change(function() {
        if ($(this).val() !== '') {
            $("#parsley-id-88").removeClass("parsley-errors-list");
            $("#parsley_rfptype").text("");
        }
        else
        {
            $("#parsley-id-88").addClass("parsley-errors-list");
            $("#parsley_rfptype").text("This value is required.");
        }
    });

    $("#vendorname_rfp").change(function() {

//alert("Hi");
        var vendorid = $("#vendorname_rfp option:selected").val();
//    alert(vendorid);
        $.ajax({
            type: "GET",
            url: "ajaxcontroller.do",
            async: false,
            data:
                    {
                        "reqFrom": "getVendorById",
                        "vendorid": vendorid
                    },
            complete: function(responseJson) {
                var obj = $.parseJSON(responseJson.responseText);
//            console.log(obj.Data.ADDRESS);
//            for(i=0;i<obj.Data.length;i++){
//                console.log(obj.Data[i].ADDRESS);
//            }
                console.log(obj.Data.ADDRESS);
                console.log(obj.Data.EMAILID);
                console.log(obj.Data.COMPANYCODE);

                var address = obj.Data.ADDRESS;
                var emailid = obj.Data.EMAILID;
                var companycode = obj.Data.COMPANYCODE;

                $("#vendoraddress_rfp").val(address);
                $("#vendoremail_rfp").val(emailid);
                $("#companycode_rfp").val(companycode);
            }
        });
    });

    var vendor_rfp = [];
    $("#groupselect_rfp").change(function() {
//       alert('Bittu');
        var groupid = $(this).val();

//        if (groupid !== 'all') {
        $("#rfp_vendor_table tbody tr").remove();
//        var id= "";
        $("#ro_vendorname").val(vendor_rfp.toString());
        $.ajax(
                {
                    type: "GET",
                    url: "ajaxcontroller.do",
                    async: false,
                    data:
                            {
                                "reqFrom": "VendorByGroup",
                                "GroupId": groupid + ""
                            },
                    dataType: "json",
                    complete: function(responseJson)
                    {
                        var obj = $.parseJSON(responseJson.responseText);

                        console.log(obj.Data.length);
                        if (obj.Data.length <= 0) {
                            Lobibox.alert("error", {
                                msg: "There are no vendors in this group, please select another group."
                            });

                        } else {

                            for (var i = 0; i < obj.Data.length; i++)
                            {
                                if (obj.Data[i].TYPE === "Vendor")
                                {
                                    var row = "";
                                    row = "<tr><td>" + obj.Data[i].VENDOR_NAME + "</td><td>" + obj.Data[i].COMPANY_CODE + "</td><td>" + obj.Data[i].ADDRESS + "</td><td>" + obj.Data[i].EMAIL + "</td><td><i class='fa fa-trash deleteRow'></i><input type='hidden' class='vendorclass' name='vendorid' value=" + obj.Data[i].VENDOR_ID + "></td></tr>";

                                    $("#rfp_vendor_table").children("tbody").append(row);

//                                $("#ro_vendorname").val(obj.Data[i].VENDOR_ID);
                                    var vendorid = obj.Data[i].VENDOR_ID;
                                    vendor_rfp.push(vendorid);
                                    $("#ro_vendorname_rfp").val(vendor_rfp.toString());

                                }
                            }
                        }
                    }
                });
        vendor_rfp = [];
    });
});

if ($("table.plantMasterTable").length) {

    $(document).ready(function() {

        $('#plantMasterTable thead tr').clone(true).appendTo('#plantMasterTable thead');
        $('#plantMasterTable thead tr:eq(1) th').each(function(i) {
            $('#plantMasterTable thead tr:eq(0) th').addClass("table-header-color");
            var title = $(this).text();
            if (title === '') {
                $(this).html('');
            } else {
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

        var table = $('table.plantMasterTable').DataTable({
//            "scrollY": 200,
//            "scrollX": true,
            lengthChange: false,
            orderCellsTop: true,
            fixedHeader: true,
            buttons: [
                {
                    extend: 'collection',
                    text: 'Export',
                    buttons: ['excel', 'pdf', 'print']
                }
            ]
        });
        table.buttons().container()
                .appendTo('#plantMasterTable_wrapper .col-md-6:eq(0)');
    });
}
if ($("table.materialMasterTable").length) {

    $(document).ready(function() {

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
                if (table.column(i).search() !== this.value) {
                    table
                            .column(i)
                            .search(this.value)
                            .draw();
                }
            });
        });

        var table = $('table.materialMasterTable').DataTable({
//            "scrollY": 200,
//            "scrollX": true,
            lengthChange: false,
            orderCellsTop: true,
            fixedHeader: true,
            buttons: [
                {
                    extend: 'collection',
                    text: 'Export',
                    buttons: ['excel', 'pdf', 'print']
                }
            ]
        });
        table.buttons().container()
                .appendTo('#materialMasterTable_wrapper .col-md-6:eq(0)');
    });
}