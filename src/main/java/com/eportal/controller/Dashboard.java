/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.controller;

import com.eportal.entities.BuyerDetails;
import com.eportal.entities.BuyerTeamleadMapping;
import com.eportal.entities.ContractRfqHeader;
import com.eportal.entities.MasterCompanyCode;
import com.eportal.entities.MasterDepartment;
import com.eportal.entities.MasterMaterialGroup;
import com.eportal.entities.MasterPurchasingGroup;
import com.eportal.entities.NGExtCM;
import com.eportal.entities.NGExtPRToPO;
import com.eportal.entities.NewgenContractLineItem;
import com.eportal.entities.NewgenPRLineItem;
import com.eportal.entities.ReportBuyerAuditLog;
import com.eportal.entities.TeamLeadCompanyCodeMapping;
import com.eportal.entities.TlContractLinesBean;
import com.eportal.entities.TlPrLineItemsBean;
import com.eportal.entities.WorkOrderRfqHeader;
import com.eportal.webservice.util.PurchaseOrderWS;
import com.eportal.webservice.util.RfqRfpWS;
import java.net.URI;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

/**
 *
 * @author admin
 */
@Controller
public class Dashboard {

    @Autowired
    BuyerDetails buyerDetails;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    BuyerTeamleadMapping buyerTeamleadMapping;
    @Autowired
    TeamLeadCompanyCodeMapping teamleadCompanyCodeMapping;
    @Value("${webservice.ip}")
    private String webservice_ip;
    @Value("${teamlead_password}")
    private String teamlead_password;
    @Autowired
    ReportBuyerAuditLog reportBuyerAuditLog;
    @Autowired
    RfqRfpWS rfqRfpUtilWS;
    @Autowired
    PurchaseOrderWS purchaseOrderUtilWS;

    @RequestMapping(value = "assignprline", method = RequestMethod.POST)
    public ModelAndView assignPrLineToBuyer(HttpServletRequest request) {
        System.out.println("assignprline");

        String prlineids = request.getParameter("prlineids");
        String buyerid = request.getParameter("buyerid");

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        String teamLeadId = buyer.getUsername();
        String role = buyer.getRole();

        System.out.println("prlineids: " + prlineids);
        System.out.println("buyerid: " + buyerid);
        System.out.println("teamLeadId: " + teamLeadId);
        System.out.println("role: " + role);

        // Assign PR Line to Buyer
        String result = assignPr(prlineids, Integer.parseInt(buyerid), teamLeadId);
        System.out.println("result: " + result);

        BuyerDetails b = getBuyerById(Integer.parseInt(buyerid));

        reportBuyerAuditLog.setActivityPerformed("New PR Lines assigned to " + b.getUsername());
        reportBuyerAuditLog.setCreatedate(new Date());
        reportBuyerAuditLog.setNgBpBuyerdetailsId(buyer);
        saveBuyerAuditLogReport(reportBuyerAuditLog);

        if (role.equals("ROLE_TL_BUYER") || role.equals("ROLE_ADMIN_TL_BUYER")) {
            return new ModelAndView("redirect:/prcontractassignment.do");
        } else {
            return new ModelAndView("redirect:/dashboardcont.do");
        }
    }

//    @RequestMapping(value = "assigncontractline", method = RequestMethod.POST)
//    public ModelAndView assignContractLineToBuyer(HttpServletRequest request) {
//        System.out.println("assigncontractline");
//        String contractlineids = request.getParameter("contractlineids");
//        String buyerid = request.getParameter("contractbuyerid");
//
//        System.out.println("contractlineids: " + contractlineids);
//        System.out.println("buyerid: " + buyerid);
//
//        String result = assignContract(contractlineids, Integer.parseInt(buyerid));
//
////        System.out.println("result: " + result);
//        return new ModelAndView("redirect:/dashboardcont.do");
//
//    }
    @RequestMapping(value = "groupmanagement")
    public ModelAndView groupManagement(HttpServletRequest request, ModelMap model) {
        System.out.println("groupmanagement");

        List<BuyerDetails> buyerList = findAllBuyerExceptTeamLead();
//        List<BuyerDetails> teamleadtList = findBuyerByRole("ROLE_TEAM_LEAD");
        List<BuyerDetails> teamleadtList = findAllTeamLead();
        List<MasterCompanyCode> masterCompanyCodeList = findAllMasterCompanyCode();
        List<MasterPurchasingGroup> masterPurchasingGroupList = findAllMasterPurchaseGroup();

        model.put("buyerList", buyerList);
        model.put("teamleadtList", teamleadtList);
        model.addAttribute("companyCodeList", masterCompanyCodeList);
        model.addAttribute("purchaseGroupList", masterPurchasingGroupList);

        return new ModelAndView("groupmanagement");

    }

