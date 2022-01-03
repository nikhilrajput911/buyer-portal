/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.entities;

import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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
@Table(name = "NG_Cmplx_POCreation_Quantities_Weights")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NGCmplxPOCreationQuantitiesWeights.findAll", query = "SELECT n FROM NGCmplxPOCreationQuantitiesWeights n"),
    @NamedQuery(name = "NGCmplxPOCreationQuantitiesWeights.findByProcInstId", query = "SELECT n FROM NGCmplxPOCreationQuantitiesWeights n WHERE n.procInstId = :procInstId"),
    @NamedQuery(name = "NGCmplxPOCreationQuantitiesWeights.findByInsertionOrderID", query = "SELECT n FROM NGCmplxPOCreationQuantitiesWeights n WHERE n.insertionOrderID = :insertionOrderID"),
    @NamedQuery(name = "NGCmplxPOCreationQuantitiesWeights.findByPOQuantityUnit", query = "SELECT n FROM NGCmplxPOCreationQuantitiesWeights n WHERE n.pOQuantityUnit = :pOQuantityUnit"),
    @NamedQuery(name = "NGCmplxPOCreationQuantitiesWeights.findByPOQuantitySKUUnit", query = "SELECT n FROM NGCmplxPOCreationQuantitiesWeights n WHERE n.pOQuantitySKUUnit = :pOQuantitySKUUnit"),
    @NamedQuery(name = "NGCmplxPOCreationQuantitiesWeights.findByOrder1", query = "SELECT n FROM NGCmplxPOCreationQuantitiesWeights n WHERE n.order1 = :order1"),
    @NamedQuery(name = "NGCmplxPOCreationQuantitiesWeights.findByOrderUnit1", query = "SELECT n FROM NGCmplxPOCreationQuantitiesWeights n WHERE n.orderUnit1 = :orderUnit1"),
    @NamedQuery(name = "NGCmplxPOCreationQuantitiesWeights.findByOrder2", query = "SELECT n FROM NGCmplxPOCreationQuantitiesWeights n WHERE n.order2 = :order2"),
    @NamedQuery(name = "NGCmplxPOCreationQuantitiesWeights.findByOrderUnit2", query = "SELECT n FROM NGCmplxPOCreationQuantitiesWeights n WHERE n.orderUnit2 = :orderUnit2"),
    @NamedQuery(name = "NGCmplxPOCreationQuantitiesWeights.findByOrderPrice", query = "SELECT n FROM NGCmplxPOCreationQuantitiesWeights n WHERE n.orderPrice = :orderPrice"),
    @NamedQuery(name = "NGCmplxPOCreationQuantitiesWeights.findByOrderPriceUnit", query = "SELECT n FROM NGCmplxPOCreationQuantitiesWeights n WHERE n.orderPriceUnit = :orderPriceUnit"),
    @NamedQuery(name = "NGCmplxPOCreationQuantitiesWeights.findBySku", query = "SELECT n FROM NGCmplxPOCreationQuantitiesWeights n WHERE n.sku = :sku"),
    @NamedQuery(name = "NGCmplxPOCreationQuantitiesWeights.findBySKUUnit", query = "SELECT n FROM NGCmplxPOCreationQuantitiesWeights n WHERE n.sKUUnit = :sKUUnit"),
    @NamedQuery(name = "NGCmplxPOCreationQuantitiesWeights.findByLinkID", query = "SELECT n FROM NGCmplxPOCreationQuantitiesWeights n WHERE n.linkID = :linkID"),
    @NamedQuery(name = "NGCmplxPOCreationQuantitiesWeights.findByPOQuantity", query = "SELECT n FROM NGCmplxPOCreationQuantitiesWeights n WHERE n.pOQuantity = :pOQuantity"),
    @NamedQuery(name = "NGCmplxPOCreationQuantitiesWeights.findByPOQuantitySKU", query = "SELECT n FROM NGCmplxPOCreationQuantitiesWeights n WHERE n.pOQuantitySKU = :pOQuantitySKU")})
public class NGCmplxPOCreationQuantitiesWeights implements Serializable {
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
    @Column(name = "POQuantityUnit")
    private String pOQuantityUnit;
    @Size(max = 3)
    @Column(name = "POQuantitySKUUnit")
    private String pOQuantitySKUUnit;
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
    @Column(name = "SKUUnit")
    private String sKUUnit;
    @Size(max = 60)
    @Column(name = "LinkID")
    private String linkID;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "POQuantity")
    private BigDecimal pOQuantity;
    @Column(name = "POQuantitySKU")
    private BigDecimal pOQuantitySKU;

    public NGCmplxPOCreationQuantitiesWeights() {
    }

    public NGCmplxPOCreationQuantitiesWeights(Long insertionOrderID) {
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

    public String getPOQuantityUnit() {
        return pOQuantityUnit;
    }

    public void setPOQuantityUnit(String pOQuantityUnit) {
        this.pOQuantityUnit = pOQuantityUnit;
    }

    public String getPOQuantitySKUUnit() {
        return pOQuantitySKUUnit;
    }

    public void setPOQuantitySKUUnit(String pOQuantitySKUUnit) {
        this.pOQuantitySKUUnit = pOQuantitySKUUnit;
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

    public String getSKUUnit() {
        return sKUUnit;
    }

    public void setSKUUnit(String sKUUnit) {
        this.sKUUnit = sKUUnit;
    }

    public String getLinkID() {
        return linkID;
    }

    public void setLinkID(String linkID) {
        this.linkID = linkID;
    }

    public BigDecimal getPOQuantity() {
        return pOQuantity;
    }

    public void setPOQuantity(BigDecimal pOQuantity) {
        this.pOQuantity = pOQuantity;
    }

    public BigDecimal getPOQuantitySKU() {
        return pOQuantitySKU;
    }

    public void setPOQuantitySKU(BigDecimal pOQuantitySKU) {
        this.pOQuantitySKU = pOQuantitySKU;
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
        if (!(object instanceof NGCmplxPOCreationQuantitiesWeights)) {
            return false;
        }
        NGCmplxPOCreationQuantitiesWeights other = (NGCmplxPOCreationQuantitiesWeights) object;
        if ((this.insertionOrderID == null && other.insertionOrderID != null) || (this.insertionOrderID != null && !this.insertionOrderID.equals(other.insertionOrderID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.NGCmplxPOCreationQuantitiesWeights[ insertionOrderID=" + insertionOrderID + " ]";
    }
    
}
