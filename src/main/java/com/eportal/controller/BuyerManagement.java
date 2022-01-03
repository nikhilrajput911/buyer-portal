/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.controller;

import com.eportal.entities.BuyerDetails;
import com.eportal.entities.BuyerPurchaseGroupMapping;
import com.eportal.entities.BuyerSecurityQueAns;
import com.eportal.entities.BuyerTeamleadMapping;
import com.eportal.entities.EmailTriggerDetails;
import com.eportal.entities.MasterCompanyCode;
import com.eportal.entities.MasterPurchasingGroup;
import com.eportal.entities.VendorDetails;
import com.eportal.entities.MasterVendor;
import com.eportal.entities.ReportBuyerAuditLog;
import com.eportal.util.MailTrigger;
import com.eportal.webservice.util.PurchaseOrderWS;
import com.eportal.webservice.util.RfqRfpWS;
import java.net.URI;
import java.util.Date;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

/**
 *
 * @author admin
 */
@Controller
@SessionAttributes({"profilePicString"})
public class BuyerManagement {

    @Autowired
    BuyerDetails buyerDetails;
    @Autowired
    BuyerSecurityQueAns buyerSecurityQueAns;
    @Autowired
    VendorDetails vendorDetails;
    @Autowired
    BuyerTeamleadMapping buyerTeamleadMapping;

    @Value("${defailt_password}")
    private String defailt_password;

    @Value("${webservice.ip}")
    private String webservice_ip;
    @Autowired
    ReportBuyerAuditLog reportBuyerAuditLog;

    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    EmailTriggerDetails emailTriggerDetails;
    @Autowired
    MailTrigger mailTriggerUtil;
    @Autowired
    RfqRfpWS rfqRfpUtilWS;
    @Autowired
    PurchaseOrderWS purchaseOrderWSUtil;
    @Value("${WebServiceCall.ip}")
    private String WebServiceCall_IP;
    @Autowired
    BuyerPurchaseGroupMapping buyerPurchaseGroupMappingEntity;

    @RequestMapping(value = "/createbuyer")
    public ModelAndView createBuyer(Map<String, Object> map, ModelMap model, HttpSession session, HttpServletRequest request) {
        System.out.println("createbuyer===========");

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<BuyerDetails>> response = restTemplate.exchange(webservice_ip + "/BuyerPortalWebServices/getallbuyers.do",
                HttpMethod.GET, null, new ParameterizedTypeReference<List<BuyerDetails>>() {
                });
        List<BuyerDetails> buyerList = response.getBody();

        List<MasterCompanyCode> masterCompanyCodeList = findAllMasterCompanyCode();
        List<MasterPurchasingGroup> masterPurchasingGroupList = findAllMasterPurchaseGroup();
        List<BuyerDetails> teamLeadList = findAllTeamLead();
        List<MasterPurchasingGroup> purchasingGroupList = rfqRfpUtilWS.findAllMasterPurchaseGroup();

        model.addAttribute("buyer", buyerList);
        model.addAttribute("companyCodeList", masterCompanyCodeList);
        model.addAttribute("purchaseGroupList", masterPurchasingGroupList);
        model.addAttribute("teamLeadList", teamLeadList);
        model.addAttribute("purchasingGroupList", purchasingGroupList);
        model.addAttribute("defailt_password", defailt_password);

        return new ModelAndView("createbuyer");
    }

