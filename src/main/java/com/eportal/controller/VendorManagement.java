/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.controller;

import com.eportal.entities.BuyerDetails;
import com.eportal.entities.BuyerVendorNotification;
import com.eportal.entities.CountryMaster;
import com.eportal.entities.EmailTriggerDetails;
import com.eportal.entities.MasterCountry;
import com.eportal.entities.MasterCurrency;
import com.eportal.entities.ProspectMaster;
import com.eportal.entities.VendorDetails;
import com.eportal.entities.VendorGroup;
import com.eportal.entities.VendorGroupMapping;
import com.eportal.entities.MasterVendor;
import com.eportal.entities.PaymentTermsMaster;
import com.eportal.entities.ReportBuyerAuditLog;
import com.eportal.util.MailTrigger;
import com.eportal.webservice.util.PurchaseOrderWS;
import com.eportal.webservice.util.RfqRfpWS;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URI;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

/**
 *
 * @author admin
 */
@RestController
public class VendorManagement {

    @Autowired
    VendorDetails vendorDetails;

    @Autowired
    VendorGroup vendorGroup;

    @Autowired
    VendorGroupMapping vendorGroupMapping;

    @Autowired
    ProspectMaster prospectMaster;

    @Value("${webservice.ip}")
    private String webservice_ip;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    BuyerVendorNotification buyerVendorNotification;
    @Autowired
    CountryMaster countryMaster;
    @Autowired
    ReportBuyerAuditLog reportBuyerAuditLog;

    @Value("${defailt_password}")
    private String defailt_password;
    @Autowired
    EmailTriggerDetails emailTriggerDetails;
    @Autowired
    MailTrigger mailTriggerUtil;
    @Autowired
    RfqRfpWS rfqRfpUtilWS;
    @Autowired
    PurchaseOrderWS purchaseOrderWSUtil;
    @Autowired
    VendorDetails vendorDetailsEntity;

//  private static final Logger logger = Logger.getLogger(VendorManagement.class);
    @RequestMapping(value = "/createvendor")
    public ModelAndView createVendor(Map<String, Object> map, ModelMap model, HttpSession session, HttpServletRequest request) {
        System.out.println("createvendor");

        List<MasterCountry> countryList = rfqRfpUtilWS.getAllMasterCountry();
        List<VendorDetails> vendorList = getAllVendor();
        List<PaymentTermsMaster> paymentterm = getAllPaymentTerms();
        List<MasterCurrency> currencyList = getAllCurrency();

//        List<MasterVendor> vendorMasterList = findMasterVendorByBpIsMappedNot("Yes");
        model.put("countryList", countryList);
        model.put("vendor", vendorList);
//        model.put("vendorMasterList", vendorMasterList);
        model.put("defailt_password", defailt_password);
        model.put("paymentterm", paymentterm);
        model.put("currencyList", currencyList);

        return new ModelAndView("createvendor");
    }

