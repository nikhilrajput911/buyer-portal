/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.entities;

import java.io.Serializable;
import java.math.BigDecimal;
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
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author admin
 */
@Entity
@Table(name = "NG_BP_Cmplx_POCreation_Quantities_Weights")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NGBPCmplxPOCreationQuantitiesWeights.findAll", query = "SELECT n FROM NGBPCmplxPOCreationQuantitiesWeights n"),
    @NamedQuery(name = "NGBPCmplxPOCreationQuantitiesWeights.findByProcInstId", query = "SELECT n FROM NGBPCmplxPOCreationQuantitiesWeights n WHERE n.procInstId = :procInstId"),
    @NamedQuery(name = "NGBPCmplxPOCreationQuantitiesWeights.findByInsertionOrderID", query = "SELECT n FROM NGBPCmplxPOCreationQuantitiesWeights n WHERE n.insertionOrderID = :insertionOrderID"),
    @NamedQuery(name = "NGBPCmplxPOCreationQuantitiesWeights.findByPOQuantityUnit", query = "SELECT n FROM NGBPCmplxPOCreationQuantitiesWeights n WHERE n.poQuantityUnit = :poQuantityUnit"),
    @NamedQuery(name = "NGBPCmplxPOCreationQuantitiesWeights.findByPOQuantitySKUUnit", query = "SELECT n FROM NGBPCmplxPOCreationQuantitiesWeights n WHERE n.poQuantitySKUUnit = :poQuantitySKUUnit"),
    @NamedQuery(name = "NGBPCmplxPOCreationQuantitiesWeights.findByOrder1", query = "SELECT n FROM NGBPCmplxPOCreationQuantitiesWeights n WHERE n.order1 = :order1"),
    @NamedQuery(name = "NGBPCmplxPOCreationQuantitiesWeights.findByOrderUnit1", query = "SELECT n FROM NGBPCmplxPOCreationQuantitiesWeights n WHERE n.orderUnit1 = :orderUnit1"),
    @NamedQuery(name = "NGBPCmplxPOCreationQuantitiesWeights.findByOrder2", query = "SELECT n FROM NGBPCmplxPOCreationQuantitiesWeights n WHERE n.order2 = :order2"),
    @NamedQuery(name = "NGBPCmplxPOCreationQuantitiesWeights.findByOrderUnit2", query = "SELECT n FROM NGBPCmplxPOCreationQuantitiesWeights n WHERE n.orderUnit2 = :orderUnit2"),
    @NamedQuery(name = "NGBPCmplxPOCreationQuantitiesWeights.findByOrderPrice", query = "SELECT n FROM NGBPCmplxPOCreationQuantitiesWeights n WHERE n.orderPrice = :orderPrice"),
    @NamedQuery(name = "NGBPCmplxPOCreationQuantitiesWeights.findByOrderPriceUnit", query = "SELECT n FROM NGBPCmplxPOCreationQuantitiesWeights n WHERE n.orderPriceUnit = :orderPriceUnit"),
    @NamedQuery(name = "NGBPCmplxPOCreationQuantitiesWeights.findBySku", query = "SELECT n FROM NGBPCmplxPOCreationQuantitiesWeights n WHERE n.sku = :sku"),
    @NamedQuery(name = "NGBPCmplxPOCreationQuantitiesWeights.findBySKUUnit", query = "SELECT n FROM NGBPCmplxPOCreationQuantitiesWeights n WHERE n.skuUnit = :skuUnit"),
    @NamedQuery(name = "NGBPCmplxPOCreationQuantitiesWeights.findByLinkID", query = "SELECT n FROM NGBPCmplxPOCreationQuantitiesWeights n WHERE n.linkID = :linkID"),
    @NamedQuery(name = "NGBPCmplxPOCreationQuantitiesWeights.findByPOQuantity", query = "SELECT n FROM NGBPCmplxPOCreationQuantitiesWeights n WHERE n.poQuantity = :poQuantity"),
    @NamedQuery(name = "NGBPCmplxPOCreationQuantitiesWeights.findByPOQuantitySKU", query = "SELECT n FROM NGBPCmplxPOCreationQuantitiesWeights n WHERE n.poQuantitySKU = :poQuantitySKU")})
public class NGBPCmplxPOCreationQuantitiesWeights implements Serializable {

