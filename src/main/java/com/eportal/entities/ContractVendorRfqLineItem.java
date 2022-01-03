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
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
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
@Table(name = "NG_BP_ContractVendorRfqLineItem")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "ContractVendorRfqLineItem.findAll", query = "SELECT s FROM ContractVendorRfqLineItem s"),
    @NamedQuery(name = "ContractVendorRfqLineItem.findByCreatedby", query = "SELECT s FROM ContractVendorRfqLineItem s WHERE s.createdby = :createdby"),
    @NamedQuery(name = "ContractVendorRfqLineItem.findByCreationdate", query = "SELECT s FROM ContractVendorRfqLineItem s WHERE s.creationdate = :creationdate"),
    @NamedQuery(name = "ContractVendorRfqLineItem.findByUpdatedate", query = "SELECT s FROM ContractVendorRfqLineItem s WHERE s.updatedate = :updatedate"),
    @NamedQuery(name = "ContractVendorRfqLineItem.findByUpdatedby", query = "SELECT s FROM ContractVendorRfqLineItem s WHERE s.updatedby = :updatedby"),
    @NamedQuery(name = "ContractVendorRfqLineItem.findByBrand", query = "SELECT s FROM ContractVendorRfqLineItem s WHERE s.brand = :brand"),
    @NamedQuery(name = "ContractVendorRfqLineItem.findByMultipleId", query = "SELECT n FROM ContractVendorRfqLineItem n WHERE n.id IN :ids")})
public class ContractVendorRfqLineItem implements Serializable {
    
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
//    @NotNull
    @Column(name = "id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;
    @Size(max = 30)
    @Column(name = "createdby")
    private String createdby;
    @Column(name = "creationdate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationdate;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "updatedate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedate;
    @Size(max = 30)
    @Column(name = "updatedby")
    private String updatedby;
    @Size(max = 100)
    @Column(name = "brand")
    private String brand;
    @Size(max = 20)
    @Column(name = "quantity_available")
    private String quantityAvailable;
    @Size(max = 50)
    @Column(name = "alternatematerial")
    private String alternatematerial;
    @Size(max = 15)
    @Column(name = "currency")
    private String currency;
    @Size(max = 10)
    @Column(name = "vendorunit")
    private String vendorunit;
    @Size(max = 20)
    @Column(name = "vendorpriceofferedperunit")
    private String vendorpriceofferedperunit;
    @Size(max = 20)
    @Column(name = "vendorpriceofferedtotal")
    private String vendorpriceofferedtotal;
    @Column(name = "expected_deliverydate")
    @Temporal(TemporalType.DATE)
    private Date expectedDeliverydate;
    
    @Size(max = 20)
    @Column(name = "usedQty")
    private String usedQty;
    
    @Size(max = 20)
    @Column(name = "buyer_baseline_price")
    private String buyerBaselinePrice;

    public String getBuyerBaselinePrice() {
        return buyerBaselinePrice;
    }

    public void setBuyerBaselinePrice(String buyerBaselinePrice) {
        this.buyerBaselinePrice = buyerBaselinePrice;
    }

    public String getUsedQty() {
        return usedQty;
    }

    public void setUsedQty(String usedQty) {
        this.usedQty = usedQty;
    }
    
    @JoinColumn(name = "ContractVendorRfqHeader_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private ContractVendorRfqHeader contractVendorRfqHeaderId;
    @JoinColumn(name = "NewgenContractLineItem_InsertionOrderID", referencedColumnName = "InsertionOrderID")
    @ManyToOne
    private NewgenContractLineItem newgenContractLineItemInsertionOrderID;

    public ContractVendorRfqLineItem() {
    }

    public ContractVendorRfqLineItem(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCreatedby() {
        return createdby;
    }

    public void setCreatedby(String createdby) {
        this.createdby = createdby;
    }

    public Date getCreationdate() {
        return creationdate;
    }

    public void setCreationdate(Date creationdate) {
        this.creationdate = creationdate;
    }

    public Date getUpdatedate() {
        return updatedate;
    }

    public void setUpdatedate(Date updatedate) {
        this.updatedate = updatedate;
    }

    public String getUpdatedby() {
        return updatedby;
    }

    public void setUpdatedby(String updatedby) {
        this.updatedby = updatedby;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
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
        if (!(object instanceof SupplierLineitem)) {
            return false;
        }
        ContractVendorRfqLineItem other = (ContractVendorRfqLineItem) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.ContractVendorRfqLineItem[ id=" + id + " ]";
    }

    public String getAlternatematerial() {
        return alternatematerial;
    }

    public void setAlternatematerial(String alternatematerial) {
        this.alternatematerial = alternatematerial;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getVendorunit() {
        return vendorunit;
    }

    public void setVendorunit(String vendorunit) {
        this.vendorunit = vendorunit;
    }

    public String getVendorpriceofferedperunit() {
        return vendorpriceofferedperunit;
    }

    public void setVendorpriceofferedperunit(String vendorpriceofferedperunit) {
        this.vendorpriceofferedperunit = vendorpriceofferedperunit;
    }

    public String getVendorpriceofferedtotal() {
        return vendorpriceofferedtotal;
    }

    public void setVendorpriceofferedtotal(String vendorpriceofferedtotal) {
        this.vendorpriceofferedtotal = vendorpriceofferedtotal;
    }

    public Date getExpectedDeliverydate() {
        return expectedDeliverydate;
    }

    public void setExpectedDeliverydate(Date expectedDeliverydate) {
        this.expectedDeliverydate = expectedDeliverydate;
    }

    public ContractVendorRfqHeader getContractVendorRfqHeaderId() {
        return contractVendorRfqHeaderId;
    }

    public void setContractVendorRfqHeaderId(ContractVendorRfqHeader contractVendorRfqHeaderId) {
        this.contractVendorRfqHeaderId = contractVendorRfqHeaderId;
    }

    public NewgenContractLineItem getNewgenContractLineItemInsertionOrderID() {
        return newgenContractLineItemInsertionOrderID;
    }

    public void setNewgenContractLineItemInsertionOrderID(NewgenContractLineItem newgenContractLineItemInsertionOrderID) {
        this.newgenContractLineItemInsertionOrderID = newgenContractLineItemInsertionOrderID;
    }

    public String getQuantityAvailable() {
        return quantityAvailable;
    }

    public void setQuantityAvailable(String quantityAvailable) {
        this.quantityAvailable = quantityAvailable;
    }
    
}
