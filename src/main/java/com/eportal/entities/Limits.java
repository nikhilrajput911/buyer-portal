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
@Table(name = "NG_BP_Limits")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Limits.findAll", query = "SELECT i FROM Limits i")})
public class Limits implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
//    @NotNull
    @Column(name = "Id")
    private Integer id;
    @Column(name = "OverAllLimits")
    private BigDecimal overAllLimits;
    @Column(name = "ExpectedValue")
    private BigDecimal expectedValue;
    @Size(max = 5)
    @Column(name = "NoLimis")
    private String noLimis;
    @Size(max = 50)
    @Column(name = "LineItemNumber")
    private String lineItemNumber;
    @Size(max = 20)
    @Column(name = "PrItemNumber")
    private String prItemNumber;
    @Size(max = 10)
    @Column(name = "LinkId")
    private String linkId;
    @Size(max = 30)
    @Column(name = "ActualValue")
    private String actualValue;
    
    public Limits() {
    }

    public Limits(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public BigDecimal getOverAllLimits() {
        return overAllLimits;
    }

    public void setOverAllLimits(BigDecimal overAllLimits) {
        this.overAllLimits = overAllLimits;
    }

    public BigDecimal getExpectedValue() {
        return expectedValue;
    }

    public void setExpectedValue(BigDecimal expectedValue) {
        this.expectedValue = expectedValue;
    }

    public String getNoLimis() {
        return noLimis;
    }

    public void setNoLimis(String noLimis) {
        this.noLimis = noLimis;
    }

    public String getLinkId() {
        return linkId;
    }

    public void setLinkId(String linkId) {
        this.linkId = linkId;
    }
    
    public String getActualValue() {
        return actualValue;
    }

    public void setActualValue(String actualValue) {
        this.actualValue = actualValue;
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
        if (!(object instanceof Limits)) {
            return false;
        }
        Limits other = (Limits) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.Limits[ id=" + id + " ]";
    }

}