    @RequestMapping(value = "createteamleadid.do", method = RequestMethod.POST)
    public ModelAndView createTealleadId(HttpServletRequest request, RedirectAttributes model) {
        System.out.println("createteamleadid");

        String firstname = request.getParameter("firstname");
        String lastname = request.getParameter("lastname");
        String emailid = request.getParameter("emailid");
        String companycode = request.getParameter("companycode");
        String purchasinggroup = request.getParameter("purchasinggroup");
        String teamleadid = request.getParameter("teamleadid");

        System.out.println("firstname :" + firstname);
        System.out.println("lastname :" + lastname);
        System.out.println("emailid :" + emailid);
        System.out.println("companycode: " + companycode);
        System.out.println("purchasinggroup: " + purchasinggroup);
        System.out.println("teamleadid: " + teamleadid);

        Date date = new Date();

        buyerDetails.setFirstname(firstname);
        buyerDetails.setLastname(lastname);
        buyerDetails.setEmailid(emailid);
        buyerDetails.setUsername(teamleadid);
        buyerDetails.setCreatedate(date);
        buyerDetails.setUpdatedate(date);
        buyerDetails.setPassword(passwordEncoder.encode(teamlead_password));
        buyerDetails.setRole("ROLE_TEAM_LEAD");
        buyerDetails.setIsPasswordUpdated("No");
        buyerDetails.setisPersonalInfoUpdated("No");
        buyerDetails.setStatus("Active");
        buyerDetails.setTeamlead("Yes");
        buyerDetails.setCompanyCode(companycode);

        // Save Team Lead in NG_BP_buyerdetails table
        String msg = saveBuyer(buyerDetails);

        System.out.println("Buyer Id : " + msg);
        BuyerDetails tl = getBuyerById(Integer.parseInt(msg));

        // Make Team Lead Company Code Mapping in NG_BP_TeamLead_CompanyCode_Mapping table
        teamleadCompanyCodeMapping.setTeamleadId(tl);
        String[] cocode = companycode.split(",");
        for (String code : cocode) {
            teamleadCompanyCodeMapping.setCompanyCode(code);
            String codeMappingId = saveTeamLeadCompanyCodeMapping(teamleadCompanyCodeMapping);
            System.out.println("codeMappingId: " + codeMappingId);
        }

        model.addFlashAttribute("message", "Team Lead Id has been created successfully.");

        return new ModelAndView("redirect:/groupmanagement.do");

    }

    @RequestMapping(value = "associatebuyerteamlead", method = RequestMethod.POST)
    public ModelAndView associateBuyerTeamlead(HttpServletRequest request, RedirectAttributes model) {
        System.out.println("createteamleadid");

        String companycode = request.getParameter("ass_companycode");
        String buyerids = request.getParameter("buyerids");
        String teamleadid = request.getParameter("ass_teamleadid");

        System.out.println("companycode: " + companycode);
        System.out.println("buyerids: " + buyerids);
        System.out.println("teamleadid: " + teamleadid);

        BuyerDetails teamlead = getBuyerById(Integer.parseInt(teamleadid));

        String[] buyerIdArr = buyerids.split(",");

        // Make entry in 
        for (String id : buyerIdArr) {
            BuyerDetails buyer = getBuyerById(Integer.parseInt(id));

            System.out.println("buyer: " + buyer);

            buyerTeamleadMapping.setNgBpBuyerdetailsId(buyer);
            buyerTeamleadMapping.setNgBpBuyerteamleadId(teamlead);

            String mappingid = saveBuyerTeamleadMapping(buyerTeamleadMapping);
            System.out.println("mappingid: " + mappingid);
        }

        model.addFlashAttribute("message", "Buyers have been associated to teamlead successfully.");

        return new ModelAndView("redirect:/groupmanagement.do");
    }

