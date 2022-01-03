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
@Table(name = "NG_Cmplx_CM_SOW1")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CMSOWContractDetailsInfo.findAll", query = "SELECT v FROM CMSOWContractDetailsInfo v"),
    @NamedQuery(name = "CMSOWContractDetailsInfo.findByTransactionID", query = "SELECT v FROM CMSOWContractDetailsInfo v WHERE v.TransactionID = :TransactionID")
    })
public class CMSOWContractDetailsInfo implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "InsertionOrderID")
    private Integer sno;

   
    @Size(max = 100)
    @Column(name = "Request_Type")
    private String RequestType;
   

    @Size(max = 100)
    @Column(name = "Contract_Type")
    private String ContractType;
    
    @Size(max = 100)
    @Column(name = "CompanyCode")
    private String CompanyCode;
    
    @Size(max = 100)
    @Column(name = "User_Cost_Centre")
    private String UserCostCentre;
     
    @Size(max = 100)
    @Column(name = "Activation_Date")
    private String ActivationDate;

    @Size(max = 100)
    @Column(name = "Matl_Group_SVS_No")
    private String MatlGroupSVSNo;
    
    @Size(max = 100)
    @Column(name = "Material_Service_Grp_Desc")
    private String MatlSrvGrpDesc;
    
        @Size(max = 100)
    @Column(name = "TransactionID")
    private String TransactionID;

    
    public CMSOWContractDetailsInfo() {
    }

    public CMSOWContractDetailsInfo(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getRequestType() {
        return RequestType;
    }

    public void setRequestType(String RequestType) {
        this.RequestType = RequestType;
    }

    public String getContractType() {
        return ContractType;
    }

    public void setContractType(String ContractType) {
        this.ContractType = ContractType;
    }

    public String getCompanyCode() {
        return CompanyCode;
    }

    public void setCompanyCode(String CompanyCode) {
        this.CompanyCode = CompanyCode;
    }

    public String getUserCostCentre() {
        return UserCostCentre;
    }

    public void setUserCostCentre(String UserCostCentre) {
        this.UserCostCentre = UserCostCentre;
    }

    public String getActivationDate() {
        return ActivationDate;
    }

    public void setActivationDate(String ActivationDate) {
        this.ActivationDate = ActivationDate;
    }

    public String getMatlGroupSVSNo() {
        return MatlGroupSVSNo;
    }

    public void setMatlGroupSVSNo(String MatlGroupSVSNo) {
        this.MatlGroupSVSNo = MatlGroupSVSNo;
    }

    public String getMatlSrvGrpDesc() {
        return MatlSrvGrpDesc;
    }

    public void setMatlSrvGrpDesc(String MatlSrvGrpDesc) {
        this.MatlSrvGrpDesc = MatlSrvGrpDesc;
    }

    public String getTransactionID() {
        return TransactionID;
    }
    public void setTransactionID(String TransactionID) {
        this.TransactionID = TransactionID;
    }
    
    
}
