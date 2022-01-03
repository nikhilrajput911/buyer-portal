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
@Table(name = "NG_BP_CustomerData")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CustomerData.findAll", query = "SELECT c FROM CustomerData c"),
    @NamedQuery(name = "CustomerData.findById", query = "SELECT c FROM CustomerData c WHERE c.id = :id"),
    @NamedQuery(name = "CustomerData.findByProductOrigin", query = "SELECT c FROM CustomerData c WHERE c.productOrigin = :productOrigin"),
    @NamedQuery(name = "CustomerData.findBySegment", query = "SELECT c FROM CustomerData c WHERE c.segment = :segment"),
    @NamedQuery(name = "CustomerData.findByDescription", query = "SELECT c FROM CustomerData c WHERE c.description = :description"),
    @NamedQuery(name = "CustomerData.findByLineItemNumber", query = "SELECT c FROM CustomerData c WHERE c.lineItemNumber = :lineItemNumber")})
public class CustomerData implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
//    @NotNull
    @Column(name = "Id")
    private Integer id;
    @Size(max = 20)
    @Column(name = "ProductOrigin")
    private String productOrigin;
    @Size(max = 150)
    @Column(name = "Segment")
    private String segment;
    @Size(max = 40)
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
    public CustomerData() {
    }

    public CustomerData(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getProductOrigin() {
        return productOrigin;
    }

    public void setProductOrigin(String productOrigin) {
        this.productOrigin = productOrigin;
    }

    public String getSegment() {
        return segment;
    }

    public void setSegment(String segment) {
        this.segment = segment;
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
        if (!(object instanceof CustomerData)) {
            return false;
        }
        CustomerData other = (CustomerData) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.CustomerData[ id=" + id + " ]";
    }
    
}
