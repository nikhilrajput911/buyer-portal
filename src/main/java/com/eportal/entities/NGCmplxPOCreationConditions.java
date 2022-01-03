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
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author admin
 */
@Entity
@Table(name = "NG_Cmplx_POCreation_Conditions")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NGCmplxPOCreationConditions.findAll", query = "SELECT n FROM NGCmplxPOCreationConditions n"),
    @NamedQuery(name = "NGCmplxPOCreationConditions.findByProcInstId", query = "SELECT n FROM NGCmplxPOCreationConditions n WHERE n.procInstId = :procInstId"),
    @NamedQuery(name = "NGCmplxPOCreationConditions.findByInsertionOrderID", query = "SELECT n FROM NGCmplxPOCreationConditions n WHERE n.insertionOrderID = :insertionOrderID"),
    @NamedQuery(name = "NGCmplxPOCreationConditions.findByCondType", query = "SELECT n FROM NGCmplxPOCreationConditions n WHERE n.condType = :condType"),
    @NamedQuery(name = "NGCmplxPOCreationConditions.findByCondName", query = "SELECT n FROM NGCmplxPOCreationConditions n WHERE n.condName = :condName"),
    @NamedQuery(name = "NGCmplxPOCreationConditions.findByAmount", query = "SELECT n FROM NGCmplxPOCreationConditions n WHERE n.amount = :amount"),
    @NamedQuery(name = "NGCmplxPOCreationConditions.findByCondPricUnit", query = "SELECT n FROM NGCmplxPOCreationConditions n WHERE n.condPricUnit = :condPricUnit"),
    @NamedQuery(name = "NGCmplxPOCreationConditions.findByCurrency", query = "SELECT n FROM NGCmplxPOCreationConditions n WHERE n.currency = :currency"),
    @NamedQuery(name = "NGCmplxPOCreationConditions.findByUoM", query = "SELECT n FROM NGCmplxPOCreationConditions n WHERE n.uoM = :uoM"),
    @NamedQuery(name = "NGCmplxPOCreationConditions.findByCondVal", query = "SELECT n FROM NGCmplxPOCreationConditions n WHERE n.condVal = :condVal"),
    @NamedQuery(name = "NGCmplxPOCreationConditions.findByCurrency1", query = "SELECT n FROM NGCmplxPOCreationConditions n WHERE n.currency1 = :currency1"),
    @NamedQuery(name = "NGCmplxPOCreationConditions.findByCondVal1", query = "SELECT n FROM NGCmplxPOCreationConditions n WHERE n.condVal1 = :condVal1"),
    @NamedQuery(name = "NGCmplxPOCreationConditions.findByCondCrncy", query = "SELECT n FROM NGCmplxPOCreationConditions n WHERE n.condCrncy = :condCrncy"),
    @NamedQuery(name = "NGCmplxPOCreationConditions.findByCondDet", query = "SELECT n FROM NGCmplxPOCreationConditions n WHERE n.condDet = :condDet"),
    @NamedQuery(name = "NGCmplxPOCreationConditions.findByVendorName", query = "SELECT n FROM NGCmplxPOCreationConditions n WHERE n.vendorName = :vendorName"),
    @NamedQuery(name = "NGCmplxPOCreationConditions.findByVendorCode", query = "SELECT n FROM NGCmplxPOCreationConditions n WHERE n.vendorCode = :vendorCode"),
    @NamedQuery(name = "NGCmplxPOCreationConditions.findByApplication", query = "SELECT n FROM NGCmplxPOCreationConditions n WHERE n.application = :application"),
    @NamedQuery(name = "NGCmplxPOCreationConditions.findByCondPriceDate", query = "SELECT n FROM NGCmplxPOCreationConditions n WHERE n.condPriceDate = :condPriceDate"),
    @NamedQuery(name = "NGCmplxPOCreationConditions.findByCondBaseVal", query = "SELECT n FROM NGCmplxPOCreationConditions n WHERE n.condBaseVal = :condBaseVal"),
    @NamedQuery(name = "NGCmplxPOCreationConditions.findByCondBaseRate", query = "SELECT n FROM NGCmplxPOCreationConditions n WHERE n.condBaseRate = :condBaseRate"),
    @NamedQuery(name = "NGCmplxPOCreationConditions.findByCondClass", query = "SELECT n FROM NGCmplxPOCreationConditions n WHERE n.condClass = :condClass"),
    @NamedQuery(name = "NGCmplxPOCreationConditions.findByCalType", query = "SELECT n FROM NGCmplxPOCreationConditions n WHERE n.calType = :calType"),
    @NamedQuery(name = "NGCmplxPOCreationConditions.findByCondCatg", query = "SELECT n FROM NGCmplxPOCreationConditions n WHERE n.condCatg = :condCatg"),
    @NamedQuery(name = "NGCmplxPOCreationConditions.findByCondCtrl", query = "SELECT n FROM NGCmplxPOCreationConditions n WHERE n.condCtrl = :condCtrl"),
    @NamedQuery(name = "NGCmplxPOCreationConditions.findByCondOrigin", query = "SELECT n FROM NGCmplxPOCreationConditions n WHERE n.condOrigin = :condOrigin"),
    @NamedQuery(name = "NGCmplxPOCreationConditions.findByStatistical", query = "SELECT n FROM NGCmplxPOCreationConditions n WHERE n.statistical = :statistical"),
    @NamedQuery(name = "NGCmplxPOCreationConditions.findByAccruals", query = "SELECT n FROM NGCmplxPOCreationConditions n WHERE n.accruals = :accruals"),
    @NamedQuery(name = "NGCmplxPOCreationConditions.findByChangedManually", query = "SELECT n FROM NGCmplxPOCreationConditions n WHERE n.changedManually = :changedManually"),
    @NamedQuery(name = "NGCmplxPOCreationConditions.findByAcCrualsTxt", query = "SELECT n FROM NGCmplxPOCreationConditions n WHERE n.acCrualsTxt = :acCrualsTxt"),
    @NamedQuery(name = "NGCmplxPOCreationConditions.findByAccountKey", query = "SELECT n FROM NGCmplxPOCreationConditions n WHERE n.accountKey = :accountKey"),
    @NamedQuery(name = "NGCmplxPOCreationConditions.findByPerQuantity", query = "SELECT n FROM NGCmplxPOCreationConditions n WHERE n.perQuantity = :perQuantity")})
