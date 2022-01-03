
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

@Entity
@Table(name = "NG_Cmplx_CM_Spend_data")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NewgenSpendData.findAll", query = "SELECT n FROM NewgenSpendData n"),
    @NamedQuery(name = "NewgenSpendData.findByInsertionOrderID", query = "SELECT n FROM NewgenSpendData n WHERE n.insertionOrderID = :insertionOrderID"),
    @NamedQuery(name = "NewgenSpendData.findByTransactionID", query = "SELECT n FROM NewgenSpendData n WHERE n.transactionID = :transactionID"),
  //  @NamedQuery(name = "NewgenSpendData.findByPurchase_Doc", query = "SELECT n FROM NewgenSpendData n WHERE n.purchase_Doc = :purchase_Doc"),
  //  @NamedQuery(name = "NewgenSpendData.findByMatl_Doc", query = "SELECT n FROM NewgenSpendData n WHERE n.matll_doc = :matl_doc"),
    @NamedQuery(name = "NewgenSpendData.findByMovementType", query = "SELECT n FROM NewgenSpendData n WHERE n.movementType = :movementType"),
    @NamedQuery(name = "NewgenSpendData.findByAccountAssignment", query = "SELECT n FROM NewgenSpendData n WHERE n.accountAssignment = :accountAssignment"),
    @NamedQuery(name = "NewgenSpendData.findByDebitorCredit", query = "SELECT n FROM NewgenSpendData n WHERE n.debitorCredit = :debitorCredit"),
    @NamedQuery(name = "NewgenSpendData.findByItem", query = "SELECT n FROM NewgenSpendData n WHERE n.item = :item"),
    @NamedQuery(name = "NewgenSpendData.findByOrderType", query = "SELECT n FROM NewgenSpendData n WHERE n.orderType = :orderType"),
    @NamedQuery(name = "NewgenSpendData.findByMaterial_SVSNumber", query = "SELECT n FROM NewgenSpendData n WHERE n.material_SVSNumber = :material_SVSNumber"),
    @NamedQuery(name = "NewgenSpendData.findByMaterial_ServiceDescription", query = "SELECT n FROM NewgenSpendData n WHERE n.material_ServiceDescription = :material_ServiceDescription"),
    @NamedQuery(name = "NewgenSpendData.findByPlantCode", query = "SELECT n FROM NewgenSpendData n WHERE n.plantCode = :plantCode"),
    @NamedQuery(name = "NewgenSpendData.findByMaterialGroup_SVSNumber", query = "SELECT n FROM NewgenSpendData n WHERE n.materialGroup_SVSNumber = :materialGroup_SVSNumber"),
    @NamedQuery(name = "NewgenSpendData.findByMaterialServiceGroupDescription", query = "SELECT n FROM NewgenSpendData n WHERE n.materialServiceGroupDescription = :materialServiceGroupDescription"),
  //  @NamedQuery(name = "NewgenSpendData.findByReportGroup", query = "SELECT n FROM NewgenSpendData n WHERE n.reportgroup = :reportgroup"),
    @NamedQuery(name = "NewgenSpendData.findByPosting_Date", query = "SELECT n FROM NewgenSpendData n WHERE n.posting_Date = :posting_Date"),
    @NamedQuery(name = "NewgenSpendData.findByGRQuantity", query = "SELECT n FROM NewgenSpendData n WHERE n.gRQuantity = :gRQuantity"),
    @NamedQuery(name = "NewgenSpendData.findByLCAmount", query = "SELECT n FROM NewgenSpendData n WHERE n.lCAmount = :lCAmount"),
    @NamedQuery(name = "NewgenSpendData.findBySOW_RefNo", query = "SELECT n FROM NewgenSpendData n WHERE n.sOW_RefNo = :sOW_RefNo"),
    @NamedQuery(name = "NewgenSpendData.findBySpocname", query = "SELECT n FROM NewgenSpendData n WHERE n.spocname = :spocname")

})
public class NewgenSpendData implements Serializable {
    
