/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.newgenControl;

import com.eportal.entities.SpendDataBean;
import java.util.List;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author devinarmatha
 */
@XmlRootElement(name = "InputCriteria")
public class InputBean {

private List<SpendDataBean> spendData;


private String SOW_RefNo;
private String spocname;
private String spocemail;
private String initiatorID;
    public String getSpocname() {
        return spocname;
    }
@XmlElement(name = "spocname")
    public void setSpocname(String spocname) {
        this.spocname = spocname;
    }

    public String getSOW_RefNo() {
        return SOW_RefNo;
    }
   @XmlElement(name = "SOW_RefNo")
    public void setSOW_RefNo(String SOW_RefNo) {
        this.SOW_RefNo = SOW_RefNo;
    }


    public List<SpendDataBean> getSpendData() {
        return spendData;
    }
    
    
    @XmlElement(name = "q_NG_Cmplx_CM_Spend_data")
    public void setSpendData(List<SpendDataBean> spendData) {
        this.spendData = spendData;
    }

    public String getInitiatorID() {
        return initiatorID;
    }
    @XmlElement(name = "initiatorID")
    public void setInitiatorID(String initiatorID) {
        this.initiatorID = initiatorID;
    }

    public String getSpocemail() {
        return spocemail;
    }
    @XmlElement(name = "spocemail")
    public void setSpocemail(String spocemail) {
        this.spocemail = spocemail;
    }

    
    
    
    
    
 
    
}
 
 
 
 
