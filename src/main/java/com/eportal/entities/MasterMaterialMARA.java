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
 * @author admin
 */
@Entity
@Table(name = "NG_Master_Material_MARA")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterMaterialMARA.findAll", query = "SELECT m FROM MasterMaterialMARA m"),
    @NamedQuery(name = "MasterMaterialMARA.findBySno", query = "SELECT m FROM MasterMaterialMARA m WHERE m.sno = :sno"),
    @NamedQuery(name = "MasterMaterialMARA.findByMatnr", query = "SELECT m FROM MasterMaterialMARA m WHERE m.matnr = :matnr"),
    @NamedQuery(name = "MasterMaterialMARA.findByErsda", query = "SELECT m FROM MasterMaterialMARA m WHERE m.ersda = :ersda"),
    @NamedQuery(name = "MasterMaterialMARA.findByLaeda", query = "SELECT m FROM MasterMaterialMARA m WHERE m.laeda = :laeda"),
    @NamedQuery(name = "MasterMaterialMARA.findByLvorm", query = "SELECT m FROM MasterMaterialMARA m WHERE m.lvorm = :lvorm"),
    @NamedQuery(name = "MasterMaterialMARA.findByMtart", query = "SELECT m FROM MasterMaterialMARA m WHERE m.mtart = :mtart"),
    @NamedQuery(name = "MasterMaterialMARA.findByMatkl", query = "SELECT m FROM MasterMaterialMARA m WHERE m.matkl = :matkl"),
    @NamedQuery(name = "MasterMaterialMARA.findByBismt", query = "SELECT m FROM MasterMaterialMARA m WHERE m.bismt = :bismt"),
    @NamedQuery(name = "MasterMaterialMARA.findByMeins", query = "SELECT m FROM MasterMaterialMARA m WHERE m.meins = :meins"),
    @NamedQuery(name = "MasterMaterialMARA.findByBstme", query = "SELECT m FROM MasterMaterialMARA m WHERE m.bstme = :bstme"),
    @NamedQuery(name = "MasterMaterialMARA.findByEkwsl", query = "SELECT m FROM MasterMaterialMARA m WHERE m.ekwsl = :ekwsl"),
    @NamedQuery(name = "MasterMaterialMARA.findByXchpf", query = "SELECT m FROM MasterMaterialMARA m WHERE m.xchpf = :xchpf"),
    @NamedQuery(name = "MasterMaterialMARA.findByExtwg", query = "SELECT m FROM MasterMaterialMARA m WHERE m.extwg = :extwg"),
    @NamedQuery(name = "MasterMaterialMARA.findByMstae", query = "SELECT m FROM MasterMaterialMARA m WHERE m.mstae = :mstae"),
    @NamedQuery(name = "MasterMaterialMARA.findByMstdv", query = "SELECT m FROM MasterMaterialMARA m WHERE m.mstdv = :mstdv"),
    @NamedQuery(name = "MasterMaterialMARA.findByNrfhg", query = "SELECT m FROM MasterMaterialMARA m WHERE m.nrfhg = :nrfhg"),
    @NamedQuery(name = "MasterMaterialMARA.findByMfrpn", query = "SELECT m FROM MasterMaterialMARA m WHERE m.mfrpn = :mfrpn"),
    @NamedQuery(name = "MasterMaterialMARA.findByMfrnr", query = "SELECT m FROM MasterMaterialMARA m WHERE m.mfrnr = :mfrnr"),
    @NamedQuery(name = "MasterMaterialMARA.findByMprof", query = "SELECT m FROM MasterMaterialMARA m WHERE m.mprof = :mprof"),
    @NamedQuery(name = "MasterMaterialMARA.findByLongText", query = "SELECT m FROM MasterMaterialMARA m WHERE m.longText = :longText"),
    @NamedQuery(name = "MasterMaterialMARA.findByClassnum", query = "SELECT m FROM MasterMaterialMARA m WHERE m.classnum = :classnum")})
