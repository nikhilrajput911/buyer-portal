var SeriveAccountAssignmentDataJsonArray = [];
var PRLineItemArray = [];
$(document).ready(function() {
    $("#poNumber").blur(function() {
        if ($(this).val() !== "") {
            $("#overlay").css("display", "block");
            callNGWebServiceTOFetchPODetails();
        }
    });
});

function callNGWebServiceTOFetchPODetails() {
    console.log("edit po");
//    var poNumber = $(this).parent().parent().find("td").eq(0).text();
    var poNumber = $("#poNumber").val();
    console.log("poNumber: " + poNumber);

    var WebServiceCallIp = $("#WebServiceCallIp").val();
    console.log("WebServiceCallIp: " + WebServiceCallIp);

//    var serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_FetchPO?PONumber=" + poNumber + "&FetchFlag=R";
    var serviceUrl = WebServiceCallIp + "/WebServiceCall/PO_FetchPO?PONumber=" + poNumber + "&FetchFlag=E&Pid=";
    console.log("serviceUrl: " + serviceUrl);

//    fetchPODetails("");

    $.ajax({
        type: "GET",
        url: serviceUrl,
        contentType: "application/xml",
        dataType: "xml",
        async: true,
        success: function(data, textStatus, jqXHR) {
            fetchPODetails(data);
        }
    });
}

var parsedJsonPoData = "";
var itemNumber = "";

