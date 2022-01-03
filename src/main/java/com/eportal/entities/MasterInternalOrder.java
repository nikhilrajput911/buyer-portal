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
 * @author Sunny Kumar
 */
@Entity
@Table(name = "NG_Master_InternalOrder")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterInternalOrder.findAll", query = "SELECT m FROM MasterInternalOrder m"),
    @NamedQuery(name = "MasterInternalOrder.findBySno", query = "SELECT m FROM MasterInternalOrder m WHERE m.sno = :sno"),
    @NamedQuery(name = "MasterInternalOrder.findByInternalOrder", query = "SELECT m FROM MasterInternalOrder m WHERE m.internalOrder = :internalOrder"),
    @NamedQuery(name = "MasterInternalOrder.findByIODescription", query = "SELECT m FROM MasterInternalOrder m WHERE m.iODescription = :iODescription"),
    @NamedQuery(name = "MasterInternalOrder.findByIOType", query = "SELECT m FROM MasterInternalOrder m WHERE m.iOType = :iOType"),
    @NamedQuery(name = "MasterInternalOrder.findByCompanyCode", query = "SELECT m FROM MasterInternalOrder m WHERE m.companyCode = :companyCode"),
    @NamedQuery(name = "MasterInternalOrder.findByBusinessArea", query = "SELECT m FROM MasterInternalOrder m WHERE m.businessArea = :businessArea"),
    @NamedQuery(name = "MasterInternalOrder.findByPlant", query = "SELECT m FROM MasterInternalOrder m WHERE m.plant = :plant"),
    @NamedQuery(name = "MasterInternalOrder.findByFunctionalArea", query = "SELECT m FROM MasterInternalOrder m WHERE m.functionalArea = :functionalArea"),
    @NamedQuery(name = "MasterInternalOrder.findByObjectClass", query = "SELECT m FROM MasterInternalOrder m WHERE m.objectClass = :objectClass"),
    @NamedQuery(name = "MasterInternalOrder.findByProfitCenter", query = "SELECT m FROM MasterInternalOrder m WHERE m.profitCenter = :profitCenter"),
    @NamedQuery(name = "MasterInternalOrder.findByResponsiblecctr", query = "SELECT m FROM MasterInternalOrder m WHERE m.responsiblecctr = :responsiblecctr"),
    @NamedQuery(name = "MasterInternalOrder.findByUserResponsible", query = "SELECT m FROM MasterInternalOrder m WHERE m.userResponsible = :userResponsible"),
    @NamedQuery(name = "MasterInternalOrder.findByRequestingCCTR", query = "SELECT m FROM MasterInternalOrder m WHERE m.requestingCCTR = :requestingCCTR"),
    @NamedQuery(name = "MasterInternalOrder.findByRequestingCoCode", query = "SELECT m FROM MasterInternalOrder m WHERE m.requestingCoCode = :requestingCoCode"),
    @NamedQuery(name = "MasterInternalOrder.findByRequestingOrder", query = "SELECT m FROM MasterInternalOrder m WHERE m.requestingOrder = :requestingOrder"),
    @NamedQuery(name = "MasterInternalOrder.findBySalesOrder", query = "SELECT m FROM MasterInternalOrder m WHERE m.salesOrder = :salesOrder"),
    @NamedQuery(name = "MasterInternalOrder.findByExternalOrderNo", query = "SELECT m FROM MasterInternalOrder m WHERE m.externalOrderNo = :externalOrderNo"),
    @NamedQuery(name = "MasterInternalOrder.findByCurrency", query = "SELECT m FROM MasterInternalOrder m WHERE m.currency = :currency"),
    @NamedQuery(name = "MasterInternalOrder.findByReleased", query = "SELECT m FROM MasterInternalOrder m WHERE m.released = :released"),
    @NamedQuery(name = "MasterInternalOrder.findByBlock", query = "SELECT m FROM MasterInternalOrder m WHERE m.block = :block"),
    @NamedQuery(name = "MasterInternalOrder.findByCreationChangeIndicator", query = "SELECT m FROM MasterInternalOrder m WHERE m.creationChangeIndicator = :creationChangeIndicator"),
    @NamedQuery(name = "MasterInternalOrder.findByProcessingGroup", query = "SELECT m FROM MasterInternalOrder m WHERE m.processingGroup = :processingGroup")})