    @RequestMapping(value = "/savevendordetails", method = RequestMethod.POST)
    public ModelAndView saveVendorDetails(@ModelAttribute("user") VendorDetails vendorDetails, HttpServletRequest request, HttpServletResponse response, HttpSession session, Map<String, Object> modelMap, RedirectAttributes redirect) {
        System.out.println("vendor");

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();

        System.out.println("password 1: " + vendorDetails.getPassword());
        System.out.println("password 2: " + passwordEncoder.encode(vendorDetails.getPassword()));
        String pass = vendorDetails.getPassword();
        String ro_notifyvendor = request.getParameter("ro_notifyvendor");
        System.out.println("ro_notifyvendor" + ro_notifyvendor);

        String vendorCode = vendorDetails.getCode();

        RestTemplate restTemplate = new RestTemplate();

        Date date = new Date();
        vendorDetails.setCreatedate(date);
        vendorDetails.setUpdatedate(date);
        vendorDetails.setType("Vendor");
        vendorDetails.setIsVendorRegistered("No");
        vendorDetails.setIsRequestSent("No");
        vendorDetails.setPassword(passwordEncoder.encode(vendorDetails.getPassword()));
        vendorDetails.setStatus("Active");
        vendorDetails.setNotifyvendor(ro_notifyvendor);

        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/vendordetailsservice.do"), vendorDetails, String.class);
        System.out.println("msg: " + msg);

        List<MasterVendor> vendorMasterList = findMasterVendorByVendorCode(vendorCode);
        System.out.println("vendorMasterList size: " + vendorMasterList.size());

        if (!vendorMasterList.isEmpty()) {
            MasterVendor vendorMasterObj = vendorMasterList.get(0);
            vendorMasterObj.setBpIsMapped("Yes");
            updateVendorMaster(vendorMasterObj);
        }
        redirect.addFlashAttribute("create", "success");

        reportBuyerAuditLog.setActivityPerformed(vendorDetails.getUsername() + " new vendor created.");
        reportBuyerAuditLog.setCreatedate(new Date());
        reportBuyerAuditLog.setNgBpBuyerdetailsId(buyer);
        saveBuyerAuditLogReport(reportBuyerAuditLog);

        if (ro_notifyvendor != null && ro_notifyvendor.equals("Yes")) {
            emailTriggerDetails.setMailFrom("do-not-reply@natsteel.com.sg");
            emailTriggerDetails.setMailContentType("text/html;charset=UTF-8"); // default
            emailTriggerDetails.setMailMessage("Username: " + vendorDetails.getUsername() + "<br>Password: " + pass);
            emailTriggerDetails.setMailSubject(" Vendor Portal Username/Password ");
            emailTriggerDetails.setMailTo(vendorDetails.getEmailid());
             emailTriggerDetails.setMailStatus("N");
            mailTriggerUtil.TriggerMail(emailTriggerDetails);
        }
        return new ModelAndView("redirect:/createvendor.do");
    }

    @RequestMapping(value = "/updatedetails", method = RequestMethod.POST)
    public ModelAndView updateDetails(HttpServletRequest request, HttpServletResponse response, HttpSession session, Map<String, Object> map, RedirectAttributes redirect) {

        System.out.println("update details");
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();

        String code = request.getParameter("update_code");
        String organization = request.getParameter("update_organization");
        String fname = request.getParameter("update_firstname");
        String lname = request.getParameter("update_lastname");
        String city = request.getParameter("update_city");
        String country = request.getParameter("update_country");
        String address = request.getParameter("update_address");
        String postalcode = request.getParameter("update_postalcode");
        String emailid = request.getParameter("update_emailid");
        String spocname = request.getParameter("update_spocname");
        String spocemail = request.getParameter("update_spocemail");
        String vendoremailauto = request.getParameter("update_vendoremailAuto");
        String cnumberoff = request.getParameter("update_contactnumberoff");
        String cnumbermob = request.getParameter("update_contactnumbermob");
        String cnumberfax = request.getParameter("update_contactnumberfax");
        String paymentterm = request.getParameter("update_paymentTerms");
        String ordercurrency = request.getParameter("update_ordercurrency");
        String natureofpurchase = request.getParameter("update_natureOfPurchase");
        String companyregnumber = request.getParameter("update_companyRegNumber");
        String gstregnumber = request.getParameter("update_gstRegNumber");
        String notifyvendor = request.getParameter("update_notifyvendor");
        String uname = request.getParameter("update_username");
//        String upswrd = request.getParameter("update_password");

        String id = request.getParameter("update_id");
        int uid = Integer.parseInt(id);

        VendorDetails vendor = findVendorById((uid));

//        vendor.setCode(code);
        vendor.setOrganization(organization);
        vendor.setFirstname(fname);
        vendor.setLastname(lname);
        vendor.setCity(city);
        vendor.setCountry(country);
        vendor.setAddress(address);
        vendor.setEmailid(emailid);
        vendor.setSpocname(spocname);
        vendor.setSpocemail(spocemail);
        vendor.setVendoremailAuto(vendoremailauto);
        vendor.setContactnumberoff(cnumberoff);
        vendor.setContactnumbermob(cnumbermob);
        vendor.setContactnumberfax(cnumberfax);
        vendor.setPaymentTerms(paymentterm);
        vendor.setOrdercurrency(ordercurrency);
        vendor.setNatureOfPurchase(natureofpurchase);
        vendor.setCompanyRegNumber(companyregnumber);
        vendor.setGstRegNumber(gstregnumber);
        vendor.setNotifyvendor(notifyvendor);
        vendor.setUsername(uname);
        vendor.setStatus("Active");
//        vendorDetails.setPassword(upswrd);
        vendor.setId(uid);
        vendor.setUpdatedate(new Date());

        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updatevendor.do"), vendor, String.class);
        System.out.println("vendor : " + result);

        redirect.addFlashAttribute("update", "success");

        reportBuyerAuditLog.setActivityPerformed(vendor.getUsername() + " vendor updated.");
        reportBuyerAuditLog.setCreatedate(new Date());
        reportBuyerAuditLog.setNgBpBuyerdetailsId(buyer);
        saveBuyerAuditLogReport(reportBuyerAuditLog);

        return new ModelAndView("redirect:/createvendor.do");

    }