    @RequestMapping(value = "prcontractassignment", method = RequestMethod.GET)
    public ModelAndView prContractAssignment(ModelMap model) {
        System.out.println("prContractAssignment");

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        BuyerDetails buyer = null;
        if (auth.getPrincipal() instanceof BuyerDetails) {
            buyer = (BuyerDetails) auth.getPrincipal();
        }
        System.out.println("buyer : " + buyer);

        if (buyer != null) {
            String companyCode = buyer.getCompanyCode();
            String role = buyer.getRole();
            String username = buyer.getUsername();
            System.out.println("companyCode1: " + companyCode);
            System.out.println("role: " + role);
            System.out.println("username: " + username);

            List<TlPrLineItemsBean> tlUnassignedPRLineList = null;
            List<TlPrLineItemsBean> tlUnassignedServicePRLineList = null;
            List<TlPrLineItemsBean> tlUnassignedMaterialPRLineList = null;

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
            if (!mappingList.isEmpty()) {
                String mappingBuyerIds = mappingList.stream().map(mapping -> mapping.getNgBpBuyerdetailsId().getId().toString()).collect(Collectors.joining(","));
                System.out.println("mappingBuyerIds: " + mappingBuyerIds);
                allRfqList = rfqRfpUtilWS.findRfqHeaderByBuyerIdIn(mappingBuyerIds);
            }

            System.out.println("Size of tlUnassignedServicePRLineList is :" + tlUnassignedServicePRLineList.size());
            System.out.println("Size of tlUnassignedMaterialPRLineList is :" + tlUnassignedMaterialPRLineList.size());
            System.out.println("Size of tlAssignedServicePRLineList is :" + tlAssignedServicePRLineList.size());
            System.out.println("Size of tlAssignedServicePRLineList is :" + tlAssignedMaterialPRLineList.size());

            model.addAttribute("loggedInUser", buyer);
            model.addAttribute("buyerMappingList", mappingList);
            model.addAttribute("prCountList", prCountList);
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
        }

        return new ModelAndView("teamleaddashboard");
    }

