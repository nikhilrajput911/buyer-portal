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
//@Table(name = "NG_Master_Material_General")
@Table(name = "NG_Master_Material_Main_General")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterMaterialGeneral.findAll", query = "SELECT m FROM MasterMaterialGeneral m"),
    @NamedQuery(name = "MasterMaterialGeneral.findBySno", query = "SELECT m FROM MasterMaterialGeneral m WHERE m.sno = :sno"),
    @NamedQuery(name = "MasterMaterialGeneral.findByMaterialCode", query = "SELECT m FROM MasterMaterialGeneral m WHERE m.materialCode = :materialCode"),
    @NamedQuery(name = "MasterMaterialGeneral.findByCompanyCode", query = "SELECT m FROM MasterMaterialGeneral m WHERE m.companyCode = :companyCode"),
    @NamedQuery(name = "MasterMaterialGeneral.findByPlantCode", query = "SELECT m FROM MasterMaterialGeneral m WHERE m.plantCode = :plantCode"),
    @NamedQuery(name = "MasterMaterialGeneral.findByShortText", query = "SELECT m FROM MasterMaterialGeneral m WHERE m.shortText = :shortText"),
    @NamedQuery(name = "MasterMaterialGeneral.findByDivision", query = "SELECT m FROM MasterMaterialGeneral m WHERE m.division = :division"),
    @NamedQuery(name = "MasterMaterialGeneral.findByLongText", query = "SELECT m FROM MasterMaterialGeneral m WHERE m.longText = :longText"),
    @NamedQuery(name = "MasterMaterialGeneral.findByOldMaterialNo", query = "SELECT m FROM MasterMaterialGeneral m WHERE m.oldMaterialNo = :oldMaterialNo"),
    @NamedQuery(name = "MasterMaterialGeneral.findByExtMaterialGroup", query = "SELECT m FROM MasterMaterialGeneral m WHERE m.extMaterialGroup = :extMaterialGroup"),
    @NamedQuery(name = "MasterMaterialGeneral.findByCountryOfOrigin", query = "SELECT m FROM MasterMaterialGeneral m WHERE m.countryOfOrigin = :countryOfOrigin"),
    @NamedQuery(name = "MasterMaterialGeneral.findByStorageLocation", query = "SELECT m FROM MasterMaterialGeneral m WHERE m.storageLocation = :storageLocation"),
    @NamedQuery(name = "MasterMaterialGeneral.findByBaseUOM", query = "SELECT m FROM MasterMaterialGeneral m WHERE m.baseUOM = :baseUOM"),
    @NamedQuery(name = "MasterMaterialGeneral.findByPurchaseGroup", query = "SELECT m FROM MasterMaterialGeneral m WHERE m.purchaseGroup = :purchaseGroup"),
    @NamedQuery(name = "MasterMaterialGeneral.findByOrderUnit", query = "SELECT m FROM MasterMaterialGeneral m WHERE m.orderUnit = :orderUnit"),
    @NamedQuery(name = "MasterMaterialGeneral.findByMaterialGroup", query = "SELECT m FROM MasterMaterialGeneral m WHERE m.materialGroup = :materialGroup"),
    @NamedQuery(name = "MasterMaterialGeneral.findByPlantSpeicifcMatStatus", query = "SELECT m FROM MasterMaterialGeneral m WHERE m.plantSpeicifcMatStatus = :plantSpeicifcMatStatus"),
    @NamedQuery(name = "MasterMaterialGeneral.findByInventoryCorrectionFactor", query = "SELECT m FROM MasterMaterialGeneral m WHERE m.inventoryCorrectionFactor = :inventoryCorrectionFactor"),
    @NamedQuery(name = "MasterMaterialGeneral.findByValidFrom", query = "SELECT m FROM MasterMaterialGeneral m WHERE m.validFrom = :validFrom"),
    @NamedQuery(name = "MasterMaterialGeneral.findByTaxIndicatorforMaterial", query = "SELECT m FROM MasterMaterialGeneral m WHERE m.taxIndicatorforMaterial = :taxIndicatorforMaterial"),
    @NamedQuery(name = "MasterMaterialGeneral.findByMaterialQualifiesforDiscout", query = "SELECT m FROM MasterMaterialGeneral m WHERE m.materialQualifiesforDiscout = :materialQualifiesforDiscout"),
    @NamedQuery(name = "MasterMaterialGeneral.findByMaterialFreightGroup", query = "SELECT m FROM MasterMaterialGeneral m WHERE m.materialFreightGroup = :materialFreightGroup"),
    @NamedQuery(name = "MasterMaterialGeneral.findByAutomaticPOAllowed", query = "SELECT m FROM MasterMaterialGeneral m WHERE m.automaticPOAllowed = :automaticPOAllowed"),
    @NamedQuery(name = "MasterMaterialGeneral.findByBatchManagement", query = "SELECT m FROM MasterMaterialGeneral m WHERE m.batchManagement = :batchManagement"),
    @NamedQuery(name = "MasterMaterialGeneral.findByCurrentPeriod", query = "SELECT m FROM MasterMaterialGeneral m WHERE m.currentPeriod = :currentPeriod"),
    @NamedQuery(name = "MasterMaterialGeneral.findByPreviousPeriod", query = "SELECT m FROM MasterMaterialGeneral m WHERE m.previousPeriod = :previousPeriod"),
    @NamedQuery(name = "MasterMaterialGeneral.findByValuePrice", query = "SELECT m FROM MasterMaterialGeneral m WHERE m.valuePrice = :valuePrice"),
    @NamedQuery(name = "MasterMaterialGeneral.findByUOMStore", query = "SELECT m FROM MasterMaterialGeneral m WHERE m.uOMStore = :uOMStore")})
