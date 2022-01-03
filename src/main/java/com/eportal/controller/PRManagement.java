/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.controller;

import com.eportal.entities.BuyerDetails;
import com.eportal.entities.BuyerPRAfterRfqCreationBean;
import com.eportal.entities.BuyerPendingContractLineItemsBean;
import com.eportal.entities.BuyerPendingPRLineItemsBean;
import com.eportal.entities.ContractRfqHeader;
import com.eportal.entities.EmailTriggerDetails;
import com.eportal.entities.NGExtCM;
import com.eportal.entities.NewgenContractLineItem;
import com.eportal.entities.NewgenPRLineItem;
import com.eportal.entities.PendingPoCreationBean;
import com.eportal.entities.QueryReasonMaster;
import com.eportal.entities.QueryUser;
import com.eportal.entities.QueryWIInput;
import com.eportal.entities.QueryWIOutPut;
import com.eportal.entities.ReasonMaster;
import com.eportal.entities.RejectWIInput;
import com.eportal.entities.RejectWIOutPut;
import com.eportal.entities.WorkOrderRfqHeader;
import com.eportal.util.MailTrigger;
import java.net.URI;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.ModelAndView;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

/**
 *
 * @author admin
 */
@Controller
@SessionAttributes()
public class PRManagement {

    @Value("${webservice.ip}")
    private String webservice_ip;
    @Value("${NGwebservice.ip}")
    private String NGwebservice_ip;
    @Value("${no_of_days}")
    private int no_of_days;
    @Value("${ViewPrDoc.ip}")
    private String ViewPrDoc_IP;

    @Autowired
    RejectWIInput rejectWiInput;
    @Autowired
    QueryWIInput queryWiInput;
    @Autowired
    EmailTriggerDetails emailTriggerDetails;
    @Autowired
    MailTrigger mailTriggerUtil;

    @RequestMapping(value = "pendingprlines")
    public ModelAndView pendingPrLinesAssigned(ModelMap model, HttpServletRequest request) {
        System.out.println("pendingprlines");
        System.out.println("ViewPrDoc_IP: " + ViewPrDoc_IP);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        System.out.println("buyer : " + buyer);
        String role = buyer.getRole();
        int buyerId = buyer.getId();

//        List<PRDetails> prList = findPRAssignedToThisBuyer(buyerId);
//        List<NewgenPRLineItem> prList = findPRAssignedToThisBuyer(buyerId);
        List<NGExtCM> contractList = findContractAssignedToThisBuyer(buyerId);

        List<BuyerPendingPRLineItemsBean> buyerPendingMaterialPRList = callBuyerPendingPrLineItemsStoredProcedure(buyerId, "Material",0,"");
        System.out.println("buyerPendingMaterialPRList: " + buyerPendingMaterialPRList.size());
        List<BuyerPendingPRLineItemsBean> buyerPendingServicePRList = callBuyerPendingPrLineItemsStoredProcedure(buyerId, "Service", 0, "");
        System.out.println("buyerPendingServicePRList: " + buyerPendingServicePRList.size());

        List<BuyerPendingContractLineItemsBean> buyerPendingMaterialContractList = callBuyerPendingContractLineItemsStoredProcedure(buyerId, "Material");
        System.out.println("buyerPendingMaterialContractList: " + buyerPendingMaterialContractList.size());
        List<BuyerPendingContractLineItemsBean> buyerPendingServiceContractList = callBuyerPendingContractLineItemsStoredProcedure(buyerId, "Service");
        System.out.println("buyerPendingServiceContractList: " + buyerPendingServiceContractList.size());

//abhishek
//        System.out.println("contractList :" + contractList);
        List<ReasonMaster> reasonList = findAllReason();
        List<QueryReasonMaster> queryreasonList = findAllQueryReason();
        List<QueryUser> queryuserList = findAllQueryUsers();

        model.put("ReasonList", reasonList);
        model.put("contractList", contractList);
//        model.put("PrList", prList);
        model.put("QueryReasonList", queryreasonList);
        model.put("QueryUserNameList", queryuserList);
        model.put("buyerPendingMaterialPRList", buyerPendingMaterialPRList);
        model.put("buyerPendingServicePRList", buyerPendingServicePRList);
//abhishek
        model.put("buyerPendingMaterialContractList", buyerPendingMaterialContractList);
        model.put("buyerPendingServiceContractList", buyerPendingServiceContractList);
        model.put("ViewPrDoc_IP", ViewPrDoc_IP);

//abhishek
        return new ModelAndView("pending_pr_contract");
    }