    @RequestMapping(value = "filterWorkLoadReport", method = RequestMethod.POST)
    public ModelAndView filterWorkLoadReport(HttpServletRequest request, HttpSession session, RedirectAttributes redirect) {
        System.out.println("filterWorkLoadReportMaterial");
        DateFormat formatFrom = new SimpleDateFormat("dd.MM.yyyy");
        DateFormat formatTo = new SimpleDateFormat("MM-dd-yyyy");

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        String role = buyer.getRole();

        Calendar calendar = Calendar.getInstance();

        String CompanyCode = (String) session.getAttribute("CompanyCode");
        System.out.println("CompanyCode in dash: " + CompanyCode);

        String materialService = request.getParameter("material");
        String trackingNumberIds = request.getParameter("trackingNumberIds");
        String type = request.getParameter("type");
        String fromPurchaseGroup = request.getParameter("fromPurchaseGroup");
        String toPurchaseGroup = request.getParameter("toPurchaseGroup");

        String fromMaterialGroup = request.getParameter("fromMaterialGroup");
        String toMaterialGroup = request.getParameter("toMaterialGroup");

        String fromPlant = request.getParameter("fromPlantCode");
        String toPlant = request.getParameter("toPlantCode");

        String fromPRNumber = request.getParameter("fromPRNumber");
        String toPRNumber = request.getParameter("toPRNumber");

        String fromPRApprovedDate = request.getParameter("fromPRApprovedDate");
        String toPRApprovedDate = request.getParameter("toPRApprovedDate");

        String prRaisedBy = request.getParameter("prRaisedBy");

        String fromMaterialClass = request.getParameter("fromMaterialClass");
        String toMaterialClass = request.getParameter("toMaterialClass");

        System.out.println("materialService: " + materialService);
        System.out.println("trackingNumberIds: " + trackingNumberIds);
        System.out.println("type: " + type);
        System.out.println("fromPurchaseGroup: " + fromPurchaseGroup);
        System.out.println("toPurchaseGroup: " + toPurchaseGroup);
        System.out.println("fromMaterialGroup: " + fromMaterialGroup);
        System.out.println("toMaterialGroup: " + toMaterialGroup);
        System.out.println("fromPlant: " + fromPlant);
        System.out.println("toPlant: " + toPlant);
        System.out.println("fromPRNumber: " + fromPRNumber);
        System.out.println("toPRNumber: " + toPRNumber);
        System.out.println("fromPRApprovedDate: " + fromPRApprovedDate);
        System.out.println("toPRApprovedDate: " + toPRApprovedDate);
        System.out.println("prRaisedBy: " + prRaisedBy);
        System.out.println("fromMaterialClass: " + fromMaterialClass);
        System.out.println("toMaterialClass: " + toMaterialClass);

        Date fromPRApproved_date = null;
        if (fromPRApprovedDate != null && !fromPRApprovedDate.trim().equalsIgnoreCase("")) {
            try {
                fromPRApproved_date = formatFrom.parse(fromPRApprovedDate);
                fromPRApprovedDate = formatTo.format(fromPRApproved_date);
                System.out.println("fromPRApproved_date: " + fromPRApprovedDate);
            } catch (ParseException e) {
                System.out.println(e);
            }
        }
        Date toPRApproved_date = null;
        if (toPRApprovedDate != null && !toPRApprovedDate.trim().equalsIgnoreCase("")) {
            try {
                toPRApproved_date = formatFrom.parse(toPRApprovedDate);
                System.out.println("toPRApproved_date: " + toPRApprovedDate);

                calendar.setTime(toPRApproved_date);
                calendar.add(Calendar.DAY_OF_MONTH, 1);
                toPRApproved_date = calendar.getTime();

                toPRApprovedDate = formatTo.format(toPRApproved_date);
                System.out.println("toPRApproved_date: " + toPRApprovedDate);

            } catch (ParseException e) {
                System.out.println(e);
            }
        }

        List<TlPrLineItemsBean> list = callTlFilterPrLineItemsStoredProcedure(materialService, trackingNumberIds, type, fromPurchaseGroup,
                fromMaterialGroup, fromPlant, toPlant, fromPRNumber, toPRNumber, fromPRApprovedDate, toPRApprovedDate, prRaisedBy, toPurchaseGroup,
                toMaterialGroup, fromMaterialClass, toMaterialClass, CompanyCode);

        System.out.println("Filter List Size: " + list.size());

        redirect.addFlashAttribute("isFilter", "Yes");
        redirect.addFlashAttribute("filterResultSet", list);
        System.out.println("materialService in filterWorkLoadReport:" + materialService);
        redirect.addFlashAttribute("materialService", materialService);

        if (role.equals("ROLE_TL_BUYER") || role.equals("ROLE_ADMIN_TL_BUYER")) {
            return new ModelAndView("redirect:/prcontractassignment.do");
        } else {
            return new ModelAndView("redirect:/dashboardcont.do");
        }
    }