    @RequestMapping(value = "/savebuyerdetails", method = RequestMethod.POST)
    public ModelAndView saveBuyerDetails(@ModelAttribute("buyer") BuyerDetails buyerDetails, Map<String, Object> map, HttpServletRequest request, HttpSession session, RedirectAttributes redirect) {
        System.out.println("savebuyerdetails=======");

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails loggedInUser = (BuyerDetails) auth.getPrincipal();

        String pass = buyerDetails.getPassword();

        RestTemplate restTemplate = new RestTemplate();

        String role = "ROLE_BUYER";
        String ro_buyeradmin = request.getParameter("ro_buyeradmin");
        String ro_notifybuyer = request.getParameter("ro_notifybuyer");
        String ro_teamlead = request.getParameter("ro_teamlead");
        String teamleadid = request.getParameter("buyerteamlead");

        System.out.println("ro_buyeradmin: " + ro_buyeradmin);
        System.out.println("ro_notifybuyer: " + ro_notifybuyer);
        System.out.println("ro_teamlead: " + ro_teamlead);
        System.out.println("buyerteamlead: " + teamleadid);

        if (ro_buyeradmin.equalsIgnoreCase("Yes")) {
            role = "ROLE_ADMIN_BUYER";
        }
        if (ro_teamlead.equalsIgnoreCase("Yes")) {
            role = "ROLE_TL_BUYER";
        }
        if (ro_teamlead.equalsIgnoreCase("Yes") && ro_buyeradmin.equalsIgnoreCase("Yes")) {
            role = "ROLE_ADMIN_TL_BUYER";
        }

        String purchaseGroupString = buyerDetails.getPurchaseGroup();
        System.out.println("purchaseGroupString: " + purchaseGroupString);
        String purchaseGroupCode = "";
        if (purchaseGroupString != null && !purchaseGroupString.equals("")) {
            List<MasterPurchasingGroup> masterPurchasingGroupList = rfqRfpUtilWS.findMasterPurchasingGroupBySnoIn(purchaseGroupString);
            for (int i = 0; i < masterPurchasingGroupList.size(); i++) {
                MasterPurchasingGroup pg = masterPurchasingGroupList.get(i);
                if (i == masterPurchasingGroupList.size() - 1) {
                    purchaseGroupCode += pg.getPurchasingGroupCode();
                } else {
                    purchaseGroupCode += pg.getPurchasingGroupCode() + ",";
                }
            }
        }
        System.out.println("purchaseGroupCode: " + purchaseGroupCode);

        buyerDetails.setNotifybuyer(ro_notifybuyer);
        buyerDetails.setBuyeradmin(ro_buyeradmin);
        buyerDetails.setTeamlead(ro_teamlead);

        Date date = new Date();
        buyerDetails.setCreatedate(date);
        buyerDetails.setUpdatedate(date);
        buyerDetails.setPassword(passwordEncoder.encode(buyerDetails.getPassword()));
        buyerDetails.setRole(role);
        buyerDetails.setIsPasswordUpdated("No");
        buyerDetails.setisPersonalInfoUpdated("No");
        buyerDetails.setStatus("Active");
        buyerDetails.setPurchaseGroup(purchaseGroupCode);

        BuyerDetails teamlead = null;
        if (teamleadid != null && !teamleadid.equalsIgnoreCase("")) {
            teamlead = getBuyerById(Integer.parseInt(teamleadid));
            buyerDetails.setBuyerteamlead(teamlead.getFirstname() + " " + teamlead.getLastname());
            buyerDetails.setTeamleadId(teamlead);
        }
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/savebuyerdetails.do"), buyerDetails, String.class);
        System.out.println("responseBuyerId : " + msg);

        if (teamleadid != null && !teamleadid.equalsIgnoreCase("") && !teamleadid.equalsIgnoreCase(msg)) 
        {
            BuyerDetails buyer = getBuyerById(Integer.parseInt(msg));
            System.out.println("buyer: " + buyer);

            buyerTeamleadMapping.setNgBpBuyerdetailsId(buyer);
            buyerTeamleadMapping.setNgBpBuyerteamleadId(teamlead);

            String mappingid = saveBuyerTeamleadMapping(buyerTeamleadMapping);
            System.out.println("mappingid: " + mappingid);

            if (role.equals("ROLE_TL_BUYER") || role.equals("ROLE_ADMIN_TL_BUYER")) 
            {
                buyerTeamleadMapping.setNgBpBuyerdetailsId(buyer);
                buyerTeamleadMapping.setNgBpBuyerteamleadId(buyer);

                String mappingId2 = saveBuyerTeamleadMapping(buyerTeamleadMapping);
                System.out.println("mappingId2: " + mappingId2);
            }
        }

//        String purchaseGroupString = buyerDetails.getPurchaseGroup();
//        System.out.println("purchaseGroupString: " + purchaseGroupString);
        if (purchaseGroupString != null && !purchaseGroupString.equals("")) {
            BuyerDetails newBuyer = getBuyerById(Integer.parseInt(msg));
            List<MasterPurchasingGroup> masterPurchasingGroupList = rfqRfpUtilWS.findMasterPurchasingGroupBySnoIn(purchaseGroupString);
            for (MasterPurchasingGroup pg : masterPurchasingGroupList) {
                buyerPurchaseGroupMappingEntity.setNgBpBuyerdetailsIdRef(newBuyer);
                buyerPurchaseGroupMappingEntity.setProcessType(pg.getProcessType());
                buyerPurchaseGroupMappingEntity.setPurchasingGroupCode(pg.getPurchasingGroupCode());
                buyerPurchaseGroupMappingEntity.setPurchasingGroupDesc(pg.getPurchasingGroupDesc());

                rfqRfpUtilWS.saveBuyerPurchaseGrougMapping(buyerPurchaseGroupMappingEntity);
            }
        }

        redirect.addFlashAttribute("create", "success");

        reportBuyerAuditLog.setActivityPerformed(buyerDetails.getUsername() + " new buyer created.");
        reportBuyerAuditLog.setCreatedate(new Date());
        reportBuyerAuditLog.setNgBpBuyerdetailsId(loggedInUser);
        saveBuyerAuditLogReport(reportBuyerAuditLog);

//        emailTriggerDetails.setMailCC(buyerDetailsObj.getEmailid());
        if (ro_notifybuyer != null && ro_notifybuyer.equals("Yes")) {
            emailTriggerDetails.setMailFrom("do-not-reply@natsteel.com.sg");
            emailTriggerDetails.setMailContentType("text/html;charset=UTF-8"); // default
            emailTriggerDetails.setMailMessage("Username: " + buyerDetails.getUsername() + "<br>Password: " + pass);
            emailTriggerDetails.setMailSubject(" Buyer Portal Username/Password ");
            emailTriggerDetails.setMailTo(buyerDetails.getEmailid());
            emailTriggerDetails.setMailStatus("N");
            mailTriggerUtil.TriggerMail(emailTriggerDetails);
        }
        return new ModelAndView("redirect:/createbuyer.do");
    }

