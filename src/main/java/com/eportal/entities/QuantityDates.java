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
 * @author Sunny Kumar
 */
@Entity
@Table(name = "Ng_BP_QuantityDates")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "QuantityDates.findAll", query = "SELECT q FROM QuantityDates q"),
    @NamedQuery(name = "QuantityDates.findById", query = "SELECT q FROM QuantityDates q WHERE q.id = :id"),
    @NamedQuery(name = "QuantityDates.findByPOQuantity", query = "SELECT q FROM QuantityDates q WHERE q.poQuantity = :pOQuantity"),
    @NamedQuery(name = "QuantityDates.findByUnitPOQuantity", query = "SELECT q FROM QuantityDates q WHERE q.unitPOQuantity = :unitPOQuantity"),
    @NamedQuery(name = "QuantityDates.findByPOQuantityInSKU", query = "SELECT q FROM QuantityDates q WHERE q.poQuantityInSKU = :pOQuantityInSKU"),
    @NamedQuery(name = "QuantityDates.findByUnitPOQuantityInSKU", query = "SELECT q FROM QuantityDates q WHERE q.unitPOQuantityInSKU = :unitPOQuantityInSKU"),
    @NamedQuery(name = "QuantityDates.findByOrderUnit", query = "SELECT q FROM QuantityDates q WHERE q.orderUnit = :orderUnit"),
    @NamedQuery(name = "QuantityDates.findByUnitOrderUnit", query = "SELECT q FROM QuantityDates q WHERE q.unitOrderUnit = :unitOrderUnit"),
    @NamedQuery(name = "QuantityDates.findByOrderPriceUnit", query = "SELECT q FROM QuantityDates q WHERE q.orderPriceUnit = :orderPriceUnit"),
    @NamedQuery(name = "QuantityDates.findByUnitOrderPriceUnit", query = "SELECT q FROM QuantityDates q WHERE q.unitOrderPriceUnit = :unitOrderPriceUnit"),
    @NamedQuery(name = "QuantityDates.findByOrderUnitSKU", query = "SELECT q FROM QuantityDates q WHERE q.orderUnitSKU = :orderUnitSKU"),
    @NamedQuery(name = "QuantityDates.findByUnitOrderUnitSKU", query = "SELECT q FROM QuantityDates q WHERE q.unitOrderUnitSKU = :unitOrderUnitSKU"),
    @NamedQuery(name = "QuantityDates.findBySku", query = "SELECT q FROM QuantityDates q WHERE q.sku = :sku"),
    @NamedQuery(name = "QuantityDates.findByUnitSKU", query = "SELECT q FROM QuantityDates q WHERE q.unitSKU = :unitSKU"),
    @NamedQuery(name = "QuantityDates.findByLineItemNumber", query = "SELECT q FROM QuantityDates q WHERE q.lineItemNumber = :lineItemNumber")})
