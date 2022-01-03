/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.document;

import com.eportal.entities.PoSavingReportMaterialBean;
import com.eportal.entities.PoSavingReportServiceBean;
import com.eportal.entities.RfqHeaderVendorMapping;
import com.eportal.entities.SupplierHeader;
import com.eportal.entities.SupplierLineitem;
import com.eportal.entities.VendorDetails;
import com.eportal.entities.WorkOrderRfqHeader;
import com.eportal.entities.WorkOrderRfqLineItem;
import com.eportal.webservice.util.PurchaseOrderWS;
import com.eportal.webservice.util.RfqRfpWS;
import com.itextpdf.text.BadElementException;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.draw.LineSeparator;
import java.io.IOException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 *
 * @author admin
 */
@Component
public class Generator {

    @Autowired
    RfqRfpWS rfqRfpWsUtil;
    @Autowired
    PurchaseOrderWS purchaseOrderWSUtil;

    public void makeRfqEvalVenoroCompReport(Document document, String rfqIds) throws DocumentException, BadElementException, IOException {
        DecimalFormat decimalFormat = new DecimalFormat("#,###");
        String[] ratedParameter = {"MOQ/ MOV Details", "Delivery Lead Time", "Payment Terms", "Brand Model", "Incoterms", "Validity of Offer"};
        Paragraph ratingPara = new Paragraph();
        Paragraph ratingSubPara;

        Paragraph blankPara = new Paragraph("");
        blankPara.setSpacingAfter(10);
        blankPara.setSpacingBefore(10);

        ratingSubPara = new Paragraph(new Chunk("Vendor Selection Criteria", new Font(Font.FontFamily.UNDEFINED, 20, Font.BOLD)));
        ratingSubPara.setAlignment(Paragraph.ALIGN_LEFT);
        ratingSubPara.setSpacingBefore(5);
        ratingPara.add(new Paragraph(ratingSubPara));

        ratingSubPara = new Paragraph(new Chunk("Scores (5 = Excellent, 4 = Good, 3 = Satisfactory, 2 = Below Average, 1 = Poor)", new Font(Font.FontFamily.UNDEFINED, 10, Font.NORMAL)));
        ratingSubPara.setAlignment(Paragraph.ALIGN_CENTER);
        ratingSubPara.setSpacingBefore(5);
        ratingSubPara.setSpacingAfter(5);
        ratingPara.add(new Paragraph(ratingSubPara));

        document.add(ratingPara);

        LineSeparator lineSeprator = new LineSeparator();

        List<RfqHeaderVendorMapping> rfqVendorMappingList = rfqRfpWsUtil.findRfqVendorMappingByRfqIdInAndStatusIn(rfqIds);

        for (int i = 0; i < rfqVendorMappingList.size(); i++) {
            RfqHeaderVendorMapping mapping = rfqVendorMappingList.get(i);
            VendorDetails vendorObj = mapping.getNgBpVendordetailsId();
            WorkOrderRfqHeader rfqHeader = mapping.getNgBpWorkorderrfqheaderRfqid();
            List<SupplierHeader> supplierHeaderList = rfqRfpWsUtil.getSupplierHeaderByVendorId(vendorObj.getId(), rfqHeader.getRfqid());

            com.itextpdf.text.List list = new com.itextpdf.text.List();

            Paragraph vendorNamePara = new Paragraph(new Chunk(vendorObj.getFirstname() + " " + vendorObj.getLastname() + " Rating:", new Font(Font.FontFamily.UNDEFINED, 15, Font.BOLD)));
            vendorNamePara.setAlignment(Paragraph.ALIGN_LEFT);
            document.add(vendorNamePara);

            PdfPTable vendorRatingTable = new PdfPTable(2);
            vendorRatingTable.setSpacingBefore(20);
            vendorRatingTable.setHorizontalAlignment(Paragraph.ALIGN_LEFT);

            PdfPCell c1;
            PdfPCell c2 = null;

            for (String param : ratedParameter) {

                c1 = new PdfPCell(new Phrase(param));
                c1.setBorder(PdfPCell.NO_BORDER);

                for (SupplierHeader supplierHeaderObj : supplierHeaderList) {
                    switch (param) {
                        case "MOQ/ MOV Details":
                            if (supplierHeaderObj.getBuyerMoqmovDetailsRatedParameterWeight() == null) {
                                c2 = new PdfPCell(new Phrase(""));
                                c2.setBorder(PdfPCell.NO_BORDER);
                            } else {
                                if (supplierHeaderObj.getBuyerMoqmovDetailsRatedParameterScore() == null) {
                                    c2 = new PdfPCell(new Phrase(""));
                                    c2.setBorder(PdfPCell.NO_BORDER);
                                } else {
                                    c2 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerMoqmovDetailsRatedParameterScore() + "/5"));
                                    c2.setBorder(PdfPCell.NO_BORDER);
                                }
                            }
                            break;
                        case "Delivery Lead Time":
                            if (supplierHeaderObj.getBuyerDeliveryLeadtimeRatedParameterWeight() == null) {
                                c2 = new PdfPCell(new Phrase(""));
                                c2.setBorder(PdfPCell.NO_BORDER);
                            } else {
                                if (supplierHeaderObj.getBuyerDeliveryLeadtimeRatedParameterScore() == null) {
                                    c2 = new PdfPCell(new Phrase(""));
                                    c2.setBorder(PdfPCell.NO_BORDER);
                                } else {
                                    c2 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerDeliveryLeadtimeRatedParameterScore() + "/5"));
                                    c2.setBorder(PdfPCell.NO_BORDER);
                                }
                            }
                            break;
                        case "Payment Terms":
                            if (supplierHeaderObj.getBuyerPaymentTermsRatedParameterWeight() == null) {
                                c2 = new PdfPCell(new Phrase(""));
                                c2.setBorder(PdfPCell.NO_BORDER);
                            } else {
                                if (supplierHeaderObj.getBuyerPaymentTermsRatedParameterScore() == null) {
                                    c2 = new PdfPCell(new Phrase(""));
                                    c2.setBorder(PdfPCell.NO_BORDER);
                                } else {
                                    c2 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerPaymentTermsRatedParameterScore() + "/5"));
                                    c2.setBorder(PdfPCell.NO_BORDER);
                                }
                            }
                            break;
                        case "Brand Model":
                            if (supplierHeaderObj.getBuyerBrandModelRatedParameterWeight() == null) {
                                c2 = new PdfPCell(new Phrase(""));
                                c2.setBorder(PdfPCell.NO_BORDER);
                            } else {
                                if (supplierHeaderObj.getBuyerBrandModelRatedParameterScore() == null) {
                                    c2 = new PdfPCell(new Phrase(""));
                                    c2.setBorder(PdfPCell.NO_BORDER);
                                } else {
                                    c2 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerBrandModelRatedParameterScore() + "/5"));
                                    c2.setBorder(PdfPCell.NO_BORDER);
                                }
                            }
                            break;
                        case "Incoterms":
                            if (supplierHeaderObj.getBuyerIncotermsRatedParameterWeight() == null) {
                                c2 = new PdfPCell(new Phrase(""));
                                c2.setBorder(PdfPCell.NO_BORDER);
                            } else {
                                if (supplierHeaderObj.getBuyerIncotermsRatedParameterScore() == null) {
                                    c2 = new PdfPCell(new Phrase(""));
                                    c2.setBorder(PdfPCell.NO_BORDER);
                                } else {
                                    c2 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerIncotermsRatedParameterScore() + "/5"));
                                    c2.setBorder(PdfPCell.NO_BORDER);
                                }
                            }
                            break;
                        case "Validity of Offer":
                            if (supplierHeaderObj.getBuyerValidityofferRatedParameterWeight() == null) {
                                c2 = new PdfPCell(new Phrase(""));
                                c2.setBorder(PdfPCell.NO_BORDER);
                            } else {
                                if (supplierHeaderObj.getBuyerValidityofferRatedParameterScore() == null) {
                                    c2 = new PdfPCell(new Phrase(""));
                                    c2.setBorder(PdfPCell.NO_BORDER);
                                } else {
                                    c2 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerValidityofferRatedParameterScore() + "/5"));
                                    c2.setBorder(PdfPCell.NO_BORDER);
                                }
                            }
                            break;
                    }
                }

                vendorRatingTable.addCell(c1);
                vendorRatingTable.addCell(c2);
            }
            document.add(vendorRatingTable);

            Paragraph reviewPara = new Paragraph("Reviews:");
            reviewPara.setAlignment(Paragraph.ALIGN_LEFT);
            document.add(reviewPara);

            for (SupplierHeader supplierHeaderObj : supplierHeaderList) {
                if (supplierHeaderObj.getBuyerBrandModelRatedParameter() != null && !supplierHeaderObj.getBuyerBrandModelRatedParameter().trim().equals("")) {
                    list.add(supplierHeaderObj.getBuyerBrandModelRatedParameter());
                }

                if (supplierHeaderObj.getBuyerDeliveryLeadtimeRatedParameter() != null && !supplierHeaderObj.getBuyerDeliveryLeadtimeRatedParameter().trim().equals("")) {
                    list.add(supplierHeaderObj.getBuyerDeliveryLeadtimeRatedParameter());
                }

                if (supplierHeaderObj.getBuyerIncotermsRatedParameter() != null && !supplierHeaderObj.getBuyerIncotermsRatedParameter().trim().equals("")) {
                    list.add(supplierHeaderObj.getBuyerIncotermsRatedParameter());
                }

                if (supplierHeaderObj.getBuyerMoqmovDetailsRatedParameter() != null && !supplierHeaderObj.getBuyerMoqmovDetailsRatedParameter().trim().equals("")) {
                    list.add(supplierHeaderObj.getBuyerMoqmovDetailsRatedParameter());
                }

                if (supplierHeaderObj.getBuyerPaymentTermsRatedParameter() != null && !supplierHeaderObj.getBuyerPaymentTermsRatedParameter().trim().equals("")) {
                    list.add(supplierHeaderObj.getBuyerPaymentTermsRatedParameter());
                }

                if (supplierHeaderObj.getBuyerValidityofferRatedParameter() != null && !supplierHeaderObj.getBuyerValidityofferRatedParameter().trim().equals("")) {
                    list.add(supplierHeaderObj.getBuyerValidityofferRatedParameter());
                }

            }
            document.add(list);
            document.add(blankPara);
            document.add(lineSeprator);
        }

        document.newPage();
        System.out.println("rfqVendorMappingList size is :::" + rfqVendorMappingList.size());
        for (int i = 0; i < rfqVendorMappingList.size(); i++) {

            RfqHeaderVendorMapping mapping = rfqVendorMappingList.get(i);
            VendorDetails vendorObj = mapping.getNgBpVendordetailsId();
            WorkOrderRfqHeader rfqHeader = mapping.getNgBpWorkorderrfqheaderRfqid();
            List<SupplierHeader> supplierHeaderList = rfqRfpWsUtil.getSupplierHeaderByVendorId(vendorObj.getId(), rfqHeader.getRfqid());

            Paragraph para = new Paragraph();

            Paragraph subcontent;
            subcontent = new Paragraph(new Chunk("Vendor Selection Criteria", new Font(Font.FontFamily.UNDEFINED, 20, Font.BOLD)));
            subcontent.setAlignment(Paragraph.ALIGN_LEFT);
            subcontent.setSpacingBefore(5);
            para.add(new Paragraph(subcontent));

            subcontent = new Paragraph(new Chunk("Scores (5 = Excellent, 4 = Good, 3 = Satisfactory, 2 = Below Average, 1 = Poor)", new Font(Font.FontFamily.UNDEFINED, 10, Font.NORMAL)));
            subcontent.setAlignment(Paragraph.ALIGN_LEFT);
            subcontent.setSpacingBefore(5);
            para.add(new Paragraph(subcontent));

            subcontent = new Paragraph(new Chunk("Vendor Name : " + vendorObj.getFirstname() + " " + vendorObj.getLastname(), new Font(Font.FontFamily.UNDEFINED, 15, Font.BOLD)));
            subcontent.setAlignment(Paragraph.ALIGN_LEFT);
            subcontent.setSpacingBefore(5);
            para.add(new Paragraph(subcontent));

            PdfPTable criteriaTable = new PdfPTable(5);
            criteriaTable.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
            criteriaTable.setWidthPercentage(100);
            criteriaTable.setWidths(new int[]{3, 1, 1, 2, 5});
            criteriaTable.setSpacingBefore(10);

            PdfPCell c1;
            PdfPCell c2;
            PdfPCell c3;
            PdfPCell c4;
            PdfPCell c5;

            c1 = new PdfPCell(new Phrase("Criteria"));
            c1.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
            c2 = new PdfPCell(new Phrase("Weight (%)"));
            c2.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
            c3 = new PdfPCell(new Phrase("Score"));
            c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
            c4 = new PdfPCell(new Phrase("Weighted Average Score"));
            c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
            c5 = new PdfPCell(new Phrase("Remarks"));
            c5.setHorizontalAlignment(Paragraph.ALIGN_CENTER);

            criteriaTable.addCell(c1);
            criteriaTable.addCell(c2);
            criteriaTable.addCell(c3);
            criteriaTable.addCell(c4);
            criteriaTable.addCell(c5);

            int totalWeight = 0;
            int totalScore = 0;
            double totalAverage = 0;

            for (String param : ratedParameter) {
                c1 = new PdfPCell(new Phrase(param));

                for (SupplierHeader supplierHeaderObj : supplierHeaderList) {
                    switch (param) {
                        case "MOQ/ MOV Details":
                            c5 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerMoqmovDetailsRatedParameter()));

                            c2 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerMoqmovDetailsRatedParameterWeight()));
                            c2.setHorizontalAlignment(Paragraph.ALIGN_CENTER);

                            if (supplierHeaderObj.getBuyerMoqmovDetailsRatedParameterWeight() == null) {
                                c3 = new PdfPCell(new Phrase(""));
                                c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);

                                c4 = new PdfPCell(new Phrase(""));
                                c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
                            } else {
                                totalWeight += Integer.parseInt(supplierHeaderObj.getBuyerMoqmovDetailsRatedParameterWeight());

                                if (supplierHeaderObj.getBuyerMoqmovDetailsRatedParameterScore() == null) {
                                    c3 = new PdfPCell(new Phrase(""));
                                    c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);

                                    c4 = new PdfPCell(new Phrase(""));
                                    c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
                                } else {
                                    totalScore += Integer.parseInt(supplierHeaderObj.getBuyerMoqmovDetailsRatedParameterScore());

                                    c3 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerMoqmovDetailsRatedParameterScore()));
                                    c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);

                                    double average = (Double.parseDouble(supplierHeaderObj.getBuyerMoqmovDetailsRatedParameterScore()) * Double.parseDouble(supplierHeaderObj.getBuyerMoqmovDetailsRatedParameterWeight())) / 100;
                                    System.out.println("MOQ average: " + average);
                                    totalAverage += average;

                                    c4 = new PdfPCell(new Phrase("" + average));
                                    c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
                                }
                            }
                            break;
                        case "Delivery Lead Time":
                            c5 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerDeliveryLeadtimeRatedParameter()));
                            c2 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerDeliveryLeadtimeRatedParameterWeight()));
                            c2.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
                            if (supplierHeaderObj.getBuyerDeliveryLeadtimeRatedParameterWeight() == null) {
                                c3 = new PdfPCell(new Phrase(""));
                                c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
                                c4 = new PdfPCell(new Phrase(""));
                                c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
                            } else {
                                totalWeight += Integer.parseInt(supplierHeaderObj.getBuyerDeliveryLeadtimeRatedParameterWeight());

                                if (supplierHeaderObj.getBuyerDeliveryLeadtimeRatedParameterScore() == null) {
                                    c3 = new PdfPCell(new Phrase(""));
                                    c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
                                    c4 = new PdfPCell(new Phrase(""));
                                    c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
                                } else {
                                    totalScore += Integer.parseInt(supplierHeaderObj.getBuyerDeliveryLeadtimeRatedParameterScore());

                                    c3 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerDeliveryLeadtimeRatedParameterScore()));
                                    c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);

                                    double average = (Double.parseDouble(supplierHeaderObj.getBuyerDeliveryLeadtimeRatedParameterScore()) * Double.parseDouble(supplierHeaderObj.getBuyerDeliveryLeadtimeRatedParameterWeight())) / 100;
                                    System.out.println("Del average: " + average);
                                    totalAverage += average;

                                    c4 = new PdfPCell(new Phrase("" + average));
                                    c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
                                }
                            }
                            break;
                        case "Payment Terms":
                            c5 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerPaymentTermsRatedParameter()));
                            c2 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerPaymentTermsRatedParameterWeight()));
                            c2.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
                            if (supplierHeaderObj.getBuyerPaymentTermsRatedParameterWeight() == null) {
                                c3 = new PdfPCell(new Phrase(""));
                                c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
                                c4 = new PdfPCell(new Phrase(""));
                                c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
                            } else {
                                totalWeight += Integer.parseInt(supplierHeaderObj.getBuyerPaymentTermsRatedParameterWeight());

                                if (supplierHeaderObj.getBuyerPaymentTermsRatedParameterScore() == null) {
                                    c3 = new PdfPCell(new Phrase(""));
                                    c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
                                    c4 = new PdfPCell(new Phrase(""));
                                    c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
                                } else {
                                    totalScore += Integer.parseInt(supplierHeaderObj.getBuyerPaymentTermsRatedParameterScore());

                                    c3 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerPaymentTermsRatedParameterScore()));
                                    c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);

                                    double average = (Double.parseDouble(supplierHeaderObj.getBuyerPaymentTermsRatedParameterScore()) * Double.parseDouble(supplierHeaderObj.getBuyerPaymentTermsRatedParameterWeight())) / 100;
                                    System.out.println("Pay average: " + average);
                                    totalAverage += average;

                                    c4 = new PdfPCell(new Phrase("" + average));
                                    c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
                                }
                            }
                            break;
                        case "Brand Model":
                            c5 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerBrandModelRatedParameter()));
                            c2 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerBrandModelRatedParameterWeight()));
                            c2.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
                            if (supplierHeaderObj.getBuyerBrandModelRatedParameterWeight() == null) {
                                c3 = new PdfPCell(new Phrase(""));
                                c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
                                c4 = new PdfPCell(new Phrase(""));
                                c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
                            } else {
                                totalWeight += Integer.parseInt(supplierHeaderObj.getBuyerBrandModelRatedParameterWeight());

                                if (supplierHeaderObj.getBuyerBrandModelRatedParameterScore() == null) {
                                    c3 = new PdfPCell(new Phrase(""));
                                    c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
                                    c4 = new PdfPCell(new Phrase(""));
                                    c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
                                } else {
                                    totalScore += Integer.parseInt(supplierHeaderObj.getBuyerBrandModelRatedParameterScore());

                                    c3 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerBrandModelRatedParameterScore()));
                                    c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);

                                    double average = (Double.parseDouble(supplierHeaderObj.getBuyerBrandModelRatedParameterScore()) * Double.parseDouble(supplierHeaderObj.getBuyerBrandModelRatedParameterWeight())) / 100;
                                    System.out.println("Brand average: " + average);
                                    totalAverage += average;

                                    c4 = new PdfPCell(new Phrase("" + average));
                                    c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
                                }
                            }
                            break;
                        case "Incoterms":
                            c5 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerIncotermsRatedParameter()));
                            c2 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerIncotermsRatedParameterWeight()));
                            c2.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
                            if (supplierHeaderObj.getBuyerIncotermsRatedParameterWeight() == null) {
                                c3 = new PdfPCell(new Phrase(""));
                                c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
                                c4 = new PdfPCell(new Phrase(""));
                                c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
                            } else {
                                totalWeight += Integer.parseInt(supplierHeaderObj.getBuyerIncotermsRatedParameterWeight());

                                if (supplierHeaderObj.getBuyerIncotermsRatedParameterScore() == null) {
                                    c3 = new PdfPCell(new Phrase(""));
                                    c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
                                    c4 = new PdfPCell(new Phrase(""));
                                    c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
                                } else {
                                    totalScore += Integer.parseInt(supplierHeaderObj.getBuyerIncotermsRatedParameterScore());

                                    c3 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerIncotermsRatedParameterScore()));
                                    c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);

                                    double average = (Double.parseDouble(supplierHeaderObj.getBuyerIncotermsRatedParameterScore()) * Double.parseDouble(supplierHeaderObj.getBuyerIncotermsRatedParameterWeight())) / 100;
                                    System.out.println("Inc average: " + average);
                                    totalAverage += average;

                                    c4 = new PdfPCell(new Phrase("" + average));
                                    c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
                                }
                            }
                            break;
                        case "Validity of Offer":
                            c5 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerValidityofferRatedParameter()));
                            c2 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerValidityofferRatedParameterWeight()));
                            c2.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
                            if (supplierHeaderObj.getBuyerValidityofferRatedParameterWeight() == null) {
                                c3 = new PdfPCell(new Phrase(""));
                                c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
                                c4 = new PdfPCell(new Phrase(""));
                                c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
                            } else {
                                totalWeight += Integer.parseInt(supplierHeaderObj.getBuyerValidityofferRatedParameterWeight());

                                if (supplierHeaderObj.getBuyerValidityofferRatedParameterScore() == null) {
                                    c3 = new PdfPCell(new Phrase(""));
                                    c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
                                    c4 = new PdfPCell(new Phrase(""));
                                    c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
                                } else {
                                    totalScore += Integer.parseInt(supplierHeaderObj.getBuyerValidityofferRatedParameterScore());

                                    c3 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerValidityofferRatedParameterScore()));
                                    c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);

                                    double average = (Double.parseDouble(supplierHeaderObj.getBuyerValidityofferRatedParameterScore()) * Double.parseDouble(supplierHeaderObj.getBuyerValidityofferRatedParameterWeight())) / 100;
                                    System.out.println("Val average: " + average);
                                    totalAverage += average;

                                    c4 = new PdfPCell(new Phrase("" + average));
                                    c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
                                }
                            }
                            break;
                    }
                    criteriaTable.addCell(c1);
                    criteriaTable.addCell(c2);
                    criteriaTable.addCell(c3);
                    criteriaTable.addCell(c4);
                    criteriaTable.addCell(c5);
                }
