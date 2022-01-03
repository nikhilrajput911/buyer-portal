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
@Table(name = "NG_Cmplx_CM_Reference_Data")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CMHeaderReferenceInfo.findAll", query = "SELECT v FROM CMHeaderReferenceInfo v"),
    @NamedQuery(name = "CMHeaderReferenceInfo.findByTransactionID", query = "SELECT v FROM CMHeaderReferenceInfo v WHERE v.TransactionID = :TransactionID")
    })
public class CMHeaderReferenceInfo implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "InsertionOrderID")
    private Integer sno;

   
    @Size(max = 100)
    @Column(name = "Your_Reference")
    private String YourReference;
   

    @Size(max = 100)
    @Column(name = "Sales_Person")
    private String SalesPerson;
    
    @Size(max = 100)
    @Column(name = "Our_Reference")
    private String OurReference;
    
    @Size(max = 100)
    @Column(name = "Telephone")
    private String Telephone;
     
    @Size(max = 100)
    @Column(name = "Suppl_Vendor")
    private String SupplVendor;

    @Size(max = 100)
    @Column(name = "Invoicing_Party")
    private String InvoicingParty;
    
    
     
    @Size(max = 100)
    @Column(name = "TransactionID")
    private String TransactionID;
    
    public CMHeaderReferenceInfo() {
    }

    public CMHeaderReferenceInfo(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getYourReference() {
        return YourReference;
    }

    public void setYourReference(String YourReference) {
        this.YourReference = YourReference;
    }

    public String getSalesPerson() {
        return SalesPerson;
    }

    public void setSalesPerson(String SalesPerson) {
        this.SalesPerson = SalesPerson;
    }

    public String getOurReference() {
        return OurReference;
    }

    public void setOurReference(String OurReference) {
        this.OurReference = OurReference;
    }

    public String getTelephone() {
        return Telephone;
    }

    public void setTelephone(String Telephone) {
        this.Telephone = Telephone;
    }

    public String getSupplVendor() {
        return SupplVendor;
    }

    public void setSupplVendor(String SupplVendor) {
        this.SupplVendor = SupplVendor;
    }

    public String getInvoicingParty() {
        return InvoicingParty;
    }

    public void setInvoicingParty(String InvoicingParty) {
        this.InvoicingParty = InvoicingParty;
    }

   
    
    
  
    public String getTransactionID() {
        return TransactionID;
    }

    public void setTransactionID(String TransactionID) {
        this.TransactionID = TransactionID;
    }
    
    
}
