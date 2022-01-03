/*
* To change this license header, choose License Headers in Project Properties.
* To change this template file, choose Tools | Templates
* and open the template in the editor.
 */
package com.eportal.controller;


import com.eportal.entities.BuyerContractRfqLineItemBean;
import com.eportal.entities.BuyerDetails;
import com.eportal.entities.BuyerRfqLineItemBean;
import com.eportal.entities.BuyerVendorNotification;
import com.eportal.entities.CMHeaderAgreementInfo;
import com.eportal.entities.CMHeaderOLAInfo;
import com.eportal.entities.CMHeaderReferenceInfo;
import com.eportal.entities.CMHeaderTermsDPInfo;
import com.eportal.entities.ContractAttachmentTemp;
import com.eportal.entities.ContractRfpHeader;
import com.eportal.entities.ContractRfqHeader;
import com.eportal.entities.ContractRfqHeaderVendorMapping;
import com.eportal.entities.ContractRfqLineItem;
import com.eportal.entities.ContractVendorRfqHeader;
import com.eportal.entities.ContractVendorRfqLineItem;
import com.eportal.entities.CountryMaster;
import com.eportal.entities.EmailTriggerDetails;
import com.eportal.entities.MasterCountry;
import com.eportal.entities.MasterDeliveryTerms;
import com.eportal.entities.MasterMaterialGeneral;
import com.eportal.entities.MasterPlant;
import com.eportal.entities.MasterPurchaseOrg;
import com.eportal.entities.MasterPurchasingGroup;
import com.eportal.entities.MasterVendor;
import com.eportal.entities.NGExtCM;
import com.eportal.entities.NG_BP_Default_RatedParameters;
import com.eportal.entities.NewgenContractLineItem;
import com.eportal.entities.NewgenPRLineItem;
import com.eportal.entities.PaymentTermsMaster;
import com.eportal.entities.RatedParameters;
//import com.eportal.entities.PRDetails;
import com.eportal.entities.ReasonMaster;
import com.eportal.entities.ReportBuyerAuditLog;
import com.eportal.entities.RfpHeaderVendorMapping;
import com.eportal.entities.RfqHeaderVendorMapping;
import com.eportal.entities.RfqPrLineItemBean;
import com.eportal.entities.SignedContractInput;
import com.eportal.entities.SignedContractoutput;
import com.eportal.entities.SupplierHeader;
import com.eportal.entities.SupplierLineitem;
import com.eportal.entities.SupplierRfpHeader;
import com.eportal.entities.SupplierRfpLineItem;
import com.eportal.entities.VendorDetails;
import com.eportal.entities.VendorGroup;
import com.eportal.entities.VendorRfqLineItemBean;
import com.eportal.entities.WorkOrderAttachmentTemp;
import com.eportal.entities.WorkOrderRfpHeader;
import com.eportal.entities.WorkOrderRfpLineItem;
import com.eportal.entities.WorkOrderRfqHeader;
import com.eportal.entities.WorkOrderRfqLineItem;
import com.eportal.itextPdf.MyFooter;
import com.eportal.newgenControl.GetDocPRRFQInput;
import com.eportal.newgenControl.InputBean;
import com.eportal.newgenControl.InputRfqFormat;
import com.eportal.newgenControl.OutputBean;
import com.eportal.newgenControl.OutputRfqFormat;
import com.eportal.newgenControl.Output_Resp;
import com.eportal.newgenControl.SupportingDocInput;
import com.eportal.util.MailTrigger;
import com.eportal.webservice.util.PurchaseOrderWS;
import com.eportal.webservice.util.RfqRfpWS;
import com.itextpdf.text.BadElementException;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfImportedPage;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfPageEvent;
import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.PdfStamper;
import com.itextpdf.text.pdf.PdfWriter;
//import com.itextpdf.tool.xml.XMLWorkerHelper;
//import com.itextpdf.tool.xml.XMLWorkerHelper;
import com.lowagie.text.FontFactory;
import com.lowagie.text.ListItem;
import com.lowagie.text.Rectangle;
import java.awt.Color;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;

 
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.StringReader;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.net.URI;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONArray;
import org.json.JSONObject;
//import org.jsoup.Jsoup;
//import org.jsoup.Jsoup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

/**
 *
 * @author admin
 */
@Controller

public class RfqRfpManagement {

    @Autowired
    WorkOrderRfqHeader rfqHeader;
    @Autowired
    WorkOrderRfqLineItem rfqLineItem;
    @Value("${webservice.ip}")
    private String webservice_ip;
    @Value("${rfq_pending}")
    private String rfq_pending;
    @Value("${NGwebservice.ip}")
    private String NGwebservice_ip;
    @Autowired
    RfqHeaderVendorMapping rfqVendorMapping;
    @Autowired
    WorkOrderAttachmentTemp workOrderAttTemp;
    @Autowired
    BuyerVendorNotification buyerVendorNotification;
    @Autowired
    WorkOrderRfpHeader rfpHeader;
    @Autowired
    NewgenContractLineItem newgenContractLineItem;
    @Autowired
    ContractRfqLineItem contractRfqLineItem;
    @Value("${rfp_create}")
    private String rfp_create;
    @Autowired
    RfpHeaderVendorMapping rfpHeaderVendorMapping;
    @Autowired
    SupplierHeader supplierHeader;
    @Autowired
    SupplierLineitem supplierLineitem;
    @Autowired
    CountryMaster countryMaster;
    @Autowired
    ContractRfqHeader contractHeader;
    @Autowired
    ContractRfqHeaderVendorMapping contractRfqVendorMapping;
    @Autowired
    EmailTriggerDetails emailTriggerDetails;
    @Autowired
    InputBean newgenRoutingDetails;
    @Autowired
    SupportingDocInput PRLineDocInput;
    @Autowired
    GetDocPRRFQInput getDocPRRFQInput;
    @Autowired
    ReportBuyerAuditLog reportBuyerAuditLog;
    @Autowired
    WorkOrderRfpLineItem rfpLineItem;
    @Autowired
    MailTrigger mailTriggerUtil;
    @Value("${WebServiceCall.ip}")
    private String WebServiceCall_IP;
    @Autowired
    RfqRfpWS rfqRfpUtilWS;
    @Autowired
    InputRfqFormat inputRfqFormatAutowired;
    @Autowired
    PurchaseOrderWS purchaseOrderWSUtil;
    @Autowired
    VendorDetails vendorDetailsEntity;

    @RequestMapping(value = "/rfqevaluation")
    public ModelAndView rfqEvaluation(ModelMap model) {
        System.out.println("rfqevaluation");

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        int buyerid = buyer.getId();

        List<WorkOrderRfqHeader> rfqHeaderList = findRfqHeaderByBuyerIdAndNotInStatus(buyerid);
        System.out.println("rfqHeaderList size: " + rfqHeaderList.size());

        model.put("RfqHeaderList", rfqHeaderList);
        model.put("NGwebserviceIp", NGwebservice_ip);
        model.put("WebServiceCallIp", WebServiceCall_IP);

        return new ModelAndView("rfqevaluation");
    }

    //Girivasu
    @Autowired
    ContractManagement contractManagement;
    @Autowired
    CMHeaderAgreementInfo cMHeaderAgreementInfo;
    @Autowired
    CMHeaderOLAInfo cMHeaderOLAInfo;
    
    @Autowired
    ContractAttachmentTemp contractAttTemp;
    
    @Autowired
    RatedParameters ratedParameters;
    
     @Value("${BuyerPortalWar.ip}")
    private String BuyerPortalWar_ip;
    //Girivasu

    @RequestMapping(value = "/savedRfqDetails")
    public ModelAndView savedRfqDetails(@RequestParam("rfqid") int rfqid, ModelMap model) {
        System.out.println("savedRfqDetails");

        WorkOrderRfqHeader rfqHeaderobj = findRfqHeaderById(rfqid);
        List<PaymentTermsMaster> paymentterm = getAllPaymentTerms();
        List<BuyerRfqLineItemBean> buyerRfqLineItemBeanList = callBuyerRfqPrLineItemStoredProcedure(rfqid);

        model.put("rfqHeader", rfqHeaderobj);
        model.put("paymentterm", paymentterm);
        model.put("buyerRfqLineItemBeanList", buyerRfqLineItemBeanList);

        return new ModelAndView("savedrfqdetails");
    }

    @RequestMapping(value = "/vendorresponses")
    public ModelAndView vendorResponses(ModelMap model) {
        System.out.println("vendorresponses");
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        int buyerid = buyer.getId();
//        List<WorkOrderRfqHeader> rfqHeaderList = findRfqHeaderByBuyerId(buyerid);
        List<WorkOrderRfqHeader> rfqHeaderList = findRfqHeaderByBuyerIdAndNotInStatus(buyerid);
//        List<WorkOrderRfqHeader> rfqHeaderList = findRfqHeaderByBuyerIdAndStatus(buyerid, "Bid Submitted");
        System.out.println("rfqHeaderList size: " + rfqHeaderList.size());
        List<VendorDetails> vendorList = getallvendor();
         List<NG_BP_Default_RatedParameters> ratedParamList = findAllRatedParam();
                String ratedParam = "";

                for (NG_BP_Default_RatedParameters defaultRatedParam : ratedParamList) {
                    if (ratedParam.equals("")) {
                        ratedParam = defaultRatedParam.getParameter();
                    } else {
                        ratedParam = ratedParam + "," + defaultRatedParam.getParameter();
                    }
                }
                
        model.put("ratedParam", ratedParam);
        model.put("VendorList", vendorList);
        model.put("RfqHeaderList", rfqHeaderList);
        model.put("NGwebserviceIp", NGwebservice_ip);
        model.put("WebServiceCallIp", WebServiceCall_IP);

        return new ModelAndView("vendorresponselist");
    }
    