//              criteriaTable.addCell(c1);
//              criteriaTable.addCell(c2);
//              criteriaTable.addCell(c3);
//              criteriaTable.addCell(c4);
//              criteriaTable.addCell(c5);  
            }

            c1 = new PdfPCell(new Phrase("Overall"));
            c2 = new PdfPCell(new Phrase("" + totalWeight));
            c2.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
            c3 = new PdfPCell(new Phrase("" + totalScore));
            c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
            c4 = new PdfPCell(new Phrase(String.format("%.2f", totalAverage)));
            c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
            c5 = new PdfPCell(new Phrase(""));

            criteriaTable.addCell(c1);
            criteriaTable.addCell(c2);
            criteriaTable.addCell(c3);
            criteriaTable.addCell(c4);
            criteriaTable.addCell(c5);

            document.add(para);
            document.add(criteriaTable);

            document.newPage();
        }
    }

    public Workbook createRfqEvalCompExcelReport(Workbook workbook, List<WorkOrderRfqHeader> rfqHeaderList, List<WorkOrderRfqLineItem> rfqLineItemList,
            List<SupplierHeader> supplierHeaderList) {

        Sheet sheet = workbook.createSheet("Vendor Comparision Report");
        Cell cell;
        Row row;
        List<Integer> vendorIdList = new ArrayList<>();
        for (int i = 0; i < supplierHeaderList.size(); i++) {
            SupplierHeader supplierHeaderObj = supplierHeaderList.get(i);
            int index = vendorIdList.indexOf(supplierHeaderObj.getNgBpVendordetailsId().getId());
            System.out.println("index: " + index);
            if (index == -1) {
                vendorIdList.add(supplierHeaderObj.getNgBpVendordetailsId().getId());
            }
        }
        System.out.println("vendorIdList: " + vendorIdList);

        int noOfVendors = vendorIdList.size();
        int noOfLineItem = rfqLineItemList.size();

        org.apache.poi.ss.usermodel.Font boldFont = workbook.createFont();
        boldFont.setBoldweight(org.apache.poi.ss.usermodel.Font.BOLDWEIGHT_BOLD);

        org.apache.poi.ss.usermodel.Font normalFont = workbook.createFont();

        CellStyle boldCellStyle = workbook.createCellStyle();
        boldCellStyle.setFont(boldFont);
        boldCellStyle.setAlignment(CellStyle.ALIGN_CENTER);
        boldCellStyle.setBorderBottom(CellStyle.BORDER_MEDIUM);
        boldCellStyle.setBorderTop(CellStyle.BORDER_MEDIUM);
        boldCellStyle.setBorderLeft(CellStyle.BORDER_MEDIUM);
        boldCellStyle.setBorderRight(CellStyle.BORDER_MEDIUM);

        CellStyle normalCellStyle = workbook.createCellStyle();
        normalCellStyle.setFont(normalFont);
        normalCellStyle.setAlignment(CellStyle.ALIGN_CENTER);
        normalCellStyle.setBorderBottom(CellStyle.BORDER_MEDIUM);
        normalCellStyle.setBorderTop(CellStyle.BORDER_MEDIUM);
        normalCellStyle.setBorderLeft(CellStyle.BORDER_MEDIUM);
        normalCellStyle.setBorderRight(CellStyle.BORDER_MEDIUM);

        row = sheet.createRow(2);
        cell = row.createCell(6);
        cell.setCellValue("SUPPLIER'S QUOTATION");
        cell.setCellStyle(boldCellStyle);

        for (int i = 7; i < (noOfVendors * 4) + 6; i++) {
            cell = row.createCell(i);
            cell.setCellStyle(boldCellStyle);
        }

        // CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
        sheet.addMergedRegion(new CellRangeAddress(2, 2, 6, (noOfVendors * 4) + 5));

        int index = 0;
        Row vendorCountRow = sheet.createRow(3);
        Row vendorNameRow = sheet.createRow(4);
        Row vendorTelRow = sheet.createRow(5);
        Row vendorContactNameRow = sheet.createRow(6);

        for (int i = 0; i < noOfVendors * 4; i++) {
            if (i % 4 == 0) {
                System.out.println("noOfVendors * 4 = " + noOfVendors * 4);
//                SupplierHeader supplierHeaderObj = supplierHeaderList.get(index);
                VendorDetails vendorObj = rfqRfpWsUtil.findVendorById(vendorIdList.get(index));

                cell = vendorCountRow.createCell(i + 6);
                cell.setCellValue(index + 1);
                cell.setCellStyle(boldCellStyle);

                cell = vendorCountRow.createCell(i + 1 + 6);
                cell.setCellStyle(boldCellStyle);
                cell = vendorCountRow.createCell(i + 2 + 6);
                cell.setCellStyle(boldCellStyle);
                cell = vendorCountRow.createCell(i + 3 + 6);
                cell.setCellStyle(boldCellStyle);
                sheet.addMergedRegion(new CellRangeAddress(3, 3, i + 6, i + 3 + 6));

                cell = vendorNameRow.createCell(i + 6);
                cell.setCellValue(vendorObj.getFirstname() + " " + vendorObj.getLastname());
                cell.setCellStyle(boldCellStyle);

                cell = vendorNameRow.createCell(i + 1 + 6);
                cell.setCellStyle(boldCellStyle);
                cell = vendorNameRow.createCell(i + 2 + 6);
                cell.setCellStyle(boldCellStyle);
                cell = vendorNameRow.createCell(i + 3 + 6);
                cell.setCellStyle(boldCellStyle);
                sheet.addMergedRegion(new CellRangeAddress(4, 4, i + 6, i + 3 + 6));

                cell = vendorTelRow.createCell(i + 6);
                if (vendorObj.getContactnumbermob() == null) {
                    cell.setCellValue("Tel: ");
                } else {
                    cell.setCellValue("Tel: " + vendorObj.getContactnumbermob());
                }
                cell.setCellStyle(boldCellStyle);

                cell = vendorTelRow.createCell(i + 1 + 6);
                cell.setCellStyle(boldCellStyle);
                cell = vendorTelRow.createCell(i + 2 + 6);
                cell.setCellStyle(boldCellStyle);
                cell = vendorTelRow.createCell(i + 3 + 6);
                cell.setCellStyle(boldCellStyle);
                sheet.addMergedRegion(new CellRangeAddress(5, 5, i + 6, i + 3 + 6));

                cell = vendorContactNameRow.createCell(i + 6);
                if (vendorObj.getContactfirstname() == null && vendorObj.getContactlastname() == null) {
                    cell.setCellValue("");
                } else if (vendorObj.getContactfirstname() != null && vendorObj.getContactlastname() == null) {
                    cell.setCellValue(vendorObj.getContactfirstname());
                } else if (vendorObj.getContactfirstname() == null && vendorObj.getContactlastname() != null) {
                    cell.setCellValue(vendorObj.getContactlastname());
                } else if (vendorObj.getContactfirstname() != null && vendorObj.getContactlastname() != null) {
                    cell.setCellValue(vendorObj.getContactfirstname() + " " + vendorObj.getContactlastname());
                }
                cell.setCellStyle(boldCellStyle);

                cell = vendorContactNameRow.createCell(i + 1 + 6);
                cell.setCellStyle(boldCellStyle);
                cell = vendorContactNameRow.createCell(i + 2 + 6);
                cell.setCellStyle(boldCellStyle);
                cell = vendorContactNameRow.createCell(i + 3 + 6);
                cell.setCellStyle(boldCellStyle);
                sheet.addMergedRegion(new CellRangeAddress(6, 6, i + 6, i + 3 + 6));

                index++;
            }
        }

        row = sheet.createRow(7);

        cell = row.createCell(0);
        cell.setCellValue("S/N");
        cell.setCellStyle(boldCellStyle);

        cell = row.createCell(1);
        cell.setCellValue("PLANT");
        cell.setCellStyle(boldCellStyle);

        cell = row.createCell(2);
        cell.setCellValue("STK_CODE");
        cell.setCellStyle(boldCellStyle);

        cell = row.createCell(3);
        cell.setCellValue("ITEM DESCRIPTION");
        cell.setCellStyle(boldCellStyle);

        cell = row.createCell(4);
        cell.setCellValue("UOM");
        cell.setCellStyle(boldCellStyle);

        cell = row.createCell(5);
        cell.setCellValue("QTY");
        cell.setCellStyle(boldCellStyle);

        for (int k = 0; k < noOfVendors * 4; k++) {
            if (k % 4 == 0) {
                cell = row.createCell(k + 6);
                cell.setCellValue("U/P");
                cell.setCellStyle(boldCellStyle);

                cell = row.createCell(k + 7);
                cell.setCellValue("Total");
                cell.setCellStyle(boldCellStyle);

                cell = row.createCell(k + 8);
                cell.setCellValue("Buyer U/P");
                cell.setCellStyle(boldCellStyle);

                cell = row.createCell(k + 9);
                cell.setCellValue("Buyer Total");
                cell.setCellStyle(boldCellStyle);
            }

        }

        Row blankRow = sheet.createRow(8);

        cell = blankRow.createCell(5);
        cell.setCellValue("(Annum)");
        cell.setCellStyle(boldCellStyle);

        //Grand Total
        Row totalRow = sheet.createRow(noOfLineItem + 10);

        cell = totalRow.createCell(0);
        cell.setCellValue("A");
        cell.setCellStyle(boldCellStyle);

        cell = totalRow.createCell(1);
        cell.setCellValue("TOTAL PER ANNUAL");
        cell.setCellStyle(boldCellStyle);

        cell = totalRow.createCell(2);
        cell.setCellStyle(boldCellStyle);

        cell = totalRow.createCell(3);
        cell.setCellStyle(boldCellStyle);

        cell = totalRow.createCell(4);
        cell.setCellStyle(boldCellStyle);

        cell = totalRow.createCell(5);
        cell.setCellStyle(boldCellStyle);

        sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 10, noOfLineItem + 10, 1, 5));

        //MOQ/ MOV
        Row moqMovRow = sheet.createRow(noOfLineItem + 11);

        cell = moqMovRow.createCell(0);
        cell.setCellValue("B");
        cell.setCellStyle(boldCellStyle);

        cell = moqMovRow.createCell(1);
        cell.setCellValue("MOQ/ MOV");
        cell.setCellStyle(boldCellStyle);

        cell = moqMovRow.createCell(2);
        cell.setCellStyle(boldCellStyle);

        cell = moqMovRow.createCell(3);
        cell.setCellStyle(boldCellStyle);

        cell = moqMovRow.createCell(4);
        cell.setCellStyle(boldCellStyle);

        cell = moqMovRow.createCell(5);
        cell.setCellStyle(boldCellStyle);

        sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 11, noOfLineItem + 11, 1, 5));

        // Delivery Leadtime
        Row deliveryLeadTimeRow = sheet.createRow(noOfLineItem + 12);

        cell = deliveryLeadTimeRow.createCell(0);
        cell.setCellValue("C");
        cell.setCellStyle(boldCellStyle);

        cell = deliveryLeadTimeRow.createCell(1);
        cell.setCellValue("DELIVERY LEADTIME");
        cell.setCellStyle(boldCellStyle);

        cell = deliveryLeadTimeRow.createCell(2);
        cell.setCellStyle(boldCellStyle);

        cell = deliveryLeadTimeRow.createCell(3);
        cell.setCellStyle(boldCellStyle);

        cell = deliveryLeadTimeRow.createCell(4);
        cell.setCellStyle(boldCellStyle);

        cell = deliveryLeadTimeRow.createCell(5);
        cell.setCellStyle(boldCellStyle);

        sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 12, noOfLineItem + 12, 1, 5));

        // Payment Term
        Row paymentTermRow = sheet.createRow(noOfLineItem + 13);

        cell = paymentTermRow.createCell(0);
        cell.setCellValue("D");
        cell.setCellStyle(boldCellStyle);

        cell = paymentTermRow.createCell(1);
        cell.setCellValue("PAYMENT TERM");
        cell.setCellStyle(boldCellStyle);

        cell = paymentTermRow.createCell(2);
        cell.setCellStyle(boldCellStyle);

        cell = paymentTermRow.createCell(3);
        cell.setCellStyle(boldCellStyle);

        cell = paymentTermRow.createCell(4);
        cell.setCellStyle(boldCellStyle);

        cell = paymentTermRow.createCell(5);
        cell.setCellStyle(boldCellStyle);

        sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 13, noOfLineItem + 13, 1, 5));

        // Brand
        Row brandRow = sheet.createRow(noOfLineItem + 14);

        cell = brandRow.createCell(0);
        cell.setCellValue("E");
        cell.setCellStyle(boldCellStyle);

        cell = brandRow.createCell(1);
        cell.setCellValue("BRAND");
        cell.setCellStyle(boldCellStyle);

        cell = brandRow.createCell(2);
        cell.setCellStyle(boldCellStyle);

        cell = brandRow.createCell(3);
        cell.setCellStyle(boldCellStyle);

        cell = brandRow.createCell(4);
        cell.setCellStyle(boldCellStyle);

        cell = brandRow.createCell(5);
        cell.setCellStyle(boldCellStyle);

        sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 14, noOfLineItem + 14, 1, 5));

        // Validity of offer
        Row validityOfOfferRow = sheet.createRow(noOfLineItem + 15);

        cell = validityOfOfferRow.createCell(0);
        cell.setCellValue("F");
        cell.setCellStyle(boldCellStyle);

        cell = validityOfOfferRow.createCell(1);
        cell.setCellValue("VALIDITY OF OFFER");
        cell.setCellStyle(boldCellStyle);

        cell = validityOfOfferRow.createCell(2);
        cell.setCellStyle(boldCellStyle);

        cell = validityOfOfferRow.createCell(3);
        cell.setCellStyle(boldCellStyle);

        cell = validityOfOfferRow.createCell(4);
        cell.setCellStyle(boldCellStyle);

        cell = validityOfOfferRow.createCell(5);
        cell.setCellStyle(boldCellStyle);

        sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 15, noOfLineItem + 15, 1, 5));

        // Incoterm
        Row incotermRow = sheet.createRow(noOfLineItem + 16);

        cell = incotermRow.createCell(0);
        cell.setCellValue("G");
        cell.setCellStyle(boldCellStyle);

        cell = incotermRow.createCell(1);
        cell.setCellValue("Incoterm");
        cell.setCellStyle(boldCellStyle);

        cell = incotermRow.createCell(2);
        cell.setCellStyle(boldCellStyle);

        cell = incotermRow.createCell(3);
        cell.setCellStyle(boldCellStyle);

        cell = incotermRow.createCell(4);
        cell.setCellStyle(boldCellStyle);

        cell = incotermRow.createCell(5);
        cell.setCellStyle(boldCellStyle);

        sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 16, noOfLineItem + 16, 1, 5));

        // Ranking of Tender
        Row rankingOfTenderRow = sheet.createRow(noOfLineItem + 17);

        cell = rankingOfTenderRow.createCell(0);
        cell.setCellValue("H");
        cell.setCellStyle(boldCellStyle);

        cell = rankingOfTenderRow.createCell(1);
        cell.setCellValue("RANKING OF TENDER");
        cell.setCellStyle(boldCellStyle);

        cell = rankingOfTenderRow.createCell(2);
        cell.setCellStyle(boldCellStyle);

        cell = rankingOfTenderRow.createCell(3);
        cell.setCellStyle(boldCellStyle);

        cell = rankingOfTenderRow.createCell(4);
        cell.setCellStyle(boldCellStyle);

        cell = rankingOfTenderRow.createCell(5);
        cell.setCellStyle(boldCellStyle);

        sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 17, noOfLineItem + 17, 1, 5));

        // FSC COMPLIANCE
        Row fscComplianceRow = sheet.createRow(noOfLineItem + 18);

        cell = fscComplianceRow.createCell(0);
        cell.setCellValue("I");
        cell.setCellStyle(boldCellStyle);

        cell = fscComplianceRow.createCell(1);
        cell.setCellValue("FSC COMPLIANCE");
        cell.setCellStyle(boldCellStyle);

        cell = fscComplianceRow.createCell(2);
        cell.setCellStyle(boldCellStyle);

        cell = fscComplianceRow.createCell(3);
        cell.setCellStyle(boldCellStyle);

        cell = fscComplianceRow.createCell(4);
        cell.setCellStyle(boldCellStyle);

        cell = fscComplianceRow.createCell(5);
        cell.setCellStyle(boldCellStyle);

        sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 18, noOfLineItem + 18, 1, 5));

        Map<Integer, Double> vendorPriceOfferedTotalMap = new HashMap<>();
        Map<Integer, Double> buyerPriceOfferedTotalMap = new HashMap<>();
        int prIndex = 0;
        for (int i = 9; i < noOfLineItem + 9; i++) {
            row = sheet.createRow(i);
            WorkOrderRfqLineItem rfqLineItem = rfqLineItemList.get(prIndex);
            int rfqId = rfqLineItem.getBPaasWorkOrderRFQHeaderRFQID().getRfqid();
            int insertionOrderId = rfqLineItem.getNgBpNewgenPRLineItemId().getInsertionOrderId();

            cell = row.createCell(0);
            cell.setCellValue(prIndex + 1);
            cell.setCellStyle(normalCellStyle);

            cell = row.createCell(1);
            cell.setCellValue(rfqLineItem.getNgBpNewgenPRLineItemId().getPlant());
            cell.setCellStyle(normalCellStyle);

            cell = row.createCell(2);
            cell.setCellValue(rfqLineItem.getNgBpNewgenPRLineItemId().getMaterialCode());
            cell.setCellStyle(normalCellStyle);

            cell = row.createCell(3);
            cell.setCellValue(rfqLineItem.getNgBpNewgenPRLineItemId().getShortText());
            cell.setCellStyle(normalCellStyle);

            cell = row.createCell(4);
            cell.setCellValue(rfqLineItem.getNgBpNewgenPRLineItemId().getUnit());
            cell.setCellStyle(normalCellStyle);

            cell = row.createCell(5);
            cell.setCellValue(rfqLineItem.getQuantity());
            cell.setCellStyle(normalCellStyle);

            index = 0;
            for (int j = 0; j < noOfVendors * 4; j++) {
                if (j % 4 == 0) {
//                    SupplierHeader supplierHeaderObj = supplierHeaderList.get(index);
                    int vendorId = vendorIdList.get(index);
                    List<SupplierHeader> supplierHeaderTempList = rfqRfpWsUtil.getSupplierHeaderByVendoridAndRfqIdAndStatus(vendorId, rfqId);

                    if (!supplierHeaderTempList.isEmpty()) {
                        SupplierHeader supplierHeaderObj = supplierHeaderTempList.get(0);

                        List<SupplierLineitem> supplierLineItemList = rfqRfpWsUtil.findSupplierLineItemBySupplierHeaderIdAndInsertionOrderIdAndStatus(supplierHeaderObj.getId(), insertionOrderId);
                        SupplierLineitem vendorLineItem = supplierLineItemList.get(0);

                        cell = row.createCell(j + 6);
                        cell.setCellValue(vendorLineItem.getVendorpriceofferedperunit() == null ? "NQ" : vendorLineItem.getVendorpriceofferedperunit());
                        cell.setCellStyle(normalCellStyle);

                        cell = row.createCell(j + 7);
                        cell.setCellValue(vendorLineItem.getVendorpriceofferedtotal() == null ? "NQ" : vendorLineItem.getVendorpriceofferedtotal());
                        cell.setCellStyle(normalCellStyle);

                        cell = row.createCell(j + 8);
                        cell.setCellValue(vendorLineItem.getVendorpriceofferedperunit() == null ? "NQ" : vendorLineItem.getVendorpriceofferedperunit());
                        cell.setCellStyle(normalCellStyle);

                        cell = row.createCell(j + 9);
                        cell.setCellValue(vendorLineItem.getBuyerBaselinePrice() == null ? "NQ" : vendorLineItem.getBuyerBaselinePrice());
                        cell.setCellStyle(normalCellStyle);

                        if (vendorPriceOfferedTotalMap.get(vendorId) != null) {
                            if (vendorLineItem.getVendorpriceofferedtotal() != null) {
                                vendorPriceOfferedTotalMap.put(vendorId, vendorPriceOfferedTotalMap.get(vendorId) + Double.parseDouble(vendorLineItem.getVendorpriceofferedtotal()));
                            } else {
                                vendorPriceOfferedTotalMap.put(vendorId, vendorPriceOfferedTotalMap.get(vendorId));
                            }
                        } else {
                            if (vendorLineItem.getVendorpriceofferedtotal() != null) {
                                vendorPriceOfferedTotalMap.put(vendorId, Double.parseDouble(vendorLineItem.getVendorpriceofferedtotal()));
                            } else {
                                vendorPriceOfferedTotalMap.put(vendorId, 0.0);
                            }
                        }
                        if (buyerPriceOfferedTotalMap.get(vendorId) != null) {
                            if (vendorLineItem.getBuyerBaselinePrice() != null) {
                                buyerPriceOfferedTotalMap.put(vendorId, buyerPriceOfferedTotalMap.get(vendorId) + Double.parseDouble(vendorLineItem.getBuyerBaselinePrice()));
                            } else {
                                buyerPriceOfferedTotalMap.put(vendorId, buyerPriceOfferedTotalMap.get(vendorId));
                            }
                        } else {
                            if (vendorLineItem.getBuyerBaselinePrice() != null) {
                                buyerPriceOfferedTotalMap.put(vendorId, Double.parseDouble(vendorLineItem.getBuyerBaselinePrice()));
                            } else {
                                buyerPriceOfferedTotalMap.put(vendorId, 0.0);
                            }
                        }
                    } else {
                        cell = row.createCell(j + 6);
                        cell.setCellValue("NQ");
                        cell.setCellStyle(normalCellStyle);

                        cell = row.createCell(j + 7);
                        cell.setCellValue("NQ");
                        cell.setCellStyle(normalCellStyle);

                        cell = row.createCell(j + 8);
                        cell.setCellValue("NQ");
                        cell.setCellStyle(normalCellStyle);

                        cell = row.createCell(j + 9);
                        cell.setCellValue("NQ");
                        cell.setCellStyle(normalCellStyle);
                    }
                    index++;
                }
            }
            prIndex++;
        }

        index = 0;
        for (int j = 0; j < noOfVendors * 4; j++) {
            if (j % 4 == 0) {
                int vendorId = vendorIdList.get(index);
                Double vendorPriceOfferedTotal = vendorPriceOfferedTotalMap.get(vendorId);
                Double buyerPriceOfferedTotal = buyerPriceOfferedTotalMap.get(vendorId);

                System.out.println("vendorPriceOfferedTotal: " + vendorPriceOfferedTotal);
                System.out.println("buyerPriceOfferedTotal: " + buyerPriceOfferedTotal);

                //Grand Total
                cell = totalRow.createCell(j + 6);
                cell.setCellValue(vendorPriceOfferedTotal == null ? "NQ" : vendorPriceOfferedTotal + "");
                cell.setCellStyle(normalCellStyle);

                cell = totalRow.createCell(j + 7);
                cell.setCellStyle(normalCellStyle);

                sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 10, noOfLineItem + 10, j + 6, j + 7));

                cell = totalRow.createCell(j + 8);
                cell.setCellValue(buyerPriceOfferedTotal == null ? "NQ" : buyerPriceOfferedTotal + "");
                cell.setCellStyle(normalCellStyle);

                cell = totalRow.createCell(j + 9);
                cell.setCellStyle(normalCellStyle);

                sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 10, noOfLineItem + 10, j + 8, j + 9));

                index++;
            }
        }

        index = 0;
        for (int j = 0; j < noOfVendors * 4; j++) {
            if (j % 4 == 0) {
                SupplierHeader supplierHeaderObj = supplierHeaderList.get(index);

                cell = blankRow.createCell(j + 8);
                cell.setCellValue("(REV & FINAL)");
                cell.setCellStyle(boldCellStyle);

                cell = blankRow.createCell(j + 9);
                cell.setCellStyle(boldCellStyle);

                sheet.addMergedRegion(new CellRangeAddress(8, 8, j + 8, j + 9));

                //Grand Total
//                cell = totalRow.createCell(j + 6);
//                cell.setCellValue(supplierHeaderObj.getVendorPriceOfferedTotal() == null ? "NQ" : supplierHeaderObj.getVendorPriceOfferedTotal());
//                cell.setCellStyle(normalCellStyle);
//                cell = totalRow.createCell(j + 7);
//                cell.setCellStyle(normalCellStyle);
//                sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 10, noOfLineItem + 10, j + 6, j + 7));
//                cell = totalRow.createCell(j + 8);
//                cell.setCellValue(supplierHeaderObj.getBuyerPriceOfferedTotal() == null ? "NQ" : supplierHeaderObj.getBuyerPriceOfferedTotal());
//                cell.setCellStyle(normalCellStyle);
//                cell = totalRow.createCell(j + 9);
//                cell.setCellStyle(normalCellStyle);
//                sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 10, noOfLineItem + 10, j + 8, j + 9));
                // MOQ/ MOV
                cell = moqMovRow.createCell(j + 6);
                cell.setCellValue(supplierHeaderObj.getmOQMOVDetailsRatedParameter());
                cell.setCellStyle(normalCellStyle);

                cell = moqMovRow.createCell(j + 7);
                cell.setCellStyle(normalCellStyle);

                sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 11, noOfLineItem + 11, j + 6, j + 7));

                cell = moqMovRow.createCell(j + 8);
                cell.setCellValue(supplierHeaderObj.getBuyerMoqmovDetailsRatedParameter());
                cell.setCellStyle(normalCellStyle);

                cell = moqMovRow.createCell(j + 9);
                cell.setCellStyle(normalCellStyle);

                sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 11, noOfLineItem + 11, j + 8, j + 9));

                // Delivery Leadtime
                cell = deliveryLeadTimeRow.createCell(j + 6);
                cell.setCellValue(supplierHeaderObj.getDeliveryLeadTImeRatedParameter());
                cell.setCellStyle(normalCellStyle);

                cell = deliveryLeadTimeRow.createCell(j + 7);
                cell.setCellStyle(normalCellStyle);

                sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 12, noOfLineItem + 12, j + 6, j + 7));

                cell = deliveryLeadTimeRow.createCell(j + 8);
                cell.setCellValue(supplierHeaderObj.getBuyerDeliveryLeadtimeRatedParameter());
                cell.setCellStyle(normalCellStyle);

                cell = deliveryLeadTimeRow.createCell(j + 9);
                cell.setCellStyle(normalCellStyle);

                sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 12, noOfLineItem + 12, j + 8, j + 9));

                // Payment Term
                cell = paymentTermRow.createCell(j + 6);
                cell.setCellValue(supplierHeaderObj.getPaymentTermsRatedParameter());
                cell.setCellStyle(normalCellStyle);

                cell = paymentTermRow.createCell(j + 7);
                cell.setCellStyle(normalCellStyle);

                sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 13, noOfLineItem + 13, j + 6, j + 7));

                cell = paymentTermRow.createCell(j + 8);
                cell.setCellValue(supplierHeaderObj.getBuyerPaymentTermsRatedParameter());
                cell.setCellStyle(normalCellStyle);

                cell = paymentTermRow.createCell(j + 9);
                cell.setCellStyle(normalCellStyle);

                sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 13, noOfLineItem + 13, j + 8, j + 9));

                // Brand
                cell = brandRow.createCell(j + 6);
                cell.setCellValue(supplierHeaderObj.getBrandModelRatedParameter());
                cell.setCellStyle(normalCellStyle);

                cell = brandRow.createCell(j + 7);
                cell.setCellStyle(normalCellStyle);

                sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 14, noOfLineItem + 14, j + 6, j + 7));

                cell = brandRow.createCell(j + 8);
                cell.setCellValue(supplierHeaderObj.getBuyerBrandModelRatedParameter());
                cell.setCellStyle(normalCellStyle);

                cell = brandRow.createCell(j + 9);
                cell.setCellStyle(normalCellStyle);

                sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 14, noOfLineItem + 14, j + 8, j + 9));

                // Validity of Offer
                cell = validityOfOfferRow.createCell(j + 6);
                cell.setCellValue(supplierHeaderObj.getValidityOfferRatedParameter());
                cell.setCellStyle(normalCellStyle);

                cell = validityOfOfferRow.createCell(j + 7);
                cell.setCellStyle(normalCellStyle);

                sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 15, noOfLineItem + 15, j + 6, j + 7));

                cell = validityOfOfferRow.createCell(j + 8);
                cell.setCellValue(supplierHeaderObj.getBuyerValidityofferRatedParameter());
                cell.setCellStyle(normalCellStyle);

                cell = validityOfOfferRow.createCell(j + 9);
                cell.setCellStyle(normalCellStyle);

                sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 15, noOfLineItem + 15, j + 8, j + 9));

                // Incoterm
                cell = incotermRow.createCell(j + 6);
                cell.setCellValue(supplierHeaderObj.getIncotermsRatedParameter());
                cell.setCellStyle(normalCellStyle);

                cell = incotermRow.createCell(j + 7);
                cell.setCellStyle(normalCellStyle);

                sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 16, noOfLineItem + 16, j + 6, j + 7));

                cell = incotermRow.createCell(j + 8);
                cell.setCellValue(supplierHeaderObj.getBuyerIncotermsRatedParameter());
                cell.setCellStyle(normalCellStyle);

                cell = incotermRow.createCell(j + 9);
                cell.setCellStyle(normalCellStyle);

                sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 16, noOfLineItem + 16, j + 8, j + 9));

                // Ranking of Tender
                cell = rankingOfTenderRow.createCell(j + 6);
                cell.setCellValue("1");
                cell.setCellStyle(normalCellStyle);

                cell = rankingOfTenderRow.createCell(j + 7);
                cell.setCellStyle(normalCellStyle);

                sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 17, noOfLineItem + 17, j + 6, j + 7));

                cell = rankingOfTenderRow.createCell(j + 8);
                cell.setCellValue("1");
                cell.setCellStyle(normalCellStyle);

                cell = rankingOfTenderRow.createCell(j + 9);
                cell.setCellStyle(normalCellStyle);

                sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 17, noOfLineItem + 17, j + 8, j + 9));

                // FSC COMPLIANCE
                cell = fscComplianceRow.createCell(j + 6);
                cell.setCellValue("FC");
                cell.setCellStyle(normalCellStyle);

                cell = fscComplianceRow.createCell(j + 7);
                cell.setCellStyle(normalCellStyle);

                sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 18, noOfLineItem + 18, j + 6, j + 7));

                cell = fscComplianceRow.createCell(j + 8);
                cell.setCellValue("FC");
                cell.setCellStyle(normalCellStyle);

                cell = fscComplianceRow.createCell(j + 9);
                cell.setCellStyle(normalCellStyle);

                sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 18, noOfLineItem + 18, j + 8, j + 9));

                index++;
            }
        }
        return workbook;
    }

    public Workbook generatePoSavingReportMaterial(Workbook workbook, Map<String, String> selectionParameterMap, List<PoSavingReportMaterialBean> poSavingReportMaterialBeanList) {
        Sheet sheet = workbook.createSheet("PO Saving Report Material");
        Cell cell;
        Row row;

        org.apache.poi.ss.usermodel.Font boldFont = workbook.createFont();
        boldFont.setBoldweight(org.apache.poi.ss.usermodel.Font.BOLDWEIGHT_BOLD);

        org.apache.poi.ss.usermodel.Font normalFont = workbook.createFont();

        CellStyle normalCellStyle = workbook.createCellStyle();
        normalCellStyle.setFont(normalFont);
        normalCellStyle.setAlignment(CellStyle.ALIGN_CENTER);
//        normalCellStyle.setBorderBottom(CellStyle.BORDER_MEDIUM);
//        normalCellStyle.setBorderTop(CellStyle.BORDER_MEDIUM);
//        normalCellStyle.setBorderLeft(CellStyle.BORDER_MEDIUM);
//        normalCellStyle.setBorderRight(CellStyle.BORDER_MEDIUM);

        row = sheet.createRow(0);
        cell = row.createCell(0);
        cell.setCellValue("PO Saving Report");
        cell.setCellStyle(normalCellStyle);
        for (int i = 1; i < 30; i++) {
            cell = row.createCell(i);
            cell.setCellStyle(normalCellStyle);
        }
        // CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
        sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 29));

        // Header Data
        row = sheet.createRow(2);
        cell = row.createCell(1);
        cell.setCellValue("Report Date: " + selectionParameterMap.get("reportDate"));

        row = sheet.createRow(3);
        cell = row.createCell(1);
        cell.setCellValue("PO Type: " + selectionParameterMap.get("poType"));

        row = sheet.createRow(4);
        cell = row.createCell(1);
        cell.setCellValue("Co-Code: " + selectionParameterMap.get("coCodeFrom") + (selectionParameterMap.get("coCodeTo").equals("") ? "" : " To " + selectionParameterMap.get("coCodeTo")));

        row = sheet.createRow(5);
        cell = row.createCell(1);
        cell.setCellValue("Plant: " + selectionParameterMap.get("plantFrom") + (selectionParameterMap.get("plantTo").equals("") ? "" : " To " + selectionParameterMap.get("plantTo")));

        row = sheet.createRow(6);
        cell = row.createCell(1);
        cell.setCellValue("Purchasing Group: " + selectionParameterMap.get("purchasingGroupFrom") + (selectionParameterMap.get("purchasingGroupTo").equals("") ? "" : " To " + selectionParameterMap.get("purchasingGroupTo")));

        row = sheet.createRow(7);
        cell = row.createCell(1);
        cell.setCellValue("Purchasing Org: " + selectionParameterMap.get("purchasingOrgFrom") + (selectionParameterMap.get("purchasingOrgTo").equals("") ? "" : " To " + selectionParameterMap.get("purchasingOrgTo")));

        row = sheet.createRow(8);
        cell = row.createCell(1);
        cell.setCellValue("Document Type: " + selectionParameterMap.get("docTypeFrom") + (selectionParameterMap.get("docTypeTo").equals("") ? "" : " To " + selectionParameterMap.get("docTypeTo")));

        row = sheet.createRow(9);
        cell = row.createCell(1);
        cell.setCellValue("Document Category: " + selectionParameterMap.get("docCatFrom"));

        row = sheet.createRow(10);
        cell = row.createCell(1);
        cell.setCellValue("Vendor: " + selectionParameterMap.get("vendorNameFrom") + (selectionParameterMap.get("vendorNameTo").equals("") ? "" : " To " + selectionParameterMap.get("vendorNameTo")));

        row = sheet.createRow(11);
        cell = row.createCell(1);
        cell.setCellValue("PO Number: " + selectionParameterMap.get("poNoFrom") + (selectionParameterMap.get("poNoTo").equals("") ? "" : " To " + selectionParameterMap.get("poNoTo")));

        row = sheet.createRow(12);
        cell = row.createCell(1);
        cell.setCellValue("GR Posting Date: " + selectionParameterMap.get("grPostingDateFrom") + (selectionParameterMap.get("grPostingDateTo").equals("") ? "" : " To " + selectionParameterMap.get("grPostingDateTo")));

        row = sheet.createRow(13);
        cell = row.createCell(1);
        cell.setCellValue("Note: " + "As the Company 0642 (NatSteel Trade Intl Pte Ltd) is a US dollar registered company, hence, the exchange rates for RFQ and PO are referenced to USD. This report has taken it into consideration and compute/convert the saving to SGD.");

        // Line Level Table Header
        row = sheet.createRow(15);

        cell = row.createCell(1);
        cell.setCellValue("CoCode");

        cell = row.createCell(2);
        cell.setCellValue("Plant");

        cell = row.createCell(3);
        cell.setCellValue("Purchasing Group");

        cell = row.createCell(4);
        cell.setCellValue("PO Vendor");

        cell = row.createCell(5);
        cell.setCellValue("Doc Type");

        cell = row.createCell(6);
        cell.setCellValue("Quot No.(PO)");

        cell = row.createCell(7);
        cell.setCellValue("Act.Assgn.Cat.");

        cell = row.createCell(8);
        cell.setCellValue("PO Number");

        cell = row.createCell(9);
        cell.setCellValue("PO Date");

        cell = row.createCell(10);
        cell.setCellValue("Item");

        cell = row.createCell(11);
        cell.setCellValue("Material");

        cell = row.createCell(12);
        cell.setCellValue("Material Type");

        cell = row.createCell(13);
        cell.setCellValue("External Material Group");

        cell = row.createCell(14);
        cell.setCellValue("Item Short Text");

        cell = row.createCell(15);
        cell.setCellValue("PO Qty");

        cell = row.createCell(16);
        cell.setCellValue("GR Qty");

        cell = row.createCell(17);
        cell.setCellValue("UOM");

        cell = row.createCell(18);
        cell.setCellValue("Lowest U/P RFQ No.");

        cell = row.createCell(19);
        cell.setCellValue("Lowest U/P RFQ Vendor");

        cell = row.createCell(20);
        cell.setCellValue("Lowest RFQ Currency");

        cell = row.createCell(21);
        cell.setCellValue("Lowest RFQ Unit Price");

        cell = row.createCell(22);
        cell.setCellValue("Lowest RFQ Unit Price S$");

        cell = row.createCell(23);
        cell.setCellValue("Lowest RFQ Price Unit");

        cell = row.createCell(24);
        cell.setCellValue("PO Currency");

        cell = row.createCell(25);
        cell.setCellValue("PO Unit Price");

        cell = row.createCell(26);
        cell.setCellValue("PO Unit Price S$");

        cell = row.createCell(27);
        cell.setCellValue("PO Price Unit");

        cell = row.createCell(28);
        cell.setCellValue("PO Exch. Rate");

        cell = row.createCell(29);
        cell.setCellValue("Saving(S$)");

        cell = row.createCell(30);
        cell.setCellValue("Saving %");

        // Line Level Table Body
        for (int i = 0; i < poSavingReportMaterialBeanList.size(); i++) {
            PoSavingReportMaterialBean materialBeanObj = poSavingReportMaterialBeanList.get(i);

            row = sheet.createRow(i + 17);

            cell = row.createCell(1);
            cell.setCellValue(materialBeanObj.getCompanyCode());

            cell = row.createCell(2);
            cell.setCellValue(materialBeanObj.getPlant());

            cell = row.createCell(3);
            cell.setCellValue(materialBeanObj.getPurchasingGroup());

            cell = row.createCell(4);
            cell.setCellValue(materialBeanObj.getVendorName() + " - " + materialBeanObj.getVendorCode());

            cell = row.createCell(5);
            cell.setCellValue(materialBeanObj.getDocType());

            cell = row.createCell(6);
            cell.setCellValue(materialBeanObj.getQuotationNo());

            cell = row.createCell(7);
            cell.setCellValue(materialBeanObj.getAccountAssignmentCategory());

            cell = row.createCell(8);
            cell.setCellValue(materialBeanObj.getPurchaseOrderNumber());

            cell = row.createCell(9);
            cell.setCellValue(materialBeanObj.getPoDate());

            cell = row.createCell(10);
            cell.setCellValue(materialBeanObj.getItemNumber());

            cell = row.createCell(11);
            cell.setCellValue(materialBeanObj.getMaterialCode());

            cell = row.createCell(12);
            cell.setCellValue(materialBeanObj.getMaterialType());

            cell = row.createCell(13);
            cell.setCellValue(materialBeanObj.getExternalMaterialGroup());

            cell = row.createCell(14);
            cell.setCellValue(materialBeanObj.getItemShortText());

            cell = row.createCell(15);
            cell.setCellValue(materialBeanObj.getPoQuantity());

            cell = row.createCell(16);
            cell.setCellValue("");

            cell = row.createCell(17);
            cell.setCellValue(materialBeanObj.getUom());

            cell = row.createCell(18);
            cell.setCellValue(materialBeanObj.getQuotationNo());

            cell = row.createCell(19);
            cell.setCellValue(materialBeanObj.getLowestRfqVendor());

            cell = row.createCell(20);
            cell.setCellValue(materialBeanObj.getLowestRfqCurrency());

            cell = row.createCell(21);
            cell.setCellValue(materialBeanObj.getLowestRfqUnitPrice());

            // Convert Unit Price in SGD
            String lowestRfqUnitPriceInSGD = "";
            if (materialBeanObj.getLowestRfqCurrency() != null && !materialBeanObj.getLowestRfqCurrency().equals("")) {
                String exchangeRate = purchaseOrderWSUtil.findExchangeRateByFromCurrencyAndToCurrencyAndExchangeRateType(materialBeanObj.getLowestRfqCurrency(), "SGD");
                System.out.println("exchangeRate: " + exchangeRate);
                if (materialBeanObj.getLowestRfqUnitPrice() != null && !materialBeanObj.getLowestRfqUnitPrice().equals("")
                        && exchangeRate != null && !exchangeRate.equals("")) {
                    double tempLowestRfqUnitPriceInSGD = Double.parseDouble(exchangeRate) * Double.parseDouble(materialBeanObj.getLowestRfqUnitPrice());
                    System.out.println("tempLowestRfqUnitPriceInSGD: " + tempLowestRfqUnitPriceInSGD);
                    lowestRfqUnitPriceInSGD = tempLowestRfqUnitPriceInSGD + "";
                }
            }
            cell = row.createCell(22);
            cell.setCellValue(lowestRfqUnitPriceInSGD);

            cell = row.createCell(23);
            cell.setCellValue(materialBeanObj.getLowestRfqUnitPrice());

            cell = row.createCell(24);
            cell.setCellValue(materialBeanObj.getPoCurrency());

            cell = row.createCell(25);
            cell.setCellValue(materialBeanObj.getPriceUnit());

            // Convert Unit Price in SGD
            String poUnitPriceInSGD = "";
            if (materialBeanObj.getPoCurrency() != null && !materialBeanObj.getPoCurrency().equals("")) {
                String exchangeRate = purchaseOrderWSUtil.findExchangeRateByFromCurrencyAndToCurrencyAndExchangeRateType(materialBeanObj.getPoCurrency(), "SGD");
                System.out.println("exchangeRate: " + exchangeRate);
                if (materialBeanObj.getPriceUnit() != null && !materialBeanObj.getPriceUnit().equals("")
                        && exchangeRate != null && !exchangeRate.equals("")) {
                    double tempPoUnitPriceInSGD = Double.parseDouble(exchangeRate) * Double.parseDouble(materialBeanObj.getPriceUnit());
                    System.out.println("tempPoUnitPriceInSGD: " + tempPoUnitPriceInSGD);
                    poUnitPriceInSGD = tempPoUnitPriceInSGD + "";
                }
            }
            cell = row.createCell(26);
            cell.setCellValue(poUnitPriceInSGD);

            cell = row.createCell(27);
            cell.setCellValue(materialBeanObj.getPriceUnit());

            cell = row.createCell(28);
            cell.setCellValue(materialBeanObj.getExchangeRate());

            String poQuanity = materialBeanObj.getPoQuantity();
            double savingInSGD = 0;
            double savingInPerc = 0;
            System.out.println("poQuanity: " + poQuanity);
            System.out.println("lowestRfqUnitPriceInSGD: " + lowestRfqUnitPriceInSGD);
            System.out.println("poUnitPriceInSGD: " + poUnitPriceInSGD);
            
            if (poQuanity != null && !poQuanity.equals("")
                    && lowestRfqUnitPriceInSGD != null && !lowestRfqUnitPriceInSGD.equals("")
                    && poUnitPriceInSGD != null && !poUnitPriceInSGD.equals("")) 
            {
                savingInSGD = (Double.parseDouble(poQuanity) * Double.parseDouble(lowestRfqUnitPriceInSGD)) - (Double.parseDouble(poQuanity) * Double.parseDouble(poUnitPriceInSGD));
                System.out.println("savingInSGD: " + savingInSGD);
                
                if(!lowestRfqUnitPriceInSGD.equals("0") && !lowestRfqUnitPriceInSGD.equals("0.0"))
                {
                    savingInPerc = savingInSGD / (Double.parseDouble(poQuanity) * Double.parseDouble(lowestRfqUnitPriceInSGD));
                    System.out.println("savingInPerc: " + savingInPerc);
                }
            }

            cell = row.createCell(29);
            cell.setCellValue(savingInSGD);

            cell = row.createCell(30);
            cell.setCellValue(savingInPerc);
        }

        return workbook;
    }

    public Workbook generatePoSavingReportService(Workbook workbook, Map<String, String> selectionParameterMap, List<PoSavingReportServiceBean> poSavingReportServiceBeanList) {
        Sheet sheet = workbook.createSheet("PO Saving Report Service");
        Cell cell;
        Row row;

        org.apache.poi.ss.usermodel.Font boldFont = workbook.createFont();
        boldFont.setBoldweight(org.apache.poi.ss.usermodel.Font.BOLDWEIGHT_BOLD);

        org.apache.poi.ss.usermodel.Font normalFont = workbook.createFont();

        CellStyle normalCellStyle = workbook.createCellStyle();
        normalCellStyle.setFont(normalFont);
        normalCellStyle.setAlignment(CellStyle.ALIGN_CENTER);
//        normalCellStyle.setBorderBottom(CellStyle.BORDER_MEDIUM);
//        normalCellStyle.setBorderTop(CellStyle.BORDER_MEDIUM);
//        normalCellStyle.setBorderLeft(CellStyle.BORDER_MEDIUM);
//        normalCellStyle.setBorderRight(CellStyle.BORDER_MEDIUM);

        row = sheet.createRow(0);
        cell = row.createCell(0);
        cell.setCellValue("PO Saving Report");
        cell.setCellStyle(normalCellStyle);
        for (int i = 1; i < 30; i++) {
            cell = row.createCell(i);
            cell.setCellStyle(normalCellStyle);
        }
        // CellRangeAddress(int firstRow, int lastRow, int firstCol, int lastCol)
        sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 29));

        // Header Data
        row = sheet.createRow(2);
        cell = row.createCell(1);
        cell.setCellValue("Report Date: " + selectionParameterMap.get("reportDate"));

        row = sheet.createRow(3);
        cell = row.createCell(1);
        cell.setCellValue("PO Type: " + selectionParameterMap.get("poType"));

        row = sheet.createRow(4);
        cell = row.createCell(1);
        cell.setCellValue("Co-Code: " + selectionParameterMap.get("coCodeFrom") + (selectionParameterMap.get("coCodeTo").equals("") ? "" : " To " + selectionParameterMap.get("coCodeTo")));

        row = sheet.createRow(5);
        cell = row.createCell(1);
        cell.setCellValue("Plant: " + selectionParameterMap.get("plantFrom") + (selectionParameterMap.get("plantTo").equals("") ? "" : " To " + selectionParameterMap.get("plantTo")));

        row = sheet.createRow(6);
        cell = row.createCell(1);
        cell.setCellValue("Purchasing Group: " + selectionParameterMap.get("purchasingGroupFrom") + (selectionParameterMap.get("purchasingGroupTo").equals("") ? "" : " To " + selectionParameterMap.get("purchasingGroupTo")));

        row = sheet.createRow(7);
        cell = row.createCell(1);
        cell.setCellValue("Purchasing Org: " + selectionParameterMap.get("purchasingOrgFrom") + (selectionParameterMap.get("purchasingOrgTo").equals("") ? "" : " To " + selectionParameterMap.get("purchasingOrgTo")));

        row = sheet.createRow(8);
        cell = row.createCell(1);
        cell.setCellValue("Document Type: " + selectionParameterMap.get("docTypeFrom") + (selectionParameterMap.get("docTypeTo").equals("") ? "" : " To " + selectionParameterMap.get("docTypeTo")));

        row = sheet.createRow(9);
        cell = row.createCell(1);
        cell.setCellValue("Document Category: " + selectionParameterMap.get("docCatFrom"));

        row = sheet.createRow(10);
        cell = row.createCell(1);
        cell.setCellValue("Vendor: " + selectionParameterMap.get("vendorNameFrom") + (selectionParameterMap.get("vendorNameTo").equals("") ? "" : " To " + selectionParameterMap.get("vendorNameTo")));

        row = sheet.createRow(11);
        cell = row.createCell(1);
        cell.setCellValue("PO Number: " + selectionParameterMap.get("poNoFrom") + (selectionParameterMap.get("poNoTo").equals("") ? "" : " To " + selectionParameterMap.get("poNoTo")));

        row = sheet.createRow(12);
        cell = row.createCell(1);
        cell.setCellValue("GR Posting Date: " + selectionParameterMap.get("grPostingDateFrom") + (selectionParameterMap.get("grPostingDateTo").equals("") ? "" : " To " + selectionParameterMap.get("grPostingDateTo")));

        row = sheet.createRow(13);
        cell = row.createCell(1);
        cell.setCellValue("Note: " + "As the Company 0642 (NatSteel Trade Intl Pte Ltd) is a US dollar registered company, hence, the exchange rates for RFQ and PO are referenced to USD. This report has taken it into consideration and compute/convert the saving to SGD.");

        // Line Level Table Header
        row = sheet.createRow(15);

        cell = row.createCell(1);
        cell.setCellValue("CoCode");

        cell = row.createCell(2);
        cell.setCellValue("Plant");

        cell = row.createCell(3);
        cell.setCellValue("Purchasing Group");

        cell = row.createCell(4);
        cell.setCellValue("PO Vendor");

        cell = row.createCell(5);
        cell.setCellValue("Doc Type");

        cell = row.createCell(6);
        cell.setCellValue("Quot No.(PO)");

        cell = row.createCell(7);
        cell.setCellValue("Act.Assgn.Cat.");

        cell = row.createCell(8);
        cell.setCellValue("PO Number");

        cell = row.createCell(9);
        cell.setCellValue("PO Date");

        cell = row.createCell(10);
        cell.setCellValue("Item");

        cell = row.createCell(11);
        cell.setCellValue("Item Short Text");

        cell = row.createCell(12);
        cell.setCellValue("PO line No.");

        cell = row.createCell(13);
        cell.setCellValue("Service Number");

        cell = row.createCell(14);
        cell.setCellValue("Service Short Text");

        cell = row.createCell(15);
        cell.setCellValue("PO Qty (line level)");

        cell = row.createCell(16);
        cell.setCellValue("SES Qty");

        cell = row.createCell(17);
        cell.setCellValue("UOM");

        cell = row.createCell(18);
        cell.setCellValue("Lowest U/P RFQ No.");

        cell = row.createCell(19);
        cell.setCellValue("Lowest U/P RFQ Vendor");

        cell = row.createCell(20);
        cell.setCellValue("Lowest RFQ Currency");

        cell = row.createCell(21);
        cell.setCellValue("Lowest RFQ Unit Price");

        cell = row.createCell(22);
        cell.setCellValue("Lowest RFQ Unit Price S$");

        cell = row.createCell(23);
        cell.setCellValue("Lowest RFQ Price Unit");

        cell = row.createCell(24);
        cell.setCellValue("PO Currency");

        cell = row.createCell(25);
        cell.setCellValue("PO Unit Price");

        cell = row.createCell(26);
        cell.setCellValue("PO Unit Price S$");

        cell = row.createCell(27);
        cell.setCellValue("PO Price Unit");

        cell = row.createCell(28);
        cell.setCellValue("PO Exch. Rate");

        cell = row.createCell(29);
        cell.setCellValue("Saving(S$)");

        cell = row.createCell(30);
        cell.setCellValue("Saving %");

        // Line Level Table Body
        for (int i = 0; i < poSavingReportServiceBeanList.size(); i++) {
            PoSavingReportServiceBean serviceBeanObj = poSavingReportServiceBeanList.get(i);

            row = sheet.createRow(i + 17);

            cell = row.createCell(1);
            cell.setCellValue(serviceBeanObj.getCompanyCode());

            cell = row.createCell(2);
            cell.setCellValue(serviceBeanObj.getPlant());

            cell = row.createCell(3);
            cell.setCellValue(serviceBeanObj.getPurchasingGroup());

            cell = row.createCell(4);
            cell.setCellValue(serviceBeanObj.getVendorName() + " - " + serviceBeanObj.getVendorCode());

            cell = row.createCell(5);
            cell.setCellValue(serviceBeanObj.getDocType());

            cell = row.createCell(6);
            cell.setCellValue(serviceBeanObj.getQuotationNo());

            cell = row.createCell(7);
            cell.setCellValue(serviceBeanObj.getAccountAssignmentCategory());

            cell = row.createCell(8);
            cell.setCellValue(serviceBeanObj.getPurchaseOrderNumber());

            cell = row.createCell(9);
            cell.setCellValue(serviceBeanObj.getPoDate());

            cell = row.createCell(10);
            cell.setCellValue(serviceBeanObj.getItemNumber());

            cell = row.createCell(11);
            cell.setCellValue(serviceBeanObj.getItemShortText());

            cell = row.createCell(12);
            cell.setCellValue(serviceBeanObj.getPoLineNo());

            cell = row.createCell(13);
            cell.setCellValue(serviceBeanObj.getServiceNumber());

            cell = row.createCell(14);
            cell.setCellValue(serviceBeanObj.getServiceShortText());

            cell = row.createCell(15);
            cell.setCellValue(serviceBeanObj.getPoQuantity());

            cell = row.createCell(16);
            cell.setCellValue("");

            cell = row.createCell(17);
            cell.setCellValue(serviceBeanObj.getUom());

            cell = row.createCell(18);
            cell.setCellValue(serviceBeanObj.getQuotationNo());

            cell = row.createCell(19);
            cell.setCellValue(serviceBeanObj.getLowestRfqVendor());

            cell = row.createCell(20);
            cell.setCellValue(serviceBeanObj.getLowestRfqCurrency());

            cell = row.createCell(21);
            cell.setCellValue(serviceBeanObj.getLowestRfqUnitPrice());

            // Convert Unit Price in SGD
            String lowestRfqUnitPriceInSGD = "";
            if (serviceBeanObj.getLowestRfqCurrency() != null && !serviceBeanObj.getLowestRfqCurrency().equals("")) {
                String exchangeRate = purchaseOrderWSUtil.findExchangeRateByFromCurrencyAndToCurrencyAndExchangeRateType(serviceBeanObj.getLowestRfqCurrency(), "SGD");
                System.out.println("exchangeRate: " + exchangeRate);
                if (serviceBeanObj.getLowestRfqUnitPrice() != null && !serviceBeanObj.getLowestRfqUnitPrice().equals("")
                        && exchangeRate != null && !exchangeRate.equals("")) {
                    double tempLowestRfqUnitPriceInSGD = Double.parseDouble(exchangeRate) * Double.parseDouble(serviceBeanObj.getLowestRfqUnitPrice());
                    System.out.println("tempLowestRfqUnitPriceInSGD: " + tempLowestRfqUnitPriceInSGD);
                    lowestRfqUnitPriceInSGD = tempLowestRfqUnitPriceInSGD + "";
                }
            }
            cell = row.createCell(22);
            cell.setCellValue(lowestRfqUnitPriceInSGD);

            cell = row.createCell(23);
            cell.setCellValue(serviceBeanObj.getLowestRfqUnitPrice());

            cell = row.createCell(24);
            cell.setCellValue(serviceBeanObj.getPoCurrency());

            cell = row.createCell(25);
            cell.setCellValue(serviceBeanObj.getPriceUnit());

            // Convert Unit Price in SGD
            String poUnitPriceInSGD = "";
            if (serviceBeanObj.getPoCurrency() != null && !serviceBeanObj.getPoCurrency().equals("")) {
                String exchangeRate = purchaseOrderWSUtil.findExchangeRateByFromCurrencyAndToCurrencyAndExchangeRateType(serviceBeanObj.getPoCurrency(), "SGD");
                System.out.println("exchangeRate: " + exchangeRate);
                if (serviceBeanObj.getPriceUnit() != null && !serviceBeanObj.getPriceUnit().equals("")
                        && exchangeRate != null && !exchangeRate.equals("")) {
                    double tempPoUnitPriceInSGD = Double.parseDouble(exchangeRate) * Double.parseDouble(serviceBeanObj.getPriceUnit());
                    System.out.println("tempPoUnitPriceInSGD: " + tempPoUnitPriceInSGD);
                    poUnitPriceInSGD = tempPoUnitPriceInSGD + "";
                }
            }
            cell = row.createCell(26);
            cell.setCellValue(poUnitPriceInSGD);

            cell = row.createCell(27);
            cell.setCellValue(serviceBeanObj.getPriceUnit());

            cell = row.createCell(28);
            cell.setCellValue(serviceBeanObj.getExchangeRate());
            
            String poQuanity = serviceBeanObj.getPoQuantity();
            double savingInSGD = 0.0;
            double savingInPerc = 0.0;
            System.out.println("poQuanity: " + poQuanity);
            System.out.println("lowestRfqUnitPriceInSGD: " + lowestRfqUnitPriceInSGD);
            System.out.println("poUnitPriceInSGD: " + poUnitPriceInSGD);
            
            if (poQuanity != null && !poQuanity.equals("")
                    && lowestRfqUnitPriceInSGD != null && !lowestRfqUnitPriceInSGD.equals("")
                    && poUnitPriceInSGD != null && !poUnitPriceInSGD.equals("")) 
            {
                savingInSGD = (Double.parseDouble(poQuanity) * Double.parseDouble(lowestRfqUnitPriceInSGD)) - (Double.parseDouble(poQuanity) * Double.parseDouble(poUnitPriceInSGD));
                System.out.println("savingInSGD: " + savingInSGD);
                
                if(!lowestRfqUnitPriceInSGD.equals("0") && !lowestRfqUnitPriceInSGD.equals("0.0"))
                {
                    savingInPerc = savingInSGD / (Double.parseDouble(poQuanity) * Double.parseDouble(lowestRfqUnitPriceInSGD));
                    System.out.println("savingInPerc: " + savingInPerc);
                }
            }
            
            cell = row.createCell(29);
            cell.setCellValue(savingInSGD);

            cell = row.createCell(30);
            cell.setCellValue(savingInPerc);
        }

        return workbook;
    }
}
