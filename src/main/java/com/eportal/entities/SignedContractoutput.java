/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.entities;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Sunny Kumar
 */
@XmlRootElement(name = "Output")
public class SignedContractoutput {
    
    private String message;
    
     public String getMessage() {
        return message;
    }
    @XmlElement(name = "Message")
    public void setMessage(String message) {
        this.message = message;
    }
}
