/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.newgenControl;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author admin
 */
@XmlRootElement(name = "Output")
public class RfqQuotationRfqEvaluationOutputBean {
    private String message;
    
     public String getMessage() {
        return message;
    }
    @XmlElement(name = "Message")
    public void setMessage(String message) {
        this.message = message;
    }
}
