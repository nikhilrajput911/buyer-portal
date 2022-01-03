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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
@Table(name = "NG_Master_PricingProcedures")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterPricingProcedures.findAll", query = "SELECT m FROM MasterPricingProcedures m"),
    @NamedQuery(name = "MasterPricingProcedures.findById", query = "SELECT m FROM MasterPricingProcedures m WHERE m.id = :id"),
    @NamedQuery(name = "MasterPricingProcedures.findByMandt", query = "SELECT m FROM MasterPricingProcedures m WHERE m.mandt = :mandt"),
    @NamedQuery(name = "MasterPricingProcedures.findByKvewe", query = "SELECT m FROM MasterPricingProcedures m WHERE m.kvewe = :kvewe"),
    @NamedQuery(name = "MasterPricingProcedures.findByKappl", query = "SELECT m FROM MasterPricingProcedures m WHERE m.kappl = :kappl"),
    @NamedQuery(name = "MasterPricingProcedures.findByKalsm", query = "SELECT m FROM MasterPricingProcedures m WHERE m.kalsm = :kalsm"),
    @NamedQuery(name = "MasterPricingProcedures.findByStunr", query = "SELECT m FROM MasterPricingProcedures m WHERE m.stunr = :stunr"),
    @NamedQuery(name = "MasterPricingProcedures.findByZaehk", query = "SELECT m FROM MasterPricingProcedures m WHERE m.zaehk = :zaehk"),
    @NamedQuery(name = "MasterPricingProcedures.findByKschl", query = "SELECT m FROM MasterPricingProcedures m WHERE m.kschl = :kschl"),
    @NamedQuery(name = "MasterPricingProcedures.findByStunb", query = "SELECT m FROM MasterPricingProcedures m WHERE m.stunb = :stunb"),
    @NamedQuery(name = "MasterPricingProcedures.findByStun2", query = "SELECT m FROM MasterPricingProcedures m WHERE m.stun2 = :stun2"),
    @NamedQuery(name = "MasterPricingProcedures.findByKauto", query = "SELECT m FROM MasterPricingProcedures m WHERE m.kauto = :kauto"),
    @NamedQuery(name = "MasterPricingProcedures.findByKobed", query = "SELECT m FROM MasterPricingProcedures m WHERE m.kobed = :kobed"),
    @NamedQuery(name = "MasterPricingProcedures.findByKzwiw", query = "SELECT m FROM MasterPricingProcedures m WHERE m.kzwiw = :kzwiw"),
    @NamedQuery(name = "MasterPricingProcedures.findByKstat", query = "SELECT m FROM MasterPricingProcedures m WHERE m.kstat = :kstat"),
    @NamedQuery(name = "MasterPricingProcedures.findByKofrm", query = "SELECT m FROM MasterPricingProcedures m WHERE m.kofrm = :kofrm"),
    @NamedQuery(name = "MasterPricingProcedures.findByKofra", query = "SELECT m FROM MasterPricingProcedures m WHERE m.kofra = :kofra"),
    @NamedQuery(name = "MasterPricingProcedures.findByKvsl1", query = "SELECT m FROM MasterPricingProcedures m WHERE m.kvsl1 = :kvsl1"),
    @NamedQuery(name = "MasterPricingProcedures.findByKvsl2", query = "SELECT m FROM MasterPricingProcedures m WHERE m.kvsl2 = :kvsl2"),
    @NamedQuery(name = "MasterPricingProcedures.findByDrukz", query = "SELECT m FROM MasterPricingProcedures m WHERE m.drukz = :drukz"),
    @NamedQuery(name = "MasterPricingProcedures.findByKobli", query = "SELECT m FROM MasterPricingProcedures m WHERE m.kobli = :kobli"),
    @NamedQuery(name = "MasterPricingProcedures.findBySapcemConvMe", query = "SELECT m FROM MasterPricingProcedures m WHERE m.sapcemConvMe = :sapcemConvMe"),
    @NamedQuery(name = "MasterPricingProcedures.findByVtext", query = "SELECT m FROM MasterPricingProcedures m WHERE m.vtext = :vtext"),
    @NamedQuery(name = "MasterPricingProcedures.getAllByPricingProcedure", query = "SELECT m FROM MasterPricingProcedures m WHERE m.kalsm = :pricingprocedure and m.kauto!='X'")})
