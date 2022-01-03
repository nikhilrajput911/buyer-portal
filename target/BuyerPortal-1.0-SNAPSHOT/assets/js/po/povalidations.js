$(function() {
    (function() {
        Lobibox.base.DEFAULTS = $.extend({}, Lobibox.base.DEFAULTS, {
            iconSource: 'fontAwesome',
            soundPath: 'assets/vendor/parsley/sounds/', // The folder path where sounds are located
            soundExt: '.ogg' // Default extension for all sounds
        });

        Lobibox.notify.DEFAULTS = $.extend({}, Lobibox.notify.DEFAULTS, {
            title: true, // Title of notification. If you do not include the title in options it will automatically takes its value 
            //from Lobibox.notify.OPTIONS object depending of the type of the notifications or set custom string. Set this false to disable title
            size: 'mini', // normal, mini, large
            soundPath: 'assets/vendor/lobibox/sounds/', // The folder path where sounds are located
            soundExt: '.ogg', // Default extension for all sounds
            showClass: 'fadeInDown', // Show animation class.
            hideClass: 'zoomOut', // Hide animation class.
            icon: true, // Icon of notification. Leave as is for default icon or set custom string
            msg: '', // Message of notification
            img: null, // Image source string
            closable: true, // Make notifications closable
            hideCloseButton: false, // Notification may be closable but you can hide close button and it will be closed by clicking on notification itsef
            delay: 5000, // Hide notification after this time (in miliseconds)
            delayIndicator: true, // Show timer indicator
            closeOnClick: true, // Close notifications by clicking on them
            width: 400, // Width of notification box
            sound: true, // Sound of notification. Set this false to disable sound. Leave as is for default sound or set custom soud path
            // Place to show notification. Available options: "top left", "top right", "bottom left", "bottom right", "center top", "center bottom"
            // It can also be object {left: number, top: number} to position notification at any place
            position: "bottom right",
            iconSource: 'fontAwesome', // "bootstrap" or "fontAwesome" the library which will be used for icons
            rounded: true, // Whether to make notification corners rounded
            messageHeight: 60, // Notification message maximum height. This is not for notification itself, this is for <code>.lobibox-notify-msg</code>
            pauseDelayOnHover: true, // When you mouse over on notification delay (if it is enabled) will be paused.
            onClickUrl: null, // The url which will be opened when notification is clicked
            showAfterPrevious: false, // Set this to true if you want notification not to be shown until previous notification is closed. This is useful for notification queues
            continueDelayOnInactiveTab: true, // Continue delay when browser tab is inactive
            // Events
            onClick: null
        });
    })();
});

