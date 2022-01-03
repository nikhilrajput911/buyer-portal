/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.controller;

import com.eportal.entities.AdminDashboardCountBean;
import com.eportal.entities.BuyerDashboardRfqStatusBean;
import com.eportal.entities.BuyerDetails;
import com.eportal.entities.BuyerPendingContractLineItemsBean;
import com.eportal.entities.BuyerPendingPRLineItemsBean;
import com.eportal.entities.BuyerSecurityQueAns;
import com.eportal.entities.BuyerTeamleadMapping;
import com.eportal.entities.BuyerVendorNotification;
import com.eportal.entities.ContractRfqHeader;
import com.eportal.entities.MasterDepartment;
import com.eportal.entities.MasterMaterialGroup;
import com.eportal.entities.MasterPurchasingGroup;
import com.eportal.entities.NGExtCM;
import com.eportal.entities.NGExtPOCreation;
import com.eportal.entities.NGExtPRToPO;
import com.eportal.entities.NewgenContractLineItem;
import com.eportal.entities.NewgenPRLineItem;
import com.eportal.entities.OnlineUsers;
import com.eportal.entities.ReportBuyerAuditLog;
import com.eportal.entities.SecurityQuestionSeeded;
import com.eportal.entities.TlContractLinesBean;
import com.eportal.entities.TlPrLineItemsBean;
import com.eportal.entities.WorkOrderRfqHeader;
import com.eportal.webservice.util.LoginWS;
import com.eportal.webservice.util.PurchaseOrderWS;
import com.eportal.webservice.util.RfqRfpWS;
import java.net.URI;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.log4j.Logger;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@SessionAttributes({"buyerNotificationList", "profilePicString", "isPassUpdated", "isPersonalInfoUpdated", "CompanyCode"})
public class Login {

    @Value("${no_of_days}")
    private int no_of_days;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    SecurityQuestionSeeded securityQuestionSeeded;
    @Autowired
    BuyerSecurityQueAns buyerSecurityQueAns;
    @Autowired
    NewgenPRLineItem newgenPRLineItem;
    @Autowired
    NewgenContractLineItem newgenContractLineItem;
    @Autowired
    ReportBuyerAuditLog reportBuyerAuditLog;
    @Autowired
    RfqRfpWS rfqRfpUtilWS;
    @Autowired
    PurchaseOrderWS purchaseOrderUtilWS;
    @Autowired
    OnlineUsers onlineUsersEntity;
    @Autowired
    LoginWS loginWSUtil;

    @Value("${webservice.ip}")
    private String webservice_ip;
    @Value("${incorrect_username}")
    private String incorrect_username;
    @Value("${incorrect_password}")
    private String incorrect_password;
    @Value("${reset_password}")
    private String reset_password;
    @Value("${user_deleted}")
    private String user_deleted;
    @Value("${local_dev_uat}")
    private String local_dev_uat;
    @Value("${WebServiceCall.ip}")
    private String WebServiceCall_IP;
    @Value("${rfqStatusPanelPeriodInDays}")
    private String rfqStatusPanelPeriodInDays;

    private static final Logger logger = Logger.getLogger(Login.class);

    public String getCompanyCodesForStoredProcedure(String companyCode) {
        String compCodes = "";
        if (companyCode != null) {
            String[] cocodes = companyCode.split(",");
            System.out.println("cocodes size: " + cocodes.length);
            for (String code : cocodes) {
                compCodes += "'" + code + "',";
            }
            compCodes = compCodes.substring(0, compCodes.length() - 1);
            System.out.println("compCodes1: " + compCodes);
        }
        return compCodes;
    }