public class MasterInternalOrder implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Sno")
    private Integer sno;
    @Size(max = 100)
    @Column(name = "InternalOrder")
    private String internalOrder;
    @Size(max = 100)
    @Column(name = "IODescription")
    private String iODescription;
    @Size(max = 50)
    @Column(name = "IOType")
    private String iOType;
    @Size(max = 50)
    @Column(name = "CompanyCode")
    private String companyCode;
    @Size(max = 50)
    @Column(name = "BusinessArea")
    private String businessArea;
    @Size(max = 50)
    @Column(name = "Plant")
    private String plant;
    @Size(max = 50)
    @Column(name = "FunctionalArea")
    private String functionalArea;
    @Size(max = 50)
    @Column(name = "ObjectClass")
    private String objectClass;
    @Size(max = 50)
    @Column(name = "ProfitCenter")
    private String profitCenter;
    @Size(max = 50)
    @Column(name = "Responsiblecctr")
    private String responsiblecctr;
    @Size(max = 50)
    @Column(name = "UserResponsible")
    private String userResponsible;
    @Size(max = 50)
    @Column(name = "RequestingCCTR")
    private String requestingCCTR;
    @Size(max = 50)
    @Column(name = "RequestingCoCode")
    private String requestingCoCode;
    @Size(max = 50)
    @Column(name = "RequestingOrder")
    private String requestingOrder;
    @Size(max = 50)
    @Column(name = "SalesOrder")
    private String salesOrder;
    @Size(max = 50)
    @Column(name = "ExternalOrderNo")
    private String externalOrderNo;
    @Size(max = 50)
    @Column(name = "Currency")
    private String currency;
    @Size(max = 50)
    @Column(name = "Released")
    private String released;
    @Size(max = 50)
    @Column(name = "Block")
    private String block;
    @Size(max = 50)
    @Column(name = "CreationChangeIndicator")
    private String creationChangeIndicator;
    @Size(max = 250)
    @Column(name = "ProcessingGroup")
    private String processingGroup;

    public MasterInternalOrder() {
    }

    public MasterInternalOrder(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getInternalOrder() {
        return internalOrder;
    }

    public void setInternalOrder(String internalOrder) {
        this.internalOrder = internalOrder;
    }

    public String getIODescription() {
        return iODescription;
    }

    public void setIODescription(String iODescription) {
        this.iODescription = iODescription;
    }

    public String getIOType() {
        return iOType;
    }

    public void setIOType(String iOType) {
        this.iOType = iOType;
    }

    public String getCompanyCode() {
        return companyCode;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }

    public String getBusinessArea() {
        return businessArea;
    }

    public void setBusinessArea(String businessArea) {
        this.businessArea = businessArea;
    }

    public String getPlant() {
        return plant;
    }

    public void setPlant(String plant) {
        this.plant = plant;
    }

    public String getFunctionalArea() {
        return functionalArea;
    }

    public void setFunctionalArea(String functionalArea) {
        this.functionalArea = functionalArea;
    }

    public String getObjectClass() {
        return objectClass;
    }

    public void setObjectClass(String objectClass) {
        this.objectClass = objectClass;
    }

    public String getProfitCenter() {
        return profitCenter;
    }

    public void setProfitCenter(String profitCenter) {
        this.profitCenter = profitCenter;
    }

    public String getResponsiblecctr() {
        return responsiblecctr;
    }

    public void setResponsiblecctr(String responsiblecctr) {
        this.responsiblecctr = responsiblecctr;
    }

    public String getUserResponsible() {
        return userResponsible;
    }

    public void setUserResponsible(String userResponsible) {
        this.userResponsible = userResponsible;
    }

    public String getRequestingCCTR() {
        return requestingCCTR;
    }

    public void setRequestingCCTR(String requestingCCTR) {
        this.requestingCCTR = requestingCCTR;
    }

    public String getRequestingCoCode() {
        return requestingCoCode;
    }

    public void setRequestingCoCode(String requestingCoCode) {
        this.requestingCoCode = requestingCoCode;
    }

    public String getRequestingOrder() {
        return requestingOrder;
    }

    public void setRequestingOrder(String requestingOrder) {
        this.requestingOrder = requestingOrder;
    }

    public String getSalesOrder() {
        return salesOrder;
    }

    public void setSalesOrder(String salesOrder) {
        this.salesOrder = salesOrder;
    }

    public String getExternalOrderNo() {
        return externalOrderNo;
    }

    public void setExternalOrderNo(String externalOrderNo) {
        this.externalOrderNo = externalOrderNo;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getReleased() {
        return released;
    }

    public void setReleased(String released) {
        this.released = released;
    }

    public String getBlock() {
        return block;
    }

    public void setBlock(String block) {
        this.block = block;
    }

    public String getCreationChangeIndicator() {
        return creationChangeIndicator;
    }

    public void setCreationChangeIndicator(String creationChangeIndicator) {
        this.creationChangeIndicator = creationChangeIndicator;
    }

    public String getProcessingGroup() {
        return processingGroup;
    }

    public void setProcessingGroup(String processingGroup) {
        this.processingGroup = processingGroup;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (sno != null ? sno.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof MasterInternalOrder)) {
            return false;
        }
        MasterInternalOrder other = (MasterInternalOrder) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterInternalOrder[ sno=" + sno + " ]";
    }
    
}