function fetchPODetails(xmlre)
{
    console.log("xmlre in EditStandalonePO :" + xmlre);

    var xmlString = XMLToString(xmlre); //Convert the XML Object to a String
    var xmlDoc = $.parseXML(xmlString); //Parse the XML String to get data

//    var xmlString = "<?xml version=\"1.0\" encoding=\"UTF-8\" ?><POFetchOP>  <Message>Success</Message>  <GeneralData>    <PurchaseOrderNumber>9050083126</PurchaseOrderNumber>    <PurchaseOrderType>PO for Services</PurchaseOrderType>    <CompanyCode>0640</CompanyCode>    <ReferenceDocumentType></ReferenceDocumentType>    <ReferenceDocumentNumber></ReferenceDocumentNumber>    <ReferenceDocumentLine></ReferenceDocumentLine>    <VendorCode>0001103974</VendorCode>    <DocumentDate>2020-04-30</DocumentDate>    <PurchasingOrg>640</PurchasingOrg>    <PurchasingGrp>F02</PurchasingGrp>    <CollectiveNumber></CollectiveNumber>    <POCreatedDate>2020-04-30</POCreatedDate>  </GeneralData>  <PODeliveryInvoiceData>    <paymentTerms>COD0</paymentTerms>    <Currency>SGD</Currency>    <ExchangeRate>1.00000</ExchangeRate>    <ExchangeRateFixed>f</ExchangeRateFixed>    <Incoterms1>DEL</Incoterms1>    <Incoterms2>NATSTEEL</Incoterms2>    <GRMessage></GRMessage>  </PODeliveryInvoiceData>  <POLineItemData>    <ItemNumber>00010</ItemNumber>    <AccountAssignment>K</AccountAssignment>    <ItemCategory></ItemCategory>    <ShortText>H -</ShortText>    <Quantity>1.000</Quantity>    <PriceUnit>1</PriceUnit>    <Currency>SGD</Currency>    <MaterialGroup>REMA09</MaterialGroup>    <StorageLocation></StorageLocation>    <TrackingNumber>0017</TrackingNumber>    <GRProcTime>0</GRProcTime>    <MaterialCode></MaterialCode>    <Plant>6400</Plant>    <Unit>LE</Unit>    <GoodsReceipt>X</GoodsReceipt>    <GRNonVal></GRNonVal>    <AgreementLineItem>00000</AgreementLineItem>    <InfoRecord></InfoRecord>    <POUnit>LE</POUnit>    <PRLinkID>43450440</PRLinkID>    <Distribution></Distribution>    <PartialInvoiceIndicator>Derive from Account Assignment Category</PartialInvoiceIndicator>    <PackageNo>0002095980</PackageNo>    <TaxCode>BO</TaxCode>    <NetPrice>100.000000000</NetPrice>    <PRItemNumber>00010</PRItemNumber>    <PRNumber>9020092878</PRNumber>  </POLineItemData>  <POAccntAssignData>    <UnloadingPoint></UnloadingPoint>    <GLAccount>0008514928</GLAccount>    <COArea>0640</COArea>    <CostCenter>0640-53031</CostCenter>    <AccOrder></AccOrder>    <Asset></Asset>    <WBSElement></WBSElement>    <ItemNumber>00010</ItemNumber>    <Quantity>1.000</Quantity>    <Percentage>0.0</Percentage>    <Fund>NSH001</Fund>    <FunctionalArea>1000</FunctionalArea>    <FundsCentre>0640-53031</FundsCentre>    <CommitmentItem>8514928</CommitmentItem>    <Network></Network>    <PRLinkID>43450440</PRLinkID>    <SerialNo>01</SerialNo>  </POAccntAssignData>  <PODeliveryAddressData>    <Title></Title>    <Name1>Natsteel holdings</Name1>    <Name2>Natsteel holdings</Name2>    <Street>Tanjong Kling Road</Street>    <HouseNo>22</HouseNo>    <PostalCode>628048</PostalCode>    <City>Singapore</City>    <Country>SG</Country>    <Region></Region>    <LinkId>43450440</LinkId>    <ItemNo>00010</ItemNo>  </PODeliveryAddressData>  <PODeliveryScheduleData>    <DelDateCatg>D</DelDateCatg>    <DelDate>2020-04-21</DelDate>    <ScheduledQuantity>1.000</ScheduledQuantity>    <DelTime>00:00:00</DelTime>    <PRNumber>9020092878</PRNumber>    <ReqItemNo>00010</ReqItemNo>    <LinkId>43450440</LinkId>    <ItemNo>00010</ItemNo>  </PODeliveryScheduleData>  <POServiceData>    <ServiceNumber>REMA09003</ServiceNumber>    <ShortText>R&amp;amp;M - MECHANICAL - LABORS AND MATERIALS</ShortText>    <Quantity>10.000</Quantity>    <GrossPrice>10.0000</GrossPrice>    <OverfTolerance>0.0</OverfTolerance>    <LinkId>43450440</LinkId>    <ServiceLinkID>68577756</ServiceLinkID>    <PackageNo>0002095981</PackageNo>    <SubPackageNo>0000000000</SubPackageNo>    <LineNo>0000000002</LineNo>    <Distribution></Distribution>    <Base_UOM>EA</Base_UOM>  </POServiceData>  <POServiceRefData>    <PackageNo>0002095980</PackageNo>    <SubPackageNo>0002095981</SubPackageNo>    <LineNo>0000000001</LineNo>  </POServiceRefData>  <POAccntAssignvalData>    <Quantity>10.000</Quantity>    <Percentage>100.0</Percentage>    <CostCenter>0640-53031</CostCenter>    <Acc_Order></Acc_Order>    <Acc_Asset></Acc_Asset>    <Acc_WBSElement></Acc_WBSElement>    <Network></Network>    <CoArea>0640</CoArea>    <GLAccount>0008514928</GLAccount>    <CommitmentItem>8514928</CommitmentItem>    <Fund>NSH001</Fund>    <FundsCentre>0640-53031</FundsCentre>    <FunctionalArea>1000</FunctionalArea>    <PackageNo>0002095981</PackageNo>    <SerialNo>01</SerialNo>    <LineNo>0000000002</LineNo>    <SerNoLine>01</SerNoLine>  </POAccntAssignvalData>  <POCommunicationData>    <SalesPerson>dfghj</SalesPerson>    <YourReference></YourReference>    <Telephone>9684 1838</Telephone>    <OurReference></OurReference>    <Language>E</Language>  </POCommunicationData>  <PODeliveryData>    <OverDelTol>0.0</OverDelTol>    <UnderDelTol>0.0</UnderDelTol>    <ShippingInstructions></ShippingInstructions>    <StockType></StockType>    <FstRem_Exped>10</FstRem_Exped>    <SecRem_Exped>20</SecRem_Exped>    <ThrdRem_Exped>30</ThrdRem_Exped>    <ValuationType></ValuationType>    <RemShelfLife>0</RemShelfLife>    <QAControlLife></QAControlLife>    <PlDelTime></PlDelTime>    <GrProcTime>0</GrProcTime>    <IncoTerms1></IncoTerms1>    <IncoTerm2></IncoTerm2>    <GRNonVal></GRNonVal>    <DelvCompleted></DelvCompleted>    <Unlimited>X</Unlimited>    <ItemNumber>00010</ItemNumber>  </PODeliveryData>  <POInvoiceData>    <InvoiceReceipt>True</InvoiceReceipt>    <FinalInvoice>False</FinalInvoice>    <GRBasedIV>True</GRBasedIV>    <TaxCode>BO</TaxCode>    <LinkId>43450440</LinkId>    <ItemNumber>00010</ItemNumber>  </POInvoiceData>  <POConfirmationsData>    <ConfControl></ConfControl>    <OrderAck></OrderAck>    <ConfirmnReq></ConfirmnReq>    <RejectInd>S</RejectInd>    <ItemNo>00010</ItemNo>  </POConfirmationsData>  <POCondCtrlData>    <PrintPrice>X</PrintPrice>    <EstimatedPrice></EstimatedPrice>    <ItemNo>00010</ItemNo>  </POCondCtrlData>  <POLineItemCustomerData>    <ProductOrigin></ProductOrigin>    <Segment></Segment>  </POLineItemCustomerData>  <POHeaderTexts>    <PONoteToApprover>fghj</PONoteToApprover>  </POHeaderTexts>  <POItemTexts>    <ItemText>fghj</ItemText>    <ItemNumber>00010</ItemNumber>  </POItemTexts>  <POItemTexts>    <MaterialPOText></MaterialPOText>    <ItemNumber>00010</ItemNumber>  </POItemTexts>  <POItemTexts>    <PONoteToApprover></PONoteToApprover>    <ItemNumber>00010</ItemNumber>  </POItemTexts>  <POItemTexts></POItemTexts></POFetchOP>";
//    var xmlDoc = $.parseXML(xmlString);

    var $xml = $(xmlDoc);

    var x2js = new X2JS();
    var jsonPoData = JSON.stringify(x2js.xml_str2json(xmlString));

    // New Fetch Json for Service
//    var jsonPoData = '{"POFetchOP":{"Message":"Success","MainCode":"0","GeneralData":{"PurchaseOrderNumber":"9050083372","PurchaseOrderType":"PO for Services","UserId":"natsteel","CompanyCode":"0640","RequestType":"Create Purchase Order","ReferenceDocumentType":"","ReferenceDocumentNumber":"","ReferenceDocumentLine":"","VendorName":"International Materials And  Techno logy (S) Pte Ltd (Imatech)","VendorCode":"1100001","DocumentDate":"2020-10-06","DownpaymentReqd":"","value":"","InitiatorId":"natsteel","InitiatorEmailId":"natsteelsg@natsteel.com","PurchasingOrg":"640","PurchasingGrp":"F01","CollectiveNumber":"","DownPaymentReqFor":"","PID":"PO-0000000372","POCreatedDate":"2020-10-06","TotalPOAmount":"80.00","TotalPOAmtPOVendor":"80.00","PO_SequenceNO":"SPO-06-10-2020-168","RFQNo":"","Addtn_ValidFrom":"","Addtn_ValidTo":"","isVendorAckReq":"true"},"PODeliveryInvoiceData":{"paymentTerms":"R030","paymentindays1":"30","paymentinpercnt1":"0.000","paymentindays2":"0","paymentinpercnt2":"0.000","paymentindaysnet":"0","Currency":"SGD","ExchangeRate":"1.00000","ExchangeRateFixed":"True","Incoterms1":"","Incoterms2":"","GRMessage":""},"POLineItemData":{"ItemNumber":"10","AccountAssignment":"K","ItemCategory":"D","Criticality":"High Criticality (H)","ShortText":"H -","Quantity":"1.000","PriceUnit":"1","Currency":"SGD","DeliveryDateCategory":"D","RequisitionDate":"2020-09-01","DeliveryDate":"2020-10-29","MaterialGroup":"REMA01","PurchasingGroup":"N18","StorageLocation":"","RequisitionerID":"Girivasu","TrackingNumber":"0017","GRProcTime":"0","MaterialCode":"","Plant":"6400","Unit":"LE","GoodsReceipt":"X","GRNonVal":"","AgreementLineItem":"00000","InfoRecord":"","PurchasingOrganization":"640","POUnit":"LE","MaterialLongText":"","PRLinkID":"34399292","Distribution":"Single Account Assignment","PartialInvoiceIndicator":"","PackageNo":"0002098549","TaxCode":"BO","DeleteFlag":"false","NetPrice":"10.000000000","PRItemNumber":"00010","PRNumber":"9020092975","taxamount":"10.00","PR_PID":"PR-0000001623","RFQ_No":"","RFQ_ItemNo":"","immaterial":"","returnsitem":"","freeofcharge":""},"POAccntAssignData":{"AccountAssignmentCategory":"K","Distribution":"Single Account Assignment","PartialInvoiceIndicator":"","CoCode":"0640","UnloadingPoint":"","Recipient":"","GLAccount":"0008514908","COArea":"0640","CostCenter":"0640-53030","AccOrder":"","Asset":"","WBSElement":"","Quantity":"1.000","Percentage":"100","Fund":"NSH001","FunctionalArea":"1000","FundsCentre":"0640-53030","CommitmentItem":"8514908","Network":"","ActivityNumber":"","PRLinkID":"34399292","SerialNo":"01","ItmNo":"10"},"PODeliveryAddressData":{"Title":"","Name1":"Natsteel holdings","Name2":"Natsteel holdings","Street":"Tanjong Kling Road","HouseNo":"22","PostalCode":"628048","City":"Singapore","Country":"SG","Region":"","LinkId":"34399292","ItemNo":"10"},"POLineItemConditionsData":[{"CondCurncyExchangeRate":"0.00000","CondUnit":"AU","CondSTNo":"070","CondCount":"01","CondChangeId":"","CondType":"FRA1","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"%","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"AU","Denominator":"0","Uom_Extra":"AU"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"070","CondCount":"02","CondChangeId":"","CondType":"FRB1","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"070","CondCount":"03","CondChangeId":"","CondType":"FRC1","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"LE","Denominator":"1","Uom_Extra":"LE"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"070","CondCount":"04","CondChangeId":"","CondType":"ZFR1","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"071","CondCount":"01","CondChangeId":"","CondType":"ZPAC","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"AU","Denominator":"0","Uom_Extra":"AU"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"075","CondCount":"01","CondChangeId":"","CondType":"ZCOV","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"AU","Denominator":"0","Uom_Extra":"AU"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"075","CondCount":"02","CondChangeId":"","CondType":"ZCOP","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"075","CondCount":"03","CondChangeId":"","CondType":"ZCOQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"LE","Denominator":"1","Uom_Extra":"LE"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"075","CondCount":"04","CondChangeId":"","CondType":"ZMIS","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"075","CondCount":"05","CondChangeId":"","CondType":"ZMSQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"LE","Denominator":"1","Uom_Extra":"LE"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"075","CondCount":"06","CondChangeId":"","CondType":"ZITQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"LE","Denominator":"1","Uom_Extra":"LE"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"075","CondCount":"07","CondChangeId":"","CondType":"ZCRQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"LE","Denominator":"1","Uom_Extra":"LE"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"075","CondCount":"08","CondChangeId":"","CondType":"ZIMP","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"LE","Denominator":"1","Uom_Extra":"LE"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"075","CondCount":"09","CondChangeId":"","CondType":"ZBIN","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"LE","Denominator":"1","Uom_Extra":"LE"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"075","CondCount":"10","CondChangeId":"","CondType":"ZSEC","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"LE","Denominator":"1","Uom_Extra":"LE"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"076","CondCount":"01","CondChangeId":"","CondType":"ZINV","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"AU","Denominator":"0","Uom_Extra":"AU"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"076","CondCount":"02","CondChangeId":"","CondType":"ZINP","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"076","CondCount":"03","CondChangeId":"","CondType":"ZINQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"LE","Denominator":"1","Uom_Extra":"LE"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"01","CondChangeId":"","CondType":"ZM02","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"AU","Denominator":"0","Uom_Extra":"AU"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"02","CondChangeId":"","CondType":"ZM03","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"AU","Denominator":"0","Uom_Extra":"AU"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"03","CondChangeId":"","CondType":"ZM04","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"AU","Denominator":"0","Uom_Extra":"AU"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"04","CondChangeId":"","CondType":"ZM05","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"AU","Denominator":"0","Uom_Extra":"AU"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"05","CondChangeId":"","CondType":"ZM06","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"AU","Denominator":"0","Uom_Extra":"AU"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"06","CondChangeId":"","CondType":"ZM07","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"AU","Denominator":"0","Uom_Extra":"AU"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"07","CondChangeId":"","CondType":"ZM08","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"AU","Denominator":"0","Uom_Extra":"AU"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"08","CondChangeId":"","CondType":"ZM09","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"AU","Denominator":"0","Uom_Extra":"AU"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"09","CondChangeId":"","CondType":"ZLOD","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"AU","Denominator":"0","Uom_Extra":"AU"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"10","CondChangeId":"","CondType":"ZUNL","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"AU","Denominator":"0","Uom_Extra":"AU"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"11","CondChangeId":"","CondType":"ZM10","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"AU","Denominator":"0","Uom_Extra":"AU"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"100","CondCount":"01","CondChangeId":"","CondType":"NAVS","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"110","CondCount":"01","CondChangeId":"","CondType":"NAVM","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"250","CondCount":"01","CondChangeId":"","CondType":"JEXS","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"34399292","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"AU","Denominator":"0","Uom_Extra":"AU"}],"POPartnersData":{"Name":"LF","Number":"001100937"},"PODeliveryScheduleData":{"DelDateCatg":"D","DelDate":"2020-09-01","ScheduledQuantity":"1.000","DelTime":"","PRNumber":"9020092975","ReqItemNo":"00010","LinkId":"34399292","ItemNo":"10","Statisticaldeliverydate":"2020-09-01","GRQty":"","openquantity":"1.000"},"POServiceData":{"LineItemNumber":"10","ServiceNumber":"REMA01099","ShortText":"DISMANTLE AIR CONDITIONER","Quantity":"10.000","Unit":"EA","GrossPrice":"1.0000","Currency":"SGD","NetPrice":"10.0","Edition":"0000","OverfTolerance":"0.0","CostCentre":"","GLCode":"","CommitmentItem":"","Fund":"","FundCenter":"","FunctionalArea":"","ServiceLongText":"TO PROVIDE NECESSARY SKILLED TECHNICIAN, TOOLS,  EQUIPMENT FOR DISMANTLING OF AIR CONDITIONER.","LinkId":"34399292","ServiceLinkID":"61201064","PackageNo":"0002098550","SubPackageNo":"0000000000","LineNo":"0000000003","Distribution":"Single Account Assignment","Base_UOM":"EA","DeleteFlag":"","actualquantity":"0.000"},"POServiceRefData":{"PackageNo":"0002098549","SubPackageNo":"0002098550","LineNo":"0000000001"},"POAccntAssignvalData":{"Distribution":"Single Account Assignment","Quantity":"10.000","Percentage":"100.0","ActivityNumber":"","LinkNumber":"","LinkID":"","NETVALUE":"10.00","CostCenter":"0640-53030","PRLinkID":"","Acc_Order":"","Acc_Asset":"","Acc_WBSElement":"","SalesOrder":"","Network":"","Activity":"","CoArea":"0640","GLAccount":"0008514908","UnloadingPoint":"","Recipient":"","CommitmentItem":"8514908","Fund":"NSH001","FundsCentre":"0640-53030","FunctionalArea":"1000","ItemNumber":"","DeliverySchedule":"","PackageNo":"0002098550","SerialNo":"01","LineNo":"3","SerNoLine":"01"},"POCommunicationData":{"SalesPerson":"TEO WILLIAM","YourReference":"","Telephone":"","OurReference":"","Language":"EN"},"PODeliveryData":{"OverDelTol":"0.0","UnderDelTol":"0.0","ShippingInstructions":"","StockType":"","FstRem_Exped":"10","SecRem_Exped":"20","ThrdRem_Exped":"30","ValuationType":"","RemShelfLife":"0","QAControlLife":"","PlDelTime":"","GrProcTime":"0","IncoTerms1":"","IncoTerm2":"","GoodsReceipt":"True","GRNonVal":"False","DelvCompleted":"False","LinkId":"34399292","Unlimited":"True","ItemNumber":"00010"},"POInvoiceData":{"InvoiceReceipt":"True","FinalInvoice":"False","GRBasedIV":"True","TaxCode":"BO","LinkId":"34399292","ItemNumber":"10","SRVBasedIV":""},"POConfirmationsData":{"ConfControl":"","OrderAck":"","ConfirmnReq":"","RejectInd":"True","LinkId":"34399292","ItemNumber":"10"},"POCondCtrlData":{"PrintPrice":"True","EstimatedPrice":"False","LinkId":"34399292","ItemNumber":"10"},"POLineItemCustomerData":{"ProductOrigin":"","Segment":"","LinkId":"34399292","ItemNumber":"10"},"POConditionsData":[{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"001","CondCount":"01","CondChangeId":"","CondType":"PBXX","Amount":"10.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"B","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"AU","CondSTNo":"070","CondCount":"01","CondChangeId":"","CondType":"FRA1","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"%","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"070","CondCount":"02","CondChangeId":"","CondType":"FRB1","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"070","CondCount":"03","CondChangeId":"","CondType":"FRC1","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"070","CondCount":"04","CondChangeId":"","CondType":"ZFR1","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"071","CondCount":"01","CondChangeId":"","CondType":"ZPAC","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"075","CondCount":"01","CondChangeId":"","CondType":"ZCOV","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"075","CondCount":"02","CondChangeId":"","CondType":"ZCOP","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"075","CondCount":"03","CondChangeId":"","CondType":"ZCOQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"075","CondCount":"04","CondChangeId":"","CondType":"ZMIS","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"075","CondCount":"05","CondChangeId":"","CondType":"ZMSQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"075","CondCount":"06","CondChangeId":"","CondType":"ZITQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"075","CondCount":"07","CondChangeId":"","CondType":"ZCRQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"075","CondCount":"08","CondChangeId":"","CondType":"ZIMP","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"075","CondCount":"09","CondChangeId":"","CondType":"ZBIN","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"075","CondCount":"10","CondChangeId":"","CondType":"ZSEC","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"076","CondCount":"01","CondChangeId":"","CondType":"ZINV","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"076","CondCount":"02","CondChangeId":"","CondType":"ZINP","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"LE","CondSTNo":"076","CondCount":"03","CondChangeId":"","CondType":"ZINQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"01","CondChangeId":"","CondType":"ZM02","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"02","CondChangeId":"","CondType":"ZM03","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"03","CondChangeId":"","CondType":"ZM04","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"04","CondChangeId":"","CondType":"ZM05","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"05","CondChangeId":"","CondType":"ZM06","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"06","CondChangeId":"","CondType":"ZM07","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"07","CondChangeId":"","CondType":"ZM08","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"08","CondChangeId":"","CondType":"ZM09","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"09","CondChangeId":"","CondType":"ZLOD","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"10","CondChangeId":"","CondType":"ZUNL","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"078","CondCount":"11","CondChangeId":"","CondType":"ZM10","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"1.000000000","CondCrncy":"SGD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"100","CondCount":"01","CondChangeId":"","CondType":"NAVS","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"110","CondCount":"01","CondChangeId":"","CondType":"NAVM","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"AU","CondSTNo":"250","CondCount":"01","CondChangeId":"","CondType":"JEXS","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"10.000000000","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"}],"POVendorAddressData":{"Street":"NO. 1, TUAS SOUTH ST 1","HouseNumber":"JURONG TOW","PostalCode":"638059","City":"SINGAPORE","Country":"","TelNo":"65-68699221","TelExt":"","FaxNo":"65-68633320","FaxExt":"","MailID":""},"POHeaderTextData":{"PONoteToApprover":"sdfghj","HeaderNote":"","PricingTypes":"","Deadlines":"","TermsOfDelivery":"","TermsOfPayment":"","ShippingInstructions":"","VendorMemoGeneral":"","VendorMemoSpecial":"","Headertext":""},"POTextsData":{"PrnotetoApproval":"","ItemText":"H -","InfoRecordPOText":"","MaterialPOText":"","PONoteToApprover":"","DeliveryText":"","LinkId":"34399292","ItemNumber":"10"},"POQuantityWeightsData":{"POQuantity":"1.000","POQuantityUnit":"LE","POQuantitySKU":"1.000","POQuantitySKUUnit":"","Order1":"1","OrderUnit1":"LE","Order2":"1","OrderUnit2":"LE","OrderPrice":"1","OrderPriceUnit":"LE","SKU":"0.000","SKUUnit":"","LinkID":"34399292","ItemNumber":"10","Netweight":"0.000","Grossweight":"0.000","Volume":"0.000","Points":"0.000","netweight2":"0.0","grossweight2":"0.0","volume2":"0.000","points2":"0.000","netweightUnit":"","netweight2Unit":"","grosswgtunit":"","grosswgt2unit":"","netwgtperprice":"1","grosswgtperprice":"1","netwgtorderunit":"LE","grosswgtorderunit":"LE","volumeperprice":"1","pointsperprice":"1","volumeorderunit":"LE","pointsorderunit":"LE"},"POMaterialData":{"ItemNo":"10","LinkId":"34399292","MfrPartNumber":"","Manufacturer":"","revisionlevel":"","VendMatno":"","EANUPC":"","Vendorsubrange":"","Batch":"","vendorbatch":"","infoupdate":"False"},"POStatusData":{"Ordered":"1.0","Delivered":"0.0","Stilltodeliv":"1.0","Invoiced":"0.0","OrderedTotalPrice":"10.0","DeliveredTotalPrice":"0.0","StilltodelivTotalPrice":"10.0","InvoicedTotalPrice":"0.0","DownpaymtsTotalPrice":"0.0","OrderedCurrency":"SGD","DeliveredCurrency":"SGD","StilltodelivCurrency":"SGD","InvoicedCurrency":"SGD","DownpaymtsCurrency":"SGD"}}}';

    // New Fetch Json for Material Single PR Line
//    var jsonPoData = '{"POFetchOP":{"Message":"Success","MainCode":"0","GeneralData":{"PurchaseOrderNumber":"9040065562","PurchaseOrderType":"Import PO for Goods","UserId":"natsteel","CompanyCode":"0640","RequestType":"Create Purchase Order","ReferenceDocumentType":"","ReferenceDocumentNumber":"","ReferenceDocumentLine":"","VendorName":"International Materials And  Techno logy (S) Pte Ltd (Imatech)","VendorCode":"1100001","DocumentDate":"2020-10-06","DownpaymentReqd":"","value":"","InitiatorId":"natsteel","InitiatorEmailId":"natsteelsg@natsteel.com","PurchasingOrg":"640","PurchasingGrp":"F03","CollectiveNumber":"","DownPaymentReqFor":"","PID":"PO-0000000377","POCreatedDate":"2020-10-06","TotalPOAmount":"100.00","TotalPOAmtPOVendor":"100.00","PO_SequenceNO":"GPO-06-10-2020-154","RFQNo":"GRFQ-01-10-20-0001","Addtn_ValidFrom":"","Addtn_ValidTo":"","isVendorAckReq":"true"},"PODeliveryInvoiceData":{"paymentTerms":"R030","paymentindays1":"30","paymentinpercnt1":"0.000","paymentindays2":"0","paymentinpercnt2":"0.000","paymentindaysnet":"0","Currency":"USD","ExchangeRate":"1.70000","ExchangeRateFixed":"True","Incoterms1":"","Incoterms2":"","GRMessage":""},"POLineItemData":{"ItemNumber":"10","AccountAssignment":"F","ItemCategory":"","Criticality":"Select","ShortText":"SERAM CRANE RUBBER STOP%","Quantity":"1.000","PriceUnit":"1","Currency":"USD","DeliveryDateCategory":"D","RequisitionDate":"2020-09-21","DeliveryDate":"2020-10-30","MaterialGroup":"163","PurchasingGroup":"N19","StorageLocation":"SC34","RequisitionerID":"Girivasu","TrackingNumber":"0017","GRProcTime":"1","MaterialCode":"0165A0002","Plant":"6400","Unit":"ST","GoodsReceipt":"X","GRNonVal":"","AgreementLineItem":"00000","InfoRecord":"5300054855","PurchasingOrganization":"640","POUnit":"ST","MaterialLongText":"FOR SERAM CRANE - RUBBER STOP% (AS %SAMPLE)","PRLinkID":"71962518","Distribution":"Single Account Assignment","PartialInvoiceIndicator":"","PackageNo":"0000000000","TaxCode":"BO","DeleteFlag":"false","NetPrice":"10.000000000","PRItemNumber":"00010","PRNumber":"9010153993","taxamount":"10.00","PR_PID":"PR-0000000013-process","RFQ_No":"","RFQ_ItemNo":"","immaterial":"0048A0001","returnsitem":"true","freeofcharge":"true","OPU":"TMP"},"POAccntAssignData":{"AccountAssignmentCategory":"F","Distribution":"Single Account Assignment","PartialInvoiceIndicator":"","CoCode":"0640","UnloadingPoint":"","Recipient":"","GLAccount":"0008514937","COArea":"0640","CostCenter":"0640-53030","AccOrder":"000102080004","Asset":"","WBSElement":"","Quantity":"1.000","Percentage":"100","Fund":"NSH001","FunctionalArea":"1000","FundsCentre":"0640-53030","CommitmentItem":"8514937","Network":"","ActivityNumber":"","PRLinkID":"71962518","SerialNo":"01","ItmNo":"10"},"PODeliveryAddressData":{"Title":"","Name1":"Natsteel holdings","Name2":"Natsteel holdings","Street":"Tanjong Kling Road","HouseNo":"22","PostalCode":"628048","City":"Singapore","Country":"SG","Region":"","LinkId":"71962518","ItemNo":"10"},"POLineItemConditionsData":[{"CondCurncyExchangeRate":"0.00000","CondUnit":"PC","CondSTNo":"070","CondCount":"01","CondChangeId":"","CondType":"FRA1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"%","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"070","CondCount":"02","CondChangeId":"","CondType":"FRB1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"070","CondCount":"03","CondChangeId":"","CondType":"FRC1","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"070","CondCount":"04","CondChangeId":"","CondType":"ZFR1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"071","CondCount":"01","CondChangeId":"","CondType":"ZPAC","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"075","CondCount":"01","CondChangeId":"","CondType":"ZCOV","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"075","CondCount":"02","CondChangeId":"","CondType":"ZCOP","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"03","CondChangeId":"","CondType":"ZCOQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"075","CondCount":"04","CondChangeId":"","CondType":"ZMIS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"05","CondChangeId":"","CondType":"ZMSQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"06","CondChangeId":"","CondType":"ZITQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"07","CondChangeId":"","CondType":"ZCRQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"08","CondChangeId":"","CondType":"ZIMP","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"09","CondChangeId":"","CondType":"ZBIN","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"10","CondChangeId":"","CondType":"ZSEC","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"076","CondCount":"01","CondChangeId":"","CondType":"ZINV","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"076","CondCount":"02","CondChangeId":"","CondType":"ZINP","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"076","CondCount":"03","CondChangeId":"","CondType":"ZINQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"01","CondChangeId":"","CondType":"ZM02","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"02","CondChangeId":"","CondType":"ZM03","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"03","CondChangeId":"","CondType":"ZM04","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"04","CondChangeId":"","CondType":"ZM05","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"05","CondChangeId":"","CondType":"ZM06","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"06","CondChangeId":"","CondType":"ZM07","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"07","CondChangeId":"","CondType":"ZM08","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"08","CondChangeId":"","CondType":"ZM09","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"09","CondChangeId":"","CondType":"ZLOD","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"10","CondChangeId":"","CondType":"ZUNL","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"11","CondChangeId":"","CondType":"ZM10","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"100","CondCount":"01","CondChangeId":"","CondType":"NAVS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"110","CondCount":"01","CondChangeId":"","CondType":"NAVM","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"PC","CondSTNo":"250","CondCount":"01","CondChangeId":"","CondType":"JEXS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"}],"POPartnersData":{"Name":"LF","Number":"001100937"},"PODeliveryScheduleData":{"DelDateCatg":"D","DelDate":"2020-10-30","ScheduledQuantity":"1.000","DelTime":"","PRNumber":"9010153993","ReqItemNo":"00010","LinkId":"71962518","ItemNo":"10","Statisticaldeliverydate":"2020-10-30","GRQty":"","openquantity":"1.000"},"POCommunicationData":{"SalesPerson":"TEO WILLIAM","YourReference":"","Telephone":"","OurReference":"","Language":"EN"},"PODeliveryData":{"OverDelTol":"0.0","UnderDelTol":"0.0","ShippingInstructions":"","StockType":"","FstRem_Exped":"10","SecRem_Exped":"20","ThrdRem_Exped":"30","ValuationType":"","RemShelfLife":"0","QAControlLife":"","PlDelTime":"","GrProcTime":"1","IncoTerms1":"","IncoTerm2":"","GoodsReceipt":"True","GRNonVal":"False","DelvCompleted":"False","LinkId":"71962518","Unlimited":"False","ItemNumber":"00010"},"POInvoiceData":{"InvoiceReceipt":"True","FinalInvoice":"False","GRBasedIV":"True","TaxCode":"BO","LinkId":"71962518","ItemNumber":"10","SRVBasedIV":""},"POConfirmationsData":{"ConfControl":"","OrderAck":"","ConfirmnReq":"","RejectInd":"True","LinkId":"71962518","ItemNumber":"10"},"POCondCtrlData":{"PrintPrice":"True","EstimatedPrice":"False","LinkId":"71962518","ItemNumber":"10"},"POLineItemCustomerData":{"ProductOrigin":"","Segment":"","LinkId":"71962518","ItemNumber":"10"},"POConditionsData":[{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"001","CondCount":"01","CondChangeId":"","CondType":"PBXX","Amount":"10.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"B","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"PC","CondSTNo":"070","CondCount":"01","CondChangeId":"","CondType":"FRA1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"%","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"070","CondCount":"02","CondChangeId":"","CondType":"FRB1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"070","CondCount":"03","CondChangeId":"","CondType":"FRC1","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"070","CondCount":"04","CondChangeId":"","CondType":"ZFR1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"071","CondCount":"01","CondChangeId":"","CondType":"ZPAC","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"075","CondCount":"01","CondChangeId":"","CondType":"ZCOV","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"075","CondCount":"02","CondChangeId":"","CondType":"ZCOP","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"03","CondChangeId":"","CondType":"ZCOQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"075","CondCount":"04","CondChangeId":"","CondType":"ZMIS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"05","CondChangeId":"","CondType":"ZMSQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"06","CondChangeId":"","CondType":"ZITQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"07","CondChangeId":"","CondType":"ZCRQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"08","CondChangeId":"","CondType":"ZIMP","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"09","CondChangeId":"","CondType":"ZBIN","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"10","CondChangeId":"","CondType":"ZSEC","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"076","CondCount":"01","CondChangeId":"","CondType":"ZINV","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"076","CondCount":"02","CondChangeId":"","CondType":"ZINP","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"076","CondCount":"03","CondChangeId":"","CondType":"ZINQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"01","CondChangeId":"","CondType":"ZM02","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"02","CondChangeId":"","CondType":"ZM03","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"03","CondChangeId":"","CondType":"ZM04","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"04","CondChangeId":"","CondType":"ZM05","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"05","CondChangeId":"","CondType":"ZM06","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"06","CondChangeId":"","CondType":"ZM07","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"07","CondChangeId":"","CondType":"ZM08","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"08","CondChangeId":"","CondType":"ZM09","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"09","CondChangeId":"","CondType":"ZLOD","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"10","CondChangeId":"","CondType":"ZUNL","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"11","CondChangeId":"","CondType":"ZM10","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"100","CondCount":"01","CondChangeId":"","CondType":"NAVS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"110","CondCount":"01","CondChangeId":"","CondType":"NAVM","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"PC","CondSTNo":"250","CondCount":"01","CondChangeId":"","CondType":"JEXS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"}],"POVendorAddressData":{"Street":"NO. 1, TUAS SOUTH ST 1","HouseNumber":"JURONG TOW","PostalCode":"638059","City":"SINGAPORE","Country":"","TelNo":"65-68699221","TelExt":"","FaxNo":"65-68633320","FaxExt":"","MailID":""},"POHeaderTextData":{"PONoteToApprover":"xfcgfhj","HeaderNote":"","PricingTypes":"","Deadlines":"","TermsOfDelivery":"","TermsOfPayment":"","ShippingInstructions":"","VendorMemoGeneral":"","VendorMemoSpecial":"","Headertext":""},"POTextsData":{"PrnotetoApproval":"","ItemText":"","InfoRecordPOText":"Item Text","MaterialPOText":"","PONoteToApprover":"","DeliveryText":"","LinkId":"71962518","ItemNumber":"10"},"POQuantityWeightsData":{"POQuantity":"1.000","POQuantityUnit":"ST","POQuantitySKU":"1.000","POQuantitySKUUnit":"KG","Order1":"1","OrderUnit1":"ST","Order2":"1","OrderUnit2":"ST","OrderPrice":"1","OrderPriceUnit":"ST","SKU":"0.000","SKUUnit":"KG","LinkID":"71962518","ItemNumber":"10","Netweight":"0.000","Grossweight":"0.000","Volume":"0.000","Points":"0.000","netweight2":"0.0","grossweight2":"0.0","volume2":"0.000","points2":"0.000","netweightUnit":"KG","netweight2Unit":"KG","grosswgtunit":"KG","grosswgt2unit":"KG","netwgtperprice":"1","grosswgtperprice":"1","netwgtorderunit":"ST","grosswgtorderunit":"ST","volumeperprice":"1","pointsperprice":"1","volumeorderunit":"ST","pointsorderunit":"ST"},"POMaterialData":{"ItemNo":"10","LinkId":"71962518","MfrPartNumber":"","Manufacturer":"","revisionlevel":"","VendMatno":"","EANUPC":"","Vendorsubrange":"","Batch":"","vendorbatch":"","infoupdate":"False"},"POStatusData":{"Ordered":"1.0","Delivered":"0.0","Stilltodeliv":"1.0","Invoiced":"0.0","OrderedTotalPrice":"10.0","DeliveredTotalPrice":"0.0","StilltodelivTotalPrice":"10.0","InvoicedTotalPrice":"0.0","DownpaymtsTotalPrice":"0.0","OrderedCurrency":"USD","DeliveredCurrency":"USD","StilltodelivCurrency":"USD","InvoicedCurrency":"USD","DownpaymtsCurrency":"USD"}}}';

    // New Fetch Json for Material Single RFQ Line
//    var jsonPoData = '{"POFetchOP":{"Message":"Success","MainCode":"0","GeneralData":{"PurchaseOrderNumber":"9040065562","PurchaseOrderType":"Import PO for Goods","UserId":"natsteel","CompanyCode":"0640","RequestType":"Create Purchase Order","ReferenceDocumentType":"","ReferenceDocumentNumber":"","ReferenceDocumentLine":"","VendorName":"International Materials And  Techno logy (S) Pte Ltd (Imatech)","VendorCode":"1100001","DocumentDate":"2020-10-06","DownpaymentReqd":"","value":"","InitiatorId":"natsteel","InitiatorEmailId":"natsteelsg@natsteel.com","PurchasingOrg":"640","PurchasingGrp":"F03","CollectiveNumber":"","DownPaymentReqFor":"","PID":"PO-0000000377","POCreatedDate":"2020-10-06","TotalPOAmount":"100.00","TotalPOAmtPOVendor":"100.00","PO_SequenceNO":"GPO-06-10-2020-154","RFQNo":"GRFQ-01-10-20-0001","Addtn_ValidFrom":"","Addtn_ValidTo":"","isVendorAckReq":"true"},"PODeliveryInvoiceData":{"paymentTerms":"R030","paymentindays1":"30","paymentinpercnt1":"0.000","paymentindays2":"0","paymentinpercnt2":"0.000","paymentindaysnet":"0","Currency":"USD","ExchangeRate":"1.70000","ExchangeRateFixed":"True","Incoterms1":"","Incoterms2":"","GRMessage":""},"POLineItemData":{"ItemNumber":"10","AccountAssignment":"F","ItemCategory":"","Criticality":"Select","ShortText":"SERAM CRANE RUBBER STOP%","Quantity":"1.000","PriceUnit":"1","Currency":"USD","DeliveryDateCategory":"D","RequisitionDate":"2020-09-21","DeliveryDate":"2020-10-30","MaterialGroup":"163","PurchasingGroup":"N19","StorageLocation":"SC34","RequisitionerID":"Girivasu","TrackingNumber":"0017","GRProcTime":"1","MaterialCode":"0165A0002","Plant":"6400","Unit":"ST","GoodsReceipt":"X","GRNonVal":"","AgreementLineItem":"00000","InfoRecord":"5300054855","PurchasingOrganization":"640","POUnit":"ST","MaterialLongText":"FOR SERAM CRANE - RUBBER STOP% (AS %SAMPLE)","PRLinkID":"71962518","Distribution":"Single Account Assignment","PartialInvoiceIndicator":"","PackageNo":"0000000000","TaxCode":"BO","DeleteFlag":"false","NetPrice":"10.000000000","PRItemNumber":"00010","PRNumber":"9010153993","taxamount":"10.00","PR_PID":"PR-0000000013-process","RFQ_No":"GRFQ-26-09-20-0001","RFQ_ItemNo":"20","immaterial":"0048A0001","returnsitem":"true","freeofcharge":"true"},"POAccntAssignData":{"AccountAssignmentCategory":"F","Distribution":"Single Account Assignment","PartialInvoiceIndicator":"","CoCode":"0640","UnloadingPoint":"","Recipient":"","GLAccount":"0008514937","COArea":"0640","CostCenter":"0640-53030","AccOrder":"000102080004","Asset":"","WBSElement":"","Quantity":"1.000","Percentage":"100","Fund":"NSH001","FunctionalArea":"1000","FundsCentre":"0640-53030","CommitmentItem":"8514937","Network":"","ActivityNumber":"","PRLinkID":"71962518","SerialNo":"01","ItmNo":"10"},"PODeliveryAddressData":{"Title":"","Name1":"Natsteel holdings","Name2":"Natsteel holdings","Street":"Tanjong Kling Road","HouseNo":"22","PostalCode":"628048","City":"Singapore","Country":"SG","Region":"","LinkId":"71962518","ItemNo":"10"},"POLineItemConditionsData":[{"CondCurncyExchangeRate":"0.00000","CondUnit":"PC","CondSTNo":"070","CondCount":"01","CondChangeId":"","CondType":"FRA1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"%","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"070","CondCount":"02","CondChangeId":"","CondType":"FRB1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"070","CondCount":"03","CondChangeId":"","CondType":"FRC1","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"070","CondCount":"04","CondChangeId":"","CondType":"ZFR1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"071","CondCount":"01","CondChangeId":"","CondType":"ZPAC","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"075","CondCount":"01","CondChangeId":"","CondType":"ZCOV","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"075","CondCount":"02","CondChangeId":"","CondType":"ZCOP","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"03","CondChangeId":"","CondType":"ZCOQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"075","CondCount":"04","CondChangeId":"","CondType":"ZMIS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"05","CondChangeId":"","CondType":"ZMSQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"06","CondChangeId":"","CondType":"ZITQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"07","CondChangeId":"","CondType":"ZCRQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"08","CondChangeId":"","CondType":"ZIMP","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"09","CondChangeId":"","CondType":"ZBIN","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"10","CondChangeId":"","CondType":"ZSEC","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"076","CondCount":"01","CondChangeId":"","CondType":"ZINV","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"076","CondCount":"02","CondChangeId":"","CondType":"ZINP","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"076","CondCount":"03","CondChangeId":"","CondType":"ZINQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"01","CondChangeId":"","CondType":"ZM02","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"02","CondChangeId":"","CondType":"ZM03","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"03","CondChangeId":"","CondType":"ZM04","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"04","CondChangeId":"","CondType":"ZM05","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"05","CondChangeId":"","CondType":"ZM06","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"06","CondChangeId":"","CondType":"ZM07","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"07","CondChangeId":"","CondType":"ZM08","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"08","CondChangeId":"","CondType":"ZM09","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"09","CondChangeId":"","CondType":"ZLOD","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"10","CondChangeId":"","CondType":"ZUNL","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"11","CondChangeId":"","CondType":"ZM10","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"100","CondCount":"01","CondChangeId":"","CondType":"NAVS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"110","CondCount":"01","CondChangeId":"","CondType":"NAVM","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"PC","CondSTNo":"250","CondCount":"01","CondChangeId":"","CondType":"JEXS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"}],"POPartnersData":{"Name":"LF","Number":"001100937"},"PODeliveryScheduleData":{"DelDateCatg":"D","DelDate":"2020-10-30","ScheduledQuantity":"1.000","DelTime":"","PRNumber":"9010153993","ReqItemNo":"00010","LinkId":"71962518","ItemNo":"10","Statisticaldeliverydate":"2020-10-30","GRQty":"","openquantity":"1.000"},"POCommunicationData":{"SalesPerson":"TEO WILLIAM","YourReference":"","Telephone":"","OurReference":"","Language":"EN"},"PODeliveryData":{"OverDelTol":"0.0","UnderDelTol":"0.0","ShippingInstructions":"","StockType":"","FstRem_Exped":"10","SecRem_Exped":"20","ThrdRem_Exped":"30","ValuationType":"","RemShelfLife":"0","QAControlLife":"","PlDelTime":"","GrProcTime":"1","IncoTerms1":"","IncoTerm2":"","GoodsReceipt":"True","GRNonVal":"False","DelvCompleted":"False","LinkId":"71962518","Unlimited":"False","ItemNumber":"00010"},"POInvoiceData":{"InvoiceReceipt":"True","FinalInvoice":"False","GRBasedIV":"True","TaxCode":"BO","LinkId":"71962518","ItemNumber":"10","SRVBasedIV":""},"POConfirmationsData":{"ConfControl":"","OrderAck":"","ConfirmnReq":"","RejectInd":"True","LinkId":"71962518","ItemNumber":"10"},"POCondCtrlData":{"PrintPrice":"True","EstimatedPrice":"False","LinkId":"71962518","ItemNumber":"10"},"POLineItemCustomerData":{"ProductOrigin":"","Segment":"","LinkId":"71962518","ItemNumber":"10"},"POConditionsData":[{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"001","CondCount":"01","CondChangeId":"","CondType":"PBXX","Amount":"10.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"B","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"PC","CondSTNo":"070","CondCount":"01","CondChangeId":"","CondType":"FRA1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"%","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"070","CondCount":"02","CondChangeId":"","CondType":"FRB1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"070","CondCount":"03","CondChangeId":"","CondType":"FRC1","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"070","CondCount":"04","CondChangeId":"","CondType":"ZFR1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"071","CondCount":"01","CondChangeId":"","CondType":"ZPAC","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"075","CondCount":"01","CondChangeId":"","CondType":"ZCOV","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"075","CondCount":"02","CondChangeId":"","CondType":"ZCOP","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"03","CondChangeId":"","CondType":"ZCOQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"075","CondCount":"04","CondChangeId":"","CondType":"ZMIS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"05","CondChangeId":"","CondType":"ZMSQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"06","CondChangeId":"","CondType":"ZITQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"07","CondChangeId":"","CondType":"ZCRQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"08","CondChangeId":"","CondType":"ZIMP","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"09","CondChangeId":"","CondType":"ZBIN","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"10","CondChangeId":"","CondType":"ZSEC","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"076","CondCount":"01","CondChangeId":"","CondType":"ZINV","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"076","CondCount":"02","CondChangeId":"","CondType":"ZINP","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"076","CondCount":"03","CondChangeId":"","CondType":"ZINQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"01","CondChangeId":"","CondType":"ZM02","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"02","CondChangeId":"","CondType":"ZM03","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"03","CondChangeId":"","CondType":"ZM04","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"04","CondChangeId":"","CondType":"ZM05","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"05","CondChangeId":"","CondType":"ZM06","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"06","CondChangeId":"","CondType":"ZM07","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"07","CondChangeId":"","CondType":"ZM08","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"08","CondChangeId":"","CondType":"ZM09","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"09","CondChangeId":"","CondType":"ZLOD","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"10","CondChangeId":"","CondType":"ZUNL","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"11","CondChangeId":"","CondType":"ZM10","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"100","CondCount":"01","CondChangeId":"","CondType":"NAVS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"110","CondCount":"01","CondChangeId":"","CondType":"NAVM","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"PC","CondSTNo":"250","CondCount":"01","CondChangeId":"","CondType":"JEXS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"}],"POVendorAddressData":{"Street":"NO. 1, TUAS SOUTH ST 1","HouseNumber":"JURONG TOW","PostalCode":"638059","City":"SINGAPORE","Country":"","TelNo":"65-68699221","TelExt":"","FaxNo":"65-68633320","FaxExt":"","MailID":""},"POHeaderTextData":{"PONoteToApprover":"xfcgfhj","HeaderNote":"","PricingTypes":"","Deadlines":"","TermsOfDelivery":"","TermsOfPayment":"","ShippingInstructions":"","VendorMemoGeneral":"","VendorMemoSpecial":"","Headertext":""},"POTextsData":{"PrnotetoApproval":"","ItemText":"","InfoRecordPOText":"Item Text","MaterialPOText":"","PONoteToApprover":"","DeliveryText":"","LinkId":"71962518","ItemNumber":"10"},"POQuantityWeightsData":{"POQuantity":"1.000","POQuantityUnit":"ST","POQuantitySKU":"1.000","POQuantitySKUUnit":"KG","Order1":"1","OrderUnit1":"ST","Order2":"1","OrderUnit2":"ST","OrderPrice":"1","OrderPriceUnit":"ST","SKU":"0.000","SKUUnit":"KG","LinkID":"71962518","ItemNumber":"10","Netweight":"0.000","Grossweight":"0.000","Volume":"0.000","Points":"0.000","netweight2":"0.0","grossweight2":"0.0","volume2":"0.000","points2":"0.000","netweightUnit":"KG","netweight2Unit":"KG","grosswgtunit":"KG","grosswgt2unit":"KG","netwgtperprice":"1","grosswgtperprice":"1","netwgtorderunit":"ST","grosswgtorderunit":"ST","volumeperprice":"1","pointsperprice":"1","volumeorderunit":"ST","pointsorderunit":"ST"},"POMaterialData":{"ItemNo":"10","LinkId":"71962518","MfrPartNumber":"","Manufacturer":"","revisionlevel":"","VendMatno":"","EANUPC":"","Vendorsubrange":"","Batch":"","vendorbatch":"","infoupdate":"False"},"POStatusData":{"Ordered":"1.0","Delivered":"0.0","Stilltodeliv":"1.0","Invoiced":"0.0","OrderedTotalPrice":"10.0","DeliveredTotalPrice":"0.0","StilltodelivTotalPrice":"10.0","InvoicedTotalPrice":"0.0","DownpaymtsTotalPrice":"0.0","OrderedCurrency":"USD","DeliveredCurrency":"USD","StilltodelivCurrency":"USD","InvoicedCurrency":"USD","DownpaymtsCurrency":"USD"}}}';

//     New Fetch Json for Material Multiple PO Line
//    var jsonPoData = '{"POFetchOP":{"Message":"Success","MainCode":"0","GeneralData":{"PurchaseOrderNumber":"9040065562","PurchaseOrderType":"Import PO for Goods","UserId":"natsteel","CompanyCode":"0680","RequestType":"Create Purchase Order","ReferenceDocumentType":"","ReferenceDocumentNumber":"","ReferenceDocumentLine":"","VendorName":"International Materials And  Techno logy (S) Pte Ltd (Imatech)","VendorCode":"1100001","DocumentDate":"2020-10-06","DownpaymentReqd":"","value":"","InitiatorId":"natsteel","InitiatorEmailId":"natsteelsg@natsteel.com","PurchasingOrg":"640","PurchasingGrp":"F03","CollectiveNumber":"","DownPaymentReqFor":"","PID":"PO-0000000377","POCreatedDate":"2020-10-06","TotalPOAmount":"100.00","TotalPOAmtPOVendor":"100.00","PO_SequenceNO":"GPO-06-10-2020-154","RFQNo":"GRFQ-01-10-20-0001","Addtn_ValidFrom":"","Addtn_ValidTo":"","isVendorAckReq":"true"},"PODeliveryInvoiceData":{"paymentTerms":"R030","paymentindays1":"30","paymentinpercnt1":"0.000","paymentindays2":"0","paymentinpercnt2":"0.000","paymentindaysnet":"0","Currency":"USD","ExchangeRate":"1.70000","ExchangeRateFixed":"True","Incoterms1":"","Incoterms2":"","GRMessage":""},"POLineItemData":{"ItemNumber":"10","AccountAssignment":"F","ItemCategory":"","Criticality":"Select","ShortText":"SERAM CRANE RUBBER STOP%","Quantity":"1.000","PriceUnit":"1","Currency":"USD","DeliveryDateCategory":"D","RequisitionDate":"2020-09-21","DeliveryDate":"2020-10-30","MaterialGroup":"163","PurchasingGroup":"N19","StorageLocation":"SC34","RequisitionerID":"Girivasu","TrackingNumber":"0017","GRProcTime":"1","MaterialCode":"0165A0002","Plant":"6400","Unit":"ST","GoodsReceipt":"X","GRNonVal":"","AgreementLineItem":"00000","InfoRecord":"5300054855","PurchasingOrganization":"640","POUnit":"ST","MaterialLongText":"FOR SERAM CRANE - RUBBER STOP% (AS %SAMPLE)","PRLinkID":"71962518","Distribution":"Single Account Assignment","PartialInvoiceIndicator":"","PackageNo":"0000000000","TaxCode":"BO","DeleteFlag":"false","NetPrice":"10.000000000","PRItemNumber":"00010","PRNumber":"9010153993","taxamount":"10.00","PR_PID":"PR-0000000013-process","RFQ_No":"GRFQ-26-09-20-0001","RFQ_ItemNo":"20","immaterial":"0048A0001","returnsitem":"false","freeofcharge":"false"},"POAccntAssignData":{"AccountAssignmentCategory":"F","Distribution":"Single Account Assignment","PartialInvoiceIndicator":"","CoCode":"0640","UnloadingPoint":"","Recipient":"","GLAccount":"0008514937","COArea":"0640","CostCenter":"0640-53030","AccOrder":"000102080004","Asset":"","WBSElement":"","Quantity":"1.000","Percentage":"100","Fund":"NSH001","FunctionalArea":"1000","FundsCentre":"0640-53030","CommitmentItem":"8514937","Network":"","ActivityNumber":"","PRLinkID":"71962518","SerialNo":"01","ItmNo":"10"},"PODeliveryAddressData":{"Title":"","Name1":"Natsteel holdings","Name2":"Natsteel holdings","Street":"Tanjong Kling Road","HouseNo":"22","PostalCode":"628048","City":"Singapore","Country":"SG","Region":"","LinkId":"71962518","ItemNo":"10"},"POLineItemConditionsData":[{"CondCurncyExchangeRate":"0.00000","CondUnit":"PC","CondSTNo":"070","CondCount":"01","CondChangeId":"","CondType":"FRA1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"%","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"070","CondCount":"02","CondChangeId":"","CondType":"FRB1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"070","CondCount":"03","CondChangeId":"","CondType":"FRC1","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"070","CondCount":"04","CondChangeId":"","CondType":"ZFR1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"071","CondCount":"01","CondChangeId":"","CondType":"ZPAC","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"075","CondCount":"01","CondChangeId":"","CondType":"ZCOV","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"075","CondCount":"02","CondChangeId":"","CondType":"ZCOP","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"03","CondChangeId":"","CondType":"ZCOQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"075","CondCount":"04","CondChangeId":"","CondType":"ZMIS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"05","CondChangeId":"","CondType":"ZMSQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"06","CondChangeId":"","CondType":"ZITQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"07","CondChangeId":"","CondType":"ZCRQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"08","CondChangeId":"","CondType":"ZIMP","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"09","CondChangeId":"","CondType":"ZBIN","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"10","CondChangeId":"","CondType":"ZSEC","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"076","CondCount":"01","CondChangeId":"","CondType":"ZINV","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"076","CondCount":"02","CondChangeId":"","CondType":"ZINP","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"076","CondCount":"03","CondChangeId":"","CondType":"ZINQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"01","CondChangeId":"","CondType":"ZM02","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"02","CondChangeId":"","CondType":"ZM03","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"03","CondChangeId":"","CondType":"ZM04","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"04","CondChangeId":"","CondType":"ZM05","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"05","CondChangeId":"","CondType":"ZM06","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"06","CondChangeId":"","CondType":"ZM07","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"07","CondChangeId":"","CondType":"ZM08","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"08","CondChangeId":"","CondType":"ZM09","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"09","CondChangeId":"","CondType":"ZLOD","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"10","CondChangeId":"","CondType":"ZUNL","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"11","CondChangeId":"","CondType":"ZM10","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"100","CondCount":"01","CondChangeId":"","CondType":"NAVS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"110","CondCount":"01","CondChangeId":"","CondType":"NAVM","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"PC","CondSTNo":"250","CondCount":"01","CondChangeId":"","CondType":"JEXS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"}],"POPartnersData":{"Name":"LF","Number":"001100937"},"PODeliveryScheduleData":{"DelDateCatg":"D","DelDate":"2020-10-30","ScheduledQuantity":"1.000","DelTime":"","PRNumber":"9010153993","ReqItemNo":"00010","LinkId":"71962518","ItemNo":"10","Statisticaldeliverydate":"2020-10-30","GRQty":"","openquantity":"1.000"},"POCommunicationData":{"SalesPerson":"TEO WILLIAM","YourReference":"","Telephone":"","OurReference":"","Language":"EN"},"PODeliveryData":{"OverDelTol":"0.0","UnderDelTol":"0.0","ShippingInstructions":"","StockType":"","FstRem_Exped":"10","SecRem_Exped":"20","ThrdRem_Exped":"30","ValuationType":"","RemShelfLife":"0","QAControlLife":"","PlDelTime":"","GrProcTime":"1","IncoTerms1":"","IncoTerm2":"","GoodsReceipt":"True","GRNonVal":"False","DelvCompleted":"False","LinkId":"71962518","Unlimited":"False","ItemNumber":"00010"},"POInvoiceData":{"InvoiceReceipt":"True","FinalInvoice":"False","GRBasedIV":"True","TaxCode":"BO","LinkId":"71962518","ItemNumber":"10","SRVBasedIV":""},"POConfirmationsData":{"ConfControl":"","OrderAck":"","ConfirmnReq":"","RejectInd":"True","LinkId":"71962518","ItemNumber":"10"},"POCondCtrlData":{"PrintPrice":"True","EstimatedPrice":"False","LinkId":"71962518","ItemNumber":"10"},"POLineItemCustomerData":{"ProductOrigin":"","Segment":"","LinkId":"71962518","ItemNumber":"10"},"POConditionsData":[{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"001","CondCount":"01","CondChangeId":"","CondType":"PBXX","Amount":"10.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"B","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"PC","CondSTNo":"070","CondCount":"01","CondChangeId":"","CondType":"FRA1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"%","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"070","CondCount":"02","CondChangeId":"","CondType":"FRB1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"070","CondCount":"03","CondChangeId":"","CondType":"FRC1","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"070","CondCount":"04","CondChangeId":"","CondType":"ZFR1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"071","CondCount":"01","CondChangeId":"","CondType":"ZPAC","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"075","CondCount":"01","CondChangeId":"","CondType":"ZCOV","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"075","CondCount":"02","CondChangeId":"","CondType":"ZCOP","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"03","CondChangeId":"","CondType":"ZCOQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"075","CondCount":"04","CondChangeId":"","CondType":"ZMIS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"05","CondChangeId":"","CondType":"ZMSQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"06","CondChangeId":"","CondType":"ZITQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"07","CondChangeId":"","CondType":"ZCRQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"08","CondChangeId":"","CondType":"ZIMP","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"09","CondChangeId":"","CondType":"ZBIN","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"10","CondChangeId":"","CondType":"ZSEC","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"076","CondCount":"01","CondChangeId":"","CondType":"ZINV","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"076","CondCount":"02","CondChangeId":"","CondType":"ZINP","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"076","CondCount":"03","CondChangeId":"","CondType":"ZINQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"01","CondChangeId":"","CondType":"ZM02","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"02","CondChangeId":"","CondType":"ZM03","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"03","CondChangeId":"","CondType":"ZM04","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"04","CondChangeId":"","CondType":"ZM05","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"05","CondChangeId":"","CondType":"ZM06","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"06","CondChangeId":"","CondType":"ZM07","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"07","CondChangeId":"","CondType":"ZM08","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"08","CondChangeId":"","CondType":"ZM09","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"09","CondChangeId":"","CondType":"ZLOD","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"10","CondChangeId":"","CondType":"ZUNL","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"11","CondChangeId":"","CondType":"ZM10","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"100","CondCount":"01","CondChangeId":"","CondType":"NAVS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"110","CondCount":"01","CondChangeId":"","CondType":"NAVM","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"PC","CondSTNo":"250","CondCount":"01","CondChangeId":"","CondType":"JEXS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"}],"POVendorAddressData":{"Street":"NO. 1, TUAS SOUTH ST 1","HouseNumber":"JURONG TOW","PostalCode":"638059","City":"SINGAPORE","Country":"","TelNo":"65-68699221","TelExt":"","FaxNo":"65-68633320","FaxExt":"","MailID":""},"POHeaderTextData":{"PONoteToApprover":"xfcgfhj","HeaderNote":"","PricingTypes":"","Deadlines":"","TermsOfDelivery":"","TermsOfPayment":"","ShippingInstructions":"","VendorMemoGeneral":"","VendorMemoSpecial":"","Headertext":""},"POTextsData":{"PrnotetoApproval":"","ItemText":"","InfoRecordPOText":"Item Text","MaterialPOText":"","PONoteToApprover":"","DeliveryText":"","LinkId":"71962518","ItemNumber":"10"},"POQuantityWeightsData":{"POQuantity":"1.000","POQuantityUnit":"ST","POQuantitySKU":"1.000","POQuantitySKUUnit":"KG","Order1":"1","OrderUnit1":"ST","Order2":"1","OrderUnit2":"ST","OrderPrice":"1","OrderPriceUnit":"ST","SKU":"0.000","SKUUnit":"KG","LinkID":"71962518","ItemNumber":"10","Netweight":"0.000","Grossweight":"0.000","Volume":"0.000","Points":"0.000","netweight2":"0.0","grossweight2":"0.0","volume2":"0.000","points2":"0.000","netweightUnit":"KG","netweight2Unit":"KG","grosswgtunit":"KG","grosswgt2unit":"KG","netwgtperprice":"1","grosswgtperprice":"1","netwgtorderunit":"ST","grosswgtorderunit":"ST","volumeperprice":"1","pointsperprice":"1","volumeorderunit":"ST","pointsorderunit":"ST"},"POMaterialData":{"ItemNo":"10","LinkId":"71962518","MfrPartNumber":"","Manufacturer":"","revisionlevel":"","VendMatno":"","EANUPC":"","Vendorsubrange":"","Batch":"","vendorbatch":"","infoupdate":"False"},"POStatusData":{"Ordered":"1.0","Delivered":"0.0","Stilltodeliv":"1.0","Invoiced":"0.0","OrderedTotalPrice":"10.0","DeliveredTotalPrice":"0.0","StilltodelivTotalPrice":"10.0","InvoicedTotalPrice":"0.0","DownpaymtsTotalPrice":"0.0","OrderedCurrency":"USD","DeliveredCurrency":"USD","StilltodelivCurrency":"USD","InvoicedCurrency":"USD","DownpaymtsCurrency":"USD"}}}';
//     var jsonPoData = '{"POFetchOP":{"Message":"Success","MainCode":"0","GeneralData":{"PurchaseOrderNumber":"9040065562","PurchaseOrderType":"Import PO for Goods","UserId":"natsteel","CompanyCode":"0680","RequestType":"Create Purchase Order","ReferenceDocumentType":"","ReferenceDocumentNumber":"","ReferenceDocumentLine":"","VendorName":"International Materials And  Techno logy (S) Pte Ltd (Imatech)","VendorCode":"1100001","DocumentDate":"2020-10-06","DownpaymentReqd":"","value":"","InitiatorId":"natsteel","InitiatorEmailId":"natsteelsg@natsteel.com","PurchasingOrg":"640","PurchasingGrp":"F03","CollectiveNumber":"","DownPaymentReqFor":"","PID":"PO-0000000377","POCreatedDate":"2020-10-06","TotalPOAmount":"100.00","TotalPOAmtPOVendor":"100.00","PO_SequenceNO":"GPO-06-10-2020-154","RFQNo":"GRFQ-01-10-20-0001","Addtn_ValidFrom":"","Addtn_ValidTo":"","isVendorAckReq":"true"},"PODeliveryInvoiceData":{"paymentTerms":"R030","paymentindays1":"30","paymentinpercnt1":"0.000","paymentindays2":"0","paymentinpercnt2":"0.000","paymentindaysnet":"0","Currency":"USD","ExchangeRate":"1.70000","ExchangeRateFixed":"True","Incoterms1":"","Incoterms2":"","GRMessage":""},"POLineItemData":{"ItemNumber":"10","AccountAssignment":"F","ItemCategory":"","Criticality":"Select","ShortText":"SERAM CRANE RUBBER STOP%","Quantity":"1.000","PriceUnit":"1","Currency":"USD","DeliveryDateCategory":"D","RequisitionDate":"2020-09-21","DeliveryDate":"2020-10-30","MaterialGroup":"163","PurchasingGroup":"N19","StorageLocation":"SC34","RequisitionerID":"Girivasu","TrackingNumber":"0017","GRProcTime":"1","MaterialCode":"0165A0002","Plant":"6400","Unit":"ST","GoodsReceipt":"X","GRNonVal":"","AgreementLineItem":"00000","InfoRecord":"5300054855","PurchasingOrganization":"640","POUnit":"ST","MaterialLongText":"FOR SERAM CRANE - RUBBER STOP% (AS %SAMPLE)","PRLinkID":"71962518","Distribution":"Single Account Assignment","PartialInvoiceIndicator":"","PackageNo":"0000000000","TaxCode":"BO","DeleteFlag":"false","NetPrice":"10.000000000","PRItemNumber":"00010","PRNumber":"9010153993","taxamount":"10.00","PR_PID":"PR-0000000013-process","RFQ_No":"GRFQ-26-09-20-0001","RFQ_ItemNo":"20","immaterial":"0048A0001","returnsitem":"true","freeofcharge":"true"},"POAccntAssignData":{"AccountAssignmentCategory":"F","Distribution":"Single Account Assignment","PartialInvoiceIndicator":"","CoCode":"0640","UnloadingPoint":"","Recipient":"","GLAccount":"0008514937","COArea":"0640","CostCenter":"0640-53030","AccOrder":"000102080004","Asset":"","WBSElement":"","Quantity":"1.000","Percentage":"100","Fund":"NSH001","FunctionalArea":"1000","FundsCentre":"0640-53030","CommitmentItem":"8514937","Network":"","ActivityNumber":"","PRLinkID":"71962518","SerialNo":"01","ItmNo":"10"},"PODeliveryAddressData":{"Title":"","Name1":"Natsteel holdings","Name2":"Natsteel holdings","Street":"Tanjong Kling Road","HouseNo":"22","PostalCode":"628048","City":"Singapore","Country":"SG","Region":"","LinkId":"71962518","ItemNo":"10"},"POLineItemConditionsData":[{"CondCurncyExchangeRate":"0.00000","CondUnit":"PC","CondSTNo":"070","CondCount":"01","CondChangeId":"","CondType":"FRA1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"%","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"070","CondCount":"02","CondChangeId":"","CondType":"FRB1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"070","CondCount":"03","CondChangeId":"","CondType":"FRC1","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"070","CondCount":"04","CondChangeId":"","CondType":"ZFR1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"071","CondCount":"01","CondChangeId":"","CondType":"ZPAC","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"075","CondCount":"01","CondChangeId":"","CondType":"ZCOV","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"075","CondCount":"02","CondChangeId":"","CondType":"ZCOP","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"03","CondChangeId":"","CondType":"ZCOQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"075","CondCount":"04","CondChangeId":"","CondType":"ZMIS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"05","CondChangeId":"","CondType":"ZMSQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"06","CondChangeId":"","CondType":"ZITQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"07","CondChangeId":"","CondType":"ZCRQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"08","CondChangeId":"","CondType":"ZIMP","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"09","CondChangeId":"","CondType":"ZBIN","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"10","CondChangeId":"","CondType":"ZSEC","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"076","CondCount":"01","CondChangeId":"","CondType":"ZINV","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"076","CondCount":"02","CondChangeId":"","CondType":"ZINP","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"076","CondCount":"03","CondChangeId":"","CondType":"ZINQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"1","BaseUOM":"ST","Denominator":"1","Uom_Extra":"ST"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"01","CondChangeId":"","CondType":"ZM02","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"02","CondChangeId":"","CondType":"ZM03","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"03","CondChangeId":"","CondType":"ZM04","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"04","CondChangeId":"","CondType":"ZM05","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"05","CondChangeId":"","CondType":"ZM06","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"06","CondChangeId":"","CondType":"ZM07","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"07","CondChangeId":"","CondType":"ZM08","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"08","CondChangeId":"","CondType":"ZM09","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"09","CondChangeId":"","CondType":"ZLOD","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"10","CondChangeId":"","CondType":"ZUNL","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"11","CondChangeId":"","CondType":"ZM10","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"100","CondCount":"01","CondChangeId":"","CondType":"NAVS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"110","CondCount":"01","CondChangeId":"","CondType":"NAVM","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.70000","CondUnit":"PC","CondSTNo":"250","CondCount":"01","CondChangeId":"","CondType":"JEXS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A","LinkId":"71962518","ItemNumber":"10","Status":"true","Numerator":"0","BaseUOM":"PC","Denominator":"0","Uom_Extra":"PC"}],"POPartnersData":{"Name":"LF","Number":"001100937"},"PODeliveryScheduleData":{"DelDateCatg":"D","DelDate":"2020-10-30","ScheduledQuantity":"1.000","DelTime":"","PRNumber":"9010153993","ReqItemNo":"00010","LinkId":"71962518","ItemNo":"10","Statisticaldeliverydate":"2020-10-30","GRQty":"","openquantity":"1.000"},"POCommunicationData":{"SalesPerson":"TEO WILLIAM","YourReference":"","Telephone":"","OurReference":"","Language":"EN"},"PODeliveryData":{"OverDelTol":"0.0","UnderDelTol":"0.0","ShippingInstructions":"","StockType":"","FstRem_Exped":"10","SecRem_Exped":"20","ThrdRem_Exped":"30","ValuationType":"","RemShelfLife":"0","QAControlLife":"","PlDelTime":"","GrProcTime":"1","IncoTerms1":"","IncoTerm2":"","GoodsReceipt":"True","GRNonVal":"False","DelvCompleted":"False","LinkId":"71962518","Unlimited":"False","ItemNumber":"00010"},"POInvoiceData":{"InvoiceReceipt":"True","FinalInvoice":"False","GRBasedIV":"True","TaxCode":"BO","LinkId":"71962518","ItemNumber":"10","SRVBasedIV":""},"POConfirmationsData":{"ConfControl":"","OrderAck":"","ConfirmnReq":"","RejectInd":"True","LinkId":"71962518","ItemNumber":"10"},"POCondCtrlData":{"PrintPrice":"True","EstimatedPrice":"False","LinkId":"71962518","ItemNumber":"10"},"POLineItemCustomerData":{"ProductOrigin":"","Segment":"","LinkId":"71962518","ItemNumber":"10"},"POConditionsData":[{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"001","CondCount":"01","CondChangeId":"","CondType":"PBXX","Amount":"10.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"B","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"PC","CondSTNo":"070","CondCount":"01","CondChangeId":"","CondType":"FRA1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"%","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"070","CondCount":"02","CondChangeId":"","CondType":"FRB1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"070","CondCount":"03","CondChangeId":"","CondType":"FRC1","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"070","CondCount":"04","CondChangeId":"","CondType":"ZFR1","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"071","CondCount":"01","CondChangeId":"","CondType":"ZPAC","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"075","CondCount":"01","CondChangeId":"","CondType":"ZCOV","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"075","CondCount":"02","CondChangeId":"","CondType":"ZCOP","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"03","CondChangeId":"","CondType":"ZCOQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"075","CondCount":"04","CondChangeId":"","CondType":"ZMIS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"05","CondChangeId":"","CondType":"ZMSQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"06","CondChangeId":"","CondType":"ZITQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"07","CondChangeId":"","CondType":"ZCRQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"08","CondChangeId":"","CondType":"ZIMP","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"09","CondChangeId":"","CondType":"ZBIN","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"075","CondCount":"10","CondChangeId":"","CondType":"ZSEC","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"076","CondCount":"01","CondChangeId":"","CondType":"ZINV","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"076","CondCount":"02","CondChangeId":"","CondType":"ZINP","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"0.000000000","CondCrncy":"","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"ST","CondSTNo":"076","CondCount":"03","CondChangeId":"","CondType":"ZINQ","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"01","CondChangeId":"","CondType":"ZM02","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"02","CondChangeId":"","CondType":"ZM03","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"03","CondChangeId":"","CondType":"ZM04","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"04","CondChangeId":"","CondType":"ZM05","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"05","CondChangeId":"","CondType":"ZM06","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"06","CondChangeId":"","CondType":"ZM07","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"07","CondChangeId":"","CondType":"ZM08","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"08","CondChangeId":"","CondType":"ZM09","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"09","CondChangeId":"","CondType":"ZLOD","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"10","CondChangeId":"","CondType":"ZUNL","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"PC","CondSTNo":"078","CondCount":"11","CondChangeId":"","CondType":"ZM10","Amount":"0.000000000","CondPricUnit":"1","Currency":"USD","CondVal":"1.000000000","CondCrncy":"USD","VendorCode":"0001100937","Application":"M","CondPriceDate":"2020-10-06","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"C","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"100","CondCount":"01","CondChangeId":"","CondType":"NAVS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"","CondSTNo":"110","CondCount":"01","CondChangeId":"","CondType":"NAVM","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A"},{"CondCurncyExchangeRate":"1.70000","CondUnit":"PC","CondSTNo":"250","CondCount":"01","CondChangeId":"","CondType":"JEXS","Amount":"0.000000000","CondPricUnit":"0","Currency":"USD","CondVal":"10.000000000","CondCrncy":"USD","VendorCode":"","Application":"M","CondPriceDate":"2020-10-06","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"C","CondOrigin":"A"}],"POVendorAddressData":{"Street":"NO. 1, TUAS SOUTH ST 1","HouseNumber":"JURONG TOW","PostalCode":"638059","City":"SINGAPORE","Country":"","TelNo":"65-68699221","TelExt":"","FaxNo":"65-68633320","FaxExt":"","MailID":""},"POHeaderTextData":{"PONoteToApprover":"xfcgfhj","HeaderNote":"","PricingTypes":"","Deadlines":"","TermsOfDelivery":"","TermsOfPayment":"","ShippingInstructions":"","VendorMemoGeneral":"","VendorMemoSpecial":"","Headertext":""},"POTextsData":{"PrnotetoApproval":"","ItemText":"","InfoRecordPOText":"Item Text","MaterialPOText":"","PONoteToApprover":"","DeliveryText":"","LinkId":"71962518","ItemNumber":"10"},"POQuantityWeightsData":{"POQuantity":"1.000","POQuantityUnit":"ST","POQuantitySKU":"1.000","POQuantitySKUUnit":"KG","Order1":"1","OrderUnit1":"ST","Order2":"1","OrderUnit2":"ST","OrderPrice":"1","OrderPriceUnit":"ST","SKU":"0.000","SKUUnit":"KG","LinkID":"71962518","ItemNumber":"10","Netweight":"0.000","Grossweight":"0.000","Volume":"0.000","Points":"0.000","netweight2":"0.0","grossweight2":"0.0","volume2":"0.000","points2":"0.000","netweightUnit":"KG","netweight2Unit":"KG","grosswgtunit":"KG","grosswgt2unit":"KG","netwgtperprice":"1","grosswgtperprice":"1","netwgtorderunit":"ST","grosswgtorderunit":"ST","volumeperprice":"1","pointsperprice":"1","volumeorderunit":"ST","pointsorderunit":"ST"},"POMaterialData":{"ItemNo":"10","LinkId":"71962518","MfrPartNumber":"","Manufacturer":"","revisionlevel":"","VendMatno":"","EANUPC":"","Vendorsubrange":"","Batch":"","vendorbatch":"","infoupdate":"False"},"POStatusData":{"Ordered":"1.0","Delivered":"0.0","Stilltodeliv":"1.0","Invoiced":"0.0","OrderedTotalPrice":"10.0","DeliveredTotalPrice":"0.0","StilltodelivTotalPrice":"10.0","InvoicedTotalPrice":"0.0","DownpaymtsTotalPrice":"0.0","OrderedCurrency":"USD","DeliveredCurrency":"USD","StilltodelivCurrency":"USD","InvoicedCurrency":"USD","DownpaymtsCurrency":"USD"}}}';
//    var jsonPoData = '{"POFetchOP":{"Message":"Success","MainCode":"0","GeneralData":{"PurchaseOrderNumber":"9040055740","PurchaseOrderType":"Local PO for Goods","UserId":"","CompanyCode":"0680","RequestType":"","ReferenceDocumentType":"","ReferenceDocumentNumber":"","ReferenceDocumentLine":"","VendorName":"International Materials And  Techno logy (S) Pte Ltd (Imatech)","VendorCode":"1100001","DocumentDate":"2017-08-21","DownpaymentReqd":"","value":"","InitiatorId":"","InitiatorEmailId":"","PurchasingOrg":"640","PurchasingGrp":"N05","CollectiveNumber":"","DownPaymentReqFor":"","PID":"","POCreatedDate":"2017-08-21","TotalPOAmount":"","TotalPOAmtPOVendor":"","PO_SequenceNO":"","RFQNo":"","Addtn_ValidFrom":"","Addtn_ValidTo":""},"PODeliveryInvoiceData":{"paymentTerms":"R030","paymentindays1":"30","paymentinpercnt1":"0.000","paymentindays2":"0","paymentinpercnt2":"0.000","paymentindaysnet":"0","Currency":"SGD","ExchangeRate":"1.00000","ExchangeRateFixed":"False","Incoterms1":"DEL","Incoterms2":"M5, GATE 4, 22 TANJONG KLING","GRMessage":""},"POLineItemData":{"ItemNumber":"10","AccountAssignment":"F","ItemCategory":"","Criticality":"","ShortText":"BEIRI HYDRAULIC PUMP 4002249","Quantity":"1.000","PriceUnit":"1","Currency":"SGD","DeliveryDateCategory":"D","RequisitionDate":"","DeliveryDate":"2017-10-23","MaterialGroup":"203","PurchasingGroup":"N05","StorageLocation":"SC34","RequisitionerID":"","TrackingNumber":"0017","GRProcTime":"1","MaterialCode":"2334123","Plant":"6400","Unit":"UNI","GoodsReceipt":"True","GRNonVal":"False","AgreementLineItem":"00000","InfoRecord":"5300049453","PurchasingOrganization":"640","POUnit":"UNI","MaterialLongText":"","PRLinkID":"69229453","Distribution":"Single Account Assignment","PartialInvoiceIndicator":"","PackageNo":"0000000000","TaxCode":"P7","DeleteFlag":"false","NetPrice":"2295.000000000","PRItemNumber":"00010","PRNumber":"9010126596","taxamount":"","PR_PID":"","RFQ_No":"","RFQ_ItemNo":"","immaterial":"","returnsitem":"False","freeofcharge":"False","OPU":"UNI"},"POAccntAssignData":{"AccountAssignmentCategory":"F","Distribution":"Single Account Assignment","PartialInvoiceIndicator":"","CoCode":"0640","UnloadingPoint":"","Recipient":"","GLAccount":"0008514928","COArea":"0640","CostCenter":"0640-65216","AccOrder":"MEC065220001","Asset":"","WBSElement":"","Quantity":"1.000","Percentage":"100","Fund":"NSH001","FunctionalArea":"1000","FundsCentre":"0640-65216","CommitmentItem":"8514928","Network":"","ActivityNumber":"","PRLinkID":"69229453","SerialNo":"01","ItmNo":"10"},"PODeliveryAddressData":{"Title":"","Name1":"NatSteel Holdings","Name2":"","Street":"22 Tanjong Kling Road","HouseNo":"","PostalCode":"628048","City":"","Country":"SG","Region":"","LinkId":"69229453","ItemNo":"10"},"POLineItemConditionsData":[{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"001","CondCount":"01","CondChangeId":"","CondType":"PB00","CondName":"","Amount":"2295.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"2295.0","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2017-08-21","CondClass":"B","CalType":"C","CondCatg":"X","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"False","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"070","CondCount":"01","CondChangeId":"","CondType":"FRA1","CondName":"Freight %","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"070","CondCount":"02","CondChangeId":"","CondType":"FRB1","CondName":"Freight (Value)","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"070","CondCount":"03","CondChangeId":"","CondType":"FRC1","CondName":"Freight/Quantity","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"070","CondCount":"04","CondChangeId":"","CondType":"ZFR1","CondName":"TM - Freight (Value)","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"071","CondCount":"01","CondChangeId":"","CondType":"ZPAC","CondName":"Packing charges.","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"075","CondCount":"01","CondChangeId":"","CondType":"ZCOV","CondName":"Commission (Value)","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"075","CondCount":"02","CondChangeId":"","CondType":"ZCOP","CondName":"Commission(Percenta)","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"075","CondCount":"03","CondChangeId":"","CondType":"ZCOQ","CondName":"Comission/Quantity","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"075","CondCount":"04","CondChangeId":"","CondType":"ZMIS","CondName":"Misc Charges","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"075","CondCount":"05","CondChangeId":"","CondType":"ZMSQ","CondName":"Misc Charges Qty","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"075","CondCount":"06","CondChangeId":"","CondType":"ZITQ","CondName":"Inland Transit Qty","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"075","CondCount":"07","CondChangeId":"","CondType":"ZCRQ","CondName":"Container Repair Qty","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"075","CondCount":"08","CondChangeId":"","CondType":"ZIMP","CondName":"Weight Variance","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"075","CondCount":"09","CondChangeId":"","CondType":"ZBIN","CondName":"Bin Rental","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"075","CondCount":"10","CondChangeId":"","CondType":"ZSEC","CondName":"Security","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"076","CondCount":"01","CondChangeId":"","CondType":"ZINV","CondName":"Insurance (Value)","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"0.00000","CondUnit":"","CondSTNo":"076","CondCount":"02","CondChangeId":"","CondType":"ZINP","CondName":"Insurance(Percentag)","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"A","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"076","CondCount":"03","CondChangeId":"","CondType":"ZINQ","CondName":"Insurance( quntity)","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"078","CondCount":"01","CondChangeId":"","CondType":"ZM02","CondName":"Surveyor@ load port","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"078","CondCount":"02","CondChangeId":"","CondType":"ZM03","CondName":"Surveyor@disc Port","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"078","CondCount":"03","CondChangeId":"","CondType":"ZM04","CondName":"Stevedoring","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"078","CondCount":"04","CondChangeId":"","CondType":"ZM05","CondName":"Cranage","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"078","CondCount":"05","CondChangeId":"","CondType":"ZM06","CondName":"Timekeeper","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"078","CondCount":"06","CondChangeId":"","CondType":"ZM07","CondName":"Jurong Port charges","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"078","CondCount":"07","CondChangeId":"","CondType":"ZM08","CondName":"Haulier","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"078","CondCount":"08","CondChangeId":"","CondType":"ZM09","CondName":"Incentive","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"078","CondCount":"09","CondChangeId":"","CondType":"ZLOD","CondName":"Loading Equipment","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"078","CondCount":"10","CondChangeId":"","CondType":"ZUNL","CondName":"Un Loading Equipment","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"UNI","CondSTNo":"078","CondCount":"11","CondChangeId":"","CondType":"ZM10","CondName":"Marine Handling Chrg","Amount":"0.000000000","CondPricUnit":"1","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"0001101141","Application":"M","CondPriceDate":"2017-08-21","CondClass":"A","CalType":"C","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"1","BaseUOM":"UNI","Denominator":"1","Uom_Extra":"UNI"},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"100","CondCount":"01","CondChangeId":"","CondType":"NAVS","CondName":"","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2017-08-21","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"110","CondCount":"01","CondChangeId":"","CondType":"NAVM","CondName":"","Amount":"0.000000000","CondPricUnit":"0","Currency":"SGD","CondVal":"0.0","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2017-08-21","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""},{"CondCurncyExchangeRate":"1.00000","CondUnit":"","CondSTNo":"250","CondCount":"01","CondChangeId":"","CondType":"JEXS","CondName":"Taxes on the PO","Amount":"160.650000000","CondPricUnit":"0","Currency":"SGD","CondVal":"160.65","CondCrncy":"SGD","VendorCode":"","Application":"M","CondPriceDate":"2017-08-21","CondClass":"D","CalType":"B","CondCatg":"","CondCtrl":"A","CondOrigin":"A","LinkId":"69229453","ItemNumber":"10","Status":"True","Numerator":"0","BaseUOM":"","Denominator":"0","Uom_Extra":""}],"POPartnersData":{"Name":"LF","Number":"001101141H"},"PODeliveryScheduleData":{"DelDateCatg":"D","DelDate":"2017-10-23","ScheduledQuantity":"1.000","DelTime":"","PRNumber":"9010126596","ReqItemNo":"00010","LinkId":"69229453","ItemNo":"10","Statisticaldeliverydate":"2017-10-23","GRQty":"1.000","openquantity":"0.0"},"POCommunicationData":{"SalesPerson":"LOUIS CHIA","YourReference":"","Telephone":"","OurReference":"","Language":"EN"},"PODeliveryData":{"OverDelTol":"0.0","UnderDelTol":"0.0","ShippingInstructions":"","StockType":"","FstRem_Exped":"0","SecRem_Exped":"0","ThrdRem_Exped":"0","ValuationType":"","RemShelfLife":"0","QAControlLife":"","PlDelTime":"","GrProcTime":"1","IncoTerms1":"","IncoTerm2":"","GoodsReceipt":"True","GRNonVal":"False","DelvCompleted":"False","LinkId":"69229453","Unlimited":"False","ItemNumber":"00010"},"POInvoiceData":{"InvoiceReceipt":"True","FinalInvoice":"False","GRBasedIV":"True","TaxCode":"P7","LinkId":"69229453","ItemNumber":"10","SRVBasedIV":"False"},"POConfirmationsData":{"ConfControl":"","OrderAck":"","ConfirmnReq":"","RejectInd":"False","LinkId":"69229453","ItemNumber":"10"},"POCondCtrlData":{"PrintPrice":"True","EstimatedPrice":"False","LinkId":"69229453","ItemNumber":"10"},"POLineItemCustomerData":{"ProductOrigin":"","Segment":"","LinkId":"69229453","ItemNumber":"10"},"POConditionsData":[{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"250","CondCount":"01","CondChangeId":"","CondType":"JEXS","CondName":"Taxes on the PO","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"160.65","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"070","CondCount":"04","CondChangeId":"","CondType":"ZFR1","CondName":"TM - Freight (Value)","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"075","CondCount":"09","CondChangeId":"","CondType":"ZBIN","CondName":"Bin Rental","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"078","CondCount":"10","CondChangeId":"","CondType":"ZUNL","CondName":"Un Loading Equipment","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"110","CondCount":"01","CondChangeId":"","CondType":"NAVM","CondName":"","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"075","CondCount":"03","CondChangeId":"","CondType":"ZCOQ","CondName":"Comission/Quantity","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"075","CondCount":"07","CondChangeId":"","CondType":"ZCRQ","CondName":"Container Repair Qty","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"078","CondCount":"02","CondChangeId":"","CondType":"ZM03","CondName":"Surveyor@disc Port","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"078","CondCount":"08","CondChangeId":"","CondType":"ZM09","CondName":"Incentive","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"075","CondCount":"04","CondChangeId":"","CondType":"ZMIS","CondName":"Misc Charges","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"078","CondCount":"05","CondChangeId":"","CondType":"ZM06","CondName":"Timekeeper","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"100","CondCount":"01","CondChangeId":"","CondType":"NAVS","CondName":"","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"078","CondCount":"09","CondChangeId":"","CondType":"ZLOD","CondName":"Loading Equipment","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"070","CondCount":"03","CondChangeId":"","CondType":"FRC1","CondName":"Freight/Quantity","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"078","CondCount":"06","CondChangeId":"","CondType":"ZM07","CondName":"Jurong Port charges","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"070","CondCount":"02","CondChangeId":"","CondType":"FRB1","CondName":"Freight (Value)","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"075","CondCount":"10","CondChangeId":"","CondType":"ZSEC","CondName":"Security","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"075","CondCount":"08","CondChangeId":"","CondType":"ZIMP","CondName":"Weight Variance","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"078","CondCount":"03","CondChangeId":"","CondType":"ZM04","CondName":"Stevedoring","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"075","CondCount":"06","CondChangeId":"","CondType":"ZITQ","CondName":"Inland Transit Qty","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"076","CondCount":"03","CondChangeId":"","CondType":"ZINQ","CondName":"Insurance( quntity)","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"075","CondCount":"05","CondChangeId":"","CondType":"ZMSQ","CondName":"Misc Charges Qty","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"075","CondCount":"02","CondChangeId":"","CondType":"ZCOP","CondName":"Commission(Percenta)","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"076","CondCount":"01","CondChangeId":"","CondType":"ZINV","CondName":"Insurance (Value)","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"070","CondCount":"01","CondChangeId":"","CondType":"FRA1","CondName":"Freight %","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"078","CondCount":"04","CondChangeId":"","CondType":"ZM05","CondName":"Cranage","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"078","CondCount":"07","CondChangeId":"","CondType":"ZM08","CondName":"Haulier","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"078","CondCount":"01","CondChangeId":"","CondType":"ZM02","CondName":"Surveyor@ load port","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"001","CondCount":"01","CondChangeId":"","CondType":"PB00","CondName":"","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"2295.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"075","CondCount":"01","CondChangeId":"","CondType":"ZCOV","CondName":"Commission (Value)","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"071","CondCount":"01","CondChangeId":"","CondType":"ZPAC","CondName":"Packing charges.","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"076","CondCount":"02","CondChangeId":"","CondType":"ZINP","CondName":"Insurance(Percentag)","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""},{"CondCurncyExchangeRate":"","CondUnit":"","CondSTNo":"078","CondCount":"11","CondChangeId":"","CondType":"ZM10","CondName":"Marine Handling Chrg","Amount":"","CondPricUnit":"","Currency":"SGD","CondVal":"0.0","CondCrncy":"","VendorCode":"0001101141","Application":"","CondPriceDate":"","CondClass":"","CalType":"","CondCatg":"","CondCtrl":"","CondOrigin":""}],"POVendorAddressData":{"Street":"7 TUAS AVENUE 8","HouseNumber":"","PostalCode":"639222","City":"SINGAPORE","Country":"SG","TelNo":"65-67417458","TelExt":"","FaxNo":"65-67410434","FaxExt":"","MailID":""},"POHeaderTextData":{"PONoteToApprover":"","HeaderNote":"","PricingTypes":"","Deadlines":"","TermsOfDelivery":"","TermsOfPayment":"","ShippingInstructions":"","VendorMemoGeneral":"","VendorMemoSpecial":"","Headertext":""},"POTextsData":{"PrnotetoApproval":"","ItemText":"","InfoRecordPOText":"","MaterialPOText":"BEIRI HYDRAULIC PUMP PROOF LOADING, BKP701-3, 14-700-14, 0-250-P-C*00, P/N:4002249","PONoteToApprover":"","DeliveryText":"","LinkId":"69229453","ItemNumber":"10"},"POQuantityWeightsData":{"POQuantity":"1.000","POQuantityUnit":"UNI","POQuantitySKU":"1.000","POQuantitySKUUnit":"UNI","Order1":"1","OrderUnit1":"UNI","Order2":"1","OrderUnit2":"UNI","OrderPrice":"1","OrderPriceUnit":"UNI","SKU":"1","SKUUnit":"UNI","LinkID":"69229453","ItemNumber":"10","Netweight":"0.000","Grossweight":"0.000","Volume":"0.000","Points":"0.000","netweight2":"0.000","grossweight2":"0.000","volume2":"0.000","points2":"0.000","netweightUnit":"KG","netweight2Unit":"KG","grosswgtunit":"KG","grosswgt2unit":"KG","netwgtperprice":"1","grosswgtperprice":"1","netwgtorderunit":"UNI","grosswgtorderunit":"UNI","volumeperprice":"1","pointsperprice":"1","volumeorderunit":"UNI","pointsorderunit":"UNI"},"POMaterialData":{"ItemNo":"10","LinkId":"69229453","MfrPartNumber":"","Manufacturer":"","revisionlevel":"","VendMatno":"","EANUPC":"","Vendorsubrange":"","Batch":"","vendorbatch":"","infoupdate":"False"},"POStatusData":{"Ordered":"1.0","Delivered":"1.0","Stilltodeliv":"0.0","Invoiced":"1.0","OrderedTotalPrice":"2295.0","DeliveredTotalPrice":"2295.0","StilltodelivTotalPrice":"0.0","InvoicedTotalPrice":"2295.0","DownpaymtsTotalPrice":"0.0","OrderedCurrency":"SGD","DeliveredCurrency":"SGD","StilltodelivCurrency":"SGD","InvoicedCurrency":"SGD","DownpaymtsCurrency":"SGD"}}}';

    console.log("json: " + jsonPoData);

    parsedJsonPoData = $.parseJSON(jsonPoData);

    var MainCode = parsedJsonPoData.POFetchOP.MainCode;
    var Message = parsedJsonPoData.POFetchOP.Message;
    console.log("MainCode: " + MainCode);
    console.log("Message: " + Message);

    if (Message === "Success" || Message === "success")
    {
//        Lobibox.alert("success", {
//            msg: "PO Details fetched successfully."
//        });
    }
    else if (Message === "Error" || Message === "error")
    {
        Lobibox.alert("error", {
            msg: "Failed to Fetch PO Details."
        });
    }
    else
    {
        Lobibox.alert("info", {
            msg: Message
        });
    }


    if (MainCode === undefined || Number(MainCode.toString().trim() !== 0))                     //BITTU on 13July2020
    {
        $("#overlay").css("display", "none");
    }

    // General Data Starts
    $("#transactionInitiatedOn").text(parsedJsonPoData.POFetchOP.GeneralData.POCreatedDate);
    $("#creatorId").text(parsedJsonPoData.POFetchOP.GeneralData.InitiatorId);
    $("#creatorEmailId").text(parsedJsonPoData.POFetchOP.GeneralData.InitiatorEmailId);
    var PoFrom = $("#PoFrom").val();
    console.log("PoFrom: " + PoFrom);
    if (PoFrom !== "editApprovedPo")
    {
        $("#poNumber").val(parsedJsonPoData.POFetchOP.GeneralData.PurchaseOrderNumber);
    }
    $("#typeOfPOHeader").val(parsedJsonPoData.POFetchOP.GeneralData.PurchaseOrderType);
    if (parsedJsonPoData.POFetchOP.GeneralData.PurchaseOrderType === "Inter Company")
    {
        $("#validityFromHeaderDiv").css("display", "block");
        $("#validityToHeaderDiv").css("display", "block");

        var validityFromHeader = parsedJsonPoData.POFetchOP.GeneralData.Addtn_ValidFrom;
        var validityToHeader = parsedJsonPoData.POFetchOP.GeneralData.Addtn_ValidTo;
        console.log("validityFromHeader before: " + validityFromHeader);
        console.log("validityToHeader before: " + validityToHeader);

        if (validityFromHeader !== "" && validityFromHeader !== undefined)
        {
            var validityFromHeader_Date = validityFromHeader.split("-");
            var validityFromHeader_day = validityFromHeader_Date[2];
            var validityFromHeader_month = validityFromHeader_Date[1];
            var validityFromHeader_year = validityFromHeader_Date[0];

            validityFromHeader = validityFromHeader_day + "-" + validityFromHeader_month + "-" + validityFromHeader_year;
            console.log("validityFromHeader new: " + validityFromHeader);
            $('#validityFromHeader_div').datetimepicker({
                format: 'DD-MM-YYYY',
                minDate: new Date(),
                "defaultDate": new Date(validityFromHeader_year, validityFromHeader_month - 1, validityFromHeader_day)
            });
//            $('#validityFromHeader_div').datetimepicker('refresh');
            console.log("Set from date");
        }
        if (validityToHeader !== "" && validityToHeader !== undefined)
        {
            var validityToHeader_Date = validityToHeader.split("-");
            var validityToHeader_day = validityToHeader_Date[2];
            var validityToHeader_month = validityToHeader_Date[1];
            var validityToHeader_year = validityToHeader_Date[0];

            validityToHeader = validityToHeader_day + "-" + validityToHeader_month + "-" + validityToHeader_year;
            console.log("validityToHeader new: " + validityToHeader);
            $('#validityToHeader_div').datetimepicker({
                format: 'DD-MM-YYYY',
                minDate: new Date(),
                "defaultDate": new Date(validityToHeader_year, validityToHeader_month - 1, validityToHeader_day)
            });
//            $('#validityToHeader_div').datetimepicker('refresh');
            console.log("Set to date");
        }
    }
    else
    {
        $("#validityFromHeaderDiv").css("display", "none");
        $("#validityToHeaderDiv").css("display", "none");
    }
    console.log("parsedJsonPoData.POFetchOP.GeneralData.CompanyCode :" + parsedJsonPoData.POFetchOP.GeneralData.CompanyCode);
    $("#companycodeHeader").val(parsedJsonPoData.POFetchOP.GeneralData.CompanyCode);
    $("#CoCode").val(parsedJsonPoData.POFetchOP.GeneralData.CompanyCode);

    console.log("VendorCode: " + parsedJsonPoData.POFetchOP.GeneralData.VendorCode);
    console.log("before: findVendorByCompanyCode");
    $("#overlay").css("display", "block");
//    setTimeout(
//            function()
//            {
//                console.log(parsedJsonPoData.POFetchOP.GeneralData.VendorCode);
//                findVendorByCompanyCodeEdit(parsedJsonPoData.POFetchOP.GeneralData.VendorCode);
////                $("#vendorcodeHeader").val(parsedJsonPoData.POFetchOP.GeneralData.VendorCode);
//                $('.selectpicker').selectpicker('refresh');
//            }
//    , 500);
    $.ajax({
        url: findVendorByCompanyCodeEdit(parsedJsonPoData.POFetchOP.GeneralData.VendorCode, parsedJsonPoData.POFetchOP.GeneralData.CompanyCode),
        async: false,
        success: function() {
        }
    });
    console.log("after: findVendorByCompanyCode");

//    $("#docDateHeader").val(parsedJsonPoData.POFetchOP.GeneralData.DocumentDate);
    $("#referenceDocType").val(parsedJsonPoData.POFetchOP.GeneralData.ReferenceDocumentType);
    $("#referenceDocNumber").val(parsedJsonPoData.POFetchOP.GeneralData.ReferenceDocumentNumber);
    $("#referenceDocLine").val(parsedJsonPoData.POFetchOP.GeneralData.ReferenceDocumentLine);
    $("#downPaymentReqd").val(parsedJsonPoData.POFetchOP.GeneralData.DownpaymentReqd);
    $("#downPaymentReqdValue").val(parsedJsonPoData.POFetchOP.GeneralData.value);

//    if (parsedJsonPoData.POFetchOP.GeneralData.DocumentDate !== "" && parsedJsonPoData.POFetchOP.GeneralData.DocumentDate !== undefined)
//    {
//        var docDate = $("#docDateHeader").val();
//        var arr1 = docDate.split("-");
//        var day = arr1[2].trim();
//        var month = arr1[1].trim();
//        var year = arr1[0].trim();
//        var newDocDate = day + "-" + month + "-" + year;
//        $("#docDateHeader").val(newDocDate);
//    }
    //General Data End

    // Delivery/Invoice Data Starts
    if (parsedJsonPoData.POFetchOP.PODeliveryInvoiceData !== undefined)
    {
        $("#paymentDays1").val(parsedJsonPoData.POFetchOP.PODeliveryInvoiceData.paymentindays1);
        $("#paymentPer1").val(parsedJsonPoData.POFetchOP.PODeliveryInvoiceData.paymentinpercnt1);
        $("#paymentDays2").val(parsedJsonPoData.POFetchOP.PODeliveryInvoiceData.paymentindays2);
        $("#paymentPer2").val(parsedJsonPoData.POFetchOP.PODeliveryInvoiceData.paymentinpercnt2);
        $("#paymentDaysNet").val(parsedJsonPoData.POFetchOP.PODeliveryInvoiceData.paymentindaysnet);
        $("#paymentTermsDelivery").val(parsedJsonPoData.POFetchOP.PODeliveryInvoiceData.paymentTerms);
        $("#CurrencyDeliveryInvoice").val(parsedJsonPoData.POFetchOP.PODeliveryInvoiceData.Currency);
        $("#ExchangeRate").val(parsedJsonPoData.POFetchOP.PODeliveryInvoiceData.ExchangeRate);

        if (parsedJsonPoData.POFetchOP.PODeliveryInvoiceData.ExchangeRateFixed === "true")
        {
            $("#ExchangeReateFixed").prop("checked", true);
        }
        else
        {
            $("#ExchangeReateFixed").prop("checked", false);
        }
        $("#IncoTermsPart1").val(parsedJsonPoData.POFetchOP.PODeliveryInvoiceData.Incoterms1);
        $("#IncoTermsPart2").val(parsedJsonPoData.POFetchOP.PODeliveryInvoiceData.Incoterms2);

        if (parsedJsonPoData.POFetchOP.PODeliveryInvoiceData.GRMessage === "true")
        {
            $("#GRMessage").prop("checked", true);
        }
        else
        {
            $("#GRMessage").prop("checked", false);
        }
    }
    // Delivery/Invoice Data Ends

    // Communication Data Starts
    if (parsedJsonPoData.POFetchOP.POCommunicationData !== undefined)
    {
        $("#Salesperson").val(parsedJsonPoData.POFetchOP.POCommunicationData.SalesPerson);
        $("#YourReference").val(parsedJsonPoData.POFetchOP.POCommunicationData.YourReference);
        $("#Telephone").val(parsedJsonPoData.POFetchOP.POCommunicationData.Telephone);
        $("#OurReference").val(parsedJsonPoData.POFetchOP.POCommunicationData.OurReference);
        $("#Language").val(parsedJsonPoData.POFetchOP.POCommunicationData.Language);
    }
    // Communication Data End

    // Org. Data Starts 
    $("#purchasingOrg").val(parsedJsonPoData.POFetchOP.GeneralData.PurchasingOrg);
    $("#purchasingGroup").val(parsedJsonPoData.POFetchOP.GeneralData.PurchasingGrp);
    // Org. Data End

    // Vendor Address Data Starts
    if (parsedJsonPoData.POFetchOP.POVendorAddressData !== undefined)
    {
        $("#streetVendorAddress").val(parsedJsonPoData.POFetchOP.POVendorAddressData.Street);
        $("#houseNumberVendorAddress").val(parsedJsonPoData.POFetchOP.POVendorAddressData.HouseNumber);
        $("#postalCodeVendorAddress").val(parsedJsonPoData.POFetchOP.POVendorAddressData.PostalCode);
        $("#cityVendorAddress").val(parsedJsonPoData.POFetchOP.POVendorAddressData.City);
        $("#countryVendorAddress").val(parsedJsonPoData.POFetchOP.POVendorAddressData.Country);
        $("#telephoneVendorAddress").val(parsedJsonPoData.POFetchOP.POVendorAddressData.TelNo);
        $("#extTel").val(parsedJsonPoData.POFetchOP.POVendorAddressData.TelExt);
        $("#faxVendorAddress").val(parsedJsonPoData.POFetchOP.POVendorAddressData.FaxNo);
        $("#extFax").val(parsedJsonPoData.POFetchOP.POVendorAddressData.FaxExt);
    }
    // Vendor Address Data Ends

    // Additional Data Starts
    $("#CollectiveNumber").val(parsedJsonPoData.POFetchOP.GeneralData.CollectiveNumber);
    // Additional Data End

    // POHeaderTextData Starts
    console.log("parsedJsonPoData.POFetchOP.POVendorAddressData: " + parsedJsonPoData.POFetchOP.POHeaderTextData);
    if (parsedJsonPoData.POFetchOP.POHeaderTextData !== undefined)
    {
//        $("#pONotetoApproverHeaderTextsLimits").val(parsedJsonPoData.POFetchOP.POHeaderTextData.PONoteToApprover);
        $("#pONotetoApproverHeaderTextsLimits").val("ABCDEF");

        $("#HeaderNote").val(parsedJsonPoData.POFetchOP.POHeaderTextData.HeaderNote);
        $("#PricingTypes").val(parsedJsonPoData.POFetchOP.POHeaderTextData.PricingTypes);
        $("#Deadlines").val(parsedJsonPoData.POFetchOP.POHeaderTextData.Deadlines);
        $("#TermsofDelivery").val(parsedJsonPoData.POFetchOP.POHeaderTextData.TermsOfDelivery);
        $("#TermsofPayment").val(parsedJsonPoData.POFetchOP.POHeaderTextData.TermsOfPayment);
        $("#ShippingInstructions").val(parsedJsonPoData.POFetchOP.POHeaderTextData.ShippingInstructions);
        $("#VendorMemoGeneral").val(parsedJsonPoData.POFetchOP.POHeaderTextData.VendorMemoGeneral);
        $("#VendorMemoSpecial").val(parsedJsonPoData.POFetchOP.POHeaderTextData.VendorMemoSpecial);
    }
    // POHeaderTextData Ends

    // POConditionsData Starts
    if (parsedJsonPoData.POFetchOP.POConditionsData !== undefined)
    {
        var POConditionsDataArray = parsedJsonPoData.POFetchOP.POConditionsData;
        console.log("POConditionsDataArray: " + POConditionsDataArray);
        console.log("POConditionsDataArray is Array: " + Array.isArray(POConditionsDataArray));
        if (POConditionsDataArray !== undefined) {
            if (Array.isArray(POConditionsDataArray) === true) {
                console.log("POConditionsDataArray len: " + POConditionsDataArray.length);
                var row = "";
                $("#conditionTableId tbody tr").remove();
                for (var i = 0; i < POConditionsDataArray.length; i++) {

                    row += "<tr>"
                            + "<td><input type='checkbox' name='checkConditionTableRowLineLevel' class='checkConditionTableRowLineLevel'><input type='hidden' class='lineAddedFromHeader' value=''><input type='hidden' class='conditionindex' value=''></td>"
                            + "<td><input type='text' disabled='true' class='form-control form-rounded ConditionTypeHeader tableInputField' name='ConditionTypeHeader' value='" + (POConditionsDataArray[i].CondType === undefined ? "" : POConditionsDataArray[i].CondType) + "'></td>"
                            + "<td><input type='text' disabled='true' class='form-control form-rounded nameConditionsHeader tableInputField' name='nameConditionsHeader' value='" + (POConditionsDataArray[i].CondName === undefined ? "" : POConditionsDataArray[i].CondName) + "'></td>"
                            + "<td><input type='text' disabled='true' class='form-control form-rounded AmountHeader tableInputField' name='AmountHeader' value='" + (POConditionsDataArray[i].Amount === undefined ? "" : formatAmountByComma(POConditionsDataArray[i].Amount)) + "' style='width: 150px;'></td>"
                            + "<td><input type='text' disabled='true' class='form-control form-rounded CurrencyHeader tableInputField' name='CurrencyHeader' value='" + (POConditionsDataArray[i].CondCrncy === undefined ? "" : POConditionsDataArray[i].CondCrncy) + "'></td>"
                            + "<td><input type='text' disabled='true' class='form-control form-rounded PerQuantityHeader tableInputField' name='PerQuantityHeader' value='' style='width: 150px;'></td>"
                            + "<td><input type='text' disabled='true' class='form-control form-rounded ConditionPricingUnitHeader tableInputField' name='ConditionPricingUnitHeader' value='" + (POConditionsDataArray[i].CondPricUnit === undefined ? "" : POConditionsDataArray[i].CondPricUnit) + "'></td>"                            
                            + "<td><input type='text' disabled='true' class='form-control form-rounded UoMHeader tableInputField' name='UoMHeader' value='" + (POConditionsDataArray[i].CondUnit === undefined ? "" : POConditionsDataArray[i].CondUnit) + "'></td>"
                            + "<td><input type='text' disabled='true' class='form-control form-rounded ConditionValueHeader tableInputField' name='ConditionValueHeader' value='" + (POConditionsDataArray[i].CondVal === undefined ? "" : formatAmountByComma(POConditionsDataArray[i].CondVal)) + "' style='width: 150px;'></td>"
                            + "<td><input type='text' disabled='true' class='form-control form-rounded Currency2Header tableInputField' name='Currency2Header' value='" + (POConditionsDataArray[i].Currency === undefined ? "" : POConditionsDataArray[i].Currency) + "'></td>"
                            + "<td><input type='text' disabled='true' class='form-control form-rounded ConditionValue2Header tableInputField' value='0.00' name = 'ConditionValue2Header' disabled='true' value=''></td>"
                            + "<td><input type='text' disabled='true' class='form-control form-rounded ConditionCurrencyHeader tableInputField' name='ConditionCurrencyHeader' disabled='true' value=''>"
                            + "<input type='hidden' class='form-control form-rounded conditionHeaderKAPPL tableInputField' name='conditionHeaderKAPPL' value='" + (POConditionsDataArray[i].Application === undefined ? "" : POConditionsDataArray[i].Application) + "'>"
                            + "<input type='hidden' class='form-control form-rounded conditionHeaderKVSL1 tableInputField' name='conditionHeaderKVSL1' value='" + (POConditionsDataArray[i].AccountKey === undefined ? "" : POConditionsDataArray[i].AccountKey) + "'>"
                            + "<input type='hidden' class='form-control form-rounded conditionHeaderKVSL2 tableInputField' name='conditionHeaderKVSL2' value='" + (POConditionsDataArray[i].Accruals === undefined ? "" : POConditionsDataArray[i].Accruals) + "'>"
                            + "<input type='hidden' class='form-control form-rounded conditionHeaderZAEHK tableInputField' name='conditionHeaderZAEHK' value='" + (POConditionsDataArray[i].CondCount === undefined ? "" : POConditionsDataArray[i].CondCount) + "'>"
                            + "<input type='hidden' class='form-control form-rounded conditionHeaderSTUNR tableInputField' name='conditionHeaderSTUNR' value='" + (POConditionsDataArray[i].CondSTNo === undefined ? "" : POConditionsDataArray[i].CondSTNo) + "'>"
                            + "<input type='hidden' class='form-control form-rounded conditionHeaderCHANGEID tableInputField' name='conditionHeaderCHANGEID' value='" + (POConditionsDataArray[i].CondChangeId === undefined ? "" : POConditionsDataArray[i].CondChangeId) + "'>"
                            + "<input type='hidden' class='form-control form-rounded conditionHeaderVendorName tableInputField' name='conditionHeaderVendorName' value='" + (POConditionsDataArray[i].VendorName === undefined ? "" : POConditionsDataArray[i].VendorName) + "'>"
                            + "<input type='hidden' class='form-control form-rounded conditionHeaderVendorCode tableInputField' name='conditionHeaderVendorCode' value='" + (POConditionsDataArray[i].VendorCode === undefined ? "" : POConditionsDataArray[i].VendorCode) + "'>"
                            + "<input type='hidden' class='form-control form-rounded conditionHeaderCondPriceDate tableInputField' name='conditionHeaderCondPriceDate' value='" + (POConditionsDataArray[i].CondPriceDate === undefined ? "" : POConditionsDataArray[i].CondPriceDate) + "'>"
                            + "<input type='hidden' class='form-control form-rounded conditionHeaderCondCurncyExchangeRate tableInputField' name='conditionHeaderCondCurncyExchangeRate' value='" + (POConditionsDataArray[i].CondCurncyExchangeRate === undefined ? "" : POConditionsDataArray[i].CondCurncyExchangeRate) + "'>"
                            + "<input type='hidden' class='form-control form-rounded conditionHeaderPOCurrencyExchangeRate tableInputField' name='conditionHeaderPOCurrencyExchangeRate' value='" + (POConditionsDataArray[i].POCurrencyExchangeRate === undefined ? "" : POConditionsDataArray[i].POCurrencyExchangeRate) + "'></td>"
                            + "<td></td>"
                            + "</tr>";
                }
                $("#conditionTableId tbody").append(row);
            }
            else
            {

                var row = "";
                $("#conditionTableId tbody tr").remove();

                row += "<tr>"
                        + "<td><input type='checkbox' name='checkConditionTableRowLineLevel' class='checkConditionTableRowLineLevel'><input type='hidden' class='lineAddedFromHeader' value=''><input type='hidden' class='conditionindex' value=''></td>"
                        + "<td><input type='text' disabled='true' class='form-control form-rounded ConditionTypeHeader tableInputField' name='ConditionTypeHeader' value='" + (POConditionsDataArray.CondType === undefined ? "" : POConditionsDataArray.CondType) + "'></td>"
                        + "<td><input type='text' disabled='true' class='form-control form-rounded nameConditionsHeader tableInputField' name='nameConditionsHeader' value='" + (POConditionsDataArray.CondName === undefined ? "" : POConditionsDataArray.CondName) + "'></td>"
                        + "<td><input type='text' disabled='true' class='form-control form-rounded AmountHeader tableInputField' name='AmountHeader' value='" + (POConditionsDataArray.Amount === undefined ? "" : formatAmountByComma(POConditionsDataArray.Amount)) + "' style='width: 150px;'></td>"
                        + "<td><input type='text' disabled='true' class='form-control form-rounded CurrencyHeader tableInputField' name='CurrencyHeader' value='" + (POConditionsDataArray.CondCrncy === undefined ? "" : POConditionsDataArray.CondCrncy) + "'></td>"
                        + "<td><input type='text' disabled='true' class='form-control form-rounded PerQuantityHeader tableInputField' name='PerQuantityHeader' value='' style='width: 150px;'></td>"
                        + "<td><input type='text' disabled='true' class='form-control form-rounded ConditionPricingUnitHeader tableInputField' name='ConditionPricingUnitHeader' value='" + (POConditionsDataArray.CondPricUnit === undefined ? "" : POConditionsDataArray.CondPricUnit) + "'></td>"                        
                        + "<td><input type='text' disabled='true' class='form-control form-rounded UoMHeader tableInputField' name='UoMHeader' value='" + (POConditionsDataArray.CondUnit === undefined ? "" : POConditionsDataArray.CondUnit) + "'></td>"
                        + "<td><input type='text' disabled='true' class='form-control form-rounded ConditionValueHeader tableInputField' name='ConditionValueHeader' value='" + (POConditionsDataArray.CondVal === undefined ? "" : formatAmountByComma(POConditionsDataArray.CondVal)) + "' style='width: 150px;'></td>"
                        + "<td><input type='text' disabled='true' class='form-control form-rounded Currency2Header tableInputField' name='Currency2Header' value='" + (POConditionsDataArray.Currency === undefined ? "" : POConditionsDataArray.Currency) + "'></td>"
                        + "<td><input type='text' disabled='true' class='form-control form-rounded ConditionValue2Header tableInputField' value='0.00' name = 'ConditionValue2Header' disabled='true' value=''></td>"
                        + "<td><input type='text' disabled='true' class='form-control form-rounded ConditionCurrencyHeader tableInputField' name='ConditionCurrencyHeader' disabled='true' value=''>"
                        + "<input type='hidden' class='form-control form-rounded conditionHeaderKAPPL tableInputField' name='conditionHeaderKAPPL' value='" + (POConditionsDataArray.Application === undefined ? "" : POConditionsDataArray.Application) + "'>"
                        + "<input type='hidden' class='form-control form-rounded conditionHeaderKVSL1 tableInputField' name='conditionHeaderKVSL1' value='" + (POConditionsDataArray.AccountKey === undefined ? "" : POConditionsDataArray.AccountKey) + "'>"
                        + "<input type='hidden' class='form-control form-rounded conditionHeaderKVSL2 tableInputField' name='conditionHeaderKVSL2' value='" + (POConditionsDataArray.Accruals === undefined ? "" : POConditionsDataArray.Accruals) + "'>"
                        + "<input type='hidden' class='form-control form-rounded conditionHeaderZAEHK tableInputField' name='conditionHeaderZAEHK' value='" + (POConditionsDataArray.CondCount === undefined ? "" : POConditionsDataArray.CondCount) + "'>"
                        + "<input type='hidden' class='form-control form-rounded conditionHeaderSTUNR tableInputField' name='conditionHeaderSTUNR' value='" + (POConditionsDataArray.CondSTNo === undefined ? "" : POConditionsDataArray.CondSTNo) + "'>"
                        + "<input type='hidden' class='form-control form-rounded conditionHeaderCHANGEID tableInputField' name='conditionHeaderCHANGEID' value='" + (POConditionsDataArray.CondChangeId === undefined ? "" : POConditionsDataArray.CondChangeId) + "'>"
                        + "<input type='hidden' class='form-control form-rounded conditionHeaderVendorName tableInputField' name='conditionHeaderVendorName' value='" + (POConditionsDataArray.VendorName === undefined ? "" : POConditionsDataArray.VendorName) + "'>"
                        + "<input type='hidden' class='form-control form-rounded conditionHeaderVendorCode tableInputField' name='conditionHeaderVendorCode' value='" + (POConditionsDataArray.VendorCode === undefined ? "" : POConditionsDataArray.VendorCode) + "'>"
                        + "<input type='hidden' class='form-control form-rounded conditionHeaderCondPriceDate tableInputField' name='conditionHeaderCondPriceDate' value='" + (POConditionsDataArray.CondPriceDate === undefined ? "" : POConditionsDataArray.CondPriceDate) + "'>"
                        + "<input type='hidden' class='form-control form-rounded conditionHeaderCondCurncyExchangeRate tableInputField' name='conditionHeaderCondCurncyExchangeRate' value='" + (POConditionsDataArray.CondCurncyExchangeRate === undefined ? "" : POConditionsDataArray.CondCurncyExchangeRate) + "'>"
                        + "<input type='hidden' class='form-control form-rounded conditionHeaderPOCurrencyExchangeRate tableInputField' name='conditionHeaderPOCurrencyExchangeRate' value='" + (POConditionsDataArray.POCurrencyExchangeRate === undefined ? "" : POConditionsDataArray.POCurrencyExchangeRate) + "'></td>"
                        + "<td></td>"
                        + "</tr>";

                $("#conditionTableId tbody").append(row);
            }
        }
    }
    // POConditionsData Ends

    // POLineItemData Starts 
    var itemDropdownLength = $("#ItemNumberSelect option").length;
    $("#ItemNumberSelect option").remove();

    var POLineItemDataArray = parsedJsonPoData.POFetchOP.POLineItemData;
    var poLineItemRow = "";
    var itemNumberSelect = "<option value=''>Select</option>";
    console.log("POLineItemDataArray: " + POLineItemDataArray);
    var Ref_Doc_Number = "";
    var Ref_Doc_Line = "";

    if (POLineItemDataArray !== undefined) {
        $("#material_headerClass tbody tr").remove();

        PRLineItemArray = [];
        if (Array.isArray(POLineItemDataArray) === true) {
            console.log("POLineItemDataArray len: " + POLineItemDataArray.length);

            var prType = "";
            for (var i = 0; i < POLineItemDataArray.length; i++)
            {
                var prJsonObj = {};

                prJsonObj["ItemNumber"] = POLineItemDataArray[i].ItemNumber;
                prJsonObj["PRItemNumber"] = POLineItemDataArray[i].PRItemNumber;
                prJsonObj["PackageNo"] = POLineItemDataArray[i].PackageNo;
                prJsonObj["LinkId"] = POLineItemDataArray[i].PRLinkID;

                PRLineItemArray.push(prJsonObj);

                var prLineItemCategory = POLineItemDataArray[i].ItemCategory;
                if (prLineItemCategory !== "D")
                {
                    $("#serviceTab_li").css("display", "none");
                    $("#limits_li").css("display", "none");

                    $("#prType").val("Material");

                    $("#services-tab").removeClass("active");
//                    $("#quantities").addClass("active");
//                    $("#quantities-tab").addClass("active");
                    $("#material_linelevel").addClass("active");
                    $("#material_linelevel-tab").addClass("active");

//                    prType = "Capital PR for Materials";
                }
                else
                {
                    PurchaseRequestType = "Service";
                    $("#PrType").val("Service");
//                    prType = "Capital PR for Services";
                }

                Ref_Doc_Number += "<option>" + POLineItemDataArray[i].PRNumber + "</option>";
                Ref_Doc_Line += "<option>" + POLineItemDataArray[i].PRItemNumber + "</option>";
                itemNumberSelect += "<option value='" + (POLineItemDataArray[i].ItemNumber) + "'>" + POLineItemDataArray[i].ItemNumber + "</option>";

                var prDeliveryDate = POLineItemDataArray[i].DeliveryDate;
                var prRequisitionDate = POLineItemDataArray[i].RequisitionDate;
                var prDeliveryDateNew = "";
                var prRequisitionDateNew = "";
                if (prDeliveryDate !== "" && prDeliveryDate !== undefined)
                {
                    var prDeliveryDateArr = prDeliveryDate.split("-");
                    var day = prDeliveryDateArr[2].trim();
                    var month = prDeliveryDateArr[1].trim();
                    var year = prDeliveryDateArr[0].trim();

                    prDeliveryDateNew = day + "." + month + "." + year;
                }
                if (prRequisitionDate !== "" && prRequisitionDate !== undefined)
                {
                    var prRequisitionDateArr = prRequisitionDate.split("-");
                    var day = prRequisitionDateArr[2].trim();
                    var month = prRequisitionDateArr[1].trim();
                    var year = prRequisitionDateArr[0].trim();

                    prRequisitionDateNew = day + "." + month + "." + year;
                }

                poLineItemRow += "<tr>"
                        + "<td><input type=hidden class=PODistribution>\n\
                        <input type=hidden class=POPartialInvoiceIndicator>\n\
                        <input type=hidden class=prTaxCode value='" + POLineItemDataArray[i].TaxCode + "'><i class='fa fa-window-close delete-pr-line' aria-hidden='true'></i>\n\
                        <input type='hidden' class='linkid' value='" + POLineItemDataArray[i].PRLinkID + "'>\n\
                        <input type='hidden' class='prNumber' value='" + POLineItemDataArray[i].PRNumber + "'>\n\
                        <input type='hidden' class='prgLCode'>\n\
                        <input type='hidden' class='przGLCode'>\n\
                        <input type='hidden' class='isLineLevelDataSavedSaved' value='Yes'>\n\
                        <input type='hidden' class='isPrSaved' value='Yes'>\n\
                        <input type='hidden' class='ConfirmationControlForLineInPr'>\n\
                        <input type='hidden' class='TexCodeForLineInPr'>\n\
                        <input type='hidden' class='SegmentForLineInPr'>\n\
                        <input type='hidden' class='prMfrPartNumber'>\n\
                        <input type='hidden' class='prManufacturer'>\n\
                        <input type='hidden' class='prReturnsItemHidden'>\n\
                        <input type='hidden' class='prFreeOfChargeHidden'>\n\
                        <input type='hidden' class='prNetPriceHidden' value='" + (POLineItemDataArray[i].NetPrice === undefined ? "" : Number(POLineItemDataArray[i].NetPrice).toFixed(2)) + "'>\n\
                        <input type='hidden' class='timeOfChangeCurrency' value='before'></td>"
                        + "<td>" + POLineItemDataArray[i].ItemNumber + "</td>"
                        + "<td><input type='text' value='" + POLineItemDataArray[i].AccountAssignment + "' class='accountAssignmentClass form-control form-rounded' style='width:35px;'></td>"
                        + "<td><input type='text' value='" + POLineItemDataArray[i].ItemCategory + "' class='itemCategoryClass form-control form-rounded' style='width:35px;'></td>"
                        + "<td><input type='text' value='" + (POLineItemDataArray[i].MaterialCode === undefined ? "" : POLineItemDataArray[i].MaterialCode) + "' class='materialCodeClass form-control form-rounded' style='width:100px;'></td>"
//                        + "<td><select style='width:150px;' class='custom-select poCriticality' disabled><option value='" + (POLineItemDataArray[i].Criticality === undefined ? "" : POLineItemDataArray[i].Criticality) + "'>Select</option><option value='High Criticality (h)'>High Criticality (h)</option><option value='Low Criticality (l)'>Low Criticality (l)</option><option value='Off Site (o)'>Off Site (o)</option><option value='Manpower (m)'>Manpower (m)</option></select></td>"
                        + "<td><select style='width:150px;' class='custom-select poCriticality' disabled><option value='Off Site (o)'>Off Site (o)</option><option value='High Criticality (h)'>High Criticality (h)</option><option value='Low Criticality (l)'>Low Criticality (l)</option><option value='Off Site (o)'>Off Site (o)</option><option value='Manpower (m)'>Manpower (m)</option></select></td>"
//                        + "<td><input type=text class='form-control form-rounded prShortText' style='width:150px;' value='" + (POLineItemDataArray[i].ShortText === undefined ? "" : POLineItemDataArray[i].ShortText) + "'></td>"
                        + "<td><input type=text class='form-control form-rounded prShortText' style='width:340px;' value='h-ASDA'></td>"
                        + "<td>" + (POLineItemDataArray[i].MaterialLongText === undefined ? "" : POLineItemDataArray[i].MaterialLongText) + "</td>"
                        + "<td><input style='width:150px;' type='text' value='" + (POLineItemDataArray[i].Quantity === undefined ? "" : formatNumberByComma(Number(POLineItemDataArray[i].Quantity).toFixed(3))) + "' min='0' class='form-control form-rounded quantity_Class check-negative-value'></td>"
                        + "<td><input style='width:150px;' type='text' min='0' value='" + (POLineItemDataArray[i].NetPrice === undefined ? "" : formatAmountByComma(Number(POLineItemDataArray[i].NetPrice).toFixed(2))) + "' class='form-control form-rounded prNetPrice check-negative-value'></td>"
                        + "<td><input style='width:150px;' type='text' min='0' value='" + (POLineItemDataArray[i].PriceUnit === undefined ? "" : formatAmountByComma(POLineItemDataArray[i].PriceUnit)) + "' class='form-control form-rounded prPerUnit check-negative-value'></td>"
                        + "<td><input type='text' value='" + (POLineItemDataArray[i].Currency === undefined ? "" : POLineItemDataArray[i].Currency) + "' class='currencyClass form-control form-rounded' style='width:70px;'></td>"
                        + "<td><input type='text' class='prOrderPriceUnit form-control form-rounded' style='width:70px;' value='" + (POLineItemDataArray[i].OPU === undefined ? "" : POLineItemDataArray[i].OPU) + "'></td>"
                        + "<td><input type=text class='form-control form-rounded pODeliveryDateCetegory' value='" + (POLineItemDataArray[i].DeliveryDateCategory === undefined ? "" : POLineItemDataArray[i].DeliveryDateCategory) + "' style='width:35px;'></td>"
                        + "<td><input type='text' style='width:90px;display: inline;' readonly class='requisitionDateClass form-control form-rounded' value='" + prRequisitionDateNew + "'> <input type='hidden' class='prSARequisitionDatepicker'></td>"
                        + "<td><input type='text' style='width:90px;display: inline;' readonly class='deliveryDateClass form-control form-rounded' value='" + prDeliveryDateNew + "'> <input type='hidden' class='prSADeliveryDatepicker'></td>"
                        + "<td><input type='text'  style='width:70px;' class='plantClass form-control form-rounded' value='" + (POLineItemDataArray[i].Plant === undefined ? "" : POLineItemDataArray[i].Plant) + "'></td>"
//                        + "<td><input type='text'  class='matlGroup form-control form-rounded' value='" + (POLineItemDataArray[i].MaterialGroup === undefined ? "" : POLineItemDataArray[i].MaterialGroup) + "'></td>"
                        + "<td><input type='text'  class='matlGroup form-control form-rounded' value='INSM01' style='width:100px;'></td>"
                        + "<td><input type='text'  class='purchaseOrgClass form-control form-rounded' value='" + (POLineItemDataArray[i].PurchasingOrganization === undefined ? "" : POLineItemDataArray[i].PurchasingOrganization) + "' style='width:70px;'></td>"
                        + "<td><input type='text'  class='purchaseGroupClass form-control form-rounded' value='" + (POLineItemDataArray[i].PurchasingGroup === undefined ? "" : POLineItemDataArray[i].PurchasingGroup) + "' style='width:100px;'></td>"
                        + "<td><input type='text'  class='storageLocationClass form-control form-rounded' value='" + (POLineItemDataArray[i].StorageLocation === undefined ? "" : POLineItemDataArray[i].StorageLocation) + "' style='width:100px;'></td>"
                        + "<td></td>"
                        + "<td>" + (POLineItemDataArray[i].InfoRecord === undefined ? "" : POLineItemDataArray[i].InfoRecord) + "</td>"
                        + "<td></td>"
                        + "<td></td>"
                        + "<td><input type='text' value='' class='prDeptNameClass form-control form-rounded' style='width:200px;'></td>"
                        + "<td style='display:none;'><input type='text' value='' class='poDeptNameClass form-control form-rounded'></td>"
                        + "<td></td>"
                        + "<td></td>"
                        + "<td><input type='text' class='trackingNumber form-control form-rounded' value='" + (POLineItemDataArray[i].TrackingNumber === undefined ? "" : POLineItemDataArray[i].TrackingNumber) + "' style='width:70px;'></td>"
//                        + "<td><input type='text' class='trackingNumber form-control form-rounded' value='17'></td>"
                        + "<td>" + parsedJsonPoData.POFetchOP.GeneralData.CompanyCode + "</td>"
                        + "<td><input type = 'text' class = 'prUom form-control form-rounded' style='width:50px;' value='" + (POLineItemDataArray[i].Unit === undefined ? "" : POLineItemDataArray[i].Unit) + "' disabled='true'></td>"
                        + "<td><input type = 'text' class = 'prImMaterial form-control form-rounded' style='width:100px;' readonly value='" + (POLineItemDataArray[i].immaterial === undefined ? "" : POLineItemDataArray[i].immaterial) + "'></td>"
                        + "<td><input type = 'checkbox' class = 'prReturnsItem' " + (POLineItemDataArray[i].returnsitem === undefined ? '' : POLineItemDataArray[i].returnsitem === 'true' ? "checked" : '') + "></td>"
                        + "<td><input type = 'checkbox' class = 'prFreeOfCharge' " + (POLineItemDataArray[i].freeofcharge === undefined ? '' : POLineItemDataArray[i].freeofcharge === 'true' ? "checked" : '') + "></td>"
                        + "<td><input type = 'text' class = 'form-control form-rounded prRfqNo' style='width:150px;' readonly value='" + (POLineItemDataArray[i].RFQ_No === undefined ? "" : POLineItemDataArray[i].RFQ_No) + "'></td>"
                        + "<td><input type = 'text' class = 'form-control form-rounded prRfqItemNo' style='width:70px;' readonly value='" + (POLineItemDataArray[i].RFQ_ItemNo === undefined ? "" : POLineItemDataArray[i].RFQ_ItemNo) + "'></td>"
                        + "</tr>";

            }
            $("#ItemNumberSelect").append(itemNumberSelect);
            $("#material_headerClass tbody").append(poLineItemRow);
            // POLineItemData Ends
        }
        else
        {
            var prJsonObj = {};

            prJsonObj["ItemNumber"] = POLineItemDataArray.ItemNumber;
            prJsonObj["PRItemNumber"] = POLineItemDataArray.PRItemNumber;
            prJsonObj["PackageNo"] = POLineItemDataArray.PackageNo;
            prJsonObj["LinkId"] = POLineItemDataArray.PRLinkID;

            PRLineItemArray.push(prJsonObj);

            var prLineItemCategory = POLineItemDataArray.ItemCategory;
            if (prLineItemCategory !== "D")
            {
                $("#serviceTab_li").css("display", "none");
                $("#limits_li").css("display", "none");

                $("#prType").val("Material");

                $("#services-tab").removeClass("active");
//                $("#quantities").addClass("active");
//                $("#quantities-tab").addClass("active");
                $("#material_linelevel").addClass("active");
                $("#material_linelevel-tab").addClass("active");

//                prType = "Capital PR for Materials";
            }
            else
            {
                $("#prType").val("Service");
//                prType = "Capital PR for Services";
            }

            var prDeliveryDate = POLineItemDataArray.DeliveryDate;
            var prRequisitionDate = POLineItemDataArray.RequisitionDate;
            var prDeliveryDateNew = "";
            var prRequisitionDateNew = "";
            if (prDeliveryDate !== "" && prDeliveryDate !== undefined)
            {
                var prDeliveryDateArr = prDeliveryDate.split("-");
                var day = prDeliveryDateArr[2].trim();
                var month = prDeliveryDateArr[1].trim();
                var year = prDeliveryDateArr[0].trim();

                prDeliveryDateNew = day + "." + month + "." + year;
            }
            if (prRequisitionDate !== "" && prRequisitionDate !== undefined)
            {
                var prRequisitionDateArr = prRequisitionDate.split("-");
                var day = prRequisitionDateArr[2].trim();
                var month = prRequisitionDateArr[1].trim();
                var year = prRequisitionDateArr[0].trim();

                prRequisitionDateNew = day + "." + month + "." + year;
            }

            Ref_Doc_Number += "<option>" + POLineItemDataArray.PRNumber + "</option>";
            Ref_Doc_Line += "<option>" + POLineItemDataArray.PRItemNumber + "</option>";
            itemNumberSelect += "<option value='" + (POLineItemDataArray.ItemNumber) + "'>" + POLineItemDataArray.ItemNumber + "</option>";
//            alert("POLineItemDataArray.TrackingNumber :" + POLineItemDataArray.TrackingNumber);
            poLineItemRow = "<tr>"
                    + "<td><input type=hidden class=PODistribution>\n\
                        <input type=hidden class=POPartialInvoiceIndicator>\n\
                        <input type=hidden class=prTaxCode value='" + POLineItemDataArray.TaxCode + "'><i class='fa fa-window-close delete-pr-line' aria-hidden='true'></i>\n\
                        <input type='hidden' class='linkid' value='" + POLineItemDataArray.PRLinkID + "'>\n\
                        <input type='hidden' class='prNumber' value='" + POLineItemDataArray.PRNumber + "'>\n\
                        <input type='hidden' class='prgLCode'>\n\
                        <input type='hidden' class='przGLCode'>\n\
                        <input type='hidden' class='isLineLevelDataSavedSaved' value='Yes'>\n\
                        <input type='hidden' class='isPrSaved' value='Yes'>\n\
                        <input type='hidden' class='ConfirmationControlForLineInPr'>\n\
                        <input type='hidden' class='TexCodeForLineInPr'>\n\
                        <input type='hidden' class='SegmentForLineInPr'>\n\
                        <input type='hidden' class='prMfrPartNumber'>\n\
                        <input type='hidden' class='prManufacturer'>\n\
                        <input type='hidden' class='prReturnsItemHidden'>\n\
                        <input type='hidden' class='prFreeOfChargeHidden'>\n\
                        <input type='hidden' class='prNetPriceHidden' value='" + (POLineItemDataArray.NetPrice === undefined ? "" : Number(POLineItemDataArray.NetPrice).toFixed(2)) + "'>\n\
                        <input type='hidden' class='timeOfChangeCurrency' value='before'></td>"
                    + "<td>" + POLineItemDataArray.ItemNumber + "</td>"
                    + "<td><input type='text' value='" + POLineItemDataArray.AccountAssignment + "' class='accountAssignmentClass form-control form-rounded' style='width:35px;'></td>"
                    + "<td><input type='text' value='" + POLineItemDataArray.ItemCategory + "' class='itemCategoryClass form-control form-rounded' style='width:35px;'></td>"
                    + "<td><input type='text' value='" + (POLineItemDataArray.MaterialCode === undefined ? "" : POLineItemDataArray.MaterialCode) + "' class='materialCodeClass form-control form-rounded' style='width:100px;'></td>"
                    + "<td><select style='width:150px;' class='custom-select poCriticality' disabled><option value='" + (POLineItemDataArray.Criticality === undefined ? "" : POLineItemDataArray.Criticality) + "'>Select</option><option value='High Criticality (h)'>High Criticality (h)</option><option value='Low Criticality (l)'>Low Criticality (l)</option><option value='Off Site (o)'>Off Site (o)</option><option value='Manpower (m)'>Manpower (m)</option></select></td>"
                    + "<td><input type=text class='form-control form-rounded prShortText' style='width:340px;' value='" + (POLineItemDataArray.ShortText === undefined ? "" : POLineItemDataArray.ShortText) + "'></td>"
                    + "<td>" + (POLineItemDataArray.MaterialLongText === undefined ? "" : POLineItemDataArray.MaterialLongText) + "</td>"
                    + "<td><input style='width:150px;' type='text' value='" + (POLineItemDataArray.Quantity === undefined ? "" : formatNumberByComma(Number(POLineItemDataArray.Quantity).toFixed(3))) + "' min='0' class='form-control form-rounded quantity_Class check-negative-value'></td>"
                    + "<td><input style='width:150px;' type='text' min='0' value='" + (POLineItemDataArray.NetPrice === undefined ? "" : formatAmountByComma(Number(POLineItemDataArray.NetPrice).toFixed(2))) + "' class='form-control form-rounded prNetPrice check-negative-value'></td>"
                    + "<td><input style='width:150px;' type='text' min='0' value='" + (POLineItemDataArray.PriceUnit === undefined ? "" : formatAmountByComma(POLineItemDataArray.PriceUnit)) + "' class='form-control form-rounded prPerUnit check-negative-value'></td>"
                    + "<td><input type='text' value='" + (POLineItemDataArray.Currency === undefined ? "" : POLineItemDataArray.Currency) + "' class='currencyClass form-control form-rounded' style='width:70px;'></td>"
                    + "<td><input type='text' class='prOrderPriceUnit form-control form-rounded' style='width:70px;' value='" + (POLineItemDataArray.OPU === undefined ? "" : POLineItemDataArray.OPU) + "'></td>"
                    + "<td><input type=text class='form-control form-rounded pODeliveryDateCetegory' value='" + (POLineItemDataArray.DeliveryDateCategory === undefined ? "" : POLineItemDataArray.DeliveryDateCategory) + "' style='width:35px;'></td>"
                    + "<td><input type='text' style='width:90px;display: inline;' readonly class='requisitionDateClass form-control form-rounded' value='" + prRequisitionDateNew + "'> <input type='hidden' class='prSARequisitionDatepicker'></td>"
                    + "<td><input type='text' style='width:90px;display: inline;' readonly class='deliveryDateClass form-control form-rounded' value='" + prDeliveryDateNew + "'> <input type='hidden' class='prSADeliveryDatepicker'></td>"
                    + "<td><input type='text' style='width:70px;' class='plantClass form-control form-rounded' value='" + (POLineItemDataArray.Plant === undefined ? "" : POLineItemDataArray.Plant) + "'></td>"
                    + "<td><input type='text' class='matlGroup form-control form-rounded' value='" + (POLineItemDataArray.MaterialGroup === undefined ? "" : POLineItemDataArray.MaterialGroup) + "' style='width:100px;'></td>"
                    + "<td><input type='text' class='purchaseOrgClass form-control form-rounded' value='" + (POLineItemDataArray.PurchasingOrganization === undefined ? "" : POLineItemDataArray.PurchasingOrganization) + "' style='width:70px;'></td>"
                    + "<td><input type='text' class='purchaseGroupClass form-control form-rounded' value='" + (POLineItemDataArray.PurchasingGroup === undefined ? "" : POLineItemDataArray.PurchasingGroup) + "' style='width:100px;'></td>"
                    + "<td><input type='text' class='storageLocationClass form-control form-rounded' value='" + (POLineItemDataArray.StorageLocation === undefined ? "" : POLineItemDataArray.StorageLocation) + "' style='width:100px;'></td>"
                    + "<td></td>"
                    + "<td>" + (POLineItemDataArray.InfoRecord === undefined ? "" : POLineItemDataArray.InfoRecord) + "</td>"
                    + "<td></td>"
                    + "<td></td>"
                    + "<td><input type='text' value='' class='prDeptNameClass form-control form-rounded' style='width:200px;'></td>"
                    + "<td style='display:none;'><input type='text' value='' class='poDeptNameClass form-control form-rounded'></td>"
                    + "<td></td>"
                    + "<td></td>"
                    + "<td><input type='text' class='trackingNumber form-control form-rounded' value='" + (POLineItemDataArray.TrackingNumber === undefined ? "" : POLineItemDataArray.TrackingNumber) + "' style='width:70px;'></td>"
                    + "<td>" + parsedJsonPoData.POFetchOP.GeneralData.CompanyCode + "</td>"
                    + "<td><input type = 'text' class = 'prUom form-control form-rounded' style='width:50px;' value='" + (POLineItemDataArray.Unit === undefined ? "" : POLineItemDataArray.Unit) + "' disabled='true'></td>"
                    + "<td><input type = 'text' class = 'prImMaterial form-control form-rounded' style = 'width:100px;' value='" + (POLineItemDataArray.immaterial === undefined ? "" : POLineItemDataArray.immaterial) + "'></td>"
                    + "<td><input type = 'checkbox' class = 'prReturnsItem' " + (POLineItemDataArray.returnsitem === undefined ? "" : POLineItemDataArray.returnsitem === 'true' ? "checked" : "") + "></td>"
                    + "<td><input type = 'checkbox' class = 'prFreeOfCharge' " + (POLineItemDataArray.freeofcharge === undefined ? "" : POLineItemDataArray.freeofcharge === 'true' ? "checked" : "") + "></td>"
                    + "<td><input type = 'text' class = 'form-control form-rounded prRfqNo' style = 'width:150px;' readonly value='" + (POLineItemDataArray.RFQ_No === undefined ? "" : POLineItemDataArray.RFQ_No) + "'></td>"
                    + "<td><input type = 'text' class = 'form-control form-rounded prRfqItemNo' style = 'width:70px;' readonly value='" + (POLineItemDataArray.RFQ_ItemNo === undefined ? "" : POLineItemDataArray.RFQ_ItemNo) + "'></td>"
                    + "</tr>";

            $("#ItemNumberSelect").append(itemNumberSelect);
            $("#material_headerClass tbody").append(poLineItemRow);
        }
        $('.prSARequisitionDatepicker').each(function() {
            $(this).datepicker({
                showOn: "button",
                buttonText: "<i class='fa fa-calendar' aria-hidden='true'></i>",
                minDate: 0,
//                dateFormat: 'mm-yy',
                changeMonth: true,
                changeYear: true,
                yearRange: '2020:2050',
                showWeek: true
            });
        });
        $('.prSADeliveryDatepicker').each(function() {
            $(this).datepicker({
                showOn: "button",
                buttonText: "<i class='fa fa-calendar' aria-hidden='true'></i>",
                minDate: 0,
                //                dateFormat: 'mm-yy',
                changeMonth: true,
                changeYear: true,
                yearRange: '2020:2050',
                showWeek: true
            });
        });

        hidePoLineTableColsByPoType();
        hideDeliveryTabFieldsByPoType();

//        $("#material_headerClass tbody tr").each(function() {
//            var quantity = $(this).find("td").eq(8).children(".quantity_Class").val();
//            var netprice = $(this).find("td").eq(9).children(".prNetPrice").val();
//            var prPerUnit = $(this).find("td").eq(10).children(".prPerUnit").val();
//            $(this).find("td").eq(8).children(".quantity_Class").val(Number(quantity).toFixed(2));
//            $(this).find("td").eq(9).children(".prNetPrice").val(Number(netprice).toFixed(2));
//            $(this).find("td").eq(10).children(".prPerUnit").val(Number(prPerUnit).toFixed(2));
//        });
        $("#referenceDocNumber").append(Ref_Doc_Number);
        $("#referenceDocLine").append(Ref_Doc_Line);

        // Enable and disable fields
        var typeOfPOHeader = $("#typeOfPOHeader").val();
        var prType = $("#prType").val();
        if (prType === "Service") {
            $("#material_headerClass tbody tr").each(function() {
                $(this).find("td").eq(5).children(".poCriticality").prop("disabled", false);
                $(this).find("td").eq(4).children(".materialCodeClass").prop("disabled", true);
                $(this).find("td").eq(9).children(".prNetPrice").prop("disabled", true);
            });
        } else if (prType === "Material") {
            $("#material_headerClass tbody tr").each(function() {
                $(this).find("td").eq(17).children(".matlGroup").prop("disabled", true);
                $(this).find("td").eq(16).children(".plantClass").prop("disabled", true);
                $(this).find("td").eq(20).children(".storageLocationClass").prop("disabled", true);
                if (typeOfPOHeader === "Ferrous PO - Local") {
                    $(this).find("td").eq(20).children(".storageLocationClass").prop("disabled", false);
                }
            });
        }
    }
    // POLineItemData Ends

    console.log("PRLineItemArray.length: " + PRLineItemArray.length);

    // Localhost
//    $("#overlay").css("display", "none");
//    
//    $("#TempAttachmentId").val("1");

    var poNumber = $("#poNumber").val();
    getExtPOCreationIdByPONumber(poNumber);
    $("#reqDataSavedOnPoNumer").val("FromPONumber");
    $.ajax({
        url: saveHeadersa("PONumber"),
        success: function() {
            var poNumber = $("#poNumber").val();
            setTimeout(
                    function()
                    {
                        savePrLineLevelData(poNumber);
                    }
            , 500);
        }
    });
}


