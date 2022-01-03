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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
@Table(name = "NG_BP_Buyer_PurchaseGroup_Mapping")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "BuyerPurchaseGroupMapping.findAll", query = "SELECT m FROM BuyerPurchaseGroupMapping m")
})
public class BuyerPurchaseGroupMapping implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "Sno")
    private Integer sno;
    @Size(max = 25)
    @Column(name = "ProcessType")
    private String processType;
    @Size(max = 5)
    @Column(name = "PurchasingGroupCode")
    private String purchasingGroupCode;
    @Size(max = 100)
    @Column(name = "PurchasingGroupDesc")
    private String purchasingGroupDesc;
    @Size(max = 25)
    @Column(name = "TelephoneNo")
    private String telephoneNo;
    @Size(max = 25)
    @Column(name = "FaxNo")
    private String faxNo;
    @JoinColumn(name = "NG_BP_BuyerDetails_Id", referencedColumnName = "Id")
    @ManyToOne
    private BuyerDetails ngBpBuyerdetailsIdRef;

    public BuyerPurchaseGroupMapping() {
    }

    public BuyerPurchaseGroupMapping(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getProcessType() {
        return processType;
    }

    public void setProcessType(String processType) {
        this.processType = processType;
    }

    public String getPurchasingGroupCode() {
        return purchasingGroupCode;
    }

    public void setPurchasingGroupCode(String purchasingGroupCode) {
        this.purchasingGroupCode = purchasingGroupCode;
    }

    public String getPurchasingGroupDesc() {
        return purchasingGroupDesc;
    }

    public void setPurchasingGroupDesc(String purchasingGroupDesc) {
        this.purchasingGroupDesc = purchasingGroupDesc;
    }

    public String getTelephoneNo() {
        return telephoneNo;
    }

    public void setTelephoneNo(String telephoneNo) {
        this.telephoneNo = telephoneNo;
    }

    public String getFaxNo() {
        return faxNo;
    }

    public void setFaxNo(String faxNo) {
        this.faxNo = faxNo;
    }

    public BuyerDetails getNgBpBuyerdetailsIdRef() {
        return ngBpBuyerdetailsIdRef;
    }

    public void setNgBpBuyerdetailsIdRef(BuyerDetails ngBpBuyerdetailsIdRef) {
        this.ngBpBuyerdetailsIdRef = ngBpBuyerdetailsIdRef;
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
        if (!(object instanceof BuyerPurchaseGroupMapping)) {
            return false;
        }
        BuyerPurchaseGroupMapping other = (BuyerPurchaseGroupMapping) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.controller.BuyerPurchaseGroupMapping[ sno=" + sno + " ]";
    }
    
}
