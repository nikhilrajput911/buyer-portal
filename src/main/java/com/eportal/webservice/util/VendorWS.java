/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.webservice.util;

import com.eportal.entities.MasterVendor;
import com.eportal.entities.VendorDetails;
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
public class VendorWS {
    
    @Value("${webservice.ip}") private String webservice_ip;
    
    public List<MasterVendor> getVendorsFromVendorMasterByPagination(
            String recordCount, 
            String vendorCodeOrNameSearchText, 
            String lastVMSno) 
    {
        RestTemplate restTemplate = new RestTemplate();
        
        String url = webservice_ip + "/BuyerPortalWebServices/getVendorsFromVendorMasterByPagination.do?"
                        + "&recordCount=" + recordCount 
                        + "&vendorCodeOrNameSearchText=" + vendorCodeOrNameSearchText 
                        + "&lastVMSno=" + lastVMSno;        
        System.out.println("url: " + url);
        
        ResponseEntity<List<MasterVendor>> response = restTemplate
                                                            .exchange(
                                                                url, 
                                                                HttpMethod.GET, 
                                                                null, 
                                                                new ParameterizedTypeReference<List<MasterVendor>>() {});
        List<MasterVendor> list = response.getBody();
        return list;
    }
    
    public List<VendorDetails> getVendorsAndProspectsFromVendorDetailsByPagination(
            String recordCount, 
            String vendorCodeOrNameSearchText, 
            String lastVMSno) 
    {
        RestTemplate restTemplate = new RestTemplate();
        
        String url = webservice_ip + "/BuyerPortalWebServices/getVendorsAndProspectsFromVendorDetailsByPagination.do?"
                        + "&recordCount=" + recordCount 
                        + "&vendorCodeOrNameSearchText=" + vendorCodeOrNameSearchText 
                        + "&lastVMSno=" + lastVMSno;        
        System.out.println("url: " + url);
        
        ResponseEntity<List<VendorDetails>> response = restTemplate
                                                            .exchange(
                                                                url, 
                                                                HttpMethod.GET, 
                                                                null, 
                                                                new ParameterizedTypeReference<List<VendorDetails>>() {});
        List<VendorDetails> list = response.getBody();
        return list;
    }
    
    public List<MasterVendor> findVendorsFromVendorMasterByCompanyCodeAndPagination(
            String recordCount, 
            String vendorCodeOrNameSearchText, 
            String lastVMSno,
            String companyCode) 
    {
        RestTemplate restTemplate = new RestTemplate();
        
        String url = webservice_ip + "/BuyerPortalWebServices/findVendorsFromVendorMasterByCompanyCodeAndPagination.do?"
                        + "&recordCount=" + recordCount 
                        + "&vendorCodeOrNameSearchText=" + vendorCodeOrNameSearchText 
                        + "&lastVMSno=" + lastVMSno
                        + "&companyCode=" + companyCode;
        System.out.println("url: " + url);
        
        ResponseEntity<List<MasterVendor>> response = restTemplate
                                                            .exchange(
                                                                url, 
                                                                HttpMethod.GET, 
                                                                null, 
                                                                new ParameterizedTypeReference<List<MasterVendor>>() {});
        List<MasterVendor> list = response.getBody();
        return list;
    }
}
