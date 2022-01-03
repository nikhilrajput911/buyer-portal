/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.entities;

import java.io.Serializable;
import java.math.BigDecimal;
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
@Table(name = "NG_BP_Services")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Services.findAll", query = "SELECT s FROM Services s"),
    @NamedQuery(name = "Services.findById", query = "SELECT s FROM Services s WHERE s.id = :id"),
    @NamedQuery(name = "Services.findByServiceLineItemNumber", query = "SELECT s FROM Services s WHERE s.serviceLineItemNumber = :serviceLineItemNumber"),
    @NamedQuery(name = "Services.findByServiceNumber", query = "SELECT s FROM Services s WHERE s.serviceNumber = :serviceNumber"),
    @NamedQuery(name = "Services.findByShortText", query = "SELECT s FROM Services s WHERE s.shortText = :shortText"),
    @NamedQuery(name = "Services.findByQuantity", query = "SELECT s FROM Services s WHERE s.quantity = :quantity"),
    @NamedQuery(name = "Services.findByUnit", query = "SELECT s FROM Services s WHERE s.unit = :unit"),
    @NamedQuery(name = "Services.findByGrossPrice", query = "SELECT s FROM Services s WHERE s.grossPrice = :grossPrice"),
    @NamedQuery(name = "Services.findByCurrency", query = "SELECT s FROM Services s WHERE s.currency = :currency"),
    @NamedQuery(name = "Services.findByNetPrice", query = "SELECT s FROM Services s WHERE s.netPrice = :netPrice"),
    @NamedQuery(name = "Services.findByEdition", query = "SELECT s FROM Services s WHERE s.edition = :edition"),
    @NamedQuery(name = "Services.findByLineItemLongText", query = "SELECT s FROM Services s WHERE s.lineItemLongText = :lineItemLongText"),
    @NamedQuery(name = "Services.findByOverfTolerance", query = "SELECT s FROM Services s WHERE s.overfTolerance = :overfTolerance"),
    @NamedQuery(name = "Services.findByLineItemNumber", query = "SELECT s FROM Services s WHERE s.lineItemNumber = :lineItemNumber")})
