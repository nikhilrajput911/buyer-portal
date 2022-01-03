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
@Table(name = "NG_BP_DeliverySchedule")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "DeliverySchedule.findAll", query = "SELECT d FROM DeliverySchedule d"),
    @NamedQuery(name = "DeliverySchedule.findById", query = "SELECT d FROM DeliverySchedule d WHERE d.id = :id"),
    @NamedQuery(name = "DeliverySchedule.findByDeliveryDateCategory", query = "SELECT d FROM DeliverySchedule d WHERE d.deliveryDateCategory = :deliveryDateCategory"),
    @NamedQuery(name = "DeliverySchedule.findByDeliveryDate", query = "SELECT d FROM DeliverySchedule d WHERE d.deliveryDate = :deliveryDate"),
    @NamedQuery(name = "DeliverySchedule.findByScheduledQuantity", query = "SELECT d FROM DeliverySchedule d WHERE d.scheduledQuantity = :scheduledQuantity"),
    @NamedQuery(name = "DeliverySchedule.findByTime", query = "SELECT d FROM DeliverySchedule d WHERE d.time = :time"),
    @NamedQuery(name = "DeliverySchedule.findByPurchaseRequestNumber", query = "SELECT d FROM DeliverySchedule d WHERE d.purchaseRequestNumber = :purchaseRequestNumber"),
    @NamedQuery(name = "DeliverySchedule.findByRequestItemNumber", query = "SELECT d FROM DeliverySchedule d WHERE d.requestItemNumber = :requestItemNumber")})
public class DeliverySchedule implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
//    @NotNull
    @Column(name = "Id")
    private Integer id;
    @Size(max = 5)
    @Column(name = "DeliveryDateCategory")
    private String deliveryDateCategory;
    @Column(name = "DeliveryDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date deliveryDate;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "ScheduledQuantity")
    private BigDecimal scheduledQuantity;
    @Size(max = 30)
    @Column(name = "Time")
    private String time;
    @Size(max = 15)
    @Column(name = "PurchaseRequestNumber")
    private String purchaseRequestNumber;
    @Size(max = 10)
    @Column(name = "RequestItemNumber")
    private String requestItemNumber;
    @Size(max = 50)
    @Column(name = "LineItemNumber")
    private String lineItemNumber;
    @Size(max = 20)
    @Column(name = "PrItemNumber")
    private String prItemNumber;
    @Size(max = 10)
    @Column(name = "LinkId")
    private String linkId;
    @Size(max = 10)
    @Column(name = "DeliveryDateByCategory")
    private String deliveryDateByCategory;
    @Column(name = "StatisticalDeliveryDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date statisticalDeliveryDate;
    @Column(name = "GrQty")
    private BigDecimal grQty;
    @Column(name = "OpenQuantity")
    private BigDecimal openQuantity;
    @Size(max = 20)
    @Column(name = "SchLine")
    private String schLine;
    
    public DeliverySchedule() {
    }

    public DeliverySchedule(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDeliveryDateCategory() {
        return deliveryDateCategory;
    }

    public void setDeliveryDateCategory(String deliveryDateCategory) {
        this.deliveryDateCategory = deliveryDateCategory;
    }

    public Date getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(Date deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public BigDecimal getScheduledQuantity() {
        return scheduledQuantity;
    }

    public void setScheduledQuantity(BigDecimal scheduledQuantity) {
        this.scheduledQuantity = scheduledQuantity;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getPurchaseRequestNumber() {
        return purchaseRequestNumber;
    }

    public void setPurchaseRequestNumber(String purchaseRequestNumber) {
        this.purchaseRequestNumber = purchaseRequestNumber;
    }

    public String getRequestItemNumber() {
        return requestItemNumber;
    }

    public void setRequestItemNumber(String requestItemNumber) {
        this.requestItemNumber = requestItemNumber;
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

    public String getDeliveryDateByCategory() {
        return deliveryDateByCategory;
    }

    public void setDeliveryDateByCategory(String deliveryDateByCategory) {
        this.deliveryDateByCategory = deliveryDateByCategory;
    }

    public Date getStatisticalDeliveryDate() {
        return statisticalDeliveryDate;
    }

    public void setStatisticalDeliveryDate(Date statisticalDeliveryDate) {
        this.statisticalDeliveryDate = statisticalDeliveryDate;
    }

    public BigDecimal getGrQty() {
        return grQty;
    }

    public void setGrQty(BigDecimal grQty) {
        this.grQty = grQty;
    }

    public BigDecimal getOpenQuantity() {
        return openQuantity;
    }

    public void setOpenQuantity(BigDecimal openQuantity) {
        this.openQuantity = openQuantity;
    }

    public String getSchLine() {
        return schLine;
    }

    public void setSchLine(String schLine) {
        this.schLine = schLine;
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
        if (!(object instanceof DeliverySchedule)) {
            return false;
        }
        DeliverySchedule other = (DeliverySchedule) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.DeliverySchedule[ id=" + id + " ]";
    }
    
}
