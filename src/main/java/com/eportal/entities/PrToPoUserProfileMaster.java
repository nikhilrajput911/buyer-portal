/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.entities;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Sunny Kumar
 */
@Entity
@Table(name = "PR2PO_UserProfileMaster")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "PrToPoUserProfileMaster.findAll", query = "SELECT p FROM PrToPoUserProfileMaster p"),
    @NamedQuery(name = "PrToPoUserProfileMaster.findByInsertionOrderID", query = "SELECT p FROM PrToPoUserProfileMaster p WHERE p.insertionOrderID = :insertionOrderID"),
    @NamedQuery(name = "PrToPoUserProfileMaster.findByCompanyCode", query = "SELECT p FROM PrToPoUserProfileMaster p WHERE p.companyCode = :companyCode"),
    @NamedQuery(name = "PrToPoUserProfileMaster.findByUserId", query = "SELECT p FROM PrToPoUserProfileMaster p WHERE p.userId = :userId"),
    @NamedQuery(name = "PrToPoUserProfileMaster.findByEmailAddress", query = "SELECT p FROM PrToPoUserProfileMaster p WHERE p.emailAddress = :emailAddress"),
    @NamedQuery(name = "PrToPoUserProfileMaster.findByTrackingNo", query = "SELECT p FROM PrToPoUserProfileMaster p WHERE p.trackingNo = :trackingNo"),
    @NamedQuery(name = "PrToPoUserProfileMaster.findByPRType", query = "SELECT p FROM PrToPoUserProfileMaster p WHERE p.pRType = :pRType"),
    @NamedQuery(name = "PrToPoUserProfileMaster.findBySubCatCGPR", query = "SELECT p FROM PrToPoUserProfileMaster p WHERE p.subCatCGPR = :subCatCGPR"),
    @NamedQuery(name = "PrToPoUserProfileMaster.findBySubCatCSPR", query = "SELECT p FROM PrToPoUserProfileMaster p WHERE p.subCatCSPR = :subCatCSPR"),
    @NamedQuery(name = "PrToPoUserProfileMaster.findBySubCatGPR", query = "SELECT p FROM PrToPoUserProfileMaster p WHERE p.subCatGPR = :subCatGPR"),
    @NamedQuery(name = "PrToPoUserProfileMaster.findBySubCatSPR", query = "SELECT p FROM PrToPoUserProfileMaster p WHERE p.subCatSPR = :subCatSPR")})
public class PrToPoUserProfileMaster implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "InsertionOrderID")
    private Integer insertionOrderID;
    @Size(max = 100)
    @Column(name = "CompanyCode")
    private String companyCode;
    @Size(max = 25)
    @Column(name = "UserId")
    private String userId;
    @Size(max = 100)
    @Column(name = "EmailAddress")
    private String emailAddress;
    @Size(max = 500)
    @Column(name = "TrackingNo")
    private String trackingNo;
    @Size(max = 500)
    @Column(name = "PRType")
    private String pRType;
    @Size(max = 500)
    @Column(name = "Sub_Cat_CGPR")
    private String subCatCGPR;
    @Size(max = 500)
    @Column(name = "Sub_Cat_CSPR")
    private String subCatCSPR;
    @Size(max = 500)
    @Column(name = "Sub_Cat_GPR")
    private String subCatGPR;
    @Size(max = 500)
    @Column(name = "Sub_Cat_SPR")
    private String subCatSPR;

    public PrToPoUserProfileMaster() {
    }

    public PrToPoUserProfileMaster(Integer insertionOrderID) {
        this.insertionOrderID = insertionOrderID;
    }

    public Integer getInsertionOrderID() {
        return insertionOrderID;
    }

    public void setInsertionOrderID(Integer insertionOrderID) {
        this.insertionOrderID = insertionOrderID;
    }

    public String getCompanyCode() {
        return companyCode;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getTrackingNo() {
        return trackingNo;
    }

    public void setTrackingNo(String trackingNo) {
        this.trackingNo = trackingNo;
    }

    public String getPRType() {
        return pRType;
    }

    public void setPRType(String pRType) {
        this.pRType = pRType;
    }

    public String getSubCatCGPR() {
        return subCatCGPR;
    }

    public void setSubCatCGPR(String subCatCGPR) {
        this.subCatCGPR = subCatCGPR;
    }

    public String getSubCatCSPR() {
        return subCatCSPR;
    }

    public void setSubCatCSPR(String subCatCSPR) {
        this.subCatCSPR = subCatCSPR;
    }

    public String getSubCatGPR() {
        return subCatGPR;
    }

    public void setSubCatGPR(String subCatGPR) {
        this.subCatGPR = subCatGPR;
    }

    public String getSubCatSPR() {
        return subCatSPR;
    }

    public void setSubCatSPR(String subCatSPR) {
        this.subCatSPR = subCatSPR;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (insertionOrderID != null ? insertionOrderID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof PrToPoUserProfileMaster)) {
            return false;
        }
        PrToPoUserProfileMaster other = (PrToPoUserProfileMaster) object;
        if ((this.insertionOrderID == null && other.insertionOrderID != null) || (this.insertionOrderID != null && !this.insertionOrderID.equals(other.insertionOrderID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.PrToPoUserProfileMaster[ insertionOrderID=" + insertionOrderID + " ]";
    }
    
}
