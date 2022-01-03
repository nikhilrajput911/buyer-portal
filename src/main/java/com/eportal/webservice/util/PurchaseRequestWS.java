/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.webservice.util;

import com.eportal.entities.BuyerTeamleadMapping;
import com.eportal.entities.NewgenPRLineItem;
import com.eportal.entities.TlPrLineItemsBean;
import java.net.URI;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.client.RestTemplate;

/**
 *
 * @author admin
 */

@Controller
public class PurchaseRequestWS {

    @Value("${webservice.ip}")
    private String webservice_ip;
    
    public NewgenPRLineItem getPrDetailsById(int prid) {
        RestTemplate restTemplate = new RestTemplate();
        System.out.println("prid in getPrDetailsById :" + prid);
        String url = webservice_ip + "/BuyerPortalWebServices/getnewgenprlineitem.do?id=" + prid;
        System.out.println("url: " + url);
        ResponseEntity<NewgenPRLineItem> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<NewgenPRLineItem>() {});
        NewgenPRLineItem prList = response.getBody();
        return prList;
    }
    public String updatePrLineItemNG(NewgenPRLineItem obj) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updateprlineitemng.do";
        System.out.println("url: " + url);
        String result = restTemplate.postForObject(URI.create(url), obj, String.class);
        System.out.println("result: " + result);
        return result;
    }
    
    public List<BuyerTeamleadMapping> findBuyerMappingByTeamlead(int teamleadid) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findbuyermappingbyteamlead.do?id=" + teamleadid;
        System.out.println("url: " + url);
        ResponseEntity<List<BuyerTeamleadMapping>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<BuyerTeamleadMapping>>() {});
        List<BuyerTeamleadMapping> mappingList = response.getBody();
        return mappingList;
    }
    
    public List<TlPrLineItemsBean> callTlPrLineItemsStoredProcedure(String status, String currentWorkstep, String companyCode, String buyerId, String prType, String tlUsername) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/callTlPrLineItemsStoredProcedure.do?status=" + status + "&currentWorkstep=" + currentWorkstep + "&companyCode=" + companyCode + "&buyerId=" + buyerId + "&prType=" + prType + "&tlUsername=" + tlUsername;
        System.out.println("url: " + url);
        ResponseEntity<List<TlPrLineItemsBean>> prResponse = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<TlPrLineItemsBean>>() {});
        List<TlPrLineItemsBean> list = prResponse.getBody();
        return list;
    }
    
    public List<NewgenPRLineItem> findPrLineByBuyerIdAndStatus(int buyerId, String status) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findPrLineByBuyerIdAndStatus.do?buyerId=" + buyerId + "&status=" + status;
        System.out.println("url: " + url);
        ResponseEntity<List<NewgenPRLineItem>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NewgenPRLineItem>>() {});
        List<NewgenPRLineItem> list = response.getBody();
        return list;
    }
    
    public List<NewgenPRLineItem> findPrLineByLinkId(String linkId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findPrLineByLinkId.do?&linkId=" + linkId;
        System.out.println("url: " + url);
        ResponseEntity<List<NewgenPRLineItem>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<NewgenPRLineItem>>() {});
        List<NewgenPRLineItem> list = response.getBody();
        return list;
    }
}