    @RequestMapping(value = "/dashboardcont", method = RequestMethod.GET)
    public ModelAndView welcomePage(ModelMap model, RedirectAttributes redirect) {
        System.out.println("dashboardcont.do");

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        List<BuyerVendorNotification> buyerNotificationList = null;

        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        String companyCode = buyer.getCompanyCode();
        String username = buyer.getUsername();
        System.out.println("companyCode1: " + companyCode);
        System.out.println("username: " + username);

        String profilePicString;
        if (buyer != null && buyer.getProfilepicture() != null) {
            System.out.println("profilepicture");
            byte[] profilepicture = buyer.getProfilepicture();
            byte[] encodedImage = Base64.getEncoder().encode(profilepicture);
            profilePicString = new String(encodedImage);
        } else {
            System.out.println("else");
            profilePicString = "NotFound";
        }

        model.addAttribute("profilePicString", profilePicString);

        buyerNotificationList = findBuyerNotification(buyer.getId());
        System.out.println("buyerNotificationList size: " + buyerNotificationList.size());

        if (buyer != null && buyer.getRole() != null && buyer.getRole().equalsIgnoreCase("ROLE_TEAM_LEAD") || buyer.getRole().equalsIgnoreCase("ROLE_ADMIN_TL")) 
        {
            System.out.println("Role: ROLE_TEAM_LEAD");

            List<TlPrLineItemsBean> tlUnassignedPRLineList = null;
            List<TlPrLineItemsBean> tlUnassignedServicePRLineList = null;
            List<TlPrLineItemsBean> tlUnassignedMaterialPRLineList = null;
//            String materialService = null;

            System.out.println("isFilterPresent: " + model.get("isFilter"));

            if (model.get("isFilter") != null) {
                String isFilter = (String) model.get("isFilter");
                System.out.println("isFilter: " + isFilter);
                String materialService = (String) model.get("materialService");
                System.out.println("materialService :" + materialService);

                switch (materialService) {
                    case "Material":
                        tlUnassignedMaterialPRLineList = (List<TlPrLineItemsBean>) model.get("filterResultSet");
                        tlUnassignedServicePRLineList = rfqRfpUtilWS.callTlPrLineItemsStoredProcedureByPRType("Unassigned", "Buyer", companyCode, "", "Service", "");
                        System.out.println("tlUnassignedMaterialPRLineList Size: " + tlUnassignedMaterialPRLineList.size());
                        break;
                    case "Service":
                        tlUnassignedServicePRLineList = (List<TlPrLineItemsBean>) model.get("filterResultSet");
                        tlUnassignedMaterialPRLineList = rfqRfpUtilWS.callTlPrLineItemsStoredProcedureByPRType("Unassigned", "Buyer", companyCode, "", "Material", "");
                        System.out.println("tlUnassignedServicePRLineList Size: " + tlUnassignedServicePRLineList.size());
                        break;
                }

            } else {
                tlUnassignedServicePRLineList = rfqRfpUtilWS.callTlPrLineItemsStoredProcedureByPRType("Unassigned", "Buyer", companyCode, "", "Service", "");
                tlUnassignedMaterialPRLineList = rfqRfpUtilWS.callTlPrLineItemsStoredProcedureByPRType("Unassigned", "Buyer", companyCode, "", "Material", "");
            }

            List<TlPrLineItemsBean> tlAssignedServicePRLineList = rfqRfpUtilWS.callTlPrLineItemsStoredProcedureByPRType("Assigned", "Buyer", companyCode, "", "Service", username);
            List<TlPrLineItemsBean> tlAssignedMaterialPRLineList = rfqRfpUtilWS.callTlPrLineItemsStoredProcedureByPRType("Assigned", "Buyer", companyCode, "", "Material", username);

            List<BuyerTeamleadMapping> mappingList = findBuyerMappingByTeamlead(buyer.getId());
            List<String> distinctPRList = rfqRfpUtilWS.findDistinctPRNumber();
            List<NGExtPRToPO> ngExtPRToPOLIst = purchaseOrderUtilWS.getNGExtPRToPO();
            List<MasterPurchasingGroup> masterPurchasingGroupList = findAllMasterPurchaseGroup();
            List<MasterDepartment> masterDepartmentlist = rfqRfpUtilWS.findMaterDepartment();
            List<MasterMaterialGroup> masterMaterialGroupList = rfqRfpUtilWS.findMasterMaterialGroup();

            List<Integer> prCountList = new ArrayList<>();
            for (BuyerTeamleadMapping obj : mappingList) {
                List<TlPrLineItemsBean> objList = rfqRfpUtilWS.callTlPrLineItemsStoredProcedure("Assigned", "Buyer", companyCode, "" + obj.getNgBpBuyerdetailsId().getId(), "", "");
                prCountList.add(objList.size());
            }
            //abhishek
            List<Integer> contractCountList = new ArrayList<>();
            for (BuyerTeamleadMapping obj : mappingList) {
                List<TlContractLinesBean> objList = rfqRfpUtilWS.callTlContractLineStoredProcedure("Assigned", "" + obj.getNgBpBuyerdetailsId().getId());
                contractCountList.add(objList.size());

            }
            List<ContractRfqHeader> allContractRfqList = rfqRfpUtilWS.getContractRfqHeaders();
            List<TlContractLinesBean> unAssignedContractList1 = rfqRfpUtilWS.callTlContractLineStoredProcedure("Unassigned", "");
            List<TlContractLinesBean> assignedContractList = rfqRfpUtilWS.callTlContractLineStoredProcedure("Assigned", "");
            //abhishek
            
            // Find all rfq of this teamlead's buyers
            List<WorkOrderRfqHeader> allRfqList = new ArrayList<>();
            if(!mappingList.isEmpty()) {                
                String mappingBuyerIds = mappingList.stream().map(mapping -> mapping.getNgBpBuyerdetailsId().getId().toString()).collect(Collectors.joining(","));
                System.out.println("mappingBuyerIds: " + mappingBuyerIds);
                allRfqList = rfqRfpUtilWS.findRfqHeaderByBuyerIdIn(mappingBuyerIds);
            }
            
            System.out.println("Size of tlUnassignedServicePRLineList is :" + tlUnassignedServicePRLineList.size());
            System.out.println("Size of tlUnassignedMaterialPRLineList is :" + tlUnassignedMaterialPRLineList.size());
            System.out.println("Size of tlAssignedServicePRLineList is :" + tlAssignedServicePRLineList.size());
            System.out.println("Size of tlAssignedServicePRLineList is :" + tlAssignedMaterialPRLineList.size());

            model.addAttribute("buyerMappingList", mappingList);
            model.addAttribute("prCountList", prCountList);
            model.addAttribute("BuyerNotificationList", buyerNotificationList);
//            if ("Material".equals(materialService)) {
//                model.addAttribute("tlUnassignedPRLineList", tlUnassignedPRLineList);
//            } else if ("Service".equals(materialService)) {
//                model.addAttribute("tlUnassignedServicePRLineList", tlUnassignedPRLineList);
//            }

//            model.addAttribute("tlAssignedPRLineList", tlAssignedPRLineList);
            model.addAttribute("distinctPRList", distinctPRList);
            model.addAttribute("ngExtPRToPOLIst", ngExtPRToPOLIst);
            model.addAttribute("purchaseGroupList", masterPurchasingGroupList);
            model.addAttribute("masterDepartmentlist", masterDepartmentlist);
            model.addAttribute("masterMaterialGroupList", masterMaterialGroupList);
            model.addAttribute("allRfqList", allRfqList);
            model.addAttribute("tlUnassignedServicePRLineList", tlUnassignedServicePRLineList);
            model.addAttribute("tlUnassignedMaterialPRLineList", tlUnassignedMaterialPRLineList);
            model.addAttribute("tlAssignedServicePRLineList", tlAssignedServicePRLineList);
            model.addAttribute("tlAssignedMaterialPRLineList", tlAssignedMaterialPRLineList);
            //abhishek
            model.addAttribute("unAssignedContractList1", unAssignedContractList1);
            model.addAttribute("assignedContractList", assignedContractList);
            model.addAttribute("allContractRfqList", allContractRfqList);
            model.addAttribute("contractCountList", contractCountList);

            //abhishek
        } else if (buyer != null && buyer.getRole() != null && (buyer.getRole().equalsIgnoreCase("ROLE_BUYER") 
                || buyer.getRole().equalsIgnoreCase("ROLE_TL_BUYER") || buyer.getRole().equalsIgnoreCase("ROLE_ADMIN_BUYER") 
                || buyer.getRole().equalsIgnoreCase("ROLE_ADMIN_TL_BUYER"))) 
        {
            System.out.println("Role: ROLE_BUYER");
            List<NewgenPRLineItem> rfqInitiatedPrList = findNewgenLineByRfqStatus("Initiated", buyer.getId());
            List<NewgenPRLineItem> rfqNotInitiatedPrList = findNewgenLineByRfqStatus("Not Initiated", buyer.getId());

//            List<WorkOrderRfqHeader> rfqHeaderList = findRfqHeaderByBuyerId(buyer.getId());
            int buyerid = buyer.getId();
            List<BuyerPendingPRLineItemsBean> buyerPendingPRList = callBuyerPendingPrLineItemsStoredProcedure(buyer.getId(), "All", 0, "");
            System.out.println("buyerPendingPRList: " + buyerPendingPRList.size());

            List<NGExtCM> contractCountList = findNewgenContractLineItemByStatusAndBuyer(buyerid);
            System.out.println("countractCountlist size :" + contractCountList.size());

            List<NewgenPRLineItem> initiatedPRCountList = findInitiatedPRByStatusAndBuyer("Assigned", buyerid);
            System.out.println("initiatedPRCountList size :" + initiatedPRCountList.size());

            List pendingPo = pendingPo(buyer.getId());
            model.addAttribute("pendingPo", pendingPo);

            System.out.println("buyer username: " + username);
            System.out.println("rfqStatusPanelPeriodInDays: " + rfqStatusPanelPeriodInDays);
            List<BuyerDashboardRfqStatusBean> buyerDashRfqExitStatusPanelList
                    = rfqRfpUtilWS.callBuyerDashRfqStatusStoredProcedure(Integer.parseInt(rfqStatusPanelPeriodInDays), username, "Exit");
            System.out.println("buyerDashRfqExitStatusPanelList size: " + buyerDashRfqExitStatusPanelList.size());

            List<BuyerDashboardRfqStatusBean> buyerDashRfqPendingStatusPanelList
                    = rfqRfpUtilWS.callBuyerDashRfqStatusStoredProcedure(Integer.parseInt(rfqStatusPanelPeriodInDays), username, "Approver");
            System.out.println("buyerDashRfqPendingStatusPanelList size: " + buyerDashRfqPendingStatusPanelList.size());

            model.addAttribute("rfqInitiatedPrList", rfqInitiatedPrList);
            model.addAttribute("rfqNotInitiatedPrList", rfqNotInitiatedPrList);
//            model.addAttribute("RfqHeaderList", rfqHeaderList);
            model.addAttribute("BuyerNotificationList", buyerNotificationList);
            model.addAttribute("contractCountList", contractCountList);
            model.addAttribute("initiatedPRCountList", initiatedPRCountList);
            model.addAttribute("buyerPendingPRList", buyerPendingPRList);
//            model.addAttribute("buyerOverduePendingPRList", buyerOverduePendingPRList);
//            model.addAttribute("vendorFinalizedList", vendorFinalizedList);
//            model.addAttribute("rfqClosureList", rfqClosureList);
//            model.addAttribute("acknowlegdePOList", acknowlegdePOList);
            model.addAttribute("buyerDashRfqExitStatusPanelList", buyerDashRfqExitStatusPanelList);
            model.addAttribute("buyerDashRfqPendingStatusPanelList", buyerDashRfqPendingStatusPanelList);

            //abhishek
            List<BuyerPendingContractLineItemsBean> buyerPendingcontractList = callBuyerPendingContractLineItemsStoredProcedure(buyer.getId(), "All");
            System.out.println("buyerPendingContractList: " + buyerPendingcontractList.size());
            List<BuyerPendingContractLineItemsBean> contractRfqHeaderListdash = callBuyerPendingContractLineItemsStoredProcedure(buyerid, "ServiceOverDue");
            System.out.println("contractRfqHeaderListdash: " + contractRfqHeaderListdash.size());
            List<ContractRfqHeader> contractRfqTenderListfinal = findContractTender();
            System.out.println("contractRfqTenderListfinal size: " + contractRfqTenderListfinal.size());
            List<ContractRfqHeader> contractRfqHeaderList = findContractRfqHeaderByBuyerId(buyerid);
            System.out.println("contractRfqHeaderList size: " + contractRfqHeaderList.size());
            List<ContractRfqHeader> ContractExpiringList = findContractExpiring();
            System.out.println("ContractExpiringList ContractRFQHeader" + ContractExpiringList.size());
            List<BuyerPendingContractLineItemsBean> buyerPendingServiceContractList = callBuyerPendingContractLineItemsStoredProcedure(buyerid, "ServicePendingApprovals");
            System.out.println("buyerPendingServiceContractList: " + buyerPendingServiceContractList.size());
            model.addAttribute("buyerPendingcontractList", buyerPendingcontractList);
            model.addAttribute("contractRfqTenderListfinal", contractRfqTenderListfinal);
            model.addAttribute("contractRfqHeaderListdash", contractRfqHeaderListdash);
            model.addAttribute("contractRfqHeaderList", contractRfqHeaderList);
            model.addAttribute("ContractExpiringList", ContractExpiringList);
            model.addAttribute("buyerPendingServiceContractList", buyerPendingServiceContractList);
            //abhishek
        } else if (buyer != null && buyer.getRole() != null && buyer.getRole().equalsIgnoreCase("ROLE_ADMIN")) {
            List<BuyerDetails> buyerList = findAllBuyerExceptTeamLead();
            model.addAttribute("buyerList", buyerList);

            System.out.println("Role: ROLE_ADMIN");
            List<AdminDashboardCountBean> adminDashCountlist = callAdminDashboardCountStoredProcedure();
            System.out.println("adminDashCountlist: " + adminDashCountlist);
            if (!adminDashCountlist.isEmpty()) {
                model.addAttribute("adminDashCount", adminDashCountlist.get(0));
            }
        }
        if (buyer != null) {
            String ispassupdated = buyer.getIsPasswordUpdated();
            String isPersonalInfoUpdated = buyer.getisPersonalInfoUpdated();
//            String companyCode = buyer.getCompanyCode();

            System.out.println("ispassupdated :" + ispassupdated);
            System.out.println("isPersonalInfoUpdated :" + isPersonalInfoUpdated);

            model.addAttribute("isPassUpdated", ispassupdated);
            model.addAttribute("isPersonalInfoUpdated", isPersonalInfoUpdated);
            model.addAttribute("CompanyCode", companyCode);
            model.addAttribute("WebServiceCallIp", WebServiceCall_IP);
            model.addAttribute("local_dev_uat", local_dev_uat);
            model.addAttribute("buyerObj", buyer);
        }

        logger.info("dashboardcont.do in logger");
//        map.put("buyer", buyer);
        return new ModelAndView("dashboard");
    }
//    @RequestMapping(value = "/dashboard", method = RequestMethod.GET) for Remember Me

