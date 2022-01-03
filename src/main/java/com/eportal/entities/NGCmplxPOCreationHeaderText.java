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
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author admin
 */
@Entity
@Table(name = "NG_Cmplx_POCreation_HeaderText")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NGCmplxPOCreationHeaderText.findAll", query = "SELECT n FROM NGCmplxPOCreationHeaderText n"),
    @NamedQuery(name = "NGCmplxPOCreationHeaderText.findByProcInstId", query = "SELECT n FROM NGCmplxPOCreationHeaderText n WHERE n.procInstId = :procInstId"),
    @NamedQuery(name = "NGCmplxPOCreationHeaderText.findByInsertionOrderID", query = "SELECT n FROM NGCmplxPOCreationHeaderText n WHERE n.insertionOrderID = :insertionOrderID"),
    @NamedQuery(name = "NGCmplxPOCreationHeaderText.findByPONoteToApprover", query = "SELECT n FROM NGCmplxPOCreationHeaderText n WHERE n.pONoteToApprover = :pONoteToApprover"),
    @NamedQuery(name = "NGCmplxPOCreationHeaderText.findByHeaderNote", query = "SELECT n FROM NGCmplxPOCreationHeaderText n WHERE n.headerNote = :headerNote"),
    @NamedQuery(name = "NGCmplxPOCreationHeaderText.findByPricingTypes", query = "SELECT n FROM NGCmplxPOCreationHeaderText n WHERE n.pricingTypes = :pricingTypes"),
    @NamedQuery(name = "NGCmplxPOCreationHeaderText.findByDeadlines", query = "SELECT n FROM NGCmplxPOCreationHeaderText n WHERE n.deadlines = :deadlines"),
    @NamedQuery(name = "NGCmplxPOCreationHeaderText.findByTermsOfDelivery", query = "SELECT n FROM NGCmplxPOCreationHeaderText n WHERE n.termsOfDelivery = :termsOfDelivery"),
    @NamedQuery(name = "NGCmplxPOCreationHeaderText.findByTermsOfPayment", query = "SELECT n FROM NGCmplxPOCreationHeaderText n WHERE n.termsOfPayment = :termsOfPayment"),
    @NamedQuery(name = "NGCmplxPOCreationHeaderText.findByShippingInstructions", query = "SELECT n FROM NGCmplxPOCreationHeaderText n WHERE n.shippingInstructions = :shippingInstructions"),
    @NamedQuery(name = "NGCmplxPOCreationHeaderText.findByVendorMemoGeneral", query = "SELECT n FROM NGCmplxPOCreationHeaderText n WHERE n.vendorMemoGeneral = :vendorMemoGeneral"),
    @NamedQuery(name = "NGCmplxPOCreationHeaderText.findByVendorMemoSpecial", query = "SELECT n FROM NGCmplxPOCreationHeaderText n WHERE n.vendorMemoSpecial = :vendorMemoSpecial"),
    @NamedQuery(name = "NGCmplxPOCreationHeaderText.findByLinkID", query = "SELECT n FROM NGCmplxPOCreationHeaderText n WHERE n.linkID = :linkID")})
public class NGCmplxPOCreationHeaderText implements Serializable {
    private static final long serialVersionUID = 1L;
    @Size(max = 50)
    @Column(name = "ProcInstId")
    private String procInstId;
    @Id
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "InsertionOrderID")
    private Long insertionOrderID;
    @Size(max = 4000)
    @Column(name = "PONoteToApprover")
    private String pONoteToApprover;
    @Size(max = 4000)
    @Column(name = "HeaderNote")
    private String headerNote;
    @Size(max = 4000)
    @Column(name = "PricingTypes")
    private String pricingTypes;
    @Size(max = 4000)
    @Column(name = "Deadlines")
    private String deadlines;
    @Size(max = 4000)
    @Column(name = "TermsOfDelivery")
    private String termsOfDelivery;
    @Size(max = 4000)
    @Column(name = "TermsOfPayment")
    private String termsOfPayment;
    @Size(max = 4000)
    @Column(name = "ShippingInstructions")
    private String shippingInstructions;
    @Size(max = 4000)
    @Column(name = "VendorMemoGeneral")
    private String vendorMemoGeneral;
    @Size(max = 4000)
    @Column(name = "VendorMemoSpecial")
    private String vendorMemoSpecial;
    @Size(max = 60)
    @Column(name = "LinkID")
    private String linkID;

    public NGCmplxPOCreationHeaderText() {
    }

    public NGCmplxPOCreationHeaderText(Long insertionOrderID) {
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

    public String getPONoteToApprover() {
        return pONoteToApprover;
    }

    public void setPONoteToApprover(String pONoteToApprover) {
        this.pONoteToApprover = pONoteToApprover;
    }

    public String getHeaderNote() {
        return headerNote;
    }

    public void setHeaderNote(String headerNote) {
        this.headerNote = headerNote;
    }

    public String getPricingTypes() {
        return pricingTypes;
    }

    public void setPricingTypes(String pricingTypes) {
        this.pricingTypes = pricingTypes;
    }

    public String getDeadlines() {
        return deadlines;
    }

    public void setDeadlines(String deadlines) {
        this.deadlines = deadlines;
    }

    public String getTermsOfDelivery() {
        return termsOfDelivery;
    }

    public void setTermsOfDelivery(String termsOfDelivery) {
        this.termsOfDelivery = termsOfDelivery;
    }

    public String getTermsOfPayment() {
        return termsOfPayment;
    }

    public void setTermsOfPayment(String termsOfPayment) {
        this.termsOfPayment = termsOfPayment;
    }

    public String getShippingInstructions() {
        return shippingInstructions;
    }

    public void setShippingInstructions(String shippingInstructions) {
        this.shippingInstructions = shippingInstructions;
    }

    public String getVendorMemoGeneral() {
        return vendorMemoGeneral;
    }

    public void setVendorMemoGeneral(String vendorMemoGeneral) {
        this.vendorMemoGeneral = vendorMemoGeneral;
    }

    public String getVendorMemoSpecial() {
        return vendorMemoSpecial;
    }

    public void setVendorMemoSpecial(String vendorMemoSpecial) {
        this.vendorMemoSpecial = vendorMemoSpecial;
    }

    public String getLinkID() {
        return linkID;
    }

    public void setLinkID(String linkID) {
        this.linkID = linkID;
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
        if (!(object instanceof NGCmplxPOCreationHeaderText)) {
            return false;
        }
        NGCmplxPOCreationHeaderText other = (NGCmplxPOCreationHeaderText) object;
        if ((this.insertionOrderID == null && other.insertionOrderID != null) || (this.insertionOrderID != null && !this.insertionOrderID.equals(other.insertionOrderID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.NGCmplxPOCreationHeaderText[ insertionOrderID=" + insertionOrderID + " ]";
    }
    
}
