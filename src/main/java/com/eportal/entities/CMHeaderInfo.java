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
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author admin
 */
@Entity
@Table(name = "NG_Cmplx_CM_Header_Data")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CMHeaderInfo.findAll", query = "SELECT v FROM CMHeaderInfo v"),
    @NamedQuery(name = "CMHeaderInfo.findByTransactionID", query = "SELECT v FROM CMHeaderInfo v WHERE v.TransactionID = :TransactionID")
    })
public class CMHeaderInfo implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "InsertionOrderID")
    private Integer sno;

   
    @Size(max = 100)
    @Column(name = "Agreement_No")
    private String AgreementNo;
   

    @Size(max = 100)
    @Column(name = "Company_Code")
    private String CompanyCode;
    
    @Size(max = 100)
    @Column(name = "RFQ_No")
    private String RFQNo;
    
    @Size(max = 100)
    @Column(name = "RFQ_Date")
    private Date RFQDate;
  
    @Size(max = 100)
    @Column(name = "Finalized_Vendor_Code")
    private String FinalVendorCode;
     
    @Size(max = 100)
    @Column(name = "Finalized_Vendor_Name")
    private String FinalVendorName;
    
    @Size(max = 100)
    @Column(name = "TransactionID")
    private String TransactionID;
    
    public CMHeaderInfo() {
    }

    public CMHeaderInfo(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
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
        if (!(object instanceof CMHeaderInfo)) {
            return false;
        }
        CMHeaderInfo other = (CMHeaderInfo) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.CMHeaderInfo[ sno=" + sno + " ]";
    }

  public String getAgreementNo() {
        return AgreementNo;
    }

    public void setAgreementNo(String AgreementNo) {
        this.AgreementNo = AgreementNo;
    }

    public String getCompanyCode() {
        return CompanyCode;
    }

    public void setCompanyCode(String CompanyCode) {
        this.CompanyCode = CompanyCode;
    }

    public String getRFQNo() {
        return RFQNo;
    }

    public void setRFQNo(String RFQNo) {
        this.RFQNo = RFQNo;
    }

    public Date getRFQDate() {
        return RFQDate;
    }

    public void setRFQDate(Date RFQDate) {
        this.RFQDate = RFQDate;
    }

    public String getFinalVendorCode() {
        return FinalVendorCode;
    }

    public void setFinalVendorCode(String FinalVendorCode) {
        this.FinalVendorCode = FinalVendorCode;
    }

    public String getFinalVendorName() {
        return FinalVendorName;
    }

    public void setFinalVendorName(String FinalVendorName) {
        this.FinalVendorName = FinalVendorName;
    }

    public String getTransactionID() {
        return TransactionID;
    }

    public void setTransactionID(String TransactionID) {
        this.TransactionID = TransactionID;
    }
    
    
}