    @RequestMapping(value = "/updatebuyerdetails", method = RequestMethod.POST)
    public ModelAndView updateBuyerDetails(Map<String, Object> map, HttpServletRequest request, HttpSession session, RedirectAttributes redirect) {

        System.out.println("updateddetails=======");
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails loggedInUser = (BuyerDetails) auth.getPrincipal();

        String buyerfirstname = request.getParameter("update_firstname");
        String buyerlastname = request.getParameter("update_lastname");
        String buyeremailid = request.getParameter("update_emailid");
        String id = request.getParameter("updated_id");
        String companycode = request.getParameter("ro_update_teamlead");
        String update_purchaseGroupString = request.getParameter("update_MasterPurchaseGroupSno");

        System.out.println("companycode: " + companycode);
        System.out.println("update_purchaseGroupString: " + update_purchaseGroupString);

        String role = "ROLE_BUYER";
        String update_buyeradmin = request.getParameter("update_buyeradmin");
        String update_notifybuyer = request.getParameter("update_notifybuyer");
        String update_teamlead = request.getParameter("update_teamlead");
        String teamleadid = request.getParameter("update_buyerteamlead");
        String buyer_role = request.getParameter("role");

        System.out.println("update_buyeradmin: " + update_buyeradmin);
        System.out.println("update_notifybuyer: " + update_notifybuyer);
        System.out.println("update_teamlead: " + update_teamlead);
        System.out.println("update_buyerteamlead: " + teamleadid);
        System.out.println("buyer_role: " + buyer_role);

        if (update_buyeradmin.equalsIgnoreCase("Yes")) {
            role = "ROLE_ADMIN_BUYER";
        }
        if (update_teamlead.equalsIgnoreCase("Yes")) {
            role = "ROLE_TL_BUYER";
        }
        if (update_teamlead.equalsIgnoreCase("Yes") && update_buyeradmin.equalsIgnoreCase("Yes")) {
            role = "ROLE_ADMIN_TL_BUYER";
        }

        String purchaseGroupCode = "";
        if (update_purchaseGroupString != null && !update_purchaseGroupString.equals("")) {
            List<MasterPurchasingGroup> masterPurchasingGroupList = rfqRfpUtilWS.findMasterPurchasingGroupBySnoIn(update_purchaseGroupString);
            for (int i = 0; i < masterPurchasingGroupList.size(); i++) {
                MasterPurchasingGroup pg = masterPurchasingGroupList.get(i);
                if (i == masterPurchasingGroupList.size() - 1) {
                    purchaseGroupCode += pg.getPurchasingGroupCode();
                } else {
                    purchaseGroupCode += pg.getPurchasingGroupCode() + ",";
                }
            }
        }
        System.out.println("purchaseGroupCode: " + purchaseGroupCode);

        int resultid = Integer.parseInt(id);

        BuyerDetails buyerObj = getBuyerById(resultid);

        if (teamleadid != null && !teamleadid.equalsIgnoreCase("")) {
            BuyerDetails teamlead = getBuyerById(Integer.parseInt(teamleadid));
            buyerObj.setBuyerteamlead(teamlead.getFirstname() + " " + teamlead.getLastname());
            buyerObj.setTeamleadId(teamlead);
        }
        System.out.println("buyerObj :" + buyerObj);

        RestTemplate restTemplate = new RestTemplate();

        buyerObj.setNotifybuyer(update_notifybuyer);
        buyerObj.setBuyeradmin(update_buyeradmin);
        buyerObj.setTeamlead(update_teamlead);

        if (buyer_role != null && !buyer_role.equalsIgnoreCase("ROLE_TEAM_LEAD")) {
            buyerObj.setRole(role);
        }

        buyerObj.setFirstname(buyerfirstname);
        buyerObj.setLastname(buyerlastname);
        buyerObj.setEmailid(buyeremailid);
        buyerObj.setPurchaseGroup(purchaseGroupCode);
        buyerObj.setCompanyCode(companycode);
        Date date = new Date();
        buyerObj.setUpdatedate(date);

        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updatebuyer.do"), buyerObj, String.class);
        System.out.println("responseBuyerId : " + msg);

        redirect.addFlashAttribute("update", "success");

        // Delete all buyer purchasing group old mapping
        List<BuyerPurchaseGroupMapping> buyerPurchaseGroupMappingList = rfqRfpUtilWS.findBuyerPurchaseGroupMappingByBuyerId(resultid);
        if (!buyerPurchaseGroupMappingList.isEmpty()) {
            rfqRfpUtilWS.deleteAllBuyerPurchaseGroupMapping(buyerPurchaseGroupMappingList);
        }

        // Make entry for new buyer purchasing group mapping
        if (update_purchaseGroupString != null && !update_purchaseGroupString.equals("")) {
            List<MasterPurchasingGroup> masterPurchasingGroupList = rfqRfpUtilWS.findMasterPurchasingGroupBySnoIn(update_purchaseGroupString);
            for (MasterPurchasingGroup pg : masterPurchasingGroupList) {
                buyerPurchaseGroupMappingEntity.setNgBpBuyerdetailsIdRef(buyerObj);
                buyerPurchaseGroupMappingEntity.setProcessType(pg.getProcessType());
                buyerPurchaseGroupMappingEntity.setPurchasingGroupCode(pg.getPurchasingGroupCode());
                buyerPurchaseGroupMappingEntity.setPurchasingGroupDesc(pg.getPurchasingGroupDesc());

                rfqRfpUtilWS.saveBuyerPurchaseGrougMapping(buyerPurchaseGroupMappingEntity);
            }
        }

        // Make entry for audit log
        reportBuyerAuditLog.setActivityPerformed(buyerObj.getUsername() + " buyer updated.");
        reportBuyerAuditLog.setCreatedate(new Date());
        reportBuyerAuditLog.setNgBpBuyerdetailsId(loggedInUser);
        saveBuyerAuditLogReport(reportBuyerAuditLog);

        return new ModelAndView("redirect:/createbuyer.do");
    }

