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
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
//import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author abhishek.e
 */
@Entity
@Table(name = "NG_Cmplx_CM_Agreement_Data")
@XmlRootElement

@NamedQueries({
     @NamedQuery(name = "ContractAgreementData.findByValidityEndDate", query = "SELECT r FROM ContractAgreementData r where DATEDIFF(day, r.ValidityEndDate,:currentDate) BETWEEN 0 AND 60")})
    /*  @NamedQuery(name = "ContractAgreementData.findAll", query = "SELECT c FROM ContractAgreementData c"),
    /* 
    @NamedQuery(name = "ContractAgreementData.findByInsertionorderid", query = "SELECT c FROM ContractAgreementData c WHERE c.Insertionorderid = :Insertionorderid"),
    @NamedQuery(name = "ContractAgreementData.findByTransactionID", query = "SELECT c FROM ContractAgreementData c WHERE c.TransactionID = :TransactionID"),
    @NamedQuery(name = "ContractAgreementData.findByCurrency", query = "SELECT c FROM ContractAgreementData c WHERE c.Currency = :Currency"),
    @NamedQuery(name = "ContractAgreementData.findByFinalAgreementValue", query = "SELECT c FROM ContractAgreementData c WHERE c.FinalAgreementValue = :FinalAgreementValue"),
    @NamedQuery(name = "ContractAgreementData.findByAgreementDate", query = "SELECT c FROM ContractAgreementData c WHERE c.AgreementDate = :AgreementDate"),
    @NamedQuery(name = "ContractAgreementData.findByAgreementType", query = "SELECT c FROM ContractAgreementData c WHERE c.AgreementType = :AgreementType"),
  @NamedQuery(name = "ContractAgreementData.findByValidityStartDate", query = "SELECT c FROM ContractAgreementData c WHERE c.ValidityStartDate = :ValidityStartDate"),
   */ 
   /*   @NamedQuery(name = "ContractAgreementData.findByDuration", query = "SELECT c FROM ContractAgreementData c WHERE c.Duration = :Duration"),
    @NamedQuery(name = "ContractAgreementData.findByAccountAssignment", query = "SELECT c FROM ContractAgreementData c WHERE c.AccountAssignment = :AccountAssignment"),
    @NamedQuery(name = "ContractAgreementData.findByActivationDateService", query = "SELECT c FROM ContractAgreementData c WHERE c.ActivationDateService = :ActivationDateService"),
    /*  @NamedQuery(name = "ContractAgreementData.findByBPassigndate", query = "SELECT c FROM ContractAgreementData c WHERE c.contactpersonename = :contactpersonename"),
  @NamedQuery(name = "ContractAgreementData.findByBPquantityremaining", query = "SELECT c FROM ContractAgreementData c WHERE c.BPquantityremaining = :BPquantityremaining"),
  
    @NamedQuery(name = "ContractAgreementData.findByBPrfqstatus", query = "SELECT c FROM ContractAgreementData c WHERE c.BPrfqstatus = :BPrfqstatus"),
   /* @NamedQuery(name = "ContractAgreementData.findByBPstatus", query = "SELECT c FROM ContractAgreementData c WHERE c.BPrfqstatus = :BPrfqstatus"),
    */
    /*  @NamedQuery(name = "ContractAgreementData.findByCoCode", query = "SELECT c FROM ContractAgreementData c WHERE c.CoCode = :CoCode"),
  /*  @NamedQuery(name = "ContractAgreementData.findByItemCategory", query = "SELECT c FROM ContractAgreementData c WHERE c.ItemCategory = :ItemCategory"),
    */
     /* @NamedQuery(name = "ContractAgreementData.findByItemNote", query = "SELECT c FROM ContractAgreementData c WHERE c.ItemNote = :ItemNote"),
   /*   @NamedQuery(name = "ContractAgreementData.findByItemNumber", query = "SELECT c FROM ContractAgreementData c WHERE c.ItemNumber = :ItemNumber"),
  /*    @NamedQuery(name = "ContractAgreementData.findByValidityEndDate", query = "SELECT  DATEDIFF(day,GETDATE(), c) from ContractAgreementData where DATEDIFF(day,GETDATE(), c.ValidityEndDate) BETWEEN 0 AND 60")})
  /*   @NamedQuery(name = "ContractAgreementData.findByItemText", query = "SELECT c FROM ContractAgreementData c WHERE c.ItemText = :ItemText")
   @NamedQuery(name = "ContractAgreementData.findByInternalrecipients", query = "SELECT c FROM ContractAgreementData c WHERE c.internalrecipients = :internalrecipients")
*/
public class ContractAgreementData implements Serializable {
        private static final long serialVersionUID = 1L;
    @Size(max = 50)
    @Column(name = "TransactionID")
    private String TransactionID;
    @Id
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "InsertionOrderID")
    private Long InsertionOrderID;
    @Size(max = 30)
    @Column(name = "Final_Agreement_Value")
    private String FinalAgreementValue;
     @Size(max = 30)
    @Column(name = "Currency")
    private String Currency;
         @Size(max = 30)
    @Column(name = "Validity_End_Date")
    private String ValidityEndDate;
     
     
   

}
