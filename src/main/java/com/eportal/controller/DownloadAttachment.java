/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.controller;

import com.eportal.document.Generator;
import com.eportal.dto.RfqResportData;
import com.eportal.entities.BuyerContractRfqLineItemBean;
import com.eportal.entities.BuyerRfqLineItemBean;
import com.eportal.entities.BuyerVendorNotification;
import com.eportal.entities.ContractAttachmentTemp;
import com.eportal.entities.ContractRfqHeader;
import com.eportal.entities.ContractRfqHeaderVendorMapping;
import com.eportal.entities.ContractVendorRfqHeader;
import com.eportal.entities.PoSavingReportMaterialBean;
import com.eportal.entities.PoSavingReportServiceBean;
import com.eportal.entities.RatedParameters;
import com.eportal.entities.RfqHeaderVendorMapping;
import com.eportal.entities.SupplierHeader;
import com.eportal.entities.SupplierLineitem;
import com.eportal.entities.VendorDetails;
import com.eportal.entities.VendorRfqLineItemBean;
import com.eportal.entities.WorkOrderAttachmentTemp;
import com.eportal.entities.WorkOrderRfqHeader;
import com.eportal.entities.WorkOrderRfqLineItem;
import com.itextpdf.text.BadElementException;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.eportal.itextPdf.MyFooter;
import com.eportal.itextPdf.OrderEvaluationFooter;
import com.eportal.webservice.util.PurchaseOrderWS;
import com.eportal.webservice.util.RfqRfpWS;
import com.itextpdf.text.pdf.draw.LineSeparator;
import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author admin
 */
@Controller
public class DownloadAttachment {

    @Value("${webservice.ip}")
    private String webservice_ip;
    @Value("${BuyerPortalWar.ip}")
    private String BuyerPortalWar_ip;
    @Autowired
    RfqRfpWS rfqRfpWsUtil;
    @Autowired
    Generator generator;
    @Autowired
    PurchaseOrderWS purchaseOrderWS;

