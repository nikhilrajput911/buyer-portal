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
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Sunny Kumar
 */
@Entity
@Table(name = "NG_BP_ProfitabilitySegment")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "ProfitabilitySegment.findAll", query = "SELECT p FROM ProfitabilitySegment p"),
    @NamedQuery(name = "ProfitabilitySegment.findById", query = "SELECT p FROM ProfitabilitySegment p WHERE p.id = :id"),
    @NamedQuery(name = "ProfitabilitySegment.findByCharacterstic", query = "SELECT p FROM ProfitabilitySegment p WHERE p.characterstic = :characterstic"),
    @NamedQuery(name = "ProfitabilitySegment.findByCustomerCode", query = "SELECT p FROM ProfitabilitySegment p WHERE p.customerCode = :customerCode"),
    @NamedQuery(name = "ProfitabilitySegment.findByProduct", query = "SELECT p FROM ProfitabilitySegment p WHERE p.product = :product"),
    @NamedQuery(name = "ProfitabilitySegment.findByBillingType", query = "SELECT p FROM ProfitabilitySegment p WHERE p.billingType = :billingType"),
    @NamedQuery(name = "ProfitabilitySegment.findBySalesOrder", query = "SELECT p FROM ProfitabilitySegment p WHERE p.salesOrder = :salesOrder"),
    @NamedQuery(name = "ProfitabilitySegment.findByItemNumber", query = "SELECT p FROM ProfitabilitySegment p WHERE p.itemNumber = :itemNumber"),
    @NamedQuery(name = "ProfitabilitySegment.findBySgOrder", query = "SELECT p FROM ProfitabilitySegment p WHERE p.sgOrder = :sgOrder"),
    @NamedQuery(name = "ProfitabilitySegment.findByCompanyCode", query = "SELECT p FROM ProfitabilitySegment p WHERE p.companyCode = :companyCode"),
    @NamedQuery(name = "ProfitabilitySegment.findByPlant", query = "SELECT p FROM ProfitabilitySegment p WHERE p.plant = :plant"),
    @NamedQuery(name = "ProfitabilitySegment.findByBusinessArea", query = "SELECT p FROM ProfitabilitySegment p WHERE p.businessArea = :businessArea"),
    @NamedQuery(name = "ProfitabilitySegment.findBySalesOrg", query = "SELECT p FROM ProfitabilitySegment p WHERE p.salesOrg = :salesOrg"),
    @NamedQuery(name = "ProfitabilitySegment.findByDistrChannel", query = "SELECT p FROM ProfitabilitySegment p WHERE p.distrChannel = :distrChannel"),
    @NamedQuery(name = "ProfitabilitySegment.findByDivision", query = "SELECT p FROM ProfitabilitySegment p WHERE p.division = :division"),
    @NamedQuery(name = "ProfitabilitySegment.findByWBSElement", query = "SELECT p FROM ProfitabilitySegment p WHERE p.wBSElement = :wBSElement"),
    @NamedQuery(name = "ProfitabilitySegment.findByCostObject", query = "SELECT p FROM ProfitabilitySegment p WHERE p.costObject = :costObject"),
    @NamedQuery(name = "ProfitabilitySegment.findByProfitCenter", query = "SELECT p FROM ProfitabilitySegment p WHERE p.profitCenter = :profitCenter"),
    @NamedQuery(name = "ProfitabilitySegment.findByPartnerPC", query = "SELECT p FROM ProfitabilitySegment p WHERE p.partnerPC = :partnerPC"),
    @NamedQuery(name = "ProfitabilitySegment.findByCountry", query = "SELECT p FROM ProfitabilitySegment p WHERE p.country = :country"),
    @NamedQuery(name = "ProfitabilitySegment.findBySalesOffice", query = "SELECT p FROM ProfitabilitySegment p WHERE p.salesOffice = :salesOffice"),
    @NamedQuery(name = "ProfitabilitySegment.findBySalesEmployee", query = "SELECT p FROM ProfitabilitySegment p WHERE p.salesEmployee = :salesEmployee"),
    @NamedQuery(name = "ProfitabilitySegment.findByMatlGroup", query = "SELECT p FROM ProfitabilitySegment p WHERE p.matlGroup = :matlGroup"),
    @NamedQuery(name = "ProfitabilitySegment.findByProdHierarchy", query = "SELECT p FROM ProfitabilitySegment p WHERE p.prodHierarchy = :prodHierarchy"),
    @NamedQuery(name = "ProfitabilitySegment.findByItemCategory", query = "SELECT p FROM ProfitabilitySegment p WHERE p.itemCategory = :itemCategory"),
    @NamedQuery(name = "ProfitabilitySegment.findByHigherLevItem", query = "SELECT p FROM ProfitabilitySegment p WHERE p.higherLevItem = :higherLevItem"),
    @NamedQuery(name = "ProfitabilitySegment.findByIndustry", query = "SELECT p FROM ProfitabilitySegment p WHERE p.industry = :industry"),
    @NamedQuery(name = "ProfitabilitySegment.findByCustomerGroup", query = "SELECT p FROM ProfitabilitySegment p WHERE p.customerGroup = :customerGroup"),
    @NamedQuery(name = "ProfitabilitySegment.findByProdHierLev1", query = "SELECT p FROM ProfitabilitySegment p WHERE p.prodHierLev1 = :prodHierLev1"),
    @NamedQuery(name = "ProfitabilitySegment.findByProdHierLev2", query = "SELECT p FROM ProfitabilitySegment p WHERE p.prodHierLev2 = :prodHierLev2"),
    @NamedQuery(name = "ProfitabilitySegment.findByProdHierLev3", query = "SELECT p FROM ProfitabilitySegment p WHERE p.prodHierLev3 = :prodHierLev3"),
    @NamedQuery(name = "ProfitabilitySegment.findByMaterialType", query = "SELECT p FROM ProfitabilitySegment p WHERE p.materialType = :materialType"),
    @NamedQuery(name = "ProfitabilitySegment.findByReferenceDoc", query = "SELECT p FROM ProfitabilitySegment p WHERE p.referenceDoc = :referenceDoc"),
    @NamedQuery(name = "ProfitabilitySegment.findByProjectNumber1", query = "SELECT p FROM ProfitabilitySegment p WHERE p.projectNumber1 = :projectNumber1"),
    @NamedQuery(name = "ProfitabilitySegment.findByProjectIndecator", query = "SELECT p FROM ProfitabilitySegment p WHERE p.projectIndecator = :projectIndecator"),
    @NamedQuery(name = "ProfitabilitySegment.findByValuationType", query = "SELECT p FROM ProfitabilitySegment p WHERE p.valuationType = :valuationType"),
    @NamedQuery(name = "ProfitabilitySegment.findByCustomerClass", query = "SELECT p FROM ProfitabilitySegment p WHERE p.customerClass = :customerClass"),
    @NamedQuery(name = "ProfitabilitySegment.findByMaterialSourceInd", query = "SELECT p FROM ProfitabilitySegment p WHERE p.materialSourceInd = :materialSourceInd"),
    @NamedQuery(name = "ProfitabilitySegment.findByContractType", query = "SELECT p FROM ProfitabilitySegment p WHERE p.contractType = :contractType"),
    @NamedQuery(name = "ProfitabilitySegment.findByShipToParty", query = "SELECT p FROM ProfitabilitySegment p WHERE p.shipToParty = :shipToParty"),
    @NamedQuery(name = "ProfitabilitySegment.findByIndustryCode1", query = "SELECT p FROM ProfitabilitySegment p WHERE p.industryCode1 = :industryCode1"),
    @NamedQuery(name = "ProfitabilitySegment.findByIndustryField001", query = "SELECT p FROM ProfitabilitySegment p WHERE p.industryField001 = :industryField001"),
    @NamedQuery(name = "ProfitabilitySegment.findByIndustryCode2", query = "SELECT p FROM ProfitabilitySegment p WHERE p.industryCode2 = :industryCode2"),
    @NamedQuery(name = "ProfitabilitySegment.findByIndustryCode3", query = "SELECT p FROM ProfitabilitySegment p WHERE p.industryCode3 = :industryCode3"),
    @NamedQuery(name = "ProfitabilitySegment.findBySalesDocType", query = "SELECT p FROM ProfitabilitySegment p WHERE p.salesDocType = :salesDocType"),
    @NamedQuery(name = "ProfitabilitySegment.findByReferenceItem", query = "SELECT p FROM ProfitabilitySegment p WHERE p.referenceItem = :referenceItem"),
    @NamedQuery(name = "ProfitabilitySegment.findByLineItemNumber", query = "SELECT p FROM ProfitabilitySegment p WHERE p.lineItemNumber = :lineItemNumber")})