    public List<NG_BP_Default_RatedParameters> findAllRatedParam() {

        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallRatedPrams.do";
        ResponseEntity<List<NG_BP_Default_RatedParameters>> paramList = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NG_BP_Default_RatedParameters>>() {
        });
        System.out.println("vendor: " + paramList);
        List<NG_BP_Default_RatedParameters> ratedParam = paramList.getBody();
        return ratedParam;
    }

    //added by arjun
    @RequestMapping(value = "/vendorresponsescontractList", method = RequestMethod.POST)
    public ModelAndView vendorresponsescontractList(ModelMap model) {
        System.out.println("vendorresponsescontract");
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        int buyerid = buyer.getId();
//        List<WorkOrderRfqHeader> rfqHeaderList = findRfqHeaderByBuyerId(buyerid);
        List<ContractRfqHeader> contractrfqHeaderList = findContractRfqHeaderByBuyerIdAndNotInStatus(buyerid);
//        List<WorkOrderRfqHeader> rfqHeaderList = findRfqHeaderByBuyerIdAndStatus(buyerid, "Bid Submitted");
        System.out.println("contractrfqHeaderList size: " + contractrfqHeaderList.size());
        List<VendorDetails> contractvendorList = getallvendor();
        
         List<NG_BP_Default_RatedParameters> ratedParamList = contractManagement.findAllRatedParam();
        String ratedParam = "";

        for (NG_BP_Default_RatedParameters defaultRatedParam : ratedParamList) {
            if (ratedParam.equals("")) {
                ratedParam = defaultRatedParam.getParameter();
            } else {
                ratedParam = ratedParam + "," + defaultRatedParam.getParameter();
            }
        }
        System.out.println("ratedParam-->"+ratedParam);
         model.put("ratedParam", ratedParam);
        
        model.put("VendorList", contractvendorList);
       
        model.put("contractrfqHeaderList", contractrfqHeaderList);
        model.put("contractRefID", contractrfqHeaderList.get(0).getPid());
        if (contractrfqHeaderList.get(0).getRfqNumber().contains("GRFQ")) {
            model.put("reqType", "Material");
        } else {
            model.put("reqType", "Service");
        }
        return new ModelAndView("contractvendorList");
    }
    
    @RequestMapping(value = "/vendorresponsescontract")
    public ModelAndView vendorresponsescontract(ModelMap model) {
        System.out.println("vendorresponsescontract");
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        int buyerid = buyer.getId();
//        List<WorkOrderRfqHeader> rfqHeaderList = findRfqHeaderByBuyerId(buyerid);
        List<ContractRfqHeader> contractrfqHeaderList = findContractRfqHeaderByBuyerIdAndNotInStatus(buyerid);
//        List<WorkOrderRfqHeader> rfqHeaderList = findRfqHeaderByBuyerIdAndStatus(buyerid, "Bid Submitted");
        System.out.println("contractrfqHeaderList size: " + contractrfqHeaderList.size());
        List<VendorDetails> contractvendorList = getallvendor();
        
         List<NG_BP_Default_RatedParameters> ratedParamList = contractManagement.findAllRatedParam();
        String ratedParam = "";

        for (NG_BP_Default_RatedParameters defaultRatedParam : ratedParamList) {
            if (ratedParam.equals("")) {
                ratedParam = defaultRatedParam.getParameter();
            } else {
                ratedParam = ratedParam + "," + defaultRatedParam.getParameter();
            }
        }
        System.out.println("ratedParam-->"+ratedParam);
         model.put("ratedParam", ratedParam);
        
        model.put("VendorList", contractvendorList);
       
        model.put("contractrfqHeaderList", contractrfqHeaderList);
        model.put("contractRefID", contractrfqHeaderList.get(0).getPid());
        if (contractrfqHeaderList.get(0).getRfqNumber().contains("GRFQ")) {
            model.put("reqType", "Material");
        } else {
            model.put("reqType", "Service");
        }
        return new ModelAndView("contractvendorList");
    }

    @RequestMapping(value = "/createrfp")
    public ModelAndView createRfp(ModelMap model) {
        System.out.println("createrfp");

//        List<VendorDetails> vendorList = findByStatusAndType("Active", "Vendor");
//        List<VendorDetails> prospectList = findByStatusAndType("Active", "Prospect");
        List<VendorGroup> vendorGroupList = getAllVendorGroup();
        List<PaymentTermsMaster> paymentterm = getAllPaymentTerms();
        List<MasterMaterialGeneral> masterMaterialList = getAllMasterMaterialGeneral();
        List<MasterPlant> masterPlantList = getAllMasterPlant();
        List<MasterCountry> countryList = rfqRfpUtilWS.getAllMasterCountry();

        model.put("paymentterm", paymentterm);
//        model.put("VendorList", vendorList);
//        model.put("ProspectList", prospectList);
        model.put("VendorGroupList", vendorGroupList);
        model.put("masterMaterialList", masterMaterialList);
        model.put("masterPlantList", masterPlantList);
        model.put("countryList", countryList);

        return new ModelAndView("createrfp");
    }

    @RequestMapping(value = "/query")
    public ModelAndView query(ModelMap model) {
        System.out.println("query");

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();

        int buyerid = buyer.getId();

        List<WorkOrderRfqHeader> rfqHeaderList = findRfqHeaderByBuyerId(buyerid);
        System.out.println("rfqHeaderList size: " + rfqHeaderList.size());

        model.put("RfqHeaderList", rfqHeaderList);

        return new ModelAndView("querymanagement");
    }

    @RequestMapping(value = "/responsemanagement")
    public ModelAndView queryManagement(@RequestParam("rfqid") int rfqid, @RequestParam("vendorid") int vendorid, @RequestParam("mappingId") int mappingId, ModelMap model) {
        System.out.println("responsemanagement");

        System.out.println("rfqid: " + rfqid);
        System.out.println("vendorid: " + vendorid);
        System.out.println("mappingId: " + mappingId);

        List<BuyerVendorNotification> buyerNotificationList = findBuyerVendorNotificationByRfqAndVendorId(rfqid, vendorid);

        model.put("NotificationList", buyerNotificationList);
        model.put("RfqId", rfqid);
        model.put("Vendor", vendorid);
        model.put("mappingId", mappingId);

        return new ModelAndView("responsemanagement");
    }

    @RequestMapping(value = "/makenotification", method = RequestMethod.POST)
    public ModelAndView makeNotification(@RequestParam("customFile") CommonsMultipartFile attachment, ModelMap model, HttpServletRequest request) {
        System.out.println("makenotification");

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();

        int buyerid = buyer.getId();

        String fileName = attachment.getOriginalFilename();
        long fileSize = attachment.getSize();

        System.out.println("fileName: " + fileName);
        System.out.println("fileSize: " + fileSize);

        String notification = request.getParameter("editordata");
        String rfqid = request.getParameter("rfqid");
        String vendorid = request.getParameter("vendorid");
        String mappingId = request.getParameter("mappingId");

        System.out.println("rfqid: " + rfqid);
        System.out.println("vendorid: " + vendorid);
        System.out.println("buyerid: " + buyerid);
        System.out.println("mappingId: " + mappingId);
        System.out.println("notification: " + notification);

        WorkOrderRfqHeader rfqHeaderObj = findRfqHeaderById(Integer.parseInt(rfqid));
        VendorDetails vendorDetailsObj = findVendorById(Integer.parseInt(vendorid));
        BuyerDetails buyerDetailsObj = findBuyerById(buyerid);

        System.out.println("rfqHeaderObj: " + rfqHeaderObj);
        System.out.println("vendorDetailsObj: " + vendorDetailsObj);
        System.out.println("buyerDetailsObj: " + buyerDetailsObj);

        buyerVendorNotification.setNotification(notification);
        buyerVendorNotification.setCommentdate(new Date());
        buyerVendorNotification.setCommentby("Buyer");
        buyerVendorNotification.setNgBpBuyerdetailsId(buyerDetailsObj);
        buyerVendorNotification.setNgBpVendordetailsId(vendorDetailsObj);
        buyerVendorNotification.setNgBpWorkorderrfqheaderRfqid(rfqHeaderObj);
        buyerVendorNotification.setReadstatus("false");
        buyerVendorNotification.setNotificationtype("RfqNotification");
        buyerVendorNotification.setUrl("responsemanagement.do?rfqid=" + rfqid + "&buyerid=" + buyerid + "&mappingId=" + mappingId);

        if (!attachment.getOriginalFilename().equalsIgnoreCase("")) {
            buyerVendorNotification.setAttachment(attachment.getBytes());
            buyerVendorNotification.setAttachmentname(attachment.getOriginalFilename());

            double sizeInMB = fileSize / Math.pow(1000, 2);

            System.out.println("sizeInMB: " + sizeInMB);
            System.out.println(String.format("%.4f", sizeInMB));

            buyerVendorNotification.setAttachmentsize(String.format("%.4f", sizeInMB) + " MB");

        } else {
            buyerVendorNotification.setAttachment(null);
            buyerVendorNotification.setAttachmentname(null);
            buyerVendorNotification.setAttachmentsize(null);
        }

        String notificationid = saveBuyerVendorNotification(buyerVendorNotification);

        return new ModelAndView("redirect:/responsemanagement.do?rfqid=" + rfqid + "&vendorid=" + vendorid + "&mappingId=" + mappingId);
    }

    @RequestMapping(value = "/makenotificationtoallvendors", method = RequestMethod.POST)
    public ModelAndView makeNotificationToAllVendors(@RequestParam("customFile") CommonsMultipartFile attachment, HttpServletRequest request, RedirectAttributes model) {
        System.out.println("makenotificationtoallvendors");

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();

        int buyerid = buyer.getId();

        String fileName = attachment.getOriginalFilename();
        long fileSize = attachment.getSize();

        System.out.println("fileName: " + fileName);
        System.out.println("fileSize: " + fileSize);

        String notification = request.getParameter("editordata");
        String rfqid = request.getParameter("rfqid");
        String vendorids = request.getParameter("vendorids");
        String mappingIds = request.getParameter("mappingIds");

        System.out.println("rfqid: " + rfqid);
        System.out.println("vendorid: " + vendorids);
        System.out.println("buyerid: " + buyerid);
        System.out.println("mappingIds: " + mappingIds);
        System.out.println("notification: " + notification);

        String[] vendorIdArray = vendorids.split(",");
        String[] mappingIdArray = mappingIds.split(",");

        WorkOrderRfqHeader rfqHeaderObj = findRfqHeaderById(Integer.parseInt(rfqid));
        BuyerDetails buyerDetailsObj = findBuyerById(buyerid);

        System.out.println("rfqHeaderObj: " + rfqHeaderObj);
        System.out.println("buyerDetailsObj: " + buyerDetailsObj);

        buyerVendorNotification.setNotification(notification);
        buyerVendorNotification.setCommentdate(new Date());
        buyerVendorNotification.setCommentby("Buyer");
        buyerVendorNotification.setNgBpBuyerdetailsId(buyerDetailsObj);

        buyerVendorNotification.setNgBpWorkorderrfqheaderRfqid(rfqHeaderObj);
        buyerVendorNotification.setReadstatus("false");

        if (!attachment.getOriginalFilename().equalsIgnoreCase("")) {
            buyerVendorNotification.setAttachment(attachment.getBytes());
            buyerVendorNotification.setAttachmentname(attachment.getOriginalFilename());

            double sizeInMB = fileSize / Math.pow(1000, 2);

            System.out.println("sizeInMB: " + sizeInMB);
            System.out.println(String.format("%.4f", sizeInMB));

            buyerVendorNotification.setAttachmentsize(String.format("%.4f", sizeInMB) + " MB");

        } else {
            buyerVendorNotification.setAttachment(null);
            buyerVendorNotification.setAttachmentname(null);
            buyerVendorNotification.setAttachmentsize(null);
        }

        for (int i = 0; i < vendorIdArray.length; i++) {
            System.out.println("vendorId: " + vendorIdArray[i]);
            System.out.println("mappingId: " + mappingIdArray[i]);

            VendorDetails vendorDetailsObj = findVendorById(Integer.parseInt(vendorIdArray[i]));

            buyerVendorNotification.setNgBpVendordetailsId(vendorDetailsObj);
            buyerVendorNotification.setUrl("responsemanagement.do?rfqid=" + rfqid + "&buyerid=" + buyerid + "&mappingId=" + mappingIdArray[i]);
            saveBuyerVendorNotification(buyerVendorNotification);
        }

        model.addFlashAttribute("message", "Message sent successfully.");

        return new ModelAndView("redirect:/query.do");
    }

    @RequestMapping(value = "/createrfpforpr")
    public ModelAndView createRfpForPR(@RequestParam("prlineids") String prlineids, ModelMap model, HttpServletRequest request) {
        System.out.println("createrfpforpr");
        System.out.println("prlineids: " + prlineids);

        String prtype = request.getParameter("prtype");
        System.out.println("prtype :" + prtype);

        List<RfqPrLineItemBean> rfqPrLineItemBeanList = callRfqPrLineItemsStoredProcedure(prlineids);

        List<NewgenPRLineItem> prList = findByMultipleNewgenPRLineItemId(prlineids);
        System.out.println("prList size: " + prList.size());

//        List<VendorDetails> vendorList = findByStatusAndType("Active", "Vendor");
//        List<VendorDetails> prospectList = findByStatusAndType("Active", "Prospect");
//        System.out.println("vendorList size: " + vendorList.size());
//        System.out.println("prospectList size: " + prospectList.size());
        List<VendorGroup> vendorGroupList = getAllVendorGroup();

//        List<VendorDetails> vendor = getAllVendor();
        List<MasterCountry> countryList = rfqRfpUtilWS.getAllMasterCountry();
        List<PaymentTermsMaster> paymentterm = getAllPaymentTerms();
        List<MasterDeliveryTerms> deliveryterm = getAllDeliveryTerms();

        Date today = new Date();

        model.put("todaydate", today);
        model.put("prtype", prtype);
        model.put("countryList", countryList);
//        model.put("VendorList", vendorList);
//        model.put("ProspectList", prospectList);
        model.put("PrList", prList);
        model.put("VendorGroupList", vendorGroupList);
//        model.put("Vendor", vendor);
        model.put("paymentterm", paymentterm);
        model.put("deliveryterm", deliveryterm);
        model.put("rfqPrLineItemBeanList", rfqPrLineItemBeanList);

        return new ModelAndView("createrfq");
    }

    @RequestMapping(value = "/createrfqforcontract", method = RequestMethod.GET)
    public ModelAndView createRfqForContract(HttpServletRequest request, ModelMap model) {
        System.out.println("createrfqforcontract");

        String contractRefId = request.getParameter("contractRefId");
        System.out.println("contractRefId :" + contractRefId);

        String contractType = request.getParameter("contractType");
        System.out.println("contractType:" + contractType);

        List<VendorDetails> vendorList = findByStatusAndType("Active", "Vendor");
        System.out.println("vendorList size: " + vendorList.size());

        List<VendorDetails> prospectList = findByStatusAndType("Active", "Prospect");
        System.out.println("prospectList size: " + prospectList.size());

        List<VendorGroup> vendorGroupList = getAllVendorGroup();
        System.out.println("vendorGroupList size :" + vendorGroupList.size());

        List<NGExtCM> contract = findContractLineItemByMultipleId(contractRefId);

        System.out.println("contractList size :" + contract.size());
        List<NewgenContractLineItem> contractList = findContractLineByPID(contract.get(0).getPid());
        System.out.println("obj in Bitttu :" + contractList);
        List<PaymentTermsMaster> paymentterm = getAllPaymentTerms();
        System.out.println("paymentterm size :" + paymentterm.size());
        List<MasterDeliveryTerms> deliveryterm = getAllDeliveryTerms();
        System.out.println("deliveryterm size :" + deliveryterm.size());

        List<VendorDetails> vendor = getAllVendor();
        List<CountryMaster> countryList = getAllCountry();

        model.put("countryList", countryList);
        model.addAttribute("VendorList", vendorList);
        model.addAttribute("ProspectList", prospectList);
        model.addAttribute("contractList", contractList);
        model.put("VendorGroupList", vendorGroupList);
        model.put("Vendor", vendor);
        model.put("contractType", contractType);
        model.put("paymentterm", paymentterm);
        model.put("deliveryterm", deliveryterm);
        model.put("contractRefId", contractRefId);

        List<NG_BP_Default_RatedParameters> ratedParamList = contractManagement.findAllRatedParam();
        String ratedParam = "";

        for (NG_BP_Default_RatedParameters defaultRatedParam : ratedParamList) {
            if (ratedParam.equals("")) {
                ratedParam = defaultRatedParam.getParameter();
            } else {
                ratedParam = ratedParam + "," + defaultRatedParam.getParameter();
            }
        }
        System.out.println("ratedParam-->"+ratedParam);
         model.put("ratedParam", ratedParam);

        List<MasterPurchasingGroup> masterPurchasingGroupList = contractManagement.findAllMasterPurchaseGroup();
        List<MasterPurchaseOrg> purchaseList = contractManagement.getAllPurchaseOrg();
        model.put("purchaseList", purchaseList);
        model.put("masterPurchasingGroupList", masterPurchasingGroupList);

        return new ModelAndView("createrfqforcontract");
    }

    @RequestMapping(value = "/mytask")
    public ModelAndView MyTask(ModelMap model) {
        System.out.println("mytask");
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        int buyerid = buyer.getId();

        List<WorkOrderRfqHeader> rfqHeaderList = findRfqHeaderByBuyerId(buyerid);
        System.out.println("rfqHeaderList size: " + rfqHeaderList.size());

        List<ContractRfqHeader> contractRfqHeaderList = findContractRfqHeaderByBuyerId(buyerid);
        System.out.println("contractRfqHeaderList size: " + contractRfqHeaderList.size());
        model.put("RfqHeaderList", rfqHeaderList);
        model.put("ContractRfqHeaderList", contractRfqHeaderList);
        // model.put("vendorList",vendorArr);

        return new ModelAndView("mytask");
    }

    @RequestMapping(value = "/rfqdetails")
    public ModelAndView showRfqDetails(@RequestParam("rfqid") int rfqid, ModelMap model) {
        System.out.println("rfqdetails");
        System.out.println("rfqid in rfqdetails :" + +rfqid);

        WorkOrderRfqHeader rfqHeaderObj = findRfqHeaderById(rfqid);

        List<WorkOrderRfqLineItem> rfqLineItemList = findRfqLineItemByRfqId(rfqid);
        System.out.println("rfqLineItemList size: " + rfqLineItemList.size());
        List<BuyerRfqLineItemBean> buyerRfqLineItemBeanList = callBuyerRfqPrLineItemStoredProcedure(rfqid);

        List<RfqHeaderVendorMapping> vendorList = findVendorByRfqIdAndStatus(rfqid);
//        List<RfqHeaderVendorMapping> vendorList = findVendorByRfqId(rfqid);

        List<SupplierHeader> supplierHeadersList = (List<SupplierHeader>) getSupplierHeaderByRfqId(rfqid);
        List<VendorDetails> activeVendorList = findByStatusAndType("Active", "Vendor");
        List<VendorDetails> activeProspectList = findByStatusAndType("Active", "Prospect");

        List<VendorDetails> vendor = getAllVendor();

        System.out.println("NGWebserviceIp: " + NGwebservice_ip);
        System.out.println("WebServiceCallIp: " + WebServiceCall_IP);

        List<PaymentTermsMaster> paymentterm = getAllPaymentTerms();

        model.put("paymentterm", paymentterm);
        model.put("RfqHeader", rfqHeaderObj);
        model.put("RfqLineItemList", rfqLineItemList);
        model.put("VendorMappingList", vendorList);
        model.put("Vendor", vendor);
        model.put("supplierHeadersList", supplierHeadersList);
        model.addAttribute("VendorList", activeVendorList);
        model.addAttribute("ProspectList", activeProspectList);
        model.addAttribute("buyerRfqLineItemBeanList", buyerRfqLineItemBeanList);
        model.addAttribute("NGwebserviceIp", NGwebservice_ip);
        model.addAttribute("WebServiceCallIp", WebServiceCall_IP);

        List<ReasonMaster> reasonList = findAllReason();
        model.put("ReasonList", reasonList);

        return new ModelAndView("rfqdetails");
    }

    @RequestMapping(value = "/submitrfqprlineattachment", method = RequestMethod.POST)
    public void submitRfqPrLineAttachment(@RequestParam("file_docDiv1") CommonsMultipartFile attachment1, @RequestParam("file_docDiv2") CommonsMultipartFile attachment2,
            @RequestParam("file_docDiv3") CommonsMultipartFile attachment3, @RequestParam("file_docDiv4") CommonsMultipartFile attachment4,
            @RequestParam("file_docDiv5") CommonsMultipartFile attachment5,
            HttpServletRequest request, HttpServletResponse response, Map<String, Object> modalMap) {

        PrintWriter out = null;
        try {
            System.out.println("submitrfqprlineattachment============");

            JSONArray jArra = new JSONArray();
            JSONObject jObj = new JSONObject();

            out = response.getWriter();

            String linkId = request.getParameter("linkId");
            String procInstId = request.getParameter("procInstId");
            String currentWorkstep = request.getParameter("currentWorkstep");
            String requester = request.getParameter("requester");
            String materialCode = request.getParameter("materialCode");
            String shortText = request.getParameter("shortText");
            String quantity = request.getParameter("quantity");

            System.out.println("linkId: " + linkId);
            System.out.println("procInstId: " + procInstId);
            System.out.println("currentWorkstep: " + currentWorkstep);
            System.out.println("requester: " + requester);
            System.out.println("materialCode: " + materialCode);
            System.out.println("shortText: " + shortText);
            System.out.println("quantity: " + quantity);

            System.out.println("file name 1: " + attachment1.getOriginalFilename());
            System.out.println("file name 2: " + attachment2.getOriginalFilename());
            System.out.println("file name 3: " + attachment3.getOriginalFilename());
            System.out.println("file name 4: " + attachment4.getOriginalFilename());
            System.out.println("file name 5: " + attachment5.getOriginalFilename());

//            SupportingDocInput PRLineDocInput = new SupportingDocInput();
            if (!attachment1.getOriginalFilename().equalsIgnoreCase("")) {
                workOrderAttTemp.setAttachment1(attachment1.getBytes());
                workOrderAttTemp.setAttachment1name(attachment1.getOriginalFilename());

                PRLineDocInput.setAttachment1(attachment1.getBytes());
                PRLineDocInput.setAttachment1name(attachment1.getOriginalFilename());
            } else {
                workOrderAttTemp.setAttachment1(null);
                workOrderAttTemp.setAttachment1name(null);

                PRLineDocInput.setAttachment1(null);
                PRLineDocInput.setAttachment1name(null);
            }

            if (!attachment2.getOriginalFilename().equalsIgnoreCase("")) {
                workOrderAttTemp.setAttachment2(attachment2.getBytes());
                workOrderAttTemp.setAttachment2name(attachment2.getOriginalFilename());

                PRLineDocInput.setAttachment2(attachment2.getBytes());
                PRLineDocInput.setAttachment2name(attachment2.getOriginalFilename());
            } else {
                workOrderAttTemp.setAttachment2(null);
                workOrderAttTemp.setAttachment2name(null);

                PRLineDocInput.setAttachment2(null);
                PRLineDocInput.setAttachment2name(null);
            }

            if (!attachment3.getOriginalFilename().equalsIgnoreCase("")) {
                workOrderAttTemp.setAttachment3(attachment3.getBytes());
                workOrderAttTemp.setAttachment3name(attachment3.getOriginalFilename());

                PRLineDocInput.setAttachment3(attachment3.getBytes());
                PRLineDocInput.setAttachment3name(attachment3.getOriginalFilename());
            } else {
                workOrderAttTemp.setAttachment3(null);
                workOrderAttTemp.setAttachment3name(null);

                PRLineDocInput.setAttachment3(null);
                PRLineDocInput.setAttachment3name(null);
            }

            if (!attachment4.getOriginalFilename().equalsIgnoreCase("")) {
                workOrderAttTemp.setAttachment4(attachment4.getBytes());
                workOrderAttTemp.setAttachment4name(attachment4.getOriginalFilename());

                PRLineDocInput.setAttachment4(attachment4.getBytes());
                PRLineDocInput.setAttachment4name(attachment4.getOriginalFilename());
            } else {
                workOrderAttTemp.setAttachment4(null);
                workOrderAttTemp.setAttachment4name(null);

                PRLineDocInput.setAttachment4(null);
                PRLineDocInput.setAttachment4name(null);
            }

            if (!attachment5.getOriginalFilename().equalsIgnoreCase("")) {
                workOrderAttTemp.setAttachment5(attachment5.getBytes());
                workOrderAttTemp.setAttachment5name(attachment5.getOriginalFilename());

                PRLineDocInput.setAttachment5(attachment5.getBytes());
                PRLineDocInput.setAttachment5name(attachment5.getOriginalFilename());
            } else {
                workOrderAttTemp.setAttachment5(null);
                workOrderAttTemp.setAttachment5name(null);

                PRLineDocInput.setAttachment5(null);
                PRLineDocInput.setAttachment5name(null);
            }

            //Newgen
//            PRLineDocInput.setLinkID(linkId);
//            PRLineDocInput.setPID(procInstId);
//            PRLineDocInput.setQuantity(quantity);
//            PRLineDocInput.setWorkstep(currentWorkstep);
//            PRLineDocInput.setShortText(shortText);
//            PRLineDocInput.setRequestorID(requester);
//            PRLineDocInput.setMaterialCode(materialCode);
//
//            String message = newgenDocControl(PRLineDocInput);
//            System.out.println("message: " + message);
//            GetDocPRRFQInput getDocPRRFQInput = new GetDocPRRFQInput();
            // to Attach RFQ Document, this is sample, use this code where you required - Added By Devi
//            getDocPRRFQInput.setRfqAttachment(attachment1.getBytes());
//            getDocPRRFQInput.setRfqAttachname("PDF of RFQ.pdf"); //Attachment Name
//
//            getDocPRRFQInput.setRequestorID("pouser"); //Name of buyer
//            getDocPRRFQInput.setRfqno("SRFQ-18-07-19-001"); // RFQ No
//
//            String m1 = newgenRFQDocControl(getDocPRRFQInput);
//            System.out.println("getDocPRRFQInput" + m1);
            //Newgen
            workOrderAttTemp.setLinkID(linkId);
            workOrderAttTemp.setpID(procInstId);
            workOrderAttTemp.setQuantity(quantity);
            workOrderAttTemp.setWorkstep(currentWorkstep);
            workOrderAttTemp.setShortText(shortText);
            workOrderAttTemp.setRequestorID(requester);
            workOrderAttTemp.setMaterialCode(materialCode);

            String attId = saveWorkOrderAttachmentTemp(workOrderAttTemp);

            jObj.put("TempAttachmentId", attId);

            out.println(jObj);
        } catch (IOException ex) {
            Logger.getLogger(RfqRfpManagement.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            if (out != null) {
                out.close();
            }
        }
    }
    
    @RequestMapping(value = "/submitrfqcontractlineattachment", method = RequestMethod.POST)
    public void submitRfqContractLineAttachment(@RequestParam("file_docDiv1") CommonsMultipartFile attachment1, @RequestParam("file_docDiv2") CommonsMultipartFile attachment2,
            @RequestParam("file_docDiv3") CommonsMultipartFile attachment3, @RequestParam("file_docDiv4") CommonsMultipartFile attachment4,
            @RequestParam("file_docDiv5") CommonsMultipartFile attachment5,
            HttpServletRequest request, HttpServletResponse response, Map<String, Object> modalMap) {

        PrintWriter out = null;
        try {
            System.out.println("submitrfqcontractlineattachment============");

            JSONArray jArra = new JSONArray();
            JSONObject jObj = new JSONObject();

            out = response.getWriter();

            String linkId = request.getParameter("linkId");
            String procInstId = request.getParameter("procInstId");
            String currentWorkstep = request.getParameter("currentWorkstep");
            String requester = request.getParameter("requester");
            String materialCode = request.getParameter("materialCode");
            String shortText = request.getParameter("shortText");
            String quantity = request.getParameter("quantity");

            System.out.println("linkId: " + linkId);
            System.out.println("procInstId: " + procInstId);
            System.out.println("currentWorkstep: " + currentWorkstep);
            System.out.println("requester: " + requester);
            System.out.println("materialCode: " + materialCode);
            System.out.println("shortText: " + shortText);
            System.out.println("quantity: " + quantity);

            System.out.println("file name 1: " + attachment1.getOriginalFilename());
            System.out.println("file name 2: " + attachment2.getOriginalFilename());
            System.out.println("file name 3: " + attachment3.getOriginalFilename());
            System.out.println("file name 4: " + attachment4.getOriginalFilename());
            System.out.println("file name 5: " + attachment5.getOriginalFilename());

//            SupportingDocInput PRLineDocInput = new SupportingDocInput();
            if (!attachment1.getOriginalFilename().equalsIgnoreCase("")) {
                contractAttTemp.setAttachment1(attachment1.getBytes());
                contractAttTemp.setAttachment1name(attachment1.getOriginalFilename());

                PRLineDocInput.setAttachment1(attachment1.getBytes());
                PRLineDocInput.setAttachment1name(attachment1.getOriginalFilename());
            } else {
                contractAttTemp.setAttachment1(null);
                contractAttTemp.setAttachment1name(null);

                PRLineDocInput.setAttachment1(null);
                PRLineDocInput.setAttachment1name(null);
            }

            if (!attachment2.getOriginalFilename().equalsIgnoreCase("")) {
                contractAttTemp.setAttachment2(attachment2.getBytes());
                contractAttTemp.setAttachment2name(attachment2.getOriginalFilename());

                PRLineDocInput.setAttachment2(attachment2.getBytes());
                PRLineDocInput.setAttachment2name(attachment2.getOriginalFilename());
            } else {
                contractAttTemp.setAttachment2(null);
                contractAttTemp.setAttachment2name(null);

                PRLineDocInput.setAttachment2(null);
                PRLineDocInput.setAttachment2name(null);
            }

            if (!attachment3.getOriginalFilename().equalsIgnoreCase("")) {
                contractAttTemp.setAttachment3(attachment3.getBytes());
                contractAttTemp.setAttachment3name(attachment3.getOriginalFilename());

                PRLineDocInput.setAttachment3(attachment3.getBytes());
                PRLineDocInput.setAttachment3name(attachment3.getOriginalFilename());
            } else {
                contractAttTemp.setAttachment3(null);
                contractAttTemp.setAttachment3name(null);

                PRLineDocInput.setAttachment3(null);
                PRLineDocInput.setAttachment3name(null);
            }

            if (!attachment4.getOriginalFilename().equalsIgnoreCase("")) {
                contractAttTemp.setAttachment4(attachment4.getBytes());
                contractAttTemp.setAttachment4name(attachment4.getOriginalFilename());

                PRLineDocInput.setAttachment4(attachment4.getBytes());
                PRLineDocInput.setAttachment4name(attachment4.getOriginalFilename());
            } else {
                contractAttTemp.setAttachment4(null);
                contractAttTemp.setAttachment4name(null);

                PRLineDocInput.setAttachment4(null);
                PRLineDocInput.setAttachment4name(null);
            }

            if (!attachment5.getOriginalFilename().equalsIgnoreCase("")) {
                contractAttTemp.setAttachment5(attachment5.getBytes());
                contractAttTemp.setAttachment5name(attachment5.getOriginalFilename());

                PRLineDocInput.setAttachment5(attachment5.getBytes());
                PRLineDocInput.setAttachment5name(attachment5.getOriginalFilename());
            } else {
                contractAttTemp.setAttachment5(null);
                contractAttTemp.setAttachment5name(null);

                PRLineDocInput.setAttachment5(null);
                PRLineDocInput.setAttachment5name(null);
            }

            //Newgen
//            PRLineDocInput.setLinkID(linkId);
//            PRLineDocInput.setPID(procInstId);
//            PRLineDocInput.setQuantity(quantity);
//            PRLineDocInput.setWorkstep(currentWorkstep);
//            PRLineDocInput.setShortText(shortText);
//            PRLineDocInput.setRequestorID(requester);
//            PRLineDocInput.setMaterialCode(materialCode);
//
//            String message = newgenDocControl(PRLineDocInput);
//            System.out.println("message: " + message);
//            GetDocPRRFQInput getDocPRRFQInput = new GetDocPRRFQInput();
            // to Attach RFQ Document, this is sample, use this code where you required - Added By Devi
//            getDocPRRFQInput.setRfqAttachment(attachment1.getBytes());
//            getDocPRRFQInput.setRfqAttachname("PDF of RFQ.pdf"); //Attachment Name
//
//            getDocPRRFQInput.setRequestorID("pouser"); //Name of buyer
//            getDocPRRFQInput.setRfqno("SRFQ-18-07-19-001"); // RFQ No
//
//            String m1 = newgenRFQDocControl(getDocPRRFQInput);
//            System.out.println("getDocPRRFQInput" + m1);
            //Newgen
            contractAttTemp.setLinkID(linkId);
            contractAttTemp.setpID(procInstId);
            contractAttTemp.setQuantity(quantity);
            contractAttTemp.setWorkstep(currentWorkstep);
            contractAttTemp.setShortText(shortText);
            contractAttTemp.setRequestorID(requester);
            contractAttTemp.setMaterialCode(materialCode);

            String attId = saveContractAttachmentTemp(contractAttTemp);

            jObj.put("TempAttachmentId", attId);

            out.println(jObj);
        } catch (IOException ex) {
            Logger.getLogger(RfqRfpManagement.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            if (out != null) {
                out.close();
            }
        }
    }

    @RequestMapping(value = "/submitrfqdetails", method = RequestMethod.POST)
    public ModelAndView submitRfqDetails(HttpServletRequest request, HttpServletResponse response, Map<String, Object> modalMap, RedirectAttributes redirect) {
        System.out.println("submitrfqdetails");
        try {
            DateFormat format = new SimpleDateFormat("dd.MM.yyyy");
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
            int buyerid = buyer.getId();
            Date today = new Date();

            String vendorname = request.getParameter("ro_vendorname");
            String sapVendorCodes = request.getParameter("ro_sapVendorCode");
            String deliveryTerms = request.getParameter("ro_deliveryterms");
            String paymentterms = request.getParameter("ro_paymentterms");
            String rfqvaliduntil = request.getParameter("ro_rfqvaliduntil");
            String expecteddeliverydate = request.getParameter("ro_expecteddeliverydate");
            String RFQTitle = request.getParameter("RFQTitle");
            String rfqstatus = request.getParameter("rfqstatus");
            String initiatorname = request.getParameter("initiatorname");
            String rfqRequestDate = request.getParameter("rfqRequestDate");
            String projectnamecode = request.getParameter("projectnamecode");
            String contactpersonename = request.getParameter("contactpersonename");
            String contactpersonetelno = request.getParameter("contactpersonetelno");
            String contactpersoneemail = request.getParameter("contactpersoneemail");
            String costcode = request.getParameter("costcode");
            String negotationstyle = request.getParameter("negotationstyle");
            String billtoaddress = request.getParameter("billtoaddress");
            String shiptoaddress = request.getParameter("shiptoaddress");
            String description = request.getParameter("description");
            String autosendpo = request.getParameter("ro_AutoSendPO");
            String notifyvendor = request.getParameter("ro_NotifyVendor");
            String vendorrecipients = request.getParameter("ro_VendorRecipients");
            String internalrecipients = request.getParameter("ro_InternalRecipients");
            String comments = request.getParameter("ro_comment");
            String agreementdate = request.getParameter("agreementdate");
            String validitystartdate = request.getParameter("validitystartdate");
            String validityenddate = request.getParameter("validityenddate");
            String PurchOrganization = request.getParameter("PurchOrganization");
            String PurchaseGroup = request.getParameter("PurchaseGroup");

            String pr_ids = request.getParameter("pr_ids");
            String pr_quantity = request.getParameter("pr_quantity");
            String pr_att_temp_ids = request.getParameter("pr_att_temp_ids");
            String pr_notestosuppler = request.getParameter("ro_notestosuppler");
            String prtype = request.getParameter("prtype");
            String selectparameters = request.getParameter("ro_selectparameters");
            String ratedParameterHidden = request.getParameter("ratedParameterHidden");
            String ratedParameterWeigthHidden = request.getParameter("ratedParameterWeigthHidden");

            System.out.println("vendorname: " + vendorname);
            System.out.println("sapVendorCodes: " + sapVendorCodes);

            String[] ratedParameterHiddenArray = ratedParameterHidden.split(",");
            String[] ratedParameterWeigthHiddenArray = ratedParameterWeigthHidden.split(",");

            for (int i = 0; i < ratedParameterHiddenArray.length; i++) {
                if (null != ratedParameterHiddenArray[i]) {
                    switch (ratedParameterHiddenArray[i]) {

                        case "MoqMovDetailsRatedParameter":
                            rfqHeader.setmOQMOVDetailsRatedParameter("true");
                            rfqHeader.setmOQMOVDetailsRatedParameterWeight(ratedParameterWeigthHiddenArray[i]);
                            break;
                        case "DeliveryLeadTimeRatedParameter":
                            rfqHeader.setDeliveryLeadTImeRatedParameter("true");
                            rfqHeader.setDeliveryLeadTImeRatedParameterWeight(ratedParameterWeigthHiddenArray[i]);
                            break;
                        case "PaymentTermsRatedParameter":
                            rfqHeader.setPaymentTermsRatedParameter("true");
                            rfqHeader.setPaymentTermsRatedParameterWeight(ratedParameterWeigthHiddenArray[i]);
                            break;
                        case "BrandModelRatedParameter":
                            rfqHeader.setBrandModelRatedParameter("true");
                            rfqHeader.setBrandModelRatedParameterWeight(ratedParameterWeigthHiddenArray[i]);
                            break;
                        case "IncotermsRatedParameter":
                            rfqHeader.setIncotermsRatedParameter("true");
                            rfqHeader.setIncotermsRatedParameterWeight(ratedParameterWeigthHiddenArray[i]);
                            break;
                        case "ValidityOfOfferRatedParameter":
                            rfqHeader.setValidityOfferRatedParameter("true");
                            rfqHeader.setValidityOfferRatedParameterWeight(ratedParameterWeigthHiddenArray[i]);
                            break;
                    }
                }
            }

            Date rfqvaliduntilDate = null;
            if (rfqvaliduntil != null) {
                rfqvaliduntilDate = format.parse(rfqvaliduntil);
                System.out.println("rfqvaliduntilDate: " + rfqvaliduntilDate);
            }
            Date expecteddeliverydateDate = null;
            if (expecteddeliverydate != null) {
                expecteddeliverydateDate = format.parse(expecteddeliverydate);
                System.out.println("expecteddeliverydateDate: " + expecteddeliverydateDate);
            }
            Date rfqRequestDateDate = null;
            if (rfqRequestDate != null) {
                rfqRequestDateDate = format.parse(rfqRequestDate);
                System.out.println("rfqRequestDateDate: " + rfqRequestDateDate);
            }
            int vendorCount = 0;
            if (vendorname != null && !vendorname.trim().equals("")) {
                List<String> vendorids = Arrays.asList(vendorname.split("\\s*,\\s*"));
                vendorCount += vendorids.size();
            }
            if (sapVendorCodes != null && !sapVendorCodes.trim().equals("")) {
                List<String> sapVendorIds = Arrays.asList(sapVendorCodes.split("\\s*,\\s*"));
                vendorCount += sapVendorIds.size();
            }
            System.out.println("vendorCount: " + vendorCount);

            rfqHeader.setVendorCount(vendorCount);
            rfqHeader.setRFQTitle(RFQTitle);
            rfqHeader.setRfqstatus(rfq_pending);
            rfqHeader.setRfqRequestDate(rfqRequestDateDate);
            rfqHeader.setProjectnamecode(projectnamecode);
            rfqHeader.setContactpersonename(contactpersonename);
            rfqHeader.setContactpersonetelno(contactpersonetelno);
            rfqHeader.setContactpersoneemail(contactpersoneemail);
            rfqHeader.setCostcode(costcode);
            rfqHeader.setNegotationstyle(negotationstyle);
            rfqHeader.setBilltoaddress(billtoaddress);
            rfqHeader.setShiptoaddress(shiptoaddress);
            rfqHeader.setDescription(description);
            rfqHeader.setCreationdate(today);
            rfqHeader.setUpdatedate(today);
            rfqHeader.setDeliveryterms(deliveryTerms);
            rfqHeader.setPaymentterms(paymentterms);
            rfqHeader.setNgBpBuyerdetailsId(buyer);
            rfqHeader.setRfqvaliduntil(rfqvaliduntilDate);
            rfqHeader.setExpectedDeliveryDate(expecteddeliverydateDate);
            rfqHeader.setAutosendPO(autosendpo);
            rfqHeader.setNotifyVendor(notifyvendor);
            rfqHeader.setVendorRecipients(vendorrecipients);
            rfqHeader.setComment(comments);
            rfqHeader.setInternalRecipients(internalrecipients);

            String rfqid = saveRfqHeader(rfqHeader, prtype);
            System.out.println("rfqid: " + rfqid);

            WorkOrderRfqHeader rfqHeaderobj = findRfqHeaderById(Integer.parseInt(rfqid));

            String rfqNumber = rfqHeaderobj.getRfqNumber();
            redirect.addFlashAttribute("RfqNumber", rfqNumber);
            redirect.addFlashAttribute("RfqId", rfqid);

            reportBuyerAuditLog.setActivityPerformed(rfqNumber + " Created");
            reportBuyerAuditLog.setCreatedate(new Date());
            reportBuyerAuditLog.setNgBpBuyerdetailsId(buyer);
            saveBuyerAuditLogReport(reportBuyerAuditLog);

            pr_ids = pr_ids.substring(0, pr_ids.length() - 1);
            pr_quantity = pr_quantity.substring(0, pr_quantity.length() - 1);
            pr_att_temp_ids = pr_att_temp_ids.substring(0, pr_att_temp_ids.length() - 1);
            pr_notestosuppler = pr_notestosuppler.substring(0, pr_notestosuppler.length() - 1);

            System.out.println("pr_ids: " + pr_ids);
            System.out.println("pr_quantity: " + pr_quantity);
            System.out.println("pr_att_temp_ids: " + pr_att_temp_ids);
            System.out.println("pr_notestosuppler: " + pr_notestosuppler);

            List<NewgenPRLineItem> newgenList = findByMultipleNewgenPRLineItemId(pr_ids);

            String[] pr_ids_array = pr_ids.split(",");
            String[] pr_quantity_array = pr_quantity.split(",");
            String[] pr_att_temp_ids_array = pr_att_temp_ids.split(",");
            String[] pr_notesto_suppler = pr_notestosuppler.split(",");

            for (int i = 0; i < pr_ids_array.length; i++) {

                NewgenPRLineItem newgen = newgenList.get(i);
                rfqLineItem.setItemNumber(((i + 1) * 10) + "");
                rfqLineItem.setQuantity(pr_quantity_array[i]);
                rfqLineItem.setBPaasWorkOrderRFQHeaderRFQID(rfqHeaderobj);
                rfqLineItem.setNgBpNewgenPRLineItemId(newgenList.get(i));                   //Newgen
                try {
                    rfqLineItem.setNotesToSupplier(pr_notesto_suppler[i]);
                } catch (ArrayIndexOutOfBoundsException ex) {
                    System.out.println("ex: " + ex);
                    rfqLineItem.setNotesToSupplier(null);
                }

                if (pr_att_temp_ids_array[i] != null && !pr_att_temp_ids_array[i].equalsIgnoreCase("non") && !pr_att_temp_ids_array[i].equalsIgnoreCase("")) {

                    WorkOrderAttachmentTemp obj = findPrLineItemTempAttachmentById(Integer.parseInt(pr_att_temp_ids_array[i]));

                    rfqLineItem.setAttachment1(obj.getAttachment1());
                    rfqLineItem.setAttachment1name(obj.getAttachment1name());

                    rfqLineItem.setAttachment2(obj.getAttachment2());
                    rfqLineItem.setAttachment2name(obj.getAttachment2name());

                    rfqLineItem.setAttachment3(obj.getAttachment3());
                    rfqLineItem.setAttachment3name(obj.getAttachment3name());

                    rfqLineItem.setAttachment4(obj.getAttachment4());
                    rfqLineItem.setAttachment4name(obj.getAttachment4name());

                    rfqLineItem.setAttachment5(obj.getAttachment5());
                    rfqLineItem.setAttachment5name(obj.getAttachment5name());

                    PRLineDocInput.setRfqNo(rfqNumber);
                    PRLineDocInput.setLinkID(obj.getLinkID());
                    PRLineDocInput.setPID(obj.getpID());
                    PRLineDocInput.setQuantity(obj.getQuantity());
                    PRLineDocInput.setWorkstep(obj.getWorkstep());
                    PRLineDocInput.setShortText(obj.getShortText());
                    PRLineDocInput.setRequestorID(obj.getRequestorID());
                    PRLineDocInput.setMaterialCode(obj.getMaterialCode());
                    PRLineDocInput.setVendorID("");

                    PRLineDocInput.setAttachment1(obj.getAttachment1());
                    PRLineDocInput.setAttachment1name(obj.getAttachment1name());
                    PRLineDocInput.setAttachment2(obj.getAttachment2());
                    PRLineDocInput.setAttachment2name(obj.getAttachment2name());
                    PRLineDocInput.setAttachment3(obj.getAttachment3());
                    PRLineDocInput.setAttachment3name(obj.getAttachment3name());
                    PRLineDocInput.setAttachment4(obj.getAttachment4());
                    PRLineDocInput.setAttachment4name(obj.getAttachment4name());
                    PRLineDocInput.setAttachment5(obj.getAttachment5());
                    PRLineDocInput.setAttachment5name(obj.getAttachment5name());

                    try {
                        Output_Resp DMSUploadResponse = newgenDocControl(PRLineDocInput);
                        System.out.println("DMSUploadResponse: " + DMSUploadResponse);

                        redirect.addFlashAttribute("DMSUploadResponseMainCode", DMSUploadResponse.getMainCode());
                        redirect.addFlashAttribute("DMSUploadResponsePID", DMSUploadResponse.getProcessInstanceID());
                        redirect.addFlashAttribute("DMSUploadResponseMessage", DMSUploadResponse.getMessage());
                    } catch (Exception e) {
                        redirect.addFlashAttribute("DMSUploadFailed", "Document upload to DMS has failed!");
                    }

                } else {
                    rfqLineItem.setAttachment1(null);
                    rfqLineItem.setAttachment1name(null);

                    rfqLineItem.setAttachment2(null);
                    rfqLineItem.setAttachment2name(null);

                    rfqLineItem.setAttachment3(null);
                    rfqLineItem.setAttachment3name(null);

                    rfqLineItem.setAttachment4(null);
                    rfqLineItem.setAttachment4name(null);

                    rfqLineItem.setAttachment5(null);
                    rfqLineItem.setAttachment5name(null);
                }

                String id = saveRfqHeaderLineItem(rfqLineItem);
                System.out.println("line item id: " + id);

                if (Double.parseDouble(pr_quantity_array[i]) < Double.parseDouble(newgen.getBpQuantityRemaining())) {
                    double q = Double.parseDouble(newgen.getBpQuantityRemaining()) - Double.parseDouble(pr_quantity_array[i]);
                    System.out.println("Quantity :" + q);
                    newgen.setBpQuantityRemaining(q + "");
                    newgen.setBpRfqStatus("Initiated");
                    System.out.println("Newgen :" + newgen);
                    String result = updatePrLineItemNG(newgen);
                    System.out.println("result: " + result);
                } else if (Double.parseDouble(pr_quantity_array[i]) == Double.parseDouble(newgen.getBpQuantityRemaining())) {
                    newgen.setBpQuantityRemaining("0");
                    newgen.setBpRfqStatus("Initiated");
                    String result = updatePrLineItemNG(newgen);
                    System.out.println("result: " + result);
                }
            }

            // SAP Vendor
            String newVendorIds = "";
            if (sapVendorCodes != null && !sapVendorCodes.trim().equals("")) {
                List<MasterVendor> sapVendorMasterList = purchaseOrderWSUtil.findVendorMasterByMultipleVendorCode(sapVendorCodes);
                System.out.println("sapVendorMasterList size: " + sapVendorMasterList.size());
                for (int i = 0; i < sapVendorMasterList.size(); i++) {
                    MasterVendor vendorMasterObj = sapVendorMasterList.get(i);

                    vendorDetailsEntity.setType("SAP");
                    vendorDetailsEntity.setStatus("Active");
                    vendorDetailsEntity.setCode(vendorMasterObj.getVendorCode());
                    vendorDetailsEntity.setFirstname(vendorMasterObj.getVendorName());
                    vendorDetailsEntity.setEmailid(vendorMasterObj.getMailId());
                    vendorDetailsEntity.setAddress(vendorMasterObj.getAddress1());

                    String savedVendorId = rfqRfpUtilWS.saveProspect(vendorDetailsEntity);

                    if (i == sapVendorMasterList.size() - 1) {
                        newVendorIds += savedVendorId;
                    } else {
                        newVendorIds += savedVendorId + ",";
                    }

                    vendorMasterObj.setBpIsMapped("Yes");
                    purchaseOrderWSUtil.updateVendorMaster(vendorMasterObj);
                }
                System.out.println("newVendorIds 1: " + newVendorIds);
                if (vendorname != null && !vendorname.trim().equals("")) {
                    vendorname += "," + newVendorIds;
                } else {
                    vendorname = newVendorIds;
                }
                System.out.println("newVendorIds 2: " + vendorname);
            }

            List<VendorDetails> vendorList = new ArrayList<>();
            if (vendorname != null && !vendorname.trim().equals("")) {
                vendorList = findByMultipleVendorId(vendorname);
                System.out.println("vendorList size: " + vendorList.size());
            }

            BuyerDetails buyerDetailsObj = findBuyerById(buyerid);
            WorkOrderRfqHeader rfqHeaderObj = findRfqHeaderById(Integer.parseInt(rfqid));

            for (VendorDetails vendor : vendorList) {

                supplierHeader.setNgBpWorkorderrfqheaderRfqid(rfqHeaderObj);
                supplierHeader.setNgBpVendordetailsId(vendor);
                supplierHeader.setStatus("Pending");
                supplierHeader.setBuyerBrandModelRatedParameterWeight(rfqHeaderObj.getBrandModelRatedParameterWeight());
                supplierHeader.setBuyerDeliveryLeadtimeRatedParameterWeight(rfqHeaderObj.getDeliveryLeadTImeRatedParameterWeight());
                supplierHeader.setBuyerIncotermsRatedParameterWeight(rfqHeaderObj.getIncotermsRatedParameterWeight());
                supplierHeader.setBuyerMoqmovDetailsRatedParameterWeight(rfqHeaderObj.getmOQMOVDetailsRatedParameterWeight());
                supplierHeader.setBuyerPaymentTermsRatedParameterWeight(rfqHeaderObj.getPaymentTermsRatedParameterWeight());
                supplierHeader.setBuyerValidityofferRatedParameterWeight(rfqHeaderObj.getValidityOfferRatedParameterWeight());

                String supplierHeaderId = saveSupplierHeader(supplierHeader);
                System.out.println("supplierHeaderId: " + supplierHeaderId);
                SupplierHeader supplierHeaderObj = getSupplierHeaderById(Integer.parseInt(supplierHeaderId));

                rfqVendorMapping.setNgBpVendordetailsId(vendor);
                rfqVendorMapping.setNgBpWorkorderrfqheaderRfqid(rfqHeaderObj);
                rfqVendorMapping.setStatus("Pending");
                rfqVendorMapping.setWorkOrderSupplierHeaderTableid(supplierHeaderObj);
                String mappingid = saveRfqHeaderVendorMapping(rfqVendorMapping);
                System.out.println("mappingid: " + mappingid);

                for (int i = 0; i < newgenList.size(); i++) {
                    NewgenPRLineItem newgen = newgenList.get(i);

                    supplierLineitem.setWorkOrderSupplierHeaderTableid(supplierHeaderObj);
                    supplierLineitem.setNgBpNewgenPRLineItemId(newgen);
                    supplierLineitem.setStatus("Pending");
                    supplierLineitem.setQuantity(pr_quantity_array[i]);
                    saveSupplierLineitem(supplierLineitem);
                }

                buyerVendorNotification.setCommentby("Buyer");
                buyerVendorNotification.setCommentdate(today);
                buyerVendorNotification.setNotification("<p>" + rfqHeaderObj.getRfqNumber() + " has been assigned to you.</p>");
                buyerVendorNotification.setReadstatus("false");
                buyerVendorNotification.setNgBpBuyerdetailsId(buyerDetailsObj);
                buyerVendorNotification.setNgBpWorkorderrfqheaderRfqid(rfqHeaderObj);
                buyerVendorNotification.setNgBpVendordetailsId(vendor);
                buyerVendorNotification.setUrl("responsemanagement.do?rfqid=" + rfqid + "&buyerid=" + buyerid + "&mappingId=" + mappingid);
                saveBuyerVendorNotification(buyerVendorNotification);

//                emailTriggerDetails.setMailCC(buyerDetailsObj.getEmailid());
//                emailTriggerDetails.setMailFrom("do-not-reply@natsteel.com.sg");
//                emailTriggerDetails.setMailContentType("text/html;charset=UTF-8"); // default
//
//                if (vendor.getType() != null && vendor.getType().equals("SAP")) {
//                    emailTriggerDetails.setMailMessage(rfqNumber + " has been assigned to you, please review and bid.<br>Click below link to self-register<br><a href='" + WebServiceCall_IP + "/VendorPortal/selfregistration.do?id=" + vendor.getId() + "'>Self-Register</a>");
//                } else {
//                    emailTriggerDetails.setMailMessage(rfqNumber + " has been assigned to you, please review and bid.");
//                }
//
//                emailTriggerDetails.setMailSubject(rfqNumber + " Assigned ");
//                emailTriggerDetails.setMailTo("nikhil.rajput@bpaassolutions.com");
//
//                mailTriggerUtil.TriggerMail(emailTriggerDetails);
            }

            // Upload RFQ Format to DMS by Nikhil on 27-03-2020 06:20PM
            System.out.println("rfqid: " + rfqid);
            List<BuyerRfqLineItemBean> buyerRfqLineItemBeanList = rfqRfpUtilWS.callBuyerRfqPrLineItemStoredProcedure(Integer.parseInt(rfqid));
            System.out.println("buyerRfqLineItemBeanList: " + buyerRfqLineItemBeanList.size());
            String uploadRfqFormatMainCode = "";
            String uploadRfqFormatMessage = "";
            String uploadRfqFormatPid = "";
            String uploadRfqFormatAttIsIndex = "";
            String uploadRfqFormatDocIndex = "";

            for (VendorDetails vendorObj : vendorList) {
                byte[] fileBytes;

                try (ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream()) {
                    Document document = new Document();
                    PdfWriter writer = PdfWriter.getInstance(document, byteArrayOutputStream);
                    writer.setPageEvent(new MyFooter());
                    document.open();
                    mailTriggerUtil.makeRfqFormat(document, request, rfqHeaderObj, vendorObj, buyerRfqLineItemBeanList);
                    document.close();
                    fileBytes = byteArrayOutputStream.toByteArray();
                    System.out.println("fileBytes len: " + fileBytes.length);

                    try {
                        // Upload RFQ Format into DMS Starts
                        inputRfqFormatAutowired.setPid(rfqHeaderObj.getRfqNumber());
                        inputRfqFormatAutowired.setRFQno(rfqHeaderObj.getRfqNumber());
                        inputRfqFormatAutowired.setRequestorID(vendorObj.getCode());
                        inputRfqFormatAutowired.setRFQAttachname(rfqHeaderObj.getRfqNumber() + ".pdf");
                        inputRfqFormatAutowired.setRFQAttachment(fileBytes);

                        OutputRfqFormat outputRfqFormat = uploadRfqFormatToDMS(inputRfqFormatAutowired);
                        uploadRfqFormatMainCode = uploadRfqFormatMainCode + outputRfqFormat.getMainCode() + "#";
                        uploadRfqFormatMessage = uploadRfqFormatMessage + outputRfqFormat.getMessage() + "#";
                        uploadRfqFormatPid = uploadRfqFormatPid + outputRfqFormat.getProcessInstanceID() + "#";
                        uploadRfqFormatAttIsIndex = uploadRfqFormatAttIsIndex + outputRfqFormat.getIsIndex() + "#";
                        uploadRfqFormatDocIndex = uploadRfqFormatDocIndex + outputRfqFormat.getDocIndex() + "#";

                        System.out.println("uploadRfqFormatMainCode: " + uploadRfqFormatMainCode);
                        System.out.println("uploadRfqFormatMessage: " + uploadRfqFormatMessage);
                        System.out.println("uploadRfqFormatPid: " + uploadRfqFormatPid);
                        System.out.println("uploadRfqFormatAttIsIndex: " + uploadRfqFormatAttIsIndex);
                        System.out.println("uploadRfqFormatDocIndex: " + uploadRfqFormatDocIndex);
                        // Upload RFQ Format into DMS Ends

                        // Trigger Mail Starts
                        emailTriggerDetails.setAttachmentISINDEX(outputRfqFormat.getIsIndex());
                        emailTriggerDetails.setAttachmentNames(rfqHeaderObj.getRfqNumber() + ".pdf");
                        emailTriggerDetails.setMailCC(buyerDetailsObj.getEmailid());
                        emailTriggerDetails.setMailFrom("do-not-reply@natsteel.com.sg");
                        emailTriggerDetails.setMailContentType("text/html;charset=UTF-8"); // default

                        if (vendorObj.getType() != null && vendorObj.getType().equals("SAP")) {
                            emailTriggerDetails.setMailMessage(rfqNumber + " has been assigned to you, please review and bid.<br>Click below link to self-register<br><a href='" + WebServiceCall_IP + "/VendorPortal/selfregistration.do?id=" + vendorObj.getId() + "'>Self-Register</a>");
                        } else {
                            emailTriggerDetails.setMailMessage(rfqNumber + " has been assigned to you, please review and bid.");
                        }

                        emailTriggerDetails.setMailSubject(rfqNumber + " Assigned ");
                        emailTriggerDetails.setMailTo("nikhil.rajput@bpaassolutions.com");

                        mailTriggerUtil.TriggerMail(emailTriggerDetails);
                        // Trigger Mail Ends

                    } catch (Exception e) {
                        System.out.println("Upload RFQ Format to DMS has failed !");
                    }

                } catch (DocumentException | IOException ex) {
                    Logger.getLogger(DownloadAttachment.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
            redirect.addFlashAttribute("uploadRfqFormatMainCode", uploadRfqFormatMainCode);
            redirect.addFlashAttribute("uploadRfqFormatMessage", uploadRfqFormatMessage);
            redirect.addFlashAttribute("uploadRfqFormatPid", uploadRfqFormatPid);
            redirect.addFlashAttribute("uploadRfqFormatAttIsIndex", uploadRfqFormatAttIsIndex);
            redirect.addFlashAttribute("uploadRfqFormatDocIndex", uploadRfqFormatDocIndex);

        } catch (NumberFormatException | ParseException ex) {
            Logger.getLogger(RfqRfpManagement.class.getName()).log(Level.SEVERE, null, ex);
        }

        return new ModelAndView("redirect:/mytask.do");
    }

    @RequestMapping(value = "/updatecontractrfqdetails", method = RequestMethod.POST)
    public ModelAndView updateContractRfqDetails(HttpServletRequest request, HttpServletResponse response, Map<String, Object> modalMap) {
        System.out.println("updatecontractrfqdetails");
        try {
            DateFormat format = new SimpleDateFormat("dd-MM-yyyy");

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();

            BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();

            Date today = new Date();
            
             String ratedParam=request.getParameter("ratedParam");
       
                String[] ratedValues=ratedParam.split("#");


            String rfqid = request.getParameter("rfqid");
            String action = request.getParameter("action");
            String rfqvaliduntil = request.getParameter("rfqvaliduntil");

            System.out.println("rfqid: " + rfqid);
            System.out.println("action: " + action);
            System.out.println("rfqvaliduntil: " + rfqvaliduntil);

            ContractRfqHeader contractRfqHeaderObj = findContractRfqHeaderById(Integer.parseInt(rfqid));
            List<ContractRfqHeaderVendorMapping> contractRfqHeaderVendormappingList = findContractRfqHeaderVendorMappingByRfqId(Integer.parseInt(rfqid));

            Date rfqValidUntilDate = format.parse(rfqvaliduntil);
            if (!rfqValidUntilDate.equals(contractRfqHeaderObj.getRfqvaliduntil())) {

                contractRfqHeaderObj.setRfqvaliduntil(rfqValidUntilDate);
                updateContractRfqHeader(contractRfqHeaderObj);

                for (ContractRfqHeaderVendorMapping mapping : contractRfqHeaderVendormappingList) {
//                int vendorid = vendor.getId();
                    buyerVendorNotification.setCommentby("Buyer");
                    buyerVendorNotification.setCommentdate(today);
                    buyerVendorNotification.setNotification("<p> validity of offer of " + contractRfqHeaderObj.getRfqNumber() + " for contract has been changed.</p>");
                    buyerVendorNotification.setReadstatus("false");
                    buyerVendorNotification.setNgBpBuyerdetailsId(buyer);
                    buyerVendorNotification.setContractRfqHeaderRFQID(contractRfqHeaderObj);
                    buyerVendorNotification.setNgBpVendordetailsId(mapping.getNgBpVendordetailsId());
                    buyerVendorNotification.setUrl("responsecontractmanagement.do?rfqid=" + rfqid + "&buyerid=" + buyer.getId());
                    
                                    if(ratedValues.length>0){
                    for (int i = 0; i < ratedValues.length; i++) {
                        String ratedValue[]=ratedValues[i].split(",");
                        if(ratedValue.length>0){
                            List<RatedParameters> venratedParametersList = findByVendorRFQTag(mapping.getNgBpVendordetailsId().getId(), contractRfqHeaderObj.getRfqid(), ratedValue[0]);
                         if(venratedParametersList.size()>0){
                RatedParameters ratedParam1 = venratedParametersList.get(0);
                ratedParameters.setInsertionOrderID(ratedParam1.getInsertionOrderID());
                ratedParameters.setTagID("ratedParam"+(i+1));
                        ratedParameters.setTagName(ratedValue[0]);
                        ratedParameters.setWeight(ratedValue[1]);
                        ratedParameters.setVendorDetails(mapping.getNgBpVendordetailsId());
                       // ratedParameters.setContractRfqHeader(contractRfqHeaderObj);
                String str = updateRatedParam(ratedParameters);
                 System.out.println("str--->" + str);
                }else{
                                              ratedParameters.setTagID("ratedParam"+(i+1));
                        ratedParameters.setTagName(ratedValue[0]);
                        ratedParameters.setWeight(ratedValue[1]);
                        ratedParameters.setVendorDetails(mapping.getNgBpVendordetailsId());
                        ratedParameters.setContractRfqHeader(contractRfqHeaderObj);
                    }
                        
                        String ratedparamId = saveRatedParam(ratedParameters);
                System.out.println("ratedparamId :" + ratedparamId);
                        
                    }
                    
                    
                }

//                    saveRfqHeaderVendorMapping(rfqVendorMapping);
                    String notificationid = saveBuyerVendorNotification(buyerVendorNotification);

//                    System.out.println("notificationid :" + notificationid);
                }
            }
            }
            if (action != null && !action.equalsIgnoreCase("")) {
                System.out.println("inisde updated");
                contractRfqHeaderObj.setRfqstatus(action);
                updateContractRfqHeader(contractRfqHeaderObj);
                reportBuyerAuditLog.setActivityPerformed(contractRfqHeaderObj.getRfqNumber() + " Updated");
                reportBuyerAuditLog.setCreatedate(new Date());
                reportBuyerAuditLog.setNgBpBuyerdetailsId(buyer);
                saveBuyerAuditLogReport(reportBuyerAuditLog);
            }
            if (action != null && !action.equalsIgnoreCase("")) {
                if (action.equalsIgnoreCase("On Hold")) {

                    contractRfqHeaderObj.setRfqstatus(action);
                    updateContractRfqHeader(contractRfqHeaderObj);

                    for (ContractRfqHeaderVendorMapping mapping : contractRfqHeaderVendormappingList) {
                        buyerVendorNotification.setCommentby("Buyer");
                        buyerVendorNotification.setCommentdate(today);
                        buyerVendorNotification.setNotification("<p> " + contractRfqHeaderObj.getRfqNumber() + " has been put On Hold.</p>");
                        buyerVendorNotification.setReadstatus("false");
                        buyerVendorNotification.setNgBpBuyerdetailsId(buyer);
                        buyerVendorNotification.setContractRfqHeaderRFQID(contractRfqHeaderObj);
                        buyerVendorNotification.setNgBpVendordetailsId(mapping.getNgBpVendordetailsId());
                        buyerVendorNotification.setUrl("responsecontractmanagement.do?rfqid=" + rfqid + "&buyerid=" + buyer.getId());

                        String notificationid = saveBuyerVendorNotification(buyerVendorNotification);

                        System.out.println("notificationid :" + notificationid);

                        mapping.setStatus(action);
                        updateContractRfqHeaderVendorMapping(mapping);
                        reportBuyerAuditLog.setActivityPerformed(contractRfqHeaderObj.getRfqNumber() + " has been put On Hold");
                        reportBuyerAuditLog.setCreatedate(new Date());
                        reportBuyerAuditLog.setNgBpBuyerdetailsId(buyer);
                        saveBuyerAuditLogReport(reportBuyerAuditLog);

                    }

                } else if (action.equalsIgnoreCase("Cancel")) {

                    contractRfqHeaderObj.setRfqstatus(action);
                    updateContractRfqHeader(contractRfqHeaderObj);

                    for (ContractRfqHeaderVendorMapping mapping : contractRfqHeaderVendormappingList) {
                        buyerVendorNotification.setCommentby("Buyer");
                        buyerVendorNotification.setCommentdate(today);
                        buyerVendorNotification.setNotification("<p> " + contractRfqHeaderObj.getRfqNumber() + " has been canceled.</p>");
                        buyerVendorNotification.setReadstatus("false");
                        buyerVendorNotification.setNgBpBuyerdetailsId(buyer);
                        buyerVendorNotification.setContractRfqHeaderRFQID(contractRfqHeaderObj);
                        buyerVendorNotification.setNgBpVendordetailsId(mapping.getNgBpVendordetailsId());
                        buyerVendorNotification.setUrl("responsecontractmanagement.do?rfqid=" + rfqid + "&buyerid=" + buyer.getId());

                        String notificationid = saveBuyerVendorNotification(buyerVendorNotification);

                        System.out.println("notificationid :" + notificationid);

                        mapping.setStatus(action);
                        updateContractRfqHeaderVendorMapping(mapping);
                        reportBuyerAuditLog.setActivityPerformed(contractRfqHeaderObj.getRfqNumber() + " has been Cancelled");
                        reportBuyerAuditLog.setCreatedate(new Date());
                        reportBuyerAuditLog.setNgBpBuyerdetailsId(buyer);
                        saveBuyerAuditLogReport(reportBuyerAuditLog);
                    }

                } else if (action.equalsIgnoreCase("Release")) {

                    String deliveryterms = request.getParameter("deliveryterms");
                    String paymentterms = request.getParameter("paymentterms");
                    String expecteddeliverydate = request.getParameter("expecteddeliverydate");
                    String RFQTitle = request.getParameter("RFQTitle");
                    String contactpersonename = request.getParameter("contactpersonename");
                    String contactpersonetelno = request.getParameter("contactpersonetelno");
                    String contactpersoneemail = request.getParameter("contactpersoneemail");
                    String vendorrecipients = request.getParameter("vendorrecipients");
                    String internalrecipients = request.getParameter("internalrecipients");
                    String comment = request.getParameter("comment");
                    String autosendpo = request.getParameter("ro_autosendpo");
                    String notifyvendor = request.getParameter("ro_notifyvendor");
                    String contractIdArr[] = request.getParameterValues("contract_ids");
                    String contract_rfqlineitem_id[] = request.getParameterValues("contract_rfqlineitem_id");
                    String contract_line_item_qty[] = request.getParameterValues("contract_line_item_qty");

//                    System.out.println("autosendpo: " + autosendpo);
//                    System.out.println("notifyvendor: " + notifyvendor);
//                    System.out.println("contractIdArr len: " + contractIdArr.length);
//                    System.out.println("contract_rfqlineitem_id len: " + contract_rfqlineitem_id.length);
//                    System.out.println("contract_line_item_qty len: " + contract_line_item_qty.length);
                    contractRfqHeaderObj.setDeliveryterms(deliveryterms);
                    contractRfqHeaderObj.setPaymentterms(paymentterms);
                    contractRfqHeaderObj.setExpecteddeliverydate(format.parse(expecteddeliverydate));
                    contractRfqHeaderObj.setRFQTitle(RFQTitle);
                    contractRfqHeaderObj.setContactpersonename(contactpersonename);
                    contractRfqHeaderObj.setContactpersonetelno(contactpersonetelno);
                    contractRfqHeaderObj.setContactpersoneemail(contactpersoneemail);
                    contractRfqHeaderObj.setVendorrecipients(vendorrecipients);
                    contractRfqHeaderObj.setInternalrecipients(internalrecipients);
                    contractRfqHeaderObj.setComment(comment);
                    contractRfqHeaderObj.setAutosendpo(autosendpo);
                    contractRfqHeaderObj.setNotifyvendor(notifyvendor);
                    contractRfqHeaderObj.setRfqstatus("Pending");

                    updateContractRfqHeader(contractRfqHeaderObj);

                    String contractIds = "";
                    String contractRfqlineitemIds = "";
                    for (int i = 0; i < contractIdArr.length; i++) {
                        if (i == contractIdArr.length - 1) {
                            contractIds += contractIdArr[i];
                            contractRfqlineitemIds += contract_rfqlineitem_id[i];
                        } else {
                            contractIds += contractIdArr[i] + ",";
                            contractRfqlineitemIds += contract_rfqlineitem_id[i] + ",";
                        }
                    }
                    System.out.println("contractIds: " + contractIds);
                    System.out.println("contractRfqlineitemIds: " + contractRfqlineitemIds);

                    List<NGExtCM> contractList = findContractLineItemByMultipleId(contractIds);
                    System.out.println("contractList size: " + contractList.size());

                    List<ContractRfqLineItem> contractRfqLineItemList = findContractRfqLineItemByMultipleId(contractRfqlineitemIds);
                    System.out.println("contractRfqLineItemList size: " + contractRfqLineItemList.size());

                    for (int i = 0; i < contractList.size(); i++) {
                        if (new BigDecimal(contract_line_item_qty[i]) != contractRfqLineItemList.get(i).getQuantity()) {
                            System.out.println("UnEqualQuantity============");

                            ContractRfqLineItem lineItem = contractRfqLineItemList.get(i);
                            int res;
                            res = new BigDecimal(contract_line_item_qty[i]).compareTo(lineItem.getQuantity());
                            // if (Integer.parseInt(contract_line_item_qty[i]) < lineItem.getQuantity()) {
//                            if (res == -1) {
////                                int x = contractRfqLineItemList.get(i).getQuantity().add(new BigDecimal(contract_line_item_qty[i]));
//                                // System.out.println("x: " + x);
//                                NewgenContractLineItem contract = contractList.get(i);
//                                contract.setBpQuantityRemaining(contractRfqLineItemList.get(i).getQuantity().add(new BigDecimal(contract_line_item_qty[i])));
//                                updateNewgenContractLineItem(contract);
//                            } else if (res == 1) {
//                                // int y = Integer.parseInt(contract_line_item_qty[i]) - contractRfqLineItemList.get(i).getQuantity();
//                                // System.out.println("y: " + y);
//                                NewgenContractLineItem contract = contractList.get(i);
//                                contract.setBpQuantityRemaining(new BigDecimal(contract_line_item_qty[i]).subtract(contractRfqLineItemList.get(i).getQuantity()));
//                                updateNewgenContractLineItem(contract);
//                            }

                            lineItem.setQuantity(new BigDecimal(contract_line_item_qty[i]));
                            updateContractRfqLineItem(lineItem);
                        } else {
                            System.out.println("EqualQuantity============");
                        }
                    }

                    for (ContractRfqHeaderVendorMapping mapping : contractRfqHeaderVendormappingList) {
                        buyerVendorNotification.setCommentby("Buyer");
                        buyerVendorNotification.setCommentdate(today);
                        buyerVendorNotification.setNotification("<p> " + contractRfqHeaderObj.getRfqNumber() + " has been released.</p>");
                        buyerVendorNotification.setReadstatus("false");
                        buyerVendorNotification.setNgBpBuyerdetailsId(buyer);
                        buyerVendorNotification.setContractRfqHeaderRFQID(contractRfqHeaderObj);
                        buyerVendorNotification.setNgBpVendordetailsId(mapping.getNgBpVendordetailsId());
                        buyerVendorNotification.setUrl("responsemanagement.do?rfqid=" + rfqid + "&buyerid=" + buyer.getId());

                        String notificationid = saveBuyerVendorNotification(buyerVendorNotification);

                        System.out.println("notificationid :" + notificationid);

                        mapping.setStatus("Pending");
                        updateContractRfqHeaderVendorMapping(mapping);
                    }

                }

            }

        } catch (NumberFormatException | ParseException e) {
            System.out.println(e);
        }
        return new ModelAndView("redirect:/mytask.do");
    }

    @RequestMapping(value = "/updaterfqdetails", method = RequestMethod.POST)
    public ModelAndView updateRfqDetails(HttpServletRequest request, HttpServletResponse response, Map<String, Object> modalMap) {
        System.out.println("updaterfqdetails");
        try {
            DateFormat format = new SimpleDateFormat("dd.MM.yyyy");

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
            Date today = new Date();

            String rfqid = request.getParameter("rfqid");
            String rfq_line_id = request.getParameter("pr_ids");
            String pr_quantity = request.getParameter("pr_quantity");
            String action = request.getParameter("ro_action");
            String rfqvaliduntil = request.getParameter("ro_rfqvaliduntil");
            String deliveryterms = request.getParameter("ro_deliveryterms");
            String paymentterms = request.getParameter("ro_paymentterms");
            String expecteddeliverdate = request.getParameter("ro_expecteddeliverdate");
            String rfqtitle = request.getParameter("RFQTitle");
            String rfqrequestdate = request.getParameter("rfqRequestDate");
            String contactpersonname = request.getParameter("contactpersonename");
            String contactpersonetelno = request.getParameter("contactpersonetelno");
            String contactpersonemail = request.getParameter("contactpersoneemail");
            String autosendpo = request.getParameter("ro_AutoSendPO");
            String notifyvendor = request.getParameter("ro_NotifyVendor");
            String vendorrecipients = request.getParameter("ro_VendorRecipients");
            String internalrecipients = request.getParameter("ro_InternalRecipients");
            String comments = request.getParameter("ro_comment");
            String vendorIds = request.getParameter("ro_vendorname");
            String sapVendorCodes = request.getParameter("ro_sapVendorCode");
            String pr_insertionOrderIds = request.getParameter("pr_insertionOrderIds");

            System.out.println("rfqid: " + rfqid);
            System.out.println("pr_ids: " + rfq_line_id);
            System.out.println("pr_quantity: " + pr_quantity);
            System.out.println("vendorIds: " + vendorIds);
            System.out.println("action: " + action);
            System.out.println("sapVendorCodes: " + sapVendorCodes);

            rfq_line_id = rfq_line_id.substring(0, rfq_line_id.length() - 1);
            pr_quantity = pr_quantity.substring(0, pr_quantity.length() - 1);
            pr_insertionOrderIds = pr_insertionOrderIds.substring(0, pr_insertionOrderIds.length() - 1);

            String[] vendorIdArr = null;
            if (vendorIds != null && !vendorIds.trim().equalsIgnoreCase("")) {
                vendorIdArr = vendorIds.split(",");
                System.out.println("NewVendorCount: " + vendorIdArr.length);
            }
            String[] sapVendorIdArr = null;
            if (sapVendorCodes != null && !sapVendorCodes.trim().equalsIgnoreCase("")) {
                sapVendorIdArr = sapVendorCodes.split(",");
                System.out.println("sapVendorIdArr: " + sapVendorIdArr.length);
            }

            System.out.println("pr_insertionOrderIds: " + pr_insertionOrderIds);
            WorkOrderRfqHeader rfqHeaderObj = findRfqHeaderById(Integer.parseInt(rfqid));
            List<NewgenPRLineItem> newgenList = findByMultipleNewgenPRLineItemId(pr_insertionOrderIds);
            System.out.println("newgenList size: " + newgenList);

            Date rfqvalidDate = format.parse(rfqvaliduntil);
            Date requestdate = format.parse(rfqrequestdate);
            Date expecteddeliver_date = format.parse(expecteddeliverdate);

            rfqHeaderObj.setDeliveryterms(deliveryterms);
            rfqHeaderObj.setPaymentterms(paymentterms);
            rfqHeaderObj.setRFQTitle(rfqtitle);
            rfqHeaderObj.setRfqRequestDate(requestdate);
            rfqHeaderObj.setExpectedDeliveryDate(expecteddeliver_date);
            rfqHeaderObj.setContactpersonename(contactpersonname);
            rfqHeaderObj.setContactpersoneemail(contactpersonemail);
            rfqHeaderObj.setContactpersonetelno(contactpersonetelno);
            rfqHeaderObj.setAutosendPO(autosendpo);
            rfqHeaderObj.setNotifyVendor(notifyvendor);
            rfqHeaderObj.setInternalRecipients(internalrecipients);
            rfqHeaderObj.setVendorRecipients(vendorrecipients);
            rfqHeaderObj.setComment(comments);
            rfqHeaderObj.setUpdatedate(today);

            int newVendorCount = 0;
            if (vendorIdArr != null && vendorIdArr.length > 0) {
                newVendorCount = newVendorCount + vendorIdArr.length;
            }
            if (sapVendorIdArr != null && sapVendorIdArr.length > 0) {
                newVendorCount = newVendorCount + sapVendorIdArr.length;
            }
            if ((vendorIdArr != null && vendorIdArr.length > 0) || (sapVendorIdArr != null && sapVendorIdArr.length > 0)) {
                rfqHeaderObj.setVendorCount(rfqHeaderObj.getVendorCount() + newVendorCount);
                rfqHeaderObj.setRfqstatus("Pending");
            }

            List<RfqHeaderVendorMapping> vendorList = findVendorByRfqIdAndStatus(Integer.parseInt(rfqid));

            if (!"Cancel".equals(action)) {
                if (!rfqHeaderObj.getRfqvaliduntil().equals(rfqvalidDate)) {
                    for (RfqHeaderVendorMapping vendor : vendorList) {
                        buyerVendorNotification.setCommentby("Buyer");
                        buyerVendorNotification.setCommentdate(today);
                        buyerVendorNotification.setNotification("<p> validity of offer of " + rfqHeaderObj.getRfqNumber() + " has been changed.</p>");
                        buyerVendorNotification.setReadstatus("false");
                        buyerVendorNotification.setNgBpBuyerdetailsId(buyer);
                        buyerVendorNotification.setNgBpWorkorderrfqheaderRfqid(rfqHeaderObj);
                        buyerVendorNotification.setNgBpVendordetailsId(vendor.getNgBpVendordetailsId());
                        buyerVendorNotification.setUrl("responsemanagement.do?rfqid=" + rfqid + "&buyerid=" + buyer.getId() + "&mappingId=" + vendor.getId());

//                    saveRfqHeaderVendorMapping(rfqVendorMapping);
                        String notificationid = saveBuyerVendorNotification(buyerVendorNotification);
                        System.out.println("notificationid :" + notificationid);
                    }
                }
            }
            rfqHeaderObj.setRfqvaliduntil(rfqvalidDate);
            updateRfqHeader(rfqHeaderObj);

            // SAP Vendor
            String newVendorIds = "";
            if (sapVendorCodes != null && !sapVendorCodes.trim().equals("")) {
                List<MasterVendor> sapVendorMasterList = purchaseOrderWSUtil.findVendorMasterByMultipleVendorCode(sapVendorCodes);
                System.out.println("sapVendorMasterList size: " + sapVendorMasterList.size());
                for (int i = 0; i < sapVendorMasterList.size(); i++) {
                    MasterVendor vendorMasterObj = sapVendorMasterList.get(i);

                    vendorDetailsEntity.setType("SAP");
                    vendorDetailsEntity.setStatus("Active");
                    vendorDetailsEntity.setCode(vendorMasterObj.getVendorCode());
                    vendorDetailsEntity.setFirstname(vendorMasterObj.getVendorName());
                    vendorDetailsEntity.setEmailid(vendorMasterObj.getMailId());
                    vendorDetailsEntity.setAddress(vendorMasterObj.getAddress1());

                    String savedVendorId = rfqRfpUtilWS.saveProspect(vendorDetailsEntity);

                    if (i == sapVendorMasterList.size() - 1) {
                        newVendorIds += savedVendorId;
                    } else {
                        newVendorIds += savedVendorId + ",";
                    }

                    vendorMasterObj.setBpIsMapped("Yes");
                    purchaseOrderWSUtil.updateVendorMaster(vendorMasterObj);
                }
                System.out.println("newVendorIds 1: " + newVendorIds);
                if (vendorIds != null && !vendorIds.trim().equals("")) {
                    vendorIds += "," + newVendorIds;
                } else {
                    vendorIds = newVendorIds;
                }
                System.out.println("newVendorIds 2: " + vendorIds);
            }

            if (vendorIds != null && !vendorIds.equalsIgnoreCase("")) {
                List<VendorDetails> vendors = findByMultipleVendorId(vendorIds);
                BuyerDetails buyerDetailsObj = findBuyerById(rfqHeaderObj.getNgBpBuyerdetailsId().getId());
                for (VendorDetails vendor : vendors) {

//                    String mappingId = saveRfpHeaderVendorMapping(rfpHeaderVendorMapping);
//                    System.out.println("mappingId: " + mappingId);
                    supplierHeader.setNgBpWorkorderrfqheaderRfqid(rfqHeaderObj);
                    supplierHeader.setNgBpVendordetailsId(vendor);
                    supplierHeader.setStatus("Pending");
                    supplierHeader.setBuyerBrandModelRatedParameterWeight(rfqHeaderObj.getBrandModelRatedParameterWeight());
                    supplierHeader.setBuyerDeliveryLeadtimeRatedParameterWeight(rfqHeaderObj.getDeliveryLeadTImeRatedParameterWeight());
                    supplierHeader.setBuyerIncotermsRatedParameterWeight(rfqHeaderObj.getIncotermsRatedParameterWeight());
                    supplierHeader.setBuyerMoqmovDetailsRatedParameterWeight(rfqHeaderObj.getmOQMOVDetailsRatedParameterWeight());
                    supplierHeader.setBuyerPaymentTermsRatedParameterWeight(rfqHeaderObj.getPaymentTermsRatedParameterWeight());
                    supplierHeader.setBuyerValidityofferRatedParameterWeight(rfqHeaderObj.getValidityOfferRatedParameterWeight());

                    String supplierHeaderId = saveSupplierHeader(supplierHeader);
                    System.out.println("supplierHeaderId: " + supplierHeaderId);
                    SupplierHeader supplierHeaderObj = getSupplierHeaderById(Integer.parseInt(supplierHeaderId));

                    rfqVendorMapping.setNgBpVendordetailsId(vendor);
                    rfqVendorMapping.setNgBpWorkorderrfqheaderRfqid(rfqHeaderObj);
                    rfqVendorMapping.setStatus("Pending");
                    rfqVendorMapping.setWorkOrderSupplierHeaderTableid(supplierHeaderObj);
                    String mappingid = saveRfqHeaderVendorMapping(rfqVendorMapping);

                    for (NewgenPRLineItem newgen : newgenList) {
                        System.out.println("Newgen: " + newgen);
                        System.out.println("supplierHeaderObj: " + supplierHeaderObj);
                        supplierLineitem.setWorkOrderSupplierHeaderTableid(supplierHeaderObj);
                        supplierLineitem.setNgBpNewgenPRLineItemId(newgen);
                        supplierLineitem.setStatus("Pending");
                        saveSupplierLineitem(supplierLineitem);
                    }

                    buyerVendorNotification.setCommentby("Buyer");
                    buyerVendorNotification.setCommentdate(today);
                    buyerVendorNotification.setNotification("<p>" + rfqHeaderObj.getRfqNumber() + " has been assigned to you.</p>");
                    buyerVendorNotification.setReadstatus("false");
                    buyerVendorNotification.setNgBpBuyerdetailsId(buyerDetailsObj);
                    buyerVendorNotification.setNgBpWorkorderrfqheaderRfqid(rfqHeaderObj);
                    buyerVendorNotification.setNgBpVendordetailsId(vendor);
                    buyerVendorNotification.setUrl("responsemanagement.do?rfqid=" + rfqid + "&buyerid=" + rfqHeaderObj.getNgBpBuyerdetailsId().getId() + "&mappingId=" + mappingid);

                    String notificationid = saveBuyerVendorNotification(buyerVendorNotification);
                    System.out.println("notificationid :" + notificationid);

                    emailTriggerDetails.setMailCC(rfqHeaderObj.getNgBpBuyerdetailsId().getEmailid());
                    emailTriggerDetails.setMailFrom("do-not-reply@natsteel.com.sg");
                    emailTriggerDetails.setMailContentType("text/html;charset=UTF-8");
                    emailTriggerDetails.setMailTo(vendor.getContactemailid());
                    emailTriggerDetails.setMailSubject(rfqHeaderObj.getRfqNumber() + " Assigned");
                    if (vendor.getType() != null && vendor.getType().equals("SAP")) {
                        emailTriggerDetails.setMailMessage(rfqHeaderObj.getRfqNumber() + " has been assigned to you, please review and bid.<br>Click below link to self-register<br><a href='" + WebServiceCall_IP + "/VendorPortal/selfregistration.do?id=" + vendor.getId() + "'>Self-Register</a>");
                    } else {
                        emailTriggerDetails.setMailMessage(rfqHeaderObj.getRfqNumber() + " has been assigned to you, please review and bid.");
                    }

                    String MailTrigger = mailTriggerUtil.TriggerMail(emailTriggerDetails);
                    System.out.println("MailTrigger :" + MailTrigger);
                }
            }

            if (action != null && !action.equalsIgnoreCase("")) {
                rfqHeaderObj.setRfqstatus(action);
                updateRfqHeader(rfqHeaderObj);

                reportBuyerAuditLog.setActivityPerformed(rfqHeaderObj.getRfqNumber() + " Updated");
                reportBuyerAuditLog.setCreatedate(new Date());
                reportBuyerAuditLog.setNgBpBuyerdetailsId(buyer);
                saveBuyerAuditLogReport(reportBuyerAuditLog);
            }
//            if (action != null && !action.equalsIgnoreCase("Release")) {
//                rfqHeaderObj.setRfqstatus("Pending");
//                updateRfqHeader(rfqHeaderObj);
//            }

            if (action != null && (action.equalsIgnoreCase("Pending") || action.equalsIgnoreCase(""))) {
                System.out.println("action in ON Hold: " + action);
//                rfqHeaderObj.setVendorResponse(0);
                updateRfqHeader(rfqHeaderObj);

//                rfq_line_id = rfq_line_id.substring(0, rfq_line_id.length() - 1);
//                pr_quantity = pr_quantity.substring(0, pr_quantity.length() - 1);
//            pr_baseline_price = pr_baseline_price.substring(0, pr_baseline_price.length() - 1);
                System.out.println("rfq_line_id: " + rfq_line_id);
                System.out.println("pr_quantity: " + pr_quantity);
//            System.out.println("pr_baseline_price: " + pr_baseline_price);

                List<WorkOrderRfqLineItem> rfqLineItemList = findByMultipleRfqLineId(rfq_line_id);
                System.out.println("rfqLineItemList size: " + rfqLineItemList.size());
//            List<PRDetails> prList = findByMultiplePRId(rfq_line_id);
//
                String[] pr_ids_array = rfq_line_id.split(",");
                String[] pr_quantity_array = pr_quantity.split(",");
//            String[] pr_baseline_price_array = pr_baseline_price.split("#");

                for (int i = 0; i < pr_ids_array.length; i++) {

                    WorkOrderRfqLineItem workorderlineitemobj = rfqLineItemList.get(i);
                    NewgenPRLineItem newgenPR = workorderlineitemobj.getNgBpNewgenPRLineItemId();
                    String rfqLineItemPrevQty = workorderlineitemobj.getQuantity();
                    System.out.println("rfqLineItemPrevQty: " + rfqLineItemPrevQty);

                    if (Double.parseDouble(workorderlineitemobj.getQuantity()) != Double.parseDouble(pr_quantity_array[i])) {

                        workorderlineitemobj.setQuantity(pr_quantity_array[i]);
                        updateRfqHeaderLineItem(workorderlineitemobj);

                        /*NewGen*/
                        if (Double.parseDouble(pr_quantity_array[i]) > Double.parseDouble(rfqLineItemPrevQty)) {
                            double q = Double.parseDouble(pr_quantity_array[i]) - Double.parseDouble(rfqLineItemPrevQty);
                            System.out.println("QtyAfterChange: " + q);

                            workorderlineitemobj.getNgBpNewgenPRLineItemId().
                                    setBpQuantityRemaining((Double.parseDouble(newgenPR.getBpQuantityRemaining().trim()) - q) + "");

                            String result = updatePrLineItemNG(workorderlineitemobj.getNgBpNewgenPRLineItemId());
                            System.out.println("result: " + result);

                        } else if (Double.parseDouble(pr_quantity_array[i]) < Double.parseDouble(rfqLineItemPrevQty)) {
                            double q = Double.parseDouble(rfqLineItemPrevQty) - Double.parseDouble(pr_quantity_array[i]);
                            System.out.println("QtyAfterChange: " + q);

                            workorderlineitemobj.getNgBpNewgenPRLineItemId().
                                    setBpQuantityRemaining((Double.parseDouble(newgenPR.getBpQuantityRemaining().trim()) + q) + "");

                            String result = updatePrLineItemNG(workorderlineitemobj.getNgBpNewgenPRLineItemId());
                            System.out.println("result: " + result);
                        }

//                        if (Integer.parseInt(pr_quantity_array[i]) < Integer.parseInt(workorderlineitemobj.getNgBpNewgenPRLineItemId().getBpQuantityRemaining())) {
//                            int q = Integer.parseInt(workorderlineitemobj.getNgBpNewgenPRLineItemId().getBpQuantityRemaining()) - Integer.parseInt(pr_quantity_array[i]);
//                            workorderlineitemobj.getNgBpNewgenPRLineItemId().setBpQuantityRemaining(q + " ");
//                            String result = updatePrLineItemNG(workorderlineitemobj.getNgBpNewgenPRLineItemId());
//                            System.out.println("result: " + result);
//
//                        } else if (Integer.parseInt(pr_quantity_array[i]) == Integer.parseInt(workorderlineitemobj.getNgBpNewgenPRLineItemId().getBpQuantityRemaining())) {
//                            workorderlineitemobj.getNgBpNewgenPRLineItemId().setBpQuantityRemaining("0");
//                            String result = updatePrLineItemNG(workorderlineitemobj.getNgBpNewgenPRLineItemId());
//
//                            System.out.println("result: " + result);
//                        }
                        /*Newgen*/
                    }
                }
            } else if (action != null && action.equalsIgnoreCase("Cancel")) {

                System.out.println("action: " + action);
                rfqHeaderObj.setRfqstatus(action);
                updateRfqHeader(rfqHeaderObj);

//                rfq_line_id = rfq_line_id.substring(0, rfq_line_id.length() - 1);
//                pr_quantity = pr_quantity.substring(0, pr_quantity.length() - 1);
                System.out.println("rfq_line_id: " + rfq_line_id);
                System.out.println("pr_quantity: " + pr_quantity);

                List<WorkOrderRfqLineItem> rfqLineItemList = findByMultipleRfqLineId(rfq_line_id);

                String[] rfq_line_ids_array = rfq_line_id.split(",");
                String[] pr_quantity_array = pr_quantity.split(",");

                /*Newgen*/
                for (int i = 0; i < rfq_line_ids_array.length; i++) {
                    WorkOrderRfqLineItem workorderlineitemobj = rfqLineItemList.get(i);
                    double q = Double.parseDouble(workorderlineitemobj.getNgBpNewgenPRLineItemId().getBpQuantityRemaining()) + Double.parseDouble(pr_quantity_array[i]);
                    workorderlineitemobj.getNgBpNewgenPRLineItemId().setBpQuantityRemaining(q + "");
                    String result = updatePrLineItemNG(workorderlineitemobj.getNgBpNewgenPRLineItemId());
                }
                /*Newgen*/

            }

            if ("On Hold".equals(action)) {
                rfqHeaderObj.setVendorResponse(0);
                updateRfqHeader(rfqHeaderObj);

                reportBuyerAuditLog.setActivityPerformed(rfqHeaderObj.getRfqNumber() + " has been put On Hold.");
                reportBuyerAuditLog.setCreatedate(new Date());
                reportBuyerAuditLog.setNgBpBuyerdetailsId(buyer);
                saveBuyerAuditLogReport(reportBuyerAuditLog);

                for (RfqHeaderVendorMapping vendor : vendorList) {
//                int vendorid = vendor.getId();
                    buyerVendorNotification.setCommentby("Buyer");
                    buyerVendorNotification.setCommentdate(today);
                    buyerVendorNotification.setNotification("<p>" + rfqHeaderObj.getRfqNumber() + " has been put On Hold.</p>");
                    buyerVendorNotification.setReadstatus("false");
                    buyerVendorNotification.setNgBpBuyerdetailsId(buyer);
                    buyerVendorNotification.setNgBpWorkorderrfqheaderRfqid(rfqHeaderObj);
                    buyerVendorNotification.setNgBpVendordetailsId(vendor.getNgBpVendordetailsId());
                    buyerVendorNotification.setUrl("responsemanagement.do?rfqid=" + rfqid + "&buyerid=" + buyer.getId() + "&mappingId=" + vendor.getId());

                    String notificationid = saveBuyerVendorNotification(buyerVendorNotification);
                    System.out.println("notificationid :" + notificationid);

                    vendor.setStatus("On Hold");
                    updateRfqHeaderVendorMapping(vendor);

                    emailTriggerDetails.setMailCC(rfqHeaderObj.getNgBpBuyerdetailsId().getEmailid());
                    emailTriggerDetails.setMailFrom("do-not-reply@natsteel.com.sg");
                    emailTriggerDetails.setMailContentType("text/html;charset=UTF-8"); // default
                    emailTriggerDetails.setMailMessage(rfqHeaderObj.getRfqNumber() + " has been put On Hold");
                    emailTriggerDetails.setMailSubject(rfqHeaderObj.getRfqNumber() + " On Hold");
                    emailTriggerDetails.setMailTo(vendor.getNgBpVendordetailsId().getContactemailid());

                    String MailTrigger = mailTriggerUtil.TriggerMail(emailTriggerDetails);
                    System.out.println("MailTrigger :" + MailTrigger);
                }
            }
            if ("Pending".equals(action)) {
                reportBuyerAuditLog.setActivityPerformed(rfqHeaderObj.getRfqNumber() + " has been released.");
                reportBuyerAuditLog.setCreatedate(new Date());
                reportBuyerAuditLog.setNgBpBuyerdetailsId(buyer);
                saveBuyerAuditLogReport(reportBuyerAuditLog);

                for (RfqHeaderVendorMapping vendor : vendorList) {
//                int vendorid = vendor.getId();
                    buyerVendorNotification.setCommentby("Buyer");
                    buyerVendorNotification.setCommentdate(today);
                    buyerVendorNotification.setNotification("<p>" + rfqHeaderObj.getRfqNumber() + " has been Released.</p>");
                    buyerVendorNotification.setReadstatus("false");
                    buyerVendorNotification.setNgBpBuyerdetailsId(buyer);
                    buyerVendorNotification.setNgBpWorkorderrfqheaderRfqid(rfqHeaderObj);
                    buyerVendorNotification.setNgBpVendordetailsId(vendor.getNgBpVendordetailsId());
                    buyerVendorNotification.setUrl("responsemanagement.do?rfqid=" + rfqid + "&buyerid=" + buyer.getId() + "&mappingId=" + vendor.getId());

//                    if("Bid Submitted".equals(vendor.getStatus())){
                    vendor.setStatus("Pending");
//                    }
                    updateRfqHeaderVendorMapping(vendor);
                    String notificationid = saveBuyerVendorNotification(buyerVendorNotification);
                    System.out.println("notificationid :" + notificationid);

                    emailTriggerDetails.setMailCC(rfqHeaderObj.getNgBpBuyerdetailsId().getEmailid());
                    emailTriggerDetails.setMailFrom("do-not-reply@natsteel.com.sg");
                    emailTriggerDetails.setMailContentType("text/html;charset=UTF-8"); // default
                    emailTriggerDetails.setMailMessage(rfqHeaderObj.getRfqNumber() + " has been released");
                    emailTriggerDetails.setMailSubject(rfqHeaderObj.getRfqNumber() + " Released");
                    emailTriggerDetails.setMailTo(vendor.getNgBpVendordetailsId().getContactemailid());

//                    String MailTrigger = TriggerMail(emailTriggerDetails);
                    String MailTrigger = mailTriggerUtil.TriggerMail(emailTriggerDetails);
                    System.out.println("MailTrigger :" + MailTrigger);
                }
            }

            if ("Cancel".equals(action)) {
                reportBuyerAuditLog.setActivityPerformed(rfqHeaderObj.getRfqNumber() + " has been canceled.");
                reportBuyerAuditLog.setCreatedate(new Date());
                reportBuyerAuditLog.setNgBpBuyerdetailsId(buyer);
                saveBuyerAuditLogReport(reportBuyerAuditLog);

                for (RfqHeaderVendorMapping vendor : vendorList) {
//                int vendorid = vendor.getId();
                    buyerVendorNotification.setCommentby("Buyer");
                    buyerVendorNotification.setCommentdate(today);
                    buyerVendorNotification.setNotification("<p>" + rfqHeaderObj.getRfqNumber() + " has been Canceled.</p>");
                    buyerVendorNotification.setReadstatus("false");
                    buyerVendorNotification.setNgBpBuyerdetailsId(buyer);
                    buyerVendorNotification.setNgBpWorkorderrfqheaderRfqid(rfqHeaderObj);
                    buyerVendorNotification.setNgBpVendordetailsId(vendor.getNgBpVendordetailsId());
                    buyerVendorNotification.setUrl("responsemanagement.do?rfqid=" + rfqid + "&buyerid=" + buyer.getId() + "&mappingId=" + vendor.getId());

                    vendor.setStatus("Cancel");

//                    if("Bid Submitted".equals(vendor.getStatus())){
//                        vendor.setStatus("Pending");
//                    }
                    updateRfqHeaderVendorMapping(vendor);
                    String notificationid = saveBuyerVendorNotification(buyerVendorNotification);
                    System.out.println("notificationid :" + notificationid);

                    emailTriggerDetails.setMailCC(rfqHeaderObj.getNgBpBuyerdetailsId().getEmailid());
                    emailTriggerDetails.setMailFrom("do-not-reply@natsteel.com.sg");
                    emailTriggerDetails.setMailContentType("text/html;charset=UTF-8"); // default
                    emailTriggerDetails.setMailMessage(rfqHeaderObj.getRfqNumber() + " has been put canceled");
                    emailTriggerDetails.setMailSubject(rfqHeaderObj.getRfqNumber() + " canceled");
                    emailTriggerDetails.setMailTo(vendor.getNgBpVendordetailsId().getContactemailid());

//                    String MailTrigger = TriggerMail(emailTriggerDetails);
                    String MailTrigger = mailTriggerUtil.TriggerMail(emailTriggerDetails);
                    System.out.println("MailTrigger :" + MailTrigger);
                }
            }

        } catch (NumberFormatException | ParseException ex) {
            Logger.getLogger(RfqRfpManagement.class.getName()).log(Level.SEVERE, null, ex);
        }
        return new ModelAndView("redirect:/mytask.do");
    }

    @RequestMapping(value = "/submitrfpdetails", method = RequestMethod.POST)
    public ModelAndView submitRfpDetails(HttpServletRequest request, HttpServletResponse response, Map<String, Object> modalMap, RedirectAttributes redirect) {
        System.out.println("submitrfpdetails");
        try {
            DateFormat format = new SimpleDateFormat("dd.MM.yyyy");

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();

            Date today = new Date();

            String vendorname = request.getParameter("ro_vendorname");
            String sapVendorCodes = request.getParameter("ro_sapVendorCode");
            String deliveryTerms = request.getParameter("deliveryterms");
            String paymentterms = request.getParameter("paymentterms");
            String rfqvaliduntil = request.getParameter("rfqvaliduntil");
            String expecteddeliverydate = request.getParameter("expecteddeliverydate");

            String contactpersonename = request.getParameter("contactpersonename");
            String contactpersonetelno = request.getParameter("contactpersonetelno");
            String contactpersoneemail = request.getParameter("contactpersoneemail");
            String notifyvendor = request.getParameter("ro_notifyVendor");
            String rfpType = request.getParameter("rfpType");

            System.out.println("vendorname: " + vendorname);
            System.out.println("sapVendorCodes: " + sapVendorCodes);
            System.out.println("deliveryterms: " + deliveryTerms);
            System.out.println("paymentterms: " + paymentterms);
            System.out.println("rfqvaliduntil: " + rfqvaliduntil);
            System.out.println("expecteddeliverydate: " + expecteddeliverydate);
            System.out.println("contactpersonename: " + contactpersonename);
            System.out.println("contactpersonetelno: " + contactpersonetelno);
            System.out.println("contactpersoneemail: " + contactpersoneemail);
            System.out.println("notifyvendor: " + notifyvendor);
            System.out.println("rfpType: " + rfpType);

            Date rfqvaliduntilDate = null;
            if (rfqvaliduntil != null) {
                rfqvaliduntilDate = format.parse(rfqvaliduntil);
                System.out.println("rfqvaliduntilDate: " + rfqvaliduntilDate);
            }
            Date expecteddeliverydateDate = null;
            if (expecteddeliverydate != null) {
                System.out.println("expecteddeliverydate: " + expecteddeliverydate);
                expecteddeliverydateDate = format.parse(expecteddeliverydate);
                System.out.println("expecteddeliverydateDate: " + expecteddeliverydateDate);
            }

            int vendorCount = 0;
            if (vendorname != null && !vendorname.trim().equals("")) {
                List<String> vendorids = Arrays.asList(vendorname.split("\\s*,\\s*"));
                vendorCount += vendorids.size();
            }
            if (sapVendorCodes != null && !sapVendorCodes.trim().equals("")) {
                List<String> sapVendorIds = Arrays.asList(sapVendorCodes.split("\\s*,\\s*"));
                vendorCount += sapVendorIds.size();
            }
            System.out.println("vendorCount: " + vendorCount);

            rfpHeader.setpRType(rfpType);
            rfpHeader.setCreationdate(today);
            rfpHeader.setUpdationdate(today);
            rfpHeader.setContactPersonEmail(contactpersoneemail);
            rfpHeader.setContactPersonName(contactpersonename);
            rfpHeader.setContactPersonTel(contactpersonetelno);
            rfpHeader.setDeliveryTerms(deliveryTerms);
            rfpHeader.setExpectedDeliveryDate(expecteddeliverydateDate);
            rfpHeader.setRfpRequestdate(today);
            rfpHeader.setPaymentTerms(paymentterms);
            rfpHeader.setRfqValidUntil(rfqvaliduntilDate);
            rfpHeader.setNgBpBuyerdetailsId(buyer);
            rfpHeader.setRfpStatus(rfp_create);
            rfpHeader.setVendorCount(vendorCount + "");
            rfpHeader.setNotifyVendor(notifyvendor);

            String rfpid = saveRfpHeader(rfpHeader, rfpType);
            System.out.println("rfpid: " + rfpid);

            WorkOrderRfpHeader rfpHeaderObj = findRfpHeaderById(Integer.parseInt(rfpid));

            reportBuyerAuditLog.setActivityPerformed(rfpHeaderObj.getRfpNumber() + " Created");
            reportBuyerAuditLog.setCreatedate(new Date());
            reportBuyerAuditLog.setNgBpBuyerdetailsId(buyer);
            saveBuyerAuditLogReport(reportBuyerAuditLog);

            // SAP Vendor
            String newVendorIds = "";
            if (sapVendorCodes != null && !sapVendorCodes.trim().equals("")) {
                List<MasterVendor> sapVendorMasterList = purchaseOrderWSUtil.findVendorMasterByMultipleVendorCode(sapVendorCodes);
                System.out.println("sapVendorMasterList size: " + sapVendorMasterList.size());
                for (int i = 0; i < sapVendorMasterList.size(); i++) {
                    MasterVendor vendorMasterObj = sapVendorMasterList.get(i);

                    vendorDetailsEntity.setType("SAP");
                    vendorDetailsEntity.setStatus("Active");
                    vendorDetailsEntity.setCode(vendorMasterObj.getVendorCode());
                    vendorDetailsEntity.setFirstname(vendorMasterObj.getVendorName());
                    vendorDetailsEntity.setEmailid(vendorMasterObj.getMailId());
                    vendorDetailsEntity.setAddress(vendorMasterObj.getAddress1());

                    String savedVendorId = rfqRfpUtilWS.saveProspect(vendorDetailsEntity);

                    if (i == sapVendorMasterList.size() - 1) {
                        newVendorIds += savedVendorId;
                    } else {
                        newVendorIds += savedVendorId + ",";
                    }

                    vendorMasterObj.setBpIsMapped("Yes");
                    purchaseOrderWSUtil.updateVendorMaster(vendorMasterObj);
                }
                System.out.println("newVendorIds 1: " + newVendorIds);
                if (vendorname != null && !vendorname.trim().equals("")) {
                    vendorname += "," + newVendorIds;
                } else {
                    vendorname = newVendorIds;
                }
                System.out.println("newVendorIds 2: " + vendorname);
            }

            List<VendorDetails> vendorList = findByMultipleVendorId(vendorname);

            for (VendorDetails vendor : vendorList) {
                System.out.println("vendorid: " + vendor);
                rfpHeaderVendorMapping.setNgBpVendordetailsId(vendor);
                rfpHeaderVendorMapping.setNgBpWorkorderrfpheaderId(rfpHeaderObj);
                rfpHeaderVendorMapping.setStatus("Pending");
                String mappingId = saveRfpHeaderVendorMapping(rfpHeaderVendorMapping);
                System.out.println("mappingId: " + mappingId);

                buyerVendorNotification.setCommentby("Buyer");
                buyerVendorNotification.setCommentdate(today);
                buyerVendorNotification.setNotification("<p>" + rfpHeaderObj.getRfpNumber() + " has been assigned to you.</p>");
                buyerVendorNotification.setReadstatus("false");
                buyerVendorNotification.setNgBpBuyerdetailsId(buyer);
                buyerVendorNotification.setNgBpVendordetailsId(vendor);
                buyerVendorNotification.setUrl("#");
                saveBuyerVendorNotification(buyerVendorNotification);

                emailTriggerDetails.setMailCC(buyer.getEmailid());
                emailTriggerDetails.setMailFrom("do-not-reply@natsteel.com.sg");
                emailTriggerDetails.setMailContentType("text/html;charset=UTF-8");
                emailTriggerDetails.setMailTo(vendor.getContactemailid());
                emailTriggerDetails.setMailSubject(rfpHeaderObj.getRfpNumber() + " Assigned ");

                if (vendor.getType() != null && vendor.getType().equals("SAP")) {
                    emailTriggerDetails.setMailMessage(rfpHeaderObj.getRfpNumber() + " has been assigned to you, please review and bid.<br>Click below link to self-register<br><a href='" + WebServiceCall_IP + "/VendorPortal/selfregistration.do?id=" + vendor.getId() + "'>Self-Register</a>");
                } else {
                    emailTriggerDetails.setMailMessage(rfpHeaderObj.getRfpNumber() + " has been assigned to you, please review and bid.");
                }

                String MailTrigger = mailTriggerUtil.TriggerMail(emailTriggerDetails);
                System.out.println("MailTrigger :" + MailTrigger);

            }

            String[] itemNumber = request.getParameterValues("itemNumberClass");
            String[] plantId = request.getParameterValues("plantIdClass");
            String[] materialId = request.getParameterValues("materialIdClass");
            String[] deliveryDate = request.getParameterValues("deliveryDateClass");
            String[] quantity = request.getParameterValues("quantityClass");
            String[] notesToSupplier = request.getParameterValues("notesToSupplierClass");
            String[] localPurchase = request.getParameterValues("localPurchaseClass");

            System.out.println("itemNumber: " + itemNumber.length);
            System.out.println("plantId: " + plantId.length);
            System.out.println("materialId: " + materialId.length);
            System.out.println("deliveryDate: " + deliveryDate.length);
            System.out.println("quantity: " + quantity.length);
            System.out.println("notesToSupplier: " + notesToSupplier.length);
            System.out.println("localPurchase: " + localPurchase.length);

            DateFormat dFormat = new SimpleDateFormat("yyyy-MM-dd");

            for (int i = 0; i < itemNumber.length; i++) {
                System.out.println("DeliveryDate: " + deliveryDate[i]);

                MasterMaterialGeneral material = getMasterMaterialGeneralById(Integer.parseInt(materialId[i]));
                MasterPlant plant = getMasterPlantById(Integer.parseInt(plantId[i]));

                rfpLineItem.setWorkOrderRfpHeaderID(rfpHeaderObj);
                rfpLineItem.setPlantMasterId(plant);
                rfpLineItem.setMaterialMatserId(material);
                rfpLineItem.setItemNumber(itemNumber[i]);
                rfpLineItem.setQuantity(quantity[i]);
                try {
                    rfpLineItem.setNotesToSupplier(notesToSupplier[i]);
                } catch (ArrayIndexOutOfBoundsException ex) {
                    System.out.println("ex: " + ex);
                    rfpLineItem.setNotesToSupplier(null);
                }

                rfpLineItem.setDeliveryDate(dFormat.parse(deliveryDate[i]));
                rfpLineItem.setLocalPurchase(localPurchase[i]);

                String id = saveWorkOrderRfpLineItem(rfpLineItem);
                System.out.println("Id: " + id);
            }

            redirect.addFlashAttribute("RfpNumber", rfpHeaderObj.getRfpNumber());

        } catch (NumberFormatException | ParseException ex) {
            Logger.getLogger(RfqRfpManagement.class.getName()).log(Level.SEVERE, null, ex);
        }
        return new ModelAndView("redirect:/managerfp.do");
    }

    @RequestMapping(value = "/managerfp")
    public ModelAndView manageRfp(ModelMap model) {
        System.out.println("managerfp");

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();

        int buyerid = buyer.getId();

        List<WorkOrderRfpHeader> rfpHeaderList = findRfpHeaderByBuyerId(buyerid);
        System.out.println("rfpHeaderList size: " + rfpHeaderList.size());

        model.put("RfpHeaderList", rfpHeaderList);

        return new ModelAndView("managerfp");
    }

    @RequestMapping(value = "/rfpdetails")
    public ModelAndView showRfpDetails(@RequestParam("id") int id, ModelMap model) {
        System.out.println("rfpdetails");

        WorkOrderRfpHeader rfpHeaderObj = findRfpHeaderById(id);

        List<RfpHeaderVendorMapping> vendorList = findVendorByRfpId(id);
        List<VendorDetails> activeVendorList = findByStatusAndType("Active", "Vendor");
        List<VendorDetails> activeProspectList = findByStatusAndType("Active", "Prospect");
        List<WorkOrderRfpLineItem> rfpLineItemList = findRfpLineItemByRfpHeaderId(id);

        model.addAttribute("VendorList", activeVendorList);
        model.addAttribute("ProspectList", activeProspectList);
        model.put("RfpHeader", rfpHeaderObj);
        model.put("VendorMappingList", vendorList);
        model.put("rfpLineItemList", rfpLineItemList);

        return new ModelAndView("rfpdetails");
    }

    @RequestMapping(value = "/vendorrfqdetails", method = RequestMethod.GET)
    public ModelAndView vendorRfqDetails(HttpServletRequest request, Map<String, Object> map) {
        System.out.println("vendorrfqdetails");

        String vendorid = request.getParameter("vendorid");
        String rfqid = request.getParameter("rfqid");

        System.out.println("vendorid in vendorrfqdetails :" + vendorid);
        System.out.println("rfqid in vendorrfqdetails :" + rfqid);

        List<SupplierHeader> supplierHeaders = (List<SupplierHeader>) getSupplierHeaderByVendoridAndStatusAndRfqid(Integer.parseInt(vendorid), Integer.parseInt(rfqid), "Bid Submitted");
        SupplierHeader supplierHeaderObj = supplierHeaders.get(0);

        List<WorkOrderRfqHeader> workOrderList = getWorkOrderById(Integer.parseInt(rfqid));
        WorkOrderRfqHeader workOrderListObj = workOrderList.get(0);

        System.out.println(workOrderListObj.getBilltoaddress());

        int suppplierid = supplierHeaderObj.getId();
        System.out.println("supplierid :" + suppplierid);

        List<VendorRfqLineItemBean> venorRfqLineItemBeanlist = callVendorRfqPrLineItemStoredProcedure(Integer.parseInt(rfqid), Integer.parseInt(vendorid), "", 0);
        System.out.println("venorRfqLineItemBeanlist size: " + venorRfqLineItemBeanlist.size());

        VendorDetails vendorDetailsObj = findVendorById(Integer.parseInt(vendorid));
        String vendorName = vendorDetailsObj.getFirstname() + " " + vendorDetailsObj.getLastname();

        map.put("SupplierHeaderObj", supplierHeaderObj);
        map.put("WorkOrderListObj", workOrderListObj);
        map.put("venorRfqLineItemBeanlist", venorRfqLineItemBeanlist);
        map.put("vendorName", vendorName);
        map.put("VendorObj", vendorDetailsObj);
        map.put("NGwebserviceIp", NGwebservice_ip);
        map.put("WebServiceCallIp", WebServiceCall_IP);

        return new ModelAndView("vendorrfqdetails", "map", map);
    }
//abhishek

    @RequestMapping(value = "/submitcontractrfqdetails", method = RequestMethod.POST)
    public ModelAndView submitContractRfqDetails(HttpServletRequest request, HttpServletResponse response, Map<String, Object> modalMap, RedirectAttributes redirect) throws IOException, DocumentException, ParseException, com.lowagie.text.DocumentException {
        System.out.println("submitcontractrfqdetails");
        DateFormat format = new SimpleDateFormat("dd-MM-yyyy");
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        int buyerid = buyer.getId();
        Date today = new Date();
        String contractRefId = request.getParameter("contractRefId");
        System.out.println("contractRefId-->" + contractRefId);
        String vendorname = request.getParameter("ro_vendorname");
        System.out.println("vendorname-->" + vendorname);
        List<VendorDetails> vendorList = findByMultipleVendorId(vendorname);
        System.out.println("vendorList in savecontract: " + vendorList);
        String deliveryterms = request.getParameter("co_deliveryterms");
        String paymentterms = request.getParameter("co_paymentterms");
        String rfqvaliduntil = request.getParameter("co_rfqvaliduntil");
        String rfqcloseson = request.getParameter("ro_expecteddeliverydate");
        String RFQTitle = request.getParameter("RFQTitle");
        String contactpersonename = request.getParameter("contactpersonename");
        String contactpersonetelno = request.getParameter("contactpersonetelno");
        String contactpersoneemail = request.getParameter("contactpersoneemail");
        
        String termofcontract = request.getParameter("termofcontract");
        String extofcontract = request.getParameter("extofcontract");
        
        String autosendpo = request.getParameter("co_AutoSendPO");
        String notifyvendor = request.getParameter("co_NotifyVendor");
        String vendorrecipients = request.getParameter("co_VendorRecipients");
        String internalrecipients = request.getParameter("co_InternalRecipients");
        System.out.println("vendorrecipients: " + vendorrecipients);
        System.out.println("internalrecipients: " + internalrecipients);
        String comment = request.getParameter("co_comment");
        String contractType = request.getParameter("contractType");
        System.out.println("contractType: " + contractType);

        System.out.println("vendorname: " + vendorname);
        String contract_ids = request.getParameter("contract_ids");
        String contract_quantity = request.getParameter("contract_quantity");
        String contract_att_temp_ids = request.getParameter("contract_att_temp_ids");
        String ro_noteToSupl = request.getParameter("ro_noteToSupl");
        
        String selectparameters = request.getParameter("ro_selectparameters");
        String ratedParameterHidden = request.getParameter("ratedParameterHidden");
        String ratedParameterWeigthHidden = request.getParameter("ratedParameterWeigthHidden");
        
        String ratedParam=request.getParameter("ratedParam");

        String agreementdate = request.getParameter("agreementdate");
        String validitystartdate = request.getParameter("validitystartdate");
        String validityenddate = request.getParameter("validityenddate");
        String PurchOrganization = request.getParameter("PurchOrganization");
        String PurchaseGroup = request.getParameter("PurchaseGroup");
        
        

        List<NGExtCM> contract = findContractHeaderByPId(contractRefId);
        System.out.println("agreementdate-->" + agreementdate);
        System.out.println("contract.get(0).getContractType()-->" + contract.get(0).getContractType());
        System.out.println("contract.get(0).getOLAValue()-->" + contract.get(0).getOLAValue());
        System.out.println("contractRefId-->" + contractRefId);
        System.out.println("validitystartdate-->" + validitystartdate);
        System.out.println("validityenddate-->" + validityenddate);
        Date agreementdate1 = null;
        Date validitystartdate1 = null;
        Date validityenddate1 = null;
        System.out.println("agreementdate: " + agreementdate);
        if (agreementdate != null && !agreementdate.equals("")) {

            agreementdate1 = format.parse(agreementdate);

            System.out.println("agreementdate1: " + agreementdate1);
        }
        System.out.println("validitystartdate: " + validitystartdate);
        if (validitystartdate != null && !validitystartdate.equals("")) {

            validitystartdate1 = format.parse(validitystartdate);

            System.out.println("validitystartdate1: " + validitystartdate1);
        }
        System.out.println("validityenddate: " + validityenddate);
        if (validityenddate != null && !validityenddate.equals("")) {

            validityenddate1 = format.parse(validityenddate);

            System.out.println("validityenddate1: " + validityenddate1);
        }
        cMHeaderAgreementInfo.setAgreementDate(agreementdate1);
        cMHeaderAgreementInfo.setAgreementType(contract.get(0).getContractType());//
        //  cMHeaderAgreementInfo.setCurrency(contract.get();//
        cMHeaderAgreementInfo.setFinalAgreementValue(contract.get(0).getOLAValue());//
        cMHeaderAgreementInfo.setTransactionID(contractRefId);
        cMHeaderAgreementInfo.setValidityStartDate(validitystartdate1);
        cMHeaderAgreementInfo.setValidityEndDate(validityenddate1);

        List<CMHeaderAgreementInfo> cmHeaderAgInfoList = contractManagement.findContractHeaderAgreementInfo(cMHeaderAgreementInfo.getTransactionID());

        String msgAgreement = "", msgOla = "";
        if (cmHeaderAgInfoList.size() > 0) {
            cMHeaderAgreementInfo.setSno(cmHeaderAgInfoList.get(0).getSno());
            msgAgreement = contractManagement.updateAgreementData(cMHeaderAgreementInfo);
        } else {
            msgAgreement = contractManagement.saveAgreementData(cMHeaderAgreementInfo);
        }

        cMHeaderOLAInfo.setPurchaseGroup(PurchaseGroup);
        cMHeaderOLAInfo.setPurchaseOrganization(PurchOrganization);
        cMHeaderOLAInfo.setTransactionID(contractRefId);
        cMHeaderOLAInfo.setTermofcontract(termofcontract);
        cMHeaderOLAInfo.setExtofcontract(extofcontract);
        //termofcontract,extofcontract
        List<CMHeaderOLAInfo> cmHeaderOLAInfoList = contractManagement.findContractHeaderOLAInfo(cMHeaderOLAInfo.getTransactionID());

        if (cmHeaderOLAInfoList.size() > 0) {
            cMHeaderOLAInfo.setSno(cmHeaderOLAInfoList.get(0).getSno());
            msgOla = contractManagement.updateOLA(cMHeaderOLAInfo);
        } else {
            msgOla = contractManagement.saveOLA(cMHeaderOLAInfo);
        }

        System.out.println("contract_ids: " + contract_ids);
        System.out.println("contract_quantity: " + contract_quantity);
        System.out.println("contract_att_temp_ids: " + contract_att_temp_ids);

        contractHeader.setRFQTitle(RFQTitle);
        contractHeader.setContactpersonename(contactpersonename);
        contractHeader.setContactpersoneemail(contactpersoneemail);
        contractHeader.setContactpersonetelno(contactpersonetelno);
        contractHeader.setDeliveryterms(deliveryterms);
        contractHeader.setPaymentterms(paymentterms);
        contractHeader.setPid(contractRefId);
        
        

        String[] ratedParameterHiddenArray = ratedParameterHidden.split(",");
        String[] ratedParameterWeigthHiddenArray = ratedParameterWeigthHidden.split(",");

//        for (int i = 0; i < ratedParameterHiddenArray.length; i++) {
//            if (null != ratedParameterHiddenArray[i]) {
//                switch (ratedParameterHiddenArray[i]) {
//
//                    case "MoqMovDetailsRatedParameter":
//                        contractHeader.setmOQMOVDetailsRatedParameter("true");
//                        contractHeader.setmOQMOVDetailsRatedParameterWeight(ratedParameterWeigthHiddenArray[i]);
//                        break;
//                    case "DeliveryLeadTimeRatedParameter":
//                        contractHeader.setDeliveryLeadTImeRatedParameter("true");
//                        contractHeader.setDeliveryLeadTImeRatedParameterWeight(ratedParameterWeigthHiddenArray[i]);
//                        break;
//                    case "PaymentTermsRatedParameter":
//                        contractHeader.setPaymentTermsRatedParameter("true");
//                        contractHeader.setPaymentTermsRatedParameterWeight(ratedParameterWeigthHiddenArray[i]);
//                        break;
//                    case "BrandModelRatedParameter":
//                        contractHeader.setBrandModelRatedParameter("true");
//                        contractHeader.setBrandModelRatedParameterWeight(ratedParameterWeigthHiddenArray[i]);
//                        break;
//                    case "IncotermsRatedParameter":
//                        contractHeader.setIncotermsRatedParameter("true");
//                        contractHeader.setIncotermsRatedParameterWeight(ratedParameterWeigthHiddenArray[i]);
//                        break;
//                    case "ValidityOfOfferRatedParameter":
//                        contractHeader.setValidityOfferRatedParameter("true");
//                        contractHeader.setValidityOfferRatedParameterWeight(ratedParameterWeigthHiddenArray[i]);
//                        break;
//                }
//            }
//        }

        Date rfqvaliduntilDate = null;
        try {
            if (rfqvaliduntil != null) {

                rfqvaliduntilDate = format.parse(rfqvaliduntil);

                System.out.println("rfqvaliduntilDate: " + rfqvaliduntilDate);
            }
            Date rfqclosesonDate = null;
            System.out.println("rfqcloseson: " + rfqcloseson);
            if (rfqcloseson != null && !rfqcloseson.equals("")) {

                rfqclosesonDate = format.parse(rfqcloseson);

                System.out.println("rfqclosesonDate: " + rfqclosesonDate);
            }
            System.out.println("Break Point");
            contractHeader.setRfqRequestDate(today);
            contractHeader.setExpecteddeliverydate(rfqclosesonDate);
            contractHeader.setRfqvaliduntil(rfqvaliduntilDate);
            contractHeader.setAutosendpo(autosendpo);
            contractHeader.setNotifyvendor(notifyvendor);
            contractHeader.setInternalrecipients(internalrecipients);
            contractHeader.setVendorrecipients(vendorrecipients);
            contractHeader.setComment(comment);
            contractHeader.setCreationdate(today);
            contractHeader.setNgBpBuyerdetailsId(buyer);
            contractHeader.setUpdatedate(today);
            contractHeader.setRfqstatus("Pending");
            contractHeader.setVendorCount(vendorList.size());
            contractHeader.setVendorResponse(0);
            contractHeader.setCreatedby(buyer.getUsername());
            
            contractHeader.setPid(contractRefId);
            
            
            contractHeader.setPid_Details(contract.get(0));
           /// contractHeader.set
            System.out.println("Break Point 1");
            String rfqid = saveContractRfqHeader(contractHeader, contractType);
            contract_ids = contract_ids.substring(0, contract_ids.length() - 1);
            contract_quantity = contract_quantity.substring(0, contract_quantity.length() - 1);
            contract_att_temp_ids = contract_att_temp_ids.substring(0, contract_att_temp_ids.length() - 1);
            ro_noteToSupl= ro_noteToSupl.substring(0, ro_noteToSupl.length() - 1);
//
            System.out.println("contract_ids: " + contract_ids);
            System.out.println("contract_quantity: " + contract_quantity);
            System.out.println("contract_att_temp_ids: " + contract_att_temp_ids);
            System.out.println("ro_noteToSupl: " + ro_noteToSupl);
//           
//            List<NewgenPRLineItem> newgenList = findByMultipleNewgenPRLineItemId(contract_ids);
            ContractRfqHeader contractRfqHeaderObj = findContractRfqHeaderById(Integer.parseInt(rfqid));
            String rfqNumber = contractRfqHeaderObj.getRfqNumber();
            System.out.println("rfqNumber: " + rfqNumber);
            redirect.addFlashAttribute("RfqNumber", rfqNumber);
            //String rfqid = saveContractRfqHeader(contractHeader, contractType);
            reportBuyerAuditLog.setActivityPerformed(rfqNumber + " Created");
            reportBuyerAuditLog.setCreatedate(new Date());
            reportBuyerAuditLog.setNgBpBuyerdetailsId(buyer);
            saveBuyerAuditLogReport(reportBuyerAuditLog);
            List<NewgenContractLineItem> newgenList = findContractLineByPID(contractRefId);
            System.out.println("newgenList size :" + newgenList.size());
            redirect.addFlashAttribute("RfqNumber", rfqNumber);
//           
            String[] contract_ids_array = contract_ids.split(",");
            String[] contract_quantity_array = contract_quantity.split(",");
            String[] contract_att_temp_ids_array = contract_att_temp_ids.split(",");
            
             String[] ro_noteToSupl_array = ro_noteToSupl.split(",");
            
            
             for (int i = 0; i < contract_ids_array.length; i++) {
                 
                 NewgenContractLineItem newgenLineItem = newgenList.get(i);

                BigDecimal qty = new BigDecimal(contract_quantity_array[i]);
                System.out.println("qty-->" + qty);
                System.out.println("NoteToSupl_array[i]-->" + ro_noteToSupl_array[i]);
                contractRfqLineItem.setQuantity(qty);
                contractRfqLineItem.setContractRfqHeaderRFQID(contractRfqHeaderObj);
                contractRfqLineItem.setNewgenContractLineItemId(newgenList.get(i));
                contractRfqLineItem.setNoteToSupplier(ro_noteToSupl_array[i]);
                
                
            if (contract_att_temp_ids_array[i] != null && !contract_att_temp_ids_array[i].equalsIgnoreCase("non") && !contract_att_temp_ids_array[i].equalsIgnoreCase("")) {
             ContractAttachmentTemp obj = findContractLineItemTempAttachmentById(Integer.parseInt(contract_att_temp_ids_array[i]));
                    contractRfqLineItem.setContractAttachmentTempID(obj);
                    contractAttTemp.setAttachment1(obj.getAttachment1());
                    contractAttTemp.setAttachment1name(obj.getAttachment1name());

                    contractAttTemp.setAttachment2(obj.getAttachment2());
                    contractAttTemp.setAttachment2name(obj.getAttachment2name());

                    contractAttTemp.setAttachment3(obj.getAttachment3());
                    contractAttTemp.setAttachment3name(obj.getAttachment3name());

                    contractAttTemp.setAttachment4(obj.getAttachment4());
                    contractAttTemp.setAttachment4name(obj.getAttachment4name());

                    contractAttTemp.setAttachment5(obj.getAttachment5());
                    contractAttTemp.setAttachment5name(obj.getAttachment5name());
                    
                    contractAttTemp.setRFQNo(rfqNumber);
                    
                    PRLineDocInput.setRfqNo(rfqNumber);
                    PRLineDocInput.setLinkID(newgenLineItem.getLinkid());
                    PRLineDocInput.setPID(contractRefId);
                    PRLineDocInput.setQuantity(contract_quantity_array[i]);
                    PRLineDocInput.setWorkstep(contract.get(0).getCurrentworkstep());
                    PRLineDocInput.setShortText(newgenLineItem.getShortText());
                    PRLineDocInput.setRequestorID(contract.get(0).getInitiatorID());
                    PRLineDocInput.setMaterialCode(newgenLineItem.getMaterialCode());
                    PRLineDocInput.setVendorID("");

                    PRLineDocInput.setAttachment1(obj.getAttachment1());
                    PRLineDocInput.setAttachment1name(obj.getAttachment1name());
                    PRLineDocInput.setAttachment2(obj.getAttachment2());
                    PRLineDocInput.setAttachment2name(obj.getAttachment2name());
                    PRLineDocInput.setAttachment3(obj.getAttachment3());
                    PRLineDocInput.setAttachment3name(obj.getAttachment3name());
                    PRLineDocInput.setAttachment4(obj.getAttachment4());
                    PRLineDocInput.setAttachment4name(obj.getAttachment4name());
                    PRLineDocInput.setAttachment5(obj.getAttachment5());
                    PRLineDocInput.setAttachment5name(obj.getAttachment5name());

                    try {
                        Output_Resp DMSUploadResponse = newgenContractDocControl(PRLineDocInput);
                        System.out.println("DMSUploadResponse: " + DMSUploadResponse);

                        redirect.addFlashAttribute("DMSUploadResponseMainCode", DMSUploadResponse.getMainCode());
                        redirect.addFlashAttribute("DMSUploadResponsePID", DMSUploadResponse.getProcessInstanceID());
                        redirect.addFlashAttribute("DMSUploadResponseMessage", DMSUploadResponse.getMessage());
                    } catch (Exception e) {
                        redirect.addFlashAttribute("DMSUploadFailed", "Document upload to DMS has failed!");
                    }
            }
            String id = saveContractRfqHeaderLineItem(contractRfqLineItem);
                System.out.println("line item id: " + id);
           
                

                System.out.println("newgenLineItem.getBpQuantityRemaining(): " + newgenLineItem.getBpQuantityRemaining());

                //   System.out.println("newgenLineItem.getBpQuantityRemaining(): " + newgenLineItem.getBpQuantityRemaining());
                int res;
                if (newgenLineItem.getBpQuantityRemaining() == null) {
                    newgenLineItem.setBpQuantityRemaining(new BigDecimal("0"));
                }

                res = new BigDecimal(contract_quantity_array[i]).compareTo(newgenLineItem.getBpQuantityRemaining());
                System.out.println("contract_quantity_array[i]-->" + contract_quantity_array[i]);
                System.out.println("newgenLineItem.getBpQuantityRemaining()-->" + newgenLineItem.getBpQuantityRemaining());
                System.out.println("res-->" + res);
                //   if (Integer.parseInt(contract_quantity_array[i]) < Integer.parseInt(newgenLineItem.getBpQuantityRemaining())) {
                if (res == -1) {
                    //  int q = Integer.parseInt(newgenLineItem.getBpQuantityRemaining()) - Integer.parseInt(contract_quantity_array[i]);

                    //  System.out.println("Quantity :" + q);
                    newgenLineItem.setBpQuantityRemaining(newgenLineItem.getBpQuantityRemaining().subtract(new BigDecimal(contract_quantity_array[i])));
                    newgenLineItem.setBpRfqStatus("Initiated");
                    System.out.println("Newgen :" + newgenLineItem);
                    String result = updateNewgenContractLineItem(newgenLineItem);
                    System.out.println("result: " + result);
                } else if (res == 1) {

                    newgenLineItem.setBpQuantityRemaining(new BigDecimal(contract_quantity_array[i]).subtract(newgenLineItem.getBpQuantityRemaining()));
                    newgenLineItem.setBpRfqStatus("Initiated");
                    System.out.println("Newgen :" + newgenLineItem);
                    String result = updateNewgenContractLineItem(newgenLineItem);
                    System.out.println("result: " + result);
                } else if (res == 0) {
                    newgenLineItem.setBpQuantityRemaining(new BigDecimal("0"));
                    newgenLineItem.setBpRfqStatus("Initiated");
                    String result = updateNewgenContractLineItem(newgenLineItem);
                    System.out.println("result: " + result);
                }
            }

            BuyerDetails buyerDetailsObj = findBuyerById(buyerid);
            ContractRfqHeader rfqHeaderObj = findContractRfqHeaderById(Integer.parseInt(rfqid));
            System.out.println("BreakPoint 1");
            for (VendorDetails vendor : vendorList) {
                System.out.println("BreakPoint 2");
                

                System.out.println("BreakPoint 3");
                int vendorid = vendor.getId();
                System.out.println("vendor" + vendorid);
                buyerVendorNotification.setCommentby("Buyer");
                buyerVendorNotification.setCommentdate(today);
                buyerVendorNotification.setNotification("<p>" + rfqHeaderObj.getRfqNumber() + " has been assigned to you.</p>");
                buyerVendorNotification.setReadstatus("false");
                buyerVendorNotification.setNgBpBuyerdetailsId(buyerDetailsObj);
                buyerVendorNotification.setContractRfqHeaderRFQID(contractRfqHeaderObj);
                buyerVendorNotification.setNgBpVendordetailsId(vendor);
                buyerVendorNotification.setUrl("responsecontractmanagement.do?rfqid=" + rfqid + "&buyerid=" + buyerid);

               
                String notificationid = saveBuyerVendorNotification(buyerVendorNotification);
                System.out.println("notificationid :" + notificationid);
                //5516

            }

            // Upload RFQ Format to DMS by Girivasu on 29-08-2020
            System.out.println("rfqid: " + rfqid);
            List<BuyerContractRfqLineItemBean> buyerRfqLineItemBeanList = rfqRfpUtilWS.callBuyerRfqContractLineItemStoredProcedure(Integer.parseInt(rfqid));
            System.out.println("buyerRfqLineItemBeanList: " + buyerRfqLineItemBeanList.size());
            String uploadRfqFormatMessage = "";
            String uploadRfqFormatPid = "";

            for (VendorDetails vendorObj : vendorList) {
                System.out.println("VendorCode: " + vendorObj.getCode());
                System.out.println("VendorName: " + vendorObj.getFirstname() + " " + vendorObj.getLastname());
                
                String[] ratedValues=ratedParam.split("#");
                if(ratedValues.length>0){
                    for (int i = 0; i < ratedValues.length; i++) {
                        String ratedValue[]=ratedValues[i].split(",");
                        if(ratedValue.length>0){
                        ratedParameters.setTagID("ratedParam"+(i+1));
                        ratedParameters.setTagName(ratedValue[0]);
                        ratedParameters.setWeight(ratedValue[1]);
                        ratedParameters.setVendorDetails(vendorObj);
                        ratedParameters.setContractRfqHeader(contractRfqHeaderObj);
                    }
                        
                        String ratedparamId = saveRatedParam(ratedParameters);
                System.out.println("ratedparamId :" + ratedparamId);
                        
                    }
                    
                    
                }

                byte[] fileBytes;

                try (ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream()) {
                    Document document = new Document();
                    PdfWriter writer = PdfWriter.getInstance(document, byteArrayOutputStream);
                    writer.setPageEvent(new MyFooter());
                    document.open();
                    mailTriggerUtil.makeContractRfqFormat(document, rfqNumber, request, contractHeader, vendorObj, buyerRfqLineItemBeanList);
                    document.close();
                    fileBytes = byteArrayOutputStream.toByteArray();
                    System.out.println("fileBytes len: " + fileBytes.length);
                    String isIndex="";
                    String docName="";
                    try {
                        inputRfqFormatAutowired.setPid(rfqHeaderObj.getRfqNumber());
                        inputRfqFormatAutowired.setRFQno(rfqHeaderObj.getRfqNumber());
                        inputRfqFormatAutowired.setRequestorID(vendorObj.getCode());
                       // inputRfqFormatAutowired.setRFQAttachname(rfqHeaderObj.getRfqNumber() + "_" + vendorObj.getCode() + ".pdf");
                        inputRfqFormatAutowired.setRFQAttachname("RFQ_" + vendorObj.getCode() + ".pdf");
                        inputRfqFormatAutowired.setRFQAttachment(fileBytes);

                        OutputRfqFormat outputRfqFormat = uploadContractRfqFormatToDMS(inputRfqFormatAutowired);
                        uploadRfqFormatMessage = uploadRfqFormatMessage + outputRfqFormat.getMessage() + "#";
                        uploadRfqFormatPid = uploadRfqFormatPid + outputRfqFormat.getProcessInstanceID() + "#";

                       isIndex=outputRfqFormat.getIsIndex();
                        docName=inputRfqFormatAutowired.getRFQAttachname();
                        
                        
                        contractRfqVendorMapping.setNgBpVendordetailsId(vendorObj);
                contractRfqVendorMapping.setContractRfqHeaderRFQID(contractRfqHeaderObj);
                contractRfqVendorMapping.setStatus("Pending");
                contractRfqVendorMapping.setRFQDocIndex(outputRfqFormat.getDocIndex());
                
                 saveContractRfqHeaderVendorMapping(contractRfqVendorMapping);
                        
                        
                        

                        System.out.println("uploadRfqFormatMessage: " + uploadRfqFormatMessage);
                        System.out.println("uploadRfqFormatPid: " + uploadRfqFormatPid);

                    } catch (Exception e) {
                        System.out.println("Upload RFQ Format to DMS has failed !");
                    }
                    ByteArrayOutputStream byteArrayOutputStream1 = new ByteArrayOutputStream();
                    
                    com.lowagie.text.Document document1 =new com.lowagie.text.Document();
                   
                    String sFileName = "InvitationLetter.pdf";
                    Rectangle page = document1.getPageSize();
                    com.lowagie.text.pdf.PdfWriter writer1 = com.lowagie.text.pdf.PdfWriter.getInstance(document1, byteArrayOutputStream1);
                    document1.setMargins(Float.parseFloat("50"), Float.parseFloat("30"), 60, 10);
                  
                    document1.open();
                    ContractManagement.info("RFQ NUMBER -> -> "+ rfqNumber);
                    if(rfqNumber.contains("GRFQ"))
                    {
                        ContractManagement.info("Inside Invitation Letter -> ->");
                        generateInvitationLetter(document1,vendorObj.getFirstname(),validitystartdate,validityenddate,rfqvaliduntil,RFQTitle);
                        document1.close();
                    }
                    else if(rfqNumber.contains("SRFQ"))
                    {
                        ContractManagement.info("Inside SOW DOcument -> ->");
                     // GenerateSOWDocument(document1,RFQTitle,agreementdate,vendorObj.getCompany() ,vendorObj.getCompanyRegNumber(),vendorObj.getAddress(),vendorObj.getFirstname()+vendorObj.getLastname(),vendorObj.getCompanyRegNumber(),vendorObj.getAddress(),validitystartdate,validityenddate);
                    }   
                        document1.close();  
                    
                    Date date1=new SimpleDateFormat("dd-MM-yyyy").parse(validitystartdate);
                        Date date2=new SimpleDateFormat("dd-MM-yyyy").parse(validityenddate);
                        Date date3=new SimpleDateFormat("dd-MM-yyyy").parse(rfqvaliduntil);
                        SimpleDateFormat ftt=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss:SS");
                        String StartDate = ftt.format(date1).toString();
                        String StartDate_ori = DateCovert(StartDate);
                        String endDate = ftt.format(date2).toString();
                        String EndDate_ori = DateCovert(endDate);
                        String contdate = ftt.format(date3).toString(); //RFQ Expiry Date
                        String contdate_ori = DateCovert(contdate);
                        long yearDiff=0L;
                        try
                        {
                            long diffInMilliSec = date2.getTime() - date1.getTime();
                            yearDiff =  (diffInMilliSec / (1000l * 60 * 60 * 24 * 365));
                        }
                        catch(Exception e)
                                {
                                    System.out.println(e);
                                }
                        SimpleDateFormat ft = new SimpleDateFormat("dd-MMMM-yyyy");
                        String RefDate = ft.format(new Date()).toString().toUpperCase();
                        String dateSplit[] = RefDate.split("-");
                        String currMonth = dateSplit[1].substring(0,3).toUpperCase();
                        String currYear = dateSplit[2];
                        RefDate = RefDate.replaceAll("-"," ");
                        //String tenderTitle = " THE COMPANY UNIFORM SUPPLIES FOR 2017 ";
                        RFQTitle=RFQTitle.toUpperCase();
                        String tenderTitleLow = RFQTitle.toLowerCase();
                        
                    
                    fileBytes = byteArrayOutputStream1.toByteArray();
                    ContractManagement.info("File Bytess -> -> "+ fileBytes);
                   try {
                        inputRfqFormatAutowired.setPid(rfqHeaderObj.getRfqNumber());
                        inputRfqFormatAutowired.setRFQno(rfqHeaderObj.getRfqNumber());
                        inputRfqFormatAutowired.setRequestorID(vendorObj.getCode());
                        //inputRfqFormatAutowired.setRFQAttachname(rfqHeaderObj.getRfqNumber() + "_" + vendorObj.getCode()+".pdf");
                        if(rfqNumber.contains("GRFQ"))
                        {
                            inputRfqFormatAutowired.setRFQAttachname("InvitationLetter_" + vendorObj.getCode()+".pdf");  
                        }
                        else if(rfqNumber.contains("SRFQ"))
                        {
                            inputRfqFormatAutowired.setRFQAttachname("SOW_" + vendorObj.getCode()+".pdf");    
                        }
                        
                        inputRfqFormatAutowired.setRFQAttachment(fileBytes);
 
                        OutputRfqFormat outputRfqFormat = uploadInvitationFormatToDMS(inputRfqFormatAutowired);
                        uploadRfqFormatMessage = uploadRfqFormatMessage + outputRfqFormat.getMessage() + "#";
                        uploadRfqFormatPid = uploadRfqFormatPid + outputRfqFormat.getProcessInstanceID() + "#";
                        
                        isIndex=isIndex+";"+outputRfqFormat.getIsIndex();
                        docName=docName+";"+inputRfqFormatAutowired.getRFQAttachname();
 
                        System.out.println("uploadRfqFormatMessage: " + uploadRfqFormatMessage);
                        System.out.println("uploadRfqFormatPid: " + uploadRfqFormatPid);
                        
 
                    } catch (Exception e) {
                        System.out.println("Failed to upload");
                        System.out.println("Upload RFQ Format to DMS has failed !");
                    }
                   
                    emailTriggerDetails.setMailCC("girivasu-g@newgen.co.in");
                        emailTriggerDetails.setMailFrom("do-not-reply@natsteel.com.sg");
                        emailTriggerDetails.setMailContentType("text/html;charset=UTF-8"); // default
                        //emailTriggerDetails.setMailMessage(rfqNumber + " has been assigned to you, please review and bid.");
                        //emailTriggerDetails.setMailSubject(rfqNumber + " Assigned ");
                        //emailTriggerDetails.setMailMessage("<html><head><meta http-equiv=Content-Type content=\"text/html; charset=UTF-8\"><style type=\"text/css\"></style><script type=\"text/javascript\" src=\"7aa468de-ddfc-11ea-8b25-0cc47a792c0a_id_7aa468de-ddfc-11ea-8b25-0cc47a792c0a_files/wz_jsgraphics.js\"></script></head><body><div style=\"position:absolute;left:50%;margin-left:-297px;top:0px;width:595px;height:842px;border-style:outset;overflow:hidden\"><div style=\"position:absolute;left:0px;top:0px\"><div style=\"position:absolute;left:50.00px;top:147.48px\" class=\"cls_004\"><span class=\"cls_004\">Dear" + vendorObj.getFirstname() + ",</span></div><div style=\"position:absolute;left:50.00px;top:231.98px\" class=\"cls_002\"><span class=\"cls_002\">1.</span></div><div style=\"position:absolute;left:61.00px;top:231.98px\" class=\"cls_002\"><span class=\"cls_002\">We are pleased to invite you to quote for" + RFQTitle + ".  Our tender</span></div><div style=\"position:absolute;left:61.00px;top:248.48px\" class=\"cls_002\"><span class=\"cls_002\">documents will be in electronic format. You can find attached RFQ for details.</span></div><div style=\"position:absolute;left:50.00px;top:264.98px\" class=\"cls_002\"><span class=\"cls_002\">2.</span></div><div style=\"position:absolute;left:61.00px;top:264.98px\" class=\"cls_002\"><span class=\"cls_002\">The supply period is for" + Integer.toString(yearDiff) + " year(s) commencing "+ StartDate_ori + " till " +EndDate_ori+ ".</span></div><div style=\"position:absolute;left:50.00px;top:281.48px\" class=\"cls_002\"><span class=\"cls_002\">3.</span></div><div style=\"position:absolute;left:61.00px;top:281.48px\" class=\"cls_002\"><span class=\"cls_002\">Please arrange and meet up with me to view the sample of the " + tenderTitleLow  + ".</span></div><div style=\"position:absolute;left:61.00px;top:296.48px\" class=\"cls_002\"><span class=\"cls_002\">My contact no as follows:  </span><span class=\"cls_015\">kcy@natsteel.com.sg</span><span class=\"cls_002\">  /  66607708</span></div><div style=\"position:absolute;left:50.00px;top:313.98px\" class=\"cls_007\"><span class=\"cls_007\">4.</span></div><div style=\"position:absolute;left:61.00px;top:313.98px\" class=\"cls_007\"><span class=\"cls_007\">Documents required for submission</span></div><div style=\"position:absolute;left:61.00px;top:330.48px\" class=\"cls_007\"><span class=\"cls_007\">1st stage of tender</span></div><div style=\"position:absolute;left:61.00px;top:346.98px\" class=\"cls_007\"><span class=\"cls_007\">Commercial documents:</span></div><div style=\"position:absolute;left:62.00px;top:363.48px\" class=\"cls_002\"><span class=\"cls_002\">•</span></div><div style=\"position:absolute;left:82.00px;top:363.48px\" class=\"cls_002\"><span class=\"cls_002\">Quotation should includes lead time, delivery, payment term (preferable 60 days credit term).</span></div><div style=\"position:absolute;left:62.00px;top:383.48px\" class=\"cls_007\"><span class=\"cls_007\">2nd stage after short listed:</span></div><div style=\"position:absolute;left:62.00px;top:399.98px\" class=\"cls_002\"><span class=\"cls_002\">•</span></div><div style=\"position:absolute;left:82.00px;top:399.98px\" class=\"cls_002\"><span class=\"cls_002\">We may require you to submit sample of uniform to confirm the quality and workmanship to ensure your</span></div><div style=\"position:absolute;left:82.00px;top:416.48px\" class=\"cls_002\"><span class=\"cls_002\">products meets our requirements.</span></div><div style=\"position:absolute;left:62.00px;top:432.48px\" class=\"cls_002\"><span class=\"cls_002\">•</span></div><div style=\"position:absolute;left:82.00px;top:431.48px\" class=\"cls_002\"><span class=\"cls_002\">For thee quotations, please submit to us in </span><span class=\"cls_007\">electronic format</span><span class=\"cls_002\">. You can store your documents in </span><span class=\"cls_007\">pdf</span></div><div style=\"position:absolute;left:82.00px;top:447.48px\" class=\"cls_007\"><span class=\"cls_007\">and excel file (schedule of rate) in a cd or thumbdrive (Offer needs to be in both Excel & Pdf</span></div><div style=\"position:absolute;left:82.00px;top:463.48px\" class=\"cls_007\"><span class=\"cls_007\">format)</span><span class=\"cls_002\">. Then, you can put your cd/ thumbdrive in a sealed envelope marked</span></div><div style=\"position:absolute;left:62.00px;top:484.48px\" class=\"cls_008\"><span class=\"cls_008\">\"TENDER FOR" + RFQTitle  + " OF NATSTEEL HOLDINGS PTE LTD\"</span></div><div style=\"position:absolute;left:63.00px;top:497.48px\" class=\"cls_008\"><span class=\"cls_008\">latest by </span><span class=\"cls_016\">" + contdate_ori + " before 3.00pm</span><span class=\"cls_008\"> to:</span></div><div style=\"position:absolute;left:140.00px;top:521.48px\" class=\"cls_004\"><span class=\"cls_004\">ATTN:  ALAN KANG / EUNICE TAN</span></div><div style=\"position:absolute;left:140.00px;top:536.48px\" class=\"cls_004\"><span class=\"cls_004\">PROCUREMENT OPERATIONS SECTION</span></div><div style=\"position:absolute;left:140.00px;top:551.48px\" class=\"cls_004\"><span class=\"cls_004\">NATSTEEL HOLDINGS  PTE LTD (Gate 3)</span></div><div style=\"position:absolute;left:140.00px;top:566.48px\" class=\"cls_004\"><span class=\"cls_004\">22 TANJONG KLING ROAD</span></div><div style=\"position:absolute;left:140.00px;top:581.48px\" class=\"cls_004\"><span class=\"cls_004\">SINGAPORE 628048</span></div><div style=\"position:absolute;left:50.00px;top:601.98px\" class=\"cls_002\"><span class=\"cls_002\">5.</span></div><div style=\"position:absolute;left:61.00px;top:601.98px\" class=\"cls_002\"><span class=\"cls_002\">Natsteel reserved the right to appoint supplier who meet NSH Safety requirement and Criteria and to be</span></div><div style=\"position:absolute;left:61.00px;top:618.48px\" class=\"cls_002\"><span class=\"cls_002\">eligible to considered as candidate to the tender.</span></div><div style=\"position:absolute;left:50.00px;top:634.98px\" class=\"cls_002\"><span class=\"cls_002\">6. If you require further information, please contact the undersigned at tel. no. 6660 7708 or e-mail address:</span></div><div style=\"position:absolute;left:61.00px;top:649.98px\" class=\"cls_015\"><span class=\"cls_015\">kcy@natsteel.com.sg</span><span class=\"cls_002\">. Alternatively, you may contact Eunice Tan at tel. no. 6660 7987 or email address:</span></div><div style=\"position:absolute;left:61.00px;top:665.98px\" class=\"cls_015\"><span class=\"cls_015\">eunicet@natsteel.com.sg</span></div><div style=\"position:absolute;left:50.00px;top:698.98px\" class=\"cls_004\"><span class=\"cls_004\">Yours faithfully,</span></div><div style=\"position:absolute;left:50.00px;top:715.98px\" class=\"cls_010\"><span class=\"cls_010\">ALAN KANG</span></div><div style=\"position:absolute;left:50.00px;top:734.98px\" class=\"cls_004\"><span class=\"cls_004\">_______________________________</span></div><div style=\"position:absolute;left:50.00px;top:750.48px\" class=\"cls_011\"><span class=\"cls_011\">Alan Kang (Mr.)</span></div><div style=\"position:absolute;left:50.00px;top:762.48px\" class=\"cls_012\"><span class=\"cls_012\">Senior Procurment Executive,</span></div><div style=\"position:absolute;left:50.00px;top:774.48px\" class=\"cls_012\"><span class=\"cls_012\">Procurement Operations</span></div><div style=\"position:absolute;left:50.00px;top:786.48px\" class=\"cls_012\"><span class=\"cls_012\">NatSteel Holdings Pte Ltd</span></div><div style=\"position:absolute;left:50.00px;top:802.48px\" class=\"cls_013\"><span class=\"cls_013\">NatSteel Holdings Pte Ltd, 22 Tanjong Kling Road, Singapore 628048. Telephone: 2651233.. Fax: 265 9345</span></div></div></body></html><html><head><META HTTP-EQUIV=\"Content-Type\" CONTENT=\"text/html; charset=utf-8\"><meta name=\"Robots\" content=\"NOINDEX \" /></head><body></body>                <script type=\"text/javascript\">                 var gearPage = document.getElementById('GearPage');                 if(null != gearPage)                 {                     gearPage.parentNode.removeChild(gearPage);                     document.title = \"Error\";                 }                 </script>                 </html> ");
                        emailTriggerDetails.setMailMessage("<p><strong>Dear "+ vendorObj.getFirstname() +",</strong></p>"
                                + "<ol>"
                                + "<li style=\"font-weight: 400;\"><span style=\"font-weight: 400;\">We are pleased to invite you to quote for the "+ RFQTitle + ". Our tender documents will be in electronic format. You can find attached RFQ for details.<br /><br /></span></li>"
                                + "<li style=\"font-weight: 400;\"><span style=\"font-weight: 400;\">The supply period is for " + Long.toString(yearDiff) + " year(s) commencing "+ StartDate_ori + " till " +EndDate_ori+ ".<br /><br /></span></li>"
                                + "<li style=\"font-weight: 400;\"><span style=\"font-weight: 400;\">Please arrange and meet up with me to view the sample of the " + tenderTitleLow  + ". My contact no as follows: kcy@natsteel.com.sg / 66607708.<br /><br /></span></li>"
                                + "<li style=\"font-weight: 400;\"><strong><strong>Documents required for submission:<br /><br /><strong>1st stage of tender</strong><br /></strong></strong><strong>Commercial documents:</strong><strong><br /></strong>&nbsp; &nbsp;&bull; Quotation should includes lead time, delivery, payment term (preferable 60 days credit term).<br /><br /><strong>2nd stage after short listed:</strong><strong><br /></strong>&nbsp; &nbsp;&bull; We may require you to submit sample of uniform to confirm the quality and workmanship to ensure your products meets our requirements.<br />&nbsp; &nbsp;&bull; For the quotations, please submit to us in <strong>electronic format</strong>.You can store your documents in <strong>pdf and excel file (schedule of rate) in a cd or thumbdrive (Offer needs to be in both Excel &amp; Pdf format).&nbsp;</strong>Then you can put your cd/ thumbdrive in a sealed envelope marked,<br /><br /><em>&nbsp; &nbsp; &nbsp; \"TENDER FOR THE " + RFQTitle  + " IN NATSTEEL HOLDINGS PTE LTD\" </em><em><br /></em><em>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;latest by </em><strong><em> " +contdate_ori+ " before 3.00pm</em></strong><em> to:</em><em><br /></em><em><br /></em><em>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</em><strong>ATTN: ALAN KANG / EUNICE TAN</strong><strong><br /></strong><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; PROCUREMENT OPERATIONS SECTION</strong><strong><br /></strong><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; NATSTEEL HOLDINGS PTE LTD (Gate 3)</strong><strong><br /></strong><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 22 TANJONG KLING ROAD</strong><strong><br /></strong><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; SINGAPORE 628048.<br /><br /></strong></li>"
                                + "<li style=\"font-weight: 400;\"><span style=\"font-weight: 400;\">Natsteel reserved the right to appoint supplier who meet NSH Safety requirement and Criteria and to be eligible to considered as candidate to the tender.<br /><br /></span></li>"
                                + "<li style=\"font-weight: 400;\"><span style=\"font-weight: 400;\">If you require further information, please contact the undersigned at tel. no. 6660 7708 or e-mail address:</span><a href=\"mailto:kcy@natsteel.com.sg\"><span style=\"font-weight: 400;\">kcy@natsteel.com.sg</span></a><span style=\"font-weight: 400;\"> . Alternatively, you may contact Eunice Tan at tel. no. 6660 7987 or email address:</span><a href=\"mailto:eunicet@natsteel.com.sg\"><span style=\"font-weight: 400;\">eunicet@natsteel.com.sg</span></a><span style=\"font-weight: 400;\"> .</span></li>"
                                + "</ol>"
                                + "<p><strong>&nbsp;&nbsp;</strong></p>"
                                + "<p>&nbsp;</p>"
                                + "<p><strong>Yours faithfully,</strong></p>"
                                + "<p><span style=\"font-weight: 400;\">ALAN KANG</span></p>"
                                + "<p><span style=\"font-weight: 400;\">__________________________</span><span style=\"font-weight: 400;\"><br /></span><span style=\"color: #3366ff;\"><span style=\"font-weight: 400;\">Alan Kang (Mr.)</span><span style=\"font-weight: 400;\"><br /></span><span style=\"font-weight: 400;\">Senior Procurement Executive,</span><span style=\"font-weight: 400;\"><br /></span><span style=\"font-weight: 400;\">Procurement Operations,</span></span><span style=\"font-weight: 400;\"><br /></span><span style=\"font-weight: 400; color: #3366ff;\">NatSteel Holdings Pte Ltd, 22 Tanjong Kling Road, Singapore 628048. Telephone: 2651233 Fax: 265 9345.</span></p>"
                                +"<p><strong>Note : </strong><strong>If you do not have access to Vendor Portal , Kindly&nbsp;<a href=\"http://localhost:8080/VendorPortal/selfregistration.do?vendorCode="+vendorObj.getCode()+"\" target=\"_blank\"><span style=\"text-decoration: underline;\">Click here</span></a> to register&nbsp;for bid submission.<br /><br /></strong><span style=\"color: #999999;\">This email was sent from a notification-only address that cannot accept incoming email. Please do not reply to this message.</span></p>"
                                +"<p>&nbsp;</p>"
                                +"<p><br /><br /><br /></p>");
                        emailTriggerDetails.setMailSubject("LETTER OF INVITATION TO TENDER FOR THE "+ RFQTitle + " IN \"NATSTEEL HOLDINGS PTE LTD\"");
                        
                        emailTriggerDetails.setMailTo("girivasu-g@newgen.co.in");
                        emailTriggerDetails.setMailStatus("N");
                        emailTriggerDetails.setAttachmentISINDEX(isIndex);
                        emailTriggerDetails.setAttachmentNames(docName);
                        System.out.println("vendor mailid" + vendorObj.getEmailid());
                        String emailnoti = TriggerMail(emailTriggerDetails);
                        System.out.println("emailnoti contract" + emailnoti);
                    

                }
                
                catch (DocumentException | IOException ex) {
                    Logger.getLogger(DownloadAttachment.class.getName()).log(Level.SEVERE, null, ex);
                }
            }

            String contractStatus = updateContractRFQStatus(contractRefId);
            redirect.addFlashAttribute("uploadRfqFormatMessage", uploadRfqFormatMessage);
            redirect.addFlashAttribute("uploadRfqFormatPid", uploadRfqFormatPid);
            redirect.addFlashAttribute("UpdateEXtCM", contractStatus);

        } catch (NumberFormatException | ParseException ex) {
            System.out.println("Exception :" + ex.getMessage());
            Logger.getLogger(RfqRfpManagement.class.getName()).log(Level.SEVERE, null, ex);
            // return new ModelAndView("");
        }

        //String rfqid = saveContractRfqHeader(contractHeader,contractType);                                                               
        ////ContractRfqHeader contractRfqHeaderObj = findContractRfqHeaderById(Integer.parseInt(rfqid));
        //String rfqNumber = contractRfqHeaderObj.getRfqNumber();
        // System.out.println("rfqNumber-->: " + rfqNumber);
        return new ModelAndView("redirect:/mytask.do");

    }

    @RequestMapping(value = "/contractrfqdetails")
    public ModelAndView contractRfqDetails(@RequestParam("rfqid") int rfqid, ModelMap model) {
        System.out.println("contractRfqDetails: " + rfqid);

        ContractRfqHeader contractRfqHeaderObj = findContractRfqHeaderById(rfqid);
        List<ContractRfqLineItem> contractRfqLineItemList = findContractRfqLineItemByRfqId(rfqid);
        List<ContractRfqHeaderVendorMapping> contractRfqHeaderVendormappingList = findContractRfqHeaderVendorMappingByRfqId(rfqid);
        
         List<NG_BP_Default_RatedParameters> ratedParamList = findAllRatedParam();
                String ratedParam = "";

                for (NG_BP_Default_RatedParameters defaultRatedParam : ratedParamList) {
                    if (ratedParam.equals("")) {
                        ratedParam = defaultRatedParam.getParameter();
                    } else {
                        ratedParam = ratedParam + "," + defaultRatedParam.getParameter();
                    }
                }

        model.put("contractRfqHeaderObj", contractRfqHeaderObj);
        model.put("contractRfqLineItemList", contractRfqLineItemList);
        model.put("VendorMappingList", contractRfqHeaderVendormappingList);
        System.out.println("VendorMappingList.Size()-->" + contractRfqHeaderVendormappingList.size());

        List<VendorDetails> activeVendorList = findByStatusAndType("Active", "Vendor");
        List<VendorDetails> activeProspectList = findByStatusAndType("Active", "Prospect");
        List<PaymentTermsMaster> paymentterm = getAllPaymentTerms();

        List<MasterPurchasingGroup> masterPurchasingGroupList = contractManagement.findAllMasterPurchaseGroup();
        List<MasterPurchaseOrg> purchaseList = contractManagement.getAllPurchaseOrg();
        model.put("paymentterm", paymentterm);
        model.put("masterPurchasingGroupList", masterPurchasingGroupList);
        model.put("purchaseList", purchaseList);

        model.addAttribute("VendorList", activeVendorList);
        model.addAttribute("ProspectList", activeProspectList);

        // model.put("VendorMappingList", vendorList);
        return new ModelAndView("contractrfqdetails");
    }

    @RequestMapping(value = "/contractvendorrfqdetails")
    public ModelAndView contractVendorRfqDetails(@RequestParam("rfqid") int rfqid, @RequestParam("vendorid") int vendorid, ModelMap model) {
        System.out.println("rfqid: " + rfqid);
        System.out.println("vendorid: " + vendorid);
        ContractRfqHeader contractRfqHeaderObj = findContractRfqHeaderById(rfqid);
        List<ContractVendorRfqHeader> contractVenodrRfqHeaderList = findContractVendorRfqHeaderByRfqIdAndVendorId(rfqid, vendorid);

        ContractVendorRfqHeader contractVenodrRfqHeaderObj = null;
        List<ContractVendorRfqLineItem> contractVenodrRfqLineItemList = null;
        VendorDetails vendorObj = null;

        if (!contractVenodrRfqHeaderList.isEmpty()) {
            contractVenodrRfqHeaderObj = contractVenodrRfqHeaderList.get(0);
            vendorObj = contractVenodrRfqHeaderObj.getNgBpVendordetailsId();
            contractVenodrRfqLineItemList = findContractVendorRfqLineItemByContractVenodrRfqHeaderId(contractVenodrRfqHeaderObj.getId());
        }

        model.put("vendorObj", vendorObj);
        model.put("contractRfqHeaderObj", contractRfqHeaderObj);
        model.put("contractVenodrRfqHeaderObj", contractVenodrRfqHeaderObj);
        model.put("contractVenodrRfqLineItemList", contractVenodrRfqLineItemList);

        return new ModelAndView("contractvendorrfqdetails");
    }

    @RequestMapping(value = "/vendorrfpdetails")
    public ModelAndView vendorRfpDetails(@RequestParam("vendorid") int vendorid, @RequestParam("rfpid") int rfpid, ModelMap model) {
        System.out.println("rfpid: " + rfpid);
        System.out.println("vendorid: " + vendorid);

        WorkOrderRfpHeader rfpHeaderObj = findRfpHeaderById(rfpid);
        List<SupplierRfpHeader> supplierRfpList = findSupplierRfpHeaderByRfpIdAndVendorId(rfpid, vendorid);
        if (!supplierRfpList.isEmpty()) {
            SupplierRfpHeader supplierRfp = supplierRfpList.get(0);
            List<SupplierRfpLineItem> supplierRfpLineItemList = findSupplierRfpLineItemBySupplierRfpHeaderId(supplierRfp.getId());

            model.addAttribute("SupplierRfpHeader", supplierRfp);
            model.addAttribute("SupplierRfpLineItemList", supplierRfpLineItemList);
        }

        model.addAttribute("RfpHeader", rfpHeaderObj);

        return new ModelAndView("vendorrfpdetails");
    }
    
    @RequestMapping(value = "/vendorcontractrfpdetails")
    public ModelAndView vendorContractRfpDetails(@RequestParam("vendorid") int vendorid, @RequestParam("rfpid") int rfpid, ModelMap model) {
        System.out.println("rfpid: " + rfpid);
        System.out.println("vendorid: " + vendorid);

        ContractRfpHeader rfpHeaderObj = findContractRfpHeaderById(rfpid);
        List<ContractVendorRfqHeader> supplierRfpList = findContractVendorRfqHeaderByRfqIdAndVendorId(rfpid, vendorid);
        if (!supplierRfpList.isEmpty()) {
            ContractVendorRfqHeader supplierRfp = supplierRfpList.get(0);
            List<ContractVendorRfqLineItem> supplierRfpLineItemList = findContractVendorRfqLineItemByContractVenodrRfqHeaderId(supplierRfp.getId());

            model.addAttribute("SupplierRfpHeader", supplierRfp);
            model.addAttribute("SupplierRfpLineItemList", supplierRfpLineItemList);
        }

        model.addAttribute("RfpHeader", rfpHeaderObj);

        return new ModelAndView("vendorrfpdetails");
    }

//    List<PRDetails> findByMultiplePRId(String prlineids) {
//
//        RestTemplate restTemplate = new RestTemplate();
//
//        String url = webservice_ip + "/BuyerPortalWebServices/findbymultipleprid.do?ids=" + prlineids;
//        System.out.println("url: " + url);
//
//        ResponseEntity<List<PRDetails>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<PRDetails>>() {
//        });
//        List<PRDetails> prList = prResponse.getBody();
//
//        System.out.println("prList size: " + prList.size());
//
//        return prList;
//    }
    List<NewgenPRLineItem> findByMultipleNewgenPRLineItemId(String prlineids) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findbymultiplenewgenprlineitemid.do?ids=" + prlineids;
        System.out.println("url: " + url);
        ResponseEntity<List<NewgenPRLineItem>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NewgenPRLineItem>>() {
        });
        List<NewgenPRLineItem> prList = prResponse.getBody();
        System.out.println("prList size: " + prList.size());
        return prList;
    }

    WorkOrderRfqHeader findRfqHeaderById(int rfqid) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findrfqheaderbyid.do?rfqid=" + rfqid;
        System.out.println("url: " + url);

        ResponseEntity<WorkOrderRfqHeader> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<WorkOrderRfqHeader>() {
        });
        WorkOrderRfqHeader rfqHeaderObj = prResponse.getBody();

        return rfqHeaderObj;
    }

    ContractRfqHeader findContractRfqHeaderById(int rfqid) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findcontractrfqheaderbyid.do?rfqid=" + rfqid;
        System.out.println("url: " + url);

        ResponseEntity<ContractRfqHeader> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<ContractRfqHeader>() {
        });
        ContractRfqHeader rfqHeaderObj = prResponse.getBody();

        return rfqHeaderObj;
    }

    String saveRfqHeader(WorkOrderRfqHeader headerObj, String prtype) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/saverfqheader.do?prtype=" + prtype;
        System.out.println("url: " + url);

        String rfqid = restTemplate.postForObject(URI.create(url), headerObj, String.class);

        return rfqid;
    }

    String newgenUploadInvitationDoc(SignedContractInput signedPoInput) {
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
//        String buyerName =buyer.getFirstname()+" "+buyer.getLastname();
//        String buyerID = buyer.getUsername();
//        signedPoInput.setBuyerID(buyerID);
//        signedPoInput.setBuyerName(buyerName);
//        signedPoInput.setDocType("Material");
        RestTemplate restTemplate = new RestTemplate();
        String url =  NGwebservice_ip + "/PR2POWebservice/ng/addDocument/Contract/RfqInvitation";
        System.out.println("url for newgenUploadSpendContract" + url);
        SignedContractoutput output = restTemplate.postForObject(URI.create(url), signedPoInput, SignedContractoutput.class);
        System.out.println("Message: " + output.getMessage());
        String message = output.getMessage();
//        String message = "PO Acknowledge Seccessfully";
        return message;
    }
 
    String saveRfqHeaderLineItem(WorkOrderRfqLineItem headerLineItemObj) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/saverfqheaderlineitem.do";
        System.out.println("url: " + url);

        String id = restTemplate.postForObject(URI.create(url), headerLineItemObj, String.class);

        return id;
    }

