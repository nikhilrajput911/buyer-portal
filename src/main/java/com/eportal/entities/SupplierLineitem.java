/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.entities;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
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
 * @author admin
 */
@Entity
@Table(name = "NG_BP_supplierlineitem")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "SupplierLineitem.findAll", query = "SELECT s FROM SupplierLineitem s"),
    @NamedQuery(name = "SupplierLineitem.findById", query = "SELECT s FROM SupplierLineitem s WHERE s.id = :id"),
    @NamedQuery(name = "SupplierLineitem.findByQuotepriceperquantity", query = "SELECT s FROM SupplierLineitem s WHERE s.quotepriceperquantity = :quotepriceperquantity"),
    @NamedQuery(name = "SupplierLineitem.findByExpectedprice", query = "SELECT s FROM SupplierLineitem s WHERE s.expectedprice = :expectedprice"),
    @NamedQuery(name = "SupplierLineitem.findByDeliverydate", query = "SELECT s FROM SupplierLineitem s WHERE s.deliverydate = :deliverydate"),
    @NamedQuery(name = "SupplierLineitem.findByCreationdate", query = "SELECT s FROM SupplierLineitem s WHERE s.creationdate = :creationdate"),
    @NamedQuery(name = "SupplierLineitem.findByUpdatedate", query = "SELECT s FROM SupplierLineitem s WHERE s.updatedate = :updatedate"),
    @NamedQuery(name = "SupplierLineitem.findByUpdatedby", query = "SELECT s FROM SupplierLineitem s WHERE s.updatedby = :updatedby"),
    @NamedQuery(name = "SupplierLineitem.findByCreatedby", query = "SELECT s FROM SupplierLineitem s WHERE s.createdby = :createdby"),
    @NamedQuery(name = "SupplierLineitem.findByAf1", query = "SELECT s FROM SupplierLineitem s WHERE s.af1 = :af1"),
    @NamedQuery(name = "SupplierLineitem.findByAf2", query = "SELECT s FROM SupplierLineitem s WHERE s.af2 = :af2"),
    @NamedQuery(name = "SupplierLineitem.findByAf3", query = "SELECT s FROM SupplierLineitem s WHERE s.af3 = :af3"),
    @NamedQuery(name = "SupplierLineitem.findByAf4", query = "SELECT s FROM SupplierLineitem s WHERE s.af4 = :af4"),
    @NamedQuery(name = "SupplierLineitem.findByAf5", query = "SELECT s FROM SupplierLineitem s WHERE s.af5 = :af5"),
    @NamedQuery(name = "SupplierLineitem.findBySupplierHeaderId", query = "SELECT s FROM SupplierLineitem s WHERE s.workOrderSupplierHeaderTableid.id = :id"),
    @NamedQuery(name = "SupplierLineitem.findByTotalprice", query = "SELECT s FROM SupplierLineitem s WHERE s.totalprice = :totalprice")})
public class SupplierLineitem implements Serializable {
    @Size(max = 20)
    @Column(name = "LeadTime")
    private String leadTime;
    @Column(name = "MoqMov", columnDefinition = "NVARCHAR(MAX)")
    private String moqMov;
    @Size(max = 50)
    @Column(name = "attachment1name")
    private String attachment1name;
    @Size(max = 50)
    @Column(name = "attachment2name")
    private String attachment2name;
    @Size(max = 50)
    @Column(name = "attachment3name")
    private String attachment3name;
    @Size(max = 50)
    @Column(name = "attachment4name")
    private String attachment4name;
    @Size(max = 50)
    @Column(name = "attachment5name")
    private String attachment5name;
    @Lob
    @Column(name = "attachment1")
    private byte[] attachment1;
    @Lob
    @Column(name = "attachment2")
    private byte[] attachment2;
    @Lob
    @Column(name = "attachment3")
    private byte[] attachment3;
    @Lob
    @Column(name = "attachment4")
    private byte[] attachment4;
    @Lob
    @Column(name = "attachment5")
    private byte[] attachment5;

//    @JoinColumn(name = "ng_bp_pr_details_id", referencedColumnName = "Id")
//    @ManyToOne
//    private PRDetails ngBpPrDetailsId;
    @JoinColumn(name = "NG_BP_Newgen_PR_LineItem_InsertionOrderID", referencedColumnName = "InsertionOrderID")
    @ManyToOne
    private NewgenPRLineItem ngBpNewgenPRLineItemId;