    @RequestMapping(value = "/dashboard", method = RequestMethod.POST)
    public ModelAndView dashboard(HttpSession session, HttpServletRequest request, ModelMap model, Map<String, Object> map, RedirectAttributes redirect) {
        System.out.println("login");
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        System.out.println("username: " + username);
        System.out.println("password: " + password);
        
        Date today = new Date();
        
        List<BuyerDetails> userList = getUserByUsername(username);
        System.out.println("user list: " + userList);

        if (!userList.isEmpty()) {
            BuyerDetails loggedInUser = userList.get(0);

            if (loggedInUser.getStatus() != null && loggedInUser.getStatus().equalsIgnoreCase("Delete")) {
                System.out.println("user_deleted: " + user_deleted);
                map.put("message", user_deleted);
                return new ModelAndView("login", "map", map);
            }
            if (loggedInUser.getPassword() != null && !passwordEncoder.matches(password, loggedInUser.getPassword())) {
                System.out.println("incorrect_password: " + incorrect_password);
                map.put("message", incorrect_password);
                return new ModelAndView("login", "map", map);
            }
            String role = loggedInUser.getRole();
            System.out.println("Role: " + role);

//            byte[] images = loggedInUser.getProfilepicture();
            List<GrantedAuthority> grantedAuths = AuthorityUtils.commaSeparatedStringToAuthorityList(role);

//        RememberMeAuthenticationToken rememberMeToken = new RememberMeAuthenticationToken("remember-me", loggedInUser, grantedAuths);
            Authentication auth = new UsernamePasswordAuthenticationToken(loggedInUser, null, grantedAuths);
//        Authentication auth = new UsernamePasswordAuthenticationToken(loggedInUser, null);
//        auth = authenticationManager.authenticate(auth);

            SecurityContext sc = SecurityContextHolder.getContext();
            sc.setAuthentication(auth);

//            HttpSession session = request.getSession(true);
            session.setAttribute("SPRING_SECURITY_CONTEXT_KEY", sc);

            System.out.println("Authentication :" + auth);
            logger.info("login in logger");
            
            // Make entry for audit log report in NG_BP_Report_BuyerAuditLog table
            reportBuyerAuditLog.setActivityPerformed("Logged In");
            reportBuyerAuditLog.setCreatedate(new Date());
            reportBuyerAuditLog.setNgBpBuyerdetailsId(loggedInUser);
            String id = saveBuyerAuditLogReport(reportBuyerAuditLog);
            System.out.println("ActivityId: " + id);
            
            // Make entry for online user in NG_BP_Online_Users table
            onlineUsersEntity.setUsername(username);
            onlineUsersEntity.setType("Buyer");
            onlineUsersEntity.setIsLoggedIn(Boolean.TRUE);
            onlineUsersEntity.setLoginTime(today);
            String onlineUserId = loginWSUtil.saveOnlineUsers(onlineUsersEntity);
            System.out.println("onlineUserId: " + onlineUserId);
            
            return new ModelAndView("redirect:/dashboardcont.do");
        } else {
            System.out.println("incorrect_username: " + incorrect_username);
            map.put("message", incorrect_username);
            return new ModelAndView("login", "map", map);
        }

    }

