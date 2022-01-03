/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.entities;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Sunny Kumar
 */
@Entity
@Table(name = "NG_Master_ExchageRateRatio")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterExchageRateRatio.findAll", query = "SELECT m FROM MasterExchageRateRatio m"),
    @NamedQuery(name = "MasterExchageRateRatio.findBySno", query = "SELECT m FROM MasterExchageRateRatio m WHERE m.sno = :sno"),
    @NamedQuery(name = "MasterExchageRateRatio.findByExchangeRateType", query = "SELECT m FROM MasterExchageRateRatio m WHERE m.exchangeRateType = :exchangeRateType"),
    @NamedQuery(name = "MasterExchageRateRatio.findByFromCurrency", query = "SELECT m FROM MasterExchageRateRatio m WHERE m.fromCurrency = :fromCurrency"),
    @NamedQuery(name = "MasterExchageRateRatio.findByToCurrency", query = "SELECT m FROM MasterExchageRateRatio m WHERE m.toCurrency = :toCurrency"),
    @NamedQuery(name = "MasterExchageRateRatio.findByValidFrom", query = "SELECT m FROM MasterExchageRateRatio m WHERE m.validFrom = :validFrom"),
    @NamedQuery(name = "MasterExchageRateRatio.findByRatioFrom", query = "SELECT m FROM MasterExchageRateRatio m WHERE m.ratioFrom = :ratioFrom"),
    @NamedQuery(name = "MasterExchageRateRatio.findByRatioTo", query = "SELECT m FROM MasterExchageRateRatio m WHERE m.ratioTo = :ratioTo"),
    @NamedQuery(name = "MasterExchageRateRatio.findByDescription", query = "SELECT m FROM MasterExchageRateRatio m WHERE m.description = :description")})
public class MasterExchageRateRatio implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Sno")
    private Integer sno;
    @Size(max = 50)
    @Column(name = "ExchangeRateType")
    private String exchangeRateType;
    @Size(max = 5)
    @Column(name = "FromCurrency")
    private String fromCurrency;
    @Size(max = 5)
    @Column(name = "ToCurrency")
    private String toCurrency;
    @Column(name = "ValidFrom")
    @Temporal(TemporalType.TIMESTAMP)
    private Date validFrom;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "RatioFrom")
    private BigDecimal ratioFrom;
    @Column(name = "RatioTo")
    private BigDecimal ratioTo;
    @Size(max = 300)
    @Column(name = "Description")
    private String description;

    public MasterExchageRateRatio() {
    }

    public MasterExchageRateRatio(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getExchangeRateType() {
        return exchangeRateType;
    }

    public void setExchangeRateType(String exchangeRateType) {
        this.exchangeRateType = exchangeRateType;
    }

    public String getFromCurrency() {
        return fromCurrency;
    }

    public void setFromCurrency(String fromCurrency) {
        this.fromCurrency = fromCurrency;
    }

    public String getToCurrency() {
        return toCurrency;
    }

    public void setToCurrency(String toCurrency) {
        this.toCurrency = toCurrency;
    }

    public Date getValidFrom() {
        return validFrom;
    }

    public void setValidFrom(Date validFrom) {
        this.validFrom = validFrom;
    }

    public BigDecimal getRatioFrom() {
        return ratioFrom;
    }

    public void setRatioFrom(BigDecimal ratioFrom) {
        this.ratioFrom = ratioFrom;
    }

    public BigDecimal getRatioTo() {
        return ratioTo;
    }

    public void setRatioTo(BigDecimal ratioTo) {
        this.ratioTo = ratioTo;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (sno != null ? sno.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof MasterExchageRateRatio)) {
            return false;
        }
        MasterExchageRateRatio other = (MasterExchageRateRatio) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterExchageRateRatio[ sno=" + sno + " ]";
    }
    
}
