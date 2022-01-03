/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.controller;

import com.eportal.entities.Invoice;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.DecimalFormat;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.client.RestTemplate;

/**
 *
 * @author admin
 */
@Controller
public class ContractAjaxController {
    
    @Value("${webservice.ip}")
    private String webservice_ip;
    @Value("${NGwebservice.ip}")
    private String NGwebservice_ip;
    
    @RequestMapping(value = "/contractajaxrequest", method = RequestMethod.GET)
    public void doService(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
        PrintWriter out = null;
        JSONArray jArra = new JSONArray();
        JSONObject jObj = new JSONObject();

        DecimalFormat decimalFormat = new DecimalFormat("#,###");

        System.out.println("========Contract Ajax Controller==========");
        String reqFrom = request.getParameter("reqFrom");
        System.out.println("reqFrom: " + reqFrom);
        
        try {
            if (reqFrom.equalsIgnoreCase("FindInvoiceByInsertionOrderIdOfPR")) {
                System.out.println("FindInvoiceByInsertionOrderIdOfPR");
                out = response.getWriter();

                String InsertionOrderId = request.getParameter("lineItemNumber");
                System.out.println("InsertionOrderId: " + InsertionOrderId);
                List<Invoice> invoiceList = getInvoiceByInsertionId(InsertionOrderId);
                JSONObject jsonInvoiceObj = null;
                if (!invoiceList.isEmpty()) {
                    Invoice invoice = invoiceList.get(0);
                    jsonInvoiceObj = new JSONObject(invoice);
                }
                out.println(jsonInvoiceObj);
            }
        } catch (IOException ex) {

            Logger.getLogger(ContractAjaxController.class.getName()).log(Level.SEVERE, null, ex);

        } finally {
            if (out != null) {
                out.close();
            }
        }
    }
    List<Invoice> getInvoiceByInsertionId(String insertionid) {
        System.out.println("getInvoiceByInsertionId");
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/getinvoicebyinsertionid.do?insertionid=" + insertionid;
        System.out.println("url: " + url);
        ResponseEntity<List<Invoice>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<Invoice>>() {});
        List<Invoice> invoice = response.getBody();
        return invoice;
    }
}