    @RequestMapping(value = "/index")
    public ModelAndView doLogin(HttpServletRequest request, HttpServletResponse response, Principal principal, Authentication authentication) throws JSONException {
        String message = "";
        System.out.println("index");
        String uname = request.getParameter("username");
        String password = request.getParameter("password");
//        
//        System.out.println("Principal : " + principal);
//        System.out.println("Authentication : " + authentication);
//
//        List<Userdetail> user = null;
//        user = (List<Userdetail>) userDao.findByUsername(uname);
//        System.out.println("Size: " + user.size());
//        System.out.println("pass: " + passwordEncoder.matches(password, user.get(0).getPassword()));
//        if (user != null && !user.isEmpty() && passwordEncoder.matches(password, user.get(0).getPassword())) {
//
//            return new ModelAndView("redirect:/home.do")
//                    .addObject("username", user.get(0).getUsername())
//                    .addObject("userId", user.get(0).getUserid())
//                    .addObject("userType", user.get(0).getUsertype())
//                    .addObject("name", user.get(0).getFirstname() + " " + user.get(0).getLastname())
//                    .addObject("emailId", user.get(0).getWorkemailid())
//                    .addObject("mobile", user.get(0).getContactnumber());
//
//        } else {
//            message = "Sorry, you are not authorised user!";
//            return new ModelAndView("login", "message", message);
//        }
        return new ModelAndView("redirect:/home.do");
    }

