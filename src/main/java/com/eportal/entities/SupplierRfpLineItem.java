/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.entities;

import java.io.Serializable;
import java.util.Date;
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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Sunny Kumar
 */
@Entity
@Table(name = "NG_BP_SupplierRfpLineItem")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "SupplierRfpLineItem.findAll", query = "SELECT s FROM SupplierRfpLineItem s")
})
public class SupplierRfpLineItem implements Serializable {
    
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "creationdate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationdate;
    @Column(name = "deliverydate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date deliverydate;
    @Column(name = "updatedate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedate;
    @Size(max = 100)
    @Column(name = "brand")
    private String brand;
    @Size(max = 20)
    @Column(name = "VendorUnitQuantity")
    private String vendorUnitQuantity;
    @Size(max = 20)
    @Column(name = "QuantityAvailable")
    private String quantityAvailable;
    @Size(max = 50)
    @Column(name = "AlternateMaterial")
    private String alternateMaterial;
    @Size(max = 15)
    @Column(name = "currency")
    private String currency;
    @Size(max = 10)
    @Column(name = "VendorUnit")
    private String vendorUnit;
    @Size(max = 20)
    @Column(name = "VendorPriceOfferedPerUnit")
    private String vendorPriceOfferedPerUnit;
    @Size(max = 20)
    @Column(name = "VendorPriceOfferedTotal")
    private String vendorPriceOfferedTotal;
    @Column(name = "ExpectedDeliveryDate")
    @Temporal(TemporalType.DATE)
    private Date expectedDeliveryDate;
    @JoinColumn(name = "SupplierRfpHeaderId", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private SupplierRfpHeader supplierRfpHeaderId;
    @JoinColumn(name = "MaterialMasterId", referencedColumnName = "Sno")
    @ManyToOne(optional = false)
    private MasterMaterialGeneral materialMatserId;
    @JoinColumn(name = "PlantMasterId", referencedColumnName = "Sno")
    @ManyToOne(optional = false)
    private MasterPlant plantMasterId;

    public SupplierRfpLineItem() {
    }

    public SupplierRfpLineItem(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    public Date getCreationdate() {
        return creationdate;
    }

    public void setCreationdate(Date creationdate) {
        this.creationdate = creationdate;
    }

    public Date getDeliverydate() {
        return deliverydate;
    }

    public void setDeliverydate(Date deliverydate) {
        this.deliverydate = deliverydate;
    }

    public Date getUpdatedate() {
        return updatedate;
    }

    public void setUpdatedate(Date updatedate) {
        this.updatedate = updatedate;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
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
        if (!(object instanceof SupplierLineitem)) {
            return false;
        }
        SupplierRfpLineItem other = (SupplierRfpLineItem) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.SupplierRfpLineItem[ id=" + id + " ]";
    }
    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }
    public String getVendorUnitQuantity() {
        return vendorUnitQuantity;
    }

    public void setVendorUnitQuantity(String vendorUnitQuantity) {
        this.vendorUnitQuantity = vendorUnitQuantity;
    }

    public String getQuantityAvailable() {
        return quantityAvailable;
    }

    public void setQuantityAvailable(String quantityAvailable) {
        this.quantityAvailable = quantityAvailable;
    }

    public String getAlternateMaterial() {
        return alternateMaterial;
    }

    public void setAlternateMaterial(String alternateMaterial) {
        this.alternateMaterial = alternateMaterial;
    }

    public String getVendorUnit() {
        return vendorUnit;
    }

    public void setVendorUnit(String vendorUnit) {
        this.vendorUnit = vendorUnit;
    }

    public String getVendorPriceOfferedPerUnit() {
        return vendorPriceOfferedPerUnit;
    }

    public void setVendorPriceOfferedPerUnit(String vendorPriceOfferedPerUnit) {
        this.vendorPriceOfferedPerUnit = vendorPriceOfferedPerUnit;
    }

    public String getVendorPriceOfferedTotal() {
        return vendorPriceOfferedTotal;
    }

    public void setVendorPriceOfferedTotal(String vendorPriceOfferedTotal) {
        this.vendorPriceOfferedTotal = vendorPriceOfferedTotal;
    }

    public Date getExpectedDeliveryDate() {
        return expectedDeliveryDate;
    }

    public void setExpectedDeliveryDate(Date expectedDeliveryDate) {
        this.expectedDeliveryDate = expectedDeliveryDate;
    }

    public SupplierRfpHeader getSupplierRfpHeaderId() {
        return supplierRfpHeaderId;
    }

    public void setSupplierRfpHeaderId(SupplierRfpHeader supplierRfpHeaderId) {
        this.supplierRfpHeaderId = supplierRfpHeaderId;
    }

    public MasterMaterialGeneral getMaterialMatserId() {
        return materialMatserId;
    }

    public void setMaterialMatserId(MasterMaterialGeneral materialMatserId) {
        this.materialMatserId = materialMatserId;
    }

    public MasterPlant getPlantMasterId() {
        return plantMasterId;
    }

    public void setPlantMasterId(MasterPlant plantMasterId) {
        this.plantMasterId = plantMasterId;
    }
    
}