//    String updatePrLineItem(PRDetails obj) {
//
//        RestTemplate restTemplate = new RestTemplate();
//
//        String url = webservice_ip + "/BuyerPortalWebServices/updateprlineitem.do";
//        System.out.println("url: " + url);
//
//        String result = restTemplate.postForObject(URI.create(url), obj, String.class);
//        System.out.println("result: " + result);
//
//        return result;
//    }
    /*Newgen*/
    String updatePrLineItemNG(NewgenPRLineItem obj) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/updateprlineitemng.do";
        System.out.println("url: " + url);

        String result = restTemplate.postForObject(URI.create(url), obj, String.class);
        System.out.println("result: " + result);

        return result;
    }

    /*Newgen*/
    List<VendorDetails> getallvendor() {

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<VendorDetails>> restGroupResponse = restTemplate.exchange(webservice_ip + "/BuyerPortalWebServices/getallvendor.do", HttpMethod.GET, null,
                new ParameterizedTypeReference<List<VendorDetails>>() {
        });

        System.out.println("restGroupResponse: " + restGroupResponse);
        List<VendorDetails> vendorList = restGroupResponse.getBody();

        System.out.println("prList size: " + vendorList.size());

        return vendorList;
    }

    List<VendorDetails> findByStatusAndType(String status, String type) {
        String url = webservice_ip + "/BuyerPortalWebServices/findbystatusandtype.do?status=" + status + "&type=" + type;
        System.out.println("url: " + url);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<VendorDetails>> restGroupResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<VendorDetails>>() {
        });
        List<VendorDetails> vendorList = restGroupResponse.getBody();
        return vendorList;
    }

    List<VendorDetails> findByMultipleVendorId(String vendorids) {

        RestTemplate restTemplate = new RestTemplate();
        System.out.println("vendorids in findByMultipleVendorId :" + vendorids);

        String url = webservice_ip + "/BuyerPortalWebServices/findbymultiplevendorid.do?ids=" + vendorids;
        System.out.println("url: " + url);

        ResponseEntity<List<VendorDetails>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<VendorDetails>>() {
        });
        List<VendorDetails> vendorList = prResponse.getBody();

        System.out.println("vendorList size: " + vendorList.size());

        return vendorList;
    }

    String saveRfqHeaderVendorMapping(RfqHeaderVendorMapping mapping) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/saverfqheadervendormapping.do";
        System.out.println("url: " + url);

        String mappingid = restTemplate.postForObject(URI.create(url), mapping, String.class);
        System.out.println("mappingid: " + mappingid);

        return mappingid;
    }

    String updateRfqHeaderVendorMapping(RfqHeaderVendorMapping mapping) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updaterfqheadervendormapping.do";
        System.out.println("url: " + url);
        String msg = restTemplate.postForObject(URI.create(url), mapping, String.class);
        System.out.println("msg in update: " + msg);
        return msg;
    }

    List<WorkOrderRfqHeader> findRfqHeaderByBuyerId(int buyerid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findrfqheaderbybuyerid.do?buyerid=" + buyerid;
        System.out.println("url: " + url);
        ResponseEntity<List<WorkOrderRfqHeader>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<WorkOrderRfqHeader>>() {
        });
        List<WorkOrderRfqHeader> rfqHeaderList = prResponse.getBody();
        return rfqHeaderList;
    }

    List<WorkOrderRfqHeader> findRfqHeaderByBuyerIdAndStatus(int buyerid, String status) {

        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findRfqHeaderByBuyerIdAndStatus.do?buyerid=" + buyerid + "&status=" + status;
        System.out.println("url: " + url);
        ResponseEntity<List<WorkOrderRfqHeader>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<WorkOrderRfqHeader>>() {
        });
        List<WorkOrderRfqHeader> rfqHeaderList = prResponse.getBody();
        return rfqHeaderList;
    }

    List<ContractRfqHeader> findContractRfqHeaderByBuyerId(int buyerid) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findcontractrfqheaderbybuyerid.do?buyerid=" + buyerid;
        System.out.println("url: " + url);

        ResponseEntity<List<ContractRfqHeader>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ContractRfqHeader>>() {
        });
        List<ContractRfqHeader> contractRfqHeaderList = prResponse.getBody();

        return contractRfqHeaderList;
    }

    List<WorkOrderRfqLineItem> findRfqLineItemByRfqId(int rfqid) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findrfqlineitembyrfqid.do?rfqid=" + rfqid;
        System.out.println("url: " + url);

        ResponseEntity<List<WorkOrderRfqLineItem>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<WorkOrderRfqLineItem>>() {
        });
        System.out.println("prResponse in :" + prResponse.getBody());
        List<WorkOrderRfqLineItem> rfqLineItemList = prResponse.getBody();
        System.out.println("list in findRfqLineItemByRfqId :" + rfqLineItemList);
        return rfqLineItemList;
    }

