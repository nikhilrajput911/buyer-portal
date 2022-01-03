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
@Table(name = "NG_BP_Delivery")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Delivery.findAll", query = "SELECT d FROM Delivery d"),
    @NamedQuery(name = "Delivery.findById", query = "SELECT d FROM Delivery d WHERE d.id = :id"),
    @NamedQuery(name = "Delivery.findByOverdeliveryTolerance", query = "SELECT d FROM Delivery d WHERE d.overdeliveryTolerance = :overdeliveryTolerance"),
    @NamedQuery(name = "Delivery.findByUnderdeliveryTolerance", query = "SELECT d FROM Delivery d WHERE d.underdeliveryTolerance = :underdeliveryTolerance"),
    @NamedQuery(name = "Delivery.findByShippingInstruction", query = "SELECT d FROM Delivery d WHERE d.shippingInstruction = :shippingInstruction"),
    @NamedQuery(name = "Delivery.findByStockType", query = "SELECT d FROM Delivery d WHERE d.stockType = :stockType"),
    @NamedQuery(name = "Delivery.findByFirstRemender", query = "SELECT d FROM Delivery d WHERE d.firstRemender = :firstRemender"),
    @NamedQuery(name = "Delivery.findBySecondRemender", query = "SELECT d FROM Delivery d WHERE d.secondRemender = :secondRemender"),
    @NamedQuery(name = "Delivery.findByThirdRemender", query = "SELECT d FROM Delivery d WHERE d.thirdRemender = :thirdRemender"),
    @NamedQuery(name = "Delivery.findByValuationType", query = "SELECT d FROM Delivery d WHERE d.valuationType = :valuationType"),
    @NamedQuery(name = "Delivery.findByRemShelfLife", query = "SELECT d FROM Delivery d WHERE d.remShelfLife = :remShelfLife"),
    @NamedQuery(name = "Delivery.findByQaControlLife", query = "SELECT d FROM Delivery d WHERE d.qaControlLife = :qaControlLife"),
    @NamedQuery(name = "Delivery.findByNoExpend", query = "SELECT d FROM Delivery d WHERE d.noExpend = :noExpend"),
    @NamedQuery(name = "Delivery.findByPlDeliveryTime", query = "SELECT d FROM Delivery d WHERE d.plDeliveryTime = :plDeliveryTime"),
    @NamedQuery(name = "Delivery.findByGrPROCTime", query = "SELECT d FROM Delivery d WHERE d.grPROCTime = :grPROCTime"),
    @NamedQuery(name = "Delivery.findByLatestGRDate", query = "SELECT d FROM Delivery d WHERE d.latestGRDate = :latestGRDate"),
    @NamedQuery(name = "Delivery.findByIncoTerms", query = "SELECT d FROM Delivery d WHERE d.incoTerms = :incoTerms"),
    @NamedQuery(name = "Delivery.findByGoodsReceipt", query = "SELECT d FROM Delivery d WHERE d.goodsReceipt = :goodsReceipt"),
    @NamedQuery(name = "Delivery.findByGrNonValuated", query = "SELECT d FROM Delivery d WHERE d.grNonValuated = :grNonValuated"),
    @NamedQuery(name = "Delivery.findByDelivCompleted", query = "SELECT d FROM Delivery d WHERE d.delivCompleted = :delivCompleted"),
    @NamedQuery(name = "Delivery.findByLineItemNumber", query = "SELECT d FROM Delivery d WHERE d.lineItemNumber = :lineItemNumber")})
