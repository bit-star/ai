package com.lazulite.ai.repository;
import com.lazulite.ai.domain.ProcessMsgSubTask;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ProcessMsgSubTask entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProcessMsgSubTaskRepository extends JpaRepository<ProcessMsgSubTask, Long> {

}
