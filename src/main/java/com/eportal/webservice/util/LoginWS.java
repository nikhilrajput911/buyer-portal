/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.webservice.util;

import com.eportal.entities.OnlineUsers;
import java.net.URI;
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
public class LoginWS {
    
    @Value("${webservice.ip}") private String webservice_ip;
    
    public String saveOnlineUsers(OnlineUsers obj) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/saveOnlineUsers.do";
        System.out.println("url: " + url);
        String msg = restTemplate.postForObject(URI.create(url), obj, String.class);
        System.out.println("saveOnlineUsers :" + msg);
        return msg;
    }
    
    public String updateOnlineUsers(OnlineUsers obj) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/updateOnlineUsers.do";
        System.out.println("url: " + url);
        String msg = restTemplate.postForObject(URI.create(url), obj, String.class);
        System.out.println("msg in updateOnlineUsers: " + msg);
        return msg;
    }
    
    public List<OnlineUsers> findOnlineUserByUsername(String username) {
        RestTemplate restTemplate = new RestTemplate();
        String url = webservice_ip + "/BuyerPortalWebServices/findOnlineUserByUsername.do?username=" + username;
        System.out.println("url: " + url);
        ResponseEntity<List<OnlineUsers>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<OnlineUsers>>() {});
        List<OnlineUsers> list = response.getBody();
        return list;
    }
}