public class Delivery implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
//    @NotNull
    @Column(name = "Id")
    private Integer id;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "OverdeliveryTolerance")
    private BigDecimal overdeliveryTolerance;
    @Column(name = "UnderdeliveryTolerance")
    private BigDecimal underdeliveryTolerance;
    @Size(max = 50)
    @Column(name = "ShippingInstruction")
    private String shippingInstruction;
    @Size(max = 50)
    @Column(name = "StockType")
    private String stockType;
    @Size(max = 8)
    @Column(name = "FirstRemender")
    private String firstRemender;
    @Size(max = 8)
    @Column(name = "SecondRemender")
    private String secondRemender;
    @Size(max = 8)
    @Column(name = "ThirdRemender")
    private String thirdRemender;
    @Size(max = 20)
    @Column(name = "ValuationType")
    private String valuationType;
    @Size(max = 10)
    @Column(name = "RemShelfLife")
    private String remShelfLife;
    @Size(max = 150)
    @Column(name = "QaControlLife")
    private String qaControlLife;
    @Size(max = 15)
    @Column(name = "NoExpend")
    private String noExpend;
    @Size(max = 8)
    @Column(name = "PlDeliveryTime")
    private String plDeliveryTime;
    @Size(max = 8)
    @Column(name = "GrPROCTime")
    private String grPROCTime;
    @Column(name = "LatestGRDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date latestGRDate;
    @Size(max = 35)
    @Column(name = "IncoTerms1")
    private String incoTerms1;
    @Size(max = 35)
    @Column(name = "IncoTerms")
    private String incoTerms;
    @Size(max = 5)
    @Column(name = "GoodsReceipt")
    private String goodsReceipt;
    @Size(max = 5)
    @Column(name = "GrNonValuated")
    private String grNonValuated;
    @Size(max = 5)
    @Column(name = "DelivCompleted")
    private String delivCompleted;
    @Size(max = 50)
    @Column(name = "LineItemNumber")
    private String lineItemNumber;
    @Size(max = 20)
    @Column(name = "PrItemNumber")
    private String prItemNumber;
    @Size(max = 10)
    @Column(name = "LinkId")
    private String linkId;
    @Size(max = 5)
    @Column(name = "Unlimited")
    private String unlimited;
    
    public Delivery() {
    }

    public Delivery(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public BigDecimal getOverdeliveryTolerance() {
        return overdeliveryTolerance;
    }

    public void setOverdeliveryTolerance(BigDecimal overdeliveryTolerance) {
        this.overdeliveryTolerance = overdeliveryTolerance;
    }

    public BigDecimal getUnderdeliveryTolerance() {
        return underdeliveryTolerance;
    }

    public void setUnderdeliveryTolerance(BigDecimal underdeliveryTolerance) {
        this.underdeliveryTolerance = underdeliveryTolerance;
    }

    public String getShippingInstruction() {
        return shippingInstruction;
    }

    public void setShippingInstruction(String shippingInstruction) {
        this.shippingInstruction = shippingInstruction;
    }

    public String getStockType() {
        return stockType;
    }

    public void setStockType(String stockType) {
        this.stockType = stockType;
    }

    public String getFirstRemender() {
        return firstRemender;
    }

    public void setFirstRemender(String firstRemender) {
        this.firstRemender = firstRemender;
    }

    public String getSecondRemender() {
        return secondRemender;
    }

    public void setSecondRemender(String secondRemender) {
        this.secondRemender = secondRemender;
    }

    public String getThirdRemender() {
        return thirdRemender;
    }

    public void setThirdRemender(String thirdRemender) {
        this.thirdRemender = thirdRemender;
    }

    public String getValuationType() {
        return valuationType;
    }

    public void setValuationType(String valuationType) {
        this.valuationType = valuationType;
    }

    public String getRemShelfLife() {
        return remShelfLife;
    }

    public void setRemShelfLife(String remShelfLife) {
        this.remShelfLife = remShelfLife;
    }

    public String getQaControlLife() {
        return qaControlLife;
    }

    public void setQaControlLife(String qaControlLife) {
        this.qaControlLife = qaControlLife;
    }

    public String getNoExpend() {
        return noExpend;
    }

    public void setNoExpend(String noExpend) {
        this.noExpend = noExpend;
    }

    public String getPlDeliveryTime() {
        return plDeliveryTime;
    }

    public void setPlDeliveryTime(String plDeliveryTime) {
        this.plDeliveryTime = plDeliveryTime;
    }

    public String getGrPROCTime() {
        return grPROCTime;
    }

    public void setGrPROCTime(String grPROCTime) {
        this.grPROCTime = grPROCTime;
    }

    

    public Date getLatestGRDate() {
        return latestGRDate;
    }

    public void setLatestGRDate(Date latestGRDate) {
        this.latestGRDate = latestGRDate;
    }

    public String getIncoTerms() {
        return incoTerms;
    }

    public void setIncoTerms(String incoTerms) {
        this.incoTerms = incoTerms;
    }

    public String getGoodsReceipt() {
        return goodsReceipt;
    }

    public void setGoodsReceipt(String goodsReceipt) {
        this.goodsReceipt = goodsReceipt;
    }

    public String getGrNonValuated() {
        return grNonValuated;
    }

    public void setGrNonValuated(String grNonValuated) {
        this.grNonValuated = grNonValuated;
    }
    

    public String getDelivCompleted() {
        return delivCompleted;
    }

    public void setDelivCompleted(String delivCompleted) {
        this.delivCompleted = delivCompleted;
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

    public String getUnlimited() {
        return unlimited;
    }

    public void setUnlimited(String unlimited) {
        this.unlimited = unlimited;
    }

    public String getIncoTerms1() {
        return incoTerms1;
    }

    public void setIncoTerms1(String incoTerms1) {
        this.incoTerms1 = incoTerms1;
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
        if (!(object instanceof Delivery)) {
            return false;
        }
        Delivery other = (Delivery) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.Delivery[ id=" + id + " ]";
    }
    
}
