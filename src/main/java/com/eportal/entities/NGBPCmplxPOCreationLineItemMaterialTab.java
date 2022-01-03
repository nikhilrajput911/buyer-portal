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
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Sunny Kumar
 */
@Entity
@Table(name = "NG_BP_Cmplx_POCreation_LineItem__MaterialTab")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemMaterialTab.findAll", query = "SELECT n FROM NGBPCmplxPOCreationLineItemMaterialTab n"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemMaterialTab.findById", query = "SELECT n FROM NGBPCmplxPOCreationLineItemMaterialTab n WHERE n.id = :id"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemMaterialTab.findByBatch", query = "SELECT n FROM NGBPCmplxPOCreationLineItemMaterialTab n WHERE n.batch = :batch"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemMaterialTab.findByEanUpc", query = "SELECT n FROM NGBPCmplxPOCreationLineItemMaterialTab n WHERE n.eanUpc = :eanUpc"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemMaterialTab.findByInfoUpdate", query = "SELECT n FROM NGBPCmplxPOCreationLineItemMaterialTab n WHERE n.infoUpdate = :infoUpdate"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemMaterialTab.findByInsertionOrderId", query = "SELECT n FROM NGBPCmplxPOCreationLineItemMaterialTab n WHERE n.insertionOrderId = :insertionOrderId"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemMaterialTab.findByLinkId", query = "SELECT n FROM NGBPCmplxPOCreationLineItemMaterialTab n WHERE n.linkId = :linkId"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemMaterialTab.findByPrItemNumber", query = "SELECT n FROM NGBPCmplxPOCreationLineItemMaterialTab n WHERE n.prItemNumber = :prItemNumber"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemMaterialTab.findByRevisionLevel", query = "SELECT n FROM NGBPCmplxPOCreationLineItemMaterialTab n WHERE n.revisionLevel = :revisionLevel"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemMaterialTab.findByStockType", query = "SELECT n FROM NGBPCmplxPOCreationLineItemMaterialTab n WHERE n.stockType = :stockType"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemMaterialTab.findByVendMatNo", query = "SELECT n FROM NGBPCmplxPOCreationLineItemMaterialTab n WHERE n.vendMatNo = :vendMatNo"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemMaterialTab.findByVendorBatch", query = "SELECT n FROM NGBPCmplxPOCreationLineItemMaterialTab n WHERE n.vendorBatch = :vendorBatch"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemMaterialTab.findByVendorSubrange", query = "SELECT n FROM NGBPCmplxPOCreationLineItemMaterialTab n WHERE n.vendorSubrange = :vendorSubrange")})
public class NGBPCmplxPOCreationLineItemMaterialTab implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
//    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Integer id;
    @Size(max = 100)
    @Column(name = "Batch")
    private String batch;
    @Size(max = 100)
    @Column(name = "EanUpc")
    private String eanUpc;
    @Size(max = 100)
    @Column(name = "InfoUpdate")
    private String infoUpdate;
    @Size(max = 20)
    @Column(name = "InsertionOrderId")
    private String insertionOrderId;
    @Size(max = 10)
    @Column(name = "LinkId")
    private String linkId;
    @Size(max = 10)
    @Column(name = "PrItemNumber")
    private String prItemNumber;
    @Size(max = 100)
    @Column(name = "RevisionLevel")
    private String revisionLevel;
    @Size(max = 100)
    @Column(name = "StockType")
    private String stockType;
    @Size(max = 100)
    @Column(name = "VendMatNo")
    private String vendMatNo;
    @Size(max = 100)
    @Column(name = "VendorBatch")
    private String vendorBatch;
    @Size(max = 100)
    @Column(name = "VendorSubrange")
    private String vendorSubrange;
    @Size(max = 150)
    @Column(name = "Mfr_Part_Number")
    private String mfrPartNumber;
    @Size(max = 250)
    @Column(name = "Manufacturer")
    private String manufacturer;
//    @OneToOne(targetEntity = NGBPExtPOCreation.class, cascade = CascadeType.ALL)
//    @JoinColumn(name="POCreation_Id",referencedColumnName="Id")
//    private NGBPExtPOCreation nGBPExtPOCreation;
    
    @OneToOne(targetEntity = NGBPCmplxPOCreationLineItemPO.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "LineItem_PO_Id", referencedColumnName = "InsertionOrderID")
    private NGBPCmplxPOCreationLineItemPO nGBPCmplxPOCreationLineItemPO;

    public NGBPCmplxPOCreationLineItemMaterialTab() {
    }
    
//    public NGBPExtPOCreation getnGBPExtPOCreation() {
//        return nGBPExtPOCreation;
//    }
//
//    public void setnGBPExtPOCreation(NGBPExtPOCreation nGBPExtPOCreation) {
//        this.nGBPExtPOCreation = nGBPExtPOCreation;
//    }
    public NGBPCmplxPOCreationLineItemPO getnGBPCmplxPOCreationLineItemPO() {
        return nGBPCmplxPOCreationLineItemPO;
    }

    public void setnGBPCmplxPOCreationLineItemPO(NGBPCmplxPOCreationLineItemPO nGBPCmplxPOCreationLineItemPO) {
        this.nGBPCmplxPOCreationLineItemPO = nGBPCmplxPOCreationLineItemPO;
    }
    
    

    public NGBPCmplxPOCreationLineItemMaterialTab(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getBatch() {
        return batch;
    }

    public void setBatch(String batch) {
        this.batch = batch;
    }

    public String getEanUpc() {
        return eanUpc;
    }

    public void setEanUpc(String eanUpc) {
        this.eanUpc = eanUpc;
    }

    public String getInfoUpdate() {
        return infoUpdate;
    }

    public void setInfoUpdate(String infoUpdate) {
        this.infoUpdate = infoUpdate;
    }

    public String getInsertionOrderId() {
        return insertionOrderId;
    }

    public void setInsertionOrderId(String insertionOrderId) {
        this.insertionOrderId = insertionOrderId;
    }

    public String getLinkId() {
        return linkId;
    }

    public void setLinkId(String linkId) {
        this.linkId = linkId;
    }

    public String getPrItemNumber() {
        return prItemNumber;
    }

    public void setPrItemNumber(String prItemNumber) {
        this.prItemNumber = prItemNumber;
    }

    public String getRevisionLevel() {
        return revisionLevel;
    }

    public void setRevisionLevel(String revisionLevel) {
        this.revisionLevel = revisionLevel;
    }

    public String getStockType() {
        return stockType;
    }

    public void setStockType(String stockType) {
        this.stockType = stockType;
    }

    public String getVendMatNo() {
        return vendMatNo;
    }

    public void setVendMatNo(String vendMatNo) {
        this.vendMatNo = vendMatNo;
    }

    public String getVendorBatch() {
        return vendorBatch;
    }

    public void setVendorBatch(String vendorBatch) {
        this.vendorBatch = vendorBatch;
    }

    public String getVendorSubrange() {
        return vendorSubrange;
    }

    public void setVendorSubrange(String vendorSubrange) {
        this.vendorSubrange = vendorSubrange;
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
        if (!(object instanceof NGBPCmplxPOCreationLineItemMaterialTab)) {
            return false;
        }
        NGBPCmplxPOCreationLineItemMaterialTab other = (NGBPCmplxPOCreationLineItemMaterialTab) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.NGBPCmplxPOCreationLineItemMaterialTab[ id=" + id + " ]";
    }
    
}
