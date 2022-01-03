/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.controller;

import com.eportal.entities.AccountAssignmentCategoryMaster;
import com.eportal.entities.BuyerDetails;
import com.eportal.entities.BuyerPendingPRLineItemsBean;
import com.eportal.entities.BuyerTeamleadMapping;
import com.eportal.entities.CmplxPoCreationLineItemPoDraft;
import com.eportal.entities.CountryMaster;
import com.eportal.entities.ExtPoCreationDraft;
import com.eportal.entities.MasterAsset;
import com.eportal.entities.MasterCommitmentItem;
import com.eportal.entities.MasterCompanyCode;
import com.eportal.entities.MasterCostCentre;
import com.eportal.entities.MasterCurrency;
import com.eportal.entities.MasterDepartment;
import com.eportal.entities.MasterGLCode;
import com.eportal.entities.MasterItemCategory;
import com.eportal.entities.MasterLocation;
import com.eportal.entities.MasterNetwork;
import com.eportal.entities.MasterPlant;
import com.eportal.entities.MasterPurchaseOrg;
import com.eportal.entities.MasterPurchasingGroup;
import com.eportal.entities.MasterServiceMaster;
import com.eportal.entities.MasterShippingInstruction;
import com.eportal.entities.MasterStockType;
import com.eportal.entities.MasterVendor;
import com.eportal.entities.MasterWBSElement;
import com.eportal.entities.NGBPCmplxPOCreationLineItemPO;
import com.eportal.entities.NGBPExtPOCreation;
import com.eportal.entities.NGExtPOCreation;
import com.eportal.entities.NewgenPRLineItem;
import com.eportal.entities.POHeaderDetails;
import com.eportal.entities.PORfqLineItemBean;
import com.eportal.entities.PaymentTermsMaster;
import com.eportal.entities.PendingPoCreationBean;
import com.eportal.entities.PersonalSettings;
import com.eportal.entities.PurchaseOrderTypeMaster;
import com.eportal.entities.SignedPoInput;
import com.eportal.entities.SignedPoOutput;
import com.eportal.entities.VendorDetails;
import com.eportal.entities.WorkOrderAttachmentTemp;
import com.eportal.entities.WorkOrderRfqHeader;
import com.eportal.entities.WorkOrderRfqLineItem;
import com.eportal.webservice.util.PurchaseOrderWS;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URI;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author admin
 */
@Controller
public class POManagement {

    @Value("${webservice.ip}")
    private String webservice_ip;
    @Value("${NGwebservice.ip}")
    private String NGwebservice_ip;
    @Autowired
    POHeaderDetails pOHeaderDetails;
    @Autowired
    SignedPoInput signedPoInput;
    @Autowired
    WorkOrderAttachmentTemp workOrderAttTemp;
    @Value("${local_dev_uat}")
    private String local_dev_uat;
    @Value("${WebServiceCall.ip}")
    private String WebServiceCall_IP;
    @Value("${ViewPrDoc.ip}")
    private String ViewPrDoc_IP;
    @Autowired
    PersonalSettings personalSettings;
    @Autowired
    PurchaseOrderWS purchaseOrderWS;
    @Value("${pickList_keyCode}")
    private String pickListKeyCode;

    @RequestMapping(value = "errorTransactionsSA")
    public ModelAndView errorTransactionsSA(ModelMap model, HttpServletRequest request) {
        System.out.println("errorTransactionsSA");
        List<Object> list = purchaseOrderWS.findAllErrorTransactionDraftPo();
        System.out.println("errorTransactionsSA List Size:" + list.size());
        model.addAttribute("errorTransactionsSAList", list);
        return new ModelAndView("errortransactionsSA");
    }
    
    @RequestMapping(value = "errorTransactions")
    public ModelAndView errorTransactions(ModelMap model, HttpServletRequest request) {
        System.out.println("errorTransactions");
        List<ExtPoCreationDraft> errorTransactionsList = purchaseOrderWS.findExtPoCreationDraftByErrorTransaction("Yes");
        System.out.println("errorTransactionsList size:" + errorTransactionsList.size());
        model.put("errorTransactionList", errorTransactionsList);
        return new ModelAndView("errortransactions");
    }
    
    @RequestMapping(value = "draftPo")
    public ModelAndView draftPoList(ModelMap model, HttpServletRequest request) {
        System.out.println("draftPoList");
        List<ExtPoCreationDraft> list = purchaseOrderWS.findAllDraftPo();
        System.out.println("findAllDraftPo list:" + list.size());
        model.put("DraftPoList", list);
        return new ModelAndView("draftPoList");
    }

    @RequestMapping(value = "doacknowledgepo")
    public ModelAndView doAcknowledgePO(ModelMap model, HttpServletRequest request) {
        System.out.println("doacknowledgepo");

        BuyerDetails buyer = findLoggedInBuyer();

        String pid = request.getParameter("pid");
        System.out.println("pid: " + pid);

        String PoNumber = request.getParameter("PoNumber");
        System.out.println("PoNumber: " + PoNumber);

        List<CountryMaster> countryList = getAllCountry();
        List<PurchaseOrderTypeMaster> poTypeList = getAllPOTypeMaster();
        List<AccountAssignmentCategoryMaster> accountObj = getAllAccountAssignmentCategory();

        model.addAttribute("buyer", buyer);
        model.addAttribute("pid", pid);
        model.addAttribute("PoNumber", PoNumber);
        model.put("PurchaseOrderTypeList", poTypeList);
        model.put("countryList", countryList);
        model.put("accountObj", accountObj);

        model.addAttribute("PONGwebserviceIp", NGwebservice_ip);
        return new ModelAndView("doacknowledgepo");
    }

    @RequestMapping(value = "managestandalonepo")
    public ModelAndView manageStandalonePO(ModelMap model, HttpServletRequest request) {
        System.out.println("managestandalonepo");
        model.addAttribute("PONGwebserviceIp", NGwebservice_ip);
        List<Object> list = getSomeSelectedFieldsFromPONGBPExtPOCreations();
        System.out.println("list size in managestandalonepo:" + list.size());
        model.addAttribute("NGBPExtPOCreationList", list);
        return new ModelAndView("managestandalonepo");
    }

    @RequestMapping(value = "createstandalonepo")
    public ModelAndView createStandalonePO(ModelMap model, HttpServletRequest request) {
        System.out.println("createstandalonepo");
        System.out.println("PONGwebservice_ip :" + NGwebservice_ip);
        System.out.println("WebServiceCall_IP: " + WebServiceCall_IP);
        System.out.println("pickListKeyCode: " + pickListKeyCode);

        String operation = request.getParameter("operation");
        System.out.println("operation: " + operation);

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        System.out.println("buyer : " + buyer);
        int buyerId = buyer.getId();
        List<PersonalSettings> perSettings = purchaseOrderWS.getPersonalSettngsByBuyer(buyerId);
        PersonalSettings perSettingsObj = null;
        if (!perSettings.isEmpty()) {
            perSettingsObj = perSettings.get(0);
        }

        String companyCode = buyer.getCompanyCode();

        System.out.println("buyerId: " + buyerId);
        System.out.println("companyCode in createstandalonepo :" + companyCode);

        String[] companyCodeArr = companyCode.split(",");
        System.out.println("companyCodeArr len: " + companyCodeArr.length);
        List<String> companyCodeList = Arrays.asList(companyCodeArr);
        System.out.println("companyCodeList: " + companyCodeList);

        List<PurchaseOrderTypeMaster> poTypeList = getAllPOTypeMaster();
        List<MasterCurrency> currencyList = getAllCurrency();

        model.put("PONGwebserviceIp", NGwebservice_ip);
        model.put("PurchaseOrderTypeList", poTypeList);
        model.put("companyCode", companyCode);
        model.put("currencyList", currencyList);
        model.put("buyer", buyer);
        model.put("local_dev_uat", local_dev_uat);
        model.put("WebServiceCallIp", WebServiceCall_IP);
        model.put("companyCodeList", companyCodeList);
        model.put("pickListKeyCode", pickListKeyCode);

        if (operation != null && operation.equalsIgnoreCase("edit")) {
            model.put("Operation", "edit");
        }
        String reqType = request.getParameter("type");
        if ("new".equalsIgnoreCase(reqType)) {
            model.put("perSettingsObj", perSettingsObj);
            model.put("type", "new");
            return new ModelAndView("createstandalonepo");
        } else {
            model.put("type", "edit");
            String id = request.getParameter("id");
            System.out.println("ID ::: " + id);

            System.out.println("managestandalonepo");
            model.addAttribute("PONGwebserviceIp", NGwebservice_ip);

            NGBPExtPOCreation NGBPExtPOCreation = getNBPExtPOCreationByID(id);
            List<NGBPCmplxPOCreationLineItemPO> POCreationLineItem = getPOCreationLineItemById(id);

            model.addAttribute("NGBPExtPOCreation", NGBPExtPOCreation);
            model.addAttribute("POCreationLineItem", POCreationLineItem);
            if (POCreationLineItem.size() > 0) {
                model.addAttribute("POCreationLineItemSingle", POCreationLineItem.get(0));
            }
            return new ModelAndView("createstandalonepo");
        }
    }

    @RequestMapping(value = "editpo")
    public ModelAndView editPO(ModelMap model, HttpServletRequest request) {
        System.out.println("editpo");

        String PoNumber = request.getParameter("PoNumber");
        System.out.println("PoNumber: " + PoNumber);

        String Pid = request.getParameter("id");
        System.out.println("Pid: " + Pid);

        List<CountryMaster> countryList = getAllCountry();
        List<PurchaseOrderTypeMaster> poTypeList = getAllPOTypeMaster();
        List<AccountAssignmentCategoryMaster> accountObj = getAllAccountAssignmentCategory();

        model.put("PoNumber", PoNumber);
        model.put("Pid", Pid);
        model.put("PONGwebserviceIp", NGwebservice_ip);
        model.put("PurchaseOrderTypeList", poTypeList);
        model.put("countryList", countryList);
        model.put("accountObj", accountObj);

        return new ModelAndView("editpo");
    }

    @RequestMapping(value = "managepo")
    public ModelAndView managePO(ModelMap model, HttpServletRequest request) {
        System.out.println("managepo");
        System.out.println("local_dev_uat: " + local_dev_uat);
        System.out.println("WebServiceCall_IP: " + WebServiceCall_IP);

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        System.out.println("buyer : " + buyer);

        model.addAttribute("WebServiceCallIp", WebServiceCall_IP);
        model.addAttribute("PONGwebserviceIp", NGwebservice_ip);
        model.addAttribute("local_dev_uat", local_dev_uat);
        model.addAttribute("buyerObj", buyer);

        return new ModelAndView("managepo");
    }

    @RequestMapping(value = "acknowledgepo")
    public ModelAndView acknowledgePO(ModelMap model, HttpServletRequest request) {
        System.out.println("acknowledgepo");
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        System.out.println("buyer role: " + buyer.getRole());

        List<NGExtPOCreation> acknowlegdePOList = null;
        if (buyer.getRole() != null && buyer.getRole().equals("ROLE_TEAM_LEAD")) {
            String usernameString = "";
            List<BuyerTeamleadMapping> mappingList = purchaseOrderWS.findBuyerMappingByTeamlead(buyer.getId());
            System.out.println("mappingList size: " + mappingList.size());
            for (int i = 0; i < mappingList.size(); i++) {
                BuyerTeamleadMapping mapping = mappingList.get(i);
                if (i == mappingList.size() - 1) {
                    usernameString += mapping.getNgBpBuyerdetailsId().getUsername();
                } else {
                    usernameString += mapping.getNgBpBuyerdetailsId().getUsername() + ",";
                }
            }
            System.out.println("usernameString: " + usernameString);
            acknowlegdePOList = purchaseOrderWS.findByInitiatorIdInAndCurrentWorkstepIn(usernameString);
            System.out.println("acknowlegdePOList size: " + acknowlegdePOList.size());
        } else {
            acknowlegdePOList = purchaseOrderWS.findByInitiatorIdAndCurrentWorkstepIn(buyer.getUsername());
            System.out.println("acknowlegdePOList size: " + acknowlegdePOList.size());
        }

//        List<String> vendorMailIdList = new ArrayList<>();
//        acknowlegdePOList.stream().forEach((extPo) -> {
//            if (extPo.getVendorCode() != null) {
//                List<MasterVendor> vendorMasterList = purchaseOrderWS.findMasterVendorByVendorCode(extPo.getVendorCode());
//                if(!vendorMasterList.isEmpty()) {
//                    MasterVendor vendorMasterObj = vendorMasterList.get(0);
//                    vendorMailIdList.add(vendorMasterObj.getMailId());
//                } else {
//                    vendorMailIdList.add(null);
//                }
//            } else {
//                vendorMailIdList.add(null);
//            }
//        });
//        System.out.println("vendorMailIdList: " + vendorMailIdList);
//        System.out.println("vendorMailIdList size: " + vendorMailIdList.size());

        model.addAttribute("PONGwebserviceIp", NGwebservice_ip);
        model.addAttribute("ViewPrDoc_IP", ViewPrDoc_IP);
        model.addAttribute("WebServiceCall_IP", WebServiceCall_IP);
        model.addAttribute("buyerObj", buyer);
        model.addAttribute("acknowlegdePOList", acknowlegdePOList);
//        model.addAttribute("vendorMailIdList", vendorMailIdList);

        return new ModelAndView("acknowledgepo");
    }

