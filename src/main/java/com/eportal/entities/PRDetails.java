/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.entities;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author admin
 */
@Entity
@Table(name = "NG_BP_pr_details")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "PRDetails.findAll", query = "SELECT p FROM PRDetails p"),
    @NamedQuery(name = "PRDetails.findById", query = "SELECT p FROM PRDetails p WHERE p.id = :id"),
    @NamedQuery(name = "PRDetails.findByItemnumber", query = "SELECT p FROM PRDetails p WHERE p.itemnumber = :itemnumber"),
    @NamedQuery(name = "PRDetails.findByPlant", query = "SELECT p FROM PRDetails p WHERE p.plant = :plant"),
    @NamedQuery(name = "PRDetails.findByMaterialcode", query = "SELECT p FROM PRDetails p WHERE p.materialcode = :materialcode"),
    @NamedQuery(name = "PRDetails.findByShorttext", query = "SELECT p FROM PRDetails p WHERE p.shorttext = :shorttext"),
    @NamedQuery(name = "PRDetails.findByLongtext", query = "SELECT p FROM PRDetails p WHERE p.longtext = :longtext"),
    @NamedQuery(name = "PRDetails.findByOrderunitUOM", query = "SELECT p FROM PRDetails p WHERE p.orderunitUOM = :orderunitUOM"),
    @NamedQuery(name = "PRDetails.findByQuantity", query = "SELECT p FROM PRDetails p WHERE p.quantity = :quantity"),
    @NamedQuery(name = "PRDetails.findByCurrency", query = "SELECT p FROM PRDetails p WHERE p.currency = :currency"),
    @NamedQuery(name = "PRDetails.findByUnitprice", query = "SELECT p FROM PRDetails p WHERE p.unitprice = :unitprice"),
    @NamedQuery(name = "PRDetails.findByPriceunit", query = "SELECT p FROM PRDetails p WHERE p.priceunit = :priceunit"),
    @NamedQuery(name = "PRDetails.findByExpecteddeliverydate", query = "SELECT p FROM PRDetails p WHERE p.expecteddeliverydate = :expecteddeliverydate"),
    @NamedQuery(name = "PRDetails.findByBaselinepricePerunit", query = "SELECT p FROM PRDetails p WHERE p.baselinepricePerunit = :baselinepricePerunit")})
public class PRDetails implements Serializable {
    @Size(max = 25)
    @Column(name = "materialprice")
    private String materialprice;
    @Size(max = 20)
    @Column(name = "CompanyCode")
    private String companyCode;
    
