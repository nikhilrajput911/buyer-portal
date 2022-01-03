/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eportal.entities;

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
 * @author girivasu-g
 */
@Entity
@Table(name = "QueryUser")

@NamedQueries({
    @NamedQuery(name = "QueryUser.findAll", query = "SELECT r FROM QueryUser r")
//    @NamedQuery(name = "ReasonMaster.findById", query = "SELECT r FROM ReasonMaster r WHERE r.id = :id"),
 //   @NamedQuery(name = "ReasonMaster.findByProcessType", query = "SELECT r FROM ReasonMaster r WHERE r.ProcessType = :type")
})
public class QueryUser {
    private static final long serialVersionUID = 1L;
    
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "UserIndex")
    private Integer id;
    @Size(max = 64)
    @Column(name = "UserName")
    private String UserName;
    @Size(max = 64)
    @Column(name = "PersonalName")
    private String PersonalName;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    @Size(max = 225)
    @Column(name = "MailId")
    private String MailId;

    public String getUserName() {
        return UserName;
    }

    public void setUserName(String UserName) {
        this.UserName = UserName;
    }

    public String getPersonalName() {
        return PersonalName;
    }

    public void setPersonalName(String PersonalName) {
        this.PersonalName = PersonalName;
    }

    public String getMailId() {
        return MailId;
    }

    public void setMailId(String MailId) {
        this.MailId = MailId;
    }
   
}
