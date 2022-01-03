/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
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
@Table(name = "NG_BP_Cmplx_POCreation_DelverySchedule")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NGBPCmplxPOCreationDelverySchedule.findAll", query = "SELECT n FROM NGBPCmplxPOCreationDelverySchedule n"),
    @NamedQuery(name = "NGBPCmplxPOCreationDelverySchedule.findByProcInstId", query = "SELECT n FROM NGBPCmplxPOCreationDelverySchedule n WHERE n.procInstId = :procInstId"),
    @NamedQuery(name = "NGBPCmplxPOCreationDelverySchedule.findByInsertionOrderID", query = "SELECT n FROM NGBPCmplxPOCreationDelverySchedule n WHERE n.insertionOrderID = :insertionOrderID"),
    @NamedQuery(name = "NGBPCmplxPOCreationDelverySchedule.findByDelDateCatg", query = "SELECT n FROM NGBPCmplxPOCreationDelverySchedule n WHERE n.delDateCatg = :delDateCatg"),
    @NamedQuery(name = "NGBPCmplxPOCreationDelverySchedule.findByDelDate", query = "SELECT n FROM NGBPCmplxPOCreationDelverySchedule n WHERE n.delDate = :delDate"),
    @NamedQuery(name = "NGBPCmplxPOCreationDelverySchedule.findByScheduledQuantity", query = "SELECT n FROM NGBPCmplxPOCreationDelverySchedule n WHERE n.scheduledQuantity = :scheduledQuantity"),
    @NamedQuery(name = "NGBPCmplxPOCreationDelverySchedule.findByDelTime", query = "SELECT n FROM NGBPCmplxPOCreationDelverySchedule n WHERE n.delTime = :delTime"),
    @NamedQuery(name = "NGBPCmplxPOCreationDelverySchedule.findByPRNumber", query = "SELECT n FROM NGBPCmplxPOCreationDelverySchedule n WHERE n.pRNumber = :pRNumber"),
    @NamedQuery(name = "NGBPCmplxPOCreationDelverySchedule.findByReqItemNo", query = "SELECT n FROM NGBPCmplxPOCreationDelverySchedule n WHERE n.reqItemNo = :reqItemNo"),
    @NamedQuery(name = "NGBPCmplxPOCreationDelverySchedule.findByLinkID", query = "SELECT n FROM NGBPCmplxPOCreationDelverySchedule n WHERE n.linkID = :linkID"),
    @NamedQuery(name = "NGBPCmplxPOCreationDelverySchedule.findByItemNumber", query = "SELECT n FROM NGBPCmplxPOCreationDelverySchedule n WHERE n.itemNumber = :itemNumber")})
public class NGBPCmplxPOCreationDelverySchedule implements Serializable {
    private static final long serialVersionUID = 1L;
    @Size(max = 50)
    @Column(name = "ProcInstId")
    private String procInstId;
    @Id
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "InsertionOrderID")
    private Long insertionOrderID;
    @Size(max = 5)
    @Column(name = "DelDateCatg")
    private String delDateCatg;
    @Column(name = "DelDate")
    @Temporal(TemporalType.DATE)
    private Date delDate;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "ScheduledQuantity")
    private BigDecimal scheduledQuantity;
    @Size(max = 20)
    @Column(name = "DelTime")
    private String delTime;
    @Size(max = 15)
    @Column(name = "PRNumber")
    private String pRNumber;
    @Size(max = 10)
    @Column(name = "ReqItemNo")
    private String reqItemNo;
    @Size(max = 60)
    @Column(name = "LinkID")
    private String linkID;
    @Size(max = 5)
    @Column(name = "ItemNumber")
    private String itemNumber;
    @Size(max = 50)
    @Column(name = "PrItemNumber")
    private String prItemNumber;
    @Size(max = 10)
    @Column(name = "DeliveryDateByCategory")
    private String deliveryDateByCategory;
    
    @Column(name = "StatisticalDeliveryDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date statisticalDeliveryDate;
    @Column(name = "GrQty")
    private BigDecimal grQty;
    @Column(name = "OpenQuantity")
    private BigDecimal openQuantity;
    @Size(max = 20)
    @Column(name = "SchLine")
    private String schLine;
    
    @JsonIgnore
    @ManyToOne(cascade = {CascadeType.ALL, CascadeType.MERGE, CascadeType.PERSIST}, fetch = FetchType.LAZY)
    private NGBPCmplxPOCreationLineItemPO pOCreationLineItemPO;

    public NGBPCmplxPOCreationLineItemPO getpOCreationLineItemPO() {
        return pOCreationLineItemPO;
    }

    public void setpOCreationLineItemPO(NGBPCmplxPOCreationLineItemPO pOCreationLineItemPO) {
        this.pOCreationLineItemPO = pOCreationLineItemPO;
    }
    public NGBPCmplxPOCreationDelverySchedule() {
    }

    public NGBPCmplxPOCreationDelverySchedule(Long insertionOrderID) {
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

    public String getPrItemNumber() {
        return prItemNumber;
    }

    public void setPrItemNumber(String prItemNumber) {
        this.prItemNumber = prItemNumber;
    }

    public String getDeliveryDateByCategory() {
        return deliveryDateByCategory;
    }

    public void setDeliveryDateByCategory(String deliveryDateByCategory) {
        this.deliveryDateByCategory = deliveryDateByCategory;
    }

    public Date getStatisticalDeliveryDate() {
        return statisticalDeliveryDate;
    }

    public void setStatisticalDeliveryDate(Date statisticalDeliveryDate) {
        this.statisticalDeliveryDate = statisticalDeliveryDate;
    }

    public BigDecimal getGrQty() {
        return grQty;
    }

    public void setGrQty(BigDecimal grQty) {
        this.grQty = grQty;
    }

    public BigDecimal getOpenQuantity() {
        return openQuantity;
    }

    public void setOpenQuantity(BigDecimal openQuantity) {
        this.openQuantity = openQuantity;
    }

    public String getSchLine() {
        return schLine;
    }

    public void setSchLine(String schLine) {
        this.schLine = schLine;
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
        if (!(object instanceof NGBPCmplxPOCreationDelverySchedule)) {
            return false;
        }
        NGBPCmplxPOCreationDelverySchedule other = (NGBPCmplxPOCreationDelverySchedule) object;
        if ((this.insertionOrderID == null && other.insertionOrderID != null) || (this.insertionOrderID != null && !this.insertionOrderID.equals(other.insertionOrderID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.NGBPCmplxPOCreationDelverySchedule[ insertionOrderID=" + insertionOrderID + " ]";
    }
    
}
