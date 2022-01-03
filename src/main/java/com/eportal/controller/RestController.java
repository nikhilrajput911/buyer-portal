/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.controller;

import com.eportal.entities.BuyerDetails;
import com.eportal.entities.TlPrLineItemsBean;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.client.RestTemplate;

/**
 *
 * @author admin
 */
@org.springframework.web.bind.annotation.RestController
public class RestController {
    
    @Value("${webservice.ip}")
    private String webservice_ip;
    
    @RequestMapping(value = "/rest-controller", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<TlPrLineItemsBean> findUnassignedPrLineForTeamlead()
    {
        System.out.println("Welcome in rest controller.");
        System.out.println("findUnassignedPrLineForTeamlead===================================");
        BuyerDetails buyer = getLoggedInUser();
        String companyCode = buyer.getCompanyCode();
        List<TlPrLineItemsBean> tlUnassignedPRLineList = callTlPrLineItemsStoredProcedure("Unassigned", "Buyer", companyCode, "", "", "");
        return tlUnassignedPRLineList;
    }
    public BuyerDetails getLoggedInUser()
    {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        BuyerDetails buyer = null;
        if (auth.getPrincipal() instanceof BuyerDetails) {
            buyer = (BuyerDetails) auth.getPrincipal();
        }
        System.out.println("buyer : " + buyer);
        return buyer;
    }
    List<TlPrLineItemsBean> callTlPrLineItemsStoredProcedure(String status, String currentWorkstep, String companyCode, String buyerId, String prType, String tlUsername) {

        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/callTlPrLineItemsStoredProcedure.do?status=" + status + "&currentWorkstep=" + currentWorkstep + "&companyCode=" + companyCode + "&buyerId=" + buyerId + "&prType=" + prType + "&tlUsername=" + tlUsername;
        System.out.println("url: " + url);
        ResponseEntity<List<TlPrLineItemsBean>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<TlPrLineItemsBean>>() {});
        List<TlPrLineItemsBean> list = prResponse.getBody();
        System.out.println("list size: " + list.size());
        return list;
    }
}