public class MasterPricingProcedures implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "id")
    private Integer id;
    @Column(name = "MANDT")
    private Integer mandt;
    @Size(max = 5)
    @Column(name = "KVEWE")
    private String kvewe;
    @Size(max = 5)
    @Column(name = "KAPPL")
    private String kappl;
    @Size(max = 10)
    @Column(name = "KALSM")
    private String kalsm;
    @Column(name = "STUNR")
    private Integer stunr;
    @Column(name = "ZAEHK")
    private Integer zaehk;
    @Size(max = 10)
    @Column(name = "KSCHL")
    private String kschl;
    @Column(name = "STUNB")
    private Integer stunb;
    @Column(name = "STUN2")
    private Integer stun2;
    @Size(max = 5)
    @Column(name = "KAUTO")
    private String kauto;
    @Column(name = "KOBED")
    private Integer kobed;
    @Size(max = 5)
    @Column(name = "KZWIW")
    private String kzwiw;
    @Size(max = 5)
    @Column(name = "KSTAT")
    private String kstat;
    @Column(name = "KOFRM")
    private Integer kofrm;
    @Column(name = "KOFRA")
    private Integer kofra;
    @Size(max = 5)
    @Column(name = "KVSL1")
    private String kvsl1;
    @Size(max = 5)
    @Column(name = "KVSL2")
    private String kvsl2;
    @Size(max = 5)
    @Column(name = "DRUKZ")
    private String drukz;
    @Size(max = 5)
    @Column(name = "KOBLI")
    private String kobli;
    @Size(max = 5)
    @Column(name = "_SAPCEM_CONV_ME")
    private String sapcemConvMe;
    @Size(max = 50)
    @Column(name = "VTEXT")
    private String vtext;
//    @JoinColumn(name = "NG_Master_PricingDescription_id", referencedColumnName = "id")
//    @ManyToOne
//    private MasterPricingDescription pricingDescriptionId;
    
    public MasterPricingProcedures() {
    }

    public MasterPricingProcedures(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getMandt() {
        return mandt;
    }

    public void setMandt(Integer mandt) {
        this.mandt = mandt;
    }

    public String getKvewe() {
        return kvewe;
    }

    public void setKvewe(String kvewe) {
        this.kvewe = kvewe;
    }

    public String getKappl() {
        return kappl;
    }

    public void setKappl(String kappl) {
        this.kappl = kappl;
    }

    public String getKalsm() {
        return kalsm;
    }

    public void setKalsm(String kalsm) {
        this.kalsm = kalsm;
    }

    public Integer getStunr() {
        return stunr;
    }

    public void setStunr(Integer stunr) {
        this.stunr = stunr;
    }

    public Integer getZaehk() {
        return zaehk;
    }

    public void setZaehk(Integer zaehk) {
        this.zaehk = zaehk;
    }

    public String getKschl() {
        return kschl;
    }

    public void setKschl(String kschl) {
        this.kschl = kschl;
    }

    public Integer getStunb() {
        return stunb;
    }

    public void setStunb(Integer stunb) {
        this.stunb = stunb;
    }

    public Integer getStun2() {
        return stun2;
    }

    public void setStun2(Integer stun2) {
        this.stun2 = stun2;
    }

    public String getKauto() {
        return kauto;
    }

    public void setKauto(String kauto) {
        this.kauto = kauto;
    }

    public Integer getKobed() {
        return kobed;
    }

    public void setKobed(Integer kobed) {
        this.kobed = kobed;
    }

    public String getKzwiw() {
        return kzwiw;
    }

    public void setKzwiw(String kzwiw) {
        this.kzwiw = kzwiw;
    }

    public String getKstat() {
        return kstat;
    }

    public void setKstat(String kstat) {
        this.kstat = kstat;
    }

    public Integer getKofrm() {
        return kofrm;
    }

    public void setKofrm(Integer kofrm) {
        this.kofrm = kofrm;
    }

    public Integer getKofra() {
        return kofra;
    }

    public void setKofra(Integer kofra) {
        this.kofra = kofra;
    }

    public String getKvsl1() {
        return kvsl1;
    }

    public void setKvsl1(String kvsl1) {
        this.kvsl1 = kvsl1;
    }

    public String getKvsl2() {
        return kvsl2;
    }

    public void setKvsl2(String kvsl2) {
        this.kvsl2 = kvsl2;
    }

    public String getDrukz() {
        return drukz;
    }

    public void setDrukz(String drukz) {
        this.drukz = drukz;
    }

    public String getKobli() {
        return kobli;
    }

    public void setKobli(String kobli) {
        this.kobli = kobli;
    }

    public String getSapcemConvMe() {
        return sapcemConvMe;
    }

    public void setSapcemConvMe(String sapcemConvMe) {
        this.sapcemConvMe = sapcemConvMe;
    }

    public String getVtext() {
        return vtext;
    }

    public void setVtext(String vtext) {
        this.vtext = vtext;
    }

//    public MasterPricingDescription getPricingDescriptionId() {
//        return pricingDescriptionId;
//    }
//
//    public void setPricingDescriptionId(MasterPricingDescription pricingDescriptionId) {
//        this.pricingDescriptionId = pricingDescriptionId;
//    }
    
    

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof MasterPricingProcedures)) {
            return false;
        }
        MasterPricingProcedures other = (MasterPricingProcedures) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterPricingProcedures[ id=" + id + " ]";
    }
    
}
