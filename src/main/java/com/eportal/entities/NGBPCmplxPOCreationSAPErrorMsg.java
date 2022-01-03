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
@Table(name = "NG_BP_Cmplx_POCreation_SAPErrorMsg")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NGBPCmplxPOCreationSAPErrorMsg.findAll", query = "SELECT n FROM NGBPCmplxPOCreationSAPErrorMsg n"),
    @NamedQuery(name = "NGBPCmplxPOCreationSAPErrorMsg.findByInsertionOrderId", query = "SELECT n FROM NGBPCmplxPOCreationSAPErrorMsg n WHERE n.insertionOrderId = :insertionOrderId"),
    @NamedQuery(name = "NGBPCmplxPOCreationSAPErrorMsg.findByProcInstId", query = "SELECT n FROM NGBPCmplxPOCreationSAPErrorMsg n WHERE n.procInstId = :procInstId"),
    @NamedQuery(name = "NGBPCmplxPOCreationSAPErrorMsg.findByErrorFlag", query = "SELECT n FROM NGBPCmplxPOCreationSAPErrorMsg n WHERE n.errorFlag = :errorFlag"),
    @NamedQuery(name = "NGBPCmplxPOCreationSAPErrorMsg.findBySAPErrorMsg", query = "SELECT n FROM NGBPCmplxPOCreationSAPErrorMsg n WHERE n.sAPErrorMsg = :sAPErrorMsg"),
    @NamedQuery(name = "NGBPCmplxPOCreationSAPErrorMsg.findByInsertionTime", query = "SELECT n FROM NGBPCmplxPOCreationSAPErrorMsg n WHERE n.insertionTime = :insertionTime"),
    @NamedQuery(name = "NGBPCmplxPOCreationSAPErrorMsg.findByProcessType", query = "SELECT n FROM NGBPCmplxPOCreationSAPErrorMsg n WHERE n.processType = :processType")})
public class NGBPCmplxPOCreationSAPErrorMsg implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "InsertionOrderId")
    private Integer insertionOrderId;
    @Size(max = 50)
    @Column(name = "ProcInstId")
    private String procInstId;
    @Size(max = 50)
    @Column(name = "ErrorFlag")
    private String errorFlag;
    @Size(max = 2147483647)
    @Column(name = "SAPErrorMsg")
    private String sAPErrorMsg;
    @Column(name = "InsertionTime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date insertionTime;
    @Size(max = 50)
    @Column(name = "ProcessType")
    private String processType;

    public NGBPCmplxPOCreationSAPErrorMsg() {
    }

    public NGBPCmplxPOCreationSAPErrorMsg(Integer insertionOrderId) {
        this.insertionOrderId = insertionOrderId;
    }

    public Integer getInsertionOrderId() {
        return insertionOrderId;
    }

    public void setInsertionOrderId(Integer insertionOrderId) {
        this.insertionOrderId = insertionOrderId;
    }

    public String getProcInstId() {
        return procInstId;
    }

    public void setProcInstId(String procInstId) {
        this.procInstId = procInstId;
    }

    public String getErrorFlag() {
        return errorFlag;
    }

    public void setErrorFlag(String errorFlag) {
        this.errorFlag = errorFlag;
    }

    public String getSAPErrorMsg() {
        return sAPErrorMsg;
    }

    public void setSAPErrorMsg(String sAPErrorMsg) {
        this.sAPErrorMsg = sAPErrorMsg;
    }

    public Date getInsertionTime() {
        return insertionTime;
    }

    public void setInsertionTime(Date insertionTime) {
        this.insertionTime = insertionTime;
    }

    public String getProcessType() {
        return processType;
    }

    public void setProcessType(String processType) {
        this.processType = processType;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (insertionOrderId != null ? insertionOrderId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof NGBPCmplxPOCreationSAPErrorMsg)) {
            return false;
        }
        NGBPCmplxPOCreationSAPErrorMsg other = (NGBPCmplxPOCreationSAPErrorMsg) object;
        if ((this.insertionOrderId == null && other.insertionOrderId != null) || (this.insertionOrderId != null && !this.insertionOrderId.equals(other.insertionOrderId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.NGBPCmplxPOCreationSAPErrorMsg[ insertionOrderId=" + insertionOrderId + " ]";
    }
    
}
