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
@Table(name = "NG_BP_Cmplx_POCreation_CustormerData")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NGBPCmplxPOCreationCustormerData.findAll", query = "SELECT n FROM NGBPCmplxPOCreationCustormerData n"),
    @NamedQuery(name = "NGBPCmplxPOCreationCustormerData.findByProcInstId", query = "SELECT n FROM NGBPCmplxPOCreationCustormerData n WHERE n.procInstId = :procInstId"),
    @NamedQuery(name = "NGBPCmplxPOCreationCustormerData.findByInsertionOrderID", query = "SELECT n FROM NGBPCmplxPOCreationCustormerData n WHERE n.insertionOrderID = :insertionOrderID"),
    @NamedQuery(name = "NGBPCmplxPOCreationCustormerData.findByPaymentImmediate", query = "SELECT n FROM NGBPCmplxPOCreationCustormerData n WHERE n.paymentImmediate = :paymentImmediate"),
    @NamedQuery(name = "NGBPCmplxPOCreationCustormerData.findByExternalWeight", query = "SELECT n FROM NGBPCmplxPOCreationCustormerData n WHERE n.externalWeight = :externalWeight"),
    @NamedQuery(name = "NGBPCmplxPOCreationCustormerData.findByInstructionsToWeighter", query = "SELECT n FROM NGBPCmplxPOCreationCustormerData n WHERE n.instructionsToWeighter = :instructionsToWeighter"),
    @NamedQuery(name = "NGBPCmplxPOCreationCustormerData.findByZoneCollectionScrap", query = "SELECT n FROM NGBPCmplxPOCreationCustormerData n WHERE n.zoneCollectionScrap = :zoneCollectionScrap"),
    @NamedQuery(name = "NGBPCmplxPOCreationCustormerData.findByPriceDisplay", query = "SELECT n FROM NGBPCmplxPOCreationCustormerData n WHERE n.priceDisplay = :priceDisplay"),
    @NamedQuery(name = "NGBPCmplxPOCreationCustormerData.findByProductOrigin", query = "SELECT n FROM NGBPCmplxPOCreationCustormerData n WHERE n.productOrigin = :productOrigin"),
    @NamedQuery(name = "NGBPCmplxPOCreationCustormerData.findBySegment", query = "SELECT n FROM NGBPCmplxPOCreationCustormerData n WHERE n.segment = :segment")})
public class NGBPCmplxPOCreationCustormerData implements Serializable {

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
    @Column(name = "PaymentImmediate")
    private String paymentImmediate;
    @Size(max = 5)
    @Column(name = "ExternalWeight")
    private String externalWeight;
    @Size(max = 35)
    @Column(name = "InstructionsToWeighter" , columnDefinition = "ntext")
    private String instructionsToWeighter;
    @Size(max = 10)
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

    @OneToOne(targetEntity = NGBPExtPOCreation.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "POCreation_Id", referencedColumnName = "Id")
    private NGBPExtPOCreation nGBPExtPOCreation;

    public NGBPExtPOCreation getnGBPExtPOCreation() {
        return nGBPExtPOCreation;
    }

    public void setnGBPExtPOCreation(NGBPExtPOCreation nGBPExtPOCreation) {
        this.nGBPExtPOCreation = nGBPExtPOCreation;
    }

    public NGBPCmplxPOCreationCustormerData() {
    }

    public NGBPCmplxPOCreationCustormerData(Long insertionOrderID) {
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

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (insertionOrderID != null ? insertionOrderID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof NGBPCmplxPOCreationCustormerData)) {
            return false;
        }
        NGBPCmplxPOCreationCustormerData other = (NGBPCmplxPOCreationCustormerData) object;
        if ((this.insertionOrderID == null && other.insertionOrderID != null) || (this.insertionOrderID != null && !this.insertionOrderID.equals(other.insertionOrderID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.NGBPCmplxPOCreationCustormerData[ insertionOrderID=" + insertionOrderID + " ]";
    }

}
