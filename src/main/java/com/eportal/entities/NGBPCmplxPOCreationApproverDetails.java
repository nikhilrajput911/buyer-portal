/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.entities;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author admin
 */
@Entity
@Table(name = "NG_BP_Cmplx_POCreation_ApproverDetails")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NGBPCmplxPOCreationApproverDetails.findAll", query = "SELECT n FROM NGBPCmplxPOCreationApproverDetails n"),
    @NamedQuery(name = "NGBPCmplxPOCreationApproverDetails.findByProcInstId", query = "SELECT n FROM NGBPCmplxPOCreationApproverDetails n WHERE n.procInstId = :procInstId"),
    @NamedQuery(name = "NGBPCmplxPOCreationApproverDetails.findByInsertionOrderID", query = "SELECT n FROM NGBPCmplxPOCreationApproverDetails n WHERE n.insertionOrderID = :insertionOrderID"),
    @NamedQuery(name = "NGBPCmplxPOCreationApproverDetails.findByApproverName", query = "SELECT n FROM NGBPCmplxPOCreationApproverDetails n WHERE n.approverName = :approverName"),
    @NamedQuery(name = "NGBPCmplxPOCreationApproverDetails.findByApproverLevel", query = "SELECT n FROM NGBPCmplxPOCreationApproverDetails n WHERE n.approverLevel = :approverLevel"),
    @NamedQuery(name = "NGBPCmplxPOCreationApproverDetails.findByApproveremail", query = "SELECT n FROM NGBPCmplxPOCreationApproverDetails n WHERE n.approveremail = :approveremail"),
    @NamedQuery(name = "NGBPCmplxPOCreationApproverDetails.findByApproverStatus", query = "SELECT n FROM NGBPCmplxPOCreationApproverDetails n WHERE n.approverStatus = :approverStatus"),
    @NamedQuery(name = "NGBPCmplxPOCreationApproverDetails.findByApprovedDate", query = "SELECT n FROM NGBPCmplxPOCreationApproverDetails n WHERE n.approvedDate = :approvedDate"),
    @NamedQuery(name = "NGBPCmplxPOCreationApproverDetails.findByApprovalRelationCode", query = "SELECT n FROM NGBPCmplxPOCreationApproverDetails n WHERE n.approvalRelationCode = :approvalRelationCode")})
public class NGBPCmplxPOCreationApproverDetails implements Serializable {
    private static final long serialVersionUID = 1L;
    @Size(max = 50)
    @Column(name = "ProcInstId")
    private String procInstId;
    @Id
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "InsertionOrderID")
    private Long insertionOrderID;
    @Size(max = 30)
    @Column(name = "ApproverName")
    private String approverName;
    @Size(max = 30)
    @Column(name = "ApproverLevel")
    private String approverLevel;
    @Size(max = 60)
    @Column(name = "Approveremail")
    private String approveremail;
    @Size(max = 100)
    @Column(name = "ApproverStatus")
    private String approverStatus;
    @Column(name = "ApprovedDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date approvedDate;
    @Size(max = 10)
    @Column(name = "ApprovalRelationCode")
    private String approvalRelationCode;

    public NGBPCmplxPOCreationApproverDetails() {
    }

    public NGBPCmplxPOCreationApproverDetails(Long insertionOrderID) {
        this.insertionOrderID = insertionOrderID;
    }

    public String getProcInstId() {
        return procInstId;
    }

    public void setProcInstId(String procInstId) {
        this.procInstId = procInstId;
    }

    public Long getInsertionOrderID() {
        return insertionOrderID;
    }

    public void setInsertionOrderID(Long insertionOrderID) {
        this.insertionOrderID = insertionOrderID;
    }

    public String getApproverName() {
        return approverName;
    }

    public void setApproverName(String approverName) {
        this.approverName = approverName;
    }

    public String getApproverLevel() {
        return approverLevel;
    }

    public void setApproverLevel(String approverLevel) {
        this.approverLevel = approverLevel;
    }

    public String getApproveremail() {
        return approveremail;
    }

    public void setApproveremail(String approveremail) {
        this.approveremail = approveremail;
    }

    public String getApproverStatus() {
        return approverStatus;
    }

    public void setApproverStatus(String approverStatus) {
        this.approverStatus = approverStatus;
    }

    public Date getApprovedDate() {
        return approvedDate;
    }

    public void setApprovedDate(Date approvedDate) {
        this.approvedDate = approvedDate;
    }

    public String getApprovalRelationCode() {
        return approvalRelationCode;
    }

    public void setApprovalRelationCode(String approvalRelationCode) {
        this.approvalRelationCode = approvalRelationCode;
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
        if (!(object instanceof NGBPCmplxPOCreationApproverDetails)) {
            return false;
        }
        NGBPCmplxPOCreationApproverDetails other = (NGBPCmplxPOCreationApproverDetails) object;
        if ((this.insertionOrderID == null && other.insertionOrderID != null) || (this.insertionOrderID != null && !this.insertionOrderID.equals(other.insertionOrderID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.NGBPCmplxPOCreationApproverDetails[ insertionOrderID=" + insertionOrderID + " ]";
    }
    
}
