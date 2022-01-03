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
 * @author devinarmatha
 */

@XmlRootElement(name = "InputCriteria")
public class GetDocPRRFQInput {
    
    private String rfqno;
    private String requestorID;
    private byte[] rfqAttachment;
    private String rfqAttachname;
    
     public String getRfqno(){
        return rfqno;
    }

    @XmlElement(name = "RFQno")
    public void setRfqno(String rfqno){
        this.rfqno = rfqno;
    }  
    
    public String getRequestorID()
    {
        return requestorID;
    }
    
    @XmlElement(name = "RequestorID")
    public void setRequestorID(String requestorID)
    {
        this.requestorID=requestorID;
    }
    
    public byte[] getRfqAttachment() {
        return rfqAttachment;
    }
    
    @XmlElement(name = "RFQAttachment")
    public void setRfqAttachment(byte[] rfqAttachment) {
        this.rfqAttachment = rfqAttachment;
    }
    
     public String getRfqAttachname() {
        return rfqAttachname;
    }

    @XmlElement(name = "RFQAttachname")
    public void setRfqAttachname(String rfqAttachname) {
        this.rfqAttachname = rfqAttachname;
    }

}
