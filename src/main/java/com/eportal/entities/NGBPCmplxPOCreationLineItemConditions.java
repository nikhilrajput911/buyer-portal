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
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author admin
 */
@Entity
@Table(name = "NG_BP_Cmplx_POCreation_LineItem_Conditions")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemConditions.findAll", query = "SELECT n FROM NGBPCmplxPOCreationLineItemConditions n"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemConditions.findByProcInstId", query = "SELECT n FROM NGBPCmplxPOCreationLineItemConditions n WHERE n.procInstId = :procInstId"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemConditions.findByInsertionOrderID", query = "SELECT n FROM NGBPCmplxPOCreationLineItemConditions n WHERE n.insertionOrderID = :insertionOrderID"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemConditions.findByCondType", query = "SELECT n FROM NGBPCmplxPOCreationLineItemConditions n WHERE n.condType = :condType"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemConditions.findByCondName", query = "SELECT n FROM NGBPCmplxPOCreationLineItemConditions n WHERE n.condName = :condName"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemConditions.findByAmount", query = "SELECT n FROM NGBPCmplxPOCreationLineItemConditions n WHERE n.amount = :amount"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemConditions.findByCondPricUnit", query = "SELECT n FROM NGBPCmplxPOCreationLineItemConditions n WHERE n.condPricUnit = :condPricUnit"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemConditions.findByCurrency", query = "SELECT n FROM NGBPCmplxPOCreationLineItemConditions n WHERE n.currency = :currency"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemConditions.findByUoM", query = "SELECT n FROM NGBPCmplxPOCreationLineItemConditions n WHERE n.uoM = :uoM"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemConditions.findByCondVal", query = "SELECT n FROM NGBPCmplxPOCreationLineItemConditions n WHERE n.condVal = :condVal"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemConditions.findByCurrency1", query = "SELECT n FROM NGBPCmplxPOCreationLineItemConditions n WHERE n.currency1 = :currency1"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemConditions.findByCondVal1", query = "SELECT n FROM NGBPCmplxPOCreationLineItemConditions n WHERE n.condVal1 = :condVal1"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemConditions.findByCondCrncy", query = "SELECT n FROM NGBPCmplxPOCreationLineItemConditions n WHERE n.condCrncy = :condCrncy"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemConditions.findByCondDet", query = "SELECT n FROM NGBPCmplxPOCreationLineItemConditions n WHERE n.condDet = :condDet"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemConditions.findByVendorName", query = "SELECT n FROM NGBPCmplxPOCreationLineItemConditions n WHERE n.vendorName = :vendorName"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemConditions.findByVendorCode", query = "SELECT n FROM NGBPCmplxPOCreationLineItemConditions n WHERE n.vendorCode = :vendorCode"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemConditions.findByApplication", query = "SELECT n FROM NGBPCmplxPOCreationLineItemConditions n WHERE n.application = :application"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemConditions.findByCondPriceDate", query = "SELECT n FROM NGBPCmplxPOCreationLineItemConditions n WHERE n.condPriceDate = :condPriceDate"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemConditions.findByCondBaseVal", query = "SELECT n FROM NGBPCmplxPOCreationLineItemConditions n WHERE n.condBaseVal = :condBaseVal"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemConditions.findByCondBaseRate", query = "SELECT n FROM NGBPCmplxPOCreationLineItemConditions n WHERE n.condBaseRate = :condBaseRate"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemConditions.findByCondClass", query = "SELECT n FROM NGBPCmplxPOCreationLineItemConditions n WHERE n.condClass = :condClass"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemConditions.findByCalType", query = "SELECT n FROM NGBPCmplxPOCreationLineItemConditions n WHERE n.calType = :calType"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemConditions.findByCondCatg", query = "SELECT n FROM NGBPCmplxPOCreationLineItemConditions n WHERE n.condCatg = :condCatg"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemConditions.findByCondCtrl", query = "SELECT n FROM NGBPCmplxPOCreationLineItemConditions n WHERE n.condCtrl = :condCtrl"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemConditions.findByCondOrigin", query = "SELECT n FROM NGBPCmplxPOCreationLineItemConditions n WHERE n.condOrigin = :condOrigin"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemConditions.findByStatistical", query = "SELECT n FROM NGBPCmplxPOCreationLineItemConditions n WHERE n.statistical = :statistical"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemConditions.findByAccruals", query = "SELECT n FROM NGBPCmplxPOCreationLineItemConditions n WHERE n.accruals = :accruals"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemConditions.findByChangedManually", query = "SELECT n FROM NGBPCmplxPOCreationLineItemConditions n WHERE n.changedManually = :changedManually"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemConditions.findByAcCrualsTxt", query = "SELECT n FROM NGBPCmplxPOCreationLineItemConditions n WHERE n.acCrualsTxt = :acCrualsTxt"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemConditions.findByAccountKey", query = "SELECT n FROM NGBPCmplxPOCreationLineItemConditions n WHERE n.accountKey = :accountKey"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemConditions.findByLinkID", query = "SELECT n FROM NGBPCmplxPOCreationLineItemConditions n WHERE n.linkID = :linkID"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemConditions.findByPerQuantity", query = "SELECT n FROM NGBPCmplxPOCreationLineItemConditions n WHERE n.perQuantity = :perQuantity"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemConditions.findByItemNumber", query = "SELECT n FROM NGBPCmplxPOCreationLineItemConditions n WHERE n.itemNumber = :itemNumber")})
public class NGBPCmplxPOCreationLineItemConditions implements Serializable {