function findVendorByCompanyCodeEdit(vendorCode, companyCodeHeader)
{
    var SchemaGroup = "";
    var PruchaseOrg = "";
    $("#vendorcodeHeader option").remove();
//    var companyCodeHeader = $("#companycodeHeader").val();
    console.log("companyCodeHeader: " + companyCodeHeader);
    $.ajax({
        type: "GET",
        url: "poajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "FindVendorByCompanyCode",
            "companyCode": companyCodeHeader
        },
        complete: function(responseJson) {
            var jsonVendorArr = $.parseJSON(responseJson.responseText);
            console.log("jsonVendorArr lengtth :" + jsonVendorArr.length);
            jsonVendorArr = JSON.parse(JSON.stringify(jsonVendorArr));
            var vendorSno = "";

            if (jsonVendorArr.length !== 0) {
//                var option = "";
                for (var i = 0; i < jsonVendorArr.length; i++) {
                    if (vendorCode === jsonVendorArr[i].vendorCode)
                    {
                        vendorSno = jsonVendorArr[i].sno;
                        SchemaGroup = jsonVendorArr[i].schemaGroup;
                        PruchaseOrg = jsonVendorArr[i].purOrg;
                        
                        $("#vendorSno").val(vendorSno);
                        $("#vendorcodeHeader").val(jsonVendorArr[i].vendorName + "-" + jsonVendorArr[i].vendorCode);
                    }
//                    option += "<option value='" + jsonVendorArr[i].sno + "'>" + jsonVendorArr[i].vendorName + "-" + jsonVendorArr[i].vendorCode + "</option>";
                }
//                $("#vendorcodeHeader").append(option);
//                $('.selectpicker').selectpicker('refresh');
                console.log("Set vendor================");

                if (vendorCode !== "")
                {
//                    $("#vendorcodeHeader").val(vendorSno);
//                    $('.selectpicker').selectpicker('refresh');
                }
            }
            $.ajax({
                type: "GET",
                url: "standalonepoajaxrequest.do",
                async: false,
                data: {
                    "reqFrom": "findKalsmBySchemaGroupAndPurchaseOrg",
                    "SchemaGroup": SchemaGroup,
                    "PruchaseOrg": PruchaseOrg
                },
                complete: function(responseJson) {
                    var obj = $.parseJSON(responseJson.responseText);
//                        alert(obj.kalsm);
                    $("#kalsmHiddenfield").val(obj.kalsm);
                }
            });
        }
    });
}

