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
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Sunny Kumar
 */
@Entity
@Table(name = "NG_BP_ServicesLongTexts")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "ServicesLongTexts.findAll", query = "SELECT s FROM ServicesLongTexts s")
})
public class ServicesLongTexts implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "Id")
    private Integer id;
    @Column(name = "ShortText")
    private String shortText;
    @Column(name = "LineItemLongText")
    private String lineItemLongText;
    @Column(name = "ServiceText")
    private String serviceText;
    
    public ServicesLongTexts() {
    }

    public ServicesLongTexts(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getShortText() {
        return shortText;
    }

    public void setShortText(String shortText) {
        this.shortText = shortText;
    }

    public String getLineItemLongText() {
        return lineItemLongText;
    }

    public void setLineItemLongText(String lineItemLongText) {
        this.lineItemLongText = lineItemLongText;
    }

    public String getServiceText() {
        return serviceText;
    }

    public void setServiceText(String serviceText) {
        this.serviceText = serviceText;
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
        if (!(object instanceof PersonalSettings)) {
            return false;
        }
        ServicesLongTexts other = (ServicesLongTexts) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.ServicesLongTexts[ sno=" + id + " ]";
    }
    
}
