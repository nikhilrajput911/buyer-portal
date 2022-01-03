/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.newgenControl;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author allwin.prasanth
 */
@XmlRootElement(name ="Output")
@XmlAccessorType(XmlAccessType.FIELD)
public class Output_Resp {
    
    @XmlElement
    private String MainCode,ProcessInstanceID,Message;

    public String getMainCode() {
        return MainCode;
    }
    
    public void setMainCode(String MainCode) {
        this.MainCode = MainCode;
    }

    public String getProcessInstanceID() {
        return ProcessInstanceID;
    }

    
    public void setProcessInstanceID(String ProcessInstanceID) {
        this.ProcessInstanceID = ProcessInstanceID;
    }

    public String getMessage() {
        return Message;
    }

    
    public void setMessage(String Message) {
        this.Message = Message;
    }

}
