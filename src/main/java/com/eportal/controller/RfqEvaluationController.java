/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.controller;

import com.eportal.document.Generator;
import com.eportal.entities.BuyerDetails;
import com.eportal.entities.BuyerTeamleadMapping;
import com.eportal.entities.MasterMaterialGeneral;
import com.eportal.entities.NewgenPRLineItem;
import com.eportal.entities.RfqPoDetails;
import com.eportal.entities.SupplierHeader;
import com.eportal.entities.SupplierHeaderRatedParameterMapping;
import com.eportal.entities.SupplierLineitem;
import com.eportal.entities.TlPrLineItemsBean;
import com.eportal.entities.VendorDetails;
import com.eportal.entities.WorkOrderRfqHeader;
import com.eportal.entities.WorkOrderRfqLineItem;
import com.eportal.itextPdf.OrderEvaluationFooter;
import com.eportal.newgenControl.RfqQuotationRfqEvaluationInputBean;
import com.eportal.newgenControl.RfqQuotationRfqEvaluationOutputBean;
import com.eportal.webservice.util.PurchaseOrderWS;
import com.eportal.webservice.util.PurchaseRequestWS;
import com.eportal.webservice.util.RfqRfpWS;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.pdf.PdfWriter;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Workbook;
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
public class RfqEvaluationController {

    @Autowired
    RfqRfpWS rfqRfpWsUtil;
    @Autowired
    RfqPoDetails rfqPoDetailsEntity;
    @Autowired
    RfqQuotationRfqEvaluationInputBean rfqQuotationRfqEvaluationInputBean;
    @Autowired
    Generator generator;
    @Autowired
    PurchaseOrderWS purchaseOrderWS;
    @Autowired
    PurchaseRequestWS purchaseRequestWSUtil;

