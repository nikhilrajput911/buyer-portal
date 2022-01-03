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
@Table(name = "NG_Cmplx_CM_Line_Data")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NewgenContractLineItem.findAll", query = "SELECT n FROM NewgenContractLineItem n"),
    @NamedQuery(name = "NewgenContractLineItem.findByInsertionOrderID", query = "SELECT n FROM NewgenContractLineItem n WHERE n.insertionOrderID = :insertionOrderID"),
    @NamedQuery(name = "NewgenContractLineItem.findByTransactionID", query = "SELECT n FROM NewgenContractLineItem n WHERE n.transactionID = :transactionID"),
    @NamedQuery(name = "NewgenContractLineItem.findByItemNumber", query = "SELECT n FROM NewgenContractLineItem n WHERE n.itemNumber = :itemNumber"),
    @NamedQuery(name = "NewgenContractLineItem.findByAccountAssignment", query = "SELECT n FROM NewgenContractLineItem n WHERE n.accountAssignment = :accountAssignment"),
    @NamedQuery(name = "NewgenContractLineItem.findByItemCategory", query = "SELECT n FROM NewgenContractLineItem n WHERE n.itemCategory = :itemCategory"),
    @NamedQuery(name = "NewgenContractLineItem.findByMaterialCode", query = "SELECT n FROM NewgenContractLineItem n WHERE n.materialCode = :materialCode"),
    @NamedQuery(name = "NewgenContractLineItem.findByShortText", query = "SELECT n FROM NewgenContractLineItem n WHERE n.shortText = :shortText"),
    @NamedQuery(name = "NewgenContractLineItem.findByMatlLongText", query = "SELECT n FROM NewgenContractLineItem n WHERE n.matlLongText = :matlLongText"),
    @NamedQuery(name = "NewgenContractLineItem.findByTargetedQuantity", query = "SELECT n FROM NewgenContractLineItem n WHERE n.targetedQuantity = :targetedQuantity"),
    @NamedQuery(name = "NewgenContractLineItem.findByUoM", query = "SELECT n FROM NewgenContractLineItem n WHERE n.uoM = :uoM"),
    @NamedQuery(name = "NewgenContractLineItem.findByPerPriceUnit", query = "SELECT n FROM NewgenContractLineItem n WHERE n.perPriceUnit = :perPriceUnit"),
    @NamedQuery(name = "NewgenContractLineItem.findByOrderPriceUnit", query = "SELECT n FROM NewgenContractLineItem n WHERE n.orderPriceUnit = :orderPriceUnit"),
    @NamedQuery(name = "NewgenContractLineItem.findByNetPrice", query = "SELECT n FROM NewgenContractLineItem n WHERE n.netPrice = :netPrice"),
    @NamedQuery(name = "NewgenContractLineItem.findByPlant", query = "SELECT n FROM NewgenContractLineItem n WHERE n.plant = :plant"),
    @NamedQuery(name = "NewgenContractLineItem.findByMatlGroup", query = "SELECT n FROM NewgenContractLineItem n WHERE n.matlGroup = :matlGroup"),
    @NamedQuery(name = "NewgenContractLineItem.findByStorageLocation", query = "SELECT n FROM NewgenContractLineItem n WHERE n.storageLocation = :storageLocation"),
    @NamedQuery(name = "NewgenContractLineItem.findByItemText", query = "SELECT n FROM NewgenContractLineItem n WHERE n.itemText = :itemText"),
    @NamedQuery(name = "NewgenContractLineItem.findByItemNote", query = "SELECT n FROM NewgenContractLineItem n WHERE n.itemNote = :itemNote"),
    @NamedQuery(name = "NewgenContractLineItem.findByNotetoApprover", query = "SELECT n FROM NewgenContractLineItem n WHERE n.notetoApprover = :notetoApprover"),
    @NamedQuery(name = "NewgenContractLineItem.findById", query = "SELECT n FROM NewgenContractLineItem n WHERE n.insertionOrderID = :id"),
    @NamedQuery(name = "NewgenContractLineItem.findByStatus", query = "SELECT n FROM NewgenContractLineItem n WHERE n.bpStatus = :status order by n.bpAssigndate desc"),
    @NamedQuery(name = "NewgenContractLineItem.findByStatusAndBuyer", query = "SELECT n FROM NewgenContractLineItem n WHERE n.bpStatus = :status and n.bpBuyerdetailsId.id = :buyerid"),
    @NamedQuery(name = "NewgenContractLineItem.findByTransactionAndItem", query = "SELECT n FROM NewgenContractLineItem n WHERE n.transactionID = :transactionID and n.itemNumber = :itemNumber"),
   @NamedQuery(name = "NewgenContractLineItem.findByLinkID", query = "SELECT n FROM NewgenContractLineItem n WHERE n.linkid = :linkid"),
    @NamedQuery(name = "NewgenContractLineItem.findByMultipleId", query = "SELECT n FROM NewgenContractLineItem n WHERE n.insertionOrderID IN :ids")})

