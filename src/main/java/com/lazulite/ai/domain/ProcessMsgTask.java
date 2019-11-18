package com.lazulite.ai.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import com.lazulite.ai.domain.enumeration.DdMessageType;

import com.lazulite.ai.domain.enumeration.MessageStatus;

/**
 * A ProcessMsgTask.
 */
@Entity
@Table(name = "process_msg_task")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ProcessMsgTask implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "dept_id_list")
    private String deptIdList;

    @Column(name = "userid_list")
    private String useridList;

    @Column(name = "to_all_user")
    private Boolean toAllUser;

    @Column(name = "msg")
    private String msg;

    @Column(name = "execute_time")
    private Instant executeTime;

    @Column(name = "agent_id")
    private Long agentId;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private DdMessageType type;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private MessageStatus status;

    @OneToMany(mappedBy = "processMsgTask")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ProcessMsgSubTask> processMsgSubTasks = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties("processMsgTasks")
    private ProcessInstance processInstance;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDeptIdList() {
        return deptIdList;
    }

    public ProcessMsgTask deptIdList(String deptIdList) {
        this.deptIdList = deptIdList;
        return this;
    }

    public void setDeptIdList(String deptIdList) {
        this.deptIdList = deptIdList;
    }

    public String getUseridList() {
        return useridList;
    }

    public ProcessMsgTask useridList(String useridList) {
        this.useridList = useridList;
        return this;
    }

    public void setUseridList(String useridList) {
        this.useridList = useridList;
    }

    public Boolean isToAllUser() {
        return toAllUser;
    }

    public ProcessMsgTask toAllUser(Boolean toAllUser) {
        this.toAllUser = toAllUser;
        return this;
    }

    public void setToAllUser(Boolean toAllUser) {
        this.toAllUser = toAllUser;
    }

    public String getMsg() {
        return msg;
    }

    public ProcessMsgTask msg(String msg) {
        this.msg = msg;
        return this;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Instant getExecuteTime() {
        return executeTime;
    }

    public ProcessMsgTask executeTime(Instant executeTime) {
        this.executeTime = executeTime;
        return this;
    }

    public void setExecuteTime(Instant executeTime) {
        this.executeTime = executeTime;
    }

    public Long getAgentId() {
        return agentId;
    }

    public ProcessMsgTask agentId(Long agentId) {
        this.agentId = agentId;
        return this;
    }

    public void setAgentId(Long agentId) {
        this.agentId = agentId;
    }

    public DdMessageType getType() {
        return type;
    }

    public ProcessMsgTask type(DdMessageType type) {
        this.type = type;
        return this;
    }

    public void setType(DdMessageType type) {
        this.type = type;
    }

    public MessageStatus getStatus() {
        return status;
    }

    public ProcessMsgTask status(MessageStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(MessageStatus status) {
        this.status = status;
    }

    public Set<ProcessMsgSubTask> getProcessMsgSubTasks() {
        return processMsgSubTasks;
    }

    public ProcessMsgTask processMsgSubTasks(Set<ProcessMsgSubTask> processMsgSubTasks) {
        this.processMsgSubTasks = processMsgSubTasks;
        return this;
    }

    public ProcessMsgTask addProcessMsgSubTask(ProcessMsgSubTask processMsgSubTask) {
        this.processMsgSubTasks.add(processMsgSubTask);
        processMsgSubTask.setProcessMsgTask(this);
        return this;
    }

    public ProcessMsgTask removeProcessMsgSubTask(ProcessMsgSubTask processMsgSubTask) {
        this.processMsgSubTasks.remove(processMsgSubTask);
        processMsgSubTask.setProcessMsgTask(null);
        return this;
    }

    public void setProcessMsgSubTasks(Set<ProcessMsgSubTask> processMsgSubTasks) {
        this.processMsgSubTasks = processMsgSubTasks;
    }

    public ProcessInstance getProcessInstance() {
        return processInstance;
    }

    public ProcessMsgTask processInstance(ProcessInstance processInstance) {
        this.processInstance = processInstance;
        return this;
    }

    public void setProcessInstance(ProcessInstance processInstance) {
        this.processInstance = processInstance;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProcessMsgTask)) {
            return false;
        }
        return id != null && id.equals(((ProcessMsgTask) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ProcessMsgTask{" +
            "id=" + getId() +
            ", deptIdList='" + getDeptIdList() + "'" +
            ", useridList='" + getUseridList() + "'" +
            ", toAllUser='" + isToAllUser() + "'" +
            ", msg='" + getMsg() + "'" +
            ", executeTime='" + getExecuteTime() + "'" +
            ", agentId=" + getAgentId() +
            ", type='" + getType() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
