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
@Table(name = "NG_Master_ConditionValuesFormulas")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterConditionValuesFormulas.findAll", query = "SELECT m FROM MasterConditionValuesFormulas m"),
    @NamedQuery(name = "MasterConditionValuesFormulas.findById", query = "SELECT m FROM MasterConditionValuesFormulas m WHERE m.id = :id"),
    @NamedQuery(name = "MasterConditionValuesFormulas.findByConditionType", query = "SELECT m FROM MasterConditionValuesFormulas m WHERE m.conditionType = :conditionType"),
    @NamedQuery(name = "MasterConditionValuesFormulas.findByRulesToDeriveConditionVale", query = "SELECT m FROM MasterConditionValuesFormulas m WHERE m.rulesToDeriveConditionVale = :rulesToDeriveConditionVale")})
public class MasterConditionValuesFormulas implements Serializable {
    @Size(max = 2147483647)
    @Column(name = "Alias")
    private String alias;
    @Size(max = 200)
    @Column(name = "name")
    private String name;
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Id")
    private Integer id;
    @Size(max = 2147483647)
    @Column(name = "ConditionType")
    private String conditionType;
    @Size(max = 300)
    @Column(name = "RulesToDeriveConditionVale")
    private String rulesToDeriveConditionVale;

    public MasterConditionValuesFormulas() {
    }

    public MasterConditionValuesFormulas(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getConditionType() {
        return conditionType;
    }

    public void setConditionType(String conditionType) {
        this.conditionType = conditionType;
    }

    public String getRulesToDeriveConditionVale() {
        return rulesToDeriveConditionVale;
    }

    public void setRulesToDeriveConditionVale(String rulesToDeriveConditionVale) {
        this.rulesToDeriveConditionVale = rulesToDeriveConditionVale;
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
        if (!(object instanceof MasterConditionValuesFormulas)) {
            return false;
        }
        MasterConditionValuesFormulas other = (MasterConditionValuesFormulas) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterConditionValuesFormulas[ id=" + id + " ]";
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }
    
}
