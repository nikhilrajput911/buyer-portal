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
import javax.persistence.Id;
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
@Table(name = "NG_Master_ServiceMaster")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterServiceMaster.findAll", query = "SELECT m FROM MasterServiceMaster m"),
    @NamedQuery(name = "MasterServiceMaster.findBySno", query = "SELECT m FROM MasterServiceMaster m WHERE m.sno = :sno"),
    @NamedQuery(name = "MasterServiceMaster.findByActivityNumber", query = "SELECT m FROM MasterServiceMaster m WHERE m.activityNumber = :activityNumber"),
    @NamedQuery(name = "MasterServiceMaster.findByShortText", query = "SELECT m FROM MasterServiceMaster m WHERE m.shortText = :shortText"),
    @NamedQuery(name = "MasterServiceMaster.findByServiceCategory", query = "SELECT m FROM MasterServiceMaster m WHERE m.serviceCategory = :serviceCategory"),
    @NamedQuery(name = "MasterServiceMaster.findByUnitOfMeasure", query = "SELECT m FROM MasterServiceMaster m WHERE m.unitOfMeasure = :unitOfMeasure"),
    @NamedQuery(name = "MasterServiceMaster.findByMaterialGroupInfo", query = "SELECT m FROM MasterServiceMaster m WHERE m.materialGroupInfo = :materialGroupInfo"),
    @NamedQuery(name = "MasterServiceMaster.findByAuthorizationGroup", query = "SELECT m FROM MasterServiceMaster m WHERE m.authorizationGroup = :authorizationGroup"),
    @NamedQuery(name = "MasterServiceMaster.findByERDate", query = "SELECT m FROM MasterServiceMaster m WHERE m.eRDate = :eRDate"),
    @NamedQuery(name = "MasterServiceMaster.findByAEDate", query = "SELECT m FROM MasterServiceMaster m WHERE m.aEDate = :aEDate"),
    @NamedQuery(name = "MasterServiceMaster.findByIndicator", query = "SELECT m FROM MasterServiceMaster m WHERE m.indicator = :indicator"),
    @NamedQuery(name = "MasterServiceMaster.findByValuationInfo", query = "SELECT m FROM MasterServiceMaster m WHERE m.valuationInfo = :valuationInfo"),
    @NamedQuery(name = "MasterServiceMaster.findByCHGTextInfo", query = "SELECT m FROM MasterServiceMaster m WHERE m.cHGTextInfo = :cHGTextInfo"),
    @NamedQuery(name = "MasterServiceMaster.findBySLTextInfo", query = "SELECT m FROM MasterServiceMaster m WHERE m.sLTextInfo = :sLTextInfo"),
    @NamedQuery(name = "MasterServiceMaster.findByDivision", query = "SELECT m FROM MasterServiceMaster m WHERE m.division = :division"),
    @NamedQuery(name = "MasterServiceMaster.findByGLCode", query = "SELECT m FROM MasterServiceMaster m WHERE m.gLCode = :gLCode")})
public class MasterServiceMaster implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Sno")
    private Integer sno;
    @Size(max = 50)
    @Column(name = "ActivityNumber")
    private String activityNumber;
    @Size(max = 50)
    @Column(name = "ShortText")
    private String shortText;
    @Size(max = 50)
    @Column(name = "ServiceCategory")
    private String serviceCategory;
    @Size(max = 50)
    @Column(name = "UnitOfMeasure")
    private String unitOfMeasure;
    @Size(max = 50)
    @Column(name = "MaterialGroupInfo")
    private String materialGroupInfo;
    @Size(max = 50)
    @Column(name = "AuthorizationGroup")
    private String authorizationGroup;
    @Column(name = "ERDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date eRDate;
    @Column(name = "AEDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date aEDate;
    @Size(max = 50)
    @Column(name = "Indicator")
    private String indicator;
    @Size(max = 50)
    @Column(name = "ValuationInfo")
    private String valuationInfo;
    @Size(max = 50)
    @Column(name = "CHGTextInfo")
    private String cHGTextInfo;
    @Size(max = 50)
    @Column(name = "SLTextInfo")
    private String sLTextInfo;
    @Size(max = 200)
    @Column(name = "Division")
    private String division;
    @Size(max = 50)
    @Column(name = "GLCode")
    private String gLCode;

    @Size(max = 50)
    @Column(name = "ZGLCode")
    private String zGLCode;
    
    public MasterServiceMaster() {
    }

    public MasterServiceMaster(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getActivityNumber() {
        return activityNumber;
    }

    public void setActivityNumber(String activityNumber) {
        this.activityNumber = activityNumber;
    }

    public String getShortText() {
        return shortText;
    }

    public void setShortText(String shortText) {
        this.shortText = shortText;
    }

    public String getServiceCategory() {
        return serviceCategory;
    }

    public void setServiceCategory(String serviceCategory) {
        this.serviceCategory = serviceCategory;
    }

    public String getUnitOfMeasure() {
        return unitOfMeasure;
    }

    public void setUnitOfMeasure(String unitOfMeasure) {
        this.unitOfMeasure = unitOfMeasure;
    }

    public String getMaterialGroupInfo() {
        return materialGroupInfo;
    }

    public void setMaterialGroupInfo(String materialGroupInfo) {
        this.materialGroupInfo = materialGroupInfo;
    }

    public String getAuthorizationGroup() {
        return authorizationGroup;
    }

    public void setAuthorizationGroup(String authorizationGroup) {
        this.authorizationGroup = authorizationGroup;
    }

    public Date getERDate() {
        return eRDate;
    }

    public void setERDate(Date eRDate) {
        this.eRDate = eRDate;
    }

    public Date getAEDate() {
        return aEDate;
    }

    public void setAEDate(Date aEDate) {
        this.aEDate = aEDate;
    }

    public String getIndicator() {
        return indicator;
    }

    public void setIndicator(String indicator) {
        this.indicator = indicator;
    }

    public String getValuationInfo() {
        return valuationInfo;
    }

    public void setValuationInfo(String valuationInfo) {
        this.valuationInfo = valuationInfo;
    }

    public String getCHGTextInfo() {
        return cHGTextInfo;
    }

    public void setCHGTextInfo(String cHGTextInfo) {
        this.cHGTextInfo = cHGTextInfo;
    }

    public String getSLTextInfo() {
        return sLTextInfo;
    }

    public void setSLTextInfo(String sLTextInfo) {
        this.sLTextInfo = sLTextInfo;
    }

    public String getDivision() {
        return division;
    }

    public void setDivision(String division) {
        this.division = division;
    }

    public String getGLCode() {
        return gLCode;
    }

    public void setGLCode(String gLCode) {
        this.gLCode = gLCode;
    }

    public String getzGLCode() {
        return zGLCode;
    }

    public void setzGLCode(String zGLCode) {
        this.zGLCode = zGLCode;
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
        if (!(object instanceof MasterServiceMaster)) {
            return false;
        }
        MasterServiceMaster other = (MasterServiceMaster) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterServiceMaster[ sno=" + sno + " ]";
    }
    
}