//     WorkOrderRfqLineItem findRfqLineItemByRfqId(int rfqid) {
//
//        RestTemplate restTemplate = new RestTemplate();
//
//        String url = webservice_ip + "/BuyerPortalWebServices/findrfqlineitembyrfqid.do?rfqid=" + rfqid;
//        System.out.println("url: " + url);
//
//        ResponseEntity<WorkOrderRfqLineItem> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<WorkOrderRfqLineItem>() {
//        });
//        System.out.println("prResponse in :" + prResponse.getBody());
//        WorkOrderRfqLineItem rfqLineItem = prResponse.getBody();
//        System.out.println("list in findRfqLineItemByRfqId :" + rfqLineItem);
//        return rfqLineItem;
//    }
    List<WorkOrderRfqLineItem> findByMultipleRfqLineId(String rfqlineids) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findbymultiplerfqlineid.do?ids=" + rfqlineids;
        System.out.println("url: " + url);

        ResponseEntity<List<WorkOrderRfqLineItem>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<WorkOrderRfqLineItem>>() {
        });
        List<WorkOrderRfqLineItem> rfqLineItemList = prResponse.getBody();

        return rfqLineItemList;
    }

    String updateRfqHeaderLineItem(WorkOrderRfqLineItem obj) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/updaterfqheaderlineitem.do";
        System.out.println("url: " + url);

        String result = restTemplate.postForObject(URI.create(url), obj, String.class);
        System.out.println("result: " + result);

        return result;
    }

    String updateRfqHeader(WorkOrderRfqHeader obj) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/updaterfqheader.do";
        System.out.println("url: " + url);

        String result = restTemplate.postForObject(URI.create(url), obj, String.class);
        System.out.println("result: " + result);

        return result;
    }

    List<RfqHeaderVendorMapping> findVendorByRfqId(int rfqid) {

        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findvendorbyrfqid.do?rfqid=" + rfqid;
        System.out.println("url: " + url);
        ResponseEntity<List<RfqHeaderVendorMapping>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<RfqHeaderVendorMapping>>() {
        });
        List<RfqHeaderVendorMapping> vendorList = response.getBody();
        System.out.println("vendorList size: " + vendorList.size());
        return vendorList;
    }

    List<RfqHeaderVendorMapping> findVendorByRfqIdAndStatus(int rfqid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findvendorbyrfqidandstatus.do?rfqid=" + rfqid;
        System.out.println("url: " + url);
        ResponseEntity<List<RfqHeaderVendorMapping>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<RfqHeaderVendorMapping>>() {
        });
        List<RfqHeaderVendorMapping> vendorList = prResponse.getBody();
        System.out.println("vendorList size: " + vendorList.size());
        return vendorList;
    }

    List<VendorGroup> getAllVendorGroup() {

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<VendorGroup>> restGroupResponse = restTemplate.exchange(webservice_ip + "/BuyerPortalWebServices/getallvendorgroup.do", HttpMethod.GET, null,
                new ParameterizedTypeReference<List<VendorGroup>>() {
        });

        System.out.println("restGroupResponse: " + restGroupResponse);
        List<VendorGroup> vendorGroupList = restGroupResponse.getBody();

        System.out.println("vendorGroupList size: " + vendorGroupList.size());

        return vendorGroupList;
    }

    String saveWorkOrderAttachmentTemp(WorkOrderAttachmentTemp obj) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/saveworkorderattachment.do";
        System.out.println("url: " + url);

        String result = restTemplate.postForObject(URI.create(url), obj, String.class);
        System.out.println("result: " + result);

        return result;
    }
    
    String saveContractAttachmentTemp(ContractAttachmentTemp obj) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/saveContractAttachmentTemp.do";
        System.out.println("url: " + url);

        String result = restTemplate.postForObject(URI.create(url), obj, String.class);
        System.out.println("result: " + result);

        return result;
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

    public BuyerDetails findBuyerById(int buyerid) {
        System.out.println("buyerid: " + buyerid);

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findbuyerbyid.do?buyerid=" + buyerid;
        System.out.println("url: " + url);

        ResponseEntity<BuyerDetails> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<BuyerDetails>() {
        });
        BuyerDetails buyer = response.getBody();

        return buyer;
    }

    String saveBuyerVendorNotification(BuyerVendorNotification notification) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/savebuyervendornotification.do";
        System.out.println("url: " + url);

        String notificationid = restTemplate.postForObject(URI.create(url), notification, String.class);

        return notificationid;
    }
    
      String saveRatedParam(RatedParameters ratedparameters) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/saveRatedParam.do";
        System.out.println("url: " + url);

        String ratedId = restTemplate.postForObject(URI.create(url), ratedparameters, String.class);

        return ratedId;
    }

    List<BuyerVendorNotification> findBuyerVendorNotificationByRfqAndVendorId(int rfqid, int vendorid) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findbuyervendornotificationbyrfqandvendorid.do?rfqid=" + rfqid + "&vendorid=" + vendorid;
        System.out.println("url: " + url);

        ResponseEntity<List<BuyerVendorNotification>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<BuyerVendorNotification>>() {
        });
        List<BuyerVendorNotification> buyerNotificationList = response.getBody();

        System.out.println("vendorList size: " + buyerNotificationList.size());

        return buyerNotificationList;
    }

    public List<VendorDetails> getAllProspect() {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/getallprospect.do";

        ResponseEntity<List<VendorDetails>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<VendorDetails>>() {
        });

        System.out.println("response: " + response);
        List<VendorDetails> prospectList = response.getBody();

        return prospectList;
    }

    String saveRfpHeader(WorkOrderRfpHeader headerObj, String rfpType) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/saverfpheader.do?rfpType=" + rfpType;
        System.out.println("url: " + url);

        String rfpid = restTemplate.postForObject(URI.create(url), headerObj, String.class);

        return rfpid;
    }

    List<WorkOrderRfpHeader> findRfpHeaderByBuyerId(int buyerid) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findrfpheaderbybuyerid.do?buyerid=" + buyerid;
        System.out.println("url: " + url);

        ResponseEntity<List<WorkOrderRfpHeader>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<WorkOrderRfpHeader>>() {
        });
        List<WorkOrderRfpHeader> rfpHeaderList = prResponse.getBody();

        return rfpHeaderList;
    }

    String saveRfpHeaderVendorMapping(RfpHeaderVendorMapping mapping) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/saverfpheadervendormapping.do";
        System.out.println("url: " + url);

        String mappingid = restTemplate.postForObject(URI.create(url), mapping, String.class);
        System.out.println("mappingid: " + mappingid);

        return mappingid;
    }

    WorkOrderRfpHeader findRfpHeaderById(int id) {

        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findrfpheaderbyid.do?id=" + id;
        System.out.println("url: " + url);
        ResponseEntity<WorkOrderRfpHeader> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<WorkOrderRfpHeader>() {
        });
        WorkOrderRfpHeader rfpHeaderObj = prResponse.getBody();
        return rfpHeaderObj;
    }
     ContractRfpHeader findContractRfpHeaderById(int id) {

        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findcontractrfpheaderbyid.do?id=" + id;
        System.out.println("url: " + url);
        ResponseEntity<ContractRfpHeader> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<ContractRfpHeader>() {
        });
        ContractRfpHeader rfpHeaderObj = prResponse.getBody();
        return rfpHeaderObj;
    }
    List<RfpHeaderVendorMapping> findVendorByRfpId(int id) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findvendorbyrfpid.do?id=" + id;
        System.out.println("url: " + url);

        ResponseEntity<List<RfpHeaderVendorMapping>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<RfpHeaderVendorMapping>>() {
        });
        List<RfpHeaderVendorMapping> vendorList = response.getBody();

        System.out.println("vendorList size: " + vendorList.size());

        return vendorList;
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

    List<SupplierHeader> getSupplierHeaderByVendoridAndStatusAndRfqid(int vendorid, int rfqid, String status) {
        RestTemplate restTemplate = new RestTemplate();
        System.out.println("vendorid in :" + vendorid);
        String url = webservice_ip + "/BuyerPortalWebServices/getsupplierheaderbyvendoridandstatusandrfqid.do?vendorid=" + vendorid + "&rfqid=" + rfqid + "&status=" + status;
        System.out.println("url in getSupplierHeaderByVendorId:" + url);
        ResponseEntity<List<SupplierHeader>> supplierHeaderResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<SupplierHeader>>() {
        });
        List<SupplierHeader> supplierHeaderObj = (List<SupplierHeader>) supplierHeaderResponse.getBody();

        System.out.println("supplierHeaderObj :" + supplierHeaderObj);

        return supplierHeaderObj;
    }

    List<WorkOrderRfqHeader> getWorkOrderById(int rfqid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getworkorderrfqheader.do?rfqid=" + rfqid;
        System.out.println("url: " + url);
        ResponseEntity<List<WorkOrderRfqHeader>> workOrderResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<WorkOrderRfqHeader>>() {
        });
        List<WorkOrderRfqHeader> workOrderList = workOrderResponse.getBody();
        System.out.println("workOrderList============: " + workOrderList);
        return workOrderList;
    }

