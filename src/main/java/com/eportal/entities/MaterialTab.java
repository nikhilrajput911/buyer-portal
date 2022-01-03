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
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author admin
 */
@Entity
@Table(name = "NG_BP_MaterialTab")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MaterialTab.findAll", query = "SELECT m FROM MaterialTab m"),
    @NamedQuery(name = "MaterialTab.findById", query = "SELECT m FROM MaterialTab m WHERE m.id = :id"),
    @NamedQuery(name = "MaterialTab.findByRevisionLevel", query = "SELECT m FROM MaterialTab m WHERE m.revisionLevel = :revisionLevel"),
    @NamedQuery(name = "MaterialTab.findByVendMatNo", query = "SELECT m FROM MaterialTab m WHERE m.vendMatNo = :vendMatNo"),
    @NamedQuery(name = "MaterialTab.findByEanUpc", query = "SELECT m FROM MaterialTab m WHERE m.eanUpc = :eanUpc"),
    @NamedQuery(name = "MaterialTab.findByVendorSubrange", query = "SELECT m FROM MaterialTab m WHERE m.vendorSubrange = :vendorSubrange"),
    @NamedQuery(name = "MaterialTab.findByBatch", query = "SELECT m FROM MaterialTab m WHERE m.batch = :batch"),
    @NamedQuery(name = "MaterialTab.findByVendorBatch", query = "SELECT m FROM MaterialTab m WHERE m.vendorBatch = :vendorBatch"),
    @NamedQuery(name = "MaterialTab.findByInfoUpdate", query = "SELECT m FROM MaterialTab m WHERE m.infoUpdate = :infoUpdate"),
    @NamedQuery(name = "MaterialTab.findByStockType", query = "SELECT m FROM MaterialTab m WHERE m.stockType = :stockType")})
public class MaterialTab implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "Id")
    private Integer id;
    @Size(max = 100)
    @Column(name = "RevisionLevel")
    private String revisionLevel;
    @Size(max = 100)
    @Column(name = "VendMatNo")
    private String vendMatNo;
    @Size(max = 100)
    @Column(name = "EanUpc")
    private String eanUpc;
    @Size(max = 100)
    @Column(name = "VendorSubrange")
    private String vendorSubrange;
    @Size(max = 100)
    @Column(name = "Batch")
    private String batch;
    @Size(max = 100)
    @Column(name = "VendorBatch")
    private String vendorBatch;
    @Size(max = 100)
    @Column(name = "InfoUpdate")
    private String infoUpdate;
    @Size(max = 100)
    @Column(name = "StockType")
    private String stockType;
    @Size(max = 20)
    @Column(name = "InsertionOrderId")
    private String insertionOrderId;
    @Size(max = 10)
    @Column(name = "PrItemNumber")
    private String prItemNumber;
    @Size(max = 10)
    @Column(name = "LinkId")
    private String linkId;
    @Size(max = 200)
    @Column(name = "MfrPartNumber")
    private String mfrPartNumber;
    @Size(max = 300)
    @Column(name = "Manufacturer")
    private String manufacturer;

    public MaterialTab() {
    }

    public MaterialTab(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRevisionLevel() {
        return revisionLevel;
    }

    public void setRevisionLevel(String revisionLevel) {
        this.revisionLevel = revisionLevel;
    }

    public String getVendMatNo() {
        return vendMatNo;
    }

    public void setVendMatNo(String vendMatNo) {
        this.vendMatNo = vendMatNo;
    }

    public String getEanUpc() {
        return eanUpc;
    }

    public void setEanUpc(String eanUpc) {
        this.eanUpc = eanUpc;
    }

    public String getVendorSubrange() {
        return vendorSubrange;
    }

    public void setVendorSubrange(String vendorSubrange) {
        this.vendorSubrange = vendorSubrange;
    }

    public String getBatch() {
        return batch;
    }

    public void setBatch(String batch) {
        this.batch = batch;
    }

    public String getVendorBatch() {
        return vendorBatch;
    }

    public void setVendorBatch(String vendorBatch) {
        this.vendorBatch = vendorBatch;
    }

    public String getInfoUpdate() {
        return infoUpdate;
    }

    public void setInfoUpdate(String infoUpdate) {
        this.infoUpdate = infoUpdate;
    }

    public String getStockType() {
        return stockType;
    }

    public void setStockType(String stockType) {
        this.stockType = stockType;
    }

    public String getInsertionOrderId() {
        return insertionOrderId;
    }

    public void setInsertionOrderId(String insertionOrderId) {
        this.insertionOrderId = insertionOrderId;
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

    public String getMfrPartNumber() {
        return mfrPartNumber;
    }

    public void setMfrPartNumber(String mfrPartNumber) {
        this.mfrPartNumber = mfrPartNumber;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
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
        if (!(object instanceof MaterialTab)) {
            return false;
        }
        MaterialTab other = (MaterialTab) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MaterialTab[ id=" + id + " ]";
    }
    
}
