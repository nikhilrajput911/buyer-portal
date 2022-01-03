/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.entities;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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
 * @author admin
 */
@Entity
@Table(name = "NG_Cmplx_CM_Agreement_Data")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CMHeaderAgreementInfo.findAll", query = "SELECT v FROM CMHeaderAgreementInfo v"),
    @NamedQuery(name = "CMHeaderAgreementInfo.findByTransactionID", query = "SELECT v FROM CMHeaderAgreementInfo v WHERE v.TransactionID = :TransactionID")
    })
public class CMHeaderAgreementInfo implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    
    @Column(name = "InsertionOrderID")
    private Integer sno;

   
    
    @Column(name = "Final_Agreement_Value")
    private BigDecimal FinalAgreementValue;
   

    @Size(max = 4)
    @Column(name = "Agreement_Type")
    private String AgreementType;
    
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "Agreement_Date")
    private Date AgreementDate;
    
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "Validity_Start_Date")
    private Date ValidityStartDate;
  
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "Validity_End_Date")
    private Date ValidityEndDate;
     
    @Size(max = 100)
    @Column(name = "Duration")
    private String Duration;
    
    @Size(max = 100)
    @Column(name = "Currency")
    private String Currency;
    
    @Size(max = 100)
    @Column(name = "Item_Note")
    private String ItemNote;
    
    @Size(max = 100)
    @Column(name = "Item_Text")
    private String ItemText;
    
    @Size(max = 100)
    @Column(name = "Note_to_Approver")
    private String NotetoApprover;

    @Size(max = 100)
    @Column(name = "TransactionID")
    private String TransactionID;
    
    public CMHeaderAgreementInfo() {
    }

    public CMHeaderAgreementInfo(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public BigDecimal getFinalAgreementValue() {
        return FinalAgreementValue;
    }

    public void setFinalAgreementValue(BigDecimal FinalAgreementValue) {
        this.FinalAgreementValue = FinalAgreementValue;
    }

    public String getAgreementType() {
        return AgreementType;
    }

    public void setAgreementType(String AgreementType) {
        this.AgreementType = AgreementType;
    }

    public Date getAgreementDate() {
        return AgreementDate;
    }

    public void setAgreementDate(Date AgreementDate) {
        this.AgreementDate = AgreementDate;
    }

    public Date getValidityStartDate() {
        return ValidityStartDate;
    }

    public void setValidityStartDate(Date ValidityStartDate) {
        this.ValidityStartDate = ValidityStartDate;
    }

    public Date getValidityEndDate() {
        return ValidityEndDate;
    }

    public void setValidityEndDate(Date ValidityEndDate) {
        this.ValidityEndDate = ValidityEndDate;
    }

    public String getDuration() {
        return Duration;
    }

    public void setDuration(String Duration) {
        this.Duration = Duration;
    }

    public String getCurrency() {
        return Currency;
    }

    public void setCurrency(String Currency) {
        this.Currency = Currency;
    }
    
    public String getItemNote() {
        return ItemNote;
    }

    public void setItemNote(String ItemNote) {
        this.ItemNote = ItemNote;
    }
    
    public String getItemText() {
        return ItemText;
    }

    public void setItemText(String ItemText) {
        this.ItemText = ItemText;
    }
    
    public String getNotetoApprover() {
        return NotetoApprover;
    }

    public void setNotetoApprover(String NotetoApprover) {
        this.NotetoApprover = NotetoApprover;
    }
    
  
    public String getTransactionID() {
        return TransactionID;
    }

    public void setTransactionID(String TransactionID) {
        this.TransactionID = TransactionID;
    }
    
    
}
