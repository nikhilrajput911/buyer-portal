/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.entities;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author girivasu-g
 */

@XmlRootElement (name="CompleteWIInput")
@XmlAccessorType(XmlAccessType.FIELD)
public class MoveWIInput {
    @XmlElement
    private  String ProcessInstanceId;
   @XmlElement
    private  String WorkitemId,AcknowledgeFlag,AckBy  ,AckByDetails, AckDate ,  AckAction,  AckComments  , Stage,isvendorackreq;

    public String getIsvendorackreq() {
        return isvendorackreq;
    }

    public void setIsvendorackreq(String isvendorackreq) {
        this.isvendorackreq = isvendorackreq;
    }

    public String getAckDate() {
        return AckDate;
    }

    public void setAckDate(String AckDate) {
        this.AckDate = AckDate;
    }

    public String getAckAction() {
        return AckAction;
    }

    public void setAckAction(String AckAction) {
        this.AckAction = AckAction;
    }

    public String getAckComments() {
        return AckComments;
    }

    public void setAckComments(String AckComments) {
        this.AckComments = AckComments;
    }

    public String getStage() {
        return Stage;
    }

    public void setStage(String Stage) {
        this.Stage = Stage;
    }

    public String getAckBy() {
        return AckBy;
    }

    public void setAckBy(String AckBy) {
        this.AckBy = AckBy;
    }

    public String getAckByDetails() {
        return AckByDetails;
    }

    public void setAckByDetails(String AckByDetails) {
        this.AckByDetails = AckByDetails;
    }

    public String getAcknowledgeFlag() {
        return AcknowledgeFlag;
    }

    public void setAcknowledgeFlag(String AcknowledgeFlag) {
        this.AcknowledgeFlag = AcknowledgeFlag;
    }


    public  String getProcessInstanceId() {
        
        return ProcessInstanceId;
    }
    
    public  void setProcessInstanceId(String ProcessInstanceId) {
        
        ProcessInstanceId = ProcessInstanceId;
    }

    public  String getWorkitemId() {
        return WorkitemId;
    }
     
    public  void setWorkitemId(String WorkitemId) {
        
        WorkitemId = WorkitemId;
    }
    
    
    
}