    @RequestMapping(value = "propectmanagement", method = RequestMethod.GET)
    public ModelAndView prospectManagement(ModelMap model) {
        System.out.println("propectmanagement");

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        System.out.println("buyer role: " + buyer.getRole());

        List<MasterCountry> countryList = rfqRfpUtilWS.getAllMasterCountry();
        List<VendorDetails> prospectList = getAllProspect();

        if (buyer.getRole() != null && buyer.getRole().equals("ROLE_ADMIN")) {
//            List<MasterVendor> vendorMasterList = findMasterVendorByBpIsMappedNot("Yes");
//            model.put("vendorMasterList", vendorMasterList);
        }

        model.put("countryList", countryList);
        model.put("ProspectList", prospectList);

        return new ModelAndView("prospectmanagement");
    }

    @RequestMapping(value = "/saveprospect", method = RequestMethod.POST)
    public ModelAndView saveProspect(@ModelAttribute("user") VendorDetails prospect, HttpServletRequest request, HttpServletResponse response, RedirectAttributes redirect) {
        System.out.println("saveprospect");

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();

        Date date = new Date();
        String emailid = request.getParameter("contactemailid");
        prospect.setEmailid(emailid);
        String[] emailArr = emailid.split("@");
//        String username =request.getParameter("username");
        if (emailArr.length != 0) {
            System.out.println("emailArr[0]: " + emailArr[0]);
            List<VendorDetails> allUsername = getAllUsername(emailArr[0]);
            System.out.println("allUsername size: " + allUsername.size());
            if (allUsername.isEmpty()) {
                prospect.setUsername(emailArr[0]);
                prospect.setProspectIdNumberSeq(0);
            } else {
                prospect.setUsername(emailArr[0] + "" + (allUsername.get(0).getProspectIdNumberSeq() + 1));
                prospect.setProspectIdNumberSeq(0);

                VendorDetails oldProspect = allUsername.get(0);
                oldProspect.setProspectIdNumberSeq(oldProspect.getProspectIdNumberSeq() + 1);
                updateProspect(oldProspect);
            }
        }
        String password = request.getParameter("password");
        prospect.setCreatedate(date);
        prospect.setUpdatedate(date);
        prospect.setType("Prospect");
        prospect.setPassword(passwordEncoder.encode(password));
        prospect.setStatus("Active");
        prospect.setIsRequestSent("No");
        prospect.setIsVendorRegistered("No");
        prospect.setIsPasswordUpdated("No");
        prospect.setIsPersonalInfoUpdated("No");

        String id = saveProspect(prospect);

        VendorDetails newProspect = findVendorById(Integer.parseInt(id));

        reportBuyerAuditLog.setActivityPerformed(prospect.getProspectvendorname() + " Prospect Created");
        reportBuyerAuditLog.setCreatedate(new Date());
        reportBuyerAuditLog.setNgBpBuyerdetailsId(buyer);
        saveBuyerAuditLogReport(reportBuyerAuditLog);

//        emailTriggerDetails.setMailCC(");
        emailTriggerDetails.setMailFrom("do-not-reply@natsteel.com.sg");
        emailTriggerDetails.setMailContentType("text/html;charset=UTF-8"); // default
        emailTriggerDetails.setMailMessage("Kindly login in to vendor portal and self register for submitting bids.");
        emailTriggerDetails.setMailSubject("Login in to vendor portal");
        emailTriggerDetails.setMailTo(prospect.getEmailid());

        String MailTrigger = mailTriggerUtil.TriggerMail(emailTriggerDetails);
        System.out.println("MailTrigger :" + MailTrigger);

        redirect.addFlashAttribute("create", "" + newProspect.getUsername());

        return new ModelAndView("redirect:/propectmanagement.do");
    }