function savePrLineLevelData(poNumber) {

    var ItemNumber = "";
    var POLineItemDataLinkId = "";
    var formJSON = "[[";
    var formQtyWeightJSON = "[";

    var poid = $("#poid").val();


    var prLen = "";
//    alert("poNumber :" + poNumber);
    if (poNumber !== "") {
        var POLineLevelDataAsJson = {};
        POLineLevelDataAsJson["PoId"] = poid.toString().trim();

        var POInvoiceDataJsonArray = [];
        var POServiceDataJsonArray = [];
        var POLineItemConditionDataJsonArray = [];
        var POAccAssDataJsonArray = [];
        var PODeliveryAddressDataJsonArray = [];
        var PODeliveryDataJsonArray = [];
        var POConfirmationDataJsonArray = [];
        var POCondCtrlDataJsonArray = [];
        var POServiceAccAssDataJsonArray = [];
        var POQuantityWeightsDataJsonArray = [];
        var PODeliveryScheduleDataJsonArray = [];
        var POLimitsDataJsonArray = [];
        var POTextsDataJsonArray = [];
        var POLineItemCustomerDataJsonArray = [];
        var POMaterialDataJsonArray = [];
        var POComponentsDataJsonArray = [];
        var POProfitabilitySegmentDetailsDataJsonArray = [];

        var prType = $("#prType").val();
        $("#material_headerClass tbody tr").each(function(index) {
//            alert("In savePrLineLevelData");
            //POInvoiceData Starts=============
            var POInvoiceDataArray = parsedJsonPoData.POFetchOP.POInvoiceData;
            var POLineItemDataLinkId = $(this).find("td").eq(0).children(".linkid").val();
            console.log("POLineItemDataLinkId: " + POLineItemDataLinkId);
            var PrLineItemPackageNo = $(this).find("td").eq(0).children(".POLineItemPackageNo").val();
            var itemNumber = $(this).find("td").eq(1).text();
            var PrInsertionOrderId = $(this).find("td").eq(0).children(".insertionOrderId_Class").val();
            var PrAccAss = $(this).find("td").eq(2).children(".accountAssignmentClass").val();

            console.log("POInvoiceDataArray: " + POInvoiceDataArray);
            console.log("POInvoiceDataArray is Array: " + Array.isArray(POInvoiceDataArray));
            if (POInvoiceDataArray !== undefined) {
                if (Array.isArray(POInvoiceDataArray) === true) {
                    console.log("POInvoiceDataArray len: " + POInvoiceDataArray.length);
                    for (var i = 0; i < POInvoiceDataArray.length; i++)
                    {
                        console.log("POInvoiceDataArray[i].LinkId: " + POInvoiceDataArray[i].LinkId);
                        if (POLineItemDataLinkId === POInvoiceDataArray[i].LinkId)
                        {
                            var POInoiceDataJsonObject = {};


                            POInoiceDataJsonObject["TaxCode"] = POInvoiceDataArray[i].TaxCode;
                            POInoiceDataJsonObject["DPCategory"] = POInvoiceDataArray[i].DPCategory;
                            POInoiceDataJsonObject["InvoiceReceipt"] = POInvoiceDataArray[i].InvoiceReceipt;
                            POInoiceDataJsonObject["FinalInvoice"] = POInvoiceDataArray[i].FinalInvoice;
                            POInoiceDataJsonObject["GRBasedIV"] = POInvoiceDataArray[i].GRBasedIV;
                            POInoiceDataJsonObject["ItemNumber"] = POInvoiceDataArray[i].ItemNumber;
//                            POInoiceDataJsonObject["LineItemNumber"] = PrInsertionOrderId;
                            POInoiceDataJsonObject["LinkId"] = POInvoiceDataArray[i].LinkId;

                            POInvoiceDataJsonArray.push(POInoiceDataJsonObject);

                            POLineLevelDataAsJson["itemId"] = POInvoiceDataArray[i].ItemNumber;
                        }
                    }
                }
                else
                {
                    if (POLineItemDataLinkId === POInvoiceDataArray.LinkId)
                    {
                        var POInoiceDataJsonObject = {};

                        POInoiceDataJsonObject["TaxCode"] = POInvoiceDataArray.TaxCode;
                        POInoiceDataJsonObject["DPCategory"] = POInvoiceDataArray.DPCategory;
                        POInoiceDataJsonObject["InvoiceReceipt"] = POInvoiceDataArray.InvoiceReceipt;
                        POInoiceDataJsonObject["FinalInvoice"] = POInvoiceDataArray.FinalInvoice;
                        POInoiceDataJsonObject["GRBasedIV"] = POInvoiceDataArray.GRBasedIV;
                        POInoiceDataJsonObject["ItemNumber"] = POInvoiceDataArray.ItemNumber;
//                        POInoiceDataJsonObject["LineItemNumber"] = PrInsertionOrderId;
                        POInoiceDataJsonObject["LinkId"] = POInvoiceDataArray.LinkId;

                        POInvoiceDataJsonArray.push(POInoiceDataJsonObject);
                        POLineLevelDataAsJson["itemId"] = POInvoiceDataArray.ItemNumber;
                    }
                }
            }

            console.log("POInvoiceDataJsonArray len: " + POInvoiceDataJsonArray.length);
            //POInvoiceData Ends
            // PODeliveryAddressData Starts

            var PODeliveryAddressDataArray = parsedJsonPoData.POFetchOP.PODeliveryAddressData;
            console.log("PODeliveryAddressDataArray: " + PODeliveryAddressDataArray);
            console.log("PODeliveryAddressDataArray is Array: " + Array.isArray(PODeliveryAddressDataArray));

            if (PODeliveryAddressDataArray !== undefined) {
                if (Array.isArray(PODeliveryAddressDataArray) === true) {
                    console.log("PODeliveryAddressDataArray len: " + PODeliveryAddressDataArray.length);
                    for (var i = 0; i < PODeliveryAddressDataArray.length; i++)
                    {
//                        alert("PODeliveryAddressDataArray[i].LinkId :" + PODeliveryAddressDataArray[i].LinkId + "POLineItemDataLinkId :" + POLineItemDataLinkId);
                        if (POLineItemDataLinkId === PODeliveryAddressDataArray[i].LinkId)
                        {
                            var PODeliveryAddressDataAsJsonObject = {};

                            PODeliveryAddressDataAsJsonObject["LinkId"] = PODeliveryAddressDataArray[i].LinkId;
                            PODeliveryAddressDataAsJsonObject["ItemNo"] = PODeliveryAddressDataArray[i].ItemNo;
                            PODeliveryAddressDataAsJsonObject["Name1"] = PODeliveryAddressDataArray[i].Name1;
                            PODeliveryAddressDataAsJsonObject["Name2"] = PODeliveryAddressDataArray[i].Name2;
                            PODeliveryAddressDataAsJsonObject["Street"] = PODeliveryAddressDataArray[i].Street;
                            PODeliveryAddressDataAsJsonObject["HouseNo"] = PODeliveryAddressDataArray[i].HouseNo;
                            PODeliveryAddressDataAsJsonObject["PostalCode"] = PODeliveryAddressDataArray[i].PostalCode;
                            PODeliveryAddressDataAsJsonObject["City"] = PODeliveryAddressDataArray[i].City;
                            PODeliveryAddressDataAsJsonObject["Country"] = PODeliveryAddressDataArray[i].Country;
                            PODeliveryAddressDataAsJsonObject["Title"] = PODeliveryAddressDataArray[i].Title;

//                            PODeliveryAddressDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;

                            PODeliveryAddressDataJsonArray.push(PODeliveryAddressDataAsJsonObject);
                        }
                    }
                }
                else {
                    if (POLineItemDataLinkId === PODeliveryAddressDataArray.LinkId)
                    {
                        var PODeliveryAddressDataAsJsonObject = {};

                        PODeliveryAddressDataAsJsonObject["LinkId"] = PODeliveryAddressDataArray.LinkId;
                        PODeliveryAddressDataAsJsonObject["ItemNo"] = PODeliveryAddressDataArray.ItemNo;
                        PODeliveryAddressDataAsJsonObject["Name1"] = PODeliveryAddressDataArray.Name1;
                        PODeliveryAddressDataAsJsonObject["Name2"] = PODeliveryAddressDataArray.Name2;
                        PODeliveryAddressDataAsJsonObject["Street"] = PODeliveryAddressDataArray.Street;
                        PODeliveryAddressDataAsJsonObject["HouseNo"] = PODeliveryAddressDataArray.HouseNo;
                        PODeliveryAddressDataAsJsonObject["PostalCode"] = PODeliveryAddressDataArray.PostalCode;
                        PODeliveryAddressDataAsJsonObject["City"] = PODeliveryAddressDataArray.City;
                        PODeliveryAddressDataAsJsonObject["Country"] = PODeliveryAddressDataArray.Country;
                        PODeliveryAddressDataAsJsonObject["Title"] = PODeliveryAddressDataArray.Title;

//                        PODeliveryAddressDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;

                        PODeliveryAddressDataJsonArray.push(PODeliveryAddressDataAsJsonObject);
                    }
                }
            }

            // PODeliveryAddressData Ends

            // PODeliveryData Starts
            var PODeliveryDataArray = parsedJsonPoData.POFetchOP.PODeliveryData;
            console.log("PODeliveryDataArray: " + PODeliveryDataArray);
            console.log("PODeliveryDataArray is Array: " + Array.isArray(PODeliveryDataArray));
            if (PODeliveryDataArray !== undefined) {
                if (Array.isArray(PODeliveryDataArray) === true) {
                    console.log("PODeliveryDataArray len: " + PODeliveryDataArray.length);
                    for (var i = 0; i < PODeliveryDataArray.length; i++)
                    {
                        if (POLineItemDataLinkId === PODeliveryDataArray[i].LinkId)
                        {
                            var PODeliveryDataAsJsonObject = {};

                            PODeliveryDataAsJsonObject["LinkId"] = PODeliveryDataArray[i].LinkId;
                            PODeliveryDataAsJsonObject["ItemNumber"] = PODeliveryDataArray[i].ItemNumber;
                            PODeliveryDataAsJsonObject["OverDelTol"] = PODeliveryDataArray[i].OverDelTol;
                            PODeliveryDataAsJsonObject["UnderDelTol"] = PODeliveryDataArray[i].UnderDelTol;
                            PODeliveryDataAsJsonObject["ShippingInstructions"] = PODeliveryDataArray[i].ShippingInstructions;
                            PODeliveryDataAsJsonObject["StockType"] = PODeliveryDataArray[i].StockType;
                            PODeliveryDataAsJsonObject["FstRem_Exped"] = PODeliveryDataArray[i].FstRem_Exped;
                            PODeliveryDataAsJsonObject["SecRem_Exped"] = PODeliveryDataArray[i].SecRem_Exped;
                            PODeliveryDataAsJsonObject["ThrdRem_Exped"] = PODeliveryDataArray[i].ThrdRem_Exped;
                            PODeliveryDataAsJsonObject["ValuationType"] = PODeliveryDataArray[i].ValuationType;
                            PODeliveryDataAsJsonObject["RemShelfLife"] = PODeliveryDataArray[i].RemShelfLife;
                            PODeliveryDataAsJsonObject["QAControlLife"] = PODeliveryDataArray[i].QAControlLife;
                            PODeliveryDataAsJsonObject["GrProcTime"] = PODeliveryDataArray[i].GrProcTime;
                            PODeliveryDataAsJsonObject["PlDelTime"] = PODeliveryDataArray[i].PlDelTime;
                            PODeliveryDataAsJsonObject["IncoTerms1"] = PODeliveryDataArray[i].IncoTerms1;
                            PODeliveryDataAsJsonObject["GRNonVal"] = PODeliveryDataArray[i].GRNonVal;
                            PODeliveryDataAsJsonObject["DelvCompleted"] = PODeliveryDataArray[i].DelvCompleted;
                            PODeliveryDataAsJsonObject["NoExpend"] = PODeliveryDataArray[i].NoExpend;
                            PODeliveryDataAsJsonObject["GoodsReceipt"] = PODeliveryDataArray[i].GoodsReceipt;

//                        PODeliveryDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;

                            PODeliveryDataJsonArray.push(PODeliveryDataAsJsonObject);
                        }
                    }
                }
                else {
                    if (POLineItemDataLinkId === PODeliveryDataArray.LinkId)
                    {
                        var PODeliveryDataAsJsonObject = {};

                        PODeliveryDataAsJsonObject["LinkId"] = PODeliveryDataArray.LinkId;
                        PODeliveryDataAsJsonObject["ItemNumber"] = PODeliveryDataArray.ItemNumber;
                        PODeliveryDataAsJsonObject["OverDelTol"] = PODeliveryDataArray.OverDelTol;
                        PODeliveryDataAsJsonObject["UnderDelTol"] = PODeliveryDataArray.UnderDelTol;
                        PODeliveryDataAsJsonObject["ShippingInstructions"] = PODeliveryDataArray.ShippingInstructions;
                        PODeliveryDataAsJsonObject["StockType"] = PODeliveryDataArray.StockType;
                        PODeliveryDataAsJsonObject["FstRem_Exped"] = PODeliveryDataArray.FstRem_Exped;
                        PODeliveryDataAsJsonObject["SecRem_Exped"] = PODeliveryDataArray.SecRem_Exped;
                        PODeliveryDataAsJsonObject["ThrdRem_Exped"] = PODeliveryDataArray.ThrdRem_Exped;
                        PODeliveryDataAsJsonObject["ValuationType"] = PODeliveryDataArray.ValuationType;
                        PODeliveryDataAsJsonObject["RemShelfLife"] = PODeliveryDataArray.RemShelfLife;
                        PODeliveryDataAsJsonObject["QAControlLife"] = PODeliveryDataArray.QAControlLife;
                        PODeliveryDataAsJsonObject["GrProcTime"] = PODeliveryDataArray.GrProcTime;
                        PODeliveryDataAsJsonObject["PlDelTime"] = PODeliveryDataArray.PlDelTime;
                        PODeliveryDataAsJsonObject["IncoTerms1"] = PODeliveryDataArray.IncoTerms1;
                        PODeliveryDataAsJsonObject["GRNonVal"] = PODeliveryDataArray.GRNonVal;
                        PODeliveryDataAsJsonObject["DelvCompleted"] = PODeliveryDataArray.DelvCompleted;
                        PODeliveryDataAsJsonObject["NoExpend"] = PODeliveryDataArray.NoExpend;
                        PODeliveryDataAsJsonObject["GoodsReceipt"] = PODeliveryDataArray.GoodsReceipt;

//                    PODeliveryDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;

                        PODeliveryDataJsonArray.push(PODeliveryDataAsJsonObject);
                    }
                }
            }


            // PODeliveryData Ends

            // PODeliveryScheduleData Ends

            // POLimitsData Starts
            var POLimitsDataArray = parsedJsonPoData.POFetchOP.POLimitsData;
            console.log("POLimitsDataArray: " + POLimitsDataArray);
            console.log("POLimitsDataArray is Array: " + Array.isArray(POLimitsDataArray));
            if (POLimitsDataArray !== undefined) {
                if (Array.isArray(POLimitsDataArray) === true)
                {
                    console.log("POLimitsDataArray len: " + POLimitsDataArray.length);
                    for (var i = 0; i < POLimitsDataArray.length; i++)
                    {
                        if (POLineItemDataLinkId === POLimitsDataArray[i].LinkId)
                        {
                            var POLimitsDataAsJsonObject = {};

                            POLimitsDataAsJsonObject["ItemNumber"] = POLimitsDataArray[i].ItemNumber;
                            POLimitsDataAsJsonObject["LinkId"] = POLimitsDataArray[i].LinkId;
                            POLimitsDataAsJsonObject["OverallLimit"] = POLimitsDataArray[i].OverallLimit;
                            POLimitsDataAsJsonObject["ExpectedValue"] = POLimitsDataArray[i].ExpectedValue;
                            POLimitsDataAsJsonObject["NoLimit"] = POLimitsDataArray[i].NoLimit;

//                            POLimitsDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;

                            POLimitsDataJsonArray.push(POLimitsDataAsJsonObject);
                        }
                    }
                }
                else
                {
                    if (POLineItemDataLinkId === POLimitsDataArray.LinkId)
                    {
                        var POLimitsDataAsJsonObject = {};

                        POLimitsDataAsJsonObject["ItemNumber"] = POLimitsDataArray.ItemNumber;
                        POLimitsDataAsJsonObject["LinkId"] = POLimitsDataArray.LinkId;
                        POLimitsDataAsJsonObject["OverallLimit"] = POLimitsDataArray.OverallLimit;
                        POLimitsDataAsJsonObject["ExpectedValue"] = POLimitsDataArray.ExpectedValue;
                        POLimitsDataAsJsonObject["NoLimit"] = POLimitsDataArray.NoLimit;

//                        POLimitsDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;

                        POLimitsDataJsonArray.push(POLimitsDataAsJsonObject);
                    }
                }
            }
            // POLimitsData Ends

            // POQuantityWeightsData Starts 
            var POQuantityWeightsDataArray = parsedJsonPoData.POFetchOP.POQuantityWeightsData;
            console.log("POQuantityWeightsDataArray: " + POQuantityWeightsDataArray);
            console.log("POQuantityWeightsDataArray is Array: " + Array.isArray(POQuantityWeightsDataArray));
            if (POQuantityWeightsDataArray !== undefined) {
                if (Array.isArray(POQuantityWeightsDataArray) === true)
                {
                    console.log("POQuantityWeightsDataArray len: " + POQuantityWeightsDataArray.length);
                    for (var i = 0; i < POQuantityWeightsDataArray.length; i++)
                    {
                        if (POLineItemDataLinkId === POQuantityWeightsDataArray[i].LinkID)
                        {
                            var POQuantityWeightsDataAsJsonObject = {};

                            POQuantityWeightsDataAsJsonObject["LinkId"] = POQuantityWeightsDataArray[i].LinkID;
                            POQuantityWeightsDataAsJsonObject["ItemNumber"] = POQuantityWeightsDataArray[i].ItemNumber;
                            POQuantityWeightsDataAsJsonObject["POQuantity"] = POQuantityWeightsDataArray[i].POQuantity;
                            POQuantityWeightsDataAsJsonObject["POQuantityUnit"] = POQuantityWeightsDataArray[i].POQuantityUnit;
                            POQuantityWeightsDataAsJsonObject["POQuantitySKU"] = POQuantityWeightsDataArray[i].POQuantitySKU;
                            POQuantityWeightsDataAsJsonObject["POQuantitySKUUnit"] = POQuantityWeightsDataArray[i].POQuantitySKUUnit;
                            POQuantityWeightsDataAsJsonObject["Order1"] = POQuantityWeightsDataArray[i].Order1;
                            POQuantityWeightsDataAsJsonObject["OrderUnit1"] = POQuantityWeightsDataArray[i].OrderUnit1;
                            POQuantityWeightsDataAsJsonObject["Order2"] = POQuantityWeightsDataArray[i].Order2;
                            POQuantityWeightsDataAsJsonObject["OrderUnit2"] = POQuantityWeightsDataArray[i].OrderUnit2;
                            POQuantityWeightsDataAsJsonObject["OrderPrice"] = POQuantityWeightsDataArray[i].OrderPrice;
                            POQuantityWeightsDataAsJsonObject["OrderPriceUnit"] = POQuantityWeightsDataArray[i].OrderPriceUnit;
                            POQuantityWeightsDataAsJsonObject["SKU"] = POQuantityWeightsDataArray[i].SKU;
                            POQuantityWeightsDataAsJsonObject["SKUUnit"] = POQuantityWeightsDataArray[i].SKUUnit;

//                            POQuantityWeightsDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;

                            POQuantityWeightsDataJsonArray.push(POQuantityWeightsDataAsJsonObject);
                        }
                    }
                }
                else
                {
                    if (POLineItemDataLinkId === POQuantityWeightsDataArray.LinkID)
                    {
                        var POQuantityWeightsDataAsJsonObject = {};

                        POQuantityWeightsDataAsJsonObject["LinkId"] = POQuantityWeightsDataArray.LinkID;
                        POQuantityWeightsDataAsJsonObject["ItemNumber"] = POQuantityWeightsDataArray.ItemNumber;
                        POQuantityWeightsDataAsJsonObject["POQuantity"] = POQuantityWeightsDataArray.POQuantity;
                        POQuantityWeightsDataAsJsonObject["POQuantityUnit"] = POQuantityWeightsDataArray.POQuantityUnit;
                        POQuantityWeightsDataAsJsonObject["POQuantitySKU"] = POQuantityWeightsDataArray.POQuantitySKU;
                        POQuantityWeightsDataAsJsonObject["POQuantitySKUUnit"] = POQuantityWeightsDataArray.POQuantitySKUUnit;
                        POQuantityWeightsDataAsJsonObject["Order1"] = POQuantityWeightsDataArray.Order1;
                        POQuantityWeightsDataAsJsonObject["OrderUnit1"] = POQuantityWeightsDataArray.OrderUnit1;
                        POQuantityWeightsDataAsJsonObject["Order2"] = POQuantityWeightsDataArray.Order2;
                        POQuantityWeightsDataAsJsonObject["OrderUnit2"] = POQuantityWeightsDataArray.OrderUnit2;
                        POQuantityWeightsDataAsJsonObject["OrderPrice"] = POQuantityWeightsDataArray.OrderPrice;
                        POQuantityWeightsDataAsJsonObject["OrderPriceUnit"] = POQuantityWeightsDataArray.OrderPriceUnit;
                        POQuantityWeightsDataAsJsonObject["SKU"] = POQuantityWeightsDataArray.SKU;
                        POQuantityWeightsDataAsJsonObject["SKUUnit"] = POQuantityWeightsDataArray.SKUUnit;

//                        POQuantityWeightsDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;

                        POQuantityWeightsDataJsonArray.push(POQuantityWeightsDataAsJsonObject);
                    }
                }
            }
            console.log("POQuantityWeightsDataJsonArray len: " + POQuantityWeightsDataJsonArray.length);
            // POQuantityWeightsData Ends

            // POTextsData Starts
            var POTextsDataArray = parsedJsonPoData.POFetchOP.POTextsData;
            console.log("POTextsDataArray: " + POTextsDataArray);
            console.log("POTextsDataArray is Array: " + Array.isArray(POTextsDataArray));
            if (POTextsDataArray !== undefined) {
                if (Array.isArray(POTextsDataArray) === true)
                {
                    console.log("POTextsDataArray len: " + POTextsDataArray.length);
                    for (var i = 0; i < POTextsDataArray.length; i++)
                    {
                        if (POLineItemDataLinkId === POTextsDataArray[i].LinkId)
                        {
                            var POTextsDataAsJsonObject = {};

                            POTextsDataAsJsonObject["ItemNumber"] = POTextsDataArray[i].ItemNumber;
                            POTextsDataAsJsonObject["LinkId"] = POTextsDataArray[i].LinkId;
                            POTextsDataAsJsonObject["ItemText"] = POTextsDataArray[i].ItemText;
                            POTextsDataAsJsonObject["InfoRecordPOText"] = POTextsDataArray[i].InfoRecordPOText;
                            POTextsDataAsJsonObject["MaterialPOText"] = POTextsDataArray[i].MaterialPOText;
                            POTextsDataAsJsonObject["PONoteToApprover"] = POTextsDataArray[i].PONoteToApprover;
                            POTextsDataAsJsonObject["DeliveryText"] = POTextsDataArray[i].DeliveryText;

//                            POTextsDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;

                            POTextsDataJsonArray.push(POTextsDataAsJsonObject);
                        }
                    }
                }
                else
                {
                    if (POLineItemDataLinkId === POTextsDataArray.LinkId)
                    {
                        var POTextsDataAsJsonObject = {};

                        POTextsDataAsJsonObject["ItemNumber"] = POTextsDataArray.ItemNumber;
                        POTextsDataAsJsonObject["LinkId"] = POTextsDataArray.LinkId;
                        POTextsDataAsJsonObject["ItemText"] = POTextsDataArray.ItemText;
                        POTextsDataAsJsonObject["InfoRecordPOText"] = POTextsDataArray.InfoRecordPOText;
                        POTextsDataAsJsonObject["MaterialPOText"] = POTextsDataArray.MaterialPOText;
                        POTextsDataAsJsonObject["PONoteToApprover"] = POTextsDataArray.PONoteToApprover;
                        POTextsDataAsJsonObject["DeliveryText"] = POTextsDataArray.DeliveryText;

//                        POTextsDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;

                        POTextsDataJsonArray.push(POTextsDataAsJsonObject);
                    }
                }
            }
            // POTextsData Ends

            // POConfirmationsData Starts
            var POConfirmationsDataArray = parsedJsonPoData.POFetchOP.POConfirmationsData;
            console.log("POConfirmationsDataArray: " + POConfirmationsDataArray);
            console.log("POConfirmationsDataArray is Array: " + Array.isArray(POConfirmationsDataArray));
            if (POConfirmationsDataArray !== undefined) {
                if (Array.isArray(POConfirmationsDataArray) === true) {
                    console.log("POConfirmationsDataArray len: " + POConfirmationsDataArray.length);
                    for (var i = 0; i < POConfirmationsDataArray.length; i++)
                    {
                        if (POLineItemDataLinkId === POConfirmationsDataArray[i].LinkId)
                        {
                            var POConfirmationDataAsJsonObject = {};

                            POConfirmationDataAsJsonObject["LinkId"] = POConfirmationsDataArray[i].LinkId;
                            POConfirmationDataAsJsonObject["ItemNumber"] = POConfirmationsDataArray[i].ItemNumber;
                            POConfirmationDataAsJsonObject["ConfControl"] = POConfirmationsDataArray[i].ConfControl;
                            POConfirmationDataAsJsonObject["OrderAck"] = POConfirmationsDataArray[i].OrderAck;
                            POConfirmationDataAsJsonObject["ConfirmnReq"] = POConfirmationsDataArray[i].ConfirmnReq;
                            POConfirmationDataAsJsonObject["RejectInd"] = POConfirmationsDataArray[i].RejectInd;

//                            POConfirmationDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;

                            POConfirmationDataJsonArray.push(POConfirmationDataAsJsonObject);
                        }
                    }
                }
                else {
                    if (POLineItemDataLinkId === POConfirmationsDataArray.LinkId)
                    {
                        var POConfirmationDataAsJsonObject = {};

                        POConfirmationDataAsJsonObject["LinkId"] = POConfirmationsDataArray.LinkId;
                        POConfirmationDataAsJsonObject["ItemNumber"] = POConfirmationsDataArray.ItemNumber;
                        POConfirmationDataAsJsonObject["ConfControl"] = POConfirmationsDataArray.ConfControl;
                        POConfirmationDataAsJsonObject["OrderAck"] = POConfirmationsDataArray.OrderAck;
                        POConfirmationDataAsJsonObject["ConfirmnReq"] = POConfirmationsDataArray.ConfirmnReq;
                        POConfirmationDataAsJsonObject["RejectInd"] = POConfirmationsDataArray.RejectInd;

//                        POConfirmationDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;

                        POConfirmationDataJsonArray.push(POConfirmationDataAsJsonObject);
                    }
                }
            }
            // POConfirmationsData Ends

            // POCondCtrlData Starts
            var POCondCtrlDataArray = parsedJsonPoData.POFetchOP.POCondCtrlData;
            console.log("POCondCtrlDataArray: " + POCondCtrlDataArray);
            console.log("POCondCtrlDataArray is Array: " + Array.isArray(POCondCtrlDataArray));
            if (POCondCtrlDataArray !== undefined) {
                if (Array.isArray(POCondCtrlDataArray) === true) {
                    console.log("POCondCtrlDataArray len: " + POCondCtrlDataArray.length);
                    for (var i = 0; i < POCondCtrlDataArray.length; i++)
                    {
                        if (POLineItemDataLinkId === POCondCtrlDataArray[i].LinkId)
                        {
                            var POCondCtrlDataAsJsonObject = {};

                            POCondCtrlDataAsJsonObject["LinkId"] = POCondCtrlDataArray[i].LinkId;
                            POCondCtrlDataAsJsonObject["ItemNumber"] = POCondCtrlDataArray[i].ItemNumber;
                            POCondCtrlDataAsJsonObject["PrintPrice"] = POCondCtrlDataArray[i].PrintPrice;
                            POCondCtrlDataAsJsonObject["EstimatedPrice"] = POCondCtrlDataArray[i].EstimatedPrice;

//                            POCondCtrlDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;

                            POCondCtrlDataJsonArray.push(POCondCtrlDataAsJsonObject);
                        }
                    }
                }
                else {
                    if (POLineItemDataLinkId === POCondCtrlDataArray.LinkId)
                    {
                        var POCondCtrlDataAsJsonObject = {};

                        POCondCtrlDataAsJsonObject["LinkId"] = POCondCtrlDataArray.LinkId;
                        POCondCtrlDataAsJsonObject["ItemNumber"] = POCondCtrlDataArray.ItemNumber;
                        POCondCtrlDataAsJsonObject["PrintPrice"] = POCondCtrlDataArray.PrintPrice;
                        POCondCtrlDataAsJsonObject["EstimatedPrice"] = POCondCtrlDataArray.EstimatedPrice;

//                        POCondCtrlDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;

                        POCondCtrlDataJsonArray.push(POCondCtrlDataAsJsonObject);
                    }
                }
            }
            // POCondCtrlData Ends

            // POLineItemCustomerData Starts
            var POLineItemCustomerDataArray = parsedJsonPoData.POFetchOP.POLineItemCustomerData;
            console.log("POLineItemCustomerDataArray: " + POLineItemCustomerDataArray);
            console.log("POLineItemCustomerDataArray is Array: " + Array.isArray(POLineItemCustomerDataArray));
            if (POLineItemCustomerDataArray !== undefined) {
                if (Array.isArray(POLineItemCustomerDataArray) === true)
                {
                    console.log("POLineItemCustomerDataArray len: " + POLineItemCustomerDataArray.length);
                    for (var i = 0; i < POLineItemCustomerDataArray.length; i++)
                    {
                        if (POLineItemDataLinkId === POLineItemCustomerDataArray[i].LinkId)
                        {
                            var POLineItemCustomerDataJsonObject = {};

                            POLineItemCustomerDataJsonObject["ItemNumber"] = POLineItemCustomerDataArray[i].ItemNumber;
                            POLineItemCustomerDataJsonObject["LinkId"] = POLineItemCustomerDataArray[i].LinkId;
                            POLineItemCustomerDataJsonObject["ProductOrigin"] = POLineItemCustomerDataArray[i].ProductOrigin;
                            POLineItemCustomerDataJsonObject["Segment"] = POLineItemCustomerDataArray[i].Segment;

//                            POLineItemCustomerDataJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;

                            POLineItemCustomerDataJsonArray.push(POLineItemCustomerDataJsonObject);
                        }
                    }
                }
                else
                {
                    if (POLineItemDataLinkId === POLineItemCustomerDataArray.LinkId)
                    {
                        var POLineItemCustomerDataJsonObject = {};

                        POLineItemCustomerDataJsonObject["ItemNumber"] = POLineItemCustomerDataArray.ItemNumber;
                        POLineItemCustomerDataJsonObject["LinkId"] = POLineItemCustomerDataArray.LinkId;
                        POLineItemCustomerDataJsonObject["ProductOrigin"] = POLineItemCustomerDataArray.ProductOrigin;
                        POLineItemCustomerDataJsonObject["Segment"] = POLineItemCustomerDataArray.Segment;

//                        POLineItemCustomerDataJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;

                        POLineItemCustomerDataJsonArray.push(POLineItemCustomerDataJsonObject);
                    }
                }
            }
            // POLineItemCustomerData Ends
            // POAccAssData Starts
            var POAccntAssignDataArray = parsedJsonPoData.POFetchOP.POAccntAssignData;
            console.log("POAccntAssignDataArray: " + POAccntAssignDataArray);
            console.log("POAccntAssignDataArray is Array: " + Array.isArray(POAccntAssignDataArray));
            if (POAccntAssignDataArray !== undefined) {
                if (Array.isArray(POAccntAssignDataArray) === true)
                {
                    console.log("POAccntAssignDataArray len: " + POAccntAssignDataArray.length);
                    var row = "";
                    for (var i = 0; i < POAccntAssignDataArray.length; i++)
                    {
                        if (POLineItemDataLinkId === POAccntAssignDataArray[i].PRLinkID)
                        {
                            var POAccAssDataAsJsonObject = {};

                            POAccAssDataAsJsonObject["LinkID"] = (POAccntAssignDataArray[i].PRLinkID === undefined ? "" : POAccntAssignDataArray[i].PRLinkID);
                            POAccAssDataAsJsonObject["Quantity"] = (POAccntAssignDataArray[i].Quantity === undefined ? "" : POAccntAssignDataArray[i].Quantity);
                            POAccAssDataAsJsonObject["Percentage"] = (POAccntAssignDataArray[i].Percentage === undefined ? "" : POAccntAssignDataArray[i].Percentage);
                            POAccAssDataAsJsonObject["GLAccount"] = (POAccntAssignDataArray[i].GLAccount === undefined ? "" : POAccntAssignDataArray[i].GLAccount);
                            POAccAssDataAsJsonObject["COArea"] = (POAccntAssignDataArray[i].COArea === undefined ? "" : POAccntAssignDataArray[i].COArea);
                            POAccAssDataAsJsonObject["CostCenter"] = (POAccntAssignDataArray[i].CostCenter === undefined ? "" : POAccntAssignDataArray[i].CostCenter);
                            POAccAssDataAsJsonObject["Fund"] = (POAccntAssignDataArray[i].Fund === undefined ? "" : POAccntAssignDataArray[i].Fund);
                            POAccAssDataAsJsonObject["FunctionalArea"] = (POAccntAssignDataArray[i].FunctionalArea === undefined ? "" : POAccntAssignDataArray[i].FunctionalArea);
                            POAccAssDataAsJsonObject["FundsCentre"] = (POAccntAssignDataArray[i].FundsCentre === undefined ? "" : POAccntAssignDataArray[i].FundsCentre);
                            POAccAssDataAsJsonObject["CommitmentItem"] = (POAccntAssignDataArray[i].CommitmentItem === undefined ? "" : POAccntAssignDataArray[i].CommitmentItem);
                            POAccAssDataAsJsonObject["UnloadingPoint"] = (POAccntAssignDataArray[i].UnloadingPoint === undefined ? "" : POAccntAssignDataArray[i].UnloadingPoint);
                            POAccAssDataAsJsonObject["Recipient"] = (POAccntAssignDataArray[i].Recipient === undefined ? "" : POAccntAssignDataArray[i].Recipient);
                            POAccAssDataAsJsonObject["AccOrder"] = (POAccntAssignDataArray[i].AccOrder === undefined ? "" : POAccntAssignDataArray[i].AccOrder);
                            POAccAssDataAsJsonObject["Asset"] = (POAccntAssignDataArray[i].Asset === undefined ? "" : POAccntAssignDataArray[i].Asset);
                            POAccAssDataAsJsonObject["WBSElement"] = (POAccntAssignDataArray[i].WBSElement === undefined ? "" : POAccntAssignDataArray[i].WBSElement);
                            POAccAssDataAsJsonObject["SalesOrder"] = (POAccntAssignDataArray[i].SalesOrder === undefined ? "" : POAccntAssignDataArray[i].SalesOrder);
                            POAccAssDataAsJsonObject["ItemNumber"] = (POAccntAssignDataArray[i].Quantity === undefined ? "" : POAccntAssignDataArray[i].ItemNumber);
                            POAccAssDataAsJsonObject["DeliverySchedule"] = (POAccntAssignDataArray[i].DeliverySchedule === undefined ? "" : POAccntAssignDataArray[i].DeliverySchedule);
                            POAccAssDataAsJsonObject["ItmNo"] = (POAccntAssignDataArray[i].ItmNo === undefined ? "" : POAccntAssignDataArray[i].ItmNo);
                            POAccAssDataAsJsonObject["Distribution"] = (POAccntAssignDataArray[i].Distribution === undefined ? "" : POAccntAssignDataArray[i].Distribution);
                            POAccAssDataAsJsonObject["AccountAssignmentCategory"] = (POAccntAssignDataArray[i].AccountAssignmentCategory === undefined ? "" : POAccntAssignDataArray[i].AccountAssignmentCategory);
                            POAccAssDataAsJsonObject["SerialNo"] = (POAccntAssignDataArray[i].SerialNo === undefined ? "" : POAccntAssignDataArray[i].SerialNo);
                            POAccAssDataAsJsonObject["PartialInvoiceIndicator"] = (POAccntAssignDataArray[i].PartialInvoiceIndicator === undefined ? "" : POAccntAssignDataArray[i].PartialInvoiceIndicator);
                            POAccAssDataAsJsonObject["CoCode"] = (POAccntAssignDataArray[i].CoCode === undefined ? "" : POAccntAssignDataArray[i].CoCode);
                            POAccAssDataAsJsonObject["ActivityNumber"] = (POAccntAssignDataArray[i].ActivityNumber === undefined ? "" : POAccntAssignDataArray[i].ActivityNumber);

//                            POAccAssDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;
                            POAccAssDataAsJsonObject["PrLineItemDataLinkId"] = POLineItemDataLinkId;
                            POAccAssDataAsJsonObject["PrItemNumber"] = itemNumber;

                            POAccAssDataJsonArray.push(POAccAssDataAsJsonObject);
                        }
                    }
                }
                else
                {
                    if (POLineItemDataLinkId === POAccntAssignDataArray.PRLinkID)
                    {
                        var POAccAssDataAsJsonObject = {};

                        POAccAssDataAsJsonObject["LinkID"] = (POAccntAssignDataArray.PRLinkID === undefined ? "" : POAccntAssignDataArray.PRLinkID);
                        POAccAssDataAsJsonObject["Quantity"] = (POAccntAssignDataArray.Quantity === undefined ? "" : POAccntAssignDataArray.Quantity);
                        POAccAssDataAsJsonObject["Percentage"] = (POAccntAssignDataArray.Percentage === undefined ? "" : POAccntAssignDataArray.Percentage);
                        POAccAssDataAsJsonObject["GLAccount"] = (POAccntAssignDataArray.GLAccount === undefined ? "" : POAccntAssignDataArray.GLAccount);
                        POAccAssDataAsJsonObject["COArea"] = (POAccntAssignDataArray.COArea === undefined ? "" : POAccntAssignDataArray.COArea);
                        POAccAssDataAsJsonObject["CostCenter"] = (POAccntAssignDataArray.CostCenter === undefined ? "" : POAccntAssignDataArray.CostCenter);
                        POAccAssDataAsJsonObject["Fund"] = (POAccntAssignDataArray.Fund === undefined ? "" : POAccntAssignDataArray.Fund);
                        POAccAssDataAsJsonObject["FunctionalArea"] = (POAccntAssignDataArray.FunctionalArea === undefined ? "" : POAccntAssignDataArray.FunctionalArea);
                        POAccAssDataAsJsonObject["FundsCentre"] = (POAccntAssignDataArray.FundsCentre === undefined ? "" : POAccntAssignDataArray.FundsCentre);
                        POAccAssDataAsJsonObject["CommitmentItem"] = (POAccntAssignDataArray.CommitmentItem === undefined ? "" : POAccntAssignDataArray.CommitmentItem);
                        POAccAssDataAsJsonObject["UnloadingPoint"] = (POAccntAssignDataArray.UnloadingPoint === undefined ? "" : POAccntAssignDataArray.UnloadingPoint);
                        POAccAssDataAsJsonObject["Recipient"] = (POAccntAssignDataArray.Recipient === undefined ? "" : POAccntAssignDataArray.Recipient);
                        POAccAssDataAsJsonObject["AccOrder"] = (POAccntAssignDataArray.AccOrder === undefined ? "" : POAccntAssignDataArray.AccOrder);
                        POAccAssDataAsJsonObject["Asset"] = (POAccntAssignDataArray.Asset === undefined ? "" : POAccntAssignDataArray.Asset);
                        POAccAssDataAsJsonObject["WBSElement"] = (POAccntAssignDataArray.WBSElement === undefined ? "" : POAccntAssignDataArray.WBSElement);
                        POAccAssDataAsJsonObject["SalesOrder"] = (POAccntAssignDataArray.SalesOrder === undefined ? "" : POAccntAssignDataArray.SalesOrder);
                        POAccAssDataAsJsonObject["ItemNumber"] = (POAccntAssignDataArray.Quantity === undefined ? "" : POAccntAssignDataArray.ItemNumber);
                        POAccAssDataAsJsonObject["DeliverySchedule"] = (POAccntAssignDataArray.DeliverySchedule === undefined ? "" : POAccntAssignDataArray.DeliverySchedule);
                        POAccAssDataAsJsonObject["ItmNo"] = (POAccntAssignDataArray.ItmNo === undefined ? "" : POAccntAssignDataArray.ItmNo);
                        POAccAssDataAsJsonObject["Distribution"] = (POAccntAssignDataArray.Distribution === undefined ? "" : POAccntAssignDataArray.Distribution);
                        POAccAssDataAsJsonObject["AccountAssignmentCategory"] = (POAccntAssignDataArray.AccountAssignmentCategory === undefined ? "" : POAccntAssignDataArray.AccountAssignmentCategory);
                        POAccAssDataAsJsonObject["SerialNo"] = (POAccntAssignDataArray.SerialNo === undefined ? "" : POAccntAssignDataArray.SerialNo);
                        POAccAssDataAsJsonObject["PartialInvoiceIndicator"] = (POAccntAssignDataArray.PartialInvoiceIndicator === undefined ? "" : POAccntAssignDataArray.PartialInvoiceIndicator);
                        POAccAssDataAsJsonObject["CoCode"] = (POAccntAssignDataArray.CoCode === undefined ? "" : POAccntAssignDataArray.CoCode);
                        POAccAssDataAsJsonObject["ActivityNumber"] = (POAccntAssignDataArray.ActivityNumber === undefined ? "" : POAccntAssignDataArray.ActivityNumber);

//                        POAccAssDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;
                        POAccAssDataAsJsonObject["PrLineItemDataLinkId"] = POLineItemDataLinkId;
                        POAccAssDataAsJsonObject["PrItemNumber"] = itemNumber;

                        POAccAssDataJsonArray.push(POAccAssDataAsJsonObject);
                    }
                }
            }
            // POAccAssData Ends
            // POLineItemConditionsData Starts
            var POLineItemConditionsDataArray = parsedJsonPoData.POFetchOP.POLineItemConditionsData;
            console.log("POLineItemConditionsDataArray: " + POLineItemConditionsDataArray);
            console.log("POLineItemConditionsDataArray is Array: " + Array.isArray(POLineItemConditionsDataArray));
            if (POLineItemConditionsDataArray !== undefined) {
                if (Array.isArray(POLineItemConditionsDataArray) === true) {
                    console.log("POLineItemConditionsDataArray len: " + POLineItemConditionsDataArray.length);
                    console.log("POLineItemDataLinkId-:::: " + POLineItemDataLinkId);
                    var row = "";
                    for (var i = 0; i < POLineItemConditionsDataArray.length; i++) {

                        if (POLineItemDataLinkId === POLineItemConditionsDataArray[i].LinkId)
                        {
                            var POConditionDataAsJsonObject = {};

                            POConditionDataAsJsonObject["LinkId"] = (POLineItemConditionsDataArray[i].LinkId === undefined ? "" : POLineItemConditionsDataArray[i].LinkId);
                            POConditionDataAsJsonObject["ItemNumber"] = (POLineItemConditionsDataArray[i].ItemNumber === undefined ? "" : POLineItemConditionsDataArray[i].ItemNumber);
                            POConditionDataAsJsonObject["CondSTNo"] = (POLineItemConditionsDataArray[i].CondSTNo === undefined ? "" : POLineItemConditionsDataArray[i].CondSTNo);
                            POConditionDataAsJsonObject["CondCount"] = (POLineItemConditionsDataArray[i].CondCount === undefined ? "" : POLineItemConditionsDataArray[i].CondCount);
                            POConditionDataAsJsonObject["CondChangeId"] = (POLineItemConditionsDataArray[i].CondChangeId === undefined ? "" : POLineItemConditionsDataArray[i].CondChangeId);
                            POConditionDataAsJsonObject["CondType"] = (POLineItemConditionsDataArray[i].CondType === undefined ? "" : POLineItemConditionsDataArray[i].CondType);
                            POConditionDataAsJsonObject["CondPricUnit"] = (POLineItemConditionsDataArray[i].CondPricUnit === undefined ? "" : POLineItemConditionsDataArray[i].CondPricUnit);
                            POConditionDataAsJsonObject["CondCrncy"] = (POLineItemConditionsDataArray[i].CondCrncy === undefined ? "" : POLineItemConditionsDataArray[i].CondCrncy);
                            POConditionDataAsJsonObject["CondUnit"] = (POLineItemConditionsDataArray[i].CondUnit === undefined ? "" : POLineItemConditionsDataArray[i].CondUnit);
                            POConditionDataAsJsonObject["CondVal"] = (POLineItemConditionsDataArray[i].CondVal === undefined ? "" : POLineItemConditionsDataArray[i].CondVal);
                            POConditionDataAsJsonObject["CondName"] = (POLineItemConditionsDataArray[i].CondName === undefined ? "" : POLineItemConditionsDataArray[i].CondName);
                            POConditionDataAsJsonObject["Amount"] = (POLineItemConditionsDataArray[i].Amount === undefined ? "" : POLineItemConditionsDataArray[i].Amount);
                            POConditionDataAsJsonObject["Currency"] = (POLineItemConditionsDataArray[i].Currency === undefined ? "" : POLineItemConditionsDataArray[i].Currency);
                            POConditionDataAsJsonObject["Application"] = (POLineItemConditionsDataArray[i].Application === undefined ? "" : POLineItemConditionsDataArray[i].Application);
                            POConditionDataAsJsonObject["AccountKey"] = (POLineItemConditionsDataArray[i].AccountKey === undefined ? "" : POLineItemConditionsDataArray[i].AccountKey);
                            POConditionDataAsJsonObject["Accruals"] = (POLineItemConditionsDataArray[i].Accruals === undefined ? "" : POLineItemConditionsDataArray[i].Accruals);
                            POConditionDataAsJsonObject["Status"] = (POLineItemConditionsDataArray[i].Status === undefined ? "" : POLineItemConditionsDataArray[i].Status);
                            POConditionDataAsJsonObject["Numerator"] = (POLineItemConditionsDataArray[i].Numerator === undefined ? "" : POLineItemConditionsDataArray[i].Numerator);
                            POConditionDataAsJsonObject["BaseUOM"] = (POLineItemConditionsDataArray[i].BaseUOM === undefined ? "" : POLineItemConditionsDataArray[i].BaseUOM);
                            POConditionDataAsJsonObject["Denominator"] = (POLineItemConditionsDataArray[i].Denominator === undefined ? "" : POLineItemConditionsDataArray[i].Denominator);
                            POConditionDataAsJsonObject["Uom_Extra"] = (POLineItemConditionsDataArray[i].Uom_Extra === undefined ? "" : POLineItemConditionsDataArray[i].Uom_Extra);

//                            POConditionDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;
                            POConditionDataAsJsonObject["PrLineItemDataLinkId"] = POLineItemDataLinkId;
                            POConditionDataAsJsonObject["PrItemNumber"] = itemNumber;

                            POLineItemConditionDataJsonArray.push(POConditionDataAsJsonObject);
                        }
                    }
                }
                else
                {
                    if (POLineItemDataLinkId === POLineItemConditionsDataArray.LinkId)
                    {
                        var POConditionDataAsJsonObject = {};

                        POConditionDataAsJsonObject["LinkId"] = (POLineItemConditionsDataArray.LinkId === undefined ? "" : POLineItemConditionsDataArray.LinkId);
                        POConditionDataAsJsonObject["ItemNumber"] = (POLineItemConditionsDataArray.ItemNumber === undefined ? "" : POLineItemConditionsDataArray.ItemNumber);
                        POConditionDataAsJsonObject["CondSTNo"] = (POLineItemConditionsDataArray.CondSTNo === undefined ? "" : POLineItemConditionsDataArray.CondSTNo);
                        POConditionDataAsJsonObject["CondCount"] = (POLineItemConditionsDataArray.CondCount === undefined ? "" : POLineItemConditionsDataArray.CondCount);
                        POConditionDataAsJsonObject["CondChangeId"] = (POLineItemConditionsDataArray.CondChangeId === undefined ? "" : POLineItemConditionsDataArray.CondChangeId);
                        POConditionDataAsJsonObject["CondType"] = (POLineItemConditionsDataArray.CondType === undefined ? "" : POLineItemConditionsDataArray.CondType);
                        POConditionDataAsJsonObject["CondPricUnit"] = (POLineItemConditionsDataArray.CondPricUnit === undefined ? "" : POLineItemConditionsDataArray.CondPricUnit);
                        POConditionDataAsJsonObject["CondCrncy"] = (POLineItemConditionsDataArray.CondCrncy === undefined ? "" : POLineItemConditionsDataArray.CondCrncy);
                        POConditionDataAsJsonObject["CondUnit"] = (POLineItemConditionsDataArray.CondUnit === undefined ? "" : POLineItemConditionsDataArray.CondUnit);
                        POConditionDataAsJsonObject["CondVal"] = (POLineItemConditionsDataArray.CondVal === undefined ? "" : POLineItemConditionsDataArray.CondVal);
                        POConditionDataAsJsonObject["CondName"] = (POLineItemConditionsDataArray.CondName === undefined ? "" : POLineItemConditionsDataArray.CondName);
                        POConditionDataAsJsonObject["Amount"] = (POLineItemConditionsDataArray.Amount === undefined ? "" : POLineItemConditionsDataArray.Amount);
                        POConditionDataAsJsonObject["Currency"] = (POLineItemConditionsDataArray.Currency === undefined ? "" : POLineItemConditionsDataArray.Currency);
                        POConditionDataAsJsonObject["Application"] = (POLineItemConditionsDataArray.Application === undefined ? "" : POLineItemConditionsDataArray.Application);
                        POConditionDataAsJsonObject["AccountKey"] = (POLineItemConditionsDataArray.AccountKey === undefined ? "" : POLineItemConditionsDataArray.AccountKey);
                        POConditionDataAsJsonObject["Accruals"] = (POLineItemConditionsDataArray.Accruals === undefined ? "" : POLineItemConditionsDataArray.Accruals);
                        POConditionDataAsJsonObject["Status"] = (POLineItemConditionsDataArray.Status === undefined ? "" : POLineItemConditionsDataArray.Status);
                        POConditionDataAsJsonObject["Numerator"] = (POLineItemConditionsDataArray.Numerator === undefined ? "" : POLineItemConditionsDataArray.Numerator);
                        POConditionDataAsJsonObject["BaseUOM"] = (POLineItemConditionsDataArray.BaseUOM === undefined ? "" : POLineItemConditionsDataArray.BaseUOM);
                        POConditionDataAsJsonObject["Denominator"] = (POLineItemConditionsDataArray.Denominator === undefined ? "" : POLineItemConditionsDataArray.Denominator);
                        POConditionDataAsJsonObject["Uom_Extra"] = (POLineItemConditionsDataArray.Uom_Extra === undefined ? "" : POLineItemConditionsDataArray.Uom_Extra);

//                        POConditionDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;
                        POConditionDataAsJsonObject["PrLineItemDataLinkId"] = POLineItemDataLinkId;
                        POConditionDataAsJsonObject["PrItemNumber"] = itemNumber;

                        POLineItemConditionDataJsonArray.push(POConditionDataAsJsonObject);
                    }
                }
            }
            // POLineItemConditionsData Ends
            // PODeliveryScheduleData Starts
            var PODeliveryScheduleDataArray = parsedJsonPoData.POFetchOP.PODeliveryScheduleData;
            console.log("PODeliveryScheduleDataArray: " + PODeliveryScheduleDataArray);
            console.log("PODeliveryScheduleDataArray is Array: " + Array.isArray(PODeliveryScheduleDataArray));
            if (PODeliveryScheduleDataArray !== undefined) {
                if (Array.isArray(PODeliveryScheduleDataArray) === true)
                {
                    console.log("PODeliveryScheduleDataArray len: " + PODeliveryScheduleDataArray.length);
                    for (var i = 0; i < PODeliveryScheduleDataArray.length; i++)
                    {
                        if (POLineItemDataLinkId === PODeliveryScheduleDataArray[i].LinkId)
                        {
                            var PODeliveryScheduleDataAsJsonObject = {};

                            PODeliveryScheduleDataAsJsonObject["ItemNo"] = PODeliveryScheduleDataArray[i].ItemNo;
                            PODeliveryScheduleDataAsJsonObject["LinkId"] = PODeliveryScheduleDataArray[i].LinkId;
                            PODeliveryScheduleDataAsJsonObject["DelDateCatg"] = PODeliveryScheduleDataArray[i].DelDateCatg;
                            PODeliveryScheduleDataAsJsonObject["DelDate"] = PODeliveryScheduleDataArray[i].DelDate;
                            PODeliveryScheduleDataAsJsonObject["ScheduledQuantity"] = PODeliveryScheduleDataArray[i].ScheduledQuantity;
                            PODeliveryScheduleDataAsJsonObject["DelTime"] = PODeliveryScheduleDataArray[i].DelTime;
                            PODeliveryScheduleDataAsJsonObject["PRNumber"] = PODeliveryScheduleDataArray[i].PRNumber;
                            PODeliveryScheduleDataAsJsonObject["ReqItemNo"] = PODeliveryScheduleDataArray[i].ReqItemNo;

//                            PODeliveryScheduleDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;

                            PODeliveryScheduleDataJsonArray.push(PODeliveryScheduleDataAsJsonObject);
                        }
                    }
                }
                else
                {
                    if (POLineItemDataLinkId === PODeliveryScheduleDataArray.LinkId)
                    {
                        var PODeliveryScheduleDataAsJsonObject = {};

                        PODeliveryScheduleDataAsJsonObject["ItemNo"] = PODeliveryScheduleDataArray.ItemNo;
                        PODeliveryScheduleDataAsJsonObject["LinkId"] = PODeliveryScheduleDataArray.LinkId;
                        PODeliveryScheduleDataAsJsonObject["DelDateCatg"] = PODeliveryScheduleDataArray.DelDateCatg;
                        PODeliveryScheduleDataAsJsonObject["DelDate"] = PODeliveryScheduleDataArray.DelDate;
                        PODeliveryScheduleDataAsJsonObject["ScheduledQuantity"] = PODeliveryScheduleDataArray.ScheduledQuantity;
                        PODeliveryScheduleDataAsJsonObject["DelTime"] = PODeliveryScheduleDataArray.DelTime;
                        PODeliveryScheduleDataAsJsonObject["PRNumber"] = PODeliveryScheduleDataArray.PRNumber;
                        PODeliveryScheduleDataAsJsonObject["ReqItemNo"] = PODeliveryScheduleDataArray.ReqItemNo;

//                        PODeliveryScheduleDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;

                        PODeliveryScheduleDataJsonArray.push(PODeliveryScheduleDataAsJsonObject);
                    }
                }
            }
            // PODeliveryScheduleData Ends

            // POServiceData Starts


//            alert("prType ;" + prType);
            if (prType === "Service") {

                var POLineItemPackageNo = findSADataOfPrLineItem(parsedJsonPoData, "PackageNo", itemNumber);
//            alert("POLineItemPackageNo: " + POLineItemPackageNo);

                var POServiceRefDataArray = parsedJsonPoData.POFetchOP.POServiceRefData;
                console.log("POServiceRefDataArray: " + POServiceRefDataArray.length);
                console.log("POServiceRefDataArray is Array: " + Array.isArray(POServiceRefDataArray));

                var POServiceDataArray = parsedJsonPoData.POFetchOP.POServiceData;
                console.log("POServiceDataArray: " + POServiceDataArray);
                console.log("POServiceDataArray is Array: " + Array.isArray(POServiceDataArray));

                var POAccntAssignvalDataArray = parsedJsonPoData.POFetchOP.POAccntAssignvalData;
                console.log("POAccntAssignvalDataArray: " + POAccntAssignvalDataArray);
                console.log("POAccntAssignvalDataArray is Array: " + Array.isArray(POAccntAssignvalDataArray));

                if (POServiceRefDataArray !== undefined) {
                    if (Array.isArray(POServiceRefDataArray) === true) {
                        console.log("POServiceRefDataArray len: " + index + " ," + POServiceRefDataArray.length);
                        for (var i = 0; i < POServiceRefDataArray.length; i++) {
                            var PackageNo = POServiceRefDataArray[i].PackageNo;
                            var SubPackageNo = POServiceRefDataArray[i].SubPackageNo;
                            if (PackageNo === POLineItemPackageNo) {
                                if (POServiceDataArray !== undefined) {
                                    console.log("POServiceDataArray is Array in loop:" + i + ":" + Array.isArray(POServiceDataArray));
                                    if (Array.isArray(POServiceDataArray) === true) {
                                        console.log("POServiceDataArray len :" + i + " ," + POServiceDataArray.length);
                                        for (var i = 0; i < POServiceDataArray.length; i++) {
                                            console.log("POServiceDataArray[i].PackageNo :" + i + " ," + POServiceDataArray[i].PackageNo + " SubPackageNo :" + SubPackageNo);
                                            if (POServiceDataArray[i].PackageNo === SubPackageNo)
                                            {
                                                console.log("POServiceDataArray[i].PackageNo :" + i + " ," + POServiceDataArray[i].PackageNo);
                                                var POServiceDataAsJsonObject = {};

//                                            POServiceDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;
                                                POServiceDataAsJsonObject["PrLineItemDataLinkId"] = POLineItemDataLinkId;
                                                POServiceDataAsJsonObject["PrItemNumber"] = itemNumber;
                                                POServiceDataAsJsonObject["PrLinePackageNo"] = PrLineItemPackageNo;
                                                POServiceDataAsJsonObject["PackageNo"] = (POServiceDataArray[i].PackageNo === undefined ? "" : POServiceDataArray[i].PackageNo);
                                                POServiceDataAsJsonObject["ServiceNumber"] = (POServiceDataArray[i].ServiceNumber === undefined ? "" : POServiceDataArray[i].ServiceNumber);
                                                POServiceDataAsJsonObject["ShortText"] = (POServiceDataArray[i].ShortText === undefined ? "" : POServiceDataArray[i].ShortText);
                                                POServiceDataAsJsonObject["Quantity"] = (POServiceDataArray[i].Quantity === undefined ? "" : POServiceDataArray[i].Quantity);
                                                POServiceDataAsJsonObject["Unit"] = (POServiceDataArray[i].Unit === undefined ? "" : POServiceDataArray[i].Unit);
                                                POServiceDataAsJsonObject["Currency"] = (POServiceDataArray[i].Currency === undefined ? "" : POServiceDataArray[i].Currency);
                                                POServiceDataAsJsonObject["NetPrice"] = (POServiceDataArray[i].NetPrice === undefined ? "" : POServiceDataArray[i].NetPrice);
                                                POServiceDataAsJsonObject["Edition"] = (POServiceDataArray[i].Edition === undefined ? "" : POServiceDataArray[i].Edition);
                                                POServiceDataAsJsonObject["LineItemLongText"] = (POServiceDataArray[i].LineItemLongText === undefined ? "" : POServiceDataArray[i].LineItemLongText);
                                                POServiceDataAsJsonObject["OverfTolerance"] = (POServiceDataArray[i].OverfTolerance === undefined ? "" : POServiceDataArray[i].OverfTolerance);
                                                POServiceDataAsJsonObject["GrossPrice"] = (POServiceDataArray[i].GrossPrice === undefined ? "" : POServiceDataArray[i].GrossPrice);
                                                POServiceDataAsJsonObject["LineItemNumber"] = (POServiceDataArray[i].LineItemNumber === undefined ? "" : POServiceDataArray[i].LineItemNumber);
                                                POServiceDataAsJsonObject["Distribution"] = (POServiceDataArray[i].Distribution === undefined ? "" : POServiceDataArray[i].Distribution);
                                                POServiceDataAsJsonObject["ServiceLinkID"] = (POServiceDataArray[i].ServiceLinkID === undefined ? "" : POServiceDataArray[i].ServiceLinkID);

                                                POServiceDataJsonArray.push(POServiceDataAsJsonObject);

                                                console.log("POAccntAssignvalDataArray.length :" + i + ":" + POAccntAssignvalDataArray.length);

                                                for (var j = 0; j < POAccntAssignvalDataArray.length; j++)
                                                {
                                                    var POServiceAccAssDataAsJsonObject = {};
                                                    console.log("POAccntAssignvalDataArray[i].PackageNo: " + POAccntAssignvalDataArray[j].PackageNo);
                                                    if ((POServiceDataArray[i].LineNo === POAccntAssignvalDataArray[j].LineNo) && (POServiceDataArray[i].PackageNo === POAccntAssignvalDataArray[j].PackageNo))
                                                    {
//                                                    alert("POLineItemPackageNo: " + POLineItemPackageNo + ", POServiceDataArray[i].LineNo: " + POServiceDataArray[i].LineNo + ", POAccntAssignvalDataArray[j].LineNo: " + POAccntAssignvalDataArray[j].LineNo);

                                                        POServiceAccAssDataAsJsonObject["PackageNo"] = (POAccntAssignvalDataArray[j].PackageNo === undefined ? "" : POAccntAssignvalDataArray[j].PackageNo);
                                                        POServiceAccAssDataAsJsonObject["Quantity"] = (POAccntAssignvalDataArray[j].Quantity === "" ? "" : POAccntAssignvalDataArray[j].Quantity);
                                                        POServiceAccAssDataAsJsonObject["Percentage"] = (POAccntAssignvalDataArray[j].Percentage === "" ? "" : POAccntAssignvalDataArray[j].Percentage);
                                                        POServiceAccAssDataAsJsonObject["GLAccount"] = (POAccntAssignvalDataArray[j].GLAccount === "" ? "" : POAccntAssignvalDataArray[j].GLAccount);
                                                        POServiceAccAssDataAsJsonObject["CoArea"] = (POAccntAssignvalDataArray[j].CoArea === "" ? "" : POAccntAssignvalDataArray[j].CoArea);
                                                        POServiceAccAssDataAsJsonObject["CostCenter"] = (POAccntAssignvalDataArray[j].CostCenter === "" ? "" : POAccntAssignvalDataArray[j].CostCenter);
                                                        POServiceAccAssDataAsJsonObject["Fund"] = (POAccntAssignvalDataArray[j].Fund === "" ? "" : POAccntAssignvalDataArray[j].Fund);
                                                        POServiceAccAssDataAsJsonObject["FunctionalArea"] = (POAccntAssignvalDataArray[j].FunctionalArea === "" ? "" : POAccntAssignvalDataArray[j].FunctionalArea);
                                                        POServiceAccAssDataAsJsonObject["FundsCentre"] = (POAccntAssignvalDataArray[j].FundsCentre === "" ? "" : POAccntAssignvalDataArray[j].FundsCentre);
                                                        POServiceAccAssDataAsJsonObject["CommitmentItem"] = (POAccntAssignvalDataArray[j].CommitmentItem === "" ? "" : POAccntAssignvalDataArray[j].CommitmentItem);
                                                        POServiceAccAssDataAsJsonObject["Acc_Order"] = (POAccntAssignvalDataArray[j].Acc_Order === "" ? "" : POAccntAssignvalDataArray[j].Acc_Order);
                                                        POServiceAccAssDataAsJsonObject["Acc_Asset"] = (POAccntAssignvalDataArray[j].Acc_Asset === "" ? "" : POAccntAssignvalDataArray[j].Acc_Asset);
                                                        POServiceAccAssDataAsJsonObject["Acc_WBSElement"] = (POAccntAssignvalDataArray[j].Acc_WBSElement === "" ? "" : POAccntAssignvalDataArray[j].Acc_WBSElement);
                                                        POServiceAccAssDataAsJsonObject["SalesOrder"] = (POAccntAssignvalDataArray[j].SalesOrder === "" ? "" : POAccntAssignvalDataArray[j].SalesOrder);
                                                        POServiceAccAssDataAsJsonObject["ActivityNumber"] = (POAccntAssignvalDataArray[j].ActivityNumber === "" ? "" : POAccntAssignvalDataArray[j].ActivityNumber);
                                                        POServiceAccAssDataAsJsonObject["ItemNumber"] = (POAccntAssignvalDataArray[j].ItemNumber === "" ? "" : POAccntAssignvalDataArray[j].ItemNumber);
                                                        POServiceAccAssDataAsJsonObject["DeliverySchedule"] = (POAccntAssignvalDataArray[j].DeliverySchedule === "" ? "" : POAccntAssignvalDataArray[j].DeliverySchedule);

                                                        POServiceAccAssDataAsJsonObject["ServiceNumber"] = (POServiceDataArray[i].ServiceNumber === undefined ? "" : POServiceDataArray[i].ServiceNumber);
                                                        POServiceAccAssDataAsJsonObject["LineItemNumber"] = (POServiceDataArray[i].LineItemNumber === undefined ? "" : POServiceDataArray[i].LineItemNumber);

                                                        POServiceAccAssDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;
                                                        POServiceAccAssDataAsJsonObject["PrLineItemDataLinkId"] = POLineItemDataLinkId;
                                                        POServiceAccAssDataAsJsonObject["PrItemNumber"] = itemNumber;
                                                        POServiceAccAssDataAsJsonObject["AccountAssignment"] = PrAccAss;

                                                        POServiceAccAssDataAsJsonObject["Distribution"] = (POAccntAssignvalDataArray[j].Distribution === "" ? "" : POAccntAssignvalDataArray[j].Distribution);
                                                        POServiceAccAssDataAsJsonObject["SerialNo"] = (POAccntAssignvalDataArray[j].SerialNo === "" ? "" : POAccntAssignvalDataArray[j].SerialNo);
                                                        POServiceAccAssDataAsJsonObject["LinkNumber"] = (POAccntAssignvalDataArray[j].LinkNumber === "" ? "" : POAccntAssignvalDataArray[j].LinkNumber);
                                                        POServiceAccAssDataAsJsonObject["NETVALUE"] = (POAccntAssignvalDataArray[j].NETVALUE === "" ? "" : POAccntAssignvalDataArray[j].NETVALUE);

                                                        POServiceAccAssDataJsonArray.push(POServiceAccAssDataAsJsonObject);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        console.log("Single Service====");

                                        if (POServiceDataArray.PackageNo === SubPackageNo)
                                        {
                                            var POServiceDataAsJsonObject = {};

                                            POServiceDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;
                                            POServiceDataAsJsonObject["ServiceLinkID"] = (POServiceDataArray.ServiceLinkID === undefined ? "" : POServiceDataArray.ServiceLinkID);
                                            POServiceDataAsJsonObject["PrLineItemDataLinkId"] = POLineItemDataLinkId;
                                            POServiceDataAsJsonObject["PrItemNumber"] = itemNumber;
                                            POServiceDataAsJsonObject["Distribution"] = (POServiceDataArray.Distribution === undefined ? "" : POServiceDataArray.Distribution);
                                            POServiceDataAsJsonObject["PrLinePackageNo"] = PrLineItemPackageNo;
                                            POServiceDataAsJsonObject["PackageNo"] = (POServiceDataArray.PackageNo === undefined ? "" : POServiceDataArray.PackageNo);
                                            POServiceDataAsJsonObject["ServiceNumber"] = (POServiceDataArray.ServiceNumber === undefined ? "" : POServiceDataArray.ServiceNumber);
                                            POServiceDataAsJsonObject["ShortText"] = (POServiceDataArray.ShortText === undefined ? "" : POServiceDataArray.ShortText);
                                            POServiceDataAsJsonObject["Quantity"] = (POServiceDataArray.Quantity === undefined ? "" : POServiceDataArray.Quantity);
                                            POServiceDataAsJsonObject["Unit"] = (POServiceDataArray.Unit === undefined ? "" : POServiceDataArray.Unit);
                                            POServiceDataAsJsonObject["Currency"] = (POServiceDataArray.Currency === undefined ? "" : POServiceDataArray.Currency);
                                            POServiceDataAsJsonObject["NetPrice"] = (POServiceDataArray.NetPrice === undefined ? "" : POServiceDataArray.NetPrice);
                                            POServiceDataAsJsonObject["Edition"] = (POServiceDataArray.Edition === undefined ? "" : POServiceDataArray.Edition);
                                            POServiceDataAsJsonObject["LineItemLongText"] = (POServiceDataArray.LineItemLongText === undefined ? "" : POServiceDataArray.LineItemLongText);
                                            POServiceDataAsJsonObject["OverfTolerance"] = (POServiceDataArray.OverfTolerance === undefined ? "" : POServiceDataArray.OverfTolerance);
                                            POServiceDataAsJsonObject["GrossPrice"] = (POServiceDataArray.GrossPrice === undefined ? "" : POServiceDataArray.GrossPrice);
                                            POServiceDataAsJsonObject["LineItemNumber"] = (POServiceDataArray.LineItemNumber === undefined ? "" : POServiceDataArray.LineItemNumber);

                                            POServiceDataJsonArray.push(POServiceDataAsJsonObject);

                                            var POServiceAccAssDataAsJsonObject = {};
                                            if ((POServiceDataArray.PackageNo === POAccntAssignvalDataArray[j].PackageNo) && (POServiceDataArray.LineNo === POAccntAssignvalDataArray[j].LineNo))
                                            {
                                                POServiceAccAssDataAsJsonObject["PackageNo"] = (POAccntAssignvalDataArray.PackageNo === undefined ? "" : POAccntAssignvalDataArray.PackageNo);
                                                POServiceAccAssDataAsJsonObject["Quantity"] = (POAccntAssignvalDataArray.Quantity === "" ? "" : POAccntAssignvalDataArray.Quantity);
                                                POServiceAccAssDataAsJsonObject["Percentage"] = (POAccntAssignvalDataArray.Percentage === "" ? "" : POAccntAssignvalDataArray.Percentage);
                                                POServiceAccAssDataAsJsonObject["GLAccount"] = (POAccntAssignvalDataArray.GLAccount === "" ? "" : POAccntAssignvalDataArray.GLAccount);
                                                POServiceAccAssDataAsJsonObject["CoArea"] = (POAccntAssignvalDataArray.CoArea === "" ? "" : POAccntAssignvalDataArray.CoArea);
                                                POServiceAccAssDataAsJsonObject["CostCenter"] = (POAccntAssignvalDataArray.CostCenter === "" ? "" : POAccntAssignvalDataArray.CostCenter);
                                                POServiceAccAssDataAsJsonObject["Fund"] = (POAccntAssignvalDataArray.Fund === "" ? "" : POAccntAssignvalDataArray.Fund);
                                                POServiceAccAssDataAsJsonObject["FunctionalArea"] = (POAccntAssignvalDataArray.FunctionalArea === "" ? "" : POAccntAssignvalDataArray.FunctionalArea);
                                                POServiceAccAssDataAsJsonObject["FundsCentre"] = (POAccntAssignvalDataArray.FundsCentre === "" ? "" : POAccntAssignvalDataArray.FundsCentre);
                                                POServiceAccAssDataAsJsonObject["CommitmentItem"] = (POAccntAssignvalDataArray.CommitmentItem === "" ? "" : POAccntAssignvalDataArray.CommitmentItem);
                                                POServiceAccAssDataAsJsonObject["Acc_Order"] = (POAccntAssignvalDataArray.Acc_Order === "" ? "" : POAccntAssignvalDataArray.Acc_Order);
                                                POServiceAccAssDataAsJsonObject["Acc_Asset"] = (POAccntAssignvalDataArray.Acc_Asset === "" ? "" : POAccntAssignvalDataArray.Acc_Asset);
                                                POServiceAccAssDataAsJsonObject["Acc_WBSElement"] = (POAccntAssignvalDataArray.Acc_WBSElement === "" ? "" : POAccntAssignvalDataArray.Acc_WBSElement);
                                                POServiceAccAssDataAsJsonObject["SalesOrder"] = (POAccntAssignvalDataArray.SalesOrder === "" ? "" : POAccntAssignvalDataArray.SalesOrder);
                                                POServiceAccAssDataAsJsonObject["ActivityNumber"] = (POAccntAssignvalDataArray.ActivityNumber === "" ? "" : POAccntAssignvalDataArray.ActivityNumber);
                                                POServiceAccAssDataAsJsonObject["ItemNumber"] = (POAccntAssignvalDataArray.ItemNumber === "" ? "" : POAccntAssignvalDataArray.ItemNumber);
                                                POServiceAccAssDataAsJsonObject["DeliverySchedule"] = (POAccntAssignvalDataArray.DeliverySchedule === "" ? "" : POAccntAssignvalDataArray.DeliverySchedule);

                                                POServiceAccAssDataAsJsonObject["ServiceNumber"] = (POServiceDataArray.ServiceNumber === undefined ? "" : POServiceDataArray.ServiceNumber);
                                                POServiceAccAssDataAsJsonObject["LineItemNumber"] = (POServiceDataArray.LineItemNumber === undefined ? "" : POServiceDataArray.LineItemNumber);

                                                POServiceAccAssDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;
                                                POServiceAccAssDataAsJsonObject["PrLineItemDataLinkId"] = POLineItemDataLinkId;
                                                POServiceAccAssDataAsJsonObject["PrItemNumber"] = itemNumber;
                                                POServiceAccAssDataAsJsonObject["AccountAssignment"] = PrAccAss;

                                                POServiceAccAssDataAsJsonObject["Distribution"] = (POAccntAssignvalDataArray.Distribution === "" ? "" : POAccntAssignvalDataArray.Distribution);
                                                POServiceAccAssDataAsJsonObject["SerialNo"] = (POAccntAssignvalDataArray.SerialNo === "" ? "" : POAccntAssignvalDataArray.SerialNo);
                                                POServiceAccAssDataAsJsonObject["LinkNumber"] = (POAccntAssignvalDataArray.LinkNumber === "" ? "" : POAccntAssignvalDataArray.LinkNumber);
                                                POServiceAccAssDataAsJsonObject["NETVALUE"] = (POAccntAssignvalDataArray.NETVALUE === "" ? "" : POAccntAssignvalDataArray.NETVALUE);

                                                POServiceAccAssDataJsonArray.push(POServiceAccAssDataAsJsonObject);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else {
                        console.log("Single POServiceRefDataArray");

                        var PackageNo = POServiceRefDataArray.PackageNo;
                        var SubPackageNo = POServiceRefDataArray.SubPackageNo;
//                    alert("SubPackageNo :" + SubPackageNo);
//                    alert("POLineItemPackageNo :" + POLineItemPackageNo + " PackageNo :" + PackageNo);
                        if (PackageNo === POLineItemPackageNo) {
                            if (POServiceDataArray !== undefined) {
//                            alert("Is Array :" + Array.isArray(POServiceDataArray));
                                if (Array.isArray(POServiceDataArray) === true) {
                                    console.log("Else POServiceDataArray len: " + POServiceDataArray.length);
                                    for (var i = 0; i < POServiceDataArray.length; i++) {

                                        if (POServiceDataArray[i].PackageNo === SubPackageNo)
                                        {
                                            var POServiceDataAsJsonObject = {};

                                            POServiceDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;
                                            POServiceDataAsJsonObject["ServiceLinkID"] = (POServiceDataArray[i].ServiceLinkID === undefined ? "" : POServiceDataArray[i].ServiceLinkID);
                                            POServiceDataAsJsonObject["PrLineItemDataLinkId"] = POLineItemDataLinkId;
                                            POServiceDataAsJsonObject["PrItemNumber"] = itemNumber;
                                            POServiceDataAsJsonObject["Distribution"] = (POServiceDataArray[i].Distribution === undefined ? "" : POServiceDataArray[i].Distribution);
                                            POServiceDataAsJsonObject["PrLinePackageNo"] = PrLineItemPackageNo;
                                            POServiceDataAsJsonObject["PackageNo"] = (POServiceDataArray[i].PackageNo === undefined ? "" : POServiceDataArray[i].PackageNo);
                                            POServiceDataAsJsonObject["ServiceNumber"] = (POServiceDataArray[i].ServiceNumber === undefined ? "" : POServiceDataArray[i].ServiceNumber);
                                            POServiceDataAsJsonObject["ShortText"] = (POServiceDataArray[i].ShortText === undefined ? "" : POServiceDataArray[i].ShortText);
                                            POServiceDataAsJsonObject["Quantity"] = (POServiceDataArray[i].Quantity === undefined ? "" : POServiceDataArray[i].Quantity);
                                            POServiceDataAsJsonObject["Unit"] = (POServiceDataArray[i].Unit === undefined ? "" : POServiceDataArray[i].Unit);
                                            POServiceDataAsJsonObject["Currency"] = (POServiceDataArray[i].Currency === undefined ? "" : POServiceDataArray[i].Currency);
                                            POServiceDataAsJsonObject["NetPrice"] = (POServiceDataArray[i].NetPrice === undefined ? "" : POServiceDataArray[i].NetPrice);
                                            POServiceDataAsJsonObject["Edition"] = (POServiceDataArray[i].Edition === undefined ? "" : POServiceDataArray[i].Edition);
                                            POServiceDataAsJsonObject["LineItemLongText"] = (POServiceDataArray[i].LineItemLongText === undefined ? "" : POServiceDataArray[i].LineItemLongText);
                                            POServiceDataAsJsonObject["OverfTolerance"] = (POServiceDataArray[i].OverfTolerance === undefined ? "" : POServiceDataArray[i].OverfTolerance);
                                            POServiceDataAsJsonObject["GrossPrice"] = (POServiceDataArray[i].GrossPrice === undefined ? "" : POServiceDataArray[i].GrossPrice);
                                            POServiceDataAsJsonObject["LineItemNumber"] = (POServiceDataArray[i].LineItemNumber === undefined ? "" : POServiceDataArray[i].LineItemNumber);

                                            POServiceDataJsonArray.push(POServiceDataAsJsonObject);

                                            for (var j = 0; j < POAccntAssignvalDataArray.length; j++)
                                            {
                                                var POServiceAccAssDataAsJsonObject = {};
                                                if ((POServiceDataArray[i].PackageNo === POAccntAssignvalDataArray[j].PackageNo) && (POServiceDataArray[i].LineNo === POAccntAssignvalDataArray[j].LineNo))
                                                {
                                                    POServiceAccAssDataAsJsonObject["PackageNo"] = (POAccntAssignvalDataArray[j].PackageNo === undefined ? "" : POAccntAssignvalDataArray[j].PackageNo);
                                                    POServiceAccAssDataAsJsonObject["Quantity"] = (POAccntAssignvalDataArray[j].Quantity === "" ? "" : POAccntAssignvalDataArray[j].Quantity);
                                                    POServiceAccAssDataAsJsonObject["Percentage"] = (POAccntAssignvalDataArray[j].Percentage === "" ? "" : POAccntAssignvalDataArray[j].Percentage);
                                                    POServiceAccAssDataAsJsonObject["GLAccount"] = (POAccntAssignvalDataArray[j].GLAccount === "" ? "" : POAccntAssignvalDataArray[j].GLAccount);
                                                    POServiceAccAssDataAsJsonObject["CoArea"] = (POAccntAssignvalDataArray[j].CoArea === "" ? "" : POAccntAssignvalDataArray[j].CoArea);
                                                    POServiceAccAssDataAsJsonObject["CostCenter"] = (POAccntAssignvalDataArray[j].CostCenter === "" ? "" : POAccntAssignvalDataArray[j].CostCenter);
                                                    POServiceAccAssDataAsJsonObject["Fund"] = (POAccntAssignvalDataArray[j].Fund === "" ? "" : POAccntAssignvalDataArray[j].Fund);
                                                    POServiceAccAssDataAsJsonObject["FunctionalArea"] = (POAccntAssignvalDataArray[j].FunctionalArea === "" ? "" : POAccntAssignvalDataArray[j].FunctionalArea);
                                                    POServiceAccAssDataAsJsonObject["FundsCentre"] = (POAccntAssignvalDataArray[j].FundsCentre === "" ? "" : POAccntAssignvalDataArray[j].FundsCentre);
                                                    POServiceAccAssDataAsJsonObject["CommitmentItem"] = (POAccntAssignvalDataArray[j].CommitmentItem === "" ? "" : POAccntAssignvalDataArray[j].CommitmentItem);
                                                    POServiceAccAssDataAsJsonObject["Acc_Order"] = (POAccntAssignvalDataArray[j].Acc_Order === "" ? "" : POAccntAssignvalDataArray[j].Acc_Order);
                                                    POServiceAccAssDataAsJsonObject["Acc_Asset"] = (POAccntAssignvalDataArray[j].Acc_Asset === "" ? "" : POAccntAssignvalDataArray[j].Acc_Asset);
                                                    POServiceAccAssDataAsJsonObject["Acc_WBSElement"] = (POAccntAssignvalDataArray[j].Acc_WBSElement === "" ? "" : POAccntAssignvalDataArray[j].Acc_WBSElement);
                                                    POServiceAccAssDataAsJsonObject["SalesOrder"] = (POAccntAssignvalDataArray[j].SalesOrder === "" ? "" : POAccntAssignvalDataArray[j].SalesOrder);
                                                    POServiceAccAssDataAsJsonObject["ActivityNumber"] = (POAccntAssignvalDataArray[j].ActivityNumber === "" ? "" : POAccntAssignvalDataArray[j].ActivityNumber);
                                                    POServiceAccAssDataAsJsonObject["ItemNumber"] = (POAccntAssignvalDataArray[j].ItemNumber === "" ? "" : POAccntAssignvalDataArray[j].ItemNumber);
                                                    POServiceAccAssDataAsJsonObject["DeliverySchedule"] = (POAccntAssignvalDataArray[j].DeliverySchedule === "" ? "" : POAccntAssignvalDataArray[j].DeliverySchedule);

                                                    POServiceAccAssDataAsJsonObject["ServiceNumber"] = (POServiceDataArray[i].ServiceNumber === undefined ? "" : POServiceDataArray[i].ServiceNumber);
                                                    POServiceAccAssDataAsJsonObject["LineItemNumber"] = (POServiceDataArray[i].LineItemNumber === undefined ? "" : POServiceDataArray[i].LineItemNumber);

                                                    POServiceAccAssDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;
                                                    POServiceAccAssDataAsJsonObject["PrLineItemDataLinkId"] = POLineItemDataLinkId;
                                                    POServiceAccAssDataAsJsonObject["PrItemNumber"] = itemNumber;
                                                    POServiceAccAssDataAsJsonObject["AccountAssignment"] = PrAccAss;

                                                    POServiceAccAssDataAsJsonObject["Distribution"] = (POAccntAssignvalDataArray[j].Distribution === "" ? "" : POAccntAssignvalDataArray[j].Distribution);
                                                    POServiceAccAssDataAsJsonObject["SerialNo"] = (POAccntAssignvalDataArray[j].SerialNo === "" ? "" : POAccntAssignvalDataArray[j].SerialNo);
                                                    POServiceAccAssDataAsJsonObject["LinkNumber"] = (POAccntAssignvalDataArray[j].LinkNumber === "" ? "" : POAccntAssignvalDataArray[j].LinkNumber);
                                                    POServiceAccAssDataAsJsonObject["NETVALUE"] = (POAccntAssignvalDataArray[j].NETVALUE === "" ? "" : POAccntAssignvalDataArray[j].NETVALUE);

                                                    POServiceAccAssDataJsonArray.push(POServiceAccAssDataAsJsonObject);
                                                }
                                            }
                                        }
                                    }
                                }
                                else {
//                                alert("POServiceDataArray.PackageNo :" +POServiceDataArray.PackageNo + " SubPackageNo :" + SubPackageNo);
                                    if (POServiceDataArray.PackageNo === SubPackageNo)
                                    {
                                        var POServiceDataAsJsonObject = {};

                                        POServiceDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;
                                        POServiceDataAsJsonObject["ServiceLinkID"] = (POServiceDataArray.ServiceLinkID === undefined ? "" : POServiceDataArray.ServiceLinkID);
                                        POServiceDataAsJsonObject["PrLineItemDataLinkId"] = POLineItemDataLinkId;
                                        POServiceDataAsJsonObject["PrItemNumber"] = itemNumber;
                                        POServiceDataAsJsonObject["Distribution"] = (POServiceDataArray.Distribution === undefined ? "" : POServiceDataArray.Distribution);
                                        POServiceDataAsJsonObject["PrLinePackageNo"] = PrLineItemPackageNo;
                                        POServiceDataAsJsonObject["PackageNo"] = (POServiceDataArray.PackageNo === undefined ? "" : POServiceDataArray.PackageNo);
                                        POServiceDataAsJsonObject["LineItemNumber"] = (POServiceDataArray.LineItemNumber === undefined ? "" : POServiceDataArray.LineItemNumber);
                                        POServiceDataAsJsonObject["ServiceNumber"] = (POServiceDataArray.ServiceNumber === undefined ? "" : POServiceDataArray.ServiceNumber);
                                        POServiceDataAsJsonObject["ShortText"] = (POServiceDataArray.ShortText === undefined ? "" : POServiceDataArray.ShortText);
                                        POServiceDataAsJsonObject["Quantity"] = (POServiceDataArray.Quantity === undefined ? "" : POServiceDataArray.Quantity);
                                        POServiceDataAsJsonObject["Unit"] = (POServiceDataArray.Unit === undefined ? "" : POServiceDataArray.Unit);
                                        POServiceDataAsJsonObject["Currency"] = (POServiceDataArray.Currency === undefined ? "" : POServiceDataArray.Currency);
                                        POServiceDataAsJsonObject["NetPrice"] = (POServiceDataArray.NetPrice === undefined ? "" : POServiceDataArray.NetPrice);
                                        POServiceDataAsJsonObject["Edition"] = (POServiceDataArray.Edition === undefined ? "" : POServiceDataArray.Edition);
                                        POServiceDataAsJsonObject["LineItemLongText"] = (POServiceDataArray.LineItemLongText === undefined ? "" : POServiceDataArray.LineItemLongText);
                                        POServiceDataAsJsonObject["OverfTolerance"] = (POServiceDataArray.OverfTolerance === undefined ? "" : POServiceDataArray.OverfTolerance);
                                        POServiceDataAsJsonObject["GrossPrice"] = (POServiceDataArray.GrossPrice === undefined ? "" : POServiceDataArray.GrossPrice);
                                        POServiceDataAsJsonObject["LineItemNumber"] = (POServiceDataArray.LineItemNumber === undefined ? "" : POServiceDataArray.LineItemNumber);

                                        POServiceDataJsonArray.push(POServiceDataAsJsonObject);

//                                    alert("Is Array :" + Array.isArray(POAccntAssignvalDataArray));
                                        if (Array.isArray(POAccntAssignvalDataArray) === true)
                                        {
                                            console.log("Else POAccntAssignvalDataArray len: " + POAccntAssignvalDataArray.length);
                                            for (var j = 0; j < POAccntAssignvalDataArray.length; j++)
                                            {
                                                var POServiceAccAssDataAsJsonObject = {};
                                                if ((POServiceDataArray.PackageNo === POAccntAssignvalDataArray[j].PackageNo) && (POServiceDataArray.LineNo === POAccntAssignvalDataArray[j].LineNo))
                                                {
                                                    POServiceAccAssDataAsJsonObject["PackageNo"] = (POAccntAssignvalDataArray[j].PackageNo === undefined ? "" : POAccntAssignvalDataArray[j].PackageNo);
                                                    POServiceAccAssDataAsJsonObject["Quantity"] = (POAccntAssignvalDataArray[j].Quantity === "" ? "" : POAccntAssignvalDataArray[j].Quantity);
                                                    POServiceAccAssDataAsJsonObject["Percentage"] = (POAccntAssignvalDataArray[j].Percentage === "" ? "" : POAccntAssignvalDataArray[j].Percentage);
                                                    POServiceAccAssDataAsJsonObject["GLAccount"] = (POAccntAssignvalDataArray[j].GLAccount === "" ? "" : POAccntAssignvalDataArray[j].GLAccount);
                                                    POServiceAccAssDataAsJsonObject["CoArea"] = (POAccntAssignvalDataArray[j].CoArea === "" ? "" : POAccntAssignvalDataArray[j].CoArea);
                                                    POServiceAccAssDataAsJsonObject["CostCenter"] = (POAccntAssignvalDataArray[j].CostCenter === "" ? "" : POAccntAssignvalDataArray[j].CostCenter);
                                                    POServiceAccAssDataAsJsonObject["Fund"] = (POAccntAssignvalDataArray[j].Fund === "" ? "" : POAccntAssignvalDataArray[j].Fund);
                                                    POServiceAccAssDataAsJsonObject["FunctionalArea"] = (POAccntAssignvalDataArray[j].FunctionalArea === "" ? "" : POAccntAssignvalDataArray[j].FunctionalArea);
                                                    POServiceAccAssDataAsJsonObject["FundsCentre"] = (POAccntAssignvalDataArray[j].FundsCentre === "" ? "" : POAccntAssignvalDataArray[j].FundsCentre);
                                                    POServiceAccAssDataAsJsonObject["CommitmentItem"] = (POAccntAssignvalDataArray[j].CommitmentItem === "" ? "" : POAccntAssignvalDataArray[j].CommitmentItem);
                                                    POServiceAccAssDataAsJsonObject["Acc_Order"] = (POAccntAssignvalDataArray[j].Acc_Order === "" ? "" : POAccntAssignvalDataArray[j].Acc_Order);
                                                    POServiceAccAssDataAsJsonObject["Acc_Asset"] = (POAccntAssignvalDataArray[j].Acc_Asset === "" ? "" : POAccntAssignvalDataArray[j].Acc_Asset);
                                                    POServiceAccAssDataAsJsonObject["Acc_WBSElement"] = (POAccntAssignvalDataArray[j].Acc_WBSElement === "" ? "" : POAccntAssignvalDataArray[j].Acc_WBSElement);
                                                    POServiceAccAssDataAsJsonObject["SalesOrder"] = (POAccntAssignvalDataArray[j].SalesOrder === "" ? "" : POAccntAssignvalDataArray[j].SalesOrder);
                                                    POServiceAccAssDataAsJsonObject["ActivityNumber"] = (POAccntAssignvalDataArray[j].ActivityNumber === "" ? "" : POAccntAssignvalDataArray[j].ActivityNumber);
                                                    POServiceAccAssDataAsJsonObject["ItemNumber"] = (POAccntAssignvalDataArray[j].ItemNumber === "" ? "" : POAccntAssignvalDataArray[j].ItemNumber);
                                                    POServiceAccAssDataAsJsonObject["DeliverySchedule"] = (POAccntAssignvalDataArray[j].DeliverySchedule === "" ? "" : POAccntAssignvalDataArray[j].DeliverySchedule);

                                                    POServiceAccAssDataAsJsonObject["ServiceNumber"] = (POServiceDataArray.ServiceNumber === undefined ? "" : POServiceDataArray.ServiceNumber);
                                                    POServiceAccAssDataAsJsonObject["LineItemNumber"] = (POServiceDataArray.LineItemNumber === undefined ? "" : POServiceDataArray.LineItemNumber);

                                                    POServiceAccAssDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;
                                                    POServiceAccAssDataAsJsonObject["PrLineItemDataLinkId"] = POLineItemDataLinkId;
                                                    POServiceAccAssDataAsJsonObject["PrItemNumber"] = itemNumber;
                                                    POServiceAccAssDataAsJsonObject["AccountAssignment"] = PrAccAss;

                                                    POServiceAccAssDataAsJsonObject["Distribution"] = (POAccntAssignvalDataArray[j].Distribution === "" ? "" : POAccntAssignvalDataArray[j].Distribution);
                                                    POServiceAccAssDataAsJsonObject["SerialNo"] = (POAccntAssignvalDataArray[j].SerialNo === "" ? "" : POAccntAssignvalDataArray[j].SerialNo);
                                                    POServiceAccAssDataAsJsonObject["LinkNumber"] = (POAccntAssignvalDataArray[j].LinkNumber === "" ? "" : POAccntAssignvalDataArray[j].LinkNumber);
                                                    POServiceAccAssDataAsJsonObject["NETVALUE"] = (POAccntAssignvalDataArray[j].NETVALUE === "" ? "" : POAccntAssignvalDataArray[j].NETVALUE);

                                                    POServiceAccAssDataJsonArray.push(POServiceAccAssDataAsJsonObject);
                                                }
                                            }
                                        }
                                        else
                                        {
//                                        alert("POServiceDataArray.PackageNo :" + POServiceDataArray.PackageNo + " POAccntAssignvalDataArray.PackageNo :" + POAccntAssignvalDataArray.PackageNo);
                                            var POServiceAccAssDataAsJsonObject = {};
                                            if ((POServiceDataArray.PackageNo === POAccntAssignvalDataArray.PackageNo) && (POServiceDataArray.LineNo === POAccntAssignvalDataArray.LineNo))
                                            {
                                                POServiceAccAssDataAsJsonObject["PackageNo"] = (POAccntAssignvalDataArray.PackageNo === undefined ? "" : POAccntAssignvalDataArray.PackageNo);
                                                POServiceAccAssDataAsJsonObject["Quantity"] = (POAccntAssignvalDataArray.Quantity === "" ? "" : POAccntAssignvalDataArray.Quantity);
                                                POServiceAccAssDataAsJsonObject["Percentage"] = (POAccntAssignvalDataArray.Percentage === "" ? "" : POAccntAssignvalDataArray.Percentage);
                                                POServiceAccAssDataAsJsonObject["GLAccount"] = (POAccntAssignvalDataArray.GLAccount === "" ? "" : POAccntAssignvalDataArray.GLAccount);
                                                POServiceAccAssDataAsJsonObject["CoArea"] = (POAccntAssignvalDataArray.CoArea === "" ? "" : POAccntAssignvalDataArray.CoArea);
                                                POServiceAccAssDataAsJsonObject["CostCenter"] = (POAccntAssignvalDataArray.CostCenter === "" ? "" : POAccntAssignvalDataArray.CostCenter);
                                                POServiceAccAssDataAsJsonObject["Fund"] = (POAccntAssignvalDataArray.Fund === "" ? "" : POAccntAssignvalDataArray.Fund);
                                                POServiceAccAssDataAsJsonObject["FunctionalArea"] = (POAccntAssignvalDataArray.FunctionalArea === "" ? "" : POAccntAssignvalDataArray.FunctionalArea);
                                                POServiceAccAssDataAsJsonObject["FundsCentre"] = (POAccntAssignvalDataArray.FundsCentre === "" ? "" : POAccntAssignvalDataArray.FundsCentre);
                                                POServiceAccAssDataAsJsonObject["CommitmentItem"] = (POAccntAssignvalDataArray.CommitmentItem === "" ? "" : POAccntAssignvalDataArray.CommitmentItem);
                                                POServiceAccAssDataAsJsonObject["Acc_Order"] = (POAccntAssignvalDataArray.Acc_Order === "" ? "" : POAccntAssignvalDataArray.Acc_Order);
                                                POServiceAccAssDataAsJsonObject["Acc_Asset"] = (POAccntAssignvalDataArray.Acc_Asset === "" ? "" : POAccntAssignvalDataArray.Acc_Asset);
                                                POServiceAccAssDataAsJsonObject["Acc_WBSElement"] = (POAccntAssignvalDataArray.Acc_WBSElement === "" ? "" : POAccntAssignvalDataArray.Acc_WBSElement);
                                                POServiceAccAssDataAsJsonObject["SalesOrder"] = (POAccntAssignvalDataArray.SalesOrder === "" ? "" : POAccntAssignvalDataArray.SalesOrder);
                                                POServiceAccAssDataAsJsonObject["ActivityNumber"] = (POAccntAssignvalDataArray.ActivityNumber === "" ? "" : POAccntAssignvalDataArray.ActivityNumber);
                                                POServiceAccAssDataAsJsonObject["ItemNumber"] = (POAccntAssignvalDataArray.ItemNumber === "" ? "" : POAccntAssignvalDataArray.ItemNumber);
                                                POServiceAccAssDataAsJsonObject["DeliverySchedule"] = (POAccntAssignvalDataArray.DeliverySchedule === "" ? "" : POAccntAssignvalDataArray.DeliverySchedule);

                                                POServiceAccAssDataAsJsonObject["ServiceNumber"] = (POServiceDataArray.ServiceNumber === undefined ? "" : POServiceDataArray.ServiceNumber);
                                                POServiceAccAssDataAsJsonObject["LineItemNumber"] = (POServiceDataArray.LineItemNumber === undefined ? "" : POServiceDataArray.LineItemNumber);

                                                POServiceAccAssDataAsJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;
                                                POServiceAccAssDataAsJsonObject["PrLineItemDataLinkId"] = POLineItemDataLinkId;
                                                POServiceAccAssDataAsJsonObject["PrItemNumber"] = itemNumber;
                                                POServiceAccAssDataAsJsonObject["AccountAssignment"] = PrAccAss;

                                                POServiceAccAssDataAsJsonObject["Distribution"] = (POAccntAssignvalDataArray.Distribution === "" ? "" : POAccntAssignvalDataArray.Distribution);
                                                POServiceAccAssDataAsJsonObject["SerialNo"] = (POAccntAssignvalDataArray.SerialNo === "" ? "" : POAccntAssignvalDataArray.SerialNo);
                                                POServiceAccAssDataAsJsonObject["LinkNumber"] = (POAccntAssignvalDataArray.LinkNumber === "" ? "" : POAccntAssignvalDataArray.LinkNumber);
                                                POServiceAccAssDataAsJsonObject["NETVALUE"] = (POAccntAssignvalDataArray.NETVALUE === "" ? "" : POAccntAssignvalDataArray.NETVALUE);

                                                POServiceAccAssDataJsonArray.push(POServiceAccAssDataAsJsonObject);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            // POServiceData Ends
            // POMaterialData Starts
            var POMaterialDataArray = parsedJsonPoData.POFetchOP.POMaterialData;
            console.log("POMaterialDataArray: " + JSON.stringify(POMaterialDataArray));
            console.log("POMaterialDataArray is Array: " + Array.isArray(POMaterialDataArray));
            if (POMaterialDataArray !== undefined)
            {
                if (Array.isArray(POMaterialDataArray) === true)
                {
                    console.log("POMaterialDataArray len: " + POMaterialDataArray.length);
                    for (var i = 0; i < POMaterialDataArray.length; i++)
                    {
                        if (POLineItemDataLinkId === POMaterialDataArray[i].LinkId)
                        {
                            var POMaterialDataJsonObject = {};

//                            POMaterialDataJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;
                            POMaterialDataJsonObject["ItemNo"] = POMaterialDataArray[i].ItemNo === undefined ? "" : POMaterialDataArray[i].ItemNo;
                            POMaterialDataJsonObject["LinkId"] = POMaterialDataArray[i].LinkId === undefined ? "" : POMaterialDataArray[i].LinkId;
                            POMaterialDataJsonObject["MfrPartNumber"] = POMaterialDataArray[i].MfrPartNumber === undefined ? "" : POMaterialDataArray[i].MfrPartNumber;
                            POMaterialDataJsonObject["Manufacturer"] = POMaterialDataArray[i].Manufacturer === undefined ? "" : POMaterialDataArray[i].Manufacturer;
                            POMaterialDataJsonObject["RevisionLevel"] = POMaterialDataArray[i].revisionlevel === undefined ? "" : POMaterialDataArray[i].revisionlevel;
                            POMaterialDataJsonObject["VendMatNo"] = POMaterialDataArray[i].VendMatno === undefined ? "" : POMaterialDataArray[i].VendMatno;
                            POMaterialDataJsonObject["EANUPC"] = POMaterialDataArray[i].EANUPC === undefined ? "" : POMaterialDataArray[i].EANUPC;
                            POMaterialDataJsonObject["VendorSubrange"] = POMaterialDataArray[i].Vendorsubrange === undefined ? "" : POMaterialDataArray[i].Vendorsubrange;
                            POMaterialDataJsonObject["Batch"] = POMaterialDataArray[i].Batch === undefined ? "" : POMaterialDataArray[i].Batch;
                            POMaterialDataJsonObject["VendorBatch"] = POMaterialDataArray[i].vendorbatch === undefined ? "" : POMaterialDataArray[i].vendorbatch;
                            POMaterialDataJsonObject["InfoUpdate"] = POMaterialDataArray[i].infoupdate === undefined ? "" : POMaterialDataArray[i].infoupdate;

                            POMaterialDataJsonArray.push(POMaterialDataJsonObject);
                        }
                    }
                }
                else
                {
                    if (POLineItemDataLinkId === POMaterialDataArray.LinkId)
                    {
                        var POMaterialDataJsonObject = {};

//                        POMaterialDataJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;
                        POMaterialDataJsonObject["ItemNo"] = POMaterialDataArray.ItemNo === undefined ? "" : POMaterialDataArray.ItemNo;
                        POMaterialDataJsonObject["LinkId"] = POMaterialDataArray.LinkId === undefined ? "" : POMaterialDataArray.LinkId;
                        POMaterialDataJsonObject["MfrPartNumber"] = POMaterialDataArray.MfrPartNumber === undefined ? "" : POMaterialDataArray.MfrPartNumber;
                        POMaterialDataJsonObject["Manufacturer"] = POMaterialDataArray.Manufacturer === undefined ? "" : POMaterialDataArray.Manufacturer;
                        POMaterialDataJsonObject["RevisionLevel"] = POMaterialDataArray.revisionlevel === undefined ? "" : POMaterialDataArray.revisionlevel;
                        POMaterialDataJsonObject["VendMatNo"] = POMaterialDataArray.VendMatno === undefined ? "" : POMaterialDataArray.VendMatno;
                        POMaterialDataJsonObject["EANUPC"] = POMaterialDataArray.EANUPC === undefined ? "" : POMaterialDataArray.EANUPC;
                        POMaterialDataJsonObject["VendorSubrange"] = POMaterialDataArray.Vendorsubrange === undefined ? "" : POMaterialDataArray.Vendorsubrange;
                        POMaterialDataJsonObject["Batch"] = POMaterialDataArray.Batch === undefined ? "" : POMaterialDataArray.Batch;
                        POMaterialDataJsonObject["VendorBatch"] = POMaterialDataArray.vendorbatch === undefined ? "" : POMaterialDataArray.vendorbatch;
                        POMaterialDataJsonObject["InfoUpdate"] = POMaterialDataArray.infoupdate === undefined ? "" : POMaterialDataArray.infoupdate;

                        POMaterialDataJsonArray.push(POMaterialDataJsonObject);
                    }
                }
            }
            // POMaterialData Ends
            // POComponentsData Starts
            var POComponentsDataArray = parsedJsonPoData.POFetchOP.POComponentsData;
            console.log("POComponentsDataArray: " + JSON.stringify(POComponentsDataArray));
            console.log("POComponentsDataArray is Array: " + Array.isArray(POComponentsDataArray));
            if (POComponentsDataArray !== undefined)
            {
                if (Array.isArray(POComponentsDataArray) === true)
                {
                    console.log("POComponentsDataArray len: " + POComponentsDataArray.length);
                    for (var i = 0; i < POComponentsDataArray.length; i++)
                    {
                        if (POLineItemDataLinkId === POComponentsDataArray[i].LinkId)
                        {
                            var POComponentsDataJsonObject = {};

//                            POComponentsDataJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;
                            POComponentsDataJsonObject["ItemNo"] = POComponentsDataArray[i].itemno === undefined ? "" : POComponentsDataArray[i].itemno;
                            POComponentsDataJsonObject["LinkId"] = POComponentsDataArray[i].LinkId === undefined ? "" : POComponentsDataArray[i].LinkId;
                            POComponentsDataJsonObject["MaterialCode"] = POComponentsDataArray[i].MaterialCode === undefined ? "" : POComponentsDataArray[i].MaterialCode;
                            POComponentsDataJsonObject["Description"] = POComponentsDataArray[i].Description === undefined ? "" : POComponentsDataArray[i].Description;
                            POComponentsDataJsonObject["Quantity"] = POComponentsDataArray[i].Quantity === undefined ? "" : POComponentsDataArray[i].Quantity;
                            POComponentsDataJsonObject["Plant"] = POComponentsDataArray[i].Plant === undefined ? "" : POComponentsDataArray[i].Plant;
                            POComponentsDataJsonObject["Unit"] = POComponentsDataArray[i].Unit === undefined ? "" : POComponentsDataArray[i].Unit;
                            POComponentsDataJsonObject["FixedQty"] = POComponentsDataArray[i].FixedQty === undefined ? "" : POComponentsDataArray[i].FixedQty;
                            POComponentsDataJsonObject["ProdStorageLocation"] = POComponentsDataArray[i].ProdStorageLocation === undefined ? "" : POComponentsDataArray[i].ProdStorageLocation;
                            POComponentsDataJsonObject["RequirementDate"] = POComponentsDataArray[i].RequirementDate === undefined ? "" : POComponentsDataArray[i].RequirementDate;
                            POComponentsDataJsonObject["QtyFixed"] = POComponentsDataArray[i].qtyfixed === undefined ? "" : POComponentsDataArray[i].qtyfixed;
                            POComponentsDataJsonObject["LatestReqDate"] = POComponentsDataArray[i].latestreqdate === undefined ? "" : POComponentsDataArray[i].latestreqdate;
                            POComponentsDataJsonObject["DistribKey"] = POComponentsDataArray[i].distribkey === undefined ? "" : POComponentsDataArray[i].distribkey;
                            POComponentsDataJsonObject["Batch"] = POComponentsDataArray[i].batch === undefined ? "" : POComponentsDataArray[i].batch;

                            POComponentsDataJsonArray.push(POComponentsDataJsonObject);
                        }
                    }
                }
                else
                {
                    if (POLineItemDataLinkId === POComponentsDataArray.LinkId)
                    {
                        var POComponentsDataJsonObject = {};

//                        POComponentsDataJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;
                        POComponentsDataJsonObject["ItemNo"] = POComponentsDataArray.itemno === undefined ? "" : POComponentsDataArray.itemno;
                        POComponentsDataJsonObject["LinkId"] = POComponentsDataArray.LinkId === undefined ? "" : POComponentsDataArray.LinkId;
                        POComponentsDataJsonObject["MaterialCode"] = POComponentsDataArray.MaterialCode === undefined ? "" : POComponentsDataArray.MaterialCode;
                        POComponentsDataJsonObject["Description"] = POComponentsDataArray.Description === undefined ? "" : POComponentsDataArray.Description;
                        POComponentsDataJsonObject["Quantity"] = POComponentsDataArray.Quantity === undefined ? "" : POComponentsDataArray.Quantity;
                        POComponentsDataJsonObject["Plant"] = POComponentsDataArray.Plant === undefined ? "" : POComponentsDataArray.Plant;
                        POComponentsDataJsonObject["Unit"] = POComponentsDataArray.Unit === undefined ? "" : POComponentsDataArray.Unit;
                        POComponentsDataJsonObject["FixedQty"] = POComponentsDataArray.FixedQty === undefined ? "" : POComponentsDataArray.FixedQty;
                        POComponentsDataJsonObject["ProdStorageLocation"] = POComponentsDataArray.ProdStorageLocation === undefined ? "" : POComponentsDataArray.ProdStorageLocation;
                        POComponentsDataJsonObject["RequirementDate"] = POComponentsDataArray.RequirementDate === undefined ? "" : POComponentsDataArray.RequirementDate;
                        POComponentsDataJsonObject["qtyfixed"] = POComponentsDataArray.qtyfixed === undefined ? "" : POComponentsDataArray.qtyfixed;
                        POComponentsDataJsonObject["latestreqdate"] = POComponentsDataArray.latestreqdate === undefined ? "" : POComponentsDataArray.latestreqdate;
                        POComponentsDataJsonObject["distribkey"] = POComponentsDataArray.distribkey === undefined ? "" : POComponentsDataArray.distribkey;
                        POComponentsDataJsonObject["batch"] = POComponentsDataArray.batch === undefined ? "" : POComponentsDataArray.batch;

                        POComponentsDataJsonArray.push(POComponentsDataJsonObject);
                    }
                }
            }
            // POComponentsData Ends
            // POProfitabilitySegmentDetailsData Starts
            var POProfitabilitySegmentDetailsDataArray = parsedJsonPoData.POFetchOP.POProfitabilitySegmentDetailsData;
            console.log("POProfitabilitySegmentDetailsDataArray: " + JSON.stringify(POProfitabilitySegmentDetailsDataArray));
            console.log("POProfitabilitySegmentDetailsDataArray is Array: " + Array.isArray(POProfitabilitySegmentDetailsDataArray));
            if (POProfitabilitySegmentDetailsDataArray !== undefined)
            {
                if (Array.isArray(POProfitabilitySegmentDetailsDataArray) === true)
                {
                    console.log("POProfitabilitySegmentDetailsDataArray len: " + POProfitabilitySegmentDetailsDataArray.length);
                    for (var i = 0; i < POProfitabilitySegmentDetailsDataArray.length; i++)
                    {
                        if (POLineItemDataLinkId === POProfitabilitySegmentDetailsDataArray[i].LinkId)
                        {
                            var POProfitabilitySegmentDetailsDataJsonObject = {};

//                            POProfitabilitySegmentDetailsDataJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;
                            POProfitabilitySegmentDetailsDataJsonObject["ItemNo"] = POProfitabilitySegmentDetailsDataArray[i].Itemno === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].Itemno;
                            POProfitabilitySegmentDetailsDataJsonObject["LinkId"] = POProfitabilitySegmentDetailsDataArray[i].LinkID === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].LinkID;
                            POProfitabilitySegmentDetailsDataJsonObject["CustomerCode"] = POProfitabilitySegmentDetailsDataArray[i].CustomerCode === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].CustomerCode;
                            POProfitabilitySegmentDetailsDataJsonObject["Product"] = POProfitabilitySegmentDetailsDataArray[i].Product === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].Product;
                            POProfitabilitySegmentDetailsDataJsonObject["BillingType"] = POProfitabilitySegmentDetailsDataArray[i].BillingType === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].BillingType;
                            POProfitabilitySegmentDetailsDataJsonObject["SalesOrder"] = POProfitabilitySegmentDetailsDataArray[i].SalesOrder === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].SalesOrder;
                            POProfitabilitySegmentDetailsDataJsonObject["ItemNumber"] = POProfitabilitySegmentDetailsDataArray[i].ItemNumber === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].ItemNumber;
                            POProfitabilitySegmentDetailsDataJsonObject["OrderVal"] = POProfitabilitySegmentDetailsDataArray[i].OrderVal === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].OrderVal;
                            POProfitabilitySegmentDetailsDataJsonObject["CompanyCode"] = POProfitabilitySegmentDetailsDataArray[i].CompanyCode === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].CompanyCode;
                            POProfitabilitySegmentDetailsDataJsonObject["Plant"] = POProfitabilitySegmentDetailsDataArray[i].Plant === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].Plant;
                            POProfitabilitySegmentDetailsDataJsonObject["BusinessArea"] = POProfitabilitySegmentDetailsDataArray[i].BusinessArea === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].BusinessArea;
                            POProfitabilitySegmentDetailsDataJsonObject["SalesOrganization"] = POProfitabilitySegmentDetailsDataArray[i].SalesOrganization === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].SalesOrganization;
                            POProfitabilitySegmentDetailsDataJsonObject["DistrChannel"] = POProfitabilitySegmentDetailsDataArray[i].DistrChannel === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].DistrChannel;
                            POProfitabilitySegmentDetailsDataJsonObject["Division"] = POProfitabilitySegmentDetailsDataArray[i].Division === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].Division;
                            POProfitabilitySegmentDetailsDataJsonObject["WBSElement"] = POProfitabilitySegmentDetailsDataArray[i].WBSElement === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].WBSElement;
                            POProfitabilitySegmentDetailsDataJsonObject["CostObject"] = POProfitabilitySegmentDetailsDataArray[i].CostObject === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].CostObject;
                            POProfitabilitySegmentDetailsDataJsonObject["ProfitCentre"] = POProfitabilitySegmentDetailsDataArray[i].ProfitCentre === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].ProfitCentre;
                            POProfitabilitySegmentDetailsDataJsonObject["PartnerPC"] = POProfitabilitySegmentDetailsDataArray[i].PartnerPC === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].PartnerPC;
                            POProfitabilitySegmentDetailsDataJsonObject["Country"] = POProfitabilitySegmentDetailsDataArray[i].Country === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].Country;
                            POProfitabilitySegmentDetailsDataJsonObject["SalesOffice"] = POProfitabilitySegmentDetailsDataArray[i].SalesOffice === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].SalesOffice;
                            POProfitabilitySegmentDetailsDataJsonObject["SalesEmployee"] = POProfitabilitySegmentDetailsDataArray[i].SalesEmployee === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].SalesEmployee;
                            POProfitabilitySegmentDetailsDataJsonObject["MatlGroup"] = POProfitabilitySegmentDetailsDataArray[i].MatlGroup === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].MatlGroup;
                            POProfitabilitySegmentDetailsDataJsonObject["ProdHierarchy"] = POProfitabilitySegmentDetailsDataArray[i].ProdHierarchy === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].ProdHierarchy;
                            POProfitabilitySegmentDetailsDataJsonObject["ItemCategory"] = POProfitabilitySegmentDetailsDataArray[i].ItemCategory === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].ItemCategory;
                            POProfitabilitySegmentDetailsDataJsonObject["HigherLevelItem"] = POProfitabilitySegmentDetailsDataArray[i].HigherLevelItem === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].HigherLevelItem;
                            POProfitabilitySegmentDetailsDataJsonObject["Industry"] = POProfitabilitySegmentDetailsDataArray[i].Industry === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].Industry;
                            POProfitabilitySegmentDetailsDataJsonObject["CustomerGroup"] = POProfitabilitySegmentDetailsDataArray[i].CustomerGroup === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].CustomerGroup;
                            POProfitabilitySegmentDetailsDataJsonObject["ProductHierLevel1"] = POProfitabilitySegmentDetailsDataArray[i].ProductHierLevel1 === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].ProductHierLevel1;
                            POProfitabilitySegmentDetailsDataJsonObject["ProductHierLevel2"] = POProfitabilitySegmentDetailsDataArray[i].ProductHierLevel2 === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].ProductHierLevel2;
                            POProfitabilitySegmentDetailsDataJsonObject["ProductHierLevel3"] = POProfitabilitySegmentDetailsDataArray[i].ProductHierLevel3 === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].ProductHierLevel3;
                            POProfitabilitySegmentDetailsDataJsonObject["MaterialType"] = POProfitabilitySegmentDetailsDataArray[i].MaterialType === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].MaterialType;
                            POProfitabilitySegmentDetailsDataJsonObject["ReferenceDoc"] = POProfitabilitySegmentDetailsDataArray[i].ReferenceDoc === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].ReferenceDoc;
                            POProfitabilitySegmentDetailsDataJsonObject["PROJECTNUMBER1"] = POProfitabilitySegmentDetailsDataArray[i].PROJECTNUMBER1 === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].PROJECTNUMBER1;
                            POProfitabilitySegmentDetailsDataJsonObject["ProjectIndicator"] = POProfitabilitySegmentDetailsDataArray[i].ProjectIndicator === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].ProjectIndicator;
                            POProfitabilitySegmentDetailsDataJsonObject["ValuationType"] = POProfitabilitySegmentDetailsDataArray[i].ValuationType === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].ValuationType;
                            POProfitabilitySegmentDetailsDataJsonObject["CustomerClass"] = POProfitabilitySegmentDetailsDataArray[i].CustomerClass === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].CustomerClass;
                            POProfitabilitySegmentDetailsDataJsonObject["MaterialSourceInd"] = POProfitabilitySegmentDetailsDataArray[i].MaterialSourceInd === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].MaterialSourceInd;
                            POProfitabilitySegmentDetailsDataJsonObject["ContractType"] = POProfitabilitySegmentDetailsDataArray[i].ContractType === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].ContractType;
                            POProfitabilitySegmentDetailsDataJsonObject["ShipToParty"] = POProfitabilitySegmentDetailsDataArray[i].ShipToParty === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].ShipToParty;
                            POProfitabilitySegmentDetailsDataJsonObject["IndustryCode1"] = POProfitabilitySegmentDetailsDataArray[i].IndustryCode1 === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].IndustryCode1;
                            POProfitabilitySegmentDetailsDataJsonObject["IndustryField1"] = POProfitabilitySegmentDetailsDataArray[i].IndustryField1 === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].IndustryField1;
                            POProfitabilitySegmentDetailsDataJsonObject["IndustryCode2"] = POProfitabilitySegmentDetailsDataArray[i].IndustryCode2 === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].IndustryCode2;
                            POProfitabilitySegmentDetailsDataJsonObject["IndustryCode3"] = POProfitabilitySegmentDetailsDataArray[i].IndustryCode3 === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].IndustryCode3;
                            POProfitabilitySegmentDetailsDataJsonObject["ReferenceItem"] = POProfitabilitySegmentDetailsDataArray[i].ReferenceItem === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].ReferenceItem;
                            POProfitabilitySegmentDetailsDataJsonObject["SalesDocType"] = POProfitabilitySegmentDetailsDataArray[i].SalesDocType === undefined ? "" : POProfitabilitySegmentDetailsDataArray[i].SalesDocType;

                            POProfitabilitySegmentDetailsDataJsonArray.push(POProfitabilitySegmentDetailsDataJsonObject);
                        }
                    }
                }
                else
                {
                    if (POLineItemDataLinkId === POProfitabilitySegmentDetailsDataArray.LinkId)
                    {
                        var POProfitabilitySegmentDetailsDataJsonObject = {};

//                        POProfitabilitySegmentDetailsDataJsonObject["PrInsertionOrderId"] = PrInsertionOrderId;
                        POProfitabilitySegmentDetailsDataJsonObject["ItemNo"] = POProfitabilitySegmentDetailsDataArray.Itemno === undefined ? "" : POProfitabilitySegmentDetailsDataArray.Itemno;
                        POProfitabilitySegmentDetailsDataJsonObject["LinkId"] = POProfitabilitySegmentDetailsDataArray.LinkID === undefined ? "" : POProfitabilitySegmentDetailsDataArray.LinkID;
                        POProfitabilitySegmentDetailsDataJsonObject["CustomerCode"] = POProfitabilitySegmentDetailsDataArray.CustomerCode === undefined ? "" : POProfitabilitySegmentDetailsDataArray.CustomerCode;
                        POProfitabilitySegmentDetailsDataJsonObject["Product"] = POProfitabilitySegmentDetailsDataArray.Product === undefined ? "" : POProfitabilitySegmentDetailsDataArray.Product;
                        POProfitabilitySegmentDetailsDataJsonObject["BillingType"] = POProfitabilitySegmentDetailsDataArray.BillingType === undefined ? "" : POProfitabilitySegmentDetailsDataArray.BillingType;
                        POProfitabilitySegmentDetailsDataJsonObject["SalesOrder"] = POProfitabilitySegmentDetailsDataArray.SalesOrder === undefined ? "" : POProfitabilitySegmentDetailsDataArray.SalesOrder;
                        POProfitabilitySegmentDetailsDataJsonObject["ItemNumber"] = POProfitabilitySegmentDetailsDataArray.ItemNumber === undefined ? "" : POProfitabilitySegmentDetailsDataArray.ItemNumber;
                        POProfitabilitySegmentDetailsDataJsonObject["OrderVal"] = POProfitabilitySegmentDetailsDataArray.OrderVal === undefined ? "" : POProfitabilitySegmentDetailsDataArray.OrderVal;
                        POProfitabilitySegmentDetailsDataJsonObject["CompanyCode"] = POProfitabilitySegmentDetailsDataArray.CompanyCode === undefined ? "" : POProfitabilitySegmentDetailsDataArray.CompanyCode;
                        POProfitabilitySegmentDetailsDataJsonObject["Plant"] = POProfitabilitySegmentDetailsDataArray.Plant === undefined ? "" : POProfitabilitySegmentDetailsDataArray.Plant;
                        POProfitabilitySegmentDetailsDataJsonObject["BusinessArea"] = POProfitabilitySegmentDetailsDataArray.BusinessArea === undefined ? "" : POProfitabilitySegmentDetailsDataArray.BusinessArea;
                        POProfitabilitySegmentDetailsDataJsonObject["SalesOrganization"] = POProfitabilitySegmentDetailsDataArray.SalesOrganization === undefined ? "" : POProfitabilitySegmentDetailsDataArray.SalesOrganization;
                        POProfitabilitySegmentDetailsDataJsonObject["DistrChannel"] = POProfitabilitySegmentDetailsDataArray.DistrChannel === undefined ? "" : POProfitabilitySegmentDetailsDataArray.DistrChannel;
                        POProfitabilitySegmentDetailsDataJsonObject["Division"] = POProfitabilitySegmentDetailsDataArray.Division === undefined ? "" : POProfitabilitySegmentDetailsDataArray.Division;
                        POProfitabilitySegmentDetailsDataJsonObject["WBSElement"] = POProfitabilitySegmentDetailsDataArray.WBSElement === undefined ? "" : POProfitabilitySegmentDetailsDataArray.WBSElement;
                        POProfitabilitySegmentDetailsDataJsonObject["CostObject"] = POProfitabilitySegmentDetailsDataArray.CostObject === undefined ? "" : POProfitabilitySegmentDetailsDataArray.CostObject;
                        POProfitabilitySegmentDetailsDataJsonObject["ProfitCentre"] = POProfitabilitySegmentDetailsDataArray.ProfitCentre === undefined ? "" : POProfitabilitySegmentDetailsDataArray.ProfitCentre;
                        POProfitabilitySegmentDetailsDataJsonObject["PartnerPC"] = POProfitabilitySegmentDetailsDataArray.PartnerPC === undefined ? "" : POProfitabilitySegmentDetailsDataArray.PartnerPC;
                        POProfitabilitySegmentDetailsDataJsonObject["Country"] = POProfitabilitySegmentDetailsDataArray.Country === undefined ? "" : POProfitabilitySegmentDetailsDataArray.Country;
                        POProfitabilitySegmentDetailsDataJsonObject["SalesOffice"] = POProfitabilitySegmentDetailsDataArray.SalesOffice === undefined ? "" : POProfitabilitySegmentDetailsDataArray.SalesOffice;
                        POProfitabilitySegmentDetailsDataJsonObject["SalesEmployee"] = POProfitabilitySegmentDetailsDataArray.SalesEmployee === undefined ? "" : POProfitabilitySegmentDetailsDataArray.SalesEmployee;
                        POProfitabilitySegmentDetailsDataJsonObject["MatlGroup"] = POProfitabilitySegmentDetailsDataArray.MatlGroup === undefined ? "" : POProfitabilitySegmentDetailsDataArray.MatlGroup;
                        POProfitabilitySegmentDetailsDataJsonObject["ProdHierarchy"] = POProfitabilitySegmentDetailsDataArray.ProdHierarchy === undefined ? "" : POProfitabilitySegmentDetailsDataArray.ProdHierarchy;
                        POProfitabilitySegmentDetailsDataJsonObject["ItemCategory"] = POProfitabilitySegmentDetailsDataArray.ItemCategory === undefined ? "" : POProfitabilitySegmentDetailsDataArray.ItemCategory;
                        POProfitabilitySegmentDetailsDataJsonObject["HigherLevelItem"] = POProfitabilitySegmentDetailsDataArray.HigherLevelItem === undefined ? "" : POProfitabilitySegmentDetailsDataArray.HigherLevelItem;
                        POProfitabilitySegmentDetailsDataJsonObject["Industry"] = POProfitabilitySegmentDetailsDataArray.Industry === undefined ? "" : POProfitabilitySegmentDetailsDataArray.Industry;
                        POProfitabilitySegmentDetailsDataJsonObject["CustomerGroup"] = POProfitabilitySegmentDetailsDataArray.CustomerGroup === undefined ? "" : POProfitabilitySegmentDetailsDataArray.CustomerGroup;
                        POProfitabilitySegmentDetailsDataJsonObject["ProductHierLevel1"] = POProfitabilitySegmentDetailsDataArray.ProductHierLevel1 === undefined ? "" : POProfitabilitySegmentDetailsDataArray.ProductHierLevel1;
                        POProfitabilitySegmentDetailsDataJsonObject["ProductHierLevel2"] = POProfitabilitySegmentDetailsDataArray.ProductHierLevel2 === undefined ? "" : POProfitabilitySegmentDetailsDataArray.ProductHierLevel2;
                        POProfitabilitySegmentDetailsDataJsonObject["ProductHierLevel3"] = POProfitabilitySegmentDetailsDataArray.ProductHierLevel3 === undefined ? "" : POProfitabilitySegmentDetailsDataArray.ProductHierLevel3;
                        POProfitabilitySegmentDetailsDataJsonObject["MaterialType"] = POProfitabilitySegmentDetailsDataArray.MaterialType === undefined ? "" : POProfitabilitySegmentDetailsDataArray.MaterialType;
                        POProfitabilitySegmentDetailsDataJsonObject["ReferenceDoc"] = POProfitabilitySegmentDetailsDataArray.ReferenceDoc === undefined ? "" : POProfitabilitySegmentDetailsDataArray.ReferenceDoc;
                        POProfitabilitySegmentDetailsDataJsonObject["PROJECTNUMBER1"] = POProfitabilitySegmentDetailsDataArray.PROJECTNUMBER1 === undefined ? "" : POProfitabilitySegmentDetailsDataArray.PROJECTNUMBER1;
                        POProfitabilitySegmentDetailsDataJsonObject["ProjectIndicator"] = POProfitabilitySegmentDetailsDataArray.ProjectIndicator === undefined ? "" : POProfitabilitySegmentDetailsDataArray.ProjectIndicator;
                        POProfitabilitySegmentDetailsDataJsonObject["ValuationType"] = POProfitabilitySegmentDetailsDataArray.ValuationType === undefined ? "" : POProfitabilitySegmentDetailsDataArray.ValuationType;
                        POProfitabilitySegmentDetailsDataJsonObject["CustomerClass"] = POProfitabilitySegmentDetailsDataArray.CustomerClass === undefined ? "" : POProfitabilitySegmentDetailsDataArray.CustomerClass;
                        POProfitabilitySegmentDetailsDataJsonObject["MaterialSourceInd"] = POProfitabilitySegmentDetailsDataArray.MaterialSourceInd === undefined ? "" : POProfitabilitySegmentDetailsDataArray.MaterialSourceInd;
                        POProfitabilitySegmentDetailsDataJsonObject["ContractType"] = POProfitabilitySegmentDetailsDataArray.ContractType === undefined ? "" : POProfitabilitySegmentDetailsDataArray.ContractType;
                        POProfitabilitySegmentDetailsDataJsonObject["ShipToParty"] = POProfitabilitySegmentDetailsDataArray.ShipToParty === undefined ? "" : POProfitabilitySegmentDetailsDataArray.ShipToParty;
                        POProfitabilitySegmentDetailsDataJsonObject["IndustryCode1"] = POProfitabilitySegmentDetailsDataArray.IndustryCode1 === undefined ? "" : POProfitabilitySegmentDetailsDataArray.IndustryCode1;
                        POProfitabilitySegmentDetailsDataJsonObject["IndustryField1"] = POProfitabilitySegmentDetailsDataArray.IndustryField1 === undefined ? "" : POProfitabilitySegmentDetailsDataArray.IndustryField1;
                        POProfitabilitySegmentDetailsDataJsonObject["IndustryCode2"] = POProfitabilitySegmentDetailsDataArray.IndustryCode2 === undefined ? "" : POProfitabilitySegmentDetailsDataArray.IndustryCode2;
                        POProfitabilitySegmentDetailsDataJsonObject["IndustryCode3"] = POProfitabilitySegmentDetailsDataArray.IndustryCode3 === undefined ? "" : POProfitabilitySegmentDetailsDataArray.IndustryCode3;
                        POProfitabilitySegmentDetailsDataJsonObject["ReferenceItem"] = POProfitabilitySegmentDetailsDataArray.ReferenceItem === undefined ? "" : POProfitabilitySegmentDetailsDataArray.ReferenceItem;
                        POProfitabilitySegmentDetailsDataJsonObject["SalesDocType"] = POProfitabilitySegmentDetailsDataArray.SalesDocType === undefined ? "" : POProfitabilitySegmentDetailsDataArray.SalesDocType;

                        POProfitabilitySegmentDetailsDataJsonArray.push(POProfitabilitySegmentDetailsDataJsonObject);
                    }
                }
            }
            // POProfitabilitySegmentDetailsData Ends
        });

        console.log("POServiceDataJsonArray:: " + POServiceDataJsonArray);
        console.log("POServiceDataJsonArray len:: " + POServiceDataJsonArray.length);
        console.log("POServiceAccAssDataJsonArray len:: " + POServiceAccAssDataJsonArray.length);

        console.log("POLineItemConditionData Array :" + POLineItemConditionDataJsonArray);

        POLineLevelDataAsJson["PRLineItemArray"] = PRLineItemArray;
        POLineLevelDataAsJson["POInvoiceData"] = POInvoiceDataJsonArray;
        POLineLevelDataAsJson["POServiceData"] = POServiceDataJsonArray;
        POLineLevelDataAsJson["POLineItemConditionData"] = POLineItemConditionDataJsonArray;
        POLineLevelDataAsJson["POAccAssData"] = POAccAssDataJsonArray;
        POLineLevelDataAsJson["PODeliveryAddressData"] = PODeliveryAddressDataJsonArray;
        POLineLevelDataAsJson["PODeliveryData"] = PODeliveryDataJsonArray;
        POLineLevelDataAsJson["POConfirmationData"] = POConfirmationDataJsonArray;
        POLineLevelDataAsJson["POCondCtrlData"] = POCondCtrlDataJsonArray;
        POLineLevelDataAsJson["POServiceAccAssData"] = POServiceAccAssDataJsonArray;
        POLineLevelDataAsJson["POQuantityWeightsData"] = POQuantityWeightsDataJsonArray;
        POLineLevelDataAsJson["PODeliveryScheduleData"] = PODeliveryScheduleDataJsonArray;
        POLineLevelDataAsJson["POLimitsData"] = POLimitsDataJsonArray;
        POLineLevelDataAsJson["POTextsData"] = POTextsDataJsonArray;
        POLineLevelDataAsJson["POLineItemCustomerData"] = POLineItemCustomerDataJsonArray;
        POLineLevelDataAsJson["POMaterialData"] = POMaterialDataJsonArray;
        POLineLevelDataAsJson["POComponentsData"] = POComponentsDataJsonArray;
        POLineLevelDataAsJson["POProfitabilitySegmentDetailsData"] = POProfitabilitySegmentDetailsDataJsonArray;


        var POLineLevelDataAsJsonString = JSON.stringify(POLineLevelDataAsJson);
        console.log("POLineLevelDataAsJsonString: " + POLineLevelDataAsJsonString);

        var _csrf = $("input[name=_csrf]").val();

        $.ajax({
            type: "POST",
            url: "saveAmendSAPoLineLevelData.do",
            async: false,
            data: {
                formdata: POLineLevelDataAsJsonString,
                reqFrom: "saveSAPRLineSub",
                _csrf: _csrf,
                "prType": prType
            },
            error: function() {
                $("#overlay").css("display", "none");
            },
            success: function(response) {
                $("#overlay").css("display", "none");
            }
        });
    }
}