public class NewgenContractLineItem implements Serializable {
    
    
    @Size(max = 50)
    @Column(name = "Co_Code")
    private String coCode;
    @Size(max = 50)
    @Column(name = "Tender_Contract_Number")
    private String tenderContractNumber;
    @Size(max = 50)
    @Column(name = "Purchase_GROUP")
    private String purchaseGROUP;
    @Size(max = 50)
    @Column(name = "Material_Class")
    private String materialClass;
    @Size(max = 50)
    @Column(name = "Type")
    private String type;
    @Size(max = 50)
    @Column(name = "Tender_Raised_By")
    private String tenderRaisedBy;
    @Size(max = 50)
    @Column(name = "Tender_Title")
    private String tenderTitle;
    @Size(max = 50)
    @Column(name = "User_Cost_Center")
    private String userCostCenter;
    @Column(name = "Activation_Date_Service")
    @Temporal(TemporalType.TIMESTAMP)
    private Date activationDateService;
    private static final long serialVersionUID = 1L;
    @JoinColumn(name = "BP_buyerdetails_id", referencedColumnName = "Id")
    @ManyToOne
    private BuyerDetails bpBuyerdetailsId;
    @Size(max = 20)
    @Column(name = "BP_status")
    private String bpStatus;
    @Size(max = 20)
    @Column(name = "BP_rfq_status")
    private String bpRfqStatus;
    
    @Column(name = "BP_quantity_remaining")
    private BigDecimal bpQuantityRemaining;
    @Column(name = "BP_assign_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date bpAssigndate;

    @Id
    @Basic(optional = false)
//    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "InsertionOrderID")
    private Integer insertionOrderID;
    @Size(max = 30)
    @Column(name = "TransactionID")
    private String transactionID;
    @Size(max = 5)
    @Column(name = "Item_Number")
    private String itemNumber;
    @Size(max = 1)
    @Column(name = "Account_Assignment")
    private String accountAssignment;
    @Size(max = 1)
    @Column(name = "Item_Category")
    private String itemCategory;
    @Size(max = 18)
    @Column(name = "Material_Code")
    private String materialCode;
    @Size(max = 40)
    @Column(name = "Short_Text")
    private String shortText;
    @Size(max = 2147483647)
    @Column(name = "Matl_Long_Text")
    private String matlLongText;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "Targeted_Quantity")
    private BigDecimal targetedQuantity;
    @Size(max = 5)
    @Column(name = "UoM")
    private String uoM;
    @Size(max = 5)
    @Column(name = "Per_Price_Unit")
    private String perPriceUnit;
    @Size(max = 3)
    @Column(name = "Order_Price_Unit")
    private String orderPriceUnit;
    @Column(name = "Net_Price")
    private BigDecimal netPrice;
    @Size(max = 30)
    @Column(name = "Plant")
    private String plant;
    @Size(max = 20)
    @Column(name = "Matl_Group")
    private String matlGroup;
    @Size(max = 16)
    @Column(name = "Storage_Location")
    private String storageLocation;
    @Size(max = 2147483647)
    @Column(name = "Item_Text")
    private String itemText;
    @Size(max = 2147483647)
    @Column(name = "Item_Note")
    private String itemNote;
    
    @Size(max = 50)
    @Column(name = "Old_Mat_Code")
    private String old_Mat_Code;

    public String getOld_Mat_Code() {
        return old_Mat_Code;
    }

    public void setOld_Mat_Code(String old_Mat_Code) {
        this.old_Mat_Code = old_Mat_Code;
    }

    public String getLinkid() {
        return linkid;
    }

    public void setLinkid(String linkid) {
        this.linkid = linkid;
    }
    @Size(max = 2147483647)
    @Column(name = "Note_to_Approver")
    private String notetoApprover;
    @Size(max = 20)
    @Column(name = "linkid")
    private String linkid;

    public NewgenContractLineItem() {
    }

    public NewgenContractLineItem(Integer insertionOrderID) {
        this.insertionOrderID = insertionOrderID;
    }

    public Integer getInsertionOrderID() {
        return insertionOrderID;
    }

    public void setInsertionOrderID(Integer insertionOrderID) {
        this.insertionOrderID = insertionOrderID;
    }

    public String getTransactionID() {
        return transactionID;
    }

    public void setTransactionID(String transactionID) {
        this.transactionID = transactionID;
    }

    public String getItemNumber() {
        return itemNumber;
    }

    public void setItemNumber(String itemNumber) {
        this.itemNumber = itemNumber;
    }

    public String getAccountAssignment() {
        return accountAssignment;
    }

    public void setAccountAssignment(String accountAssignment) {
        this.accountAssignment = accountAssignment;
    }

    public String getItemCategory() {
        return itemCategory;
    }

    public void setItemCategory(String itemCategory) {
        this.itemCategory = itemCategory;
    }

    public String getMaterialCode() {
        return materialCode;
    }

    public void setMaterialCode(String materialCode) {
        this.materialCode = materialCode;
    }