public class QuantityDates implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
//    @NotNull
    @Column(name = "Id")
    private Integer id;
    @Size(max = 15)
    @Column(name = "PoQuantity")
    private String poQuantity;
    @Size(max = 6)
    @Column(name = "Unit_POQuantity")
    private String unitPOQuantity;
    @Size(max = 15)
    @Column(name = "PoQuantityInSKU")
    private String poQuantityInSKU;
    @Size(max = 6)
    @Column(name = "Unit_POQuantityInSKU")
    private String unitPOQuantityInSKU;
    @Size(max = 20)
    @Column(name = "OrderUnit")
    private String orderUnit;
    @Size(max = 4)
    @Column(name = "Unit_OrderUnit")
    private String unitOrderUnit;
    @Size(max = 20)
    @Column(name = "OrderPriceUnit")
    private String orderPriceUnit;
    @Size(max = 4)
    @Column(name = "Unit_OrderPriceUnit")
    private String unitOrderPriceUnit;
    @Size(max = 20)
    @Column(name = "OrderUnitSKU")
    private String orderUnitSKU;
    @Size(max = 4)
    @Column(name = "Unit_OrderUnitSKU")
    private String unitOrderUnitSKU;
    @Size(max = 20)
    @Column(name = "SKU")
    private String sku;
    @Size(max = 4)
    @Column(name = "Unit_SKU")
    private String unitSKU;
    @Size(max = 50)
    @Column(name = "LineItemNumber")
    private String lineItemNumber;
    @Size(max = 20)
    @Column(name = "PrItemNumber")
    private String prItemNumber;
    @Size(max = 10)
    @Column(name = "LinkId")
    private String linkId;
    @Size(max = 20)
    @Column(name = "NetWeight")
    private String netWeight;
    @Size(max = 20)
    @Column(name = "GrossWeight")
    private String grossWeight;
    @Size(max = 20)
    @Column(name = "Volume")
    private String volume;
    @Size(max = 20)
    @Column(name = "Points")
    private String points;
    @Size(max = 10)
    @Column(name = "NetWeightUnit")
    private String netWeightUnit;
    @Size(max = 10)
    @Column(name = "GrossWeightUnit")
    private String grossWeightUnit;
    @Size(max = 10)
    @Column(name = "VolumeUnit")
    private String volumeUnit;
    @Size(max = 10)
    @Column(name = "PointsUnit")
    private String pointsUnit;    
    @Size(max = 10)
    @Column(name = "NetWeightPerPrice")
    private String netWeightPerPrice;
    @Size(max = 10)
    @Column(name = "GrossWeightPerPrice")
    private String grossWeightPerPrice;
    @Size(max = 10)
    @Column(name = "VolumePerPrice")
    private String volumePerPrice;
    @Size(max = 10)
    @Column(name = "PointsPerPrice")
    private String pointsPerPrice;    
    @Size(max = 10)
    @Column(name = "NetWeightOrderUnit")
    private String netWeightOrderUnit;
    @Size(max = 10)
    @Column(name = "GrossWeightOrderUnit")
    private String grossWeightOrderUnit;
    @Size(max = 10)
    @Column(name = "VolumeUnitOrder")
    private String volumeOrderUnit;
    @Size(max = 10)
    @Column(name = "PointsOrderUnit")
    private String pointsOrderUnit;
    @Size(max = 20)
    @Column(name = "NetWeight2")
    private String netWeight2;
    @Size(max = 20)
    @Column(name = "GrossWeight2")
    private String grossWeight2;
    @Size(max = 20)
    @Column(name = "Volume2")
    private String volume2;
    @Size(max = 20)
    @Column(name = "Points2")
    private String points2;
    @Size(max = 10)
    @Column(name = "NetWeightUnit2")
    private String netWeightUnit2;
    @Size(max = 10)
    @Column(name = "GrossWeightUnit2")
    private String grossWeightUnit2;
    @Size(max = 10)
    @Column(name = "VolumeUnit2")
    private String volumeUnit2;
    @Size(max = 10)
    @Column(name = "PointsUnit2")
    private String pointsUnit2;
    
    public QuantityDates() {
    }

    public QuantityDates(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUnitPOQuantity() {
        return unitPOQuantity;
    }

    public void setUnitPOQuantity(String unitPOQuantity) {
        this.unitPOQuantity = unitPOQuantity;
    }

    public String getUnitPOQuantityInSKU() {
        return unitPOQuantityInSKU;
    }

    public void setUnitPOQuantityInSKU(String unitPOQuantityInSKU) {
        this.unitPOQuantityInSKU = unitPOQuantityInSKU;
    }

    public String getOrderUnit() {
        return orderUnit;
    }

    public void setOrderUnit(String orderUnit) {
        this.orderUnit = orderUnit;
    }

    public String getUnitOrderUnit() {
        return unitOrderUnit;
    }

    public void setUnitOrderUnit(String unitOrderUnit) {
        this.unitOrderUnit = unitOrderUnit;
    }

    public String getOrderPriceUnit() {
        return orderPriceUnit;
    }

    public void setOrderPriceUnit(String orderPriceUnit) {
        this.orderPriceUnit = orderPriceUnit;
    }

    public String getUnitOrderPriceUnit() {
        return unitOrderPriceUnit;
    }

    public void setUnitOrderPriceUnit(String unitOrderPriceUnit) {
        this.unitOrderPriceUnit = unitOrderPriceUnit;
    }

    public String getOrderUnitSKU() {
        return orderUnitSKU;
    }

    public void setOrderUnitSKU(String orderUnitSKU) {
        this.orderUnitSKU = orderUnitSKU;
    }

    public String getUnitOrderUnitSKU() {
        return unitOrderUnitSKU;
    }

    public void setUnitOrderUnitSKU(String unitOrderUnitSKU) {
        this.unitOrderUnitSKU = unitOrderUnitSKU;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getUnitSKU() {
        return unitSKU;
    }

    public void setUnitSKU(String unitSKU) {
        this.unitSKU = unitSKU;
    }

    public String getLineItemNumber() {
        return lineItemNumber;
    }

    public void setLineItemNumber(String lineItemNumber) {
        this.lineItemNumber = lineItemNumber;
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
    public String getPoQuantity() {
        return poQuantity;
    }

    public void setPoQuantity(String poQuantity) {
        this.poQuantity = poQuantity;
    }

    public String getPoQuantityInSKU() {
        return poQuantityInSKU;
    }

    public void setPoQuantityInSKU(String poQuantityInSKU) {
        this.poQuantityInSKU = poQuantityInSKU;
    }
    
    public String getNetWeight() {
        return netWeight;
    }

    public void setNetWeight(String netWeight) {
        this.netWeight = netWeight;
    }

    public String getGrossWeight() {
        return grossWeight;
    }

    public void setGrossWeight(String grossWeight) {
        this.grossWeight = grossWeight;
    }

    public String getVolume() {
        return volume;
    }

    public void setVolume(String volume) {
        this.volume = volume;
    }

    public String getPoints() {
        return points;
    }

    public void setPoints(String points) {
        this.points = points;
    }

    public String getNetWeightUnit() {
        return netWeightUnit;
    }

    public void setNetWeightUnit(String netWeightUnit) {
        this.netWeightUnit = netWeightUnit;
    }

    public String getGrossWeightUnit() {
        return grossWeightUnit;
    }

    public void setGrossWeightUnit(String grossWeightUnit) {
        this.grossWeightUnit = grossWeightUnit;
    }

    public String getVolumeUnit() {
        return volumeUnit;
    }

    public void setVolumeUnit(String volumeUnit) {
        this.volumeUnit = volumeUnit;
    }

    public String getPointsUnit() {
        return pointsUnit;
    }

    public void setPointsUnit(String pointsUnit) {
        this.pointsUnit = pointsUnit;
    }

    public String getNetWeightOrderUnit() {
        return netWeightOrderUnit;
    }

    public void setNetWeightOrderUnit(String netWeightOrderUnit) {
        this.netWeightOrderUnit = netWeightOrderUnit;
    }

    public String getGrossWeightOrderUnit() {
        return grossWeightOrderUnit;
    }

    public void setGrossWeightOrderUnit(String grossWeightOrderUnit) {
        this.grossWeightOrderUnit = grossWeightOrderUnit;
    }

    public String getVolumeOrderUnit() {
        return volumeOrderUnit;
    }

    public void setVolumeOrderUnit(String volumeOrderUnit) {
        this.volumeOrderUnit = volumeOrderUnit;
    }

    public String getPointsOrderUnit() {
        return pointsOrderUnit;
    }

    public void setPointsOrderUnit(String pointsOrderUnit) {
        this.pointsOrderUnit = pointsOrderUnit;
    }

    public String getNetWeight2() {
        return netWeight2;
    }

    public void setNetWeight2(String netWeight2) {
        this.netWeight2 = netWeight2;
    }

    public String getGrossWeight2() {
        return grossWeight2;
    }

    public void setGrossWeight2(String grossWeight2) {
        this.grossWeight2 = grossWeight2;
    }

    public String getVolume2() {
        return volume2;
    }

    public void setVolume2(String volume2) {
        this.volume2 = volume2;
    }

    public String getPoints2() {
        return points2;
    }

    public void setPoints2(String points2) {
        this.points2 = points2;
    }

    public String getNetWeightUnit2() {
        return netWeightUnit2;
    }

    public void setNetWeightUnit2(String netWeightUnit2) {
        this.netWeightUnit2 = netWeightUnit2;
    }

    public String getGrossWeightUnit2() {
        return grossWeightUnit2;
    }

    public void setGrossWeightUnit2(String grossWeightUnit2) {
        this.grossWeightUnit2 = grossWeightUnit2;
    }

    public String getVolumeUnit2() {
        return volumeUnit2;
    }

    public void setVolumeUnit2(String volumeUnit2) {
        this.volumeUnit2 = volumeUnit2;
    }

    public String getPointsUnit2() {
        return pointsUnit2;
    }

    public void setPointsUnit2(String pointsUnit2) {
        this.pointsUnit2 = pointsUnit2;
    }

    public String getNetWeightPerPrice() {
        return netWeightPerPrice;
    }

    public void setNetWeightPerPrice(String netWeightPerPrice) {
        this.netWeightPerPrice = netWeightPerPrice;
    }

    public String getGrossWeightPerPrice() {
        return grossWeightPerPrice;
    }

    public void setGrossWeightPerPrice(String grossWeightPerPrice) {
        this.grossWeightPerPrice = grossWeightPerPrice;
    }

    public String getVolumePerPrice() {
        return volumePerPrice;
    }

    public void setVolumePerPrice(String volumePerPrice) {
        this.volumePerPrice = volumePerPrice;
    }

    public String getPointsPerPrice() {
        return pointsPerPrice;
    }

    public void setPointsPerPrice(String pointsPerPrice) {
        this.pointsPerPrice = pointsPerPrice;
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
        if (!(object instanceof QuantityDates)) {
            return false;
        }
        QuantityDates other = (QuantityDates) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.QuantityDates[ id=" + id + " ]";
    }
    
}
