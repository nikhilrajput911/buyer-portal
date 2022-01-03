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
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
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
@Table(name = "NG_BP_Cmplx_POCreation_Delivery")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NGBPCmplxPOCreationDelivery.findAll", query = "SELECT n FROM NGBPCmplxPOCreationDelivery n"),
    @NamedQuery(name = "NGBPCmplxPOCreationDelivery.findByProcInstId", query = "SELECT n FROM NGBPCmplxPOCreationDelivery n WHERE n.procInstId = :procInstId"),
    @NamedQuery(name = "NGBPCmplxPOCreationDelivery.findByInsertionOrderID", query = "SELECT n FROM NGBPCmplxPOCreationDelivery n WHERE n.insertionOrderID = :insertionOrderID"),
    @NamedQuery(name = "NGBPCmplxPOCreationDelivery.findByOverDelTol", query = "SELECT n FROM NGBPCmplxPOCreationDelivery n WHERE n.overDelTol = :overDelTol"),
    @NamedQuery(name = "NGBPCmplxPOCreationDelivery.findByUnderDelTol", query = "SELECT n FROM NGBPCmplxPOCreationDelivery n WHERE n.underDelTol = :underDelTol"),
    @NamedQuery(name = "NGBPCmplxPOCreationDelivery.findByShippingInstructions", query = "SELECT n FROM NGBPCmplxPOCreationDelivery n WHERE n.shippingInstructions = :shippingInstructions"),
    @NamedQuery(name = "NGBPCmplxPOCreationDelivery.findByStockType", query = "SELECT n FROM NGBPCmplxPOCreationDelivery n WHERE n.stockType = :stockType"),
    @NamedQuery(name = "NGBPCmplxPOCreationDelivery.findByFstRemExped", query = "SELECT n FROM NGBPCmplxPOCreationDelivery n WHERE n.fstRemExped = :fstRemExped"),
    @NamedQuery(name = "NGBPCmplxPOCreationDelivery.findBySecRemExped", query = "SELECT n FROM NGBPCmplxPOCreationDelivery n WHERE n.secRemExped = :secRemExped"),
    @NamedQuery(name = "NGBPCmplxPOCreationDelivery.findByThrdRemExped", query = "SELECT n FROM NGBPCmplxPOCreationDelivery n WHERE n.thrdRemExped = :thrdRemExped"),
    @NamedQuery(name = "NGBPCmplxPOCreationDelivery.findByValuationType", query = "SELECT n FROM NGBPCmplxPOCreationDelivery n WHERE n.valuationType = :valuationType"),
    @NamedQuery(name = "NGBPCmplxPOCreationDelivery.findByRemShelfLife", query = "SELECT n FROM NGBPCmplxPOCreationDelivery n WHERE n.remShelfLife = :remShelfLife"),
    @NamedQuery(name = "NGBPCmplxPOCreationDelivery.findByQaControlLife", query = "SELECT n FROM NGBPCmplxPOCreationDelivery n WHERE n.qaControlLife = :qAControlLife"),
    @NamedQuery(name = "NGBPCmplxPOCreationDelivery.findByNoExpend", query = "SELECT n FROM NGBPCmplxPOCreationDelivery n WHERE n.noExpend = :noExpend"),
    @NamedQuery(name = "NGBPCmplxPOCreationDelivery.findByPlDelTime", query = "SELECT n FROM NGBPCmplxPOCreationDelivery n WHERE n.plDelTime = :plDelTime"),
    @NamedQuery(name = "NGBPCmplxPOCreationDelivery.findByGrProcTime", query = "SELECT n FROM NGBPCmplxPOCreationDelivery n WHERE n.grProcTime = :grProcTime"),
    @NamedQuery(name = "NGBPCmplxPOCreationDelivery.findByLatestGRDate", query = "SELECT n FROM NGBPCmplxPOCreationDelivery n WHERE n.latestGRDate = :latestGRDate"),
    @NamedQuery(name = "NGBPCmplxPOCreationDelivery.findByIncoTerms1", query = "SELECT n FROM NGBPCmplxPOCreationDelivery n WHERE n.incoTerms1 = :incoTerms1"),
    @NamedQuery(name = "NGBPCmplxPOCreationDelivery.findByIncoTerms2", query = "SELECT n FROM NGBPCmplxPOCreationDelivery n WHERE n.incoTerms2 = :incoTerms2"),
    @NamedQuery(name = "NGBPCmplxPOCreationDelivery.findByGoodsReceipt", query = "SELECT n FROM NGBPCmplxPOCreationDelivery n WHERE n.goodsReceipt = :goodsReceipt"),
    @NamedQuery(name = "NGBPCmplxPOCreationDelivery.findByGRNonVal", query = "SELECT n FROM NGBPCmplxPOCreationDelivery n WHERE n.gRNonVal = :gRNonVal"),
    @NamedQuery(name = "NGBPCmplxPOCreationDelivery.findByDelvCompleted", query = "SELECT n FROM NGBPCmplxPOCreationDelivery n WHERE n.delvCompleted = :delvCompleted"),
    @NamedQuery(name = "NGBPCmplxPOCreationDelivery.findByUnlimited", query = "SELECT n FROM NGBPCmplxPOCreationDelivery n WHERE n.unlimited = :unlimited"),
    @NamedQuery(name = "NGBPCmplxPOCreationDelivery.findByLinkID", query = "SELECT n FROM NGBPCmplxPOCreationDelivery n WHERE n.linkID = :linkID")})
