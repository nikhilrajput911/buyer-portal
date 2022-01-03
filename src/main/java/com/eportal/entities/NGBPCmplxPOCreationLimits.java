/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.entities;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author admin
 */
@Entity
@Table(name = "NG_BP_Cmplx_POCreation_Limits")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NGBPCmplxPOCreationLimits.findAll", query = "SELECT n FROM NGBPCmplxPOCreationLimits n"),
    @NamedQuery(name = "NGBPCmplxPOCreationLimits.findByInsertionOrderID", query = "SELECT n FROM NGBPCmplxPOCreationLimits n WHERE n.insertionOrderID = :insertionOrderID"),
    @NamedQuery(name = "NGBPCmplxPOCreationLimits.findByProcInstId", query = "SELECT n FROM NGBPCmplxPOCreationLimits n WHERE n.procInstId = :procInstId"),
    @NamedQuery(name = "NGBPCmplxPOCreationLimits.findByOverallLimit", query = "SELECT n FROM NGBPCmplxPOCreationLimits n WHERE n.overallLimit = :overallLimit"),
    @NamedQuery(name = "NGBPCmplxPOCreationLimits.findByExpectedValue", query = "SELECT n FROM NGBPCmplxPOCreationLimits n WHERE n.expectedValue = :expectedValue"),
    @NamedQuery(name = "NGBPCmplxPOCreationLimits.findByNoLimit", query = "SELECT n FROM NGBPCmplxPOCreationLimits n WHERE n.noLimit = :noLimit"),
    @NamedQuery(name = "NGBPCmplxPOCreationLimits.findByLinkID", query = "SELECT n FROM NGBPCmplxPOCreationLimits n WHERE n.linkID = :linkID"),
    @NamedQuery(name = "NGBPCmplxPOCreationLimits.findByItemNumber", query = "SELECT n FROM NGBPCmplxPOCreationLimits n WHERE n.itemNumber = :itemNumber")})
public class NGBPCmplxPOCreationLimits implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "InsertionOrderID")
    private Long insertionOrderID;
    @Size(max = 50)
    @Column(name = "ProcInstId")
    private String procInstId;
    @Size(max = 13)
    @Column(name = "OverallLimit")
    private String overallLimit;
    @Size(max = 13)
    @Column(name = "ExpectedValue")
    private String expectedValue;
    @Size(max = 5)
    @Column(name = "NoLimit")
    private String noLimit;
    @Size(max = 60)
    @Column(name = "LinkID")
    private String linkID;
    @Size(max = 5)
    @Column(name = "ItemNumber")
    private String itemNumber;
    @Size(max = 50)
    @Column(name = "PrItemNumber")
    private String prItemNumber;
    @Size(max = 30)
    @Column(name = "ActualVal")
    private String actualVal;
	

    @OneToOne(targetEntity = NGBPCmplxPOCreationLineItemPO.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "LineItem_PO_Id", referencedColumnName = "InsertionOrderID")
    private NGBPCmplxPOCreationLineItemPO nGBPCmplxPOCreationLineItemPO;

    public NGBPCmplxPOCreationLineItemPO getnGBPCmplxPOCreationLineItemPO() {
        return nGBPCmplxPOCreationLineItemPO;
    }

    public void setnGBPCmplxPOCreationLineItemPO(NGBPCmplxPOCreationLineItemPO nGBPCmplxPOCreationLineItemPO) {
        this.nGBPCmplxPOCreationLineItemPO = nGBPCmplxPOCreationLineItemPO;
    }

    public NGBPCmplxPOCreationLimits() {
    }

    public NGBPCmplxPOCreationLimits(Long insertionOrderID) {
        this.insertionOrderID = insertionOrderID;
    }

    public Long getInsertionOrderID() {
        return insertionOrderID;
    }

    public void setInsertionOrderID(Long insertionOrderID) {
        this.insertionOrderID = insertionOrderID;
    }

    public String getProcInstId() {
        return procInstId;
    }

    public void setProcInstId(String procInstId) {
        this.procInstId = procInstId;
    }

    public String getOverallLimit() {
        return overallLimit;
    }

    public void setOverallLimit(String overallLimit) {
        this.overallLimit = overallLimit;
    }

    public String getExpectedValue() {
        return expectedValue;
    }

    public void setExpectedValue(String expectedValue) {
        this.expectedValue = expectedValue;
    }

    public String getNoLimit() {
        return noLimit;
    }

    public void setNoLimit(String noLimit) {
        this.noLimit = noLimit;
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

    public String getActualVal() {
        return actualVal;
    }

    public void setActualVal(String actualVal) {
        this.actualVal = actualVal;
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
        if (!(object instanceof NGBPCmplxPOCreationLimits)) {
            return false;
        }
        NGBPCmplxPOCreationLimits other = (NGBPCmplxPOCreationLimits) object;
        if ((this.insertionOrderID == null && other.insertionOrderID != null) || (this.insertionOrderID != null && !this.insertionOrderID.equals(other.insertionOrderID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.NGBPCmplxPOCreationLimits[ insertionOrderID=" + insertionOrderID + " ]";
    }

}