public class NGCmplxPOCreationConditions implements Serializable {
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
    @Size(max = 20)
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
    @Size(max = 50)
    @Column(name = "VendorName")
    private String vendorName;
    @Size(max = 10)
    @Column(name = "VendorCode")
    private String vendorCode;
    @Size(max = 2)
    @Column(name = "Application")
    private String application;
    @Column(name = "CondPriceDate")
    @Temporal(TemporalType.DATE)
    private Date condPriceDate;
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
    @Column(name = "PerQuantity")
    private BigDecimal perQuantity;

    public NGCmplxPOCreationConditions() {
    }

    public NGCmplxPOCreationConditions(Long insertionOrderID) {
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

    public Date getCondPriceDate() {
        return condPriceDate;
    }

    public void setCondPriceDate(Date condPriceDate) {
        this.condPriceDate = condPriceDate;
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

    public BigDecimal getPerQuantity() {
        return perQuantity;
    }

    public void setPerQuantity(BigDecimal perQuantity) {
        this.perQuantity = perQuantity;
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
        if (!(object instanceof NGCmplxPOCreationConditions)) {
            return false;
        }
        NGCmplxPOCreationConditions other = (NGCmplxPOCreationConditions) object;
        if ((this.insertionOrderID == null && other.insertionOrderID != null) || (this.insertionOrderID != null && !this.insertionOrderID.equals(other.insertionOrderID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.NGCmplxPOCreationConditions[ insertionOrderID=" + insertionOrderID + " ]";
    }
    
}
