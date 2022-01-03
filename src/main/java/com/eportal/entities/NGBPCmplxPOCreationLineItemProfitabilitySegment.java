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
 * @author Sunny Kumar
 */
@Entity
@Table(name = "NG_BP_Cmplx_POCreation_LineItem_ProfitabilitySegment")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findAll", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findById", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.id = :id"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByBillingType", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.billingType = :billingType"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByBusinessArea", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.businessArea = :businessArea"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByCharacterstic", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.characterstic = :characterstic"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByCompanyCode", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.companyCode = :companyCode"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByContractType", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.contractType = :contractType"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByCostObject", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.costObject = :costObject"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByCountry", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.country = :country"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByCustomerClass", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.customerClass = :customerClass"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByCustomerCode", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.customerCode = :customerCode"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByCustomerGroup", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.customerGroup = :customerGroup"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByDistrChannel", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.distrChannel = :distrChannel"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByDivision", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.division = :division"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByHigherLevItem", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.higherLevItem = :higherLevItem"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByIndustry", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.industry = :industry"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByIndustryCode1", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.industryCode1 = :industryCode1"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByIndustryCode2", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.industryCode2 = :industryCode2"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByIndustryCode3", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.industryCode3 = :industryCode3"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByIndustryField001", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.industryField001 = :industryField001"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByItemCategory", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.itemCategory = :itemCategory"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByItemNumber", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.itemNumber = :itemNumber"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByLineItemNumber", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.lineItemNumber = :lineItemNumber"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByMaterialSourceInd", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.materialSourceInd = :materialSourceInd"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByMaterialType", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.materialType = :materialType"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByMatlGroup", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.matlGroup = :matlGroup"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByPrItemNumber", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.prItemNumber = :prItemNumber"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByPartnerPC", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.partnerPC = :partnerPC"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByPlant", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.plant = :plant"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByProdHierLev1", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.prodHierLev1 = :prodHierLev1"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByProdHierLev2", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.prodHierLev2 = :prodHierLev2"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByProdHierLev3", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.prodHierLev3 = :prodHierLev3"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByProdHierarchy", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.prodHierarchy = :prodHierarchy"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByProduct", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.product = :product"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByProfitCenter", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.profitCenter = :profitCenter"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByProjectIndecator", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.projectIndecator = :projectIndecator"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByProjectNumber1", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.projectNumber1 = :projectNumber1"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByReferenceDoc", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.referenceDoc = :referenceDoc"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByReferenceItem", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.referenceItem = :referenceItem"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findBySalesDocType", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.salesDocType = :salesDocType"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findBySalesEmployee", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.salesEmployee = :salesEmployee"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findBySalesOffice", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.salesOffice = :salesOffice"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findBySalesOrder", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.salesOrder = :salesOrder"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findBySalesOrg", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.salesOrg = :salesOrg"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByServiceLineItemNumber", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.serviceLineItemNumber = :serviceLineItemNumber"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findBySgOrder", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.sgOrder = :sgOrder"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByShipToParty", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.shipToParty = :shipToParty"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByValuationType", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.valuationType = :valuationType"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByWBSElement", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.wBSElement = :wBSElement"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByLinkId", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.linkId = :linkId"),
    @NamedQuery(name = "NGBPCmplxPOCreationLineItemProfitabilitySegment.findByPoId", query = "SELECT n FROM NGBPCmplxPOCreationLineItemProfitabilitySegment n WHERE n.poId = :poId")})
