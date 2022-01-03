/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.controller;


import com.eportal.entities.AccountAssignmentCategoryMaster;
import com.eportal.entities.BuyerContractRfqLineItemBean;
import com.eportal.entities.BuyerDetails;
import com.eportal.entities.BuyerPendingContractLineItemsBean;
import com.eportal.entities.BuyerRfqLineItemBean;
import com.eportal.entities.BuyerVendorNotification;
import com.eportal.entities.CMHeaderAccountAssignInfo;
import com.eportal.entities.CMHeaderAgreementInfo;
import com.eportal.entities.CMHeaderInfo;
import com.eportal.entities.CMHeaderMislInfo;
import com.eportal.entities.CMHeaderOLAInfo;
import com.eportal.entities.CMHeaderProfitSegmentInfo;
import com.eportal.entities.CMHeaderReferenceInfo;
import com.eportal.entities.CMHeaderServicesInfo;
import com.eportal.entities.CMHeaderTermsDPInfo;
import com.eportal.entities.CMSOWContractDetailsInfo;
import com.eportal.entities.ContractRfqHeader;
import com.eportal.entities.ContractSpend;
import com.eportal.entities.EmailTriggerDetails;
import com.eportal.entities.MasterPurchaseOrg;
import com.eportal.entities.MasterPurchasingGroup;
import com.eportal.entities.NGExtCM;
import com.eportal.entities.NewgenContractCompanyCode;
import com.eportal.entities.NewgenContractLineItem;
import com.eportal.entities.PaymentTermsMaster;
import com.eportal.entities.QueryReasonMaster;
import com.eportal.entities.QueryUser;
import com.eportal.entities.QueryWIInput;
import com.eportal.entities.QueryWIOutPut;
import com.eportal.entities.ReasonMaster;
import com.eportal.entities.ReportBuyerAuditLog;
import com.eportal.entities.SignedContractInput;
import com.eportal.entities.SignedContractoutput;
import com.eportal.entities.SpendDataBean;
import com.eportal.entities.SpocUser;
import com.eportal.entities.VendorDetails;
import com.eportal.itextPdf.MyFooter;
import com.eportal.newgenControl.InputBean;
import com.eportal.newgenControl.OutputBean;
import com.eportal.util.MailTrigger;
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
import java.io.ByteArrayOutputStream;

import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.URI;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.ModelMap;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.MultipartRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.eportal.entities.MasterCurrency;

import com.eportal.entities.CMHeaderAccountAssignInfo;
import com.eportal.entities.CMHeaderAgreementInfo;
import com.eportal.entities.CMHeaderInfo;
import com.eportal.entities.CMHeaderMislInfo;
import com.eportal.entities.CMHeaderOLAInfo;
import com.eportal.entities.CMHeaderProfitSegmentInfo;
import com.eportal.entities.CMHeaderReferenceInfo;
import com.eportal.entities.CMHeaderServicesInfo;
import com.eportal.entities.CMHeaderTermsDPInfo;
import com.eportal.entities.CMSOWContractDetailsInfo;
import com.eportal.entities.ContractRfqHeaderVendorMapping;
import com.eportal.entities.MasterItemCategory;
import com.eportal.entities.ContractSpendReport;
import com.eportal.entities.ContractSpendReportSVC;
import com.eportal.entities.ContractVendorRfqLineItem;
import com.eportal.entities.MasterContractType;
import com.eportal.entities.MasterExchangeRate;
import com.eportal.entities.MasterVendor;
import com.eportal.entities.MoveWIInput;
import com.eportal.entities.MoveWIOutPut;
import com.eportal.entities.NGUploadInputBean;
import com.eportal.entities.NG_BP_Default_RatedParameters;
import com.eportal.entities.POPaymentTermsOP;
import com.eportal.entities.RejectWIInput;
import com.eportal.entities.RequestTypeBean;
import com.eportal.entities.SpendDataBean1;
import com.eportal.entities.UploadSpendHistory;
import com.eportal.itextPdf.OrderEvaluationFooter;
import com.eportal.newgenControl.InputBean1;
import com.eportal.newgenControl.InputBeanOla;

import java.math.BigDecimal;
import java.text.ParseException;
import java.util.Calendar;
import java.util.GregorianCalendar;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Workbook;

/**
 *
 * @author abhishek.e
 */
@Controller
//@RequestMapping("/file")
public class ContractManagement {

    @Value("${webservice.ip}")
    private String webservice_ip;
    @Value("${NGwebservice.ip}")
    private String NGwebservice_ip;
    @Autowired
    SignedContractInput signedContractInput;
    @Autowired
    ReportBuyerAuditLog reportBuyerAuditLog;
@Autowired
    SpendDataBean1 newgenRoutingDetails;
@Autowired
    SpendDataBean newgenRoutingDetailsSVC;
  @Autowired
    QueryWIInput queryWiInput;
    @Autowired
    EmailTriggerDetails emailTriggerDetails;
    @Autowired
    MailTrigger mailTriggerUtil;
    @Value("${WebServiceCall.ip}")
    private String WebServiceCall_IP;

//Girivasu
    @Autowired
    CMHeaderAgreementInfo cMHeaderAgreementInfo;
    @Autowired
    CMHeaderTermsDPInfo cMHeaderTermsDPInfo;
    @Autowired
    CMHeaderReferenceInfo cMHeaderReferenceInfo;
    @Autowired
    CMHeaderOLAInfo cMHeaderOLAInfo;
    @Autowired
    NewgenContractLineItem newgenContractLineItem;
    @Autowired
    POManagement pOManagement;
    @Autowired
    CMHeaderServicesInfo cMHeaderServicesInfo;
@Autowired
    CMHeaderAccountAssignInfo    cMHeaderAccountAssignInfo;

@Autowired
    MoveWIInput    moveWIInput;
@Autowired
InputBean inputBean;
@Autowired
    RejectWIInput rejectWiInput;
@Autowired
NGUploadInputBean nGUploadInputBean;
@Autowired
DownloadAttachment downloadAttachment;

//Girivasu
    @RequestMapping(value = "SpendAnalysisReport")
    public ModelAndView spendAnalysisReport(ModelMap model) {
        System.out.println("inside spendAnalysisReport");
        List<ContractSpend> spendAnalysisReportList = findAllSpendReport();

        List<SpocUser> spocusers = findAllSpocUsers();
        System.out.println("size of spocusers" + spocusers.size());
        model.addAttribute("spocusers", spocusers);

        System.out.println("getInsertionOrderID" + spendAnalysisReportList.get(0).getSno());
        System.out.println("getMaterialSVSNumber" + spendAnalysisReportList.get(0).getMaterialSVSNumber());
        model.addAttribute("spendAnalysisReportList", spendAnalysisReportList);
        System.out.println("spendAnalysisReportListSize" + spendAnalysisReportList.size());

        return new ModelAndView("spendanalysisreport");

    }
    
    @RequestMapping(value = "SpendAnalysisReport1")
    public ModelAndView spendAnalysisReport1(ModelMap model) {
        System.out.println("inside spendAnalysisReport");
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        String companyCode = buyer.getCompanyCode();
        String buyerID = buyer.getUsername();
        info("Company Code -> "+ companyCode);
        model.addAttribute("companyCode", companyCode);
//        
        //AjaxController aj = new AjaxController();
        List<MasterContractType> contractTypeList = getContractType();
        model.addAttribute("contractTypeList", contractTypeList);
        
        List<RequestTypeBean> requestTypeList = getRequestType();
        model.addAttribute("requestTypeList", requestTypeList);
        
          List<SpocUser> spocusers = findAllSpocUsers();
          System.out.println("size of spocusers" + spocusers.size());
          model.addAttribute("spocusers", spocusers);
          List<ContractSpendReport> spendAnalysisReportList =findAllSpendReport1(buyerID);
       // System.out.println("getInsertionOrderID" + spendAnalysisReportList.get(0).getSno());
       // System.out.println("getMaterialSVSNumber" + spendAnalysisReportList.get(0).getMaterialSVSNumber());
         model.addAttribute("spendAnalysisReportList", spendAnalysisReportList);
         
         
         //String buyerID = buyer.getUsername();
         model.addAttribute("buyerID",buyerID);
         List<UploadSpendHistory> uploadHistoryListMat = getHistoryListMat(buyerID);
         model.addAttribute("uploadHistoryListMat",uploadHistoryListMat);
         
         List<UploadSpendHistory> uploadHistoryListSvc = getHistoryListSvc(buyerID);
         model.addAttribute("uploadHistoryListSvc",uploadHistoryListSvc);
         
         List<ContractSpendReportSVC> spendAnalysisReportListSVC = findAllSpendReportSVC(buyerID);
         model.addAttribute("spendAnalysisReportListSVC",spendAnalysisReportListSVC);
         
         model.addAttribute("serverIP", WebServiceCall_IP);
       // System.out.println("spendAnalysisReportListSize" + spendAnalysisReportList.size());
        
        return new ModelAndView("SpendAnalysisReport1");

    }
    
    @RequestMapping(value = "RatedParameters")
    public ModelAndView ratedParameters(ModelMap model) {
        info("Inside ratedParameters under Contract Management");
        List<NG_BP_Default_RatedParameters> ratedParameterList = findAllRatedParam();
        info("List -> "+ratedParameterList );
        info("SIze ->"+ratedParameterList.size());
         model.addAttribute("ratedParameterList",ratedParameterList);
        
        
        return new ModelAndView("RatedParameters");
    }

    @RequestMapping(value = "SpendAnalysisLibrary1")
    public ModelAndView spendAnalysisLibrary(ModelMap model) {
        System.out.println("inside SpendAnalysisLibrary");
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        String companyCode = buyer.getCompanyCode();
        String buyerID = buyer.getUsername();
        info("Company Code -> "+ companyCode);
        model.addAttribute("companyCode", companyCode);
        List<SpocUser> spocusers = findAllSpocUsers();
        //System.out.println("size of spocusers" + spocuserslib.size());
        model.addAttribute("spocusers", spocusers);
        List<ContractSpendReport> spendAnalysisLibrary = findAllSpendLibrary(buyerID);
        //System.out.println("getInsertionOrderID" + spendAnalysisLibrary.get(0).getSno());
        //System.out.println("getPurchaseDoc" + spendAnalysisLibrary.get(0).getPurchaseDoc());
        model.addAttribute("spendAnalysisLibrary", spendAnalysisLibrary);
        System.out.println("spendAnalysisLibrarysize" + spendAnalysisLibrary.size());
        
        List<MasterContractType> contractTypeList = getContractType();
        model.addAttribute("contractTypeList", contractTypeList);
        
        List<RequestTypeBean> requestTypeList = getRequestType();
        model.addAttribute("requestTypeList", requestTypeList);
        
         List<ContractSpendReportSVC> spendAnalysisReportListSVC = findAllSpendLibrarySVC(buyerID);
         model.addAttribute("spendAnalysisReportListSVC",spendAnalysisReportListSVC);
        
        return new ModelAndView("SpendAnalysisLibrary1");

    }

    public List<ContractSpend> findAllSpendReport() {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/getSpendAnalysisReport.do";

        System.out.println("urlcontractspend" + url);
        ResponseEntity<List<ContractSpend>> Spend = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ContractSpend>>() {
        });

        System.out.println("vendor:" + Spend);
        System.out.println("vendor:" + Spend.getBody());
        List<ContractSpend> contractSpendList = Spend.getBody();
        return contractSpendList;
    }
    
     public List<ContractSpendReport> findAllSpendReport1(String buyerID) {
        System.out.println("Inside findAllSpendReport1()");
        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/getSpendAnalysisReport1.do?buyerID=" + buyerID;

        System.out.println("urlcontractspend" + url);
        ResponseEntity<List<ContractSpendReport>> Spend = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ContractSpendReport>>() {
        });

        System.out.println("vendor:" + Spend);
        System.out.println("vendor:" + Spend.getBody());
        List<ContractSpendReport> contractSpendList = Spend.getBody();
        return contractSpendList;
    }
    
     public List<UploadSpendHistory> getHistoryListMat(String buyerID) {
         
         System.out.println("Inside getHistoryListMat()");
         RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/getHistoryListMat.do?buyerID=" + buyerID;

        System.out.println("urlcontractspend" + url);
        ResponseEntity<List<UploadSpendHistory>> hist = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<UploadSpendHistory>>() {
        });

        System.out.println("vendor:" + hist);
        System.out.println("vendor:" + hist.getBody());
        List<UploadSpendHistory> historyList = hist.getBody();
        return historyList;
     }
     
     public List<UploadSpendHistory> getHistoryListSvc(String buyerID) {
         
         System.out.println("Inside getHistoryListSvc()");
         RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/getHistoryListSvc.do?buyerID=" + buyerID;

        System.out.println("urlcontractspend" + url);
        ResponseEntity<List<UploadSpendHistory>> hist = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<UploadSpendHistory>>() {
        });

        System.out.println("vendor:" + hist);
        System.out.println("vendor:" + hist.getBody());
        List<UploadSpendHistory> historyList = hist.getBody();
        return historyList;
     }
    
    public List<ContractSpendReportSVC> findAllSpendReportSVC(String buyerID) {
        System.out.println("Inside findAllSpendReportSVC()");
        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/getSpendAnalysisReportSVC.do?buyerID=" + buyerID;

        System.out.println("urlcontractspend" + url);
        ResponseEntity<List<ContractSpendReportSVC>> Spend = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ContractSpendReportSVC>>() {
        });

        System.out.println("vendor:" + Spend);
        System.out.println("vendor:" + Spend.getBody());
        List<ContractSpendReportSVC> contractSpendList = Spend.getBody();
        return contractSpendList;
    }
    
    public List<ContractSpendReportSVC> findAllSpendLibrarySVC(String buyerID) {
        System.out.println("Inside findAllSpendReportSVC()");
        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findAllSpendLibrarySVC.do?buyerID=" + buyerID;

        System.out.println("urlcontractspend" + url);
        ResponseEntity<List<ContractSpendReportSVC>> Spend = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ContractSpendReportSVC>>() {
        });

        System.out.println("vendor:" + Spend);
        System.out.println("vendor:" + Spend.getBody());
        List<ContractSpendReportSVC> contractSpendList = Spend.getBody();
        return contractSpendList;
    }
    
    public List<RequestTypeBean> getRequestType() {
        System.out.println("Inside findAllSpendReport1()");
        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/getRequestType.do";
        System.out.println("url: " + url);
        ResponseEntity<List<RequestTypeBean>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<RequestTypeBean>>() {
        });
        List<RequestTypeBean> list = response.getBody();
        System.out.println("MasterMaterialType size: " + list.size());
        return list;
       
    }

    public List<ContractSpendReport> findAllSpendLibrary(String buyerID) {
        List<ContractSpendReport> l = new ArrayList<ContractSpendReport>();
        try
        {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getSpendAnalysisLibrary.do?buyerID=" + buyerID;
        System.out.println("urlcontractspend " + url);
        ResponseEntity<List<ContractSpendReport>> Spend = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ContractSpendReport>>() {
        });
        System.out.println("vendor:" + Spend);
        System.out.println("vendor:" + Spend.getBody());
        List<ContractSpendReport> contractSpendList = Spend.getBody();
        return contractSpendList;
        }
        catch(Exception e)
        {
            System.out.println("Exception caught at CM.java =>"+e);
        }
        return l;
    }

    List<SpocUser> findAllSpocUsers() {
        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findallspocuser.do";
        System.out.println("url findallspocuser " + url);

        ResponseEntity<List<SpocUser>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<SpocUser>>() {
        });
        System.out.println("********************************************");
        List<SpocUser> queryUserList = response.getBody();

        System.out.println("UserName size: " + queryUserList.size());

        return queryUserList;
    }

    @RequestMapping(value = "/uploadSpendAttachment", method = RequestMethod.POST)
    public ModelAndView uploadSpendAttachment(ModelMap model, @RequestParam("file_docDiv1") CommonsMultipartFile attachment1,
            HttpServletRequest request, HttpServletResponse response, Map<String, Object> modalMap , RedirectAttributes redirect) {
        PrintWriter out = null;
        JSONArray jArr = new JSONArray();
        try {
            info("Inside Upload Document ");

            info("file name 1 in uploadSpendAttachment: " + attachment1.getOriginalFilename());
            signedContractInput.setDocType("Material");
            
            if (!attachment1.getOriginalFilename().equalsIgnoreCase("")) {
                signedContractInput.setContractSpendAttachment(attachment1.getBytes());
                signedContractInput.setContractSpendAttachmentName(attachment1.getOriginalFilename());
            } else {
                signedContractInput.setContractSpendAttachment(null);
                signedContractInput.setContractSpendAttachmentName(null);
            }

            String msg;
            try {
                msg = newgenUploadSpendContract(signedContractInput);
                info("msg: " + msg);
               // jObj.put("Result", "Success");
                redirect.addFlashAttribute("docStatus", "Success");
            } catch (Exception e) {
                info("Exception : " + e);
                msg = "Failed to Upload Spend Analysis report to DMS!";
               // jObj.put("Result", "Fail");
                redirect.addFlashAttribute("docStatus", "Failure");
            }
           // jObj.put("Message", msg);
           // jArr.put(jObj);
           // out.println(jArr);
        } catch (Exception e) {
           // Logger.getLogger(ContractManagement.class.getName()).log(Level.SEVERE, null, ex);
           info("Caught exception");
           redirect.addFlashAttribute("docStatus", "Failure");
        } finally {
            if (out != null) {
                out.close();
            }
        }
    return new ModelAndView("redirect:/SpendAnalysisReport1.do"); 
    }

    @RequestMapping(value = "/uploadSpendAttachmentSVC", method = RequestMethod.POST)
    public ModelAndView uploadSpendAttachmentSVC(ModelMap model, @RequestParam("file_docDiv2") CommonsMultipartFile attachment1,
            HttpServletRequest request, HttpServletResponse response, Map<String, Object> modalMap , RedirectAttributes redirect) {
        PrintWriter out = null;
        JSONArray jArr = new JSONArray();
        try {
            info("Inside Upload Document ");
            signedContractInput.setDocType("Service");
            info("file name 1 in uploadSpendAttachment: " + attachment1.getOriginalFilename());
            
            if (!attachment1.getOriginalFilename().equalsIgnoreCase("")) {
                signedContractInput.setContractSpendAttachment(attachment1.getBytes());
                signedContractInput.setContractSpendAttachmentName(attachment1.getOriginalFilename());
            } else {
                signedContractInput.setContractSpendAttachment(null);
                signedContractInput.setContractSpendAttachmentName(null);
            }

            String msg;
            try {
                msg = newgenUploadSpendContract(signedContractInput);
                info("msg: " + msg);
               // jObj.put("Result", "Success");
                redirect.addFlashAttribute("docStatus", "Success");
            } catch (Exception e) {
                info("Exception : " + e);
                msg = "Failed to Upload Spend Analysis report to DMS!";
               // jObj.put("Result", "Fail");
                redirect.addFlashAttribute("docStatus", "Failure");
            }
           // jObj.put("Message", msg);
           // jArr.put(jObj);
           // out.println(jArr);
        } catch (Exception e) {
           // Logger.getLogger(ContractManagement.class.getName()).log(Level.SEVERE, null, ex);
           info("Caught exception");
           redirect.addFlashAttribute("docStatus", "Failure");
        } finally {
            if (out != null) {
                out.close();
            }
        }
        //redirect.addFlashAttribute("docStatus", "Success");
    return new ModelAndView("redirect:/SpendAnalysisReport1.do"); 
    }

    String newgenUploadSpendContract(SignedContractInput signedPoInput) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        String buyerName =buyer.getFirstname()+" "+buyer.getLastname();
        String buyerID = buyer.getUsername();
        signedPoInput.setBuyerID(buyerID);
        signedPoInput.setBuyerName(buyerName);
        RestTemplate restTemplate = new RestTemplate();
//        @Value("${webservice.ip}")
//    private String webservice_ip;
//    @Value("${NGwebservice.ip}")
//    private String NGwebservice_ip;
        String url =  webservice_ip+"/PR2POWebservice/ng/addDocument/Contract/SpendContract";
        System.out.println("url for newgenUploadSpendContract" + url);
        SignedContractoutput output = restTemplate.postForObject(URI.create(url), signedContractInput, SignedContractoutput.class);
        System.out.println("Message: " + output.getMessage());
        String message = output.getMessage();