    @RequestMapping(value = "/editbuyerprofile", method = RequestMethod.POST)
    public ModelAndView editBuyerProfile(ModelMap model, HttpServletRequest request, HttpSession session, @RequestParam("Fichier1") CommonsMultipartFile attachment, RedirectAttributes redirect) {

        String firstname = request.getParameter("firstname");
        String lastname = request.getParameter("lastname");
        String emailid = request.getParameter("emailid");

        String[] questions = request.getParameterValues("question");

        String[] answers = request.getParameterValues("answer");

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();

        int id = buyer.getId();

        System.out.println("id in editbuyerprofile :" + id);

        BuyerDetails buyerObj = getBuyerById(id);

        System.out.println("buyerObj in editbuyerprofile : " + buyerObj);

        System.out.println("firstname : " + firstname);
        System.out.println("lastname : " + lastname);
        System.out.println("emailid : " + emailid);

        List<BuyerSecurityQueAns> queAns = getQueAnsById(id);

        for (int i = 0; i < questions.length; i++) {
            System.out.println("Question : " + questions[i]);
            System.out.println("Answer : " + answers[i]);
        }
        Date date = new Date();

        if (queAns.isEmpty()) {
            for (int i = 0; i < questions.length; i++) {
                buyerSecurityQueAns.setNgBpBuyerdetailsId(buyerObj);
                buyerSecurityQueAns.setQuestion(questions[i]);
                buyerSecurityQueAns.setAnswer(answers[i]);
                buyerSecurityQueAns.setSelectiondate(date);

                String buyerid = saveBuyerSecQuesAns(buyerSecurityQueAns);

                System.out.println("buyerid :" + buyerid);
            }
        } else {
            for (int i = 0; i < questions.length; i++) {
                BuyerSecurityQueAns secQue = queAns.get(i);
                secQue.setQuestion(questions[i]);
                secQue.setAnswer(answers[i]);
                secQue.setSelectiondate(date);

                String msg = updateQueAns(secQue);

                System.out.println("msg:" + msg);
            }
        }

        String fileName = attachment.getOriginalFilename();

        System.out.println("fileName :" + fileName);

        buyerObj.setFirstname(firstname);
        buyerObj.setLastname(lastname);
        buyerObj.setEmailid(emailid);
        buyerObj.setisPersonalInfoUpdated("Yes");

        redirect.addFlashAttribute("personalDataUpdated", "Yes");

        String fileType = fileName.substring(fileName.indexOf(".") + 1, fileName.length());
        System.out.println("File Type is: " + fileType);

//        if (fileType.trim().equalsIgnoreCase("jpg") || fileType.trim().equalsIgnoreCase("png") || fileType.trim().equalsIgnoreCase("jpeg")) {
        if (!"".equals(fileType)) {
            String profilePicString = "";
            if (!attachment.getOriginalFilename().equalsIgnoreCase("")) {
                System.out.println("file type in if");
                buyerObj.setProfilepicture(attachment.getBytes());

//            System.out.println("profilepicture in editbuyerprofile");
////            byte[] profilepicture = attachment.getBytes();
//            byte[] profilepicture = buyer.getProfilepicture();
//            byte[] encodedImage = Base64.getEncoder().encode(profilepicture);
//            profilePicString = new String(encodedImage);
//            System.out.println("profilepicstring :" + profilePicString);
                model.addAttribute("profilePicString", profilePicString);
//            map.put("profilePicString", profilePicString);
            } else {
                buyerObj.setProfilepicture(null);
            }
        }
//        } else {
//            System.out.println("Invalid file type");
//        }

        String msg = updateBuyer(buyerObj);

        System.out.println("msg in editbuyerprofile : " + msg);

        BuyerDetails updatedBuyer = getBuyerById(id);

        SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(updatedBuyer, null, auth.getAuthorities()));

