package com.lazulite.ai.repository;
import com.lazulite.ai.domain.DdMessage;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DdMessage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DdMessageRepository extends JpaRepository<DdMessage, Long> {

}