public class MasterMaterialMARA implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Sno")
    private Integer sno;
    @Size(max = 100)
    @Column(name = "MATNR")
    private String matnr;
    @Size(max = 300)
    @Column(name = "ERSDA")
    private String ersda;
    @Size(max = 100)
    @Column(name = "LAEDA")
    private String laeda;
    @Size(max = 100)
    @Column(name = "LVORM")
    private String lvorm;
    @Size(max = 100)
    @Column(name = "MTART")
    private String mtart;
    @Size(max = 100)
    @Column(name = "MATKL")
    private String matkl;
    @Size(max = 100)
    @Column(name = "BISMT")
    private String bismt;
    @Size(max = 100)
    @Column(name = "MEINS")
    private String meins;
    @Size(max = 100)
    @Column(name = "BSTME")
    private String bstme;
    @Size(max = 100)
    @Column(name = "EKWSL")
    private String ekwsl;
    @Size(max = 50)
    @Column(name = "XCHPF")
    private String xchpf;
    @Size(max = 200)
    @Column(name = "EXTWG")
    private String extwg;
    @Size(max = 200)
    @Column(name = "MSTAE")
    private String mstae;
    @Size(max = 200)
    @Column(name = "MSTDV")
    private String mstdv;
    @Size(max = 200)
    @Column(name = "NRFHG")
    private String nrfhg;
    @Size(max = 200)
    @Column(name = "MFRPN")
    private String mfrpn;
    @Size(max = 200)
    @Column(name = "MFRNR")
    private String mfrnr;
    @Size(max = 200)
    @Column(name = "MPROF")
    private String mprof;
    @Size(max = 2147483647)
    @Column(name = "LONG_TEXT")
    private String longText;
    @Size(max = 200)
    @Column(name = "CLASSNUM")
    private String classnum;

    public MasterMaterialMARA() {
    }

    public MasterMaterialMARA(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getMatnr() {
        return matnr;
    }

    public void setMatnr(String matnr) {
        this.matnr = matnr;
    }

    public String getErsda() {
        return ersda;
    }

    public void setErsda(String ersda) {
        this.ersda = ersda;
    }

    public String getLaeda() {
        return laeda;
    }

    public void setLaeda(String laeda) {
        this.laeda = laeda;
    }

    public String getLvorm() {
        return lvorm;
    }

    public void setLvorm(String lvorm) {
        this.lvorm = lvorm;
    }

    public String getMtart() {
        return mtart;
    }

    public void setMtart(String mtart) {
        this.mtart = mtart;
    }

    public String getMatkl() {
        return matkl;
    }

    public void setMatkl(String matkl) {
        this.matkl = matkl;
    }

    public String getBismt() {
        return bismt;
    }

    public void setBismt(String bismt) {
        this.bismt = bismt;
    }

    public String getMeins() {
        return meins;
    }

    public void setMeins(String meins) {
        this.meins = meins;
    }

    public String getBstme() {
        return bstme;
    }

    public void setBstme(String bstme) {
        this.bstme = bstme;
    }

    public String getEkwsl() {
        return ekwsl;
    }

    public void setEkwsl(String ekwsl) {
        this.ekwsl = ekwsl;
    }

    public String getXchpf() {
        return xchpf;
    }

    public void setXchpf(String xchpf) {
        this.xchpf = xchpf;
    }

    public String getExtwg() {
        return extwg;
    }

    public void setExtwg(String extwg) {
        this.extwg = extwg;
    }

    public String getMstae() {
        return mstae;
    }

    public void setMstae(String mstae) {
        this.mstae = mstae;
    }

    public String getMstdv() {
        return mstdv;
    }

    public void setMstdv(String mstdv) {
        this.mstdv = mstdv;
    }

    public String getNrfhg() {
        return nrfhg;
    }

    public void setNrfhg(String nrfhg) {
        this.nrfhg = nrfhg;
    }

    public String getMfrpn() {
        return mfrpn;
    }

    public void setMfrpn(String mfrpn) {
        this.mfrpn = mfrpn;
    }

    public String getMfrnr() {
        return mfrnr;
    }

    public void setMfrnr(String mfrnr) {
        this.mfrnr = mfrnr;
    }

    public String getMprof() {
        return mprof;
    }

    public void setMprof(String mprof) {
        this.mprof = mprof;
    }

    public String getLongText() {
        return longText;
    }

    public void setLongText(String longText) {
        this.longText = longText;
    }

    public String getClassnum() {
        return classnum;
    }

    public void setClassnum(String classnum) {
        this.classnum = classnum;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (sno != null ? sno.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof MasterMaterialMARA)) {
            return false;
        }
        MasterMaterialMARA other = (MasterMaterialMARA) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterMaterialMARA[ sno=" + sno + " ]";
    }
    
}
