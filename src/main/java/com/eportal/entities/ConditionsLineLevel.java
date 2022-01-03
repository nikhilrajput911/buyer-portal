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
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Sunny Kumar
 */
@Entity
@Table(name = "NG_BP_ConditionsLineLevel")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "ConditionsLineLevel.findAll", query = "SELECT c FROM ConditionsLineLevel c"),
    @NamedQuery(name = "ConditionsLineLevel.findById", query = "SELECT c FROM ConditionsLineLevel c WHERE c.id = :id"),
    @NamedQuery(name = "ConditionsLineLevel.findByConditionType", query = "SELECT c FROM ConditionsLineLevel c WHERE c.conditionType = :conditionType"),
    @NamedQuery(name = "ConditionsLineLevel.findByName", query = "SELECT c FROM ConditionsLineLevel c WHERE c.name = :name"),
    @NamedQuery(name = "ConditionsLineLevel.findByAmount", query = "SELECT c FROM ConditionsLineLevel c WHERE c.amount = :amount"),
    @NamedQuery(name = "ConditionsLineLevel.findByPer", query = "SELECT c FROM ConditionsLineLevel c WHERE c.per = :per"),
    @NamedQuery(name = "ConditionsLineLevel.findByConditionPricingUnit", query = "SELECT c FROM ConditionsLineLevel c WHERE c.conditionPricingUnit = :conditionPricingUnit"),
    @NamedQuery(name = "ConditionsLineLevel.findByCurrency1", query = "SELECT c FROM ConditionsLineLevel c WHERE c.currency1 = :currency1"),
    @NamedQuery(name = "ConditionsLineLevel.findByUom", query = "SELECT c FROM ConditionsLineLevel c WHERE c.uom = :uom"),
    @NamedQuery(name = "ConditionsLineLevel.findByConditionValue1", query = "SELECT c FROM ConditionsLineLevel c WHERE c.conditionValue1 = :conditionValue1"),
    @NamedQuery(name = "ConditionsLineLevel.findByCurrency2", query = "SELECT c FROM ConditionsLineLevel c WHERE c.currency2 = :currency2"),
    @NamedQuery(name = "ConditionsLineLevel.findByConditionValue2", query = "SELECT c FROM ConditionsLineLevel c WHERE c.conditionValue2 = :conditionValue2"),
    @NamedQuery(name = "ConditionsLineLevel.findByConditionCurrency", query = "SELECT c FROM ConditionsLineLevel c WHERE c.conditionCurrency = :conditionCurrency"),
    @NamedQuery(name = "ConditionsLineLevel.findByConditionDetails", query = "SELECT c FROM ConditionsLineLevel c WHERE c.conditionDetails = :conditionDetails"),
    @NamedQuery(name = "ConditionsLineLevel.findByLineitemId", query = "SELECT c FROM ConditionsLineLevel c WHERE c.lineitemId = :lineitemId")})
public class ConditionsLineLevel implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
//    @NotNull
    @Column(name = "Id")
    private Integer id;
    @Size(max = 10)
    @Column(name = "conditionType")
    private String conditionType;
    @Size(max = 50)
    @Column(name = "Name")
    private String name;
