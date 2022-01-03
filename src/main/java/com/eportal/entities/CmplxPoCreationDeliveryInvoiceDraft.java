/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.entities;

import java.io.Serializable;
import java.math.BigDecimal;
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
@Table(name = "NG_BP_Cmplx_POCreation_Delivery_Invoice_Draft")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CmplxPoCreationDeliveryInvoiceDraft.findAll", query = "SELECT n FROM CmplxPoCreationDeliveryInvoiceDraft n"),
    @NamedQuery(name = "CmplxPoCreationDeliveryInvoiceDraft.findByExtId", query = "SELECT n FROM CmplxPoCreationDeliveryInvoiceDraft n where n.extPoCreationDraft.id = :extId")
})
public class CmplxPoCreationDeliveryInvoiceDraft implements Serializable {

    private static final long serialVersionUID = 1L;

    @Size(max = 50)
    @Column(name = "ProcInstId")
    private String procInstId;
    @Id
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "InsertionOrderID")
    private Integer insertionOrderID;
    @Size(max = 4)
    @Column(name = "paymentTerms")
    private String paymentTerms;
    @Size(max = 3)
    @Column(name = "paymentindays1")
    private String paymentindays1;
    @Size(max = 5)
    @Column(name = "paymentinpercnt1")
    private String paymentinpercnt1;
    @Size(max = 3)
    @Column(name = "paymentindays2")
    private String paymentindays2;
    @Size(max = 5)
    @Column(name = "paymentinpercnt2")
    private String paymentinpercnt2;
    @Size(max = 5)
    @Column(name = "paymentindaysnet")
    private String paymentindaysnet;
    @Size(max = 5)
    @Column(name = "Currency")
    private String currency;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "ExchangeRate")
    private BigDecimal exchangeRate;
    @Size(max = 5)
    @Column(name = "ExchangeRateFixed")
    private String exchangeRateFixed;
    @Size(max = 3)
    @Column(name = "Incoterms1")
    private String incoterms1;
    @Size(max = 28)
    @Column(name = "Incoterms2")
    private String incoterms2;
    @Size(max = 5)
    @Column(name = "GRMessage")
    private String gRMessage;

    @OneToOne(targetEntity = ExtPoCreationDraft.class)
    @JoinColumn(name = "ExtPoCreationPkId", referencedColumnName = "Id")
    private ExtPoCreationDraft extPoCreationDraft;
	
    public CmplxPoCreationDeliveryInvoiceDraft() {
    }

    public CmplxPoCreationDeliveryInvoiceDraft(Integer insertionOrderID) {
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

    public String getPaymentTerms() {
        return paymentTerms;
    }

    public void setPaymentTerms(String paymentTerms) {
        this.paymentTerms = paymentTerms;
    }

    public String getPaymentindays1() {
        return paymentindays1;
    }

    public void setPaymentindays1(String paymentindays1) {
        this.paymentindays1 = paymentindays1;
    }

    public String getPaymentinpercnt1() {
        return paymentinpercnt1;
    }

    public void setPaymentinpercnt1(String paymentinpercnt1) {
        this.paymentinpercnt1 = paymentinpercnt1;
    }

    public String getPaymentindays2() {
        return paymentindays2;
    }

    public void setPaymentindays2(String paymentindays2) {
        this.paymentindays2 = paymentindays2;
    }

    public String getPaymentinpercnt2() {
        return paymentinpercnt2;
    }

    public void setPaymentinpercnt2(String paymentinpercnt2) {
        this.paymentinpercnt2 = paymentinpercnt2;
    }

    public String getPaymentindaysnet() {
        return paymentindaysnet;
    }

    public void setPaymentindaysnet(String paymentindaysnet) {
        this.paymentindaysnet = paymentindaysnet;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public BigDecimal getExchangeRate() {
        return exchangeRate;
    }

    public void setExchangeRate(BigDecimal exchangeRate) {
        this.exchangeRate = exchangeRate;
    }

    public String getExchangeRateFixed() {
        return exchangeRateFixed;
    }

    public void setExchangeRateFixed(String exchangeRateFixed) {
        this.exchangeRateFixed = exchangeRateFixed;
    }

    public String getIncoterms1() {
        return incoterms1;
    }

    public void setIncoterms1(String incoterms1) {
        this.incoterms1 = incoterms1;
    }

    public String getIncoterms2() {
        return incoterms2;
    }

    public void setIncoterms2(String incoterms2) {
        this.incoterms2 = incoterms2;
    }

    public String getGRMessage() {
        return gRMessage;
    }

    public void setGRMessage(String gRMessage) {
        this.gRMessage = gRMessage;
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
        if (!(object instanceof CmplxPoCreationDeliveryInvoiceDraft)) {
            return false;
        }
        CmplxPoCreationDeliveryInvoiceDraft other = (CmplxPoCreationDeliveryInvoiceDraft) object;
        if ((this.insertionOrderID == null && other.insertionOrderID != null) || (this.insertionOrderID != null && !this.insertionOrderID.equals(other.insertionOrderID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.CmplxPoCreationDeliveryInvoiceDraft[ insertionOrderID=" + insertionOrderID + " ]";
    }

}
