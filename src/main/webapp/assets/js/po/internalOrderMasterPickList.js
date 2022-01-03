$(document).ready(function() {
    console.log("Inside internalOrderPickList js:");

    $("#clearSearchInternalOrderBtn").click(function() {
        $("#internalOrderOrDesc_SearchText").val("");
        $("#lastIOSno").val("1");
    });
    
    $("#internalOrderRecordCount").change(function() {
        $("#lastIOSno").val("1");
    });
    
    $("#searchInternalOrderBtn").click(function() {
        $("#lastIOSno").val("1");
        $("#overlay").css("display", "block");
        $("#accAsgnOrderModal").modal("hide");
        setTimeout(function() {
            getAllInterOrder();
            $("#overlay").css("display", "none");
            $("#accAsgnOrderModal").modal("show");
        }, 1000);
    });

    $("#searchInternalOrderNextBtn").click(function() {
        $("#overlay").css("display", "block");
        $("#accAsgnOrderModal").modal("hide");
        
        var nextPageNo = Number($("#lastIOSno").val()) + 1;
        $("#lastIOSno").val(nextPageNo);
        
        setTimeout(function() {
            getAllInterOrder();
            $("#overlay").css("display", "none");
            $("#accAsgnOrderModal").modal("show");
        }, 1000);
        
        $("#searchInternalOrderPrevBtn").prop("disabled", false);
    });

    $("#searchInternalOrderPrevBtn").click(function() {        
        var prevPageNo = Number($("#lastIOSno").val()) - 1;
        $("#lastIOSno").val(prevPageNo);

        $("#overlay").css("display", "block");
        $("#accAsgnOrderModal").modal("hide");
        setTimeout(function() {
            getAllInterOrder();
            $("#overlay").css("display", "none");
            $("#accAsgnOrderModal").modal("show");
        }, 1000);
        
        if(Number(prevPageNo) === 1)
            $("#searchInternalOrderPrevBtn").prop("disabled", true);
        else
            $("#searchInternalOrderPrevBtn").prop("disabled", false);
    });
});