        return new ModelAndView("redirect:/dashboardcont.do");
    }

    @RequestMapping(value = "/vendordetails", method = RequestMethod.GET)
    public ModelAndView vendorDetails(HttpServletRequest request, ModelMap model) {
        System.out.println("vendordetails");
        String vendorid = request.getParameter("vendorid");
        System.out.println("vendorid in vendordetails :" + vendorid);
        VendorDetails vendorObj = findVendorById(Integer.parseInt(vendorid));

//        List<MasterVendor> vendorMasterList = rfqRfpUtilWS.findMasterVendorByBpIsMappedNot("Yes");
        model.addAttribute("vendorObj", vendorObj);
        model.addAttribute("WebServiceCallIp", WebServiceCall_IP);
//        model.addAttribute("vendorMasterList", vendorMasterList);

        return new ModelAndView("vendordetails");
    }

    @RequestMapping(value = "/registervendor", method = RequestMethod.POST)
    public ModelAndView registerVendor(HttpServletRequest request, ModelMap model, RedirectAttributes redirect) {
        System.out.println("registervendor");

        String code = request.getParameter("code");
        String vendorid = request.getParameter("id");
        System.out.println("Code :" + code);
        System.out.println("Id :" + vendorid);

        VendorDetails vendorObj = findVendorById(Integer.parseInt(vendorid));

        if (code != null && !code.trim().equals("")) {
            vendorObj.setCode(code);
            vendorObj.setIsVendorRegistered("Yes");
            vendorObj.setType("Vendor");
        } else {
            vendorObj.setCode(null);
            vendorObj.setIsVendorRegistered("No");
            vendorObj.setType("Prospect");
        }
        vendorObj.setStatus("Active");
        System.out.println("Registered");

        String msg = updateVendor(vendorObj);

        if (code != null && !code.trim().equals("")) {
            List<MasterVendor> vendorMasterList = purchaseOrderWSUtil.findMasterVendorByVendorCode(code);
            if (!vendorMasterList.isEmpty()) {
                MasterVendor vendorMasterObj = vendorMasterList.get(0);
                vendorMasterObj.setBpIsMapped("Yes");
                purchaseOrderWSUtil.updateVendorMaster(vendorMasterObj);
            }
        }

        return new ModelAndView("redirect:/authorizevendor.do");

    }

    @RequestMapping(value = "/resetbuyerpassword")
    public ModelAndView resetBuyerPassword(HttpServletRequest request, RedirectAttributes redirect) {
        System.out.println("resetbuyerpassword");
        String buyerid = request.getParameter("buyerid");
        System.out.println("buyerid in resetbuyerpassword :" + buyerid);
        BuyerDetails buyerObj = getBuyerById(Integer.parseInt(buyerid));
        System.out.println("defailt_password :" + defailt_password);
        buyerObj.setPassword(passwordEncoder.encode(defailt_password));
        buyerObj.setIsPasswordUpdated("No");
        buyerObj.setUpdatedate(new Date());
        String msg = updateBuyer(buyerObj);
        System.out.println("msg in resetbuyerpassword :" + msg);

        if (buyerObj.getNotifybuyer() != null && buyerObj.getNotifybuyer().equals("Yes")) {
            emailTriggerDetails.setMailFrom("do-not-reply@natsteel.com.sg");
            emailTriggerDetails.setMailContentType("text/html;charset=UTF-8"); // default
            emailTriggerDetails.setMailMessage(defailt_password + " is new password, please try login");
            emailTriggerDetails.setMailSubject(" Buyer Portal Password Reset ");
            emailTriggerDetails.setMailTo(buyerObj.getEmailid());
            emailTriggerDetails.setMailStatus("N");
            String MailTrigger = mailTriggerUtil.TriggerMail(emailTriggerDetails);
            System.out.println("MailTrigger :" + MailTrigger);
        }
        redirect.addFlashAttribute("msg", "PasswordUpdated");
        return new ModelAndView("redirect:/createbuyer.do");
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

    String saveBuyerSecQuesAns(BuyerSecurityQueAns secQuesAns) {

        System.out.println("Save buyer sec ans :" + secQuesAns);

        RestTemplate restTemplate = new RestTemplate();

//         String url = webservice_ip + "/BuyerPortalWebServices/savebuyersecquesans.do";
        String id = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/savebuyersecquesans.do"), secQuesAns, String.class);

        System.out.println("id in saveBuyerSecQuesAns :" + id);

        return id;
    }

    String updateBuyer(BuyerDetails buyerObj) {

        RestTemplate restTemplate = new RestTemplate();

        System.out.println("buyerObj : " + buyerObj);

        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updatebuyer.do"), buyerObj, String.class);

        System.out.println("updated in updatebuyer");

        return msg;
    }

    List<BuyerSecurityQueAns> getQueAnsById(int id) {
        RestTemplate restTemplate = new RestTemplate();

        System.out.println("Id in getQueAnsById :" + id);

        String url = webservice_ip + "/BuyerPortalWebServices/getqueansbyid.do?id=" + id;
        System.out.println("url: " + url);

        ResponseEntity<List<BuyerSecurityQueAns>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<BuyerSecurityQueAns>>() {
        });

        List<BuyerSecurityQueAns> que = response.getBody();

        return que;
    }

    String updateQueAns(BuyerSecurityQueAns queAns) {

        RestTemplate restTemplate = new RestTemplate();

        System.out.println("queAns in updateQueAns :" + queAns);

        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updatequeans.do"), queAns, String.class);

        System.out.println("update in updateQueAnd");

        return msg;
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

    String updateVendor(VendorDetails vendor) {

        System.out.println("vendor :" + vendor);

        RestTemplate restTemplate = new RestTemplate();

        String result = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updatevendor.do"), vendor, String.class);

        System.out.println("vendor : " + result);

        return result;
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

    public List<MasterCompanyCode> findAllMasterCompanyCode() {

        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findcompanycodefrommaster.do";
        ResponseEntity<List<MasterCompanyCode>> vendor = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterCompanyCode>>() {
        });
        System.out.println("vendor: " + vendor);
        List<MasterCompanyCode> masterCompanyCodeList = vendor.getBody();
        return masterCompanyCodeList;
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

    List<BuyerDetails> findAllTeamLead() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findallteamlead.do";
        System.out.println("url: " + url);
        ResponseEntity<List<BuyerDetails>> restGroupResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<BuyerDetails>>() {
        });
        List<BuyerDetails> buyerList = restGroupResponse.getBody();
        return buyerList;
    }

    String saveBuyerTeamleadMapping(BuyerTeamleadMapping mapping) {

        RestTemplate restTemplate = new RestTemplate();
        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/savebuyerteamleadmapping.do"), mapping, String.class);
        System.out.println("responseBuyerId : " + msg);

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

}