    @RequestMapping(value = "/error", method = RequestMethod.GET)
    public ModelAndView accessDenied(Principal principal) {
        ModelAndView model = new ModelAndView();
        if (principal == null) {
            model.addObject("message", "you do not have permission to access this page!");
        } else {
            model.addObject("msg", "You have permission to access this page!");
        }
        model.setViewName("error");
        return model;
    }

    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public ModelAndView doLogout(HttpSession session, RedirectAttributes redirect) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        BuyerDetails buyer = null;
        if (auth.getPrincipal() instanceof BuyerDetails) {
            buyer = (BuyerDetails) auth.getPrincipal();
            Date today = new Date();
            
            // Make entry for audit log report in NG_BP_Report_BuyerAuditLog table
            reportBuyerAuditLog.setActivityPerformed("Logged Out");
            reportBuyerAuditLog.setCreatedate(new Date());
            reportBuyerAuditLog.setNgBpBuyerdetailsId(buyer);
            String id = saveBuyerAuditLogReport(reportBuyerAuditLog);
            System.out.println("ActivityId: " + id);
            
            // Update logout time and IsLoggedIn flag in NG_BP_Online_Users table
            List<OnlineUsers> list = loginWSUtil.findOnlineUserByUsername(buyer.getUsername());
            for(OnlineUsers obj : list) {
                obj.setIsLoggedIn(Boolean.FALSE);
                obj.setLogoutTime(today);
                loginWSUtil.updateOnlineUsers(obj);
            }
        }
        System.out.println("buyer : " + buyer);

        String message = "You have been logged out.";
        redirect.addFlashAttribute("message", message);
        session.invalidate();
        return new ModelAndView("redirect:/welcome.do");
    }

    @RequestMapping(value = "/signup", method = RequestMethod.GET)
    public ModelAndView signUp() {
//        String message = "You have been logged out.";
        return new ModelAndView("sign-up");
    }

    @RequestMapping(value = "/forgotpass", method = RequestMethod.GET)
    public ModelAndView forgotPassword() {
//        String message = "You have been logged out.";
        System.out.println("forgot-pass");
        return new ModelAndView("forgot-password");
    }

    @RequestMapping(value = "/editprofile", method = RequestMethod.GET)
    public ModelAndView editProfile(Map<String, Object> map, ModelMap model) {
//        String message = "You have been logged out.";
        System.out.println("edit profile");
        List<SecurityQuestionSeeded> secQuesSeeded = getSecQueSeeded();

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();

        int id = buyer.getId();

        System.out.println("id in Edit profile : " + id);

        BuyerDetails buyerObj = getBuyerById(id);

        List<BuyerSecurityQueAns> queAns = getQueAnsById(id);
        map.put("queAns", queAns);

        map.put("secQuesSeeded", secQuesSeeded);

        map.put("buyerObj", buyerObj);

        System.out.println("Last Name :" + buyerObj.getLastname());

        String profilePicString = "";
        if (buyerObj != null && buyerObj.getProfilepicture() != null) {
            System.out.println("profilepicture:");
            byte[] profilepicture = buyerObj.getProfilepicture();
            byte[] encodedImage = Base64.getEncoder().encode(profilepicture);
            profilePicString = new String(encodedImage);
        } else {
            System.out.println("else");
            profilePicString = "NotFound";
        }

        model.addAttribute("profilePicString", profilePicString);

        return new ModelAndView("editprofile", "map", map);
    }

    @RequestMapping(value = "/resetpassword", method = RequestMethod.POST)
    public ModelAndView resetPassword(HttpServletRequest request, Map<String, Object> map) {

        String password = request.getParameter("newpassword");
        String buyerid = request.getParameter("buyerid");
//        String cnfpassword = request.getParameter("cnfpassword");
        Date date = new Date();

        System.out.println("password in resetpassword :" + password);

        System.out.println("buyerid in resetpassword :" + buyerid);

        int id = Integer.parseInt(buyerid);

        BuyerDetails buyerObj = getBuyerById(id);
//
        buyerObj.setPassword(passwordEncoder.encode(password));

        buyerObj.setUpdatedate(date);

        String buyermsg = updateBuyer(buyerObj);

        System.out.println("buyermsg in resetpassword :" + buyermsg);

        System.out.println("reset_password: " + reset_password);

        map.put("message", reset_password);

        return new ModelAndView("login", "map", map);
    }

    @RequestMapping(value = "updatepass", method = RequestMethod.POST)
    public ModelAndView updatePasswordAtFirstLogin(HttpServletRequest request, HttpSession session, Map<String, Object> map, RedirectAttributes model) {

        System.out.println("updatepass");

        String password = request.getParameter("password");
//        String conformpassword = request.getParameter("conformpassword");

        System.out.println("password :" + password);

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();

//        int id = buyer.getId();
        buyer.setPassword(passwordEncoder.encode(password));

        buyer.setIsPasswordUpdated("Yes");

        String msg = updateBuyer(buyer);

        System.out.println("msg in updatepass :" + msg);

        return new ModelAndView("redirect:/dashboardcont.do");

    }

    List<BuyerDetails> getUserByUsername(String username) {
        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/userbyusername.do?uname=" + username;

        System.out.println("url: " + url);

        ResponseEntity<List<BuyerDetails>> restUsernameResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<BuyerDetails>>() {
        });

        List<BuyerDetails> userList = restUsernameResponse.getBody();

        System.out.println("user list: " + userList);

        return userList;
    }