$(document).ready(function() {
    var keyCode = 0;
    var lobiboxNotifyAlert = null;
    $("#downPaymentReqdValue").parsley().on('field:error', function() {
        var required = $("#downPaymentReqdValue").prop("required");
        var downPaymentReqdValue = $("#downPaymentReqdValue").val();
        var data_parsley_length = $("#downPaymentReqdValue").attr("data-parsley-maxlength");
        data_parsley_length = data_parsley_length.toString().replace("[", "");
        data_parsley_length = data_parsley_length.toString().replace("]", "");
        var minMaxLenArr = data_parsley_length.split(",");

        var errorMsg = "";
        if (required === true && downPaymentReqdValue === "")
        {
            errorMsg = "Value is mandatory!";
        }
        else
        {
            errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
        }
        console.log(errorMsg);
        if (keyCode !== 8 || (downPaymentReqdValue.length === 0 && required === true)) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#downPaymentReqdValue").css("border-color", "red");
        $("#downPaymentReqdValue").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#downPaymentReqdValue").parsley().isValid()) {
            $("#downPaymentReqdValue").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#downPaymentReqdValue").keyup(function(e) {
        keyCode = e.keyCode;
    });

    $("#companycodeHeader").parsley().on('field:error', function() {
        var required = $("#companycodeHeader").prop("required");

        var errorMsg = "Company Code is mandatory!";
        if (required === true) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#companycodeHeader").css("border-color", "red");
        $("#companycodeHeader").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#companycodeHeader").parsley().isValid()) {
            $("#companycodeHeader").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#typeOfPOHeader").parsley().on('field:error', function() {
        var required = $("#typeOfPOHeader").prop("required");

        var errorMsg = "PO Type is mandatory!";
        if (required === true) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#typeOfPOHeader").css("border-color", "red");
        $("#typeOfPOHeader").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#typeOfPOHeader").parsley().isValid()) {
            $("#typeOfPOHeader").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#downPaymentReqd").change(function() {
        if ($(this).val() === "Yes")
        {
            $("#downPaymentReqdValue").prop("disabled", false);
            $("#downPaymentReqdValue").prop("required", true);
            $("#downPaymentFor").prop("required", true);
        }
        else
        {
            $("#downPaymentReqdValue").prop("disabled", true);
            $("#downPaymentReqdValue").prop("required", false);
            $("#downPaymentFor").prop("required", false);
            $("#downPaymentReqdValue").css("border-color", "");
            $("#downPaymentReqdValue").val("");
        }
    });
    $("#downPaymentReqd").parsley().on('field:error', function() {
        var required = $("#downPaymentReqd").prop("required");
        var errorMsg = "Downpayment Reqd. is mandatory!";
        if (required === true) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#downPaymentReqd").css("border-color", "red");
        $("#downPaymentReqd").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#downPaymentReqd").parsley().isValid()) {
            $("#downPaymentReqd").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#paymentDays1").parsley().on('field:error', function() {
        var data_parsley_length = $("#paymentDays1").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#paymentDays1").css("border-color", "red");
        $("#paymentDays1").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#paymentDays1").parsley().isValid()) {
            $("#paymentDays1").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#paymentDays1").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#paymentPer1").parsley().on('field:error', function() {
        var data_parsley_length = $("#paymentPer1").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#paymentPer1").css("border-color", "red");
        $("#paymentPer1").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#paymentPer1").parsley().isValid()) {
            $("#paymentPer1").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#paymentPer1").keyup(function(e) {
        keyCode = e.keyCode;
    });
//    $("#ExchangeRate").parsley().on('field:error', function() {
//        var required = $("#ExchangeRate").prop("required");
//        var ExchangeRate = $("#ExchangeRate").val();
//        var data_parsley_length = $("#ExchangeRate").attr("data-parsley-maxlength");
//        var errorMsg = "";
//
//        if (required === true && ExchangeRate === "") {
//            errorMsg = "Exchange Rate is mandatory!";
//        }
//        else
//        {
//            errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
//        }
//        if (keyCode !== 8 || (ExchangeRate.length === 0 && required === true)) {
//            if (lobiboxNotifyAlert !== null)
//            {
//                lobiboxNotifyAlert.remove();
//            }
//            lobiboxNotifyAlert = Lobibox.notify("error", {
//                rounded: true,
//                delayIndicator: false,
//                msg: errorMsg
//            });
//        }
//        $("#ExchangeRate").css("border-color", "red");
//        $("#ExchangeRate").focus();
//        $("#createPoBtn").prop("disabled", true);
//    }).on('field:validated', function() {
//        if ($("#ExchangeRate").parsley().isValid()) {
//            $("#ExchangeRate").css("border-color", "");
//            $("#createPoBtn").prop("disabled", false);
//        }
//    });
//    $("#ExchangeRate").keyup(function(e) {
//        keyCode = e.keyCode;
//    });
    $("#paymentDays2").parsley().on('field:error', function() {
        var data_parsley_length = $("#paymentDays2").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#paymentDays2").css("border-color", "red");
        $("#paymentDays2").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#paymentDays2").parsley().isValid()) {
            $("#paymentDays2").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#paymentDays2").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#paymentPer2").parsley().on('field:error', function() {
        var data_parsley_length = $("#paymentPer2").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#paymentPer2").css("border-color", "red");
        $("#paymentPer2").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#paymentPer2").parsley().isValid()) {
            $("#paymentPer2").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#paymentPer2").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#paymentDaysNet").parsley().on('field:error', function() {
        var data_parsley_length = $("#paymentDaysNet").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#paymentDaysNet").css("border-color", "red");
        $("#paymentDaysNet").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#paymentDaysNet").parsley().isValid()) {
            $("#paymentDaysNet").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#paymentDaysNet").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#IncoTermsPart1").parsley().on('field:error', function() {
        var required = $("#IncoTermsPart1").prop("required");
        var IncoTermsPart1 = $("#IncoTermsPart1").val();
        var data_parsley_length = $("#IncoTermsPart1").attr("data-parsley-maxlength");
        var errorMsg = "";

        if (required === true && IncoTermsPart1 === "") {
            errorMsg = "IncoTerms Part 1 is mandatory!";
        }
        else
        {
            errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
        }
        if (keyCode !== 8 || (IncoTermsPart1.length === 0 && required === true)) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#IncoTermsPart1").css("border-color", "red");
        $("#IncoTermsPart1").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#IncoTermsPart1").parsley().isValid()) {
            $("#IncoTermsPart1").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#IncoTermsPart1").keyup(function(e) {
        keyCode = e.keyCode;
    });

//    $("#IncoTermsPart2").parsley().on('field:error', function() {
//        var required = $("#IncoTermsPart2").prop("required");
//        var IncoTermsPart2 = $("#IncoTermsPart2").val();
//        var data_parsley_length = $("#IncoTermsPart2").attr("data-parsley-maxlength");
//        var errorMsg = "";
//
//        if (required === true && IncoTermsPart2 === "") {
//            errorMsg = "IncoTerms Part 2 is mandatory!";
//        }
//        else
//        {
//            errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
//        }
//        if (keyCode !== 8 || (IncoTermsPart2.length === 0 && required === true)) {
//            if (lobiboxNotifyAlert !== null)
//            {
//                lobiboxNotifyAlert.remove();
//            }
//            lobiboxNotifyAlert = Lobibox.notify("error", {
//                rounded: true,
//                delayIndicator: false,
//                msg: errorMsg
//            });
//        }
//        $("#IncoTermsPart2").css("border-color", "red");
//        $("#IncoTermsPart2").focus();
//        $("#createPoBtn").prop("disabled", true);
//    }).on('field:validated', function() {
//        if ($("#IncoTermsPart2").parsley().isValid()) {
//            $("#IncoTermsPart2").css("border-color", "");
//            $("#createPoBtn").prop("disabled", false);
//        }
//    });
//    $("#IncoTermsPart2").keyup(function(e) {
//        keyCode = e.keyCode;
//    });
    $("#streetVendorAddress").parsley().on('field:error', function() {
        var required = $("#streetVendorAddress").prop("required");
        var streetVendorAddress = $("#streetVendorAddress").val();
        var data_parsley_length = $("#streetVendorAddress").attr("data-parsley-maxlength");
        var errorMsg = "";

        if (required === true && streetVendorAddress === "") {
            errorMsg = "Street is mandatory!";
        }
        else
        {
            errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
        }
        if (keyCode !== 8 || (streetVendorAddress.length === 0 && required === true)) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#streetVendorAddress").css("border-color", "red");
        $("#streetVendorAddress").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#streetVendorAddress").parsley().isValid()) {
            $("#streetVendorAddress").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#streetVendorAddress").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#houseNumberVendorAddress").parsley().on('field:error', function() {
        var required = $("#houseNumberVendorAddress").prop("required");
        var houseNumberVendorAddress = $("#houseNumberVendorAddress").val();
        var data_parsley_length = $("#houseNumberVendorAddress").attr("data-parsley-maxlength");
        var errorMsg = "";

        if (required === true && houseNumberVendorAddress === "") {
            errorMsg = "House Number is mandatory!";
        }
        else
        {
            errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
        }
        if (keyCode !== 8 || (houseNumberVendorAddress.length === 0 && required === true)) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#houseNumberVendorAddress").css("border-color", "red");
        $("#houseNumberVendorAddress").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#houseNumberVendorAddress").parsley().isValid()) {
            $("#houseNumberVendorAddress").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#houseNumberVendorAddress").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#postalCodeVendorAddress").parsley().on('field:error', function() {
        var data_parsley_length = $("#postalCodeVendorAddress").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!<br>Postal Code should contain only digits.";
        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#postalCodeVendorAddress").css("border-color", "red");
        $("#postalCodeVendorAddress").focus();
        $("#createPoBtn").prop("disabled", true);
        $("#saveHeadersa").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#postalCodeVendorAddress").parsley().isValid()) {
            $("#postalCodeVendorAddress").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
            $("#saveHeadersa").prop("disabled", false);
        }
    });
    $("#postalCodeVendorAddress").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#cityVendorAddress").parsley().on('field:error', function() {
        var data_parsley_length = $("#cityVendorAddress").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#cityVendorAddress").css("border-color", "red");
        $("#cityVendorAddress").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#cityVendorAddress").parsley().isValid()) {
            $("#cityVendorAddress").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#cityVendorAddress").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#extTel").parsley().on('field:error', function() {
        var data_parsley_length = $("#extTel").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#extTel").css("border-color", "red");
        $("#extTel").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#extTel").parsley().isValid()) {
            $("#extTel").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#extTel").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#telephoneVendorAddress").parsley().on('field:error', function() {
        var data_parsley_length = $("#telephoneVendorAddress").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters.<br>Only digits are allowed.";
        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#telephoneVendorAddress").css("border-color", "red");
        $("#telephoneVendorAddress").focus();
        $("#createPoBtn").prop("disabled", true);
        $("#saveHeadersa").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#telephoneVendorAddress").parsley().isValid()) {
            $("#telephoneVendorAddress").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
            $("#saveHeadersa").prop("disabled", false);
        }
    });
    $("#telephoneVendorAddress").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#extFax").parsley().on('field:error', function() {
        var data_parsley_length = $("#extFax").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#extFax").css("border-color", "red");
        $("#extFax").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#extFax").parsley().isValid()) {
            $("#extFax").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#extFax").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#faxVendorAddress").parsley().on('field:error', function() {
        var data_parsley_length = $("#faxVendorAddress").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#faxVendorAddress").css("border-color", "red");
        $("#faxVendorAddress").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#faxVendorAddress").parsley().isValid()) {
            $("#faxVendorAddress").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#faxVendorAddress").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#countryCodeVendorAddress").parsley().on('field:error', function() {
        var data_parsley_length = $("#countryCodeVendorAddress").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#countryCodeVendorAddress").css("border-color", "red");
        $("#countryCodeVendorAddress").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#countryCodeVendorAddress").parsley().isValid()) {
            $("#countryCodeVendorAddress").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#countryCodeVendorAddress").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#countryVendorAddress").parsley().on('field:error', function() {
        var data_parsley_length = $("#countryVendorAddress").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#countryVendorAddress").css("border-color", "red");
        $("#countryVendorAddress").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#countryVendorAddress").parsley().isValid()) {
            $("#countryVendorAddress").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#countryVendorAddress").keyup(function(e) {
        keyCode = e.keyCode;
    });

    $("#Salesperson").parsley().on('field:error', function() {
        var required = $("#Salesperson").prop("required");
        var Salesperson = $("#Salesperson").val();
        var data_parsley_length = $("#Salesperson").attr("data-parsley-maxlength");
        var errorMsg = "";

        if (required === true && Salesperson === "") {
            errorMsg = "Salesperson is mandatory!";
        }
        else
        {
            errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
        }
        if (keyCode !== 8 || (Salesperson.length === 0 && required === true)) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#Salesperson").css("border-color", "red");
        $("#Salesperson").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#Salesperson").parsley().isValid()) {
            $("#Salesperson").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#Salesperson").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#YourReference").parsley().on('field:error', function() {
        var data_parsley_length = $("#YourReference").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#YourReference").css("border-color", "red");
        $("#YourReference").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#YourReference").parsley().isValid()) {
            $("#YourReference").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#YourReference").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#Telephone").parsley().on('field:error', function() {
        var data_parsley_length = $("#Telephone").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters.<br>Only digits are allowed.";
        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#Telephone").css("border-color", "red");
        $("#Telephone").focus();
        $("#createPoBtn").prop("disabled", true);
        $("#saveHeadersa").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#Telephone").parsley().isValid()) {
            $("#Telephone").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
            $("#saveHeadersa").prop("disabled", false);
        }
    });
    $("#Telephone").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#OurReference").parsley().on('field:error', function() {
        var data_parsley_length = $("#OurReference").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#OurReference").css("border-color", "red");
        $("#OurReference").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#OurReference").parsley().isValid()) {
            $("#OurReference").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#OurReference").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#CollectiveNumber").parsley().on('field:error', function() {
        var data_parsley_length = $("#CollectiveNumber").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#CollectiveNumber").css("border-color", "red");
        $("#CollectiveNumber").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#CollectiveNumber").parsley().isValid()) {
            $("#CollectiveNumber").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#CollectiveNumber").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#purchasingOrg").parsley().on('field:error', function() {
        var required = $("#purchasingOrg").prop("required");

        var errorMsg = "Purchasing Organization is mandatory!";
        if (required === true) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#purchasingOrg").css("border-color", "red");
        $("#purchasingOrg").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#purchasingOrg").parsley().isValid()) {
            $("#purchasingOrg").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#purchasingGroup").parsley().on('field:error', function() {
        var required = $("#purchasingGroup").prop("required");

        var errorMsg = "Purchasing Group is mandatory!";
        if (required === true) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#purchasingGroup").css("border-color", "red");
        $("#purchasingGroup").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#purchasingGroup").parsley().isValid()) {
            $("#purchasingGroup").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#InstructionToWeigher").parsley().on('field:error', function() {
        var data_parsley_length = $("#InstructionToWeigher").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#InstructionToWeigher").css("border-color", "red");
        $("#InstructionToWeigher").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#InstructionToWeigher").parsley().isValid()) {
            $("#InstructionToWeigher").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#InstructionToWeigher").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#ProductOrigin").parsley().on('field:error', function() {
        var data_parsley_length = $("#ProductOrigin").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#ProductOrigin").css("border-color", "red");
        $("#ProductOrigin").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#ProductOrigin").parsley().isValid()) {
            $("#ProductOrigin").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#ProductOrigin").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#pOQuantity").parsley().on('field:error', function() {
        var required = $("#pOQuantity").prop("required");
        var pOQuantity = removeCommaInNumber($("#pOQuantity").val());
        var data_parsley_length = $("#pOQuantity").attr("data-parsley-maxlength");
        var errorMsg = "";

        if (required === true && pOQuantity === "") {
            errorMsg = "PO Quantity is mandatory!";
        }
        else
        {
            errorMsg = "Length should be maximum of " + data_parsley_length + " characters.<br>Only digits are allowed.";
        }
        if (keyCode !== 8 || (pOQuantity.length === 0 && required === true)) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#pOQuantity").css("border-color", "red");
        $("#pOQuantity").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#pOQuantity").parsley().isValid()) {
            $("#pOQuantity").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#pOQuantity").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#pOUnit").parsley().on('field:error', function() {
        var required = $("#pOUnit").prop("required");
        var pOUnit = $("#pOUnit").val();
        var data_parsley_length = $("#pOUnit").attr("data-parsley-maxlength");
        var errorMsg = "";

        if (required === true && pOUnit === "") {
            errorMsg = "PO Unit is mandatory!";
        }
        else
        {
            errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
        }
        if (keyCode !== 8 || (pOUnit.length === 0 && required === true)) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#pOUnit").css("border-color", "red");
        $("#pOUnit").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#pOUnit").parsley().isValid()) {
            $("#pOUnit").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#pOUnit").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#orderUnit").parsley().on('field:error', function() {
        var data_parsley_length = $("#orderUnit").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters.<br>Decimal places upto 3 digits.<br>Only digits are allowed.";

        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#orderUnit").css("border-color", "red");
        $("#orderUnit").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#orderUnit").parsley().isValid()) {
            $("#orderUnit").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#orderUnit").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#orderPriceUnit").parsley().on('field:error', function() {
        var data_parsley_length = $("#orderPriceUnit").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters.<br>Decimal places upto 3 digits.<br>Only digits are allowed.";

        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#orderPriceUnit").css("border-color", "red");
        $("#orderPriceUnit").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#orderPriceUnit").parsley().isValid()) {
            $("#orderPriceUnit").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#orderPriceUnit").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#OverdeliveryTolerance").parsley().on('field:error', function() {
        var data_parsley_length = $("#OverdeliveryTolerance").attr("data-parsley-maxlength");
        var errorMsg = "Over Delivery Tolerance should be maximum of " + data_parsley_length + " digits.";

        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#OverdeliveryTolerance").css("border-color", "red");
        $("#OverdeliveryTolerance").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#OverdeliveryTolerance").parsley().isValid()) {
            $("#OverdeliveryTolerance").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#OverdeliveryTolerance").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#UnderdeliveryTolerance").parsley().on('field:error', function() {
        var data_parsley_length = $("#UnderdeliveryTolerance").attr("data-parsley-maxlength");
        var errorMsg = "Under Delivery Tolerance should be maximum of " + data_parsley_length + " digits.";

        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#UnderdeliveryTolerance").css("border-color", "red");
        $("#UnderdeliveryTolerance").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#UnderdeliveryTolerance").parsley().isValid()) {
            $("#UnderdeliveryTolerance").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#UnderdeliveryTolerance").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#ValuationType").parsley().on('field:error', function() {
        var data_parsley_length = $("#ValuationType").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";

        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#ValuationType").css("border-color", "red");
        $("#ValuationType").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#ValuationType").parsley().isValid()) {
            $("#ValuationType").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#ValuationType").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#RemShelfLife").parsley().on('field:error', function() {
        var data_parsley_length = $("#RemShelfLife").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";

        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#RemShelfLife").css("border-color", "red");
        $("#RemShelfLife").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#RemShelfLife").parsley().isValid()) {
            $("#RemShelfLife").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#RemShelfLife").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#QAControlLife").parsley().on('field:error', function() {
        var data_parsley_length = $("#QAControlLife").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";

        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#QAControlLife").css("border-color", "red");
        $("#QAControlLife").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#QAControlLife").parsley().isValid()) {
            $("#QAControlLife").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#QAControlLife").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#GRProcTime").parsley().on('field:error', function() {
        var data_parsley_length = $("#GRProcTime").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";

        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#GRProcTime").css("border-color", "red");
        $("#GRProcTime").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#GRProcTime").parsley().isValid()) {
            $("#GRProcTime").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#GRProcTime").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#FirstReminderExpediter").parsley().on('field:error', function() {
        var data_parsley_length = $("#FirstReminderExpediter").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";

        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#FirstReminderExpediter").css("border-color", "red");
        $("#FirstReminderExpediter").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#FirstReminderExpediter").parsley().isValid()) {
            $("#FirstReminderExpediter").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#FirstReminderExpediter").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#SecondReminderExpediter").parsley().on('field:error', function() {
        var data_parsley_length = $("#SecondReminderExpediter").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";

        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#SecondReminderExpediter").css("border-color", "red");
        $("#SecondReminderExpediter").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#SecondReminderExpediter").parsley().isValid()) {
            $("#SecondReminderExpediter").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#SecondReminderExpediter").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#ThirdReminderExpediter").parsley().on('field:error', function() {
        var data_parsley_length = $("#ThirdReminderExpediter").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";

        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#ThirdReminderExpediter").css("border-color", "red");
        $("#ThirdReminderExpediter").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#ThirdReminderExpediter").parsley().isValid()) {
            $("#ThirdReminderExpediter").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#ThirdReminderExpediter").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#NoExpend").parsley().on('field:error', function() {
        var data_parsley_length = $("#NoExpend").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";

        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#NoExpend").css("border-color", "red");
        $("#NoExpend").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#NoExpend").parsley().isValid()) {
            $("#NoExpend").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#NoExpend").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#PlDeliveryTime").parsley().on('field:error', function() {
        var data_parsley_length = $("#PlDeliveryTime").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";

        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#PlDeliveryTime").css("border-color", "red");
        $("#PlDeliveryTime").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#PlDeliveryTime").parsley().isValid()) {
            $("#PlDeliveryTime").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#PlDeliveryTime").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#incoTermsPart2Delivery").parsley().on('field:error', function() {
        var data_parsley_length = $("#incoTermsPart2Delivery").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";

        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#incoTermsPart2Delivery").css("border-color", "red");
        $("#incoTermsPart2Delivery").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#incoTermsPart2Delivery").parsley().isValid()) {
            $("#incoTermsPart2Delivery").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#incoTermsPart2Delivery").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#TaxCode").parsley().on('field:error', function() {
        var data_parsley_length = $("#TaxCode").attr("data-parsley-maxlength");
        var required = $("#TaxCode").prop("required");
        var TaxCode = $("#TaxCode").val();
        var errorMsg = "";

        if (required === true && TaxCode === "") {
            errorMsg = "Tax Code is mandatory!";
        }
        else
        {
            errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
        }
        if (keyCode !== 8 || (TaxCode.length === 0 && required === true)) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#TaxCode").css("border-color", "red");
        $("#TaxCode").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#TaxCode").parsley().isValid()) {
            $("#TaxCode").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#TaxCode").keyup(function(e) {
        keyCode = e.keyCode;
    });
