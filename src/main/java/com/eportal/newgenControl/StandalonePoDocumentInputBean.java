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
@XmlRootElement(name = "SupportingDocPOInput")
public class StandalonePoDocumentInputBean {
    
    private String pid;
    private String poNumber;
    
    private String attachment1name;
    private String attachment2name;
    private String attachment3name;
    private String attachment4name;
    private String attachment5name;
    
    private byte[] attachment1;
    private byte[] attachment2;
    private byte[] attachment3;
    private byte[] attachment4;
    private byte[] attachment5;

    public String getPid() {
        return pid;
    }

    @XmlElement(name = "PID")
    public void setPid(String pid) {
        this.pid = pid;
    }

    public String getPoNumber() {
        return poNumber;
    }

    @XmlElement(name = "PONumber")
    public void setPoNumber(String poNumber) {
        this.poNumber = poNumber;
    }

    public String getAttachment1name() {
        return attachment1name;
    }

    @XmlElement(name = "supportingDocPOattachmentname")    
    public void setAttachment1name(String attachment1name) {
        this.attachment1name = attachment1name;
    }

    public String getAttachment2name() {
        return attachment2name;
    }

    @XmlElement(name = "supportingDocPOattachmentname1")
    public void setAttachment2name(String attachment2name) {
        this.attachment2name = attachment2name;
    }

    public String getAttachment3name() {
        return attachment3name;
    }

    @XmlElement(name = "supportingDocPOattachmentname2")
    public void setAttachment3name(String attachment3name) {
        this.attachment3name = attachment3name;
    }

    public String getAttachment4name() {
        return attachment4name;
    }

    @XmlElement(name = "supportingDocPOattachmentname3")
    public void setAttachment4name(String attachment4name) {
        this.attachment4name = attachment4name;
    }

    public String getAttachment5name() {
        return attachment5name;
    }

    @XmlElement(name = "supportingDocPOattachmentname4")
    public void setAttachment5name(String attachment5name) {
        this.attachment5name = attachment5name;
    }

    public byte[] getAttachment1() {
        return attachment1;
    }

    @XmlElement(name = "supportingDocPOattachment")
    public void setAttachment1(byte[] attachment1) {
        this.attachment1 = attachment1;
    }

    public byte[] getAttachment2() {
        return attachment2;
    }

    @XmlElement(name = "supportingDocPOattachment1")
    public void setAttachment2(byte[] attachment2) {
        this.attachment2 = attachment2;
    }

    public byte[] getAttachment3() {
        return attachment3;
    }

    @XmlElement(name = "supportingDocPOattachment2")
    public void setAttachment3(byte[] attachment3) {
        this.attachment3 = attachment3;
    }

    public byte[] getAttachment4() {
        return attachment4;
    }

    @XmlElement(name = "supportingDocPOattachment3")
    public void setAttachment4(byte[] attachment4) {
        this.attachment4 = attachment4;
    }

    public byte[] getAttachment5() {
        return attachment5;
    }

    @XmlElement(name = "supportingDocPOattachment4")
    public void setAttachment5(byte[] attachment5) {
        this.attachment5 = attachment5;
    }
    
    
}
