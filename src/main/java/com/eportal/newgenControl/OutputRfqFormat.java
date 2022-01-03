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
 * @author admin
 */
@XmlRootElement(name = "Output")
@XmlAccessorType(XmlAccessType.FIELD)
public class OutputRfqFormat {
    
    @XmlElement
    private String MainCode,ProcessInstanceID,Message,DocIndex,IsIndex;

    public String getMainCode() {
        return MainCode;
    }

    public String getDocIndex() {
        return DocIndex;
    }

    public void setDocIndex(String DocIndex) {
        this.DocIndex = DocIndex;
    }

    public String getIsIndex() {
        return IsIndex;
    }

    public void setIsIndex(String IsIndex) {
        this.IsIndex = IsIndex;
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
