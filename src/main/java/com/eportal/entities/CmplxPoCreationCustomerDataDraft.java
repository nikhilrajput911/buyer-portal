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
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author admin
 */
@Entity
@Table(name = "NG_BP_Cmplx_POCreation_CustormerData_Draft")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CmplxPoCreationCustomerDataDraft.findAll", query = "SELECT n FROM CmplxPoCreationCustomerDataDraft n"),
    @NamedQuery(name = "CmplxPoCreationCustomerDataDraft.findByExtId", query = "SELECT n FROM CmplxPoCreationCustomerDataDraft n where n.extPoCreationDraft.id = :extId")
})
public class CmplxPoCreationCustomerDataDraft implements Serializable {
    private static final long serialVersionUID = 1L;
    @Size(max = 50)
    @Column(name = "ProcInstId")
    private String procInstId;
    @Id
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "InsertionOrderID")
    private Integer insertionOrderID;
    @Size(max = 5)
    @Column(name = "PaymentImmediate")
    private String paymentImmediate;
    @Size(max = 5)
    @Column(name = "ExternalWeight")
    private String externalWeight;
    @Size(max = 35)
    @Column(name = "InstructionsToWeighter")
    private String instructionsToWeighter;
    @Size(max = 20)
    @Column(name = "ZoneCollectionScrap")
    private String zoneCollectionScrap;
    @Size(max = 5)
    @Column(name = "PriceDisplay")
    private String priceDisplay;
    @Size(max = 15)
    @Column(name = "ProductOrigin")
    private String productOrigin;
    @Size(max = 30)
    @Column(name = "Segment")
    private String segment;
    @Size(max = 50)
    @Column(name = "ConfControl")
    private String confControl;
    @OneToOne(targetEntity = ExtPoCreationDraft.class)
    @JoinColumn(name = "ExtPoCreationPkId", referencedColumnName = "Id")
    private ExtPoCreationDraft extPoCreationDraft;

    public CmplxPoCreationCustomerDataDraft() {
    }

    public CmplxPoCreationCustomerDataDraft(Integer insertionOrderID) {
        this.insertionOrderID = insertionOrderID;
    }

    public String getProcInstId() {
        return procInstId;
    }

    public void setProcInstId(String procInstId) {
        this.procInstId = procInstId;
    }

    public Integer getInsertionOrderID() {
        return insertionOrderID;
    }

    public void setInsertionOrderID(Integer insertionOrderID) {
        this.insertionOrderID = insertionOrderID;
    }

    public String getPaymentImmediate() {
        return paymentImmediate;
    }

    public void setPaymentImmediate(String paymentImmediate) {
        this.paymentImmediate = paymentImmediate;
    }

    public String getExternalWeight() {
        return externalWeight;
    }

    public void setExternalWeight(String externalWeight) {
        this.externalWeight = externalWeight;
    }

    public String getInstructionsToWeighter() {
        return instructionsToWeighter;
    }

    public void setInstructionsToWeighter(String instructionsToWeighter) {
        this.instructionsToWeighter = instructionsToWeighter;
    }

    public String getZoneCollectionScrap() {
        return zoneCollectionScrap;
    }

    public void setZoneCollectionScrap(String zoneCollectionScrap) {
        this.zoneCollectionScrap = zoneCollectionScrap;
    }

    public String getPriceDisplay() {
        return priceDisplay;
    }

    public void setPriceDisplay(String priceDisplay) {
        this.priceDisplay = priceDisplay;
    }

    public String getProductOrigin() {
        return productOrigin;
    }

    public void setProductOrigin(String productOrigin) {
        this.productOrigin = productOrigin;
    }

    public String getSegment() {
        return segment;
    }

    public void setSegment(String segment) {
        this.segment = segment;
    }

    public String getConfControl() {
        return confControl;
    }

    public void setConfControl(String confControl) {
        this.confControl = confControl;
    }
    
    public ExtPoCreationDraft getExtPoCreationDraft() {
        return extPoCreationDraft;
    }

    public void setExtPoCreationDraft(ExtPoCreationDraft extPoCreationDraft) {
        this.extPoCreationDraft = extPoCreationDraft;
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
        if (!(object instanceof CmplxPoCreationCustomerDataDraft)) {
            return false;
        }
        CmplxPoCreationCustomerDataDraft other = (CmplxPoCreationCustomerDataDraft) object;
        if ((this.insertionOrderID == null && other.insertionOrderID != null) || (this.insertionOrderID != null && !this.insertionOrderID.equals(other.insertionOrderID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.CmplxPoCreationCustomerDataDraft[ insertionOrderID=" + insertionOrderID + " ]";
    }
    
}