    @RequestMapping(value = "filterWorkLoadReportService", method = RequestMethod.POST)
    public ModelAndView filterWorkLoadReportService(HttpServletRequest request, HttpSession session, RedirectAttributes redirect) {
        System.out.println("filterWorkLoadReport");
        DateFormat formatFrom = new SimpleDateFormat("dd.MM.yyyy");
        DateFormat formatTo = new SimpleDateFormat("MM-dd-yyyy");
        System.out.println("filterWorkLoadReportService");
        Calendar calendar = Calendar.getInstance();
        
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        String role = buyer.getRole();
        
        String CompanyCode = (String) session.getAttribute("CompanyCode");
        System.out.println("CompanyCode in dash: " + CompanyCode);

        String materialService = request.getParameter("Service");
        String trackingNumberIds = request.getParameter("trackingNumberIdsService");
        String type = request.getParameter("typeService");
        String fromPurchaseGroup = request.getParameter("fromPurchaseGroupService");
        String toPurchaseGroup = request.getParameter("toPurchaseGroupService");

        String fromMaterialGroup = request.getParameter("fromMaterialGroupService");
        String toMaterialGroup = request.getParameter("toMaterialGroupService");

        String fromPlant = request.getParameter("fromPlantCodeService");
        String toPlant = request.getParameter("toPlantCodeService");

        String fromPRNumber = request.getParameter("fromPRNumberService");
        String toPRNumber = request.getParameter("toPRNumberService");

        String fromPRApprovedDate = request.getParameter("fromPRApprovedDateService");
        String toPRApprovedDate = request.getParameter("toPRApprovedDateService");

        String prRaisedBy = request.getParameter("prRaisedByService");

        String fromMaterialClass = request.getParameter("fromMaterialClassService");
        String toMaterialClass = request.getParameter("toMaterialClassService");

        System.out.println("materialService: " + materialService);
        System.out.println("trackingNumberIds: " + trackingNumberIds);
        System.out.println("type: " + type);
        System.out.println("fromPurchaseGroup: " + fromPurchaseGroup);
        System.out.println("toPurchaseGroup: " + toPurchaseGroup);
        System.out.println("fromMaterialGroup: " + fromMaterialGroup);
        System.out.println("toMaterialGroup: " + toMaterialGroup);
        System.out.println("fromPlant: " + fromPlant);
        System.out.println("toPlant: " + toPlant);
        System.out.println("fromPRNumber: " + fromPRNumber);
        System.out.println("toPRNumber: " + toPRNumber);
        System.out.println("fromPRApprovedDate: " + fromPRApprovedDate);
        System.out.println("toPRApprovedDate: " + toPRApprovedDate);
        System.out.println("prRaisedBy: " + prRaisedBy);
        System.out.println("fromMaterialClass: " + fromMaterialClass);
        System.out.println("toMaterialClass: " + toMaterialClass);

        Date fromPRApproved_date = null;
        if (fromPRApprovedDate != null && !fromPRApprovedDate.trim().equalsIgnoreCase("")) {
            try {
                fromPRApproved_date = formatFrom.parse(fromPRApprovedDate);
                fromPRApprovedDate = formatTo.format(fromPRApproved_date);
                System.out.println("fromPRApproved_date: " + fromPRApprovedDate);
            } catch (ParseException e) {
                System.out.println(e);
            }
        }
        Date toPRApproved_date = null;
        if (toPRApprovedDate != null && !toPRApprovedDate.trim().equalsIgnoreCase("")) {
            try {
                toPRApproved_date = formatFrom.parse(toPRApprovedDate);
                System.out.println("toPRApproved_date: " + toPRApprovedDate);

                calendar.setTime(toPRApproved_date);
                calendar.add(Calendar.DAY_OF_MONTH, 1);
                toPRApproved_date = calendar.getTime();

                toPRApprovedDate = formatTo.format(toPRApproved_date);
                System.out.println("toPRApproved_date: " + toPRApprovedDate);

            } catch (ParseException e) {
                System.out.println(e);
            }
        }

        List<TlPrLineItemsBean> list = callTlFilterPrLineItemsStoredProcedure(materialService, trackingNumberIds, type, fromPurchaseGroup,
                fromMaterialGroup, fromPlant, toPlant, fromPRNumber, toPRNumber, fromPRApprovedDate, toPRApprovedDate, prRaisedBy, toPurchaseGroup,
                toMaterialGroup, fromMaterialClass, toMaterialClass, CompanyCode);

        System.out.println("Filter List Size: " + list.size());

        redirect.addFlashAttribute("isFilter", "Yes");
        redirect.addFlashAttribute("filterResultSet", list);
        System.out.println("materialService in filterWorkLoadReport:" + materialService);
        redirect.addFlashAttribute("materialService", materialService);

        if (role.equals("ROLE_TL_BUYER") || role.equals("ROLE_ADMIN_TL_BUYER")) {
            return new ModelAndView("redirect:/prcontractassignment.do");
        } else {
            return new ModelAndView("redirect:/dashboardcont.do");
        }
    }