public class NGBPCmplxPOCreationLineItemProfitabilitySegment implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
//    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Integer id;
    @Size(max = 10)
    @Column(name = "BillingType")
    private String billingType;
    @Size(max = 10)
    @Column(name = "BusinessArea")
    private String businessArea;
    @Size(max = 70)
    @Column(name = "Characterstic")
    private String characterstic;
    @Size(max = 10)
    @Column(name = "CompanyCode")
    private String companyCode;
    @Size(max = 15)
    @Column(name = "ContractType")
    private String contractType;
    @Size(max = 20)
    @Column(name = "CostObject")
    private String costObject;
    @Size(max = 5)
    @Column(name = "Country")
    private String country;
    @Size(max = 5)
    @Column(name = "CustomerClass")
    private String customerClass;
    @Size(max = 20)
    @Column(name = "CustomerCode")
    private String customerCode;
    @Size(max = 5)
    @Column(name = "CustomerGroup")
    private String customerGroup;
    @Size(max = 5)
    @Column(name = "DistrChannel")
    private String distrChannel;
    @Size(max = 5)
    @Column(name = "Division")
    private String division;
    @Size(max = 12)
    @Column(name = "HigherLevItem")
    private String higherLevItem;
    @Size(max = 10)
    @Column(name = "Industry")
    private String industry;
    @Size(max = 15)
    @Column(name = "IndustryCode1")
    private String industryCode1;
    @Size(max = 15)
    @Column(name = "IndustryCode2")
    private String industryCode2;
    @Size(max = 15)
    @Column(name = "IndustryCode3")
    private String industryCode3;
    @Size(max = 15)
    @Column(name = "IndustryField001")
    private String industryField001;
    @Size(max = 10)
    @Column(name = "ItemCategory")
    private String itemCategory;
    @Size(max = 10)
    @Column(name = "ItemNumber")
    private String itemNumber;
    @Size(max = 10)
    @Column(name = "LineItemNumber")
    private String lineItemNumber;
    @Size(max = 3)
    @Column(name = "MaterialSourceInd")
    private String materialSourceInd;
    @Size(max = 25)
    @Column(name = "MaterialType")
    private String materialType;
    @Size(max = 30)
    @Column(name = "MatlGroup")
    private String matlGroup;
    @Size(max = 50)
    @Column(name = "PrItemNumber")
    private String prItemNumber;
    @Size(max = 15)
    @Column(name = "PartnerPC")
    private String partnerPC;
    @Size(max = 10)
    @Column(name = "Plant")
    private String plant;
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
    @Column(name = "ProdHierarchy")
    private String prodHierarchy;
    @Size(max = 25)
    @Column(name = "Product")
    private String product;
    @Size(max = 15)
    @Column(name = "ProfitCenter")
    private String profitCenter;
    @Size(max = 3)
    @Column(name = "ProjectIndecator")
    private String projectIndecator;
    @Size(max = 15)
    @Column(name = "ProjectNumber1")
    private String projectNumber1;
    @Size(max = 15)
    @Column(name = "ReferenceDoc")
    private String referenceDoc;
    @Size(max = 8)
    @Column(name = "ReferenceItem")
    private String referenceItem;
    @Size(max = 8)
    @Column(name = "SalesDocType")
    private String salesDocType;
    @Size(max = 8)
    @Column(name = "SalesEmployee")
    private String salesEmployee;
    @Size(max = 8)
    @Column(name = "SalesOffice")
    private String salesOffice;
    @Size(max = 25)
    @Column(name = "SalesOrder")
    private String salesOrder;
    @Size(max = 10)
    @Column(name = "SalesOrg")
    private String salesOrg;
    @Size(max = 255)
    @Column(name = "ServiceLineItemNumber")
    private String serviceLineItemNumber;
    @Size(max = 20)
    @Column(name = "SgOrder")
    private String sgOrder;
    @Size(max = 15)
    @Column(name = "ShipToParty")
    private String shipToParty;
    @Size(max = 15)
    @Column(name = "ValuationType")
    private String valuationType;
    @Size(max = 30)
    @Column(name = "WBSElement")
    private String wBSElement;
    @Size(max = 50)
    @Column(name = "LinkId")
    private String linkId;
    @Size(max = 10)
    @Column(name = "PoId")
    private String poId;

    public NGBPCmplxPOCreationLineItemProfitabilitySegment() {
    }

    public NGBPCmplxPOCreationLineItemProfitabilitySegment(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getBillingType() {
        return billingType;
    }

    public void setBillingType(String billingType) {
        this.billingType = billingType;
    }

    public String getBusinessArea() {
        return businessArea;
    }

    public void setBusinessArea(String businessArea) {
        this.businessArea = businessArea;
    }

    public String getCharacterstic() {
        return characterstic;
    }

    public void setCharacterstic(String characterstic) {
        this.characterstic = characterstic;
    }

    public String getCompanyCode() {
        return companyCode;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }

    public String getContractType() {
        return contractType;
    }

    public void setContractType(String contractType) {
        this.contractType = contractType;
    }

    public String getCostObject() {
        return costObject;
    }

    public void setCostObject(String costObject) {
        this.costObject = costObject;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCustomerClass() {
        return customerClass;
    }

    public void setCustomerClass(String customerClass) {
        this.customerClass = customerClass;
    }

    public String getCustomerCode() {
        return customerCode;
    }

    public void setCustomerCode(String customerCode) {
        this.customerCode = customerCode;
    }

    public String getCustomerGroup() {
        return customerGroup;
    }

    public void setCustomerGroup(String customerGroup) {
        this.customerGroup = customerGroup;
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

    public String getIndustryCode1() {
        return industryCode1;
    }

    public void setIndustryCode1(String industryCode1) {
        this.industryCode1 = industryCode1;
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

    public String getIndustryField001() {
        return industryField001;
    }

    public void setIndustryField001(String industryField001) {
        this.industryField001 = industryField001;
    }

    public String getItemCategory() {
        return itemCategory;
    }

    public void setItemCategory(String itemCategory) {
        this.itemCategory = itemCategory;
    }

    public String getItemNumber() {
        return itemNumber;
    }

    public void setItemNumber(String itemNumber) {
        this.itemNumber = itemNumber;
    }

    public String getLineItemNumber() {
        return lineItemNumber;
    }

    public void setLineItemNumber(String lineItemNumber) {
        this.lineItemNumber = lineItemNumber;
    }

    public String getMaterialSourceInd() {
        return materialSourceInd;
    }

    public void setMaterialSourceInd(String materialSourceInd) {
        this.materialSourceInd = materialSourceInd;
    }

    public String getMaterialType() {
        return materialType;
    }

    public void setMaterialType(String materialType) {
        this.materialType = materialType;
    }

    public String getMatlGroup() {
        return matlGroup;
    }

    public void setMatlGroup(String matlGroup) {
        this.matlGroup = matlGroup;
    }

    public String getPrItemNumber() {
        return prItemNumber;
    }

    public void setPrItemNumber(String prItemNumber) {
        this.prItemNumber = prItemNumber;
    }

    public String getPartnerPC() {
        return partnerPC;
    }

    public void setPartnerPC(String partnerPC) {
        this.partnerPC = partnerPC;
    }

    public String getPlant() {
        return plant;
    }

    public void setPlant(String plant) {
        this.plant = plant;
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

    public String getProdHierarchy() {
        return prodHierarchy;
    }

    public void setProdHierarchy(String prodHierarchy) {
        this.prodHierarchy = prodHierarchy;
    }

    public String getProduct() {
        return product;
    }

    public void setProduct(String product) {
        this.product = product;
    }

    public String getProfitCenter() {
        return profitCenter;
    }

    public void setProfitCenter(String profitCenter) {
        this.profitCenter = profitCenter;
    }

    public String getProjectIndecator() {
        return projectIndecator;
    }

    public void setProjectIndecator(String projectIndecator) {
        this.projectIndecator = projectIndecator;
    }

    public String getProjectNumber1() {
        return projectNumber1;
    }

    public void setProjectNumber1(String projectNumber1) {
        this.projectNumber1 = projectNumber1;
    }

    public String getReferenceDoc() {
        return referenceDoc;
    }

    public void setReferenceDoc(String referenceDoc) {
        this.referenceDoc = referenceDoc;
    }

    public String getReferenceItem() {
        return referenceItem;
    }

    public void setReferenceItem(String referenceItem) {
        this.referenceItem = referenceItem;
    }

    public String getSalesDocType() {
        return salesDocType;
    }

    public void setSalesDocType(String salesDocType) {
        this.salesDocType = salesDocType;
    }

    public String getSalesEmployee() {
        return salesEmployee;
    }

    public void setSalesEmployee(String salesEmployee) {
        this.salesEmployee = salesEmployee;
    }

    public String getSalesOffice() {
        return salesOffice;
    }

    public void setSalesOffice(String salesOffice) {
        this.salesOffice = salesOffice;
    }

    public String getSalesOrder() {
        return salesOrder;
    }

    public void setSalesOrder(String salesOrder) {
        this.salesOrder = salesOrder;
    }

    public String getSalesOrg() {
        return salesOrg;
    }

    public void setSalesOrg(String salesOrg) {
        this.salesOrg = salesOrg;
    }

    public String getServiceLineItemNumber() {
        return serviceLineItemNumber;
    }

    public void setServiceLineItemNumber(String serviceLineItemNumber) {
        this.serviceLineItemNumber = serviceLineItemNumber;
    }

    public String getSgOrder() {
        return sgOrder;
    }

    public void setSgOrder(String sgOrder) {
        this.sgOrder = sgOrder;
    }

    public String getShipToParty() {
        return shipToParty;
    }

    public void setShipToParty(String shipToParty) {
        this.shipToParty = shipToParty;
    }

    public String getValuationType() {
        return valuationType;
    }

    public void setValuationType(String valuationType) {
        this.valuationType = valuationType;
    }

    public String getWBSElement() {
        return wBSElement;
    }

    public void setWBSElement(String wBSElement) {
        this.wBSElement = wBSElement;
    }

    public String getLinkId() {
        return linkId;
    }

    public void setLinkId(String linkId) {
        this.linkId = linkId;
    }

    public String getPoId() {
        return poId;
    }

    public void setPoId(String poId) {
        this.poId = poId;
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
        if (!(object instanceof NGBPCmplxPOCreationLineItemProfitabilitySegment)) {
            return false;
        }
        NGBPCmplxPOCreationLineItemProfitabilitySegment other = (NGBPCmplxPOCreationLineItemProfitabilitySegment) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.NGBPCmplxPOCreationLineItemProfitabilitySegment[ id=" + id + " ]";
    }
    
}