    @Size(max = 50)
    @Column(name = "Purchase_Doc")
    private String purchaseDoc;
    @Size(max = 50)
    @Column(name = "Matl_Doc")
    private String matlDoc;
    @Size(max = 50)
    @Column(name = "MovementType")
    private String movementType;
    @Size(max = 50)
    @Column(name = "AccountAssignment")
    private String accountAssignment;
    @Size(max = 50)
    @Column(name = "DebitorCredit")
    private String debitorCredit;
    @Size(max = 50)
    @Column(name = "Item")
    private String item;
    @Size(max = 50)
    @Column(name = "OrderType")
    private String orderType;
    @Size(max = 50)
    @Column(name = "Material_SVSNumber")
    private String material_SVSNumber;
     @Size(max = 50)
    @Column(name = "Material_ServiceDescription")
    private Date material_ServiceDescription;
    private static final long serialVersionUID = 1L;
    @Size(max = 50)
    @Column(name = "PlantCode")
    private String plantCode;
    @Size(max = 50)
    @Column(name = "MaterialGroup_SVSNumber")
    private String materialGroup_SVSNumber;
    @Size(max = 50)
    @Column(name = "MaterialServiceGroupDescription")
    private String materialServiceGroupDescription;
    @Column(name = "Posting_Date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date posting_Date;

    @Id
    @Basic(optional = false)
//    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "InsertionOrderID")
    private Integer insertionOrderID;
    @Size(max = 30)
    @Column(name = "TransactionID")
    private String transactionID;
    @Size(max = 50)
    @Column(name = "ReportGroup")
    private String itemNumber;
    @Size(max = 50)
    @Column(name = "GRQuantity")
    private String gRQuantity;
    @Size(max = 100)
    @Column(name = "LCAmount")
    private String lCAmount;
    @Size(max = 18)
    @Column(name = "SOW_RefNo")
    private String sOW_RefNo;
    @Size(max = 40)
    @Column(name = "spocname")
    private String spocname;

    public String getPurchaseDoc() {
        return purchaseDoc;
    }

    public void setPurchaseDoc(String purchaseDoc) {
        this.purchaseDoc = purchaseDoc;
    }

    public String getMatlDoc() {
        return matlDoc;
    }

    public void setMatlDoc(String matlDoc) {
        this.matlDoc = matlDoc;
    }

    public String getMovementType() {
        return movementType;
    }

    public void setMovementType(String movementType) {
        this.movementType = movementType;
    }

    public String getAccountAssignment() {
        return accountAssignment;
    }

    public void setAccountAssignment(String accountAssignment) {
        this.accountAssignment = accountAssignment;
    }

    public String getDebitorCredit() {
        return debitorCredit;
    }

    public void setDebitorCredit(String debitorCredit) {
        this.debitorCredit = debitorCredit;
    }

    public String getItem() {
        return item;
    }

    public void setItem(String item) {
        this.item = item;
    }

    public String getOrderType() {
        return orderType;
    }

    public void setOrderType(String orderType) {
        this.orderType = orderType;
    }

    public String getMaterial_SVSNumber() {
        return material_SVSNumber;
    }

    public void setMaterial_SVSNumber(String material_SVSNumber) {
        this.material_SVSNumber = material_SVSNumber;
    }

    public Date getMaterial_ServiceDescription() {
        return material_ServiceDescription;
    }

    public void setMaterial_ServiceDescription(Date material_ServiceDescription) {
        this.material_ServiceDescription = material_ServiceDescription;
    }

    public String getPlantCode() {
        return plantCode;
    }

    public void setPlantCode(String plantCode) {
        this.plantCode = plantCode;
    }

    public String getMaterialGroup_SVSNumber() {
        return materialGroup_SVSNumber;
    }

    public void setMaterialGroup_SVSNumber(String materialGroup_SVSNumber) {
        this.materialGroup_SVSNumber = materialGroup_SVSNumber;
    }

    public String getMaterialServiceGroupDescription() {
        return materialServiceGroupDescription;
    }

    public void setMaterialServiceGroupDescription(String materialServiceGroupDescription) {
        this.materialServiceGroupDescription = materialServiceGroupDescription;
    }

    public Date getPosting_Date() {
        return posting_Date;
    }

    public void setPosting_Date(Date posting_Date) {
        this.posting_Date = posting_Date;
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

    public String getgRQuantity() {
        return gRQuantity;
    }

    public void setgRQuantity(String gRQuantity) {
        this.gRQuantity = gRQuantity;
    }

    public String getlCAmount() {
        return lCAmount;
    }

    public void setlCAmount(String lCAmount) {
        this.lCAmount = lCAmount;
    }

    public String getsOW_RefNo() {
        return sOW_RefNo;
    }

    public void setsOW_RefNo(String sOW_RefNo) {
        this.sOW_RefNo = sOW_RefNo;
    }

    public String getSpocname() {
        return spocname;
    }

    public void setSpocname(String spocname) {
        this.spocname = spocname;
    }
   
  

}