    @RequestMapping(value = "createpo", method = RequestMethod.POST)
    public ModelAndView createPO(ModelMap model, HttpServletRequest request, HttpSession session) {
        System.out.println("createpo");
        System.out.println("local_dev_uat: " + local_dev_uat);
        System.out.println("WebServiceCall_IP: " + WebServiceCall_IP);
        System.out.println("ViewPrDoc_IP: " + ViewPrDoc_IP);
        System.out.println("pickListKeyCode: " + pickListKeyCode);

        String poNumber = request.getParameter("poNumber");
        String pid = request.getParameter("pid");
        String prlineids = request.getParameter("prids");
        String reqFrom = request.getParameter("reqFrom");
        String SelectedVendorId = request.getParameter("SelectedVendorId");
        String vendorFinalizationTableDataArrayAsJsonString = request.getParameter("vendorFinalizationTableDataArrayAsJsonString");
        String draftPo = request.getParameter("draftPo");
        String draftPoExtId = request.getParameter("draftPoExtId");

        System.out.println("PONGwebservice_ip :" + NGwebservice_ip);
        System.out.println("prlineids in createpo :" + prlineids);
        System.out.println("reqFrom :" + reqFrom);
        System.out.println("SelectedVendorId :" + SelectedVendorId);
        System.out.println("vendorFinalizationTableDataArrayAsJsonString :" + vendorFinalizationTableDataArrayAsJsonString);
        System.out.println("poNumber :" + poNumber);
        System.out.println("pid :" + pid);
        System.out.println("draftPo :" + draftPo);
        System.out.println("draftPoExtId :" + draftPoExtId);

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        System.out.println("buyer : " + buyer);
        String companyCode = buyer.getCompanyCode();

        if (draftPo != null && draftPo.equals("Yes")) {
            System.out.println("In Draft PO Block");
            model.put("draftPo", draftPo);
            model.put("draftPoExtId", draftPoExtId);
            List<CmplxPoCreationLineItemPoDraft> cmplxPoCreationLineItemPoDraftList = purchaseOrderWS.findCmplxPoCreationLineItemPoDraftByExtId(Integer.parseInt(draftPoExtId));
            model.put("cmplxPoCreationLineItemPoDraftList", cmplxPoCreationLineItemPoDraftList);
        } else {
            model.put("draftPo", "No");
            model.put("draftPoExtId", "");
        }

        if (prlineids != null) {
            List<PORfqLineItemBean> newgenPrLineItem = new ArrayList<>();
            if (SelectedVendorId != null && !SelectedVendorId.equals("")) {
                System.out.println("PO From RFQ: ===========>");
                String[] prLineIdArr = prlineids.split(",");
                System.out.println("prLineIdArr.length: " + prLineIdArr.length);
                for (int i = 0; i < prLineIdArr.length; i++) {
                    System.out.println("prLineIdArr[i]: " + prLineIdArr[i]);
                    List<PORfqLineItemBean> tempList = callPORfqPrLineItemStoredProcedure(prLineIdArr[i], "", "PR");
                    if (!tempList.isEmpty()) {
                        PORfqLineItemBean beanObj = tempList.get(0);
                        newgenPrLineItem.add(beanObj);
                    }
                }
                System.out.println("newgenPrLineItem size: " + newgenPrLineItem.size());
                model.put("newgenPrLineItem", newgenPrLineItem);
                model.put("newgenPrLineItemSingle", newgenPrLineItem.get(0));
            } else {
                newgenPrLineItem = callPORfqPrLineItemStoredProcedure(prlineids, "", "PR");
                System.out.println("newgenPrLineItem size: " + newgenPrLineItem.size());
                model.put("newgenPrLineItem", newgenPrLineItem);
                model.put("newgenPrLineItemSingle", newgenPrLineItem.get(0));
            }
        }

        if (reqFrom != null && reqFrom.equalsIgnoreCase("editpo")) {
            model.put("PoFrom", "editpo");
            model.put("PoNumber", poNumber);
            model.put("Pid", pid);
        } else if (reqFrom != null && reqFrom.equalsIgnoreCase("editApprovedPo")) {
            model.put("PoFrom", "editApprovedPo");
        } else if (reqFrom != null && reqFrom.equalsIgnoreCase("acknowledgePo")) {
            model.put("PoFrom", "acknowledgePo");
            model.put("PoNumber", poNumber);
            model.put("Pid", pid);
        } else if (SelectedVendorId != null && !SelectedVendorId.equals("")) {
            model.put("PoFrom", "byrfq");
        } else if (reqFrom != null && reqFrom.equalsIgnoreCase("shortcutPo")) {
            model.put("PoFrom", "shortcutPo");
            System.out.println("companyCode: " + companyCode);
            String[] companyCodeArr = companyCode.split(",");
            System.out.println("companyCodeArr len: " + companyCodeArr.length);
            List<String> companyCodeList = Arrays.asList(companyCodeArr);
            System.out.println("companyCodeList: " + companyCodeList);
            model.put("companyCodeList", companyCodeList);
        } else {
            model.put("PoFrom", "createpo");
        }

        if (SelectedVendorId != null && !SelectedVendorId.equals("")) {
            VendorDetails vendor = findVendorById(Integer.parseInt(SelectedVendorId));
            System.out.println("vendor: " + vendor);
            String vendorCompanyCode = vendor.getCode();
            System.out.println("vendorCompanyCode: " + vendorCompanyCode);

            model.put("vendorObj", vendor);
            model.put("vendorCompanyCode", vendorCompanyCode);
            model.put("PoFrom", "byrfq");
            model.put("VendorFinalizationTableDataArrayAsJsonString", vendorFinalizationTableDataArrayAsJsonString);
        }

        List<AccountAssignmentCategoryMaster> accountObj = getAllAccountAssignmentCategory();
        List<PurchaseOrderTypeMaster> poTypeList = getAllPOTypeMaster();

        model.put("PONGwebserviceIp", NGwebservice_ip);
        model.put("PurchaseOrderTypeList", poTypeList);
        model.put("accountObj", accountObj);
        model.put("companyCode", companyCode);
        model.put("buyer", buyer);
        model.put("reqFrom", reqFrom);
        model.put("PrIds", prlineids);
        model.put("local_dev_uat", local_dev_uat);
        model.put("WebServiceCallIp", WebServiceCall_IP);
        model.put("ViewPrDoc_IP", ViewPrDoc_IP);
        model.put("pickListKeyCode", pickListKeyCode);

        return new ModelAndView("createpo");
    }

