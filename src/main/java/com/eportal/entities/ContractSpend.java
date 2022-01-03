/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.entities;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author abhishek.e
 */
@Entity
@Table(name = "SpendAnalysis_Contract")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "ContractSpend.findAll", query = "SELECT a FROM ContractSpend a"),
     @NamedQuery(name = "ContractSpend.findByInsertionOrderID", query = "SELECT a FROM ContractSpend a WHERE a.insertionOrderID = :insertionOrderID"),
    @NamedQuery(name = "ContractSpend.findPurchaseDoc", query = "SELECT a FROM ContractSpend a  WHERE a.purchaseDoc = :purchaseDoc"),
    @NamedQuery(name = "ContractSpend.findMvtTyp", query = "SELECT a FROM ContractSpend a WHERE a.mvtTyp = :mvtTyp"),
    @NamedQuery(name = "ContractSpend.findItem", query = "SELECT a FROM ContractSpend a WHERE a.item = :item"),
    @NamedQuery(name = "ContractSpend.findOrdTyp", query = "SELECT a FROM ContractSpend a WHERE a.ordTyp = :ordTyp"),
    @NamedQuery(name = "ContractSpend.findVendor", query = "SELECT a FROM ContractSpend a WHERE a.vendor = :vendor"),
    @NamedQuery(name = "ContractSpend.findVendorName", query = "SELECT a FROM ContractSpend a WHERE a.vendorName = :vendorName"),
    @NamedQuery(name = "ContractSpend.findMaterialSVSNumber", query = "SELECT a FROM ContractSpend a WHERE a.materialSVSNumber = :materialSVSNumber"),
    @NamedQuery(name = "ContractSpend.findMaterialServiceDescription", query = "SELECT a FROM ContractSpend a WHERE a.materialServiceDescription = :materialServiceDescription"),
    @NamedQuery(name = "ContractSpend.findPOLong", query = "SELECT a FROM ContractSpend a WHERE a.pOLong = :pOLong"),
    @NamedQuery(name = "ContractSpend.findMaterialClass", query = "SELECT a FROM ContractSpend a WHERE a.materialClass = :materialClass"),
    @NamedQuery(name = "ContractSpend.findMaterialClassDESC", query = "SELECT a FROM ContractSpend a WHERE a.materialClassDESC = :materialClassDESC"),
    @NamedQuery(name = "ContractSpend.findPlnt", query = "SELECT a FROM ContractSpend a WHERE a.plnt = :plnt"),
    @NamedQuery(name = "ContractSpend.findMatlGroupSVSNo", query = "SELECT a FROM ContractSpend a WHERE a.matlGroupSVSNo = :matlGroupSVSNo"),
    @NamedQuery(name = "ContractSpend.findMaterialGrpServiceNoDescription", query = "SELECT a FROM ContractSpend a WHERE a.materialGrpServiceNoDescription = :materialGrpServiceNoDescription"),
    @NamedQuery(name = "ContractSpend.findReport", query = "SELECT a FROM ContractSpend a WHERE a.report = :report"),
    @NamedQuery(name = "ContractSpend.findCategory", query = "SELECT a FROM ContractSpend a WHERE a.category = :category"),
    @NamedQuery(name = "ContractSpend.findPstngDATE", query = "SELECT a FROM ContractSpend a WHERE a.pstngDATE = :pstngDATE"),
    @NamedQuery(name = "ContractSpend.findFY", query = "SELECT a FROM ContractSpend a WHERE a.fY = :fY"),
    @NamedQuery(name = "ContractSpend.findGRQty", query = "SELECT a FROM ContractSpend a WHERE a.grqty = :grqty"),
    @NamedQuery(name = "ContractSpend.findLCAmount", query = "SELECT a FROM ContractSpend a WHERE a.lcamount = :lcamount"),
    @NamedQuery(name = "ContractSpend.findMonth", query = "SELECT a FROM ContractSpend a WHERE a.month = :month"),
    @NamedQuery(name = "ContractSpend.findType", query = "SELECT a FROM ContractSpend a WHERE a.type = :type"),
    @NamedQuery(name = "ContractSpend.findContracted", query = "SELECT a FROM ContractSpend a WHERE a.contracted = :contracted"),
    @NamedQuery(name = "ContractSpend.findisdeleted", query = "SELECT a FROM ContractSpend a WHERE a.isdeleted IS NULL"),
    @NamedQuery(name = "ContractSpend.findislibadded", query = "SELECT a FROM ContractSpend a WHERE a.islibrary IS NOT NULL"),
    @NamedQuery(name = "ContractSpend.findStoragelocation", query = "SELECT a FROM ContractSpend a WHERE a.storagelocation = :storagelocation")})

