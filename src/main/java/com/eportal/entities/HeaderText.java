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
 * @author Sunny Kumar
 */
@Entity
@Table(name = "NG_BP_HeaderText")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "HeaderText.findAll", query = "SELECT h FROM HeaderText h"),
    @NamedQuery(name = "HeaderText.findById", query = "SELECT h FROM HeaderText h WHERE h.id = :id"),
    @NamedQuery(name = "HeaderText.findByPoNoteToApprover", query = "SELECT h FROM HeaderText h WHERE h.poNoteToApprover = :poNoteToApprover"),
    @NamedQuery(name = "HeaderText.findByHeaderNote", query = "SELECT h FROM HeaderText h WHERE h.headerNote = :headerNote"),
    @NamedQuery(name = "HeaderText.findByPricingTypes", query = "SELECT h FROM HeaderText h WHERE h.pricingTypes = :pricingTypes"),
    @NamedQuery(name = "HeaderText.findByDeadlines", query = "SELECT h FROM HeaderText h WHERE h.deadlines = :deadlines"),
    @NamedQuery(name = "HeaderText.findByTermsOfDelivery", query = "SELECT h FROM HeaderText h WHERE h.termsOfDelivery = :termsOfDelivery"),
    @NamedQuery(name = "HeaderText.findByTermsOfPayment", query = "SELECT h FROM HeaderText h WHERE h.termsOfPayment = :termsOfPayment"),
    @NamedQuery(name = "HeaderText.findByShippingInstructions", query = "SELECT h FROM HeaderText h WHERE h.shippingInstructions = :shippingInstructions"),
    @NamedQuery(name = "HeaderText.findByVendorMemoGeneral", query = "SELECT h FROM HeaderText h WHERE h.vendorMemoGeneral = :vendorMemoGeneral"),
    @NamedQuery(name = "HeaderText.findByVendorMemoSpecial", query = "SELECT h FROM HeaderText h WHERE h.vendorMemoSpecial = :vendorMemoSpecial"),
    @NamedQuery(name = "HeaderText.findByLineItemNumber", query = "SELECT h FROM HeaderText h WHERE h.lineItemNumber = :lineItemNumber")})
public class HeaderText implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
//    @NotNull
    @Column(name = "Id")
    private Integer id;
    @Column(name = "PoNoteToApprover", columnDefinition = "NVARCHAR(MAX)")
    private String poNoteToApprover;
    @Column(name = "HeaderNote", columnDefinition = "NVARCHAR(MAX)")
    private String headerNote;
    @Column(name = "PricingTypes", columnDefinition = "NVARCHAR(MAX)")
    private String pricingTypes;
    @Column(name = "Deadlines", columnDefinition = "NVARCHAR(MAX)")
    private String deadlines;
    @Column(name = "TermsOfDelivery", columnDefinition = "NVARCHAR(MAX)")
    private String termsOfDelivery;
    @Column(name = "TermsOfPayment", columnDefinition = "NVARCHAR(MAX)")
    private String termsOfPayment;
    @Column(name = "ShippingInstructions", columnDefinition = "NVARCHAR(MAX)")
    private String shippingInstructions;
    @Column(name = "VendorMemoGeneral", columnDefinition = "NVARCHAR(MAX)")
    private String vendorMemoGeneral;
    @Column(name = "VendorMemoSpecial", columnDefinition = "NVARCHAR(MAX)")
    private String vendorMemoSpecial;
    @Size(max = 10)
    @Column(name = "LineItemNumber")
    private String lineItemNumber;
    @Size(max = 20)
    @Column(name = "PrItemNumber")
    private String prItemNumber;
    @Size(max = 10)
    @Column(name = "LinkId")
    private String linkId;
    public HeaderText() {
    }

    public HeaderText(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPoNoteToApprover() {
        return poNoteToApprover;
    }

    public void setPoNoteToApprover(String poNoteToApprover) {
        this.poNoteToApprover = poNoteToApprover;
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

    public String getLineItemNumber() {
        return lineItemNumber;
    }

    public void setLineItemNumber(String lineItemNumber) {
        this.lineItemNumber = lineItemNumber;
    }

    public String getPrItemNumber() {
        return prItemNumber;
    }

    public void setPrItemNumber(String prItemNumber) {
        this.prItemNumber = prItemNumber;
    }

    public String getLinkId() {
        return linkId;
    }

    public void setLinkId(String linkId) {
        this.linkId = linkId;
    }
    
   
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof HeaderText)) {
            return false;
        }
        HeaderText other = (HeaderText) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.controller.HeaderText[ id=" + id + " ]";
    }
    
}