    @RequestMapping(value = "/updateprospect", method = RequestMethod.POST)
    public ModelAndView updateProspect(HttpServletRequest request, HttpServletResponse response, HttpSession session, Map<String, Object> map, RedirectAttributes redirect) {

        System.out.println("update details");
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();

        String vendorcode = request.getParameter("code");
        System.out.println("vendorcode: " + vendorcode);

        String update_prospectvendorname = request.getParameter("update_prospectvendorname");
        String update_country = request.getParameter("update_country");
        String update_address = request.getParameter("update_address");
        String update_contactfirstname = request.getParameter("update_contactfirstname");
        String update_countrycode = request.getParameter("update_countrycode");
        String update_contactnumberOff = request.getParameter("update_contactnumberOff");
        String update_contactnumberHp = request.getParameter("update_contactnumberHp");
        String update_emailaddress = request.getParameter("update_emailaddress");
        String update_faxnumber = request.getParameter("update_faxnumber");

        String id = request.getParameter("prospect_id");
        int prospect_id = Integer.parseInt(id);

        VendorDetails prospect = findVendorById(prospect_id);

        if (vendorcode != null && !vendorcode.trim().equals("")) {
            prospect.setCode(vendorcode);
            prospect.setIsVendorRegistered("Yes");
            prospect.setType("Vendor");
        } else {
            prospect.setIsVendorRegistered("No");
            prospect.setType("Prospect");
        }
        prospect.setProspectvendorname(update_prospectvendorname);
        prospect.setCountry(update_country);
        prospect.setAddress(update_address);
        prospect.setContactfirstname(update_contactfirstname);
        prospect.setCountrycode(update_countrycode);
        prospect.setContactnumberoff(update_contactnumberOff);
        prospect.setContactnumberHp(update_contactnumberHp);
        prospect.setContactemailid(update_emailaddress);
        prospect.setContactnumberfax(update_faxnumber);
        prospect.setIsPasswordUpdated("Yes");
        prospect.setIsRequestSent("No");

        updateProspect(prospect);

        if (vendorcode != null && !vendorcode.trim().equals("")) {
            List<MasterVendor> vendorMasterList = purchaseOrderWSUtil.findMasterVendorByVendorCode(vendorcode);
            if (!vendorMasterList.isEmpty()) {
                MasterVendor vendorMasterObj = vendorMasterList.get(0);
                vendorMasterObj.setBpIsMapped("Yes");
                purchaseOrderWSUtil.updateVendorMaster(vendorMasterObj);
            }
        }

        reportBuyerAuditLog.setActivityPerformed(update_prospectvendorname + " Prospect Updated");
        reportBuyerAuditLog.setCreatedate(new Date());
        reportBuyerAuditLog.setNgBpBuyerdetailsId(buyer);
        saveBuyerAuditLogReport(reportBuyerAuditLog);

        redirect.addFlashAttribute("update", "success");

        return new ModelAndView("redirect:/propectmanagement.do");

    }