//    List<PRDetails> getAllPrDetails(String status) {
//
//        RestTemplate restTemplate = new RestTemplate();
//
//        String url = webservice_ip + "/BuyerPortalWebServices/getallprdetails.do?status=" + status;
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
    List<NewgenPRLineItem> getAllPrDetails(String status) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/getallprdetails.do?status=" + status;
        System.out.println("url: " + url);

        ResponseEntity<List<NewgenPRLineItem>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NewgenPRLineItem>>() {
        });
        List<NewgenPRLineItem> prList = prResponse.getBody();

        System.out.println("prList size: " + prList.size());

        return prList;
    }

    List<NewgenContractLineItem> getAllContractDetails(String status) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/getallcontractdetails.do?status=" + status;
        System.out.println("url: " + url);

        ResponseEntity<List<NewgenContractLineItem>> contractResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NewgenContractLineItem>>() {
        });
        List<NewgenContractLineItem> contractList = contractResponse.getBody();

        System.out.println("prList contractList: " + contractList.size());

        return contractList;
    }

    List<BuyerDetails> getAllBuyers() {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/getallbuyers.do";
        System.out.println("url: " + url);

        ResponseEntity<List<BuyerDetails>> restGroupResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<BuyerDetails>>() {
        });

        System.out.println("Bittu");
        System.out.println("restGroupResponse: " + restGroupResponse);
        List<BuyerDetails> buyerList = restGroupResponse.getBody();

        System.out.println("buyerList size: " + buyerList.size());

        return buyerList;
    }

    List<BuyerDetails> findAllBuyerExceptTeamLead() {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findallexceptteamlead.do";
        System.out.println("url: " + url);

        ResponseEntity<List<BuyerDetails>> restGroupResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<BuyerDetails>>() {
        });

        System.out.println("Bittu");
        System.out.println("restGroupResponse: " + restGroupResponse);
        List<BuyerDetails> buyerList = restGroupResponse.getBody();

        System.out.println("buyerList size: " + buyerList.size());

        return buyerList;
    }

//    List<PRDetails> findPrLineByRfqStatus(String status, int buyerid) {
//
//        RestTemplate restTemplate = new RestTemplate();
//
//        String url = webservice_ip + "/BuyerPortalWebServices/findprlinebyrfqstatus.do?rfqstatus=" + status + "&buyerid=" + buyerid;
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
    /*Newgen*/
    List<NewgenPRLineItem> findNewgenLineByRfqStatus(String status, int buyerid) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findnewgenlinebyrfqstatus.do?rfqstatus=" + status + "&buyerid=" + buyerid;
        System.out.println("url: " + url);

        ResponseEntity<List<NewgenPRLineItem>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NewgenPRLineItem>>() {
        });
        List<NewgenPRLineItem> prList = prResponse.getBody();

        System.out.println("prList size: " + prList.size());

        return prList;
    }
    /*Newgen*/

