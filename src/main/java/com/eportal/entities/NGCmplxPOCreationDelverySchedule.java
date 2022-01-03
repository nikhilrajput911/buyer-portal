/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.entities;

import java.io.Serializable;
import java.math.BigDecimal;
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
@Table(name = "NG_Cmplx_POCreation_DelverySchedule")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NGCmplxPOCreationDelverySchedule.findAll", query = "SELECT n FROM NGCmplxPOCreationDelverySchedule n"),
    @NamedQuery(name = "NGCmplxPOCreationDelverySchedule.findByProcInstId", query = "SELECT n FROM NGCmplxPOCreationDelverySchedule n WHERE n.procInstId = :procInstId"),
    @NamedQuery(name = "NGCmplxPOCreationDelverySchedule.findByInsertionOrderID", query = "SELECT n FROM NGCmplxPOCreationDelverySchedule n WHERE n.insertionOrderID = :insertionOrderID"),
    @NamedQuery(name = "NGCmplxPOCreationDelverySchedule.findByDelDateCatg", query = "SELECT n FROM NGCmplxPOCreationDelverySchedule n WHERE n.delDateCatg = :delDateCatg"),
    @NamedQuery(name = "NGCmplxPOCreationDelverySchedule.findByDelDate", query = "SELECT n FROM NGCmplxPOCreationDelverySchedule n WHERE n.delDate = :delDate"),
    @NamedQuery(name = "NGCmplxPOCreationDelverySchedule.findByScheduledQuantity", query = "SELECT n FROM NGCmplxPOCreationDelverySchedule n WHERE n.scheduledQuantity = :scheduledQuantity"),
    @NamedQuery(name = "NGCmplxPOCreationDelverySchedule.findByDelTime", query = "SELECT n FROM NGCmplxPOCreationDelverySchedule n WHERE n.delTime = :delTime"),
    @NamedQuery(name = "NGCmplxPOCreationDelverySchedule.findByPRNumber", query = "SELECT n FROM NGCmplxPOCreationDelverySchedule n WHERE n.pRNumber = :pRNumber"),
    @NamedQuery(name = "NGCmplxPOCreationDelverySchedule.findByReqItemNo", query = "SELECT n FROM NGCmplxPOCreationDelverySchedule n WHERE n.reqItemNo = :reqItemNo"),
    @NamedQuery(name = "NGCmplxPOCreationDelverySchedule.findByLinkID", query = "SELECT n FROM NGCmplxPOCreationDelverySchedule n WHERE n.linkID = :linkID"),
    @NamedQuery(name = "NGCmplxPOCreationDelverySchedule.findByItemNumber", query = "SELECT n FROM NGCmplxPOCreationDelverySchedule n WHERE n.itemNumber = :itemNumber")})
public class NGCmplxPOCreationDelverySchedule implements Serializable {
    private static final long serialVersionUID = 1L;
    @Size(max = 50)
    @Column(name = "ProcInstId")
    private String procInstId;
    @Id
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "InsertionOrderID")
    private Long insertionOrderID;
    @Size(max = 1)
    @Column(name = "DelDateCatg")
    private String delDateCatg;
    @Column(name = "DelDate")
    @Temporal(TemporalType.DATE)
    private Date delDate;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "ScheduledQuantity")
    private BigDecimal scheduledQuantity;
    @Size(max = 1)
    @Column(name = "DelTime")
    private String delTime;
    @Size(max = 10)
    @Column(name = "PRNumber")
    private String pRNumber;
    @Size(max = 5)
    @Column(name = "ReqItemNo")
    private String reqItemNo;
    @Size(max = 60)
    @Column(name = "LinkID")
    private String linkID;
    @Size(max = 5)
    @Column(name = "ItemNumber")
    private String itemNumber;

    public NGCmplxPOCreationDelverySchedule() {
    }

    public NGCmplxPOCreationDelverySchedule(Long insertionOrderID) {
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

    public String getDelDateCatg() {
        return delDateCatg;
    }

    public void setDelDateCatg(String delDateCatg) {
        this.delDateCatg = delDateCatg;
    }

    public Date getDelDate() {
        return delDate;
    }

    public void setDelDate(Date delDate) {
        this.delDate = delDate;
    }

    public BigDecimal getScheduledQuantity() {
        return scheduledQuantity;
    }

    public void setScheduledQuantity(BigDecimal scheduledQuantity) {
        this.scheduledQuantity = scheduledQuantity;
    }

    public String getDelTime() {
        return delTime;
    }

    public void setDelTime(String delTime) {
        this.delTime = delTime;
    }

    public String getPRNumber() {
        return pRNumber;
    }

    public void setPRNumber(String pRNumber) {
        this.pRNumber = pRNumber;
    }

    public String getReqItemNo() {
        return reqItemNo;
    }

    public void setReqItemNo(String reqItemNo) {
        this.reqItemNo = reqItemNo;
    }

    public String getLinkID() {
        return linkID;
    }

    public void setLinkID(String linkID) {
        this.linkID = linkID;
    }

    public String getItemNumber() {
        return itemNumber;
    }

    public void setItemNumber(String itemNumber) {
        this.itemNumber = itemNumber;
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
        if (!(object instanceof NGCmplxPOCreationDelverySchedule)) {
            return false;
        }
        NGCmplxPOCreationDelverySchedule other = (NGCmplxPOCreationDelverySchedule) object;
        if ((this.insertionOrderID == null && other.insertionOrderID != null) || (this.insertionOrderID != null && !this.insertionOrderID.equals(other.insertionOrderID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.NGCmplxPOCreationDelverySchedule[ insertionOrderID=" + insertionOrderID + " ]";
    }
    
}
