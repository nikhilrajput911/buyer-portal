/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.eportal.entities;

import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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
@Table(name = "NG_Cmplx_CM_Terms_of_Delivery_Payment")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CMHeaderTermsDPInfo.findAll", query = "SELECT v FROM CMHeaderTermsDPInfo v"),
    @NamedQuery(name = "CMHeaderTermsDPInfo.findByTransactionID", query = "SELECT v FROM CMHeaderTermsDPInfo v WHERE v.TransactionID = :TransactionID")
    })
public class CMHeaderTermsDPInfo implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
     @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "InsertionOrderID")
    private Integer sno;

   
    @Size(max = 100)
    @Column(name = "Agreed_Payment_Terms")
    private String AgreedPaymentTerms;
   

    
    @Column(name = "Payment_In_default")
    private BigDecimal PaymentIndefault;
    
    
    @Column(name = "Payment_In_Perc_default")
    private BigDecimal PaymentInPercdefault;
    
    
    @Column(name = "Payment_In")
    private BigDecimal PaymentIn;
     
    
    @Column(name = "Payment_In_Perc")
    private BigDecimal PaymentInPerc;

    
    @Column(name = "Payment_In_Days_Net")
    private BigDecimal PaymentInDaysNet;
    
    
    @Column(name = "Exchange_Rate")
    private BigDecimal ExchangeRate;
    
    @Size(max = 100)
    @Column(name = "Exchange_Rate_Fixed")
    private String ExchangeRateFixed;
    
    @Size(max = 100)
    @Column(name = "Incoterms_Part1")
    private String IncotermsPart1;
    
    @Size(max = 100)
    @Column(name = "Incoterms_Part2")
    private String IncotermsPart2;
     
    @Size(max = 100)
    @Column(name = "TransactionID")
    private String TransactionID;
    
    public CMHeaderTermsDPInfo() {
    }

    public CMHeaderTermsDPInfo(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getAgreedPaymentTerms() {
        return AgreedPaymentTerms;
    }

    public void setAgreedPaymentTerms(String AgreedPaymentTerms) {
        this.AgreedPaymentTerms = AgreedPaymentTerms;
    }

    public BigDecimal getPaymentIndefault() {
        return PaymentIndefault;
    }

    public void setPaymentIndefault(BigDecimal PaymentIndefault) {
        this.PaymentIndefault = PaymentIndefault;
    }

    public BigDecimal getPaymentInPercdefault() {
        return PaymentInPercdefault;
    }

    public void setPaymentInPercdefault(BigDecimal PaymentInPercdefault) {
        this.PaymentInPercdefault = PaymentInPercdefault;
    }

    public BigDecimal getPaymentIn() {
        return PaymentIn;
    }

    public void setPaymentIn(BigDecimal PaymentIn) {
        this.PaymentIn = PaymentIn;
    }

    public BigDecimal getPaymentInPerc() {
        return PaymentInPerc;
    }

    public void setPaymentInPerc(BigDecimal PaymentInPerc) {
        this.PaymentInPerc = PaymentInPerc;
    }

    public BigDecimal getPaymentInDaysNet() {
        return PaymentInDaysNet;
    }

    public void setPaymentInDaysNet(BigDecimal PaymentInDaysNet) {
        this.PaymentInDaysNet = PaymentInDaysNet;
    }

    public BigDecimal getExchangeRate() {
        return ExchangeRate;
    }

    public void setExchangeRate(BigDecimal ExchangeRate) {
        this.ExchangeRate = ExchangeRate;
    }

    public String getExchangeRateFixed() {
        return ExchangeRateFixed;
    }

    public void setExchangeRateFixed(String ExchangeRateFixed) {
        this.ExchangeRateFixed = ExchangeRateFixed;
    }

    public String getIncotermsPart1() {
        return IncotermsPart1;
    }

    public void setIncotermsPart1(String IncotermsPart1) {
        this.IncotermsPart1 = IncotermsPart1;
    }

    public String getIncotermsPart2() {
        return IncotermsPart2;
    }

    public void setIncotermsPart2(String IncotermsPart2) {
        this.IncotermsPart2 = IncotermsPart2;
    }

    
    
  
    public String getTransactionID() {
        return TransactionID;
    }

    public void setTransactionID(String TransactionID) {
        this.TransactionID = TransactionID;
    }
    
    
}