//    List<PRDetails> findPrLineByStatusAndBuyer(String status, int buyerid) {
//
//        RestTemplate restTemplate = new RestTemplate();
//
//        String url = webservice_ip + "/BuyerPortalWebServices/findprlinebystatusandbuyer.do?status=" + status + "&buyerid=" + buyerid;
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
     /*Newgen*/
    List<NewgenPRLineItem> findNewgenLineByStatusAndBuyer(String status, int buyerid) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findnewgenlinebystatusandbuyer.do?status=" + status + "&buyerid=" + buyerid;
        System.out.println("url: " + url);

        ResponseEntity<List<NewgenPRLineItem>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NewgenPRLineItem>>() {
        });
        List<NewgenPRLineItem> prList = prResponse.getBody();

        System.out.println("prList size: " + prList.size());

        return prList;
    }
    /*Newgen*/

    List<WorkOrderRfqHeader> findRfqHeaderByBuyerId(int buyerid) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findrfqheaderbybuyerid.do?buyerid=" + buyerid;
        System.out.println("url: " + url);

        ResponseEntity<List<WorkOrderRfqHeader>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<WorkOrderRfqHeader>>() {
        });
        List<WorkOrderRfqHeader> rfqHeaderList = prResponse.getBody();

        return rfqHeaderList;
    }

    List<SecurityQuestionSeeded> getSecQueSeeded() {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/getsecqueseeded.do";
        System.out.println("url: " + url);

        ResponseEntity<List<SecurityQuestionSeeded>> secResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<SecurityQuestionSeeded>>() {
        });
        List<SecurityQuestionSeeded> secQueList = secResponse.getBody();

        return secQueList;
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

    List<BuyerVendorNotification> findBuyerNotification(int buyerid) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findbuyernotification.do?buyerid=" + buyerid;
        System.out.println("url: " + url);

        ResponseEntity<List<BuyerVendorNotification>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<BuyerVendorNotification>>() {
        });
        List<BuyerVendorNotification> buyerNotificationList = response.getBody();

        System.out.println("vendorList size: " + buyerNotificationList.size());

        return buyerNotificationList;
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

    String updateBuyer(BuyerDetails buyerObj) {

        RestTemplate restTemplate = new RestTemplate();

        System.out.println("buyerObj : " + buyerObj);

        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updatebuyer.do"), buyerObj, String.class);

        System.out.println("updated in updatebuyer");

        return msg;
    }

    List<BuyerTeamleadMapping> findBuyerMappingByTeamlead(int teamleadid) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findbuyermappingbyteamlead.do?id=" + teamleadid;
        System.out.println("url: " + url);

        ResponseEntity<List<BuyerTeamleadMapping>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<BuyerTeamleadMapping>>() {
        });
        List<BuyerTeamleadMapping> mappingList = response.getBody();

        return mappingList;
    }

//    String updateFirstTimeLoginBuyer(BuyerDetails buyer) {
//
//        RestTemplate restTemplate = new RestTemplate();
//
//        System.out.println("buyer :");
//        
//        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/updatebuyer.do"), buyer, String.class);
//
//        System.out.println("updated in updatebuyer");
//
//        return msg;
//        
//        
//    }
    List<NGExtCM> findNewgenContractLineItemByStatusAndBuyer(int buyerid) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findcontractassignedtothisbuyer.do?id=" + buyerid;
        System.out.println("url: " + url);

        ResponseEntity<List<NGExtCM>> contractResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGExtCM>>() {
        });
        List<NGExtCM> newgenList = contractResponse.getBody();

        System.out.println("newgenList size: " + newgenList.size());

        return newgenList;
    }

    List<NewgenPRLineItem> findInitiatedPRByStatusAndBuyer(String status, int buyerid) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findinitiatedprbystatusandbuyer.do?status=" + status + "&buyerid=" + buyerid;
        System.out.println("url: " + url);

        ResponseEntity<List<NewgenPRLineItem>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NewgenPRLineItem>>() {
        });
        List<NewgenPRLineItem> prList = prResponse.getBody();

        System.out.println("prList size: " + prList.size());

        return prList;
    }

    List<NewgenPRLineItem> findPRAssignedToThisBuyer(int buyerId) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findprassignedtobuyer.do?id=" + buyerId;
        System.out.println("url: " + url);

        ResponseEntity<List<NewgenPRLineItem>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NewgenPRLineItem>>() {
        });
        List<NewgenPRLineItem> prList = prResponse.getBody();

        System.out.println("prList size: " + prList.size());

        return prList;
    }

    List findPRLineByJoining(String status) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findPRLineByJoining.do?status=" + status;
        System.out.println("url: " + url);

        ResponseEntity<List> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List>() {
        });
        List list = response.getBody();
        System.out.println("list size: " + list.size());
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

    List<TlPrLineItemsBean> callTlPrLineItemsStoredProcedure(String status, String currentWorkstep, String companyCode, String buyerId, String prType, String tlUsername) {

        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/callTlPrLineItemsStoredProcedure.do?status=" + status + "&currentWorkstep=" + currentWorkstep + "&companyCode=" + companyCode + "&buyerId=" + buyerId + "&prType=" + prType + "&tlUsername=" + tlUsername;
        System.out.println("url: " + url);
        ResponseEntity<List<TlPrLineItemsBean>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<TlPrLineItemsBean>>() {
        });
        List<TlPrLineItemsBean> list = prResponse.getBody();
        System.out.println("list size: " + list.size());
        return list;
    }

    List<TlPrLineItemsBean> callTlPrLineItemsStoredProcedureByPRType(String status, String currentWorkstep, String companyCode, String buyerId, String prType, String tlUsername) {

        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/callTlPrLineItemsStoredProcedureByPRType.do?status=" + status + "&currentWorkstep=" + currentWorkstep + "&companyCode=" + companyCode + "&buyerId=" + buyerId + "&prType=" + prType + "&tlUsername=" + tlUsername;
        System.out.println("url: " + url);

        ResponseEntity<List<TlPrLineItemsBean>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<TlPrLineItemsBean>>() {
        });
        List<TlPrLineItemsBean> list = prResponse.getBody();
        System.out.println("list size: " + list.size());
        return list;
    }

    List<String> findDistinctPRNumber() {

        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findDistinctPRNumber.do";
        System.out.println("url: " + url);

        ResponseEntity<List<String>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<String>>() {
        });
        List<String> list = prResponse.getBody();
        System.out.println("distinct pr no: " + list.size());
        return list;
    }

    List<NGExtPRToPO> getNGExtPRToPO() {

        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getNGExtPRToPO.do";
        System.out.println("url: " + url);

        ResponseEntity<List<NGExtPRToPO>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGExtPRToPO>>() {
        });
        List<NGExtPRToPO> list = prResponse.getBody();
        System.out.println("NGExtPRToPO: " + list.size());
        return list;
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

    public List<AdminDashboardCountBean> callAdminDashboardCountStoredProcedure() {

        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/callAdminDashboardCountStoredProcedure.do";
        ResponseEntity<List<AdminDashboardCountBean>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<AdminDashboardCountBean>>() {
        });
        List<AdminDashboardCountBean> list = response.getBody();
        return list;
    }

    public List<MasterDepartment> findMaterDepartment() {

        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findMaterDepartment.do";
        ResponseEntity<List<MasterDepartment>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterDepartment>>() {
        });
        List<MasterDepartment> list = response.getBody();
        return list;
    }

    public List<MasterMaterialGroup> findMasterMaterialGroup() {

        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findMasterMaterialGroup.do";
        ResponseEntity<List<MasterMaterialGroup>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterMaterialGroup>>() {
        });
        List<MasterMaterialGroup> list = response.getBody();
        return list;
    }

    public List<WorkOrderRfqHeader> getWorkOrderRfqHeaders() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getWorkOrderRfqHeaders.do";
        ResponseEntity<List<WorkOrderRfqHeader>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<WorkOrderRfqHeader>>() {
        });
        List<WorkOrderRfqHeader> list = response.getBody();
        return list;
    }

    List<BuyerPendingPRLineItemsBean> callBuyerPendingPrLineItemsStoredProcedure(int buyerId, String prType, int noOfDays, String initiatorId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/callBuyerPendingPrLineItemsStoredProcedure.do?buyerid=" + buyerId + "&prtype=" + prType + "&noOfDays=" + noOfDays + "&initiatorId=" + initiatorId;
        System.out.println("url: " + url);
        ResponseEntity<List<BuyerPendingPRLineItemsBean>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<BuyerPendingPRLineItemsBean>>() {
        });
        List<BuyerPendingPRLineItemsBean> buyerPendingPRList = response.getBody();
        return buyerPendingPRList;
    }

    //Saurabh 24 December
    //overdueRFQ(buyer.getId());
    List overdueRFQ(int buyerId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/overdueRFQ.do?buyerid=" + buyerId;
        System.out.println("url: " + url);
        ResponseEntity<List> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List>() {
        });

        List overdueList = response.getBody();
        System.out.println("Response get");
        return overdueList;
    }

    List pendingPo(int buyerid) {
        System.out.println("Inside Pending PO in login .do");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/pendingPo.do?buyerid=" + buyerid;
        System.out.println("url: " + url);
        ResponseEntity<List> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List>() {
        });
        List pendingPo = response.getBody();
        System.out.println("Response get");
        System.out.println("Size is (Pending Po List)::" + pendingPo.size());
        return pendingPo;
    }