    @RequestMapping(value = "overduePrLines")
    public ModelAndView overduePrLines(ModelMap model, HttpServletRequest request) {
        System.out.println("overduePrLines");

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        System.out.println("buyer : " + buyer);
        int buyerId = buyer.getId();
        
        System.out.println("no_of_days :" + no_of_days);

        List<BuyerPendingPRLineItemsBean> buyerOverduePendingPRList = callBuyerPendingPrLineItemsStoredProcedure(buyerId, "Overdue", no_of_days, "");
        System.out.println("buyerOverduePendingPRList: " + buyerOverduePendingPRList.size());

        model.put("buyerOverduePendingPRList", buyerOverduePendingPRList);

        return new ModelAndView("overdueprlines");
    }

    @RequestMapping(value = "rfqinprogress")
    public ModelAndView rfqInProgress(ModelMap model, HttpServletRequest request) {
        System.out.println("rfqinprogress");

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        System.out.println("buyer : " + buyer);
        String role = buyer.getRole();

        int buyerId = buyer.getId();

//        List<NewgenPRLineItem> rfqInitiatedPrList = findNewgenLineByRfqStatus("Initiated", buyerId);
//        List<BuyerPRAfterRfqCreationBean> rfqInitiatedPrList = callBuyerPRAfterRfqCreationStoredProcedure(buyerId, "Initiated");
        List<BuyerPendingPRLineItemsBean> rfqInitiatedPrList = callBuyerPendingPrLineItemsStoredProcedure(buyerId, "rfqinprogress", 0, "");

        model.addAttribute("RfqInitiatedPrList", rfqInitiatedPrList);

        return new ModelAndView("rfq_in_progress");
    }

    @RequestMapping(value = "pendingpocreation")
    public ModelAndView pendingPoCreation(ModelMap model, HttpServletRequest request) {
        System.out.println("pendingpocreation");
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        System.out.println("buyer : " + buyer);
        int buyerId = buyer.getId();
        String initiatorId = buyer.getUsername();
        System.out.println("Buyer id is ::" + buyerId);
//        List<PendingPoCreationBean> PendingPoCreation = callPendingPoCreationStoredProcedure(buyerId, "Finalized");
        List<BuyerPendingPRLineItemsBean> PendingPoCreation = callBuyerPendingPrLineItemsStoredProcedure(0, "pendingpocreation", 0, initiatorId);
        System.out.println("size in pending Po creation is ::" + PendingPoCreation.size());
        model.addAttribute("PendingPoCreation", PendingPoCreation);
        return new ModelAndView("pending_po_creation");
    }

    @RequestMapping(value = "/allprlinescontract")
    public ModelAndView allPRLinesContract(ModelMap model) {
        System.out.println("allprlinescontract");
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        System.out.println("buyer : " + buyer);
        String role = buyer.getRole();
        int buyerId = buyer.getId();

//        List<NewgenPRLineItem> prList = findPRAssignedToThisBuyer(buyerId);
        List<BuyerPRAfterRfqCreationBean> prList = callBuyerPRAfterRfqCreationStoredProcedure(buyerId, "All");
        List<NGExtCM> contractList = findContractAssignedToThisBuyer(buyerId);

        model.put("contractList", contractList);
        model.put("prList", prList);

        return new ModelAndView("all_prlines_contract");
    }

   
//    List<PRDetails> findPRAssignedToThisBuyer(int buyerId) {
//
//        RestTemplate restTemplate = new RestTemplate();
//
//        String url = webservice_ip + "/BuyerPortalWebServices/findprassignedtobuyer.do?id=" + buyerId;
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
    @RequestMapping(value = "/rejectpr")
    public ModelAndView rejectPR(ModelMap model, HttpSession session, HttpServletRequest request, RedirectAttributes redirect) {

        System.out.println("----------Reject PR------------");
        String rejectReason = request.getParameter("rejectreason");
        String rejectcomments = request.getParameter("rejectcomments");
        String rejectprDoc = request.getParameter("rejectprdoc");
        String wiNumber = request.getParameter("wiNumber");
        String linkId = request.getParameter("linkId");
        String prCreatorEmailId = request.getParameter("prCreatorEmailId");
        String prNumber = request.getParameter("prNumber");

        System.out.println("rejectReason: " + rejectReason);
        System.out.println("rejectcomments: " + rejectcomments);
        System.out.println("rejectprDoc: " + rejectprDoc);
        System.out.println("wiNumber: " + wiNumber);
        System.out.println("linkId: " + linkId);
        System.out.println("prCreatorEmailId: " + prCreatorEmailId);

        String status = rejectPR(wiNumber, linkId, rejectReason, rejectcomments, rejectprDoc);

        //        emailTriggerDetails.setMailCC("nikhil.bpaas@gmail.com");
        emailTriggerDetails.setMailFrom("do-not-reply@natsteel.com.sg");
        emailTriggerDetails.setMailContentType("text/html;charset=UTF-8"); // default
        emailTriggerDetails.setMailMessage("Work Item: " + wiNumber + "<br>PR Number: " + prNumber);
        emailTriggerDetails.setMailSubject("PR-" + prNumber + " has been rejected");
        emailTriggerDetails.setMailTo(prCreatorEmailId);

        mailTriggerUtil.TriggerMail(emailTriggerDetails);

        redirect.addFlashAttribute("RejectStatus", status);

        return new ModelAndView("redirect:/pendingprlines.do");

    }

