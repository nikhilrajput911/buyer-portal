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
@Table(name = "NG_Master_PROC_CA_REL_STRG")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MasterProcCaRelStrg.findAll", query = "SELECT m FROM MasterProcCaRelStrg m"),
    @NamedQuery(name = "MasterProcCaRelStrg.findBySno", query = "SELECT m FROM MasterProcCaRelStrg m WHERE m.sno = :sno"),
    @NamedQuery(name = "MasterProcCaRelStrg.findByProcessType", query = "SELECT m FROM MasterProcCaRelStrg m WHERE m.processType = :processType"),
    @NamedQuery(name = "MasterProcCaRelStrg.findByReleaseStrategy", query = "SELECT m FROM MasterProcCaRelStrg m WHERE m.releaseStrategy = :releaseStrategy"),
    @NamedQuery(name = "MasterProcCaRelStrg.findByLevel1", query = "SELECT m FROM MasterProcCaRelStrg m WHERE m.level1 = :level1"),
    @NamedQuery(name = "MasterProcCaRelStrg.findByLevel2", query = "SELECT m FROM MasterProcCaRelStrg m WHERE m.level2 = :level2"),
    @NamedQuery(name = "MasterProcCaRelStrg.findByLevel3", query = "SELECT m FROM MasterProcCaRelStrg m WHERE m.level3 = :level3"),
    @NamedQuery(name = "MasterProcCaRelStrg.findByLevel4", query = "SELECT m FROM MasterProcCaRelStrg m WHERE m.level4 = :level4"),
    @NamedQuery(name = "MasterProcCaRelStrg.findByLevel5", query = "SELECT m FROM MasterProcCaRelStrg m WHERE m.level5 = :level5"),
    @NamedQuery(name = "MasterProcCaRelStrg.findByLevel6", query = "SELECT m FROM MasterProcCaRelStrg m WHERE m.level6 = :level6"),
    @NamedQuery(name = "MasterProcCaRelStrg.findByLevel7", query = "SELECT m FROM MasterProcCaRelStrg m WHERE m.level7 = :level7"),
    @NamedQuery(name = "MasterProcCaRelStrg.findByLevel8", query = "SELECT m FROM MasterProcCaRelStrg m WHERE m.level8 = :level8"),
    @NamedQuery(name = "MasterProcCaRelStrg.findByReleaseStrategyDesc", query = "SELECT m FROM MasterProcCaRelStrg m WHERE m.releaseStrategyDesc = :releaseStrategyDesc")})
public class MasterProcCaRelStrg implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "Sno")
    private Integer sno;
    @Size(max = 50)
    @Column(name = "ProcessType")
    private String processType;
    @Size(max = 50)
    @Column(name = "ReleaseStrategy")
    private String releaseStrategy;
    @Size(max = 50)
    @Column(name = "Level1")
    private String level1;
    @Size(max = 50)
    @Column(name = "Level2")
    private String level2;
    @Size(max = 50)
    @Column(name = "Level3")
    private String level3;
    @Size(max = 50)
    @Column(name = "Level4")
    private String level4;
    @Size(max = 50)
    @Column(name = "Level5")
    private String level5;
    @Size(max = 50)
    @Column(name = "Level6")
    private String level6;
    @Size(max = 50)
    @Column(name = "Level7")
    private String level7;
    @Size(max = 50)
    @Column(name = "Level8")
    private String level8;
    @Size(max = 200)
    @Column(name = "ReleaseStrategyDesc")
    private String releaseStrategyDesc;

    public MasterProcCaRelStrg() {
    }

    public MasterProcCaRelStrg(Integer sno) {
        this.sno = sno;
    }

    public Integer getSno() {
        return sno;
    }

    public void setSno(Integer sno) {
        this.sno = sno;
    }

    public String getProcessType() {
        return processType;
    }

    public void setProcessType(String processType) {
        this.processType = processType;
    }

    public String getReleaseStrategy() {
        return releaseStrategy;
    }

    public void setReleaseStrategy(String releaseStrategy) {
        this.releaseStrategy = releaseStrategy;
    }

    public String getLevel1() {
        return level1;
    }

    public void setLevel1(String level1) {
        this.level1 = level1;
    }

    public String getLevel2() {
        return level2;
    }

    public void setLevel2(String level2) {
        this.level2 = level2;
    }

    public String getLevel3() {
        return level3;
    }

    public void setLevel3(String level3) {
        this.level3 = level3;
    }

    public String getLevel4() {
        return level4;
    }

    public void setLevel4(String level4) {
        this.level4 = level4;
    }

    public String getLevel5() {
        return level5;
    }

    public void setLevel5(String level5) {
        this.level5 = level5;
    }

    public String getLevel6() {
        return level6;
    }

    public void setLevel6(String level6) {
        this.level6 = level6;
    }

    public String getLevel7() {
        return level7;
    }

    public void setLevel7(String level7) {
        this.level7 = level7;
    }

    public String getLevel8() {
        return level8;
    }

    public void setLevel8(String level8) {
        this.level8 = level8;
    }

    public String getReleaseStrategyDesc() {
        return releaseStrategyDesc;
    }

    public void setReleaseStrategyDesc(String releaseStrategyDesc) {
        this.releaseStrategyDesc = releaseStrategyDesc;
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
        if (!(object instanceof MasterProcCaRelStrg)) {
            return false;
        }
        MasterProcCaRelStrg other = (MasterProcCaRelStrg) object;
        if ((this.sno == null && other.sno != null) || (this.sno != null && !this.sno.equals(other.sno))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.eportal.entities.MasterProcCaRelStrg[ sno=" + sno + " ]";
    }
    
}
