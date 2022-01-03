/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.controller;

import com.eportal.entities.MasterPurchasingGroup;
import com.eportal.webservice.util.RfqRfpWS;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 *
 * @author admin
 */
@Controller
public class BuyerVendorAjaxController {
    @Autowired
    RfqRfpWS rfqRfpWsUtil;
    
    @RequestMapping(value = "/buyerVendorGetAjaxRequest", method = RequestMethod.GET)
    public void doGetService(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
        PrintWriter out;
        JSONArray jArra = new JSONArray();
        JSONObject jObj = new JSONObject();

        System.out.println("========BuyerVendor Get Ajax Request==========");
        String reqFrom = request.getParameter("reqFrom");
        System.out.println("reqFrom: " + reqFrom);
        
        if (reqFrom.equalsIgnoreCase("findMasterPurchasingGroupByCode")) {
            try {
                System.out.println("findMasterPurchasingGroupByCode");
                out = response.getWriter();
                String purchasingGroupCodeString = request.getParameter("purchasingGroupCodeString");
                System.out.println("purchasingGroupCodeString: " + purchasingGroupCodeString);
                
                List<MasterPurchasingGroup> purchasingGroupCodeList = rfqRfpWsUtil.findMasterPurchasingGroupByPurchasingGroupCodeIn(purchasingGroupCodeString);
                System.out.println("purchasingGroupCodeList size: " + purchasingGroupCodeList.size());
                JSONArray purchasingGroupCodeJsonArr = new JSONArray(purchasingGroupCodeList);
                
                out.println(purchasingGroupCodeJsonArr);
            } catch (IOException ex) {
                Logger.getLogger(POAjaxController.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }
}
