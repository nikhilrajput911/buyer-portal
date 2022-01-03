/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.controller;

import com.eportal.entities.BuyerDetails;
import com.eportal.entities.DeliverySchedule;
import com.eportal.entities.EditAmendPoRfqLineBean;
import com.eportal.entities.EmailTriggerDetails;
import com.eportal.entities.MasterMaterialGeneral;
import com.eportal.entities.MasterMaterialMARA;
import com.eportal.entities.MasterProcCaMatrix;
import com.eportal.entities.MaterialTab;
import com.eportal.entities.NGExtPOCreation;
import com.eportal.entities.NewgenPRLineItem;
import com.eportal.entities.PORfqLineItemBean;
import com.eportal.entities.PoCommentsHistory;
import com.eportal.entities.QuantityDates;
import com.eportal.entities.Services;
import com.eportal.entities.SupplierHeader;
import com.eportal.entities.SupplierLineitem;
import com.eportal.entities.Text;
import com.eportal.entities.VendorDetails;
import com.eportal.entities.WorkOrderRfqHeader;
import com.eportal.entities.WorkOrderRfqLineItem;
import com.eportal.util.MailTrigger;
import com.eportal.webservice.util.PurchaseOrderWS;
import com.eportal.webservice.util.RfqRfpWS;
import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 *
 * @author admin
 */
@Controller
public class CreateAmendDeletePoAjaxController {

    @Autowired
    RfqRfpWS rfqRfpWsUtil;
    @Autowired
    PurchaseOrderWS purchaseOrderWS;
    @Autowired
    MaterialTab materialTabEntity;
    @Autowired
    EmailTriggerDetails emailTriggerDetails;
    @Autowired
    MailTrigger mailTriggerUtil;
    @Autowired
    Text textEntity;
    @Autowired
    QuantityDates quantityDates;

