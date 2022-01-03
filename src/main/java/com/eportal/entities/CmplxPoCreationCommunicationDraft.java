/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.entities;

import java.io.Serializable;
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
@Table(name = "NG_BP_Cmplx_POCreation_Communication_Draft")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CmplxPoCreationCommunicationDraft.findAll", query = "SELECT n FROM CmplxPoCreationCommunicationDraft n")
})
public class CmplxPoCreationCommunicationDraft implements Serializable {
    private static final long serialVersionUID = 1L;
    @Size(max = 50)
    @Column(name = "ProcInstId")
    private String procInstId;
    @Id
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "InsertionOrderID")
    private Integer insertionOrderID;
    @Size(max = 30)
    @Column(name = "SalesPerson")
    private String salesPerson;
    @Size(max = 12)
    @Column(name = "YourReference")
    private String yourReference;
    @Size(max = 16)
    @Column(name = "Telephone")
    private String telephone;
    @Size(max = 12)
    @Column(name = "OurReference")
    private String ourReference;
    @Size(max = 2)
    @Column(name = "Lang")
    private String lang;

    @OneToOne(targetEntity = ExtPoCreationDraft.class)
    @JoinColumn(name = "ExtPoCreationPkId", referencedColumnName = "Id")
    private ExtPoCreationDraft extPoCreationDraft;
    
    public CmplxPoCreationCommunicationDraft() {
    }

    public CmplxPoCreationCommunicationDraft(Integer insertionOrderID) {
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

    public String getSalesPerson() {
        return salesPerson;
    }

    public void setSalesPerson(String salesPerson) {
        this.salesPerson = salesPerson;
    }

    public String getYourReference() {
        return yourReference;
    }

    public void setYourReference(String yourReference) {
        this.yourReference = yourReference;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getOurReference() {
        return ourReference;
    }

    public void setOurReference(String ourReference) {
        this.ourReference = ourReference;
    }

    public String getLang() {
        return lang;
    }

    public void setLang(String lang) {
        this.lang = lang;
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
        if (!(object instanceof CmplxPoCreationCommunicationDraft)) {
            return false;
        }
        CmplxPoCreationCommunicationDraft other = (CmplxPoCreationCommunicationDraft) object;
        if ((this.insertionOrderID == null && other.insertionOrderID != null) || (this.insertionOrderID != null && !this.insertionOrderID.equals(other.insertionOrderID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.CmplxPoCreationCommunicationDraft[ insertionOrderID=" + insertionOrderID + " ]";
    }
    
}