    @Size(max = 100)
    @Column(name = "brand")
    private String brand;
    @Size(max = 4)
    @Column(name = "currency")
    private String currency;
    @Size(max = 50)
    @Column(name = "alternatematerial")
    private String alternatematerial;
    @Size(max = 5)
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
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "quotepriceperquantity")
    private Double quotepriceperquantity;
    @Column(name = "expectedprice")
    private Double expectedprice;
    @Column(name = "deliverydate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date deliverydate;
    @Column(name = "creationdate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationdate;
    @Column(name = "updatedate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedate;
    @Size(max = 30)
    @Column(name = "updatedby")
    private String updatedby;
    @Size(max = 30)
    @Column(name = "createdby")
    private String createdby;
    @Column(name = "AF1")
    private Integer af1;
    @Column(name = "AF2")
    private Integer af2;
    @Column(name = "AF3")
    private Integer af3;
    @Column(name = "AF4")
    private Integer af4;
    @Column(name = "AF5")
    private Integer af5;
    @Column(name = "totalprice")
    private Double totalprice;
    @JoinColumn(name = "WorkOrderSupplierHeaderTable_id", referencedColumnName = "id")
    @ManyToOne(optional = false, cascade = CascadeType.ALL)
    private SupplierHeader workOrderSupplierHeaderTableid;
    @Size(max = 20)
    @Column(name = "buyer_baseline_price")
    private String buyerBaselinePrice;
    @Size(max = 20)
    @Column(name = "status")
    private String status;
    @Size(max = 10)
    @Column(name = "quantity")
    private String quantity;
    @Size(max = 10)
    @Column(name = "RemainingQuantityForPo")
    private String remainingQuantityForPo;
    @Size(max = 20)
    @Column(name = "buyer_final_financial_price")
    private String buyerFinalFinancialPrice;

    public SupplierLineitem() {
    }

    public SupplierLineitem(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Double getQuotepriceperquantity() {
        return quotepriceperquantity;
    }

    public void setQuotepriceperquantity(Double quotepriceperquantity) {
        this.quotepriceperquantity = quotepriceperquantity;
    }

    public Double getExpectedprice() {
        return expectedprice;
    }

    public void setExpectedprice(Double expectedprice) {
        this.expectedprice = expectedprice;
    }

    public Date getDeliverydate() {
        return deliverydate;
    }

    public void setDeliverydate(Date deliverydate) {
        this.deliverydate = deliverydate;
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

    public String getCreatedby() {
        return createdby;
    }

    public void setCreatedby(String createdby) {
        this.createdby = createdby;
    }

    public Integer getAf1() {
        return af1;
    }

    public void setAf1(Integer af1) {
        this.af1 = af1;
    }

    public Integer getAf2() {
        return af2;
    }

    public void setAf2(Integer af2) {
        this.af2 = af2;
    }

    public Integer getAf3() {
        return af3;
    }

    public void setAf3(Integer af3) {
        this.af3 = af3;
    }

    public Integer getAf4() {
        return af4;
    }

    public void setAf4(Integer af4) {
        this.af4 = af4;
    }

    public Integer getAf5() {
        return af5;
    }

    public void setAf5(Integer af5) {
        this.af5 = af5;
    }

    public Double getTotalprice() {
        return totalprice;
    }

    public void setTotalprice(Double totalprice) {
        this.totalprice = totalprice;
    }

    public SupplierHeader getWorkOrderSupplierHeaderTableid() {
        return workOrderSupplierHeaderTableid;
    }

    public void setWorkOrderSupplierHeaderTableid(SupplierHeader workOrderSupplierHeaderTableid) {
        this.workOrderSupplierHeaderTableid = workOrderSupplierHeaderTableid;
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
        SupplierLineitem other = (SupplierLineitem) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.SupplierLineitem[ id=" + id + " ]";
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getAlternatematerial() {
        return alternatematerial;
    }

    public void setAlternatematerial(String alternatematerial) {
        this.alternatematerial = alternatematerial;
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

//    public PRDetails getNgBpPrDetailsId() {
//        return ngBpPrDetailsId;
//    }
//    
//    public void setNgBpPrDetailsId(PRDetails ngBpPrDetailsId) {
//        this.ngBpPrDetailsId = ngBpPrDetailsId;
//    }
    public String getAttachment1name() {
        return attachment1name;
    }

    public void setAttachment1name(String attachment1name) {
        this.attachment1name = attachment1name;
    }

    public String getAttachment2name() {
        return attachment2name;
    }

    public void setAttachment2name(String attachment2name) {
        this.attachment2name = attachment2name;
    }

    public String getAttachment3name() {
        return attachment3name;
    }

    public void setAttachment3name(String attachment3name) {
        this.attachment3name = attachment3name;
    }

    public String getAttachment4name() {
        return attachment4name;
    }

    public void setAttachment4name(String attachment4name) {
        this.attachment4name = attachment4name;
    }

    public String getAttachment5name() {
        return attachment5name;
    }

    public void setAttachment5name(String attachment5name) {
        this.attachment5name = attachment5name;
    }

    public byte[] getAttachment1() {
        return attachment1;
    }

    public void setAttachment1(byte[] attachment1) {
        this.attachment1 = attachment1;
    }

    public byte[] getAttachment2() {
        return attachment2;
    }

    public void setAttachment2(byte[] attachment2) {
        this.attachment2 = attachment2;
    }

    public byte[] getAttachment3() {
        return attachment3;
    }

    public void setAttachment3(byte[] attachment3) {
        this.attachment3 = attachment3;
    }

    public byte[] getAttachment4() {
        return attachment4;
    }

    public void setAttachment4(byte[] attachment4) {
        this.attachment4 = attachment4;
    }

    public byte[] getAttachment5() {
        return attachment5;
    }

    public void setAttachment5(byte[] attachment5) {
        this.attachment5 = attachment5;
    }

    public NewgenPRLineItem getNgBpNewgenPRLineItemId() {
        return ngBpNewgenPRLineItemId;
    }

    public void setNgBpNewgenPRLineItemId(NewgenPRLineItem ngBpNewgenPRLineItemId) {
        this.ngBpNewgenPRLineItemId = ngBpNewgenPRLineItemId;
    }

    public String getBuyerBaselinePrice() {
        return buyerBaselinePrice;
    }

    public void setBuyerBaselinePrice(String buyerBaselinePrice) {
        this.buyerBaselinePrice = buyerBaselinePrice;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public String getRemainingQuantityForPo() {
        return remainingQuantityForPo;
    }
    public void setRemainingQuantityForPo(String remainingQuantityForPo) {
        this.remainingQuantityForPo = remainingQuantityForPo;
    }
    
    public String getLeadTime() {
        return leadTime;
    }

    public void setLeadTime(String leadTime) {
        this.leadTime = leadTime;
    }

    public String getMoqMov() {
        return moqMov;
    }

    public void setMoqMov(String moqMov) {
        this.moqMov = moqMov;
    }

    public String getBuyerFinalFinancialPrice() {
        return buyerFinalFinancialPrice;
    }

    public void setBuyerFinalFinancialPrice(String buyerFinalFinancialPrice) {
        this.buyerFinalFinancialPrice = buyerFinalFinancialPrice;
    }    
}