    @RequestMapping(value = "reassignprline", method = RequestMethod.POST)
    public ModelAndView reassignPr(HttpServletRequest request) {
        System.out.println("reassignPr============");
        String prIds = request.getParameter("reassignprlineids");
        String buyerId = request.getParameter("reassignBuyerId");

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        String role = buyer.getRole();

        System.out.println("prIds: " + prIds);
        System.out.println("buyerId: " + buyerId);

        reassignPr(prIds, Integer.parseInt(buyerId));

        BuyerDetails b = getBuyerById(Integer.parseInt(buyerId));

        reportBuyerAuditLog.setActivityPerformed("PR Lines re-assigned to " + b.getUsername());
        reportBuyerAuditLog.setCreatedate(new Date());
        reportBuyerAuditLog.setNgBpBuyerdetailsId(buyer);
        saveBuyerAuditLogReport(reportBuyerAuditLog);

        if (role.equals("ROLE_TL_BUYER") || role.equals("ROLE_ADMIN_TL_BUYER")) {
            return new ModelAndView("redirect:/prcontractassignment.do");
        } else {
            return new ModelAndView("redirect:/dashboardcont.do");
        }
    }

    @RequestMapping(value = "reassignrfq", method = RequestMethod.POST)
    public ModelAndView reassignRfq(HttpServletRequest request) {
        System.out.println("reassignrfq============");

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        String role = buyer.getRole();

        String rfqIds = request.getParameter("reassignrfqids");
        String buyerId = request.getParameter("reassignRfqBuyerId");

        System.out.println("rfqIds: " + rfqIds);
        System.out.println("buyerId: " + buyerId);

        reassignRfq(rfqIds, Integer.parseInt(buyerId));

        BuyerDetails b = getBuyerById(Integer.parseInt(buyerId));

        reportBuyerAuditLog.setActivityPerformed("RFQs re-assigned to " + b.getUsername());
        reportBuyerAuditLog.setCreatedate(new Date());
        reportBuyerAuditLog.setNgBpBuyerdetailsId(buyer);
        saveBuyerAuditLogReport(reportBuyerAuditLog);

        if (role.equals("ROLE_TL_BUYER") || role.equals("ROLE_ADMIN_TL_BUYER")) {
            return new ModelAndView("redirect:/prcontractassignment.do");
        } else {
            return new ModelAndView("redirect:/dashboardcont.do");
        }
    }

    String assignPr(String prlineids, int buyerid, String teamLeadId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/assignprline.do?prlineids=" + prlineids + "&buyerid=" + buyerid + "&teamLeadId=" + teamLeadId;
        System.out.println("url: " + url);
        ResponseEntity<String> restResponse = restTemplate.exchange(url, HttpMethod.POST, null, new ParameterizedTypeReference<String>() {
        });
        String result = restResponse.getBody();

        return result;
    }

    String reassignPr(String prlineids, int buyerid) {

        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/reassignprline.do?prlineids=" + prlineids + "&buyerid=" + buyerid;
        System.out.println("url: " + url);

        ResponseEntity<String> restResponse = restTemplate.exchange(url, HttpMethod.POST, null, new ParameterizedTypeReference<String>() {
        });
        String result = restResponse.getBody();
        return result;
    }

    String assignContract(String contractlineids, int buyerid) {
        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/assigncontract.do?contractlineids=" + contractlineids + "&buyerid=" + buyerid;
        System.out.println("url: " + url);

        ResponseEntity<String> restResponse = restTemplate.exchange(url, HttpMethod.POST, null, new ParameterizedTypeReference<String>() {
        });

        String result = restResponse.getBody();

        return result;
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

    String saveBuyer(BuyerDetails obj) {

        RestTemplate restTemplate = new RestTemplate();

        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/savebuyerdetails.do"), obj, String.class);

        System.out.println("responseBuyerId : " + msg);

        return msg;
    }

    List<BuyerDetails> findBuyerByRole(String role) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findbuyerbyrole.do?role=" + role;
        System.out.println("url: " + url);

        ResponseEntity<List<BuyerDetails>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<BuyerDetails>>() {
        });

        System.out.println("response: " + response);
        List<BuyerDetails> buyerList = response.getBody();