public class ContractSpend implements Serializable {

private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Sno")
    private Integer sno;

    @Size(max = 100)
    @Column(name = "PurchaseDoc")
    private String purchaseDoc;

    @Size(max = 100)
    @Column(name = "MvtTyp")
    private String mvtTyp;

    @Size(max = 100)
    @Column(name = "Item")
    private String item;

    @Size(max = 100)
    @Column(name = "OrdTyp")
    private String ordTyp;

    @Size(max = 100)
    @Column(name = "Vendor")
    private int vendor;

     public int getVendor() {
        return vendor;
    }

    public void setVendor(int vendor) {
        this.vendor = vendor;
    }
    
    @Size(max = 100)
    @Column(name = "VendorName")
    private String vendorName;
      @Size(max = 100)
    @Column(name = "Quantity")
    private int quantity;

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    @Size(max = 100)
    @Column(name = "MaterialSVSNumber")
    private String materialSVSNumber;

    @Size(max = 100)
    @Column(name = "MaterialServiceDescription")
    private String materialServiceDescription;

    @Size(max = 1000)
    @Column(name = "POLong")
    private String pOLong;

    @Size(max = 100)
    @Column(name = "MaterialClass")
    private String materialClass;

    @Size(max = 100)
    @Column(name = "MaterialClassDESC")
    private String materialClassDESC;

    @Size(max = 100)
    @Column(name = "Plnt")
    private String plnt;

    @Size(max = 100)
    @Column(name = "MatlGroupSVSNo")
    private String matlGroupSVSNo;

    @Size(max = 100)
    @Column(name = "MaterialGrpServiceNoDescription")
    private String materialGrpServiceNoDescription;

    @Size(max = 100)
    @Column(name = "Report")
    private String report;

    @Size(max = 100)
    @Column(name = "Category")
    private String category;

    @Size(max = 100)
    @Column(name = "PstngDATE")
    private String pstngDATE;

    @Size(max = 100)
    @Column(name = "FY")
    private String fY;

    @Size(max = 100)
    @Column(name = "GRQty")
    private String grqty;

    @Size(max = 100)
    @Column(name = "LCAmount")
    private String lcamount;

    @Size(max = 100)
    @Column(name = "Month")
    private String month;

    @Size(max = 100)
    @Column(name = "Type")
    private String type;

    @Size(max = 100)
    @Column(name = "Contracted")
    private String contracted;

    @Size(max = 100)
    @Column(name = "Storagelocation")
    private String storagelocation;
    
    @Size(max = 100)
    @Column(name = "ISdeleted")
    private String isdeleted;
    
    @Size(max = 100)
    @Column(name = "IsLibrary")
    private String islibrary;
  @Size(max = 100)
    @Column(name = "debitcredit")
    private String debitcredit;
    @Size(max = 100)
    @Column(name = "AccountAssignment")
    private String AccountAssignment;
      @Size(max = 100)
    @Column(name = "materialDocument")
    private String materialDocument;
      @Size(max = 100)
    @Column(name = "spenddelete")
    private String spenddelete;
      @Size(max = 100)
    @Column(name = "spendlibrary")
    private String spendlibrary;

    public String getSpenddelete() {
        return spenddelete;
    }

    public void setSpenddelete(String spenddelete) {
        this.spenddelete = spenddelete;
    }

    public String getSpendlibrary() {
        return spendlibrary;
    }

    public void setSpendlibrary(String spendlibrary) {
        this.spendlibrary = spendlibrary;
    }

    public String getDebitcredit() {
        return debitcredit;
    }

    public void setDebitcredit(String debitcredit) {
        this.debitcredit = debitcredit;
    }

    public String getAccountAssignment() {
        return AccountAssignment;
    }

    public void setAccountAssignment(String AccountAssignment) {
        this.AccountAssignment = AccountAssignment;
    }