//    List<WorkOrderRfqLineItem> supplierLineItem(int rfqid) {
//        RestTemplate restTemplate = new RestTemplate();
//        String url = webservice_ip + "/BuyerPortalWebServices/findrfqlineitembyrfqid.do?rfqid=" + rfqid;
//        System.out.println("url: " + url);
//        ResponseEntity<List<WorkOrderRfqLineItem>> lineItemResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<WorkOrderRfqLineItem>>() {
//        });
//        List<WorkOrderRfqLineItem> lineItemList = lineItemResponse.getBody();
//        System.out.println("lineItemList============: " + lineItemList);
//        return lineItemList;
//    }
    List<SupplierLineitem> supplierLineItem(int supplierid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findsupplierlineitembysupplierheaderid.do?id=" + supplierid;
        System.out.println("url: " + url);
        ResponseEntity<List<SupplierLineitem>> lineItemResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<SupplierLineitem>>() {
        });
        List<SupplierLineitem> supplierItemList = lineItemResponse.getBody();
        System.out.println("supplierItemList : " + supplierItemList);
        return supplierItemList;
    }

    public List<VendorDetails> getAllVendor() {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/getallvendor.do";

        ResponseEntity<List<VendorDetails>> vendor = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<VendorDetails>>() {
        });

        System.out.println("vendor: " + vendor);
        List<VendorDetails> vendorList = vendor.getBody();

        return vendorList;
    }

    public List<CountryMaster> getAllCountry() {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/getallcountry.do";

        ResponseEntity<List<CountryMaster>> country = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<CountryMaster>>() {
        });

        System.out.println("country: " + country);

        List<CountryMaster> countryList = country.getBody();

        return countryList;
    }

    String saveContractRfqHeader(ContractRfqHeader contractHeader, String contractType) {

        RestTemplate restTemplate = new RestTemplate();
        System.out.println("saveContractRfqHeader:");
        String url = webservice_ip + "/BuyerPortalWebServices/savecontractrfqheader.do?contractType=" + contractType;
        System.out.println("url: " + url);
        String mappingid = restTemplate.postForObject(URI.create(url), contractHeader, String.class);
        System.out.println("mappingid: " + mappingid);
        return mappingid;
    }

    List<NGExtCM> findContractLineItemByMultipleId(String contractlineids) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findcontractlineitembymultipleid.do?ids=" + contractlineids;
        System.out.println("url: " + url);

        ResponseEntity<List<NGExtCM>> contractResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGExtCM>>() {
        });
        List<NGExtCM> contractList = contractResponse.getBody();

        System.out.println("contractList size: " + contractList.size());
