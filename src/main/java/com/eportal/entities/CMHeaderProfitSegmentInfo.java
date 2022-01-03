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
@Table(name = "NG_Cmplx_CM_Profitability_Segment")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CMHeaderProfitSegmentInfo.findAll", query = "SELECT v FROM CMHeaderProfitSegmentInfo v"),
    @NamedQuery(name = "CMHeaderProfitSegmentInfo.findByTransactionID", query = "SELECT v FROM CMHeaderProfitSegmentInfo v WHERE v.TransactionID = :TransactionID")
    })
public class CMHeaderProfitSegmentInfo implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "InsertionOrderID")
    private Integer sno;

   
    @Size(max = 100)
    @Column(name = "Characteristic")
    private String Characteristic;
   

    @Size(max = 100)
    @Column(name = "Customer_Code")
    private String CustomerCode;
    
    @Size(max = 100)
    @Column(name = "Product")
    private String Product;
    
    @Size(max = 100)
    @Column(name = "Billing_Type")
    private String BillingType;
     
    @Size(max = 100)
    @Column(name = "Sales_Order")
    private String SalesOrder;

    @Size(max = 100)
    @Column(name = "Item_No")
    private String ItemNo;
    
    @Size(max = 100)
    @Column(name = "Ordr")
    private String Ordr;
    
    @Size(max = 100)
    @Column(name = "Company_Code")
    private String CompanyCode;
    
    @Size(max = 100)
    @Column(name = "Plant")
    private String Plant;
    
    @Size(max = 100)
    @Column(name = "Business_Area")
    private String BusinessArea;
    
    @Size(max = 100)
    @Column(name = "Sales_Organization")
    private String SalesOrganization;
    
    @Size(max = 100)
    @Column(name = "Distr_Channel")
    private String DistrChannel;
    
    @Size(max = 100)
    @Column(name = "Division")
    private String Division;
    
    @Size(max = 100)
    @Column(name = "WBS_Element")
    private String WBSElement;
    
    @Size(max = 100)
    @Column(name = "Cost_Object")
    private String CostObject;
    
    @Size(max = 100)
    @Column(name = "Profit_Centre")
    private String ProfitCentre;
    
    @Size(max = 100)
    @Column(name = "Partner_PC")
    private String PartnerPC;
    
    @Size(max = 100)
    @Column(name = "Country")
    private String Country;
    
    
    @Size(max = 100)
    @Column(name = "Sales_Office")
    private String SalesOffice;
    
    @Size(max = 100)
    @Column(name = "Sales_Employee")
    private String SalesEmployee;
    
    @Size(max = 100)
    @Column(name = "Matl_Group")
    private String MatlGroup;
    
    @Size(max = 100)
    @Column(name = "Prod_hierarchy")
    private String Prodhierarchy;
    
    @Size(max = 100)
    @Column(name = "Item_category")
    private String Itemcategory;
    
    @Size(max = 100)
    @Column(name = "Higher_lev_item")
    private String Higherlevitem;
    
    @Size(max = 100)
    @Column(name = "Industry")
    private String Industry;
    
    @Size(max = 100)
    @Column(name = "Customer_group")
    private String Customergroup;
    
    @Size(max = 100)
    @Column(name = "Product_Hier_Level1")
    private String ProductHierLevel1;
    
    @Size(max = 100)
    @Column(name = "Product_Hier_Level2")
    private String ProductHierLevel2;
    
    @Size(max = 100)
    @Column(name = "Product_Hier_Level3")
    private String ProductHierLevel3;
    
    @Size(max = 100)
    @Column(name = "Material_Type")
    private String MaterialType;
    
    @Size(max = 100)
    @Column(name = "Reference_doc")
    private String Referencedoc;
    
    @Size(max = 100)
    @Column(name = "PROJECT_NUMBER1")
    private String PROJECTNUMBER1;
    
    @Size(max = 100)
    @Column(name = "Project_Indicator")
    private String ProjectIndicator;
    
    @Size(max = 100)
    @Column(name = "Valuation_Type")
    private String ValuationType;
    
    @Size(max = 100)
    @Column(name = "Customer_class")
    private String Customerclass;
    
    @Size(max = 100)
    @Column(name = "Material_Source_Ind")
    private String MaterialSourceInd;
    
    @Size(max = 100)
    @Column(name = "Contract_Type")
    private String ContractType;
    
    @Size(max = 100)
    @Column(name = "Ship_to_party")
    private String Shiptoparty;
    
    @Size(max = 100)
    @Column(name = "Industry_Code1")
    private String IndustryCode1;
    
    @Size(max = 100)
    @Column(name = "Industry_field_001")
    private String Industryfield001;
    
    @Size(max = 100)
    @Column(name = "Industry_code2")
    private String Industrycode2;
    
    @Size(max = 100)
    @Column(name = "Industry_code3")
    private String Industrycode3;

    
    @Size(max = 100)
    @Column(name = "Sales_Doc_Type")
    private String SalesDocType;

     
    @Size(max = 100)
    @Column(name = "Reference_item")
    private String Referenceitem;
     
    @Size(max = 100)
    @Column(name = "TransactionID")
    private String TransactionID;
    
    public CMHeaderProfitSegmentInfo() {
    }

    public CMHeaderProfitSegmentInfo(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getCharacteristic() {
        return Characteristic;
    }

    public void setCharacteristic(String Characteristic) {
        this.Characteristic = Characteristic;
    }

    public String getCustomerCode() {
        return CustomerCode;
    }

    public void setCustomerCode(String CustomerCode) {
        this.CustomerCode = CustomerCode;
    }

    public String getProduct() {
        return Product;
    }

    public void setProduct(String Product) {
        this.Product = Product;
    }

    public String getBillingType() {
        return BillingType;
    }

    public void setBillingType(String BillingType) {
        this.BillingType = BillingType;
    }

    public String getSalesOrder() {
        return SalesOrder;
    }

    public void setSalesOrder(String SalesOrder) {
        this.SalesOrder = SalesOrder;
    }

    public String getItemNo() {
        return ItemNo;
    }

    public void setItemNo(String ItemNo) {
        this.ItemNo = ItemNo;
    }

    public String getOrdr() {
        return Ordr;
    }

    public void setOrdr(String Ordr) {
        this.Ordr = Ordr;
    }

    public String getCompanyCode() {
        return CompanyCode;
    }

    public void setCompanyCode(String CompanyCode) {
        this.CompanyCode = CompanyCode;
    }

    public String getPlant() {
        return Plant;
    }

    public void setPlant(String Plant) {
        this.Plant = Plant;
    }

    public String getBusinessArea() {
        return BusinessArea;
    }

    public void setBusinessArea(String BusinessArea) {
        this.BusinessArea = BusinessArea;
    }

    public String getSalesOrganization() {
        return SalesOrganization;
    }

    public void setSalesOrganization(String SalesOrganization) {
        this.SalesOrganization = SalesOrganization;
    }

    public String getDistrChannel() {
        return DistrChannel;
    }

    public void setDistrChannel(String DistrChannel) {
        this.DistrChannel = DistrChannel;
    }

    public String getDivision() {
        return Division;
    }

    public void setDivision(String Division) {
        this.Division = Division;
    }

    public String getWBSElement() {
        return WBSElement;
    }

    public void setWBSElement(String WBSElement) {
        this.WBSElement = WBSElement;
    }

    public String getCostObject() {
        return CostObject;
    }

    public void setCostObject(String CostObject) {
        this.CostObject = CostObject;
    }

    public String getProfitCentre() {
        return ProfitCentre;
    }

    public void setProfitCentre(String ProfitCentre) {
        this.ProfitCentre = ProfitCentre;
    }

    public String getPartnerPC() {
        return PartnerPC;
    }

    public void setPartnerPC(String PartnerPC) {
        this.PartnerPC = PartnerPC;
    }

    public String getCountry() {
        return Country;
    }

    public void setCountry(String Country) {
        this.Country = Country;
    }

    public String getSalesOffice() {
        return SalesOffice;
    }

    public void setSalesOffice(String SalesOffice) {
        this.SalesOffice = SalesOffice;
    }

    public String getSalesEmployee() {
        return SalesEmployee;
    }

    public void setSalesEmployee(String SalesEmployee) {
        this.SalesEmployee = SalesEmployee;
    }

    public String getMatlGroup() {
        return MatlGroup;
    }

    public void setMatlGroup(String MatlGroup) {
        this.MatlGroup = MatlGroup;
    }

    public String getProdhierarchy() {
        return Prodhierarchy;
    }

    public void setProdhierarchy(String Prodhierarchy) {
        this.Prodhierarchy = Prodhierarchy;
    }

    public String getItemcategory() {
        return Itemcategory;
    }

    public void setItemcategory(String Itemcategory) {
        this.Itemcategory = Itemcategory;
    }

    public String getHigherlevitem() {
        return Higherlevitem;
    }

    public void setHigherlevitem(String Higherlevitem) {
        this.Higherlevitem = Higherlevitem;
    }

    public String getIndustry() {
        return Industry;
    }

    public void setIndustry(String Industry) {
        this.Industry = Industry;
    }

    public String getCustomergroup() {
        return Customergroup;
    }

    public void setCustomergroup(String Customergroup) {
        this.Customergroup = Customergroup;
    }

    public String getProductHierLevel1() {
        return ProductHierLevel1;
    }

    public void setProductHierLevel1(String ProductHierLevel1) {
        this.ProductHierLevel1 = ProductHierLevel1;
    }

    public String getProductHierLevel2() {
        return ProductHierLevel2;
    }

    public void setProductHierLevel2(String ProductHierLevel2) {
        this.ProductHierLevel2 = ProductHierLevel2;
    }

    public String getProductHierLevel3() {
        return ProductHierLevel3;
    }

    public void setProductHierLevel3(String ProductHierLevel3) {
        this.ProductHierLevel3 = ProductHierLevel3;
    }

    public String getMaterialType() {
        return MaterialType;
    }

    public void setMaterialType(String MaterialType) {
        this.MaterialType = MaterialType;
    }

    public String getReferencedoc() {
        return Referencedoc;
    }

    public void setReferencedoc(String Referencedoc) {
        this.Referencedoc = Referencedoc;
    }

    public String getPROJECTNUMBER1() {
        return PROJECTNUMBER1;
    }

    public void setPROJECTNUMBER1(String PROJECTNUMBER1) {
        this.PROJECTNUMBER1 = PROJECTNUMBER1;
    }

    public String getProjectIndicator() {
        return ProjectIndicator;
    }

    public void setProjectIndicator(String ProjectIndicator) {
        this.ProjectIndicator = ProjectIndicator;
    }

    public String getValuationType() {
        return ValuationType;
    }

    public void setValuationType(String ValuationType) {
        this.ValuationType = ValuationType;
    }

    public String getCustomerclass() {
        return Customerclass;
    }

    public void setCustomerclass(String Customerclass) {
        this.Customerclass = Customerclass;
    }

    public String getMaterialSourceInd() {
        return MaterialSourceInd;
    }

    public void setMaterialSourceInd(String MaterialSourceInd) {
        this.MaterialSourceInd = MaterialSourceInd;
    }

    public String getContractType() {
        return ContractType;
    }

    public void setContractType(String ContractType) {
        this.ContractType = ContractType;
    }

    public String getShiptoparty() {
        return Shiptoparty;
    }

    public void setShiptoparty(String Shiptoparty) {
        this.Shiptoparty = Shiptoparty;
    }

    public String getIndustryCode1() {
        return IndustryCode1;
    }

    public void setIndustryCode1(String IndustryCode1) {
        this.IndustryCode1 = IndustryCode1;
    }

    public String getIndustryfield001() {
        return Industryfield001;
    }

    public void setIndustryfield001(String Industryfield001) {
        this.Industryfield001 = Industryfield001;
    }

    public String getIndustrycode2() {
        return Industrycode2;
    }

    public void setIndustrycode2(String Industrycode2) {
        this.Industrycode2 = Industrycode2;
    }

    public String getIndustrycode3() {
        return Industrycode3;
    }

    public void setIndustrycode3(String Industrycode3) {
        this.Industrycode3 = Industrycode3;
    }

    public String getSalesDocType() {
        return SalesDocType;
    }

    public void setSalesDocType(String SalesDocType) {
        this.SalesDocType = SalesDocType;
    }

    public String getReferenceitem() {
        return Referenceitem;
    }

    public void setReferenceitem(String Referenceitem) {
        this.Referenceitem = Referenceitem;
    }

 
  
    public String getTransactionID() {
        return TransactionID;
    }

    public void setTransactionID(String TransactionID) {
        this.TransactionID = TransactionID;
    }
    
    
}
