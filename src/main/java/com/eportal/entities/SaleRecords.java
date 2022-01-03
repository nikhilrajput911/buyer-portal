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
@Table(name = "SaleRecords")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "SaleRecords.findAll", query = "SELECT s FROM SaleRecords s"),
    @NamedQuery(name = "SaleRecords.findById", query = "SELECT s FROM SaleRecords s WHERE s.id = :id"),
    @NamedQuery(name = "SaleRecords.findByRegion", query = "SELECT s FROM SaleRecords s WHERE s.region = :region"),
    @NamedQuery(name = "SaleRecords.findByCountry", query = "SELECT s FROM SaleRecords s WHERE s.country = :country"),
    @NamedQuery(name = "SaleRecords.findByItemType", query = "SELECT s FROM SaleRecords s WHERE s.itemType = :itemType"),
    @NamedQuery(name = "SaleRecords.findBySalesChannel", query = "SELECT s FROM SaleRecords s WHERE s.salesChannel = :salesChannel"),
    @NamedQuery(name = "SaleRecords.findByOrderPriority", query = "SELECT s FROM SaleRecords s WHERE s.orderPriority = :orderPriority"),
    @NamedQuery(name = "SaleRecords.findByOrderId", query = "SELECT s FROM SaleRecords s WHERE s.orderId = :orderId"),
    @NamedQuery(name = "SaleRecords.findByUnitSold", query = "SELECT s FROM SaleRecords s WHERE s.unitSold = :unitSold"),
    @NamedQuery(name = "SaleRecords.findByUnitPrice", query = "SELECT s FROM SaleRecords s WHERE s.unitPrice = :unitPrice"),
    @NamedQuery(name = "SaleRecords.findByUnitCost", query = "SELECT s FROM SaleRecords s WHERE s.unitCost = :unitCost"),
    @NamedQuery(name = "SaleRecords.findByTotalRevenue", query = "SELECT s FROM SaleRecords s WHERE s.totalRevenue = :totalRevenue"),
    @NamedQuery(name = "SaleRecords.findByTotalCost", query = "SELECT s FROM SaleRecords s WHERE s.totalCost = :totalCost"),
    @NamedQuery(name = "SaleRecords.findByTotalProfit", query = "SELECT s FROM SaleRecords s WHERE s.totalProfit = :totalProfit")})
public class SaleRecords implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "id")
    private Integer id;
    @Size(max = 100)
    @Column(name = "Region")
    private String region;
    @Size(max = 50)
    @Column(name = "Country")
    private String country;
    @Size(max = 20)
    @Column(name = "ItemType")
    private String itemType;
    @Size(max = 10)
    @Column(name = "SalesChannel")
    private String salesChannel;
    @Size(max = 2)
    @Column(name = "OrderPriority")
    private String orderPriority;
    @Column(name = "OrderId")
    private Integer orderId;
    @Column(name = "UnitSold")
    private Integer unitSold;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "UnitPrice")
    private BigDecimal unitPrice;
    @Column(name = "UnitCost")
    private BigDecimal unitCost;
    @Column(name = "TotalRevenue")
    private BigDecimal totalRevenue;
    @Column(name = "TotalCost")
    private BigDecimal totalCost;
    @Column(name = "TotalProfit")
    private BigDecimal totalProfit;

    public SaleRecords() {
    }

    public SaleRecords(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getItemType() {
        return itemType;
    }

    public void setItemType(String itemType) {
        this.itemType = itemType;
    }

    public String getSalesChannel() {
        return salesChannel;
    }

    public void setSalesChannel(String salesChannel) {
        this.salesChannel = salesChannel;
    }

    public String getOrderPriority() {
        return orderPriority;
    }

    public void setOrderPriority(String orderPriority) {
        this.orderPriority = orderPriority;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public Integer getUnitSold() {
        return unitSold;
    }

    public void setUnitSold(Integer unitSold) {
        this.unitSold = unitSold;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public BigDecimal getUnitCost() {
        return unitCost;
    }

    public void setUnitCost(BigDecimal unitCost) {
        this.unitCost = unitCost;
    }

    public BigDecimal getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(BigDecimal totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public BigDecimal getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(BigDecimal totalCost) {
        this.totalCost = totalCost;
    }

    public BigDecimal getTotalProfit() {
        return totalProfit;
    }

    public void setTotalProfit(BigDecimal totalProfit) {
        this.totalProfit = totalProfit;
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
        if (!(object instanceof SaleRecords)) {
            return false;
        }
        SaleRecords other = (SaleRecords) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.SaleRecords[ id=" + id + " ]";
    }
    
}