    private static final long serialVersionUID = 1L;
    @Size(max = 50)
    @Column(name = "ProcInstId")
    private String procInstId;
    @Id
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "InsertionOrderID")
    private Long insertionOrderID;
    @Size(max = 3)
    @Column(name = "PoQuantityUnit")
    private String poQuantityUnit;
    @Size(max = 3)
    @Column(name = "PoQuantitySKUUnit")
    private String poQuantitySKUUnit;
    @Size(max = 13)
    @Column(name = "Order1")
    private String order1;
    @Size(max = 13)
    @Column(name = "OrderUnit1")
    private String orderUnit1;
    @Size(max = 13)
    @Column(name = "Order2")
    private String order2;
    @Size(max = 13)
    @Column(name = "OrderUnit2")
    private String orderUnit2;
    @Size(max = 13)
    @Column(name = "OrderPrice")
    private String orderPrice;
    @Size(max = 13)
    @Column(name = "OrderPriceUnit")
    private String orderPriceUnit;
    @Size(max = 13)
    @Column(name = "SKU")
    private String sku;
    @Size(max = 13)
    @Column(name = "SkuUnit")
    private String skuUnit;
    @Size(max = 60)
    @Column(name = "LinkID")
    private String linkID;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "PoQuantity")
    private BigDecimal poQuantity;
    @Column(name = "PoQuantitySKU")
    private BigDecimal poQuantitySKU;
    @Size(max = 50)
    @Column(name = "PrItemNumber")
    private String prItemNumber;
    @Column(name = "Net_weight")
    private BigDecimal netweight;
    @Column(name = "Gross_weight")
    private BigDecimal grossweight;
    @Column(name = "Volume")
    private BigDecimal volume;
    @Column(name = "Points")
    private BigDecimal points;

    @Column(name = "Net_weight2")
    private BigDecimal netweight2;
    @Column(name = "Gross_weight2")
    private BigDecimal grossweight2;
    @Column(name = "Volume2")
    private BigDecimal volume2;
    @Column(name = "Points2")
    private BigDecimal points2;

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

    @OneToOne(targetEntity = NGBPExtPOCreation.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "POCreation_Id", referencedColumnName = "Id")
    private NGBPCmplxPOCreationLineItemPO nGBPCmplxPOCreationLineItemPO;

    public NGBPCmplxPOCreationLineItemPO getnGBPCmplxPOCreationLineItemPO() {
        return nGBPCmplxPOCreationLineItemPO;
    }

    public void setnGBPCmplxPOCreationLineItemPO(NGBPCmplxPOCreationLineItemPO nGBPCmplxPOCreationLineItemPO) {
        this.nGBPCmplxPOCreationLineItemPO = nGBPCmplxPOCreationLineItemPO;
    }

    public NGBPCmplxPOCreationQuantitiesWeights() {
    }

    public NGBPCmplxPOCreationQuantitiesWeights(Long insertionOrderID) {
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

    public String getOrder1() {
        return order1;
    }

    public void setOrder1(String order1) {
        this.order1 = order1;
    }

    public String getOrderUnit1() {
        return orderUnit1;
    }

    public void setOrderUnit1(String orderUnit1) {
        this.orderUnit1 = orderUnit1;
    }

    public String getOrder2() {
        return order2;
    }

    public void setOrder2(String order2) {
        this.order2 = order2;
    }

    public String getOrderUnit2() {
        return orderUnit2;
    }

    public void setOrderUnit2(String orderUnit2) {
        this.orderUnit2 = orderUnit2;
    }

    public String getOrderPrice() {
        return orderPrice;
    }

    public void setOrderPrice(String orderPrice) {
        this.orderPrice = orderPrice;
    }

    public String getOrderPriceUnit() {
        return orderPriceUnit;
    }

    public void setOrderPriceUnit(String orderPriceUnit) {
        this.orderPriceUnit = orderPriceUnit;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getLinkID() {
        return linkID;
    }

    public void setLinkID(String linkID) {
        this.linkID = linkID;
    }

    public String getPoQuantityUnit() {
        return poQuantityUnit;
    }

    public void setPoQuantityUnit(String poQuantityUnit) {
        this.poQuantityUnit = poQuantityUnit;
    }

    public String getPoQuantitySKUUnit() {
        return poQuantitySKUUnit;
    }

    public void setPoQuantitySKUUnit(String poQuantitySKUUnit) {
        this.poQuantitySKUUnit = poQuantitySKUUnit;
    }

    public String getSkuUnit() {
        return skuUnit;
    }

    public void setSkuUnit(String skuUnit) {
        this.skuUnit = skuUnit;
    }

    public BigDecimal getPoQuantity() {
        return poQuantity;
    }

    public void setPoQuantity(BigDecimal poQuantity) {
        this.poQuantity = poQuantity;
    }

    public BigDecimal getPoQuantitySKU() {
        return poQuantitySKU;
    }

    public void setPoQuantitySKU(BigDecimal poQuantitySKU) {
        this.poQuantitySKU = poQuantitySKU;
    }

    public String getPrItemNumber() {
        return prItemNumber;
    }

    public void setPrItemNumber(String prItemNumber) {
        this.prItemNumber = prItemNumber;
    }
    
    public BigDecimal getNetweight() {
        return netweight;
    }

    public void setNetweight(BigDecimal netweight) {
        this.netweight = netweight;
    }

    public BigDecimal getGrossweight() {
        return grossweight;
    }

    public void setGrossweight(BigDecimal grossweight) {
        this.grossweight = grossweight;
    }

    public BigDecimal getVolume() {
        return volume;
    }

    public void setVolume(BigDecimal volume) {
        this.volume = volume;
    }

    public BigDecimal getPoints() {
        return points;
    }

    public void setPoints(BigDecimal points) {
        this.points = points;
    }

    public BigDecimal getNetweight2() {
        return netweight2;
    }

    public void setNetweight2(BigDecimal netweight2) {
        this.netweight2 = netweight2;
    }

    public BigDecimal getGrossweight2() {
        return grossweight2;
    }

    public void setGrossweight2(BigDecimal grossweight2) {
        this.grossweight2 = grossweight2;
    }

    public BigDecimal getVolume2() {
        return volume2;
    }

    public void setVolume2(BigDecimal volume2) {
        this.volume2 = volume2;
    }

    public BigDecimal getPoints2() {
        return points2;
    }

    public void setPoints2(BigDecimal points2) {
        this.points2 = points2;
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
        hash += (insertionOrderID != null ? insertionOrderID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof NGBPCmplxPOCreationQuantitiesWeights)) {
            return false;
        }
        NGBPCmplxPOCreationQuantitiesWeights other = (NGBPCmplxPOCreationQuantitiesWeights) object;
        if ((this.insertionOrderID == null && other.insertionOrderID != null) || (this.insertionOrderID != null && !this.insertionOrderID.equals(other.insertionOrderID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.NGBPCmplxPOCreationQuantitiesWeights[ insertionOrderID=" + insertionOrderID + " ]";
    }

}