    public String getShortText() {
        return shortText;
    }

    public void setShortText(String shortText) {
        this.shortText = shortText;
    }

    public String getMatlLongText() {
        return matlLongText;
    }

    public void setMatlLongText(String matlLongText) {
        this.matlLongText = matlLongText;
    }

    public BigDecimal getTargetedQuantity() {
        return targetedQuantity;
    }

    public void setTargetedQuantity(BigDecimal targetedQuantity) {
        this.targetedQuantity = targetedQuantity;
    }

    public String getUoM() {
        return uoM;
    }

    public void setUoM(String uoM) {
        this.uoM = uoM;
    }

    public String getPerPriceUnit() {
        return perPriceUnit;
    }

    public void setPerPriceUnit(String perPriceUnit) {
        this.perPriceUnit = perPriceUnit;
    }

    public String getOrderPriceUnit() {
        return orderPriceUnit;
    }

    public void setOrderPriceUnit(String orderPriceUnit) {
        this.orderPriceUnit = orderPriceUnit;
    }

    public BigDecimal getNetPrice() {
        return netPrice;
    }

    public void setNetPrice(BigDecimal netPrice) {
        this.netPrice = netPrice;
    }

    public String getPlant() {
        return plant;
    }

    public void setPlant(String plant) {
        this.plant = plant;
    }

    public String getMatlGroup() {
        return matlGroup;
    }

    public void setMatlGroup(String matlGroup) {
        this.matlGroup = matlGroup;
    }

    public String getStorageLocation() {
        return storageLocation;
    }

    public void setStorageLocation(String storageLocation) {
        this.storageLocation = storageLocation;
    }

    public String getItemText() {
        return itemText;
    }

    public void setItemText(String itemText) {
        this.itemText = itemText;
    }

    public String getItemNote() {
        return itemNote;
    }

    public void setItemNote(String itemNote) {
        this.itemNote = itemNote;
    }

    public String getNotetoApprover() {
        return notetoApprover;
    }

    public void setNotetoApprover(String notetoApprover) {
        this.notetoApprover = notetoApprover;
    }

    public BuyerDetails getBpBuyerdetailsId() {
        return bpBuyerdetailsId;
    }

    public void setBpBuyerdetailsId(BuyerDetails bpBuyerdetailsId) {
        this.bpBuyerdetailsId = bpBuyerdetailsId;
    }

    public String getBpStatus() {
        return bpStatus;
    }

    public void setBpStatus(String bpStatus) {
        this.bpStatus = bpStatus;
    }

    public String getBpRfqStatus() {
        return bpRfqStatus;
    }

    public void setBpRfqStatus(String bpRfqStatus) {
        this.bpRfqStatus = bpRfqStatus;
    }

    public BigDecimal getBpQuantityRemaining() {
        return bpQuantityRemaining;
    }

    public void setBpQuantityRemaining(BigDecimal bpQuantityRemaining) {
        this.bpQuantityRemaining = bpQuantityRemaining;
    }

    public Date getBpAssigndate() {
        return bpAssigndate;
    }

    public void setBpAssigndate(Date bpAssigndate) {
        this.bpAssigndate = bpAssigndate;
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
        if (!(object instanceof NewgenContractLineItem)) {
            return false;
        }
        NewgenContractLineItem other = (NewgenContractLineItem) object;
        if ((this.insertionOrderID == null && other.insertionOrderID != null) || (this.insertionOrderID != null && !this.insertionOrderID.equals(other.insertionOrderID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.NewgenContractLineItem[ insertionOrderID=" + insertionOrderID + " ]";
    }
    public String getCoCode() {
        return coCode;
    }

    public void setCoCode(String coCode) {
        this.coCode = coCode;
    }

    public String getTenderContractNumber() {
        return tenderContractNumber;
    }

    public void setTenderContractNumber(String tenderContractNumber) {
        this.tenderContractNumber = tenderContractNumber;
    }

    public String getPurchaseGROUP() {
        return purchaseGROUP;
    }

    public void setPurchaseGROUP(String purchaseGROUP) {
        this.purchaseGROUP = purchaseGROUP;
    }

    public String getMaterialClass() {
        return materialClass;
    }

    public void setMaterialClass(String materialClass) {
        this.materialClass = materialClass;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTenderRaisedBy() {
        return tenderRaisedBy;
    }

    public void setTenderRaisedBy(String tenderRaisedBy) {
        this.tenderRaisedBy = tenderRaisedBy;
    }

    public String getTenderTitle() {
        return tenderTitle;
    }

    public void setTenderTitle(String tenderTitle) {
        this.tenderTitle = tenderTitle;
    }

    public String getUserCostCenter() {
        return userCostCenter;
    }

    public void setUserCostCenter(String userCostCenter) {
        this.userCostCenter = userCostCenter;
    }

    public Date getActivationDateService() {
        return activationDateService;
    }

    public void setActivationDateService(Date activationDateService) {
        this.activationDateService = activationDateService;
    }
}
