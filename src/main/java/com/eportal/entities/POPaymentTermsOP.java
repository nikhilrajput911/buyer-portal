/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.entities;

/**
 *
 * @author girivasu-g
 */
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="POPaymentTermsOP")
@XmlAccessorType(XmlAccessType.FIELD)
public class POPaymentTermsOP {
    @XmlElement
    private String PaymentDays1,PaymentDays2,PaymentDays3,MainCode,Message;

    public String getPaymentDays1() {
        return PaymentDays1;
    }

    public void setPaymentDays1(String PaymentDays1) {
        this.PaymentDays1 = PaymentDays1;
    }

    public String getPaymentDays2() {
        return PaymentDays2;
    }

    public void setPaymentDays2(String PaymentDays2) {
        this.PaymentDays2 = PaymentDays2;
    }

    public String getPaymentDays3() {
        return PaymentDays3;
    }

    public void setPaymentDays3(String PaymentDays3) {
        this.PaymentDays3 = PaymentDays3;
    }

    public String getMainCode() {
        return MainCode;
    }

    public void setMainCode(String MainCode) {
        this.MainCode = MainCode;
    }

    public String getMessage() {
        return Message;
    }

    public void setMessage(String Message) {
        this.Message = Message;
    }
    
    
}