public class ProfitabilitySegment implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
//    @NotNull
    @Column(name = "Id")
    private Integer id;
    @Size(max = 70)
    @Column(name = "Characterstic")
    private String characterstic;
    @Size(max = 20)
    @Column(name = "CustomerCode")
    private String customerCode;
    @Size(max = 25)
    @Column(name = "Product")
    private String product;
    @Size(max = 10)
    @Column(name = "BillingType")
    private String billingType;
    @Size(max = 25)
    @Column(name = "SalesOrder")
    private String salesOrder;
    @Size(max = 10)
    @Column(name = "ItemNumber")
    private String itemNumber;
    @Size(max = 20)
    @Column(name = "SgOrder")
    private String sgOrder;
    @Size(max = 10)
    @Column(name = "CompanyCode")
    private String companyCode;
    @Size(max = 10)
    @Column(name = "Plant")
    private String plant;
    @Size(max = 10)
    @Column(name = "BusinessArea")
    private String businessArea;
    @Size(max = 10)
    @Column(name = "SalesOrg")
    private String salesOrg;
    @Size(max = 5)
    @Column(name = "DistrChannel")
    private String distrChannel;
    @Size(max = 5)
    @Column(name = "Division")
    private String division;
    @Size(max = 30)
    @Column(name = "WBSElement")
    private String wBSElement;
    @Size(max = 20)
    @Column(name = "CostObject")
    private String costObject;
    @Size(max = 15)
    @Column(name = "ProfitCenter")
    private String profitCenter;
    @Size(max = 15)
    @Column(name = "PartnerPC")
    private String partnerPC;
    @Size(max = 5)
    @Column(name = "Country")
    private String country;
    @Size(max = 8)
    @Column(name = "SalesOffice")
    private String salesOffice;
    @Size(max = 8)
    @Column(name = "SalesEmployee")
    private String salesEmployee;
    @Size(max = 30)
    @Column(name = "MatlGroup")
    private String matlGroup;
    @Size(max = 25)
    @Column(name = "ProdHierarchy")
    private String prodHierarchy;
    @Size(max = 10)
    @Column(name = "ItemCategory")
    private String itemCategory;
    @Size(max = 12)
    @Column(name = "HigherLevItem")
    private String higherLevItem;
    @Size(max = 10)
    @Column(name = "Industry")
    private String industry;
    @Size(max = 5)
    @Column(name = "CustomerGroup")
    private String customerGroup;
    @Size(max = 25)
    @Column(name = "ProdHierLev1")
    private String prodHierLev1;
    @Size(max = 25)
    @Column(name = "ProdHierLev2")
    private String prodHierLev2;
    @Size(max = 25)
    @Column(name = "ProdHierLev3")
    private String prodHierLev3;
    @Size(max = 25)
    @Column(name = "MaterialType")
    private String materialType;
    @Size(max = 15)
    @Column(name = "ReferenceDoc")
    private String referenceDoc;
    @Size(max = 15)
    @Column(name = "ProjectNumber1")
    private String projectNumber1;
    @Size(max = 3)
    @Column(name = "ProjectIndecator")
    private String projectIndecator;
    @Size(max = 15)
    @Column(name = "ValuationType")
    private String valuationType;
    @Size(max = 5)
    @Column(name = "CustomerClass")
    private String customerClass;
    @Size(max = 3)
    @Column(name = "MaterialSourceInd")
    private String materialSourceInd;
    @Size(max = 15)
    @Column(name = "ContractType")
    private String contractType;
    @Size(max = 15)
    @Column(name = "ShipToParty")
    private String shipToParty;
    @Size(max = 15)
    @Column(name = "IndustryCode1")
    private String industryCode1;
    @Size(max = 15)
    @Column(name = "IndustryField001")
    private String industryField001;
    @Size(max = 15)
    @Column(name = "IndustryCode2")
    private String industryCode2;
    @Size(max = 15)
    @Column(name = "IndustryCode3")
    private String industryCode3;
    @Size(max = 8)
    @Column(name = "SalesDocType")
    private String salesDocType;
    @Size(max = 8)
    @Column(name = "ReferenceItem")
    private String referenceItem;
    @Size(max = 20)
    @Column(name = "LineItemNumber")
    private String lineItemNumber;
    @Column(name = "ServiceLineItemNumber")
    private String serviceLineItemNumber;
    @Size(max = 20)
    @Column(name = "PrItemNumber")
    private String prItemNumber;
    @Size(max = 10)
    @Column(name = "LinkId")
    private String linkId;
    
    public ProfitabilitySegment() {
    }

    public ProfitabilitySegment(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCharacterstic() {
        return characterstic;
    }

    public void setCharacterstic(String characterstic) {
        this.characterstic = characterstic;
    }

    public String getCustomerCode() {
        return customerCode;
    }

    public void setCustomerCode(String customerCode) {
        this.customerCode = customerCode;
    }

    public String getProduct() {
        return product;
    }

    public void setProduct(String product) {
        this.product = product;
    }

    public String getBillingType() {
        return billingType;
    }

    public void setBillingType(String billingType) {
        this.billingType = billingType;
    }

    public String getSalesOrder() {
        return salesOrder;
    }

    public void setSalesOrder(String salesOrder) {
        this.salesOrder = salesOrder;
    }

    public String getItemNumber() {
        return itemNumber;
    }

    public void setItemNumber(String itemNumber) {
        this.itemNumber = itemNumber;
    }

    public String getSgOrder() {
        return sgOrder;
    }

    public void setSgOrder(String sgOrder) {
        this.sgOrder = sgOrder;
    }

    public String getCompanyCode() {
        return companyCode;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }

    public String getPlant() {
        return plant;
    }

    public void setPlant(String plant) {
        this.plant = plant;
    }

    public String getBusinessArea() {
        return businessArea;
    }

    public void setBusinessArea(String businessArea) {
        this.businessArea = businessArea;
    }

    public String getSalesOrg() {
        return salesOrg;
    }

    public void setSalesOrg(String salesOrg) {
        this.salesOrg = salesOrg;
    }

    public String getDistrChannel() {
        return distrChannel;
    }

    public void setDistrChannel(String distrChannel) {
        this.distrChannel = distrChannel;
    }

    public String getDivision() {
        return division;
    }

    public void setDivision(String division) {
        this.division = division;
    }

    public String getWBSElement() {
        return wBSElement;
    }

    public void setWBSElement(String wBSElement) {
        this.wBSElement = wBSElement;
    }

    public String getCostObject() {
        return costObject;
    }

    public void setCostObject(String costObject) {
        this.costObject = costObject;
    }

    public String getProfitCenter() {
        return profitCenter;
    }

    public void setProfitCenter(String profitCenter) {
        this.profitCenter = profitCenter;
    }

    public String getPartnerPC() {
        return partnerPC;
    }

    public void setPartnerPC(String partnerPC) {
        this.partnerPC = partnerPC;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getSalesOffice() {
        return salesOffice;
    }

    public void setSalesOffice(String salesOffice) {
        this.salesOffice = salesOffice;
    }

    public String getSalesEmployee() {
        return salesEmployee;
    }

    public void setSalesEmployee(String salesEmployee) {
        this.salesEmployee = salesEmployee;
    }

    public String getMatlGroup() {
        return matlGroup;
    }

    public void setMatlGroup(String matlGroup) {
        this.matlGroup = matlGroup;
    }

    public String getProdHierarchy() {
        return prodHierarchy;
    }

    public void setProdHierarchy(String prodHierarchy) {
        this.prodHierarchy = prodHierarchy;
    }

    public String getItemCategory() {
        return itemCategory;
    }

    public void setItemCategory(String itemCategory) {
        this.itemCategory = itemCategory;
    }

    public String getHigherLevItem() {
        return higherLevItem;
    }

    public void setHigherLevItem(String higherLevItem) {
        this.higherLevItem = higherLevItem;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getCustomerGroup() {
        return customerGroup;
    }

    public void setCustomerGroup(String customerGroup) {
        this.customerGroup = customerGroup;
    }

    public String getProdHierLev1() {
        return prodHierLev1;
    }

    public void setProdHierLev1(String prodHierLev1) {
        this.prodHierLev1 = prodHierLev1;
    }

    public String getProdHierLev2() {
        return prodHierLev2;
    }

    public void setProdHierLev2(String prodHierLev2) {
        this.prodHierLev2 = prodHierLev2;
    }

    public String getProdHierLev3() {
        return prodHierLev3;
    }

    public void setProdHierLev3(String prodHierLev3) {
        this.prodHierLev3 = prodHierLev3;
    }

    public String getMaterialType() {
        return materialType;
    }

    public void setMaterialType(String materialType) {
        this.materialType = materialType;
    }

    public String getReferenceDoc() {
        return referenceDoc;
    }

    public void setReferenceDoc(String referenceDoc) {
        this.referenceDoc = referenceDoc;
    }

    public String getProjectNumber1() {
        return projectNumber1;
    }

    public void setProjectNumber1(String projectNumber1) {
        this.projectNumber1 = projectNumber1;
    }

    public String getProjectIndecator() {
        return projectIndecator;
    }

    public void setProjectIndecator(String projectIndecator) {
        this.projectIndecator = projectIndecator;
    }

    public String getValuationType() {
        return valuationType;
    }

    public void setValuationType(String valuationType) {
        this.valuationType = valuationType;
    }

    public String getCustomerClass() {
        return customerClass;
    }

    public void setCustomerClass(String customerClass) {
        this.customerClass = customerClass;
    }

    public String getMaterialSourceInd() {
        return materialSourceInd;
    }

    public void setMaterialSourceInd(String materialSourceInd) {
        this.materialSourceInd = materialSourceInd;
    }

    public String getContractType() {
        return contractType;
    }

    public void setContractType(String contractType) {
        this.contractType = contractType;
    }

    public String getShipToParty() {
        return shipToParty;
    }

    public void setShipToParty(String shipToParty) {
        this.shipToParty = shipToParty;
    }

    public String getIndustryCode1() {
        return industryCode1;
    }

    public void setIndustryCode1(String industryCode1) {
        this.industryCode1 = industryCode1;
    }

    public String getIndustryField001() {
        return industryField001;
    }

    public void setIndustryField001(String industryField001) {
        this.industryField001 = industryField001;
    }

    public String getIndustryCode2() {
        return industryCode2;
    }

    public void setIndustryCode2(String industryCode2) {
        this.industryCode2 = industryCode2;
    }

    public String getIndustryCode3() {
        return industryCode3;
    }

    public void setIndustryCode3(String industryCode3) {
        this.industryCode3 = industryCode3;
    }

    public String getSalesDocType() {
        return salesDocType;
    }

    public void setSalesDocType(String salesDocType) {
        this.salesDocType = salesDocType;
    }

    public String getReferenceItem() {
        return referenceItem;
    }

    public void setReferenceItem(String referenceItem) {
        this.referenceItem = referenceItem;
    }

    public String getLineItemNumber() {
        return lineItemNumber;
    }

    public void setLineItemNumber(String lineItemNumber) {
        this.lineItemNumber = lineItemNumber;
    }
    public String getServiceLineItemNumber() {
        return serviceLineItemNumber;
    }

    public void setServiceLineItemNumber(String serviceLineItemNumber) {
        this.serviceLineItemNumber = serviceLineItemNumber;
    }

    public String getPrItemNumber() {
        return prItemNumber;
    }

    public void setPrItemNumber(String prItemNumber) {
        this.prItemNumber = prItemNumber;
    }

    public String getLinkId() {
        return linkId;
    }

    public void setLinkId(String linkId) {
        this.linkId = linkId;
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
        if (!(object instanceof ProfitabilitySegment)) {
            return false;
        }
        ProfitabilitySegment other = (ProfitabilitySegment) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.controller.ProfitabilitySegment[ id=" + id + " ]";
    }
    
}
