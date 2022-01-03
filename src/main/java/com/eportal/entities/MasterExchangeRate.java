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
 * @author admin
 */
@Entity
@Table(name = "NG_Master_ExchageRate")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterExchangeRate.findAll", query = "SELECT m FROM MasterExchangeRate m"),
    @NamedQuery(name = "MasterExchangeRate.findBySno", query = "SELECT m FROM MasterExchangeRate m WHERE m.sno = :sno"),
    @NamedQuery(name = "MasterExchangeRate.findByExchangeRateType", query = "SELECT m FROM MasterExchangeRate m WHERE m.exchangeRateType = :exchangeRateType"),
    @NamedQuery(name = "MasterExchangeRate.findByFromCurrency", query = "SELECT m FROM MasterExchangeRate m WHERE m.fromCurrency = :fromCurrency"),
    @NamedQuery(name = "MasterExchangeRate.findByToCurrency", query = "SELECT m FROM MasterExchangeRate m WHERE m.toCurrency = :toCurrency"),
    @NamedQuery(name = "MasterExchangeRate.findByValidFrom", query = "SELECT m FROM MasterExchangeRate m WHERE m.validFrom = :validFrom"),
    @NamedQuery(name = "MasterExchangeRate.findByExchangeRate", query = "SELECT m FROM MasterExchangeRate m WHERE m.exchangeRate = :exchangeRate"),
    @NamedQuery(name = "MasterExchangeRate.findByFromCurrencyAndToCurrency", query = "SELECT m FROM MasterExchangeRate m WHERE m.fromCurrency = :fromCurrency and m.toCurrency = :toCurrency and m.exchangeRateType = 'M'"),
    @NamedQuery(name = "MasterExchangeRate.findByDescription", query = "SELECT m FROM MasterExchangeRate m WHERE m.description = :description")})
public class MasterExchangeRate implements Serializable {
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
    @Column(name = "ExchangeRate")
    private BigDecimal exchangeRate;
    @Size(max = 300)
    @Column(name = "Description")
    private String description;

    public MasterExchangeRate() {
    }

    public MasterExchangeRate(Integer sno) {
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

    public BigDecimal getExchangeRate() {
        return exchangeRate;
    }

    public void setExchangeRate(BigDecimal exchangeRate) {
        this.exchangeRate = exchangeRate;
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
        if (!(object instanceof MasterExchangeRate)) {
            return false;
        }
        MasterExchangeRate other = (MasterExchangeRate) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterExchangeRate[ sno=" + sno + " ]";
    }
    
}
