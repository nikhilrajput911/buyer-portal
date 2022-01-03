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
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
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
 * @author Sunny Kumar
 */
@Entity
@Table(name = "NG_BP_contractrfqlineitem")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "ContractRfqLineItem.findAll", query = "SELECT c FROM ContractRfqLineItem c"),
    @NamedQuery(name = "ContractRfqLineItem.findByRFQLineID", query = "SELECT c FROM ContractRfqLineItem c WHERE c.rFQLineID = :rFQLineID"),
    @NamedQuery(name = "ContractRfqLineItem.findByAf1", query = "SELECT c FROM ContractRfqLineItem c WHERE c.af1 = :af1"),
    @NamedQuery(name = "ContractRfqLineItem.findByAf2", query = "SELECT c FROM ContractRfqLineItem c WHERE c.af2 = :af2"),
    @NamedQuery(name = "ContractRfqLineItem.findByAf3", query = "SELECT c FROM ContractRfqLineItem c WHERE c.af3 = :af3"),
    @NamedQuery(name = "ContractRfqLineItem.findByAf4", query = "SELECT c FROM ContractRfqLineItem c WHERE c.af4 = :af4"),
    @NamedQuery(name = "ContractRfqLineItem.findByAf5", query = "SELECT c FROM ContractRfqLineItem c WHERE c.af5 = :af5"),
    @NamedQuery(name = "ContractRfqLineItem.findByCategory", query = "SELECT c FROM ContractRfqLineItem c WHERE c.category = :category"),
    @NamedQuery(name = "ContractRfqLineItem.findByCreatedby", query = "SELECT c FROM ContractRfqLineItem c WHERE c.createdby = :createdby"),
    @NamedQuery(name = "ContractRfqLineItem.findByCreationdate", query = "SELECT c FROM ContractRfqLineItem c WHERE c.creationdate = :creationdate"),
    @NamedQuery(name = "ContractRfqLineItem.findByItemcode", query = "SELECT c FROM ContractRfqLineItem c WHERE c.itemcode = :itemcode"),
    @NamedQuery(name = "ContractRfqLineItem.findByItemname", query = "SELECT c FROM ContractRfqLineItem c WHERE c.itemname = :itemname"),
    @NamedQuery(name = "ContractRfqLineItem.findByQuantity", query = "SELECT c FROM ContractRfqLineItem c WHERE c.quantity = :quantity"),
    @NamedQuery(name = "ContractRfqLineItem.findBySubcategory", query = "SELECT c FROM ContractRfqLineItem c WHERE c.subcategory = :subcategory"),
    @NamedQuery(name = "ContractRfqLineItem.findByTargetprice", query = "SELECT c FROM ContractRfqLineItem c WHERE c.targetprice = :targetprice"),
    @NamedQuery(name = "ContractRfqLineItem.findByUpdatedate", query = "SELECT c FROM ContractRfqLineItem c WHERE c.updatedate = :updatedate"),
    @NamedQuery(name = "ContractRfqLineItem.findByUpdatedby", query = "SELECT c FROM ContractRfqLineItem c WHERE c.updatedby = :updatedby"),
//    @NamedQuery(name = "ContractRfqLineItem.findByNGBPcontractrfqheaderRFQID", query = "SELECT c FROM ContractRfqLineItem c WHERE c.nGBPcontractrfqheaderRFQID = :nGBPcontractrfqheaderRFQID"),
    @NamedQuery(name = "ContractRfqLineItem.findByBaselinepricePerunit", query = "SELECT c FROM ContractRfqLineItem c WHERE c.baselinepricePerunit = :baselinepricePerunit"),
    @NamedQuery(name = "ContractRfqLineItem.findByAttachment1name", query = "SELECT c FROM ContractRfqLineItem c WHERE c.attachment1name = :attachment1name"),
    @NamedQuery(name = "ContractRfqLineItem.findByAttachment2name", query = "SELECT c FROM ContractRfqLineItem c WHERE c.attachment2name = :attachment2name"),
    @NamedQuery(name = "ContractRfqLineItem.findByAttachment3name", query = "SELECT c FROM ContractRfqLineItem c WHERE c.attachment3name = :attachment3name"),
    @NamedQuery(name = "ContractRfqLineItem.findByAttachment4name", query = "SELECT c FROM ContractRfqLineItem c WHERE c.attachment4name = :attachment4name"),
    @NamedQuery(name = "ContractRfqLineItem.findByAttachment5name", query = "SELECT c FROM ContractRfqLineItem c WHERE c.attachment5name = :attachment5name"),
    @NamedQuery(name = "ContractRfqLineItem.findByNewgenContractLineItemId", query = "SELECT c FROM ContractRfqLineItem c WHERE c.newgenContractLineItemId.insertionOrderID = :newgenContractLineItemId")})
