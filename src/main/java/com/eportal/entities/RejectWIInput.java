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

@XmlRootElement (name="RejectWIInput")
@XmlAccessorType(XmlAccessType.FIELD)
public class RejectWIInput {
    
   @XmlElement
   private  String WorkitemId,RejectReason,Comments,RejectPRDoc,LinkId;

    public String getLinkId() {
        return LinkId;
    }

    public void setLinkId(String LinkId) {
        this.LinkId = LinkId;
    }

    public  String getWorkitemId() {
        return WorkitemId;
    }
     
    public  void setWorkitemId(String WorkitemId) {
        
        this.WorkitemId = WorkitemId;
    }

    public String getRejectReason() {
        return RejectReason;
    }

    public void setRejectReason(String RejectReason) {
        this.RejectReason = RejectReason;
    }

    public String getComments() {
        return Comments;
    }

    public void setComments(String Comments) {
        this.Comments = Comments;
    }

    public String getRejectPRDoc() {
        return RejectPRDoc;
    }

    public void setRejectPRDoc(String RejectPRDoc) {
        this.RejectPRDoc = RejectPRDoc;
    }
    
    
    
}
