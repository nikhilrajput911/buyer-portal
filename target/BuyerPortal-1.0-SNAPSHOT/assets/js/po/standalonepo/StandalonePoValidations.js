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
    $("#componentTableIdLineLevel").on("change", ".qtyIsFixed", function() {
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
    $("#componentTableIdLineLevel").on("change", ".distKey", function() {
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
    $("#componentTableIdLineLevel").on("change", ".comBatch", function() {
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
//    $("#componentTableIdLineLevel").on("change", ".comStorageLocation", function() {
//        var val = $(this).val();
//        var len = val.toString().length;
//        if (len > 25)
//        {
//            var errorMsg = "Length should be maximum of 25 characters!";
//            if (lobiboxNotifyAlert !== null)
//            {
//                lobiboxNotifyAlert.remove();
//            }
//            lobiboxNotifyAlert = Lobibox.notify("error", {
//                rounded: true,
//                delayIndicator: false,
//                msg: errorMsg
//            });
//            $(this).css("border-color", "red");
//            $(this).focus();
//
//            $("#createPoBtn").prop("disabled", true);
//            $("#createStandalonePoBtn").prop("disabled", true);
//        }
//        else
//        {
//            $(this).css("border-color", "");
//
//            $("#createPoBtn").prop("disabled", false);
//            $("#createStandalonePoBtn").prop("disabled", false);
//        }
//    });
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