//
        return contractList;
    }

    NewgenContractLineItem findById(String contractid) {
        RestTemplate restTemplate = new RestTemplate();
        System.out.println("Find by Contractid");
        String url = webservice_ip + "/BuyerPortalWebServices/findById.do?id=" + contractid;
        ResponseEntity<NewgenContractLineItem> contractResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<NewgenContractLineItem>() {
        });
        NewgenContractLineItem conttactObj = contractResponse.getBody();
        System.out.println("conttactObj : " + conttactObj);
        return conttactObj;
    }

    String updateContractRFQStatus(String contractRefID) {
        RestTemplate restTemplate = new RestTemplate();
        System.out.println("updateContractRFQStatus-->" + contractRefID);
        String url = webservice_ip + "/BuyerPortalWebServices/updateContractRFQStatus.do?contractRefID=" + contractRefID;
        // String msg = restTemplate.postForObject(URI.create(url), "", String.class);
        ResponseEntity<String> restResponse = restTemplate.exchange(url, HttpMethod.POST, null, new ParameterizedTypeReference<String>() {
        });
        String result = restResponse.getBody();

        System.out.println("result: " + result);
        return result;

    }

    List<NewgenContractLineItem> findContractLineByPID(String contractid) {
        RestTemplate restTemplate = new RestTemplate();
        System.out.println("Find by Contractid");
        String url = webservice_ip + "/BuyerPortalWebServices/findContractLineByPID.do?id=" + contractid;
        ResponseEntity<List<NewgenContractLineItem>> contractResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NewgenContractLineItem>>() {
        });
        List<NewgenContractLineItem> conttactObj = contractResponse.getBody();
        System.out.println("conttactObj : " + conttactObj);
        return conttactObj;
    }

    List<NGExtCM> findContractHeaderByPId(String contractid) {
        RestTemplate restTemplate = new RestTemplate();
        System.out.println("findContractHeaderByPId");
        String url = webservice_ip + "/BuyerPortalWebServices/findContractHeaderByPId.do?contractRefID=" + contractid;
        ResponseEntity<List<NGExtCM>> contractResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGExtCM>>() {
        });
        List<NGExtCM> conttactObj = contractResponse.getBody();
        System.out.println("conttactObj : " + conttactObj);
        return conttactObj;
    }

    List<NewgenContractLineItem> findByMultipleNewgenContractLineItemId(String contractids) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findcontractlineitembymultipleid.do?ids=" + contractids;
        System.out.println("url: " + url);

        ResponseEntity<List<NewgenContractLineItem>> contractResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NewgenContractLineItem>>() {
        });
        List<NewgenContractLineItem> contractList = contractResponse.getBody();

        System.out.println("prList size: " + contractList.size());

        return contractList;
    }

    String saveContractRfqHeaderLineItem(ContractRfqLineItem RfqLineItem) {

        RestTemplate restTemplate = new RestTemplate();

        System.out.println("RfqLineItem :" + RfqLineItem.getContractRfqHeaderRFQID());
        System.out.println("RfqLineItem :" + RfqLineItem.getNewgenContractLineItemId());
        System.out.println("RfqLineItem :" + RfqLineItem.getQuantity());

        String url = webservice_ip + "/BuyerPortalWebServices/savecontractrfqheaderlineitem.do";
        System.out.println("url: " + url);

        String id = restTemplate.postForObject(URI.create(url), RfqLineItem, String.class);

        return id;
    }

    String updateNewgenContractLineItem(NewgenContractLineItem obj) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/updatenewgencontractlineitem.do";
        System.out.println("url: " + url);

        String result = restTemplate.postForObject(URI.create(url), obj, String.class);
        System.out.println("result: " + result);

        return result;
    }

    String saveContractRfqHeaderVendorMapping(ContractRfqHeaderVendorMapping mapping) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/savercontractfqheadervendormapping.do";
        System.out.println("url: " + url);

        String mappingid = restTemplate.postForObject(URI.create(url), mapping, String.class);
        System.out.println("mappingid: " + mappingid);

        return mappingid;
    }

    List<ContractRfqLineItem> findContractRfqLineItemByRfqId(int rfqid) {

        String url = webservice_ip + "/BuyerPortalWebServices/findContractRfqLineItemByRfqId.do?rfqid=" + rfqid;
        System.out.println("url: " + url);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<ContractRfqLineItem>> contractResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ContractRfqLineItem>>() {
        });
        List<ContractRfqLineItem> rfqLineItemList = contractResponse.getBody();
        System.out.println("rfqLineItemList size: " + rfqLineItemList.size());

        return rfqLineItemList;
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

    List<ContractVendorRfqHeader> findContractVendorRfqHeaderByRfqIdAndVendorId(int rfqid, int vendorid) {

        String url = webservice_ip + "/BuyerPortalWebServices/findContractVendorRfqHeaderByRfqIdAndVendorId.do?rfqid=" + rfqid + "&vendorid=" + vendorid;
        System.out.println("url: " + url);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<ContractVendorRfqHeader>> contractResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ContractVendorRfqHeader>>() {
        });
        List<ContractVendorRfqHeader> supplierHeaderList = contractResponse.getBody();
        System.out.println("supplierHeaderList size: " + supplierHeaderList.size());

        return supplierHeaderList;
    }

    List<ContractVendorRfqLineItem> findContractVendorRfqLineItemByContractVenodrRfqHeaderId(int id) {

        String url = webservice_ip + "/BuyerPortalWebServices/findContractVendorRfqLineItemByContractVenodrRfqHeaderId.do?id=" + id;
        System.out.println("url: " + url);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<ContractVendorRfqLineItem>> contractResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ContractVendorRfqLineItem>>() {
        });
        List<ContractVendorRfqLineItem> list = contractResponse.getBody();
        System.out.println("list size: " + list.size());

        return list;
    }

    String updateContractRfqHeader(ContractRfqHeader contractRfqHeaderObj) {

        String url = webservice_ip + "/BuyerPortalWebServices/updateContractRfqHeader.do";
        System.out.println("url: " + url);

        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(url), contractRfqHeaderObj, String.class);
        System.out.println("msg: " + msg);

        return msg;
    }

    String updateContractRfqHeaderVendorMapping(ContractRfqHeaderVendorMapping mapping) {

        String url = webservice_ip + "/BuyerPortalWebServices/updateContractRfqHeaderVendorMapping.do";
        System.out.println("url: " + url);

        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(url), mapping, String.class);
        System.out.println("msg: " + msg);

        return msg;
    }

    List<ContractRfqLineItem> findContractRfqLineItemByMultipleId(String ids) {

        String url = webservice_ip + "/BuyerPortalWebServices/findContractRfqLineItemByMultipleId.do?ids=" + ids;
        System.out.println("url: " + url);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<ContractRfqLineItem>> contractResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ContractRfqLineItem>>() {
        });
        List<ContractRfqLineItem> list = contractResponse.getBody();
        System.out.println("list size: " + list.size());

        return list;
    }

    String updateContractRfqLineItem(ContractRfqLineItem contractRfqLineItemObj) {

        String url = webservice_ip + "/BuyerPortalWebServices/updateContractRfqLineItem.do";
        System.out.println("url: " + url);

        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(url), contractRfqLineItemObj, String.class);
        System.out.println("msg: " + msg);

        return msg;
    }

    public List<PaymentTermsMaster> getAllPaymentTerms() {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/getallpaymentterms.do";

        ResponseEntity<List<PaymentTermsMaster>> paymentterms = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<PaymentTermsMaster>>() {
        });

        System.out.println("paymentterms: " + paymentterms);

        List<PaymentTermsMaster> paymenttermsList = paymentterms.getBody();

        return paymenttermsList;
    }

    public List<MasterDeliveryTerms> getAllDeliveryTerms() {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/getalldeliveryterms.do";

        ResponseEntity<List<MasterDeliveryTerms>> deliveryterms = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterDeliveryTerms>>() {
        });

        System.out.println("deliveryterms: " + deliveryterms);

        List<MasterDeliveryTerms> deliverytermsList = deliveryterms.getBody();

        return deliverytermsList;
    }

    List<SupplierHeader> getSupplierHeaderByRfqId(int rfqid) {
        RestTemplate restTemplate = new RestTemplate();
//        System.out.println("vendorid in :" + vendorid);
        String url = webservice_ip + "/BuyerPortalWebServices/findsupplierheaderbyrfqid.do?rfqid=" + rfqid;
        System.out.println("url in getSupplierHeaderByRfqId:" + url);
        ResponseEntity<List<SupplierHeader>> supplierHeaderResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<SupplierHeader>>() {
        });
        List<SupplierHeader> supplierHeaderObj = (List<SupplierHeader>) supplierHeaderResponse.getBody();

        System.out.println("supplierHeaderObj size :" + supplierHeaderObj.size());

        return supplierHeaderObj;
    }

    List<ReasonMaster> findAllReason() {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findallreason.do";
        System.out.println("url: " + url);

        ResponseEntity<List<ReasonMaster>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ReasonMaster>>() {
        });
        List<ReasonMaster> reasonList = response.getBody();

        System.out.println("reasonList size: " + reasonList.size());

        return reasonList;
    }

