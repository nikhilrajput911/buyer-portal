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
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Sunny Kumar
 */
@Entity
@Table(name = "NG_BP_Invoice")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Invoice.findAll", query = "SELECT i FROM Invoice i"),
    @NamedQuery(name = "Invoice.findById", query = "SELECT i FROM Invoice i WHERE i.id = :id"),
    @NamedQuery(name = "Invoice.findByInvoiceReceipt", query = "SELECT i FROM Invoice i WHERE i.invoiceReceipt = :invoiceReceipt"),
    @NamedQuery(name = "Invoice.findByFinalInvoice", query = "SELECT i FROM Invoice i WHERE i.finalInvoice = :finalInvoice"),
    @NamedQuery(name = "Invoice.findByGrBasedIV", query = "SELECT i FROM Invoice i WHERE i.grBasedIV = :gRBasedIV"),
    @NamedQuery(name = "Invoice.findByDpCategory", query = "SELECT i FROM Invoice i WHERE i.dpCategory = :dPCategory"),
    @NamedQuery(name = "Invoice.findByTaxCode", query = "SELECT i FROM Invoice i WHERE i.taxCode = :taxCode"),
    @NamedQuery(name = "Invoice.findByDescription", query = "SELECT i FROM Invoice i WHERE i.description = :description"),
    @NamedQuery(name = "Invoice.findByLineItemNumber", query = "SELECT i FROM Invoice i WHERE i.lineItemNumber = :lineItemNumber")})
public class Invoice implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
//    @NotNull
    @Column(name = "Id")
    private Integer id;
    @Size(max = 5)
    @Column(name = "InvoiceReceipt")
    private String invoiceReceipt;
    @Size(max = 5)
    @Column(name = "FinalInvoice")
    private String finalInvoice;
    @Size(max = 5)
    @Column(name = "GrBasedIV")
    private String grBasedIV;
    @Size(max = 8)
    @Column(name = "DpCategory")
    private String dpCategory;
    @Size(max = 6)
    @Column(name = "TaxCode")
    private String taxCode;
    @Size(max = 60)
    @Column(name = "Description")
    private String description;
    @Size(max = 50)
    @Column(name = "LineItemNumber")
    private String lineItemNumber;
    @Size(max = 20)
    @Column(name = "PrItemNumber")
    private String prItemNumber;
    @Size(max = 10)
    @Column(name = "LinkId")
    private String linkId;
    @Size(max = 20)
    @Column(name = "ServiceBasedIV")
    private String serviceBasedIV;
    
    public Invoice() {
    }

    public Invoice(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getInvoiceReceipt() {
        return invoiceReceipt;
    }

    public void setInvoiceReceipt(String invoiceReceipt) {
        this.invoiceReceipt = invoiceReceipt;
    }

    public String getFinalInvoice() {
        return finalInvoice;
    }

    public void setFinalInvoice(String finalInvoice) {
        this.finalInvoice = finalInvoice;
    }

    public String getTaxCode() {
        return taxCode;
    }

    public void setTaxCode(String taxCode) {
        this.taxCode = taxCode;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLineItemNumber() {
        return lineItemNumber;
    }

    public void setLineItemNumber(String lineItemNumber) {
        this.lineItemNumber = lineItemNumber;
    }    

    public String getGrBasedIV() {
        return grBasedIV;
    }

    public void setGrBasedIV(String grBasedIV) {
        this.grBasedIV = grBasedIV;
    }

    public String getDpCategory() {
        return dpCategory;
    }

    public void setDpCategory(String dpCategory) {
        this.dpCategory = dpCategory;
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

    public String getServiceBasedIV() {
        return serviceBasedIV;
    }

    public void setServiceBasedIV(String serviceBasedIV) {
        this.serviceBasedIV = serviceBasedIV;
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
        if (!(object instanceof Invoice)) {
            return false;
        }
        Invoice other = (Invoice) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.Invoice[ id=" + id + " ]";
    }

}