//    $("#TaxCodeDescription").parsley().on('field:error', function() {
//        var data_parsley_length = $("#TaxCodeDescription").attr("data-parsley-maxlength");
//        var required = $("#TaxCodeDescription").prop("required");
//        var TaxCodeDescription = $("#TaxCodeDescription").val();
//        var errorMsg = "";
//
//        if (required === true && TaxCodeDescription === "") {
//            errorMsg = "Tax Code Description is mandatory!";
//        }
//        else
//        {
//            errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
//        }
//        if (keyCode !== 8 || (TaxCodeDescription.length === 0 && required === true)) {
//            if (lobiboxNotifyAlert !== null)
//            {
//                lobiboxNotifyAlert.remove();
//            }
//            lobiboxNotifyAlert = Lobibox.notify("error", {
//                rounded: true,
//                delayIndicator: false,
//                msg: errorMsg
//            });
//        }
//        $("#TaxCodeDescription").css("border-color", "red");
//        $("#TaxCodeDescription").focus();
//        $("#createPoBtn").prop("disabled", true);
//    }).on('field:validated', function() {
//        if ($("#TaxCodeDescription").parsley().isValid()) {
//            $("#TaxCodeDescription").css("border-color", "");
//            $("#createPoBtn").prop("disabled", false);
//        }
//    });
//    $("#TaxCodeDescription").keyup(function(e) {
//        keyCode = e.keyCode;
//    });
//    $("#ItemText").parsley().on('field:error', function() {
//        var data_parsley_length = $("#ItemText").attr("data-parsley-maxlength");
//        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
//
//        if (keyCode !== 8) {
//            if (lobiboxNotifyAlert !== null)
//            {
//                lobiboxNotifyAlert.remove();
//            }
//            lobiboxNotifyAlert = Lobibox.notify("error", {
//                rounded: true,
//                delayIndicator: false,
//                msg: errorMsg
//            });
//        }
//        $("#ItemText").css("border-color", "red");
//        $("#ItemText").focus();
//        $("#createPoBtn").prop("disabled", true);
//    }).on('field:validated', function() {
//        if ($("#ItemText").parsley().isValid()) {
//            $("#ItemText").css("border-color", "");
//            $("#createPoBtn").prop("disabled", false);
//        }
//    });
//    $("#ItemText").keyup(function(e) {
//        keyCode = e.keyCode;
//    });
//    $("#InfoRecordPOText").parsley().on('field:error', function() {
//        var data_parsley_length = $("#InfoRecordPOText").attr("data-parsley-maxlength");
//        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
//
//        if (keyCode !== 8) {
//            if (lobiboxNotifyAlert !== null)
//            {
//                lobiboxNotifyAlert.remove();
//            }
//            lobiboxNotifyAlert = Lobibox.notify("error", {
//                rounded: true,
//                delayIndicator: false,
//                msg: errorMsg
//            });
//        }
//        $("#InfoRecordPOText").css("border-color", "red");
//        $("#InfoRecordPOText").focus();
//        $("#createPoBtn").prop("disabled", true);
//    }).on('field:validated', function() {
//        if ($("#InfoRecordPOText").parsley().isValid()) {
//            $("#InfoRecordPOText").css("border-color", "");
//            $("#createPoBtn").prop("disabled", false);
//        }
//    });
//    $("#InfoRecordPOText").keyup(function(e) {
//        keyCode = e.keyCode;
//    });
//    $("#PONoteToApprover").parsley().on('field:error', function() {
//        var data_parsley_length = $("#PONoteToApprover").attr("data-parsley-maxlength");
//        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
//
//        if (keyCode !== 8) {
//            if (lobiboxNotifyAlert !== null)
//            {
//                lobiboxNotifyAlert.remove();
//            }
//            lobiboxNotifyAlert = Lobibox.notify("error", {
//                rounded: true,
//                delayIndicator: false,
//                msg: errorMsg
//            });
//        }
//        $("#PONoteToApprover").css("border-color", "red");
//        $("#PONoteToApprover").focus();
//        $("#createPoBtn").prop("disabled", true);
//    }).on('field:validated', function() {
//        if ($("#PONoteToApprover").parsley().isValid()) {
//            $("#PONoteToApprover").css("border-color", "");
//            $("#createPoBtn").prop("disabled", false);
//        }
//    });
//    $("#PONoteToApprover").keyup(function(e) {
//        keyCode = e.keyCode;
//    });
//    $("#DeliveryText").parsley().on('field:error', function() {
//        var data_parsley_length = $("#DeliveryText").attr("data-parsley-maxlength");
//        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
//
//        if (keyCode !== 8) {
//            if (lobiboxNotifyAlert !== null)
//            {
//                lobiboxNotifyAlert.remove();
//            }
//            lobiboxNotifyAlert = Lobibox.notify("error", {
//                rounded: true,
//                delayIndicator: false,
//                msg: errorMsg
//            });
//        }
//        $("#DeliveryText").css("border-color", "red");
//        $("#DeliveryText").focus();
//        $("#createPoBtn").prop("disabled", true);
//    }).on('field:validated', function() {
//        if ($("#DeliveryText").parsley().isValid()) {
//            $("#DeliveryText").css("border-color", "");
//            $("#createPoBtn").prop("disabled", false);
//        }
//    });
//    $("#DeliveryText").keyup(function(e) {
//        keyCode = e.keyCode;
//    });
    $("#Name1").parsley().on('field:error', function() {
        var data_parsley_length = $("#Name1").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";

        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#Name1").css("border-color", "red");
        $("#Name1").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#Name1").parsley().isValid()) {
            $("#Name1").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#Name1").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#Name2").parsley().on('field:error', function() {
        var data_parsley_length = $("#Name2").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";

        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#Name2").css("border-color", "red");
        $("#Name2").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#Name2").parsley().isValid()) {
            $("#Name2").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#Name2").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#Street").parsley().on('field:error', function() {
        var data_parsley_length = $("#Street").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";

        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#Street").css("border-color", "red");
        $("#Street").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#Street").parsley().isValid()) {
            $("#Street").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#Street").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#HouseNumber").parsley().on('field:error', function() {
        var data_parsley_length = $("#HouseNumber").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";

        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#HouseNumber").css("border-color", "red");
        $("#HouseNumber").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#HouseNumber").parsley().isValid()) {
            $("#HouseNumber").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#HouseNumber").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#City").parsley().on('field:error', function() {
        var data_parsley_length = $("#City").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";

        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#City").css("border-color", "red");
        $("#City").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#City").parsley().isValid()) {
            $("#City").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#City").keyup(function(e) {
        keyCode = e.keyCode;
    });
