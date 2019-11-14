package com.lazulite.ai.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

import com.lazulite.ai.domain.enumeration.DdMessageType;

/**
 * A DdMessage.
 */
@Entity
@Table(name = "dd_message")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DdMessage implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "receiving_department")
    private String receivingDepartment;

    @Column(name = "receiving_user")
    private String receivingUser;

    @Column(name = "title")
    private String title;

    @Column(name = "json")
    private String json;

    @Column(name = "send_time")
    private Instant sendTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private DdMessageType type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties("ddMessages")
    private ProcessMsgTask processMsgTask;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReceivingDepartment() {
        return receivingDepartment;
    }

    public DdMessage receivingDepartment(String receivingDepartment) {
        this.receivingDepartment = receivingDepartment;
        return this;
    }

    public void setReceivingDepartment(String receivingDepartment) {
        this.receivingDepartment = receivingDepartment;
    }

    public String getReceivingUser() {
        return receivingUser;
    }

    public DdMessage receivingUser(String receivingUser) {
        this.receivingUser = receivingUser;
        return this;
    }

    public void setReceivingUser(String receivingUser) {
        this.receivingUser = receivingUser;
    }

    public String getTitle() {
        return title;
    }

    public DdMessage title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getJson() {
        return json;
    }

    public DdMessage json(String json) {
        this.json = json;
        return this;
    }

    public void setJson(String json) {
        this.json = json;
    }

    public Instant getSendTime() {
        return sendTime;
    }

    public DdMessage sendTime(Instant sendTime) {
        this.sendTime = sendTime;
        return this;
    }

    public void setSendTime(Instant sendTime) {
        this.sendTime = sendTime;
    }

    public DdMessageType getType() {
        return type;
    }

    public DdMessage type(DdMessageType type) {
        this.type = type;
        return this;
    }

    public void setType(DdMessageType type) {
        this.type = type;
    }

    public ProcessMsgTask getProcessMsgTask() {
        return processMsgTask;
    }

    public DdMessage processMsgTask(ProcessMsgTask processMsgTask) {
        this.processMsgTask = processMsgTask;
        return this;
    }

    public void setProcessMsgTask(ProcessMsgTask processMsgTask) {
        this.processMsgTask = processMsgTask;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DdMessage)) {
            return false;
        }
        return id != null && id.equals(((DdMessage) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "DdMessage{" +
            "id=" + getId() +
            ", receivingDepartment='" + getReceivingDepartment() + "'" +
            ", receivingUser='" + getReceivingUser() + "'" +
            ", title='" + getTitle() + "'" +
            ", json='" + getJson() + "'" +
            ", sendTime='" + getSendTime() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
