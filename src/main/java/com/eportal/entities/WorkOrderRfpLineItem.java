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
import javax.persistence.Id;
import javax.persistence.JoinColumn;
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
 * @author admin
 */
@Entity
@Table(name = "NG_BP_WorkOrderRfpLineItem")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "WorkOrderRfpLineItem.findAll", query = "SELECT w FROM WorkOrderRfpLineItem w"),
    @NamedQuery(name = "WorkOrderRfpLineItem.findById", query = "SELECT w FROM WorkOrderRfpLineItem w WHERE w.id = :id"),
    @NamedQuery(name = "WorkOrderRfpLineItem.findByDeliveryDate", query = "SELECT w FROM WorkOrderRfpLineItem w WHERE w.deliveryDate = :deliveryDate"),
    @NamedQuery(name = "WorkOrderRfpLineItem.findByQuantity", query = "SELECT w FROM WorkOrderRfpLineItem w WHERE w.quantity = :quantity"),
    @NamedQuery(name = "WorkOrderRfpLineItem.findByNotesToSupplier", query = "SELECT w FROM WorkOrderRfpLineItem w WHERE w.notesToSupplier = :notesToSupplier")})
public class WorkOrderRfpLineItem implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Id")
    private Integer id;
    @Column(name = "DeliveryDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date deliveryDate;
    @Size(max = 10)
    @Column(name = "Quantity")
    private String quantity;
    @Size(max = 2147483647)
    @Column(name = "NotesToSupplier")
    private String notesToSupplier;
    @Size(max = 20)
    @Column(name = "ItemNumber")
    private String itemNumber;
    @Size(max = 10)
    @Column(name = "LocalPurchase")
    private String localPurchase;
    
    @JoinColumn(name = "WorkOrderRfpHeaderId", referencedColumnName = "Id")
    @ManyToOne(optional = false)
    private WorkOrderRfpHeader workOrderRfpHeaderID;
    @JoinColumn(name = "MaterialMasterId", referencedColumnName = "Sno")
    @ManyToOne(optional = false)
    private MasterMaterialGeneral materialMatserId;
    @JoinColumn(name = "PlantMasterId", referencedColumnName = "Sno")
    @ManyToOne(optional = false)
    private MasterPlant plantMasterId;

    public WorkOrderRfpLineItem() {
    }

    public WorkOrderRfpLineItem(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(Date deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public String getNotesToSupplier() {
        return notesToSupplier;
    }

    public void setNotesToSupplier(String notesToSupplier) {
        this.notesToSupplier = notesToSupplier;
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
        if (!(object instanceof WorkOrderRfpLineItem)) {
            return false;
        }
        WorkOrderRfpLineItem other = (WorkOrderRfpLineItem) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.WorkOrderRfpLineItem[ id=" + id + " ]";
    }

    public WorkOrderRfpHeader getWorkOrderRfpHeaderID() {
        return workOrderRfpHeaderID;
    }

    public void setWorkOrderRfpHeaderID(WorkOrderRfpHeader workOrderRfpHeaderID) {
        this.workOrderRfpHeaderID = workOrderRfpHeaderID;
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

    public String getItemNumber() {
        return itemNumber;
    }

    public void setItemNumber(String itemNumber) {
        this.itemNumber = itemNumber;
    }

    public String getLocalPurchase() {
        return localPurchase;
    }

    public void setLocalPurchase(String localPurchase) {
        this.localPurchase = localPurchase;
    }
    
}