        System.out.println("buyerList size: " + buyerList.size());

        return buyerList;
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

    String saveBuyerTeamleadMapping(BuyerTeamleadMapping mapping) {

        RestTemplate restTemplate = new RestTemplate();

        String msg = restTemplate.postForObject(URI.create(webservice_ip + "/BuyerPortalWebServices/savebuyerteamleadmapping.do"), mapping, String.class);

        System.out.println("responseBuyerId : " + msg);

        return msg;
    }

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

    List<BuyerTeamleadMapping> findBuyerMappingByTeamlead(int teamleadid) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findbuyermappingbyteamlead.do?id=" + teamleadid;
        System.out.println("url: " + url);

        ResponseEntity<List<BuyerTeamleadMapping>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<BuyerTeamleadMapping>>() {
        });
        List<BuyerTeamleadMapping> mappingList = response.getBody();

        return mappingList;
    }

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

    List<NGExtCM> findNewgenContractLineItemByStatusAndBuyer(int buyerid) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findNewgenContractLineItemByStatusAndBuyer.do?id=" + buyerid;
        System.out.println("url: " + url);

        ResponseEntity<List<NGExtCM>> contractResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGExtCM>>() {
        });
        List<NGExtCM> newgenList = contractResponse.getBody();

        System.out.println("newgenList size: " + newgenList.size());

        return newgenList;
    }

    List<BuyerDetails> findAllTeamLead() {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findallteamlead.do";
        System.out.println("url: " + url);

        ResponseEntity<List<BuyerDetails>> restGroupResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<BuyerDetails>>() {
        });
        System.out.println("restGroupResponse: " + restGroupResponse);
        List<BuyerDetails> buyerList = restGroupResponse.getBody();

        System.out.println("buyerList size: " + buyerList.size());

        return buyerList;
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

    public List<TlPrLineItemsBean> callTlFilterPrLineItemsStoredProcedure(String isMaterialOrService, String trackingNumberIds, String type,
            String fromPurchaseGroup, String fromMaterialGroup, String fromPlant, String toPlant, String fromPRNumber, String toPRNumber,
            String fromPRApprovedDate, String toPRApprovedDate, String prRaisedBy, String toPurchaseGroup, String toMaterialGroup,
            String fromMaterialClass, String toMaterialClass, String companyCode) {

        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/callTlFilterPrLineItemsStoredProcedure.do?isMaterialOrService=" + isMaterialOrService + "&trackingNumberIds=" + trackingNumberIds + "&type=" + type + "&fromPurchaseGroup=" + fromPurchaseGroup + "&fromMaterialGroup=" + fromMaterialGroup + "&fromPlant=" + fromPlant + "&toPlant=" + toPlant + "&fromPRNumber=" + fromPRNumber + "&toPRNumber=" + toPRNumber + "&fromPRApprovedDate=" + fromPRApprovedDate + "&toPRApprovedDate=" + toPRApprovedDate + "&prRaisedBy=" + prRaisedBy + "&toPurchaseGroup=" + toPurchaseGroup + "&toMaterialGroup=" + toMaterialGroup + "&fromMaterialClass=" + fromMaterialClass + "&toMaterialClass=" + toMaterialClass + "&companyCode=" + companyCode;
        System.out.println("url in callTlFilterPrLineItemsStoredProcedure:" + url);
        ResponseEntity<List<TlPrLineItemsBean>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<TlPrLineItemsBean>>() {
        });
        List<TlPrLineItemsBean> list = response.getBody();
        return list;
    }

    String saveTeamLeadCompanyCodeMapping(TeamLeadCompanyCodeMapping mapping) {

        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/saveTeamleadComanyCodeMapping.do";
        System.out.println("url: " + webservice_ip + "/BuyerPortalWebServices/saveTeamleadComanyCodeMapping.do");
        String mappingId = restTemplate.postForObject(URI.create(url), mapping, String.class);
        System.out.println("mappingId : " + mappingId);
        return mappingId;
    }

    String reassignRfq(String rfqids, int buyerid) {

        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/reassignrfq.do?rfqids=" + rfqids + "&buyerid=" + buyerid;
        System.out.println("url: " + url);

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
}