//    @Column(name = "amount")
//    private Integer amount;
    @Column(name = "amount")
    private BigDecimal amount;
    @Column(name = "Per")
    private BigDecimal per;
    @Size(max = 10)
    @Column(name = "conditionPricingUnit")
    private String conditionPricingUnit;
    @Size(max = 10)
    @Column(name = "Currency1")
    private String currency1;
    @Size(max = 10)
    @Column(name = "UOM")
    private String uom;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "conditionValue1")
    private Float conditionValue1;
    @Size(max = 10)
    @Column(name = "Currency2")
    private String currency2;
    @Column(name = "conditionValue2")
    private Float conditionValue2;
    @Size(max = 10)
    @Column(name = "conditionCurrency")
    private String conditionCurrency;
    @Size(max = 20)
    @Column(name = "conditionDetails")
    private String conditionDetails;
    @Size(max = 50)
    @Column(name = "Lineitem_Id")
    private String lineitemId;
    @Size(max = 20)
    @Column(name = "PrItemNumber")
    private String prItemNumber;
    @Size(max = 10)
    @Column(name = "ConditionCount")
    private String conditionCount;
    @Size(max = 10)
    @Column(name = "StNumber")
    private String stNumber;
    @Size(max = 10)
    @Column(name = "LinkId")
    private String linkId;
    @Size(max = 10)
    @Column(name = "ChangeId")
    private String changeId;
    @Size(max = 10)
    @Column(name = "KAPPL")
    private String kappl;
    @Size(max = 10)
    @Column(name = "KVSL1")
    private String kvsl1;
    @Size(max = 10)
    @Column(name = "KVSL2")
    private String kvsl2;
    @Size(max = 20)
    @Column(name = "VendorCode")
    private String vendorCode;
    @Size(max = 100)
    @Column(name = "VendorName")
    private String vendorName;
    @Size(max = 20)
    @Column(name = "CondPriceDate")
    private String condPriceDate;
    @Size(max = 10)
    @Column(name = "CondCurncyExchangeRate")
    private String condCurncyExchangeRate;
    @Size(max = 10)
    @Column(name = "PoCurrencyExchangeRate")
    private String poCurrencyExchangeRate;
    @Size(max = 10)
    @Column(name = "Status")
    private String status;
    @Size(max = 20)
    @Column(name = "Ng_Status")
    private String ngStatus;
    @Column(name = "Numerator")
    private Integer numerator;
    @Size(max = 20)
    @Column(name = "Base_UOM")
    private String baseUOM;
    @Column(name = "Denominator_for_conv")
    private Integer denominatorforconv;
    @Size(max = 20)
    @Column(name = "Uom_extra")
    private String uomextra;
    
    @Size(max = 20)
    @Column(name = "AddedFrom")
    private String addedFrom;
    @Size(max = 20)
    @Column(name = "ConditionIndex")
    private String conditionIndex;

    public ConditionsLineLevel() {
    }

    public ConditionsLineLevel(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getConditionType() {
        return conditionType;
    }

    public void setConditionType(String conditionType) {
        this.conditionType = conditionType;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getConditionPricingUnit() {
        return conditionPricingUnit;
    }

    public void setConditionPricingUnit(String conditionPricingUnit) {
        this.conditionPricingUnit = conditionPricingUnit;
    }

    public String getCurrency1() {
        return currency1;
    }

    public void setCurrency1(String currency1) {
        this.currency1 = currency1;
    }

    public String getUom() {
        return uom;
    }

    public void setUom(String uom) {
        this.uom = uom;
    }

    public Float getConditionValue1() {
        return conditionValue1;
    }

    public void setConditionValue1(Float conditionValue1) {
        this.conditionValue1 = conditionValue1;
    }

    public String getCurrency2() {
        return currency2;
    }

    public void setCurrency2(String currency2) {
        this.currency2 = currency2;
    }

    public Float getConditionValue2() {
        return conditionValue2;
    }

    public void setConditionValue2(Float conditionValue2) {
        this.conditionValue2 = conditionValue2;
    }

    public String getConditionCurrency() {
        return conditionCurrency;
    }

    public void setConditionCurrency(String conditionCurrency) {
        this.conditionCurrency = conditionCurrency;
    }

    public String getConditionDetails() {
        return conditionDetails;
    }

    public void setConditionDetails(String conditionDetails) {
        this.conditionDetails = conditionDetails;
    }

    public String getLineitemId() {
        return lineitemId;
    }

    public void setLineitemId(String lineitemId) {
        this.lineitemId = lineitemId;
    }

    public String getPrItemNumber() {
        return prItemNumber;
    }

    public void setPrItemNumber(String prItemNumber) {
        this.prItemNumber = prItemNumber;
    }

    public String getConditionCount() {
        return conditionCount;
    }

    public void setConditionCount(String conditionCount) {
        this.conditionCount = conditionCount;
    }

    public String getStNumber() {
        return stNumber;
    }

    public void setStNumber(String stNumber) {
        this.stNumber = stNumber;
    }

    public String getLinkId() {
        return linkId;
    }

    public void setLinkId(String linkId) {
        this.linkId = linkId;
    }

    public String getChangeId() {
        return changeId;
    }

    public void setChangeId(String changeId) {
        this.changeId = changeId;
    }

    public String getKappl() {
        return kappl;
    }

    public void setKappl(String kappl) {
        this.kappl = kappl;
    }

    public String getKvsl1() {
        return kvsl1;
    }

    public void setKvsl1(String kvsl1) {
        this.kvsl1 = kvsl1;
    }

    public String getKvsl2() {
        return kvsl2;
    }

    public void setKvsl2(String kvsl2) {
        this.kvsl2 = kvsl2;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public BigDecimal getPer() {
        return per;
    }

    public void setPer(BigDecimal per) {
        this.per = per;
    }

    public String getVendorCode() {
        return vendorCode;
    }

    public void setVendorCode(String vendorCode) {
        this.vendorCode = vendorCode;
    }

    public String getVendorName() {
        return vendorName;
    }

    public void setVendorName(String vendorName) {
        this.vendorName = vendorName;
    }

    public String getCondPriceDate() {
        return condPriceDate;
    }

    public void setCondPriceDate(String condPriceDate) {
        this.condPriceDate = condPriceDate;
    }

    public String getCondCurncyExchangeRate() {
        return condCurncyExchangeRate;
    }

    public void setCondCurncyExchangeRate(String condCurncyExchangeRate) {
        this.condCurncyExchangeRate = condCurncyExchangeRate;
    }

    public String getPoCurrencyExchangeRate() {
        return poCurrencyExchangeRate;
    }

    public void setPoCurrencyExchangeRate(String poCurrencyExchangeRate) {
        this.poCurrencyExchangeRate = poCurrencyExchangeRate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getNgStatus() {
        return ngStatus;
    }

    public void setNgStatus(String ngStatus) {
        this.ngStatus = ngStatus;
    }

    public Integer getNumerator() {
        return numerator;
    }

    public void setNumerator(Integer numerator) {
        this.numerator = numerator;
    }

    public String getBaseUOM() {
        return baseUOM;
    }

    public void setBaseUOM(String baseUOM) {
        this.baseUOM = baseUOM;
    }

    public Integer getDenominatorforconv() {
        return denominatorforconv;
    }

    public void setDenominatorforconv(Integer denominatorforconv) {
        this.denominatorforconv = denominatorforconv;
    }

    public String getUomextra() {
        return uomextra;
    }

    public void setUomextra(String uomextra) {
        this.uomextra = uomextra;
    }

    public String getAddedFrom() {
        return addedFrom;
    }

    public void setAddedFrom(String addedFrom) {
        this.addedFrom = addedFrom;
    }

    public String getConditionIndex() {
        return conditionIndex;
    }

    public void setConditionIndex(String conditionIndex) {
        this.conditionIndex = conditionIndex;
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
        if (!(object instanceof ConditionsLineLevel)) {
            return false;
        }
        ConditionsLineLevel other = (ConditionsLineLevel) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.ConditionsLineLevel[ id=" + id + " ]";
    }

}