    @RequestMapping(value = "/uploadsignedpo", method = RequestMethod.POST)
    public void uploadSignedPO(
            @RequestParam("file_docDiv1") CommonsMultipartFile attachmentSignedPoCopy, @RequestParam("file_docDiv2") CommonsMultipartFile attachment1,
            @RequestParam("file_docDiv3") CommonsMultipartFile attachment2, @RequestParam("file_docDiv4") CommonsMultipartFile attachment3,
            @RequestParam("file_docDiv5") CommonsMultipartFile attachment4, @RequestParam("file_docDiv6") CommonsMultipartFile attachment5,
            HttpServletRequest request, HttpServletResponse response, Map<String, Object> modalMap
    ) {
        PrintWriter out = null;
        try {
            System.out.println("uploadsignedpo============");
            JSONObject jObj = new JSONObject();
            out = response.getWriter();

            String pid = request.getParameter("ro_pid");
            String poNumber = request.getParameter("ro_poNumber");

            System.out.println("pid: " + pid);
            System.out.println("poNumber: " + poNumber);
            System.out.println("Signed PO Copy Name: " + attachmentSignedPoCopy.getOriginalFilename());
            System.out.println("Supporting Doc 1 Name: " + attachment1.getOriginalFilename());
            System.out.println("Supporting Doc 2 Name: " + attachment2.getOriginalFilename());
            System.out.println("Supporting Doc 3 Name: " + attachment3.getOriginalFilename());
            System.out.println("Supporting Doc 4 Name: " + attachment4.getOriginalFilename());
            System.out.println("Supporting Doc 5 Name: " + attachment5.getOriginalFilename());

            if (!attachmentSignedPoCopy.getOriginalFilename().equalsIgnoreCase("")) {
                signedPoInput.setSignedPOattachment(attachmentSignedPoCopy.getBytes());
                signedPoInput.setSignedPOattachmentname(attachmentSignedPoCopy.getOriginalFilename());
            } else {
                signedPoInput.setSignedPOattachment(null);
                signedPoInput.setSignedPOattachmentname(null);
            }
            if (!attachment1.getOriginalFilename().equalsIgnoreCase("")) {
                signedPoInput.setSupportingDocPOattachment(attachment1.getBytes());
                signedPoInput.setSupportingDocPOattachmentname(attachment1.getOriginalFilename());
            } else {
                signedPoInput.setSupportingDocPOattachment(null);
                signedPoInput.setSupportingDocPOattachmentname(null);
            }
            if (!attachment2.getOriginalFilename().equalsIgnoreCase("")) {
                signedPoInput.setSupportingDocPOattachment1(attachment2.getBytes());
                signedPoInput.setSupportingDocPOattachmentname1(attachment2.getOriginalFilename());
            } else {
                signedPoInput.setSupportingDocPOattachment1(null);
                signedPoInput.setSupportingDocPOattachmentname1(null);
            }
            if (!attachment3.getOriginalFilename().equalsIgnoreCase("")) {
                signedPoInput.setSupportingDocPOattachment2(attachment3.getBytes());
                signedPoInput.setSupportingDocPOattachmentname2(attachment3.getOriginalFilename());
            } else {
                signedPoInput.setSupportingDocPOattachment2(null);
                signedPoInput.setSupportingDocPOattachmentname2(null);
            }
            if (!attachment4.getOriginalFilename().equalsIgnoreCase("")) {
                signedPoInput.setSupportingDocPOattachment3(attachment4.getBytes());
                signedPoInput.setSupportingDocPOattachmentname3(attachment4.getOriginalFilename());
            } else {
                signedPoInput.setSupportingDocPOattachment3(null);
                signedPoInput.setSupportingDocPOattachmentname3(null);
            }
            if (!attachment5.getOriginalFilename().equalsIgnoreCase("")) {
                signedPoInput.setSupportingDocPOattachment4(attachment5.getBytes());
                signedPoInput.setSupportingDocPOattachmentname4(attachment5.getOriginalFilename());
            } else {
                signedPoInput.setSupportingDocPOattachment4(null);
                signedPoInput.setSupportingDocPOattachmentname4(null);
            }
            signedPoInput.setPID(pid);
            signedPoInput.setPoNumber(poNumber);

            SignedPoOutput output;
            try {

                output = newgenUploadSignedPO(signedPoInput);
                String msg = output.getMessage();
                System.out.println("msg: " + msg);

                jObj.put("Message", msg);
                jObj.put("Result", "Success");

            } catch (JSONException e) {
                System.out.println("Exception : " + e);
                jObj.put("Message", "Failed to Upload Signed PO Copy to DMS!");
                jObj.put("Result", "Failed");
            }

            out.println(jObj);
        } catch (IOException ex) {
            Logger.getLogger(POManagement.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            if (out != null) {
                out.close();
            }
        }

    }

    @RequestMapping(value = "savepodetails", method = RequestMethod.POST)
    public ModelAndView savePODetails(HttpServletRequest request) {
        System.out.println("savepodetails==============================");

        Date date = new Date();

        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yy");

        String currDate = formatter.format(date);

        System.out.println("current date :" + currDate);
//        
//        System.out.println("Current Date :" + date);
        List<POHeaderDetails> poHeaderList = getAllPOHeader();

        System.out.println("poHeaderList :" + poHeaderList);

        int size = poHeaderList.size() + 1;

        String pONumber = "GPO-" + currDate + "-" + size;

//        pOHeaderDetails.setPONumber(pONumber);
        System.out.println("pONumber :" + pONumber);

        String TransactionInitiatedOn_Value = request.getParameter("TransactionInitiatedOn_Value");
        String CreatorID = request.getParameter("CreatorID");
        String CreatorEmial = request.getParameter("CreatorEmail");
        String CompanyCode = request.getParameter("CompanyCode");
        String RequestType = request.getParameter("RequestType");
        String PurchaseOrderNumber = request.getParameter("PurchaseOrderNumber");
        String PurchaseOrderType = request.getParameter("PurchaseOrderType");
        String ReferenceDocumentType = request.getParameter("ReferenceDocumentType");
        String ReferenceDocumentNumber = request.getParameter("ReferenceDocumentNumber");
        String ReferenceDocumentLine = request.getParameter("ReferenceDocumentLine");

        String VendorName = request.getParameter("VendorName");
        String VendorCode = request.getParameter("VendorCode");
        String DocumentDate = request.getParameter("DocumentDate_Value");

        String DownPaymentReqd = request.getParameter("DownpaymentReqd");
        String ValueDownPayment = request.getParameter("valueDownPayment");
        String DownPaymentForVendor = request.getParameter("DownpaymentForVendor");

        String PurchasingOrganization = request.getParameter("PurchasingOrganization");
        String PurchasingGroup = request.getParameter("PurchasingGroup");

        String PaymentTerms = request.getParameter("PaymentTerms");
        String PaymentInDays1 = request.getParameter("PaymentInDays1");
        String PaymentInDays2 = request.getParameter("PaymentInDays2");
        String PaymentInDays3 = request.getParameter("PaymentInDays3");
        String ExchangeRate = request.getParameter("ExchangeRate");
        String ExchangeRateFixed = request.getParameter("ExchangeRateFixed");
//        String IncoTermsPart1Part2 = request.getParameter("IncoTermsPart1Part2");
        String IncoTermsPart1_Downpayment = request.getParameter("incoTermsPart1Downpayment");
        String IncoTermsPart2_Downpayment = request.getParameter("incoTermsPart2Downpayment");

        String GRMessage = request.getParameter("GRMessage");

        String ConditionType = request.getParameter("ConditionType");
        String Name = request.getParameter("nameConditions");
        String Amount = request.getParameter("Amount");
        String ConditionPricingUnit = request.getParameter("ConditionPricingUnit");
        String Currency1 = request.getParameter("Currency");
        String UoM = request.getParameter("UoM");
        String ConditionValue1 = request.getParameter("ConditionValue");
        String Currency2 = request.getParameter("Currency2");
        String ConditionValue2 = request.getParameter("ConditionValue2");
        String ConditionCurrency = request.getParameter("ConditionCurrency");

        String ConditionTypeName = request.getParameter("ConditionTypeName");
//        String VendorNameCode = request.getParameter("VendorNameCode");
        String VendorName_Conditions = request.getParameter("vendorNameConditions");
        String VendorCode_Conditions = request.getParameter("vendorCodeConditions");
        String Application = request.getParameter("Application");

        String ConditionPricingDate = request.getParameter("ConditionPricingDate_Value");
//        String AmountCurrencyPricingUnitUoM = request.getParameter("AmountCurrencyPricingUnitUoM");
//        String ConditionBaseValueRate = request.getParameter("ConditionBaseValueRate");
//        String ConditionValueCurrency = request.getParameter("ConditionValueCurrency");
        String Amount_Conditions = request.getParameter("amountConditions");
        String Currency1_Conditions = request.getParameter("currency1Conditions");
        String PricingUnit_Conditions = request.getParameter("pricingUnitConditions");
        String UoM_ConditionValues_Conditions = request.getParameter("uoMConditionValuesConditions");
        String ConditionBaseValue_Conditions = request.getParameter("conditionBaseValueConditions");
        String ConditionBaseRate_Conditions = request.getParameter("conditionBaseRateConditions");
        String ConditionValue_Conditions = request.getParameter("conditionValueConditions");
        String Currency2_Conditions = request.getParameter("currency2Conditions");

        String ConditionClass = request.getParameter("ConditionClass");
        String CalculateType = request.getParameter("CalculateType");
        String ConditionCategory = request.getParameter("ConditionCategory");
        String ConditionControl = request.getParameter("ConditionControl");
        String ConditionOrigin = request.getParameter("ConditionOrigin");
        String Statistical = request.getParameter("Statistical");
        String Accruals = request.getParameter("Accruals");
        String ChangedManually = request.getParameter("ChangedManually");
        String AccountKey = request.getParameter("AccountKey");
        String Accruals_AccountDetermination = request.getParameter("accrualsAccountDetermination");

//        String StreetHouseNumber = request.getParameter("StreetHouseNumber");
//        String PostalCodeCity = request.getParameter("PostalCodeCity");
        String Street_VendorAddress = request.getParameter("streetVendorAddress");
        String HouseNumber_VendorAddress = request.getParameter("houseNumberVendorAddress");
        String PostalCode_VendorAddress = request.getParameter("postalCodeVendorAddress");
        String City_VendorAddress = request.getParameter("cityVendorAddress");
        String Ext_Tel = request.getParameter("extTel");
        String Telephone_VendorAddress = request.getParameter("telephoneVendorAddress");
        String Ext_Fax = request.getParameter("extFax");
        String Fax = request.getParameter("fax");
        String Country = request.getParameter("Country");
//        String TelephoneExtension = request.getParameter("TelephoneExtension");
//        String FaxExtension = request.getParameter("FaxExtension");

        String Salesperson = request.getParameter("Salesperson");
        String YourReference = request.getParameter("YourReference");
        String Telephone = request.getParameter("Telephone");
        String OurReference = request.getParameter("OurReference");
        String Language = request.getParameter("Language");

        String PartnerFunction = request.getParameter("PartnerFunction");
        String Name_Pertners = request.getParameter("namePertners");
        String Number = request.getParameter("Number");
        String VendorName_Partners = request.getParameter("vendorNamePartners");

        String CollectiveNumber = request.getParameter("CollectiveNumber");

        String PaymentImmediate = request.getParameter("PaymentImmediate");
        String ExternalWeight = request.getParameter("ExternalWeight");
        String InstructionToWeigher = request.getParameter("InstructionToWeigher");
        String ZoneCollectionScrap = request.getParameter("ZoneCollectionScrap");
        String PriceDisplay = request.getParameter("PriceDisplay");
        String ProductOrigin = request.getParameter("ProductOrigin");
        String SegmentDescription = request.getParameter("SegmentDescription");
        String ConfControl = request.getParameter("ConfControl");
        String LineItemNumber = request.getParameter("LineItemNumber");

//        String POQuantityUnit = request.getParameter("POQuantityUnit");
//        String POQuantityInSKUUnit = request.getParameter("POQuantityInSKUUnit");
        String POQuantity = request.getParameter("pOQuantity");
        String POQuantityUnit = request.getParameter("pOQuantityUnit");
        String POQuantityInSKU = request.getParameter("pOQuantityInSKU");
        String POQuantityInSKUUnit = request.getParameter("pOQuantityInSKUUnit");
        String OrderUnitOrderPriceUnit = request.getParameter("OrderUnitOrderPriceUnit");
        String OrderUnitSKU = request.getParameter("OrderUnitSKU");

        String DeliveryDateCategory = request.getParameter("DeliveryDateCategory");
        String DeliveryDate = request.getParameter("DelSch_DeliveryDate_Value");
        String ScheduledQuantity = request.getParameter("ScheduledQuantity");
        String Time = request.getParameter("DelSch_Time");
        String PurchaseRequestNumber = request.getParameter("PurchaseRequestNumber");
        String RequestItemNumber = request.getParameter("RequestItemNumber");

        String OverdeliveryTolerance = request.getParameter("OverdeliveryTolerance");
        String UnderdeliveryTolerance = request.getParameter("UnderdeliveryTolerance");
        String ShippingInstruction = request.getParameter("ShippingInstruction");
        String StockType = request.getParameter("StockType");
        String FirstReminderExpediter = request.getParameter("FirstReminderExpediter");
        String SecondReminderExpediter = request.getParameter("SecondReminderExpediter");
        String ThirdReminderExpediter = request.getParameter("ThirdReminderExpediter");
        String ValuationType = request.getParameter("ValuationType");
        String RemShelfLife = request.getParameter("RemShelfLife");
        String QAControlLife = request.getParameter("QAControlLife");
        String NoExpend = request.getParameter("NoExpend");
        String PlDeliveryTime = request.getParameter("PlDeliveryTime");
        String GRProcTime = request.getParameter("GRProcTime");
        String LatestGRDate = request.getParameter("LatestGRDate_Value");
//        String IncoTermsPart1Part2_Delivery = request.getParameter("incoTermsPart1Part2Delivery");
        String IncoTermsPart1_Delivery = request.getParameter("incoTermsPart1Delivery");
        String IncoTermsPart2_Delivery = request.getParameter("incoTermsPart2Delivery");
        String GoodsReceipt = request.getParameter("GoodsReceipt");
        String GRNonValuated = request.getParameter("GRNonValuated");
        String DelivCompleted = request.getParameter("DelivCompleted");

        String InvoiceReceipt = request.getParameter("InvoiceReceipt");
        String FinalInvoice = request.getParameter("FinalInvoice");
        String GRBasedIV = request.getParameter("GRBasedIV");
        String DPCategory = request.getParameter("DPCategory");
        String TaxCodeDescription = request.getParameter("TaxCodeDescription");

        String GLCode = request.getParameter("GLCode");
        String CostCentre = request.getParameter("CostCentre");
        String CommitmentItem = request.getParameter("CommitmentItem");
        String COArea = request.getParameter("COArea");
        String Fund = request.getParameter("Fund");
        String FundCenter = request.getParameter("FundCenter");
        String SalesOrder = request.getParameter("SalesOrder");
        String ItemNumber = request.getParameter("ItemNumber");
        String DeliverySchedule = request.getParameter("DeliverySchedule");
        String FunctionalArea = request.getParameter("FunctionalArea");

        String Characteristic = request.getParameter("Characteristic");
        String CustomerCode = request.getParameter("CustomerCode");
        String Product = request.getParameter("Product");
        String BillingType = request.getParameter("BillingType");
        String SalesOrder_ProfitabilitySegment = request.getParameter("salesOrderProfitabilitySegment");
        String ItemNumber_ProfitabilitySegment = request.getParameter("itemNumberProfitabilitySegment");
        String CompanyCode_ProfitabilitySegment = request.getParameter("companyCodeProfitabilitySegment");
        String Plant = request.getParameter("Plant");
        String BusinessArea = request.getParameter("BusinessArea");
        String SalesOrganization = request.getParameter("SalesOrganization");
        String DistrChannel = request.getParameter("DistrChannel");
        String Division = request.getParameter("Division");
        String WBSElement = request.getParameter("WBSElement");
        String CostObject = request.getParameter("CostObject");
        String ProfitCentre = request.getParameter("ProfitCentre");
        String PartnerPC = request.getParameter("PartnerPC");
        String Country_ProfitabilitySegment = request.getParameter("countryProfitabilitySegment");
        String SalesOffice = request.getParameter("SalesOffice");
        String SalesEmployee = request.getParameter("SalesEmployee");
        String MatlGroup = request.getParameter("MatlGroup");
        String Prodhierarchy = request.getParameter("Prodhierarchy");
        String ItemCategory = request.getParameter("ItemCategory");
        String HigherLevItem = request.getParameter("HigherLevItem");
        String Industry = request.getParameter("Industry");
        String CustomerGroup = request.getParameter("CustomerGroup");
        String ProductHierLevel1 = request.getParameter("ProductHierLevel1");
        String ProductHierLevel2 = request.getParameter("ProductHierLevel2");
        String ProductHierLevel3 = request.getParameter("ProductHierLevel3");
        String MaterialType = request.getParameter("MaterialType");
        String ReferenceDoc = request.getParameter("ReferenceDoc");
        String ProjectNumber1 = request.getParameter("PROJECTNUMBER1");
        String ProjectIndicator = request.getParameter("ProjectIndicator");
        String ValuationType_ProfitabilitySegment = request.getParameter("valuationTypeProfitabilitySegment");
        String CustomerClass = request.getParameter("CustomerClass");
        String MaterialSourceInd = request.getParameter("MaterialSourceInd");
        String ContractType = request.getParameter("ContractType");
        String ShipToParty = request.getParameter("ShipToParty");
        String IndustryCode1 = request.getParameter("IndustryCode1");
        String IndustryField001 = request.getParameter("IndustryField001");
        String IndustryCode2 = request.getParameter("IndustryCode2");
        String IndustryCode3 = request.getParameter("IndustryCode3");
        String SalesDocType = request.getParameter("SalesDocType");
        String ReferenceItem = request.getParameter("ReferenceItem");
        String Order_ProfitabilitySegment = request.getParameter("orderProfitabilitySegment");

        String OverallLimit = request.getParameter("OverallLimit");
        String ExpectedValue = request.getParameter("ExpectedValue");
        String NoLimit = request.getParameter("NoLimit");

        String ConditionType_Conditions_Limits = request.getParameter("conditionTypeConditionsLimits");
        String Name_Conditions_Conditions_Limits = request.getParameter("nameConditionsConditionsLimits");
        String Amount_Conditions_Limits = request.getParameter("amountConditionsLimits");
        String ConditionPricingUnit_Conditions_Limits = request.getParameter("conditionPricingUnitConditionsLimits");
        String Currency1_Conditions_Limits = request.getParameter("currency1ConditionsLimits");
        String UoM_Conditions_Conditions_Limits = request.getParameter("uoMConditionsConditionsLimits");
        String ConditionValue1_Conditions_Limits = request.getParameter("conditionValue1ConditionsLimits");
        String Currency2_Conditions_Limits = request.getParameter("currency2ConditionsLimits");
        String ConditionValue2_Conditions_Limits = request.getParameter("conditionValue2ConditionsLimits");
        String ConditionCurrency_Conditions_Limits = request.getParameter("conditionCurrencyConditionsLimits");

        String ConditionTypeName_ConditionsDetails_Limits = request.getParameter("conditionTypeNameConditionsDetailsLimits");
        String Application_ConditionsDetails_Limits = request.getParameter("applicationConditionsDetailsLimits");
        String VendorName_ConditionsDetails_Limits = request.getParameter("vendorNameConditionsDetailsLimits");
        String VendorCode_ConditionsDetails_Limits = request.getParameter("vendorCodeConditionsDetailsLimits");

        String ConditionPricingDate_Limit = request.getParameter("ConditionPricingDate2_Value");
        String Amount_Limits = request.getParameter("amountLimits");
        String Currency1_Limits = request.getParameter("currency1Limits");
        String PricingUnit_Limits = request.getParameter("pricingUnitLimits");
        String UoM_Limits = request.getParameter("uoMLimits");
        String ConditionBaseValue_Limits = request.getParameter("conditionBaseValueLimits");
        String Rate_Limits = request.getParameter("rateLimits");
        String ConditionValue_Limits = request.getParameter("conditionValueLimits");
        String Currency2_Limits = request.getParameter("currency2Limits");

        String ConditionClass_Limits = request.getParameter("conditionClassLimits");
        String CalculateType_Limits = request.getParameter("calculateTypeLimits");
        String ConditionCategory_Limits = request.getParameter("conditionCategoryLimits");
        String ConditionControl_Limits = request.getParameter("conditionControlLimits");
        String ConditionOrigin_Limits = request.getParameter("conditionOriginLimits");
        String Statistical_Limits = request.getParameter("statisticalLimits");
        String Accruals_Limits = request.getParameter("accrualsLimits");
        String ChangedManually_Limits = request.getParameter("changedManuallyLimits");

        String AccountKey_Limits = request.getParameter("accountKeyLimits");
        String Accruals_AccountDetermination_Limits = request.getParameter("accrualsAccountDeterminationLimits");

        String ItemText = request.getParameter("ItemText");
        String InfoRecordPOText = request.getParameter("InfoRecordPOText");
        String MaterialPOText = request.getParameter("MaterialPOText");
        String PONoteToApprover = request.getParameter("PONoteToApprover");
        String DeliveryText = request.getParameter("DeliveryText");

        String Title = request.getParameter("Title");
        String Name1 = request.getParameter("Name1");
        String Name2 = request.getParameter("Name2");
        String Street = request.getParameter("Street");
        String HouseNumber = request.getParameter("HouseNumber");
        String PostalCode = request.getParameter("PostalCode");
        String City = request.getParameter("City");
        String Country_Limits = request.getParameter("countryLimits");
        String Description = request.getParameter("Description");

        String PONotetoApprover_HeaderTexts_Limits = request.getParameter("pONotetoApproverHeaderTextsLimits");
        String HeaderNote = request.getParameter("HeaderNote");
        String PricingTypes = request.getParameter("PricingTypes");
        String Deadlines = request.getParameter("Deadlines");
        String TermsofDelivery = request.getParameter("TermsofDelivery");
        String TermsofPayment = request.getParameter("TermsofPayment");
        String ShippingInstructions = request.getParameter("ShippingInstructions");
        String VendorMemoGeneral = request.getParameter("VendorMemoGeneral");
        String VendorMemoSpecial = request.getParameter("VendorMemoSpecial");

        String ConfControl_Limits = request.getParameter("confControlLimits");
        String OrderAck = request.getParameter("OrderAck");
        String ConfirmationRequired = request.getParameter("ConfirmationRequired");
        String RejectionInd = request.getParameter("RejectionInd");

        String PrintPrice = request.getParameter("PrintPrice");
        String EstimatedPrice = request.getParameter("EstimatedPrice");

        String Approver1 = request.getParameter("Approver1");
        String Approver2 = request.getParameter("Approver2");
        String Approver3 = request.getParameter("Approver3");
        String Approver4 = request.getParameter("Approver4");
        String Approver5 = request.getParameter("Approver5");
        String Approver6 = request.getParameter("Approver6");
        String Approver7 = request.getParameter("Approver7");

        System.out.println("TransactionInitiatedOn_Value: " + TransactionInitiatedOn_Value);
        System.out.println("CreatorID: " + CreatorID);
        System.out.println("CreatorEmial :" + CreatorEmial);
        System.out.println("CompanyCode :" + CompanyCode);
        System.out.println("RequestType :" + RequestType);
        System.out.println("PurchaseOrderNumber :" + PurchaseOrderNumber);
        System.out.println("PurchaseOrderType :" + PurchaseOrderType);
        System.out.println("ReferenceDocumentType :" + ReferenceDocumentType);
        System.out.println("ReferenceDocumentNumber :" + ReferenceDocumentNumber);
        System.out.println("ReferenceDocumentLine :" + ReferenceDocumentLine);

        System.out.println("VendorName :" + VendorName);
        System.out.println("VendorCode :" + VendorCode);
        System.out.println("DocumentDate :" + DocumentDate);

        System.out.println("DownPaymentReqd :" + DownPaymentReqd);
        System.out.println("ValueDownPayment :" + ValueDownPayment);
        System.out.println("DownPaymentForVendor :" + DownPaymentForVendor);

        System.out.println("PurchasingOrganization :" + PurchasingOrganization);
        System.out.println("PurchasingGroup :" + PurchasingGroup);

        System.out.println("PaymentTerms :" + PaymentTerms);
        System.out.println("PaymentInDays1 :" + PaymentInDays1);
        System.out.println("PaymentInDays2 :" + PaymentInDays2);
        System.out.println("PaymentInDays3 :" + PaymentInDays3);
        System.out.println("ExchangeRate :" + ExchangeRate);
        System.out.println("ExchangeRateFixed :" + ExchangeRateFixed);
//        System.out.println("IncoTermsPart1Part2 :" + IncoTermsPart1Part2);
        System.out.println("IncoTermsPart1_Downpayment :" + IncoTermsPart1_Downpayment);
        System.out.println("IncoTermsPart2_Downpayment :" + IncoTermsPart2_Downpayment);
        System.out.println("GRMessage :" + GRMessage);

        System.out.println("ConditionType :" + ConditionType);
        System.out.println("Name :" + Name);
        System.out.println("Amount :" + Amount);
        System.out.println("ConditionPricingUnit :" + ConditionPricingUnit);
        System.out.println("Currency1 :" + Currency1);
        System.out.println("UoM :" + UoM);
        System.out.println("ConditionValue1 :" + ConditionValue1);
        System.out.println("Currency2 :" + Currency2);
        System.out.println("ConditionValue2 :" + ConditionValue2);
        System.out.println("ConditionCurrency :" + ConditionCurrency);

        System.out.println("ConditionTypeName :" + ConditionTypeName);
//        System.out.println("VendorNameCode :" + VendorNameCode);
        System.out.println("VendorName_Conditions :" + VendorName_Conditions);
        System.out.println("VendorCode_Conditions :" + VendorCode_Conditions);
        System.out.println("Application :" + Application);

        System.out.println("ConditionPricingDate :" + ConditionPricingDate);
//        System.out.println("AmountCurrencyPricingUnitUoM :" + AmountCurrencyPricingUnitUoM);
//        System.out.println("ConditionBaseValueRate :" + ConditionBaseValueRate);
//        System.out.println("ConditionValueCurrency :" + ConditionValueCurrency);
        System.out.println("Amount_Conditions :" + Amount_Conditions);
        System.out.println("Currency1_Conditions :" + Currency1_Conditions);
        System.out.println("PricingUnit_Conditions :" + PricingUnit_Conditions);
        System.out.println("UoM_ConditionValues_Conditions :" + UoM_ConditionValues_Conditions);
        System.out.println("ConditionBaseValue_Conditions :" + ConditionBaseValue_Conditions);
        System.out.println("ConditionBaseRate_Conditions :" + ConditionBaseRate_Conditions);
        System.out.println("ConditionValue_Conditions :" + ConditionValue_Conditions);
        System.out.println("Currency2_Conditions :" + Currency2_Conditions);

        System.out.println("ConditionClass :" + ConditionClass);
        System.out.println("CalculateType :" + CalculateType);
        System.out.println("ConditionCategory :" + ConditionCategory);
        System.out.println("ConditionControl :" + ConditionControl);
        System.out.println("ConditionOrigin" + ConditionOrigin);
        System.out.println("Statistical :" + Statistical);
        System.out.println("Accruals :" + Accruals);
        System.out.println("ChangedManually :" + ChangedManually);

        System.out.println("AccountKey :" + AccountKey);
        System.out.println("Accruals_AccountDetermination :" + Accruals_AccountDetermination);

//        System.out.println("StreetHouseNumber :" + StreetHouseNumber);
//        System.out.println("PostalCodeCity :" + PostalCodeCity);
        System.out.println("Street_VendorAddress :" + Street_VendorAddress);
        System.out.println("HouseNumber_VendorAddress :" + HouseNumber_VendorAddress);
        System.out.println("PostalCode_VendorAddress :" + PostalCode_VendorAddress);
        System.out.println("City_VendorAddress :" + City_VendorAddress);
        System.out.println("Ext_Tel :" + Ext_Tel);
        System.out.println("Telephone_VendorAddress :" + Telephone_VendorAddress);
        System.out.println("Ext_Fax :" + Ext_Fax);
        System.out.println("Fax :" + Fax);
        System.out.println("Country :" + Country);
//        System.out.println("TelephoneExtension :" + TelephoneExtension);
//        System.out.println("FaxExtension :" + FaxExtension);

        System.out.println("Salesperson :" + Salesperson);
        System.out.println("YourReference :" + YourReference);
        System.out.println("Telephone :" + Telephone);
        System.out.println("OurReference :" + OurReference);
        System.out.println("Language :" + Language);

        System.out.println("PartnerFunction :" + PartnerFunction);
        System.out.println("Name_Pertners :" + Name_Pertners);
        System.out.println("Number :" + Number);
        System.out.println("VendorName_Partners :" + VendorName_Partners);

        System.out.println("CollectiveNumber :" + CollectiveNumber);

        System.out.println("PaymentImmediate :" + PaymentImmediate);
        System.out.println("ExternalWeight :" + ExternalWeight);
        System.out.println("InstructionToWeigher :" + InstructionToWeigher);
        System.out.println("ZoneCollectionScrap :" + ZoneCollectionScrap);
        System.out.println("PriceDisplay :" + PriceDisplay);
        System.out.println("ProductOrigin :" + ProductOrigin);
        System.out.println("SegmentDescription :" + SegmentDescription);
        System.out.println("ConfControl :" + ConfControl);

        System.out.println("LineItemNumber :" + LineItemNumber);

        System.out.println("POQuantity :" + POQuantity);
        System.out.println("POQuantityUnit :" + POQuantityUnit);
        System.out.println("POQuantityInSKU :" + POQuantityInSKU);
        System.out.println("POQuantityInSKUUnit :" + POQuantityInSKUUnit);
        System.out.println("OrderUnitOrderPriceUnit :" + OrderUnitOrderPriceUnit);
        System.out.println("OrderUnitSKU :" + OrderUnitSKU);

        System.out.println("DeliveryDateCategory :" + DeliveryDateCategory);
        System.out.println("DeliveryDate :" + DeliveryDate);
        System.out.println("ScheduledQuantity :" + ScheduledQuantity);
        System.out.println("Time :" + Time);
        System.out.println("PurchaseRequestNumber :" + PurchaseRequestNumber);
        System.out.println("RequestItemNumber :" + RequestItemNumber);

        System.out.println("OverdeliveryTolerance :" + OverdeliveryTolerance);
        System.out.println("UnderdeliveryTolerance :" + UnderdeliveryTolerance);
        System.out.println("ShippingInstruction :" + ShippingInstruction);
        System.out.println("StockType :" + StockType);
        System.out.println("FirstReminderExpediter :" + FirstReminderExpediter);
        System.out.println("SecondReminderExpediter :" + SecondReminderExpediter);
        System.out.println("ThirdReminderExpediter :" + ThirdReminderExpediter);
        System.out.println("ValuationType :" + ValuationType);
        System.out.println("RemShelfLife :" + RemShelfLife);
        System.out.println("QAControlLife :" + QAControlLife);
        System.out.println("NoExpend :" + NoExpend);
        System.out.println("PlDeliveryTime :" + PlDeliveryTime);
        System.out.println("GRProcTime :" + GRProcTime);
        System.out.println("LatestGRDate :" + LatestGRDate);
//        System.out.println("IncoTermsPart1Part2_Delivery :" + IncoTermsPart1Part2_Delivery);
        System.out.println("IncoTermsPart1_Delivery :" + IncoTermsPart1_Delivery);
        System.out.println("IncoTermsPart2_Delivery :" + IncoTermsPart2_Delivery);
        System.out.println("GoodsReceipt :" + GoodsReceipt);
        System.out.println("GRNonValuated :" + GRNonValuated);
        System.out.println("DelivCompleted :" + DelivCompleted);

        System.out.println("InvoiceReceipt :" + InvoiceReceipt);
        System.out.println("FinalInvoice :" + FinalInvoice);
        System.out.println("GRBasedIV :" + GRBasedIV);
        System.out.println("DPCategory :" + DPCategory);
        System.out.println("TaxCodeDescription :" + TaxCodeDescription);

        System.out.println("GLCode :" + GLCode);
        System.out.println("CostCentre :" + CostCentre);
        System.out.println("CommitmentItem :" + CommitmentItem);
        System.out.println("COArea :" + COArea);
        System.out.println("Fund :" + Fund);
        System.out.println("FundCenter :" + FundCenter);
        System.out.println("SalesOrder :" + SalesOrder);
        System.out.println("ItemNumber :" + ItemNumber);
        System.out.println("DeliverySchedule :" + DeliverySchedule);
        System.out.println("FunctionalArea :" + FunctionalArea);

        System.out.println("Characteristic :" + Characteristic);
        System.out.println("CustomerCode :" + CustomerCode);
        System.out.println("Product :" + Product);
        System.out.println("BillingType" + BillingType);
        System.out.println("SalesOrder_ProfitabilitySegment :" + SalesOrder_ProfitabilitySegment);
        System.out.println("ItemNumber_ProfitabilitySegment :" + ItemNumber_ProfitabilitySegment);
        System.out.println("CompanyCode_ProfitabilitySegment :" + CompanyCode_ProfitabilitySegment);
        System.out.println("Plant :" + Plant);
        System.out.println("BusinessArea :" + BusinessArea);
        System.out.println("SalesOrganization :" + SalesOrganization);
        System.out.println("DistrChannel :" + DistrChannel);
        System.out.println("Division :" + Division);
        System.out.println("WBSElement :" + WBSElement);
        System.out.println("CostObject :" + CostObject);
        System.out.println("ProfitCentre :" + ProfitCentre);
        System.out.println("PartnerPC :" + PartnerPC);
        System.out.println("Country_ProfitabilitySegment :" + Country_ProfitabilitySegment);
        System.out.println("SalesOffice :" + SalesOffice);
        System.out.println("SalesEmployee :" + SalesEmployee);
        System.out.println("MatlGroup :" + MatlGroup);
        System.out.println("Prodhierarchy :" + Prodhierarchy);
        System.out.println("ItemCategory :" + ItemCategory);
        System.out.println("HigherLevItem :" + HigherLevItem);
        System.out.println("Industry :" + Industry);
        System.out.println("CustomerGroup :" + CustomerGroup);
        System.out.println("ProductHierLevel1 :" + ProductHierLevel1);
        System.out.println("ProductHierLevel2 :" + ProductHierLevel2);
        System.out.println("ProductHierLevel3 :" + ProductHierLevel3);
        System.out.println("MaterialType :" + MaterialType);
        System.out.println("ReferenceDoc :" + ReferenceDoc);
        System.out.println("ProjectNumber1 :" + ProjectNumber1);
        System.out.println("ProjectIndicator :" + ProjectIndicator);
        System.out.println("ValuationType_ProfitabilitySegment :" + ValuationType_ProfitabilitySegment);
        System.out.println("CustomerClass :" + CustomerClass);
        System.out.println("MaterialSourceInd :" + MaterialSourceInd);
        System.out.println("ContractType :" + ContractType);
        System.out.println("ShipToParty :" + ShipToParty);
        System.out.println("IndustryCode1 :" + IndustryCode1);
        System.out.println("IndustryField001 :" + IndustryField001);
        System.out.println("IndustryCode2 :" + IndustryCode2);
        System.out.println("IndustryCode3 :" + IndustryCode3);
        System.out.println("SalesDocType :" + SalesDocType);
        System.out.println("ReferenceItem :" + ReferenceItem);
        System.out.println("Order_ProfitabilitySegment :" + Order_ProfitabilitySegment);

        System.out.println("OverallLimit :" + OverallLimit);
        System.out.println("ExpectedValue :" + ExpectedValue);
        System.out.println("NoLimit :" + NoLimit);

        System.out.println("ConditionType_Conditions_Limits :" + ConditionType_Conditions_Limits);
        System.out.println("Name_Conditions_Conditions_Limits :" + Name_Conditions_Conditions_Limits);
        System.out.println("Amount_Conditions_Limits :" + Amount_Conditions_Limits);
        System.out.println("ConditionPricingUnit_Conditions_Limits :" + ConditionPricingUnit_Conditions_Limits);
        System.out.println("Currency1_Conditions_Limits :" + Currency1_Conditions_Limits);
        System.out.println("UoM_Conditions_Conditions_Limits :" + UoM_Conditions_Conditions_Limits);
        System.out.println("ConditionValue1_Conditions_Limits :" + ConditionValue1_Conditions_Limits);
        System.out.println("Currency2_Conditions_Limits :" + Currency2_Conditions_Limits);
        System.out.println("ConditionValue2_Conditions_Limits :" + ConditionValue2_Conditions_Limits);
        System.out.println("ConditionCurrency_Conditions_Limits :" + ConditionCurrency_Conditions_Limits);

        System.out.println("ConditionTypeName_ConditionsDetails_Limits :" + ConditionTypeName_ConditionsDetails_Limits);
        System.out.println("Application_ConditionsDetails_Limits :" + Application_ConditionsDetails_Limits);
        System.out.println("VendorName_ConditionsDetails_Limits :" + VendorName_ConditionsDetails_Limits);
        System.out.println("VendorCode_ConditionsDetails_Limits :" + VendorCode_ConditionsDetails_Limits);

        System.out.println("ConditionPricingDate_Limit :" + ConditionPricingDate_Limit);
        System.out.println("Amount_Limits :" + Amount_Limits);
        System.out.println("Currency1_Limits :" + Currency1_Limits);
        System.out.println("PricingUnit_Limits :" + PricingUnit_Limits);
        System.out.println("UoM_Limits :" + UoM_Limits);
        System.out.println("ConditionBaseValue_Limits :" + ConditionBaseValue_Limits);
        System.out.println("Rate_Limits :" + Rate_Limits);
        System.out.println("ConditionValue_Limits :" + ConditionValue_Limits);
        System.out.println("Currency2_Limits :" + Currency2_Limits);

        System.out.println("ConditionClass_Limits :" + ConditionClass_Limits);
        System.out.println("CalculateType_Limits :" + CalculateType_Limits);
        System.out.println("ConditionCategory_Limits :" + ConditionCategory_Limits);
        System.out.println("ConditionControl_Limits :" + ConditionControl_Limits);
        System.out.println("ConditionOrigin_Limits :" + ConditionOrigin_Limits);
        System.out.println("Statistical_Limits :" + Statistical_Limits);
        System.out.println("Accruals_Limits :" + Accruals_Limits);
        System.out.println("ChangedManually_Limits :" + ChangedManually_Limits);

        System.out.println("AccountKey_Limits :" + AccountKey_Limits);
        System.out.println("Accruals_AccountDetermination_Limits :" + Accruals_AccountDetermination_Limits);

        System.out.println("ItemText :" + ItemText);
        System.out.println("InfoRecordPOText :" + InfoRecordPOText);
        System.out.println("MaterialPOText :" + MaterialPOText);
        System.out.println("PONoteToApprover :" + PONoteToApprover);
        System.out.println("DeliveryText :" + DeliveryText);

        System.out.println("Title :" + Title);
        System.out.println("Name1 :" + Name1);
        System.out.println("Name2 :" + Name2);
        System.out.println("Street :" + Street);
        System.out.println("HouseNumber :" + HouseNumber);
        System.out.println("PostalCode :" + PostalCode);
        System.out.println("City :" + City);
        System.out.println("Country_Limits :" + Country_Limits);
        System.out.println("Description :" + Description);

        System.out.println("PONotetoApprover_HeaderTexts_Limits :" + PONotetoApprover_HeaderTexts_Limits);
        System.out.println("HeaderNote :" + HeaderNote);
        System.out.println("PricingTypes :" + PricingTypes);
        System.out.println("Deadlines :" + Deadlines);
        System.out.println("TermsofDelivery :" + TermsofDelivery);
        System.out.println("TermsofPayment :" + TermsofPayment);
        System.out.println("ShippingInstructions :" + ShippingInstructions);
        System.out.println("VendorMemoGeneral :" + VendorMemoGeneral);
        System.out.println("VendorMemoSpecial  :" + VendorMemoSpecial);

        System.out.println("ConfControl_Limits :" + ConfControl_Limits);
        System.out.println("OrderAck :" + OrderAck);
        System.out.println("ConfirmationRequired :" + ConfirmationRequired);
        System.out.println("RejectionInd :" + RejectionInd);

        System.out.println("PrintPrice ;" + PrintPrice);
        System.out.println("EstimatedPrice :" + EstimatedPrice);

        System.out.println("Approver1 :" + Approver1);
        System.out.println("Approver2 :" + Approver2);
        System.out.println("Approver3 :" + Approver3);
        System.out.println("Approver4 :" + Approver4);
        System.out.println("Approver5 :" + Approver5);
        System.out.println("Approver6 :" + Approver6);
        System.out.println("Approver7 :" + Approver7);

        SimpleDateFormat format = new SimpleDateFormat("dd-MM-yyyy");
        Date transactiondate, documentdate, conditionpricingdate, deliverydate, latestgrdate, conditionpricingdate_limits;
        try {
            transactiondate = format.parse(TransactionInitiatedOn_Value);
            documentdate = format.parse(DocumentDate);
            conditionpricingdate = format.parse(ConditionPricingDate);
            deliverydate = format.parse(DeliveryDate);
            latestgrdate = format.parse(LatestGRDate);
            conditionpricingdate_limits = format.parse(ConditionPricingDate_Limit);

            System.out.println("transactiondate :" + transactiondate);
            System.out.println("documentdate :" + documentdate);
            System.out.println("conditionpricingdate :" + conditionpricingdate);
            System.out.println("deliverydate :" + deliverydate);
            System.out.println("latestgrdate :" + latestgrdate);
            System.out.println("conditionpricingdate_limits :" + conditionpricingdate_limits);

            pOHeaderDetails.setTransactionInitiatedOn(transactiondate);
            pOHeaderDetails.setDocumentDate(documentdate);
            pOHeaderDetails.setConditionPricingDate(conditionpricingdate);
            pOHeaderDetails.setDeliveryDate(deliverydate);
            pOHeaderDetails.setLatestGRDateValue(latestgrdate);
            pOHeaderDetails.setConditionPricingDateLimit(conditionpricingdate_limits);
        } catch (ParseException ex) {
            Logger.getLogger(POManagement.class.getName()).log(Level.SEVERE, null, ex);
        }

        pOHeaderDetails.setCompanyCode(CompanyCode);
        pOHeaderDetails.setCreatorEmail(CreatorEmial);
        pOHeaderDetails.setCreatorID(CreatorID);
        pOHeaderDetails.setPurchaseOrderNumber(PurchaseOrderNumber);
        pOHeaderDetails.setPurchaseOrderType(PurchaseOrderType);
        pOHeaderDetails.setReferenceDocumentLine(ReferenceDocumentLine);
        pOHeaderDetails.setReferenceDocumentNumber(ReferenceDocumentNumber);
        pOHeaderDetails.setReferenceDocumentType(ReferenceDocumentType);
        pOHeaderDetails.setRequestType(RequestType);
        pOHeaderDetails.setVendorName(VendorName);
        pOHeaderDetails.setVendorCode(VendorCode);
        pOHeaderDetails.setDownPaymentReqd(DownPaymentReqd);
        pOHeaderDetails.setValueDownPayment(ValueDownPayment);
        pOHeaderDetails.setDownPaymentForVendor(DownPaymentForVendor);
        pOHeaderDetails.setPurchasingOrganization(PurchasingOrganization);
        pOHeaderDetails.setPurchasingGroup(PurchasingGroup);
        pOHeaderDetails.setPaymentTerms(PaymentTerms);
        pOHeaderDetails.setPaymentInDays1(PaymentInDays1);
        pOHeaderDetails.setPaymentInDays2(PaymentInDays2);
        pOHeaderDetails.setPaymentInDays3(PaymentInDays3);
        pOHeaderDetails.setExchangeRate(ExchangeRate);
        if ("on".equals(ExchangeRateFixed)) {
            pOHeaderDetails.setExchangeRateFixed("YES");
        } else {
            pOHeaderDetails.setExchangeRateFixed("NO");
        }
//        pOHeaderDetails.setExchangeRateFixed(ExchangeRateFixed);
//        pOHeaderDetails.setIncoTermsPart1Part2(IncoTermsPart1Part2);
        pOHeaderDetails.setIncoTermsPart1Downpayment(IncoTermsPart1_Downpayment);
        pOHeaderDetails.setIncoTermsPart2Downpayment(IncoTermsPart2_Downpayment);
        if ("on".equals(GRMessage)) {
            pOHeaderDetails.setGRMessage("YES");
        } else {
            pOHeaderDetails.setGRMessage("NO");
        }
        pOHeaderDetails.setConditionValue1(ConditionValue1);
        pOHeaderDetails.setConditionValue2(ConditionValue2);
        pOHeaderDetails.setCurrency1(Currency1);
        pOHeaderDetails.setCurrency2(Currency2);
        pOHeaderDetails.setConditionType(ConditionType);
        pOHeaderDetails.setNameConditions(Name);
        pOHeaderDetails.setAmount(Amount);
        pOHeaderDetails.setConditionPricingUnit(ConditionPricingUnit);
        pOHeaderDetails.setUoMConditions(UoM);
        pOHeaderDetails.setConditionCurrency(ConditionCurrency);
        pOHeaderDetails.setConditionTypeName(ConditionTypeName);
//        pOHeaderDetails.setVendorNameCode(VendorNameCode);
        pOHeaderDetails.setVendorNameConditions(VendorName_Conditions);
        pOHeaderDetails.setVendorCodeConditions(VendorCode_Conditions);
        pOHeaderDetails.setApplication(Application);
//        pOHeaderDetails.setAmountCurrencyPricingUnitUoM(AmountCurrencyPricingUnitUoM);
//        pOHeaderDetails.setConditionBaseValueRate(ConditionBaseValueRate);
//        pOHeaderDetails.setConditionValueCurrency(ConditionValueCurrency);
        pOHeaderDetails.setAmountConditions(Amount_Conditions);
        pOHeaderDetails.setCurrency1Conditions(Currency1_Conditions);
        pOHeaderDetails.setPricingUnitConditions(PricingUnit_Conditions);
        pOHeaderDetails.setUoMConditionValuesConditions(UoM_ConditionValues_Conditions);
        pOHeaderDetails.setConditionBaseValueConditions(ConditionBaseValue_Conditions);
        pOHeaderDetails.setConditionBaseRateConditions(ConditionBaseRate_Conditions);
        pOHeaderDetails.setConditionValueConditions(ConditionValue_Conditions);
        pOHeaderDetails.setCurrency2Conditions(Currency2_Conditions);

        pOHeaderDetails.setConditionClass(ConditionClass);
        pOHeaderDetails.setCalculateType(CalculateType);
        pOHeaderDetails.setConditionCategory(ConditionCategory);
        pOHeaderDetails.setConditionControl(ConditionControl);
        pOHeaderDetails.setConditionOrigin(ConditionOrigin);
        if ("on".equals(Statistical)) {
            pOHeaderDetails.setStatistical("YES");
        } else {
            pOHeaderDetails.setStatistical("NO");
        }
        if ("on".equals(Accruals)) {
            pOHeaderDetails.setAccruals("YES");
        } else {
            pOHeaderDetails.setAccruals("NO");
        }
        if ("on".equals(ChangedManually)) {
            pOHeaderDetails.setChangedManually("YES");
        } else {
            pOHeaderDetails.setChangedManually("NO");
        }
        pOHeaderDetails.setAccountKey(AccountKey);
        pOHeaderDetails.setAccrualsAccountDetermination(Accruals_AccountDetermination);
        pOHeaderDetails.setStreetVendorAddress(Street_VendorAddress);
        pOHeaderDetails.setHouseNumberVendorAddress(HouseNumber_VendorAddress);
        pOHeaderDetails.setPostalCodeVendorAddress(PostalCode_VendorAddress);
        pOHeaderDetails.setCityVendorAddress(City_VendorAddress);
        pOHeaderDetails.setExtTel(Ext_Tel);
        pOHeaderDetails.setTelephoneVendorAddress(Telephone_VendorAddress);
        pOHeaderDetails.setExtFax(Ext_Fax);
        pOHeaderDetails.setFax(Fax);
//        pOHeaderDetails.setStreetHouseNumber(StreetHouseNumber);
//        pOHeaderDetails.setPostalCodeCity(PostalCodeCity);
        pOHeaderDetails.setCountry(Country);
//        pOHeaderDetails.setTelephoneExtension(TelephoneExtension);
//        pOHeaderDetails.setFaxExtension(FaxExtension);
        pOHeaderDetails.setSalesperson(Salesperson);
        pOHeaderDetails.setYourReference(YourReference);
        pOHeaderDetails.setTelephone(Telephone);
        pOHeaderDetails.setOurReference(OurReference);
        pOHeaderDetails.setLanguage(Language);
        pOHeaderDetails.setPartnerFunction(PartnerFunction);
        pOHeaderDetails.setNamePertners(Name_Pertners);
        pOHeaderDetails.setNumber(Number);
        pOHeaderDetails.setVendorNamePartners(VendorName_Partners);
        pOHeaderDetails.setCollectiveNumber(CollectiveNumber);
//        pOHeaderDetails.setPaymentImmediate(PaymentImmediate);
        if ("on".equals(PaymentImmediate)) {
            pOHeaderDetails.setPaymentImmediate("YES");
        } else {
            pOHeaderDetails.setPaymentImmediate("NO");
        }
        if ("on".equals(ExternalWeight)) {
            pOHeaderDetails.setExternalWeight("YES");
        } else {
            pOHeaderDetails.setExternalWeight("NO");
        }
        pOHeaderDetails.setInstructionToWeigher(InstructionToWeigher);
        pOHeaderDetails.setZoneCollectionScrap(ZoneCollectionScrap);
        if ("on".equals(PriceDisplay)) {
            pOHeaderDetails.setPriceDisplay("YES");
        } else {
            pOHeaderDetails.setPriceDisplay("NO");
        }
        pOHeaderDetails.setProductOrigin(ProductOrigin);
        pOHeaderDetails.setSegmentDescription(SegmentDescription);
        pOHeaderDetails.setConfControl(ConfControl);
        pOHeaderDetails.setLineItemNumber(LineItemNumber);

//        pOHeaderDetails.setPOQuantityUnit(POQuantityUnit);
//        pOHeaderDetails.setPOQuantityInSKUUnit(POQuantityInSKUUnit);
        pOHeaderDetails.setPOQuantity(POQuantity);
        pOHeaderDetails.setPOQuantityUnit(POQuantityUnit);
        pOHeaderDetails.setPOQuantityInSKU(POQuantityInSKU);
        pOHeaderDetails.setPOQuantityInSKUUnit(POQuantityInSKUUnit);
        pOHeaderDetails.setOrderUnitOrderPriceUnit(OrderUnitOrderPriceUnit);
        pOHeaderDetails.setOrderUnitSKU(OrderUnitSKU);

        pOHeaderDetails.setDeliveryDateCategory(DeliveryDateCategory);
        pOHeaderDetails.setScheduledQuantity(ScheduledQuantity);
        pOHeaderDetails.setTime(Time);
        pOHeaderDetails.setPurchaseRequestNumber(PurchaseRequestNumber);
        pOHeaderDetails.setRequestItemNumber(RequestItemNumber);
        pOHeaderDetails.setOverdeliveryTolerance(OverdeliveryTolerance);
        pOHeaderDetails.setUnderdeliveryTolerance(UnderdeliveryTolerance);
        pOHeaderDetails.setShippingInstruction(ShippingInstruction);
        pOHeaderDetails.setStockType(StockType);
        pOHeaderDetails.setFirstReminderExpediter(FirstReminderExpediter);
        pOHeaderDetails.setSecondReminderExpediter(SecondReminderExpediter);
        pOHeaderDetails.setThirdReminderExpediter(ThirdReminderExpediter);
        pOHeaderDetails.setValuationType(ValuationType);
        pOHeaderDetails.setRemShelfLife(RemShelfLife);
        pOHeaderDetails.setQAControlLife(QAControlLife);
        pOHeaderDetails.setNoExpend(NoExpend);
        pOHeaderDetails.setPlDeliveryTime(PlDeliveryTime);
        pOHeaderDetails.setGRProcTime(GRProcTime);
//        pOHeaderDetails.setIncoTermsPart1Part2Delivery(IncoTermsPart1Part2_Delivery);
        pOHeaderDetails.setIncoTermsPart1Delivery(IncoTermsPart1_Delivery);
        pOHeaderDetails.setIncoTermsPart2Delivery(IncoTermsPart2_Delivery);
        if ("on".equals(GoodsReceipt)) {
            pOHeaderDetails.setGoodsReceipt("YES");
        } else {
            pOHeaderDetails.setGoodsReceipt("NO");
        }
        if ("on".equals(GRNonValuated)) {
            pOHeaderDetails.setGRNonValuated("YES");
        } else {
            pOHeaderDetails.setGRNonValuated("NO");
        }
        if ("on".equals(DelivCompleted)) {
            pOHeaderDetails.setDelivCompleted("YES");
        } else {
            pOHeaderDetails.setDelivCompleted("NO");
        }

        if ("on".equals(InvoiceReceipt)) {
            pOHeaderDetails.setInvoiceReceipt("YES");
        } else {
            pOHeaderDetails.setInvoiceReceipt("NO");
        }
        if ("on".equals(FinalInvoice)) {
            pOHeaderDetails.setFinalInvoice("YES");
        } else {
            pOHeaderDetails.setFinalInvoice("NO");
        }
        if ("on".equals(GRBasedIV)) {
            pOHeaderDetails.setGRBasedIV("YES");
        } else {
            pOHeaderDetails.setGRBasedIV("NO");
        }
        pOHeaderDetails.setDPCategory(DPCategory);
        pOHeaderDetails.setTaxCodeDescription(TaxCodeDescription);

        pOHeaderDetails.setGLCode(GLCode);
        pOHeaderDetails.setCostCentre(CostCentre);
        pOHeaderDetails.setCommitmentItem(CommitmentItem);
        pOHeaderDetails.setCOArea(COArea);
        pOHeaderDetails.setFund(Fund);
        pOHeaderDetails.setFundCenter(FundCenter);
        pOHeaderDetails.setSalesOrder(SalesOrder);
        pOHeaderDetails.setItemNumber(ItemNumber);
        pOHeaderDetails.setDeliverySchedule(DeliverySchedule);
        pOHeaderDetails.setFunctionalArea(FunctionalArea);

        pOHeaderDetails.setCharacteristic(Characteristic);
        pOHeaderDetails.setCustomerCode(CustomerCode);
        pOHeaderDetails.setProduct(Product);
        pOHeaderDetails.setBillingType(BillingType);
        pOHeaderDetails.setSalesOrderProfitabilitySegment(SalesOrder_ProfitabilitySegment);
        pOHeaderDetails.setItemNumberProfitabilitySegment(ItemNumber_ProfitabilitySegment);
        pOHeaderDetails.setCompanyCodeProfitabilitySegment(CompanyCode_ProfitabilitySegment);
        pOHeaderDetails.setPlant(Plant);
        pOHeaderDetails.setBusinessArea(BusinessArea);
        pOHeaderDetails.setSalesOrganization(SalesOrganization);
        pOHeaderDetails.setDistrChannel(DistrChannel);
        pOHeaderDetails.setDivision(Division);
        pOHeaderDetails.setWBSElement(WBSElement);
        pOHeaderDetails.setCostObject(CostObject);
        pOHeaderDetails.setProfitCentre(ProfitCentre);
        pOHeaderDetails.setPartnerPC(PartnerPC);
        pOHeaderDetails.setCountryProfitabilitySegment(Country_ProfitabilitySegment);
        pOHeaderDetails.setSalesOffice(SalesOffice);
        pOHeaderDetails.setSalesEmployee(SalesEmployee);
        pOHeaderDetails.setMatlGroup(MatlGroup);
        pOHeaderDetails.setProdhierarchy(Prodhierarchy);
        pOHeaderDetails.setItemCategory(ItemCategory);
        pOHeaderDetails.setHigherLevItem(HigherLevItem);
        pOHeaderDetails.setIndustry(Industry);
        pOHeaderDetails.setCustomerGroup(CustomerGroup);
        pOHeaderDetails.setProductHierLevel1(ProductHierLevel1);
        pOHeaderDetails.setProductHierLevel2(ProductHierLevel2);
        pOHeaderDetails.setProductHierLevel3(ProductHierLevel3);
        pOHeaderDetails.setMaterialType(MaterialType);
        pOHeaderDetails.setReferenceDoc(ReferenceDoc);
        pOHeaderDetails.setProjectnumber1(ProjectNumber1);
        pOHeaderDetails.setProjectIndicator(ProjectIndicator);
        pOHeaderDetails.setValuationTypeProfitabilitySegment(ValuationType_ProfitabilitySegment);
        pOHeaderDetails.setCustomerClass(CustomerClass);
        pOHeaderDetails.setMaterialSourceInd(MaterialSourceInd);
        pOHeaderDetails.setContractType(ContractType);
        pOHeaderDetails.setShipToParty(ShipToParty);
        pOHeaderDetails.setIndustryCode1(IndustryCode1);
        pOHeaderDetails.setIndustryField001(IndustryField001);
        pOHeaderDetails.setIndustryCode2(IndustryCode2);
        pOHeaderDetails.setIndustryCode3(IndustryCode3);
        pOHeaderDetails.setSalesDocType(SalesDocType);
        pOHeaderDetails.setReferenceItem(ReferenceItem);
        pOHeaderDetails.setOrderProfitabilitySegment(Order_ProfitabilitySegment);

        pOHeaderDetails.setOverallLimit(OverallLimit);
        pOHeaderDetails.setExpectedValue(ExpectedValue);
        if ("on".equals(NoLimit)) {
            pOHeaderDetails.setNoLimit("YES");
        } else {
            pOHeaderDetails.setNoLimit("NO");
        }

        pOHeaderDetails.setConditionTypeConditionsLimits(ConditionType_Conditions_Limits);
        pOHeaderDetails.setNameConditionsConditionsLimits(Name_Conditions_Conditions_Limits);
        pOHeaderDetails.setAmountConditionsLimits(Amount_Conditions_Limits);
        pOHeaderDetails.setConditionPricingUnitConditionsLimits(ConditionPricingUnit_Conditions_Limits);
        pOHeaderDetails.setCurrency1ConditionsLimits(Currency1_Conditions_Limits);
        pOHeaderDetails.setUoMConditionsConditionsLimits(UoM_Conditions_Conditions_Limits);
        pOHeaderDetails.setConditionValue1ConditionsLimits(ConditionValue1_Conditions_Limits);
        pOHeaderDetails.setCurrency2ConditionsLimits(Currency2_Conditions_Limits);
        pOHeaderDetails.setConditionValue2ConditionsLimits(ConditionValue2_Conditions_Limits);
        pOHeaderDetails.setConditionCurrencyConditionsLimits(ConditionCurrency_Conditions_Limits);

        pOHeaderDetails.setConditionTypeNameConditionsDetailsLimits(ConditionTypeName_ConditionsDetails_Limits);
        pOHeaderDetails.setApplicationConditionsDetailsLimits(Application_ConditionsDetails_Limits);
        pOHeaderDetails.setVendorNameConditionsDetailsLimits(VendorName_ConditionsDetails_Limits);
        pOHeaderDetails.setVendorCodeConditionsDetailsLimits(VendorCode_ConditionsDetails_Limits);

        pOHeaderDetails.setAmountLimits(Amount_Limits);
        pOHeaderDetails.setCurrency1Limits(Currency1_Limits);
        pOHeaderDetails.setPricingUnitLimits(PricingUnit_Limits);
        pOHeaderDetails.setUoMLimits(UoM_Limits);
        pOHeaderDetails.setConditionBaseValueLimits(ConditionBaseValue_Limits);
        pOHeaderDetails.setRateLimits(Rate_Limits);
        pOHeaderDetails.setConditionValueLimits(ConditionValue_Limits);
        pOHeaderDetails.setCurrency2Limits(Currency2_Limits);

        pOHeaderDetails.setConditionClassLimits(ConditionClass_Limits);
        pOHeaderDetails.setCalculateTypeLimits(CalculateType_Limits);
        pOHeaderDetails.setConditionCategoryLimits(ConditionCategory_Limits);
        pOHeaderDetails.setConditionControlLimits(ConditionControl_Limits);
        pOHeaderDetails.setConditionOriginLimits(ConditionOrigin_Limits);
        if ("on".equals(Statistical_Limits)) {
            pOHeaderDetails.setStatisticalLimits("YES");
        } else {
            pOHeaderDetails.setStatisticalLimits("NO");
        }
        if ("on".equals(Accruals_Limits)) {
            pOHeaderDetails.setAccrualsLimits("YES");
        } else {
            pOHeaderDetails.setAccrualsLimits("NO");
        }
        if ("on".equals(ChangedManually_Limits)) {
            pOHeaderDetails.setChangedManuallyLimits("YES");
        } else {
            pOHeaderDetails.setChangedManuallyLimits("NO");
        }

        pOHeaderDetails.setAccountKeyLimits(AccountKey_Limits);
        pOHeaderDetails.setAccrualsAccountDeterminationLimits(Accruals_AccountDetermination_Limits);

        pOHeaderDetails.setItemText(ItemText);
        pOHeaderDetails.setInfoRecordPOText(InfoRecordPOText);
        pOHeaderDetails.setMaterialPOText(MaterialPOText);
        pOHeaderDetails.setPONoteToApprover(PONoteToApprover);
        pOHeaderDetails.setDeliveryText(DeliveryText);

        pOHeaderDetails.setTitle(Title);
        pOHeaderDetails.setName1(Name1);
        pOHeaderDetails.setName2(Name2);
        pOHeaderDetails.setStreet(Street);
        pOHeaderDetails.setHouseNumber(HouseNumber);
        pOHeaderDetails.setPostalCode(PostalCode);
        pOHeaderDetails.setCity(City);
        pOHeaderDetails.setCountryLimits(Country_Limits);
        pOHeaderDetails.setDescription(Description);

        pOHeaderDetails.setPONotetoApproverHeaderTextsLimits(PONotetoApprover_HeaderTexts_Limits);
        pOHeaderDetails.setHeaderNote(HeaderNote);
        pOHeaderDetails.setPricingTypes(PricingTypes);
        pOHeaderDetails.setDeadlines(Deadlines);
        pOHeaderDetails.setTermsofDelivery(TermsofDelivery);
        pOHeaderDetails.setTermsofPayment(TermsofPayment);
        pOHeaderDetails.setShippingInstructions(ShippingInstructions);
        pOHeaderDetails.setVendorMemoGeneral(VendorMemoGeneral);
        pOHeaderDetails.setVendorMemoSpecial(VendorMemoSpecial);

        pOHeaderDetails.setConfControlLimits(ConfControl_Limits);
        pOHeaderDetails.setOrderAck(OrderAck);
        if ("on".equals(ConfirmationRequired)) {
            pOHeaderDetails.setConfirmationRequired("YES");
        } else {
            pOHeaderDetails.setConfirmationRequired("NO");
        }
        if ("on".equals(RejectionInd)) {
            pOHeaderDetails.setRejectionInd("YES");
        } else {
            pOHeaderDetails.setRejectionInd("NO");
        }

        if ("on".equals(PrintPrice)) {
            pOHeaderDetails.setPrintPrice("YES");
        } else {
            pOHeaderDetails.setPrintPrice("NO");
        }
        if ("on".equals(EstimatedPrice)) {
            pOHeaderDetails.setEstimatedPrice("YES");
        } else {
            pOHeaderDetails.setEstimatedPrice("NO");
        }

        pOHeaderDetails.setApprover1(Approver1);
        pOHeaderDetails.setApprover2(Approver2);
        pOHeaderDetails.setApprover3(Approver3);
        pOHeaderDetails.setApprover4(Approver4);
        pOHeaderDetails.setApprover5(Approver5);
        pOHeaderDetails.setApprover6(Approver6);
        pOHeaderDetails.setApprover7(Approver7);

        pOHeaderDetails.setPONumber(pONumber);

        String id = savePOHeaderDetails(pOHeaderDetails);

        System.out.println("id in savepodetails :" + id);

        return new ModelAndView("redirect:/createpo.do");
    }

    @RequestMapping(value = "/pocreated", method = RequestMethod.GET)
    public ModelAndView pOCreated(ModelMap model) {

        System.out.println("pocreated=============");

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        System.out.println("buyer : " + buyer);
        int buyerId = buyer.getId();
        System.out.println("Buyer id is ::" + buyerId);

//        List<PendingPoCreationBean> PendingPoCreation = callPendingPoCreationStoredProcedure(buyerId, "Yes");
        List<BuyerPendingPRLineItemsBean> PendingPoCreation = callBuyerPendingPrLineItemsStoredProcedure(0, "pocreated", 0, buyer.getUsername());
        System.out.println("size in pending Po creation is ::" + PendingPoCreation.size());

        model.addAttribute("PendingPoCreation", PendingPoCreation);

        return new ModelAndView("pocreated");
    }

    @RequestMapping(value = "/submitpoattachment", method = RequestMethod.POST)
    public void submitPOAttachment(@RequestParam("file_docDiv1") CommonsMultipartFile attachment1, @RequestParam("file_docDiv2") CommonsMultipartFile attachment2,
            @RequestParam("file_docDiv3") CommonsMultipartFile attachment3, @RequestParam("file_docDiv4") CommonsMultipartFile attachment4,
            @RequestParam("file_docDiv5") CommonsMultipartFile attachment5,
            HttpServletRequest request, HttpServletResponse response, Map<String, Object> modalMap) {

        PrintWriter out = null;
        try {
            System.out.println("submitpoattachment============");

            JSONArray jArra = new JSONArray();
            JSONObject jObj = new JSONObject();

            out = response.getWriter();

            System.out.println("file name 1: " + attachment1.getOriginalFilename());
            System.out.println("file name 2: " + attachment2.getOriginalFilename());
            System.out.println("file name 3: " + attachment3.getOriginalFilename());
            System.out.println("file name 4: " + attachment4.getOriginalFilename());
            System.out.println("file name 5: " + attachment5.getOriginalFilename());

//            SupportingDocInput PRLineDocInput = new SupportingDocInput();
            if (!attachment1.getOriginalFilename().equalsIgnoreCase("")) {
                workOrderAttTemp.setAttachment1(attachment1.getBytes());
                workOrderAttTemp.setAttachment1name(attachment1.getOriginalFilename());

            } else {
                workOrderAttTemp.setAttachment1(null);
                workOrderAttTemp.setAttachment1name(null);
            }

            if (!attachment2.getOriginalFilename().equalsIgnoreCase("")) {
                workOrderAttTemp.setAttachment2(attachment2.getBytes());
                workOrderAttTemp.setAttachment2name(attachment2.getOriginalFilename());
            } else {
                workOrderAttTemp.setAttachment2(null);
                workOrderAttTemp.setAttachment2name(null);
            }

            if (!attachment3.getOriginalFilename().equalsIgnoreCase("")) {
                workOrderAttTemp.setAttachment3(attachment3.getBytes());
                workOrderAttTemp.setAttachment3name(attachment3.getOriginalFilename());
            } else {
                workOrderAttTemp.setAttachment3(null);
                workOrderAttTemp.setAttachment3name(null);
            }

            if (!attachment4.getOriginalFilename().equalsIgnoreCase("")) {
                workOrderAttTemp.setAttachment4(attachment4.getBytes());
                workOrderAttTemp.setAttachment4name(attachment4.getOriginalFilename());
            } else {
                workOrderAttTemp.setAttachment4(null);
                workOrderAttTemp.setAttachment4name(null);
            }

            if (!attachment5.getOriginalFilename().equalsIgnoreCase("")) {
                workOrderAttTemp.setAttachment5(attachment5.getBytes());
                workOrderAttTemp.setAttachment5name(attachment5.getOriginalFilename());
            } else {
                workOrderAttTemp.setAttachment5(null);
                workOrderAttTemp.setAttachment5name(null);
            }

            String attId = saveWorkOrderAttachmentTemp(workOrderAttTemp);

            jObj.put("TempAttachmentId", attId);

            out.println(jObj);
        } catch (IOException ex) {
            Logger.getLogger(POManagement.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            if (out != null) {
                out.close();
            }
        }
    }

    @RequestMapping(value = "personalsettings")
    public ModelAndView personalSettings(ModelMap model, HttpServletRequest request) {
        System.out.println("personalSettings");

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        System.out.println("buyer : " + buyer);
        int buyerId = buyer.getId();
        String companyCode = buyer.getCompanyCode();

        System.out.println("buyerId: " + buyerId);
        System.out.println("companyCode in createstandalonepo :" + companyCode);

        String[] companyCodeArr = companyCode.split(",");
        System.out.println("companyCodeArr len: " + companyCodeArr.length);
        List<String> companyCodeList = Arrays.asList(companyCodeArr);
        System.out.println("companyCodeList: " + companyCodeList);

        List<PaymentTermsMaster> paymentList = getAllPaymentTerms();
        List<PurchaseOrderTypeMaster> poTypeList = getAllPOTypeMaster();
        List<PersonalSettings> perSettings = purchaseOrderWS.getPersonalSettngsByBuyer(buyerId);
        System.out.println("perSettings size :" + perSettings.size());
        if (!perSettings.isEmpty()) {
            PersonalSettings perSettingsObj = perSettings.get(0);
            model.put("perSettingsObj", perSettingsObj);
        }

        model.put("PurchaseOrderTypeList", poTypeList);
        model.put("companyCodeList", companyCodeList);
        model.put("paymentList", paymentList);
        model.addAttribute("PONGwebserviceIp", NGwebservice_ip);
        return new ModelAndView("personalsettings");
    }

    @RequestMapping(value = "savePersonalSettings", method = RequestMethod.POST)
    public ModelAndView savePersonalSettings(ModelMap model, HttpServletRequest request) {
        System.out.println("personalSettingsform");

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        int buyerId = buyer.getId();

        String coCode = request.getParameter("companycodeHeader");
        String purchasingDocType = request.getParameter("purchasingDocType");
        String purchasingOrg = request.getParameter("purchasingOrg");
        String paymentTerms = request.getParameter("paymentTerms");
        String currency = request.getParameter("currency");
        String ourReference = request.getParameter("ourReference");
        String IncoTermsPart1 = request.getParameter("IncoTermsPart1");
        String IncoTermsPart2 = request.getParameter("IncoTermsPart2");
        String plant = request.getParameter("plantHidden");
        String itemCat = request.getParameter("itemCatHidden");
        String accAsgnCat = request.getParameter("accAsgnCatHidden");
        String requisitioner = request.getParameter("requisitionerHidden");
        String trackingNumber = request.getParameter("trackingNumberHidden");
        String matlGroup = request.getParameter("matlGroupHidden");
        String delDateCat = request.getParameter("delDateCatHidden");
        String ackReqd = request.getParameter("ackReqdHidden");
        String Promotion = request.getParameter("PromotionHidden");
        String incoTerms1Line = request.getParameter("incoTerms1LineHidden");
        String incoTerms2Line = request.getParameter("incoTerms2LineHidden");
        String grMessage = request.getParameter("grMessageHidden");
        String isAckReq = request.getParameter("isAckReqHidden");

        System.out.println("coCode :" + coCode);
        System.out.println("purchasingDocType :" + purchasingDocType);
        System.out.println("purchasingOrg :" + purchasingOrg);
        System.out.println("paymentTerms :" + paymentTerms);
        System.out.println("currency :" + currency);
        System.out.println("ourReference :" + ourReference);
        System.out.println("IncoTermsPart1 :" + IncoTermsPart1);
        System.out.println("IncoTermsPart2 :" + IncoTermsPart2);
        System.out.println("plant :" + plant);
        System.out.println("itemCat :" + itemCat);
        System.out.println("accAsgnCat :" + accAsgnCat);
        System.out.println("requisitioner :" + requisitioner);
        System.out.println("trackingNumber :" + trackingNumber);
        System.out.println("matlGroup :" + matlGroup);
        System.out.println("delDateCat :" + delDateCat);
        System.out.println("ackReqd :" + ackReqd);
        System.out.println("Promotion :" + Promotion);
        System.out.println("incoTerms1Line :" + incoTerms1Line);
        System.out.println("incoTerms2Line :" + incoTerms2Line);
        System.out.println("grMessage :" + grMessage);
        System.out.println("isAckReq :" + isAckReq);

        List<PersonalSettings> perSettings = purchaseOrderWS.getPersonalSettngsByBuyer(buyerId);
        System.out.println("perSettings size :" + perSettings.size());

        if (!perSettings.isEmpty()) {
            PersonalSettings perSettingsObj = perSettings.get(0);

            perSettingsObj.setCompanyCode(coCode);
            perSettingsObj.setPurDocType(purchasingDocType);
            perSettingsObj.setPurOrg(purchasingOrg);
            perSettingsObj.setPaymentTerms(paymentTerms);
            perSettingsObj.setCurrency(currency);
            perSettingsObj.setOurRef(ourReference);
            perSettingsObj.setIncoTerms1(IncoTermsPart1);
            perSettingsObj.setIncoTerms2(IncoTermsPart2);
            perSettingsObj.setPlant(plant);
            perSettingsObj.setItemCategory(itemCat);
            perSettingsObj.setAccAssgnCat(accAsgnCat);
            perSettingsObj.setRequisitioner(requisitioner);
            perSettingsObj.setTrackingNumber(trackingNumber);
            perSettingsObj.setMatlGroup(matlGroup);
            perSettingsObj.setDelDateCat(delDateCat);
            perSettingsObj.setAckReqd(ackReqd);
            perSettingsObj.setPromotion(Promotion);
            perSettingsObj.setIncoTerms1Line(incoTerms1Line);
            perSettingsObj.setIncoTerms2Line(incoTerms2Line);
            perSettingsObj.setGrMessage(grMessage);
            perSettingsObj.setIsAckReq(isAckReq);
            perSettingsObj.setNgBpBuyerdetailsId(buyer);

            String msg = purchaseOrderWS.updatePersonalSettings(perSettingsObj);
            System.out.println("msg in Personalsettings :" + msg);
        } else {

            personalSettings.setCompanyCode(coCode);
            personalSettings.setPurDocType(purchasingDocType);
            personalSettings.setPurOrg(purchasingOrg);
            personalSettings.setPaymentTerms(paymentTerms);
            personalSettings.setCurrency(currency);
            personalSettings.setOurRef(ourReference);
            personalSettings.setIncoTerms1(IncoTermsPart1);
            personalSettings.setIncoTerms2(IncoTermsPart2);
            personalSettings.setPlant(plant);
            personalSettings.setItemCategory(itemCat);
            personalSettings.setAccAssgnCat(accAsgnCat);
            personalSettings.setRequisitioner(requisitioner);
            personalSettings.setTrackingNumber(trackingNumber);
            personalSettings.setMatlGroup(matlGroup);
            personalSettings.setDelDateCat(delDateCat);
            personalSettings.setAckReqd(ackReqd);
            personalSettings.setPromotion(Promotion);
            personalSettings.setIncoTerms1Line(incoTerms1Line);
            personalSettings.setIncoTerms2Line(incoTerms2Line);
            personalSettings.setGrMessage(grMessage);
            personalSettings.setIsAckReq(isAckReq);
            personalSettings.setNgBpBuyerdetailsId(buyer);

            String Id = purchaseOrderWS.SavePersonalSettings(personalSettings);
            System.out.println("Id in  :" + Id);
        }
        return new ModelAndView("redirect:/personalsettings.do");
    }

    @RequestMapping(value = "/vendorfinalized", method = RequestMethod.GET)
    public ModelAndView vendorFinalized(ModelMap model, HttpServletRequest request) {

        System.out.println("vendorfinalized=============");
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        System.out.println("buyer : " + buyer);
        int buyerId = buyer.getId();
        System.out.println("Buyer id is ::" + buyerId);
        List<BuyerPendingPRLineItemsBean> vendorFinalizedList = callBuyerPendingPrLineItemsStoredProcedure(buyerId, "vendorfinalized", 0, "");
        System.out.println("vendorFinalizedList Size :::::" + vendorFinalizedList.size());

        model.addAttribute("vendorFinalizedList", vendorFinalizedList);

        return new ModelAndView("vendorfinalized");
    }

    @RequestMapping(value = "/pendingvendorack", method = RequestMethod.GET)
    public ModelAndView pendingVendorAck(ModelMap model, HttpServletRequest request) {

        System.out.println("pendingvendorack=============");
        List<NGExtPOCreation> acknowlegdePOList = null;
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        System.out.println("buyer : " + buyer);
        int buyerId = buyer.getId();
        System.out.println("Buyer id is ::" + buyerId);
        acknowlegdePOList = findByCurrentWorkstepAndInitiatorId("Vendor Ack", buyer.getUsername());
        System.out.println("acknowlegdePOList size:::: " + acknowlegdePOList.size());
        model.addAttribute("acknowlegdePOList", acknowlegdePOList);
        return new ModelAndView("pendingvendorack");
    }

    @RequestMapping(value = "/posavingreport", method = RequestMethod.GET)
    public ModelAndView poSavingReport(ModelMap model, HttpServletRequest request) {

        System.out.println("posavingreport=============");
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        String companyCode = buyer.getCompanyCode();
        String[] companyCodeArr = companyCode.split(",");
        System.out.println("companyCodeArr len: " + companyCodeArr.length);
        List<String> companyCodeList = Arrays.asList(companyCodeArr);
        System.out.println("companyCodeList: " + companyCodeList);
        List<PurchaseOrderTypeMaster> poTypeList = getAllPOTypeMaster();
        model.put("companyCodeList", companyCodeList);
        model.put("PurchaseOrderTypeList", poTypeList);
        return new ModelAndView("posavingreport");
    }

    List<PurchaseOrderTypeMaster> getAllPOTypeMaster() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findpotypemaster.do";
        System.out.println("url: " + url);
        ResponseEntity<List<PurchaseOrderTypeMaster>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<PurchaseOrderTypeMaster>>() {
        });
        List<PurchaseOrderTypeMaster> poTypeList = response.getBody();
        System.out.println("reasonList size: " + poTypeList.size());
        return poTypeList;
    }

