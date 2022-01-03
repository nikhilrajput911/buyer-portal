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
import javax.persistence.ManyToOne;
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
 * @author Sunny Kumar
 */
@Entity
@Table(name = "ng_bp_buyersecurityqueans")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "BuyerSecurityQueAns.findAll", query = "SELECT b FROM BuyerSecurityQueAns b"),
    @NamedQuery(name = "BuyerSecurityQueAns.findById", query = "SELECT b FROM BuyerSecurityQueAns b WHERE b.id = :id"),
    @NamedQuery(name = "BuyerSecurityQueAns.findByAnswer", query = "SELECT b FROM BuyerSecurityQueAns b WHERE b.answer = :answer"),
    @NamedQuery(name = "BuyerSecurityQueAns.findByQuestion", query = "SELECT b FROM BuyerSecurityQueAns b WHERE b.question = :question"),
    @NamedQuery(name = "BuyerSecurityQueAns.findBySelectiondate", query = "SELECT b FROM BuyerSecurityQueAns b WHERE b.selectiondate = :selectiondate")})
public class BuyerSecurityQueAns implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
//    @NotNull
    @Column(name = "id")
    private Integer id;
    @Size(max = 2147483647)
    @Column(name = "answer")
    private String answer;
    @Size(max = 2147483647)
    @Column(name = "question")
    private String question;
    @Column(name = "selectiondate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date selectiondate;
    @JoinColumn(name = "ng_bp_buyerdetails_id", referencedColumnName = "Id")
    @ManyToOne
    private BuyerDetails ngBpBuyerdetailsId;

    public BuyerSecurityQueAns() {
    }

    public BuyerSecurityQueAns(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public Date getSelectiondate() {
        return selectiondate;
    }

    public void setSelectiondate(Date selectiondate) {
        this.selectiondate = selectiondate;
    }

    public BuyerDetails getNgBpBuyerdetailsId() {
        return ngBpBuyerdetailsId;
    }

    public void setNgBpBuyerdetailsId(BuyerDetails ngBpBuyerdetailsId) {
        this.ngBpBuyerdetailsId = ngBpBuyerdetailsId;
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
        if (!(object instanceof BuyerSecurityQueAns)) {
            return false;
        }
        BuyerSecurityQueAns other = (BuyerSecurityQueAns) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.BuyerSecurityQueAns[ id=" + id + " ]";
    }
    
}
