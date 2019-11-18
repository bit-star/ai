package com.lazulite.ai.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A ProcessMsgSubTask.
 */
@Entity
@Table(name = "process_msg_sub_task")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ProcessMsgSubTask implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "userid_list")
    private String useridList;

    @Column(name = "task_id")
    private Long taskId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties("processMsgSubTasks")
    private ProcessMsgTask processMsgTask;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUseridList() {
        return useridList;
    }

    public ProcessMsgSubTask useridList(String useridList) {
        this.useridList = useridList;
        return this;
    }

    public void setUseridList(String useridList) {
        this.useridList = useridList;
    }

    public Long getTaskId() {
        return taskId;
    }

    public ProcessMsgSubTask taskId(Long taskId) {
        this.taskId = taskId;
        return this;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public ProcessMsgTask getProcessMsgTask() {
        return processMsgTask;
    }

    public ProcessMsgSubTask processMsgTask(ProcessMsgTask processMsgTask) {
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
        if (!(o instanceof ProcessMsgSubTask)) {
            return false;
        }
        return id != null && id.equals(((ProcessMsgSubTask) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ProcessMsgSubTask{" +
            "id=" + getId() +
            ", useridList='" + getUseridList() + "'" +
            ", taskId=" + getTaskId() +
            "}";
    }
}