//    $("#countryLimits").parsley().on('field:error', function() {
//        var data_parsley_length = $("#countryLimits").attr("data-parsley-maxlength");
//        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
//        
//        if (keyCode !== 8) {
//            Lobibox.notify("error", {
//                rounded: true,
//                delayIndicator: false,
//                msg: errorMsg
//            });
//        }
//        $("#countryLimits").css("border-color", "red");
//        $("#countryLimits").focus();
//        $("#createPoBtn").prop("disabled", true);
//    }).on('field:validated', function() {
//        if ($("#countryLimits").parsley().isValid()) {
//            $("#countryLimits").css("border-color", "");
//            $("#createPoBtn").prop("disabled", false);
//        }
//    });
//    $("#countryLimits").keyup(function(e) {
//        keyCode = e.keyCode;
//    });
    $("#countryDesc").parsley().on('field:error', function() {
        var data_parsley_length = $("#countryDesc").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";

        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#countryDesc").css("border-color", "red");
        $("#countryDesc").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#countryDesc").parsley().isValid()) {
            $("#countryDesc").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#countryDesc").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#confControlLimits").parsley().on('field:error', function() {
        var required = $("#confControlLimits").prop("required");

        var errorMsg = "Conf. Control is mandatory!";
        if (required === true) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#confControlLimits").css("border-color", "red");
        $("#confControlLimits").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#confControlLimits").parsley().isValid()) {
            $("#confControlLimits").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#OrderAck").parsley().on('field:error', function() {
        var data_parsley_length = $("#OrderAck").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";

        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#OrderAck").css("border-color", "red");
        $("#OrderAck").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#OrderAck").parsley().isValid()) {
            $("#OrderAck").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#OrderAck").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#ProductOriginLine").parsley().on('field:error', function() {
        var data_parsley_length = $("#ProductOriginLine").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";

        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#ProductOriginLine").css("border-color", "red");
        $("#ProductOriginLine").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#ProductOriginLine").parsley().isValid()) {
            $("#ProductOriginLine").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#ProductOriginLine").keyup(function(e) {
        keyCode = e.keyCode;
    });