    @RequestMapping(value = "/rfqEvaluationGetAjaxRequest", method = RequestMethod.GET)
    public void doGetService(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
        PrintWriter out;
        JSONArray jArra = new JSONArray();
        JSONObject jObj = new JSONObject();

        System.out.println("========RfqEvaluation Get Ajax Request==========");
        String reqFrom = request.getParameter("reqFrom");
        System.out.println("reqFrom: " + reqFrom);

        if (reqFrom.equalsIgnoreCase("rfqEvaluationReport")) {
            try {
                System.out.println("rfqEvaluationReport");
                out = response.getWriter();
                String rfqIds = request.getParameter("rfqIds");
                System.out.println("rfqIds: " + rfqIds);

                List<WorkOrderRfqHeader> rfqHeaderList = rfqRfpWsUtil.findRfqHeaderByRfqIdIn(rfqIds);
                System.out.println("rfqHeaderList size: " + rfqHeaderList.size());

//                List<WorkOrderRfqLineItem> rfqLineItemList = rfqRfpWsUtil.findWorkOrderRfqLineItemByRfqIdIn(rfqIds);
//                System.out.println("rfqLineItemList size: " + rfqLineItemList.size());
                List<SupplierHeader> supplierHeaderList = rfqRfpWsUtil.findSupplierHeaderByRfqIdInAndStatusIn(rfqIds);
                System.out.println("supplierHeaderList size: " + supplierHeaderList.size());

                JSONArray rfqHeaderJsonArray = new JSONArray(rfqHeaderList);
//                JSONArray rfqLineItemJsonArray = new JSONArray(rfqLineItemList);
                JSONArray supplierHeaderJsonArray = new JSONArray(supplierHeaderList);

                jObj.put("RfqHeaderJsonArray", rfqHeaderJsonArray);
//                jObj.put("RfqLineItemJsonArray", rfqLineItemJsonArray);
                jObj.put("SupplierHeaderJsonArray", supplierHeaderJsonArray);

                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("findSupplierLineItemBySupplierHeaderId")) {
            try {
                System.out.println("findSupplierLineItemBySupplierHeaderId");
                out = response.getWriter();
                String supplierHeaderId = request.getParameter("supplierHeaderId");
                System.out.println("supplierHeaderId: " + supplierHeaderId);

                List<SupplierLineitem> supplierLineItemList = rfqRfpWsUtil.findSupplierLineItemBySupplierHeaderId(Integer.parseInt(supplierHeaderId));
                System.out.println("supplierLineItemList size: " + supplierLineItemList.size());

                JSONArray supplierLineItemJsonArray = new JSONArray(supplierLineItemList);
                jObj.put("SupplierLineItemJsonArray", supplierLineItemJsonArray);

                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("findWorkOrderLineItemByRfqId")) {
            try {
                System.out.println("findWorkOrderLineItemByRfqId");
                out = response.getWriter();
                String rfqId = request.getParameter("rfqId");
                System.out.println("rfqId: " + rfqId);

                List<WorkOrderRfqLineItem> rfqLineItemList = rfqRfpWsUtil.findWorkOrderLineItemByRfqId(Integer.parseInt(rfqId));
                System.out.println("rfqLineItemList size: " + rfqLineItemList.size());

                JSONArray rfqLineItemListJsonArray = new JSONArray(rfqLineItemList);
                jObj.put("RfqLineItemJsonArray", rfqLineItemListJsonArray);

                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("findSupplierHeaderByRfqId")) {
            try {
                System.out.println("findSupplierHeaderByRfqId");
                out = response.getWriter();
                String rfqId = request.getParameter("rfqId");
                System.out.println("rfqId: " + rfqId);

                List<SupplierHeader> supplierHeaderList = rfqRfpWsUtil.findSupplierHeaderByRfqIdInAndStatusIn(rfqId);
                System.out.println("supplierHeaderList size: " + supplierHeaderList.size());

                JSONArray supplierHeaderJsonArray = new JSONArray(supplierHeaderList);
                jObj.put("SupplierHeaderJsonArray", supplierHeaderJsonArray);

                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("findSupplierLineItemBySupplierHeaderIdAndInsertionOrderId")) {
            try {
                System.out.println("findSupplierLineItemBySupplierHeaderIdAndInsertionOrderId");
                out = response.getWriter();
                String supplierHeaderId = request.getParameter("supplierHeaderId");
                String insertionOrderId = request.getParameter("insertionOrderId");

                System.out.println("supplierHeaderId: " + supplierHeaderId);
                System.out.println("insertionOrderId: " + insertionOrderId);

                List<SupplierLineitem> supplierLineItemList = rfqRfpWsUtil.findSupplierLineItemBySupplierHeaderIdAndInsertionOrderIdAndStatus(Integer.parseInt(supplierHeaderId), Integer.parseInt(insertionOrderId));
                System.out.println("supplierLineItemList size: " + supplierLineItemList.size());

                JSONArray SupplierLineItemJsonArray = new JSONArray(supplierLineItemList);
                jObj.put("SupplierLineItemJsonArray", SupplierLineItemJsonArray);

                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("findSupplierHeaderByVendorIdAndRfqId")) {
            try {
                System.out.println("findSupplierHeaderByVendorIdAndRfqId");
                out = response.getWriter();
                String rfqId = request.getParameter("rfqId");
                String vendorId = request.getParameter("vendorId");

                System.out.println("rfqId: " + rfqId);
                System.out.println("vendorId: " + vendorId);

                List<SupplierHeader> supplierHeaderList = rfqRfpWsUtil.getSupplierHeaderByVendoridAndRfqIdAndStatus(Integer.parseInt(vendorId), Integer.parseInt(rfqId));
                System.out.println("supplierHeaderList size: " + supplierHeaderList.size());

                JSONArray supplierHeaderJsonArray = new JSONArray(supplierHeaderList);
                jObj.put("SupplierHeaderJsonArray", supplierHeaderJsonArray);

                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("findSupplierHeaderById")) {
            try {
                System.out.println("findSupplierHeaderById");
                out = response.getWriter();
                String supplierHeaderId = request.getParameter("supplierHeaderId");
                System.out.println("supplierHeaderId: " + supplierHeaderId);
                SupplierHeader supplierHeaderObj = rfqRfpWsUtil.getSupplierHeaderById(Integer.parseInt(supplierHeaderId));
                JSONObject supplierHeaderJsonObj = new JSONObject(supplierHeaderObj);
                out.println(supplierHeaderJsonObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("findSupplierHeaderRatedParamterByRfqId")) {
            try {
                System.out.println("findSupplierHeaderRatedParamterByRfqId");
                out = response.getWriter();
                String rfqId = request.getParameter("rfqId");
                System.out.println("rfqId: " + rfqId);

                List<SupplierHeaderRatedParameterMapping> ratedParameterMappingList = rfqRfpWsUtil.findSupplierHeaderRatedParameterMappingByRfqId(Integer.parseInt(rfqId));
                System.out.println("ratedParameterMappingList size: " + ratedParameterMappingList.size());

                JSONArray ratedParameterMappingJsonArray = new JSONArray(ratedParameterMappingList);

                out.println(ratedParameterMappingJsonArray);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("UpdateBuyerBaselinePrice")) {
            try {
                System.out.println("UpdateBuyerBaselinePrice");
                out = response.getWriter();

                String supplierLineItemId = request.getParameter("supplierLineItemId");
                String buyerBaselinePrice = request.getParameter("buyerBaselinePrice");

                System.out.println("supplierLineItemId: " + supplierLineItemId);
                System.out.println("buyerBaselinePrice: " + buyerBaselinePrice);

                SupplierLineitem supplierLineItemObj = rfqRfpWsUtil.findSupplierLineItemBySupplierLineId(Integer.parseInt(supplierLineItemId));
                supplierLineItemObj.setBuyerBaselinePrice(buyerBaselinePrice);

                rfqRfpWsUtil.updateSupplierLineitem(supplierLineItemObj);
                jObj.put("Result", "Success");

                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("UpdateBuyerFinalFinancialPrice")) {
            try {
                System.out.println("UpdateBuyerFinalFinancialPrice");
                out = response.getWriter();

                String supplierLineItemId = request.getParameter("supplierLineItemId");
                String buyerFinalFinancialPrice = request.getParameter("buyerFinalFinancialPrice");

                System.out.println("supplierLineItemId: " + supplierLineItemId);
                System.out.println("buyerFinalFinancialPrice: " + buyerFinalFinancialPrice);

                SupplierLineitem supplierLineItemObj = rfqRfpWsUtil.findSupplierLineItemBySupplierLineId(Integer.parseInt(supplierLineItemId));
                supplierLineItemObj.setBuyerFinalFinancialPrice(buyerFinalFinancialPrice);

                rfqRfpWsUtil.updateSupplierLineitem(supplierLineItemObj);
                jObj.put("Result", "Success");

                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("UpdateBuyerNoteToApprover")) {
            try {
                System.out.println("UpdateBuyerNoteToApprover");
                out = response.getWriter();

                String noteToApprover = request.getParameter("noteToApprover");
                String rfqLineId = request.getParameter("rfqLineId");

                System.out.println("noteToApprover: " + noteToApprover);
                System.out.println("rfqLineId: " + rfqLineId);

                WorkOrderRfqLineItem woLineItemObj = rfqRfpWsUtil.findWorkOrderLineItemByRfqLineId(Integer.parseInt(rfqLineId));
                woLineItemObj.setNoteToApprover(noteToApprover);
                rfqRfpWsUtil.updateWorkOrderRfqLineItem(woLineItemObj);

                jObj.put("Result", "Success");

                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("UpdateBuyerComments")) {
            try {
                System.out.println("UpdateBuyerComments");
                out = response.getWriter();

                String comments = request.getParameter("comments");
                String rfqLineId = request.getParameter("rfqLineId");

                System.out.println("comments: " + comments);
                System.out.println("rfqLineId: " + rfqLineId);

                WorkOrderRfqLineItem woLineItemObj = rfqRfpWsUtil.findWorkOrderLineItemByRfqLineId(Integer.parseInt(rfqLineId));
                woLineItemObj.setComments(comments);
                rfqRfpWsUtil.updateWorkOrderRfqLineItem(woLineItemObj);

                jObj.put("Result", "Success");

                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("UpdateBuyerWhyThisVendor")) {
            try {
                System.out.println("UpdateBuyerWhyThisVendor");
                out = response.getWriter();

                String whyThisVendor = request.getParameter("whyThisVendor");
                String rfqLineId = request.getParameter("rfqLineId");

                System.out.println("whyThisVendor: " + whyThisVendor);
                System.out.println("rfqLineId: " + rfqLineId);

                WorkOrderRfqLineItem woLineItemObj = rfqRfpWsUtil.findWorkOrderLineItemByRfqLineId(Integer.parseInt(rfqLineId));
                woLineItemObj.setWhyThisVendor(whyThisVendor);
                rfqRfpWsUtil.updateWorkOrderRfqLineItem(woLineItemObj);

                jObj.put("Result", "Success");

                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("UpdateAwardedVendor")) {
            try {
                System.out.println("UpdateAwardedVendor");
                out = response.getWriter();

                String selectedAwardedVendorId = request.getParameter("selectedAwardedVendorId");
                String rfqLineId = request.getParameter("rfqLineId");

                System.out.println("selectedAwardedVendorId: " + selectedAwardedVendorId);
                System.out.println("rfqLineId: " + rfqLineId);

                VendorDetails vendor = rfqRfpWsUtil.findVendorById(Integer.parseInt(selectedAwardedVendorId));

                WorkOrderRfqLineItem woLineItemObj = rfqRfpWsUtil.findWorkOrderLineItemByRfqLineId(Integer.parseInt(rfqLineId));
                woLineItemObj.setAwardedVendor(vendor);
                rfqRfpWsUtil.updateWorkOrderRfqLineItem(woLineItemObj);

                jObj.put("Result", "Success");

                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("FindLastFYAveragePriceByMatCodeOrMatGroup")) {
            try {
                System.out.println("FindLastFYAveragePriceByMatCodeOrMatGroup");
                out = response.getWriter();

                String by = request.getParameter("by");
                String data = request.getParameter("data");

                System.out.println("by: " + by);
                System.out.println("data: " + data);

                Double lastFyAvgPrice = rfqRfpWsUtil.findLastFYAveragePriceByMatCodeOrMatGroup(by, data);
                System.out.println("lastFyAvgPrice: " + lastFyAvgPrice);

                jObj.put("LastFyAvgPrice", lastFyAvgPrice);
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("UploadRfqQuotationAndRfqEvaluationIntoDMS")) {
            try (ByteArrayOutputStream rfqEvalByteArrayOutputStream = new ByteArrayOutputStream();
                    ByteArrayOutputStream rfqQuotByteArrayOutputStream = new ByteArrayOutputStream()) {
                out = response.getWriter();
                System.out.println("UploadRfqQuotationAndRfqEvaluationIntoDMS");
                String rfqIds = request.getParameter("rfqIds");
                System.out.println("rfqIds: " + rfqIds);

                String pid = request.getParameter("pid");
                System.out.println("pid: " + pid);

                byte[] rfqEvalFileBytes;
                byte[] rfqQuotFileBytes;

                // Generate Rfq Evaluation Report
                Document document = new Document();
                PdfWriter writer = PdfWriter.getInstance(document, rfqEvalByteArrayOutputStream);
                writer.setPageEvent(new OrderEvaluationFooter());
                document.open();
                generator.makeRfqEvalVenoroCompReport(document, rfqIds);
                document.close();
                rfqEvalFileBytes = rfqEvalByteArrayOutputStream.toByteArray();
                System.out.println("rfqEvalFileBytes len: " + rfqEvalFileBytes.length);

                // Generate Rfq Quotation Report
                List<WorkOrderRfqHeader> rfqHeaderList = rfqRfpWsUtil.findRfqHeaderByRfqIdIn(rfqIds);
                List<WorkOrderRfqLineItem> rfqLineItemList = rfqRfpWsUtil.findWorkOrderRfqLineItemByRfqIdIn(rfqIds);
                List<SupplierHeader> supplierHeaderList = rfqRfpWsUtil.findSupplierHeaderByRfqIdInAndStatusIn(rfqIds);

                Workbook workbook = new HSSFWorkbook();
                workbook = generator.createRfqEvalCompExcelReport(workbook, rfqHeaderList, rfqLineItemList, supplierHeaderList);
                workbook.write(rfqQuotByteArrayOutputStream);
                rfqQuotFileBytes = rfqQuotByteArrayOutputStream.toByteArray();
                System.out.println("rfqQuotFileBytes len: " + rfqQuotFileBytes.length);

                rfqQuotationRfqEvaluationInputBean.setPid(pid);
                rfqQuotationRfqEvaluationInputBean.setAttachmentName("Summary of Quotation.xls");
                rfqQuotationRfqEvaluationInputBean.setAttachment(rfqQuotFileBytes);
                rfqQuotationRfqEvaluationInputBean.setAttachment1Name("Vendor Selection Criteria.pdf");
                rfqQuotationRfqEvaluationInputBean.setAttachment1(rfqEvalFileBytes);

                try {
                    RfqQuotationRfqEvaluationOutputBean output = rfqRfpWsUtil.uploadRfqQuotationAndRfqEvaluationIntoDMS(rfqQuotationRfqEvaluationInputBean);
                    System.out.println("Message 2: " + output.getMessage());
                    String message = output.getMessage();
                    jObj.put("Result", "Success");
                    jObj.put("Message", message);
                } catch (Exception e) {
                    System.out.println("Exception : " + e);
                    jObj.put("Result", "Failed");
                    jObj.put("Message", "Failed to upload into DMS!");
                }

                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            } catch (DocumentException ex) {
                Logger.getLogger(RfqEvaluationController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("findAssignedPrCount")) {
            try {
                System.out.println("findAssignedPrCount");
                out = response.getWriter();

                Authentication auth = SecurityContextHolder.getContext().getAuthentication();
                BuyerDetails buyer = (BuyerDetails) auth.getPrincipal();
                
                List<BuyerTeamleadMapping> btMappingList = purchaseRequestWSUtil.findBuyerMappingByTeamlead(buyer.getId());
                System.out.println("btMappingList size: " + btMappingList.size());

                List<Integer> prCountList = new ArrayList<>();
                for (BuyerTeamleadMapping obj : btMappingList) {
                    List<NewgenPRLineItem> objList = purchaseRequestWSUtil.findPrLineByBuyerIdAndStatus(obj.getNgBpBuyerdetailsId().getId(), "Assigned");
                    prCountList.add(objList.size());
                }
                System.out.println("prCountList: " + prCountList);
                System.out.println("prCountList size: " + prCountList.size());
                 
                List<BuyerDetails> buyerList = btMappingList.stream().map(mapping -> mapping.getNgBpBuyerdetailsId()).collect(Collectors.toList());
                System.out.println("buyerList size: " + buyerList.size());
                
                JSONArray buyerJsonArr = new JSONArray(buyerList);
                JSONArray buyerPrCountJsonArr = new JSONArray(prCountList);
                
                jObj.put("buyerJsonArr", buyerJsonArr);
                jObj.put("buyerPrCountJsonArr", buyerPrCountJsonArr);
                
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }

    @RequestMapping(value = "/rfqEvaluationPostAjaxRequest", method = RequestMethod.POST)
    public void doPostService(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
        PrintWriter out;
        JSONArray jArra = new JSONArray();
        JSONObject jObj = new JSONObject();

        System.out.println("========RfqEvaluation Post Ajax Request==========");
        String reqFrom = request.getParameter("reqFrom");
        System.out.println("reqFrom: " + reqFrom);

        if (reqFrom.equalsIgnoreCase("UpdateRfqPoDetails")) {
            try {
                System.out.println("UpdateRfqPoDetails");
                out = response.getWriter();

                String companyCode = request.getParameter("companyCode");
                String prType = request.getParameter("prType");
                System.out.println("companyCode: " + companyCode);
                System.out.println("prType: " + prType);

                String PoNumber = request.getParameter("PoNumber");
                System.out.println("PoNumber: " + PoNumber);

                String poLineQuantityString = request.getParameter("poLineQuantityString");
                System.out.println("poLineQuantityString: " + poLineQuantityString);

                String VendorFinalizationTableDataArrayAsJsonString = request.getParameter("VendorFinalizationTableDataArrayAsJsonString");
                System.out.println("VendorFinalizationTableDataArrayAsJsonString: " + VendorFinalizationTableDataArrayAsJsonString);

                JSONArray VendorFinalizationTableDataArrayAsJsonArray = new JSONArray(VendorFinalizationTableDataArrayAsJsonString);
                System.out.println("VendorFinalizationTableDataArrayAsJsonArray: " + VendorFinalizationTableDataArrayAsJsonArray.length());

                String[] qtyArr = poLineQuantityString.split(",");
                System.out.println("qtyArr len: " + qtyArr.length);

                Date today = new Date();
                for (int i = 0; i < VendorFinalizationTableDataArrayAsJsonArray.length(); i++) {
                    JSONObject VendorFinalizationTableRowAsJsonObject = VendorFinalizationTableDataArrayAsJsonArray.getJSONObject(i);

                    int rfqId = VendorFinalizationTableRowAsJsonObject.getInt("rfqId");
                    int rfqLineId = VendorFinalizationTableRowAsJsonObject.getInt("rfqLineId");
                    int vendorId = VendorFinalizationTableRowAsJsonObject.getInt("vendorId");
                    int insertionOrderId = VendorFinalizationTableRowAsJsonObject.getInt("insertionOrderId");
                    String quantity = VendorFinalizationTableRowAsJsonObject.getString("quantity");
                    String noteToApprover = VendorFinalizationTableRowAsJsonObject.getString("noteToApprover");
                    String comments = VendorFinalizationTableRowAsJsonObject.getString("comments");
                    String whyThisVendor = VendorFinalizationTableRowAsJsonObject.getString("whyThisVendor");

                    System.out.println("rfqId: " + rfqId);
                    System.out.println("rfqLineId: " + rfqLineId);
                    System.out.println("vendorId: " + vendorId);
                    System.out.println("insertionOrderId: " + insertionOrderId);
                    System.out.println("quantity: " + quantity);
                    System.out.println("qtyArr[]: " + qtyArr[i]);
                    System.out.println("noteToApprover: " + noteToApprover);
                    System.out.println("comments: " + comments);
                    System.out.println("whyThisVendor: " + whyThisVendor);

                    VendorDetails vendorObj = rfqRfpWsUtil.findVendorById(vendorId);
                    WorkOrderRfqLineItem woLineItemObj = rfqRfpWsUtil.findWorkOrderLineItemByRfqLineId(rfqLineId);

                    rfqPoDetailsEntity.setCreationDate(today);
                    rfqPoDetailsEntity.setNgBpVendordetailsIdRef(vendorObj);
                    rfqPoDetailsEntity.setNgBpWorkOrderRfqLineItemRef(woLineItemObj);
                    rfqPoDetailsEntity.setQuantity(quantity);
                    rfqPoDetailsEntity.setNoteToApprover(noteToApprover);
                    rfqPoDetailsEntity.setComments(comments);
                    rfqPoDetailsEntity.setWhyThisVendor(whyThisVendor);
                    rfqPoDetailsEntity.setPoNumber(PoNumber);

                    rfqRfpWsUtil.saveRfqPoDetails(rfqPoDetailsEntity);

                    // Update Quantity in WorkOrderRfqLineItem Table For PO
                    String qtyToReduced = qtyArr[i];
                    if (prType != null && prType.equals("Material")) {
                        String matCode = woLineItemObj.getNgBpNewgenPRLineItemId().getMaterialCode();
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
                                    qtyToReduced = tempRemQty + "";
                                }
                            }
                        }
                    }
                    double remainingQty;
                    String remainingQuantityForPo = woLineItemObj.getRemainingQuantity();
                    if (remainingQuantityForPo == null) {
                        remainingQty = Double.parseDouble(woLineItemObj.getQuantity() + "") - Double.parseDouble(qtyToReduced);
                    } else {
                        remainingQty = Double.parseDouble(woLineItemObj.getRemainingQuantity()) - Double.parseDouble(qtyToReduced);
                    }
                    woLineItemObj.setRemainingQuantity(remainingQty + "");
                    woLineItemObj.setPoVendor(vendorObj);
                    woLineItemObj.setPoStatus("PO Created");
                    rfqRfpWsUtil.updateWorkOrderRfqLineItem(woLineItemObj);

                    // Update RFQ status
                    WorkOrderRfqHeader rfqHeaderObj = rfqRfpWsUtil.findRfqHeaderById(rfqId);
                    if (rfqHeaderObj.getRfqstatus() != null && rfqHeaderObj.getRfqstatus().equals("Bid Submitted")) {
                        rfqHeaderObj.setRfqstatus("Closed");
                        rfqHeaderObj.setIsPoCreated("Yes");
                        rfqRfpWsUtil.updateRfqHeader(rfqHeaderObj);
                    }
                }

                jObj.put("Result", "Success");
                out.println(jObj);

            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (reqFrom.equalsIgnoreCase("UpdateRfqLineRemainingQtyAfterSaveDraft")) {
            try {
                System.out.println("UpdateRfqLineRemainingQtyAfterSaveDraft");
                out = response.getWriter();

                String VendorFinalizationTableDataArrayAsJsonString = request.getParameter("VendorFinalizationTableDataArrayAsJsonString");
                System.out.println("VendorFinalizationTableDataArrayAsJsonString: " + VendorFinalizationTableDataArrayAsJsonString);

                JSONArray VendorFinalizationTableDataArrayAsJsonArray = new JSONArray(VendorFinalizationTableDataArrayAsJsonString);
                System.out.println("VendorFinalizationTableDataArrayAsJsonArray: " + VendorFinalizationTableDataArrayAsJsonArray.length());

                for (int i = 0; i < VendorFinalizationTableDataArrayAsJsonArray.length(); i++) {
                    JSONObject VendorFinalizationTableRowAsJsonObject = VendorFinalizationTableDataArrayAsJsonArray.getJSONObject(i);

                    int rfqId = VendorFinalizationTableRowAsJsonObject.getInt("rfqId");
                    int rfqLineId = VendorFinalizationTableRowAsJsonObject.getInt("rfqLineId");
                    int vendorId = VendorFinalizationTableRowAsJsonObject.getInt("vendorId");
                    int insertionOrderId = VendorFinalizationTableRowAsJsonObject.getInt("insertionOrderId");
                    String quantity = VendorFinalizationTableRowAsJsonObject.getString("quantity");
                    String noteToApprover = VendorFinalizationTableRowAsJsonObject.getString("noteToApprover");
                    String comments = VendorFinalizationTableRowAsJsonObject.getString("comments");
                    String whyThisVendor = VendorFinalizationTableRowAsJsonObject.getString("whyThisVendor");

                    System.out.println("rfqId: " + rfqId);
                    System.out.println("rfqLineId: " + rfqLineId);
                    System.out.println("vendorId: " + vendorId);
                    System.out.println("insertionOrderId: " + insertionOrderId);
                    System.out.println("quantity: " + quantity);
                    System.out.println("noteToApprover: " + noteToApprover);
                    System.out.println("comments: " + comments);
                    System.out.println("whyThisVendor: " + whyThisVendor);

                    WorkOrderRfqLineItem woLineItemObj = rfqRfpWsUtil.findWorkOrderLineItemByRfqLineId(rfqLineId);

                    // Update Quantity in WorkOrderRfqLineItem Table For PO
                    double remainingQty;
                    String remainingQuantityForPo = woLineItemObj.getRemainingQuantity();
                    if (remainingQuantityForPo == null) {
                        remainingQty = Double.parseDouble(woLineItemObj.getQuantity() + "") - Double.parseDouble(quantity);
                    } else {
                        remainingQty = Double.parseDouble(woLineItemObj.getRemainingQuantity()) - Double.parseDouble(quantity);
                    }
                    woLineItemObj.setRemainingQuantity(remainingQty + "");
                    rfqRfpWsUtil.updateWorkOrderRfqLineItem(woLineItemObj);
                }
                jObj.put("Result", "Success");
                out.println(jObj);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }
}
