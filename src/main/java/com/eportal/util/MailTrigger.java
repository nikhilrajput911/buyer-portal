/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.util;

import com.eportal.entities.BuyerContractRfqLineItemBean;
import com.eportal.entities.BuyerRfqLineItemBean;
import com.eportal.entities.ContractRfqHeader;
import com.eportal.entities.EmailTriggerDetails;
import com.eportal.entities.VendorDetails;
import com.eportal.entities.WorkOrderRfqHeader;
import com.itextpdf.text.BadElementException;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Image;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.draw.DrawInterface;
import java.io.IOException;
import java.net.URI;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.List;
import javafx.scene.layout.Border;
import javax.servlet.http.HttpServletRequest;
import org.apache.poi.ss.usermodel.Cell;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

/**
 *
 * @author admin
 */
@Component
public class MailTrigger {

    @Value("${webservice.ip}")
    private String webservice_ip;
    @Value("${BuyerPortalWar.ip}")
    private String BuyerPortalWar_ip;

    public String TriggerMail(EmailTriggerDetails emailTriggerDetails) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/TriggerMail.do";
        System.out.println("url: " + url);
        String mappingid = restTemplate.postForObject(URI.create(url), emailTriggerDetails, String.class);
        System.out.println("mappingid: " + mappingid);
        return mappingid;
    }
    
    
    public void makeRfqFormat(Document document, HttpServletRequest request, WorkOrderRfqHeader rfq, VendorDetails vendor, List<BuyerRfqLineItemBean> buyerRfqLineItemBeanList)
            throws DocumentException, BadElementException, IOException {

        Font font = new Font(Font.FontFamily.UNDEFINED, 10, Font.NORMAL);
        DateFormat df = new SimpleDateFormat("dd-MMM-yyyy");

        Paragraph para = new Paragraph();
        Paragraph subcontent;

        System.out.println("BuyerPortalWar_ip: " + BuyerPortalWar_ip);

        String path = request.getRequestURL().toString();
        System.out.println("path: " + path);

        String natSteelLogo = BuyerPortalWar_ip + "/BuyerPortal/assets/images/NatSteel-logo.jpg";
        System.out.println("natSteelLogo: " + natSteelLogo);

        Image img = Image.getInstance(natSteelLogo);
        img.scaleToFit(200, 100);
        img.setAbsolutePosition(380, 780);

        para.add(img);

        subcontent = new Paragraph(new Chunk("REQUEST FOR QUOTATION", new Font(Font.FontFamily.UNDEFINED, 15, Font.BOLD)).setUnderline(1f, -4));
        subcontent.setAlignment(Paragraph.ALIGN_CENTER);
        subcontent.setSpacingBefore(30);
        para.add(new Paragraph(subcontent));

        PdfPTable headerDataTable1 = new PdfPTable(1);
        headerDataTable1.setSpacingBefore(20);
        headerDataTable1.setHorizontalAlignment(Paragraph.ALIGN_LEFT);

        String vendorFName = "";
        String vendorLName = "";
        String vendorTel = "";
        String vendorFax = "";
        if (vendor.getFirstname() != null) {
            vendorFName = vendor.getFirstname();
        }
        if (vendor.getLastname() != null) {
            vendorLName = vendor.getLastname();
        }
        if (vendor.getContactnumbermob() != null) {
            vendorTel = vendor.getContactnumbermob();
        }
        if (vendor.getContactnumberfax() != null) {
            vendorFax = vendor.getContactnumberfax();
        }

        PdfPCell c1 = new PdfPCell(new Phrase("RFQ No: " + rfq.getRfqNumber(), font));
        c1.setBorder(PdfPCell.NO_BORDER);
        PdfPCell c2 = new PdfPCell(new Phrase("Date: " + df.format(rfq.getRfqRequestDate()), font));
        c2.setBorder(PdfPCell.NO_BORDER);
        PdfPCell c3 = new PdfPCell(new Phrase("To: " + vendorFName + " " + vendorLName, font));
        c3.setBorder(PdfPCell.NO_BORDER);
        PdfPCell c4 = new PdfPCell(new Phrase("Attn: ", font));
        c4.setBorder(PdfPCell.NO_BORDER);
        PdfPCell c5 = new PdfPCell(new Phrase("Tel: " + vendorTel, font));
        c5.setBorder(PdfPCell.NO_BORDER);
        PdfPCell c6 = new PdfPCell(new Phrase("Fax: " + vendorFax, font));
        c6.setBorder(PdfPCell.NO_BORDER);
        PdfPCell c7 = new PdfPCell(new Phrase("From: " + rfq.getNgBpBuyerdetailsId().getFirstname() + " " + rfq.getNgBpBuyerdetailsId().getLastname() + "       Tel.No: ", font));
        c7.setBorder(PdfPCell.NO_BORDER);
        PdfPCell c8 = new PdfPCell(new Phrase("Email: " + rfq.getNgBpBuyerdetailsId().getEmailid(), font));
        c8.setBorder(PdfPCell.NO_BORDER);

        headerDataTable1.addCell(c1);
        headerDataTable1.addCell(c2);
        headerDataTable1.addCell(c3);
        headerDataTable1.addCell(c4);
        headerDataTable1.addCell(c5);
        headerDataTable1.addCell(c6);
        headerDataTable1.addCell(c7);
        headerDataTable1.addCell(c8);

        String text = "Please quote your best price for the below mentioned items/services. Kindly include your most favourable lead time, unit weight, payment terms, trade terms, currency of offer and validity of offer. Quotation should reach us not later than " + df.format(rfq.getRfqvaliduntil()) + " QUOTATION SUBMITTED SHOULD BE VALID/EXTENDED TO SUBSIDIARIES OF NATSTEEL";

        Paragraph longData = new Paragraph(text, font);
        longData.setAlignment(Paragraph.ALIGN_LEFT);
        longData.setSpacingBefore(20);
        longData.setSpacingAfter(20);

        PdfPTable lineItemDataTable = new PdfPTable(8);
        lineItemDataTable.setHorizontalAlignment(Paragraph.ALIGN_LEFT);
        lineItemDataTable.setWidthPercentage(100);

        PdfPCell lineC1;
        PdfPCell lineC2;
        PdfPCell lineC3;
        PdfPCell lineC4;
        PdfPCell lineC5;
        PdfPCell lineC6;
        PdfPCell lineC7;
        PdfPCell lineC8;

        lineC1 = new PdfPCell(new Phrase("No", font));
        lineC1.setBorder(PdfPCell.NO_BORDER);
        lineC2 = new PdfPCell(new Phrase("Plant", font));
        lineC2.setBorder(PdfPCell.NO_BORDER);
        lineC3 = new PdfPCell(new Phrase("Qty", font));
        lineC3.setBorder(PdfPCell.NO_BORDER);
        lineC4 = new PdfPCell(new Phrase("UOM", font));
        lineC4.setBorder(PdfPCell.NO_BORDER);
        lineC5 = new PdfPCell(new Phrase("Description", font));
        lineC5.setBorder(PdfPCell.NO_BORDER);
        lineC6 = new PdfPCell(new Phrase("U/Wt", font));
        lineC6.setBorder(PdfPCell.NO_BORDER);
        lineC7 = new PdfPCell(new Phrase("U/P", font));
        lineC7.setBorder(PdfPCell.NO_BORDER);
        lineC8 = new PdfPCell(new Phrase("Lead Time", font));
        lineC8.setBorder(PdfPCell.NO_BORDER);

        lineItemDataTable.addCell(lineC1);
        lineItemDataTable.addCell(lineC2);
        lineItemDataTable.addCell(lineC3);
        lineItemDataTable.addCell(lineC4);
        lineItemDataTable.addCell(lineC5);
        lineItemDataTable.addCell(lineC6);
        lineItemDataTable.addCell(lineC7);
        lineItemDataTable.addCell(lineC8);

        for (BuyerRfqLineItemBean bean : buyerRfqLineItemBeanList) {

            lineC1 = new PdfPCell(new Phrase(bean.getItemNumber(), font));
            lineC1.setBorder(PdfPCell.NO_BORDER);
            lineC2 = new PdfPCell(new Phrase(bean.getPlantName(), font));
            lineC2.setBorder(PdfPCell.NO_BORDER);
            lineC3 = new PdfPCell(new Phrase(bean.getQuantity(), font));
            lineC3.setBorder(PdfPCell.NO_BORDER);
            lineC4 = new PdfPCell(new Phrase(bean.getUnit(), font));
            lineC4.setBorder(PdfPCell.NO_BORDER);
            lineC5 = new PdfPCell(new Phrase(bean.getDescription(), font));
            lineC5.setBorder(PdfPCell.NO_BORDER);
            lineC6 = new PdfPCell(new Phrase(bean.getUnit(), font));
            lineC6.setBorder(PdfPCell.NO_BORDER);
            lineC7 = new PdfPCell(new Phrase(bean.getPriceUnit(), font));
            lineC7.setBorder(PdfPCell.NO_BORDER);
            lineC8 = new PdfPCell(new Phrase(bean.getLeadTime(), font));
            lineC8.setBorder(PdfPCell.NO_BORDER);

            lineItemDataTable.addCell(lineC1);
            lineItemDataTable.addCell(lineC2);
            lineItemDataTable.addCell(lineC3);
            lineItemDataTable.addCell(lineC4);
            lineItemDataTable.addCell(lineC5);
            lineItemDataTable.addCell(lineC6);
            lineItemDataTable.addCell(lineC7);
            lineItemDataTable.addCell(lineC8);
        }

        PdfPTable headerDataTable2 = new PdfPTable(1);
        headerDataTable2.setSpacingBefore(20);
        headerDataTable2.setHorizontalAlignment(Paragraph.ALIGN_LEFT);

        PdfPCell cc1 = new PdfPCell(new Phrase("GST Registered Number(if applicable): " + vendor.getGstRegNumber(), font));
        cc1.setBorder(PdfPCell.NO_BORDER);
        PdfPCell cc2 = new PdfPCell(new Phrase("Currency: ", font));
        cc2.setBorder(PdfPCell.NO_BORDER);
        PdfPCell cc3 = new PdfPCell(new Phrase("Delivery Terms: " + rfq.getDeliveryterms(), font));
        cc3.setBorder(PdfPCell.NO_BORDER);
        PdfPCell cc4 = new PdfPCell(new Phrase("Payment Terms: " + rfq.getPaymentterms(), font));
        cc4.setBorder(PdfPCell.NO_BORDER);
        PdfPCell cc5 = new PdfPCell(new Phrase("Validity of Offer: " + df.format(rfq.getRfqvaliduntil()), font));
        cc5.setBorder(PdfPCell.NO_BORDER);

        headerDataTable2.addCell(cc1);
        headerDataTable2.addCell(cc2);
        headerDataTable2.addCell(cc3);
        headerDataTable2.addCell(cc4);
        headerDataTable2.addCell(cc5);

        document.add(para);
        document.add(headerDataTable1);
        document.add(longData);
        document.add(lineItemDataTable);
        document.add(headerDataTable2);
    }

    public void makeContractRfqFormat(Document document,String rfqNumber, HttpServletRequest request, ContractRfqHeader rfq, VendorDetails vendor, List<BuyerContractRfqLineItemBean> buyerRfqLineItemBeanList)
            throws DocumentException, BadElementException, IOException {

        
        Font font = new Font(Font.FontFamily.COURIER, 12, Font.NORMAL);
        Font font1 = new Font(Font.FontFamily.COURIER, 12, Font.UNDERLINE);
        
      //  Font font = FontFactory.getFont("c:/windows/fonts/Courier New/Courier New Regular.ttf", 12,BaseColor.BLACK);
        //("c:/windows/fonts/Courier New/Courier New Regular.ttf",BaseFont.IDENTITY_H, BaseFont.EMBEDDED, 10, Font.NORMAL, BaseColor.BLACK);
        //Font.Courier
        
       // Courier
        DateFormat df = new SimpleDateFormat("dd-MMM-yyyy");
        
       // FontConstants.

        Paragraph para = new Paragraph();
        Paragraph subcontent;

        System.out.println("BuyerPortalWar_ip: " + BuyerPortalWar_ip);

        String path = request.getRequestURL().toString();
        System.out.println("path: " + path);

        String natSteelLogo = BuyerPortalWar_ip + "/BuyerPortal/assets/images/NatSteel-logo.jpg";
        System.out.println("natSteelLogo: " + natSteelLogo);

        Image img = Image.getInstance(natSteelLogo);
        img.scaleToFit(200, 100);
        img.setAbsolutePosition(380, 780);

        para.add(img);

        subcontent = new Paragraph(new Chunk("REQUEST FOR QUOTATION", new Font(Font.FontFamily.COURIER, 15, Font.BOLD)).setUnderline(1f, -4));
        subcontent.setAlignment(Paragraph.ALIGN_CENTER);
        subcontent.setSpacingBefore(30);
        para.add(new Paragraph(subcontent));

        PdfPTable headerDataTable1 = new PdfPTable(1);
        headerDataTable1.setSpacingBefore(20);
        headerDataTable1.setHorizontalAlignment(Paragraph.ALIGN_LEFT);

        String vendorFName = "";
        String vendorLName = "";
        String vendorTel = "";
        String vendorFax = "";
        if (vendor.getFirstname() != null) {
            vendorFName = vendor.getFirstname();
        }
        if (vendor.getLastname() != null) {
            vendorLName = vendor.getLastname();
        }
        if (vendor.getContactnumbermob() != null) {
            vendorTel = vendor.getContactnumbermob();
        }
        if (vendor.getContactnumberfax() != null) {
            vendorFax = vendor.getContactnumberfax();
        }

        PdfPCell c1 = new PdfPCell(new Phrase("RFQ No: " + rfqNumber, font));
        c1.setBorder(PdfPCell.NO_BORDER);
        PdfPCell c2 = new PdfPCell(new Phrase("Date:   " + df.format(rfq.getRfqRequestDate()), font));
        c2.setBorder(PdfPCell.NO_BORDER);
        PdfPCell c3 = new PdfPCell(new Phrase("To:     " + vendorFName + " " + vendorLName, font));
        c3.setBorder(PdfPCell.NO_BORDER);
        PdfPCell c4 = new PdfPCell(new Phrase("Attn:   ", font));
        c4.setBorder(PdfPCell.NO_BORDER);
        PdfPCell c5 = new PdfPCell(new Phrase("Tel:    " + vendorTel, font));
        c5.setBorder(PdfPCell.NO_BORDER);
        PdfPCell c6 = new PdfPCell(new Phrase("Fax:    " + vendorFax, font));
        c6.setBorder(PdfPCell.NO_BORDER);
        PdfPCell c7 = new PdfPCell(new Phrase("From:   " + rfq.getNgBpBuyerdetailsId().getFirstname() + " " + rfq.getNgBpBuyerdetailsId().getLastname() + "       Tel.No: ", font));
        c7.setBorder(PdfPCell.NO_BORDER);
        PdfPCell c8 = new PdfPCell(new Phrase("Email:  " + rfq.getNgBpBuyerdetailsId().getEmailid(), font));
        c8.setBorder(PdfPCell.NO_BORDER);

        headerDataTable1.addCell(c1);
        headerDataTable1.addCell(c2);
        headerDataTable1.addCell(c3);
        headerDataTable1.addCell(c4);
        headerDataTable1.addCell(c5);
        headerDataTable1.addCell(c6);
        headerDataTable1.addCell(c7);
        headerDataTable1.addCell(c8);
        
        String linedesign="........................................................................";
        Paragraph lineDots = new Paragraph(linedesign, font);
        lineDots.setAlignment(Paragraph.ALIGN_LEFT);
        

        String text = "Please quote your best price for the below mentioned items/services. Kindly include your most favourable lead time, unit weight, payment terms, trade terms, currency of offer and validity of offer. Quotation should reach us not later than ";
        //+df.format(rfq.getRfqvaliduntil())+ " QUOTATION SUBMITTED SHOULD BE VALID/EXTENDED TO SUBSIDIARIES OF \"NATSTEEL\"";

        Paragraph longData = new Paragraph(text, font);
        
         
                
        longData.add(new Chunk(df.format(rfq.getRfqvaliduntil()),font1));
        
        longData.add(new Chunk(" QUOTATION SUBMITTED SHOULD BE VALID/EXTENDED TO SUBSIDIARIES OF \"NATSTEEL\"",font));
                
      //  Paragraph longData1 = new Paragraph(df.format(rfq.getRfqvaliduntil()), font1);
        //Paragraph longData2 = new Paragraph(" QUOTATION SUBMITTED SHOULD BE VALID/EXTENDED TO SUBSIDIARIES OF \"NATSTEEL\"", font);
        
       // longData.add(longData.indexOf(longData),new Paragraph(df.format(rfq.getRfqvaliduntil()), font1));
        //longData.add(longData.indexOf(longData),new Paragraph(" QUOTATION SUBMITTED SHOULD BE VALID/EXTENDED TO SUBSIDIARIES OF \"NATSTEEL\"", font));
        longData.setAlignment(Paragraph.ALIGN_LEFT);
        longData.setSpacingBefore(20);
        longData.setSpacingAfter(20);
        
//        longData1.setAlignment(Paragraph.ALIGN_LEFT);
//        longData1.setSpacingBefore(20);
//        longData1.setSpacingAfter(20);
//        
//        longData2.setAlignment(Paragraph.ALIGN_LEFT);
//        longData2.setSpacingBefore(20);
//        longData2.setSpacingAfter(20);
        
        

        PdfPTable lineItemDataTable = new PdfPTable(8);
        lineItemDataTable.setHorizontalAlignment(Paragraph.ALIGN_LEFT);
        lineItemDataTable.setWidthPercentage(100);
        
        PdfPTable lineItemDataTable1 = new PdfPTable(8);
        lineItemDataTable1.setHorizontalAlignment(Paragraph.ALIGN_LEFT);
        lineItemDataTable1.setWidthPercentage(100);

        PdfPCell lineC1;
        PdfPCell lineC2;
        PdfPCell lineC3;
        PdfPCell lineC4;
        PdfPCell lineC5;
        PdfPCell lineC6;
        PdfPCell lineC7;
        PdfPCell lineC8;
        //PdfPCell border;

        lineC1 = new PdfPCell(new Phrase("No", font));
        lineC1.setBorder(PdfPCell.NO_BORDER);
        lineC2 = new PdfPCell(new Phrase("Plant", font));
        lineC2.setBorder(PdfPCell.NO_BORDER);
        lineC3 = new PdfPCell(new Phrase("Qty", font));
        lineC3.setBorder(PdfPCell.NO_BORDER);
        lineC4 = new PdfPCell(new Phrase("UOM", font));
        lineC4.setBorder(PdfPCell.NO_BORDER);
        lineC5 = new PdfPCell(new Phrase("Description", font));
        lineC5.setBorder(PdfPCell.NO_BORDER);
        lineC6 = new PdfPCell(new Phrase("U/Wt", font));
        lineC6.setBorder(PdfPCell.NO_BORDER);
        lineC7 = new PdfPCell(new Phrase("U/P", font));
        lineC7.setBorder(PdfPCell.NO_BORDER);
        lineC8 = new PdfPCell(new Phrase("Lead Time", font));
        lineC8.setBorder(PdfPCell.NO_BORDER);
        
        
        
        
        lineItemDataTable1.addCell(lineC1);
        lineItemDataTable1.addCell(lineC2);
        lineItemDataTable1.addCell(lineC3);
        lineItemDataTable1.addCell(lineC4);
        lineItemDataTable1.addCell(lineC5);
        lineItemDataTable1.addCell(lineC6);
        lineItemDataTable1.addCell(lineC7);
        lineItemDataTable1.addCell(lineC8);

//        PdfPCell cell = new PdfPCell();
//        cell.setColspan((int) lineItemDataTable.getTotalWidth());
//        Paragraph p = new Paragraph(lineDots);
//        p.setAlignment(Element.ALIGN_CENTER);
//        cell.addElement(p);
//        lineItemDataTable.addCell(cell);
        //lineItemDataTable.addCell(lineDots);

        for (BuyerContractRfqLineItemBean bean : buyerRfqLineItemBeanList) {

            lineC1 = new PdfPCell(new Phrase(bean.getROWNO().toString(), font));
            lineC1.setBorder(PdfPCell.NO_BORDER);
            lineC2 = new PdfPCell(new Phrase(bean.getPlantCode(), font));
            lineC2.setBorder(PdfPCell.NO_BORDER);
            lineC3 = new PdfPCell(new Phrase(bean.getQuantity(), font));
            lineC3.setBorder(PdfPCell.NO_BORDER);
            lineC4 = new PdfPCell(new Phrase(bean.getUnit(), font));
            lineC4.setBorder(PdfPCell.NO_BORDER);
            lineC5 = new PdfPCell(new Phrase(bean.getShortText(), font));
            lineC5.setBorder(PdfPCell.NO_BORDER);
            lineC6 = new PdfPCell(new Phrase(bean.getUnit(), font));
            lineC6.setBorder(PdfPCell.NO_BORDER);
            lineC7 = new PdfPCell(new Phrase(bean.getPriceUnit(), font));
            lineC7.setBorder(PdfPCell.NO_BORDER);
            lineC8 = new PdfPCell(new Phrase(bean.getLeadTime(), font));
            lineC8.setBorder(PdfPCell.NO_BORDER);

            lineItemDataTable.addCell(lineC1);
            lineItemDataTable.addCell(lineC2);
            lineItemDataTable.addCell(lineC3);
            lineItemDataTable.addCell(lineC4);
            lineItemDataTable.addCell(lineC5);
            lineItemDataTable.addCell(lineC6);
            lineItemDataTable.addCell(lineC7);
            lineItemDataTable.addCell(lineC8);
        }

        PdfPTable headerDataTable2 = new PdfPTable(1);
        headerDataTable2.setSpacingBefore(20);
        headerDataTable2.setHorizontalAlignment(Paragraph.ALIGN_LEFT);
        
        //Phrase p1=
//
//        PdfPCell cc1 = new PdfPCell();
//        //new Phrase("GST Registered Number(if applicable): " ,font).add(new Paragraph(vendor.getGstRegNumber(), font1))
//        
//        cc1.addElement(new Phrase("GST Registered Number(if applicable): " ,font));
//        cc1.addElement(new Phrase(vendor.getGstRegNumber(), font1));
//      
//        cc1.setBorder(PdfPCell.NO_BORDER);
//        PdfPCell cc2 = new PdfPCell(new Phrase("Currency: ", font));
//        cc2.setBorder(PdfPCell.NO_BORDER);
//        PdfPCell cc3 = new PdfPCell();
//        
//        cc3.addElement(new Phrase("Delivery Terms: " ,font));
//        cc3.addElement(new Phrase(rfq.getDeliveryterms(), font1));
//        cc3.setBorder(PdfPCell.NO_BORDER);
//        PdfPCell cc4 = new PdfPCell();
//        
//        cc4.addElement(new Phrase("Payment Terms: " ,font));
//        cc4.addElement(new Phrase(rfq.getPaymentterms(), font1));
//        cc4.setBorder(PdfPCell.NO_BORDER);
//        PdfPCell cc5 = new PdfPCell();
//        cc5.addElement(new Phrase("Validity of Offer: " ,font));
//        cc5.addElement(new Phrase(df.format(rfq.getRfqvaliduntil()), font1));
//        cc5.setBorder(PdfPCell.NO_BORDER);
//
//        headerDataTable2.addCell(cc1);
//        headerDataTable2.addCell(cc2);
//        headerDataTable2.addCell(cc3);
//        headerDataTable2.addCell(cc4);
//        headerDataTable2.addCell(cc5);

        Paragraph gstText = new Paragraph("GST Registered Number(if applicable): ", font);
        gstText.add(new Chunk(vendor.getGstRegNumber(), font1));
        Paragraph crnyText = new Paragraph("Currency: ", font);
        Paragraph delvText = new Paragraph("Delivery Terms: ", font);
        delvText.add(new Chunk(rfq.getDeliveryterms(), font1));
        Paragraph payText = new Paragraph("Payment Terms: ", font);
        payText.add(new Chunk(rfq.getDeliveryterms(), font1));
        Paragraph valOfferText = new Paragraph("Validity of Offer: ", font);
        valOfferText.add(new Chunk(df.format(rfq.getRfqvaliduntil()), font1));

        document.add(para);
        document.add(headerDataTable1);
        document.add(lineDots);
        document.add(longData);
//        document.add(longData1);
//        document.add(longData2);
        document.add(lineDots);
        document.add(lineItemDataTable1);
        document.add(lineDots);
        document.add(lineItemDataTable);
        document.add(gstText);
        document.add(crnyText);
        document.add(delvText);
        document.add(payText);
        document.add(valOfferText);
    }
}
