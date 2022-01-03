/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.newgenControl;

import java.util.List;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author devinarmatha
 */
@XmlRootElement(name = "OutputCriteria")
public class OutputBean {

    private String message;
    private String maincode;
    private String type;
    private String processInstanceID;
    public String getMessage() {
        return message;
    }

    @XmlElement(name = "message")
    public void setMessage(String message) {
        this.message = message;
    }

    public String getMaincode() {
        return maincode;
    }

    @XmlElement(name = "maincode")
    public void setMaincode(String maincode) {
        this.maincode = maincode;
    }
    
     public String getType() {
        return maincode;
    }

    @XmlElement(name = "type")
    public void setType(String type) {
        this.type = type;
    }
    
    public String getProcessInstanceID() {
        return processInstanceID;
    }

    @XmlElement(name = "ProcessInstanceID")
    public void setProcessInstanceID(String processInstanceID) {
        this.processInstanceID = processInstanceID;
    }

  
}
