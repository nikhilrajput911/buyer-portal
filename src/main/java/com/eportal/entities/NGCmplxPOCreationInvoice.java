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
@Table(name = "NG_Cmplx_POCreation_Invoice")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NGCmplxPOCreationInvoice.findAll", query = "SELECT n FROM NGCmplxPOCreationInvoice n"),
    @NamedQuery(name = "NGCmplxPOCreationInvoice.findByProcInstId", query = "SELECT n FROM NGCmplxPOCreationInvoice n WHERE n.procInstId = :procInstId"),
    @NamedQuery(name = "NGCmplxPOCreationInvoice.findByInsertionOrderID", query = "SELECT n FROM NGCmplxPOCreationInvoice n WHERE n.insertionOrderID = :insertionOrderID"),
    @NamedQuery(name = "NGCmplxPOCreationInvoice.findByInvoiceReceipt", query = "SELECT n FROM NGCmplxPOCreationInvoice n WHERE n.invoiceReceipt = :invoiceReceipt"),
    @NamedQuery(name = "NGCmplxPOCreationInvoice.findByFinalInvoice", query = "SELECT n FROM NGCmplxPOCreationInvoice n WHERE n.finalInvoice = :finalInvoice"),
    @NamedQuery(name = "NGCmplxPOCreationInvoice.findByGRBasedIV", query = "SELECT n FROM NGCmplxPOCreationInvoice n WHERE n.gRBasedIV = :gRBasedIV"),
    @NamedQuery(name = "NGCmplxPOCreationInvoice.findByDPCategory", query = "SELECT n FROM NGCmplxPOCreationInvoice n WHERE n.dPCategory = :dPCategory"),
    @NamedQuery(name = "NGCmplxPOCreationInvoice.findByTaxCode", query = "SELECT n FROM NGCmplxPOCreationInvoice n WHERE n.taxCode = :taxCode"),
    @NamedQuery(name = "NGCmplxPOCreationInvoice.findByLinkID", query = "SELECT n FROM NGCmplxPOCreationInvoice n WHERE n.linkID = :linkID")})
public class NGCmplxPOCreationInvoice implements Serializable {
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
    @Column(name = "InvoiceReceipt")
    private String invoiceReceipt;
    @Size(max = 5)
    @Column(name = "FinalInvoice")
    private String finalInvoice;
    @Size(max = 5)
    @Column(name = "GRBasedIV")
    private String gRBasedIV;
    @Size(max = 4)
    @Column(name = "DPCategory")
    private String dPCategory;
    @Size(max = 2)
    @Column(name = "TaxCode")
    private String taxCode;
    @Size(max = 60)
    @Column(name = "LinkID")
    private String linkID;

    public NGCmplxPOCreationInvoice() {
    }

    public NGCmplxPOCreationInvoice(Long insertionOrderID) {
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

    public String getGRBasedIV() {
        return gRBasedIV;
    }

    public void setGRBasedIV(String gRBasedIV) {
        this.gRBasedIV = gRBasedIV;
    }

    public String getDPCategory() {
        return dPCategory;
    }

    public void setDPCategory(String dPCategory) {
        this.dPCategory = dPCategory;
    }

    public String getTaxCode() {
        return taxCode;
    }

    public void setTaxCode(String taxCode) {
        this.taxCode = taxCode;
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
        if (!(object instanceof NGCmplxPOCreationInvoice)) {
            return false;
        }
        NGCmplxPOCreationInvoice other = (NGCmplxPOCreationInvoice) object;
        if ((this.insertionOrderID == null && other.insertionOrderID != null) || (this.insertionOrderID != null && !this.insertionOrderID.equals(other.insertionOrderID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.NGCmplxPOCreationInvoice[ insertionOrderID=" + insertionOrderID + " ]";
    }
    
}
