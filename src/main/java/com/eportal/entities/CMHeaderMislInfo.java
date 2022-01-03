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
@Table(name = "NG_Cmplx_CM_Header")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CMHeaderMislInfo.findAll", query = "SELECT v FROM CMHeaderMislInfo v"),
    @NamedQuery(name = "CMHeaderMislInfo.findByTransactionID", query = "SELECT v FROM CMHeaderMislInfo v WHERE v.TransactionID = :TransactionID")
    })
public class CMHeaderMislInfo implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    //@NotNull
    //@Column(name = "InsertionOrderID")
    //private Integer sno;

   
    @Size(max = 100)
    @Column(name = "ServiceDescription")
    private String ServiceDescription;
   

    @Size(max = 100)
    @Column(name = "SuppliesFromNatSteel")
    private String SuppliesFromNatSteel;
    
    @Size(max = 100)
    @Column(name = "SuppliesFromContractor")
    private String SuppliesFromContractor;
    
    @Size(max = 100)
    @Column(name = "SLA")
    private String SLA;
  
    @Size(max = 100)
    @Column(name = "Safety")
    private String Safety;
     
    @Size(max = 100)
    @Column(name = "DocumentsAndInvoicing")
    private String DocumentsAndInvoicing;
    
    @Size(max = 100)
    @Column(name = "Termination")
    private String Termination;
    
    
    @Size(max = 100)
    @Column(name = "ProcInstId")
    private String TransactionID;
    
    public CMHeaderMislInfo() {
    }

   /* public CMHeaderMislInfo(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }*/
    
  public String getServiceDescription() {
        return ServiceDescription;
    }

    public void setServiceDescription(String ServiceDescription) {
        this.ServiceDescription = ServiceDescription;
    }

    public String getSuppliesFromNatSteel() {
        return SuppliesFromNatSteel;
    }

    public void setSuppliesFromNatSteel(String SuppliesFromNatSteel) {
        this.SuppliesFromNatSteel = SuppliesFromNatSteel;
    }

    public String getSuppliesFromContractor() {
        return SuppliesFromContractor;
    }

    public void setSuppliesFromContractor(String SuppliesFromContractor) {
        this.SuppliesFromContractor = SuppliesFromContractor;
    }

    public String getSLA() {
        return SLA;
    }

    public void setSLA(String SLA) {
        this.SLA = SLA;
    }

    public String getSafety() {
        return Safety;
    }

    public void setSafety(String Safety) {
        this.Safety = Safety;
    }

    public String getDocumentsAndInvoicing() {
        return DocumentsAndInvoicing;
    }

    public void setDocumentsAndInvoicing(String DocumentsAndInvoicing) {
        this.DocumentsAndInvoicing = DocumentsAndInvoicing;
    }
    
    public String getTermination() {
        return Termination;
    }

    public void setTermination(String Termination) {
        this.Termination = Termination;
    }

    public String getTransactionID() {
        return TransactionID;
    }

    public void setTransactionID(String TransactionID) {
        this.TransactionID = TransactionID;
    }
    
    
}