function findSADataOfPrLineItem(parsedJsonPoData, input, itemNumber)
{
    console.log("==============In findSADataOfPrLineItem==================");
    console.log("itemNumber: " + itemNumber);
    console.log("input: " + input);
    var output = '';
    var POLineItemDataArray = parsedJsonPoData.POFetchOP.POLineItemData;
    console.log("POLineItemDataArray: " + POLineItemDataArray);
    if (POLineItemDataArray !== undefined) {
        if (Array.isArray(POLineItemDataArray) === true) {
            console.log("POLineItemDataArray len: " + POLineItemDataArray.length);
            for (var i = 0; i < POLineItemDataArray.length; i++)
            {
                if (POLineItemDataArray[i].ItemNumber === itemNumber)
                {
                    if (input === "AccountAssignmentCategory")
                    {
                        output = POLineItemDataArray[i].AccountAssignment;
                    }
                    else if (input === "PackageNo")
                    {
                        output = POLineItemDataArray[i].PackageNo;
                    }
                    else if (input === "PRLinkID")
                    {
                        output = POLineItemDataArray[i].PRLinkID;
                    }
                    else if (input === "PackageNo")
                    {
                        output = POLineItemDataArray[i].PackageNo;
                    }
                    else if (input === "LinkId")
                    {
                        output = POLineItemDataArray[i].LinkId;
                    }
                    else if (input === "Currency")
                    {
                        output = POLineItemDataArray[i].Currency;
                    }
                    else if (input === "Quantity")
                    {
                        output = POLineItemDataArray[i].Currency;
                    }
                    else if (input === "PRItemNumber")
                    {
                        output = POLineItemDataArray[i].PRItemNumber;
                    }
                }
            }
        }
        else
        {
            if (POLineItemDataArray.ItemNumber === itemNumber)
            {
                if (input === "AccountAssignmentCategory")
                {
                    output = POLineItemDataArray.AccountAssignment;
                }
                else if (input === "PackageNo")
                {
                    output = POLineItemDataArray.PackageNo;
                }
                else if (input === "PRLinkID")
                {
                    output = POLineItemDataArray.PRLinkID;
                }
                else if (input === "PackageNo")
                {
                    output = POLineItemDataArray.PackageNo;
                }
                else if (input === "LinkId")
                {
                    output = POLineItemDataArray.LinkId;
                }
                else if (input === "Currency")
                {
                    output = POLineItemDataArray.Currency;
                }
                else if (input === "Quantity")
                {
                    output = POLineItemDataArray.Quantity;
                }
                else if (input === "PRItemNumber")
                {
                    output = POLineItemDataArray.PRItemNumber;
                }
            }
        }
        console.log("output: " + output);
        return output;
    }
}
function getExtPOCreationIdByPONumber(poNumber) {
    $.ajax({
        type: "GET",
        url: "standalonepoajaxrequest.do",
        async: false,
        data: {
            "reqFrom": "getExtPOCreationIdByPONumber",
            "poNumber": poNumber
        },
        success: function(response) {
            if (response.toString().trim() === null) {
                $("#poid").val("");
            } else {
                $("#poid").val(response.toString().trim());
            }
        }
    });
}
