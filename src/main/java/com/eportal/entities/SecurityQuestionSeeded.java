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
 * @author Sunny Kumar
 */
@Entity
@Table(name = "ng_bp_securityquestionseeded")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "SecurityQuestionSeeded.findAll", query = "SELECT s FROM SecurityQuestionSeeded s"),
    @NamedQuery(name = "SecurityQuestionSeeded.findById", query = "SELECT s FROM SecurityQuestionSeeded s WHERE s.id = :id"),
    @NamedQuery(name = "SecurityQuestionSeeded.findBySecquestion", query = "SELECT s FROM SecurityQuestionSeeded s WHERE s.secquestion = :secquestion")})
public class SecurityQuestionSeeded implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "id")
    private Integer id;
    @Size(max = 2147483647)
    @Column(name = "secquestion")
    private String secquestion;

    public SecurityQuestionSeeded() {
    }

    public SecurityQuestionSeeded(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSecquestion() {
        return secquestion;
    }

    public void setSecquestion(String secquestion) {
        this.secquestion = secquestion;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof SecurityQuestionSeeded)) {
            return false;
        }
        SecurityQuestionSeeded other = (SecurityQuestionSeeded) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.SecurityQuestionSeeded[ id=" + id + " ]";
    }
    
}
