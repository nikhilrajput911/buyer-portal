/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.entities;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
@Table(name = "NG_BP_Component")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Component.findAll", query = "SELECT c FROM Component c"),
    @NamedQuery(name = "Component.findById", query = "SELECT c FROM Component c WHERE c.id = :id"),
    @NamedQuery(name = "Component.findByMaterialCode", query = "SELECT c FROM Component c WHERE c.materialCode = :materialCode"),
    @NamedQuery(name = "Component.findByDescription", query = "SELECT c FROM Component c WHERE c.description = :description"),
    @NamedQuery(name = "Component.findByPlant", query = "SELECT c FROM Component c WHERE c.plant = :plant"),
    @NamedQuery(name = "Component.findByQuantity", query = "SELECT c FROM Component c WHERE c.quantity = :quantity"),
    @NamedQuery(name = "Component.findByUnit", query = "SELECT c FROM Component c WHERE c.unit = :unit"),
    @NamedQuery(name = "Component.findByProductStorageLocation", query = "SELECT c FROM Component c WHERE c.productStorageLocation = :productStorageLocation"),
    @NamedQuery(name = "Component.findBySupplyArea", query = "SELECT c FROM Component c WHERE c.supplyArea = :supplyArea"),
    @NamedQuery(name = "Component.findByRequirementDate", query = "SELECT c FROM Component c WHERE c.requirementDate = :requirementDate"),
    @NamedQuery(name = "Component.findByLineItemnumber", query = "SELECT c FROM Component c WHERE c.lineItemnumber = :lineItemnumber")})
public class Component implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
//    @NotNull
    @Column(name = "Id")
    private Integer id;
    @Size(max = 25)
    @Column(name = "MaterialCode")
    private String materialCode;
    @Size(max = 50)
    @Column(name = "Description")
    private String description;
    @Size(max = 40)
    @Column(name = "Plant")
    private String plant;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "Quantity")
    private BigDecimal quantity;
    @Size(max = 5)
    @Column(name = "Unit")
    private String unit;
    @Size(max = 20)
    @Column(name = "ProductStorageLocation")
    private String productStorageLocation;
    @Size(max = 15)
    @Column(name = "SupplyArea")
    private String supplyArea;
    @Column(name = "RequirementDate")
    @Temporal(TemporalType.DATE)
    private Date requirementDate;
    @Size(max = 20)
    @Column(name = "LineItemnumber")
    private String lineItemnumber;
    @Size(max = 20)
    @Column(name = "PrItemNumber")
    private String prItemNumber;
    @Size(max = 10)
    @Column(name = "LinkId")
    private String linkId;
    @Size(max = 20)
    @Column(name = "QtyIsFixed")
    private String qtyIsFixed;
    @Column(name = "LatestRequirementDate")
    @Temporal(TemporalType.DATE)
    private Date latestRequirementDate;
    @Size(max = 30)
    @Column(name = "DistributionKey")
    private String distributionKey;
    @Size(max = 30)
    @Column(name = "Batch")
    private String batch;
    @Size(max = 25)
    @Column(name = "StorageLocation")
    private String storageLocation;
    @Size(max = 20)
    @Column(name = "ReqDateAsString")
    private String reqDateAsString;
    @Size(max = 20)
    @Column(name = "LatestReqDateAsString")
    private String latestReqDateAsString;
    @Size(max = 10)
    @Column(name = "ChangeId")
    private String changeId;
    
    public Component() {
    }

    public Component(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public String getPlant() {
        return plant;
    }

    public void setPlant(String plant) {
        this.plant = plant;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getProductStorageLocation() {
        return productStorageLocation;
    }

    public void setProductStorageLocation(String productStorageLocation) {
        this.productStorageLocation = productStorageLocation;
    }

    public String getSupplyArea() {
        return supplyArea;
    }

    public void setSupplyArea(String supplyArea) {
        this.supplyArea = supplyArea;
    }

    public Date getRequirementDate() {
        return requirementDate;
    }

    public void setRequirementDate(Date requirementDate) {
        this.requirementDate = requirementDate;
    }

    public String getLineItemnumber() {
        return lineItemnumber;
    }

    public void setLineItemnumber(String lineItemnumber) {
        this.lineItemnumber = lineItemnumber;
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

    public String getQtyIsFixed() {
        return qtyIsFixed;
    }

    public void setQtyIsFixed(String qtyIsFixed) {
        this.qtyIsFixed = qtyIsFixed;
    }

    public Date getLatestRequirementDate() {
        return latestRequirementDate;
    }

    public void setLatestRequirementDate(Date latestRequirementDate) {
        this.latestRequirementDate = latestRequirementDate;
    }

    public String getDistributionKey() {
        return distributionKey;
    }

    public void setDistributionKey(String distributionKey) {
        this.distributionKey = distributionKey;
    }

    public String getBatch() {
        return batch;
    }

    public void setBatch(String batch) {
        this.batch = batch;
    }

    public String getStorageLocation() {
        return storageLocation;
    }

    public void setStorageLocation(String storageLocation) {
        this.storageLocation = storageLocation;
    }

    public String getReqDateAsString() {
        return reqDateAsString;
    }

    public void setReqDateAsString(String reqDateAsString) {
        this.reqDateAsString = reqDateAsString;
    }

    public String getLatestReqDateAsString() {
        return latestReqDateAsString;
    }

    public void setLatestReqDateAsString(String latestReqDateAsString) {
        this.latestReqDateAsString = latestReqDateAsString;
    }
    
    public String getChangeId() {
        return changeId;
    }

    public void setChangeId(String changeId) {
        this.changeId = changeId;
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
        if (!(object instanceof Component)) {
            return false;
        }
        Component other = (Component) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.Component[ id=" + id + " ]";
    }
    
}