//    $("#pONotetoApproverHeaderTextsLimits").parsley().on('field:error', function() {
//        var data_parsley_length = $("#pONotetoApproverHeaderTextsLimits").attr("data-parsley-maxlength");
//        var required = $("#pONotetoApproverHeaderTextsLimits").prop("required");
//        var pONotetoApproverHeaderTextsLimits = $("#pONotetoApproverHeaderTextsLimits").val();
//        var errorMsg = "";
//
//        if (required === true && pONotetoApproverHeaderTextsLimits === "") {
//            errorMsg = "PO Note to Approver is mandatory!";
//        }
//        else
//        {
//            errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
//        }
//        if (keyCode !== 8 || (pONotetoApproverHeaderTextsLimits.length === 0 && required === true)) {
//            if (lobiboxNotifyAlert !== null)
//            {
//                lobiboxNotifyAlert.remove();
//            }
//            lobiboxNotifyAlert = Lobibox.notify("error", {
//                rounded: true,
//                delayIndicator: false,
//                msg: errorMsg
//            });
//        }
//        $("#pONotetoApproverHeaderTextsLimits").css("border-color", "red");
//        $("#pONotetoApproverHeaderTextsLimits").focus();
//        $("#createPoBtn").prop("disabled", true);
//    }).on('field:validated', function() {
//        if ($("#pONotetoApproverHeaderTextsLimits").parsley().isValid()) {
//            $("#pONotetoApproverHeaderTextsLimits").css("border-color", "");
//            $("#createPoBtn").prop("disabled", false);
//        }
//    });
//    $("#pONotetoApproverHeaderTextsLimits").keyup(function(e) {
//        keyCode = e.keyCode;
//    });
//    $("#HeaderNote").parsley().on('field:error', function() {
//        var data_parsley_length = $("#HeaderNote").attr("data-parsley-maxlength");
//        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
//
//        if (keyCode !== 8) {
//            if (lobiboxNotifyAlert !== null)
//            {
//                lobiboxNotifyAlert.remove();
//            }
//            lobiboxNotifyAlert = Lobibox.notify("error", {
//                rounded: true,
//                delayIndicator: false,
//                msg: errorMsg
//            });
//        }
//        $("#HeaderNote").css("border-color", "red");
//        $("#HeaderNote").focus();
//        $("#createPoBtn").prop("disabled", true);
//    }).on('field:validated', function() {
//        if ($("#HeaderNote").parsley().isValid()) {
//            $("#HeaderNote").css("border-color", "");
//            $("#createPoBtn").prop("disabled", false);
//        }
//    });
//    $("#HeaderNote").keyup(function(e) {
//        keyCode = e.keyCode;
//    });
//    $("#PricingTypes").parsley().on('field:error', function() {
//        var data_parsley_length = $("#PricingTypes").attr("data-parsley-maxlength");
//        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
//
//        if (keyCode !== 8) {
//            if (lobiboxNotifyAlert !== null)
//            {
//                lobiboxNotifyAlert.remove();
//            }
//            lobiboxNotifyAlert = Lobibox.notify("error", {
//                rounded: true,
//                delayIndicator: false,
//                msg: errorMsg
//            });
//        }
//        $("#PricingTypes").css("border-color", "red");
//        $("#PricingTypes").focus();
//        $("#createPoBtn").prop("disabled", true);
//    }).on('field:validated', function() {
//        if ($("#PricingTypes").parsley().isValid()) {
//            $("#PricingTypes").css("border-color", "");
//            $("#createPoBtn").prop("disabled", false);
//        }
//    });
//    $("#PricingTypes").keyup(function(e) {
//        keyCode = e.keyCode;
//    });
//    $("#Deadlines").parsley().on('field:error', function() {
//        var data_parsley_length = $("#Deadlines").attr("data-parsley-maxlength");
//        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
//
//        if (keyCode !== 8) {
//            if (lobiboxNotifyAlert !== null)
//            {
//                lobiboxNotifyAlert.remove();
//            }
//            lobiboxNotifyAlert = Lobibox.notify("error", {
//                rounded: true,
//                delayIndicator: false,
//                msg: errorMsg
//            });
//        }
//        $("#Deadlines").css("border-color", "red");
//        $("#Deadlines").focus();
//        $("#createPoBtn").prop("disabled", true);
//    }).on('field:validated', function() {
//        if ($("#Deadlines").parsley().isValid()) {
//            $("#Deadlines").css("border-color", "");
//            $("#createPoBtn").prop("disabled", false);
//        }
//    });
//    $("#Deadlines").keyup(function(e) {
//        keyCode = e.keyCode;
//    });
//    $("#TermsofDelivery").parsley().on('field:error', function() {
//        var data_parsley_length = $("#TermsofDelivery").attr("data-parsley-maxlength");
//        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
//
//        if (keyCode !== 8) {
//            if (lobiboxNotifyAlert !== null)
//            {
//                lobiboxNotifyAlert.remove();
//            }
//            lobiboxNotifyAlert = Lobibox.notify("error", {
//                rounded: true,
//                delayIndicator: false,
//                msg: errorMsg
//            });
//        }
//        $("#TermsofDelivery").css("border-color", "red");
//        $("#TermsofDelivery").focus();
//        $("#createPoBtn").prop("disabled", true);
//    }).on('field:validated', function() {
//        if ($("#TermsofDelivery").parsley().isValid()) {
//            $("#TermsofDelivery").css("border-color", "");
//            $("#createPoBtn").prop("disabled", false);
//        }
//    });
//    $("#TermsofDelivery").keyup(function(e) {
//        keyCode = e.keyCode;
//    });
//    $("#TermsofPayment").parsley().on('field:error', function() {
//        var data_parsley_length = $("#TermsofPayment").attr("data-parsley-maxlength");
//        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
//
//        if (keyCode !== 8) {
//            if (lobiboxNotifyAlert !== null)
//            {
//                lobiboxNotifyAlert.remove();
//            }
//            lobiboxNotifyAlert = Lobibox.notify("error", {
//                rounded: true,
//                delayIndicator: false,
//                msg: errorMsg
//            });
//        }
//        $("#TermsofPayment").css("border-color", "red");
//        $("#TermsofPayment").focus();
//        $("#createPoBtn").prop("disabled", true);
//    }).on('field:validated', function() {
//        if ($("#TermsofPayment").parsley().isValid()) {
//            $("#TermsofPayment").css("border-color", "");
//            $("#createPoBtn").prop("disabled", false);
//        }
//    });
//    $("#TermsofPayment").keyup(function(e) {
//        keyCode = e.keyCode;
//    });
//    $("#ShippingInstructions").parsley().on('field:error', function() {
//        var data_parsley_length = $("#ShippingInstructions").attr("data-parsley-maxlength");
//        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
//
//        if (keyCode !== 8) {
//            if (lobiboxNotifyAlert !== null)
//            {
//                lobiboxNotifyAlert.remove();
//            }
//            lobiboxNotifyAlert = Lobibox.notify("error", {
//                rounded: true,
//                delayIndicator: false,
//                msg: errorMsg
//            });
//        }
//        $("#ShippingInstructions").css("border-color", "red");
//        $("#ShippingInstructions").focus();
//        $("#createPoBtn").prop("disabled", true);
//    }).on('field:validated', function() {
//        if ($("#ShippingInstructions").parsley().isValid()) {
//            $("#ShippingInstructions").css("border-color", "");
//            $("#createPoBtn").prop("disabled", false);
//        }
//    });
//    $("#ShippingInstructions").keyup(function(e) {
//        keyCode = e.keyCode;
//    });
//    $("#VendorMemoGeneral").parsley().on('field:error', function() {
//        var data_parsley_length = $("#VendorMemoGeneral").attr("data-parsley-maxlength");
//        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
//
//        if (keyCode !== 8) {
//            if (lobiboxNotifyAlert !== null)
//            {
//                lobiboxNotifyAlert.remove();
//            }
//            lobiboxNotifyAlert = Lobibox.notify("error", {
//                rounded: true,
//                delayIndicator: false,
//                msg: errorMsg
//            });
//        }
//        $("#VendorMemoGeneral").css("border-color", "red");
//        $("#VendorMemoGeneral").focus();
//        $("#createPoBtn").prop("disabled", true);
//    }).on('field:validated', function() {
//        if ($("#VendorMemoGeneral").parsley().isValid()) {
//            $("#VendorMemoGeneral").css("border-color", "");
//            $("#createPoBtn").prop("disabled", false);
//        }
//    });
//    $("#VendorMemoGeneral").keyup(function(e) {
//        keyCode = e.keyCode;
//    });
//    $("#VendorMemoSpecial").parsley().on('field:error', function() {
//        var data_parsley_length = $("#VendorMemoSpecial").attr("data-parsley-maxlength");
//        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
//
//        if (keyCode !== 8) {
//            if (lobiboxNotifyAlert !== null)
//            {
//                lobiboxNotifyAlert.remove();
//            }
//            lobiboxNotifyAlert = Lobibox.notify("error", {
//                rounded: true,
//                delayIndicator: false,
//                msg: errorMsg
//            });
//        }
//        $("#VendorMemoSpecial").css("border-color", "red");
//        $("#VendorMemoSpecial").focus();
//        $("#createPoBtn").prop("disabled", true);
//    }).on('field:validated', function() {
//        if ($("#VendorMemoSpecial").parsley().isValid()) {
//            $("#VendorMemoSpecial").css("border-color", "");
//            $("#createPoBtn").prop("disabled", false);
//        }
//    });
//    $("#VendorMemoSpecial").keyup(function(e) {
//        keyCode = e.keyCode;
//    });
    $("#unloadingPoint").parsley().on('field:error', function() {
        var data_parsley_length = $("#unloadingPoint").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";

        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#unloadingPoint").css("border-color", "red");
        $("#unloadingPoint").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#unloadingPoint").parsley().isValid()) {
            $("#unloadingPoint").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#unloadingPoint").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#recipient").parsley().on('field:error', function() {
        var data_parsley_length = $("#recipient").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";

        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#recipient").css("border-color", "red");
        $("#recipient").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#recipient").parsley().isValid()) {
            $("#recipient").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#recipient").keyup(function(e) {
        keyCode = e.keyCode;
    });
    $("#gLAccount").parsley().on('field:error', function() {
        var data_parsley_length = $("#gLAccount").attr("data-parsley-maxlength");
        var required = $("#gLAccount").prop("required");
        var gLAccount = $("#gLAccount").val();
        var errorMsg = "";

        if (required === true && gLAccount === "") {
            errorMsg = "GL Account is mandatory!";
        }
        else
        {
            errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
        }
        if (keyCode !== 8 || (gLAccount.length === 0 && required === true)) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#gLAccount").css("border-color", "red");
        $("#gLAccount").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#gLAccount").parsley().isValid()) {
            $("#gLAccount").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#costCenterAccAsgn").parsley().on('field:error', function() {
        var data_parsley_length = $("#costCenterAccAsgn").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";

        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#costCenterAccAsgn").css("border-color", "red");
        $("#costCenterAccAsgn").focus();
        $("#createPoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#costCenterAccAsgn").parsley().isValid()) {
            $("#costCenterAccAsgn").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });
    $("#costCenterAccAsgn").keyup(function(e) {
        keyCode = e.keyCode;
    });

    $("#DeliveryScheduleTableId").on("change", ".scheduledQuantityClass", function() {
        var schQty = removeCommaInNumber($(this).val());
        console.log("schQty: " + schQty);

        var schQtyAsString = schQty.toString().split(".");
        console.log("schQtyAsString len: " + schQtyAsString.length);

        if (Number(schQty) < 0 || Number(schQty) === -0 || Number(schQty) === 0)
        {
            console.log("-----------");
            $(this).val("");
            $(this).focus();
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: "Kindly enter valid quantity !"
            });
        }