    @RequestMapping(value = "/querypr")
    public ModelAndView queryPR(ModelMap model, HttpSession session, HttpServletRequest request, RedirectAttributes redirect) {

        System.out.println("----------Query PR------------");
        String queryreason = request.getParameter("queryreason");
        String queryraisedto = request.getParameter("queryraisedto");

        String queryprdoc = request.getParameter("queryprdoc");
        String qwiNumber = request.getParameter("qwiNumber");
        String qlinkId = request.getParameter("qlinkId");
        String querymailaddress = request.getParameter("querymailaddress");
        String qPrNumber = request.getParameter("qPrNumber");
        String querycomment = request.getParameter("querycomment");

        System.out.println("queryreason: " + queryreason);
        System.out.println("queryraisedto: " + queryraisedto);
        System.out.println("queryprdoc: " + queryprdoc);
        System.out.println("qwiNumber: " + qwiNumber);
        System.out.println("qlinkId: " + qlinkId);
        System.out.println("querymailaddress: " + querymailaddress);
        System.out.println("qPrNumber: " + qPrNumber);
        System.out.println("querycomment: " + querycomment);

        String status = queryPR(qwiNumber, qlinkId, queryreason, querycomment, queryprdoc, queryraisedto, querymailaddress);

//        emailTriggerDetails.setMailCC("nikhil.bpaas@gmail.com");
        emailTriggerDetails.setMailFrom("do-not-reply@natsteel.com.sg");
        emailTriggerDetails.setMailContentType("text/html;charset=UTF-8"); // default
        emailTriggerDetails.setMailMessage("Work Item: " + qwiNumber + "<br>PR Number: " + qPrNumber);
        emailTriggerDetails.setMailSubject("Query for PR-" + qPrNumber + " has been sent to you");
        emailTriggerDetails.setMailTo(querymailaddress);

        mailTriggerUtil.TriggerMail(emailTriggerDetails);

        redirect.addFlashAttribute("QueryStatus", status);

        return new ModelAndView("redirect:/pendingprlines.do");
    }

    String queryPR(String wiName, String linkId, String queryReason, String comments, String queryPRDoc, String queryraisedto, String querymailaddress) {
        System.out.println("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
        RestTemplate restTemplate = new RestTemplate();

        String url = NGwebservice_ip + "/PR2POWebservice/ng/service/QueryWI";

        System.out.println("URL-->" + url);
//        QueryWIInput in = new QueryWIInput();
        queryWiInput.setWorkitemId(wiName);
        queryWiInput.setLinkId(linkId);
        queryWiInput.setQueryReason(queryReason);
        if (queryPRDoc == null) {
            queryPRDoc = "";
        }
        queryWiInput.setQueryPRDoc(queryPRDoc);
        queryWiInput.setComments(comments);
        queryWiInput.setQueryUserID(queryraisedto);
        queryWiInput.setQueryEmail(querymailaddress);
        System.out.println("**************************");
        QueryWIOutPut str = restTemplate.postForObject(URI.create(url), queryWiInput, QueryWIOutPut.class);
        System.out.println("MainCode-->" + str.getMainCode());
        System.out.println("Message-->" + str.getMessage());

        return str.getMainCode();
    }

    @RequestMapping(value = "pendingrfqclosure")
    public ModelAndView pendingRfqClosure(ModelMap model, HttpServletRequest request) {
        System.out.println("pendingrfqclosure");
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        System.out.println("buyer : " + buyer);
        String role = buyer.getRole();
        int buyerId = buyer.getId();
//        String prType = request.getParameter("prType");
//        System.out.println("prType in vendorfinalized :::" + prType);
        List<BuyerPendingPRLineItemsBean> rfqClosureList = callBuyerPendingPrLineItemsStoredProcedure(buyerId, "rfqclosure", 0, "");
        System.out.println("rfqClosureList Size :::::" + rfqClosureList.size());
        model.put("rfqClosureList", rfqClosureList);
        return new ModelAndView("pendingrfqclosure");
    }
    /*Newgen*/

    String rejectPR(String wiName, String linkId, String rejectReason, String comments, String rejectPRDoc) {

//        ClientConfig config = new ClientConfig();
//        Client client = ClientBuilder.newClient(config);
        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        RestTemplate restTemplate = new RestTemplate();

        String url = NGwebservice_ip + "/PR2POWebservice/ng/service/RejectWI";

//        RejectWIInput in = new RejectWIInput();
        rejectWiInput.setWorkitemId(wiName);
        rejectWiInput.setLinkId(linkId);
        rejectWiInput.setRejectReason(rejectReason);
        if (rejectPRDoc == null) {
            rejectPRDoc = "";
        }
        rejectWiInput.setRejectPRDoc(rejectPRDoc);
        rejectWiInput.setComments(comments);

        RejectWIOutPut str = restTemplate.postForObject(URI.create(url), rejectWiInput, RejectWIOutPut.class);
        System.out.println("MainCode-->" + str.getMainCode());
        System.out.println("Message-->" + str.getMessage());

        return str.getMainCode();
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
    /*Newgen*/

//    List<PRDetails> findPrLineByRfqStatus(String status, int buyerid) {
//
//        RestTemplate restTemplate = new RestTemplate();
//
//        String url = webservice_ip + "/BuyerPortalWebServices/findprlinebyrfqstatus.do?rfqstatus=" + status + "&buyerid=" + buyerid;
//        System.out.println("url: " + url);
//
//        ResponseEntity<List<PRDetails>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<PRDetails>>() {});
//        List<PRDetails> prList = prResponse.getBody();
//
//        System.out.println("prList size: " + prList.size());
//
//        return prList;
//    }
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

    List<WorkOrderRfqHeader> findRfqHeaderByBuyerId(int buyerid) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findrfqheaderbybuyerid.do?buyerid=" + buyerid;
        System.out.println("url: " + url);

        ResponseEntity<List<WorkOrderRfqHeader>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<WorkOrderRfqHeader>>() {
        });
        List<WorkOrderRfqHeader> rfqHeaderList = prResponse.getBody();

        return rfqHeaderList;
    }

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