//    String TriggerMail(EmailTriggerDetails emailTriggerDetails) {
//
//        RestTemplate restTemplate = new RestTemplate();
//
//        String url = webservice_ip + "/BuyerPortalWebServices/TriggerMail.do";
//        System.out.println("url: " + url);
//
//        String mappingid = restTemplate.postForObject(URI.create(url), emailTriggerDetails, String.class);
//        System.out.println("mappingid: " + mappingid);
//        return mappingid;
//    }
    String newgenFlowControl(InputBean newgenRoutingDetails) {
        RestTemplate restTemplate = new RestTemplate();
        String url = NGwebservice_ip + "/ContractManagement/ng/Contract/ServiceContract";
        System.out.println("url: " + url);
        OutputBean outputBean = restTemplate.postForObject(URI.create(url), newgenRoutingDetails, OutputBean.class);
        System.out.println("mappingid: " + outputBean.getMaincode());

        String mainCode = outputBean.getMaincode();
        return mainCode;
    }

    Output_Resp newgenDocControl(SupportingDocInput PRLineDocInput) {
        RestTemplate restTemplate = new RestTemplate();
        String url = NGwebservice_ip + "/PR2POWebservice/ng/addDocument/PR";
//        String url = NGwebservice_ip + "/PR2POWebservice/ng/addDocument/PR/RFQ"; 
        System.out.println("url: " + url);
        Output_Resp outputBean = restTemplate.postForObject(URI.create(url), PRLineDocInput, Output_Resp.class);
        System.out.println("DMS_DOC_Upload_MainCode: " + outputBean.getMainCode());
        System.out.println("DMS_DOC_Upload_PID: " + outputBean.getProcessInstanceID());
        System.out.println("DMS_DOC_Upload_Message: " + outputBean.getMessage());
        return outputBean;
    }
    
    Output_Resp newgenContractDocControl(SupportingDocInput PRLineDocInput) {
        RestTemplate restTemplate = new RestTemplate();
        String url = NGwebservice_ip + "/PR2POWebservice/ng/addDocument/Contract";
//        String url = NGwebservice_ip + "/PR2POWebservice/ng/addDocument/PR/RFQ";
        System.out.println("url: " + url);
        Output_Resp outputBean = restTemplate.postForObject(URI.create(url), PRLineDocInput, Output_Resp.class);
        System.out.println("DMS_DOC_Upload_MainCode: " + outputBean.getMainCode());
        System.out.println("DMS_DOC_Upload_PID: " + outputBean.getProcessInstanceID());
        System.out.println("DMS_DOC_Upload_Message: " + outputBean.getMessage());
        return outputBean;
    }
    
   
    
    

    OutputRfqFormat uploadRfqFormatToDMS(InputRfqFormat inputRfqFormat) {
        RestTemplate restTemplate = new RestTemplate();
        // String url = NGwebservice_ip + "/PR2POWebservice/ng/addDocument/PR/RFQ";
        String url = NGwebservice_ip + "/PR2POWebservice/ng/addDocument/PR/RFQ";
        System.out.println("url: " + url);

        OutputRfqFormat outputRfqFormat = restTemplate.postForObject(URI.create(url), inputRfqFormat, OutputRfqFormat.class);

        System.out.println("DMS_RFQ_Format_Upload_MainCode: " + outputRfqFormat.getMainCode());
        System.out.println("DMS_RFQ_Format_Upload_PID: " + outputRfqFormat.getProcessInstanceID());
        System.out.println("DMS_RFQ_Format_Upload_Message: " + outputRfqFormat.getMessage());
        System.out.println("DocIndex: " + outputRfqFormat.getDocIndex());
        System.out.println("IsIndex: " + outputRfqFormat.getIsIndex());

        return outputRfqFormat;
    }
    
    OutputRfqFormat uploadContractRfqFormatToDMS(InputRfqFormat inputRfqFormat) {
        RestTemplate restTemplate = new RestTemplate();
        // String url = NGwebservice_ip + "/PR2POWebservice/ng/addDocument/PR/RFQ";
        String url = NGwebservice_ip + "/PR2POWebservice/ng/addDocument/Contract/RFQ";
        System.out.println("url: " + url);

        OutputRfqFormat outputRfqFormat = restTemplate.postForObject(URI.create(url), inputRfqFormat, OutputRfqFormat.class);

        System.out.println("DMS_RFQ_Format_Upload_MainCode: " + outputRfqFormat.getMainCode());
        System.out.println("DMS_RFQ_Format_Upload_PID: " + outputRfqFormat.getProcessInstanceID());
        System.out.println("DMS_RFQ_Format_Upload_Message: " + outputRfqFormat.getMessage());
        System.out.println("DocIndex: " + outputRfqFormat.getDocIndex());
        System.out.println("IsIndex: " + outputRfqFormat.getIsIndex());

        return outputRfqFormat;
    }
    OutputRfqFormat uploadInvitationFormatToDMS(InputRfqFormat inputRfqFormat) {
        RestTemplate restTemplate = new RestTemplate();
        String url = NGwebservice_ip + "/PR2POWebservice/ng/addDocument/Contract/Invitation";
        System.out.println("url: " + url);
 
        OutputRfqFormat outputRfqFormat = restTemplate.postForObject(URI.create(url), inputRfqFormat, OutputRfqFormat.class);
 
        System.out.println("DMS_Invitation_Format_Upload_MainCode: " + outputRfqFormat.getMainCode());
        System.out.println("DMS_Invitation_Format_Upload_PID: " + outputRfqFormat.getProcessInstanceID());
        System.out.println("DMS_Invitation_Format_Upload_Message: " + outputRfqFormat.getMessage());
       System.out.println("DMS_Invitation_Format_Upload_MainCode: " + outputRfqFormat.getMainCode());
        System.out.println("DMS_Invitation_Format_Upload_PID: " + outputRfqFormat.getProcessInstanceID());
          System.out.println("DMS_Invitation_Format_Upload_Message: " + outputRfqFormat.getMessage());
 
        return outputRfqFormat;
    }
    String newgenRFQDocControl(GetDocPRRFQInput getDocPRRFQInput) {
        RestTemplate restTemplate = new RestTemplate();
        String url = NGwebservice_ip + "/PR2POWebservice/ng/addDocument/PR/RFQ";
        System.out.println("url: " + url);
        Output_Resp outputBean = restTemplate.postForObject(URI.create(url), getDocPRRFQInput, Output_Resp.class);
        System.out.println("mappingid: " + outputBean.getMainCode());
        String mainCode = outputBean.getMainCode();
        return mainCode;

    }

    List<RfqPrLineItemBean> callRfqPrLineItemsStoredProcedure(String insertionOrderIds) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/callRfqPrLineItemsStoredProcedure.do?insertionOrderIds=" + insertionOrderIds;
        System.out.println("url: " + url);

        ResponseEntity<List<RfqPrLineItemBean>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<RfqPrLineItemBean>>() {
        });
        List<RfqPrLineItemBean> list = response.getBody();
        System.out.println("rfqprlineitem list size: " + list.size());
        return list;
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

    List<VendorRfqLineItemBean> callVendorRfqPrLineItemStoredProcedure(int rfqid, int vendorid, String status, int supplierHeaderId) {
        String url = webservice_ip + "/BuyerPortalWebServices/callVendorRfqPrLineItemStoredProcedure.do?rfqid=" + rfqid + "&vendorid=" + vendorid + "&status=" + status + "&supplierHeaderId=" + supplierHeaderId;
        System.out.println("url: " + url);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<VendorRfqLineItemBean>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<VendorRfqLineItemBean>>() {
        });
        List<VendorRfqLineItemBean> list = response.getBody();
        return list;
    }

    String saveBuyerAuditLogReport(ReportBuyerAuditLog log) {

        String url = webservice_ip + "/BuyerPortalWebServices/saveBuyerAuditLogReport.do";
        System.out.println("url: " + url);

        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(url), log, String.class);
        System.out.println("msg: " + msg);

        return msg;
    }

    List<MasterMaterialGeneral> getAllMasterMaterialGeneral() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getAllMasterMaterialGeneral.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterMaterialGeneral>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterMaterialGeneral>>() {
        });
        List<MasterMaterialGeneral> list = response.getBody();
        return list;
    }

    List<MasterPlant> getAllMasterPlant() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getAllMasterPlant.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterPlant>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterPlant>>() {
        });
        List<MasterPlant> list = response.getBody();
        return list;
    }

    String saveWorkOrderRfpLineItem(WorkOrderRfpLineItem rfpLineItem) {
        String url = webservice_ip + "/BuyerPortalWebServices/saveWorkOrderRfpLineItem.do";
        System.out.println("url: " + url);
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(url), rfpLineItem, String.class);
        System.out.println("msg: " + msg);
        return msg;
    }

    MasterMaterialGeneral getMasterMaterialGeneralById(int id) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getMasterMaterialGeneralById.do?id=" + id;
        ResponseEntity<MasterMaterialGeneral> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<MasterMaterialGeneral>() {
        });
        MasterMaterialGeneral material = response.getBody();
        System.out.println("material : " + material);
        return material;
    }

    MasterPlant getMasterPlantById(int id) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getMasterPlantById.do?id=" + id;
        ResponseEntity<MasterPlant> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<MasterPlant>() {
        });
        MasterPlant plant = response.getBody();
        System.out.println("plant : " + plant);
        return plant;
    }

    List<WorkOrderRfpLineItem> findRfpLineItemByRfpHeaderId(int id) {
        String url = webservice_ip + "/BuyerPortalWebServices/findRfpLineItemByRfpHeaderId.do?id=" + id;
        System.out.println("url: " + url);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<WorkOrderRfpLineItem>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<WorkOrderRfpLineItem>>() {
        });
        List<WorkOrderRfpLineItem> list = response.getBody();
        return list;
    }

    SupplierRfpHeader getSupplierRfpHeaderById(int id) {
        RestTemplate restTemplate = new RestTemplate();
        System.out.println("Find by Contractid");
        String url = webservice_ip + "/BuyerPortalWebServices/getSupplierRfpHeaderById.do?id=" + id;
        ResponseEntity<SupplierRfpHeader> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<SupplierRfpHeader>() {
        });
        SupplierRfpHeader obj = response.getBody();
        return obj;
    }

    List<SupplierRfpHeader> findSupplierRfpHeaderByRfpIdAndVendorId(int rfqid, int vendorid) {
        String url = webservice_ip + "/BuyerPortalWebServices/findSupplierRfpHeaderByRfpIdAndVendorId.do?rfqid=" + rfqid + "&vendorid=" + vendorid;
        System.out.println("url: " + url);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<SupplierRfpHeader>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<SupplierRfpHeader>>() {
        });
        List<SupplierRfpHeader> list = response.getBody();
        return list;
    }

    List<SupplierRfpLineItem> findSupplierRfpLineItemBySupplierRfpHeaderId(int id) {
        String url = webservice_ip + "/BuyerPortalWebServices/findSupplierRfpLineItemBySupplierRfpHeaderId.do?id=" + id;
        System.out.println("url: " + url);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<SupplierRfpLineItem>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<SupplierRfpLineItem>>() {
        });
        List<SupplierRfpLineItem> list = response.getBody();
        return list;
    }

    String saveSupplierHeader(SupplierHeader supplierHeader) {
        RestTemplate restTemplate = new RestTemplate();
        String id = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveSupplierHeader.do"), supplierHeader, String.class);
        System.out.println("id: " + id);
        return id;
    }

    String saveSupplierLineitem(SupplierLineitem lineItem) {
        RestTemplate restTemplate = new RestTemplate();
        String id = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveSupplierLineitem.do"), lineItem, String.class);
        System.out.println("id: " + id);
        return id;
    }

    SupplierHeader getSupplierHeaderById(int id) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getSupplierHeaderById.do?id=" + id;
        ResponseEntity<SupplierHeader> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<SupplierHeader>() {
        });
        SupplierHeader obj = response.getBody();
        return obj;
    }
    
    

    List<WorkOrderRfqHeader> findRfqHeaderByBuyerIdAndNotInStatus(int buyerid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findRfqHeaderByBuyerIdAndNotInStatus.do?buyerid=" + buyerid;
        System.out.println("url: " + url);
        ResponseEntity<List<WorkOrderRfqHeader>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<WorkOrderRfqHeader>>() {
        });
        List<WorkOrderRfqHeader> rfqHeaderList = prResponse.getBody();
        return rfqHeaderList;
    }

    List<ContractRfqHeader> findContractRfqHeaderByBuyerIdAndNotInStatus(int buyerid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findContractRfqHeaderByBuyerIdAndNotInStatus.do?buyerid=" + buyerid;
        System.out.println("url: " + url);
        ResponseEntity<List<ContractRfqHeader>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ContractRfqHeader>>() {
        });
        List<ContractRfqHeader> rfqHeaderList = prResponse.getBody();
        return rfqHeaderList;
    }
