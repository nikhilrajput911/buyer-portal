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
@XmlRootElement(name = "SignedPODocInput")
public class SignedPoInput {
    
    private String pID;
    private String poNumber;
    private String signedPOattachmentname;
    private byte[] signedPOattachment;
    private String supportingDocPOattachmentname;
    private byte[] supportingDocPOattachment;
    private String supportingDocPOattachmentname1;
    private byte[] supportingDocPOattachment1;
    private String supportingDocPOattachmentname2;
    private byte[] supportingDocPOattachment2;
    private String supportingDocPOattachmentname3;
    private byte[] supportingDocPOattachment3;
    private String supportingDocPOattachmentname4;
    private byte[] supportingDocPOattachment4;
    
    public String getPID() {
        return pID;
    }
    @XmlElement(name = "PID")
    public void setPID(String pID) {
        this.pID = pID;
    }
    
    public String getPoNumber() {
        return poNumber;
    }
    @XmlElement(name = "PONumber")
    public void setPoNumber(String poNumber) {
        this.poNumber = poNumber;
    }
    
    public String getSignedPOattachmentname() {
        return signedPOattachmentname;
    }
    @XmlElement(name = "signedPOattachmentname")
    public void setSignedPOattachmentname(String signedPOattachmentname) {
        this.signedPOattachmentname = signedPOattachmentname;
    }
    
    @XmlElement(name = "signedPOattachment")
    public void setSignedPOattachment(byte[] signedPOattachment) {
        this.signedPOattachment = signedPOattachment;
    }

    public byte[] getSignedPOattachment() {
        return signedPOattachment;
    }

    public String getSupportingDocPOattachmentname() {
        return supportingDocPOattachmentname;
    }
    
    @XmlElement(name = "supportingDocPOattachmentname")
    public void setSupportingDocPOattachmentname(String supportingDocPOattachmentname) {
        this.supportingDocPOattachmentname = supportingDocPOattachmentname;
    }

    public byte[] getSupportingDocPOattachment() {
        return supportingDocPOattachment;
    }
    
    @XmlElement(name = "supportingDocPOattachment")
    public void setSupportingDocPOattachment(byte[] supportingDocPOattachment) {
        this.supportingDocPOattachment = supportingDocPOattachment;
    }

    public String getSupportingDocPOattachmentname1() {
        return supportingDocPOattachmentname1;
    }

    @XmlElement(name = "supportingDocPOattachmentname1")
    public void setSupportingDocPOattachmentname1(String supportingDocPOattachmentname1) {
        this.supportingDocPOattachmentname1 = supportingDocPOattachmentname1;
    }

    public byte[] getSupportingDocPOattachment1() {
        return supportingDocPOattachment1;
    }

    @XmlElement(name = "supportingDocPOattachment1")
    public void setSupportingDocPOattachment1(byte[] supportingDocPOattachment1) {
        this.supportingDocPOattachment1 = supportingDocPOattachment1;
    }

    public String getSupportingDocPOattachmentname2() {
        return supportingDocPOattachmentname2;
    }

    @XmlElement(name = "supportingDocPOattachmentname2")
    public void setSupportingDocPOattachmentname2(String supportingDocPOattachmentname2) {
        this.supportingDocPOattachmentname2 = supportingDocPOattachmentname2;
    }

    public byte[] getSupportingDocPOattachment2() {
        return supportingDocPOattachment2;
    }

    @XmlElement(name = "supportingDocPOattachment2")
    public void setSupportingDocPOattachment2(byte[] supportingDocPOattachment2) {
        this.supportingDocPOattachment2 = supportingDocPOattachment2;
    }

    public String getSupportingDocPOattachmentname3() {
        return supportingDocPOattachmentname3;
    }

    @XmlElement(name = "supportingDocPOattachmentname3")
    public void setSupportingDocPOattachmentname3(String supportingDocPOattachmentname3) {
        this.supportingDocPOattachmentname3 = supportingDocPOattachmentname3;
    }

    public byte[] getSupportingDocPOattachment3() {
        return supportingDocPOattachment3;
    }

    @XmlElement(name = "supportingDocPOattachment3")
    public void setSupportingDocPOattachment3(byte[] supportingDocPOattachment3) {
        this.supportingDocPOattachment3 = supportingDocPOattachment3;
    }

    public String getSupportingDocPOattachmentname4() {
        return supportingDocPOattachmentname4;
    }

    @XmlElement(name = "supportingDocPOattachmentname4")
    public void setSupportingDocPOattachmentname4(String supportingDocPOattachmentname4) {
        this.supportingDocPOattachmentname4 = supportingDocPOattachmentname4;
    }

    public byte[] getSupportingDocPOattachment4() {
        return supportingDocPOattachment4;
    }

    @XmlElement(name = "supportingDocPOattachment4")
    public void setSupportingDocPOattachment4(byte[] supportingDocPOattachment4) {
        this.supportingDocPOattachment4 = supportingDocPOattachment4;
    }
    
}
