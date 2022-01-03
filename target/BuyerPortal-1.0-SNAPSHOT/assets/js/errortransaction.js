$(document).ready(function() {
    $("#overlay").css("display", "none");

    $(".editErrorTransaction").click(function() {
        var extId = $(this).parent().children(".extId").val();
        var poFrom = $(this).parent().children(".poFromClass").val();
        var selectedVendorIdClass = $(this).parent().children(".selectedVendorIdClass").val();
        var vendorFinalizationTableDataArrayAsJsonStringClass = $(this).parent().children(".vendorFinalizationTableDataArrayAsJsonStringClass").val();
        console.log("extId: " + extId);
        console.log("poFrom: " + poFrom);
        console.log("selectedVendorIdClass: " + selectedVendorIdClass);
        console.log("vendorFinalizationTableDataArrayAsJsonStringClass: " + vendorFinalizationTableDataArrayAsJsonStringClass);

        $("#draftPoExtId").val(extId);
        $("#reqFrom").val(poFrom);
        if (poFrom === "byrfq") {
            $("#SelectedVendorId").val(selectedVendorIdClass);
            $("#vendorFinalizationTableDataArrayAsJsonString").val(vendorFinalizationTableDataArrayAsJsonStringClass);
        }
        $("#draftPoForm").submit();
    });
});
if ($("table.errorTransactionsTable").length) {
    $(document).ready(function() {
        $('#errorTransactionsTable thead tr').clone(true).appendTo('#errorTransactionsTable thead');
        $('#errorTransactionsTable thead tr:eq(1) th').each(function(i) {
            $('#errorTransactionsTable thead tr:eq(0) th').addClass("table-header-color");
            var title = $(this).text();
            if (title === '')
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

        var table = $('table.errorTransactionsTable').DataTable({
            lengthChange: false,
            orderCellsTop: true,
            buttons: [
                {
                    extend: 'collection',
                    text: 'Export',
                    buttons: [
                        {extend: 'excel', title: 'Error Transactions'},
                        {extend: 'pdf', title: 'Error Transactions'},
                        {extend: 'print', title: 'Error Transactions'}
                    ]
                }
            ],
            "aoColumnDefs": [
                {"sType": "date-uk2", "aTargets": [3, 4]}
            ]
        });
        table.buttons().container()
                .appendTo('#errorTransactionsTable_wrapper .col-md-6:eq(0)');
    });
}