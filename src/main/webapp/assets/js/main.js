$(document).ready(function() {

});
$(function() {
//    $('.vendorCodeName').autocomplete({
//        minLength: 3,
//        source: function(request, response) {
//            $.ajax({
//                url: "standalonepoajaxrequest.do",
//                async: false,
//                data:
//                        {
//                            "reqFrom": "FindMasterVendorByVendorSubstringAndIsMappedNot",
//                            "vendorNameCodeSubstring": $(".vendorCodeName").val()
//                        },
//                success: function(data) {
//                    console.log(JSON.parse(data));
//
//                    response($.map(JSON.parse(data), function(obj, key) {
//                        return {
//                            label: obj.vendorCode + " - " + obj.vendorName, // Label for Display
//                            value: obj.vendorCode // Value
//                        };
//                    }));
//                }
//            });
//
//        },
//        focus: function(event, ui) {
//            event.preventDefault();
//        },
//        // Once a value in the drop down list is selected, do the following:
//        select: function(event, ui) {
//            event.preventDefault();
//            // place the person.given_name value into the textfield called 'select_origin'...
//            $('#vendorCodeName').val(ui.item.label);
//            $('#code').val(ui.item.value);
//            // ... any other tasks (like setting Hidden Fields) go here...
//        }
//    });
});