//        String message = "PO Acknowledge Seccessfully";
        return message;
    }

    @RequestMapping(value = "assigncontractline", method = RequestMethod.POST)
    public ModelAndView assignContractLineToBuyer(HttpServletRequest request) {
        System.out.println("assigncontractline");
        String contractlineids = request.getParameter("contractlineids");
        String buyerid = request.getParameter("contractbuyerid");

        System.out.println("contractlineids: " + contractlineids);
        System.out.println("buyerid: " + buyerid);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        BuyerDetails b = getBuyerById(Integer.parseInt(buyerid));
        String result = assignContract(contractlineids, Integer.parseInt(buyerid));
        reportBuyerAuditLog.setActivityPerformed("New Contract Line/Lines assigned to " + b.getUsername());
        reportBuyerAuditLog.setCreatedate(new Date());
        reportBuyerAuditLog.setNgBpBuyerdetailsId(buyer);
        saveBuyerAuditLogReport(reportBuyerAuditLog);
//        System.out.println("result: " + result);
        return new ModelAndView("redirect:/dashboardcont.do");

    }

    BuyerDetails getBuyerById(int id) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/getbuyerbyid.do?id=" + id;
        System.out.println("url: " + url);

        ResponseEntity<BuyerDetails> buyerResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<BuyerDetails>() {
        });

        BuyerDetails buyerObj = buyerResponse.getBody();
        return buyerObj;
    }

    String assignContract(String contractlineids, int buyerid) {
        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/assigncontractline.do?contractlineids=" + contractlineids + "&buyerid=" + buyerid;
        System.out.println("url in assign contract" + url);

        ResponseEntity<String> restResponse = restTemplate.exchange(url, HttpMethod.POST, null, new ParameterizedTypeReference<String>() {
        });

        String result = restResponse.getBody();

        return result;
    }

    String saveBuyerAuditLogReport(ReportBuyerAuditLog log) {

        String url = webservice_ip + "/BuyerPortalWebServices/saveBuyerAuditLogReport.do";
        System.out.println("url: " + url);

        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(url), log, String.class);
        System.out.println("msg: " + msg);

        return msg;
    }

    @RequestMapping(value = "reassigncontractline", method = RequestMethod.POST)
    public ModelAndView reassignContract(HttpServletRequest request) {
        System.out.println("reassignContract============");

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();

        String contractlineids = request.getParameter("reassigncontractlineids");
        String buyerId = request.getParameter("reassignContractBuyerId");

        System.out.println("contractlineids: " + contractlineids);
        System.out.println("buyerId: " + buyerId);

        reassignContract(contractlineids, Integer.parseInt(buyerId));

        BuyerDetails b = getBuyerById(Integer.parseInt(buyerId));

        reportBuyerAuditLog.setActivityPerformed("Contracts re-assigned to " + b.getUsername());
        reportBuyerAuditLog.setCreatedate(new Date());
        reportBuyerAuditLog.setNgBpBuyerdetailsId(buyer);
        saveBuyerAuditLogReport(reportBuyerAuditLog);

        return new ModelAndView("redirect:/dashboardcont.do");
    }

    @RequestMapping(value = "reassignContractrfq", method = RequestMethod.POST)
    public ModelAndView reassignContractRfq(HttpServletRequest request) {
        System.out.println("reassignContractRfq============");

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();

        String rfqIds = request.getParameter("reassigncrfqids");
        String buyerId = request.getParameter("reassigncRfqBuyerId");

        System.out.println("rfqIds: " + rfqIds);
        System.out.println("buyerId: " + buyerId);

        reassignContractRfq(rfqIds, Integer.parseInt(buyerId));

        BuyerDetails b = getBuyerById(Integer.parseInt(buyerId));

        reportBuyerAuditLog.setActivityPerformed("Contract-RFQs re-assigned to " + b.getUsername());
        reportBuyerAuditLog.setCreatedate(new Date());
        reportBuyerAuditLog.setNgBpBuyerdetailsId(buyer);
        saveBuyerAuditLogReport(reportBuyerAuditLog);

        return new ModelAndView("redirect:/dashboardcont.do");
    }

    @RequestMapping(value = "/unassignedSpendLines", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ModelAndView unassignedSpendLines(ModelMap model, HttpServletRequest request, RedirectAttributes redirect) {
        String requestType = request.getParameter("typeofRequest");
        System.out.println("requestType" + requestType);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        String spocname = buyer.getFirstname()+" "+buyer.getLastname() ;
        String emailID = buyer.getEmailid();
        info("EmailID -> "+emailID);
        System.out.println("requestType" + requestType);
        if (requestType.equalsIgnoreCase("RemoveCart")) {
            System.out.println("inside removecart");
            String removeCartValues = request.getParameter("removeCartValues");
           // removeCartValues = removeCartValues.replace("[", "");
           // removeCartValues = removeCartValues.replace("]", "");
           // System.out.println("removeCartValues" + removeCartValues);
            String removeString[] = removeCartValues.split(",");
            for (int i = 0; i < removeString.length; i++) {
                System.out.println("inisde removeString" + removeString[i]);
                if (!removeString[i].isEmpty()) {

                    // deleteIDFromCart(removeString[i]);
                    updateIDFromCart(Integer.parseInt(removeString[i]), "Deleted");
                    //System.out.println("deleteID" + deleteID);
                }
            }
        } else if (requestType.equalsIgnoreCase("libraryadd")) {
            System.out.println("inside libraryadd");
            String libraryadd = request.getParameter("addlineids");
            String bName = request.getParameter("bucketNameMat");
            info("BName -> "+ bName);
            System.out.println("libraryadd after" + libraryadd);
            String libraryaddString[] = libraryadd.split(",");
            for (int i = 0; i < libraryaddString.length; i++) {
                System.out.println("inisde library" + libraryaddString[i]);
                if (!libraryaddString[i].isEmpty()) {

                    // deleteIDFromCart(removeString[i]);
                    updateIDAddcart(Integer.parseInt(libraryaddString[i]), "Yes" , bName);
                    //System.out.println("deleteID" + deleteID);
                }
            }

        }  
        else if (requestType.equalsIgnoreCase("GroupSend")) {
            
           info("inside Send to Group Tender");
           String pid="";
            InputBean1 inputbean = new InputBean1();
            String tenderTitle = request.getParameter("tenderTitle");
            
            inputbean.setSpocname(spocname);
            inputbean.setSpocemail(emailID);
            String reqType = request.getParameter("requestType");
            String coCode = request.getParameter("companyCode");
            String contractType = request.getParameter("contractType");
            String costCentre = request.getParameter("costCentre");
            String uniqueID = request.getParameter("uniqueIDMat");
            info("Unique ID -> "+uniqueID );
            String sno[]=uniqueID.split("#");
            SimpleDateFormat ft = new SimpleDateFormat ("dd-MM-yyyy");
            String activationDate = (ft.format(new Date())).toString();
            info("Model Values => "+ reqType +","+ coCode +","+ contractType +","+ costCentre +","+ activationDate +",");
            String transactionType = "Material";
            inputbean.setTransactionType(transactionType);
            inputbean.setSpocname(spocname);
//            String lastnumberspend = findLastID();
//            inputbean.setSOW_RefNo(lastnumberspend);
            info("spocname--" + inputbean.getSpocname());
            List<SpendDataBean1> list = new ArrayList<>();
            String contractLines = request.getParameter("spendValuesJava");
            String contractLines2 = contractLines.replaceAll("~~","~NULL~");
            String contractLines3 = contractLines2.replaceAll("~~","~NULL~");
            String unassignedspendlines = contractLines3.replaceAll("~~","~NULL~");
            info("Java Spend Values -> ->"+unassignedspendlines);
            String RfqLine[] = unassignedspendlines.split("###");
            for (int i = 0; i < RfqLine.length; i++) {
                System.out.println("unassignedspendlines" + unassignedspendlines);
                String unassignedspendlinesarr[] = RfqLine[i].split("~");
                info("Rfq line ->"+RfqLine[i]);
                List<String> al = new ArrayList<String>();
                
                al = Arrays.asList(unassignedspendlinesarr);
                info("unassignedspendlinesarr => =>" + al);
                System.out.println("al" + al);
                if(!(al.isEmpty())) {
                    newgenRoutingDetails = new SpendDataBean1();
                    newgenRoutingDetails.setMaterialSVSNumber(al.get(0));
                    newgenRoutingDetails.setMaterialServiceDescription(al.get(1));
                    newgenRoutingDetails.setPoLong(al.get(2));
                    newgenRoutingDetails.setUom(al.get(3));
                    newgenRoutingDetails.setOrderPriceUnit(al.get(4));
                    newgenRoutingDetails.setPurchaseGroup(al.get(5));
                    newgenRoutingDetails.setCurrency(al.get(6));
                    newgenRoutingDetails.setUnitPrice(al.get(7));
                    newgenRoutingDetails.setGrQty(al.get(8));
                    newgenRoutingDetails.setPerPriceUnit(al.get(9));
                    newgenRoutingDetails.setLcAmount(al.get(10));
                    newgenRoutingDetails.setType(al.get(11));
                    newgenRoutingDetails.setMatGroup(al.get(12));
                    newgenRoutingDetails.setMatStorageLoc(al.get(13));
                    newgenRoutingDetails.setMatGroupDesc(al.get(14));
                    newgenRoutingDetails.setRequestType(reqType);
                    newgenRoutingDetails.setCompanyCode(coCode);
                    newgenRoutingDetails.setContractType(contractType);
                    newgenRoutingDetails.setCostCentre(costCentre);
                    newgenRoutingDetails.setActivationDate(activationDate);
                    newgenRoutingDetails.setTenderTitle(tenderTitle);
                    newgenRoutingDetails.setOldMaterialNo(al.get(15));
                    newgenRoutingDetails.setCountryOrigin(al.get(16));
                    newgenRoutingDetails.setUomStore(al.get(17));
                    
//                    newgenRoutingDetails.setPlantCode(al.get(9));
//                    newgenRoutingDetails.setMaterialGroup_SVSNumber(al.get(10));
//                    newgenRoutingDetails.setMaterialServiceGroupDescription(al.get(11));
//                    newgenRoutingDetails.setReport(al.get(12));
//                    newgenRoutingDetails.setPosting_Date(al.get(13));
//                    newgenRoutingDetails.setGRQuantity(al.get(14));
//                    newgenRoutingDetails.setLCAmount(al.get(15));
//                    newgenRoutingDetails.setVendorCode(al.get(16));
//                    newgenRoutingDetails.setVendorName(al.get(17));
                }
            
            list.add(newgenRoutingDetails);
            info("newgenRoutingDetailsbefore" + newgenRoutingDetails.getMaterialSVSNumber());
            }
            inputbean.setSpendData(list);
            info("List => "+ list);
            String[] newgenFlow = newgenFlowContractControl(inputbean);
             pid = newgenFlow[2];
            info("pid is -> -> " + pid);
            
            //Remove
            String removeCartValues = request.getParameter("removeCartValues");
            String removeString[] = removeCartValues.split(",");
            for (int i = 0; i < removeString.length; i++) {
                System.out.println("inisde removeString" + removeString[i]);
                if (!removeString[i].isEmpty()) {
                    updateIDFromCart(Integer.parseInt(removeString[i]), "Deleted");
                }
            }
            String res = updateTenderProcessed(sno[1]);
            
            redirect.addFlashAttribute("pid", pid);     
        }
        
        else {
            String pid="";
            info("inside Send to Tender solo");
            InputBean1 inputbean = new InputBean1();
            //String spocname = request.getParameter("spoc_contract");
            inputbean.setSpocname(spocname);
            inputbean.setSpocemail(emailID);
           // inputbean.setInitiatorID(initiatorID);
            String tenderTitle = request.getParameter("tenderTitle");
            String reqType = request.getParameter("requestType");
            String coCode = request.getParameter("companyCode");
            String contractType = request.getParameter("contractType");
            String costCentre = request.getParameter("costCentre");
            SimpleDateFormat ft = new SimpleDateFormat ("dd-MM-yyyy");
            String uniqueID = request.getParameter("uniqueIDMat");
            info("Unique ID -> "+uniqueID );
            String sno[]=uniqueID.split("#");
            String activationDate = (ft.format(new Date())).toString();
            info("Model Values => "+ reqType +","+ coCode +","+ contractType +","+ costCentre +","+ activationDate +",");
            String transactionType = "Material";
            inputbean.setTransactionType(transactionType);
//            String lastnumberspend = findLastID();
//            inputbean.setSOW_RefNo(lastnumberspend);
            info("spocname--" + inputbean.getSpocname());
            List<SpendDataBean1> list = new ArrayList<>();
            String contractLines = request.getParameter("spendValuesJava");
            String contractLines2 = contractLines.replaceAll("~~","~NULL~");
            String contractLines3 = contractLines2.replaceAll("~~","~NULL~");
            String unassignedspendlines = contractLines3.replaceAll("~~","~NULL~");
            //String unassignedspendlines = request.getParameter("spendValuesJava");
            info("Java Spend Values -> ->"+unassignedspendlines);
            String RfqLine[] = unassignedspendlines.split("###");
            
            for (int i = 0; i < RfqLine.length; i++) {
                System.out.println("unassignedspendlines" + unassignedspendlines);
                String unassignedspendlinesarr[] = RfqLine[i].split("~");
                List<String> al = new ArrayList<String>();
                info("Rfq line ->"+RfqLine[i]);
                if(!list.isEmpty())
                {
                    list.clear();
                }
                al = Arrays.asList(unassignedspendlinesarr);
                info("unassignedspendlinesarr => =>" + al);
                System.out.println("al" + al);
                if(!(al.isEmpty())) {
                    newgenRoutingDetails = new SpendDataBean1();
                    newgenRoutingDetails.setMaterialSVSNumber(al.get(0));
                    newgenRoutingDetails.setMaterialServiceDescription(al.get(1));
                    newgenRoutingDetails.setPoLong(al.get(2));
                    newgenRoutingDetails.setUom(al.get(3));
                    newgenRoutingDetails.setOrderPriceUnit(al.get(4));
                    newgenRoutingDetails.setPurchaseGroup(al.get(5));
                    newgenRoutingDetails.setCurrency(al.get(6));
                    newgenRoutingDetails.setUnitPrice(al.get(7));
                    newgenRoutingDetails.setGrQty(al.get(8));
                    newgenRoutingDetails.setPerPriceUnit(al.get(9));
                    newgenRoutingDetails.setLcAmount(al.get(10));
                    newgenRoutingDetails.setType(al.get(11));
                    newgenRoutingDetails.setMatGroup(al.get(12));
                    newgenRoutingDetails.setMatStorageLoc(al.get(13));
                    newgenRoutingDetails.setMatGroupDesc(al.get(14));
                    newgenRoutingDetails.setTenderTitle(tenderTitle);
                    newgenRoutingDetails.setRequestType(reqType);
                    newgenRoutingDetails.setCompanyCode(coCode);
                    newgenRoutingDetails.setContractType(contractType);
                    newgenRoutingDetails.setCostCentre(costCentre);
                    newgenRoutingDetails.setActivationDate(activationDate);
                    newgenRoutingDetails.setOldMaterialNo(al.get(15));
                    newgenRoutingDetails.setCountryOrigin(al.get(16));
                    newgenRoutingDetails.setUomStore(al.get(17));
                    
//                    newgenRoutingDetails.setPlantCode(al.get(9));
//                    newgenRoutingDetails.setMaterialGroup_SVSNumber(al.get(10));
//                    newgenRoutingDetails.setMaterialServiceGroupDescription(al.get(11));
//                    newgenRoutingDetails.setReport(al.get(12));
//                    newgenRoutingDetails.setPosting_Date(al.get(13));
//                    newgenRoutingDetails.setGRQuantity(al.get(14));
//                    newgenRoutingDetails.setLCAmount(al.get(15));
//                    newgenRoutingDetails.setVendorCode(al.get(16));
//                    newgenRoutingDetails.setVendorName(al.get(17));
                }
            
            list.add(newgenRoutingDetails);
            info("newgenRoutingDetailsbefore" + newgenRoutingDetails.getMaterialSVSNumber());
            
            inputbean.setSpendData(list);
            info("List => "+ list);
            String[] newgenFlow = newgenFlowContractControl(inputbean);
             pid = newgenFlow[2];
            info("pid: of "+ RfqLine[i]+" -> ->" + pid);
            }
            //Remove
            String removeCartValues = request.getParameter("removeCartValues");
            String removeString[] = removeCartValues.split(",");
            for (int i = 0; i < removeString.length; i++) {
                System.out.println("inisde removeString" + removeString[i]);
                if (!removeString[i].isEmpty()) {
                    updateIDFromCart(Integer.parseInt(removeString[i]), "Deleted");
                }
            }
            info("UpdateTenderProcessed -> "+ sno[1]);
            String res = updateTenderProcessed(sno[1]);
            info("Result of updateTenderProcess ->"+res);
            redirect.addFlashAttribute("pid", pid);
            
       }
        return new ModelAndView("redirect:/SpendAnalysisReport1.do");
    }
    
    @RequestMapping(value = "/contractmanagement", method = RequestMethod.GET)
    public String service(ModelMap model,HttpServletRequest request, HttpServletResponse response, HttpSession session, RedirectAttributes redirect) throws IOException {
        String reqFrom = request.getParameter("reqFrom");
        String type = request.getParameter("type");
        String sno = request.getParameter("sno");
        String id = request.getParameter("uniqueID");
        String uniqueID = id+"#"+sno;
        info("Inside Revoke CLick -> "+ reqFrom);
        String res="";
        if(reqFrom.equals("revokeClick"))
        {
            
            info("SNo ->"+sno);
            try
            {
                res=updateRevokeStatus(sno);
                info("Output of Try ->"+ res);
                if(type.equals("Material"))
                {
                    //delete material records
                }
                else if(type.equals("Service"))
                {
                    //delete service records
                }
                redirect.addFlashAttribute("revoke", "truee");
            }
            catch(Exception e)
            {
                info("Failed to setRevokeStatus");
            }
            
            //return new ModelAndView("redirect:/SpendAnalysisReport1.do");
            
        }
        else if(reqFrom.equals("addParameter"))
        {
            info("Inside addParameter");
            String paramName = request.getParameter("paramName");
            info("ParamName -> "+ paramName);
            try
            {
                NG_BP_Default_RatedParameters defaultParameters = new NG_BP_Default_RatedParameters();
                defaultParameters.setParameter(paramName);
                res = updateDefaultRatedParam(defaultParameters);
                info("Output of Try ->"+ res);

 

            }
            catch(Exception e)
            {
                info("Failed to setRevokeStatus");
            }
            
            //return new ModelAndView("redirect:/RatedParameters.do");
            
        }
        
        
         return res;
    }
    
     @RequestMapping(value = "/manageolaForm")
    public ModelAndView revokeOLA(ModelMap model, HttpServletRequest request, RedirectAttributes redirect) {
        info("Inside RevokeOLA");
        String pid = request.getParameter("pid");
        String type=request.getParameter("type");
        String workStep = request.getParameter("workStep");
        InputBeanOla in = new InputBeanOla();
        in.setPid(pid);
        info("PID -> "+ pid);
        info("Type -> "+type);
        info("CurrentWorkStep -> "+workStep);
            try
            {
                if(workStep.equalsIgnoreCase("Rework"))
                {
                   return new ModelAndView("redirect:/editcontract.do?contractID="+pid+"&reqType="+type); 
                }
                else
                {
                    String output[] = rerouteWI(in);
                    info("Output of Try ->"+ output[2]);
                    if(output[2].equalsIgnoreCase("Success"))
                    {
                        info("Inside if");
                        redirect.addFlashAttribute("contractID", pid);
                        redirect.addFlashAttribute("Type",type);
                        return new ModelAndView("redirect:/editcontract.do?contractID="+pid+"&reqType="+type);  
                    }
                    else
                    {
                       redirect.addFlashAttribute("revokeStatus", "fail");
                       return new ModelAndView("redirect:/manageola.do");
                    }
                }
            }
            catch(Exception e)
            {
                info("Failed to setRevokeStatus");
            }
            return new ModelAndView("redirect:/manageola.do");
    }
    
    
    @RequestMapping(value = "amendcontract")
    public ModelAndView amendcontract(ModelMap model, HttpServletRequest request) {
        
        info("Inside Edit COntract");
        model.put("ContractFrom","Amend Contract");
        List<MasterPurchasingGroup> masterPurchasingGroupList = findAllMasterPurchaseGroup();
        List<MasterPurchaseOrg> purchaseList = getAllPurchaseOrg();
        List<PaymentTermsMaster> paymentList = getAllPaymentTerms();
        List<MasterCurrency> currencyList = getAllCurrency();
        model.put("masterPurchasingGroupList", masterPurchasingGroupList);
        model.put("purchaseList", purchaseList);
        model.put("paymentList", paymentList);
        model.put("currencyList", currencyList);
        
        return new ModelAndView("editcontract");

    }
    
    @RequestMapping(value = "editcontract")
    public ModelAndView editContract(ModelMap model, HttpServletRequest request) {
        
        info("Inside Edit COntract");
        System.out.println("createcontract");
        
        

        String contractRefId = request.getParameter("contractID");
        info("----------contractRefId------------" + contractRefId);
        String reqType = request.getParameter("reqType");
        info("----------reqType------------" + reqType);
        
        List<CMHeaderInfo> cmHeaderInfoList = findContractHeaderInfo(contractRefId);
        List<CMHeaderAgreementInfo> cmHeaderAgInfoList = findContractHeaderAgreementInfo(contractRefId);
        List<CMHeaderOLAInfo> cmHeaderOLAInfoList = findContractHeaderOLAInfo(contractRefId);

        List<CMHeaderTermsDPInfo> cmHeaderTermsDPInfoList = findContractHeaderTermsDPInfo(contractRefId);
        List<NewgenContractLineItem> newgenContractLineItemList = findContractLineInfo(contractRefId);
        List<CMHeaderReferenceInfo> cmHeaderReferenceInfoList = findContractReferenceInfo(contractRefId);
        List<CMHeaderAccountAssignInfo> cmHeaderAccountAssignInfoList = findContractAccountAssignInfo(contractRefId);
        List<CMHeaderServicesInfo> cmHeaderServicesInfoList = null;
        if (newgenContractLineItemList.size() > 0) {
            cmHeaderServicesInfoList = findServiceByLinkId(newgenContractLineItemList.get(0).getLinkid());
            info("cmHeaderServicesInfoList size: " + cmHeaderServicesInfoList.size());
        }
        
        

        List<CMHeaderProfitSegmentInfo> cmHeaderProfitSegmentInfoList = findContractProfitSegmentInfo(contractRefId);
        List<CMSOWContractDetailsInfo> cmSOWContractDetailsInfoList = findContractDetailsInfo(contractRefId);
        List<CMHeaderMislInfo> cmCMHeaderMislInfoList = findHeaderMislInfo(contractRefId);
        List<MasterPurchasingGroup> masterPurchasingGroupList = findAllMasterPurchaseGroup();
        List<MasterPurchaseOrg> purchaseList = getAllPurchaseOrg();
        List<PaymentTermsMaster> paymentList = getAllPaymentTerms();
        List<MasterCurrency> currencyList = getAllCurrency();
        List<NGExtCM> contract = findContractHeaderByPId(contractRefId);
        List<ContractRfqHeader> rfqHeaderObj = findContractRfqHeaderByNumber(contract.get(0).getrFQNo());
        String companyCode=contract.get(0).getCompanyCode();
        List<MasterVendor> vendorList = findVendorByCompanyCode(companyCode);
        
        model.put("contract",contract.get(0));
        model.put("rfqHeaderObj",rfqHeaderObj.get(0));
        model.put("vendorList",vendorList);
//        Girivasu
//        List<AccountAssignmentCategoryMaster> accountObj =pOManagement.getAllAccountAssignmentCategory();
//        List<MasterItemCategory> itemCategList = pOManagement.getAllItemCategory();

//        Girivasu 
        info("cmHeaderInfoList size: " + cmHeaderInfoList.size());
        info("cmHeaderAgInfoList size: " + cmHeaderAgInfoList.size());
        info("cmHeaderOLAInfoList size: " + cmHeaderOLAInfoList.size());
        info("cmHeaderTermsDPInfoList size: " + cmHeaderTermsDPInfoList.size());
        info("cmHeaderReferenceInfoList size: " + cmHeaderReferenceInfoList.size());
        info("cmHeaderAccountAssignInfoList size: " + cmHeaderAccountAssignInfoList.size());
        

       // System.out.println("cmHeaderServicesInfoList size: " + cmHeaderServicesInfoList.get(0).getLinkId());
        info("cmHeaderProfitSegmentInfoList size: " + cmHeaderProfitSegmentInfoList.size());
        info("CMSOWContractDetailsInfoList size: " + cmSOWContractDetailsInfoList.size());
        info("CMCMHeaderMislInfoList size: " + cmCMHeaderMislInfoList.size());
        info("masterPurchasingGroupList size" + masterPurchasingGroupList.size());

//        System.out.println("AccountAssignmentCategoryMaster size" + accountObj.size());
//        System.out.println("ItemCategoryMaster size" + itemCategList.size());
        model.put("contractRefId", contractRefId);
        model.put("WebServiceCallIp", webservice_ip);
        model.put("ContractFrom","Edit Contract");
        model.put("reqType", reqType);
        model.put("masterPurchasingGroupList", masterPurchasingGroupList);
        model.put("purchaseList", purchaseList);
        model.put("paymentList", paymentList);
        model.put("cmHeaderInfoList", cmHeaderInfoList);
        // if(cmHeaderAgInfoList.size()>0){
        model.put("cmHeaderAgInfoList", cmHeaderAgInfoList);
//        }else{
//            model.put("cmHeaderAgInfoList", cmHeaderAgInfoList);
//        }

        System.out.println("Break Point5");
        model.put("cmHeaderOLAInfoList", cmHeaderOLAInfoList);
        System.out.println("Break Point6");
        model.put("cmHeaderTermsDPInfoList", cmHeaderTermsDPInfoList);
        System.out.println("Break Point7");
        model.put("cmHeaderReferenceInfoList", cmHeaderReferenceInfoList);
        System.out.println("Break Point8");
        model.put("cmHeaderAccountAssignInfoList", cmHeaderAccountAssignInfoList);
        System.out.println("Break Point9");
        model.put("cmHeaderServicesInfoList", cmHeaderServicesInfoList);
        System.out.println("Break Point10");
        model.put("cmHeaderProfitSegmentInfoList", cmHeaderProfitSegmentInfoList);
        System.out.println("Break Point11");
        model.put("cmSOWContractDetailsInfoList", cmSOWContractDetailsInfoList);
        System.out.println("Break Point12");
        model.put("cmCMHeaderMislInfoList", cmCMHeaderMislInfoList);
        System.out.println("Break Point13");
        model.put("currencyList", currencyList);

        model.put("newgenContractLineItemList", newgenContractLineItemList);
        
        return new ModelAndView("editcontract");

    }
    
    //    public int revokeMaterial(String uniqueID) {
//        System.out.println("Inside findAllSpendReport1()");
//        RestTemplate restTemplate = new RestTemplate();
//
//        String url = webservice_ip + "/BuyerPortalWebServices/revokeMaterial.do?uniqueID=" + uniqueID;
//
//        System.out.println("urlcontractspend" + url);
//         ResponseEntity<Integer> restResponse = restTemplate.exchange(url, HttpMethod.POST, null, new ParameterizedTypeReference<Integer>() {
//        });
//
//        int res = restResponse.getBody();
//        return res;
//    }
//    
//    public int revokeService(String uniqueID) {
//        System.out.println("Inside findAllSpendReport1()");
//        RestTemplate restTemplate = new RestTemplate();
//
//        String url = webservice_ip + "/BuyerPortalWebServices/revokeService.do?uniqueID=" + uniqueID;
//
//        System.out.println("urlcontractspend" + url);
//        ResponseEntity<Integer> restResponse = restTemplate.exchange(url, HttpMethod.POST, null, new ParameterizedTypeReference<Integer>() {
//        });
//
//        int res = restResponse.getBody();
//        return res;
//    }
    
     public String updateDefaultRatedParam(NG_BP_Default_RatedParameters bean) {

 

        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updateDefaultRatedParam.do";
        String msg = restTemplate.postForObject(URI.create(url), bean, String.class);
        System.out.println("msg: " + msg);
        return msg;
    }
    
    @RequestMapping(value = "/spendAnalysisServiceForm", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ModelAndView unassignedSpendLinesSVC(ModelMap model, HttpServletRequest request, RedirectAttributes redirect) {
        info("Inside for SERVICE");
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        String initiatorID = buyer.getFirstname()+" "+buyer.getLastname() ;
        String emailID = buyer.getEmailid();
        String requestType = request.getParameter("typeofRequestSVC");
        info("Request ->"+requestType);
        
        if (requestType.equalsIgnoreCase("RemoveCart")) {
            info("inside removecart");
            String removeCartValues = request.getParameter("removeCartValuesSVC");
            String removeString[] = removeCartValues.split(",");
            for (int i = 0; i < removeString.length; i++) {
                System.out.println("inisde removeString" + removeString[i]);
                if (!removeString[i].isEmpty()) {

                    updateIDFromCartSVC(Integer.parseInt(removeString[i]), "Deleted");
                }
            }
        }
        else if (requestType.equalsIgnoreCase("libraryadd")) {
            info("inside libraryadd");
            String libraryadd = request.getParameter("addlineidsSVC");
            String bName = request.getParameter("bucketNameSvc");
            info("BName -> "+ bName);
            info("libraryadd after" + libraryadd);
            String libraryaddString[] = libraryadd.split(",");
            for (int i = 0; i < libraryaddString.length; i++) {
                System.out.println("inisde library" + libraryaddString[i]);
                if (!libraryaddString[i].isEmpty()) {

                    // deleteIDFromCart(removeString[i]);
                    updateIDAddcartSVC(Integer.parseInt(libraryaddString[i]), "Yes" , bName);
                    //System.out.println("deleteID" + deleteID);
                }
            }

        }  
        else if (requestType.equalsIgnoreCase("GroupSend")) {
            String pid="";
            info("inside Send to Tender Group");
            InputBean inputbean = new InputBean();
            String spocname = request.getParameter("spoc_contract");
            inputbean.setSpocname(spocname);
            inputbean.setSpocemail(emailID);
            inputbean.setInitiatorID(initiatorID);
            String uniqueID = request.getParameter("uniqueIDSvc");
            info("Unique ID -> "+uniqueID );
            String tenderTitle = request.getParameter("tenderTitleSVC");
            String reqType = request.getParameter("requestTypeSVC");
            String coCode = request.getParameter("companyCodeSVC");
            String contractType = request.getParameter("contractTypeSVC");
            String costCentre = request.getParameter("costCentreSVC");
            String replyDate = request.getParameter("replyDateSVC");
            String documents = request.getParameter("documentsSVC");
            String termination = request.getParameter("terminationSVC");
            info(tenderTitle+reqType+coCode+contractType+costCentre+replyDate+documents+termination);
            String sno[]=uniqueID.split("#");
//            String lastnumberspend = findLastID();
//            inputbean.setSOW_RefNo(lastnumberspend);
            info("spocname--" + inputbean.getSpocname());
            List<SpendDataBean> list = new ArrayList<>();
            String contractLines = request.getParameter("spendValuesJavaSVC");
            String contractLines2 = contractLines.replaceAll("~~","~NULL~");
            String contractLines3 = contractLines2.replaceAll("~~","~NULL~");
            String unassignedspendlines = contractLines3.replaceAll("~~","~NULL~");
            //String unassignedspendlines = request.getParameter("spendValuesJava");
            info("Java Spend Values -> ->"+unassignedspendlines);
            String RfqLine[] = unassignedspendlines.split("###");
            
            for (int i = 0; i < RfqLine.length; i++) {
                System.out.println("unassignedspendlines" + unassignedspendlines);
                String unassignedspendlinesarr[] = RfqLine[i].split("~");
                List<String> al = new ArrayList<String>();
                info("Rfq line ->"+RfqLine[i]);
                al = Arrays.asList(unassignedspendlinesarr);
                info("unassignedspendlinesarr => =>" + al);
                info("al ->" + al);
                if(!(al.isEmpty())) {
                    newgenRoutingDetailsSVC = new SpendDataBean();
                    newgenRoutingDetailsSVC.setPurchase_Doc(al.get(0));
                    newgenRoutingDetailsSVC.setItem(al.get(1));
                    newgenRoutingDetailsSVC.setOrderType(al.get(2));
                    newgenRoutingDetailsSVC.setVendorCode(al.get(3));
                    newgenRoutingDetailsSVC.setVendorName(al.get(4));
                    newgenRoutingDetailsSVC.setMaterial_SVSNumber(al.get(5));
                    newgenRoutingDetailsSVC.setMaterial_ServiceDescription(al.get(6));
                    newgenRoutingDetailsSVC.setPlantCode(al.get(7));
                    newgenRoutingDetailsSVC.setMaterialGroup_SVSNumber(al.get(8));
                    newgenRoutingDetailsSVC.setMaterialServiceGroupDescription(al.get(9));
                    newgenRoutingDetailsSVC.setUom(al.get(10));
                    newgenRoutingDetailsSVC.setUnitPrice(al.get(11));
                    newgenRoutingDetailsSVC.setLCAmount(al.get(12));
                    newgenRoutingDetailsSVC.setPosting_Date(al.get(13));
                    newgenRoutingDetailsSVC.setGRQuantity(al.get(14));
                    newgenRoutingDetailsSVC.setTenderTitle(tenderTitle);
                    newgenRoutingDetailsSVC.setCompanyCode(coCode);
                    newgenRoutingDetailsSVC.setContractType(contractType);
                    newgenRoutingDetailsSVC.setCostCentre(costCentre);
                    newgenRoutingDetailsSVC.setRequestType(requestType);
                    newgenRoutingDetailsSVC.setReplyDate(replyDate);
                    newgenRoutingDetailsSVC.setDocuments(documents);
                    newgenRoutingDetailsSVC.setTermination(termination);

                }
            
            list.add(newgenRoutingDetailsSVC);
            info("newgenRoutingDetailsbefore" + newgenRoutingDetailsSVC.getMaterial_SVSNumber());
            info("List size -> "+list.size());
            }
            inputbean.setSpendData(list);
            info("List => "+ list);
            String[] newgenFlow = newgenFlowContractControlSVC(inputbean);
             pid = newgenFlow[2];
            //info("pid: of "+ RfqLine[i]+" -> ->" + pid);
            
            //Remove
            String removeCartValues = request.getParameter("removeCartValuesSVC");
            String removeString[] = removeCartValues.split(",");
            for (int i = 0; i < removeString.length; i++) {
                System.out.println("inisde removeString" + removeString[i]);
                if (!removeString[i].isEmpty()) {
                    updateIDFromCartSVC(Integer.parseInt(removeString[i]), "Deleted");
                }
            }
            String res = updateTenderProcessed(sno[1]);
            redirect.addFlashAttribute("pid", pid);
            
       }
        
        else {
            String pid="";
            info("inside Send to Tender solo");
            InputBean inputbean = new InputBean();
            String spocname = request.getParameter("spoc_contract");
            inputbean.setSpocname(spocname);
            inputbean.setSpocemail(emailID);
            inputbean.setInitiatorID(initiatorID);
            String uniqueID = request.getParameter("uniqueIDSvc");
            String tenderTitle = request.getParameter("tenderTitleSVC");
            String reqType = request.getParameter("requestTypeSVC");
            String coCode = request.getParameter("companyCodeSVC");
            String contractType = request.getParameter("contractTypeSVC");
            String costCentre = request.getParameter("costCentreSVC");
            String replyDate = request.getParameter("replyDateSVC");
            String documents = request.getParameter("documentsSVC");
            String termination = request.getParameter("terminationSVC");
            info(tenderTitle+reqType+coCode+contractType+costCentre+replyDate+documents+termination);
            info("Unique ID -> "+uniqueID );
            String sno[]=uniqueID.split("#");
//            String lastnumberspend = findLastID();
//            inputbean.setSOW_RefNo(lastnumberspend);
            info("spocname--" + inputbean.getSpocname());
            List<SpendDataBean> list = new ArrayList<>();
            String contractLines = request.getParameter("spendValuesJavaSVC");
            String contractLines2 = contractLines.replaceAll("~~","~NULL~");
            String contractLines3 = contractLines2.replaceAll("~~","~NULL~");
            String unassignedspendlines = contractLines3.replaceAll("~~","~NULL~");
            //String unassignedspendlines = request.getParameter("spendValuesJava");
            info("Java Spend Values -> ->"+unassignedspendlines);
            String RfqLine[] = unassignedspendlines.split("###");
            
            for (int i = 0; i < RfqLine.length; i++) {
                System.out.println("unassignedspendlines" + unassignedspendlines);
                String unassignedspendlinesarr[] = RfqLine[i].split("~");
                List<String> al = new ArrayList<String>();
                info("Rfq line ->"+RfqLine[i]);
                if(!list.isEmpty())
                {
                    list.clear();
                }
                al = Arrays.asList(unassignedspendlinesarr);
                info("unassignedspendlinesarr => =>" + al);
                info("al ->" + al);
                if(!(al.isEmpty())) {
                    newgenRoutingDetailsSVC = new SpendDataBean();
                    newgenRoutingDetailsSVC.setPurchase_Doc(al.get(0));
                    newgenRoutingDetailsSVC.setItem(al.get(1));
                    newgenRoutingDetailsSVC.setOrderType(al.get(2));
                    newgenRoutingDetailsSVC.setVendorCode(al.get(3));
                    newgenRoutingDetailsSVC.setVendorName(al.get(4));
                    newgenRoutingDetailsSVC.setMaterial_SVSNumber(al.get(5));
                    newgenRoutingDetailsSVC.setMaterial_ServiceDescription(al.get(6));
                    newgenRoutingDetailsSVC.setPlantCode(al.get(7));
                    newgenRoutingDetailsSVC.setMaterialGroup_SVSNumber(al.get(8));
                    newgenRoutingDetailsSVC.setMaterialServiceGroupDescription(al.get(9));
                    newgenRoutingDetailsSVC.setUom(al.get(10));
                    newgenRoutingDetailsSVC.setUnitPrice(al.get(11));
                    newgenRoutingDetailsSVC.setLCAmount(al.get(12));
                    newgenRoutingDetailsSVC.setPosting_Date(al.get(13));
                    newgenRoutingDetailsSVC.setGRQuantity(al.get(14));
                    newgenRoutingDetailsSVC.setTenderTitle(tenderTitle);
                    newgenRoutingDetailsSVC.setCompanyCode(coCode);
                    newgenRoutingDetailsSVC.setContractType(contractType);
                    newgenRoutingDetailsSVC.setCostCentre(costCentre);
                    newgenRoutingDetailsSVC.setRequestType(requestType);
                    newgenRoutingDetailsSVC.setReplyDate(replyDate);
                    newgenRoutingDetailsSVC.setDocuments(documents);
                    newgenRoutingDetailsSVC.setTermination(termination);

                }
            
            list.add(newgenRoutingDetailsSVC);
            info("newgenRoutingDetailsbefore" + newgenRoutingDetailsSVC.getMaterial_SVSNumber());
            
            inputbean.setSpendData(list);
            info("List => "+ list);
            String[] newgenFlow = newgenFlowContractControlSVC(inputbean);
             pid = newgenFlow[2];
            info("PID -> -> "+ pid);
            }
            //Remove
            String removeCartValues = request.getParameter("removeCartValuesSVC");
            String removeString[] = removeCartValues.split(",");
            for (int i = 0; i < removeString.length; i++) {
                System.out.println("inisde removeString" + removeString[i]);
                if (!removeString[i].isEmpty()) {
                    updateIDFromCartSVC(Integer.parseInt(removeString[i]), "Deleted");
                }
            }
            String res = updateTenderProcessed(sno[1]);
            redirect.addFlashAttribute("pid", pid);
            
       }
        return new ModelAndView("redirect:/SpendAnalysisReport1.do");
    }
    
	
    @RequestMapping(value = "/spendAnalysisLibrary1", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ModelAndView spendAnalysisLibrary1(ModelMap model, HttpServletRequest request, RedirectAttributes redirect) 
    {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        String spocname = buyer.getFirstname()+" "+buyer.getLastname() ;
        String emailID = buyer.getEmailid();
        String pid="";
        String requestType = request.getParameter("typeofRequestLib");
        info("requestType ->" + requestType);
        if (requestType.equalsIgnoreCase("RemoveCart")) {
            System.out.println("inside removecart");
            String removeCartValues = request.getParameter("removeCartValuesLib");
            info("Values -> "+removeCartValues );
            String removeString[] = removeCartValues.split(",");
            for (int i = 0; i < removeString.length; i++) {
                System.out.println("inisde removeString" + removeString[i]);
                if (!removeString[i].isEmpty()) {

                    // deleteIDFromCart(removeString[i]);
                    updateIDFromCartLib(Integer.parseInt(removeString[i]), "Deleted");
                    //System.out.println("deleteID" + deleteID);
                }
            }
        }
        
        else if (requestType.equalsIgnoreCase("GroupSend")) {
            
           info("inside Send to Group Tender");
           
            InputBean1 inputbean = new InputBean1();
            //String spocname = request.getParameter("spoc_contract");
            String tenderTitle=request.getParameter("tenderTitleLib");
            String reqType = request.getParameter("requestTypeLib");
            String coCode = request.getParameter("companyCodeLib");
            String contractType = request.getParameter("contractTypeLib");
            String costCentre = request.getParameter("costCentreLib");
            String uniqueID = request.getParameter("uniqueIDMatLib");
            info("Unique ID -> "+uniqueID );
            String sno[]=uniqueID.split("#");
            SimpleDateFormat ft = new SimpleDateFormat ("dd-MM-yyyy");
            String activationDate = (ft.format(new Date())).toString();
            info("Model Values => "+ reqType +","+ coCode +","+ contractType +","+ costCentre +","+ activationDate +",");
            inputbean.setSpocname(spocname);
            inputbean.setSpocemail(emailID);
//            String lastnumberspend = findLastID();
//            inputbean.setSOW_RefNo(lastnumberspend);
            info("spocname--" + inputbean.getSpocname());
            List<SpendDataBean1> list = new ArrayList<>();
            String contractLines = request.getParameter("spendValuesJavaLib");
            String contractLines2 = contractLines.replaceAll("~~","~NULL~");
            String contractLines3 = contractLines2.replaceAll("~~","~NULL~");
            String unassignedspendlines = contractLines3.replaceAll("~~","~NULL~");
            info("Java Spend Values -> ->"+unassignedspendlines);
            String RfqLine[] = unassignedspendlines.split("###");
            for (int i = 0; i < RfqLine.length; i++) {
                System.out.println("unassignedspendlines" + unassignedspendlines);
                String unassignedspendlinesarr[] = RfqLine[i].split("~");
                info("Rfq line ->"+RfqLine[i]);
                List<String> al = new ArrayList<String>();
                
                al = Arrays.asList(unassignedspendlinesarr);
                info("unassignedspendlinesarr => =>" + al);
                System.out.println("al" + al);
                if(!(al.isEmpty())) {
                    newgenRoutingDetails = new SpendDataBean1();
                    newgenRoutingDetails.setMaterialSVSNumber(al.get(0));
                    newgenRoutingDetails.setMaterialServiceDescription(al.get(1));
                    newgenRoutingDetails.setPoLong(al.get(2));
                    newgenRoutingDetails.setUom(al.get(3));
                    newgenRoutingDetails.setOrderPriceUnit(al.get(4));
                    newgenRoutingDetails.setPurchaseGroup(al.get(5));
                    newgenRoutingDetails.setCurrency(al.get(6));
                    newgenRoutingDetails.setUnitPrice(al.get(7));
                    newgenRoutingDetails.setGrQty(al.get(8));
                    newgenRoutingDetails.setPerPriceUnit(al.get(9));
                    newgenRoutingDetails.setLcAmount(al.get(10));
                    newgenRoutingDetails.setType(al.get(11));
                    newgenRoutingDetails.setMatGroup(al.get(12));
                    newgenRoutingDetails.setMatStorageLoc(al.get(13));
                    newgenRoutingDetails.setMatGroupDesc(al.get(14));
                    newgenRoutingDetails.setTenderTitle(tenderTitle);
                    newgenRoutingDetails.setRequestType(reqType);
                    newgenRoutingDetails.setCompanyCode(coCode);
                    newgenRoutingDetails.setContractType(contractType);
                    newgenRoutingDetails.setCostCentre(costCentre);
                    newgenRoutingDetails.setActivationDate(activationDate);
                    newgenRoutingDetails.setOldMaterialNo(al.get(15));
                    newgenRoutingDetails.setCountryOrigin(al.get(16));
                    newgenRoutingDetails.setUomStore(al.get(17));
                    
//                    newgenRoutingDetails.setPlantCode(al.get(9));
//                    newgenRoutingDetails.setMaterialGroup_SVSNumber(al.get(10));
//                    newgenRoutingDetails.setMaterialServiceGroupDescription(al.get(11));
//                    newgenRoutingDetails.setReport(al.get(12));
//                    newgenRoutingDetails.setPosting_Date(al.get(13));
//                    newgenRoutingDetails.setGRQuantity(al.get(14));
//                    newgenRoutingDetails.setLCAmount(al.get(15));
//                    newgenRoutingDetails.setVendorCode(al.get(16));
//                    newgenRoutingDetails.setVendorName(al.get(17));
                }
            
            list.add(newgenRoutingDetails);
            info("newgenRoutingDetailsbefore" + newgenRoutingDetails.getMaterialSVSNumber());
            }
            inputbean.setSpendData(list);
            info("List => "+ list);
            String[] newgenFlow = newgenFlowContractControl(inputbean);
             pid = newgenFlow[2];
            info("pid is -> -> " + pid);
            
            //Remove
            String removeCartValues = request.getParameter("removeCartValuesLib");
            String removeString[] = removeCartValues.split(",");
            for (int i = 0; i < removeString.length; i++) {
                System.out.println("inisde removeString" + removeString[i]);
                if (!removeString[i].isEmpty()) {
                    updateIDFromCart(Integer.parseInt(removeString[i]), "Deleted");
                }
            }
         
            String res = updateTenderProcessed(sno[1]);
            redirect.addFlashAttribute("pid", pid);     
        }
        
        else {
            
            info("inside Send to Tender solo");
            InputBean1 inputbean = new InputBean1();
            //String spocname = request.getParameter("spoc_contract");
            inputbean.setSpocname(spocname);
            inputbean.setSpocemail(emailID);
            String tenderTitle=request.getParameter("tenderTitleLib");
            String reqType = request.getParameter("requestTypeLib");
            String coCode = request.getParameter("companyCodeLib");
            String contractType = request.getParameter("contractTypeLib");
            String costCentre = request.getParameter("costCentreLib");
            String uniqueID = request.getParameter("uniqueIDMatLib");
            info("Unique ID -> "+uniqueID );
            String sno[]=uniqueID.split("#");
            SimpleDateFormat ft = new SimpleDateFormat ("dd-MM-yyyy");
            String activationDate = (ft.format(new Date())).toString();
            info("Model Values => "+ reqType +","+ coCode +","+ contractType +","+ costCentre +","+ activationDate +",");
//            String lastnumberspend = findLastID();
//            inputbean.setSOW_RefNo(lastnumberspend);
            info("spocname--" + inputbean.getSpocname());
            List<SpendDataBean1> list = new ArrayList<>();
            String contractLines = request.getParameter("spendValuesJavaLib");
            String contractLines2 = contractLines.replaceAll("~~","~NULL~");
            String contractLines3 = contractLines2.replaceAll("~~","~NULL~");
            String unassignedspendlines = contractLines3.replaceAll("~~","~NULL~");
            //String unassignedspendlines = request.getParameter("spendValuesJava");
            info("Java Spend Values -> ->"+unassignedspendlines);
            String RfqLine[] = unassignedspendlines.split("###");
            
            for (int i = 0; i < RfqLine.length; i++) {
                System.out.println("unassignedspendlines" + unassignedspendlines);
                String unassignedspendlinesarr[] = RfqLine[i].split("~");
                List<String> al = new ArrayList<String>();
                info("Rfq line ->"+RfqLine[i]);
                if(!list.isEmpty())
                {
                    list.clear();
                }
                al = Arrays.asList(unassignedspendlinesarr);
                info("unassignedspendlinesarr => =>" + al);
                System.out.println("al" + al);
                if(!(al.isEmpty())) {
                    newgenRoutingDetails = new SpendDataBean1();
                    newgenRoutingDetails.setMaterialSVSNumber(al.get(0));
                    newgenRoutingDetails.setMaterialServiceDescription(al.get(1));
                    newgenRoutingDetails.setPoLong(al.get(2));
                    newgenRoutingDetails.setUom(al.get(3));
                    newgenRoutingDetails.setOrderPriceUnit(al.get(4));
                    newgenRoutingDetails.setPurchaseGroup(al.get(5));
                    newgenRoutingDetails.setCurrency(al.get(6));
                    newgenRoutingDetails.setUnitPrice(al.get(7));
                    newgenRoutingDetails.setGrQty(al.get(8));
                    newgenRoutingDetails.setPerPriceUnit(al.get(9));
                    newgenRoutingDetails.setLcAmount(al.get(10));
                    newgenRoutingDetails.setType(al.get(11));
                    newgenRoutingDetails.setMatGroup(al.get(12));
                    newgenRoutingDetails.setMatStorageLoc(al.get(13));
                    newgenRoutingDetails.setMatGroupDesc(al.get(14));
                    newgenRoutingDetails.setTenderTitle(tenderTitle);
                    newgenRoutingDetails.setRequestType(reqType);
                    newgenRoutingDetails.setCompanyCode(coCode);
                    newgenRoutingDetails.setContractType(contractType);
                    newgenRoutingDetails.setCostCentre(costCentre);
                    newgenRoutingDetails.setActivationDate(activationDate);
                    newgenRoutingDetails.setOldMaterialNo(al.get(15));
                    newgenRoutingDetails.setCountryOrigin(al.get(16));
                    newgenRoutingDetails.setUomStore(al.get(17));
                    
//                    newgenRoutingDetails.setPlantCode(al.get(9));
//                    newgenRoutingDetails.setMaterialGroup_SVSNumber(al.get(10));
//                    newgenRoutingDetails.setMaterialServiceGroupDescription(al.get(11));
//                    newgenRoutingDetails.setReport(al.get(12));
//                    newgenRoutingDetails.setPosting_Date(al.get(13));
//                    newgenRoutingDetails.setGRQuantity(al.get(14));
//                    newgenRoutingDetails.setLCAmount(al.get(15));
//                    newgenRoutingDetails.setVendorCode(al.get(16));
//                    newgenRoutingDetails.setVendorName(al.get(17));
                }
            
            list.add(newgenRoutingDetails);
            info("newgenRoutingDetailsbefore" + newgenRoutingDetails.getMaterialSVSNumber());
            
            inputbean.setSpendData(list);
            info("List => "+ list);
            String[] newgenFlow = newgenFlowContractControl(inputbean);
             pid = newgenFlow[2];
            info("pid: of "+ RfqLine[i]+" -> ->" + pid);
            }
            //Remove
            String removeCartValues = request.getParameter("removeCartValuesLib");
            String removeString[] = removeCartValues.split(",");
            for (int i = 0; i < removeString.length; i++) {
                System.out.println("inisde removeString" + removeString[i]);
                if (!removeString[i].isEmpty()) {
                    updateIDFromCart(Integer.parseInt(removeString[i]), "Deleted");
                }
            }
            String res = updateTenderProcessed(sno[1]);
            redirect.addFlashAttribute("pid", pid);
            
       }
        return new ModelAndView("redirect:/SpendAnalysisLibrary1.do");
    
    }
    
    @RequestMapping(value = "/spendAnalysisLibrary2", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ModelAndView spendAnalysisLibrarySVC(ModelMap model, HttpServletRequest request, RedirectAttributes redirect) {
        info("Inside for SERVICE LIB");
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        String initiatorID = buyer.getFirstname()+" "+buyer.getLastname() ;
        String emailID = buyer.getEmailid();
        String requestType = request.getParameter("typeofRequestSVCLib");
        info("Request ->"+requestType);
        
        if (requestType.equalsIgnoreCase("RemoveCart")) {
            info("inside removecart");
            String removeCartValues = request.getParameter("removeCartValuesSVCLib");
            String removeString[] = removeCartValues.split(",");
            for (int i = 0; i < removeString.length; i++) {
                System.out.println("inisde removeString" + removeString[i]);
                if (!removeString[i].isEmpty()) {

                    updateIDFromCartSVCLib(Integer.parseInt(removeString[i]), "Deleted");
                }
            }
        }
 
        else if (requestType.equalsIgnoreCase("GroupSend")) {
            String pid="";
            info("inside Send to GroupSend ");
            InputBean inputbean = new InputBean();
            String spocname = request.getParameter("spoc_contractLib");
            inputbean.setSpocname(spocname);
            inputbean.setInitiatorID(initiatorID);
            inputbean.setSpocemail(emailID);
            String uniqueID = request.getParameter("uniqueIDSvcLib");
            String tenderTitle = request.getParameter("tenderTitleLibSVC");
            String reqType = request.getParameter("requestTypeLibSVC");
            String coCode = request.getParameter("companyCodeLibSVC");
            String contractType = request.getParameter("contractTypeLibSVC");
            String costCentre = request.getParameter("costCentreLibSVC");
            String replyDate = request.getParameter("replyDateLibSVC");
            String documents = request.getParameter("documentsLibSVC");
            String termination = request.getParameter("terminationLibSVC");
            info(tenderTitle+reqType+coCode+contractType+costCentre+replyDate+documents+termination);
            info("Unique ID -> "+uniqueID );
            String sno[]=uniqueID.split("#");
//            String lastnumberspend = findLastID();
//            inputbean.setSOW_RefNo(lastnumberspend);
            info("spocname--" + inputbean.getSpocname());
            List<SpendDataBean> list = new ArrayList<>();
            String contractLines = request.getParameter("spendValuesJavaSVCLib");
            info(contractLines);
            String contractLines2 = contractLines.replaceAll("~~","~NULL~");
            String contractLines3 = contractLines2.replaceAll("~~","~NULL~");
            String unassignedspendlines = contractLines3.replaceAll("~~","~NULL~");
            //String unassignedspendlines = request.getParameter("spendValuesJava");
            info("Java Spend Values -> ->"+unassignedspendlines);
            String RfqLine[] = unassignedspendlines.split("###");
            
            for (int i = 0; i < RfqLine.length; i++) {
                System.out.println("unassignedspendlines" + unassignedspendlines);
                String unassignedspendlinesarr[] = RfqLine[i].split("~");
                List<String> al = new ArrayList<String>();
                info("Rfq line ->"+RfqLine[i]);
                al = Arrays.asList(unassignedspendlinesarr);
                info("unassignedspendlinesarr => =>" + al);
                System.out.println("al" + al);
                if(!(al.isEmpty())) {
                    newgenRoutingDetailsSVC = new SpendDataBean();
                    newgenRoutingDetailsSVC.setPurchase_Doc(al.get(0));
                    newgenRoutingDetailsSVC.setItem(al.get(1));
                    newgenRoutingDetailsSVC.setOrderType(al.get(2));
                    newgenRoutingDetailsSVC.setVendorCode(al.get(3));
                    newgenRoutingDetailsSVC.setVendorName(al.get(4));
                    newgenRoutingDetailsSVC.setMaterial_SVSNumber(al.get(5));
                    newgenRoutingDetailsSVC.setMaterial_ServiceDescription(al.get(6));
                    newgenRoutingDetailsSVC.setPlantCode(al.get(7));
                    newgenRoutingDetailsSVC.setMaterialGroup_SVSNumber(al.get(8));
                    newgenRoutingDetailsSVC.setMaterialServiceGroupDescription(al.get(9));
                    newgenRoutingDetailsSVC.setUom(al.get(10));
                    newgenRoutingDetailsSVC.setUnitPrice(al.get(11));
                    newgenRoutingDetailsSVC.setLCAmount(al.get(12));
                    newgenRoutingDetailsSVC.setPosting_Date(al.get(13));
                    newgenRoutingDetailsSVC.setGRQuantity(al.get(14));
                    newgenRoutingDetailsSVC.setTenderTitle(tenderTitle);
                    newgenRoutingDetailsSVC.setCompanyCode(coCode);
                    newgenRoutingDetailsSVC.setContractType(contractType);
                    newgenRoutingDetailsSVC.setCostCentre(costCentre);
                    newgenRoutingDetailsSVC.setRequestType(requestType);
                    newgenRoutingDetailsSVC.setReplyDate(replyDate);
                    newgenRoutingDetailsSVC.setDocuments(documents);
                    newgenRoutingDetailsSVC.setTermination(termination);

                }
            
            list.add(newgenRoutingDetailsSVC);
            info("newgenRoutingDetailsbefore" + newgenRoutingDetailsSVC.getMaterial_SVSNumber());
            }
            inputbean.setSpendData(list);
            info("List => "+ list);
            String[] newgenFlow = newgenFlowContractControlSVC(inputbean);
             pid = newgenFlow[2];
            //info("pid: of "+ RfqLine[i]+" -> ->" + pid);
            
            //Remove
            String removeCartValues = request.getParameter("removeCartValuesSVCLib");
             info("Remove ->"+removeCartValues );
            String removeString[] = removeCartValues.split(",");
            for (int i = 0; i < removeString.length; i++) {
                System.out.println("inisde removeString" + removeString[i]);
                if (!removeString[i].isEmpty()) {
                    updateIDFromCartSVC(Integer.parseInt(removeString[i]), "Deleted");
                }
            }
            String res = updateTenderProcessed(sno[1]);
            
            redirect.addFlashAttribute("pid", pid);
            
       }
        
        else {
            String pid="";
            info("inside Send to Tender solo");
            InputBean inputbean = new InputBean();
            String spocname = request.getParameter("spoc_contractLib");
            inputbean.setSpocname(spocname);
            inputbean.setInitiatorID(initiatorID);
            inputbean.setSpocemail(emailID);
            String uniqueID = request.getParameter("uniqueIDSvcLib");
            info("Unique ID -> "+uniqueID );
            String sno[]=uniqueID.split("#");
//            String lastnumberspend = findLastID();
//            inputbean.setSOW_RefNo(lastnumberspend);
            info("spocname--" +spocname );
            String tenderTitle = request.getParameter("tenderTitleLibSVC");
            String reqType = request.getParameter("requestTypeLibSVC");
            String coCode = request.getParameter("companyCodeLibSVC");
            String contractType = request.getParameter("contractTypeLibSVC");
            String costCentre = request.getParameter("costCentreLibSVC");
            String replyDate = request.getParameter("replyDateLibSVC");
            String documents = request.getParameter("documentsLibSVC");
            String termination = request.getParameter("terminationLibSVC");
            info(tenderTitle+reqType+coCode+contractType+costCentre+replyDate+documents+termination);
            List<SpendDataBean> list = new ArrayList<>();
            String contractLines = request.getParameter("spendValuesJavaSVCLib");
            info(contractLines);
            String contractLines2 = contractLines.replaceAll("~~","~NULL~");
            String contractLines3 = contractLines2.replaceAll("~~","~NULL~");
            String unassignedspendlines = contractLines3.replaceAll("~~","~NULL~");
            //String unassignedspendlines = request.getParameter("spendValuesJava");
            info("Java Spend Values -> ->"+unassignedspendlines);
            String RfqLine[] = unassignedspendlines.split("###");
            
            for (int i = 0; i < RfqLine.length; i++) {
                System.out.println("unassignedspendlines" + unassignedspendlines);
                String unassignedspendlinesarr[] = RfqLine[i].split("~");
                List<String> al = new ArrayList<String>();
                info("Rfq line ->"+RfqLine[i]);
                if(!list.isEmpty())
                {
                    list.clear();
                }
                al = Arrays.asList(unassignedspendlinesarr);
                info("unassignedspendlinesarr => =>" + al);
                System.out.println("al" + al);
                if(!(al.isEmpty())) {
                    newgenRoutingDetailsSVC = new SpendDataBean();
                    newgenRoutingDetailsSVC.setPurchase_Doc(al.get(0));
                    newgenRoutingDetailsSVC.setItem(al.get(1));
                    newgenRoutingDetailsSVC.setOrderType(al.get(2));
                    newgenRoutingDetailsSVC.setVendorCode(al.get(3));
                    newgenRoutingDetailsSVC.setVendorName(al.get(4));
                    newgenRoutingDetailsSVC.setMaterial_SVSNumber(al.get(5));
                    newgenRoutingDetailsSVC.setMaterial_ServiceDescription(al.get(6));
                    newgenRoutingDetailsSVC.setPlantCode(al.get(7));
                    newgenRoutingDetailsSVC.setMaterialGroup_SVSNumber(al.get(8));
                    newgenRoutingDetailsSVC.setMaterialServiceGroupDescription(al.get(9));
                    newgenRoutingDetailsSVC.setUom(al.get(10));
                    newgenRoutingDetailsSVC.setUnitPrice(al.get(11));
                    newgenRoutingDetailsSVC.setLCAmount(al.get(12));
                    newgenRoutingDetailsSVC.setPosting_Date(al.get(13));
                    newgenRoutingDetailsSVC.setGRQuantity(al.get(14));
                    newgenRoutingDetailsSVC.setTenderTitle(tenderTitle);
                    newgenRoutingDetailsSVC.setCompanyCode(coCode);
                    newgenRoutingDetailsSVC.setContractType(contractType);
                    newgenRoutingDetailsSVC.setCostCentre(costCentre);
                    newgenRoutingDetailsSVC.setRequestType(requestType);
                    newgenRoutingDetailsSVC.setReplyDate(replyDate);
                    newgenRoutingDetailsSVC.setDocuments(documents);
                    newgenRoutingDetailsSVC.setTermination(termination);

                }
            
            list.add(newgenRoutingDetailsSVC);
            info("newgenRoutingDetailsbefore" + newgenRoutingDetailsSVC.getMaterial_SVSNumber());
            
            inputbean.setSpendData(list);
            info("List => "+ list);
            String[] newgenFlow = newgenFlowContractControlSVC(inputbean);
             pid = newgenFlow[2];
            info("PID -> -> "+ pid);
            }
            //Remove
            String removeCartValues = request.getParameter("removeCartValuesSVCLib");
            info("Remove ->"+removeCartValues );
            String removeString[] = removeCartValues.split(",");
            for (int i = 0; i < removeString.length; i++) {
                System.out.println("inisde removeString" + removeString[i]);
                if (!removeString[i].isEmpty()) {
                    updateIDFromCartSVC(Integer.parseInt(removeString[i]), "Deleted");
                }
            }
            String res = updateTenderProcessed(sno[1]);
            redirect.addFlashAttribute("pid", pid);
            
       }
        return new ModelAndView("redirect:/SpendAnalysisLibrary1.do");
    }
    
     String reassignContractRfq(String rfqids, int buyerid) {

        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/reassignContractrfq.do?rfqids=" + rfqids + "&buyerid=" + buyerid;
        System.out.println("url: " + url);

        ResponseEntity<String> restResponse = restTemplate.exchange(url, HttpMethod.POST, null, new ParameterizedTypeReference<String>() {
        });
        String result = restResponse.getBody();
        return result;
    }

    String reassignContract(String contractlineids, int buyerid) {

        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/reassigncontractline.do?contractlineids=" + contractlineids + "&buyerid=" + buyerid;
        System.out.println("reassignContracturl: " + url);

        ResponseEntity<String> restResponse = restTemplate.exchange(url, HttpMethod.POST, null, new ParameterizedTypeReference<String>() {
        });
        String result = restResponse.getBody();
        return result;
    }
      String[] newgenFlowContractControl(InputBean1 list) {

        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip+"/ContractManagement/ng/ngservice/NGCWI";
        System.out.println("newgenFlowContractControl:" + url);
        OutputBean outputBean = restTemplate.postForObject(URI.create(url), list, OutputBean.class);
        System.out.println("mappingid newgenFlowContractControl: " + outputBean.getMaincode());
        System.out.println("pid" + outputBean.getProcessInstanceID());

        String mainCode = outputBean.getMaincode();
        String processInstanceID = outputBean.getProcessInstanceID();
        String message = outputBean.getMessage();
        // return mainCode;
        return new String[]{processInstanceID, mainCode ,message };
    }
      
      String[] rerouteWI(InputBeanOla in) {

        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip+"/ContractManagement/ng/ngservice/revokeOLA";
        System.out.println("newgenFlowContractControl:" + url);
        OutputBean outputBean = restTemplate.postForObject(URI.create(url), in, OutputBean.class);
        info("rerouteWI METHOD: " + outputBean.getMaincode());
        info("pid" + outputBean.getProcessInstanceID());

        String mainCode = outputBean.getMaincode();
        String processInstanceID = outputBean.getProcessInstanceID();
        String message = outputBean.getMessage();
        info(mainCode+","+processInstanceID+","+message);
        // return mainCode;
        return new String[]{processInstanceID, mainCode ,message };
    }
      
      String[] newgenFlowContractControlSVC(InputBean list) {

        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip+"/ContractManagement/ng/ngservice/NGCWISVC";
        System.out.println("newgenFlowContractControl:" + url);
        OutputBean outputBean = restTemplate.postForObject(URI.create(url), list, OutputBean.class);
        System.out.println("mappingid newgenFlowContractControl: " + outputBean.getMaincode());
        System.out.println("pid" + outputBean.getProcessInstanceID());

        String mainCode = outputBean.getMaincode();
        String processInstanceID = outputBean.getProcessInstanceID();
        String message = outputBean.getMessage();
        // return mainCode;
        return new String[]{processInstanceID, mainCode ,message };
    }
    //added by abhishek on 09/03/2020

    String findLastID() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findfinalID.do";
        System.out.println("url findLastID" + url);
        String msg = restTemplate.postForObject(URI.create(url), null, String.class);
        return msg;
    }
        String updateIDFromCart(int insid, String Isdeleted) {
        System.out.println("inside updateIDFromCart");
        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/updateidstatuscart.do?sno=" + insid + "&Isdeleted=" + Isdeleted;
        System.out.println("url updateIDFromCart" + url);

        ResponseEntity<String> ContractResponse = restTemplate.exchange(url, HttpMethod.POST, null, new ParameterizedTypeReference<String>() {
        });
        String result = ContractResponse.getBody();
        System.out.println("result ContractResponsse " + result);
        return result;
    }
        
        String updateIDFromCartLib(int insid, String Isdeleted) {
        System.out.println("inside updateIDFromCart");
        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/updateidstatuscartLib.do?sno=" + insid + "&Isdeleted=" + Isdeleted;
        System.out.println("url updateIDFromCart" + url);

        ResponseEntity<String> ContractResponse = restTemplate.exchange(url, HttpMethod.POST, null, new ParameterizedTypeReference<String>() {
        });
        String result = ContractResponse.getBody();
        System.out.println("result ContractResponsse " + result);
        return result;
    }
        
        String updateRevokeStatus(String sno) {
        System.out.println("inside revokeStatus");
        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/updateRevokeStatus.do?sno=" + sno;
        System.out.println("url revokeStatus" + url);

        ResponseEntity<String> ContractResponse = restTemplate.exchange(url, HttpMethod.POST, null, new ParameterizedTypeReference<String>() {
        });
        String result = ContractResponse.getBody();
        System.out.println("result revokeStatus " + result);
        return result;
    }
        
        String updateTenderProcessed(String sno) {
        info("Inside UpdateTendeProcessed Method");
        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/updateTenderProcessed.do?sno=" + sno;
        info("url UpdateTendeProcessed" + url);

        ResponseEntity<String> ContractResponse = restTemplate.exchange(url, HttpMethod.POST, null, new ParameterizedTypeReference<String>() {
        });
        String result = ContractResponse.getBody();
        info("result UpdateTendeProcessed " + result);
        return result;
        
    }
        
        String updateIDFromCartSVC(int insid, String Isdeleted) {
        System.out.println("inside updateIDFromCart");
        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/updateidstatuscartsvc.do?sno=" + insid + "&Isdeleted=" + Isdeleted;
        System.out.println("url updateIDFromCart" + url);

        ResponseEntity<String> ContractResponse = restTemplate.exchange(url, HttpMethod.POST, null, new ParameterizedTypeReference<String>() {
        });
        String result = ContractResponse.getBody();
        System.out.println("result ContractResponsse " + result);
        return result;
    }
        String updateIDFromCartSVCLib(int insid, String Isdeleted) {
        System.out.println("inside updateIDFromCart");
        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/updateidstatuscartsvcLib.do?sno=" + insid + "&Isdeleted=" + Isdeleted;
        System.out.println("url updateIDFromCart" + url);

        ResponseEntity<String> ContractResponse = restTemplate.exchange(url, HttpMethod.POST, null, new ParameterizedTypeReference<String>() {
        });
        String result = ContractResponse.getBody();
        System.out.println("result ContractResponsse " + result);
        return result;
    }
        
        
        String updateCmLineItemData(String Pid,String record, int itemno) {
        System.out.println("inside updateIDFromCart");
        RestTemplate restTemplate = new RestTemplate();
        String itemNo = Integer.toString(itemno);
        String url = webservice_ip + "/BuyerPortalWebServices/updateCmLineItemData.do?id=" + Pid + "&record=" + record + "&itemno=" + itemNo ;
        System.out.println("url updateIDFromCart" + url);

        ResponseEntity<String> ContractResponse = restTemplate.exchange(url, HttpMethod.POST, null, new ParameterizedTypeReference<String>() {
        });
        String result = ContractResponse.getBody();
        System.out.println("result ContractResponsse " + result);
        return result;
    }

    String updateIDAddcart(int insid, String spendlibrary , String bName) {
        System.out.println("inside updateIDAddcart");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updateIDtoLibrary.do?sno=" + insid + "&spendlibrary=" + spendlibrary + "&bName=" + bName;
        System.out.println("url updateIDFromCart" + url);
        ResponseEntity<String> ContractResponse = restTemplate.exchange(url, HttpMethod.POST, null, new ParameterizedTypeReference<String>() {
        });
        String result = ContractResponse.getBody();
        System.out.println("result ContractResponsse " + result);
        return result;
    }
    
    String updateIDAddcartSVC(int insid, String spendlibrary , String bName) {
        System.out.println("inside updateIDAddcart");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updateIDAddcartSVC.do?sno=" + insid + "&spendlibrary=" + spendlibrary + "&bName=" + bName;
        System.out.println("url updateIDFromCart" + url);
        ResponseEntity<String> ContractResponse = restTemplate.exchange(url, HttpMethod.POST, null, new ParameterizedTypeReference<String>() {
        });
        String result = ContractResponse.getBody();
        System.out.println("result ContractResponsse " + result);
        return result;
    }
    
    String updateWIstatus(int insid, String status) {
        System.out.println("inside updateIDAddcart");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updateWIStatus.do?sno=" + insid + "&status=" + status;
        System.out.println("url updateIDFromCart" + url);
        ResponseEntity<String> ContractResponse = restTemplate.exchange(url, HttpMethod.POST, null, new ParameterizedTypeReference<String>() {
        });
        String result = ContractResponse.getBody();
        System.out.println("result ContractResponsse " + result);
        return result;
    }
    
    String checkWIstatus(int insid) {
        System.out.println("inside checkWIstatus");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/checkWIstatus.do?sno=" + insid;
        System.out.println("url updateIDFromCart" + url);
        ResponseEntity<String> ContractResponse = restTemplate.exchange(url, HttpMethod.POST, null, new ParameterizedTypeReference<String>() {
        });
        String result = ContractResponse.getBody();
        System.out.println("result ContractResponsse " + result);
        return result;
    }
    
    List<MasterContractType> getContractType() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallcontracttype.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterContractType>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterContractType>>() {
        });
        List<MasterContractType> list = response.getBody();
        System.out.println("MasterMaterialType size: " + list.size());
        return list;
    }
    
     @RequestMapping(value = "contractexpiring")
    public ModelAndView contractExpiring(ModelMap model, HttpServletRequest request) {
        List<ContractRfqHeader> ContractExpiringList = findContractExpiring();
        System.out.println("ContractExpiringList ContractRFQHeader" + ContractExpiringList.size());
        model.put("ContractExpiringList", ContractExpiringList);

        return new ModelAndView("contractsExpiring");
    }

    public List<ContractRfqHeader> findContractExpiring() {
        System.out.println("findContractExpirings");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findContractExpiring.do";
        ResponseEntity<List<ContractRfqHeader>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ContractRfqHeader>>() {
        });
        List<ContractRfqHeader> list = response.getBody();
        return list;
    }

    @RequestMapping(value = "pendingApprovals")
    public ModelAndView pendingApprovals(ModelMap model, HttpServletRequest request) {
        System.out.println("pendingApprovals");

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        System.out.println("buyer : " + buyer);
        String role = buyer.getRole();

        int id = buyer.getId();
        String buyerID = buyer.getUsername();

//        List<PRDetails> prList = findPRAssignedToThisBuyer(buyerId);
//        List<NewgenPRLineItem> prList = findPRAssignedToThisBuyer(buyerId);
        List<NGExtCM> buyerPendingServiceContractList = callBuyerPendingContractLineItems(buyerID,"Service");
        System.out.println("buyerPendingServiceContractList: " + buyerPendingServiceContractList.size());

        model.put("buyerPendingServiceContractList", buyerPendingServiceContractList);
        
        List<NGExtCM> buyerPendingMaterialContractList = callBuyerPendingContractLineItems(buyerID , "Material");
        System.out.println("buyerPendingMaterialContractList: " + buyerPendingMaterialContractList.size());
        model.put("buyerPendingMaterialContractList", buyerPendingMaterialContractList);

//        model.put("buyerPendingMaterialPRList", buyerPendingMaterialPRList);
//        model.put("buyerPendingServicePRList", buyerPendingServicePRList);
        return new ModelAndView("pendingApprovals");
    }
    
    @RequestMapping(value = "manageola")
    public ModelAndView manageOLA(ModelMap model, HttpServletRequest request) {
        info("Inside Manage OLA");

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        System.out.println("buyer : " + buyer);
        String role = buyer.getRole();

        int id = buyer.getId();
        String buyerID = buyer.getUsername();

//        List<PRDetails> prList = findPRAssignedToThisBuyer(buyerId);
//        List<NewgenPRLineItem> prList = findPRAssignedToThisBuyer(buyerId);
        List<NGExtCM> manageOlaList = manageOlaBuyerList(buyerID);
        info("manageOlaList: " + manageOlaList.size());
        model.put("manageOlaList", manageOlaList);
        

        return new ModelAndView("manageola");
    }
    
    
    public List<NGExtCM> manageOlaBuyerList(String buyerID) {
        System.out.println("Inside findAllSpendReport1()");
        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/manageOla.do?buyerID=" + buyerID;

        System.out.println("urlcontractspend" + url);
        ResponseEntity<List<NGExtCM>> Spend = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGExtCM>>() {
        });

        System.out.println("vendor:" + Spend);
        System.out.println("vendor:" + Spend.getBody());
        List<NGExtCM> contractPendingList = Spend.getBody();
        return contractPendingList;
    }
    
    public List<NGExtCM> callBuyerPendingContractLineItems(String buyerID , String type) {
        System.out.println("Inside findAllSpendReport1()");
        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/pendingContractLines.do?buyerID=" + buyerID + "&type=" + type;

        System.out.println("urlcontractspend" + url);
        ResponseEntity<List<NGExtCM>> Spend = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGExtCM>>() {
        });

        System.out.println("vendor:" + Spend);
        System.out.println("vendor:" + Spend.getBody());
        List<NGExtCM> contractPendingList = Spend.getBody();
        return contractPendingList;
    }
    

    

    List<BuyerPendingContractLineItemsBean> callBuyerPendingContractLineItemsStoredProcedure(int buyerId, String prType) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/callBuyerPendingContractLineItemsStoredProcedure.do?buyerid=" + buyerId + "&prtype=" + prType;
        System.out.println("url tlcontract " + url);
        ResponseEntity<List<BuyerPendingContractLineItemsBean>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<BuyerPendingContractLineItemsBean>>() {});
        List<BuyerPendingContractLineItemsBean> buyerPendingPRList = response.getBody();
        return buyerPendingPRList;
    }

    @RequestMapping(value = "/querycontract")
    public ModelAndView querycontract(ModelMap model, HttpSession session, HttpServletRequest request, RedirectAttributes redirect) {

        System.out.println("----------Query querycontract------------");
        String queryreason = request.getParameter("queryreasoncontract");
        String queryraisedto = request.getParameter("queryraisedtocontract");

        //  String queryprdoc = request.getParameter("queryprdoc");
        String qwiNumber = request.getParameter("qwiNumberContract");
        //  String qlinkId = request.getParameter("qlinkId");
        String querymailaddress = request.getParameter("querymailaddresscontract");
        // String qPrNumber = request.getParameter("qPrNumber");

        System.out.println("queryreason: " + queryreason);
        System.out.println("queryraisedto: " + queryraisedto);
        //  System.out.println("queryprdoc: " + queryprdoc);
        System.out.println("qwiNumber: " + qwiNumber);
        // System.out.println("qlinkId: " + qlinkId);
        System.out.println("querymailaddress: " + querymailaddress);
        // System.out.println("qPrNumber: " + qPrNumber);

        String status = queryContract(qwiNumber, queryreason, queryraisedto);

//        emailTriggerDetails.setMailCC("nikhil.bpaas@gmail.com");
        emailTriggerDetails.setMailFrom("do-not-reply@natsteel.com.sg");
        emailTriggerDetails.setMailContentType("text/html;charset=UTF-8"); // default
        emailTriggerDetails.setMailMessage("Work Item: " + qwiNumber + "<br> has been sent");
        emailTriggerDetails.setMailSubject("Query for PR-" + qwiNumber + " has been sent to you");
        emailTriggerDetails.setMailTo(querymailaddress);
         emailTriggerDetails.setMailStatus("N");
        mailTriggerUtil.TriggerMail(emailTriggerDetails);

        redirect.addFlashAttribute("QueryStatus", status);

        return new ModelAndView("redirect:/pendingprlines.do");
    }

    String queryContract(String wiName, String queryReason, String queryraisedto) {
        System.out.println("^^^^^^^^^queryContract^^^^^^^^");
        RestTemplate restTemplate = new RestTemplate();

        String url = NGwebservice_ip + "/PR2POWebservice/ng/service/QueryContractWI";

        System.out.println("URL-->" + url);
//        QueryWIInput in = new QueryWIInput();

        System.out.println("*******after**********");

        queryWiInput.setWorkitemId(wiName);

        queryWiInput.setQueryReason(queryReason);

        QueryWIOutPut str = restTemplate.postForObject(URI.create(url), queryWiInput, QueryWIOutPut.class);
        System.out.println("MainCode-->" + str.getMainCode());
        System.out.println("Message-->" + str.getMessage());

        return str.getMainCode();
    }
    
    //@RequestMapping(value = "/createcontract", method = RequestMethod.POST)
   // public ModelAndView createContract(ModelMap model,,HttpServletRequest request, HttpServletResponse response, Map<String, Object> modalMap, RedirectAttributes redirect) throws IOException, DocumentException, ParseException, com.lowagie.text.DocumentException {
