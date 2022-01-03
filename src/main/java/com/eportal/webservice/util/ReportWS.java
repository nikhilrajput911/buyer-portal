/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.webservice.util;

import com.eportal.entities.PrToPOCycleTimeReportBean;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

/**
 *
 * @author admin
 */
@Component
public class ReportWS {
    
    @Value("${webservice.ip}") private String webservice_ip;
    
    public List<PrToPOCycleTimeReportBean> callPrToPoCycleTimeStoredProcedure(String FromDate, String ToDate, String BuyerId, String TeamLeadId) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/callPrToPoCycleTimeStoredProcedure.do?FromDate=" + FromDate + "&ToDate=" + ToDate + "&BuyerId=" + BuyerId + "&TeamLeadId=" + TeamLeadId;
        System.out.println("url: " + url);
        ResponseEntity<List<PrToPOCycleTimeReportBean>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<PrToPOCycleTimeReportBean>>() {});
        List<PrToPOCycleTimeReportBean> list = response.getBody();
        return list;
    }
}
