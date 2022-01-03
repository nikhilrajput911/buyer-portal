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
public class SupportingDocInput {

    private String linkID;
    private String pID;
    private String workstep;
    private String requestorID;
    private String materialCode;
    private String shortText;
    private String quantity;
    private String rfqNo;
    private String vendorID;

    private byte[] attachment1;
    private byte[] attachment2;
    private byte[] attachment3;
    private byte[] attachment4;
    private byte[] attachment5;

    private String attachment1name;
    private String attachment2name;
    private String attachment3name;
    private String attachment4name;
    private String attachment5name;

    public String getRfqNo() {
        return rfqNo;
    }

    @XmlElement(name = "RFQno")
    public void setRfqNo(String rfqNo) {
        this.rfqNo = rfqNo;
    }

    public String getLinkID() {
        return linkID;
    }

    @XmlElement(name = "LinkID")
    public void setLinkID(String linkID) {
        this.linkID = linkID;
    }

    public String getPID() {
        return pID;
    }

    @XmlElement(name = "PID")
    public void setPID(String pID) {
        this.pID = pID;
    }

    public String getWorkstep() {
        return workstep;
    }

    @XmlElement(name = "Workstep")
    public void setWorkstep(String workstep) {
        this.workstep = workstep;
    }

    public String getRequestorID() {
        return requestorID;
    }

    @XmlElement(name = "RequestorID")
    public void setRequestorID(String requestorID) {
        this.requestorID = requestorID;
    }

    public String getMaterialCode() {
        return materialCode;
    }

    @XmlElement(name = "MaterialCode")
    public void setMaterialCode(String materialCode) {
        this.materialCode = materialCode;
    }

    public String getShortText() {
        return shortText;
    }

    @XmlElement(name = "ShortText")
    public void setShortText(String shortText) {
        this.shortText = shortText;
    }

    public String getQuantity() {
        return quantity;
    }

    @XmlElement(name = "Quantity")
    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    @XmlElement(name = "VendorID")
    public String getVendorID() {
        return vendorID;
    }
    public void setVendorID(String vendorID) {
        this.vendorID = vendorID;
    }

    public byte[] getAttachment1() {
        return attachment1;
    }

    @XmlElement(name = "Attachment1")
    public void setAttachment1(byte[] attachment1) {
        this.attachment1 = attachment1;
    }

    public byte[] getAttachment2() {
        return attachment2;
    }

    @XmlElement(name = "Attachment2")
    public void setAttachment2(byte[] attachment2) {
        this.attachment2 = attachment2;
    }

    public byte[] getAttachment3() {
        return attachment3;
    }

    @XmlElement(name = "Attachment3")
    public void setAttachment3(byte[] attachment3) {
        this.attachment3 = attachment3;
    }

    public byte[] getAttachment4() {
        return attachment4;
    }

    @XmlElement(name = "Attachment4")
    public void setAttachment4(byte[] attachment4) {
        this.attachment4 = attachment4;
    }

    public byte[] getAttachment5() {
        return attachment5;
    }

    @XmlElement(name = "Attachment5")
    public void setAttachment5(byte[] attachment5) {
        this.attachment5 = attachment5;
    }

    public String getAttachment1name() {
        return attachment1name;
    }

    @XmlElement(name = "Attachment1name")
    public void setAttachment1name(String attachment1name) {
        this.attachment1name = attachment1name;
    }

    public String getAttachment2name() {
        return attachment2name;
    }

    @XmlElement(name = "Attachment2name")
    public void setAttachment2name(String attachment2name) {
        this.attachment2name = attachment2name;
    }

    public String getAttachment3name() {
        return attachment3name;
    }

    @XmlElement(name = "Attachment3name")
    public void setAttachment3name(String attachment3name) {
        this.attachment3name = attachment3name;
    }

    public String getAttachment4name() {
        return attachment4name;
    }

    @XmlElement(name = "Attachment4name")
    public void setAttachment4name(String attachment4name) {
        this.attachment4name = attachment4name;
    }

    public String getAttachment5name() {
        return attachment5name;
    }

    @XmlElement(name = "Attachment5name")
    public void setAttachment5name(String attachment5name) {
        this.attachment5name = attachment5name;
    }

}