    @Column(name = "assign_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date assigndate;
    
//    @OneToMany(mappedBy = "ngBpPrDetailsId")
//    private Collection<SupplierLineitem> supplierLineitemCollection;
//    @OneToMany(mappedBy = "ngBpPrDetailsId")
//    private Collection<WorkOrderRfqLineItem> workOrderRfqLineItemCollection;
    @Size(max = 20)
    @Column(name = "purchaserequestnumber")
    private String purchaserequestnumber;
    @Size(max = 80)
    @Column(name = "plantcode")
    private String plantcode;
    @Size(max = 5000)
    @Column(name = "itemtext")
    private String itemtext;
    @Size(max = 10)
    @Column(name = "localpurchase")
    private String localpurchase;
    @Size(max = 20)
    @Column(name = "storagelocation")
    private String storagelocation;
    @Size(max = 80)
    @Column(name = "project_lastbuyername")
    private String projectLastbuyername;
    @Size(max = 60)
    @Column(name = "lastsuppiername")
    private String lastsuppiername;
    @Size(max = 5000)
    @Column(name = "notestobuyer")
    private String notestobuyer;
    @Size(max = 20)
    @Column(name = "miqa_material")
    private String miqaMaterial;
    @Size(max = 20)
    @Column(name = "rfq_status")
    private String rfqStatus;
    @Size(max = 20)
    @Column(name = "quantity_used")
    private String quantityUsed;
//    @OneToMany(mappedBy = "ngBpPrDetailsId")
//    private Collection<WorkOrderRfqLineItem> workOrderRfqLineItemCollection;
    @Size(max = 20)
    @Column(name = "status")
    private String status;
    
    @JoinColumn(name = "ng_bp_buyerdetails_id", referencedColumnName = "Id")
    @ManyToOne
    private BuyerDetails ngBpBuyerdetailsId;
    
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Id")
    private Integer id;
    @Size(max = 10)
    @Column(name = "itemnumber")
    private String itemnumber;
    @Size(max = 50)
    @Column(name = "plant")
    private String plant;
    @Size(max = 50)
    @Column(name = "materialcode")
    private String materialcode;
    @Size(max = 50)
    @Column(name = "shorttext")
    private String shorttext;
    @Size(max = 2000)
    @Column(name = "longtext")
    private String longtext;
    @Size(max = 10)
    @Column(name = "orderunit_UOM")
    private String orderunitUOM;
    @Size(max = 50)
    @Column(name = "quantity")
    private String quantity;
    @Size(max = 10)
    @Column(name = "currency")
    private String currency;
    @Size(max = 50)
    @Column(name = "unitprice")
    private String unitprice;
    @Size(max = 10)
    @Column(name = "priceunit")
    private String priceunit;
    @Column(name = "expecteddeliverydate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date expecteddeliverydate;
    @Size(max = 50)
    @Column(name = "baselineprice_perunit")
    private String baselinepricePerunit;

    public PRDetails() {
    }

    public PRDetails(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getItemnumber() {
        return itemnumber;
    }

    public void setItemnumber(String itemnumber) {
        this.itemnumber = itemnumber;
    }

    public String getPlant() {
        return plant;
    }

    public void setPlant(String plant) {
        this.plant = plant;
    }

    public String getMaterialcode() {
        return materialcode;
    }

    public void setMaterialcode(String materialcode) {
        this.materialcode = materialcode;
    }

    public String getShorttext() {
        return shorttext;
    }

    public void setShorttext(String shorttext) {
        this.shorttext = shorttext;
    }

    public String getLongtext() {
        return longtext;
    }

    public void setLongtext(String longtext) {
        this.longtext = longtext;
    }

    public String getOrderunitUOM() {
        return orderunitUOM;
    }

    public void setOrderunitUOM(String orderunitUOM) {
        this.orderunitUOM = orderunitUOM;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getUnitprice() {
        return unitprice;
    }

    public void setUnitprice(String unitprice) {
        this.unitprice = unitprice;
    }

    public String getPriceunit() {
        return priceunit;
    }

    public void setPriceunit(String priceunit) {
        this.priceunit = priceunit;
    }

    public Date getExpecteddeliverydate() {
        return expecteddeliverydate;
    }

    public void setExpecteddeliverydate(Date expecteddeliverydate) {
        this.expecteddeliverydate = expecteddeliverydate;
    }

    public String getBaselinepricePerunit() {
        return baselinepricePerunit;
    }

    public void setBaselinepricePerunit(String baselinepricePerunit) {
        this.baselinepricePerunit = baselinepricePerunit;
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
        if (!(object instanceof PRDetails)) {
            return false;
        }
        PRDetails other = (PRDetails) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.PRDetails[ id=" + id + " ]";
    }

    public BuyerDetails getNgBpBuyerdetailsId() {
        return ngBpBuyerdetailsId;
    }

    public void setNgBpBuyerdetailsId(BuyerDetails ngBpBuyerdetailsId) {
        this.ngBpBuyerdetailsId = ngBpBuyerdetailsId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
//
//    @XmlTransient
//    public Collection<WorkOrderRfqLineItem> getWorkOrderRfqLineItemCollection() {
//        return workOrderRfqLineItemCollection;
//    }
//
//    public void setWorkOrderRfqLineItemCollection(Collection<WorkOrderRfqLineItem> workOrderRfqLineItemCollection) {
//        this.workOrderRfqLineItemCollection = workOrderRfqLineItemCollection;
//    }
//    

    public String getQuantityUsed() {
        return quantityUsed;
    }

    public void setQuantityUsed(String quantityUsed) {
        this.quantityUsed = quantityUsed;
    }

    public String getRfqStatus() {
        return rfqStatus;
    }

    public void setRfqStatus(String rfqStatus) {
        this.rfqStatus = rfqStatus;
    }

    public String getPurchaserequestnumber() {
        return purchaserequestnumber;
    }

    public void setPurchaserequestnumber(String purchaserequestnumber) {
        this.purchaserequestnumber = purchaserequestnumber;
    }

    public String getPlantcode() {
        return plantcode;
    }

    public void setPlantcode(String plantcode) {
        this.plantcode = plantcode;
    }

    public String getItemtext() {
        return itemtext;
    }

    public void setItemtext(String itemtext) {
        this.itemtext = itemtext;
    }

    public String getLocalpurchase() {
        return localpurchase;
    }

    public void setLocalpurchase(String localpurchase) {
        this.localpurchase = localpurchase;
    }

    public String getStoragelocation() {
        return storagelocation;
    }

    public void setStoragelocation(String storagelocation) {
        this.storagelocation = storagelocation;
    }

    public String getProjectLastbuyername() {
        return projectLastbuyername;
    }

    public void setProjectLastbuyername(String projectLastbuyername) {
        this.projectLastbuyername = projectLastbuyername;
    }

    public String getLastsuppiername() {
        return lastsuppiername;
    }

    public void setLastsuppiername(String lastsuppiername) {
        this.lastsuppiername = lastsuppiername;
    }

    public String getNotestobuyer() {
        return notestobuyer;
    }

    public void setNotestobuyer(String notestobuyer) {
        this.notestobuyer = notestobuyer;
    }

    public String getMiqaMaterial() {
        return miqaMaterial;
    }

    public void setMiqaMaterial(String miqaMaterial) {
        this.miqaMaterial = miqaMaterial;
    }

//    @XmlTransient
//    public Collection<WorkOrderRfqLineItem> getWorkOrderRfqLineItemCollection() {
//        return workOrderRfqLineItemCollection;
//    }
//
//    public void setWorkOrderRfqLineItemCollection(Collection<WorkOrderRfqLineItem> workOrderRfqLineItemCollection) {
//        this.workOrderRfqLineItemCollection = workOrderRfqLineItemCollection;
//    }
//
//    @XmlTransient
//    public Collection<SupplierLineitem> getSupplierLineitemCollection() {
//        return supplierLineitemCollection;
//    }
//
//    public void setSupplierLineitemCollection(Collection<SupplierLineitem> supplierLineitemCollection) {
//        this.supplierLineitemCollection = supplierLineitemCollection;
//    }

    public String getMaterialprice() {
        return materialprice;
    }

    public void setMaterialprice(String materialprice) {
        this.materialprice = materialprice;
    }

    public String getCompanyCode() {
        return companyCode;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }
    
    public Date getAssigndate(){
        return assigndate;
    }
    public void setAssigndate(Date assigndate){
        this.assigndate = assigndate;
    }
}
