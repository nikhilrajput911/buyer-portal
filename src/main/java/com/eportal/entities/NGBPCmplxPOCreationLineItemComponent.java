/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Sunny Kumar
 */
@Entity
@Table(name = "NG_BP_Cmplx_POCreation_LineItem_Component")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemComponent.findAll", query = "SELECT n FROM NGBPCmplxPOCreationLineItemComponent n"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemComponent.findById", query = "SELECT n FROM NGBPCmplxPOCreationLineItemComponent n WHERE n.id = :id"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemComponent.findByDescription", query = "SELECT n FROM NGBPCmplxPOCreationLineItemComponent n WHERE n.description = :description"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemComponent.findByLinkId", query = "SELECT n FROM NGBPCmplxPOCreationLineItemComponent n WHERE n.linkId = :linkId"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemComponent.findByMaterialCode", query = "SELECT n FROM NGBPCmplxPOCreationLineItemComponent n WHERE n.materialCode = :materialCode"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemComponent.findByPlant", query = "SELECT n FROM NGBPCmplxPOCreationLineItemComponent n WHERE n.plant = :plant"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemComponent.findByPrItemNumber", query = "SELECT n FROM NGBPCmplxPOCreationLineItemComponent n WHERE n.prItemNumber = :prItemNumber"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemComponent.findByProductStorageLocation", query = "SELECT n FROM NGBPCmplxPOCreationLineItemComponent n WHERE n.productStorageLocation = :productStorageLocation"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemComponent.findByQuantity", query = "SELECT n FROM NGBPCmplxPOCreationLineItemComponent n WHERE n.quantity = :quantity"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemComponent.findByRequirementDate", query = "SELECT n FROM NGBPCmplxPOCreationLineItemComponent n WHERE n.requirementDate = :requirementDate"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemComponent.findBySupplyArea", query = "SELECT n FROM NGBPCmplxPOCreationLineItemComponent n WHERE n.supplyArea = :supplyArea"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemComponent.findByUnit", query = "SELECT n FROM NGBPCmplxPOCreationLineItemComponent n WHERE n.unit = :unit")})
public class NGBPCmplxPOCreationLineItemComponent implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Id")
    private Integer id;
    @Size(max = 50)
    @Column(name = "Description")
    private String description;
    @Size(max = 10)
    @Column(name = "LinkId")
    private String linkId;
    @Size(max = 25)
    @Column(name = "MaterialCode")
    private String materialCode;
    @Size(max = 40)
    @Column(name = "Plant")
    private String plant;
    @Size(max = 50)
    @Column(name = "PrItemNumber")
    private String prItemNumber;
    @Size(max = 20)
    @Column(name = "ProductStorageLocation")
    private String productStorageLocation;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "Quantity")
    private BigDecimal quantity;
    @Column(name = "RequirementDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date requirementDate;
    @Size(max = 15)
    @Column(name = "SupplyArea")
    private String supplyArea;
    @Size(max = 5)
    @Column(name = "Unit")
    private String unit;
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

    @JsonIgnore
    @ManyToOne(cascade = {CascadeType.ALL, CascadeType.MERGE, CascadeType.PERSIST}, fetch = FetchType.LAZY)
    private NGBPCmplxPOCreationLineItemPO pOCreationLineItemPO;

    public NGBPCmplxPOCreationLineItemPO getpOCreationLineItemPO() {
        return pOCreationLineItemPO;
    }

    public void setpOCreationLineItemPO(NGBPCmplxPOCreationLineItemPO pOCreationLineItemPO) {
        this.pOCreationLineItemPO = pOCreationLineItemPO;
    }
    
    public NGBPCmplxPOCreationLineItemComponent() {
    }

    public NGBPCmplxPOCreationLineItemComponent(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLinkId() {
        return linkId;
    }

    public void setLinkId(String linkId) {
        this.linkId = linkId;
    }

    public String getMaterialCode() {
        return materialCode;
    }

    public void setMaterialCode(String materialCode) {
        this.materialCode = materialCode;
    }

    public String getPlant() {
        return plant;
    }

    public void setPlant(String plant) {
        this.plant = plant;
    }

    public String getPrItemNumber() {
        return prItemNumber;
    }

    public void setPrItemNumber(String prItemNumber) {
        this.prItemNumber = prItemNumber;
    }

    public String getProductStorageLocation() {
        return productStorageLocation;
    }

    public void setProductStorageLocation(String productStorageLocation) {
        this.productStorageLocation = productStorageLocation;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public Date getRequirementDate() {
        return requirementDate;
    }

    public void setRequirementDate(Date requirementDate) {
        this.requirementDate = requirementDate;
    }

    public String getSupplyArea() {
        return supplyArea;
    }

    public void setSupplyArea(String supplyArea) {
        this.supplyArea = supplyArea;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
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

    public String getDistributionKey() {
        return distributionKey;
    }

    public void setDistributionKey(String distributionKey) {
        this.distributionKey = distributionKey;
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
    
    

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof NGBPCmplxPOCreationLineItemComponent)) {
            return false;
        }
        NGBPCmplxPOCreationLineItemComponent other = (NGBPCmplxPOCreationLineItemComponent) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.NGBPCmplxPOCreationLineItemComponent[ id=" + id + " ]";
    }
    
}