@RequestMapping(value = "/createcontract", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ModelAndView createContract(ModelMap model, HttpServletRequest request, RedirectAttributes redirect) {
//    @RequestMapping(value = "/",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
//    public ModelAndView createContract(ModelMap model, HttpSession session, HttpServletRequest request, RedirectAttributes redirect) {
        System.out.println("createcontract");

        String contractRefId = request.getParameter("contractRefId");
        System.out.println("----------contractRefId------------" + contractRefId);
        String reqType = request.getParameter("reqType");
        System.out.println("----------reqType------------" + reqType);
        String vendorID = request.getParameter("vendorID");
        System.out.println("----------vendorID------------" + vendorID);
        String lineList = request.getParameter("vendorrfqlineID");
        System.out.println("----------lineList------------" + lineList);
        
        //VendorDetails vendorObj = findVendorById(Integer.parseInt(vendorID));
        List<MasterVendor> vendorObj = findMasterVendorByVendorCode(vendorID);
        List<NGExtCM> contract = findContractHeaderByPId(contractRefId);
        List<CMHeaderInfo> cmHeaderInfoList = findContractHeaderInfo(contractRefId);
        List<CMHeaderAgreementInfo> cmHeaderAgInfoList = findContractHeaderAgreementInfo(contractRefId);
        List<CMHeaderOLAInfo> cmHeaderOLAInfoList = findContractHeaderOLAInfo(contractRefId);
        
        List<ContractVendorRfqLineItem> contractVendorRfqLineItem = findContractVendorRfqLineItem(lineList);

        List<CMHeaderTermsDPInfo> cmHeaderTermsDPInfoList = findContractHeaderTermsDPInfo(contractRefId);
        List<NewgenContractLineItem> newgenContractLineItemList = findContractLineInfo(contractRefId);
        List<CMHeaderReferenceInfo> cmHeaderReferenceInfoList = findContractReferenceInfo(contractRefId);
        List<CMHeaderAccountAssignInfo> cmHeaderAccountAssignInfoList = findContractAccountAssignInfo(contractRefId);
        List<CMHeaderServicesInfo> cmHeaderServicesInfoList = null;
        if (newgenContractLineItemList.size() > 0) {
            cmHeaderServicesInfoList = findServiceByLinkId(newgenContractLineItemList.get(0).getLinkid());
            System.out.println("cmHeaderServicesInfoList size: " + cmHeaderServicesInfoList.size());
        }

        List<CMHeaderProfitSegmentInfo> cmHeaderProfitSegmentInfoList = findContractProfitSegmentInfo(contractRefId);
        List<CMSOWContractDetailsInfo> cmSOWContractDetailsInfoList = findContractDetailsInfo(contractRefId);
        List<CMHeaderMislInfo> cmCMHeaderMislInfoList = findHeaderMislInfo(contractRefId);
        List<MasterPurchasingGroup> masterPurchasingGroupList = findAllMasterPurchaseGroup();
        List<MasterPurchaseOrg> purchaseList = getAllPurchaseOrg();
        List<PaymentTermsMaster> paymentList = getAllPaymentTerms();
        List<MasterCurrency> currencyList = getAllCurrency();

        System.out.println("cmHeaderInfoList size: " + cmHeaderInfoList.size());
        System.out.println("cmHeaderAgInfoList size: " + cmHeaderAgInfoList.size());
        System.out.println("cmHeaderOLAInfoList size: " + cmHeaderOLAInfoList.size());
        System.out.println("cmHeaderTermsDPInfoList size: " + cmHeaderTermsDPInfoList.size());
        System.out.println("cmHeaderReferenceInfoList size: " + cmHeaderReferenceInfoList.size());
        System.out.println("cmHeaderAccountAssignInfoList size: " + cmHeaderAccountAssignInfoList.size());
        

       // System.out.println("cmHeaderServicesInfoList size: " + cmHeaderServicesInfoList.get(0).getLinkId());
        System.out.println("cmHeaderProfitSegmentInfoList size: " + cmHeaderProfitSegmentInfoList.size());
        System.out.println("CMSOWContractDetailsInfoList size: " + cmSOWContractDetailsInfoList.size());
        System.out.println("CMCMHeaderMislInfoList size: " + cmCMHeaderMislInfoList.size());
        System.out.println("masterPurchasingGroupList size" + masterPurchasingGroupList.size());
        String companyCode=contract.get(0).getCompanyCode();
        List<MasterVendor> vendorList = findVendorByCompanyCode(companyCode);
        String paymentTerm=contractVendorRfqLineItem.get(0).getContractVendorRfqHeaderId().getPaymentterms().trim();
        //POPaymentTermsOP paymentTermvalue=getPamentTermDays(paymentTerm);
        
       // model.put("paymentTermvalue",paymentTermvalue);
        
        model.put("contractRefId", contractRefId);
        model.put("contract",contract.get(0));
        model.put("vendorObj",vendorObj.get(0));
        model.put("vendorList",vendorList);
       
        model.put("WebServiceCallIp", webservice_ip);
        model.put("reqType", reqType);
        model.put("masterPurchasingGroupList", masterPurchasingGroupList);
        model.put("purchaseList", purchaseList);
        model.put("paymentList", paymentList);
        model.put("cmHeaderInfoList", cmHeaderInfoList);
        model.put("cmHeaderAgInfoList", cmHeaderAgInfoList);
        model.put("cmHeaderOLAInfoList", cmHeaderOLAInfoList);
        
        model.put("cmHeaderReferenceInfoList", cmHeaderReferenceInfoList);
        model.put("cmHeaderAccountAssignInfoList", cmHeaderAccountAssignInfoList);
        model.put("cmHeaderServicesInfoList", cmHeaderServicesInfoList);
        model.put("cmHeaderProfitSegmentInfoList", cmHeaderProfitSegmentInfoList);
        model.put("cmSOWContractDetailsInfoList", cmSOWContractDetailsInfoList);
        model.put("cmCMHeaderMislInfoList", cmCMHeaderMislInfoList);
        model.put("currencyList", currencyList);
        model.put("newgenContractLineItemList", newgenContractLineItemList);
        model.put("contractVendorRfqLineItem", contractVendorRfqLineItem);
       // contractVendorRfqLineItem.get(0).getContractVendorRfqHeaderId().getNgBpContractRfqHeaderRfqid().getRfqid();
        CMHeaderTermsDPInfo cmHeaderTermsDPInfo = null;
        if (cmHeaderTermsDPInfoList.size() > 0) {
            cmHeaderTermsDPInfo = cmHeaderTermsDPInfoList.get(0);
        }
        if (!contractVendorRfqLineItem.get(0).getCurrency().equalsIgnoreCase("SGD")) {
        System.out.println("Currency-->" + contractVendorRfqLineItem.get(0).getCurrency());
        List<MasterExchangeRate> exchangeRateList = findExchangeRateByFromCurrencyAndToCurrency(contractVendorRfqLineItem.get(0).getCurrency(), "SGD");
        if (!exchangeRateList.isEmpty()) {
            BigDecimal bdnp = new BigDecimal(exchangeRateList.get(0).getExchangeRate().toString());
            cmHeaderTermsDPInfo.setExchangeRate(bdnp);
        }
    } else {
        BigDecimal bdnp = new BigDecimal("1.00");
        //cmHeaderTermsDPInfo.setExchangeRate(bdnp);
    }

    model.put("cmHeaderTermsDPInfoList", cmHeaderTermsDPInfo);
    return new ModelAndView("createcontract");
    }
    
    public List<MasterVendor> findVendorByCompanyCode(String companyCode) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findVendorByCompanyCode.do?CompanyCode=" + companyCode;
        ResponseEntity<List<MasterVendor>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterVendor>>() {
        });
        System.out.println("response: " + response);
        List<MasterVendor> vendorList = response.getBody();
        return vendorList;
    }
    
    List<MasterExchangeRate> findExchangeRateByFromCurrencyAndToCurrency(String fromCurrency, String toCurrency) {
        RestTemplate restTemplate = new RestTemplate();
        System.out.println("fromCurrency-->"+fromCurrency);
        System.out.println("toCurrency-->"+toCurrency);
        String url = webservice_ip + "/BuyerPortalWebServices/findExchangeRateByFromCurrencyAndToCurrency.do?fromCurrency=" + fromCurrency + "&toCurrency=" + toCurrency;
        System.out.println("url:" + url);
        ResponseEntity<List<MasterExchangeRate>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterExchangeRate>>() {
        });
        List<MasterExchangeRate> list = (List<MasterExchangeRate>) response.getBody();
        return list;
    }

    public List<MasterCurrency> getAllCurrency() {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/getallcurrency.do";

        ResponseEntity<List<MasterCurrency>> country = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterCurrency>>() {
        });

        System.out.println("country: " + country);

        List<MasterCurrency> currencyList = country.getBody();

        return currencyList;
    }

    List<CMHeaderInfo> findContractHeaderInfo(String contractRefId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findContractInfoById.do?contractRefId=" + contractRefId;
        System.out.println("url: " + url);
        ResponseEntity<List<CMHeaderInfo>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<CMHeaderInfo>>() {
        });
        List<CMHeaderInfo> CMHList = prResponse.getBody();
        return CMHList;
    }

    List<CMHeaderAgreementInfo> findContractHeaderAgreementInfo(String contractRefId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findContractAgreementInfoById.do?contractRefId=" + contractRefId;
        System.out.println("url: " + url);

        ResponseEntity<List<CMHeaderAgreementInfo>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<CMHeaderAgreementInfo>>() {
        });
        List<CMHeaderAgreementInfo> CMHAgList = prResponse.getBody();
        return CMHAgList;
    }

    List<CMHeaderOLAInfo> findContractHeaderOLAInfo(String contractRefId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findContractOLAInfoById.do?contractRefId=" + contractRefId;
        System.out.println("url: " + url);

        ResponseEntity<List<CMHeaderOLAInfo>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<CMHeaderOLAInfo>>() {
        });
        List<CMHeaderOLAInfo> CMHOLAList = prResponse.getBody();
        return CMHOLAList;
    }
    
    
            
     List<ContractVendorRfqLineItem> findContractVendorRfqLineItem(String insertionId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findContractVendorRfqLineItemById.do?ids=" + insertionId;
        System.out.println("url: " + url);

        ResponseEntity<List<ContractVendorRfqLineItem>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ContractVendorRfqLineItem>>() {
        });
        List<ContractVendorRfqLineItem> vendorRfqLineItem = prResponse.getBody();
        return vendorRfqLineItem;
    }

    List<CMHeaderTermsDPInfo> findContractHeaderTermsDPInfo(String contractRefId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findContractTermsDPInfoById.do?contractRefId=" + contractRefId;
        System.out.println("url: " + url);

        ResponseEntity<List<CMHeaderTermsDPInfo>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<CMHeaderTermsDPInfo>>() {
        });
        List<CMHeaderTermsDPInfo> CMHTermsList = prResponse.getBody();
        return CMHTermsList;
    }

    List<CMHeaderReferenceInfo> findContractReferenceInfo(String contractRefId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findContractReferenceInfoById.do?contractRefId=" + contractRefId;
        System.out.println("url: " + url);

        ResponseEntity<List<CMHeaderReferenceInfo>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<CMHeaderReferenceInfo>>() {
        });
        List<CMHeaderReferenceInfo> CMHReferenceList = prResponse.getBody();
        return CMHReferenceList;
    }

    List<NewgenContractLineItem> findContractLineInfo(String contractRefId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findContractLineById.do?contractRefId=" + contractRefId;
        System.out.println("url: " + url);

        ResponseEntity<List<NewgenContractLineItem>> contractLineItem = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NewgenContractLineItem>>() {
        });
        List<NewgenContractLineItem> ContractLineItemList = contractLineItem.getBody();
        return ContractLineItemList;
    }

    List<CMHeaderAccountAssignInfo> findContractAccountAssignInfo(String contractRefId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findContractAccountAssignInfoById.do?contractRefId=" + contractRefId;
        System.out.println("url: " + url);

        ResponseEntity<List<CMHeaderAccountAssignInfo>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<CMHeaderAccountAssignInfo>>() {
        });
        List<CMHeaderAccountAssignInfo> CMHAccountAssignList = prResponse.getBody();
        return CMHAccountAssignList;
    }

    List<CMHeaderServicesInfo> findContractServicesInfo(String contractRefId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findContractServicesInfoById.do?contractRefId=" + contractRefId;
        System.out.println("url: " + url);

        ResponseEntity<List<CMHeaderServicesInfo>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<CMHeaderServicesInfo>>() {
        });
        List<CMHeaderServicesInfo> CMHServicesList = prResponse.getBody();
        return CMHServicesList;
    }

    List<CMHeaderProfitSegmentInfo> findContractProfitSegmentInfo(String contractRefId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findContractProfitSegmentInfoById.do?contractRefId=" + contractRefId;
        System.out.println("url: " + url);

        ResponseEntity<List<CMHeaderProfitSegmentInfo>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<CMHeaderProfitSegmentInfo>>() {
        });
        List<CMHeaderProfitSegmentInfo> CMHProfitSegmentList = prResponse.getBody();
        return CMHProfitSegmentList;
    }

    List<CMSOWContractDetailsInfo> findContractDetailsInfo(String contractRefId) {
        System.out.println("findContractDetailsInfo");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findCMSOWContractDetailsInfoById.do?contractRefId=" + contractRefId;
        System.out.println("url: " + url);

        ResponseEntity<List<CMSOWContractDetailsInfo>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<CMSOWContractDetailsInfo>>() {
        });
        List<CMSOWContractDetailsInfo> CMContractDetailsInfoList = prResponse.getBody();
        return CMContractDetailsInfoList;
    }

    List<CMHeaderMislInfo> findHeaderMislInfo(String contractRefId) {
        System.out.println("findHeaderMislInfo");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findCMHeaderMislinfoById.do?contractRefId=" + contractRefId;
        System.out.println("url: " + url);

        ResponseEntity<List<CMHeaderMislInfo>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<CMHeaderMislInfo>>() {
        });
        List<CMHeaderMislInfo> CMHeaderMislInfosList = prResponse.getBody();
        return CMHeaderMislInfosList;
    }

    public List<MasterPurchasingGroup> findAllMasterPurchaseGroup() {

        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findpurchasegroupfrommaster.do";
        ResponseEntity<List<MasterPurchasingGroup>> vendor = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterPurchasingGroup>>() {
        });
        System.out.println("vendor: " + vendor);
        List<MasterPurchasingGroup> masterPurchasingGroupList = vendor.getBody();
        return masterPurchasingGroupList;
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

    List<MasterPurchaseOrg> getAllPurchaseOrg() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallpurchaseorg.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterPurchaseOrg>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterPurchaseOrg>>() {
        });
        List<MasterPurchaseOrg> list = response.getBody();
        System.out.println("MasterPurchaseOrg size: " + list.size());
        return list;
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

    @RequestMapping(value = "acknowledgecontract")
    public ModelAndView acknowledgecontract(ModelMap model, HttpServletRequest request) {
        System.out.println("acknowledgecontract");
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        System.out.println("buyer : " + buyer);

        List<NGExtCM> acknowledgecontractList = findByContractCurrentWorkstepAndInitiatorId("AcknowledgeContract", buyer.getUsername());
        System.out.println("acknowledgecontractList size: " + acknowledgecontractList.size());

        model.addAttribute("PONGwebserviceIp", NGwebservice_ip);
        model.addAttribute("acknowledgecontractList", acknowledgecontractList);

        return new ModelAndView("acknowledgecontract");
    }

    @RequestMapping(value = "doacknowledgecontract")
    public ModelAndView doacknowledgecontract(ModelMap model, HttpServletRequest request) {
        System.out.println("doacknowledgecontract");

        String pid = request.getParameter("pid");
        System.out.println("pid: " + pid);

        String ContractNo = request.getParameter("ContractNo");
        System.out.println("PoNumber: " + ContractNo);

        model.addAttribute("pid", pid);
        model.addAttribute("ContractNo", ContractNo);

        model.addAttribute("PONGwebserviceIp", NGwebservice_ip);
        return new ModelAndView("doacknowledgecontract");
    }

    @RequestMapping(value = "/uploadsignedcontract", method = RequestMethod.POST)
    public void uploadsignedcontract(@RequestParam("file_docDiv1") CommonsMultipartFile attachment1, @RequestParam("file_docDiv2") CommonsMultipartFile attachment2,
            @RequestParam("file_docDiv3") CommonsMultipartFile attachment3, @RequestParam("file_docDiv4") CommonsMultipartFile attachment4,
            @RequestParam("file_docDiv5") CommonsMultipartFile attachment5, @RequestParam("file_docDiv6") CommonsMultipartFile attachment6,
            HttpServletRequest request, HttpServletResponse response, Map<String, Object> modalMap) {
        PrintWriter out = null;
        try {
            System.out.println("uploadsignedcontract============");
            JSONObject jObj = new JSONObject();
            out = response.getWriter();

            String pid = request.getParameter("ro_pid");
            String poNumber = request.getParameter("ro_poNumber");

            System.out.println("pid in acknowledgecontract: " + pid);
            System.out.println("poNumber in acknowledgecontract: " + poNumber);
            System.out.println("file name 1 in acknowledgecontract: " + attachment1.getOriginalFilename());
            System.out.println("file name 2 in acknowledgecontract: " + attachment2.getOriginalFilename());
            System.out.println("file name 3 in acknowledgecontract: " + attachment3.getOriginalFilename());
            System.out.println("file name 4 in acknowledgecontract: " + attachment4.getOriginalFilename());
            System.out.println("file name 5 in acknowledgecontract: " + attachment5.getOriginalFilename());
            System.out.println("file name 6 in acknowledgecontract: " + attachment6.getOriginalFilename());
            if (!attachment1.getOriginalFilename().equalsIgnoreCase("")) {
                signedContractInput.setSignedContractattachment1(attachment1.getBytes());
                signedContractInput.setSignedContractattachmentname1(attachment1.getOriginalFilename());
            } else {
                signedContractInput.setSignedContractattachment1(null);
                signedContractInput.setSignedContractattachmentname1(null);
            }
            //
            if (!attachment2.getOriginalFilename().equalsIgnoreCase("")) {
                signedContractInput.setSignedContractattachment2(attachment2.getBytes());
                signedContractInput.setSignedContractattachmentname2(attachment2.getOriginalFilename());
            } else {
                signedContractInput.setSignedContractattachment2(null);
                signedContractInput.setSignedContractattachmentname2(null);
            }
            //
            if (!attachment3.getOriginalFilename().equalsIgnoreCase("")) {
                signedContractInput.setSignedContractattachment3(attachment3.getBytes());
                signedContractInput.setSignedContractattachmentname3(attachment3.getOriginalFilename());
            } else {
                signedContractInput.setSignedContractattachment3(null);
                signedContractInput.setSignedContractattachmentname3(null);
            }
            //
            if (!attachment4.getOriginalFilename().equalsIgnoreCase("")) {
                signedContractInput.setSignedContractattachment4(attachment4.getBytes());
                signedContractInput.setSignedContractattachmentname4(attachment4.getOriginalFilename());
            } else {
                signedContractInput.setSignedContractattachment4(null);
                signedContractInput.setSignedContractattachmentname4(null);
            }
            if (!attachment5.getOriginalFilename().equalsIgnoreCase("")) {
                signedContractInput.setSignedContractattachment5(attachment5.getBytes());
                signedContractInput.setSignedContractattachmentname5(attachment5.getOriginalFilename());
            } else {
                signedContractInput.setSignedContractattachment5(null);
                signedContractInput.setSignedContractattachmentname5(null);
            }
            if (!attachment6.getOriginalFilename().equalsIgnoreCase("")) {
                System.out.println("inisde setSignedContractattachmentname6");
                signedContractInput.setSignedContractattachment6(attachment6.getBytes());
                signedContractInput.setSignedContractattachmentname6(attachment6.getOriginalFilename());
            } else {
                signedContractInput.setSignedContractattachment6(null);
                signedContractInput.setSignedContractattachmentname6(null);
            }
            signedContractInput.setPID(pid);
            signedContractInput.setContractNumber(poNumber);

            String msg;
            try {
                msg = newgenUploadSignedContract(signedContractInput);
                System.out.println("msg: " + msg);
                jObj.put("Result", "Success");
            } catch (Exception e) {
                System.out.println("Exception : " + e);
                msg = "Failed to Upload Signed PO Copy to DMS!";
                jObj.put("Result", "Fail");
            }
            jObj.put("Message", msg);

            out.println(jObj);
        } catch (IOException ex) {
            Logger.getLogger(POManagement.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            if (out != null) {
                out.close();
            }
        }

    }

    String newgenUploadSignedContract(SignedContractInput signedPoInput) {
        RestTemplate restTemplate = new RestTemplate();
        String url = NGwebservice_ip + "/PR2POWebservice/ng/addDocument/Contract/SignedContract";
        info("url for newgenUploadSignedPO" + url);
        SignedContractoutput output = restTemplate.postForObject(URI.create(url), signedContractInput, SignedContractoutput.class);
        System.out.println("Message: " + output.getMessage());
        String message = output.getMessage();
//        String message = "PO Acknowledge Seccessfully";
        return message;
    }

    List<NGExtCM> findByContractCurrentWorkstepAndInitiatorId(String currentWorkstep, String initiatorID) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findByContractCurrentWorkstepAndInitiatorId.do?currentWorkstep=" + currentWorkstep + "&initiatorID=" + initiatorID;
        System.out.println("findByContractCurrentWorkstepAndInitiatorId url-->" + url);
        ResponseEntity<List<NGExtCM>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGExtCM>>() {
        });
        List<NGExtCM> list = response.getBody();
        return list;
    }

    @RequestMapping(value = "downloadcontractrfqformat")
    public ModelAndView downloadcontractrfqformat(@RequestParam("rfqid") int rfqid, @RequestParam("vendorid") int vendorid, HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        try (ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream()) {

            System.out.println("rfqid Contract" + rfqid);
            System.out.println("vendorid Contract " + vendorid);

            ContractRfqHeader rfqHeaderObj = findContractRfqHeaderById(rfqid);
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
            makeContractRfqFormat(document, request, rfqHeaderObj, vendorObj, buyerRfqLineItemBeanList);
            document.close();

            fileBytes = byteArrayOutputStream.toByteArray();
            System.out.println("fileBytes len:s" + fileBytes.length);

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

    void makeContractRfqFormat(Document document, HttpServletRequest request, ContractRfqHeader rfq, VendorDetails vendor, List<BuyerRfqLineItemBean> buyerRfqLineItemBeanList)
            throws DocumentException, BadElementException, IOException {

        Font font = new Font(Font.FontFamily.UNDEFINED, 10, Font.NORMAL);
        DateFormat df = new SimpleDateFormat("dd-MMM-yyyy");

        Paragraph para = new Paragraph();
        Paragraph subcontent;

        String path = request.getRequestURL().toString();
        System.out.println("path: " + path);

        String natSteelLogo = path.substring(0, path.indexOf("downloadcontractrfqformat.do")) + "assets/images/NatSteel-logo.jpg";
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
    List<ContractRfqHeader> findContractRfqHeaderByNumber(String rfqNo) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findRfqByRfqNumber.do?rfqNo=" + rfqNo;
        System.out.println("url findContractRfqHeaderById" + url);

        ResponseEntity<List<ContractRfqHeader>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ContractRfqHeader>>() {
        });
        List<ContractRfqHeader> rfqHeaderObj = prResponse.getBody();
        System.out.println("rfqHeaderObj in download :" + rfqHeaderObj);

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

    @RequestMapping(value = "/responsecontractmanagement")
    public ModelAndView querycontractManagement(@RequestParam("rfqid") int rfqid, @RequestParam("vendorid") int vendorid, ModelMap model) {
        System.out.println("responsecontractmanagement");

        System.out.println("rfqid in responsecontractmanagement" + rfqid);
        System.out.println("vendorid responsecontractmanagement " + vendorid);

        List<BuyerVendorNotification> buyerNotificationList = findBuyerVendorNotificationContractByRfqAndVendorId(rfqid, vendorid);

        model.put("NotificationList", buyerNotificationList);

        return new ModelAndView("responsecontractmanagement");
    }

    List<BuyerVendorNotification> findBuyerVendorNotificationContractByRfqAndVendorId(int rfqid, int vendorid) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findBuyerVendorNotificationContractByRfqAndVendorId.do?rfqid=" + rfqid + "&vendorid=" + vendorid;
        System.out.println("url: " + url);

        ResponseEntity<List<BuyerVendorNotification>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<BuyerVendorNotification>>() {
        });
        List<BuyerVendorNotification> buyerNotificationList = response.getBody();

        System.out.println("vendorList size: " + buyerNotificationList.size());

        return buyerNotificationList;
    }

    @RequestMapping(value = "/rfqcontractdata", method = RequestMethod.POST)
    public void rfqcontractdatamethod(HttpServletRequest request, HttpServletResponse response, HttpSession session) throws ParseException {

        PrintWriter out = null;
        System.out.println("inisde rfqcontractdata");
        try {
            String FieldsJSONArrayString = request.getParameter("FieldsJSONArrayString");
            String rfqid=request.getParameter("rfqid");
            String reqType=request.getParameter("reqType");
           
            System.out.println("FieldsJSONArrayString: " + FieldsJSONArrayString);
            out = response.getWriter();
            String contractRefId="";
            String vendorcode="",vendorname="",rfqno="";
            if (FieldsJSONArrayString != null && !FieldsJSONArrayString.trim().equalsIgnoreCase("")) {
                JSONArray FieldsJSONArray = new JSONArray(request.getParameter("FieldsJSONArrayString"));
                System.out.println("FieldsJSONArray: " + FieldsJSONArray);
                System.out.println("FieldsJSONArray Len: " + FieldsJSONArray.length());
                for (int i = 0; i < FieldsJSONArray.length(); i++) {
                    JSONObject DataAsJsonObj = FieldsJSONArray.getJSONObject(i);
                    
                    vendorcode=DataAsJsonObj.getString("vendorcode");
                    vendorname=DataAsJsonObj.getString("vendorname");
                    rfqno=DataAsJsonObj.getString("rfqno");
                    if (!"".equals(DataAsJsonObj.getString("contractRefId"))) {
                        contractRefId=DataAsJsonObj.getString("contractRefId");
                        cMHeaderAgreementInfo.setTransactionID(DataAsJsonObj.getString("contractRefId"));
                    } else {
                        cMHeaderAgreementInfo.setTransactionID("");
                    }
                    if (!"".equals(DataAsJsonObj.getString("duration"))) {
                        System.out.println("inside duration");
                        cMHeaderAgreementInfo.setDuration(DataAsJsonObj.getString("duration"));
                    } else {
                        cMHeaderAgreementInfo.setDuration("");
                    }
                    
                    if (!"".equals(DataAsJsonObj.getString("currency"))) {
                        System.out.println("inside currency");
                        cMHeaderAgreementInfo.setCurrency(DataAsJsonObj.getString("currency"));
                    } else {
                        cMHeaderAgreementInfo.setCurrency("");
                    }
                    if (!"".equals(DataAsJsonObj.getString("finalagreementvalue"))) {
                        System.out.println("inside finalagreementvalue");
                        BigDecimal bdnp = new BigDecimal(DataAsJsonObj.getString("finalagreementvalue"));
                        cMHeaderAgreementInfo.setFinalAgreementValue(bdnp);
                    } else {
                        cMHeaderAgreementInfo.setFinalAgreementValue(null);
                    }
                    DateFormat format = new SimpleDateFormat("dd-MM-yyyy");
                    String agreementdate=DataAsJsonObj.getString("agreementdate");
                    String validitystartdate=DataAsJsonObj.getString("validitystartdate");
                    String validityenddate=DataAsJsonObj.getString("validityenddate");
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
                        cMHeaderAgreementInfo.setValidityStartDate(validitystartdate1);
                        cMHeaderAgreementInfo.setValidityEndDate(validityenddate1);
                   
                    if (!"".equals(DataAsJsonObj.getString("agreementtype"))) {
                        System.out.println("inside agreementtype");
                        cMHeaderAgreementInfo.setAgreementType(DataAsJsonObj.getString("agreementtype"));
                    } else {
                        cMHeaderAgreementInfo.setAgreementType("");
                    }
                    
                    
                    //ola fields
                    if (!"".equals(DataAsJsonObj.getString("contractRefId"))) {
                        cMHeaderOLAInfo.setTransactionID(DataAsJsonObj.getString("contractRefId"));
                    } else {
                        cMHeaderOLAInfo.setTransactionID("");
                    }
                    if (!"".equals(DataAsJsonObj.getString("PurchOrganization"))) {
                        cMHeaderOLAInfo.setPurchaseOrganization(DataAsJsonObj.getString("PurchOrganization"));
                    } else {
                        cMHeaderOLAInfo.setPurchaseOrganization("");
                    }
                    if (!"".equals(DataAsJsonObj.getString("PurchaseGroup"))) {
                        cMHeaderOLAInfo.setPurchaseGroup(DataAsJsonObj.getString("PurchaseGroup"));
                    } else {
                        cMHeaderOLAInfo.setPurchaseGroup("");
                    }
                    if (!"".equals(DataAsJsonObj.getString("ItemIntervalNumber"))) {
                        cMHeaderOLAInfo.setItemIntervalNo(DataAsJsonObj.getString("ItemIntervalNumber"));
                    } else {
                        cMHeaderOLAInfo.setItemIntervalNo("");
                    }
                    if (!"".equals(DataAsJsonObj.getString("SubItemInterval"))) {
                        cMHeaderOLAInfo.setSubItemInterval(DataAsJsonObj.getString("SubItemInterval"));
                    } else {
                        cMHeaderOLAInfo.setSubItemInterval("");
                    }
                    if (!"".equals(DataAsJsonObj.getString("GRMessage"))) {
                        cMHeaderOLAInfo.setGR_Message(DataAsJsonObj.getString("GRMessage"));
                    } else {
                        cMHeaderOLAInfo.setGR_Message("");
                    }
                    //terms of delivery payment
                    if (!"".equals(DataAsJsonObj.getString("contractRefId"))) {

                        cMHeaderTermsDPInfo.setTransactionID(DataAsJsonObj.getString("contractRefId"));
                    } else {
                        cMHeaderTermsDPInfo.setTransactionID("");
                    }
                    if (!"".equals(DataAsJsonObj.getString("AgreedPaymentTerms"))) {
                        cMHeaderTermsDPInfo.setAgreedPaymentTerms(DataAsJsonObj.getString("AgreedPaymentTerms"));
                    } else {
                        cMHeaderTermsDPInfo.setAgreedPaymentTerms("");
                    }
                    if (!"".equals(DataAsJsonObj.getString("paymentindays"))) {
                        BigDecimal bdnp = new BigDecimal(DataAsJsonObj.getString("paymentindays"));
                        cMHeaderTermsDPInfo.setPaymentIndefault(bdnp);
                    } else {
                        cMHeaderTermsDPInfo.setPaymentIndefault(null);
                    }
                    if (!"".equals(DataAsJsonObj.getString("paymentinperc"))) {
                        BigDecimal bdnp = new BigDecimal(DataAsJsonObj.getString("paymentinperc"));
                        cMHeaderTermsDPInfo.setPaymentInPercdefault(bdnp);
                    } else {
                        cMHeaderTermsDPInfo.setPaymentInPercdefault(null);
                    }
                    if (!"".equals(DataAsJsonObj.getString("paymentindays2"))) {
                        BigDecimal bdnp = new BigDecimal(DataAsJsonObj.getString("paymentindays2"));
                        cMHeaderTermsDPInfo.setPaymentIn(bdnp);
                    } else {
                        cMHeaderTermsDPInfo.setPaymentIn(null);
                    }
                    if (!"".equals(DataAsJsonObj.getString("paymentinperc2"))) {
                        BigDecimal bdnp = new BigDecimal(DataAsJsonObj.getString("paymentinperc2"));
                        cMHeaderTermsDPInfo.setPaymentInPerc(bdnp);
                    } else {
                        cMHeaderTermsDPInfo.setPaymentInPerc(null);
                    }
                    if (!"".equals(DataAsJsonObj.getString("paymentindaysnet"))) {
                        BigDecimal bdnp = new BigDecimal(DataAsJsonObj.getString("paymentindaysnet"));
                        cMHeaderTermsDPInfo.setPaymentInDaysNet(bdnp);
                    } else {
                        cMHeaderTermsDPInfo.setPaymentInDaysNet(null);
                    }
                    if (!"".equals(DataAsJsonObj.getString("ExchangeRate"))) {
                        BigDecimal bdnp = new BigDecimal(DataAsJsonObj.getString("ExchangeRate"));
                        cMHeaderTermsDPInfo.setExchangeRate(bdnp);
                    } else { 
                        cMHeaderTermsDPInfo.setExchangeRate(null);
                    }
                    if (!"".equals(DataAsJsonObj.getString("ExchangeRateFixed"))) {
                      //  BigDecimal bdnp = new BigDecimal(DataAsJsonObj.getString("ExchangeRateFixed"));
                        cMHeaderTermsDPInfo.setExchangeRateFixed(DataAsJsonObj.getString("ExchangeRateFixed"));
                    } else {
                        cMHeaderTermsDPInfo.setExchangeRateFixed("");
                    }
                    
                    if (!"".equals(DataAsJsonObj.getString("IncotermsPart1"))) {
                        cMHeaderTermsDPInfo.setIncotermsPart1(DataAsJsonObj.getString("IncotermsPart1"));
                    } else {
                        cMHeaderTermsDPInfo.setIncotermsPart1("");
                    }
                    if (!"".equals(DataAsJsonObj.getString("IncotermsPart2"))) {
                        cMHeaderTermsDPInfo.setIncotermsPart2(DataAsJsonObj.getString("IncotermsPart2"));
                    } else {
                        cMHeaderTermsDPInfo.setIncotermsPart2("");
                    }

                    //reference
                    if (!"".equals(DataAsJsonObj.getString("contractRefId"))) {
                        cMHeaderReferenceInfo.setTransactionID(DataAsJsonObj.getString("contractRefId"));
                    } else {
                        cMHeaderReferenceInfo.setTransactionID("");
                    }
                    if (!"".equals(DataAsJsonObj.getString("YourReference"))) {
                        cMHeaderReferenceInfo.setYourReference(DataAsJsonObj.getString("YourReference"));
                    } else {
                        cMHeaderReferenceInfo.setYourReference("");
                    }
                    if (!"".equals(DataAsJsonObj.getString("SalesPerson"))) {
                        cMHeaderReferenceInfo.setSalesPerson(DataAsJsonObj.getString("SalesPerson"));
                    } else {
                        cMHeaderReferenceInfo.setSalesPerson("");
                    }
                    if (!"".equals(DataAsJsonObj.getString("OurReference"))) {
                        cMHeaderReferenceInfo.setOurReference(DataAsJsonObj.getString("OurReference"));
                    } else {
                        cMHeaderReferenceInfo.setOurReference("");
                    }
                    if (!"".equals(DataAsJsonObj.getString("Telephone"))) {
                        cMHeaderReferenceInfo.setTelephone(DataAsJsonObj.getString("Telephone"));
                    } else {
                        cMHeaderReferenceInfo.setTelephone("");
                    }
                    if (!"".equals(DataAsJsonObj.getString("SupplVendor"))) {
                        cMHeaderReferenceInfo.setSupplVendor(DataAsJsonObj.getString("SupplVendor"));
                    } else {
                        cMHeaderReferenceInfo.setSupplVendor("");
                    }
                    if (!"".equals(DataAsJsonObj.getString("InvoicingParty"))) {
                        cMHeaderReferenceInfo.setInvoicingParty(DataAsJsonObj.getString("InvoicingParty"));
                    } else {
                        cMHeaderReferenceInfo.setInvoicingParty("");
                    }
                    // cMHeaderReferenceInfo.setSno(Integer.parseInt(DataAsJsonObj.getString("insertionID")));
                }

                List<CMHeaderAgreementInfo> cmHeaderAgInfoList = findContractHeaderAgreementInfo(cMHeaderAgreementInfo.getTransactionID());
                List<CMHeaderOLAInfo> cmHeaderOLAInfoList = findContractHeaderOLAInfo(cMHeaderOLAInfo.getTransactionID());
                List<CMHeaderTermsDPInfo> cmHeaderTermsDPInfoList = findContractHeaderTermsDPInfo(cMHeaderTermsDPInfo.getTransactionID());
                List<CMHeaderReferenceInfo> cmHeaderReferenceInfoList = findContractReferenceInfo(cMHeaderReferenceInfo.getTransactionID());
                String msgAgreement = "", msgOla = "", msgterms = "", Reference = "";
                if (cmHeaderAgInfoList.size() > 0) {
                    cMHeaderAgreementInfo.setSno(cmHeaderAgInfoList.get(0).getSno());
                    msgAgreement = updateAgreementData(cMHeaderAgreementInfo);
                } else {
                    msgAgreement = saveAgreementData(cMHeaderAgreementInfo);
                }
                if (cmHeaderOLAInfoList.size() > 0) {
                    cMHeaderOLAInfo.setSno(cmHeaderOLAInfoList.get(0).getSno());
                    msgOla = updateOLA(cMHeaderOLAInfo);
                } else {
                    msgOla = saveOLA(cMHeaderOLAInfo);
                }
                if (cmHeaderTermsDPInfoList.size() > 0) {
                    cMHeaderTermsDPInfo.setSno(cmHeaderTermsDPInfoList.get(0).getSno());
                    msgterms = updateTerms(cMHeaderTermsDPInfo);
                } else {
                    msgterms = saveTerms(cMHeaderTermsDPInfo);
                }
                if (cmHeaderReferenceInfoList.size() > 0) {
                    cMHeaderReferenceInfo.setSno(cmHeaderReferenceInfoList.get(0).getSno());
                    Reference = updateReference(cMHeaderReferenceInfo);
                } else {
                    Reference = saveReference(cMHeaderReferenceInfo);
                }

                System.out.println("msgAgreement :" + msgAgreement);
                System.out.println("msgOla :" + msgOla);
                System.out.println("msgterms :" + msgterms);
                System.out.println("Reference :" + Reference);
            }
            //arjunchandra   

            String FieldsJSONArrayStringList = request.getParameter("FieldsJSONArrayStringList");
            System.out.println("FieldsJSONArrayStringList: " + FieldsJSONArrayStringList);
            JSONObject jObj = new JSONObject();
            List<NewgenContractLineItem> contractLineList= new ArrayList<NewgenContractLineItem>();
            if (FieldsJSONArrayStringList != null && !FieldsJSONArrayStringList.trim().equalsIgnoreCase("")) {
                JSONArray FieldsJSONArrayList = new JSONArray(request.getParameter("FieldsJSONArrayStringList"));
                System.out.println("FieldsJSONArrayList: " + FieldsJSONArrayList);
                System.out.println("FieldsJSONArrayList Len: " + FieldsJSONArrayList.length());
                for (int i = 0; i < FieldsJSONArrayList.length(); i++) {

                    JSONObject jsonObject1 = FieldsJSONArrayList.getJSONObject(i);
                    String itemnumber = jsonObject1.getString("itemnumber");
                    String accassignment = jsonObject1.getString("accassignment");
                    String itemcategory = jsonObject1.getString("itemcategory");
                    String materialCode = jsonObject1.getString("materialCode");
                    String shorttext = jsonObject1.getString("shorttext");
                    String targQty = jsonObject1.getString("targQty");
                    String matllongtext = jsonObject1.getString("matllongtext");
                    String uom = jsonObject1.getString("uom");
                    String ppu = jsonObject1.getString("ppu");
                    String opu = jsonObject1.getString("opu");
                    String np = jsonObject1.getString("np");
                    String plant = jsonObject1.getString("plant");
                    String matlgroup = jsonObject1.getString("matlgroup");
                    String Sloc = jsonObject1.getString("Sloc");
                    String linkId = jsonObject1.getString("linkId");
                    
                    String itemText = jsonObject1.getString("itemText");
                    String ItemNote = jsonObject1.getString("ItemNote");
                    String noteToApprover = jsonObject1.getString("noteToApprover");
                    
                    // String insertionID = jsonObject1.getString("insertionID");
                    System.out.println("itemnumber :" + itemnumber);
                    System.out.println("accassignment :" + accassignment);
                    System.out.println("itemcategory :" + itemcategory);
                    System.out.println("shorttext :" + shorttext);
                    System.out.println("matllongtext :" + matllongtext);
                    System.out.println("uom :" + uom);
                    System.out.println("ppu :" + ppu);
                    System.out.println("opu :" + opu);
                    System.out.println("np :" + np);
                    System.out.println("plant :" + plant);
                    System.out.println("matlgroup :" + matlgroup);
                    System.out.println("linkId :" + linkId);
                    BigDecimal bdnp = new BigDecimal(np);
                    
                    BigDecimal bdtargQty = new BigDecimal(targQty);
                    

                    if (!"".equals(jsonObject1.getString("contractRefId"))) {
                        System.out.println("jsonObject1:" + jsonObject1.getString("contractRefId"));
                        newgenContractLineItem.setTransactionID(jsonObject1.getString("contractRefId"));
                    } else {
                        newgenContractLineItem.setTransactionID("");
                    }

                    if (itemnumber.length() != 0) {

                        newgenContractLineItem.setItemNumber(itemnumber);
                    } else {
                        newgenContractLineItem.setItemNumber("");
                    }
                    if (accassignment.length() != 0) {

                        newgenContractLineItem.setAccountAssignment(accassignment);
                    } else {
                        newgenContractLineItem.setAccountAssignment("");
                    }
                    if (itemcategory.length() != 0) {

                        newgenContractLineItem.setItemCategory(itemcategory);
                    } else {
                        newgenContractLineItem.setItemCategory("");
                    }
                    
                    if (materialCode.length() != 0) {

                        newgenContractLineItem.setMaterialCode(materialCode);
                    } else {
                        newgenContractLineItem.setMaterialCode("");
                    }
                    
                    if (shorttext.length() != 0) {

                        newgenContractLineItem.setShortText(shorttext);
                    } else {
                        newgenContractLineItem.setShortText("");
                    }
                    
                    if (targQty.length() != 0) {

                        newgenContractLineItem.setTargetedQuantity(bdtargQty);
                    } else {
                        newgenContractLineItem.setTargetedQuantity(null);
                    }
                    
                    if (matllongtext.length() != 0) {

                        newgenContractLineItem.setMatlLongText(matllongtext);
                    } else {
                        newgenContractLineItem.setMatlLongText("");
                    }
                    if (uom.length() != 0) {

                        newgenContractLineItem.setUoM(uom);
                    } else {
                        newgenContractLineItem.setUoM("");
                    }
                    if (ppu.length() != 0) {

                        newgenContractLineItem.setPerPriceUnit(ppu);
                    } else {
                        newgenContractLineItem.setPerPriceUnit("");
                    }
                    if (opu.length() != 0) {

                        newgenContractLineItem.setOrderPriceUnit(opu);
                    } else {
                        newgenContractLineItem.setOrderPriceUnit("");
                    }
                    if (np.length() != 0) {

                        newgenContractLineItem.setNetPrice(bdnp);
                    } else {
                        newgenContractLineItem.setNetPrice(null);
                    }
                    if (plant.length() != 0) {

                        newgenContractLineItem.setPlant(plant);
                    } else {
                        newgenContractLineItem.setPlant("");
                    }
                    if (matlgroup.length() != 0) {

                        newgenContractLineItem.setMatlGroup(matlgroup);
                    } else {
                        newgenContractLineItem.setMatlGroup("");
                    }
                    if (linkId.length() != 0) {

                        newgenContractLineItem.setLinkid(linkId);
                    } else {
                        newgenContractLineItem.setLinkid("");
                    }
                    
                    if (Sloc.length() != 0) {

                        newgenContractLineItem.setStorageLocation(Sloc);
                    } else {
                        newgenContractLineItem.setStorageLocation("");
                    }
                    
                    newgenContractLineItem.setItemNote(ItemNote);
                    newgenContractLineItem.setItemText(itemText);
                    newgenContractLineItem.setNotetoApprover(noteToApprover);
                    
                    Authentication auth = SecurityContextHolder.getContext().getAuthentication();

                    BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();

                    newgenContractLineItem.setBpBuyerdetailsId(buyer);
                    
                    List<NewgenContractLineItem> ContractList = findContractItemByTransactionAndItem(jsonObject1.getString("contractRefId"), itemnumber);
                    contractLineList.add(newgenContractLineItem);
                    String NGContractItem = "";
                    if (ContractList.size() > 0) {
                        newgenContractLineItem.setInsertionOrderID(ContractList.get(0).getInsertionOrderID());
                        NGContractItem = updateNGLineData(newgenContractLineItem);
                    } else {
                        NGContractItem = saveNGLineData(newgenContractLineItem);
                    }
                    //String NGlineitem = saveNGLineData(newgenContractLineItem);
                    System.out.println("NGContractItem :" + NGContractItem);

                }
                
                
                String ServiceItemJSONList = request.getParameter("ServiceItemJSONList");
                System.out.println("ServiceItemJSONList: " + ServiceItemJSONList);
                JSONObject jObj1 = new JSONObject();
                if (ServiceItemJSONList != null && !ServiceItemJSONList.trim().equalsIgnoreCase("")) {
                    JSONArray ServiceItemList = new JSONArray(request.getParameter("ServiceItemJSONList"));
                    System.out.println("ServiceItemList: " + ServiceItemList);
                    System.out.println("ServiceItemList Len: " + ServiceItemList.length());
                    for (int i = 0; i < ServiceItemList.length(); i++) {

                        JSONObject jsonObject1 = ServiceItemList.getJSONObject(i);
                        System.out.println("jsonObject1 size-->"+jsonObject1.length());
                        String itemnumber = jsonObject1.getString("itemnumber");
                         
                        String ServiceNumber = jsonObject1.getString("ServiceNumber");
                        String ShortText = jsonObject1.getString("ShortText");
                        String Unit = jsonObject1.getString("Unit");
                        String Serv_Quantity = jsonObject1.getString("Serv_Quantity");
                        String GrossPrice = jsonObject1.getString("GrossPrice");
                        String Edition = jsonObject1.getString("Edition");
                        String Currency = jsonObject1.getString("Currency");
                        String serlinkId = jsonObject1.getString("serlinkId");
                        System.out.println("i-->"+i);
                        System.out.println("serlinkId-->"+serlinkId);
                        String conlinkId = jsonObject1.getString("contlinkId");
                        // String insertionID = jsonObject1.getString("insertionID");

                        cMHeaderServicesInfo.setLineItemNo(itemnumber);
                        cMHeaderServicesInfo.setTransactionID(contractRefId);
                        cMHeaderServicesInfo.setServiceNo(ServiceNumber);
                        cMHeaderServicesInfo.setShortText(ShortText);
                        cMHeaderServicesInfo.setUnit(Unit);
                        cMHeaderServicesInfo.setQuantity(Serv_Quantity);
                        cMHeaderServicesInfo.setGrossPrice(GrossPrice);
                        cMHeaderServicesInfo.setEdition(Edition);
                        cMHeaderServicesInfo.setCurrency(Currency);
                        cMHeaderServicesInfo.setServLinkId(serlinkId);
                        cMHeaderServicesInfo.setLinkId(conlinkId);
                
                       List<CMHeaderServicesInfo> serviceList = findServiceBySerLinkId(serlinkId);
                        System.out.println("serviceList-->"+serviceList.size());
                        String NGServItem = "";
                        if (serviceList.size() > 0) {
                            System.out.println("serlinkId"+serlinkId);
                            System.out.println("Update Service");
                            System.out.println("serviceList-->"+serviceList.size());
                            cMHeaderServicesInfo.setInsertionOrderID(serviceList.get(0).getInsertionOrderID());
                            NGServItem = updateNGServiceData(cMHeaderServicesInfo);
                        } else {
                            System.out.println("serlinkId"+serlinkId);
                            System.out.println("Inert Service");
                            System.out.println("serviceList-->"+serviceList.size());
                            NGServItem = saveNGServiceData(cMHeaderServicesInfo);
                        }
                        System.out.println("NGServItem :" + NGServItem);

                    }
                    
                } 

                String AccItemJSONList = request.getParameter("AccItemJSONList");
                System.out.println("AccItemJSONList: " + AccItemJSONList);
                JSONObject jObjAcc = new JSONObject();
                if (AccItemJSONList != null && !AccItemJSONList.trim().equalsIgnoreCase("")) {
                    JSONArray AccItemList = new JSONArray(request.getParameter("AccItemJSONList"));
                    System.out.println("AccItemList: " + AccItemList);
                    System.out.println("AccItemList Len: " + AccItemList.length());
                    for (int i = 0; i < AccItemList.length(); i++) {

                        JSONObject jsonObject1 = AccItemList.getJSONObject(i);
                        System.out.println("jsonObject1 size-->"+jsonObject1.length());
                        String unloadingPoint = jsonObject1.getString("unloadingPoint");
                       
                        String recipient = jsonObject1.getString("recipient");
                        String accLinkID = jsonObject1.getString("accLinkID");
                        String gLAccount = jsonObject1.getString("gLAccount");
                        String coArea = jsonObject1.getString("coArea");
                        String costCenterAccAsgn = jsonObject1.getString("costCenterAccAsgn");
                        String accAsgnOrder = jsonObject1.getString("accAsgnOrder");
                        String accAsgnAsset = jsonObject1.getString("accAsgnAsset");
                        String accAsgnWBSElementInput = jsonObject1.getString("accAsgnWBSElementInput");
                        String accAsgnSalesOrder = jsonObject1.getString("accAsgnSalesOrder");
                        String assAsgnItemNumber = jsonObject1.getString("assAsgnItemNumber");
                        String assAsgnDelivSch = jsonObject1.getString("assAsgnDelivSch");
                        String assAsgnQuantity = jsonObject1.getString("assAsgnQuantity");
                        String assAsgnPercentage = jsonObject1.getString("assAsgnPercentage");
                        String accAsgnfund = jsonObject1.getString("accAsgnfund");
                        String accAsgnfunctionalArea = jsonObject1.getString("accAsgnfunctionalArea");
                        String accAsgnFundCenterInput = jsonObject1.getString("accAsgnFundCenterInput");
                        String accAsgnCommItemInput = jsonObject1.getString("accAsgnCommItemInput");
                        String accAsgnNActNumInput = jsonObject1.getString("accAsgnNActNumInput");
                        String distribution = jsonObject1.getString("distribution");
                        
                        System.out.println("i-->"+i);
                        System.out.println("accLinkID-->"+accLinkID);
                       // String conlinkId = jsonObject1.getString("contlinkId");
                        // String insertionID = jsonObject1.getString("insertionID");
                        cMHeaderAccountAssignInfo.setUnLoadPoint(unloadingPoint);
                        cMHeaderAccountAssignInfo.setTransactionID(contractRefId);
                        cMHeaderAccountAssignInfo.setReceipient(recipient);
                        cMHeaderAccountAssignInfo.setLinkID(accLinkID);
                        cMHeaderAccountAssignInfo.setGLAccount(gLAccount);
                        cMHeaderAccountAssignInfo.setCOArea(coArea);
                        cMHeaderAccountAssignInfo.setCostCenter(costCenterAccAsgn);
                        cMHeaderAccountAssignInfo.setOrdr(accAsgnOrder);
                        cMHeaderAccountAssignInfo.setAsset(accAsgnAsset);
                        cMHeaderAccountAssignInfo.setWBSElement(accAsgnWBSElementInput);
                        cMHeaderAccountAssignInfo.setSalesOrder(accAsgnSalesOrder);
                        cMHeaderAccountAssignInfo.setItemNo(assAsgnItemNumber);
                        cMHeaderAccountAssignInfo.setDeliverySchedule(assAsgnDelivSch);
                        
                        
                        BigDecimal qtybdnp = null;
                        if(!assAsgnQuantity.equalsIgnoreCase("")){
                            qtybdnp = new BigDecimal(assAsgnQuantity);
                        }
                        BigDecimal perbdnp = null;
                        if(!assAsgnPercentage.equalsIgnoreCase("")){
                            perbdnp = new BigDecimal(assAsgnPercentage);
                        }
                        
                        
                        cMHeaderAccountAssignInfo.setQuantity(qtybdnp);
                        cMHeaderAccountAssignInfo.setPercentage(perbdnp);
                        cMHeaderAccountAssignInfo.setFund(accAsgnfund);
                        cMHeaderAccountAssignInfo.setFunctionalArea(accAsgnfunctionalArea);
                        cMHeaderAccountAssignInfo.setFundsCentre(accAsgnFundCenterInput);
                        cMHeaderAccountAssignInfo.setCommitmentItem(accAsgnCommItemInput);
                        cMHeaderAccountAssignInfo.setNetwork(accAsgnNActNumInput);
                        cMHeaderAccountAssignInfo.setDistribution(distribution);
                        System.out.println("Testing..................................");
                        List<CMHeaderAccountAssignInfo> accList = findAccByLinkIdPID(accLinkID,contractRefId,assAsgnItemNumber);
                        
                        System.out.println("accList-->"+accList.size());
                        String NGServItem = "";
                        if (accList.size() > 0) {
                            System.out.println("serlinkId"+accLinkID);
                            System.out.println("Update Service");
                            System.out.println("serviceList-->"+accList.size());
                            cMHeaderAccountAssignInfo.setSno(accList.get(0).getSno());
                            NGServItem = updateNGAccData(cMHeaderAccountAssignInfo);
                        } else {
                            System.out.println("serlinkId"+accLinkID);
                            System.out.println("Inert Service");
                            System.out.println("serviceList-->"+accList.size());
                            NGServItem = saveNGAccData(cMHeaderAccountAssignInfo);
                        }
                        System.out.println("NGServItem :" + NGServItem);
                        
                        moveWIInput.setProcessInstanceId(contractRefId);
                        
                        moveWIInput.setWorkitemId("1");
                        //newgenContractComplete(moveWIInput);
                        
                        

                    }
//                    jObj.put("status", "success");
//                    out.println(jObj);
                } else {
                    jObj.put("status", "failed");
                    out.println(jObj);
                }
                
                List<NGExtCM> ngExtCM = findContractHeaderByPId(contractRefId);
                System.out.println("vendorcode-->"+vendorcode);
                System.out.println("vendorname-->"+vendorname);
                System.out.println("rfqno-->"+rfqno);
                NGExtCM newgenExt = ngExtCM.get(0);
                if(reqType.equalsIgnoreCase("Create")){ 
                List<CMHeaderAgreementInfo> cmHeaderAgInfo = findContractHeaderAgreementInfo(contractRefId);
                List<CMHeaderOLAInfo> cmHeaderOLAInfo = findContractHeaderOLAInfo(contractRefId);
                List<CMHeaderTermsDPInfo> cmHeaderTermsDPInfo = findContractHeaderTermsDPInfo(contractRefId);
                List<CMHeaderReferenceInfo> cmHeaderReferenceInfo = findContractReferenceInfo(contractRefId);

                
                newgenExt.setVendorCode(vendorcode);
                newgenExt.setVendorName(vendorname);
                newgenExt.setrFQNo(rfqno);
                newgenExt.setInitiatorID("pankaj");
                nGUploadInputBean.setNgExtCM(newgenExt);
                System.out.println("vendorcode"+newgenExt.getVendorCode());
                System.out.println("vendorname"+newgenExt.getVendorName());
                System.out.println("Company"+newgenExt.getCompanyCode());
                System.out.println("Initiator"+newgenExt.getInitiatorID());
                System.out.println("Date"+newgenExt.getIntiatiatedDate());
                System.out.println("RFQ"+newgenExt.getrFQNo());
                System.out.println("RequestFor"+newgenExt.getRequestFor());
                System.out.println("ContractType"+newgenExt.getContractType());
                nGUploadInputBean.setcMHeaderAgreementInfo(cmHeaderAgInfo.get(0));
                nGUploadInputBean.setcMHeaderOLAInfo(cmHeaderOLAInfo.get(0));
                nGUploadInputBean.setcMHeaderReferenceInfo(cmHeaderReferenceInfo.get(0));
                nGUploadInputBean.setcMHeaderTermsDPInfo(cmHeaderTermsDPInfo.get(0));
                nGUploadInputBean.setQ_NG_Cmplx_CM_Line_Data(contractLineList);
                
                byte[] fileBytes = null;
                try (ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream()) {
                    List<ContractRfqHeaderVendorMapping> rfqVendorMappingList = findContractRfqHeaderVendorMappingByRfqId(Integer.parseInt(rfqid));
                    Document document = new Document();
                    PdfWriter writer = PdfWriter.getInstance(document, byteArrayOutputStream);
                    writer.setPageEvent(new OrderEvaluationFooter());
                    document.open();
                    downloadAttachment.makeContractVenoroComparisionReport(document, rfqVendorMappingList);;
                    document.close();

                    fileBytes = byteArrayOutputStream.toByteArray();
                } catch (DocumentException | FileNotFoundException ex) {
                    Logger.getLogger(DownloadAttachment.class.getName()).log(Level.SEVERE, null, ex);
                } catch (IOException ex) {
                    Logger.getLogger(DownloadAttachment.class.getName()).log(Level.SEVERE, null, ex);
                }
                byte[] fileBytes1 = null;
                try (ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream()) {
                    List<ContractRfqHeaderVendorMapping> rfqVendorMappingList = findContractRfqHeaderVendorMappingByRfqId(Integer.parseInt(rfqid));
                    List<BuyerContractRfqLineItemBean> buyerRfqLineItemBeanList = downloadAttachment.callBuyerRfqContractLineItemStoredProcedure(Integer.parseInt(rfqid));
                    Workbook workbook = new HSSFWorkbook();
//                    workbook = downloadAttachment.createContractVendorComparisionExcelReport(workbook, rfqVendorMappingList, buyerRfqLineItemBeanList);
                    workbook.write(byteArrayOutputStream);
                    fileBytes1 = byteArrayOutputStream.toByteArray();

                } catch (IOException ex) {
                    Logger.getLogger(DownloadAttachment.class.getName()).log(Level.SEVERE, null, ex);
                }
                nGUploadInputBean.setVSCAttachment(fileBytes);
                nGUploadInputBean.setSOQAttachment(fileBytes1);
            }
                System.out.println("reqType-->"+reqType);
                if(reqType.equalsIgnoreCase("Edit") || reqType.equalsIgnoreCase("Cancel")){
                    rejectWiInput.setWorkitemId(contractRefId);
                    if(reqType.equalsIgnoreCase("Edit")){
                        rejectWiInput.setRejectReason("HOD_Verification");
                    }else{
                        rejectWiInput.setRejectReason("Reject");
                    }
                  
                    String maincode=newgenFlowControl(rejectWiInput);
                    if(maincode.equals("0")){
                        jObj.put("status", "Success");
                    jObj.put("WorkItemNo", contractRefId);
                    } else {
                    jObj.put("status", "failed");
                    jObj.put("WorkItemNo", "");
                }
                out.println(jObj);
                }else{
                
                OutputBean output = newgencreateContract(nGUploadInputBean);
                System.out.println("WorkItemNo-->" + output.getProcessInstanceID());
                if (output.getProcessInstanceID().length() > 0) {
                    jObj.put("status", "Success");
                    jObj.put("WorkItemNo", output.getProcessInstanceID());
                } else {
                    jObj.put("status", "failed");
                    jObj.put("WorkItemNo", "");
                }
                out.println(jObj);
                }
                
            } else {
                jObj.put("status", "failed");
                out.println(jObj);
            }
        } catch (IOException ex) {
            System.out.println("exception :" + ex);

        } finally {
            if (out != null) {
                out.close();
            }
        }
        //return new ModelAndView("createrfqforcontract");

    }

    String saveNGLineData(NewgenContractLineItem quantity) {
        System.out.println("iisde saveNGLineData");
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveNGLineData.do"), quantity, String.class);
        System.out.println("saveNGLineData :" + msg);
        return msg;
    }

    String updateNGLineData(NewgenContractLineItem service) {
        System.out.println("inside updateNGLineData");
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updateNGLineData.do"), service, String.class);
        System.out.println("updateNGLineData :" + msg);
        return msg;
    }

    String saveNGServiceData(CMHeaderServicesInfo service) {
        System.out.println("inside saveNGServiceData");
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveNGServiceData.do"), service, String.class);
        System.out.println("saveNGServiceData :" + msg);
        return msg;
    }

    String updateNGServiceData(CMHeaderServicesInfo service) {
        System.out.println("inside updateNGServiceData");
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updateNGServiceData.do"), service, String.class);
        System.out.println("updateNGServiceData :" + msg);
        return msg;
    }
    
    String saveNGAccData(CMHeaderAccountAssignInfo acc) {
        System.out.println("inside saveNGAccData");
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveNGAccData.do"), acc, String.class);
        System.out.println("saveNGAccData :" + msg);
        return msg;
    }

    String updateNGAccData(CMHeaderAccountAssignInfo acc) {
        System.out.println("inside updateNGAccData");
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updateNGAccData.do"), acc, String.class);
        System.out.println("updateNGAccData :" + msg);
        return msg;
    }
    

    List<CMHeaderServicesInfo> findServiceByTransactionAndItem(String pid, String ItemNumber) {
        RestTemplate restTemplate = new RestTemplate();
        System.out.println("pid-->" + pid);
        System.out.println("ItemNumber-->" + ItemNumber);
        String url = webservice_ip + "/BuyerPortalWebServices/findServiceByTransactionAndItem.do?pid=" + pid + "&ItemNumber=" + ItemNumber;
        System.out.println("url-->" + url);
        ResponseEntity<List<CMHeaderServicesInfo>> service = restTemplate.exchange(url, HttpMethod.GET, null,
                new ParameterizedTypeReference<List<CMHeaderServicesInfo>>() {
        });
        System.out.println("serviceList: " + service);
        List<CMHeaderServicesInfo> serviceList = service.getBody();
        return serviceList;
    }

    List<CMHeaderServicesInfo> findServiceByLinkId(String LinkID) {
        RestTemplate restTemplate = new RestTemplate();
        System.out.println("LinkID-->" + LinkID);

        String url = webservice_ip + "/BuyerPortalWebServices/getContServiceByLinkID.do?linkId=" + LinkID;
        System.out.println("url-->" + url);
        ResponseEntity<List<CMHeaderServicesInfo>> service = restTemplate.exchange(url, HttpMethod.GET, null,
                new ParameterizedTypeReference<List<CMHeaderServicesInfo>>() {
        });
        System.out.println("serviceList: " + service);
        List<CMHeaderServicesInfo> serviceList = service.getBody();
        return serviceList;
    }
    
     List<CMHeaderServicesInfo> findServiceBySerLinkId(String LinkID) {
        RestTemplate restTemplate = new RestTemplate();
        System.out.println("LinkID-->" + LinkID);

        String url = webservice_ip + "/BuyerPortalWebServices/findServiceBySerLinkId.do?SerLinkId=" + LinkID;
        System.out.println("url-->" + url);
        ResponseEntity<List<CMHeaderServicesInfo>> service = restTemplate.exchange(url, HttpMethod.GET, null,
                new ParameterizedTypeReference<List<CMHeaderServicesInfo>>() {
        });
        System.out.println("serviceList: " + service);
        List<CMHeaderServicesInfo> serviceList = service.getBody();
        return serviceList;
    }
     
     List<CMHeaderAccountAssignInfo> findAccByLinkIdPID(String LinkID,String PID,String Item) {
        RestTemplate restTemplate = new RestTemplate();
        System.out.println("LinkID-->" + LinkID);
        System.out.println("PID-->" + PID);
        System.out.println("Item-->" + Item);

        String url = webservice_ip + "/BuyerPortalWebServices/findAccByLinkIdPID.do?LinkId=" + LinkID+"&PID=" + PID+"&Item=" + Item;
        System.out.println("url-->" + url);
        ResponseEntity<List<CMHeaderAccountAssignInfo>> accList = restTemplate.exchange(url, HttpMethod.GET, null,
                new ParameterizedTypeReference<List<CMHeaderAccountAssignInfo>>() {
        });
        System.out.println("accList: " + accList);
        List<CMHeaderAccountAssignInfo> acc = accList.getBody();
        return acc;
    }

    List<NewgenContractLineItem> findContractItemByTransactionAndItem(String pid, String ItemNumber) {
        RestTemplate restTemplate = new RestTemplate();
        System.out.println("pid-->" + pid);
        System.out.println("ItemNumber-->" + ItemNumber);
        String url = webservice_ip + "/BuyerPortalWebServices/findContractItemByTransactionAndItem.do?pid=" + pid + "&ItemNumber=" + ItemNumber;
        System.out.println("url-->" + url);
        ResponseEntity<List<NewgenContractLineItem>> contractItemList = restTemplate.exchange(url, HttpMethod.GET, null,
                new ParameterizedTypeReference<List<NewgenContractLineItem>>() {
        });
        System.out.println("contractItemList: " + contractItemList);
        List<NewgenContractLineItem> contractItem = contractItemList.getBody();
        return contractItem;
    }

    String saveAgreementData(CMHeaderAgreementInfo quantity) {
        System.out.println("iisde saveAgreementData");
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveAgreementData.do"), quantity, String.class);
        System.out.println("CMHeaderAgreementInfo :" + msg);
        return msg;
    }

    String saveOLA(CMHeaderOLAInfo quantity) {
        System.out.println("iisde saveOLA");
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveOLA.do"), quantity, String.class);
        System.out.println("saveOLA :" + msg);
        return msg;
    }

    String saveTerms(CMHeaderTermsDPInfo quantity) {
        System.out.println("iisde saveTerms");
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveTerms.do"), quantity, String.class);
        System.out.println("saveTerms :" + msg);
        return msg;
    }

    String saveReference(CMHeaderReferenceInfo quantity) {
        System.out.println("iisde CMHeaderReferenceInfo");
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/saveReference.do"), quantity, String.class);
        System.out.println("saveReference :" + msg);
        return msg;
    }
    public static String strCurDate1 = "";
    //FormConfig formConfig = FormContext.getCurrentInstance().getFormConfig();
    //String sPrcsInstId = formConfig.getConfigElement("ProcessInstanceId");


    public static void info(String strText) {
        // //System.out.println("Inside Log Generation");

 

        int logcount = 0;
        String strLogFilePath = "";
        GregorianCalendar cal = new GregorianCalendar();
        SimpleDateFormat sdfs = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
        File objDirs = null;
//        if (WriteLOG.equalsIgnoreCase("y")) {
        try {
            strLogFilePath = System.getProperty("user.dir") + File.separator + "Process_Logs" + File.separator + "BuyerPortal" + File.separator + cal.get(Calendar.DAY_OF_MONTH) + "-"
                    + (cal.get(Calendar.MONTH) + 1) + "-" + cal.get(Calendar.YEAR);
            // //System.out.println("strLogFilePath_logGen :"+strLogFilePath);
            strCurDate1 = sdfs.format(cal.getTime());
            objDirs = new File(strLogFilePath);
            objDirs.mkdirs();
            strLogFilePath = strLogFilePath + File.separator +"general.log";

 

            File objDirs1 = new File(strLogFilePath);

 

            while (true) {
                if (new File(objDirs1.getAbsolutePath() + "_" + logcount).length() > 0) {
                    logcount++;
                    continue;
                }
                if (objDirs1.length() > (1024 * 1024 * 10)) {
                    objDirs1.renameTo(new File(objDirs1.getAbsolutePath() + "_" + logcount));
                    break;
                }
                break;
            }
            FileOutputStream os = new FileOutputStream(strLogFilePath, true);
            String strNewLine = "\n";
            String strspace = "\t";
            byte[] dat = strCurDate1.getBytes();
            byte[] bspaceLine = strspace.getBytes();
            byte[] bNewLine = strNewLine.getBytes();
            byte[] bText = strText.getBytes();
            os.write(bNewLine);
            os.write(dat);
            os.write(bspaceLine);
            os.write(bText);
            //os.write(bNewLine);
            os.close();
        } catch (Exception e) {
            //System.out.println("exception in writing to log " + e.getMessage());
            e.printStackTrace();
        } finally {
            if (strLogFilePath != null) {
                strLogFilePath = null;
            }
            if (cal != null) {
                cal = null;
            }
            if (objDirs != null) {
                objDirs = null;
            }
        }
    
	}
    String updateAgreementData(CMHeaderAgreementInfo cMHeaderAgreementInfo) {
        System.out.println("inside updateAgreementData");
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updateAgreementData.do"), cMHeaderAgreementInfo, String.class);
        System.out.println("updateAgreementData :" + msg);
        return msg;
    }

    String updateOLA(CMHeaderOLAInfo cMHeaderOLAInfo) {
        System.out.println("inside updateOLA");
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updateOLA.do"), cMHeaderOLAInfo, String.class);
        System.out.println("updateOLA :" + msg);
        return msg;
    }

    String updateTerms(CMHeaderTermsDPInfo cMHeaderTermsDPInfo) {
        System.out.println("inside updateTerms");
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updateTerms.do"), cMHeaderTermsDPInfo, String.class);
        System.out.println("updateTerms :" + msg);
        return msg;
    }

    String updateReference(CMHeaderReferenceInfo cMHeaderReferenceInfo) {
        System.out.println("inside updateReference");
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updateReference.do"), cMHeaderReferenceInfo, String.class);
        System.out.println("updateReference :" + msg);
        return msg;
    }
    
    OutputBean newgencreateContract(NGUploadInputBean nGUploadInputBean) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip+"/ContractManagement/ng/ngservice/CreateOLA";