public class NGBPCmplxPOCreationDelivery implements Serializable {

    private static final long serialVersionUID = 1L;
    @Size(max = 50)
    @Column(name = "ProcInstId")
    private String procInstId;
    @Id
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "InsertionOrderID")
    private Long insertionOrderID;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "OverDelTol")
    private BigDecimal overDelTol;
    @Column(name = "UnderDelTol")
    private BigDecimal underDelTol;
    @Size(max = 50)
    @Column(name = "ShippingInstructions")
    private String shippingInstructions;
    @Size(max = 50)
    @Column(name = "StockType")
    private String stockType;
    @Size(max = 3)
    @Column(name = "FstRem_Exped")
    private String fstRemExped;
    @Size(max = 3)
    @Column(name = "SecRem_Exped")
    private String secRemExped;
    @Size(max = 3)
    @Column(name = "ThrdRem_Exped")
    private String thrdRemExped;
    @Size(max = 15)
    @Column(name = "ValuationType")
    private String valuationType;
    @Size(max = 4)
    @Column(name = "RemShelfLife")
    private String remShelfLife;
    @Size(max = 150)
    @Column(name = "QaControlLife")
    private String qaControlLife;
    @Size(max = 8)
    @Column(name = "NoExpend")
    private String noExpend;
    @Size(max = 3)
    @Column(name = "PlDelTime")
    private String plDelTime;
    @Size(max = 3)
    @Column(name = "GrProcTime")
    private String grProcTime;
    @Column(name = "LatestGRDate")
    @Temporal(TemporalType.DATE)
    private Date latestGRDate;
    @Size(max = 10)
    @Column(name = "IncoTerms1")
    private String incoTerms1;
    @Size(max = 28)
    @Column(name = "IncoTerms2")
    private String incoTerms2;
    @Size(max = 5)
    @Column(name = "GoodsReceipt")
    private String goodsReceipt;
    @Size(max = 5)
    @Column(name = "GRNonVal")
    private String gRNonVal;
    @Size(max = 5)
    @Column(name = "DelvCompleted")
    private String delvCompleted;
    @Size(max = 5)
    @Column(name = "Unlimited")
    private String unlimited;
    @Size(max = 60)
    @Column(name = "LinkID")
    private String linkID;
    @Size(max = 50)
    @Column(name = "PrItemNumber")
    private String prItemNumber;
	
    
    @OneToOne(targetEntity = NGBPCmplxPOCreationLineItemPO.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "LineItem_PO_Id", referencedColumnName = "InsertionOrderID")
    private NGBPCmplxPOCreationLineItemPO nGBPCmplxPOCreationLineItemPO;

    public NGBPCmplxPOCreationLineItemPO getnGBPCmplxPOCreationLineItemPO() {
        return nGBPCmplxPOCreationLineItemPO;
    }

    public void setnGBPCmplxPOCreationLineItemPO(NGBPCmplxPOCreationLineItemPO nGBPCmplxPOCreationLineItemPO) {
        this.nGBPCmplxPOCreationLineItemPO = nGBPCmplxPOCreationLineItemPO;
    }

    public NGBPCmplxPOCreationDelivery() {
    }

    public NGBPCmplxPOCreationDelivery(Long insertionOrderID) {
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

    public BigDecimal getOverDelTol() {
        return overDelTol;
    }

    public void setOverDelTol(BigDecimal overDelTol) {
        this.overDelTol = overDelTol;
    }

    public BigDecimal getUnderDelTol() {
        return underDelTol;
    }

    public void setUnderDelTol(BigDecimal underDelTol) {
        this.underDelTol = underDelTol;
    }

    public String getShippingInstructions() {
        return shippingInstructions;
    }

    public void setShippingInstructions(String shippingInstructions) {
        this.shippingInstructions = shippingInstructions;
    }

    public String getStockType() {
        return stockType;
    }

    public void setStockType(String stockType) {
        this.stockType = stockType;
    }

    public String getFstRemExped() {
        return fstRemExped;
    }

    public void setFstRemExped(String fstRemExped) {
        this.fstRemExped = fstRemExped;
    }

    public String getSecRemExped() {
        return secRemExped;
    }

    public void setSecRemExped(String secRemExped) {
        this.secRemExped = secRemExped;
    }

    public String getThrdRemExped() {
        return thrdRemExped;
    }

    public void setThrdRemExped(String thrdRemExped) {
        this.thrdRemExped = thrdRemExped;
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

    public String getPlDelTime() {
        return plDelTime;
    }

    public void setPlDelTime(String plDelTime) {
        this.plDelTime = plDelTime;
    }

    public String getGrProcTime() {
        return grProcTime;
    }

    public void setGrProcTime(String grProcTime) {
        this.grProcTime = grProcTime;
    }

    public Date getLatestGRDate() {
        return latestGRDate;
    }

    public void setLatestGRDate(Date latestGRDate) {
        this.latestGRDate = latestGRDate;
    }

    public String getIncoTerms1() {
        return incoTerms1;
    }

    public void setIncoTerms1(String incoTerms1) {
        this.incoTerms1 = incoTerms1;
    }

    public String getIncoTerms2() {
        return incoTerms2;
    }

    public void setIncoTerms2(String incoTerms2) {
        this.incoTerms2 = incoTerms2;
    }

    public String getGoodsReceipt() {
        return goodsReceipt;
    }

    public void setGoodsReceipt(String goodsReceipt) {
        this.goodsReceipt = goodsReceipt;
    }

    public String getGRNonVal() {
        return gRNonVal;
    }

    public void setGRNonVal(String gRNonVal) {
        this.gRNonVal = gRNonVal;
    }

    public String getDelvCompleted() {
        return delvCompleted;
    }

    public void setDelvCompleted(String delvCompleted) {
        this.delvCompleted = delvCompleted;
    }

    public String getUnlimited() {
        return unlimited;
    }

    public void setUnlimited(String unlimited) {
        this.unlimited = unlimited;
    }

    public String getLinkID() {
        return linkID;
    }

    public void setLinkID(String linkID) {
        this.linkID = linkID;
    }

    public String getPrItemNumber() {
        return prItemNumber;
    }

    public void setPrItemNumber(String prItemNumber) {
        this.prItemNumber = prItemNumber;
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
        if (!(object instanceof NGBPCmplxPOCreationDelivery)) {
            return false;
        }
        NGBPCmplxPOCreationDelivery other = (NGBPCmplxPOCreationDelivery) object;
        if ((this.insertionOrderID == null && other.insertionOrderID != null) || (this.insertionOrderID != null && !this.insertionOrderID.equals(other.insertionOrderID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.NGBPCmplxPOCreationDelivery[ insertionOrderID=" + insertionOrderID + " ]";
    }

}
