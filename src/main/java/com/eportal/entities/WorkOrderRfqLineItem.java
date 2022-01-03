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
 * @author RaphelTudu
 */
@Entity
@Table(name = "NG_BP_workorderrfqlineitem")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "WorkOrderRfqLineItem.findAll", query = "SELECT w FROM WorkOrderRfqLineItem w"),
    @NamedQuery(name = "WorkOrderRfqLineItem.findByRFQLineID", query = "SELECT w FROM WorkOrderRfqLineItem w WHERE w.rFQLineID = :rFQLineID"),
    @NamedQuery(name = "WorkOrderRfqLineItem.findByCategory", query = "SELECT w FROM WorkOrderRfqLineItem w WHERE w.category = :category"),
    @NamedQuery(name = "WorkOrderRfqLineItem.findBySubcategory", query = "SELECT w FROM WorkOrderRfqLineItem w WHERE w.subcategory = :subcategory"),
    @NamedQuery(name = "WorkOrderRfqLineItem.findByItemname", query = "SELECT w FROM WorkOrderRfqLineItem w WHERE w.itemname = :itemname"),
    @NamedQuery(name = "WorkOrderRfqLineItem.findByTargetprice", query = "SELECT w FROM WorkOrderRfqLineItem w WHERE w.targetprice = :targetprice"),
    @NamedQuery(name = "WorkOrderRfqLineItem.findByUpdatedate", query = "SELECT w FROM WorkOrderRfqLineItem w WHERE w.updatedate = :updatedate"),
    @NamedQuery(name = "WorkOrderRfqLineItem.findByUpdatedby", query = "SELECT w FROM WorkOrderRfqLineItem w WHERE w.updatedby = :updatedby"),
    @NamedQuery(name = "WorkOrderRfqLineItem.findByQuantity", query = "SELECT w FROM WorkOrderRfqLineItem w WHERE w.quantity = :quantity"),
    @NamedQuery(name = "WorkOrderRfqLineItem.findByCreationdate", query = "SELECT w FROM WorkOrderRfqLineItem w WHERE w.creationdate = :creationdate"),
    @NamedQuery(name = "WorkOrderRfqLineItem.findByCreatedby", query = "SELECT w FROM WorkOrderRfqLineItem w WHERE w.createdby = :createdby"),
    @NamedQuery(name = "WorkOrderRfqLineItem.findByHeaderId", query = "SELECT w FROM WorkOrderRfqLineItem w WHERE w.bPaasWorkOrderRFQHeaderRFQID.rfqid = :rfqid and w.ngBpNewgenPRLineItemId.bpStatus != 'Rejected'"),
    @NamedQuery(name = "WorkOrderRfqLineItem.findByMultipleRfqLineId", query = "SELECT w FROM WorkOrderRfqLineItem w WHERE w.rFQLineID IN :ids"),
    @NamedQuery(name = "WorkOrderRfqLineItem.findByAf2", query = "SELECT w FROM WorkOrderRfqLineItem w WHERE w.af2 = :af2"),
    @NamedQuery(name = "WorkOrderRfqLineItem.findByAf3", query = "SELECT w FROM WorkOrderRfqLineItem w WHERE w.af3 = :af3"),
    @NamedQuery(name = "WorkOrderRfqLineItem.findByAf4", query = "SELECT w FROM WorkOrderRfqLineItem w WHERE w.af4 = :af4"),
    @NamedQuery(name = "WorkOrderRfqLineItem.findByAf5", query = "SELECT w FROM WorkOrderRfqLineItem w WHERE w.af5 = :af5"),
    @NamedQuery(name = "WorkOrderRfqLineItem.findByRfqId", query = "SELECT w FROM WorkOrderRfqLineItem w WHERE w.bPaasWorkOrderRFQHeaderRFQID.rfqid = :rfqid"),
    @NamedQuery(name = "WorkOrderRfqLineItem.findWorkOrderRfqLineItemByPrId", query = "SELECT w FROM WorkOrderRfqLineItem w WHERE w.ngBpPrDetailsId.id = :prid")})
public class WorkOrderRfqLineItem implements Serializable {
//    @Size(max = 5000)
//    @Column(name = "TermsTOSupplier")
//    private String termsToSupplier;
    @Size(max = 500)
    @Column(name = "NotesTOSupplier")
    private String notesToSupplier;
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
    @Size(max = 50)
    @Column(name = "baselineprice_perunit")
    private String baselinepricePerunit;
//    @JoinColumn(name = "ng_bp_pr_details_id", referencedColumnName = "Id")
//    @ManyToOne
//    private PRDetails ngBpPrDetailsId;
    
    @JoinColumn(name = "NG_BP_Newgen_PR_LineItem_InsertionOrderID", referencedColumnName = "InsertionOrderID")
    @ManyToOne
    private NewgenPRLineItem ngBpNewgenPRLineItemId;
    
