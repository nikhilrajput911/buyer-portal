/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.controller;

import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPCellEvent;
import com.itextpdf.text.pdf.PdfPTable;

/**
 *
 * @author Nish
 */
public class CommonFunctions {
    public  PdfPCell createCell(Font font, String content, int setBorder, float paddingLeft, float paddingTop, float paddingBottom, float paddingRight,int borderPosition, int horizontalAlignment, int verticalAlignment) {
        PdfPCell cell = new PdfPCell(new Phrase(content, font));
        cell.setBorder(setBorder);
        cell.setPaddingTop(paddingTop);
        cell.setPaddingLeft(paddingLeft);
        cell.setPaddingBottom(paddingBottom);
        cell.setPaddingRight(paddingRight);
        cell.setHorizontalAlignment(horizontalAlignment);
        cell.setVerticalAlignment(verticalAlignment);
        cell.setCellEvent(new DottedCell(borderPosition));
        
        return cell;
    }
      public  PdfPCell createCell(Font font, String content, float paddingLeft, float paddingTop, float paddingBottom, float paddingRight,int borderPosition, int horizontalAlignment, int verticalAlignment) {
        PdfPCell cell = new PdfPCell(new Phrase(content, font));
//        cell.setBorder(setBorder);
        cell.setPaddingTop(paddingTop);
        cell.setPaddingLeft(paddingLeft);
        cell.setPaddingBottom(paddingBottom);
        cell.setPaddingRight(paddingRight);
        cell.setHorizontalAlignment(horizontalAlignment);
        cell.setVerticalAlignment(verticalAlignment);
        cell.setCellEvent(new DottedCell(borderPosition));
        
        return cell;
    }
       public  PdfPCell createCell(Font font, Paragraph content, int setBorder, float paddingLeft, float paddingTop, float paddingBottom, float paddingRight,int borderPosition, int horizontalAlignment, int verticalAlignment) {
        PdfPCell cell = new PdfPCell(content);
        cell.setBorder(setBorder);
        cell.setPaddingTop(paddingTop);
        cell.setPaddingLeft(paddingLeft);
        cell.setPaddingBottom(paddingBottom);
        cell.setPaddingRight(paddingRight);
        cell.setHorizontalAlignment(horizontalAlignment);
        cell.setVerticalAlignment(verticalAlignment);
        cell.setCellEvent(new DottedCell(borderPosition));
        return cell;
    }
    
      public  PdfPCell createCell( Image image, int setBorder, float paddingLeft, float paddingTop, float paddingBottom, float paddingRight,int borderPosition, int horizontalAlignment, int verticalAlignment) {
        PdfPCell cell = new PdfPCell(image);
        cell.setBorder(setBorder);
        cell.setPaddingTop(paddingTop);
        cell.setPaddingLeft(paddingLeft);
        cell.setPaddingBottom(paddingBottom);
        cell.setPaddingRight(paddingRight);
        cell.setHorizontalAlignment(horizontalAlignment);
        cell.setVerticalAlignment(verticalAlignment);
        cell.setCellEvent(new DottedCell(borderPosition));
        return cell;
    }

    public  Paragraph createParagraph(String content, Font font, int leftIndentation, float paddingTop) {
        Paragraph paragraph = new Paragraph(content, font);
        paragraph.setIndentationLeft(leftIndentation);
        paragraph.setSpacingBefore(paddingTop);

        return paragraph;
    }

    public  PdfPTable createTable(int noOfColumns, float WidthPercentage, float spacingBefore, float spacingAfter, int horizontalAlignment) {
        PdfPTable table = new PdfPTable(noOfColumns);
        table.setWidthPercentage(WidthPercentage);
        table.setSpacingBefore(spacingBefore);
        table.setSpacingAfter(spacingAfter);
        table.setHorizontalAlignment(horizontalAlignment);
        
        return table;
    }


}
class DottedCell implements PdfPCellEvent {

    private int border = 0;

    public DottedCell(int border) {
        this.border = border;
    }

    @Override
    public void cellLayout(PdfPCell cell, Rectangle position,
            PdfContentByte[] canvases) {
        PdfContentByte canvas = canvases[PdfPTable.LINECANVAS];
        canvas.saveState();
        canvas.setLineDash(0, 4, 2);
        if ((border & PdfPCell.TOP) == PdfPCell.TOP) {
            canvas.moveTo(position.getRight(), position.getTop());
            canvas.lineTo(position.getLeft() - 22, position.getTop());
        }
        if ((border & PdfPCell.BOTTOM) == PdfPCell.BOTTOM) {
            canvas.moveTo(position.getRight(), position.getBottom() - 5);
            canvas.lineTo(position.getLeft() - 22, position.getBottom() - 5);
        }
        if ((border & PdfPCell.RIGHT) == PdfPCell.RIGHT) {
            canvas.moveTo(position.getRight(), position.getTop());
            canvas.lineTo(position.getRight(), position.getBottom());
        }
        if ((border & PdfPCell.LEFT) == PdfPCell.LEFT) {
            canvas.moveTo(position.getLeft(), position.getTop());
            canvas.lineTo(position.getLeft(), position.getBottom());
        }
        canvas.stroke();
        canvas.restoreState();
    }
}

