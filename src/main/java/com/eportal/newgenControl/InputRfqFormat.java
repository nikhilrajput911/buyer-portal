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

@XmlRootElement(name = "InputCriteria")
public class InputRfqFormat {
    
    private String pid;
    private String RFQno;
    private String RequestorID;
    private byte[] RFQAttachment;
    private String RFQAttachname;

    public String getRFQno() {
        return RFQno;
    }

    @XmlElement(name = "RFQno")
    public void setRFQno(String RFQno) {
        this.RFQno = RFQno;
    }

    public String getRequestorID() {
        return RequestorID;
    }

    @XmlElement(name = "RequestorID")
    public void setRequestorID(String RequestorID) {
        this.RequestorID = RequestorID;
    }

    public byte[] getRFQAttachment() {
        return RFQAttachment;
    }

    @XmlElement(name = "RFQAttachment")
    public void setRFQAttachment(byte[] RFQAttachment) {
        this.RFQAttachment = RFQAttachment;
    }

    public String getRFQAttachname() {
        return RFQAttachname;
    }

    @XmlElement(name = "RFQAttachname")
    public void setRFQAttachname(String RFQAttachname) {
        this.RFQAttachname = RFQAttachname;
    }        

    public String getPid() {
        return pid;
    }

    @XmlElement(name = "PID")
    public void setPid(String pid) {
        this.pid = pid;
    }
    
    
}
