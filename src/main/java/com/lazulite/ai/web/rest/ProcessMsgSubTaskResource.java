package com.lazulite.ai.web.rest;

import com.lazulite.ai.domain.ProcessMsgSubTask;
import com.lazulite.ai.service.ProcessMsgSubTaskService;
import com.lazulite.ai.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.lazulite.ai.domain.ProcessMsgSubTask}.
 */
@RestController
@RequestMapping("/api")
public class ProcessMsgSubTaskResource {

    private final Logger log = LoggerFactory.getLogger(ProcessMsgSubTaskResource.class);

    private static final String ENTITY_NAME = "processMsgSubTask";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProcessMsgSubTaskService processMsgSubTaskService;

    public ProcessMsgSubTaskResource(ProcessMsgSubTaskService processMsgSubTaskService) {
        this.processMsgSubTaskService = processMsgSubTaskService;
    }

    /**
     * {@code POST  /process-msg-sub-tasks} : Create a new processMsgSubTask.
     *
     * @param processMsgSubTask the processMsgSubTask to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new processMsgSubTask, or with status {@code 400 (Bad Request)} if the processMsgSubTask has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/process-msg-sub-tasks")
    public ResponseEntity<ProcessMsgSubTask> createProcessMsgSubTask(@RequestBody ProcessMsgSubTask processMsgSubTask) throws URISyntaxException {
        log.debug("REST request to save ProcessMsgSubTask : {}", processMsgSubTask);
        if (processMsgSubTask.getId() != null) {
            throw new BadRequestAlertException("A new processMsgSubTask cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProcessMsgSubTask result = processMsgSubTaskService.save(processMsgSubTask);
        return ResponseEntity.created(new URI("/api/process-msg-sub-tasks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /process-msg-sub-tasks} : Updates an existing processMsgSubTask.
     *
     * @param processMsgSubTask the processMsgSubTask to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated processMsgSubTask,
     * or with status {@code 400 (Bad Request)} if the processMsgSubTask is not valid,
     * or with status {@code 500 (Internal Server Error)} if the processMsgSubTask couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/process-msg-sub-tasks")
    public ResponseEntity<ProcessMsgSubTask> updateProcessMsgSubTask(@RequestBody ProcessMsgSubTask processMsgSubTask) throws URISyntaxException {
        log.debug("REST request to update ProcessMsgSubTask : {}", processMsgSubTask);
        if (processMsgSubTask.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProcessMsgSubTask result = processMsgSubTaskService.save(processMsgSubTask);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, processMsgSubTask.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /process-msg-sub-tasks} : get all the processMsgSubTasks.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of processMsgSubTasks in body.
     */
    @GetMapping("/process-msg-sub-tasks")
    public ResponseEntity<List<ProcessMsgSubTask>> getAllProcessMsgSubTasks(Pageable pageable) {
        log.debug("REST request to get a page of ProcessMsgSubTasks");
        Page<ProcessMsgSubTask> page = processMsgSubTaskService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /process-msg-sub-tasks/:id} : get the "id" processMsgSubTask.
     *
     * @param id the id of the processMsgSubTask to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the processMsgSubTask, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/process-msg-sub-tasks/{id}")
    public ResponseEntity<ProcessMsgSubTask> getProcessMsgSubTask(@PathVariable Long id) {
        log.debug("REST request to get ProcessMsgSubTask : {}", id);
        Optional<ProcessMsgSubTask> processMsgSubTask = processMsgSubTaskService.findOne(id);
        return ResponseUtil.wrapOrNotFound(processMsgSubTask);
    }

    /**
     * {@code DELETE  /process-msg-sub-tasks/:id} : delete the "id" processMsgSubTask.
     *
     * @param id the id of the processMsgSubTask to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/process-msg-sub-tasks/{id}")
    public ResponseEntity<Void> deleteProcessMsgSubTask(@PathVariable Long id) {
        log.debug("REST request to delete ProcessMsgSubTask : {}", id);
        processMsgSubTaskService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
