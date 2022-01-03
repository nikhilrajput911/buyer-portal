
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/**
 *
 * @author Sunil
 */
public class AuthenticationFilter extends HandlerInterceptorAdapter {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("request.getRequestURI(): " + request.getRequestURI());
        System.out.println("auth.getPrincipal(): " + auth.getPrincipal());
        if (request.getRequestURI().contains("dashboard.do") || request.getRequestURI().contains("welcome.do") || request.getRequestURI().contains("forgotpass.do") || request.getRequestURI().contains("resetpassword.do") || request.getRequestURI().contains("ajaxcontroller.do") || request.getRequestURI().contains("rest-controller.do")) {
            
        } else if (auth.getPrincipal().equals("anonymousUser")) {
            response.sendRedirect("welcome.do");
            return false;
        } else if (auth.getPrincipal().equals("anonymousUser")) {
            response.sendRedirect("forgotpass.do");
            return false;
        } else if (auth.getPrincipal().equals("anonymousUser")) {
            response.sendRedirect("resetpassword.do");
            return false;
        } else if (auth.getPrincipal().equals("anonymousUser")) {
            response.sendRedirect("ajaxcontroller.do");
            return false;
        } else if (auth.getPrincipal().equals("anonymousUser")) {
            response.sendRedirect("rest-controller.do");
            return false;
        }
        return super.preHandle(request, response, handler); //To change body of generated methods, choose Tools | Templates.
    }

}