public class MasterMaterialGeneral implements Serializable {
    @Size(max = 50)
    @Column(name = "MaterialType")
    private String materialType;
    @Size(max = 50)
    @Column(name = "ValuationType")
    private String valuationType;
    @Size(max = 50)
    @Column(name = "ValuationClass")
    private String valuationClass;
    @Size(max = 50)
    @Column(name = "ConversionUnit")
    private String conversionUnit;
    @Size(max = 50)
    @Column(name = "ConversionFrom")
    private String conversionFrom;
    @Size(max = 50)
    @Column(name = "ConversionTo")
    private String conversionTo;
    @Size(max = 50)
    @Column(name = "GLCode")
    private String gLCode;
    @Size(max = 50)
    @Column(name = "ZGLCode")
    private String zGLCode;
    @Size(max = 50)
    @Column(name = "PRICEUNIT")
    private String priceunit;
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Sno")
    private Integer sno;
    @Size(max = 100)
    @Column(name = "MaterialCode")
    private String materialCode;
    @Size(max = 10)
    @Column(name = "CompanyCode")
    private String companyCode;
    @Size(max = 100)
    @Column(name = "PlantCode")
    private String plantCode;
    @Size(max = 100)
    @Column(name = "ShortText")
    private String shortText;
    @Size(max = 100)
    @Column(name = "Division")
    private String division;
    @Size(max = 300)
    @Column(name = "LongText")
    private String longText;
    @Size(max = 100)
    @Column(name = "OldMaterialNo")
    private String oldMaterialNo;
    @Size(max = 100)
    @Column(name = "ExtMaterialGroup")
    private String extMaterialGroup;
    @Size(max = 100)
    @Column(name = "CountryOfOrigin")
    private String countryOfOrigin;
    @Size(max = 100)
    @Column(name = "StorageLocation")
    private String storageLocation;
    @Size(max = 100)
    @Column(name = "BaseUOM")
    private String baseUOM;
    @Size(max = 100)
    @Column(name = "PurchaseGroup")
    private String purchaseGroup;
    @Size(max = 100)
    @Column(name = "OrderUnit")
    private String orderUnit;
    @Size(max = 100)
    @Column(name = "MaterialGroup")
    private String materialGroup;
    @Size(max = 100)
    @Column(name = "PlantSpeicifcMatStatus")
    private String plantSpeicifcMatStatus;
    @Size(max = 100)
    @Column(name = "InventoryCorrectionFactor")
    private String inventoryCorrectionFactor;
    @Size(max = 200)
    @Column(name = "ValidFrom")
    private String validFrom;
    @Size(max = 100)
    @Column(name = "TaxIndicatorforMaterial")
    private String taxIndicatorforMaterial;
    @Size(max = 100)
    @Column(name = "MaterialQualifiesforDiscout")
    private String materialQualifiesforDiscout;
    @Size(max = 100)
    @Column(name = "MaterialFreightGroup")
    private String materialFreightGroup;
    @Size(max = 100)
    @Column(name = "AutomaticPOAllowed")
    private String automaticPOAllowed;
    @Size(max = 100)
    @Column(name = "BatchManagement")
    private String batchManagement;
    @Size(max = 100)
    @Column(name = "CurrentPeriod")
    private String currentPeriod;
    @Size(max = 100)
    @Column(name = "PreviousPeriod")
    private String previousPeriod;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "ValuePrice")
    private BigDecimal valuePrice;
    @Size(max = 100)
    @Column(name = "UOMStore")
    private String uOMStore;

    public MasterMaterialGeneral() {
    }

    public MasterMaterialGeneral(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getMaterialCode() {
        return materialCode;
    }

    public void setMaterialCode(String materialCode) {
        this.materialCode = materialCode;
    }

    public String getCompanyCode() {
        return companyCode;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }

    public String getPlantCode() {
        return plantCode;
    }

    public void setPlantCode(String plantCode) {
        this.plantCode = plantCode;
    }

    public String getShortText() {
        return shortText;
    }

    public void setShortText(String shortText) {
        this.shortText = shortText;
    }

    public String getDivision() {
        return division;
    }

    public void setDivision(String division) {
        this.division = division;
    }

    public String getLongText() {
        return longText;
    }

    public void setLongText(String longText) {
        this.longText = longText;
    }

    public String getOldMaterialNo() {
        return oldMaterialNo;
    }

    public void setOldMaterialNo(String oldMaterialNo) {
        this.oldMaterialNo = oldMaterialNo;
    }

    public String getExtMaterialGroup() {
        return extMaterialGroup;
    }

    public void setExtMaterialGroup(String extMaterialGroup) {
        this.extMaterialGroup = extMaterialGroup;
    }

    public String getCountryOfOrigin() {
        return countryOfOrigin;
    }

    public void setCountryOfOrigin(String countryOfOrigin) {
        this.countryOfOrigin = countryOfOrigin;
    }

    public String getStorageLocation() {
        return storageLocation;
    }

    public void setStorageLocation(String storageLocation) {
        this.storageLocation = storageLocation;
    }

    public String getBaseUOM() {
        return baseUOM;
    }

    public void setBaseUOM(String baseUOM) {
        this.baseUOM = baseUOM;
    }

    public String getPurchaseGroup() {
        return purchaseGroup;
    }

    public void setPurchaseGroup(String purchaseGroup) {
        this.purchaseGroup = purchaseGroup;
    }

    public String getOrderUnit() {
        return orderUnit;
    }

    public void setOrderUnit(String orderUnit) {
        this.orderUnit = orderUnit;
    }

    public String getMaterialGroup() {
        return materialGroup;
    }

    public void setMaterialGroup(String materialGroup) {
        this.materialGroup = materialGroup;
    }

    public String getPlantSpeicifcMatStatus() {
        return plantSpeicifcMatStatus;
    }

    public void setPlantSpeicifcMatStatus(String plantSpeicifcMatStatus) {
        this.plantSpeicifcMatStatus = plantSpeicifcMatStatus;
    }

    public String getInventoryCorrectionFactor() {
        return inventoryCorrectionFactor;
    }

    public void setInventoryCorrectionFactor(String inventoryCorrectionFactor) {
        this.inventoryCorrectionFactor = inventoryCorrectionFactor;
    }

    public String getValidFrom() {
        return validFrom;
    }

    public void setValidFrom(String validFrom) {
        this.validFrom = validFrom;
    }

    public String getTaxIndicatorforMaterial() {
        return taxIndicatorforMaterial;
    }

    public void setTaxIndicatorforMaterial(String taxIndicatorforMaterial) {
        this.taxIndicatorforMaterial = taxIndicatorforMaterial;
    }

    public String getMaterialQualifiesforDiscout() {
        return materialQualifiesforDiscout;
    }

    public void setMaterialQualifiesforDiscout(String materialQualifiesforDiscout) {
        this.materialQualifiesforDiscout = materialQualifiesforDiscout;
    }

    public String getMaterialFreightGroup() {
        return materialFreightGroup;
    }

    public void setMaterialFreightGroup(String materialFreightGroup) {
        this.materialFreightGroup = materialFreightGroup;
    }

    public String getAutomaticPOAllowed() {
        return automaticPOAllowed;
    }

    public void setAutomaticPOAllowed(String automaticPOAllowed) {
        this.automaticPOAllowed = automaticPOAllowed;
    }

    public String getBatchManagement() {
        return batchManagement;
    }

    public void setBatchManagement(String batchManagement) {
        this.batchManagement = batchManagement;
    }

    public String getCurrentPeriod() {
        return currentPeriod;
    }

    public void setCurrentPeriod(String currentPeriod) {
        this.currentPeriod = currentPeriod;
    }

    public String getPreviousPeriod() {
        return previousPeriod;
    }

    public void setPreviousPeriod(String previousPeriod) {
        this.previousPeriod = previousPeriod;
    }

    public BigDecimal getValuePrice() {
        return valuePrice;
    }

    public void setValuePrice(BigDecimal valuePrice) {
        this.valuePrice = valuePrice;
    }

    public String getUOMStore() {
        return uOMStore;
    }

    public void setUOMStore(String uOMStore) {
        this.uOMStore = uOMStore;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (sno != null ? sno.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof MasterMaterialGeneral)) {
            return false;
        }
        MasterMaterialGeneral other = (MasterMaterialGeneral) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterMaterialGeneral[ sno=" + sno + " ]";
    }

    public String getMaterialType() {
        return materialType;
    }

    public void setMaterialType(String materialType) {
        this.materialType = materialType;
    }

    public String getValuationType() {
        return valuationType;
    }

    public void setValuationType(String valuationType) {
        this.valuationType = valuationType;
    }

    public String getValuationClass() {
        return valuationClass;
    }

    public void setValuationClass(String valuationClass) {
        this.valuationClass = valuationClass;
    }

    public String getConversionUnit() {
        return conversionUnit;
    }

    public void setConversionUnit(String conversionUnit) {
        this.conversionUnit = conversionUnit;
    }

    public String getConversionFrom() {
        return conversionFrom;
    }

    public void setConversionFrom(String conversionFrom) {
        this.conversionFrom = conversionFrom;
    }

    public String getConversionTo() {
        return conversionTo;
    }

    public void setConversionTo(String conversionTo) {
        this.conversionTo = conversionTo;
    }

    public String getGLCode() {
        return gLCode;
    }

    public void setGLCode(String gLCode) {
        this.gLCode = gLCode;
    }

    public String getZGLCode() {
        return zGLCode;
    }

    public void setZGLCode(String zGLCode) {
        this.zGLCode = zGLCode;
    }

    public String getPriceunit() {
        return priceunit;
    }

    public void setPriceunit(String priceunit) {
        this.priceunit = priceunit;
    }
    
}
