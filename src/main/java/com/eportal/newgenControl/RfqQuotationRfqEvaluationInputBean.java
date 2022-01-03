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
@XmlRootElement(name = "RFQDocAddInput")
public class RfqQuotationRfqEvaluationInputBean {
    private String pid;
    
    private String attachmentName;
    private String attachment1Name;
    
    private byte[] attachment;
    private byte[] attachment1;

    public String getPid() {
        return pid;
    }
    
    @XmlElement(name = "Pid")
    public void setPid(String pid) {
        this.pid = pid;
    }

    public String getAttachmentName() {
        return attachmentName;
    }
    
    @XmlElement(name = "Attachname")
    public void setAttachmentName(String attachmentName) {
        this.attachmentName = attachmentName;
    }

    public String getAttachment1Name() {
        return attachment1Name;
    }
    
    @XmlElement(name = "Attachname1")
    public void setAttachment1Name(String attachment1Name) {
        this.attachment1Name = attachment1Name;
    }

    public byte[] getAttachment() {
        return attachment;
    }

    @XmlElement(name = "Attachment")
    public void setAttachment(byte[] attachment) {
        this.attachment = attachment;
    }

    public byte[] getAttachment1() {
        return attachment1;
    }
    
    @XmlElement(name = "Attachment1")
    public void setAttachment1(byte[] attachment1) {
        this.attachment1 = attachment1;
    }
    
}
