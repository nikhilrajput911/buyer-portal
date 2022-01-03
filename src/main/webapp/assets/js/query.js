$(document).ready(function() {

    $("#overlay").css("display", "none");


    $("#rfqnumber").change(function() {
//       alert($(this).val());
        var rfq_no = $(this).val();


        $.ajax(
                {
                    type: "GET",
                    url: "ajaxcontroller.do",
                    async: false,
                    data:
                            {
                                "reqFrom": "VendorByRfqId",
                                "rfqNumber": rfq_no
                            },
                    dataType: "json",
                    complete: function(responseJson)
                    {
                        var obj = $.parseJSON(responseJson.responseText);

                        var vendorids = "";
                        var mappingIds = "";

                        if (obj.Data.length > 0)
                        {
                            $("#sendMessageToAllBtn").removeClass("hidden");
                        }
                        else
                        {
                            $("#sendMessageToAllBtn").addClass("hidden");
                        }
                        var row = "";

                        for (var i = 0; i < obj.Data.length; i++)
                        {

                            if (i === obj.Data.length - 1)
                            {
                                vendorids += obj.Data[i].VENDOR_ID;
                                mappingIds += obj.Data[i].MAPPING_ID;
                            }
                            else
                            {
                                vendorids += obj.Data[i].VENDOR_ID + ",";
                                mappingIds += obj.Data[i].MAPPING_ID + ",";
                            }

                            row += "<tr><td><input type='hidden' class='mappingId-class' value='" + obj.Data[i].MAPPING_ID + "'><input type='checkbox' id='responseId' class='response_Class' value=" + obj.Data[i].VENDOR_ID + "></td><td><a href='responsemanagement.do?rfqid=" + obj.Data[i].RFQ_ID + "&vendorid=" + obj.Data[i].VENDOR_ID + "&mappingId=" +  + obj.Data[i].MAPPING_ID + "' title='Chat' data-toggle='tooltip' data-placement='auto'><i class='fas fa-comments fa-lg'></i></a></td><td>" + (i + 1) + "</td><td>" + obj.Data[i].VENDOR_NAME + "<input type='hidden' id='responseRfqNo' class='responseRfqNo-class' value="+rfq_no+"></td><td>" + obj.Data[i].RFQ_NUMBER + "</td><td>" + obj.Data[i].RFQ_STATUS + "</td><td>" + obj.Data[i].RFQ_REQ_DATE + "</td><td>" + obj.Data[i].RFQ_CLOSES_ON + "</td><td>" + obj.Data[i].RFQ_TITLE + "</td></tr>";
                        }
                        $("#rfqid").val(rfq_no);
                        $("#vendorids").val(vendorids);
                        $("#mappingIds").val(mappingIds);

                        $("#mytasktable").children("tbody").html(row);
//                        $("#mytasktable").css('color','red');

                        if ($.fn.DataTable.isDataTable('#mytasktable')) {
                            table.fnDestroy();
                            $("#mytasktable").children('tbody').html(row);
                            table = $('#mytasktable').dataTable();
                            //                            table.resetPaging();
                            table.fnReloadAjax();
                            table = $('#mytasktable').dataTable({
                            });
                        }
                        else
                        {

                            table = $('#mytasktable').dataTable({});
                        }

                    }
                });
    });


    var vendorIds = [];
    var mappingIds = [];
    $("#mytasktable").on('click', '.response_Class', function() {
        var vendorid = $(this).val();
        var mappingId = $(this).parent().children(".mappingId-class").val();
        var rfqno = $(this).parent().parent().find("td").eq(3).children(".responseRfqNo-class").val();

        var isChecked = $(this).prop("checked");
        if (isChecked == true) {
            vendorIds.push(vendorid);
            mappingIds.push(mappingId);
        } else {
            var index = vendorIds.indexOf(vendorid);
            vendorIds.splice(index, 1);
            
            var mappIndex = mappingIds.indexOf(mappingId);
            mappingIds.splice(mappIndex, 1);
        }

        $("#rfqid").val(rfqno);
        $("#vendorids").val(vendorIds);
        $("#mappingIds").val(mappingIds);
    });

    $("#customFile").change(function(e) {
//       alert($(this).val()); 
        var fileName = e.target.files[0].name;
//       alert(fileName);
        $("#file_name").html(fileName);
    });

    $("#sendMessageToAllModalBtn").click(function() {
        $("#sendMessageToAllModal").modal("hide");
        $("#overlay").css("display", "block");
        $("#sendmessagetoallform").submit();
    });

});