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
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author admin
 */
@Entity
@Table(name = "NG_BP_Cmplx_POCreation_HeaderText")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NGBPCmplxPOCreationHeaderText.findAll", query = "SELECT n FROM NGBPCmplxPOCreationHeaderText n"),
    @NamedQuery(name = "NGBPCmplxPOCreationHeaderText.findByProcInstId", query = "SELECT n FROM NGBPCmplxPOCreationHeaderText n WHERE n.procInstId = :procInstId"),
    @NamedQuery(name = "NGBPCmplxPOCreationHeaderText.findByInsertionOrderID", query = "SELECT n FROM NGBPCmplxPOCreationHeaderText n WHERE n.insertionOrderID = :insertionOrderID"),
    @NamedQuery(name = "NGBPCmplxPOCreationHeaderText.findByPONoteToApprover", query = "SELECT n FROM NGBPCmplxPOCreationHeaderText n WHERE n.pONoteToApprover = :pONoteToApprover"),
    @NamedQuery(name = "NGBPCmplxPOCreationHeaderText.findByHeaderNote", query = "SELECT n FROM NGBPCmplxPOCreationHeaderText n WHERE n.headerNote = :headerNote"),
    @NamedQuery(name = "NGBPCmplxPOCreationHeaderText.findByPricingTypes", query = "SELECT n FROM NGBPCmplxPOCreationHeaderText n WHERE n.pricingTypes = :pricingTypes"),
    @NamedQuery(name = "NGBPCmplxPOCreationHeaderText.findByDeadlines", query = "SELECT n FROM NGBPCmplxPOCreationHeaderText n WHERE n.deadlines = :deadlines"),
    @NamedQuery(name = "NGBPCmplxPOCreationHeaderText.findByTermsOfDelivery", query = "SELECT n FROM NGBPCmplxPOCreationHeaderText n WHERE n.termsOfDelivery = :termsOfDelivery"),
    @NamedQuery(name = "NGBPCmplxPOCreationHeaderText.findByTermsOfPayment", query = "SELECT n FROM NGBPCmplxPOCreationHeaderText n WHERE n.termsOfPayment = :termsOfPayment"),
    @NamedQuery(name = "NGBPCmplxPOCreationHeaderText.findByShippingInstructions", query = "SELECT n FROM NGBPCmplxPOCreationHeaderText n WHERE n.shippingInstructions = :shippingInstructions"),
    @NamedQuery(name = "NGBPCmplxPOCreationHeaderText.findByVendorMemoGeneral", query = "SELECT n FROM NGBPCmplxPOCreationHeaderText n WHERE n.vendorMemoGeneral = :vendorMemoGeneral"),
    @NamedQuery(name = "NGBPCmplxPOCreationHeaderText.findByVendorMemoSpecial", query = "SELECT n FROM NGBPCmplxPOCreationHeaderText n WHERE n.vendorMemoSpecial = :vendorMemoSpecial"),
    @NamedQuery(name = "NGBPCmplxPOCreationHeaderText.findByLinkID", query = "SELECT n FROM NGBPCmplxPOCreationHeaderText n WHERE n.linkID = :linkID")})
public class NGBPCmplxPOCreationHeaderText implements Serializable {

    private static final long serialVersionUID = 1L;
    @Size(max = 50)
    @Column(name = "ProcInstId")
    private String procInstId;
    @Id
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "InsertionOrderID")
    private Long insertionOrderID;
    @Column(name = "PONoteToApprover", columnDefinition = "ntext")
    private String pONoteToApprover;
    @Column(name = "HeaderNote", columnDefinition = "ntext")
    private String headerNote;
    @Column(name = "PricingTypes", columnDefinition = "ntext")
    private String pricingTypes;
    @Column(name = "Deadlines", columnDefinition = "ntext")
    private String deadlines;
    @Column(name = "TermsOfDelivery", columnDefinition = "ntext")
    private String termsOfDelivery;
    @Column(name = "TermsOfPayment", columnDefinition = "ntext")
    private String termsOfPayment;
    @Column(name = "ShippingInstructions", columnDefinition = "ntext")
    private String shippingInstructions;
    @Column(name = "VendorMemoGeneral", columnDefinition = "ntext")
    private String vendorMemoGeneral;
    @Column(name = "VendorMemoSpecial", columnDefinition = "ntext")
    private String vendorMemoSpecial;
    @Column(name = "HeaderText", columnDefinition = "ntext")
    private String headerText;
    @Size(max = 60)
    @Column(name = "LinkID")
    private String linkID;

    @OneToOne(targetEntity = NGBPExtPOCreation.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "POCreation_Id", referencedColumnName = "Id")
    private NGBPExtPOCreation nGBPExtPOCreation;

   public NGBPExtPOCreation getnGBPExtPOCreation() {
        return nGBPExtPOCreation;
    }

    public void setnGBPExtPOCreation(NGBPExtPOCreation nGBPExtPOCreation) {
        this.nGBPExtPOCreation = nGBPExtPOCreation;
    }

    public NGBPCmplxPOCreationHeaderText() {
    }

    public NGBPCmplxPOCreationHeaderText(Long insertionOrderID) {
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

    public String getHeaderText() {
        return headerText;
    }

    public void setHeaderText(String headerText) {
        this.headerText = headerText;
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
        if (!(object instanceof NGBPCmplxPOCreationHeaderText)) {
            return false;
        }
        NGBPCmplxPOCreationHeaderText other = (NGBPCmplxPOCreationHeaderText) object;
        if ((this.insertionOrderID == null && other.insertionOrderID != null) || (this.insertionOrderID != null && !this.insertionOrderID.equals(other.insertionOrderID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.NGBPCmplxPOCreationHeaderText[ insertionOrderID=" + insertionOrderID + " ]";
    }

}
