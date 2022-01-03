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
@Table(name = "NG_Cmplx_PRToPO_LineItem_Components")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CmplxPRToPOLineItemComponents.findAll", query = "SELECT c FROM CmplxPRToPOLineItemComponents c"),
    @NamedQuery(name = "CmplxPRToPOLineItemComponents.findByProcInstId", query = "SELECT c FROM CmplxPRToPOLineItemComponents c WHERE c.procInstId = :procInstId"),
    @NamedQuery(name = "CmplxPRToPOLineItemComponents.findByInsertionOrderID", query = "SELECT c FROM CmplxPRToPOLineItemComponents c WHERE c.insertionOrderID = :insertionOrderID"),
    @NamedQuery(name = "CmplxPRToPOLineItemComponents.findByMaterialCode", query = "SELECT c FROM CmplxPRToPOLineItemComponents c WHERE c.materialCode = :materialCode"),
    @NamedQuery(name = "CmplxPRToPOLineItemComponents.findByDescription", query = "SELECT c FROM CmplxPRToPOLineItemComponents c WHERE c.description = :description"),
    @NamedQuery(name = "CmplxPRToPOLineItemComponents.findByRequirementQuantity", query = "SELECT c FROM CmplxPRToPOLineItemComponents c WHERE c.requirementQuantity = :requirementQuantity"),
    @NamedQuery(name = "CmplxPRToPOLineItemComponents.findByUnit", query = "SELECT c FROM CmplxPRToPOLineItemComponents c WHERE c.unit = :unit"),
    @NamedQuery(name = "CmplxPRToPOLineItemComponents.findByPlant", query = "SELECT c FROM CmplxPRToPOLineItemComponents c WHERE c.plant = :plant"),
    @NamedQuery(name = "CmplxPRToPOLineItemComponents.findBySupplyArea", query = "SELECT c FROM CmplxPRToPOLineItemComponents c WHERE c.supplyArea = :supplyArea"),
    @NamedQuery(name = "CmplxPRToPOLineItemComponents.findByRequirementDate", query = "SELECT c FROM CmplxPRToPOLineItemComponents c WHERE c.requirementDate = :requirementDate"),
    @NamedQuery(name = "CmplxPRToPOLineItemComponents.findByLatestRequirementDate", query = "SELECT c FROM CmplxPRToPOLineItemComponents c WHERE c.latestRequirementDate = :latestRequirementDate"),
    @NamedQuery(name = "CmplxPRToPOLineItemComponents.findByStorageLocation", query = "SELECT c FROM CmplxPRToPOLineItemComponents c WHERE c.storageLocation = :storageLocation"),
    @NamedQuery(name = "CmplxPRToPOLineItemComponents.findByLinkId", query = "SELECT c FROM CmplxPRToPOLineItemComponents c WHERE c.linkId = :linkId"),
    @NamedQuery(name = "CmplxPRToPOLineItemComponents.findByBatch", query = "SELECT c FROM CmplxPRToPOLineItemComponents c WHERE c.batch = :batch"),
    @NamedQuery(name = "CmplxPRToPOLineItemComponents.findByItem", query = "SELECT c FROM CmplxPRToPOLineItemComponents c WHERE c.item = :item"),
    @NamedQuery(name = "CmplxPRToPOLineItemComponents.findByItemCategory", query = "SELECT c FROM CmplxPRToPOLineItemComponents c WHERE c.itemCategory = :itemCategory"),
    @NamedQuery(name = "CmplxPRToPOLineItemComponents.findByQuantityIsFixed", query = "SELECT c FROM CmplxPRToPOLineItemComponents c WHERE c.quantityIsFixed = :quantityIsFixed")})
public class CmplxPRToPOLineItemComponents implements Serializable {
    private static final long serialVersionUID = 1L;
    @Size(max = 50)
    @Column(name = "ProcInstId")
    private String procInstId;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "InsertionOrderID")
    private Integer insertionOrderID;
    @Size(max = 50)
    @Column(name = "MaterialCode")
    private String materialCode;
    @Size(max = 250)
    @Column(name = "Description")
    private String description;
    @Size(max = 10)
    @Column(name = "RequirementQuantity")
    private String requirementQuantity;
    @Size(max = 50)
    @Column(name = "Unit")
    private String unit;
    @Size(max = 100)
    @Column(name = "Plant")
    private String plant;
    @Size(max = 100)
    @Column(name = "SupplyArea")
    private String supplyArea;
    @Size(max = 50)
    @Column(name = "RequirementDate")
    private String requirementDate;
    @Size(max = 50)
    @Column(name = "LatestRequirementDate")
    private String latestRequirementDate;
    @Size(max = 16)
    @Column(name = "StorageLocation")
    private String storageLocation;
    @Size(max = 60)
    @Column(name = "LinkId")
    private String linkId;
    @Size(max = 50)
    @Column(name = "Batch")
    private String batch;
    @Size(max = 50)
    @Column(name = "Item")
    private String item;
    @Size(max = 50)
    @Column(name = "ItemCategory")
    private String itemCategory;
    @Size(max = 50)
    @Column(name = "QuantityIsFixed")
    private String quantityIsFixed;

    public CmplxPRToPOLineItemComponents() {
    }

    public CmplxPRToPOLineItemComponents(Integer insertionOrderID) {
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

    public String getMaterialCode() {
        return materialCode;
    }

    public void setMaterialCode(String materialCode) {
        this.materialCode = materialCode;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRequirementQuantity() {
        return requirementQuantity;
    }

    public void setRequirementQuantity(String requirementQuantity) {
        this.requirementQuantity = requirementQuantity;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getPlant() {
        return plant;
    }

    public void setPlant(String plant) {
        this.plant = plant;
    }

    public String getSupplyArea() {
        return supplyArea;
    }

    public void setSupplyArea(String supplyArea) {
        this.supplyArea = supplyArea;
    }

    public String getRequirementDate() {
        return requirementDate;
    }

    public void setRequirementDate(String requirementDate) {
        this.requirementDate = requirementDate;
    }

    public String getLatestRequirementDate() {
        return latestRequirementDate;
    }

    public void setLatestRequirementDate(String latestRequirementDate) {
        this.latestRequirementDate = latestRequirementDate;
    }

    public String getStorageLocation() {
        return storageLocation;
    }

    public void setStorageLocation(String storageLocation) {
        this.storageLocation = storageLocation;
    }

    public String getLinkId() {
        return linkId;
    }

    public void setLinkId(String linkId) {
        this.linkId = linkId;
    }

    public String getBatch() {
        return batch;
    }

    public void setBatch(String batch) {
        this.batch = batch;
    }

    public String getItem() {
        return item;
    }

    public void setItem(String item) {
        this.item = item;
    }

    public String getItemCategory() {
        return itemCategory;
    }

    public void setItemCategory(String itemCategory) {
        this.itemCategory = itemCategory;
    }

    public String getQuantityIsFixed() {
        return quantityIsFixed;
    }

    public void setQuantityIsFixed(String quantityIsFixed) {
        this.quantityIsFixed = quantityIsFixed;
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
        if (!(object instanceof CmplxPRToPOLineItemComponents)) {
            return false;
        }
        CmplxPRToPOLineItemComponents other = (CmplxPRToPOLineItemComponents) object;
        if ((this.insertionOrderID == null && other.insertionOrderID != null) || (this.insertionOrderID != null && !this.insertionOrderID.equals(other.insertionOrderID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.CmplxPRToPOLineItemComponents[ insertionOrderID=" + insertionOrderID + " ]";
    }
    
}