public class ContractRfqLineItem implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
//    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RFQLineID")
    private Integer rFQLineID;
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
    @Size(max = 30)
    @Column(name = "category")
    private String category;
    @Size(max = 30)
    @Column(name = "createdby")
    private String createdby;
    @Column(name = "creationdate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationdate;
    @Size(max = 20)
    @Column(name = "itemcode")
    private String itemcode;
    @Size(max = 40)
    @Column(name = "itemname")
    private String itemname;
    @Column(name = "quantity")
    private BigDecimal quantity;
    @Size(max = 30)
    @Column(name = "subcategory")
    private String subcategory;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "targetprice")
    private Double targetprice;
    @Column(name = "updatedate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedate;
    @Size(max = 30)
    @Column(name = "updatedby")
    private String updatedby;
    
     @Size(max = 500)
    @Column(name = "NoteToSupplier")
    private String NoteToSupplier;
//    @Basic(optional = false)
//    @NotNull
//    @Column(name = "NG_BP_contractrfqheader_RFQID")
//    private int nGBPcontractrfqheaderRFQID;
    @JoinColumn(name = "NG_BP_ContractRfqHeader_RFQID", referencedColumnName = "RFQID")
    @ManyToOne
    private ContractRfqHeader contractRfqHeaderRFQID;
    @JoinColumn(name = "NG_BP_Contractattachment_temp_ID", referencedColumnName = "Id")
    @ManyToOne
    private ContractAttachmentTemp contractAttachmentTempID;

    public ContractAttachmentTemp getContractAttachmentTempID() {
        return contractAttachmentTempID;
    }

    public void setContractAttachmentTempID(ContractAttachmentTemp contractAttachmentTempID) {
        this.contractAttachmentTempID = contractAttachmentTempID;
    }
    @Size(max = 50)
    @Column(name = "baselineprice_perunit")
    private String baselinepricePerunit;

    public Integer getrFQLineID() {
        return rFQLineID;
    }

    public void setrFQLineID(Integer rFQLineID) {
        this.rFQLineID = rFQLineID;
    }

    public String getNoteToSupplier() {
        return NoteToSupplier;
    }

    public void setNoteToSupplier(String NoteToSupplier) {
        this.NoteToSupplier = NoteToSupplier;
    }
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
    
//    @Column(name = "NG_BP_Newgen_Contract_LineItem_InsertionOrderID")
//    private Integer nGBPNewgenContractLineItemInsertionOrderID;
    @JoinColumn(name = "NG_BP_Newgen_Contract_LineItem_InsertionOrderID", referencedColumnName = "InsertionOrderID")
    @ManyToOne(optional = false)
    private NewgenContractLineItem newgenContractLineItemId;

    public ContractRfqLineItem() {
    }

    public ContractRfqLineItem(Integer rFQLineID) {
        this.rFQLineID = rFQLineID;
    }

    public ContractRfqLineItem(Integer rFQLineID, int contractrfqheaderRFQID) {
        this.rFQLineID = rFQLineID;
//        this.contractrfqheaderRFQID = contractrfqheaderRFQID;
    }

    public Integer getRFQLineID() {
        return rFQLineID;
    }

    public void setRFQLineID(Integer rFQLineID) {
        this.rFQLineID = rFQLineID;
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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
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

    public String getItemcode() {
        return itemcode;
    }

    public void setItemcode(String itemcode) {
        this.itemcode = itemcode;
    }

    public String getItemname() {
        return itemname;
    }

    public void setItemname(String itemname) {
        this.itemname = itemname;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public String getSubcategory() {
        return subcategory;
    }

    public void setSubcategory(String subcategory) {
        this.subcategory = subcategory;
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

//    public int getNGBPcontractrfqheaderRFQID() {
//        return nGBPcontractrfqheaderRFQID;
//    }
//
//    public void setNGBPcontractrfqheaderRFQID(int nGBPcontractrfqheaderRFQID) {
//        this.nGBPcontractrfqheaderRFQID = nGBPcontractrfqheaderRFQID;
//    }
    public ContractRfqHeader getContractRfqHeaderRFQID() {
        return contractRfqHeaderRFQID;
    }

    public void setContractRfqHeaderRFQID(ContractRfqHeader contractRfqHeaderRFQID) {
        this.contractRfqHeaderRFQID = contractRfqHeaderRFQID;
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

//    public Integer getNGBPNewgenContractLineItemInsertionOrderID() {
//        return nGBPNewgenContractLineItemInsertionOrderID;
//    }
//
//    public void setNGBPNewgenContractLineItemInsertionOrderID(Integer nGBPNewgenContractLineItemInsertionOrderID) {
//        this.nGBPNewgenContractLineItemInsertionOrderID = nGBPNewgenContractLineItemInsertionOrderID;
//    }
    public NewgenContractLineItem getNewgenContractLineItemId() {
        return newgenContractLineItemId;
    }

    public void setNewgenContractLineItemId(NewgenContractLineItem newgenContractLineItemId) {
        this.newgenContractLineItemId = newgenContractLineItemId;
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
        if (!(object instanceof ContractRfqLineItem)) {
            return false;
        }
        ContractRfqLineItem other = (ContractRfqLineItem) object;
        if ((this.rFQLineID == null && other.rFQLineID != null) || (this.rFQLineID != null && !this.rFQLineID.equals(other.rFQLineID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.ContractRfqLineItem[ rFQLineID=" + rFQLineID + " ]";
    }
    
}