//abhishek

    List<TlContractLinesBean> callTlContractLineStoredProcedure(String status, String buyerId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/callTlContractLineStoredProcedure.do?buyerId=" + buyerId + "&status=" + status;
        System.out.println("callTlContractLineStoredProcedure url" + url);
        ResponseEntity<List<TlContractLinesBean>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<TlContractLinesBean>>() {
        });
        List<TlContractLinesBean> list = response.getBody();
        return list;
    }

    public List<ContractRfqHeader> getContractRfqHeaders() {
        System.out.println("inside getContractRfqHeaders");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getContractRfqHeaders.do";
        System.out.println("url getContractRfqHeaders" + url);
        ResponseEntity<List<ContractRfqHeader>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ContractRfqHeader>>() {
        });
        List<ContractRfqHeader> list = response.getBody();
        return list;
    }

    List<BuyerPendingContractLineItemsBean> callBuyerPendingContractLineItemsStoredProcedure(int buyerId, String prType) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/callBuyerPendingContractLineItemsStoredProcedure.do?buyerid=" + buyerId + "&prtype=" + prType;
        System.out.println("url tlcontract " + url);
        ResponseEntity<List<BuyerPendingContractLineItemsBean>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<BuyerPendingContractLineItemsBean>>() {
        });
        List<BuyerPendingContractLineItemsBean> buyerPendingPRList = response.getBody();
        return buyerPendingPRList;
    }

    List<ContractRfqHeader> findContractTender() {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findContractTenders.do?";
        System.out.println("url: " + url);

        ResponseEntity<List<ContractRfqHeader>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ContractRfqHeader>>() {
        });
        List<ContractRfqHeader> contractRfqHeaderList = prResponse.getBody();

        return contractRfqHeaderList;
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

    List<ContractRfqHeader> findContractRfqHeaderByBuyerId(int buyerid) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findcontractrfqheaderbybuyerid.do?buyerid=" + buyerid;
        System.out.println("url: " + url);

        ResponseEntity<List<ContractRfqHeader>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<ContractRfqHeader>>() {
        });
        List<ContractRfqHeader> contractRfqHeaderList = prResponse.getBody();

        return contractRfqHeaderList;
    }

    // abhishek
    List<NGExtPOCreation> findByCurrentWorkstepAndInitiatorId(String currentWorkstep, String initiatorID) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findByCurrentWorkstepAndInitiatorId.do?currentWorkstep=" + currentWorkstep + "&initiatorID=" + initiatorID;
        System.out.println("url: " + url);
        ResponseEntity<List<NGExtPOCreation>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGExtPOCreation>>() {
        });
        List<NGExtPOCreation> list = response.getBody();
        return list;
    }
}
