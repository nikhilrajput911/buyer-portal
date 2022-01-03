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
@Table(name = "NG_BP_ConditionControl")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "ConditionControl.findAll", query = "SELECT c FROM ConditionControl c"),
    @NamedQuery(name = "ConditionControl.findById", query = "SELECT c FROM ConditionControl c WHERE c.id = :id"),
    @NamedQuery(name = "ConditionControl.findByPrintPrice", query = "SELECT c FROM ConditionControl c WHERE c.printPrice = :printPrice"),
    @NamedQuery(name = "ConditionControl.findByEstimatePrice", query = "SELECT c FROM ConditionControl c WHERE c.estimatePrice = :estimatePrice"),
    @NamedQuery(name = "ConditionControl.findByLineItemNumber", query = "SELECT c FROM ConditionControl c WHERE c.lineItemNumber = :lineItemNumber")})
public class ConditionControl implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
//    @NotNull
    @Column(name = "Id")
    private Integer id;
    @Size(max = 10)
    @Column(name = "PrintPrice")
    private String printPrice;
    @Size(max = 10)
    @Column(name = "EstimatePrice")
    private String estimatePrice;
    @Size(max = 50)
    @Column(name = "LineItemNumber")
    private String lineItemNumber;

    @Size(max = 20)
    @Column(name = "PrItemNumber")
    private String prItemNumber;
    @Size(max = 10)
    @Column(name = "LinkId")
    private String linkId;
    public ConditionControl() {
    }

    public ConditionControl(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPrintPrice() {
        return printPrice;
    }

    public void setPrintPrice(String printPrice) {
        this.printPrice = printPrice;
    }

    public String getEstimatePrice() {
        return estimatePrice;
    }

    public void setEstimatePrice(String estimatePrice) {
        this.estimatePrice = estimatePrice;
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
        if (!(object instanceof ConditionControl)) {
            return false;
        }
        ConditionControl other = (ConditionControl) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.ConditionControl[ id=" + id + " ]";
    }
    
}
