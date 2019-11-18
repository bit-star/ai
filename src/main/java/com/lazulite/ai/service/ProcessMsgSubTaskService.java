package com.lazulite.ai.service;

import com.lazulite.ai.domain.ProcessMsgSubTask;
import com.lazulite.ai.repository.ProcessMsgSubTaskRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link ProcessMsgSubTask}.
 */
@Service
@Transactional
public class ProcessMsgSubTaskService {

    private final Logger log = LoggerFactory.getLogger(ProcessMsgSubTaskService.class);

    private final ProcessMsgSubTaskRepository processMsgSubTaskRepository;

    public ProcessMsgSubTaskService(ProcessMsgSubTaskRepository processMsgSubTaskRepository) {
        this.processMsgSubTaskRepository = processMsgSubTaskRepository;
    }

    /**
     * Save a processMsgSubTask.
     *
     * @param processMsgSubTask the entity to save.
     * @return the persisted entity.
     */
    public ProcessMsgSubTask save(ProcessMsgSubTask processMsgSubTask) {
        log.debug("Request to save ProcessMsgSubTask : {}", processMsgSubTask);
        return processMsgSubTaskRepository.save(processMsgSubTask);
    }

    /**
     * Get all the processMsgSubTasks.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<ProcessMsgSubTask> findAll(Pageable pageable) {
        log.debug("Request to get all ProcessMsgSubTasks");
        return processMsgSubTaskRepository.findAll(pageable);
    }


    /**
     * Get one processMsgSubTask by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ProcessMsgSubTask> findOne(Long id) {
        log.debug("Request to get ProcessMsgSubTask : {}", id);
        return processMsgSubTaskRepository.findById(id);
    }

    /**
     * Delete the processMsgSubTask by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete ProcessMsgSubTask : {}", id);
        processMsgSubTaskRepository.deleteById(id);
    }
}
