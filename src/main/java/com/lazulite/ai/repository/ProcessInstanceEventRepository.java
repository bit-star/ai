package com.lazulite.ai.repository;
import com.lazulite.ai.domain.ProcessInstanceEvent;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ProcessInstanceEvent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProcessInstanceEventRepository extends JpaRepository<ProcessInstanceEvent, Long> {

}
