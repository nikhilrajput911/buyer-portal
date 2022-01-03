/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.controller;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.ExceptionConverter;
import com.itextpdf.text.Image;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfName;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfTemplate;
import com.itextpdf.text.pdf.PdfWriter;

/**
 *
 * @author Nish
 */
public class HeaderFooterPageEvent extends PdfPageEventHelper{
    
     private PdfTemplate t;
    private Image total;

    @Override
    public void onOpenDocument(PdfWriter writer, Document document) {
        t = writer.getDirectContent().createTemplate(30, 16);
        try {
            total = Image.getInstance(t);
            total.setRole(PdfName.ARTIFACT);
        } catch (DocumentException de) {
            throw new ExceptionConverter(de);
        }
    }

    @Override
    public void onStartPage(PdfWriter writer, Document document) {
        try {
            addHeader(writer);
        } catch (DocumentException ex) {
            System.out.println("Exception in onStartPage" + ex);
        }
    }

    @Override
    public void onEndPage(PdfWriter writer, Document document) {
        addFooter(writer);

    }
    private void addHeader(PdfWriter writer) throws DocumentException {
        try{
         CommonFunctions cfObj = new CommonFunctions();
        PdfPTable header = new PdfPTable(1);
        header.setTotalWidth(527);
        Image logo = Image.getInstance("D:\\Newgen\\jboss-eap-7.1\\bin\\ContractDocuments\\NatsteelHeader.jpg");
            logo.setAbsolutePosition(39f, 79f);
            logo.scaleAbsolute(120, 40);
            logo.setAlignment(Element.ALIGN_RIGHT);
            PdfPCell headerImgCell = cfObj.createCell(logo, Rectangle.NO_BORDER, 0, 0, 0, 30, 0, Element.ALIGN_RIGHT, Element.ALIGN_TOP);

            header.addCell(headerImgCell);
              PdfContentByte canvas = writer.getDirectContent();
            canvas.beginMarkedContentSequence(PdfName.ARTIFACT);

            header.writeSelectedRows(0, -1, 25, 820, writer.getDirectContent());
            
            canvas.endMarkedContentSequence();
        } catch(Exception e){
            
        }
    }
    private void addFooter(PdfWriter writer) {
        
    }
    
}