    @RequestMapping(value = "/saveprospectfromrfq", method = RequestMethod.POST)
    public void saveProspectFromRfq(@ModelAttribute("user") VendorDetails prospect, HttpServletRequest request, HttpServletResponse response, RedirectAttributes modal) {
        System.out.println("saveprospectfromrfq");

        Date date = new Date();

        PrintWriter out = null;
        try {
            System.out.println("submitrfqprlineattachment============");

            JSONArray jArra = new JSONArray();
            JSONObject jObj = new JSONObject();

            out = response.getWriter();

            prospect.setCreatedate(date);
            prospect.setUpdatedate(date);
            prospect.setType("Prospect");
            prospect.setStatus("Active");
            prospect.setIsRequestSent("No");
            prospect.setIsVendorRegistered("No");
            prospect.setEmailid(prospect.getContactemailid());

            String prospectId = saveProspect(prospect);

            //        emailTriggerDetails.setMailCC(");
            emailTriggerDetails.setMailFrom("do-not-reply@natsteel.com.sg");
            emailTriggerDetails.setMailContentType("text/html;charset=UTF-8"); // default
            emailTriggerDetails.setMailMessage("Kindly login in to vendor portal and self register for submitting bids.");
            emailTriggerDetails.setMailSubject("Login in to vendor portal");
            emailTriggerDetails.setMailTo(prospect.getContactemailid());

            String MailTrigger = mailTriggerUtil.TriggerMail(emailTriggerDetails);
            System.out.println("MailTrigger :" + MailTrigger);

            jObj.put("ProspectId", prospectId);

            out.println(jObj);

        } catch (IOException ex) {
            java.util.logging.Logger.getLogger(RfqRfpManagement.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            if (out != null) {
                out.close();
            }
        }
    }

    @RequestMapping(value = "/vendorgrouping")
    public ModelAndView vendorGrouping(ModelMap model, HttpSession session, HttpServletRequest request) {
        System.out.println("vendorgrouping");

//        List<VendorDetails> vendorList = getAllVendor();
//        List<VendorDetails> prospectList = getAllProspect();
        List<VendorGroup> vendorGroupList = getAllVendorGroup();

//        model.addAttribute("VendorList", vendorList);
//        model.addAttribute("ProspectList", prospectList);
        model.addAttribute("VendorGroupList", vendorGroupList);

        return new ModelAndView("vendorgrouping");
    }

    @RequestMapping(value = "/createvendorgroup")
    public ModelAndView createVendorGroup(ModelMap model, HttpSession session, HttpServletRequest request) {
        System.out.println("createvendorgroup");

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();

        String vendorIdsForNewGroup = request.getParameter("vendorIdsForNewGroup");
        String sapVendorCodeForNewGroup = request.getParameter("sapVendorCodeForNewGroup");
        String GroupName = request.getParameter("groupname");

        System.out.println("vendorIdsForNewGroup: " + vendorIdsForNewGroup);
        System.out.println("sapVendorCodeForNewGroup: " + sapVendorCodeForNewGroup);
        System.out.println("GroupName: " + GroupName);

        // Save Vendor Group
        vendorGroup.setGroupname(GroupName);
        String groupid = saveVendorGroup(vendorGroup);
    
        // SAP Vendor
        String newVendorIds = "";
        if (sapVendorCodeForNewGroup != null && !sapVendorCodeForNewGroup.trim().equals("")) {
            List<MasterVendor> sapVendorMasterList = purchaseOrderWSUtil.findVendorMasterByMultipleVendorCode(sapVendorCodeForNewGroup);
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
            if (vendorIdsForNewGroup != null && !vendorIdsForNewGroup.trim().equals("")) {
                vendorIdsForNewGroup += "," + newVendorIds;
            } else {
                vendorIdsForNewGroup = newVendorIds;
            }
            System.out.println("newVendorIds 2: " + vendorIdsForNewGroup);
        }

        List<VendorDetails> vendorList = findByMultipleVendorId(vendorIdsForNewGroup);
        System.out.println("vendorList size: " + vendorList.size());
        VendorGroup group = findVendorGroupById(Integer.parseInt(groupid));
        
        // Make group mapping in NG_BP_vendor_group_mapping
        for (VendorDetails vendor : vendorList) {

            vendorGroupMapping.setNgBpVendorGroupId(group);
            vendorGroupMapping.setNgBpVendordetailsId(vendor);

            saveVendorGroupMapping(vendorGroupMapping);
        }

        reportBuyerAuditLog.setActivityPerformed(GroupName + " Vendor Group Created.");
        reportBuyerAuditLog.setCreatedate(new Date());
        reportBuyerAuditLog.setNgBpBuyerdetailsId(buyer);
        saveBuyerAuditLogReport(reportBuyerAuditLog);

        return new ModelAndView("redirect:/vendorgrouping.do");
    }

    @RequestMapping(value = "/vendors")
    public ModelAndView vendors(ModelMap model, HttpSession session, HttpServletRequest request) {
        System.out.println("vendors");

        List<VendorDetails> vendorList = getAllVendor();

        model.addAttribute("VendorList", vendorList);

        return new ModelAndView("vendors");
    }

    @RequestMapping(value = "/resetvendorpassword")
    public ModelAndView resetVendorPassword(HttpServletRequest request, RedirectAttributes redirect) {
        System.out.println("resetvendorerpassword");
        String vendorid = request.getParameter("vendorid");

        System.out.println("vendorid in resetvendorpassword :" + vendorid);
        VendorDetails vendorObj = findVendorById(Integer.parseInt(vendorid));
        System.out.println("defailt_password :" + defailt_password);
        vendorObj.setPassword(passwordEncoder.encode(defailt_password));
        vendorObj.setUpdatedate(new Date());
        vendorObj.setIsPasswordUpdated("No");
        String msg = updateVendor(vendorObj);
        System.out.println("msg in resetvendorpassword :" + msg);
        redirect.addFlashAttribute("msg", "PasswordUpdated");

        if (vendorObj.getNotifyvendor() != null && vendorObj.getNotifyvendor().equals("Yes")) {

            emailTriggerDetails.setMailFrom("do-not-reply@natsteel.com.sg");
            emailTriggerDetails.setMailContentType("text/html;charset=UTF-8"); // default
            emailTriggerDetails.setMailMessage(defailt_password + " is new password, please try login");
            emailTriggerDetails.setMailSubject(" Vendor Portal Password Reset ");
            emailTriggerDetails.setMailTo(vendorObj.getEmailid());

            String MailTrigger = mailTriggerUtil.TriggerMail(emailTriggerDetails);
            System.out.println("MailTrigger :" + MailTrigger);
        }

        return new ModelAndView("redirect:/createvendor.do");
    }

    @RequestMapping(value = "/vendornotification")
    public ModelAndView vendorNotification(@RequestParam("vendorid") int vendorId, ModelMap model, HttpSession session, HttpServletRequest request) {
        System.out.println("vendornotification");

        System.out.println("vendorId: " + vendorId);

        List<BuyerVendorNotification> notificationList = findBuyerVendorNotificationByVendorId(vendorId);

        model.addAttribute("NotificationList", notificationList);

        return new ModelAndView("vendornotification");
    }

    @RequestMapping(value = "/makevendornotification", method = RequestMethod.POST)
    public ModelAndView makeVendorNotification(@RequestParam("customFile") CommonsMultipartFile attachment, ModelMap model, HttpServletRequest request, RedirectAttributes modal) {
        System.out.println("makevendornotification");

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        int buyerid = buyer.getId();

        String fileName = attachment.getOriginalFilename();
        long fileSize = attachment.getSize();

        System.out.println("fileName: " + fileName);
        System.out.println("fileSize: " + fileSize);

        String notification = request.getParameter("editordata");
        String vendorid = request.getParameter("vendorid");

        System.out.println("vendorid: " + vendorid);
        System.out.println("buyerid: " + buyerid);
        System.out.println("notification: " + notification);

        VendorDetails vendorDetailsObj = findVendorById(Integer.parseInt(vendorid));
        BuyerDetails buyerDetailsObj = findBuyerById(buyerid);

        System.out.println("vendorDetailsObj: " + vendorDetailsObj);
        System.out.println("buyerDetailsObj: " + buyerDetailsObj);

        buyerVendorNotification.setNotification(notification);
        buyerVendorNotification.setCommentdate(new Date());
        buyerVendorNotification.setCommentby("Admin");
        buyerVendorNotification.setNgBpBuyerdetailsId(buyerDetailsObj);
        buyerVendorNotification.setNgBpVendordetailsId(vendorDetailsObj);
        buyerVendorNotification.setNgBpWorkorderrfqheaderRfqid(null);
        buyerVendorNotification.setReadstatus("false");
        buyerVendorNotification.setNotificationtype("VendorNotification");
        buyerVendorNotification.setUrl("buyernotification.do?buyerid=" + buyerid);

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

        return new ModelAndView("redirect:/vendornotification.do?vendorid=" + vendorid);
    }

    @RequestMapping(value = "/makevendornotificationtoallvendors", method = RequestMethod.POST)
    public ModelAndView makeNotificationToAllVendors(@RequestParam("customFile") CommonsMultipartFile attachment, HttpServletRequest request, RedirectAttributes model) {
        System.out.println("makevendornotificationtoallvendors");

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        int buyerid = buyer.getId();

        String fileName = attachment.getOriginalFilename();
        long fileSize = attachment.getSize();

        System.out.println("fileName: " + fileName);
        System.out.println("fileSize: " + fileSize);

        String notification = request.getParameter("editordata");
        String vendorids = request.getParameter("vendorids");

        String[] vendorIdArray = null;
        if (vendorids != null) {
//            vendorids = vendorids.substring(0, vendorids.length() - 1);
            vendorIdArray = vendorids.split(",");
        }

        System.out.println("vendorids: " + vendorids);
        System.out.println("buyerid: " + buyerid);
        System.out.println("notification: " + notification);

        BuyerDetails buyerDetailsObj = findBuyerById(buyerid);

        for (String vendorId : vendorIdArray) {
            VendorDetails vendorDetailsObj = findVendorById(Integer.parseInt(vendorId));

            buyerVendorNotification.setNotification(notification);
            buyerVendorNotification.setCommentdate(new Date());
            buyerVendorNotification.setCommentby("Admin");
            buyerVendorNotification.setNgBpBuyerdetailsId(buyerDetailsObj);
            buyerVendorNotification.setNgBpVendordetailsId(vendorDetailsObj);
            buyerVendorNotification.setNgBpWorkorderrfqheaderRfqid(null);
            buyerVendorNotification.setReadstatus("false");
            buyerVendorNotification.setNotificationtype("VendorNotification");
            buyerVendorNotification.setUrl("buyernotification.do?buyerid=" + buyerid);

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

        }

        model.addFlashAttribute("message", "Message sent successfully.");
        return new ModelAndView("redirect:/vendors.do");
    }

    @RequestMapping(value = "/authorizevendor", method = RequestMethod.GET)
    public ModelAndView authorizeVendor(ModelMap model) {
        System.out.println("authorizevendor");
        List<VendorDetails> vendorList = getAllUnauthorizeVendor();
        System.out.println("Unauthorize vendor list size :" + vendorList.size());
        model.addAttribute("VendorList", vendorList);
        return new ModelAndView("authorizevendor");
    }

    public String saveProspect(VendorDetails prospect) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/vendordetailsservice.do";

        String id = restTemplate.postForObject(URI.create(url), prospect, String.class);

        System.out.println("id: " + id);

        return id;
    }