//        String url = NGwebservice_ip + "/PR2POWebservice/ng/addDocument/PR/RFQ";newgencreateContract(nGUploadInputBean);
        System.out.println("url: " + url);
        
        OutputBean str = restTemplate.postForObject(URI.create(url), nGUploadInputBean, OutputBean.class);
        
      //  Output_Resp outputBean = restTemplate.postForObject(URI.create(url), PRLineDocInput, Output_Resp.class);
        
        return str;
    }
    
    String newgenFlowControl(RejectWIInput newgenRoutingDetails) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip+"/ContractManagement/ng/Contract/CompleteContract";
        System.out.println("url: " + url);
        OutputBean outputBean = restTemplate.postForObject(URI.create(url), newgenRoutingDetails, OutputBean.class);
        System.out.println("mappingid: " + outputBean.getMaincode());

        String mainCode = outputBean.getMaincode();
        return mainCode;
    }
    
     MoveWIOutPut newgenContractComplete(MoveWIInput PRLineDocInput) {
        RestTemplate restTemplate = new RestTemplate();
        String url = NGwebservice_ip + "/PR2POWebservice/ng/service/Contract/CompleteWI";
//        String url = NGwebservice_ip + "/PR2POWebservice/ng/addDocument/PR/RFQ";
        System.out.println("url: " + url);
        
        MoveWIOutPut str = restTemplate.postForObject(URI.create(url), PRLineDocInput, MoveWIOutPut.class);
        
      //  Output_Resp outputBean = restTemplate.postForObject(URI.create(url), PRLineDocInput, Output_Resp.class);
        
        return str;
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
     public List<MasterVendor> findMasterVendorByVendorCode(String vendorcode) {
        System.out.println("vendorcode: " + vendorcode);

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findmastervendorbyvendorcode.do?vendorcode=" + vendorcode;
        System.out.println("url: " + url);

        ResponseEntity<List<MasterVendor>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterVendor>>() {
        });
        List<MasterVendor> vendor = response.getBody();
        return vendor;
    }
     
     POPaymentTermsOP getPamentTermDays(String paymentTerm){
         RestTemplate restTemplate = new RestTemplate();
        String url = "https://natsteeluat.newgenbpmcloud.com/WebServiceCall/PO_ListPaymentTerms?PaymentTerm=" + paymentTerm;;
        System.out.println("url: " + url);
        POPaymentTermsOP pOPaymentTermsOP = restTemplate.postForObject(URI.create(url), paymentTerm, POPaymentTermsOP.class);
        System.out.println("mappingid: " + pOPaymentTermsOP.getMainCode());

        String mainCode = pOPaymentTermsOP.getMainCode();
        return pOPaymentTermsOP;
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

}

//        System.out.println("path :" + path);
//        File f = new File(path);
//        if (f.exists() == false) {
//            f.mkdirs();
//        }
//        MultipartRequest mrequest = null;
//        response.setContentType("text/html;charset=ISO8859_1");
//        mrequest = new MultipartRequest(request, path, 200 * 1024 * 1024, "ISO8859_1") {};
//        try {
//            File[] files = new File(f.getAbsolutePath()).listFiles();
//            for (File file : files) {
//                if (file.isFile()) {
//                    results.add(f.getAbsolutePath() + "\\" + file.getName());
//                    pathName = f.getAbsolutePath() + "\\" + file.getName();
//                }
//            }
//        }
//         catch (Exception ex) {
//            System.out.println("Exception in save docs :: " + ex);
//         }
//        return new ModelAndView("redirect:/SpendAnalysisReport.do");
//    
//}

