$(document).ready(function() {


//    $(".sw-btn-next").addClass("btn-rounded");
    $("#smartwizard").on("leaveStep", function(e, anchorObject, stepNumber, stepDirection) {
//        return confirm("Do you want to leave the step " + stepNumber + "?");
        if (stepNumber === 2 && stepDirection === 'forward')
        {
            var rfq_operation = $('#rfq_operation').val();
            if (rfq_operation === 'create') {
                var vendor = $("#ro_vendorname").val();
                var rowCount = $('#rfq_vendor_table >tbody >tr').length;
                console.log("rowCount: " + rowCount);

                if (rowCount === 0) {
                    Lobibox.alert("error", {
                        msg: "Please select the vendor!"
                    });
                    return false;
                }
            }
            //Girivasu
            if (rfq_operation === 'rfq_for_contract') {
                var vendor = $("#ro_vendorname").val();
                var rowCount = $('#rfq_vendor_table >tbody >tr').length;
                console.log("rowCount: " + rowCount);

                if (rowCount === 0) {
                    Lobibox.alert("error", {
                        msg: "Please select the vendor!"
                    });
                    return false;
                }
            }
            //  Girivasu
        }
        //added by abhishek

//        if (stepNumber === 0 && stepDirection === 'forward')
//        {
////            alert("insdie");
//           var rfq_operation = $('#rfq_operation').val();
//         alert(rfq_operation);
//         alert(stepNumber);
//            
//        if (rfq_operation === 'rfq_for_contract')
//        {
//                var vendor = $("#ro_vendorname").val();
//                var deliveryterms = $("#deliveryterms").val();
//                var paymentterms = $("#paymentterms").val();
//                var rfqvaliduntil = $("#rfqvaliduntil").val();
//                var rfqcloseson = $("#rfqcloseson").val();
//           //    alert(expecteddeliverydate);
//                if (vendor === '') {
//                    Lobibox.alert("error", {
//                        msg: "Please select the vendor!"
//                    });
//                    return false;
//                }
//                 //all of the value are missing
//                if (deliveryterms === '' && paymentterms === '' && rfqvaliduntil === '' && rfqcloseson === '') {
////                    Lobibox.alert("error", {
////                        msg: "Please enter the required fields !"
////                    });
////                    return false;
//                    $("#parsley-id-1").addClass("parsley-errors-list");
//                    $("#parsley_deliveryterms").text("This value is required.");
//                    $("#parsley-id-3").addClass("parsley-errors-list");
//                    $("#parsley_paymentterms").text("This value is required.");
//                    $("#parsley-id-5").addClass("parsley-errors-list");
//                    $("#parsley_rfqvaliduntil").text("This value is required.");
//                    $("#parsley-id-7").addClass("parsley-errors-list");
//                    $("#parsley_rfqcloseson").text("hello required");
//                    return false;
//                }
//                // any of the value is missing
//                if (deliveryterms === '' || paymentterms === '' || rfqvaliduntil === '' || rfqcloseson === '') {
//               alert("inside payment terms")
//                    var deliveryterms = $("#deliveryterms").val();
//                    if (deliveryterms === '') {
//                        $("#parsley-id-1").addClass("parsley-errors-list");
//                        $("#parsley_deliveryterms").text("This value is required.");
//                    }
//                    var paymentterms = $("#paymentterms").val();
//                    if (paymentterms === '') {
//                        $("#parsley-id-3").addClass("parsley-errors-list");
//                        $("#parsley_paymentterms").text("This value is required.");
//                    }
//                    if (rfqvaliduntil === '') {
//                        $("#parsley-id-5").addClass("parsley-errors-list");
//                        $("#parsley_rfqvaliduntil").text("This value is required.");
//                    }
//                    if (rfqcloseson === '') {
//                        $("#parsley-id-7").addClass("parsley-errors-list");
//                        $("#parsley_rfqcloseson").text("This value is required.");
//                    }
//                    return false;
//                }
//            }
//           else if(rfq_operation === 'update_contract_rfq')
//           {
//                 var rfqvaliduntil = $("#rfqvaliduntil").val();
//                     if (rfqvaliduntil === '') {
//                        $("#parsley-id-5").addClass("parsley-errors-list");
//                        $("#parsley_rfqvaliduntil").text("This value is required.");
//                         return false;
//                    }
//                    
//           }
//        }
        //  alert("before second step")
//         if (stepNumber === 1 && stepDirection === 'forward') {
//             var rfq_operation = $('#rfq_operation').val();
//        if (rfq_operation === 'rfq_for_contract') {
//            
//                var contactpersonename = $("#contactpersonename").val();
//                var contactpersonetelno = $("#contactpersonetelno").val();
//                var contactpersoneemail = $("#contactpersoneemail").val();
//               
//            }
//        }








        //ended by abhishek
        if (stepNumber === 0 && stepDirection === 'forward') {
//            alert("Bittu");
            var rfq_operation = $('#rfq_operation').val();
            if (stepNumber === 0 && stepDirection === 'forward')
            {
//            alert("insdie");
                var rfq_operation = $('#rfq_operation').val();
                // alert(rfq_operation);
                //   alert(stepNumber);
                //Girivasu 
                if (rfq_operation === 'rfq_for_contract')
                {
                    var vendor = $("#ro_vendorname").val();
                    var deliveryterms = $("#deliveryterms").val();
                    var paymentterms = $("#paymentterms").val();
                    var rfqvaliduntil = $("#rfqvaliduntil").val();
                    var expecteddeliverydate = $("#expecteddeliverydate").val();
                    var contactpersonename = $("#contactpersonename").val();
                    var rfqcloseson = $("#rfqcloseson").val();
                    var contactpersonetelno = $("#contactpersonetelno").val();
                    var contactpersoneemail = $("#contactpersoneemail").val();

                    var agreementdate = $("#agreementdate").val();
                    var validitystartdate = $("#validitystartdate").val();
                    var validityenddate = $("#validityenddate").val();
                    var PurchOrganization = $("#PurchOrganization").val();
                    var PurchaseGroup = $("#PurchaseGroup").val();

                    var termofcontract = $("#termofcontract").val();
                    var extofcontract = $("#extofcontract").val();

                    // any of the value is missing
                    if (deliveryterms === '' || paymentterms === '' || rfqvaliduntil === '' || rfqcloseson === '' || contactpersonename === '' ||
                            contactpersoneemail === '' || contactpersonetelno === '' || agreementdate === '' || validitystartdate === '' || validityenddate === '' ||
                            PurchOrganization === '' || PurchaseGroup === '' || termofcontract === '' || extofcontract === '') {

                        var deliveryterms = $("#deliveryterms").val();
                        if (deliveryterms === '') {
                            $("#parsley-id-1").addClass("parsley-errors-list");
                            $("#parsley_deliveryterms").text("This value is required.");
                        }
                        var paymentterms = $("#paymentterms").val();
                        if (paymentterms === '') {
                            $("#parsley-id-3").addClass("parsley-errors-list");
                            $("#parsley_paymentterms").text("This value is required.");
                        }
                        if (rfqvaliduntil === '') {
                            $("#parsley-id-5").addClass("parsley-errors-list");
                            $("#parsley_rfqvaliduntil").text("This value is required.");
                        }
                        if (rfqcloseson === '') {
                            $("#parsley-id-7").addClass("parsley-errors-list");
                            $("#parsley_rfqcloseson").text("This value is required.");
                        }
                        if (contactpersonename === '') {
                            $("#parsley-id-11").addClass("parsley-errors-list");
                            $("#parsley_contactpersonename").text("This value is required.");
                        }
                        if (contactpersonetelno === '') {
                            $("#parsley-id-13").addClass("parsley-errors-list");
                            $("#parsley_contactpersonetelno").text("This value is required.");
                        }
                        if (contactpersoneemail === '') {
                            $("#parsley-id-15").addClass("parsley-errors-list");
                            $("#parsley_contactpersoneemail").text("This value is required.");
                        }

                        if (agreementdate === '') {
                            $("#parsley-id-16").addClass("parsley-errors-list");
                            $("#parsley_agreementdate").text("This value is required.");
                        }
                        if (validitystartdate === '') {
                            $("#parsley-id-17").addClass("parsley-errors-list");
                            $("#parsley_validitystartdate").text("This value is required.");
                        }
                        if (validityenddate === '') {
                            $("#parsley-id-18").addClass("parsley-errors-list");
                            $("#parsley_validityenddate").text("This value is required.");
                        }
                        if (PurchOrganization === '') {
                            $("#parsley-id-19").addClass("parsley-errors-list");
                            $("#parsley_PurchOrganization").text("This value is required.");
                        }
                        if (PurchaseGroup === '') {
                            $("#parsley-id-20").addClass("parsley-errors-list");
                            $("#parsley_PurchaseGroup").text("This value is required.");
                        }
                        //termofcontract==='' ||extofcontract
                        if (termofcontract === '') {
                            $("#parsley-id-19").addClass("parsley-errors-list");
                            $("#parsley_termofcontract").text("This value is required.");
                        }
                        if (extofcontract === '') {
                            $("#parsley-id-20").addClass("parsley-errors-list");
                            $("#parsley_extofcontract").text("This value is required.");
                        }
                        return false;
                    }
//Girivasu
                    if (contactpersonetelno !== '') {
                        var tel_regx = /^((\(\d{3}\) ?)|(\d{3}))?\d{3}\d{4}$/;
                        if (contactpersonetelno.length !== 10)
                        {
                            $("#parsley-id-13").addClass("parsley-errors-list");
                            $("#parsley_contactpersonetelno").text("This field should contain exactly 10 digits.");
                            return false;
                        }
                        if (!tel_regx.test(contactpersonetelno)) {
                            $("#parsley-id-13").addClass("parsley-errors-list");
                            $("#parsley_contactpersonetelno").text("This value is invalid.");
                            return false;
                        }
                    }
                }
                else if (rfq_operation === 'update_contract_rfq')
                {
                    var rfqvaliduntil = $("#rfqvaliduntil").val();
                    if (rfqvaliduntil === '') {
                        $("#parsley-id-5").addClass("parsley-errors-list");
                        $("#parsley_rfqvaliduntil").text("This value is required.");
                        return false;
                    }

                }
            }
            if (rfq_operation === 'create') {
                var rfqtitle = $("#RFQTitle").val();
                var contactpersonename = $("#contactpersonename").val();
                var contactpersonetelno = $("#contactpersonetelno").val();
                var contactpersoneemail = $("#contactpersoneemail").val();
                var deliveryterms = $("#deliveryterms").val();
                var paymentterms = $("#paymentterms").val();
                var rfqvaliduntil = $("#rfqvaliduntil").val();
                var expecteddeliverydate = $("#expecteddeliverydate").val();
                var rfqparameter = $("#selectparameters").val();
                var ratedParameterHidden = $("#ratedParameterHidden").val();

                if (contactpersonename === '' && contactpersonetelno === '' && contactpersoneemail === '' && rfqvaliduntil === '' && expecteddeliverydate === '' && rfqparameter == '') {
//                    $("#parsley-id-9").addClass("parsley-errors-list");
//                    $("#parsley_rfqtitle").text("This value is required.");
                    $("#parsley-id-11").addClass("parsley-errors-list");
                    $("#parsley_contactpersonename").text("This value is required.");
                    $("#parsley-id-13").addClass("parsley-errors-list");
                    $("#parsley_contactpersonetelno").text("This value is required.");
                    $("#parsley-id-15").addClass("parsley-errors-list");
                    $("#parsley_contactpersoneemail").text("This value is required.");
//                    $("#parsley-id-1").addClass("parsley-errors-list");
//                    $("#parsley_deliveryterms").text("This value is required.");
//                    $("#parsley-id-3").addClass("parsley-errors-list");
//                    $("#parsley_paymentterms").text("This value is required.");
                    $("#parsley-id-5").addClass("parsley-errors-list");
                    $("#parsley_rfqvaliduntil").text("This value is required.");
                    $("#parsley-id-7").addClass("parsley-errors-list");
                    $("#parsley_expecteddeliverydate").text("This value is required.");
                    $("#parsley-id-17").addClass("parsley-errors-list");
                    $("#parsley_rfqparameter").text("This value is required.");
                    return false;
                }
                if (contactpersonename === '' || contactpersonetelno === '' || contactpersoneemail === '' || rfqvaliduntil === '' || expecteddeliverydate === '') {
//                    alert("BIttu");
//                    if (rfqtitle === '') {
//                        $("#parsley-id-9").addClass("parsley-errors-list");
//                        $("#parsley_rfqtitle").text("This value is required.");
//                    }
                    if (contactpersonename === '') {
                        $("#parsley-id-11").addClass("parsley-errors-list");
                        $("#parsley_contactpersonename").text("This value is required.");
                    }
                    if (contactpersonetelno === '') {
                        $("#parsley-id-13").addClass("parsley-errors-list");
                        $("#parsley_contactpersonetelno").text("This value is required.");
                    }
                    if (contactpersoneemail === '') {
                        $("#parsley-id-15").addClass("parsley-errors-list");
                        $("#parsley_contactpersoneemail").text("This value is required.");
                    }
//                    if (deliveryterms === '') {
//                        $("#parsley-id-1").addClass("parsley-errors-list");
//                        $("#parsley_deliveryterms").text("This value is required.");
//                    }
//                    if (paymentterms === '') {
//                        $("#parsley-id-3").addClass("parsley-errors-list");
//                        $("#parsley_paymentterms").text("This value is required.");
//                    }
                    if (rfqvaliduntil === '') {
                        $("#parsley-id-5").addClass("parsley-errors-list");
                        $("#parsley_rfqvaliduntil").text("This value is required.");
                    }
                    if (expecteddeliverydate === '') {
                        $("#parsley-id-7").addClass("parsley-errors-list");
                        $("#parsley_expecteddeliverydate").text("This value is required.");
                    }
                    return false;
                }
                if (contactpersonetelno !== '') {
                    var tel_regx = /^((\(\d{3}\) ?)|(\d{3}))?\d{3}\d{4}$/;
                    if (contactpersonetelno.length !== 10)
                    {
                        $("#parsley-id-13").addClass("parsley-errors-list");
                        $("#parsley_contactpersonetelno").text("This field should contain exactly 10 digits.");
                        return false;
                    }
                    if (!tel_regx.test(contactpersonetelno)) {
                        $("#parsley-id-13").addClass("parsley-errors-list");
                        $("#parsley_contactpersonetelno").text("This value seems to be invalid.");
                        return false;
                    }
                }
//                if (ratedParameterHidden === "")
//                {
//                    Lobibox.alert("error", {
//                        msg: "Please select rated parameters!"
//                    });
//                    return false;
//                }
                if (deliveryterms.length > 150)
                {
                    $("#parsley-id-1").addClass("parsley-errors-list");
                    $("#parsley_deliveryterms").text("Delivery Terms can not be more than 150 characters!");
                    return false;
                }
                if (contactpersonename.length > 55) {
                    $("#parsley-id-11").addClass("parsley-errors-list");
                    $("#parsley_contactpersonename").text("Contact Person Name can not be more than 55 characters!");
                    return false;
                }
                if (contactpersoneemail.length > 25) {
                    $("#parsley-id-15").addClass("parsley-errors-list");
                    $("#parsley_contactpersoneemail").text("Contact Person Email can not be more than 25 characters!");
                    return false;
                }
            }
            else if (rfq_operation === 'update') {
                var rfqtitle = $("#RFQTitle").val();
                var contactpersonename = $("#contactpersonename").val();
                var contactpersonetelno = $("#contactpersonetelno").val();
                var contactpersoneemail = $("#contactpersoneemail").val();
                var deliveryterms = $("#deliveryterms").val();
                var paymentterms = $("#paymentterms").val();
                var rfqvaliduntil = $("#rfqvaliduntil").val();
                var expecteddeliverydate = $("#expecteddeliverydate").val();

                if (contactpersonename === '' && contactpersonetelno === '' && contactpersoneemail === '' && rfqvaliduntil === '' && expecteddeliverydate === '') {
//                    $("#parsley-id-9").addClass("parsley-errors-list");
//                    $("#parsley_rfqtitle").text("This value is required.");
                    $("#parsley-id-11").addClass("parsley-errors-list");
                    $("#parsley_contactpersonename").text("This value is required.");
                    $("#parsley-id-13").addClass("parsley-errors-list");
                    $("#parsley_contactpersonetelno").text("This value is required.");
                    $("#parsley-id-15").addClass("parsley-errors-list");
                    $("#parsley_contactpersoneemail").text("This value is required.");
//                    $("#parsley-id-1").addClass("parsley-errors-list");
//                    $("#parsley_deliveryterms").text("This value is required.");
//                    $("#parsley-id-3").addClass("parsley-errors-list");
//                    $("#parsley_paymentterms").text("This value is required.");
                    $("#parsley-id-5").addClass("parsley-errors-list");
                    $("#parsley_rfqvaliduntil").text("This value is required.");
                    $("#parsley-id-7").addClass("parsley-errors-list");
                    $("#parsley_expecteddeliverydate").text("This value is required.");

                    return false;
                }
                if (contactpersonename === '' || contactpersonetelno === '' || contactpersoneemail === '' || rfqvaliduntil === '' || expecteddeliverydate === '') {
//                    alert("BIttu");
//                    if (rfqtitle === '') {
//                        $("#parsley-id-9").addClass("parsley-errors-list");
//                        $("#parsley_rfqtitle").text("This value is required.");
//                    }
                    if (contactpersonename === '') {
                        $("#parsley-id-11").addClass("parsley-errors-list");
                        $("#parsley_contactpersonename").text("This value is required.");
                    }
                    if (contactpersonetelno === '') {
                        $("#parsley-id-13").addClass("parsley-errors-list");
                        $("#parsley_contactpersonetelno").text("This value is required.");
                    }
                    if (contactpersoneemail === '') {
                        $("#parsley-id-15").addClass("parsley-errors-list");
                        $("#parsley_contactpersoneemail").text("This value is required.");
                    }
//                    if (deliveryterms === '') {
//                        $("#parsley-id-1").addClass("parsley-errors-list");
//                        $("#parsley_deliveryterms").text("This value is required.");
//                    }
//                    if (paymentterms === '') {
//                        $("#parsley-id-3").addClass("parsley-errors-list");
//                        $("#parsley_paymentterms").text("This value is required.");
//                    }
                    if (rfqvaliduntil === '') {
                        $("#parsley-id-5").addClass("parsley-errors-list");
                        $("#parsley_rfqvaliduntil").text("This value is required.");
                    }
                    if (expecteddeliverydate === '') {
                        $("#parsley-id-7").addClass("parsley-errors-list");
                        $("#parsley_expecteddeliverydate").text("This value is required.");
                    }
                    return false;
                }
            }

            else if (rfq_operation === 'create_rfp') {
                var contactpersonename = $("#contactpersonename").val();
                var contactpersonetelno = $("#contactpersonetelno").val();
                var contactpersoneemail = $("#contactpersoneemail").val();
                if (contactpersonename === '' && contactpersonetelno === '' && contactpersoneemail === '') {
//                    $("#parsley-id-9").addClass("parsley-errors-list");
//                    $("#parsley_rfqtitle").text("This value is required.");
                    $("#parsley-id-11").addClass("parsley-errors-list");
                    $("#parsley_contactpersonename").text("This value is required.");
                    $("#parsley-id-13").addClass("parsley-errors-list");
                    $("#parsley_contactpersonetelno").text("This value is required.");
                    $("#parsley-id-15").addClass("parsley-errors-list");
                    $("#parsley_contactpersoneemail").text("This value is required.");
                    return false;
                }
                if (rfqtitle === '' || contactpersonename === '' || contactpersonetelno === '' || contactpersoneemail === '') {
//                    alert("BIttu");
                    if (rfqtitle === '') {
                        $("#parsley-id-9").addClass("parsley-errors-list");
                        $("#parsley_rfqtitle").text("This value is required.");
                    }
                    if (contactpersonename === '') {
                        $("#parsley-id-11").addClass("parsley-errors-list");
                        $("#parsley_contactpersonename").text("This value is required.");
                    }
                    if (contactpersonetelno === '') {
                        $("#parsley-id-13").addClass("parsley-errors-list");
                        $("#parsley_contactpersonetelno").text("This value is required.");
                    }
                    if (contactpersoneemail === '') {
                        $("#parsley-id-15").addClass("parsley-errors-list");
                        $("#parsley_contactpersoneemail").text("This value is required.");
                    }
                    return false;
                }
            }
            else if (rfq_operation === 'create_rfp_contract')
            {
                //alert("abhis");
                var contactpersonename = $("#contactpersonename").val();
                var contactpersonetelno = $("#contactpersonetelno").val();
                var contactpersoneemail = $("#contactpersoneemail").val();
                var deliveryterms = $("#deliveryterms").val();
                var paymentterms = $("#paymentterms").val();
                var rfqvaliduntil = $("#rfqvaliduntil").val();
                var expecteddeliverydate = $("#expecteddeliverydate").val();
                var rfpType = $("#rfpType").val();

                if (contactpersonename === '' && contactpersonetelno === '' && contactpersoneemail === '' && deliveryterms === '' && paymentterms === '' && rfqvaliduntil === '' && expecteddeliverydate === '' && rfpType === '') {
                    $("#parsley-id-11").addClass("parsley-errors-list");
                    $("#parsley_contactpersonename").text("This value is required.");
                    $("#parsley-id-22").addClass("parsley-errors-list");
                    $("#parsley_contactpersonetelno").text("This value is required.");
                    $("#parsley-id-33").addClass("parsley-errors-list");
                    $("#parsley_contactpersoneemail").text("This value is required.");
                    $("#parsley-id-44").addClass("parsley-errors-list");
                    $("#parsley_deliveryterms").text("This value is required.");
                    $("#parsley-id-55").addClass("parsley-errors-list");
                    $("#parsley_paymentterms").text("This value is required.");
                    $("#parsley-id-66").addClass("parsley-errors-list");
                    $("#parsley_rfqvaliduntil").text("This value is required.");
                    $("#parsley-id-77").addClass("parsley-errors-list");
                    $("#parsley_expecteddeliverydate").text("This value is required.");
                    $("#parsley-id-88").addClass("parsley-errors-list");
                    $("#parsley_rfptype").text("This value is required.");
                    return false;
                }
                if (contactpersonename === '' || contactpersonetelno === '' || contactpersoneemail === '' || deliveryterms === '' || paymentterms === '' || rfqvaliduntil === '' || expecteddeliverydate === '' || rfpType === '') {
//                    alert("BIttu");

                    if (contactpersonename === '') {
                        $("#parsley-id-11").addClass("parsley-errors-list");
                        $("#parsley_contactpersonename").text("This value is required.");
                    }
                    if (contactpersonetelno === '') {
                        $("#parsley-id-22").addClass("parsley-errors-list");
                        $("#parsley_contactpersonetelno").text("This value is required.");
                    }
                    if (contactpersoneemail === '') {
                        $("#parsley-id-33").addClass("parsley-errors-list");
                        $("#parsley_contactpersoneemail").text("This value is required.");
                    }
                    if (deliveryterms === '') {
                        $("#parsley-id-44").addClass("parsley-errors-list");
                        $("#parsley_deliveryterms").text("This value is required.");
                    }
                    if (paymentterms === '') {
                        $("#parsley-id-55").addClass("parsley-errors-list");
                        $("#parsley_paymentterms").text("This value is required.");
                    }
                    if (rfqvaliduntil === '') {
                        $("#parsley-id-66").addClass("parsley-errors-list");
                        $("#parsley_rfqvaliduntil").text("This value is required.");
                    }
                    if (expecteddeliverydate === '') {
                        $("#parsley-id-77").addClass("parsley-errors-list");
                        $("#parsley_expecteddeliverydate").text("This value is required.");
                    }
                    if (rfpType === '') {
                        $("#parsley-id-88").addClass("parsley-errors-list");
                        $("#parsley_rfptype").text("This value is required.");
                    }
                    return false;
                }
            }
            else if (rfq_operation = 'rfq_for_contract')
            {

            }

        }
        if (stepNumber === 1 && stepDirection === 'forward')
        {


            if (rfq_operation = 'create_rfp_contract')
            {


            }
        }
        if (stepNumber === 2 && stepDirection === 'forward')
        {


            if (rfq_operation === 'rfq_for_contract') {
                var vendor = $("#ro_vendorname").val();
                var rowCount = $('#rfq_vendor_table >tbody >tr').length;
                console.log("rowCount: " + rowCount);

                if (rowCount === 0) {
                    Lobibox.alert("error", {
                        msg: "Please select the vendor!"
                    });
                    return false;
                }
            }
        }
//        $(".finish-btn").click(function(){
//           alert("BITTU"); 
//        });

    });
    // Step show event
    $("#smartwizard").on("showStep", function(e, anchorObject, stepNumber, stepDirection, stepPosition) {
//        alert("You are on step "+stepNumber+" now");

        if (stepPosition === 'first') {
            $("#prev-btn").addClass('disabled');
            $(".finish-btn").prop("disabled", true);

        } else if (stepPosition === 'final') {
            $("#next-btn").addClass('disabled');
            $(".finish-btn").prop("disabled", false);
//            var action = $("#action").val();
            var action = $("#hd_action").val();
            if (action === 'Cancel' || action === 'Reject') {
//                    alert("Bittu");
                $(".finish-btn").addClass('disabled');
                $(".finish-btn").prop("disabled", true);

            }
        } else {
            $("#prev-btn").removeClass('disabled');
            $("#next-btn").removeClass('disabled');
            $(".finish-btn").prop("disabled", true);
        }
    });

    // Toolbar extra buttons
    var btnFinish = $('<button></button>').text('Finish')
            .addClass('btn btn-success btn-rounded finish-btn')
            .on('click', function() {
//                alert('Finish Clicked');

            });
    var btnCancel = $('<button></button>').text('Cancel')
            .addClass('btn btn-light btn-rounded')
            .on('click', function() {
                $('#smartwizard').smartWizard("reset");

                $(".sw-btn-prev").removeClass("btn-secondary");
                $(".sw-btn-next").removeClass("btn-secondary");

                $(".sw-btn-prev").addClass("btn-rounded step-wizard-prev-next-bg");
                $(".sw-btn-next").addClass("btn-rounded step-wizard-prev-next-bg");

                var rfq_operation = $('#rfq_operation').val();
//                alert(rfq_operation);
                if (rfq_operation === 'create') {
                    location.href = "pendingprlines.do"
                } else if (rfq_operation === 'update') {
                    location.href = "mytask.do"
                } else if (rfq_operation === 'rfq_for_contract') {
                    location.href = "pendingprlines.do"
                } else if (rfq_operation === 'create_rfp') {
                    location.href = "dashboardcont.do"
                }
                else if (rfq_operation === 'create_rfp_contract') {
                    location.href = "dashboardcont.do"
                } else if (rfq_operation === 'rfq_details') {
                    location.href = "managerfpcontract.do"
                }

            });


    // Smart Wizard
    $('#smartwizard').smartWizard({
        selected: 0,
        theme: 'arrows',
        transitionEffect: 'fade',
        showStepURLhash: true,
        toolbarSettings:
                {
                    toolbarPosition: 'none',
                    toolbarButtonPosition: 'end',
                    toolbarExtraButtons: [btnFinish, btnCancel]
                }
    });


    // External Button Events
    $("#reset-btn").on("click", function()
    {
        // Reset wizard
        $('#smartwizard').smartWizard("reset");
        return true;
    });

    $("#prev-btn").on("click", function() {
        // Navigate previous
        $('#smartwizard').smartWizard("prev");
        return true;
    });

    $("#next-btn").on("click", function() {
        // Navigate next
        $('#smartwizard').smartWizard("next");
        return true;
    });

    $("#theme_selector").on("change", function() {
        // Change theme
        $('#smartwizard').smartWizard("theme", $(this).val());
        return true;
    });

    $(".sw-btn-prev").removeClass("btn-secondary");
    $(".sw-btn-next").removeClass("btn-secondary");

    $(".sw-btn-prev").addClass("btn-rounded step-wizard-prev-next-bg");
//    $(".sw-btn-next").addClass("btn-rounded step-wizard-prev-next-bg");
    $(".sw-btn-next").addClass("btn-rounded step-wizard-prev-next");

    $(".finish-btn").prop("disabled", true);
    // Set selected theme on page refresh
//            $("#theme_selector").change();
});