    @RequestMapping(value = "/changegroupname", method = RequestMethod.POST)
    public ModelAndView changeGroupName(HttpServletRequest request) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();

        String groupname = request.getParameter("updategroupname");
        String groupid = request.getParameter("changegroup_id");

        System.out.println("groupname in changegroupname :" + groupname);
        System.out.println("groupid in changegroupname :" + groupid);

        VendorGroup groupObj = findVendorGroupById(Integer.parseInt(groupid));

        System.out.println("Name in groupObj :" + groupObj.getGroupname());

        groupObj.setGroupname(groupname);
        String msg = updateVendorGroup(groupObj);

        reportBuyerAuditLog.setActivityPerformed("Vendor Group Name Changed.");
        reportBuyerAuditLog.setCreatedate(new Date());
        reportBuyerAuditLog.setNgBpBuyerdetailsId(buyer);
        saveBuyerAuditLogReport(reportBuyerAuditLog);

        return new ModelAndView("redirect:/vendorgrouping.do");
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

    public String updateProspect(VendorDetails prospect) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/updatevendor.do";

        String msg = restTemplate.postForObject(URI.create(url), prospect, String.class);

        System.out.println("msg: " + msg);

        return msg;
    }

    public List<VendorDetails> getAllVendor() {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/getallvendor.do";

        ResponseEntity<List<VendorDetails>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<VendorDetails>>() {
        });

        System.out.println("response: " + response);
        List<VendorDetails> vendorList = response.getBody();

        return vendorList;
    }

    String saveVendorGroup(VendorGroup vendorgroup) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/savevendorgroup.do";
        System.out.println("url: " + url);

        String groupid = restTemplate.postForObject(URI.create(url), vendorgroup, String.class);
        System.out.println("groupid: " + groupid);

        return groupid;
    }

    String saveVendorGroupMapping(VendorGroupMapping vendorgroupmapping) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/savevendorgroupmapping.do";
        System.out.println("url: " + url);

        String mappingid = restTemplate.postForObject(URI.create(url), vendorgroupmapping, String.class);
        System.out.println("mappingid: " + mappingid);

        return mappingid;
    }

    public VendorGroup findVendorGroupById(int groupid) {
        System.out.println("groupid: " + groupid);

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findvendorgroupbyid.do?groupid=" + groupid;
        System.out.println("url: " + url);

        ResponseEntity<VendorGroup> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<VendorGroup>() {
        });
        VendorGroup vendorgroup = response.getBody();

        return vendorgroup;

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

    List<BuyerVendorNotification> findBuyerVendorNotificationByVendorId(int vendorid) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findbuyervendornotificationbyvendorid.do?vendorid=" + vendorid;
        System.out.println("url: " + url);

        ResponseEntity<List<BuyerVendorNotification>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<BuyerVendorNotification>>() {
        });
        List<BuyerVendorNotification> buyerNotificationList = response.getBody();

        System.out.println("vendorList size: " + buyerNotificationList.size());

        return buyerNotificationList;
    }

    public List<VendorDetails> getAllUnauthorizeVendor() {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/getallunauthorizevendor.do";

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

    public List<MasterVendor> findAllVendorFromMaster() {

        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findallvendorfrommaster.do";
        ResponseEntity<List<MasterVendor>> vendor = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterVendor>>() {
        });
        System.out.println("vendor: " + vendor);
        List<MasterVendor> vendorList = vendor.getBody();
        return vendorList;
    }

    public List<VendorDetails> getAllUsername(String uname) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/getallusername.do?uname=" + uname;

        ResponseEntity<List<VendorDetails>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<VendorDetails>>() {
        });

        System.out.println("response: " + response);
        List<VendorDetails> prospectList = response.getBody();

        return prospectList;
    }

    String updateVendorGroup(VendorGroup vendorgroup) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/updatevendorgroup.do";
        System.out.println("url: " + url);

        String groupid = restTemplate.postForObject(URI.create(url), vendorgroup, String.class);
        System.out.println("groupid: " + groupid);

        return groupid;
    }

    String updateVendor(VendorDetails vendorObj) {
        RestTemplate restTemplate = new RestTemplate();
        System.out.println("vendorObj : " + vendorObj);
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updatevendor.do"), vendorObj, String.class);
        System.out.println("updated in updatevendor");
        return msg;
    }

    String saveBuyerAuditLogReport(ReportBuyerAuditLog log) {

        String url = webservice_ip + "/BuyerPortalWebServices/saveBuyerAuditLogReport.do";
        System.out.println("url: " + url);
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(url), log, String.class);
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

    public List<MasterCurrency> getAllCurrency() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallcurrency.do";
        ResponseEntity<List<MasterCurrency>> country = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterCurrency>>() {
        });
        System.out.println("country: " + country);
        List<MasterCurrency> currencyList = country.getBody();
        return currencyList;
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

    String updateVendorMaster(MasterVendor master) {
        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updateVendorMaster.do"), master, String.class);
        return msg;
    }

    public List<MasterVendor> findMasterVendorByBpIsMappedNot(String bpIsMapped) {
        System.out.println("bpIsMapped: " + bpIsMapped);
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findMasterVendorByBpIsMappedNot.do?bpIsMapped=" + bpIsMapped;
        System.out.println("url: " + url);
        ResponseEntity<List<MasterVendor>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterVendor>>() {
        });
        List<MasterVendor> vendor = response.getBody();
        return vendor;
    }
    public List<VendorDetails> findByMultipleVendorId(String vendorids) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findbymultiplevendorid.do?ids=" + vendorids;
        System.out.println("url: " + url);
        ResponseEntity<List<VendorDetails>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<VendorDetails>>() {});
        List<VendorDetails> vendorList = prResponse.getBody();
        return vendorList;
    }
}