public class Services implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
//    @NotNull
    @Column(name = "Id")
    private Integer id;
    @Size(max = 10)
    @Column(name = "ServiceLineItemNumber")
    private String serviceLineItemNumber;
    @Size(max = 15)
    @Column(name = "ServiceNumber")
    private String serviceNumber;
    @Column(name = "ShortText")
    private String shortText;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "Quantity")
    private BigDecimal quantity;
    @Size(max = 6)
    @Column(name = "Unit")
    private String unit;
    @Column(name = "GrossPrice")
    private BigDecimal grossPrice;
    @Size(max = 8)
    @Column(name = "Currency")
    private String currency;
    @Column(name = "NetPrice")
    private BigDecimal netPrice;
    @Size(max = 8)
    @Column(name = "Edition")
    private String edition;
    @Column(name = "LineItemLongText")
    private String lineItemLongText;
    @Size(max = 20)
    @Column(name = "OverfTolerance")
    private String overfTolerance;
    @Size(max = 50)
    @Column(name = "LineItemNumber")
    private String lineItemNumber;
    @Size(max = 10)
    @Column(name = "LinkId")
    private String linkId;
    @Size(max = 10)
    @Column(name = "ServiceLinkId")
    private String serviceLinkId;
    @Size(max = 20)
    @Column(name = "PrItemNumber")
    private String prItemNumber;
    @Size(max = 5)
    @Column(name = "Distribution")
    private String distribution;
    @Size(max = 20)
    @Column(name = "LineNoServ")
    private String lineNoServ;
    @Size(max = 10)
    @Column(name = "DeleteFlag")
    private String deleteFlag;
    @Size(max = 10)
    @Column(name = "IsServOldOrNew")
    private String isServOldOrNew;
    @Column(name = "NetValue")
    private BigDecimal netValue;
    @Column(name = "ActualQuantity")
    private BigDecimal actualQuantity;
    @Column(name = "ServiceText")
    private String serviceText;
    @Size(max = 5000)
    @Column(name = "LineText")
    private String lineText;
    @Size(max = 20)
    @Column(name = "ServicesLongTextId")
    private String servicesLongTextId;

    public Services() {
    }

    public Services(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getServiceLineItemNumber() {
        return serviceLineItemNumber;
    }

    public void setServiceLineItemNumber(String serviceLineItemNumber) {
        this.serviceLineItemNumber = serviceLineItemNumber;
    }

    public String getServiceNumber() {
        return serviceNumber;
    }

    public void setServiceNumber(String serviceNumber) {
        this.serviceNumber = serviceNumber;
    }

    public String getShortText() {
        return shortText;
    }

    public void setShortText(String shortText) {
        this.shortText = shortText;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public BigDecimal getGrossPrice() {
        return grossPrice;
    }

    public void setGrossPrice(BigDecimal grossPrice) {
        this.grossPrice = grossPrice;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public BigDecimal getNetPrice() {
        return netPrice;
    }

    public void setNetPrice(BigDecimal netPrice) {
        this.netPrice = netPrice;
    }

    public String getEdition() {
        return edition;
    }

    public void setEdition(String edition) {
        this.edition = edition;
    }

    public String getLineItemLongText() {
        return lineItemLongText;
    }

    public void setLineItemLongText(String lineItemLongText) {
        this.lineItemLongText = lineItemLongText;
    }

    public String getOverfTolerance() {
        return overfTolerance;
    }

    public void setOverfTolerance(String overfTolerance) {
        this.overfTolerance = overfTolerance;
    }

    public String getLineItemNumber() {
        return lineItemNumber;
    }

    public void setLineItemNumber(String lineItemNumber) {
        this.lineItemNumber = lineItemNumber;
    }

    public String getLinkId() {
        return linkId;
    }

    public void setLinkId(String linkId) {
        this.linkId = linkId;
    }

    public String getServiceLinkId() {
        return serviceLinkId;
    }

    public void setServiceLinkId(String serviceLinkId) {
        this.serviceLinkId = serviceLinkId;
    }

    public String getPrItemNumber() {
        return prItemNumber;
    }

    public void setPrItemNumber(String prItemNumber) {
        this.prItemNumber = prItemNumber;
    }

    public String getDistribution() {
        return distribution;
    }

    public void setDistribution(String distribution) {
        this.distribution = distribution;
    }

    public String getLineNoServ() {
        return lineNoServ;
    }

    public void setLineNoServ(String lineNoServ) {
        this.lineNoServ = lineNoServ;
    }

    public String getDeleteFlag() {
        return deleteFlag;
    }

    public void setDeleteFlag(String deleteFlag) {
        this.deleteFlag = deleteFlag;
    }

    public String getIsServOldOrNew() {
        return isServOldOrNew;
    }

    public void setIsServOldOrNew(String isServOldOrNew) {
        this.isServOldOrNew = isServOldOrNew;
    }

    public BigDecimal getNetValue() {
        return netValue;
    }

    public void setNetValue(BigDecimal netValue) {
        this.netValue = netValue;
    }

    public BigDecimal getActualQuantity() {
        return actualQuantity;
    }

    public void setActualQuantity(BigDecimal actualQuantity) {
        this.actualQuantity = actualQuantity;
    }

    public String getServiceText() {
        return serviceText;
    }

    public void setServiceText(String serviceText) {
        this.serviceText = serviceText;
    }

    public String getLineText() {
        return lineText;
    }

    public void setLineText(String lineText) {
        this.lineText = lineText;
    }
    
    public String getServicesLongTextId() {
        return servicesLongTextId;
    }

    public void setServicesLongTextId(String servicesLongTextId) {
        this.servicesLongTextId = servicesLongTextId;
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
        if (!(object instanceof Services)) {
            return false;
        }
        Services other = (Services) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.Services[ id=" + id + " ]";
    }

}