    @RequestMapping(value = "/createAmendDeletePoGetAjaxRequest", method = RequestMethod.GET)
    public void doGetService(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
        PrintWriter out;
        JSONArray jArra = new JSONArray();
        JSONObject jObj = new JSONObject();

        System.out.println("========CreateAmendDeletePo Get Ajax Request==========");
        String reqFrom = request.getParameter("reqFrom");
        System.out.println("reqFrom: " + reqFrom);

        if (reqFrom.equalsIgnoreCase("findRfqByPrType")) {
            try {
                System.out.println("findRfqByPrType");
                out = response.getWriter();

                String prType = request.getParameter("prType");
                System.out.println("prType: " + prType);

                List<WorkOrderRfqHeader> rfqHeaderList = rfqRfpWsUtil.findRfqHeaderByPrType(prType);
                System.out.println("rfqHeaderList size: " + rfqHeaderList.size());

                JSONArray rfqHeaderJsonArr = new JSONArray(rfqHeaderList);
                out.println(rfqHeaderJsonArr);

            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("findPrLineByRfqId")) {
            try {
                System.out.println("findPrLineByRfqId");
                out = response.getWriter();

                String rfqId = request.getParameter("rfqId");
                System.out.println("prType: " + rfqId);

                List<WorkOrderRfqLineItem> rfqLineItemList = rfqRfpWsUtil.findWorkOrderLineItemByRfqId(Integer.parseInt(rfqId));
                System.out.println("rfqLineItemList size: " + rfqLineItemList.size());

                JSONArray rfqHeaderJsonArr = new JSONArray(rfqLineItemList);
                out.println(rfqHeaderJsonArr);

            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("findWorkOrderRfqLineItemByRfqStatus")) {
            try {
                System.out.println("findWorkOrderRfqLineItemByRfqStatus");
                out = response.getWriter();

                Authentication auth = SecurityContextHolder.getContext().getAuthentication();
                BuyerDetails loggedInUser = (BuyerDetails) auth.getPrincipal();
                int buyerId = loggedInUser.getId();
                System.out.println("buyerId: " + buyerId);

                String vendorCode = request.getParameter("vendorCode");
                System.out.println("vendorCode: " + vendorCode);
                String prType = request.getParameter("prType");
                System.out.println("prType: " + prType);

                List<VendorDetails> vendorList = rfqRfpWsUtil.findVendorByCode(vendorCode);
                int vendorId = 0;
                if (!vendorList.isEmpty()) {
                    VendorDetails vendorObj = vendorList.get(0);
                    vendorId = vendorObj.getId();
                }
                System.out.println("vendorId: " + vendorId);
//                List<WorkOrderRfqLineItem> rfqLineItemList = rfqRfpWsUtil.findWorkOrderRfqLineItemByRfqStatus(rfqStatus);
                List<EditAmendPoRfqLineBean> editAmendPoRfqLineItemList = rfqRfpWsUtil.callEditAmendPoRfqLineStoredProcedure(vendorCode, vendorId, prType, buyerId);
                System.out.println("editAmendPoRfqLineItemList size: " + editAmendPoRfqLineItemList.size());

                JSONArray editAmendPoRfqLineItemJsonArr = new JSONArray(editAmendPoRfqLineItemList);
                out.println(editAmendPoRfqLineItemJsonArr);

            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("findVendorIdByVendorCode")) {
            try {
                System.out.println("findVendorIdByVendorCode");
                out = response.getWriter();

                String vendorCode = request.getParameter("vendorCode");
                System.out.println("vendorCode: " + vendorCode);

                List<VendorDetails> vendorList = rfqRfpWsUtil.findVendorByCode(vendorCode);
                int vendorId = 0;
                if (!vendorList.isEmpty()) {
                    VendorDetails vendorObj = vendorList.get(0);
                    vendorId = vendorObj.getId();
                }
                System.out.println("vendorId: " + vendorId);

                jObj.put("vendorId", vendorId);
                out.println(jObj);

            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("findPrDetailsAndSupplierLineDetailsAndRfqLineDetails")) {
            try {
                System.out.println("findPrDetailsAndSupplierLineDetailsAndRfqLineDetails");
                out = response.getWriter();

                String vendorId = request.getParameter("vendorId");
                String rfqId = request.getParameter("rfqId");
                String rfqLineId = request.getParameter("rfqLineId");
                String insertionOrderId = request.getParameter("insertionOrderId");

                System.out.println("vendorId: " + vendorId);
                System.out.println("rfqId: " + rfqId);
                System.out.println("rfqLineId: " + rfqLineId);
                System.out.println("insertionOrderId: " + insertionOrderId);

                List<PORfqLineItemBean> prLineList = purchaseOrderWS.callPORfqPrLineItemStoredProcedure(insertionOrderId, "", "PR");
                System.out.println("prLineList size : " + prLineList.size());
                if (!prLineList.isEmpty()) {
                    PORfqLineItemBean prLineObj = prLineList.get(0);
                    JSONObject prLineJsonObj = new JSONObject(prLineObj);
                    jObj.put("PRLineJsonObj", prLineJsonObj);
                }

                WorkOrderRfqHeader rfqHeaderObj = rfqRfpWsUtil.findRfqHeaderById(Integer.parseInt(rfqId));
                JSONObject rfqHeaderJsonObj = new JSONObject(rfqHeaderObj);
                jObj.put("RfqHeaderJsonObj", rfqHeaderJsonObj);

                WorkOrderRfqLineItem rfqLineItemObj = rfqRfpWsUtil.findWorkOrderLineItemByRfqLineId(Integer.parseInt(rfqLineId));
                JSONObject rfqLineItemJsonObj = new JSONObject(rfqLineItemObj);
                jObj.put("RfqLineItemJsonObj", rfqLineItemJsonObj);

                List<SupplierHeader> supplierHeaderList = rfqRfpWsUtil.getSupplierHeaderByVendoridAndRfqIdAndStatus(Integer.parseInt(vendorId), Integer.parseInt(rfqId));
                System.out.println("supplierHeaderList size: " + supplierHeaderList.size());
                if (!supplierHeaderList.isEmpty()) {
                    SupplierHeader supplierHeaderObj = supplierHeaderList.get(0);
                    JSONObject supplierHeaderJsonObj = new JSONObject(supplierHeaderObj);
                    jObj.put("SupplierHeaderJsonObj", supplierHeaderJsonObj);

                    int supplierHeaderId = supplierHeaderObj.getId();
                    List<SupplierLineitem> supplierLineItemList = rfqRfpWsUtil.findSupplierLineItemBySupplierHeaderIdAndInsertionOrderIdAndStatus(supplierHeaderId, Integer.parseInt(insertionOrderId));
                    System.out.println("supplierLineItemList size: " + supplierLineItemList.size());
                    if (!supplierLineItemList.isEmpty()) {
                        SupplierLineitem supplierLineItemObj = supplierLineItemList.get(0);
                        JSONObject supplierLineItemJsonObj = new JSONObject(supplierLineItemObj);
                        jObj.put("SupplierLineItemJsonObj", supplierLineItemJsonObj);
                    }
                }

                out.println(jObj);

            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("updateRfqLineRemainingQtyInAmendOrEditPo")) {
            try {
                System.out.println("updateRfqLineRemainingQtyInAmendOrEditPo");
                out = response.getWriter();

                String rfqLineId = request.getParameter("rfqLineId");
                String remainingQty = request.getParameter("remainingQty");
                String companyCode = request.getParameter("companyCode");
                String prType = request.getParameter("prType");

                System.out.println("rfqLineId: " + rfqLineId);
                System.out.println("remainingQty: " + remainingQty);
                System.out.println("companyCode: " + companyCode);
                System.out.println("prType: " + prType);

                WorkOrderRfqLineItem rfqLineItemObj = rfqRfpWsUtil.findWorkOrderLineItemByRfqLineId(Integer.parseInt(rfqLineId));

                // Check if quantity is converted based on Order Unit
                if (prType != null && prType.equals("Material")) {
                    String matCode = rfqLineItemObj.getNgBpNewgenPRLineItemId().getMaterialCode();
                    List<MasterMaterialGeneral> materialGenList = purchaseOrderWS.getMasterMaterialGeneralByCoCodeAndMaterialCode(companyCode, matCode);
                    System.out.println("materialGenList size: " + materialGenList.size());
                    if (!materialGenList.isEmpty()) {
                        MasterMaterialGeneral matGenObj = materialGenList.get(0);
                        String baseUom = matGenObj.getBaseUOM();
                        String orderUnit = matGenObj.getOrderUnit();
                        String conversionFrom = matGenObj.getConversionFrom();
                        String conversionTo = matGenObj.getConversionTo();
                        System.out.println("baseUom: " + baseUom);
                        System.out.println("orderUnit: " + orderUnit);
                        System.out.println("conversionFrom: " + conversionFrom);
                        System.out.println("conversionTo: " + conversionTo);
                        System.out.println("Converted Quantity: " + remainingQty);

                        if (orderUnit != null && !orderUnit.equals("")) {
                            if (baseUom != null && !baseUom.equals(orderUnit)) {
                                System.out.println("Order Unit Present!");
                                double conFrom = Double.parseDouble(conversionFrom);
                                double conTo = Double.parseDouble(conversionTo);
                                double conQty = Double.parseDouble(remainingQty);
                                System.out.println("conFrom: " + conFrom);
                                System.out.println("conTo: " + conTo);
                                System.out.println("conQty: " + conQty);

                                double tempRemQty = (conFrom / conTo) * conQty;
                                System.out.println("tempRemQty: " + tempRemQty);
                                remainingQty = tempRemQty + "";
                            }
                        }
                    }
                }

                if (rfqLineItemObj.getRemainingQuantity() != null) {
                    double remQty = Double.parseDouble(rfqLineItemObj.getRemainingQuantity()) - Double.parseDouble(remainingQty);
                    System.out.println("remQty if: " + remQty);
                    rfqLineItemObj.setRemainingQuantity(remQty + "");
                } else {
                    double remQty = Double.parseDouble(rfqLineItemObj.getQuantity() + "") - Double.parseDouble(remainingQty);
                    System.out.println("remQty else: " + remQty);
                    rfqLineItemObj.setRemainingQuantity(remQty + "");
                }
//                rfqLineItemObj.setPoStatus("PO Created");
                rfqRfpWsUtil.updateWorkOrderRfqLineItem(rfqLineItemObj);

                // Update RFQ PO Status
                WorkOrderRfqHeader rfqHeaderObj = rfqLineItemObj.getBPaasWorkOrderRFQHeaderRFQID();
                if (rfqHeaderObj.getRfqstatus() != null && rfqHeaderObj.getRfqstatus().equals("Bid Submitted")) {
                    rfqHeaderObj.setRfqstatus("Closed");
                    rfqHeaderObj.setIsPoCreated("Yes");
                    rfqRfpWsUtil.updateRfqHeader(rfqHeaderObj);
                }

                jObj.put("Result", "Updated");
                out.println(jObj);

            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("updatePrLineRemainingQtyInAmendOrEditPo")) {
            try {
                System.out.println("updatePrLineRemainingQtyInAmendOrEditPo");
                out = response.getWriter();

                String insertionOrderId = request.getParameter("insertionOrderId");
                String remainingQty = request.getParameter("remainingQty");
                String companyCode = request.getParameter("companyCode");
                String prType = request.getParameter("prType");

                System.out.println("insertionOrderId: " + insertionOrderId);
                System.out.println("remainingQty: " + remainingQty);
                System.out.println("companyCode: " + companyCode);
                System.out.println("prType: " + prType);

                NewgenPRLineItem prLine = rfqRfpWsUtil.findNewgenPRLineItemById(Integer.parseInt(insertionOrderId));
                if (prLine.getBpQuantityRemaining() != null) {

                    if (prType != null && prType.equals("Material")) {
                        String matCode = prLine.getMaterialCode();
                        List<MasterMaterialGeneral> materialGenList = purchaseOrderWS.getMasterMaterialGeneralByCoCodeAndMaterialCode(companyCode, matCode);
                        System.out.println("materialGenList size: " + materialGenList.size());
                        if (!materialGenList.isEmpty()) {
                            MasterMaterialGeneral matGenObj = materialGenList.get(0);
                            String baseUom = matGenObj.getBaseUOM();
                            String orderUnit = matGenObj.getOrderUnit();
                            String conversionFrom = matGenObj.getConversionFrom();
                            String conversionTo = matGenObj.getConversionTo();
                            System.out.println("baseUom: " + baseUom);
                            System.out.println("orderUnit: " + orderUnit);
                            System.out.println("conversionFrom: " + conversionFrom);
                            System.out.println("conversionTo: " + conversionTo);
                            System.out.println("Converted Quantity: " + remainingQty);

                            if (orderUnit != null && !orderUnit.equals("")) {
                                if (baseUom != null && !baseUom.equals(orderUnit)) {
                                    System.out.println("Order Unit Present!");
                                    double conFrom = Double.parseDouble(conversionFrom);
                                    double conTo = Double.parseDouble(conversionTo);
                                    double conQty = Double.parseDouble(remainingQty);
                                    System.out.println("conFrom: " + conFrom);
                                    System.out.println("conTo: " + conTo);
                                    System.out.println("conQty: " + conQty);

                                    double tempRemQty = (conFrom / conTo) * conQty;
                                    System.out.println("tempRemQty: " + tempRemQty);
                                    remainingQty = tempRemQty + "";
                                }
                            }
                        }
                    }
                    double remQty = Double.parseDouble(prLine.getBpQuantityRemaining()) - Double.parseDouble(remainingQty);
                    System.out.println("remQty: " + remQty);
                    prLine.setBpQuantityRemaining(remQty + "");
                    if (remQty == 0) {
                        prLine.setBpStatus("POCreated");
                    }
                } else {
                    System.out.println("Remaining quantity is null");
                }
                rfqRfpWsUtil.updateNewgenPRLineItem(prLine);

                jObj.put("Result", "Updated");
                out.println(jObj);

            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("updatePrLineRemainingQtyAfterSaveDraft")) {
            try {
                System.out.println("updatePrLineRemainingQtyAfterSaveDraft");
                out = response.getWriter();

                String insertionOrderId = request.getParameter("insertionOrderId");
                String remainingQty = request.getParameter("remainingQty");
                String companyCode = request.getParameter("companyCode");
                String prType = request.getParameter("prType");

                System.out.println("insertionOrderId: " + insertionOrderId);
                System.out.println("remainingQty: " + remainingQty);
                System.out.println("companyCode: " + companyCode);
                System.out.println("prType: " + prType);

                NewgenPRLineItem prLine = rfqRfpWsUtil.findNewgenPRLineItemById(Integer.parseInt(insertionOrderId));
                System.out.println("getBpQuantityRemaining :" + prLine.getBpQuantityRemaining() + " ,remainingQty :" + remainingQty);
                if (prLine.getBpQuantityRemaining() != null) {
                    if (prType != null && prType.equals("Material")) {
                        String matCode = prLine.getMaterialCode();
                        List<MasterMaterialGeneral> materialGenList = purchaseOrderWS.getMasterMaterialGeneralByCoCodeAndMaterialCode(companyCode, matCode);
                        System.out.println("materialGenList size: " + materialGenList.size());
                        if (!materialGenList.isEmpty()) {
                            MasterMaterialGeneral matGenObj = materialGenList.get(0);
                            String baseUom = matGenObj.getBaseUOM();
                            String orderUnit = matGenObj.getOrderUnit();
                            String conversionFrom = matGenObj.getConversionFrom();
                            String conversionTo = matGenObj.getConversionTo();
                            System.out.println("baseUom: " + baseUom);
                            System.out.println("orderUnit: " + orderUnit);
                            System.out.println("conversionFrom: " + conversionFrom);
                            System.out.println("conversionTo: " + conversionTo);
                            System.out.println("Converted Quantity: " + remainingQty);

                            if (orderUnit != null && !orderUnit.equals("")) {
                                if (baseUom != null && !baseUom.equals(orderUnit)) {
                                    System.out.println("Order Unit Present!");
                                    double conFrom = Double.parseDouble(conversionFrom);
                                    double conTo = Double.parseDouble(conversionTo);
                                    double conQty = Double.parseDouble(remainingQty);
                                    System.out.println("conFrom: " + conFrom);
                                    System.out.println("conTo: " + conTo);
                                    System.out.println("conQty: " + conQty);

                                    double tempRemQty = (conFrom / conTo) * conQty;
                                    System.out.println("tempRemQty: " + tempRemQty);
                                    remainingQty = tempRemQty + "";
                                }
                            }
                        }
                    }
                    double remQty = Double.parseDouble(prLine.getBpQuantityRemaining()) - Double.parseDouble(remainingQty);
                    System.out.println("remQty: " + remQty);
                    prLine.setBpQuantityRemaining(remQty + "");
                } else {
                    System.out.println("Remaining quantity is null");
                }
                rfqRfpWsUtil.updateNewgenPRLineItem(prLine);

                jObj.put("Result", "Updated");
                out.println(jObj);

            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("updatePrLineRemainingQtyAfterPoCreation")) {
            try {
                System.out.println("updatePrLineRemainingQtyAfterPoCreation");
                out = response.getWriter();

                String insertionOrderIdString = request.getParameter("insertionOrderIdString");
                String poLineQuantityString = request.getParameter("poLineQuantityString");
                String companyCode = request.getParameter("companyCode");
                String prType = request.getParameter("prType");

                System.out.println("insertionOrderIdString: " + insertionOrderIdString);
                System.out.println("poLineQuantityString: " + poLineQuantityString);
                System.out.println("companyCode: " + companyCode);
                System.out.println("prType: " + prType);

                String[] qtyArr = poLineQuantityString.split(",");
                System.out.println("qtyArr length: " + qtyArr.length);

                List<NewgenPRLineItem> prList = purchaseOrderWS.findByMultipleNewgenPRLineItemId(insertionOrderIdString);
                System.out.println("prList size: " + prList.size());

                for (int i = 0; i < prList.size(); i++) {
                    NewgenPRLineItem prLineObj = prList.get(i);
                    String remainingQty = qtyArr[i];
                    if (prType != null && prType.equals("Material")) {
                        String matCode = prLineObj.getMaterialCode();
                        List<MasterMaterialGeneral> materialGenList = purchaseOrderWS.getMasterMaterialGeneralByCoCodeAndMaterialCode(companyCode, matCode);
                        System.out.println("materialGenList size: " + materialGenList.size());
                        if (!materialGenList.isEmpty()) {
                            MasterMaterialGeneral matGenObj = materialGenList.get(0);
                            String baseUom = matGenObj.getBaseUOM();
                            String orderUnit = matGenObj.getOrderUnit();
                            String conversionFrom = matGenObj.getConversionFrom();
                            String conversionTo = matGenObj.getConversionTo();
                            System.out.println("baseUom: " + baseUom);
                            System.out.println("orderUnit: " + orderUnit);
                            System.out.println("conversionFrom: " + conversionFrom);
                            System.out.println("conversionTo: " + conversionTo);
                            System.out.println("Converted Quantity: " + qtyArr[i]);

                            if (orderUnit != null && !orderUnit.equals("")) {
                                if (baseUom != null && !baseUom.equals(orderUnit)) {
                                    System.out.println("Order Unit Present!");
                                    double conFrom = Double.parseDouble(conversionFrom);
                                    double conTo = Double.parseDouble(conversionTo);
                                    double conQty = Double.parseDouble(qtyArr[i]);
                                    System.out.println("conFrom: " + conFrom);
                                    System.out.println("conTo: " + conTo);
                                    System.out.println("conQty: " + conQty);

                                    double tempRemQty = (conFrom / conTo) * conQty;
                                    System.out.println("tempRemQty: " + tempRemQty);
                                    remainingQty = tempRemQty + "";
                                }
                            }
                        }
                    }
                    if (prLineObj.getBpQuantityRemaining() != null) {
                        double remQty = Double.parseDouble(prLineObj.getBpQuantityRemaining()) - Double.parseDouble(remainingQty);
                        System.out.println("remQty: " + remQty);
                        prLineObj.setBpQuantityRemaining(remQty + "");
                        if (remQty == 0) {
                            prLineObj.setBpStatus("POCreated");
                        }
                    } else {
                        System.out.println("Remaining quantity is null");
                    }
                    purchaseOrderWS.updatePrLineItemNG(prLineObj);
                }

                jObj.put("Result", "Updated");
                out.println(jObj);

            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("changeServiceAndConitionTabDataSavedInDB")) {
            try {
                System.out.println("changeServiceAndConitionTabDataSavedInDB");
                out = response.getWriter();

                String linkidArrayAsString = request.getParameter("linkidArrayAsString");
                String currency = request.getParameter("currency");
                String exchangeRate = request.getParameter("exchangeRate");
                System.out.println("linkidArrayAsString: " + linkidArrayAsString);
                System.out.println("currency: " + currency);
                System.out.println("exchangeRate: " + exchangeRate);

                String[] linkIdArray = linkidArrayAsString.split(",");

                for (int i = 0; i < linkIdArray.length; i++) {
                    List<Services> servicesList = purchaseOrderWS.getServicesByLinkId(linkIdArray[i]);
                    for (int j = 0; j < servicesList.size(); j++) {
                        Services serviceObj = servicesList.get(j);
                        BigDecimal quantity = serviceObj.getQuantity();
                        BigDecimal grossprice = serviceObj.getGrossPrice();
                        BigDecimal netprice = serviceObj.getNetPrice();

                        BigDecimal newgrossprice = grossprice.multiply(new BigDecimal(exchangeRate));
                        BigDecimal newNetPrice = newgrossprice.multiply(quantity);

                        System.out.println("newgrossprice: " + newgrossprice);
                        System.out.println("newNetPrice: " + newNetPrice);

                        serviceObj.setGrossPrice(newgrossprice);
                        serviceObj.setNetPrice(newNetPrice);
                        serviceObj.setCurrency(currency);

                        purchaseOrderWS.updateServiceTableData(serviceObj);
                    }
                }

//                List<WorkOrderRfqLineItem> rfqLineItemList = rfqRfpWsUtil.findWorkOrderLineItemByRfqId(Integer.parseInt(rfqId));
//                System.out.println("rfqLineItemList size: " + rfqLineItemList.size());
//
//                JSONArray rfqHeaderJsonArr = new JSONArray(rfqLineItemList);
//                out.println(rfqHeaderJsonArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("findMaxServiceLineNoByInsertionOrderId")) {
            try {
                System.out.println("findMaxServiceLineNoByInsertionOrderId");
                out = response.getWriter();

                String insertionOrderId = request.getParameter("insertionOrderId");
                System.out.println("insertionOrderId: " + insertionOrderId);

                // List<String> list = purchaseOrderWS.findMaxServiceLineNoByInsertionOrderId(insertionOrderId);
                List<String> list = purchaseOrderWS.findMaxServiceLineNoByInsertionOrderIdIn(insertionOrderId);
                if (!list.isEmpty()) {
                    String maxServiceLineNo = list.get(0);
                    System.out.println("maxServiceLineNo: " + maxServiceLineNo);

                    jObj.put("Result", "Found");
                    jObj.put("MaxServiceLineNo", maxServiceLineNo);
                } else {
                    jObj.put("Result", "NotFound");
                }

                out.println(jObj);

            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("findPoCommentsHistoryByPid")) {
            try {
                System.out.println("findPoCommentsHistoryByPid");
                out = response.getWriter();

                String pid = request.getParameter("pid");
                System.out.println("pid: " + pid);

                List<PoCommentsHistory> list = purchaseOrderWS.findPoCommentsHistoryByPid(pid);
                if (!list.isEmpty()) {
                    JSONArray poCommentsJsonArr = new JSONArray(list);
                    jObj.put("Result", "Found");
                    jObj.put("poCommentsJsonArr", poCommentsJsonArr);
                } else {
                    JSONArray poCommentsJsonArr = new JSONArray();
                    jObj.put("Result", "NotFound");
                    jObj.put("poCommentsJsonArr", poCommentsJsonArr);
                }
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("saveMaterialTab")) {
            try {
                System.out.println("saveMaterialTab");
                out = response.getWriter();

                String materialTabDataAsJsonString = request.getParameter("materialTabDataAsJsonString");
                System.out.println("materialTabDataAsJsonString: " + materialTabDataAsJsonString);

                JSONObject materialTabDataAsJsonObj = new JSONObject(materialTabDataAsJsonString);

                System.out.println("prItemNumber: " + materialTabDataAsJsonObj.getString("prItemNumber"));
                System.out.println("linkId: " + materialTabDataAsJsonObj.getString("linkId"));
                System.out.println("insertionOrderId: " + materialTabDataAsJsonObj.getString("insertionOrderId"));

                // Find old record for same insertion order id and then delete if exist
                List<MaterialTab> materialTablist = purchaseOrderWS.findMaterialTabByInsertionOrderId(materialTabDataAsJsonObj.getString("insertionOrderId"));
                if (materialTablist != null && !materialTablist.isEmpty()) {
                    purchaseOrderWS.deleteAllMaterialTab(materialTablist);
                }

                // Save new data for material tab.
                materialTabEntity.setPrItemNumber(materialTabDataAsJsonObj.getString("prItemNumber"));
                materialTabEntity.setLinkId(materialTabDataAsJsonObj.getString("linkId"));
                materialTabEntity.setInsertionOrderId(materialTabDataAsJsonObj.getString("insertionOrderId"));
                materialTabEntity.setRevisionLevel(materialTabDataAsJsonObj.getString("revisionLevel"));
                materialTabEntity.setVendMatNo(materialTabDataAsJsonObj.getString("vendMatNo"));
                materialTabEntity.setEanUpc(materialTabDataAsJsonObj.getString("eanUpc"));
                materialTabEntity.setVendorSubrange(materialTabDataAsJsonObj.getString("vendorSubRange"));
                materialTabEntity.setBatch(materialTabDataAsJsonObj.getString("batch"));
                materialTabEntity.setVendorBatch(materialTabDataAsJsonObj.getString("vendorBatch"));
                materialTabEntity.setInfoUpdate(materialTabDataAsJsonObj.getString("infoUpdate"));
                materialTabEntity.setStockType(materialTabDataAsJsonObj.getString("stockType"));
                materialTabEntity.setMfrPartNumber(materialTabDataAsJsonObj.getString("mfrPartNumber"));
                materialTabEntity.setManufacturer(materialTabDataAsJsonObj.getString("manufacturer"));

                purchaseOrderWS.saveMaterialTab(materialTabEntity);

                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("findMasterMaterialMARAByMatCode")) {
            try {
                System.out.println("findMasterMaterialMARAByMatCode");
                out = response.getWriter();

                String materialCode = request.getParameter("materialCode");
                System.out.println("materialCode: " + materialCode);

                List<MasterMaterialMARA> maraList = purchaseOrderWS.findMasterMaterialMARAByMatCode(materialCode);
                System.out.println("maraList size: " + maraList.size());
                if (!maraList.isEmpty()) {
                    MasterMaterialMARA obj = maraList.get(0);
                    jObj.put("Result", "Found");
                    jObj.put("MFRPN", obj.getMfrpn());
                    jObj.put("MFRNR", obj.getMfrnr());
                } else {
                    jObj.put("Result", "NotFound");
                    jObj.put("MFRPN", "");
                    jObj.put("MFRNR", "");
                }
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("updateOrderPriceUnitInQtyAndWtTabOfPoLine")) {
            try {
                System.out.println("updateOrderPriceUnitInQtyAndWtTabOfPoLine");
                out = response.getWriter();
                String insertionOrderId = request.getParameter("insertionOrderId");
                String newOpu = request.getParameter("newOpu");
                System.out.println("insertionOrderId: " + insertionOrderId);
                System.out.println("newOpu: " + newOpu);
                List<QuantityDates> quantityWeightList = purchaseOrderWS.getQuantityDatesByInsertionId(insertionOrderId);
                if (!quantityWeightList.isEmpty()) {
                    QuantityDates qwObj = quantityWeightList.get(0);
                    qwObj.setUnitOrderPriceUnit(newOpu);
                    purchaseOrderWS.updateQuantityDates(qwObj);
                    jObj.put("Result", "Updated");
                } else {
                    jObj.put("Result", "RecordNotFound");
                }
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("findMaterialTabByInsertionOrderId")) {
            try {
                System.out.println("findMaterialTabByInsertionOrderId");
                out = response.getWriter();
                String insertionOrderId = request.getParameter("insertionOrderId");
                System.out.println("insertionOrderId: " + insertionOrderId);

                List<MaterialTab> materialTabList = purchaseOrderWS.findMaterialTabByInsertionOrderId(insertionOrderId);
                System.out.println("materialTabList size: " + materialTabList.size());
                JSONArray materialTabJsonArr = new JSONArray(materialTabList);
                out.println(materialTabJsonArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("sendPoToVendorsInMail")) {
            try {
                System.out.println("sendPoToVendorsInMail");
                out = response.getWriter();
                String pids = request.getParameter("pids");
                System.out.println("pids: " + pids);

                List<NGExtPOCreation> poCreationList = purchaseOrderWS.findByPidIn(pids);
                System.out.println("poCreationList size: " + poCreationList.size());
                for (NGExtPOCreation po : poCreationList) {
                    String initiatorId = po.getInitiatorID();
                    String initiatorEmailId = po.getInitiatorEmailID();
                    String vendorCode = po.getVendorCode();
                    String vendorName = po.getVendorName();
                    String vendorMailId = po.getVendorMailId();
                    String poNumber = po.getPurchaseOrderNumber();
                    String pid = po.getPid();

                    System.out.println("initiatorId: " + initiatorId);
                    System.out.println("initiatorEmailId: " + initiatorEmailId);
                    System.out.println("vendorCode: " + vendorCode);
                    System.out.println("vendorName: " + vendorName);
                    System.out.println("vendorMailId: " + vendorMailId);
                    System.out.println("poNumber: " + poNumber);
                    System.out.println("pid: " + pid);

//                    String vendorMailId = "";
//                    if (vendorCode != null) {
//                        List<VendorDetails> vendorList = rfqRfpWsUtil.findVendorByCode(vendorCode);
//                        if (!vendorList.isEmpty()) {
//                            VendorDetails vendor = vendorList.get(0);
//                            vendorMailId = vendor.getEmailid();
//                        }
//                    }
//                    System.out.println("vendorMailId: " + vendorMailId);
                    String poDocIndex = "";
                    List<String> poDocList = purchaseOrderWS.findPurchaseOrderDocumentIndexByName(pid);
                    if (!poDocList.isEmpty()) {
                        poDocIndex = poDocList.get(0);
                    }
                    System.out.println("poDocIndex: " + poDocIndex);

                    String tcDocIndex = "";
                    List<String> tcDocList = purchaseOrderWS.findTermsAndConditionsDocumentIndexByName(pid);
                    if (!tcDocList.isEmpty()) {
                        tcDocIndex = tcDocList.get(0);
                    }
                    System.out.println("tcDocIndex: " + tcDocIndex);

                    String isIndex = "";
                    if (poDocIndex != null && !poDocIndex.equals("")) {
                        isIndex = poDocIndex;
                    }
                    if (tcDocIndex != null && !tcDocIndex.equals("")) {
                        isIndex = tcDocIndex;
                    }
                    if (poDocIndex != null && !poDocIndex.equals("") && tcDocIndex != null && !tcDocIndex.equals("")) {
                        isIndex = poDocIndex + ";" + tcDocIndex + ";";
                    }
                    System.out.println("isIndex: " + isIndex);

                    String mailBody = "<html>"
                            + "<head>"
                            + "<style>body, td, input, textarea, select {margin: 0;font-family: Calibri}input, textarea, select {font-size: 100%} body.Su {background-color: #eee;color: #222;}#PRline { font-family: \"Trebuchet MS\", Arial, Helvetica, sans-serif; border-collapse: collapse;width: 100%;}#PRline td, #PRline th { border: 1px solid #ddd; padding: 8px;}#PRline tr:nth-child(even){background-color: #f2f2f2;}#PRline th { padding-top: 12px; padding-bottom: 12px;text-align: left;background-color: #13406d;color: white;}</style>"
                            + "</head>"
                            + "<body class='aAU xE Su'>"
                            + "<table width='640' cellspacing='0' style='font:12px/16px Calibri;color:#333;background-color:#fff;margin:0 auto' cellpadding='0'>"
                            + "<tbody>"
                            + "<tr>"
                            + "<td colspan='2' style='width:640px'>"
                            + "<p style='font:18px Tahoma;color:#0066ff;margin:15px 20px 0 20px'>Hello " + vendorName + ",</p>"
                            + "<br>"
                            + "</td>"
                            + "</tr>"
                            + "<tr>"
                            + "<td colspan='2' style='padding:0 20px;width:640px'>"
                            + "<table cellspacing='0' style='border-top:3px solid #2d3741;width:1275px' cellpadding='0'>"
                            + "<tbody>"
                            + "<tr style='font:14px Calibri;padding:11px 0 14px 18px;width:280px;background-color:#efefef'>"
                            + "<td colspan='2' style='font-size:10px;color:#666;padding:0 10px 10px 10px;line-height:16px;width:640px'>"
                            + "<p style='margin:10px 0 0 0;font:13px/16px Calibri;color:#333'>Purchase Order - " + poNumber + " is created and Approved. Kinldy find the attached  PO Document.</p>"
                            + "</td>"
                            + "</tr>"
                            + "<tr>"
                            + "<td colspan='2' style='font-size:10px;color:#666;padding:0 10px 20px 10px;line-height:16px;width:640px'>"
                            + "<p style='margin:5px 0 0 0;font:11px/16px Calibri;color:#333'></p>"
                            + "</td>"
                            + "</tr>"
                            + "</tbody>"
                            + "</table>"
                            + "</td>"
                            + "</tr>"
                            + "<tr>"
                            + "<td colspan='2' style='padding:0 20px 0 20px;line-height:22px;width:640px'>"
                            + "<p style='font:13px Calibri;margin:10px 0;padding:20px 0 20px 0;border-bottom:1px solid #eaeaea'>Thanks and Regards"
                            + "<br><span style='font:13px Tahoma'><strong>NSH Shared Services Team</strong></span>"
                            + "<br>"
                            + "<a href='https://www.natsteel.com.sg/' title='Visit NatSteel' target='' data-saferedirecturl=''>"
                            + "<img alt='NatSteel' style='height:40px;width:180px;' border='0' id='NatSteelLogo' src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAWRXhpZgAATU0AKgAAAAgAAAAAAAD/7AARRHVja3kAAQAEAAAAZAAA/+EDOmh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4NCjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4NCgk8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPg0KCQk8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NkQ1MDM0QUM3RjAyMTFFNDlCRDdDRjJCNUYwMjExNTMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NkQ1MDM0QUQ3RjAyMTFFNDlCRDdDRjJCNUYwMjExNTMiPg0KCQkJPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NkQ1MDM0QUE3RjAyMTFFNDlCRDdDRjJCNUYwMjExNTMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NkQ1MDM0QUI3RjAyMTFFNDlCRDdDRjJCNUYwMjExNTMiLz4NCgkJPC9yZGY6RGVzY3JpcHRpb24+DQoJPC9yZGY6UkRGPg0KPC94OnhtcG1ldGE+DQo8P3hwYWNrZXQgZW5kPSd3Jz8+/9sAQwACAQEC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'>"
                            + "</a></span>"
                            + "</p>"
                            + "</td>"
                            + "</tr>"
                            + "<tr>"
                            + "<td colspan='2' style='font-size:11px;color:#666;padding:0 20px 20px 20px;line-height:16px;width:640px'>"
                            + "<p>This email was sent from a notification-only address that cannot accept incoming email. Please do not reply to this message.</p>"
                            + "</td>"
                            + "</tr>"
                            + "</tbody>"
                            + "</table>"
                            + "</body>"
                            + "</html>";

                    System.out.println("mailBody: " + mailBody);

//                    emailTriggerDetails.setMailCC(initiatorEmailId);
                    emailTriggerDetails.setMailCC("girivasu-g@newgen.co.in");
                    emailTriggerDetails.setMailContentType("text/html;charset=UTF-8");
                    emailTriggerDetails.setMailFrom("do-not-reply@natsteel.com.sg");
                    emailTriggerDetails.setMailMessage(mailBody);
                    emailTriggerDetails.setMailSubject("Purchase Order - " + poNumber + " is created and approved");
                    emailTriggerDetails.setMailTo(vendorMailId);
                    emailTriggerDetails.setAttachmentISINDEX(isIndex);

                    mailTriggerUtil.TriggerMail(emailTriggerDetails);
                }

                jObj.put("Result", "Success");
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("findPrLineByPid")) {
            try {
                System.out.println("findPrLineByPid");
                out = response.getWriter();

                String pid = request.getParameter("pid");
                String itemNumber = request.getParameter("itemNumber");
                String itemNumberWithLeadingZeros = request.getParameter("itemNumberWithLeadingZeros");
                
                System.out.println("pid: " + pid);
                System.out.println("itemNumber: " + itemNumber);
                System.out.println("itemNumberWithLeadingZeros: " + itemNumberWithLeadingZeros);
                
//                List<NewgenPRLineItem> prLineList = purchaseOrderWS.findPrLineByPidAndItemNumber(pid, itemNumber);
                List<NewgenPRLineItem> prLineList = purchaseOrderWS.findPrLineByPidAndItemNumberAndLeadingZeroIN(pid, itemNumber, itemNumberWithLeadingZeros);
                System.out.println("prLineList size: " + prLineList.size());
                if (!prLineList.isEmpty()) {
                    NewgenPRLineItem prLineObj = prLineList.get(0);
                    jObj.put("Result", "Found");
                    jObj.put("NewgenPrLine", new JSONObject(prLineObj));
                } else {
                    jObj.put("Result", "NotFound");
                }
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("findRfqLineByRfqNumberAndRfqLineItemNumber")) {
            try {
                System.out.println("findRfqLineByRfqNumberAndRfqLineItemNumber");
                out = response.getWriter();

                String rfqNumber = request.getParameter("rfqNumber");
                System.out.println("rfqNumber: " + rfqNumber);

                String rfqLineItemNumber = request.getParameter("rfqLineItemNumber");
                System.out.println("rfqLineItemNumber: " + rfqLineItemNumber);

                List<WorkOrderRfqHeader> rfqHeaderList = rfqRfpWsUtil.findRfqHeaderByRfqNumber(rfqNumber);
                System.out.println("rfqHeaderList size: " + rfqHeaderList.size());
                if (!rfqHeaderList.isEmpty()) {
                    WorkOrderRfqHeader rfqHeaderObj = rfqHeaderList.get(0);
                    List<WorkOrderRfqLineItem> rfqLineList = rfqRfpWsUtil.findWorkOrderRfqLineItemByRfqIdAndItemNumber(rfqHeaderObj.getRfqid(), rfqLineItemNumber);
                    System.out.println("rfqLineList size: " + rfqLineList.size());
                    if (!rfqLineList.isEmpty()) {
                        WorkOrderRfqLineItem rfqLineObj = rfqLineList.get(0);
                        jObj.put("Result", "Found");
                        jObj.put("RfqLineItem", new JSONObject(rfqLineObj));
                    } else {
                        jObj.put("Result", "NotFound");
                    }
                } else {
                    jObj.put("Result", "NotFound");
                }
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("updatePrLineRemainingQtyAfterPoCreationByPid")) {
            try {
                System.out.println("updatePrLineRemainingQtyAfterPoCreationByPid");
                out = response.getWriter();

                String pid = request.getParameter("pid");
                String itemNumber = request.getParameter("prItemNumber");
                String updatedQtyDiff = request.getParameter("updatedQtyDiff");
                String companyCode = request.getParameter("companyCode");
                String prType = request.getParameter("prType");

                System.out.println("pid: " + pid);
                System.out.println("itemNumber: " + itemNumber);
                System.out.println("updatedQtyDiff: " + updatedQtyDiff);
                System.out.println("companyCode: " + companyCode);
                System.out.println("prType: " + prType);

                List<NewgenPRLineItem> prLineList = purchaseOrderWS.findPrLineByPidAndItemNumber(pid, itemNumber);
                System.out.println("prLineList size: " + prLineList.size());

                if (!prLineList.isEmpty()) {
                    NewgenPRLineItem prLineObj = prLineList.get(0);
                    if (prLineObj.getBpQuantityRemaining() != null) {

                        // Check if quantity is converted based on Order Unit
                        if (prType != null && prType.equals("Material")) {
                            String matCode = prLineObj.getMaterialCode();
                            List<MasterMaterialGeneral> materialGenList = purchaseOrderWS.getMasterMaterialGeneralByCoCodeAndMaterialCode(companyCode, matCode);
                            System.out.println("materialGenList size: " + materialGenList.size());
                            if (!materialGenList.isEmpty()) {
                                MasterMaterialGeneral matGenObj = materialGenList.get(0);
                                String baseUom = matGenObj.getBaseUOM();
                                String orderUnit = matGenObj.getOrderUnit();
                                String conversionFrom = matGenObj.getConversionFrom();
                                String conversionTo = matGenObj.getConversionTo();
                                System.out.println("baseUom: " + baseUom);
                                System.out.println("orderUnit: " + orderUnit);
                                System.out.println("conversionFrom: " + conversionFrom);
                                System.out.println("conversionTo: " + conversionTo);
                                System.out.println("Converted Quantity: " + updatedQtyDiff);

                                if (orderUnit != null && !orderUnit.equals("")) {
                                    if (baseUom != null && !baseUom.equals(orderUnit)) {
                                        System.out.println("Order Unit Present!");
                                        double conFrom = Double.parseDouble(conversionFrom);
                                        double conTo = Double.parseDouble(conversionTo);
                                        double conQty = Double.parseDouble(updatedQtyDiff);
                                        System.out.println("conFrom: " + conFrom);
                                        System.out.println("conTo: " + conTo);
                                        System.out.println("conQty: " + conQty);

                                        double tempRemQty = (conFrom / conTo) * conQty;
                                        System.out.println("tempRemQty: " + tempRemQty);
                                        updatedQtyDiff = tempRemQty + "";
                                    }
                                }
                            }
                        }

                        double remQty = Double.parseDouble(prLineObj.getBpQuantityRemaining()) - Double.parseDouble(updatedQtyDiff);
                        System.out.println("remQty: " + remQty);
                        prLineObj.setBpQuantityRemaining(remQty + "");
                        if (remQty == 0) {
                            prLineObj.setBpStatus("POCreated");
                        }
                    } else {
                        System.out.println("Remaining quantity is null");
                    }
                    purchaseOrderWS.updatePrLineItemNG(prLineObj);
                }

                jObj.put("Result", "Updated");
                out.println(jObj);

            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("updateRfqLineRemQtyByRfqNumberAndRfqLineItemNumber")) {
            try {
                System.out.println("updateRfqLineRemQtyByRfqNumberAndRfqLineItemNumber");
                out = response.getWriter();
                String rfqNumber = request.getParameter("rfqNumber");
                String rfqLineItemNumber = request.getParameter("rfqLineItemNumber");
                String updatedQtyDiff = request.getParameter("updatedQtyDiff");
                String companyCode = request.getParameter("companyCode");
                String prType = request.getParameter("prType");

                System.out.println("rfqNumber: " + rfqNumber);
                System.out.println("rfqLineItemNumber: " + rfqLineItemNumber);
                System.out.println("updatedQtyDiff: " + updatedQtyDiff);
                System.out.println("companyCode: " + companyCode);
                System.out.println("prType: " + prType);

                List<WorkOrderRfqHeader> rfqHeaderList = rfqRfpWsUtil.findRfqHeaderByRfqNumber(rfqNumber);
                System.out.println("rfqHeaderList size: " + rfqHeaderList.size());
                if (!rfqHeaderList.isEmpty()) {
                    WorkOrderRfqHeader rfqHeaderObj = rfqHeaderList.get(0);
                    List<WorkOrderRfqLineItem> rfqLineList = rfqRfpWsUtil.findWorkOrderRfqLineItemByRfqIdAndItemNumber(rfqHeaderObj.getRfqid(), rfqLineItemNumber);
                    System.out.println("rfqLineList size: " + rfqLineList.size());
                    if (!rfqLineList.isEmpty()) {
                        WorkOrderRfqLineItem rfqLineItemObj = rfqLineList.get(0);

                        // Check if quantity is converted based on Order Unit
                        if (prType != null && prType.equals("Material")) {
                            String matCode = rfqLineItemObj.getNgBpNewgenPRLineItemId().getMaterialCode();
                            List<MasterMaterialGeneral> materialGenList = purchaseOrderWS.getMasterMaterialGeneralByCoCodeAndMaterialCode(companyCode, matCode);
                            System.out.println("materialGenList size: " + materialGenList.size());
                            if (!materialGenList.isEmpty()) {
                                MasterMaterialGeneral matGenObj = materialGenList.get(0);
                                String baseUom = matGenObj.getBaseUOM();
                                String orderUnit = matGenObj.getOrderUnit();
                                String conversionFrom = matGenObj.getConversionFrom();
                                String conversionTo = matGenObj.getConversionTo();
                                System.out.println("baseUom: " + baseUom);
                                System.out.println("orderUnit: " + orderUnit);
                                System.out.println("conversionFrom: " + conversionFrom);
                                System.out.println("conversionTo: " + conversionTo);
                                System.out.println("Converted Quantity: " + updatedQtyDiff);

                                if (orderUnit != null && !orderUnit.equals("")) {
                                    if (baseUom != null && !baseUom.equals(orderUnit)) {
                                        System.out.println("Order Unit Present!");
                                        double conFrom = Double.parseDouble(conversionFrom);
                                        double conTo = Double.parseDouble(conversionTo);
                                        double conQty = Double.parseDouble(updatedQtyDiff);
                                        System.out.println("conFrom: " + conFrom);
                                        System.out.println("conTo: " + conTo);
                                        System.out.println("conQty: " + conQty);

                                        double tempRemQty = (conFrom / conTo) * conQty;
                                        System.out.println("tempRemQty: " + tempRemQty);
                                        updatedQtyDiff = tempRemQty + "";
                                    }
                                }
                            }
                        }

                        if (rfqLineItemObj.getRemainingQuantity() != null) {
                            double remQty = Double.parseDouble(rfqLineItemObj.getRemainingQuantity()) - Double.parseDouble(updatedQtyDiff);
                            System.out.println("remQty if: " + remQty);
                            rfqLineItemObj.setRemainingQuantity(remQty + "");
                        } else {
                            double remQty = Double.parseDouble(rfqLineItemObj.getQuantity() + "") - Double.parseDouble(updatedQtyDiff);
                            System.out.println("remQty else: " + remQty);
                            rfqLineItemObj.setRemainingQuantity(remQty + "");
                        }
                        rfqRfpWsUtil.updateWorkOrderRfqLineItem(rfqLineItemObj);
                    }
                }
                jObj.put("Result", "Updated");
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("findApproverDetails")) {
            try {
                System.out.println("findApproverDetails");
                out = response.getWriter();

                String companyCode = request.getParameter("companyCode");
                String documentTypeField = request.getParameter("documentTypeField");
                String limitFrom = request.getParameter("limitFrom");
                String limitTo = request.getParameter("limitTo");
                String departmentCode = request.getParameter("departmentCode");

                System.out.println("companyCode: " + companyCode);
                System.out.println("documentTypeField: " + documentTypeField);
                System.out.println("limitFrom: " + limitFrom);
                System.out.println("limitTo: " + limitTo);
                System.out.println("departmentCode: " + departmentCode);
                
                List<MasterProcCaMatrix> matrixList = purchaseOrderWS.findReleaseStrategy(companyCode, documentTypeField, limitFrom, limitTo);
                System.out.println("matrixList size: " + matrixList.size());
                jObj.put("ReleaseStrategyArr", new JSONArray(matrixList));
                
                List<Object[]> approverDetailsList = purchaseOrderWS.findApproverDetails(companyCode, documentTypeField, limitFrom, limitTo, departmentCode);
                System.out.println("approverDetailsList size: " + approverDetailsList.size());
                if (!approverDetailsList.isEmpty()) {
                    for (Object[] objArr : approverDetailsList) {
                        System.out.println("objArr[0]: " + objArr[0]);
                        System.out.println("objArr[1]: " + objArr[1]);
                        System.out.println("objArr[2]: " + objArr[2]);
                        JSONObject appDetailsObj = new JSONObject();
                        appDetailsObj.put("Username", objArr[0]);
                        appDetailsObj.put("RelationCode", objArr[1]);
                        appDetailsObj.put("Level", objArr[2]);
                        jArra.put(appDetailsObj);
                    }
                    jObj.put("Result", "Found");
                    jObj.put("ApproverDetailsArr", jArra);
                } else {
                    jObj.put("Result", "NotFound");
                }
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("updatedQtyInQtyWtsTabByInsertionOrderId")) {
            try {
                System.out.println("updatedQtyInQtyWtsTabByInsertionOrderId");
                out = response.getWriter();

                String insertionOrderId = request.getParameter("insertionOrderId");
                System.out.println("insertionOrderId: " + insertionOrderId);

                String quantity = request.getParameter("quantity");
                System.out.println("quantity: " + quantity);

                List<QuantityDates> quantityWtList = purchaseOrderWS.getQuantityDatesByInsertionId(insertionOrderId);
                if (!quantityWtList.isEmpty()) {
                    QuantityDates qtyWtgsObj = quantityWtList.get(0);

                    qtyWtgsObj.setPoQuantity(quantity);
                    qtyWtgsObj.setPoQuantityInSKU(quantity);

                    purchaseOrderWS.updateQuantityDates(qtyWtgsObj);
                }
                jObj.put("Result", "Updated");
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("updatedQtyInDeliverySchByInsertionOrderId")) {
            try {
                System.out.println("updatedQtyInDeliverySchByInsertionOrderId");
                out = response.getWriter();

                String insertionOrderId = request.getParameter("insertionOrderId");
                System.out.println("insertionOrderId: " + insertionOrderId);

                String quantity = request.getParameter("quantity");
                System.out.println("quantity: " + quantity);

                List<DeliverySchedule> delSchList = purchaseOrderWS.getDeliveryScheduleByInsertionId(insertionOrderId);
                if (!delSchList.isEmpty()) {
                    for (DeliverySchedule dsObj : delSchList) {
                        if (quantity != null && !quantity.equals("")) {
                            dsObj.setScheduledQuantity(new BigDecimal(quantity));

                            purchaseOrderWS.updateDeliverySchedule(dsObj);
                        }
                    }
                }
                jObj.put("Result", "Updated");
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("updatedQtyWtsTabByInsertionOrderId")) {
            try {
                System.out.println("updatedQtyWtsTabByInsertionOrderId");
                out = response.getWriter();

                String quantityWeightAsJsonString = request.getParameter("quantityWeightAsJsonString");
                System.out.println("quantityWeightAsJsonString: " + quantityWeightAsJsonString);

                JSONObject quantityWeightAsJsonObj = new JSONObject(quantityWeightAsJsonString);

                List<QuantityDates> quantityWtList = purchaseOrderWS.getQuantityDatesByInsertionId(quantityWeightAsJsonObj.getString("InsertionOrderId"));
                if (!quantityWtList.isEmpty()) {
                    purchaseOrderWS.deleteAllQuantityWeightByInsertionOrderId(quantityWtList);
                }

                quantityDates.setLineItemNumber(quantityWeightAsJsonObj.getString("InsertionOrderId"));
                quantityDates.setPrItemNumber(quantityWeightAsJsonObj.getString("PrItemNumber"));
                quantityDates.setLinkId(quantityWeightAsJsonObj.getString("LinkId"));
                quantityDates.setPoQuantity(quantityWeightAsJsonObj.getString("POQuantity"));
                quantityDates.setUnitPOQuantity(quantityWeightAsJsonObj.getString("POQuantityUnit"));
                quantityDates.setPoQuantityInSKU(quantityWeightAsJsonObj.getString("POQuantityInSKU"));
                quantityDates.setUnitPOQuantityInSKU(quantityWeightAsJsonObj.getString("POQuantityInSKUUnit"));
                quantityDates.setOrderUnit(quantityWeightAsJsonObj.getString("OrderUnit1"));
                quantityDates.setUnitOrderUnit(quantityWeightAsJsonObj.getString("OrderUnit1_Unit"));
                quantityDates.setOrderPriceUnit(quantityWeightAsJsonObj.getString("OrderPriceUnit"));
                quantityDates.setUnitOrderPriceUnit(quantityWeightAsJsonObj.getString("OrderPriceUnit_Unit"));
                quantityDates.setOrderUnitSKU(quantityWeightAsJsonObj.getString("OrderUnit2"));
                quantityDates.setUnitOrderUnitSKU(quantityWeightAsJsonObj.getString("OrderUnit2_Unit"));
                quantityDates.setSku(quantityWeightAsJsonObj.getString("SKU"));
                quantityDates.setUnitSKU(quantityWeightAsJsonObj.getString("SKU_Unit"));

                quantityDates.setNetWeight(quantityWeightAsJsonObj.getString("NetWeight"));
                quantityDates.setGrossWeight(quantityWeightAsJsonObj.getString("GrossWeight"));
                quantityDates.setVolume(quantityWeightAsJsonObj.getString("Volume"));
                quantityDates.setPoints(quantityWeightAsJsonObj.getString("Points"));

                quantityDates.setNetWeightUnit(quantityWeightAsJsonObj.getString("NetWeightUnit"));
                quantityDates.setGrossWeightUnit(quantityWeightAsJsonObj.getString("GrossWeightUnit"));
                quantityDates.setVolumeUnit(quantityWeightAsJsonObj.getString("VolumeUnit"));
                quantityDates.setPointsUnit(quantityWeightAsJsonObj.getString("PointsUnit"));

                quantityDates.setNetWeightPerPrice(quantityWeightAsJsonObj.getString("NetWeightPerPrice"));
                quantityDates.setGrossWeightPerPrice(quantityWeightAsJsonObj.getString("GrossWeightPerPrice"));
                quantityDates.setVolumePerPrice(quantityWeightAsJsonObj.getString("VolumePerPrice"));
                quantityDates.setPointsPerPrice(quantityWeightAsJsonObj.getString("PointsPerPrice"));

                quantityDates.setNetWeightOrderUnit(quantityWeightAsJsonObj.getString("NetWeightOrderUnit"));
                quantityDates.setGrossWeightOrderUnit(quantityWeightAsJsonObj.getString("GrossWeightOrderUnit"));
                quantityDates.setVolumeOrderUnit(quantityWeightAsJsonObj.getString("VolumeOrderUnit"));
                quantityDates.setPointsOrderUnit(quantityWeightAsJsonObj.getString("PointsOrderUnit"));

                quantityDates.setNetWeight2(quantityWeightAsJsonObj.getString("NetWeight2"));
                quantityDates.setGrossWeight2(quantityWeightAsJsonObj.getString("GrossWeight2"));
                quantityDates.setVolume2(quantityWeightAsJsonObj.getString("Volume2"));
                quantityDates.setPoints2(quantityWeightAsJsonObj.getString("Points2"));

                quantityDates.setNetWeightUnit2(quantityWeightAsJsonObj.getString("NetWeightUnit2"));
                quantityDates.setGrossWeightUnit2(quantityWeightAsJsonObj.getString("GrossWeightUnit2"));
                quantityDates.setVolumeUnit2(quantityWeightAsJsonObj.getString("VolumeUnit2"));
                quantityDates.setPointsUnit2(quantityWeightAsJsonObj.getString("PointsUnit2"));

                String msg = purchaseOrderWS.saveQuantityDates(quantityDates);
                System.out.println("msg :" + msg);

                jObj.put("Result", "Success");
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("findServiceById")) {
            try {
                System.out.println("findServiceById");
                out = response.getWriter();

                String serviceId = request.getParameter("serviceId");
                System.out.println("serviceId: " + serviceId);

                Services serviceObj = purchaseOrderWS.getServiceById(Integer.parseInt(serviceId));
                jObj.put("Service", new JSONObject(serviceObj));
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("addPoLineQuantityBackToPrLineOnCancelPo")) {
            try {
                System.out.println("addPoLineQuantityBackToPrLineOnCancelPo");
                out = response.getWriter();

                String pid = request.getParameter("pid");
                String itemNumber = request.getParameter("prItemNumber");
                String poLineQuantity = request.getParameter("poLineQuantity");
                String companyCode = request.getParameter("companyCode");
                String prType = request.getParameter("prType");

                System.out.println("pid: " + pid);
                System.out.println("itemNumber: " + itemNumber);
                System.out.println("poLineQuantity: " + poLineQuantity);
                System.out.println("companyCode: " + companyCode);
                System.out.println("prType: " + prType);

                List<NewgenPRLineItem> prLineList = purchaseOrderWS.findPrLineByPidAndItemNumber(pid, itemNumber);
                System.out.println("prLineList size: " + prLineList.size());

                if (!prLineList.isEmpty()) {
                    NewgenPRLineItem prLineObj = prLineList.get(0);
                    if (prLineObj.getBpQuantityRemaining() != null) {

                        // Check if quantity is converted based on Order Unit
                        if (prType != null && prType.equals("Material")) {
                            String matCode = prLineObj.getMaterialCode();
                            List<MasterMaterialGeneral> materialGenList = purchaseOrderWS.getMasterMaterialGeneralByCoCodeAndMaterialCode(companyCode, matCode);
                            System.out.println("materialGenList size: " + materialGenList.size());
                            if (!materialGenList.isEmpty()) {
                                MasterMaterialGeneral matGenObj = materialGenList.get(0);
                                String baseUom = matGenObj.getBaseUOM();
                                String orderUnit = matGenObj.getOrderUnit();
                                String conversionFrom = matGenObj.getConversionFrom();
                                String conversionTo = matGenObj.getConversionTo();
                                System.out.println("baseUom: " + baseUom);
                                System.out.println("orderUnit: " + orderUnit);
                                System.out.println("conversionFrom: " + conversionFrom);
                                System.out.println("conversionTo: " + conversionTo);
                                System.out.println("Converted Quantity: " + poLineQuantity);

                                if (orderUnit != null && !orderUnit.equals("")) {
                                    if (baseUom != null && !baseUom.equals(orderUnit)) {
                                        System.out.println("Order Unit Present!");
                                        double conFrom = Double.parseDouble(conversionFrom);
                                        double conTo = Double.parseDouble(conversionTo);
                                        double conQty = Double.parseDouble(poLineQuantity);
                                        System.out.println("conFrom: " + conFrom);
                                        System.out.println("conTo: " + conTo);
                                        System.out.println("conQty: " + conQty);

                                        double tempRemQty = (conFrom / conTo) * conQty;
                                        System.out.println("tempRemQty: " + tempRemQty);
                                        poLineQuantity = tempRemQty + "";
                                    }
                                }
                            }
                        }

                        double remQty = Double.parseDouble(prLineObj.getBpQuantityRemaining()) + Double.parseDouble(poLineQuantity);
                        System.out.println("remQty: " + remQty);
                        prLineObj.setBpQuantityRemaining(remQty + "");
                    } else {
                        System.out.println("Remaining quantity is null");
                    }
                    purchaseOrderWS.updatePrLineItemNG(prLineObj);
                }

                jObj.put("Result", "Updated");
                out.println(jObj);

            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("addPoLineQuantityBackToRfqLineOnCancelPo")) {
            try {
                System.out.println("addPoLineQuantityBackToRfqLineOnCancelPo");
                out = response.getWriter();
                String rfqNumber = request.getParameter("rfqNumber");
                String rfqLineItemNumber = request.getParameter("rfqLineItemNumber");
                String poLineQuantity = request.getParameter("poLineQuantity");
                String companyCode = request.getParameter("companyCode");
                String prType = request.getParameter("prType");

                System.out.println("rfqNumber: " + rfqNumber);
                System.out.println("rfqLineItemNumber: " + rfqLineItemNumber);
                System.out.println("poLineQuantity: " + poLineQuantity);
                System.out.println("companyCode: " + companyCode);
                System.out.println("prType: " + prType);

                List<WorkOrderRfqHeader> rfqHeaderList = rfqRfpWsUtil.findRfqHeaderByRfqNumber(rfqNumber);
                System.out.println("rfqHeaderList size: " + rfqHeaderList.size());
                if (!rfqHeaderList.isEmpty()) {
                    WorkOrderRfqHeader rfqHeaderObj = rfqHeaderList.get(0);
                    List<WorkOrderRfqLineItem> rfqLineList = rfqRfpWsUtil.findWorkOrderRfqLineItemByRfqIdAndItemNumber(rfqHeaderObj.getRfqid(), rfqLineItemNumber);
                    System.out.println("rfqLineList size: " + rfqLineList.size());
                    if (!rfqLineList.isEmpty()) {
                        WorkOrderRfqLineItem rfqLineItemObj = rfqLineList.get(0);

                        // Check if quantity is converted based on Order Unit
                        if (prType != null && prType.equals("Material")) {
                            String matCode = rfqLineItemObj.getNgBpNewgenPRLineItemId().getMaterialCode();
                            List<MasterMaterialGeneral> materialGenList = purchaseOrderWS.getMasterMaterialGeneralByCoCodeAndMaterialCode(companyCode, matCode);
                            System.out.println("materialGenList size: " + materialGenList.size());
                            if (!materialGenList.isEmpty()) {
                                MasterMaterialGeneral matGenObj = materialGenList.get(0);
                                String baseUom = matGenObj.getBaseUOM();
                                String orderUnit = matGenObj.getOrderUnit();
                                String conversionFrom = matGenObj.getConversionFrom();
                                String conversionTo = matGenObj.getConversionTo();
                                System.out.println("baseUom: " + baseUom);
                                System.out.println("orderUnit: " + orderUnit);
                                System.out.println("conversionFrom: " + conversionFrom);
                                System.out.println("conversionTo: " + conversionTo);
                                System.out.println("Converted Quantity: " + poLineQuantity);

                                if (orderUnit != null && !orderUnit.equals("")) {
                                    if (baseUom != null && !baseUom.equals(orderUnit)) {
                                        System.out.println("Order Unit Present!");
                                        double conFrom = Double.parseDouble(conversionFrom);
                                        double conTo = Double.parseDouble(conversionTo);
                                        double conQty = Double.parseDouble(poLineQuantity);
                                        System.out.println("conFrom: " + conFrom);
                                        System.out.println("conTo: " + conTo);
                                        System.out.println("conQty: " + conQty);

                                        double tempRemQty = (conFrom / conTo) * conQty;
                                        System.out.println("tempRemQty: " + tempRemQty);
                                        poLineQuantity = tempRemQty + "";
                                    }
                                }
                            }
                        }

                        if (rfqLineItemObj.getRemainingQuantity() != null) {
                            double remQty = Double.parseDouble(rfqLineItemObj.getRemainingQuantity()) + Double.parseDouble(poLineQuantity);
                            System.out.println("remQty if: " + remQty);
                            rfqLineItemObj.setRemainingQuantity(remQty + "");
                        } else {
                            double remQty = Double.parseDouble(rfqLineItemObj.getQuantity() + "") + Double.parseDouble(poLineQuantity);
                            System.out.println("remQty else: " + remQty);
                            rfqLineItemObj.setRemainingQuantity(remQty + "");
                        }
                        rfqRfpWsUtil.updateWorkOrderRfqLineItem(rfqLineItemObj);
                    }
                }
                jObj.put("Result", "Updated");
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("updateQuantityWeightsOnUomChange")) {
            try {
                System.out.println("updateQuantityWeightsOnUomChange");
                out = response.getWriter();

                String quantityWeightAsJsonString = request.getParameter("quantityWeightAsJsonString");
                System.out.println("quantityWeightAsJsonString: " + quantityWeightAsJsonString);

                JSONObject quantityWeightAsJsonObj = new JSONObject(quantityWeightAsJsonString);

                List<QuantityDates> quantityWtList = purchaseOrderWS.getQuantityDatesByInsertionId(quantityWeightAsJsonObj.getString("InsertionOrderId"));
                if (!quantityWtList.isEmpty()) {
                    QuantityDates qwObj = quantityWtList.get(0);
                    
                    if(quantityWeightAsJsonObj.getString("POQuantityUnit") != null && !quantityWeightAsJsonObj.getString("POQuantityUnit").equals("")) {
                        qwObj.setUnitPOQuantity(quantityWeightAsJsonObj.getString("POQuantityUnit"));
                    }
                    if(quantityWeightAsJsonObj.getString("OrderUnit1_Unit") != null && !quantityWeightAsJsonObj.getString("OrderUnit1_Unit").equals("")) {
                        qwObj.setUnitOrderUnit(quantityWeightAsJsonObj.getString("OrderUnit1_Unit"));
                    }
                    if(quantityWeightAsJsonObj.getString("OrderPriceUnit_Unit") != null && !quantityWeightAsJsonObj.getString("OrderPriceUnit_Unit").equals("")) {
                        qwObj.setUnitOrderPriceUnit(quantityWeightAsJsonObj.getString("OrderPriceUnit_Unit"));
                    }
                    if(quantityWeightAsJsonObj.getString("OrderUnit2") != null && !quantityWeightAsJsonObj.getString("OrderUnit2").equals("")) {
                        qwObj.setOrderUnitSKU(quantityWeightAsJsonObj.getString("OrderUnit2"));
                    }
                    if(quantityWeightAsJsonObj.getString("OrderUnit2_Unit") != null && !quantityWeightAsJsonObj.getString("OrderUnit2_Unit").equals("")) {
                        qwObj.setUnitOrderUnitSKU(quantityWeightAsJsonObj.getString("OrderUnit2_Unit"));
                    }
                    if(quantityWeightAsJsonObj.getString("NetWeightOrderUnit") != null && !quantityWeightAsJsonObj.getString("NetWeightOrderUnit").equals("")) {
                        qwObj.setNetWeightOrderUnit(quantityWeightAsJsonObj.getString("NetWeightOrderUnit"));
                    }
                    if(quantityWeightAsJsonObj.getString("GrossWeightOrderUnit") != null && !quantityWeightAsJsonObj.getString("GrossWeightOrderUnit").equals("")) {
                        qwObj.setGrossWeightOrderUnit(quantityWeightAsJsonObj.getString("GrossWeightOrderUnit"));
                    }
                    if(quantityWeightAsJsonObj.getString("VolumeOrderUnit") != null && !quantityWeightAsJsonObj.getString("VolumeOrderUnit").equals("")) {
                        qwObj.setVolumeOrderUnit(quantityWeightAsJsonObj.getString("VolumeOrderUnit"));
                    }
                    if(quantityWeightAsJsonObj.getString("PointsOrderUnit") != null && !quantityWeightAsJsonObj.getString("PointsOrderUnit").equals("")) {
                        qwObj.setPointsOrderUnit(quantityWeightAsJsonObj.getString("PointsOrderUnit"));
                    }
                    if(quantityWeightAsJsonObj.getString("NetWeight") != null && !quantityWeightAsJsonObj.getString("NetWeight").equals("")) {
                        qwObj.setNetWeight(quantityWeightAsJsonObj.getString("NetWeight"));
                    }
                    if(quantityWeightAsJsonObj.getString("GrossWeight") != null && !quantityWeightAsJsonObj.getString("GrossWeight").equals("")) {
                        qwObj.setGrossWeight(quantityWeightAsJsonObj.getString("GrossWeight"));
                    }
                    
                    purchaseOrderWS.updateQuantityDates(qwObj);
                    jObj.put("Result", "Updated");
                } else {
                    jObj.put("Result", "RecordNotFound");
                }
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }

    @RequestMapping(value = "/saveOrUpdateLineItemTextTab", method = RequestMethod.POST)
    public void saveOrUpdateLineItemTextTab(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
        PrintWriter out = null;
        JSONArray jArra = new JSONArray();
        JSONObject jObj = new JSONObject();

        String reqFrom = request.getParameter("reqFrom");
        System.out.println("reqFrom in saveOrUpdateLineItemTextTab : " + reqFrom);
        try {
            if (reqFrom.equalsIgnoreCase("saveOrUpdateLineItemTextTab")) {
                out = response.getWriter();

                String itemTextDataAsJsonString = request.getParameter("itemTextDataAsJsonString");
                System.out.println("itemTextDataAsJsonString: " + itemTextDataAsJsonString);

                JSONObject itemTextTabDataAsJsonObj = new JSONObject(itemTextDataAsJsonString);

                String LineItemNumber = itemTextTabDataAsJsonObj.getString("LineItemNumber");
                String PRItemNumber = itemTextTabDataAsJsonObj.getString("PRItemNumber");
                String LinkId = itemTextTabDataAsJsonObj.getString("LinkId");
                String ItemText = itemTextTabDataAsJsonObj.getString("ItemText");
                String InfoRecordPOText = itemTextTabDataAsJsonObj.getString("InfoRecordPOText");
                String MaterialPOText = itemTextTabDataAsJsonObj.getString("MaterialPOText");
                String PONoteToApprover = itemTextTabDataAsJsonObj.getString("PONoteToApprover");
                String DeliveryText = itemTextTabDataAsJsonObj.getString("DeliveryText");
                String PrNoteToApprover = itemTextTabDataAsJsonObj.getString("PrNoteToApprover");

                System.out.println("LineItemNumber: " + LineItemNumber);
                System.out.println("PRItemNumber: " + PRItemNumber);
                System.out.println("LinkId: " + LinkId);
                System.out.println("ItemText: " + ItemText);
                System.out.println("InfoRecordPOText: " + InfoRecordPOText);
                System.out.println("MaterialPOText: " + MaterialPOText);
                System.out.println("PONoteToApprover: " + PONoteToApprover);
                System.out.println("DeliveryText: " + DeliveryText);
                System.out.println("PrNoteToApprover: " + PrNoteToApprover);

                List<Text> textList = purchaseOrderWS.getTextsByInsertionId(LineItemNumber);
                if (!textList.isEmpty()) {
                    purchaseOrderWS.deleteAllText(textList);
                }

                textEntity.setItemTax(ItemText);
                textEntity.setInfoRecordPOText(InfoRecordPOText);
                textEntity.setMaterialPOText(MaterialPOText);
                textEntity.setPoNoteToApprover(PONoteToApprover);
                textEntity.setDeliveryText(DeliveryText);
                textEntity.setLineItemNumber(LineItemNumber);
                textEntity.setPrItemNumber(PRItemNumber);
                textEntity.setLinkId(LinkId);
                textEntity.setPrNoteToApprover(PrNoteToApprover);

                String msg = purchaseOrderWS.saveText(textEntity);
                System.out.println("msg :" + msg);

                jObj.put("Result", "Success");
                out.println(jObj);
            }
        } catch (IOException ex) {
            Logger.getLogger(AjaxController.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            if (out != null) {
                out.close();
            }
        }
    }

    @RequestMapping(value = "/updateServiceTabDataByServiceId", method = RequestMethod.POST)
    public void updateServiceShortTextByServiceId(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
        PrintWriter out = null;
        JSONArray jArra = new JSONArray();
        JSONObject jObj = new JSONObject();

        String reqFrom = request.getParameter("reqFrom");
        System.out.println("reqFrom in updateServiceShortTextByServiceId : " + reqFrom);

        if (reqFrom.equalsIgnoreCase("updateServiceShortTextByServiceId")) {
            try {
                System.out.println("updateServiceShortTextByServiceId");
                out = response.getWriter();

                String serviceIdAndServiceShortTextJsonObjAsString = request.getParameter("serviceIdAndServiceShortTextJsonObjAsString");
                System.out.println("serviceIdAndServiceShortTextJsonObjAsString: " + serviceIdAndServiceShortTextJsonObjAsString);

                JSONObject serviceIdAndServiceShortTextJsonObj = new JSONObject(serviceIdAndServiceShortTextJsonObjAsString);

                String ServiceId = serviceIdAndServiceShortTextJsonObj.getString("ServiceId");
                String ServiceShortText = serviceIdAndServiceShortTextJsonObj.getString("ServiceShortText");

                System.out.println("ServiceId: " + ServiceId);
                System.out.println("ServiceShortText: " + ServiceShortText);

                Services serviceObj = purchaseOrderWS.getServiceById(Integer.parseInt(ServiceId));
                serviceObj.setShortText(ServiceShortText);
                purchaseOrderWS.updateServiceTableData(serviceObj);

                jObj.put("Result", "Success");
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(AjaxController.class.getName()).log(Level.SEVERE, null, ex);
            } finally {
                if (out != null) {
                    out.close();
                }
            }
        } else if (reqFrom.equalsIgnoreCase("updateServiceLineItemLongTextByServiceId")) {
            try {
                System.out.println("updateServiceLineItemLongTextByServiceId");
                out = response.getWriter();

                String serviceIdAndServiceLineItemLongTextJsonObjAsString = request.getParameter("serviceIdAndServiceLineItemLongTextJsonObjAsString");
                System.out.println("serviceIdAndServiceLineItemLongTextJsonObjAsString: " + serviceIdAndServiceLineItemLongTextJsonObjAsString);

                JSONObject serviceIdAndServiceLineItemLongTextJsonObj = new JSONObject(serviceIdAndServiceLineItemLongTextJsonObjAsString);

                String ServiceId = serviceIdAndServiceLineItemLongTextJsonObj.getString("ServiceId");
                String ServiceLineItemLongText = serviceIdAndServiceLineItemLongTextJsonObj.getString("ServiceLineItemLongText");

                System.out.println("ServiceId: " + ServiceId);
                System.out.println("ServiceLineItemLongText: " + ServiceLineItemLongText);

                Services serviceObj = purchaseOrderWS.getServiceById(Integer.parseInt(ServiceId));
                serviceObj.setLineItemLongText(ServiceLineItemLongText);
                purchaseOrderWS.updateServiceTableData(serviceObj);

                jObj.put("Result", "Success");
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(AjaxController.class.getName()).log(Level.SEVERE, null, ex);
            } finally {
                if (out != null) {
                    out.close();
                }
            }
        } else if (reqFrom.equalsIgnoreCase("updateServiceTextByServiceId")) {
            try {
                System.out.println("updateServiceTextByServiceId");
                out = response.getWriter();

                String serviceIdAndServiceTextJsonObjAsString = request.getParameter("serviceIdAndServiceTextJsonObjAsString");
                System.out.println("serviceIdAndServiceTextJsonObjAsString: " + serviceIdAndServiceTextJsonObjAsString);

                JSONObject serviceIdAndServiceTextJsonObj = new JSONObject(serviceIdAndServiceTextJsonObjAsString);

                String ServiceId = serviceIdAndServiceTextJsonObj.getString("ServiceId");
                String ServiceText = serviceIdAndServiceTextJsonObj.getString("ServiceText");

                System.out.println("ServiceId: " + ServiceId);
                System.out.println("ServiceText: " + ServiceText);

                Services serviceObj = purchaseOrderWS.getServiceById(Integer.parseInt(ServiceId));
                serviceObj.setServiceText(ServiceText);
                purchaseOrderWS.updateServiceTableData(serviceObj);

                jObj.put("Result", "Success");
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(AjaxController.class.getName()).log(Level.SEVERE, null, ex);
            } finally {
                if (out != null) {
                    out.close();
                }
            }
        }
    }
}
