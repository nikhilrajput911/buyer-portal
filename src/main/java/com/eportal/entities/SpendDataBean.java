/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.entities;

import java.util.List;
import javax.xml.bind.annotation.XmlElement;

/**
 *
 * @author abhishek.e
 */
public class SpendDataBean {

    private String Purchase_Doc;
    private String Matl_Doc;
    private String MovementType;
    private String AccountAssignment;
    private String DebitorCredit;
    private String Item;
    private String OrderType;
    private String Material_SVSNumber;
    private String Material_ServiceDescription;
    private String PlantCode;
    private String MaterialGroup_SVSNumber;
    private String MaterialServiceGroupDescription;
    private String Posting_Date;
    private String GRQuantity;
    private String LCAmount;
    private String Report;
    private String VendorCode;
    private String VendorName;
    private String UnitPrice;
    private String uom;
    
    private String tenderTitle;
    private String requestType;
    private String companyCode;
    private String contractType;
    private String costCentre;
    private String replyDate;
    private String documents;
    private String termination;

    public String getReport() {
        return Report;
    }
@XmlElement(name = "Report")
    public void setReport(String Report) {
        this.Report = Report;
    }


    public String getPurchase_Doc() {
        return Purchase_Doc;
    }

    @XmlElement(name = "Purchase_Doc")
    public void setPurchase_Doc(String Purchase_Doc) {
        this.Purchase_Doc = Purchase_Doc;
    }

    public String getMatl_Doc() {
        return Matl_Doc;
    }

    @XmlElement(name = "Matl_Doc")
    public void setMatl_Doc(String Matl_Doc) {
        this.Matl_Doc = Matl_Doc;
    }

    public String getMovementType() {
        return MovementType;
    }

    @XmlElement(name = "MovementType")
    public void setMovementType(String MovementType) {
        this.MovementType = MovementType;
    }

    public String getAccountAssignment() {
        return AccountAssignment;
    }

    @XmlElement(name = "AccountAssignment")
    public void setAccountAssignment(String AccountAssignment) {
        this.AccountAssignment = AccountAssignment;
    }

    public String getDebitorCredit() {
        return DebitorCredit;
    }

    @XmlElement(name = "DebitorCredit")
    public void setDebitorCredit(String DebitorCredit) {
        this.DebitorCredit = DebitorCredit;
    }

    public String getItem() {
        return Item;
    }

    @XmlElement(name = "Item")
    public void setItem(String Item) {
        this.Item = Item;
    }

    public String getOrderType() {
        return OrderType;
    }

    @XmlElement(name = "OrderType")
    public void setOrderType(String OrderType) {
        this.OrderType = OrderType;
    }

    public String getMaterial_SVSNumber() {
        return Material_SVSNumber;
    }

    @XmlElement(name = "Material_SVSNumber")
    public void setMaterial_SVSNumber(String Material_SVSNumber) {
        this.Material_SVSNumber = Material_SVSNumber;
    }

    public String getMaterial_ServiceDescription() {
        return Material_ServiceDescription;
    }

    @XmlElement(name = "Material_ServiceDescription")
    public void setMaterial_ServiceDescription(String Material_ServiceDescription) {
        this.Material_ServiceDescription = Material_ServiceDescription;
    }

    public String getPlantCode() {
        return PlantCode;
    }

    @XmlElement(name = "PlantCode")
    public void setPlantCode(String PlantCode) {
        this.PlantCode = PlantCode;
    }

    public String getMaterialGroup_SVSNumber() {
        return MaterialGroup_SVSNumber;
    }

    @XmlElement(name = "MaterialGroup_SVSNumber")
    public void setMaterialGroup_SVSNumber(String MaterialGroup_SVSNumber) {
        this.MaterialGroup_SVSNumber = MaterialGroup_SVSNumber;
    }

    public String getMaterialServiceGroupDescription() {
        return MaterialServiceGroupDescription;
    }

    @XmlElement(name = "MaterialServiceGroupDescription")
    public void setMaterialServiceGroupDescription(String MaterialServiceGroupDescription) {
        this.MaterialServiceGroupDescription = MaterialServiceGroupDescription;
    }

    public String getPosting_Date() {
        return Posting_Date;
    }

    @XmlElement(name = "Posting_Date")
    public void setPosting_Date(String Posting_Date) {
        this.Posting_Date = Posting_Date;
    }

    public String getGRQuantity() {
        return GRQuantity;
    }

    @XmlElement(name = "GRQuantity")
    public void setGRQuantity(String GRQuantity) {
        this.GRQuantity = GRQuantity;
    }

    public String getLCAmount() {
        return LCAmount;
    }

    @XmlElement(name = "LCAmount")
    public void setLCAmount(String LCAmount) {
        this.LCAmount = LCAmount;
    }
public String getVendorCode() {
        return VendorCode;
    }

 

    @XmlElement(name = "VendorCode")
    public void setVendorCode(String VendorCode) {
        this.VendorCode = VendorCode;
    }

 

    public String getVendorName() {
        return VendorName;
    }

 

    @XmlElement(name = "VendorName")
    public void setVendorName(String VendorName) {
        this.VendorName = VendorName;
    }

    public String getUnitPrice() {
        return UnitPrice;
    }
    @XmlElement(name = "UnitPrice")
    public void setUnitPrice(String UnitPrice) {
        this.UnitPrice = UnitPrice;
    }



    public String getUom() {
        return uom;
    }
    @XmlElement(name = "UOM")
    public void setUom(String uom) {
        this.uom = uom;
    }

    public String getTenderTitle() {
        return tenderTitle;
    }
    @XmlElement(name = "TenderTitle")
    public void setTenderTitle(String tenderTitle) {
        this.tenderTitle = tenderTitle;
    }

    public String getRequestType() {
        return requestType;
    }
    @XmlElement(name = "RequestType")
    public void setRequestType(String requestType) {
        this.requestType = requestType;
    }

    public String getCompanyCode() {
        return companyCode;
    }
    @XmlElement(name = "CompanyCode")
    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }

    public String getContractType() {
        return contractType;
    }
    @XmlElement(name = "ContractType")
    public void setContractType(String contractType) {
        this.contractType = contractType;
    }

    public String getCostCentre() {
        return costCentre;
    }
    @XmlElement(name = "CostCentre")
    public void setCostCentre(String costCentre) {
        this.costCentre = costCentre;
    }

    public String getReplyDate() {
        return replyDate;
    }
    @XmlElement(name = "ReplyDate")
    public void setReplyDate(String replyDate) {
        this.replyDate = replyDate;
    }

    public String getDocuments() {
        return documents;
    }
    @XmlElement(name = "Documents")
    public void setDocuments(String documents) {
        this.documents = documents;
    }

    public String getTermination() {
        return termination;
    }
    @XmlElement(name = "Termination")
    public void setTermination(String termination) {
        this.termination = termination;
    }
    
    
    
    
}