    public String getMaterialDocument() {
        return materialDocument;
    }

    public void setMaterialDocument(String materialDocument) {
        this.materialDocument = materialDocument;
    }
      
      
      
    public String getIsdeleted() {
        return isdeleted;
    }

    public void setIsdeleted(String isdeleted) {
        this.isdeleted = isdeleted;
    }

    public String getIslibrary() {
        return islibrary;
    }

    public void setIslibrary(String islibrary) {
        this.islibrary = islibrary;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

  
    
    

    public String getPurchaseDoc() {
        return purchaseDoc;
    }

    public void setPurchaseDoc(String PurchaseDoc) {
        this.purchaseDoc = PurchaseDoc;
    }

    public String getMvtTyp() {
        return mvtTyp;
    }

    public void setMvtTyp(String MvtTyp) {
        this.mvtTyp = MvtTyp;
    }

    public String getItem() {
        return item;
    }

    public void setItem(String Item) {
        this.item = Item;
    }

    public String getOrdTyp() {
        return ordTyp;
    }

    public void setOrdTyp(String OrdTyp) {
        this.ordTyp = OrdTyp;
    }

//    public String getVendor() {
//        return vendor;
//    }
//
//    public void setVendor(String Vendor) {
//        this.vendor = Vendor;
//    }

    public String getVendorName() {
        return vendorName;
    }

    public void setVendorName(String VendorName) {
        this.vendorName = VendorName;
    }

    public String getMaterialSVSNumber() {
        return materialSVSNumber;
    }

    public void setMaterialSVSNumber(String MaterialSVSNumber) {
        this.materialSVSNumber = MaterialSVSNumber;
    }

    public String getMaterialServiceDescription() {
        return materialServiceDescription;
    }

    public void setMaterialServiceDescription(String MaterialServiceDescription) {
        this.materialServiceDescription = MaterialServiceDescription;
    }

    public String getPOLong() {
        return pOLong;
    }

    public void setPOLong(String POLong) {
        this.pOLong = POLong;
    }

    public String getMaterialClass() {
        return materialClass;
    }

    public void setMaterialClass(String MaterialClass) {
        this.materialClass = MaterialClass;
    }

    public String getMaterialClassDESC() {
        return materialClassDESC;
    }

    public void setMaterialClassDESC(String MaterialClassDESC) {
        this.materialClassDESC = MaterialClassDESC;
    }

    public String getPlnt() {
        return plnt;
    }

    public void setPlnt(String Plnt) {
        this.plnt = Plnt;
    }

    public String getMatlGroupSVSNo() {
        return matlGroupSVSNo;
    }

    public void setMatlGroupSVSNo(String MatlGroupSVSNo) {
        this.matlGroupSVSNo = MatlGroupSVSNo;
    }

    public String getMaterialGrpServiceNoDescription() {
        return materialGrpServiceNoDescription;
    }

    public void setMaterialGrpServiceNoDescription(String MaterialGrpServiceNoDescription) {
        this.materialGrpServiceNoDescription = MaterialGrpServiceNoDescription;
    }

    public String getReport() {
        return report;
    }

    public void setReport(String Report) {
        this.report = Report;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String Category) {
        this.category = Category;
    }

    public String getPstngDATE() {
        return pstngDATE;
    }

    public void setPstngDATE(String PstngDATE) {
        this.pstngDATE = PstngDATE;
    }

    public String getFY() {
        return fY;
    }

    public void setFY(String FY) {
        this.fY = FY;
    }

    public String getGRQty() {
        return grqty;
    }

    public void setGRQty(String GRQty) {
        this.grqty = grqty;
    }

    public String getLCAmount() {
        return lcamount;
    }

    public void setLCAmount(String LCAmount) {
        this.lcamount = LCAmount;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String Month) {
        this.month = Month;
    }

    public String getType() {
        return type;
    }

    public void setType(String Type) {
        this.type = Type;
    }

    public String getContracted() {
        return contracted;
    }

    public void setContracted(String Contracted) {
        this.contracted = Contracted;
    }

    public String getStoragelocation() {
        return storagelocation;
    }

    public void setStoragelocation(String Storagelocation) {
        this.storagelocation = Storagelocation;
    }
    

}