    List<NGExtCM> findContractAssignedToThisBuyer(int buyerId) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findcontractassignedtothisbuyer.do?id=" + buyerId;
        System.out.println("url: " + url);

        ResponseEntity<List<NGExtCM>> contractResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGExtCM>>() {
        });
        List<NGExtCM> contractList = contractResponse.getBody();
        System.out.println("contractList size: " + contractList.size());
        return contractList;
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

    List<QueryReasonMaster> findAllQueryReason() {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findallqueryreason.do";
        System.out.println("url: " + url);

        ResponseEntity<List<QueryReasonMaster>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<QueryReasonMaster>>() {
        });
        List<QueryReasonMaster> queryreasonList = response.getBody();

        System.out.println("reasonList size: " + queryreasonList.size());

        return queryreasonList;
    }

    List<QueryUser> findAllQueryUsers() {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/findallqueryuser.do";
        System.out.println("url: " + url);

        ResponseEntity<List<QueryUser>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<QueryUser>>() {
        });
        System.out.println("********************************************");
        List<QueryUser> queryUserList = response.getBody();

        System.out.println("UserName size: " + queryUserList.size());

        return queryUserList;
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

    List<BuyerPRAfterRfqCreationBean> callBuyerPRAfterRfqCreationStoredProcedure(int buyerId, String rfqStatus) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/callBuyerPRAfterRfqCreationStoredProcedure.do?buyerId=" + buyerId + "&rfqStatus=" + rfqStatus;
        System.out.println("url: " + url);
        ResponseEntity<List<BuyerPRAfterRfqCreationBean>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<BuyerPRAfterRfqCreationBean>>() {
        });
        List<BuyerPRAfterRfqCreationBean> list = response.getBody();
        return list;
    }

    List<PendingPoCreationBean> callPendingPoCreationStoredProcedure(int buyerId, String isPoCreated) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/callPendingPoCreationStoredProcedure.do?buyerId=" + buyerId + "&isPoCreated=" + isPoCreated;
        System.out.println("url: " + url);
        ResponseEntity<List<PendingPoCreationBean>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<PendingPoCreationBean>>() {
        });
        List<PendingPoCreationBean> list = response.getBody();
        return list;
    }
    //abhishek
       List<BuyerPendingContractLineItemsBean> callBuyerPendingContractLineItemsStoredProcedure(int buyerId, String prType) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/callBuyerPendingContractLineItemsStoredProcedure.do?buyerid=" + buyerId + "&prtype=" + prType;
        System.out.println("url tlcontract " + url);
        ResponseEntity<List<BuyerPendingContractLineItemsBean>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<BuyerPendingContractLineItemsBean>>() {
        });
        List<BuyerPendingContractLineItemsBean> buyerPendingPRList = response.getBody();
        return buyerPendingPRList;
    }
    
    
    
    
    //abhishek
}
