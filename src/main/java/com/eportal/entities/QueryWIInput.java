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

@XmlRootElement (name="QueryWIInput")
@XmlAccessorType(XmlAccessType.FIELD)
public class QueryWIInput {
    
    @XmlElement
    private  String WorkitemId,QueryReason,Comments,QueryPRDoc,LinkId,QueryUserID,QueryEmail;

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

    public String getComments() {
        return Comments;
    }

    public void setComments(String Comments) {
        this.Comments = Comments;
    }

    public String getQueryReason() {
        return QueryReason;
    }

    public void setQueryReason(String QueryReason) {
        this.QueryReason = QueryReason;
    }

    public String getQueryPRDoc() {
        return QueryPRDoc;
    }

    public void setQueryPRDoc(String QueryPRDoc) {
        this.QueryPRDoc = QueryPRDoc;
    }

    public String getQueryUserID() {
        return QueryUserID;
    }

    public void setQueryUserID(String QueryUserID) {
        this.QueryUserID = QueryUserID;
    }

    public String getQueryEmail() {
        return QueryEmail;
    }

    public void setQueryEmail(String QueryEmail) {
        this.QueryEmail = QueryEmail;
    }

   
    
    
    
}
