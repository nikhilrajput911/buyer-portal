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
@Table(name = "NG_BP_Cmplx_POCreation_Partners")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NGBPCmplxPOCreationPartners.findAll", query = "SELECT n FROM NGBPCmplxPOCreationPartners n"),
    @NamedQuery(name = "NGBPCmplxPOCreationPartners.findByProcInstId", query = "SELECT n FROM NGBPCmplxPOCreationPartners n WHERE n.procInstId = :procInstId"),
    @NamedQuery(name = "NGBPCmplxPOCreationPartners.findByInsertionOrderID", query = "SELECT n FROM NGBPCmplxPOCreationPartners n WHERE n.insertionOrderID = :insertionOrderID"),
    @NamedQuery(name = "NGBPCmplxPOCreationPartners.findByPartnerFunction", query = "SELECT n FROM NGBPCmplxPOCreationPartners n WHERE n.partnerFunction = :partnerFunction"),
    @NamedQuery(name = "NGBPCmplxPOCreationPartners.findByName", query = "SELECT n FROM NGBPCmplxPOCreationPartners n WHERE n.name = :name"),
    @NamedQuery(name = "NGBPCmplxPOCreationPartners.findByNumbr", query = "SELECT n FROM NGBPCmplxPOCreationPartners n WHERE n.numbr = :numbr"),
    @NamedQuery(name = "NGBPCmplxPOCreationPartners.findByVendorName", query = "SELECT n FROM NGBPCmplxPOCreationPartners n WHERE n.vendorName = :vendorName")})
public class NGBPCmplxPOCreationPartners implements Serializable {
    private static final long serialVersionUID = 1L;
    @Size(max = 50)
    @Column(name = "ProcInstId")
    private String procInstId;
    @Id
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "InsertionOrderID")
    private Long insertionOrderID;
    @Size(max = 2)
    @Column(name = "PartnerFunction")
    private String partnerFunction;
    @Size(max = 20)
    @Column(name = "Name")
    private String name;
    @Size(max = 10)
    @Column(name = "Numbr")
    private String numbr;
    @Size(max = 35)
    @Column(name = "VendorName")
    private String vendorName;

    public NGBPCmplxPOCreationPartners() {
    }

    public NGBPCmplxPOCreationPartners(Long insertionOrderID) {
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

    public String getPartnerFunction() {
        return partnerFunction;
    }

    public void setPartnerFunction(String partnerFunction) {
        this.partnerFunction = partnerFunction;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNumbr() {
        return numbr;
    }

    public void setNumbr(String numbr) {
        this.numbr = numbr;
    }

    public String getVendorName() {
        return vendorName;
    }

    public void setVendorName(String vendorName) {
        this.vendorName = vendorName;
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
        if (!(object instanceof NGBPCmplxPOCreationPartners)) {
            return false;
        }
        NGBPCmplxPOCreationPartners other = (NGBPCmplxPOCreationPartners) object;
        if ((this.insertionOrderID == null && other.insertionOrderID != null) || (this.insertionOrderID != null && !this.insertionOrderID.equals(other.insertionOrderID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.NGBPCmplxPOCreationPartners[ insertionOrderID=" + insertionOrderID + " ]";
    }
    
}
