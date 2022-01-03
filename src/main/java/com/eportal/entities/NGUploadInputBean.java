/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.entities;

import java.util.List;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author girivasu-g
 */
@XmlRootElement(name = "InputCriteria")
public class NGUploadInputBean {


    
    private List<NewgenContractLineItem> q_NG_Cmplx_CM_Line_Data;
    private NGExtCM ngExtCM;
    private CMHeaderAgreementInfo cMHeaderAgreementInfo;
    private CMHeaderOLAInfo cMHeaderOLAInfo;
    private CMHeaderTermsDPInfo cMHeaderTermsDPInfo;
    private CMHeaderReferenceInfo cMHeaderReferenceInfo;
    private byte[] VSCAttachment;
    private String VSCAttachname;
    private byte[] SOQAttachment;
    private String SOQAttachname;

    public byte[] getVSCAttachment() {
        return VSCAttachment;
    }

    public void setVSCAttachment(byte[] VSCAttachment) {
        this.VSCAttachment = VSCAttachment;
    }

    public String getVSCAttachname() {
        return VSCAttachname;
    }

    public void setVSCAttachname(String VSCAttachname) {
        this.VSCAttachname = VSCAttachname;
    }

    public byte[] getSOQAttachment() {
        return SOQAttachment;
    }

    public void setSOQAttachment(byte[] SOQAttachment) {
        this.SOQAttachment = SOQAttachment;
    }

    public String getSOQAttachname() {
        return SOQAttachname;
    }

    public void setSOQAttachname(String SOQAttachname) {
        this.SOQAttachname = SOQAttachname;
    }

    public CMHeaderAgreementInfo getcMHeaderAgreementInfo() {
        return cMHeaderAgreementInfo;
    }

    public void setcMHeaderAgreementInfo(CMHeaderAgreementInfo cMHeaderAgreementInfo) {
        this.cMHeaderAgreementInfo = cMHeaderAgreementInfo;
    }

    public CMHeaderOLAInfo getcMHeaderOLAInfo() {
        return cMHeaderOLAInfo;
    }

    public void setcMHeaderOLAInfo(CMHeaderOLAInfo cMHeaderOLAInfo) {
        this.cMHeaderOLAInfo = cMHeaderOLAInfo;
    }

    public CMHeaderTermsDPInfo getcMHeaderTermsDPInfo() {
        return cMHeaderTermsDPInfo;
    }

    public void setcMHeaderTermsDPInfo(CMHeaderTermsDPInfo cMHeaderTermsDPInfo) {
        this.cMHeaderTermsDPInfo = cMHeaderTermsDPInfo;
    }

    public CMHeaderReferenceInfo getcMHeaderReferenceInfo() {
        return cMHeaderReferenceInfo;
    }

    public void setcMHeaderReferenceInfo(CMHeaderReferenceInfo cMHeaderReferenceInfo) {
        this.cMHeaderReferenceInfo = cMHeaderReferenceInfo;
    }
   

    public List<NewgenContractLineItem> getQ_NG_Cmplx_CM_Line_Data() {
        return q_NG_Cmplx_CM_Line_Data;
    }
    @XmlElement(name = "q_NG_Cmplx_CM_Line_Data")
    public void setQ_NG_Cmplx_CM_Line_Data(List<NewgenContractLineItem> q_NG_Cmplx_CM_Line_Data) {
        this.q_NG_Cmplx_CM_Line_Data = q_NG_Cmplx_CM_Line_Data;
    }


    public NGExtCM getNgExtCM() {
        return ngExtCM;
    }
    @XmlElement(name = "ngExtCM")
    public void setNgExtCM(NGExtCM ngExtCM) {
        this.ngExtCM = ngExtCM;
    }


    


}
