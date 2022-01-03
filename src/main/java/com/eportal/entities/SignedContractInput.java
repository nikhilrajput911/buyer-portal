/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.entities;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;


@XmlRootElement(name = "SignedContractDocInput")
public class SignedContractInput {
    
    private String pID;
    private String contractNumber;
    private String buyerName;
    private String buyerID;
    private String docType;
    private String signedContractattachmentname1;
    private byte[] signedContractattachment1;
    
        private String signedContractattachmentname2;
    private byte[] signedContractattachment2;
    
        private String signedContractattachmentname3;
    private byte[] signedContractattachment3;
    
        private String signedContractattachmentname4;
    private byte[] signedContractattachment4;
    
        private String signedContractattachmentname5;
    private byte[] signedContractattachment5;
    
        private String signedContractattachmentname6;
    private byte[] signedContractattachment6;
    
    
    private String ContractSpendAttachmentName;
    private byte[] ContractSpendAttachment;

    public String getContractSpendAttachmentName() {
        return ContractSpendAttachmentName;
    }
 @XmlElement(name = "ContractSpendAttachmentName")
    public void setContractSpendAttachmentName(String ContractSpendAttachmentName) {
        this.ContractSpendAttachmentName = ContractSpendAttachmentName;
    }

    public byte[] getContractSpendAttachment() {
        return ContractSpendAttachment;
    }
 @XmlElement(name = "ContractSpendAttachment")
    public void setContractSpendAttachment(byte[] ContractSpendAttachment) {
        this.ContractSpendAttachment = ContractSpendAttachment;
    }



    public String getPID() {
        return pID;
    }
    @XmlElement(name = "PID")
    public void setPID(String pID) {
        this.pID = pID;
    }
    
    public String getContractNumber() {
        return contractNumber;
    }
    @XmlElement(name = "ContractNumber")
    public void setContractNumber(String contractNumber) {
        this.contractNumber = contractNumber;
    }

    public String getSignedContractattachmentname1() {
        return signedContractattachmentname1;
    }
    
    @XmlElement(name = "signedContractattachmentname1")
    public void setSignedContractattachmentname1(String signedContractattachmentname1) {
        this.signedContractattachmentname1 = signedContractattachmentname1;
    }

    public byte[] getSignedContractattachment1() {
        return signedContractattachment1;
    }
@XmlElement(name = "signedContractattachment1")
    public void setSignedContractattachment1(byte[] signedContractattachment1) {
        this.signedContractattachment1 = signedContractattachment1;
    }

    public String getSignedContractattachmentname2() {
        return signedContractattachmentname2;
    }
@XmlElement(name = "signedContractattachmentname2")
    public void setSignedContractattachmentname2(String signedContractattachmentname2) {
        this.signedContractattachmentname2 = signedContractattachmentname2;
    }

    public byte[] getSignedContractattachment2() {
        return signedContractattachment2;
    }
@XmlElement(name = "signedContractattachment2")
    public void setSignedContractattachment2(byte[] signedContractattachment2) {
        this.signedContractattachment2 = signedContractattachment2;
    }

    public String getSignedContractattachmentname3() {
        return signedContractattachmentname3;
    }
@XmlElement(name = "signedContractattachmentname3")
    public void setSignedContractattachmentname3(String signedContractattachmentname3) {
        this.signedContractattachmentname3 = signedContractattachmentname3;
    }

    public byte[] getSignedContractattachment3() {
        return signedContractattachment3;
    }
@XmlElement(name = "signedContractattachment3")
    public void setSignedContractattachment3(byte[] signedContractattachment3) {
        this.signedContractattachment3 = signedContractattachment3;
    }

    public String getSignedContractattachmentname4() {
        return signedContractattachmentname4;
    }
@XmlElement(name = "signedContractattachmentname4")
    public void setSignedContractattachmentname4(String signedContractattachmentname4) {
        this.signedContractattachmentname4 = signedContractattachmentname4;
    }

    public byte[] getSignedContractattachment4() {
        return signedContractattachment4;
    }
@XmlElement(name = "signedContractattachment4")
    public void setSignedContractattachment4(byte[] signedContractattachment4) {
        this.signedContractattachment4 = signedContractattachment4;
    }

    public String getSignedContractattachmentname5() {
        return signedContractattachmentname5;
    }
@XmlElement(name = "signedContractattachmentname5")
    public void setSignedContractattachmentname5(String signedContractattachmentname5) {
        this.signedContractattachmentname5 = signedContractattachmentname5;
    }

    public byte[] getSignedContractattachment5() {
        return signedContractattachment5;
    }
@XmlElement(name = "signedContractattachment5")
    public void setSignedContractattachment5(byte[] signedContractattachment5) {
        this.signedContractattachment5 = signedContractattachment5;
    }

    public String getSignedContractattachmentname6() {
        return signedContractattachmentname6;
    }
@XmlElement(name = "signedContractattachmentname6")
    public void setSignedContractattachmentname6(String signedContractattachmentname6) {
        this.signedContractattachmentname6 = signedContractattachmentname6;
    }

    public byte[] getSignedContractattachment6() {
        return signedContractattachment6;
    }
@XmlElement(name = "signedContractattachment6")
    public void setSignedContractattachment6(byte[] signedContractattachment6) {
        this.signedContractattachment6 = signedContractattachment6;
    }

    public String getBuyerName() {
        return buyerName;
    }
    @XmlElement(name = "BuyerName")
    public void setBuyerName(String buyerName) {
        this.buyerName = buyerName;
    }

    public String getBuyerID() {
        return buyerID;
    }
    @XmlElement(name = "BuyerID")
    public void setBuyerID(String buyerID) {
        this.buyerID = buyerID;
    }

    public String getDocType() {
        return docType;
    }
    @XmlElement(name = "DocType")
    public void setDocType(String docType) {
        this.docType = docType;
    }
    
    
 
}
 
 