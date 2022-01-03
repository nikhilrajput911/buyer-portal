/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.itextPdf;

import com.itextpdf.text.Document;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfWriter;

/**
 *
 * @author admin
 */
public class MyFooter extends PdfPageEventHelper {

    Font ffont = new Font(Font.FontFamily.UNDEFINED, 10, Font.NORMAL);
    
    @Override
    public void onEndPage(PdfWriter writer, Document document) {
        PdfContentByte cb = writer.getDirectContent();
        Phrase header = new Phrase("this is a header", ffont);
        Phrase footer = new Phrase("NATSTEEL HOLDINGS PTE LTD,22 TANJONG KLING ROAD,SINGAPORE 628048.FAX:65-62659345", ffont);
//        ColumnText.showTextAligned(cb, Paragraph.ALIGN_CENTER,
//                header,
//                (document.right() - document.left()) / 2 + document.leftMargin(),
//                document.top() + 10, 0);
        ColumnText.showTextAligned(cb, Paragraph.ALIGN_CENTER,
                footer,
                (document.right() - document.left()) / 2 + document.leftMargin(),
                document.bottom() - 10, 0);
    }
//
//    private Phrase footer() {
//        Font ffont = new Font(Font.FontFamily.UNDEFINED, 5, Font.ITALIC);
//        Phrase p = new Phrase("this is a footer");
//        return p;
//    }
}
