/*
 * To change this template, choose Tools | Templates
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
 * @author abhishek.e
 */
@Entity
@Table(name = "NG_Master_CM_CompanyCode")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "NewgenContractCompanyCode.findAll", query = "SELECT r FROM NewgenContractCompanyCode r"),
    @NamedQuery(name = "NewgenContractCompanyCode.findBySNo", query = "SELECT r FROM NewgenContractCompanyCode r WHERE r.sno = :sno"),
    @NamedQuery(name = "NewgenContractCompanyCode.findByCompanyCode", query = "SELECT r FROM NewgenContractCompanyCode r WHERE r.CompanyCode = :CompanyCode"),
    @NamedQuery(name = "NewgenContractCompanyCode.findByCompanyDesc", query = "SELECT r FROM NewgenContractCompanyCode r WHERE r.CompanyDesc = :CompanyDesc")
  
})
public class NewgenContractCompanyCode implements Serializable  {
    private static final long serialVersionUID = 1L;
    
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "SNo")
    private Integer sno;
    @Size(max = 64)
    @Column(name = "Company_Code")
    private String CompanyCode;
    @Size(max = 64)
    @Column(name = "Company_Desc")
    private String CompanyDesc;

    public Integer getsno() {
        return sno;
    }

    public void setsno(Integer sno) {
        this.sno = sno;
    }


    public String getCompanyCode() {
        return CompanyCode;
    }

    public void setCompanyCode(String CompanyCode) {
        this.CompanyCode = CompanyCode;
    }

    public String getCompanyDesc() {
        return CompanyDesc;
    }

    public void setCompanyDesc(String CompanyDesc) {
        this.CompanyDesc = CompanyDesc;
    }


   
}