    String savePOHeaderDetails(POHeaderDetails details) {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/savepoheaderdetails.do";

        System.out.println("url: " + url);

        String id = restTemplate.postForObject(URI.create(url), details, String.class);

        return id;
    }

    List<POHeaderDetails> getAllPOHeader() {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/getallpoheader.do";

        System.out.println("url: " + url);

        ResponseEntity<List<POHeaderDetails>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<POHeaderDetails>>() {
        });
        List<POHeaderDetails> poHeaderList = response.getBody();

        System.out.println("reasonList size: " + poHeaderList.size());

        return poHeaderList;
    }

    List<WorkOrderRfqLineItem> getPridByRfqid(int rfqid) {

        RestTemplate restTemplate = new RestTemplate();

        System.out.println("rfqid in getPridByRfqid :" + rfqid);

        String url = webservice_ip + "/BuyerPortalWebServices/findrfqlineitembyrfqid.do?rfqid=" + rfqid;

        System.out.println("url: " + url);

        ResponseEntity<List<WorkOrderRfqLineItem>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<WorkOrderRfqLineItem>>() {
        });

        List<WorkOrderRfqLineItem> lineItemList = response.getBody();

        return lineItemList;
    }

//    List<PRDetails> getPrDetailsById(int prid) {
//
//        RestTemplate restTemplate = new RestTemplate();
//
//        System.out.println("prid in getPrDetailsById :" + prid);
//
//        String url = webservice_ip + "/BuyerPortalWebServices/getprdetailsbyid.do?prid=" + prid;
//
//        System.out.println("url: " + url);
//
//        ResponseEntity<List<PRDetails>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<PRDetails>>() {
//        });
//
//        List<PRDetails> prList = response.getBody();
//
//        return prList;
//    }
    public List<CountryMaster> getAllCountry() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallcountry.do";
        ResponseEntity<List<CountryMaster>> country = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<CountryMaster>>() {
        });
        System.out.println("country: " + country);
        List<CountryMaster> countryList = country.getBody();
        return countryList;
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

    NewgenPRLineItem getNewgenPRLineItemById(int id) {

        RestTemplate restTemplate = new RestTemplate();

        System.out.println("prid in getNewgenPRLineItemById :" + id);

        String url = webservice_ip + "/BuyerPortalWebServices/getnewgenprlineitem.do?id=" + id;

        System.out.println("url: " + url);

        ResponseEntity<NewgenPRLineItem> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<NewgenPRLineItem>() {
        });

        NewgenPRLineItem prList = response.getBody();

        return prList;
    }

    public List<AccountAssignmentCategoryMaster> getAllAccountAssignmentCategory() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallaccountassignmentcategory.do";
        ResponseEntity<List<AccountAssignmentCategoryMaster>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<AccountAssignmentCategoryMaster>>() {
        });
        System.out.println("response: " + response);
        List<AccountAssignmentCategoryMaster> accountList = response.getBody();
        return accountList;
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

    public List<MasterVendor> getAllVendorMaster() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findallvendorfrommaster.do";
        ResponseEntity<List<MasterVendor>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterVendor>>() {
        });
        System.out.println("response: " + response);
        List<MasterVendor> vendorList = response.getBody();
        return vendorList;
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

    public List<PaymentTermsMaster> getAllPaymentTerms() {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/getallpaymentterms.do";

        ResponseEntity<List<PaymentTermsMaster>> paymentterms = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<PaymentTermsMaster>>() {
        });

        System.out.println("paymentterms: " + paymentterms);

        List<PaymentTermsMaster> paymenttermsList = paymentterms.getBody();

        return paymenttermsList;
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

    public List<MasterCurrency> getAllCurrency() {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/getallcurrency.do";

        ResponseEntity<List<MasterCurrency>> country = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterCurrency>>() {
        });

        System.out.println("country: " + country);

        List<MasterCurrency> currencyList = country.getBody();

        return currencyList;
    }

    WorkOrderRfqHeader getWorkOrderById(int rfqid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findrfqheaderbyid.do?rfqid=" + rfqid;
        System.out.println("url: " + url);
        ResponseEntity<WorkOrderRfqHeader> workOrderResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<WorkOrderRfqHeader>() {
        });
        WorkOrderRfqHeader workOrderList = workOrderResponse.getBody();
        System.out.println("workOrderList============: " + workOrderList);
        return workOrderList;
    }

    public List<MasterCostCentre> getAllCostCenter() {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/getallcostcenter.do";

        ResponseEntity<List<MasterCostCentre>> costCenter = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterCostCentre>>() {
        });

        System.out.println("costCenter: " + costCenter);

        List<MasterCostCentre> costCenterList = costCenter.getBody();

        return costCenterList;
    }

    public List<MasterItemCategory> getAllItemCategory() {

        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/getallitemcategory.do";

        ResponseEntity<List<MasterItemCategory>> costCenter = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterItemCategory>>() {
        });

        System.out.println("costCenter: " + costCenter);

        List<MasterItemCategory> itemCategoryList = costCenter.getBody();

        return itemCategoryList;
    }