    @RequestMapping(value = "downloadworkorderlineitemattachment")
    public ModelAndView downloadWorkOrderLineItemAttachment(@RequestParam("rfqlineid") int rfqlineid, @RequestParam("attachmentno") String attachmentno, HttpServletResponse response) {

        System.out.println("rfqlineid: " + rfqlineid);
        System.out.println("attachmentno: " + attachmentno);

        WorkOrderRfqLineItem att = findWorkOrderLineItemByRfqLineId(rfqlineid);

        String fileName = "";
        byte[] fileBytes = null;

        if (attachmentno.equalsIgnoreCase("att1")) {
            fileName = att.getAttachment1name();
            fileBytes = att.getAttachment1();
        } else if (attachmentno.equalsIgnoreCase("att2")) {
            fileName = att.getAttachment2name();
            fileBytes = att.getAttachment2();
        } else if (attachmentno.equalsIgnoreCase("att3")) {
            fileName = att.getAttachment3name();
            fileBytes = att.getAttachment3();
        } else if (attachmentno.equalsIgnoreCase("att4")) {
            fileName = att.getAttachment4name();
            fileBytes = att.getAttachment4();
        } else if (attachmentno.equalsIgnoreCase("att5")) {
            fileName = att.getAttachment5name();
            fileBytes = att.getAttachment5();
        }
        System.out.println("file name: " + fileName);

        String fileType = fileName.substring(fileName.indexOf(".") + 1, fileName.length());
        System.out.println("File Type is: " + fileType);

        if (fileType.trim().equalsIgnoreCase("txt")) {
            response.setContentType("text/plain");
        } else if (fileType.trim().equalsIgnoreCase("doc")) {
            response.setContentType("application/msword");
        } else if (fileType.trim().equalsIgnoreCase("xls")) {
            response.setContentType("application/vnd.ms-excel");
        } else if (fileType.trim().equalsIgnoreCase("pdf")) {
            response.setContentType("application/pdf");
        } else if (fileType.trim().equalsIgnoreCase("ppt")) {
            response.setContentType("application/ppt");
        } else {
            response.setContentType("application/octet-stream");
        }

        /*specify content length in the http header if file is lager than 10MB otherwise browser will behave strange*/
        response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
        response.setHeader("cache-control", "no-cache");
        response.setHeader("cache-control", "must-revalidate");

        try (ServletOutputStream out = response.getOutputStream()) {
            out.write(fileBytes);
            out.flush();
        } catch (IOException ex) {
            Logger.getLogger(DownloadAttachment.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    @RequestMapping(value = "downloadqueryattachment")
    public ModelAndView downloadQueryAttachment(@RequestParam("attid") int attid, HttpServletResponse response) {

        System.out.println("attid: " + attid);

        BuyerVendorNotification att = findBuyerVendorNotificationById(attid);

        String fileName = "";
        byte[] fileBytes = null;

        fileName = att.getAttachmentname();
        fileBytes = att.getAttachment();

        System.out.println("file name: " + fileName);

        String fileType = fileName.substring(fileName.indexOf(".") + 1, fileName.length());
        System.out.println("File Type is: " + fileType);

        if (fileType.trim().equalsIgnoreCase("txt")) {
            response.setContentType("text/plain");
        } else if (fileType.trim().equalsIgnoreCase("doc")) {
            response.setContentType("application/msword");
        } else if (fileType.trim().equalsIgnoreCase("xls")) {
            response.setContentType("application/vnd.ms-excel");
        } else if (fileType.trim().equalsIgnoreCase("pdf")) {
            response.setContentType("application/pdf");
        } else if (fileType.trim().equalsIgnoreCase("ppt")) {
            response.setContentType("application/ppt");
        } else {
            response.setContentType("application/octet-stream");
        }

        /*specify content length in the http header if file is lager than 10MB otherwise browser will behave strange*/
        response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
        response.setHeader("cache-control", "no-cache");
        response.setHeader("cache-control", "must-revalidate");

        try (ServletOutputStream out = response.getOutputStream()) {
            out.write(fileBytes);
            out.flush();
        } catch (IOException ex) {
            Logger.getLogger(DownloadAttachment.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    @RequestMapping(value = "downloadsupplierlineitemattachment")
    public ModelAndView downloadSupplierLineItemAttachment(@RequestParam("supplierlineid") int supplierlineid, @RequestParam("attachmentno") String attachmentno, HttpServletResponse response) {

        System.out.println("supplierlineid: " + supplierlineid);
        System.out.println("attachmentno: " + attachmentno);

        SupplierLineitem att = findSupplierLineItemBySupplierLineId(supplierlineid);
        String fileName = "";
        byte[] fileBytes = null;

        if (attachmentno.equalsIgnoreCase("att1")) {
            fileName = att.getAttachment1name();
            fileBytes = att.getAttachment1();
        } else if (attachmentno.equalsIgnoreCase("att2")) {
            fileName = att.getAttachment2name();
            fileBytes = att.getAttachment2();
        } else if (attachmentno.equalsIgnoreCase("att3")) {
            fileName = att.getAttachment3name();
            fileBytes = att.getAttachment3();
        } else if (attachmentno.equalsIgnoreCase("att4")) {
            fileName = att.getAttachment4name();
            fileBytes = att.getAttachment4();
        } else if (attachmentno.equalsIgnoreCase("att5")) {
            fileName = att.getAttachment5name();
            fileBytes = att.getAttachment5();
        }
        System.out.println("file name: " + fileName);
        String fileType = fileName.substring(fileName.indexOf(".") + 1, fileName.length());
        System.out.println("File Type is: " + fileType);

        if (fileType.trim().equalsIgnoreCase("txt")) {
            response.setContentType("text/plain");
        } else if (fileType.trim().equalsIgnoreCase("doc")) {
            response.setContentType("application/msword");
        } else if (fileType.trim().equalsIgnoreCase("xls")) {
            response.setContentType("application/vnd.ms-excel");
        } else if (fileType.trim().equalsIgnoreCase("pdf")) {
            response.setContentType("application/pdf");
        } else if (fileType.trim().equalsIgnoreCase("ppt")) {
            response.setContentType("application/ppt");
        } else {
            response.setContentType("application/octet-stream");
        }
        response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
        response.setHeader("cache-control", "no-cache");
        response.setHeader("cache-control", "must-revalidate");

        try (ServletOutputStream out = response.getOutputStream()) {
            out.write(fileBytes);
            out.flush();
        } catch (IOException ex) {
            Logger.getLogger(DownloadAttachment.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    @RequestMapping(value = "downloadDocFromWorkOrderAttTemp")
    public ModelAndView downloadDocFromWorkOrderAttTemp(@RequestParam("attid") int attid, @RequestParam("attachmentno") String attachmentno, HttpServletResponse response) {

        System.out.println("attid: " + attid);
        System.out.println("attachmentno: " + attachmentno);

        WorkOrderAttachmentTemp att = findPrLineItemTempAttachmentById(attid);
        String fileName = "";
        byte[] fileBytes = null;

        if (attachmentno.equalsIgnoreCase("att1")) {
            fileName = att.getAttachment1name();
            fileBytes = att.getAttachment1();
        } else if (attachmentno.equalsIgnoreCase("att2")) {
            fileName = att.getAttachment2name();
            fileBytes = att.getAttachment2();
        } else if (attachmentno.equalsIgnoreCase("att3")) {
            fileName = att.getAttachment3name();
            fileBytes = att.getAttachment3();
        } else if (attachmentno.equalsIgnoreCase("att4")) {
            fileName = att.getAttachment4name();
            fileBytes = att.getAttachment4();
        } else if (attachmentno.equalsIgnoreCase("att5")) {
            fileName = att.getAttachment5name();
            fileBytes = att.getAttachment5();
        }
        System.out.println("file name: " + fileName);
        String fileType = fileName.substring(fileName.indexOf(".") + 1, fileName.length());
        System.out.println("File Type is: " + fileType);

        if (fileType.trim().equalsIgnoreCase("txt")) {
            response.setContentType("text/plain");
        } else if (fileType.trim().equalsIgnoreCase("doc")) {
            response.setContentType("application/msword");
        } else if (fileType.trim().equalsIgnoreCase("xls")) {
            response.setContentType("application/vnd.ms-excel");
        } else if (fileType.trim().equalsIgnoreCase("pdf")) {
            response.setContentType("application/pdf");
        } else if (fileType.trim().equalsIgnoreCase("ppt")) {
            response.setContentType("application/ppt");
        } else {
            response.setContentType("application/octet-stream");
        }
        response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
        response.setHeader("cache-control", "no-cache");
        response.setHeader("cache-control", "must-revalidate");

        try (ServletOutputStream out = response.getOutputStream()) {
            out.write(fileBytes);
            out.flush();
        } catch (IOException ex) {
            Logger.getLogger(DownloadAttachment.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    @RequestMapping(value = "downloadDocFromContractAttTemp")
    public ModelAndView downloadDocFromContractAttTemp(@RequestParam("attid") int attid, @RequestParam("attachmentno") String attachmentno, HttpServletResponse response) {

        System.out.println("attid: " + attid);
        System.out.println("attachmentno: " + attachmentno);

        ContractAttachmentTemp att = findContractLineItemTempAttachmentById(attid);
        String fileName = "";
        byte[] fileBytes = null;

        if (attachmentno.equalsIgnoreCase("att1")) {
            fileName = att.getAttachment1name();
            fileBytes = att.getAttachment1();
        } else if (attachmentno.equalsIgnoreCase("att2")) {
            fileName = att.getAttachment2name();
            fileBytes = att.getAttachment2();
        } else if (attachmentno.equalsIgnoreCase("att3")) {
            fileName = att.getAttachment3name();
            fileBytes = att.getAttachment3();
        } else if (attachmentno.equalsIgnoreCase("att4")) {
            fileName = att.getAttachment4name();
            fileBytes = att.getAttachment4();
        } else if (attachmentno.equalsIgnoreCase("att5")) {
            fileName = att.getAttachment5name();
            fileBytes = att.getAttachment5();
        }
        System.out.println("file name: " + fileName);
        String fileType = fileName.substring(fileName.indexOf(".") + 1, fileName.length());
        System.out.println("File Type is: " + fileType);

        if (fileType.trim().equalsIgnoreCase("txt")) {
            response.setContentType("text/plain");
        } else if (fileType.trim().equalsIgnoreCase("doc")) {
            response.setContentType("application/msword");
        } else if (fileType.trim().equalsIgnoreCase("xls")) {
            response.setContentType("application/vnd.ms-excel");
        } else if (fileType.trim().equalsIgnoreCase("pdf")) {
            response.setContentType("application/pdf");
        } else if (fileType.trim().equalsIgnoreCase("ppt")) {
            response.setContentType("application/ppt");
        } else {
            response.setContentType("application/octet-stream");
        }
        response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
        response.setHeader("cache-control", "no-cache");
        response.setHeader("cache-control", "must-revalidate");

        try (ServletOutputStream out = response.getOutputStream()) {
            out.write(fileBytes);
            out.flush();
        } catch (IOException ex) {
            Logger.getLogger(DownloadAttachment.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    WorkOrderRfqLineItem findWorkOrderLineItemByRfqLineId(int rfqlineid) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findworkorderlineitembyrfqlineid.do?rfqlineid=" + rfqlineid;
        System.out.println("url: " + url);

        ResponseEntity<WorkOrderRfqLineItem> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<WorkOrderRfqLineItem>() {
        });
        WorkOrderRfqLineItem rfqLineItemObj = response.getBody();

        return rfqLineItemObj;
    }

    BuyerVendorNotification findBuyerVendorNotificationById(int attid) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findbuyervendornotificationbyid.do?attid=" + attid;
        System.out.println("url: " + url);

        ResponseEntity<BuyerVendorNotification> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<BuyerVendorNotification>() {
        });

        BuyerVendorNotification notification = response.getBody();

        return notification;
    }

    SupplierLineitem findSupplierLineItemBySupplierLineId(int supplierlineid) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findsupplierlineitembyrfqlineid.do?supplierlineid=" + supplierlineid;
        System.out.println("url: " + url);

        ResponseEntity<SupplierLineitem> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<SupplierLineitem>() {
        });
        SupplierLineitem supplierLineItemObj = response.getBody();

        return supplierLineItemObj;
    }

    @RequestMapping(value = "downloadrfq")
    public ModelAndView downloadPdfPdf(@RequestParam("rfqid") int rfqid, HttpServletRequest request, HttpServletResponse response) throws Exception {
        WorkOrderRfqHeader rfqHeaderObj = findRfqHeaderById(rfqid);

//        List<WorkOrderRfqLineItem> items = finWorkOrderRfqLineItem(rfqid);
        List<BuyerRfqLineItemBean> items = callBuyerRfqPrLineItemStoredProcedure(rfqid);

        String path = request.getRequestURL().toString();
        List<RfqResportData> list = new ArrayList<>();

        response.setContentType("application/x-download");
        Map<String, Object> params = new HashMap<>();
        response.setHeader("Content-Disposition", "attachment; filename=\"" + rfqHeaderObj.getRfqNumber() + ".pdf\"");
        params.put("rfqNumber", rfqHeaderObj.getRfqNumber());
        params.put("to", rfqHeaderObj.getAssignedTo());
        params.put("from", rfqHeaderObj.getContactpersonetelno());
        params.put("logo", path.substring(0, path.indexOf("downloadrfq.do")) + "assets/images/NatSteel-logo.jpg");
        //params.put("atten", rfqHeaderObj.getNgBpBuyerdetailsId().);
        params.put("tel", rfqHeaderObj.getContactpersonetelno());
        params.put("creationDate", rfqHeaderObj.getCreationdate());
        params.put("gstNumber", "GST101");
        params.put("currency", "Rupee");
        params.put("deliveryTerms", "Delivery tems");
        params.put("paymentTerms", "Payment terms");
        params.put("validityOffer", "GST101");
        params.put("quotationDileveryDate", new Date());

        if (!CollectionUtils.isEmpty(items)) {
            for (BuyerRfqLineItemBean it : items) {

                RfqResportData data = new RfqResportData();
                data.setQuantity(0);
                data.setRfqid(rfqid);

//                PRDetails pd = it.getNgBpPrDetailsId();
//                if (pd != null) {
                data.setPlant(it.getPlantName());
                data.setUp("");
                data.setUwt("");
                data.setUom(it.getUnit());
                data.setLeadTime("10");
                data.setDescription("description");
//                }

                list.add(data);
            }

        } else {
            RfqResportData data = new RfqResportData();
            list.add(data);
        }

        OutputStream out = response.getOutputStream();
        try {
            InputStream is = this.getClass().getResourceAsStream("/reports/requestforquot.jasper");
            JasperPrint jasperPrint = JasperFillManager.fillReport(is, params, new JRBeanCollectionDataSource(list));
            jasperPrint.removePage(1);
            JasperExportManager.exportReportToPdfStream(jasperPrint, out);

        } catch (JRException ex) {
            Logger.getLogger(DownloadAttachment.class.getName()).log(Level.SEVERE, null, ex);
        }

        return null;
    }

    List<WorkOrderRfqLineItem> finWorkOrderRfqLineItem(int rfqid) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findworkorderlineitembyrfqid.do?rfqid=" + rfqid;
        System.out.println("url: " + url);

        ResponseEntity<List<WorkOrderRfqLineItem>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<WorkOrderRfqLineItem>>() {
        });
        List<WorkOrderRfqLineItem> list = response.getBody();

        return list;
    }

    WorkOrderRfqHeader findRfqHeaderById(int rfqid) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findrfqheaderbyid.do?rfqid=" + rfqid;
        System.out.println("url: " + url);

        ResponseEntity<WorkOrderRfqHeader> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<WorkOrderRfqHeader>() {
        });
        WorkOrderRfqHeader rfqHeaderObj = prResponse.getBody();
        System.out.println("rfqHeaderObj in download :" + rfqHeaderObj);

        return rfqHeaderObj;
    }

    List<BuyerRfqLineItemBean> callBuyerRfqPrLineItemStoredProcedure(int rfqid) {
        String url = webservice_ip + "/BuyerPortalWebServices/callBuyerRfqPrLineItemStoredProcedure.do?rfqid=" + rfqid;
        System.out.println("url: " + url);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<BuyerRfqLineItemBean>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<BuyerRfqLineItemBean>>() {
        });
        List<BuyerRfqLineItemBean> list = response.getBody();
        System.out.println("callBuyerRfqPrLineItemStoredProcedure list size: " + list.size());
        return list;
    }

    WorkOrderAttachmentTemp findPrLineItemTempAttachmentById(int attid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findprlineitemtempattachmentbyid.do?attid=" + attid;
        System.out.println("url: " + url);
        ResponseEntity<WorkOrderAttachmentTemp> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<WorkOrderAttachmentTemp>() {
        });
        WorkOrderAttachmentTemp rfqHeaderObj = prResponse.getBody();
        return rfqHeaderObj;
    }

    ContractAttachmentTemp findContractLineItemTempAttachmentById(int attid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findContractLineItemTempAttachmentById.do?attid=" + attid;
        System.out.println("url: " + url);
        ResponseEntity<ContractAttachmentTemp> contractResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<ContractAttachmentTemp>() {
        });
        ContractAttachmentTemp rfqHeaderObj = contractResponse.getBody();
        return rfqHeaderObj;
    }

    @RequestMapping(value = "downloadrfqformat")
    public ModelAndView downloadRfqFormatPdf(@RequestParam("rfqid") int rfqid, @RequestParam("vendorid") int vendorid, HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        try (ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream()) {

            System.out.println("rfqid: " + rfqid);
            System.out.println("vendorid: " + vendorid);

            WorkOrderRfqHeader rfqHeaderObj = findRfqHeaderById(rfqid);
            VendorDetails vendorObj = findVendorById(vendorid);
            List<BuyerRfqLineItemBean> buyerRfqLineItemBeanList = callBuyerRfqPrLineItemStoredProcedure(rfqid);
            System.out.println("buyerRfqLineItemBeanList: " + buyerRfqLineItemBeanList.size());

            String fileName = rfqHeaderObj.getRfqNumber() + ".pdf";
            byte[] fileBytes;

            // TODO code application logic here
            Document document = new Document();
//            PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream("D:/itext/RFQ.pdf"));
            PdfWriter writer = PdfWriter.getInstance(document, byteArrayOutputStream);
            writer.setPageEvent(new MyFooter());
            document.open();
            makeRfqFormat(document, request, rfqHeaderObj, vendorObj, buyerRfqLineItemBeanList);
            document.close();

            fileBytes = byteArrayOutputStream.toByteArray();
            System.out.println("fileBytes len: " + fileBytes.length);

            response.setContentType("application/pdf");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
            response.setHeader("cache-control", "no-cache");
            response.setHeader("cache-control", "must-revalidate");

            try (ServletOutputStream out = response.getOutputStream()) {
                out.write(fileBytes);
                out.flush();
            } catch (IOException ex) {
                Logger.getLogger(DownloadAttachment.class.getName()).log(Level.SEVERE, null, ex);
            }
//            out.write(fileBytes);
//            out.flush();

        } catch (DocumentException | FileNotFoundException ex) {
            Logger.getLogger(DownloadAttachment.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(DownloadAttachment.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    @RequestMapping(value = "downloadVendorComparisionPdfReport")
    public ModelAndView downloadVendorComparisionPdfReport(@RequestParam("rfqid") int rfqid, HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        try (ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream()) {

            System.out.println("rfqid: " + rfqid);
            WorkOrderRfqHeader rfqHeaderObj = findRfqHeaderById(rfqid);
            List<RfqHeaderVendorMapping> rfqVendorMappingList = findVendorByRfqId(rfqid);

            String fileName = rfqHeaderObj.getRfqNumber() + ".pdf";
            byte[] fileBytes;

            // TODO code application logic here
            Document document = new Document();
            PdfWriter writer = PdfWriter.getInstance(document, byteArrayOutputStream);
            writer.setPageEvent(new OrderEvaluationFooter());
            document.open();
            makeVenoroComparisionReport(document, rfqVendorMappingList);
            document.close();

            fileBytes = byteArrayOutputStream.toByteArray();
            System.out.println("fileBytes len: " + fileBytes.length);

            response.setContentType("application/pdf");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
            response.setHeader("cache-control", "no-cache");
            response.setHeader("cache-control", "must-revalidate");

            try (ServletOutputStream out = response.getOutputStream()) {
                out.write(fileBytes);
                out.flush();
            } catch (IOException ex) {
                Logger.getLogger(DownloadAttachment.class.getName()).log(Level.SEVERE, null, ex);
            }
//            out.write(fileBytes);
//            out.flush();

        } catch (DocumentException | FileNotFoundException ex) {
            Logger.getLogger(DownloadAttachment.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(DownloadAttachment.class.getName()).log(Level.SEVERE, null, ex);
        }

        return null;
    }

    @RequestMapping(value = "downloadVendorComparisionExcelReport")
    public ModelAndView downloadVendorComparisionExcelReport(@RequestParam("rfqid") int rfqid, HttpServletRequest request, HttpServletResponse response) throws Exception {

        try (ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream()) {
            System.out.println("rfqid: " + rfqid);

            WorkOrderRfqHeader rfqHeaderObj = findRfqHeaderById(rfqid);

            List<RfqHeaderVendorMapping> rfqVendorMappingList = findVendorByRfqId(rfqid);
            List<BuyerRfqLineItemBean> buyerRfqLineItemBeanList = callBuyerRfqPrLineItemStoredProcedure(rfqid);
            String fileName = rfqHeaderObj.getRfqNumber() + ".xls";
            byte[] fileBytes;
            Workbook workbook = new HSSFWorkbook();
            workbook = createVendorComparisionExcelReport(workbook, rfqVendorMappingList, buyerRfqLineItemBeanList);
            workbook.write(byteArrayOutputStream);
            fileBytes = byteArrayOutputStream.toByteArray();
            System.out.println("fileBytes len: " + fileBytes.length);

            response.setContentType("application/vnd.ms-excel");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
            response.setHeader("cache-control", "no-cache");
            response.setHeader("cache-control", "must-revalidate");

            try (ServletOutputStream out = response.getOutputStream()) {
                out.write(fileBytes);
                out.flush();
            } catch (IOException ex) {
                Logger.getLogger(DownloadAttachment.class.getName()).log(Level.SEVERE, null, ex);
            }
//            out.write(fileBytes);
//            out.flush();

        } catch (FileNotFoundException ex) {
            Logger.getLogger(DownloadAttachment.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(DownloadAttachment.class.getName()).log(Level.SEVERE, null, ex);
        }

        return null;
    }

    @RequestMapping(value = "downloadContractVendorComparisionPdfReport")
    public ModelAndView downloadContractVendorComparisionPdfReport(@RequestParam("rfqid") int rfqid, HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        try (ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream()) {

            System.out.println("rfqid: " + rfqid);
            ContractRfqHeader rfqHeaderObj = findContractRfqHeaderById(rfqid);
            List<ContractRfqHeaderVendorMapping> rfqVendorMappingList = findContractRfqHeaderVendorMappingByRfqId(rfqid);

            String fileName = rfqHeaderObj.getRfqNumber() + ".pdf";
            byte[] fileBytes;

            // TODO code application logic here
            Document document = new Document();
            PdfWriter writer = PdfWriter.getInstance(document, byteArrayOutputStream);
            writer.setPageEvent(new OrderEvaluationFooter());
            document.open();
            makeContractVenoroComparisionReport(document, rfqVendorMappingList);
            document.close();

            fileBytes = byteArrayOutputStream.toByteArray();
            System.out.println("fileBytes len: " + fileBytes.length);

            response.setContentType("application/pdf");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
            response.setHeader("cache-control", "no-cache");
            response.setHeader("cache-control", "must-revalidate");

            try (ServletOutputStream out = response.getOutputStream()) {
                out.write(fileBytes);
                out.flush();
            } catch (IOException ex) {
                Logger.getLogger(DownloadAttachment.class.getName()).log(Level.SEVERE, null, ex);
            }
//            out.write(fileBytes);
//            out.flush();

        } catch (DocumentException | FileNotFoundException ex) {
            Logger.getLogger(DownloadAttachment.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(DownloadAttachment.class.getName()).log(Level.SEVERE, null, ex);
        }

        return null;
    }

    @RequestMapping(value = "downloadContractVendorComparisionExcelReport")
    public ModelAndView downloadContractVendorComparisionExcelReport(@RequestParam("rfqid") int rfqid, HttpServletRequest request, HttpServletResponse response) throws Exception {

        try (ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream()) {
            System.out.println("rfqid: " + rfqid);

            ContractRfqHeader rfqHeaderObj = findContractRfqHeaderById(rfqid);
            List<ContractRfqHeaderVendorMapping> rfqVendorMappingList = findContractRfqHeaderVendorMappingByRfqId(rfqid);
            List<BuyerContractRfqLineItemBean> buyerRfqLineItemBeanList = callBuyerRfqContractLineItemStoredProcedure(rfqid);

            String fileName = rfqHeaderObj.getRfqNumber() + ".xls";
            byte[] fileBytes;
            Workbook workbook = new HSSFWorkbook();
            workbook = createContractVendorComparisionExcelReport(workbook, rfqVendorMappingList, buyerRfqLineItemBeanList);
            workbook.write(byteArrayOutputStream);
            fileBytes = byteArrayOutputStream.toByteArray();
            System.out.println("fileBytes len: " + fileBytes.length);

            response.setContentType("application/vnd.ms-excel");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
            response.setHeader("cache-control", "no-cache");
            response.setHeader("cache-control", "must-revalidate");

            try (ServletOutputStream out = response.getOutputStream()) {
                out.write(fileBytes);
                out.flush();
            } catch (IOException ex) {
                Logger.getLogger(DownloadAttachment.class.getName()).log(Level.SEVERE, null, ex);
            }
            //     out.write(fileBytes);
            //    out.flush();

        } catch (FileNotFoundException ex) {
            Logger.getLogger(DownloadAttachment.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(DownloadAttachment.class.getName()).log(Level.SEVERE, null, ex);
        }

        return null;
    }

    @RequestMapping(value = "downloadRfqEvalCompExlReport")
    public ModelAndView downloadRfqEvalCompExlReport(@RequestParam("rfqIds") String rfqIds, HttpServletRequest request, HttpServletResponse response) throws Exception {

        try (ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream()) {
            System.out.println("rfqIds: " + rfqIds);

            List<WorkOrderRfqHeader> rfqHeaderList = rfqRfpWsUtil.findRfqHeaderByRfqIdIn(rfqIds);
            List<WorkOrderRfqLineItem> rfqLineItemList = rfqRfpWsUtil.findWorkOrderRfqLineItemByRfqIdIn(rfqIds);
            List<SupplierHeader> supplierHeaderList = rfqRfpWsUtil.findSupplierHeaderByRfqIdInAndStatusIn(rfqIds);

            String fileName = "Summary of Quotation.xls";
            byte[] fileBytes;
            Workbook workbook = new HSSFWorkbook();
            workbook = generator.createRfqEvalCompExcelReport(workbook, rfqHeaderList, rfqLineItemList, supplierHeaderList);
            workbook.write(byteArrayOutputStream);
            fileBytes = byteArrayOutputStream.toByteArray();
            System.out.println("fileBytes len: " + fileBytes.length);

            response.setContentType("application/vnd.ms-excel");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
            response.setHeader("cache-control", "no-cache");
            response.setHeader("cache-control", "must-revalidate");

            try (ServletOutputStream out = response.getOutputStream()) {
                out.write(fileBytes);
                out.flush();
            } catch (IOException ex) {
                Logger.getLogger(DownloadAttachment.class.getName()).log(Level.SEVERE, null, ex);
            }
        } catch (FileNotFoundException ex) {
            Logger.getLogger(DownloadAttachment.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(DownloadAttachment.class.getName()).log(Level.SEVERE, null, ex);
        }

        return null;
    }

    @RequestMapping(value = "downloadRfqEvalVendorCompPdfReport")
    public ModelAndView downloadRfqEvalVendorCompPdfReport(@RequestParam("rfqIds") String rfqIds, HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        try (ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream()) {
            System.out.println("rfqIds: " + rfqIds);

            String fileName = "Vendor Selection Criteria.pdf";
            byte[] fileBytes;

            Document document = new Document();
            PdfWriter writer = PdfWriter.getInstance(document, byteArrayOutputStream);
            writer.setPageEvent(new OrderEvaluationFooter());
            document.open();
            generator.makeRfqEvalVenoroCompReport(document, rfqIds);
            document.close();

            fileBytes = byteArrayOutputStream.toByteArray();
            System.out.println("fileBytes len: " + fileBytes.length);

            response.setContentType("application/pdf");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
            response.setHeader("cache-control", "no-cache");
            response.setHeader("cache-control", "must-revalidate");

            try (ServletOutputStream out = response.getOutputStream()) {
                out.write(fileBytes);
                out.flush();
            } catch (IOException ex) {
                Logger.getLogger(DownloadAttachment.class.getName()).log(Level.SEVERE, null, ex);
            }
//            out.write(fileBytes);
//            out.flush();

        } catch (DocumentException | FileNotFoundException ex) {
            Logger.getLogger(DownloadAttachment.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(DownloadAttachment.class.getName()).log(Level.SEVERE, null, ex);
        }

        return null;
    }

    void makeRfqFormat(Document document, HttpServletRequest request, WorkOrderRfqHeader rfq, VendorDetails vendor, List<BuyerRfqLineItemBean> buyerRfqLineItemBeanList)
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

    void makeContractVenoroComparisionReport(Document document, List<ContractRfqHeaderVendorMapping> rfqVendorMappingList) throws DocumentException, BadElementException, IOException {
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

        for (int i = 0; i < rfqVendorMappingList.size(); i++) {

            ContractRfqHeaderVendorMapping mapping = rfqVendorMappingList.get(i);
            VendorDetails vendorObj = mapping.getNgBpVendordetailsId();
            ContractRfqHeader rfqHeader = mapping.getContractRfqHeaderRFQID();
            List<SupplierHeader> supplierHeaderList = getSupplierHeaderByVendorId(vendorObj.getId(), rfqHeader.getRfqid());

            List<RatedParameters> ratedParamList = findRatedParamByVendorANDRFQID(vendorObj.getId(), rfqHeader.getRfqid());

            com.itextpdf.text.List list = new com.itextpdf.text.List();

            Paragraph vendorNamePara = new Paragraph(new Chunk(vendorObj.getFirstname() + " " + vendorObj.getLastname() + " Rating:", new Font(Font.FontFamily.UNDEFINED, 15, Font.BOLD)));
            vendorNamePara.setAlignment(Paragraph.ALIGN_LEFT);
            document.add(vendorNamePara);

            PdfPTable vendorRatingTable = new PdfPTable(2);
            vendorRatingTable.setSpacingBefore(20);
            vendorRatingTable.setHorizontalAlignment(Paragraph.ALIGN_LEFT);

            PdfPCell c1 = null;
            PdfPCell c2 = null;

            for (RatedParameters param : ratedParamList) {

                c1 = new PdfPCell(new Phrase(param.getTagName()));
                c1.setBorder(PdfPCell.NO_BORDER);

//                for (SupplierHeader supplierHeaderObj : supplierHeaderList) {
//                    switch (param) {
//                        case "MOQ/ MOV Details":
//                            if (param.getWeight()== null) {
//                                c2 = new PdfPCell(new Phrase(""));
//                                c2.setBorder(PdfPCell.NO_BORDER);
//                            } else {
                if (param.getScore() == null) {
                    c2 = new PdfPCell(new Phrase(""));
                    c2.setBorder(PdfPCell.NO_BORDER);
                } else {
                    c2 = new PdfPCell(new Phrase(param.getScore() + "/5"));
                    c2.setBorder(PdfPCell.NO_BORDER);
                }

                list.add(param.getTagName());
//                            }
//                            break;
//                        case "Delivery Lead Time":
//                            if (supplierHeaderObj.getBuyerDeliveryLeadtimeRatedParameterWeight() == null) {
//                                c2 = new PdfPCell(new Phrase(""));
//                                c2.setBorder(PdfPCell.NO_BORDER);
//                            } else {
//                                if (supplierHeaderObj.getBuyerDeliveryLeadtimeRatedParameterScore() == null) {
//                                    c2 = new PdfPCell(new Phrase(""));
//                                    c2.setBorder(PdfPCell.NO_BORDER);
//                                } else {
//                                    c2 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerDeliveryLeadtimeRatedParameterScore() + "/5"));
//                                    c2.setBorder(PdfPCell.NO_BORDER);
//                                }
//                            }
//                            break;
//                        case "Payment Terms":
//                            if (supplierHeaderObj.getBuyerPaymentTermsRatedParameterWeight() == null) {
//                                c2 = new PdfPCell(new Phrase(""));
//                                c2.setBorder(PdfPCell.NO_BORDER);
//                            } else {
//                                if (supplierHeaderObj.getBuyerPaymentTermsRatedParameterScore() == null) {
//                                    c2 = new PdfPCell(new Phrase(""));
//                                    c2.setBorder(PdfPCell.NO_BORDER);
//                                } else {
//                                    c2 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerPaymentTermsRatedParameterScore() + "/5"));
//                                    c2.setBorder(PdfPCell.NO_BORDER);
//                                }
//                            }
//                            break;
//                        case "Brand Model":
//                            if (supplierHeaderObj.getBuyerBrandModelRatedParameterWeight() == null) {
//                                c2 = new PdfPCell(new Phrase(""));
//                                c2.setBorder(PdfPCell.NO_BORDER);
//                            } else {
//                                if (supplierHeaderObj.getBuyerBrandModelRatedParameterScore() == null) {
//                                    c2 = new PdfPCell(new Phrase(""));
//                                    c2.setBorder(PdfPCell.NO_BORDER);
//                                } else {
//                                    c2 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerBrandModelRatedParameterScore() + "/5"));
//                                    c2.setBorder(PdfPCell.NO_BORDER);
//                                }
//                            }
//                            break;
//                        case "Incoterms":
//                            if (supplierHeaderObj.getBuyerIncotermsRatedParameterWeight() == null) {
//                                c2 = new PdfPCell(new Phrase(""));
//                                c2.setBorder(PdfPCell.NO_BORDER);
//                            } else {
//                                if (supplierHeaderObj.getBuyerIncotermsRatedParameterScore() == null) {
//                                    c2 = new PdfPCell(new Phrase(""));
//                                    c2.setBorder(PdfPCell.NO_BORDER);
//                                } else {
//                                    c2 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerIncotermsRatedParameterScore() + "/5"));
//                                    c2.setBorder(PdfPCell.NO_BORDER);
//                                }
//                            }
//                            break;
//                        case "Validity of Offer":
//                            if (supplierHeaderObj.getBuyerValidityofferRatedParameterWeight() == null) {
//                                c2 = new PdfPCell(new Phrase(""));
//                                c2.setBorder(PdfPCell.NO_BORDER);
//                            } else {
//                                if (supplierHeaderObj.getBuyerValidityofferRatedParameterScore() == null) {
//                                    c2 = new PdfPCell(new Phrase(""));
//                                    c2.setBorder(PdfPCell.NO_BORDER);
//                                } else {
//                                    c2 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerValidityofferRatedParameterScore() + "/5"));
//                                    c2.setBorder(PdfPCell.NO_BORDER);
//                                }
//                            }
//                            break;
                //     }
                // }

                vendorRatingTable.addCell(c1);
                vendorRatingTable.addCell(c2);
            }
            document.add(vendorRatingTable);

            Paragraph reviewPara = new Paragraph("Reviews:");
            reviewPara.setAlignment(Paragraph.ALIGN_LEFT);
            document.add(reviewPara);
            List<RatedParameters> ratedParamList1 = findRatedParamByVendorANDRFQID(vendorObj.getId(), rfqHeader.getRfqid());
            for (RatedParameters param : ratedParamList1) {
                if (param.getValue() != null && !param.getValue().trim().equals("")) {
                    list.add(param.getValue());
                }
            }
//
//                if (supplierHeaderObj.getBuyerDeliveryLeadtimeRatedParameter() != null && !supplierHeaderObj.getBuyerDeliveryLeadtimeRatedParameter().trim().equals("")) {
//                    list.add(supplierHeaderObj.getBuyerDeliveryLeadtimeRatedParameter());
//                }
//
//                if (supplierHeaderObj.getBuyerIncotermsRatedParameter() != null && !supplierHeaderObj.getBuyerIncotermsRatedParameter().trim().equals("")) {
//                    list.add(supplierHeaderObj.getBuyerIncotermsRatedParameter());
//                }
//
//                if (supplierHeaderObj.getBuyerMoqmovDetailsRatedParameter() != null && !supplierHeaderObj.getBuyerMoqmovDetailsRatedParameter().trim().equals("")) {
//                    list.add(supplierHeaderObj.getBuyerMoqmovDetailsRatedParameter());
//                }
//
//                if (supplierHeaderObj.getBuyerPaymentTermsRatedParameter() != null && !supplierHeaderObj.getBuyerPaymentTermsRatedParameter().trim().equals("")) {
//                    list.add(supplierHeaderObj.getBuyerPaymentTermsRatedParameter());
//                }
//
//                if (supplierHeaderObj.getBuyerValidityofferRatedParameter() != null && !supplierHeaderObj.getBuyerValidityofferRatedParameter().trim().equals("")) {
//                    list.add(supplierHeaderObj.getBuyerValidityofferRatedParameter());
//                }
//
//            }
            document.add(list);
            document.add(blankPara);
            document.add(lineSeprator);
        }

        document.newPage();
        System.out.println("rfqVendorMappingList size is :::" + rfqVendorMappingList.size());
        for (int i = 0; i < rfqVendorMappingList.size(); i++) {

            ContractRfqHeaderVendorMapping mapping = rfqVendorMappingList.get(i);
            VendorDetails vendorObj = mapping.getNgBpVendordetailsId();
            ContractRfqHeader rfqHeader = mapping.getContractRfqHeaderRFQID();
            List<SupplierHeader> supplierHeaderList = getSupplierHeaderByVendorId(vendorObj.getId(), rfqHeader.getRfqid());
            List<RatedParameters> ratedParamList = findRatedParamByVendorANDRFQID(vendorObj.getId(), rfqHeader.getRfqid());
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

            for (RatedParameters param : ratedParamList) {
                c1 = new PdfPCell(new Phrase(param.getTagName()));

                c5 = new PdfPCell(new Phrase(param.getTagName()));

                c2 = new PdfPCell(new Phrase(param.getWeight()));
                c2.setHorizontalAlignment(Paragraph.ALIGN_CENTER);

                if (param.getWeight() == null) {
                    c3 = new PdfPCell(new Phrase(""));
                    c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);

                    c4 = new PdfPCell(new Phrase(""));
                    c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
                } else {
                    totalWeight += Integer.parseInt(param.getWeight());

                    if (param.getScore() == null) {
                        c3 = new PdfPCell(new Phrase(""));
                        c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);

                        c4 = new PdfPCell(new Phrase(""));
                        c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
                    } else {
                        totalScore += Integer.parseInt(param.getScore());

                        c3 = new PdfPCell(new Phrase(param.getScore()));
                        c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);

                        double average = (Double.parseDouble(param.getScore()) * Double.parseDouble(param.getWeight())) / 100;
                        System.out.println(param.getTagName() + ": " + average);
                        totalAverage += average;

                        c4 = new PdfPCell(new Phrase("" + average));
                        c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
                    }
                }
//
//                for (SupplierHeader supplierHeaderObj : supplierHeaderList) {
//                    switch (param) {
//                        case "MOQ/ MOV Details":
//                            c5 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerMoqmovDetailsRatedParameter()));
//
//                            c2 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerMoqmovDetailsRatedParameterWeight()));
//                            c2.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//                            
//                            if (supplierHeaderObj.getBuyerMoqmovDetailsRatedParameterWeight() == null) {
//                                c3 = new PdfPCell(new Phrase(""));
//                                c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//
//                                c4 = new PdfPCell(new Phrase(""));
//                                c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//                            } else {
//                                totalWeight += Integer.parseInt(supplierHeaderObj.getBuyerMoqmovDetailsRatedParameterWeight());
//                                
//                                if (supplierHeaderObj.getBuyerMoqmovDetailsRatedParameterScore() == null) {
//                                    c3 = new PdfPCell(new Phrase(""));
//                                    c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//
//                                    c4 = new PdfPCell(new Phrase(""));
//                                    c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//                                } else {
//                                    totalScore += Integer.parseInt(supplierHeaderObj.getBuyerMoqmovDetailsRatedParameterScore());
//                                    
//                                    c3 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerMoqmovDetailsRatedParameterScore()));
//                                    c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//
//                                    double average = (Double.parseDouble(supplierHeaderObj.getBuyerMoqmovDetailsRatedParameterScore()) * Double.parseDouble(supplierHeaderObj.getBuyerMoqmovDetailsRatedParameterWeight())) / 100;
//                                    System.out.println("MOQ average: " + average);
//                                    totalAverage += average;
//                                    
//                                    c4 = new PdfPCell(new Phrase("" + average));
//                                    c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//                                }
//                            }
//                            break;
//                        case "Delivery Lead Time":
//                            c5 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerDeliveryLeadtimeRatedParameter()));
//                            c2 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerDeliveryLeadtimeRatedParameterWeight()));
//                            c2.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//                            if (supplierHeaderObj.getBuyerDeliveryLeadtimeRatedParameterWeight() == null) {
//                                c3 = new PdfPCell(new Phrase(""));
//                                c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//                                c4 = new PdfPCell(new Phrase(""));
//                                c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//                            } else {
//                                totalWeight += Integer.parseInt(supplierHeaderObj.getBuyerDeliveryLeadtimeRatedParameterWeight());
//                                
//                                if (supplierHeaderObj.getBuyerDeliveryLeadtimeRatedParameterScore() == null) {
//                                    c3 = new PdfPCell(new Phrase(""));
//                                    c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//                                    c4 = new PdfPCell(new Phrase(""));
//                                    c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//                                } else {
//                                    totalScore += Integer.parseInt(supplierHeaderObj.getBuyerDeliveryLeadtimeRatedParameterScore());
//                                    
//                                    c3 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerDeliveryLeadtimeRatedParameterScore()));
//                                    c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//                                    
//                                    double average = (Double.parseDouble(supplierHeaderObj.getBuyerDeliveryLeadtimeRatedParameterScore()) * Double.parseDouble(supplierHeaderObj.getBuyerDeliveryLeadtimeRatedParameterWeight())) / 100;
//                                    System.out.println("Del average: " + average);
//                                    totalAverage += average;
//                                    
//                                    c4 = new PdfPCell(new Phrase("" + average));
//                                    c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//                                }
//                            }
//                            break;
//                        case "Payment Terms":
//                            c5 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerPaymentTermsRatedParameter()));
//                            c2 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerPaymentTermsRatedParameterWeight()));
//                            c2.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//                            if (supplierHeaderObj.getBuyerPaymentTermsRatedParameterWeight() == null) {
//                                c3 = new PdfPCell(new Phrase(""));
//                                c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//                                c4 = new PdfPCell(new Phrase(""));
//                                c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//                            } else {
//                                totalWeight += Integer.parseInt(supplierHeaderObj.getBuyerPaymentTermsRatedParameterWeight());
//                                
//                                if (supplierHeaderObj.getBuyerPaymentTermsRatedParameterScore() == null) {
//                                    c3 = new PdfPCell(new Phrase(""));
//                                    c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//                                    c4 = new PdfPCell(new Phrase(""));
//                                    c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//                                } else {
//                                    totalScore += Integer.parseInt(supplierHeaderObj.getBuyerPaymentTermsRatedParameterScore());
//                                    
//                                    c3 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerPaymentTermsRatedParameterScore()));
//                                    c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//                                    
//                                    double average = (Double.parseDouble(supplierHeaderObj.getBuyerPaymentTermsRatedParameterScore()) * Double.parseDouble(supplierHeaderObj.getBuyerPaymentTermsRatedParameterWeight())) / 100;
//                                    System.out.println("Pay average: " + average);
//                                    totalAverage += average;
//                                    
//                                    c4 = new PdfPCell(new Phrase("" + average));
//                                    c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//                                }
//                            }
//                            break;
//                        case "Brand Model":
//                            c5 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerBrandModelRatedParameter()));
//                            c2 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerBrandModelRatedParameterWeight()));
//                            c2.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//                            if (supplierHeaderObj.getBuyerBrandModelRatedParameterWeight() == null) {
//                                c3 = new PdfPCell(new Phrase(""));
//                                c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//                                c4 = new PdfPCell(new Phrase(""));
//                                c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//                            } else {
//                                totalWeight += Integer.parseInt(supplierHeaderObj.getBuyerBrandModelRatedParameterWeight());
//                                
//                                if (supplierHeaderObj.getBuyerBrandModelRatedParameterScore() == null) {
//                                    c3 = new PdfPCell(new Phrase(""));
//                                    c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//                                    c4 = new PdfPCell(new Phrase(""));
//                                    c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//                                } else {
//                                    totalScore += Integer.parseInt(supplierHeaderObj.getBuyerBrandModelRatedParameterScore());
//                                    
//                                    c3 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerBrandModelRatedParameterScore()));
//                                    c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//                                    
//                                    double average = (Double.parseDouble(supplierHeaderObj.getBuyerBrandModelRatedParameterScore()) * Double.parseDouble(supplierHeaderObj.getBuyerBrandModelRatedParameterWeight())) / 100;
//                                    System.out.println("Brand average: " + average);
//                                    totalAverage += average;
//                                    
//                                    c4 = new PdfPCell(new Phrase("" + average));
//                                    c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//                                }
//                            }
//                            break;
//                        case "Incoterms":
//                            c5 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerIncotermsRatedParameter()));
//                            c2 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerIncotermsRatedParameterWeight()));
//                            c2.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//                            if (supplierHeaderObj.getBuyerIncotermsRatedParameterWeight() == null) {
//                                c3 = new PdfPCell(new Phrase(""));
//                                c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//                                c4 = new PdfPCell(new Phrase(""));
//                                c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//                            } else {
//                                totalWeight += Integer.parseInt(supplierHeaderObj.getBuyerIncotermsRatedParameterWeight());
//                                
//                                if (supplierHeaderObj.getBuyerIncotermsRatedParameterScore() == null) {
//                                    c3 = new PdfPCell(new Phrase(""));
//                                    c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//                                    c4 = new PdfPCell(new Phrase(""));
//                                    c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//                                } else {
//                                    totalScore += Integer.parseInt(supplierHeaderObj.getBuyerIncotermsRatedParameterScore());
//                                    
//                                    c3 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerIncotermsRatedParameterScore()));
//                                    c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//                                    
//                                    double average = (Double.parseDouble(supplierHeaderObj.getBuyerIncotermsRatedParameterScore()) * Double.parseDouble(supplierHeaderObj.getBuyerIncotermsRatedParameterWeight())) / 100;
//                                    System.out.println("Inc average: " + average);
//                                    totalAverage += average;
//                                    
//                                    c4 = new PdfPCell(new Phrase("" + average));
//                                    c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//                                }
//                            }
//                            break;
//                        case "Validity of Offer":
//                            c5 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerValidityofferRatedParameter()));
//                            c2 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerValidityofferRatedParameterWeight()));
//                            c2.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//                            if (supplierHeaderObj.getBuyerValidityofferRatedParameterWeight() == null) {
//                                c3 = new PdfPCell(new Phrase(""));
//                                c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//                                c4 = new PdfPCell(new Phrase(""));
//                                c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//                            } else {
//                                totalWeight += Integer.parseInt(supplierHeaderObj.getBuyerValidityofferRatedParameterWeight());
//                                
//                                if (supplierHeaderObj.getBuyerValidityofferRatedParameterScore() == null) {
//                                    c3 = new PdfPCell(new Phrase(""));
//                                    c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//                                    c4 = new PdfPCell(new Phrase(""));
//                                    c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//                                } else {
//                                    totalScore += Integer.parseInt(supplierHeaderObj.getBuyerValidityofferRatedParameterScore());
//                                    
//                                    c3 = new PdfPCell(new Phrase(supplierHeaderObj.getBuyerValidityofferRatedParameterScore()));
//                                    c3.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//                                    
//                                    double average = (Double.parseDouble(supplierHeaderObj.getBuyerValidityofferRatedParameterScore()) * Double.parseDouble(supplierHeaderObj.getBuyerValidityofferRatedParameterWeight())) / 100;
//                                    System.out.println("Val average: " + average);
//                                    totalAverage += average;
//                                    
//                                    c4 = new PdfPCell(new Phrase("" + average));
//                                    c4.setHorizontalAlignment(Paragraph.ALIGN_CENTER);
//                                }
//                            }
//                            break;
//                    }
//              criteriaTable.addCell(c1);
//              criteriaTable.addCell(c2);
//              criteriaTable.addCell(c3);
//              criteriaTable.addCell(c4);
//              criteriaTable.addCell(c5);
//                }
////              criteriaTable.addCell(c1);
////              criteriaTable.addCell(c2);
////              criteriaTable.addCell(c3);
////              criteriaTable.addCell(c4);
////              criteriaTable.addCell(c5);  
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

    void makeVenoroComparisionReport(Document document, List<RfqHeaderVendorMapping> rfqVendorMappingList) throws DocumentException, BadElementException, IOException {
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

        for (int i = 0; i < rfqVendorMappingList.size(); i++) {

            RfqHeaderVendorMapping mapping = rfqVendorMappingList.get(i);
            VendorDetails vendorObj = mapping.getNgBpVendordetailsId();
            WorkOrderRfqHeader rfqHeader = mapping.getNgBpWorkorderrfqheaderRfqid();
            List<SupplierHeader> supplierHeaderList = getSupplierHeaderByVendorId(vendorObj.getId(), rfqHeader.getRfqid());

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
            List<SupplierHeader> supplierHeaderList = getSupplierHeaderByVendorId(vendorObj.getId(), rfqHeader.getRfqid());

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

    Workbook createVendorComparisionExcelReport(Workbook workbook, List<RfqHeaderVendorMapping> rfqVendorMappingList, List<BuyerRfqLineItemBean> buyerRfqLineItemBeanList) {

        Sheet sheet = workbook.createSheet("Vendor Comparision Report");
        Cell cell;
        Row row;
        int noOfVendors = rfqVendorMappingList.size();
        int noOfLineItem = buyerRfqLineItemBeanList.size();

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
            System.out.println("noOfVendors * 4 = " + noOfVendors * 4);
            if (i % 4 == 0) {
                RfqHeaderVendorMapping mapping = rfqVendorMappingList.get(index);

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
                cell.setCellValue(mapping.getNgBpVendordetailsId().getFirstname() + " " + mapping.getNgBpVendordetailsId().getLastname());
                cell.setCellStyle(boldCellStyle);

                cell = vendorNameRow.createCell(i + 1 + 6);
                cell.setCellStyle(boldCellStyle);
                cell = vendorNameRow.createCell(i + 2 + 6);
                cell.setCellStyle(boldCellStyle);
                cell = vendorNameRow.createCell(i + 3 + 6);
                cell.setCellStyle(boldCellStyle);
                sheet.addMergedRegion(new CellRangeAddress(4, 4, i + 6, i + 3 + 6));

                cell = vendorTelRow.createCell(i + 6);
                if (mapping.getNgBpVendordetailsId().getContactnumbermob() == null) {
                    cell.setCellValue("Tel: ");
                } else {
                    cell.setCellValue("Tel: " + mapping.getNgBpVendordetailsId().getContactnumbermob());
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
                if (mapping.getNgBpVendordetailsId().getContactfirstname() == null && mapping.getNgBpVendordetailsId().getContactlastname() == null) {
                    cell.setCellValue("");
                } else if (mapping.getNgBpVendordetailsId().getContactfirstname() != null && mapping.getNgBpVendordetailsId().getContactlastname() == null) {
                    cell.setCellValue(mapping.getNgBpVendordetailsId().getContactfirstname());
                } else if (mapping.getNgBpVendordetailsId().getContactfirstname() == null && mapping.getNgBpVendordetailsId().getContactlastname() != null) {
                    cell.setCellValue(mapping.getNgBpVendordetailsId().getContactlastname());
                } else if (mapping.getNgBpVendordetailsId().getContactfirstname() != null && mapping.getNgBpVendordetailsId().getContactlastname() != null) {
                    cell.setCellValue(mapping.getNgBpVendordetailsId().getContactfirstname() + " " + mapping.getNgBpVendordetailsId().getContactlastname());
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
        cell.setCellValue("H");
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
        cell.setCellValue("G");
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
        cell.setCellValue("H");
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

        int prIndex = 0;
        for (int i = 9; i < noOfLineItem + 9; i++) {
            row = sheet.createRow(i);
            BuyerRfqLineItemBean pr = buyerRfqLineItemBeanList.get(prIndex);

            cell = row.createCell(0);
            cell.setCellValue(prIndex + 1);
            cell.setCellStyle(normalCellStyle);

            cell = row.createCell(1);
            cell.setCellValue(pr.getPlantName());
            cell.setCellStyle(normalCellStyle);

            cell = row.createCell(2);
            cell.setCellValue(pr.getMaterialCode());
            cell.setCellStyle(normalCellStyle);

            cell = row.createCell(3);
            cell.setCellValue(pr.getShortText());
            cell.setCellStyle(normalCellStyle);

            cell = row.createCell(4);
            cell.setCellValue(pr.getUnit());
            cell.setCellStyle(normalCellStyle);

            cell = row.createCell(5);
            cell.setCellValue(pr.getUsedQuantity());
            cell.setCellStyle(normalCellStyle);

            index = 0;
            for (int j = 0; j < noOfVendors * 4; j++) {
                if (j % 4 == 0) {

                    RfqHeaderVendorMapping mapping = rfqVendorMappingList.get(index);
                    List<VendorRfqLineItemBean> vendorRfqLineItemBeanlist = callVendorRfqPrLineItemStoredProcedure(
                            mapping.getNgBpWorkorderrfqheaderRfqid().getRfqid(), mapping.getNgBpVendordetailsId().getId(), "", 0);

                    VendorRfqLineItemBean vendorLineItem = vendorRfqLineItemBeanlist.get(prIndex);

                    List<SupplierHeader> supplierHeaders = (List<SupplierHeader>) getSupplierHeaderByVendorId(
                            mapping.getNgBpVendordetailsId().getId(), mapping.getNgBpWorkorderrfqheaderRfqid().getRfqid());
                    SupplierHeader supplierHeaderObj = supplierHeaders.get(0);

                    cell = row.createCell(j + 6);
                    cell.setCellValue(vendorLineItem.getVendorPriceOfferedPerUnit() == null ? "NQ" : vendorLineItem.getVendorPriceOfferedPerUnit());
                    cell.setCellStyle(normalCellStyle);

                    cell = row.createCell(j + 7);
                    cell.setCellValue(vendorLineItem.getVendorPriceOfferedTotal() == null ? "NQ" : vendorLineItem.getVendorPriceOfferedTotal());
                    cell.setCellStyle(normalCellStyle);

                    cell = row.createCell(j + 8);
                    cell.setCellValue(vendorLineItem.getVendorPriceOfferedPerUnit() == null ? "NQ" : vendorLineItem.getVendorPriceOfferedPerUnit());
                    cell.setCellStyle(normalCellStyle);

                    cell = row.createCell(j + 9);
                    cell.setCellValue(vendorLineItem.getBuyerBaselinePrice() == null ? "NQ" : vendorLineItem.getBuyerBaselinePrice());
                    cell.setCellStyle(normalCellStyle);

                    index++;
                }
            }
            prIndex++;
        }
        index = 0;
        for (int j = 0; j < noOfVendors * 4; j++) {
            if (j % 4 == 0) {

                RfqHeaderVendorMapping mapping = rfqVendorMappingList.get(index);

                List<SupplierHeader> supplierHeaders = (List<SupplierHeader>) getSupplierHeaderByVendorId(
                        mapping.getNgBpVendordetailsId().getId(), mapping.getNgBpWorkorderrfqheaderRfqid().getRfqid());
                SupplierHeader supplierHeaderObj = supplierHeaders.get(0);

                cell = blankRow.createCell(j + 8);
                cell.setCellValue("(REV & FINAL)");
                cell.setCellStyle(boldCellStyle);

                cell = blankRow.createCell(j + 9);
                cell.setCellStyle(boldCellStyle);

                sheet.addMergedRegion(new CellRangeAddress(8, 8, j + 8, j + 9));

                //Grand Total
                cell = totalRow.createCell(j + 6);
                cell.setCellValue(supplierHeaderObj.getVendorPriceOfferedTotal() == null ? "NQ" : supplierHeaderObj.getVendorPriceOfferedTotal());
                cell.setCellStyle(normalCellStyle);

                cell = totalRow.createCell(j + 7);
                cell.setCellStyle(normalCellStyle);

                sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 10, noOfLineItem + 10, j + 6, j + 7));

                cell = totalRow.createCell(j + 8);
                cell.setCellValue(supplierHeaderObj.getBuyerPriceOfferedTotal() == null ? "NQ" : supplierHeaderObj.getBuyerPriceOfferedTotal());
                cell.setCellStyle(normalCellStyle);

                cell = totalRow.createCell(j + 9);
                cell.setCellStyle(normalCellStyle);

                sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 10, noOfLineItem + 10, j + 8, j + 9));

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

    Workbook createContractVendorComparisionExcelReport(Workbook workbook, List<ContractRfqHeaderVendorMapping> rfqVendorMappingList, List<BuyerContractRfqLineItemBean> buyerRfqLineItemBeanList) {

        Sheet sheet = workbook.createSheet("Vendor Comparision Report");
        Cell cell;
        Row row;
        int noOfVendors = rfqVendorMappingList.size();
        int noOfLineItem = buyerRfqLineItemBeanList.size();
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

        sheet.addMergedRegion(new CellRangeAddress(2, 2, 6, (noOfVendors * 4) + 5));

        int index = 0;
        Row vendorCountRow = sheet.createRow(3);
        Row vendorNameRow = sheet.createRow(4);
        Row vendorTelRow = sheet.createRow(5);
        Row vendorContactNameRow = sheet.createRow(6);

        for (int i = 0; i < noOfVendors * 4; i++) {
            System.out.println("noOfVendors * 4 = " + noOfVendors * 4);
            if (i % 4 == 0) {
                ContractRfqHeaderVendorMapping mapping = rfqVendorMappingList.get(index);

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
                cell.setCellValue(mapping.getNgBpVendordetailsId().getFirstname() + " " + mapping.getNgBpVendordetailsId().getLastname());
                cell.setCellStyle(boldCellStyle);

                cell = vendorNameRow.createCell(i + 1 + 6);
                cell.setCellStyle(boldCellStyle);
                cell = vendorNameRow.createCell(i + 2 + 6);
                cell.setCellStyle(boldCellStyle);
                cell = vendorNameRow.createCell(i + 3 + 6);
                cell.setCellStyle(boldCellStyle);
                sheet.addMergedRegion(new CellRangeAddress(4, 4, i + 6, i + 3 + 6));

                cell = vendorTelRow.createCell(i + 6);
                if (mapping.getNgBpVendordetailsId().getContactnumbermob() == null) {
                    cell.setCellValue("Tel: ");
                } else {
                    cell.setCellValue("Tel: " + mapping.getNgBpVendordetailsId().getContactnumbermob());
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
                if (mapping.getNgBpVendordetailsId().getContactfirstname() == null && mapping.getNgBpVendordetailsId().getContactlastname() == null) {
                    cell.setCellValue("");
                } else if (mapping.getNgBpVendordetailsId().getContactfirstname() != null && mapping.getNgBpVendordetailsId().getContactlastname() == null) {
                    cell.setCellValue(mapping.getNgBpVendordetailsId().getContactfirstname());
                } else if (mapping.getNgBpVendordetailsId().getContactfirstname() == null && mapping.getNgBpVendordetailsId().getContactlastname() != null) {
                    cell.setCellValue(mapping.getNgBpVendordetailsId().getContactlastname());
                } else if (mapping.getNgBpVendordetailsId().getContactfirstname() != null && mapping.getNgBpVendordetailsId().getContactlastname() != null) {
                    cell.setCellValue(mapping.getNgBpVendordetailsId().getContactfirstname() + " " + mapping.getNgBpVendordetailsId().getContactlastname());
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
        List<RatedParameters> ratedParamList = findRatedParamByVendorANDRFQID(rfqVendorMappingList.get(0).getNgBpVendordetailsId().getId(), rfqVendorMappingList.get(0).getContractRfqHeaderRFQID().getRfqid());
        int m = 10;
        for (RatedParameters param : ratedParamList) {
            Row moqMovRow = sheet.createRow(noOfLineItem + (m + 1));

            cell = moqMovRow.createCell(0);
            cell.setCellValue("B");
            cell.setCellStyle(boldCellStyle);

            cell = moqMovRow.createCell(1);
            cell.setCellValue(param.getTagName());
            cell.setCellStyle(boldCellStyle);

            cell = moqMovRow.createCell(2);
            cell.setCellStyle(boldCellStyle);

            cell = moqMovRow.createCell(3);
            cell.setCellStyle(boldCellStyle);

            cell = moqMovRow.createCell(4);
            cell.setCellStyle(boldCellStyle);

            cell = moqMovRow.createCell(5);
            cell.setCellStyle(boldCellStyle);

            sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + (m + 1), noOfLineItem + (m + 1), 1, 5));
        }
        // Delivery Leadtime
//        Row deliveryLeadTimeRow = sheet.createRow(noOfLineItem + 12);
//
//        cell = deliveryLeadTimeRow.createCell(0);
//        cell.setCellValue("C");
//        cell.setCellStyle(boldCellStyle);
//
//        cell = deliveryLeadTimeRow.createCell(1);
//        cell.setCellValue("DELIVERY LEADTIME");
//        cell.setCellStyle(boldCellStyle);
//
//        cell = deliveryLeadTimeRow.createCell(2);
//        cell.setCellStyle(boldCellStyle);
//
//        cell = deliveryLeadTimeRow.createCell(3);
//        cell.setCellStyle(boldCellStyle);
//
//        cell = deliveryLeadTimeRow.createCell(4);
//        cell.setCellStyle(boldCellStyle);
//
//        cell = deliveryLeadTimeRow.createCell(5);
//        cell.setCellStyle(boldCellStyle);
//
//        sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 12, noOfLineItem + 12, 1, 5));
//
//        // Payment Term
//        Row paymentTermRow = sheet.createRow(noOfLineItem + 13);
//
//        cell = paymentTermRow.createCell(0);
//        cell.setCellValue("D");
//        cell.setCellStyle(boldCellStyle);
//
//        cell = paymentTermRow.createCell(1);
//        cell.setCellValue("PAYMENT TERM");
//        cell.setCellStyle(boldCellStyle);
//
//        cell = paymentTermRow.createCell(2);
//        cell.setCellStyle(boldCellStyle);
//
//        cell = paymentTermRow.createCell(3);
//        cell.setCellStyle(boldCellStyle);
//
//        cell = paymentTermRow.createCell(4);
//        cell.setCellStyle(boldCellStyle);
//
//        cell = paymentTermRow.createCell(5);
//        cell.setCellStyle(boldCellStyle);
//
//        sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 13, noOfLineItem + 13, 1, 5));
//
//        // Brand
//        Row brandRow = sheet.createRow(noOfLineItem + 14);
//
//        cell = brandRow.createCell(0);
//        cell.setCellValue("E");
//        cell.setCellStyle(boldCellStyle);
//
//        cell = brandRow.createCell(1);
//        cell.setCellValue("BRAND");
//        cell.setCellStyle(boldCellStyle);
//
//        cell = brandRow.createCell(2);
//        cell.setCellStyle(boldCellStyle);
//
//        cell = brandRow.createCell(3);
//        cell.setCellStyle(boldCellStyle);
//
//        cell = brandRow.createCell(4);
//        cell.setCellStyle(boldCellStyle);
//
//        cell = brandRow.createCell(5);
//        cell.setCellStyle(boldCellStyle);
//
//        sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 14, noOfLineItem + 14, 1, 5));
//
//        // Validity of offer
//        Row validityOfOfferRow = sheet.createRow(noOfLineItem + 15);
//
//        cell = validityOfOfferRow.createCell(0);
//        cell.setCellValue("F");
//        cell.setCellStyle(boldCellStyle);
//
//        cell = validityOfOfferRow.createCell(1);
//        cell.setCellValue("VALIDITY OF OFFER");
//        cell.setCellStyle(boldCellStyle);
//
//        cell = validityOfOfferRow.createCell(2);
//        cell.setCellStyle(boldCellStyle);
//
//        cell = validityOfOfferRow.createCell(3);
//        cell.setCellStyle(boldCellStyle);
//
//        cell = validityOfOfferRow.createCell(4);
//        cell.setCellStyle(boldCellStyle);
//
//        cell = validityOfOfferRow.createCell(5);
//        cell.setCellStyle(boldCellStyle);
//
//        sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 15, noOfLineItem + 15, 1, 5));
//
//        // Incoterm
//        Row incotermRow = sheet.createRow(noOfLineItem + 16);
//
//        cell = incotermRow.createCell(0);
//        cell.setCellValue("H");
//        cell.setCellStyle(boldCellStyle);
//
//        cell = incotermRow.createCell(1);
//        cell.setCellValue("Incoterm");
//        cell.setCellStyle(boldCellStyle);
//
//        cell = incotermRow.createCell(2);
//        cell.setCellStyle(boldCellStyle);
//
//        cell = incotermRow.createCell(3);
//        cell.setCellStyle(boldCellStyle);
//
//        cell = incotermRow.createCell(4);
//        cell.setCellStyle(boldCellStyle);
//
//        cell = incotermRow.createCell(5);
//        cell.setCellStyle(boldCellStyle);
//
//        sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 16, noOfLineItem + 16, 1, 5));

        // Ranking of Tender
        Row rankingOfTenderRow = sheet.createRow(noOfLineItem + 17);

        cell = rankingOfTenderRow.createCell(0);
        cell.setCellValue("G");
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
        cell.setCellValue("H");
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

        int prIndex = 0;
        for (int i = 9; i < noOfLineItem + 9; i++) {
            row = sheet.createRow(i);
            //ContractRfqHeaderVendorMapping> rfqVendorMappingList, List<BuyerContractRfqLineItemBean
            BuyerContractRfqLineItemBean pr = buyerRfqLineItemBeanList.get(prIndex);

            cell = row.createCell(0);
            cell.setCellValue(prIndex + 1);
            cell.setCellStyle(normalCellStyle);

            cell = row.createCell(1);
            cell.setCellValue(pr.getPlantCode());
            cell.setCellStyle(normalCellStyle);

            cell = row.createCell(2);
            cell.setCellValue(pr.getMaterialCode());
            cell.setCellStyle(normalCellStyle);

            cell = row.createCell(3);
            cell.setCellValue(pr.getShortText());
            cell.setCellStyle(normalCellStyle);

            cell = row.createCell(4);
            cell.setCellValue(pr.getUnit());
            cell.setCellStyle(normalCellStyle);

            cell = row.createCell(5);
            cell.setCellValue(pr.getQuantity());
            cell.setCellStyle(normalCellStyle);

            index = 0;
            for (int j = 0; j < noOfVendors * 4; j++) {
                if (j % 4 == 0) {

                    ContractRfqHeaderVendorMapping mapping = rfqVendorMappingList.get(index);
                    List<VendorRfqLineItemBean> vendorRfqLineItemBeanlist = callContractVendorRfqPrLineItemStoredProcedure(
                            mapping.getContractRfqHeaderRFQID().getRfqid(), mapping.getNgBpVendordetailsId().getId(), "", 0);

                    VendorRfqLineItemBean vendorLineItem = vendorRfqLineItemBeanlist.get(prIndex);

//                    List<ContractVendorRfqHeader> supplierHeaders = (List<ContractVendorRfqHeader>) findContractVendorRfqHeaderByRfqIdAndVendorId(
//                            mapping.getNgBpVendordetailsId().getId(), mapping.getContractRfqHeaderRFQID().getRfqid());
//                   // ContractVendorRfqHeader supplierHeaderObj = supplierHeaders.get(0);
                    cell = row.createCell(j + 6);
                    cell.setCellValue(vendorLineItem.getVendorPriceOfferedPerUnit() == null ? "NQ" : vendorLineItem.getVendorPriceOfferedPerUnit());
                    cell.setCellStyle(normalCellStyle);

                    cell = row.createCell(j + 7);
                    cell.setCellValue(vendorLineItem.getVendorPriceOfferedTotal() == null ? "NQ" : vendorLineItem.getVendorPriceOfferedTotal());
                    cell.setCellStyle(normalCellStyle);

                    cell = row.createCell(j + 8);
                    cell.setCellValue(vendorLineItem.getVendorPriceOfferedPerUnit() == null ? "NQ" : vendorLineItem.getVendorPriceOfferedPerUnit());
                    cell.setCellStyle(normalCellStyle);

                    cell = row.createCell(j + 9);
                    cell.setCellValue(vendorLineItem.getBuyerBaselinePrice() == null ? "NQ" : vendorLineItem.getBuyerBaselinePrice());
                    cell.setCellStyle(normalCellStyle);

                    index++;
                }
            }
            prIndex++;
        }
        index = 0;
        for (int j = 0; j < noOfVendors * 4; j++) {
            if (j % 4 == 0) {

                ContractRfqHeaderVendorMapping mapping = rfqVendorMappingList.get(index);

                List<ContractVendorRfqHeader> supplierHeaders = (List<ContractVendorRfqHeader>) getContractHeaderByVendoridAndRfqIdAndStatus(
                        mapping.getNgBpVendordetailsId().getId(), mapping.getContractRfqHeaderRFQID().getRfqid());
                ContractVendorRfqHeader supplierHeaderObj = supplierHeaders.get(0);

                cell = blankRow.createCell(j + 8);
                cell.setCellValue("(REV & FINAL)");
                cell.setCellStyle(boldCellStyle);

                cell = blankRow.createCell(j + 9);
                cell.setCellStyle(boldCellStyle);

                sheet.addMergedRegion(new CellRangeAddress(8, 8, j + 8, j + 9));

                //Grand Total
                cell = totalRow.createCell(j + 6);
                cell.setCellValue(supplierHeaderObj.getVendorPriceOfferedTotal() == null ? "NQ" : supplierHeaderObj.getVendorPriceOfferedTotal());
                cell.setCellStyle(normalCellStyle);

                cell = totalRow.createCell(j + 7);
                cell.setCellStyle(normalCellStyle);

                sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 10, noOfLineItem + 10, j + 6, j + 7));

                cell = totalRow.createCell(j + 8);
                cell.setCellValue(supplierHeaderObj.getBuyerPriceOfferedTotal() == null ? "NQ" : supplierHeaderObj.getBuyerPriceOfferedTotal());
                cell.setCellStyle(normalCellStyle);

                cell = totalRow.createCell(j + 9);
                cell.setCellStyle(normalCellStyle);

                sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 10, noOfLineItem + 10, j + 8, j + 9));
                List<RatedParameters> ratedParamList1 = findRatedParamByVendorANDRFQID(supplierHeaderObj.getNgBpVendordetailsId().getId(), supplierHeaderObj.getNgBpContractRfqHeaderRfqid().getRfqid());
//                // MOQ/ MOV
                int n = 10;
                for (RatedParameters param : ratedParamList1) {
                    Row moqMovRow = sheet.getRow(noOfLineItem + (n + 1));
                    cell = moqMovRow.createCell(j + 6);
                    cell.setCellValue(param.getScore());
                    cell.setCellStyle(normalCellStyle);

                    cell = moqMovRow.createCell(j + 7);
                    cell.setCellStyle(normalCellStyle);

                    sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + (n + 1), noOfLineItem + (n + 1), j + 6, j + 7));

                    cell = moqMovRow.createCell(j + 8);
                    cell.setCellValue(param.getScore());
                    cell.setCellStyle(normalCellStyle);

                    cell = moqMovRow.createCell(j + 9);
                    cell.setCellStyle(normalCellStyle);

                    sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + (n + 1), noOfLineItem + (n + 1), j + 8, j + 9));

                }
//                cell = moqMovRow.createCell(j + 6);
//                cell.setCellValue(supplierHeaderObj.getmOQMOVDetailsRatedParameter());
//                cell.setCellStyle(normalCellStyle);
//
//                cell = moqMovRow.createCell(j + 7);
//                cell.setCellStyle(normalCellStyle);
//
//                sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 11, noOfLineItem + 11, j + 6, j + 7));
//
//                cell = moqMovRow.createCell(j + 8);
//                cell.setCellValue(supplierHeaderObj.getBuyerMoqmovDetailsRatedParameter());
//                cell.setCellStyle(normalCellStyle);
//
//                cell = moqMovRow.createCell(j + 9);
//                cell.setCellStyle(normalCellStyle);
//
//                sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 11, noOfLineItem + 11, j + 8, j + 9));
//
//                // Delivery Leadtime
//                cell = deliveryLeadTimeRow.createCell(j + 6);
//                cell.setCellValue(supplierHeaderObj.getDeliveryLeadTImeRatedParameter());
//                cell.setCellStyle(normalCellStyle);
//
//                cell = deliveryLeadTimeRow.createCell(j + 7);
//                cell.setCellStyle(normalCellStyle);
//
//                sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 12, noOfLineItem + 12, j + 6, j + 7));
//
//                cell = deliveryLeadTimeRow.createCell(j + 8);
//                cell.setCellValue(supplierHeaderObj.getBuyerDeliveryLeadtimeRatedParameter());
//                cell.setCellStyle(normalCellStyle);
//
//                cell = deliveryLeadTimeRow.createCell(j + 9);
//                cell.setCellStyle(normalCellStyle);
//
//                sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 12, noOfLineItem + 12, j + 8, j + 9));
//
//                // Payment Term
//                cell = paymentTermRow.createCell(j + 6);
//                cell.setCellValue(supplierHeaderObj.getPaymentTermsRatedParameter());
//                cell.setCellStyle(normalCellStyle);
//
//                cell = paymentTermRow.createCell(j + 7);
//                cell.setCellStyle(normalCellStyle);
//
//                sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 13, noOfLineItem + 13, j + 6, j + 7));
//
//                cell = paymentTermRow.createCell(j + 8);
//                cell.setCellValue(supplierHeaderObj.getBuyerPaymentTermsRatedParameter());
//                cell.setCellStyle(normalCellStyle);
//
//                cell = paymentTermRow.createCell(j + 9);
//                cell.setCellStyle(normalCellStyle);
//
//                sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 13, noOfLineItem + 13, j + 8, j + 9));
//
//                // Brand
//                cell = brandRow.createCell(j + 6);
//                cell.setCellValue(supplierHeaderObj.getBrandModelRatedParameter());
//                cell.setCellStyle(normalCellStyle);
//
//                cell = brandRow.createCell(j + 7);
//                cell.setCellStyle(normalCellStyle);
//
//                sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 14, noOfLineItem + 14, j + 6, j + 7));
//
//                cell = brandRow.createCell(j + 8);
//                cell.setCellValue(supplierHeaderObj.getBuyerBrandModelRatedParameter());
//                cell.setCellStyle(normalCellStyle);
//
//                cell = brandRow.createCell(j + 9);
//                cell.setCellStyle(normalCellStyle);
//
//                sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 14, noOfLineItem + 14, j + 8, j + 9));
//
//                // Validity of Offer
//                cell = validityOfOfferRow.createCell(j + 6);
//                cell.setCellValue(supplierHeaderObj.getValidityOfferRatedParameter());
//                cell.setCellStyle(normalCellStyle);
//
//                cell = validityOfOfferRow.createCell(j + 7);
//                cell.setCellStyle(normalCellStyle);
//
//                sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 15, noOfLineItem + 15, j + 6, j + 7));
//
//                cell = validityOfOfferRow.createCell(j + 8);
//                cell.setCellValue(supplierHeaderObj.getBuyerValidityofferRatedParameter());
//                cell.setCellStyle(normalCellStyle);
//
//                cell = validityOfOfferRow.createCell(j + 9);
//                cell.setCellStyle(normalCellStyle);
//
//                sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 15, noOfLineItem + 15, j + 8, j + 9));
//
//                // Incoterm
//                cell = incotermRow.createCell(j + 6);
//                cell.setCellValue(supplierHeaderObj.getIncotermsRatedParameter());
//                cell.setCellStyle(normalCellStyle);
//
//                cell = incotermRow.createCell(j + 7);
//                cell.setCellStyle(normalCellStyle);
//
//                sheet.addMergedRegion(new CellRangeAddress(noOfLineItem + 16, noOfLineItem + 16, j + 6, j + 7));
//
//                cell = incotermRow.createCell(j + 8);
//                cell.setCellValue(supplierHeaderObj.getBuyerIncotermsRatedParameter());
//                cell.setCellStyle(normalCellStyle);
//
//                cell = incotermRow.createCell(j + 9);
//                cell.setCellStyle(normalCellStyle);

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

    public VendorDetails findVendorById(int vendorid) {
        System.out.println("vendorid: " + vendorid);
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findvendorbyid.do?vendorid=" + vendorid;
        System.out.println("url: " + url);
        ResponseEntity<VendorDetails> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<VendorDetails>() {
        });
        VendorDetails vendor = response.getBody();
        return vendor;
    }

    List<RfqHeaderVendorMapping> findVendorByRfqId(int rfqid) {

        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findvendorbyrfqid.do?rfqid=" + rfqid;
        System.out.println("url: " + url);
        ResponseEntity<List<RfqHeaderVendorMapping>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<RfqHeaderVendorMapping>>() {
        });
        List<RfqHeaderVendorMapping> vendorList = prResponse.getBody();
        System.out.println("vendorList size: " + vendorList.size());
        return vendorList;
    }

    List<VendorRfqLineItemBean> callVendorRfqPrLineItemStoredProcedure(int rfqid, int vendorid, String status, int supplierHeaderId) {
        String url = webservice_ip + "/BuyerPortalWebServices/callVendorRfqPrLineItemStoredProcedure.do?rfqid=" + rfqid + "&vendorid=" + vendorid + "&status=" + status + "&supplierHeaderId=" + supplierHeaderId;
        System.out.println("url: " + url);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<VendorRfqLineItemBean>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<VendorRfqLineItemBean>>() {
        });
        List<VendorRfqLineItemBean> list = response.getBody();
        return list;
    }

    List<VendorRfqLineItemBean> callContractVendorRfqPrLineItemStoredProcedure(int rfqid, int vendorid, String status, int supplierHeaderId) {
        String url = webservice_ip + "/BuyerPortalWebServices/callContractVendorRfqPrLineItemStoredProcedure.do?rfqid=" + rfqid + "&vendorid=" + vendorid + "&status=" + status + "&supplierHeaderId=" + supplierHeaderId;
        System.out.println("url: " + url);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<VendorRfqLineItemBean>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<VendorRfqLineItemBean>>() {
        });
        List<VendorRfqLineItemBean> list = response.getBody();
        return list;
    }

    List<SupplierHeader> getSupplierHeaderByVendorId(int vendorid, int rfqid) {
        RestTemplate restTemplate = new RestTemplate();
        System.out.println("vendorid in :" + vendorid);
        String url = webservice_ip + "/BuyerPortalWebServices/getsupplierheaderbyvendorid.do?vendorid=" + vendorid + "&rfqid=" + rfqid;
        System.out.println("url in getSupplierHeaderByVendorId:" + url);
        ResponseEntity<List<SupplierHeader>> supplierHeaderResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<SupplierHeader>>() {
        });
        List<SupplierHeader> supplierHeaderObj = (List<SupplierHeader>) supplierHeaderResponse.getBody();

        System.out.println("supplierHeaderObj :" + supplierHeaderObj);

        return supplierHeaderObj;
    }

    ContractRfqHeader findContractRfqHeaderById(int rfqid) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findcontractrfqheaderbyid.do?rfqid=" + rfqid;
        System.out.println("url findContractRfqHeaderById" + url);

        ResponseEntity<ContractRfqHeader> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<ContractRfqHeader>() {
        });
        ContractRfqHeader rfqHeaderObj = prResponse.getBody();
        System.out.println("rfqHeaderObj in download :" + rfqHeaderObj);

        return rfqHeaderObj;
    }

    List<ContractRfqHeaderVendorMapping> findContractRfqHeaderVendorMappingByRfqId(int rfqid) {

        String url = webservice_ip + "/BuyerPortalWebServices/findContractRfqHeaderVendorMappingByRfqId.do?rfqid=" + rfqid;
        System.out.println("url: " + url);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<ContractRfqHeaderVendorMapping>> contractResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ContractRfqHeaderVendorMapping>>() {
        });
        List<ContractRfqHeaderVendorMapping> mapping = contractResponse.getBody();
        System.out.println("mapping size: " + mapping.size());

        return mapping;
    }

    public List<BuyerContractRfqLineItemBean> callBuyerRfqContractLineItemStoredProcedure(int rfqid) {
        String url = webservice_ip + "/BuyerPortalWebServices/callBuyerRfqContractLineItemStoredProcedure.do?rfqid=" + rfqid;
        System.out.println("url: " + url);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<BuyerContractRfqLineItemBean>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<BuyerContractRfqLineItemBean>>() {
        });
        List<BuyerContractRfqLineItemBean> list = response.getBody();
        return list;
    }

    List<ContractVendorRfqHeader> findContractVendorRfqHeaderByRfqIdAndVendorId(int vendorid, int rfqid) {

        String url = webservice_ip + "/BuyerPortalWebServices/findContractVendorRfqHeaderByRfqIdAndVendorId.do?rfqid=" + rfqid + "&vendorid=" + vendorid;
        System.out.println("url: " + url);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<ContractVendorRfqHeader>> contractResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ContractVendorRfqHeader>>() {
        });
        List<ContractVendorRfqHeader> supplierHeaderList = contractResponse.getBody();
        System.out.println("supplierHeaderList size: " + supplierHeaderList.size());

        return supplierHeaderList;
    }

    List<RatedParameters> findRatedParamByVendorANDRFQID(int vendorId, int rfqid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findByVendorRFQ.do?vendorId=" + vendorId + "&rfq=" + rfqid;
        System.out.println("url: " + url);
        ResponseEntity<List<RatedParameters>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<RatedParameters>>() {
        });
        List<RatedParameters> list = response.getBody();
        return list;
    }

    List<ContractVendorRfqHeader> getContractHeaderByVendoridAndRfqIdAndStatus(int vendorid, int rfqid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getContractHeaderByVendoridAndRfqIdAndStatus.do?vendorid=" + vendorid + "&rfqid=" + rfqid;
        System.out.println("url:" + url);
        ResponseEntity<List<ContractVendorRfqHeader>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ContractVendorRfqHeader>>() {
        });
        List<ContractVendorRfqHeader> list = (List<ContractVendorRfqHeader>) response.getBody();
        System.out.println("list :" + list);
        return list;
    }

    @RequestMapping(value = "generatePoSavingReport")
    public ModelAndView generatePoSavingReport(HttpServletRequest request, HttpServletResponse response) throws Exception {

        try (ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream()) {

            String poType = request.getParameter("poType");
            System.out.println("poType: " + poType);

            String coCodeFrom = request.getParameter("coCodeFrom");
            String coCodeTo = request.getParameter("coCodeTo");
            String plantFrom = request.getParameter("plantFrom");
            String plantTo = request.getParameter("plantTo");
            String purchasingGroupFrom = request.getParameter("purchasingGroupFrom");
            String purchasingGroupTo = request.getParameter("purchasingGroupTo");
            String purchasingOrgFrom = request.getParameter("purchasingOrgFrom");
            String purchasingOrgTo = request.getParameter("purchasingOrgTo");
            String docTypeFrom = request.getParameter("docTypeFrom");
            String docTypeTo = request.getParameter("docTypeTo");
            String docCatFrom = request.getParameter("docCatFrom");
            String vendorCodeFrom = request.getParameter("vendorCodeFrom");
            String vendorCodeTo = request.getParameter("vendorCodeTo");
            String poNoFrom = request.getParameter("poNoFrom");
            String poNoTo = request.getParameter("poNoTo");
            String grPostingDateFrom = request.getParameter("grPostingDateFrom");
            String grPostingDateTo = request.getParameter("grPostingDateTo");
            String vendorNameFrom = request.getParameter("vendorNameFrom");
            String vendorNameTo = request.getParameter("vendorNameTo");

            System.out.println("coCodeFrom: " + coCodeFrom);
            System.out.println("coCodeTo: " + coCodeTo);
            System.out.println("plantFrom: " + plantFrom);
            System.out.println("plantTo: " + plantTo);
            System.out.println("purchasingGroupFrom: " + purchasingGroupFrom);
            System.out.println("purchasingGroupTo: " + purchasingGroupTo);
            System.out.println("purchasingOrgFrom: " + purchasingOrgFrom);
            System.out.println("purchasingOrgTo: " + purchasingOrgTo);
            System.out.println("docTypeFrom: " + docTypeFrom);
            System.out.println("docTypeTo: " + docTypeTo);
            System.out.println("docCatFrom: " + docCatFrom);
            System.out.println("vendorCodeFrom: " + vendorCodeFrom);
            System.out.println("vendorCodeTo: " + vendorCodeTo);
            System.out.println("poNoFrom: " + poNoFrom);
            System.out.println("poNoTo: " + poNoTo);
            System.out.println("grPostingDateFrom: " + grPostingDateFrom);
            System.out.println("grPostingDateTo: " + grPostingDateTo);
            System.out.println("vendorNameFrom: " + vendorNameFrom);
            System.out.println("vendorNameTo: " + vendorNameTo);

            String fileName = "";
            if (poType != null && poType.equalsIgnoreCase("material")) {
                fileName = "PO Saving Report Material.xls";
                poType = "Material";
            } else if (poType != null && poType.equalsIgnoreCase("service")) {
                fileName = "PO Saving Report Service.xls";
                poType = "Service";
            }
            System.out.println("fileName: " + fileName);

            Date today = new Date();
            DateFormat reportDateFormat = new SimpleDateFormat("dd/MM/yyyy");
            String reportDate = reportDateFormat.format(today);

            DateFormat grPostingDateFormatFrom = new SimpleDateFormat("dd-MM-yyyy");
            DateFormat grPostingDateFormatTo = new SimpleDateFormat("dd/MM/yyyy");
            DateFormat grPostingDBDateFormatTo = new SimpleDateFormat("MM-dd-yyyy");

            String grPostingDBDateFrom = "";
            String grPostingDBDateTo = "";
            if (grPostingDateFrom != null && !grPostingDateFrom.equals("")) {
                Date grPostingDateFrom_Date = grPostingDateFormatFrom.parse(grPostingDateFrom);
                grPostingDateFrom = grPostingDateFormatTo.format(grPostingDateFrom_Date);
                grPostingDBDateFrom = grPostingDBDateFormatTo.format(grPostingDateFrom_Date);
            }
            if (grPostingDateTo != null && !grPostingDateTo.equals("")) {
                Date grPostingDateTo_Date = grPostingDateFormatFrom.parse(grPostingDateTo);
                grPostingDateTo = grPostingDateFormatTo.format(grPostingDateTo_Date);
                grPostingDBDateTo = grPostingDBDateFormatTo.format(grPostingDateTo_Date);
            }
            System.out.println("grPostingDBDateFrom: " + grPostingDBDateFrom);
            System.out.println("grPostingDBDateTo: " + grPostingDBDateTo);

            Map<String, String> selectionParameterMap = new HashMap<>();

            selectionParameterMap.put("reportDate", reportDate);
            selectionParameterMap.put("poType", poType);
            selectionParameterMap.put("coCodeFrom", coCodeFrom);
            selectionParameterMap.put("coCodeTo", coCodeTo);
            selectionParameterMap.put("plantFrom", plantFrom);
            selectionParameterMap.put("plantTo", plantTo);
            selectionParameterMap.put("purchasingGroupFrom", purchasingGroupFrom);
            selectionParameterMap.put("purchasingGroupTo", purchasingGroupTo);
            selectionParameterMap.put("purchasingOrgFrom", purchasingOrgFrom);
            selectionParameterMap.put("purchasingOrgTo", purchasingOrgTo);
            selectionParameterMap.put("docTypeFrom", docTypeFrom);
            selectionParameterMap.put("docTypeTo", docTypeTo);
            selectionParameterMap.put("docCatFrom", docCatFrom);
            selectionParameterMap.put("vendorCodeFrom", vendorCodeFrom);
            selectionParameterMap.put("vendorCodeTo", vendorCodeTo);
            selectionParameterMap.put("poNoFrom", poNoFrom);
            selectionParameterMap.put("poNoTo", poNoTo);
            selectionParameterMap.put("grPostingDateFrom", grPostingDateFrom);
            selectionParameterMap.put("grPostingDateTo", grPostingDateTo);
            selectionParameterMap.put("vendorNameFrom", vendorNameFrom);
            selectionParameterMap.put("vendorNameTo", vendorNameTo);

            System.out.println("selectionParameterMap size: " + selectionParameterMap.size());

            byte[] fileBytes;
            Workbook workbook = new HSSFWorkbook();

            if (poType != null && poType.equalsIgnoreCase("material")) {
                List<PoSavingReportMaterialBean> poSavingReportMaterialBeanList = purchaseOrderWS.callPoSavingReportMaterialStoredProcedure(coCodeFrom, coCodeTo, plantFrom, plantTo, purchasingGroupFrom, purchasingGroupTo, purchasingOrgFrom, purchasingOrgTo, docTypeFrom, docTypeTo, docCatFrom, vendorCodeFrom, vendorCodeTo, poNoFrom, poNoTo, grPostingDBDateFrom, grPostingDBDateTo);
                System.out.println("poSavingReportMaterialBeanList size: " + poSavingReportMaterialBeanList.size());
                workbook = generator.generatePoSavingReportMaterial(workbook, selectionParameterMap, poSavingReportMaterialBeanList);
            } else if (poType != null && poType.equalsIgnoreCase("service")) {
                List<PoSavingReportServiceBean> poSavingReportServiceBeanList = purchaseOrderWS.callPoSavingReportServiceStoredProcedure(coCodeFrom, coCodeTo, plantFrom, plantTo, purchasingGroupFrom, purchasingGroupTo, purchasingOrgFrom, purchasingOrgTo, docTypeFrom, docTypeTo, docCatFrom, vendorCodeFrom, vendorCodeTo, poNoFrom, poNoTo, grPostingDBDateFrom, grPostingDBDateTo);
                System.out.println("poSavingReportServiceBeanList size: " + poSavingReportServiceBeanList.size());
                workbook = generator.generatePoSavingReportService(workbook, selectionParameterMap, poSavingReportServiceBeanList);
            }

            workbook.write(byteArrayOutputStream);
            fileBytes = byteArrayOutputStream.toByteArray();
            System.out.println("fileBytes len: " + fileBytes.length);

            response.setContentType("application/vnd.ms-excel");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
            response.setHeader("cache-control", "no-cache");
            response.setHeader("cache-control", "must-revalidate");

            try (ServletOutputStream out = response.getOutputStream()) {
                out.write(fileBytes);
                out.flush();
            } catch (IOException ex) {
                Logger.getLogger(DownloadAttachment.class.getName()).log(Level.SEVERE, null, ex);
            }
        } catch (FileNotFoundException ex) {
            Logger.getLogger(DownloadAttachment.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(DownloadAttachment.class.getName()).log(Level.SEVERE, null, ex);
        }

        return null;
    }
}
