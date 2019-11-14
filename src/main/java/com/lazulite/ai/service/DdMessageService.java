package com.lazulite.ai.service;

import com.lazulite.ai.domain.DdMessage;
import com.lazulite.ai.repository.DdMessageRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link DdMessage}.
 */
@Service
@Transactional
public class DdMessageService {

    private final Logger log = LoggerFactory.getLogger(DdMessageService.class);

    private final DdMessageRepository ddMessageRepository;

    public DdMessageService(DdMessageRepository ddMessageRepository) {
        this.ddMessageRepository = ddMessageRepository;
    }

    /**
     * Save a ddMessage.
     *
     * @param ddMessage the entity to save.
     * @return the persisted entity.
     */
    public DdMessage save(DdMessage ddMessage) {
        log.debug("Request to save DdMessage : {}", ddMessage);
        return ddMessageRepository.save(ddMessage);
    }

    /**
     * Get all the ddMessages.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<DdMessage> findAll(Pageable pageable) {
        log.debug("Request to get all DdMessages");
        return ddMessageRepository.findAll(pageable);
    }


    /**
     * Get one ddMessage by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<DdMessage> findOne(Long id) {
        log.debug("Request to get DdMessage : {}", id);
        return ddMessageRepository.findById(id);
    }

    /**
     * Delete the ddMessage by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete DdMessage : {}", id);
        ddMessageRepository.deleteById(id);
    }
}