//    public List<MasterInternalOrder> getAllInterOrder() {
//        RestTemplate restTemplate = new RestTemplate();
//        String url = webservice_ip + "/BuyerPortalWebServices/getallinterorder.do";
//        ResponseEntity<List<MasterInternalOrder>> order = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterInternalOrder>>() {
//        });
//        System.out.println("order: " + order);
//        List<MasterInternalOrder> orderObj = order.getBody();
//        return orderObj;
//    }
    public List<MasterGLCode> getAllGLCode() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallglcode.do";
        ResponseEntity<List<MasterGLCode>> code = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterGLCode>>() {
        });
        System.out.println("code: " + code);
        List<MasterGLCode> codeObj = code.getBody();
        return codeObj;
    }

    public List<MasterCommitmentItem> getAllCommitmentItem() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallcommitmentitem.do";
        ResponseEntity<List<MasterCommitmentItem>> item = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterCommitmentItem>>() {
        });
        System.out.println("item: " + item);
        List<MasterCommitmentItem> itemObj = item.getBody();
        return itemObj;
    }

    public List<MasterWBSElement> getAllMasterWBSElement() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallmasterwbselement.do";
        ResponseEntity<List<MasterWBSElement>> element = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterWBSElement>>() {
        });
        System.out.println("element: " + element);
        List<MasterWBSElement> elementObj = element.getBody();
        return elementObj;
    }

    public List<MasterNetwork> getAllMasterNetwork() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallmasternetwork.do";
        ResponseEntity<List<MasterNetwork>> network = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterNetwork>>() {
        });
        System.out.println("network: " + network);
        List<MasterNetwork> networkObj = network.getBody();
        return networkObj;
    }

    public List<MasterAsset> getAllMasterAsset() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallmasterasset.do";
        ResponseEntity<List<MasterAsset>> asset = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterAsset>>() {
        });
        System.out.println("asset: " + asset);
        List<MasterAsset> assetObj = asset.getBody();
        return assetObj;
    }

    public List<MasterServiceMaster> getAllServiceMaster() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallservicemaster.do";
        ResponseEntity<List<MasterServiceMaster>> service = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterServiceMaster>>() {
        });
        System.out.println("service: " + service);
        List<MasterServiceMaster> serviceObj = service.getBody();
        return serviceObj;
    }

    List<PORfqLineItemBean> callPORfqPrLineItemStoredProcedure(String insertionOrderIds, String rfqId, String requestType) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/callPORfqPrLineItemStoredProcedure.do?insertionOrderIds=" + insertionOrderIds + "&rfqId=" + rfqId + "&requestType=" + requestType;
        System.out.println("url: " + url);
        ResponseEntity<List<PORfqLineItemBean>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<PORfqLineItemBean>>() {
        });
        List<PORfqLineItemBean> list = response.getBody();
        return list;
    }

    List<NGExtPOCreation> findByCurrentWorkstepAndInitiatorId(String currentWorkstep, String initiatorID) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findByCurrentWorkstepAndInitiatorId.do?currentWorkstep=" + currentWorkstep + "&initiatorID=" + initiatorID;
        System.out.println("url: " + url);
        ResponseEntity<List<NGExtPOCreation>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NGExtPOCreation>>() {
        });
        List<NGExtPOCreation> list = response.getBody();
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

    List<MasterDepartment> getMasterDepartment() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getMasterDepartment.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterDepartment>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterDepartment>>() {
        });
        List<MasterDepartment> list = response.getBody();
        return list;
    }

    List<MasterPurchasingGroup> getMasterPurchasingGroup() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getMasterPurchasingGroup.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterPurchasingGroup>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterPurchasingGroup>>() {
        });
        List<MasterPurchasingGroup> list = response.getBody();
        return list;
    }

    List<MasterPurchaseOrg> getMasterPurchaseOrg() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallpurchaseorg.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterPurchaseOrg>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterPurchaseOrg>>() {
        });
        List<MasterPurchaseOrg> list = response.getBody();
        return list;
    }

    List<MasterLocation> getMasterLocation() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getMasterLocation.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterLocation>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterLocation>>() {
        });
        List<MasterLocation> list = response.getBody();
        return list;
    }

    List<MasterShippingInstruction> getAllShippingInstruction() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallshippinginstruction.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterShippingInstruction>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterShippingInstruction>>() {
        });
        List<MasterShippingInstruction> list = response.getBody();
        System.out.println("Instruction size: " + list.size());
        return list;
    }

    List<MasterStockType> getAllStockType() {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getallstocktype.do";
        System.out.println("url: " + url);
        ResponseEntity<List<MasterStockType>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<MasterStockType>>() {
        });
        List<MasterStockType> list = response.getBody();
        System.out.println("stock size: " + list.size());
        return list;
    }

    SignedPoOutput newgenUploadSignedPO(SignedPoInput signedPoInput) {
        RestTemplate restTemplate = new RestTemplate();
        String url = NGwebservice_ip + "/PR2POWebservice/ng/addDocument/PO/SignedPO";
        System.out.println("url: " + url);
        SignedPoOutput output = restTemplate.postForObject(URI.create(url), signedPoInput, SignedPoOutput.class);
        System.out.println("Message: " + output.getMessage());
        return output;
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

    public List<NGBPExtPOCreation> getAllnBPExtPOCreation() {
        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/getAllPO.do";
        System.out.println("URL STRING :::: " + url);
        ResponseEntity<List<NGBPExtPOCreation>> list = restTemplate.exchange(URI.create(url), HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPExtPOCreation>>() {
        });
        List<NGBPExtPOCreation> extPOCrList = list.getBody();
        System.out.println("Returning Size ::: " + extPOCrList.size());
        return extPOCrList;
    }

    public List<Object> getSomeSelectedFieldsFromPONGBPExtPOCreations() {
        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/getSomeSelectedFieldsFromPONGBPExtPOCreations.do";
        System.out.println("URL STRING :::: " + url);
        ResponseEntity<List<Object>> list = restTemplate.exchange(URI.create(url), HttpMethod.GET, null, new ParameterizedTypeReference<List<Object>>() {
        });
        List<Object> extPOCrList = list.getBody();
        System.out.println("Returning Size getSomeSelectedFieldsFromPONGBPExtPOCreations::: " + extPOCrList.size());
        return extPOCrList;
    }

    public NGBPExtPOCreation getNBPExtPOCreationByID(String id) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getNGBPExtPOCreationById.do?id=" + id;
        System.out.println("URL STRING :::: " + url);
        ResponseEntity<NGBPExtPOCreation> ngbObj = restTemplate.exchange(URI.create(url), HttpMethod.GET, null, new ParameterizedTypeReference<NGBPExtPOCreation>() {
        });
        NGBPExtPOCreation extPOCr = ngbObj.getBody();
        return extPOCr;
    }

    public List<NGBPCmplxPOCreationLineItemPO> getPOCreationLineItemById(String id) {
        RestTemplate restTemplate = new RestTemplate();

        String url = webservice_ip + "/BuyerPortalWebServices/getPOCreationLineItemById.do?id=" + id;
        System.out.println("URL STRING :::: " + url);
        ResponseEntity<List<NGBPCmplxPOCreationLineItemPO>> ngbObj = restTemplate.exchange(URI.create(url), HttpMethod.GET, null, new ParameterizedTypeReference<List<NGBPCmplxPOCreationLineItemPO>>() {
        });
        List<NGBPCmplxPOCreationLineItemPO> extPOCr = ngbObj.getBody();
        return extPOCr;
    }

    String saveWorkOrderAttachmentTemp(WorkOrderAttachmentTemp obj) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/saveworkorderattachment.do";
        System.out.println("url: " + url);
        String result = restTemplate.postForObject(URI.create(url), obj, String.class);
        System.out.println("result: " + result);
        return result;
    }

    BuyerDetails findLoggedInBuyer() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
        System.out.println("buyer : " + buyer);
        return buyer;
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

    List<PendingPoCreationBean> callPendingPoCreationStoredProcedure(int buyerId, String isPoCreated) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/callPendingPoCreationStoredProcedure.do?buyerId=" + buyerId + "&isPoCreated=" + isPoCreated;
        System.out.println("url: " + url);
        ResponseEntity<List<PendingPoCreationBean>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<PendingPoCreationBean>>() {
        });
        List<PendingPoCreationBean> list = response.getBody();
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
}