    private static final long serialVersionUID = 1L;
    @Size(max = 50)
    @Column(name = "ProcInstId")
    private String procInstId;
    @Id
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "InsertionOrderID")
    private Long insertionOrderID;
    @Size(max = 4)
    @Column(name = "CondType")
    private String condType;
    @Size(max = 50)
    @Column(name = "CondName")
    private String condName;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "Amount")
    private BigDecimal amount;
    @Size(max = 5)
    @Column(name = "CondPricUnit")
    private String condPricUnit;
    @Size(max = 5)
    @Column(name = "Currency")
    private String currency;
    @Size(max = 3)
    @Column(name = "UoM")
    private String uoM;
    @Column(name = "CondVal")
    private BigDecimal condVal;
    @Size(max = 5)
    @Column(name = "Currency1")
    private String currency1;
    @Column(name = "CondVal1")
    private BigDecimal condVal1;
    @Size(max = 5)
    @Column(name = "CondCrncy")
    private String condCrncy;
    @Size(max = 1)
    @Column(name = "CondDet")
    private String condDet;
    @Size(max = 100)
    @Column(name = "VendorName")
    private String vendorName;
    @Size(max = 10)
    @Column(name = "VendorCode")
    private String vendorCode;
    @Size(max = 2)
    @Column(name = "Application")
    private String application;
    @Column(name = "CondBaseVal")
    private BigDecimal condBaseVal;
    @Size(max = 5)
    @Column(name = "CondBaseRate")
    private String condBaseRate;
    @Size(max = 1)
    @Column(name = "CondClass")
    private String condClass;
    @Size(max = 1)
    @Column(name = "CalType")
    private String calType;
    @Size(max = 1)
    @Column(name = "CondCatg")
    private String condCatg;
    @Size(max = 1)
    @Column(name = "CondCtrl")
    private String condCtrl;
    @Size(max = 1)
    @Column(name = "CondOrigin")
    private String condOrigin;
    @Size(max = 5)
    @Column(name = "Statistical")
    private String statistical;
    @Size(max = 5)
    @Column(name = "Accruals")
    private String accruals;
    @Size(max = 5)
    @Column(name = "ChangedManually")
    private String changedManually;
    @Size(max = 3)
    @Column(name = "AcCrualsTxt")
    private String acCrualsTxt;
    @Size(max = 3)
    @Column(name = "AccountKey")
    private String accountKey;
    @Size(max = 60)
    @Column(name = "LinkID")
    private String linkID;
    @Column(name = "PerQuantity")
    private BigDecimal perQuantity;
    @Size(max = 5)
    @Column(name = "ItemNumber")
    private String itemNumber;
    @Size(max = 10)
    @Column(name = "ConditionCount")
    private String conditionCount;
    @Size(max = 10)
    @Column(name = "StNumber")
    private String stNumber;
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
    @Size(max = 50)
    @Column(name = "PrItemNumber")
    private String prItemNumber;
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

    @ManyToOne(fetch = FetchType.EAGER)
    private NGBPCmplxPOCreationLineItemPO poCreationLineItemPO;

    public NGBPCmplxPOCreationLineItemPO getPoCreationLineItemPO() {
        return poCreationLineItemPO;
    }

    public void setPoCreationLineItemPO(NGBPCmplxPOCreationLineItemPO poCreationLineItemPO) {
        this.poCreationLineItemPO = poCreationLineItemPO;
    }

    public NGBPCmplxPOCreationLineItemConditions() {
    }

    public NGBPCmplxPOCreationLineItemConditions(Long insertionOrderID) {
        this.insertionOrderID = insertionOrderID;
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

    public String getCondType() {
        return condType;
    }

    public void setCondType(String condType) {
        this.condType = condType;
    }

    public String getCondName() {
        return condName;
    }

    public void setCondName(String condName) {
        this.condName = condName;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getCondPricUnit() {
        return condPricUnit;
    }

    public void setCondPricUnit(String condPricUnit) {
        this.condPricUnit = condPricUnit;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getUoM() {
        return uoM;
    }

    public void setUoM(String uoM) {
        this.uoM = uoM;
    }

    public BigDecimal getCondVal() {
        return condVal;
    }

    public void setCondVal(BigDecimal condVal) {
        this.condVal = condVal;
    }

    public String getCurrency1() {
        return currency1;
    }

    public void setCurrency1(String currency1) {
        this.currency1 = currency1;
    }

    public BigDecimal getCondVal1() {
        return condVal1;
    }

    public void setCondVal1(BigDecimal condVal1) {
        this.condVal1 = condVal1;
    }

    public String getCondCrncy() {
        return condCrncy;
    }

    public void setCondCrncy(String condCrncy) {
        this.condCrncy = condCrncy;
    }

    public String getCondDet() {
        return condDet;
    }

    public void setCondDet(String condDet) {
        this.condDet = condDet;
    }

    public String getVendorName() {
        return vendorName;
    }

    public void setVendorName(String vendorName) {
        this.vendorName = vendorName;
    }

    public String getVendorCode() {
        return vendorCode;
    }

    public void setVendorCode(String vendorCode) {
        this.vendorCode = vendorCode;
    }

    public String getApplication() {
        return application;
    }

    public void setApplication(String application) {
        this.application = application;
    }

    public BigDecimal getCondBaseVal() {
        return condBaseVal;
    }

    public void setCondBaseVal(BigDecimal condBaseVal) {
        this.condBaseVal = condBaseVal;
    }

    public String getCondBaseRate() {
        return condBaseRate;
    }

    public void setCondBaseRate(String condBaseRate) {
        this.condBaseRate = condBaseRate;
    }

    public String getCondClass() {
        return condClass;
    }

    public void setCondClass(String condClass) {
        this.condClass = condClass;
    }

    public String getCalType() {
        return calType;
    }

    public void setCalType(String calType) {
        this.calType = calType;
    }

    public String getCondCatg() {
        return condCatg;
    }

    public void setCondCatg(String condCatg) {
        this.condCatg = condCatg;
    }

    public String getCondCtrl() {
        return condCtrl;
    }

    public void setCondCtrl(String condCtrl) {
        this.condCtrl = condCtrl;
    }

    public String getCondOrigin() {
        return condOrigin;
    }

    public void setCondOrigin(String condOrigin) {
        this.condOrigin = condOrigin;
    }

    public String getStatistical() {
        return statistical;
    }

    public void setStatistical(String statistical) {
        this.statistical = statistical;
    }

    public String getAccruals() {
        return accruals;
    }

    public void setAccruals(String accruals) {
        this.accruals = accruals;
    }

    public String getChangedManually() {
        return changedManually;
    }

    public void setChangedManually(String changedManually) {
        this.changedManually = changedManually;
    }

    public String getAcCrualsTxt() {
        return acCrualsTxt;
    }

    public void setAcCrualsTxt(String acCrualsTxt) {
        this.acCrualsTxt = acCrualsTxt;
    }

    public String getAccountKey() {
        return accountKey;
    }

    public void setAccountKey(String accountKey) {
        this.accountKey = accountKey;
    }

    public String getLinkID() {
        return linkID;
    }

    public void setLinkID(String linkID) {
        this.linkID = linkID;
    }

    public BigDecimal getPerQuantity() {
        return perQuantity;
    }

    public void setPerQuantity(BigDecimal perQuantity) {
        this.perQuantity = perQuantity;
    }

    public String getItemNumber() {
        return itemNumber;
    }

    public void setItemNumber(String itemNumber) {
        this.itemNumber = itemNumber;
    }

    public String getPrItemNumber() {
        return prItemNumber;
    }

    public void setPrItemNumber(String prItemNumber) {
        this.prItemNumber = prItemNumber;
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
    
    

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (insertionOrderID != null ? insertionOrderID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof NGBPCmplxPOCreationLineItemConditions)) {
            return false;
        }
        NGBPCmplxPOCreationLineItemConditions other = (NGBPCmplxPOCreationLineItemConditions) object;
        if ((this.insertionOrderID == null && other.insertionOrderID != null) || (this.insertionOrderID != null && !this.insertionOrderID.equals(other.insertionOrderID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.NGBPCmplxPOCreationLineItemConditions[ insertionOrderID=" + insertionOrderID + " ]";
    }

}