//abhishek

    String TriggerMail(EmailTriggerDetails emailTriggerDetails) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/TriggerMail.do";
        System.out.println("url: " + url);

        String mappingid = restTemplate.postForObject(URI.create(url), emailTriggerDetails, String.class);
        System.out.println("mappingid: " + mappingid);
        return mappingid;

    }

    void makeContractRfqFormat(Document document, HttpServletRequest request)
            throws DocumentException, BadElementException, IOException {
        Font font = new Font(Font.FontFamily.UNDEFINED, 10, Font.NORMAL);
        DateFormat df = new SimpleDateFormat("dd-MMM-yyyy");

        Paragraph para = new Paragraph();
        Paragraph subcontent;

        String path = request.getRequestURL().toString();
        System.out.println("path: " + path);

        String natSteelLogo = path.substring(0, path.indexOf("submitcontractrfqdetails.do")) + "assets/images/NatSteel-logo.jpg";
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

        //  PdfPCell c1 = new PdfPCell(new Phrase("RFQ No: " + rfq.getRfqNumber(), font));
        // c1.setBorder(PdfPCell.NO_BORDER);
        //  PdfPCell c2 = new PdfPCell(new Phrase("Date: " + df.format(rfq.getRfqRequestDate()), font));
        // c2.setBorder(PdfPCell.NO_BORDER);
        PdfPCell c3 = new PdfPCell(new Phrase("To: " + vendorFName + " " + vendorLName, font));
        c3.setBorder(PdfPCell.NO_BORDER);
        PdfPCell c4 = new PdfPCell(new Phrase("Attn: ", font));
        c4.setBorder(PdfPCell.NO_BORDER);
        PdfPCell c5 = new PdfPCell(new Phrase("Tel: " + vendorTel, font));
        c5.setBorder(PdfPCell.NO_BORDER);
        PdfPCell c6 = new PdfPCell(new Phrase("Fax: " + vendorFax, font));
        c6.setBorder(PdfPCell.NO_BORDER);
        // PdfPCell c7 = new PdfPCell(new Phrase("From: " + rfq.getNgBpBuyerdetailsId().getFirstname() + " " + rfq.getNgBpBuyerdetailsId().getLastname() + "       Tel.No: ", font));
        //     c7.setBorder(PdfPCell.NO_BORDER);
        //  PdfPCell c8 = new PdfPCell(new Phrase("Email: " + rfq.getNgBpBuyerdetailsId().getEmailid(), font));
        //   c8.setBorder(PdfPCell.NO_BORDER);

        //      headerDataTable1.addCell(c1);
        //    headerDataTable1.addCell(c2);
        headerDataTable1.addCell(c3);
        headerDataTable1.addCell(c4);
        headerDataTable1.addCell(c5);
        headerDataTable1.addCell(c6);
        // headerDataTable1.addCell(c7);
        //headerDataTable1.addCell(c8);

        String text = "Please quote your best price for the below mentioned items/services. Kindly include your most favourable lead time, unit weight, payment terms, trade terms, currency of offer and validity of offer. Quotation should reach us not later than QUOTATION SUBMITTED SHOULD BE VALID/EXTENDED TO SUBSIDIARIES OF NATSTEEL";

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

//        for (BuyerRfqLineItemBean bean : buyerRfqLineItemBeanList) {
//
//            lineC1 = new PdfPCell(new Phrase(bean.getItemNumber(), font));
//            lineC1.setBorder(PdfPCell.NO_BORDER);
//            lineC2 = new PdfPCell(new Phrase(bean.getPlantName(), font));
//            lineC2.setBorder(PdfPCell.NO_BORDER);
//            lineC3 = new PdfPCell(new Phrase(bean.getQuantity(), font));
//            lineC3.setBorder(PdfPCell.NO_BORDER);
//            lineC4 = new PdfPCell(new Phrase(bean.getUnit(), font));
//            lineC4.setBorder(PdfPCell.NO_BORDER);
//            lineC5 = new PdfPCell(new Phrase(bean.getDescription(), font));
//            lineC5.setBorder(PdfPCell.NO_BORDER);
//            lineC6 = new PdfPCell(new Phrase(bean.getUnit(), font));
//            lineC6.setBorder(PdfPCell.NO_BORDER);
//            lineC7 = new PdfPCell(new Phrase(bean.getPriceUnit(), font));
//            lineC7.setBorder(PdfPCell.NO_BORDER);
//            lineC8 = new PdfPCell(new Phrase(bean.getLeadTime(), font));
//            lineC8.setBorder(PdfPCell.NO_BORDER);
//
//            lineItemDataTable.addCell(lineC1);
//            lineItemDataTable.addCell(lineC2);
//            lineItemDataTable.addCell(lineC3);
//            lineItemDataTable.addCell(lineC4);
//            lineItemDataTable.addCell(lineC5);
//            lineItemDataTable.addCell(lineC6);
//            lineItemDataTable.addCell(lineC7);
//            lineItemDataTable.addCell(lineC8);
//        }
        PdfPTable headerDataTable2 = new PdfPTable(1);
        headerDataTable2.setSpacingBefore(20);
        headerDataTable2.setHorizontalAlignment(Paragraph.ALIGN_LEFT);

        // PdfPCell cc1 = new PdfPCell(new Phrase("GST Registered Number(if applicable): " + vendor.getGstRegNumber(), font));
//        cc1.setBorder(PdfPCell.NO_BORDER);
//        PdfPCell cc2 = new PdfPCell(new Phrase("Currency: ", font));
//        cc2.setBorder(PdfPCell.NO_BORDER);
//      //  PdfPCell cc3 = new PdfPCell(new Phrase("Delivery Terms: " + rfq.getDeliveryterms(), font));
//        cc3.setBorder(PdfPCell.NO_BORDER);
//      //  PdfPCell cc4 = new PdfPCell(new Phrase("Payment Terms: " + rfq.getPaymentterms(), font));
//        cc4.setBorder(PdfPCell.NO_BORDER);
//      //  PdfPCell cc5 = new PdfPCell(new Phrase("Validity of Offer: " + df.format(rfq.getRfqvaliduntil()), font));
//        cc5.setBorder(PdfPCell.NO_BORDER);
//
//        headerDataTable2.addCell(cc1);
//        headerDataTable2.addCell(cc2);
//        headerDataTable2.addCell(cc3);
//        headerDataTable2.addCell(cc4);
//        headerDataTable2.addCell(cc5);
        document.add(para);
        document.add(headerDataTable1);
        document.add(longData);
        document.add(lineItemDataTable);
        document.add(headerDataTable2);

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
    
     public void generateInvitationLetter(com.lowagie.text.Document document,String Vendor , String startdate , String enddate , String contDate , String tenderTitle ) throws FileNotFoundException, com.lowagie.text.DocumentException, com.lowagie.text.BadElementException, IOException, ParseException {
        try {
            System.out.println("Inside generateInvitationLetter method ");
            System.out.println(Vendor+","+startdate+","+enddate+","+contDate+","+tenderTitle);
            com.lowagie.text.Font fontT11 = FontFactory.getFont(FontFactory.TIMES_ROMAN, 11);
            com.lowagie.text.Font fontT11UB = FontFactory.getFont(FontFactory.TIMES_ROMAN, 11, com.lowagie.text.Font.UNDERLINE, Color.BLUE);
            com.lowagie.text.Font fontT11b = FontFactory.getFont(FontFactory.TIMES_ROMAN, 11, com.lowagie.text.Font.BOLD);
            com.lowagie.text.Font fontT11i = FontFactory.getFont(FontFactory.TIMES_ROMAN, 11, com.lowagie.text.Font.ITALIC);
            com.lowagie.text.Font fontT10 = FontFactory.getFont(FontFactory.TIMES_ROMAN, 10, com.lowagie.text.Font.BOLD);
            com.lowagie.text.Font fontT10b = FontFactory.getFont(FontFactory.TIMES_ROMAN, 10);
            com.lowagie.text.Font fontT12 = FontFactory.getFont(FontFactory.TIMES_ROMAN, 12, com.lowagie.text.Font.UNDERLINE);
            com.lowagie.text.Font fontT14bi = FontFactory.getFont(FontFactory.TIMES_ROMAN, 14, com.lowagie.text.Font.BOLDITALIC);
            com.lowagie.text.Font fontV11 = FontFactory.getFont("Verdana", 11, com.lowagie.text.Font.BOLD, Color.BLUE);
            com.lowagie.text.Font fontT11blue = FontFactory.getFont(FontFactory.TIMES_ROMAN, 11, com.lowagie.text.Font.BOLD, Color.BLUE);
            com.lowagie.text.Font fontBr11 = FontFactory.getFont("Brush Script MT", 14);
            com.lowagie.text.Font fontCG11 = FontFactory.getFont("CG Times (WN)", 10);
            
            //Dynamic Data -> Vendor , StartDate , endDate , contDate , tenderTitle
            
            String SpocName = "ALAN KANG / EUNICE TAN";
            //String Vendor = "Vendor";
            Date date1=new SimpleDateFormat("dd-MM-yyyy").parse(startdate);
            Date date2=new SimpleDateFormat("dd-MM-yyyy").parse(enddate);
            Date date3=new SimpleDateFormat("dd-MM-yyyy").parse(contDate);
            SimpleDateFormat ftt=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss:SS");
            String StartDate = ftt.format(date1).toString();
            String StartDate_ori = DateCovert(StartDate);
            String endDate = ftt.format(date2).toString();
            String EndDate_ori = DateCovert(endDate);
            String contdate = ftt.format(date3).toString(); //RFQ Expiry Date
            String contdate_ori = DateCovert(contdate);
            int startYear = Integer.parseInt(StartDate_ori.substring(StartDate_ori.length()-4,StartDate_ori.length()));
            int endYear = Integer.parseInt(EndDate_ori.substring(EndDate_ori.length()-4,EndDate_ori.length()));
            int yearDiff=0;
            if(endYear-startYear ==0)
            {
                yearDiff = 1;
            }
            else
            {
                yearDiff = endYear-startYear;
            }
            SimpleDateFormat ft = new SimpleDateFormat("dd-MMMM-yyyy");
            String RefDate = ft.format(new Date()).toString().toUpperCase();
            String dateSplit[] = RefDate.split("-");
            String currMonth = dateSplit[1].substring(0,3).toUpperCase();
            String currYear = dateSplit[2];
            RefDate = RefDate.replaceAll("-"," ");
            //String tenderTitle = " THE COMPANY UNIFORM SUPPLIES FOR 2017 ";
            tenderTitle=tenderTitle.toUpperCase();
            String tenderTitleLow = tenderTitle.toLowerCase();
//
//            String sQuery = "SELECT * FROM NAT_InvitationLetter";
//
//            String sOutputXml = ExecuteQuery(sQuery);
//
//            XMLParser parsergetlist = new XMLParser(sOutputXml);
//            System.out.println("sOutputXml" + sOutputXml);
//
//            String mainCode = parsergetlist.getValueOf("MainCode");
//            if (mainCode.equals("0")) {
//
//                SpocName = parsergetlist.getValueOf("SpocName");
//                Vendor = parsergetlist.getValueOf("Vendor");
//                StartDate = parsergetlist.getValueOf("StartDate");
//                endDate = parsergetlist.getValueOf("EndDate");
//                contdate = parsergetlist.getValueOf("ContDate");
//
//            }

            //String proppath = "resource\\Details.properties";
            String proppath = "C:\\Users\\girivasu-g\\Downloads\\Details.properties";
            System.out.println("proppath-->"+proppath);
            Properties prop = new Properties();

            try {
                prop.load(new FileInputStream(proppath));
            } catch (FileNotFoundException nfe) {
                  System.out.println("Invitation's Property file not found");
                //GenLog("  \n\n### properties file " + prop + " not found  " + new java.util.Date() + "  " + nfe, "E");

            } catch (Exception e) {
                System.out.println("Exception in reading Invitation's property file -> "+e);
               // GenLog("\n\n### **[Error]**  Error in properties file" + new java.util.Date() + " " + e, "E");

            }

            //com.lowagie.text.Document document = null;
//            Rectangle page = null;
            //document = new com.lowagie.text.Document();
//            String sFileName = "InvitationLetter.pdf";
//            page = document.getPageSize();
//            com.lowagie.text.pdf.PdfWriter writer = com.lowagie.text.pdf.PdfWriter.getInstance(document, new FileOutputStream(sFileName));
//            document.setMargins(Float.parseFloat("50"), Float.parseFloat("30"), 60, 10);
//            document.open();

            String crestImagePath = BuyerPortalWar_ip + "/BuyerPortal/assets/images/logo.bmp";
            System.out.println("crestImagePath-->"+crestImagePath);
            com.lowagie.text.Image image = com.lowagie.text.Image.getInstance(crestImagePath);
            image.scaleToFit(120, 100);
            image.setAlignment(com.lowagie.text.Image.ALIGN_RIGHT);
            document.add(image);

            // String para1 = "";
            String para1 = prop.getProperty("Ref") + currMonth +"/"+ currYear;
            //String para2 = prop.getProperty("RefDate");
            String para2 = RefDate;
            String para3 = "Dear " + Vendor + ",";
            String para4 = prop.getProperty("Subject1")+" "+tenderTitle+" "+ prop.getProperty("Subject2");

            com.lowagie.text.Paragraph paragraph1 = new com.lowagie.text.Paragraph(para1, fontT11);
            com.lowagie.text.Paragraph paragraph2 = new com.lowagie.text.Paragraph(para2, fontT11);
            com.lowagie.text.Paragraph paragraph3 = new com.lowagie.text.Paragraph(para3, fontT10);
            com.lowagie.text.Paragraph paragraph4 = new com.lowagie.text.Paragraph(para4, fontT12);

            document.add(paragraph1);
            document.add(paragraph2);
            document.add(com.lowagie.text.Chunk.NEWLINE);
            document.add(paragraph3);
            document.add(com.lowagie.text.Chunk.NEWLINE);
            document.add(paragraph4);
            document.add(com.lowagie.text.Chunk.NEWLINE);

//preethe
            com.lowagie.text.List list = new com.lowagie.text.List(com.lowagie.text.List.ORDERED);
            com.lowagie.text.List sublist = null;
            com.lowagie.text.List sublist1 = null;

            list.add(new ListItem(prop.getProperty("Line1_1")+" "+tenderTitleLow+prop.getProperty("Line1_2"), fontT11));
            list.add(new ListItem(prop.getProperty("Line2_1")+" "+ Integer.toString(yearDiff)+ " " +prop.getProperty("Line2_2") + " " + StartDate_ori + " till " + EndDate_ori + ".", fontT11));

            list.add(new ListItem(prop.getProperty("Line3"), fontT11));
            ListItem item_3 = new ListItem();
            com.lowagie.text.Paragraph paragraph_31 = new com.lowagie.text.Paragraph();
            paragraph_31.add(new com.lowagie.text.Chunk(prop.getProperty("Line3_1") + "  ", fontT11));
            paragraph_31.add(new com.lowagie.text.Chunk(prop.getProperty("Line3_2"), fontT11UB));
            paragraph_31.add(new com.lowagie.text.Chunk("  " + prop.getProperty("Line3_3"), fontT11));
            item_3.add(paragraph_31);

            com.lowagie.text.List sublist1_3 = new com.lowagie.text.List(com.lowagie.text.List.UNORDERED, 20);
            sublist1_3.setListSymbol("");
            sublist1_3.setIndentationLeft(-9);
            sublist1_3.add(item_3);
            list.add(sublist1_3);

            list.add(new ListItem(prop.getProperty("Line4_1") + "\n"
                    + prop.getProperty("Line4_2") + "\n"
                    + prop.getProperty("Line4_3"), fontT11b));

            sublist = new com.lowagie.text.List(com.lowagie.text.List.UNORDERED, 20);
            sublist.setListSymbol("•");
            sublist.add(new ListItem(prop.getProperty("Line4bullet1"), fontT11));
            sublist.setIndentationLeft(12);
            list.add(sublist);
            sublist1 = new com.lowagie.text.List(com.lowagie.text.List.UNORDERED, 20);
            sublist1.setListSymbol("");
            sublist1.setIndentationLeft(-8);
            sublist1.add(new ListItem(20, prop.getProperty("Line4bull"), fontT11b));
            list.add(sublist1);

            com.lowagie.text.List sublist2 = new com.lowagie.text.List(com.lowagie.text.List.UNORDERED, 20);
            sublist2.setListSymbol("•");
            sublist2.setIndentationLeft(12);
            sublist2.add(new ListItem(prop.getProperty("Line4bullet2"), fontT11));
            // sublist2.add(new ListItem("For thee quotations, please submit to us in electronic format. You can store your documents in pdf ", fontT11));
            // sublist2.add(new ListItem("For thee quotations, please submit to us in",fontT11));
            list.add(sublist2);
            ListItem item_4 = new ListItem();
            com.lowagie.text.Paragraph paragraph_42 = new com.lowagie.text.Paragraph();
            paragraph_42.add(new com.lowagie.text.Chunk(prop.getProperty("Line4bullet3") + " ", fontT11));
            paragraph_42.add(new com.lowagie.text.Chunk(prop.getProperty("Line4bullet3_1"), fontT11b));
            paragraph_42.add(new com.lowagie.text.Chunk(prop.getProperty("Line4bullet3_2") + " ", fontT11));
            paragraph_42.add(new com.lowagie.text.Chunk(prop.getProperty("Line4bullet3_3"), fontT11b));
            item_4.add(paragraph_42);
            ListItem item_5 = new ListItem();
            item_5.add(new com.lowagie.text.Paragraph(prop.getProperty("Line4bullet3_4"), fontT11b));
            com.lowagie.text.Paragraph paragraph_41 = new com.lowagie.text.Paragraph();
            paragraph_41.add(new com.lowagie.text.Chunk(prop.getProperty("Line4bullet3_5"), fontT11b));
            paragraph_41.add(new com.lowagie.text.Chunk(prop.getProperty("Line4bullet3_6"), fontT11));
            item_5.add(paragraph_41);

            sublist2.add(item_4);

            com.lowagie.text.List sublist1_5 = new com.lowagie.text.List(com.lowagie.text.List.UNORDERED, 20);
            sublist1_5.setListSymbol("");
            sublist1_5.setIndentationLeft(12);
            sublist1_5.add(item_5);
            list.add(sublist1_5);

            com.lowagie.text.List sublist3 = new com.lowagie.text.List(com.lowagie.text.List.UNORDERED, 20);
            sublist3.setListSymbol("");
            sublist3.setIndentationLeft(-8);
            sublist3.add(new ListItem(20, prop.getProperty("Line4_1Tender")+ " "+tenderTitle+" " +prop.getProperty("Line4_2Tender") , fontT11i));

            ListItem item_6T = new ListItem();
            com.lowagie.text.Paragraph paragraph_61T = new com.lowagie.text.Paragraph();
            paragraph_61T.add(new com.lowagie.text.Chunk(prop.getProperty("Line4Tender1") + " ", fontT11i));
            com.lowagie.text.Chunk underline_61T = new com.lowagie.text.Chunk(contdate_ori + " " + prop.getProperty("Line4Tender2"), fontT14bi);
            underline_61T.setUnderline(0.1f, -2f);
            paragraph_61T.add(underline_61T);
            paragraph_61T.add(new com.lowagie.text.Chunk(" " + prop.getProperty("Line4Tender3"), fontT11i));
            item_6T.add(paragraph_61T);

            com.lowagie.text.List sublist1_6T = new com.lowagie.text.List(com.lowagie.text.List.UNORDERED, 20);
            sublist1_6T.setListSymbol("");
            sublist1_6T.setIndentationLeft(-19);
            sublist1_6T.add(item_6T);
            sublist3.add(sublist1_6T);

            list.add(sublist3);

            com.lowagie.text.List sublist4 = new com.lowagie.text.List(com.lowagie.text.List.UNORDERED, 20);
            sublist4.setListSymbol("");
            sublist4.setIndentationLeft(70);
            sublist4.add(new ListItem(20, prop.getProperty("Line4Tender3_1") + "  " + SpocName, fontT10));
            sublist4.add(new ListItem(prop.getProperty("Line4Tender3_2"), fontT10));
            sublist4.add(new ListItem(prop.getProperty("Line4Tender3_3"), fontT10));
            sublist4.add(new ListItem(prop.getProperty("Line4Tender3_4"), fontT10));
            sublist4.add(new ListItem(prop.getProperty("Line4Tender3_5"), fontT10));
            list.add(sublist4);

            com.lowagie.text.List sublist5 = new com.lowagie.text.List(com.lowagie.text.List.UNORDERED, 20);
            sublist5.setListSymbol("");

            sublist5.add(new ListItem(5, "  ", fontT10));
            list.add(sublist5);

            list.add(new ListItem(prop.getProperty("Line5") + "\n" + prop.getProperty("Line5_1"), fontT11));
            list.add(new ListItem(prop.getProperty("Line6") + " ", fontT11));
            ListItem item_6 = new ListItem();
            com.lowagie.text.Paragraph paragraph_61 = new com.lowagie.text.Paragraph();
            paragraph_61.add(new com.lowagie.text.Chunk(prop.getProperty("Line6_1"), fontT11UB));
            paragraph_61.add(new com.lowagie.text.Chunk(prop.getProperty("Line6_2"), fontT11));
            item_6.add(paragraph_61);
            item_6.add(new com.lowagie.text.Paragraph(prop.getProperty("Line6_3"), fontT11UB));

            com.lowagie.text.List sublist1_6 = new com.lowagie.text.List(com.lowagie.text.List.UNORDERED, 20);
            sublist1_6.setListSymbol("");
            sublist1_6.setIndentationLeft(-9);
            sublist1_6.add(item_6);
            list.add(sublist1_6);
            document.add(list);

            document.add(com.lowagie.text.Chunk.NEWLINE);

            String para6 = "ALAN KANG";
            String paraline = "_______________________________";

            com.lowagie.text.Paragraph paragraph5 = new com.lowagie.text.Paragraph(prop.getProperty("Sigtxt"), fontT10);
            com.lowagie.text.Paragraph paragraph6 = new com.lowagie.text.Paragraph(para6, fontBr11);
            com.lowagie.text.Paragraph paragraphline = new com.lowagie.text.Paragraph(paraline, fontT10);
            com.lowagie.text.Paragraph paragraph11 = new com.lowagie.text.Paragraph(prop.getProperty("Footertxt"), fontCG11);

            document.add(paragraph5);
            document.add(paragraph6);
            document.add(paragraphline);

            com.lowagie.text.List list1 = new com.lowagie.text.List(com.lowagie.text.List.UNORDERED, 20);
            list1.setListSymbol("");
            list1.setIndentationLeft(-20);
            list1.add(new ListItem("Alan Kang (Mr.)", fontV11));
            list1.add(new ListItem(12, "Senior Procurment Executive,", fontT11blue));
            list1.add(new ListItem(12, "Procurement Operations", fontT11blue));
            list1.add(new ListItem(12, "NatSteel Holdings Pte Ltd", fontT11blue));
            document.add(list1);
            document.add(paragraph11);

            document.close();
            
            //Convert documne to bye stream -> pass pass
            System.out.println("Paragraph added");
            System.out.println("Invitation PDF created successfully");
        } catch (Exception e) {

           // GenLog("\n\n### **[Error]**  Error ingeneratepdf function" + new java.util.Date() + " " + e, "E");

        }
    }
    
   public String DateCovert(String actualDate) throws ParseException {
        try {
            SimpleDateFormat month_date = new SimpleDateFormat("d");
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Date date = sdf.parse(actualDate);
            String month_name = month_date.format(date);
            SimpleDateFormat month_date2 = new SimpleDateFormat("d MMM yyyy", Locale.ENGLISH);
            if (month_name.endsWith("1") && !month_name.endsWith("11")) {
                month_date2 = new SimpleDateFormat("d'st' MMM yyyy", Locale.ENGLISH);
            } else if (month_name.endsWith("2") && !month_name.endsWith("12")) {
                month_date2 = new SimpleDateFormat("d'nd' MMM yyyy", Locale.ENGLISH);
            } else if (month_name.endsWith("3") && !month_name.endsWith("13")) {
                month_date2 = new SimpleDateFormat("d'rd' MMM yyyy", Locale.ENGLISH);
            } else {
                month_date2 = new SimpleDateFormat("d'th' MMM yyyy", Locale.ENGLISH);
            }
            String ordiDate = month_date2.format(date);
            System.out.println("Final: " + ordiDate);
            return ordiDate;
        } catch (Exception e) {
            //GenLog("\n\n###  Either error in entry of JtsIp,JtsPort,iPort,AppServer OR Jboss is not running _" + e.getMessage(), "E");
            return "";
        }

    }
   //ByteArrayOutputStream
//   public static void  GenerateSOWDocument(com.lowagie.text.Document document,String tenderTitle,String OLADate, String CompanyName , String natSteelRegistrationNo , String natsteelCompanyAddress , String vendorName , String vendorRegistrationNo , String vendorAddress , String ContractValidityStartDate , String ContractValidityEndDate) throws FileNotFoundException, DocumentException, IOException, com.lowagie.text.DocumentException {
//        // TODO code application logic here
//        ContractManagement.info("Inside SOWGenerate");
//        List<InputStream> list = new ArrayList<InputStream>();
//
//       
//        GenerateSOWforServices(tenderTitle,OLADate, CompanyName , natSteelRegistrationNo , natsteelCompanyAddress ,  vendorName ,  vendorRegistrationNo ,  vendorAddress , ContractValidityStartDate ,  ContractValidityEndDate);
//        ContractManagement.info("Out of generating 1st and 3rd"); 
//        InputStream inputStreamOne = new FileInputStream(new File("D:\\Newgen\\jboss-eap-7.1\\bin\\ContractDocuments\\First Part.pdf"));
//        list.add(inputStreamOne);
//        InputStream inputStreamTwo = new FileInputStream(new File("D:\\Newgen\\jboss-eap-7.1\\bin\\ContractDocuments\\Second Part.pdf"));
//        list.add(inputStreamTwo);
//        InputStream inputStreamThree = new FileInputStream(new File("D:\\Newgen\\jboss-eap-7.1\\bin\\ContractDocuments\\Third Part.pdf"));
//        list.add(inputStreamThree);
//        InputStream inputStreamFour = new FileInputStream(new File("D:\\Newgen\\jboss-eap-7.1\\bin\\ContractDocuments\\Fourth Part.pdf"));
//        list.add(inputStreamFour);
//
//         OutputStream outputStream = new FileOutputStream(new File("D:\\Newgen\\jboss-eap-7.1\\bin\\ContractDocuments\\Merger.pdf"));
//        mergePdf(document,list, outputStream);
////        File file = new File("D:\\Newgen\\jboss-eap-7.1\\bin\\ContractDocuments\\Final.pdf");
////        file.getParentFile().mkdirs();
////        manipulatePdf("D:\\Newgen\\jboss-eap-7.1\\bin\\ContractDocuments\\Merger.pdf", "D:\\Newgen\\jboss-eap-7.1\\bin\\ContractDocuments\\Final.pdf");
////        
////        File file1 = new File("D:\\Newgen\\jboss-eap-7.1\\bin\\ContractDocuments\\Final.pdf");
//// 
////        FileInputStream fis = new FileInputStream(file1);
////        //System.out.println(file.exists() + "!!");
////        //InputStream in = resource.openStream();
////        ByteArrayOutputStream bos = new ByteArrayOutputStream();
////        byte[] buf = new byte[1024];
////        try {
////            for (int readNum; (readNum = fis.read(buf)) != -1;) {
////                bos.write(buf, 0, readNum); //no doubt here is 0
////                //Writes len bytes from the specified byte array starting at offset off to this byte array output stream.
////                System.out.println("read " + readNum + " bytes,");
////            }
////        } catch (IOException ex) {
////            //Logger.getLogger(genJpeg.class.getName()).log(Level.SEVERE, null, ex);
////        }
////        
////        return bos;
//    }
   
//   public static String GenerateSOWforServices(String tenderTitle,String OLADate, String CompanyName , String natSteelRegistrationNo , String natsteelCompanyAddress , String vendorName , String vendorRegistrationNo , String vendorAddress , String ContractValidityStartDate , String ContractValidityEndDate) {
//        String finalPath = "";
//        System.out.println("Inside GenerateSOWforServices");
//        Document firstPagedocument = new Document(PageSize.A4);
//        Document document = new Document(PageSize.A4);
//        firstPagedocument.setMargins(80, 80, 75, 72);
//        document.setMargins(80, 80, 75, 72);
//
//        try {
//            Chunk newLine = new Chunk("");
//            //////********************Service SOW****************************************
//            Font headerFont = new Font(new Font(Font.FontFamily.TIMES_ROMAN, 10.0f, Font.BOLD, BaseColor.BLACK));
//            Font normalFont = new Font(new Font(Font.FontFamily.TIMES_ROMAN, 10.0f, Font.NORMAL, BaseColor.BLACK));
//            PdfWriter firstPageWriter = PdfWriter.getInstance(firstPagedocument, new FileOutputStream("D:\\Newgen\\jboss-eap-7.1\\bin\\ContractDocuments\\First Part.pdf"));
//            HeaderFooterPageEvent event = new HeaderFooterPageEvent();
//            firstPageWriter.setPageEvent(event);
//            firstPagedocument.open();
//            String ServiceDescription = "Supply of Maintenance Service work for "+tenderTitle;//Ladle and Tundish Refractory Lining including Tundish Cover repair in Meltshop (Contract Ref. 9050070324)";
//            Chunk serviceDescChunk = new Chunk(ServiceDescription, headerFont);
//            serviceDescChunk.setUnderline(0.1f, -2f); //0.1 thick, -2 y-location
//            Paragraph ServDescPara = new Paragraph(serviceDescChunk);
//            ServDescPara.setLeading(10);
//            ServDescPara.setSpacingAfter(10);
//            firstPagedocument.add(ServDescPara);
////            firstPagedocument.add(new Paragraph(""));
//
//            Paragraph para2 = new Paragraph();
//            Chunk para2_1 = new Chunk("This supply of Agreement (the “Agreement”) is entered into on ", normalFont);
//             //OLADate = "09 January 2020";
//            Chunk para2_2 = new Chunk(OLADate, headerFont);
//            Chunk para2_3 = new Chunk(" between ", normalFont);
//             //CompanyName = "NATSTEEL HOLDINGS PTE LTD ";
//            Chunk para2_4 = new Chunk(CompanyName, headerFont);
//            Chunk para2_5 = new Chunk("(Company Registration No.", normalFont);
//             //natSteelRegistrationNo = "200810196Z";
//            Chunk para2_6 = new Chunk(natSteelRegistrationNo, normalFont);
//            Chunk para2_7 = new Chunk("), a corporation having its principle place of business at ", normalFont);
//            //natsteelCompanyAddress = "22, Tanjong Kling Road, Singapore 628048";
//            Chunk para2_8 = new Chunk(natsteelCompanyAddress, normalFont);
//            Chunk para2_9 = new Chunk(" (", normalFont);
//            String companyShortDescription1 = "Natsteel";
//            Chunk para2_10 = new Chunk(companyShortDescription1, normalFont);
//            Chunk para2_11 = new Chunk("” or “", normalFont);
//            String companyShortDescription2 = "NSH";
//            Chunk para2_12 = new Chunk(companyShortDescription2, normalFont);
//            Chunk para2_13 = new Chunk("”) and ", normalFont);
//             //vendorName = "ALTUS FACILITIES ENGINEERING PTE LTD";
//            Chunk para2_14 = new Chunk(vendorName, normalFont);
//            // vendorRegistrationNo = "200102698D";
//            Chunk para2_15 = new Chunk(vendorRegistrationNo, normalFont);
//             //vendorAddress = "42, Hazel Park Terrance, Singapore 678875";
//            Chunk para2_16 = new Chunk(vendorAddress, normalFont);
//            Chunk para2_17 = new Chunk(")", headerFont);
//            para2.add(para2_1);
//            para2.add(para2_2);
//            para2.add(para2_3);
//            para2.add(para2_4);
//            para2.add(para2_5);
//            para2.add(para2_6);
//            para2.add(para2_7);
//            para2.add(para2_8);
//            para2.add(para2_9);
//            para2.add(para2_10);
//            para2.add(para2_11);
//            para2.add(para2_12);
//            para2.add(para2_13);
//            para2.add(para2_14);
//            para2.add(para2_5);
//            para2.add(para2_15);
//            para2.add(para2_7);
//            para2.add(para2_16);
//            para2.add(para2_17);
//            para2.setLeading(13);
//            firstPagedocument.add(para2);
//            firstPagedocument.add(new Paragraph("\n"));
//
//            Paragraph para3 = new Paragraph();
//            Chunk para3_1 = new Chunk("NatSteel and Contractor hereby agree as follows:", normalFont);
//            Chunk para4_1 = new Chunk("1.\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0", headerFont);
//            Chunk para4_2 = new Chunk("DEFINITIONS", headerFont);
//            para4_2.setUnderline(0.2f, -2f); //0.1 thick, -2 y-location
//            para3.add(para3_1);
//            para3.setSpacingAfter(10);
//            firstPagedocument.add(para3);
//
//            Paragraph para4 = new Paragraph();
//            para4.add(para4_1);
//            para4.add(para4_2);
//            para4.setSpacingAfter(10);
//            firstPagedocument.add(para4);
//
//            Paragraph para5 = new Paragraph(replaceSpacewithUnicode("(a)       “Equipment” means all equipment required under clause 3 hereof."), normalFont);
//            para5.setIndentationLeft(26f);
//            para5.setSpacingAfter(8);
//            firstPagedocument.add(para5);
//
//            Paragraph para6 = new Paragraph(replaceSpacewithUnicode("(b)       “Parties” means both NatSteel and Contractor and “Party” means either of them."), normalFont);
//            para6.setIndentationLeft(26f);
//            para6.setSpacingAfter(8);
//            firstPagedocument.add(para6);
//
//            Paragraph para7 = new Paragraph(replaceSpacewithUnicode("(c)       “Services” means the work which Contractor is required to provide under this Agreement as             set forth in Schedule B - Scope of Work & Pricing"), normalFont);
//            para7.setIndentationLeft(26f);
//            para7.setSpacingAfter(8);
//            firstPagedocument.add(para7);
//
//            Paragraph para8 = new Paragraph(replaceSpacewithUnicode("(d)       “Works Order” means a service purchase order issued by NatSteel to Contractor for the                    supply of any of the Services."), normalFont);
//            para8.setIndentationLeft(26f);
//            para8.setSpacingAfter(8);
//            firstPagedocument.add(para8);
//
//            Paragraph para9 = new Paragraph(replaceSpacewithUnicode("(e)        Words importing the singular include the plural and vice versa."), normalFont);
//            para9.setIndentationLeft(26f);
//            para9.setSpacingAfter(10);
//            firstPagedocument.add(para9);
//
//            Chunk para10_1 = new Chunk("2.\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0", headerFont);
//            Chunk para10_2 = new Chunk("TERM", headerFont);
//            para10_2.setUnderline(0.2f, -2f); //0.1 thick, -2 y-location
//            
//            Paragraph para10 = new Paragraph();
//            para10.add(para10_1);
//            para10.add(para10_2);
//            para10.setSpacingAfter(8);
//            firstPagedocument.add(para10);
//            
////            String ContractValidityStartDate = "01 September 2017";
////            String ContractValidityEndDate = "31 August 2018";
//            Paragraph para11 = new Paragraph(replaceSpacewithUnicode("This Agreement shall be for a term from "+ContractValidityStartDate+  " to " +ContractValidityEndDate+ " unless terminated in accordance with the provisions of this Agreement."), normalFont);
//            para11.setIndentationLeft(26f);
//            para11.setSpacingAfter(10);
//            firstPagedocument.add(para11);
//            
//            Chunk para12_1 = new Chunk("3.\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0", headerFont);
//            Chunk para12_2 = new Chunk("SCOPE OF CONTRACT", headerFont);
//            para12_2.setUnderline(0.2f, -2f); //0.1 thick, -2 y-location
//            
//            Paragraph para12 = new Paragraph();
//            para12.add(para12_1);
//            para12.add(para12_2);
//            para12.setSpacingAfter(8);
//            firstPagedocument.add(para12);
//            
//            
//            Paragraph para13 = new Paragraph("Contractor agrees to provide the Services, and NatSteel agrees to pay for the Services and at the prices specified in Schedule B (Scope of Work, Service Level Agreement & Pricing). Contractor shall carry out and complete the supply of the Services in accordance with the Agreement in every respect and to the directions and satisfaction of NatSteel. Contractor shall provide all equipment necessary for the performance of the Services and / or which are required to be provided as part of the Services under the Agreement (“Equipment”) unless otherwise specified in Schedule B - Scope of Work, Service Level Agreement & Pricing", normalFont);
//            para13.setIndentationLeft(26f);
//            para13.setSpacingAfter(10);
//            firstPagedocument.add(para13);
//            
//            Chunk para14_1 = new Chunk("4.\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0", headerFont);
//            Chunk para14_2 = new Chunk("PRICE AND PAYMENT", headerFont);
//            para14_2.setUnderline(0.2f, -2f); //0.1 thick, -2 y-location
//            
//            Paragraph para14 = new Paragraph();
//            para14.add(para14_1);
//            para14.add(para14_2);
//            para14.setSpacingAfter(8);
//            firstPagedocument.add(para14);
//            
//            Paragraph para15 = new Paragraph(replaceSpacewithUnicode("4.1       Contractor shall supply the Services to NatSteel at the prices set forth in Schedule B (Scope                 of Work & Pricing)."), normalFont);
//            para15.setIndentationLeft(26f);
//            para15.setSpacingAfter(8);
//            firstPagedocument.add(para15);
//
//            Paragraph para16 = new Paragraph(replaceSpacewithUnicode("4.2       Contractor shall, within thirty (30) days of the performance of the Services, present"), normalFont);
//            para16.setIndentationLeft(26f);            
//            firstPagedocument.add(para16);
//            
//            Paragraph para17 = new Paragraph("its invoice(s) to Invoice Verification (IV) section of Procurement and certificate of completion according to the format provided by NatSteel, duly signed by a NatSteel’s authorised representative and such other documents as may be required by NatSteel for the purpose of payment.", normalFont);
//            para17.setIndentationLeft(58f);            
//            firstPagedocument.add(para17);
//            
//
//            firstPagedocument.close();
//            //////////////////////////////////////////////////////*************************************//////////////////////////////////////////////////////////
//            PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream("D:\\Newgen\\jboss-eap-7.1\\bin\\ContractDocuments\\Third Part.pdf"));
//            HeaderFooterPageEvent event1 = new HeaderFooterPageEvent();
//            writer.setPageEvent((PdfPageEvent) event1);
//            document.open();
//
////            headerFont.setStyle(Font.UNDERLINE);
//           XMLWorkerHelper worker = XMLWorkerHelper.getInstance();
//
//            //ServiceDeacription
//            Chunk chunk1 = new Chunk("(A)SERVICE DESCRIPTION", headerFont);
//            chunk1.setUnderline(0.1f, -2f); //0.1 thick, -2 y-location
//            document.add(chunk1);
//            String serviceDescription = "<p>Service Description</p><table border=\"1\" cellpadding=\"1\" cellspacing=\"1\" style=\"width:500px\">	<tbody>		<tr>			<td>newgen</td>			<td>chennai</td>		</tr>		<tr>			<td>Natsteel</td>			<td>Singapore</td>		</tr>		<tr>			<td>&nbsp;</td>			<td>&nbsp;</td>		</tr>	</tbody></table><p>&nbsp;</p>";
//            String serviceDescriptionParsedVal = Jsoup.parse(serviceDescription).toString();
//            worker.parseXHtml(writer, document, new StringReader(serviceDescriptionParsedVal));
//            document.add(newLine);
//            document.add(newLine);
//
//            //(B)SUPPLIES FROM NATSTEEL
//            chunk1 = new Chunk("(B)SUPPLIES FROM NATSTEEL", headerFont);
//            chunk1.setUnderline(0.1f, -2f); //0.1 thick, -2 y-location
//            document.add(chunk1);
//            String suppliesFromNatsteel = "<p>Service Description</p><table border=\"1\" cellpadding=\"1\" cellspacing=\"1\" style=\"width:500px\">	<tbody>		<tr>			<td>newgen</td>			<td>chennai</td>		</tr>		<tr>			<td>Natsteel</td>			<td>Singapore</td>		</tr>		<tr>			<td>&nbsp;</td>			<td>&nbsp;</td>		</tr>	</tbody></table><p>&nbsp;</p>";
//            String suppliesFromNatsteelParsedVal = Jsoup.parse(suppliesFromNatsteel).toString();
//            worker.parseXHtml(writer, document, new StringReader(suppliesFromNatsteelParsedVal));
//            document.add(newLine);
//            document.add(newLine);
//
//            //(C ) SUPPLIES FROM CONTRACTOR
//            chunk1 = new Chunk("(C ) SUPPLIES FROM CONTRACTOR", headerFont);
//            chunk1.setUnderline(0.1f, -2f); //0.1 thick, -2 y-location
//            document.add(chunk1);
//            String suppliesFromContractor = "<p>Service Description</p><table border=\"1\" cellpadding=\"1\" cellspacing=\"1\" style=\"width:500px\">	<tbody>		<tr>			<td>newgen</td>			<td>chennai</td>		</tr>		<tr>			<td>Natsteel</td>			<td>Singapore</td>		</tr>		<tr>			<td>&nbsp;</td>			<td>&nbsp;</td>		</tr>	</tbody></table><p>&nbsp;</p>";
//            String suppliesFromContractorParsedVal = Jsoup.parse(suppliesFromContractor).toString();
//            worker.parseXHtml(writer, document, new StringReader(suppliesFromContractorParsedVal));
//            document.add(newLine);
//            document.add(newLine);
//
//            //(D) SERVICE LEVEL AGREEMENT
//            chunk1 = new Chunk("(D) SERVICE LEVEL AGREEMENT", headerFont);
//            chunk1.setUnderline(0.1f, -2f); //0.1 thick, -2 y-location
//            document.add(chunk1);
//            String serviceLevelAgreement = "<p>Service Description</p><table border=\"1\" cellpadding=\"1\" cellspacing=\"1\" style=\"width:500px\">	<tbody>		<tr>			<td>newgen</td>			<td>chennai</td>		</tr>		<tr>			<td>Natsteel</td>			<td>Singapore</td>		</tr>		<tr>			<td>&nbsp;</td>			<td>&nbsp;</td>		</tr>	</tbody></table><p>&nbsp;</p>";
//            String serviceLevelAgreementParsedVal = Jsoup.parse(serviceLevelAgreement).toString();
//            worker.parseXHtml(writer, document, new StringReader(serviceLevelAgreementParsedVal));
//            document.add(newLine);
//            document.add(newLine);
//
//            //(E) SAFETY
//            chunk1 = new Chunk("(E) SAFETY", headerFont);
//            chunk1.setUnderline(0.1f, -2f); //0.1 thick, -2 y-location
//            document.add(chunk1);
//            String safety = "<p>Service Description</p><table border=\"1\" cellpadding=\"1\" cellspacing=\"1\" style=\"width:500px\">	<tbody>		<tr>			<td>newgen</td>			<td>chennai</td>		</tr>		<tr>			<td>Natsteel</td>			<td>Singapore</td>		</tr>		<tr>			<td>&nbsp;</td>			<td>&nbsp;</td>		</tr>	</tbody></table><p>&nbsp;</p>";
//            String safetyParsedVal = Jsoup.parse(safety).toString();
//            worker.parseXHtml(writer, document, new StringReader(safetyParsedVal));
//            document.add(newLine);
//            document.add(newLine);
//
//            //(F)  DOCUMENTS AND INVOICING
//            chunk1 = new Chunk("(F)  DOCUMENTS AND INVOICING", headerFont);
//            chunk1.setUnderline(0.1f, -2f); //0.1 thick, -2 y-location
//            document.add(chunk1);
//            String documentsandinvoicing = "<p>Service Description</p><table border=\"1\" cellpadding=\"1\" cellspacing=\"1\" style=\"width:500px\">	<tbody>		<tr>			<td>newgen</td>			<td>chennai</td>		</tr>		<tr>			<td>Natsteel</td>			<td>Singapore</td>		</tr>		<tr>			<td>&nbsp;</td>			<td>&nbsp;</td>		</tr>	</tbody></table><p>&nbsp;</p>";
//            String documentsandinvoicingParsedVal = Jsoup.parse(documentsandinvoicing).toString();
//            worker.parseXHtml(writer, document, new StringReader(documentsandinvoicingParsedVal));
//            document.add(newLine);
//            document.add(newLine);
//
//            //(G) TERMINATION 
//            chunk1 = new Chunk("(G) TERMINATION ", headerFont);
//            chunk1.setUnderline(0.1f, -2f); //0.1 thick, -2 y-location
//            document.add(chunk1);
//            String termination = "<p>Service Description</p><table border=\"1\" cellpadding=\"1\" cellspacing=\"1\" style=\"width:500px\">	<tbody>		<tr>			<td>newgen</td>			<td>chennai</td>		</tr>		<tr>			<td>Natsteel</td>			<td>Singapore</td>		</tr>		<tr>			<td>&nbsp;</td>			<td>&nbsp;</td>		</tr>	</tbody></table><p>&nbsp;</p>";
//            String terminationParsedVal = Jsoup.parse(termination).toString();
//            worker.parseXHtml(writer, document, new StringReader(terminationParsedVal));
//            document.add(newLine);
//            document.add(newLine);
//            document.close();
//
//            System.out.println("Document generated");
//        } catch (Exception e) {
//            System.out.println("Exception - " + e);
//        }
//        return finalPath;
//
//    }

    private static void mergePdf(com.lowagie.text.Document document,List<InputStream> list, OutputStream outputStream) throws DocumentException, IOException, com.lowagie.text.DocumentException {
        //Document document = new Document();
        //PdfWriter pdfWriter = PdfWriter.getInstance(document, outputStream);
        ContractManagement.info("Inside MergePDF");
        com.lowagie.text.pdf.PdfWriter pdfWriter = com.lowagie.text.pdf.PdfWriter.getInstance(document, outputStream);
        //document.open();
        com.lowagie.text.pdf.PdfContentByte pdfContentByte = pdfWriter.getDirectContent();

        for (InputStream inputStream : list) {
            com.lowagie.text.pdf.PdfReader pdfReader = new com.lowagie.text.pdf.PdfReader(inputStream);
            for (int i = 1; i <= pdfReader.getNumberOfPages(); i++) {
                document.newPage();
                com.lowagie.text.pdf.PdfImportedPage page = pdfWriter.getImportedPage(pdfReader, i);
                pdfContentByte.addTemplate(page, 0, 0);
            }
        }

        outputStream.flush();
        document.close();
        outputStream.close();
    }

    private static String replaceSpacewithUnicode(String str) {
        str = str.replaceAll(" ", "\u00a0");
        return str;
    }
    
     public static void manipulatePdf(String src, String dest) throws IOException, DocumentException {
        PdfReader reader = new PdfReader(src);
        int n = reader.getNumberOfPages();
        PdfStamper stamper = new PdfStamper(reader, new FileOutputStream(dest));
        PdfContentByte pagecontent;
        for (int i = 0; i < n; ) {
            pagecontent = stamper.getOverContent(++i);
            ColumnText.showTextAligned(pagecontent, Element.ALIGN_RIGHT,
                    new Phrase(String.format("%s", i)), 540, 35, 0);
        }
        stamper.close();
        reader.close();
    }
     
      List<RatedParameters> findByVendorRFQTag(int vendorId, int rfqid, String tag) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findByVendorRFQTag.do?vendorId=" + vendorId + "&rfq=" + rfqid + "&tag=" + tag;
        System.out.println("url: " + url);
        ResponseEntity<List<RatedParameters>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<RatedParameters>>() {
        });
        List<RatedParameters> list = response.getBody();
        return list;
    }
      String updateRatedParam(RatedParameters ratedParameters) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updateRatedParam.do"), ratedParameters, String.class);
        System.out.println("msg: " + msg);
        return msg;
    }


}