    @Size(max = 20)
    @Column(name = "quantity")
    private String quantity;
    @Size(max = 20)
    @Column(name = "itemcode")
    private String itemcode;
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "RFQLineID")
    private Integer rFQLineID;
    @Size(max = 30)
    @Column(name = "category")
    private String category;
    @Size(max = 30)
    @Column(name = "subcategory")
    private String subcategory;
    @Size(max = 40)
    @Column(name = "itemname")
    private String itemname;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "targetprice")
    private Double targetprice;
    @Column(name = "updatedate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedate;
    @Size(max = 30)
    @Column(name = "updatedby")
    private String updatedby;
    @Column(name = "creationdate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationdate;
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
    @JoinColumn(name = "NG_BP_WorkOrderRFQHeader_RFQID", referencedColumnName = "RFQID")
//    @ManyToOne(optional = false)
    @ManyToOne
    private WorkOrderRfqHeader bPaasWorkOrderRFQHeaderRFQID;
    @Size(max = 20)
    @Column(name = "status")
    private String status;
    @Size(max = 2147483647)
    @Column(name = "comments")
    private String comments;
    @Size(max = 2147483647)
    @Column(name = "WhyThisVendor")
    private String whyThisVendor;
    @Size(max = 2147483647)
    @Column(name = "NoteToApprover")
    private String noteToApprover;
    @Column(name = "RemainingQuantity")
    private String remainingQuantity;
    @Size(max = 20)
    @Column(name = "PoStatus")
    private String poStatus;
    @JoinColumn(name = "PoVendor", referencedColumnName = "Id")
    @ManyToOne
    private VendorDetails poVendor;
    @JoinColumn(name = "AwardedVendor", referencedColumnName = "Id")
    @ManyToOne
    private VendorDetails awardedVendor;
    @Size(max = 20)
    @Column(name = "ItemNumber")
    private String itemNumber;

    public WorkOrderRfqLineItem() {
    }

    public WorkOrderRfqLineItem(Integer rFQLineID) {
        this.rFQLineID = rFQLineID;
    }

    public Integer getRFQLineID() {
        return rFQLineID;
    }

    public void setRFQLineID(Integer rFQLineID) {
        this.rFQLineID = rFQLineID;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getSubcategory() {
        return subcategory;
    }

    public void setSubcategory(String subcategory) {
        this.subcategory = subcategory;
    }

    public String getItemname() {
        return itemname;
    }

    public void setItemname(String itemname) {
        this.itemname = itemname;
    }

    public Double getTargetprice() {
        return targetprice;
    }

    public void setTargetprice(Double targetprice) {
        this.targetprice = targetprice;
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

    public Date getCreationdate() {
        return creationdate;
    }

    public void setCreationdate(Date creationdate) {
        this.creationdate = creationdate;
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

    public WorkOrderRfqHeader getBPaasWorkOrderRFQHeaderRFQID() {
        return bPaasWorkOrderRFQHeaderRFQID;
    }

    public void setBPaasWorkOrderRFQHeaderRFQID(WorkOrderRfqHeader bPaasWorkOrderRFQHeaderRFQID) {
        this.bPaasWorkOrderRFQHeaderRFQID = bPaasWorkOrderRFQHeaderRFQID;
    }

    public String getItemcode() {
        return itemcode;
    }

    public void setItemcode(String itemcode) {
        this.itemcode = itemcode;
    }

    public String getBaselinepricePerunit() {
        return baselinepricePerunit;
    }

    public void setBaselinepricePerunit(String baselinepricePerunit) {
        this.baselinepricePerunit = baselinepricePerunit;
    }

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

    public String getNotesToSupplier() {
        return notesToSupplier;
    }

    public void setNotesToSupplier(String notesToSupplier) {
        this.notesToSupplier = notesToSupplier;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getWhyThisVendor() {
        return whyThisVendor;
    }

    public void setWhyThisVendor(String whyThisVendor) {
        this.whyThisVendor = whyThisVendor;
    }

    public String getNoteToApprover() {
        return noteToApprover;
    }

    public void setNoteToApprover(String noteToApprover) {
        this.noteToApprover = noteToApprover;
    }

    public String getRemainingQuantity() {
        return remainingQuantity;
    }

    public void setRemainingQuantity(String remainingQuantity) {
        this.remainingQuantity = remainingQuantity;
    }

    public String getPoStatus() {
        return poStatus;
    }

    public void setPoStatus(String poStatus) {
        this.poStatus = poStatus;
    }

    public VendorDetails getPoVendor() {
        return poVendor;
    }

    public void setPoVendor(VendorDetails poVendor) {
        this.poVendor = poVendor;
    }

    public VendorDetails getAwardedVendor() {
        return awardedVendor;
    }

    public void setAwardedVendor(VendorDetails awardedVendor) {
        this.awardedVendor = awardedVendor;
    }

    public String getItemNumber() {
        return itemNumber;
    }

    public void setItemNumber(String itemNumber) {
        this.itemNumber = itemNumber;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }
    
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (rFQLineID != null ? rFQLineID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof WorkOrderRfqLineItem)) {
            return false;
        }
        WorkOrderRfqLineItem other = (WorkOrderRfqLineItem) object;
        if ((this.rFQLineID == null && other.rFQLineID != null) || (this.rFQLineID != null && !this.rFQLineID.equals(other.rFQLineID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.WorkOrderRfqLineItem[ rFQLineID=" + rFQLineID + " ]";
    }
}