//        console.log("Number(schQty) % 1: " + Number(schQty) % 1);
//        if (schQty !== "" && (Number(schQty) % 1 !== 0))
//        {
//            
//        }
    });

    $("#PostalCode").parsley().on('field:error', function() {
        var data_parsley_length = $("#PostalCode").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!<br>Postal Code should contain only digits.";
        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#PostalCode").css("border-color", "red");
        $("#PostalCode").focus();
        $("#createPoBtn").prop("disabled", true);
        $("#createStandalonePoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#PostalCode").parsley().isValid()) {
            $("#PostalCode").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
            $("#createStandalonePoBtn").prop("disabled", false);
        }
    });
    $("#PostalCode").keyup(function(e) {
        keyCode = e.keyCode;
    });

    $("#createpoform :input").change(function() {
        var isPrSavedAfterEditDetails = $("#isPrSavedAfterEditDetails").val();
        var isPrSavedAlready = $("#isPrSavedAlready").val();

        if (isPrSavedAfterEditDetails === "No")
        {
            $("#isAnyFieldValueChanged").val("Yes");
        }
    });

//    $("#vendorEmail").parsley().on('field:error', function() {
////        var data_parsley_type = $("#vendorEmail").attr("data-parsley-type");
////        alert(data_parsley_email);
//        var errorMsg = "Please enter valid email id!";
////        var emailid = $("#vendorEmail").val();
//        if (keyCode !== 8) {
////            if (!emailid.match(data_parsley_email)) {
////            alert("BITTU");
//                if (lobiboxNotifyAlert !== null)
//                {
//                    lobiboxNotifyAlert.remove();
//                }
//                lobiboxNotifyAlert = Lobibox.notify("error", {
//                    rounded: true,
//                    delayIndicator: false,
//                    msg: errorMsg
//                });
////            }
//        }
//        $("#vendorEmail").css("border-color", "red");
//        $("#vendorEmail").focus();
//        $("#createPoBtn").prop("disabled", true);
//    }).on('field:validated', function() {
//        if ($("#vendorEmail").parsley().isValid()) {
//    $("#vendorEmail").css("border-color", "");
//    $("#createPoBtn").prop("disabled", false);
//        }
//    });
//    $("#vendorEmail").first().keyup(function(e) {
////        alert(e.keyCode);
//        keyCode = e.keyCode;
//    });

    var validateEmail = function(elementValue) {
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(elementValue);
    };
    $('#vendorEmail').change(function() {
        var value = $(this).val();
        var errorMsg = "Please enter valid email id!";
        var valid = validateEmail(value);
        if (!valid) {
//            $(this).css('color', 'red');
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $("#vendorEmail").css("border-color", "red");
            $("#vendorEmail").focus();
            $("#createPoBtn").prop("disabled", true);
        } else {
//            $(this).css('color', '#000');
            $("#vendorEmail").css("border-color", "");
            $("#createPoBtn").prop("disabled", false);
        }
    });

    /*************************Material Tab Validation Starts*************************************/
    $("#revisionLevel").parsley().on('field:error', function() {
        var data_parsley_length = $("#revisionLevel").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#revisionLevel").css("border-color", "red");
        $("#revisionLevel").focus();

        $("#createPoBtn").prop("disabled", true);
        $("#createStandalonePoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#revisionLevel").parsley().isValid()) {
            $("#revisionLevel").css("border-color", "");

            $("#createPoBtn").prop("disabled", false);
            $("#createStandalonePoBtn").prop("disabled", false);
        }
    });
    $("#revisionLevel").keyup(function(e) {
        keyCode = e.keyCode;
    });

    $("#vendMatNo").parsley().on('field:error', function() {
        var data_parsley_length = $("#vendMatNo").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#vendMatNo").css("border-color", "red");
        $("#vendMatNo").focus();

        $("#createPoBtn").prop("disabled", true);
        $("#createStandalonePoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#vendMatNo").parsley().isValid()) {
            $("#vendMatNo").css("border-color", "");

            $("#createPoBtn").prop("disabled", false);
            $("#createStandalonePoBtn").prop("disabled", false);
        }
    });
    $("#vendMatNo").keyup(function(e) {
        keyCode = e.keyCode;
    });

    $("#vendorSubRange").parsley().on('field:error', function() {
        var data_parsley_length = $("#vendorSubRange").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#vendorSubRange").css("border-color", "red");
        $("#vendorSubRange").focus();

        $("#createPoBtn").prop("disabled", true);
        $("#createStandalonePoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#vendorSubRange").parsley().isValid()) {
            $("#vendorSubRange").css("border-color", "");

            $("#createPoBtn").prop("disabled", false);
            $("#createStandalonePoBtn").prop("disabled", false);
        }
    });
    $("#vendorSubRange").keyup(function(e) {
        keyCode = e.keyCode;
    });

    $("#batch").parsley().on('field:error', function() {
        var data_parsley_length = $("#batch").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#batch").css("border-color", "red");
        $("#batch").focus();

        $("#createPoBtn").prop("disabled", true);
        $("#createStandalonePoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#batch").parsley().isValid()) {
            $("#batch").css("border-color", "");

            $("#createPoBtn").prop("disabled", false);
            $("#createStandalonePoBtn").prop("disabled", false);
        }
    });
    $("#batch").keyup(function(e) {
        keyCode = e.keyCode;
    });

    $("#vendorBatch").parsley().on('field:error', function() {
        var data_parsley_length = $("#vendorBatch").attr("data-parsley-maxlength");
        var errorMsg = "Length should be maximum of " + data_parsley_length + " characters!";
        if (keyCode !== 8) {
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
        }
        $("#vendorBatch").css("border-color", "red");
        $("#vendorBatch").focus();

        $("#createPoBtn").prop("disabled", true);
        $("#createStandalonePoBtn").prop("disabled", true);
    }).on('field:validated', function() {
        if ($("#vendorBatch").parsley().isValid()) {
            $("#vendorBatch").css("border-color", "");

            $("#createPoBtn").prop("disabled", false);
            $("#createStandalonePoBtn").prop("disabled", false);
        }
    });
    $("#vendorBatch").keyup(function(e) {
        keyCode = e.keyCode;
    });
    /*************************Material Tab Validation Ends*************************************/

    /*************************Component Tab Validation Starts*************************************/
    $("#componentTableIdLineLevel").on("change", ".comDescription", function() {
        var desc = $(this).val();
        var len = desc.toString().length;
        if (len > 150)
        {
            var errorMsg = "Length should be maximum of 150 characters!";
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $(this).css("border-color", "red");
            $(this).focus();

            $("#createPoBtn").prop("disabled", true);
            $("#createStandalonePoBtn").prop("disabled", true);
        }
        else
        {
            $(this).css("border-color", "");

            $("#createPoBtn").prop("disabled", false);
            $("#createStandalonePoBtn").prop("disabled", false);
        }
    });
    
    $("#componentTableIdLineLevel").on("change", ".comUnit", function() {
        var unit = $(this).val();
        var len = unit.toString().length;
        if (len > 5)
        {
            var errorMsg = "Length should be maximum of 5 characters!";
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $(this).css("border-color", "red");
            $(this).focus();

            $("#createPoBtn").prop("disabled", true);
            $("#createStandalonePoBtn").prop("disabled", true);
        }
        else
        {
            $(this).css("border-color", "");

            $("#createPoBtn").prop("disabled", false);
            $("#createStandalonePoBtn").prop("disabled", false);
        }
    });
    $("#componentTableIdLineLevel").on("change", ".comQuantity", function() {
        var qty = $(this).val();
        var len = qty.toString().length;
        console.log("isNaN: " + isNaN(qty));
        if (len > 19)
        {
            var errorMsg = "Length should be maximum of (15,3) digits!";
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $(this).css("border-color", "red");
            $(this).focus();

            $("#createPoBtn").prop("disabled", true);
            $("#createStandalonePoBtn").prop("disabled", true);
        }
        else
        {
            $(this).css("border-color", "");

            $("#createPoBtn").prop("disabled", false);
            $("#createStandalonePoBtn").prop("disabled", false);
        }
    });
    $("#componentTableIdLineLevel").on("change", ".comProdStorageLoc", function() {
        var val = $(this).val();
        var len = val.toString().length;
        if (len > 25)
        {
            var errorMsg = "Length should be maximum of 25 characters!";
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $(this).css("border-color", "red");
            $(this).focus();

            $("#createPoBtn").prop("disabled", true);
            $("#createStandalonePoBtn").prop("disabled", true);
        }
        else
        {
            $(this).css("border-color", "");

            $("#createPoBtn").prop("disabled", false);
            $("#createStandalonePoBtn").prop("disabled", false);
        }
    });
    $("#componentTableIdLineLevel").on("change", ".comSupplyArea", function() {
        var val = $(this).val();
        var len = val.toString().length;
        if (len > 25)
        {
            var errorMsg = "Length should be maximum of 25 characters!";
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $(this).css("border-color", "red");
            $(this).focus();

            $("#createPoBtn").prop("disabled", true);
            $("#createStandalonePoBtn").prop("disabled", true);
        }
        else
        {
            $(this).css("border-color", "");

            $("#createPoBtn").prop("disabled", false);
            $("#createStandalonePoBtn").prop("disabled", false);
        }
    });
    $("#componentTableIdLineLevel").on("change", ".compQtyIsFixed", function() {
        var val = $(this).val();
        var len = val.toString().length;
        if (len > 10)
        {
            var errorMsg = "Length should be maximum of 10 characters!";
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $(this).css("border-color", "red");
            $(this).focus();

            $("#createPoBtn").prop("disabled", true);
            $("#createStandalonePoBtn").prop("disabled", true);
        }
        else
        {
            $(this).css("border-color", "");

            $("#createPoBtn").prop("disabled", false);
            $("#createStandalonePoBtn").prop("disabled", false);
        }
    });
    $("#componentTableIdLineLevel").on("change", ".compDistKey", function() {
        var val = $(this).val();
        var len = val.toString().length;
        if (len > 30)
        {
            var errorMsg = "Length should be maximum of 30 characters!";
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $(this).css("border-color", "red");
            $(this).focus();

            $("#createPoBtn").prop("disabled", true);
            $("#createStandalonePoBtn").prop("disabled", true);
        }
        else
        {
            $(this).css("border-color", "");

            $("#createPoBtn").prop("disabled", false);
            $("#createStandalonePoBtn").prop("disabled", false);
        }
    });
    $("#componentTableIdLineLevel").on("change", ".compBatch", function() {
        var val = $(this).val();
        var len = val.toString().length;
        if (len > 30)
        {
            var errorMsg = "Length should be maximum of 30 characters!";
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $(this).css("border-color", "red");
            $(this).focus();

            $("#createPoBtn").prop("disabled", true);
            $("#createStandalonePoBtn").prop("disabled", true);
        }
        else
        {
            $(this).css("border-color", "");

            $("#createPoBtn").prop("disabled", false);
            $("#createStandalonePoBtn").prop("disabled", false);
        }
    });
    $("#componentTableIdLineLevel").on("change", ".compStorageLoc", function() {
        var val = $(this).val();
        var len = val.toString().length;
        if (len > 25)
        {
            var errorMsg = "Length should be maximum of 25 characters!";
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $(this).css("border-color", "red");
            $(this).focus();

            $("#createPoBtn").prop("disabled", true);
            $("#createStandalonePoBtn").prop("disabled", true);
        }
        else
        {
            $(this).css("border-color", "");

            $("#createPoBtn").prop("disabled", false);
            $("#createStandalonePoBtn").prop("disabled", false);
        }
    });
    /*************************Component Tab Validation Ends*************************************/
        
    /*************************Line Item Condition Tab Validation Starts*************************************/
    $("#conditionTableIdLineLevel").on("change", ".baseUoMLineLevel", function() {
        var val = $(this).val();
        var len = val.toString().length;
        if (len > 20)
        {
            var errorMsg = "Length should be maximum of 20 characters!";
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $(this).css("border-color", "red");
            $(this).focus();

            $("#createPoBtn").prop("disabled", true);
            $("#createStandalonePoBtn").prop("disabled", true);
        }
        else
        {
            $(this).css("border-color", "");

            $("#createPoBtn").prop("disabled", false);
            $("#createStandalonePoBtn").prop("disabled", false);
        }
    });
    $("#conditionTableIdLineLevel").on("change", ".uOMExtraLineLevel", function() {
        var val = $(this).val();
        var len = val.toString().length;
        if (len > 20)
        {
            var errorMsg = "Length should be maximum of 20 characters!";
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $(this).css("border-color", "red");
            $(this).focus();

            $("#createPoBtn").prop("disabled", true);
            $("#createStandalonePoBtn").prop("disabled", true);
        }
        else
        {
            $(this).css("border-color", "");

            $("#createPoBtn").prop("disabled", false);
            $("#createStandalonePoBtn").prop("disabled", false);
        }
    });
    /*************************Line Item Condition Tab Validation Ends*************************************/
    
    /*************************PO Line Item Validation Starts*************************************/
    $("#material_headerClass").on("change", ".prReturnsItem", function() {
        var val = $(this).val();
        var len = val.toString().length;
        console.log("val: " + val);
        if (len > 100)
        {
            var errorMsg = "Length should be maximum of 100 characters!";
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $(this).css("border-color", "red");
            $(this).focus();

            $("#createPoBtn").prop("disabled", true);
            $("#createStandalonePoBtn").prop("disabled", true);
        }
        else
        {
            $(this).css("border-color", "");

            $("#createPoBtn").prop("disabled", false);
            $("#createStandalonePoBtn").prop("disabled", false);
        }
    });
    $("#material_headerClass").on("change", ".prFreeOfCharge", function() {
        var val = $(this).val();
        var len = val.toString().length;
        console.log("val: " + val);
        if (len > 150)
        {
            var errorMsg = "Length should be maximum of 150 characters!";
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $(this).css("border-color", "red");
            $(this).focus();

            $("#createPoBtn").prop("disabled", true);
            $("#createStandalonePoBtn").prop("disabled", true);
        }
        else
        {
            $(this).css("border-color", "");

            $("#createPoBtn").prop("disabled", false);
            $("#createStandalonePoBtn").prop("disabled", false);
        }
    });
    $("#material_headerClass").on("change", ".prOrderPriceUnit", function() {
        var val = $(this).val();
        var len = val.toString().length;
        if (len > 5)
        {
            var errorMsg = "Length should be maximum of 5 characters!";
            if (lobiboxNotifyAlert !== null)
            {
                lobiboxNotifyAlert.remove();
            }
            lobiboxNotifyAlert = Lobibox.notify("error", {
                rounded: true,
                delayIndicator: false,
                msg: errorMsg
            });
            $(this).css("border-color", "red");
            $(this).focus();

            $("#createPoBtn").prop("disabled", true);
            $("#createStandalonePoBtn").prop("disabled", true);
        }
        else
        {
            $(this).css("border-color", "");

            $("#createPoBtn").prop("disabled", false);
            $("#createStandalonePoBtn").prop("disabled", false);
        }
    });
    /*************************PO Line Item Validation Ends*************************************/
});

var lobiboxNotifyAlertFunc = null;
function validateScheduledQtyLenInDelvSchTab($this)
{
    var schQty = removeCommaInNumber($this.val());
    var len = schQty.toString().length;
    if (len > 19)
    {
        var errorMsg = "Length should be maximum of (15,3) digits!";
        if (lobiboxNotifyAlertFunc !== null)
        {
            lobiboxNotifyAlertFunc.remove();
        }
        lobiboxNotifyAlertFunc = Lobibox.notify("error", {
            rounded: true,
            delayIndicator: false,
            msg: errorMsg
        });
        $this.css("border-color", "red");
        $this.focus();

        $("#createPoBtn").prop("disabled", true);
        $("#createStandalonePoBtn").prop("disabled", true);
    }
    else
    {
        $this.css("border-color", "");

        $("#createPoBtn").prop("disabled", false);
        $("#createStandalonePoBtn").prop("disabled", false);
    }
}