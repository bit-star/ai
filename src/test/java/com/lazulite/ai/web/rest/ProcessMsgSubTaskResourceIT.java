package com.lazulite.ai.web.rest;

import com.lazulite.ai.AiApp;
import com.lazulite.ai.domain.ProcessMsgSubTask;
import com.lazulite.ai.repository.ProcessMsgSubTaskRepository;
import com.lazulite.ai.service.ProcessMsgSubTaskService;
import com.lazulite.ai.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.lazulite.ai.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ProcessMsgSubTaskResource} REST controller.
 */
@SpringBootTest(classes = AiApp.class)
public class ProcessMsgSubTaskResourceIT {

    private static final String DEFAULT_USERID_LIST = "AAAAAAAAAA";
    private static final String UPDATED_USERID_LIST = "BBBBBBBBBB";

    private static final Long DEFAULT_TASK_ID = 1L;
    private static final Long UPDATED_TASK_ID = 2L;

    @Autowired
    private ProcessMsgSubTaskRepository processMsgSubTaskRepository;

    @Autowired
    private ProcessMsgSubTaskService processMsgSubTaskService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restProcessMsgSubTaskMockMvc;

    private ProcessMsgSubTask processMsgSubTask;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProcessMsgSubTaskResource processMsgSubTaskResource = new ProcessMsgSubTaskResource(processMsgSubTaskService);
        this.restProcessMsgSubTaskMockMvc = MockMvcBuilders.standaloneSetup(processMsgSubTaskResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProcessMsgSubTask createEntity(EntityManager em) {
        ProcessMsgSubTask processMsgSubTask = new ProcessMsgSubTask()
            .useridList(DEFAULT_USERID_LIST)
            .taskId(DEFAULT_TASK_ID);
        return processMsgSubTask;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProcessMsgSubTask createUpdatedEntity(EntityManager em) {
        ProcessMsgSubTask processMsgSubTask = new ProcessMsgSubTask()
            .useridList(UPDATED_USERID_LIST)
            .taskId(UPDATED_TASK_ID);
        return processMsgSubTask;
    }

    @BeforeEach
    public void initTest() {
        processMsgSubTask = createEntity(em);
    }

    @Test
    @Transactional
    public void createProcessMsgSubTask() throws Exception {
        int databaseSizeBeforeCreate = processMsgSubTaskRepository.findAll().size();

        // Create the ProcessMsgSubTask
        restProcessMsgSubTaskMockMvc.perform(post("/api/process-msg-sub-tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(processMsgSubTask)))
            .andExpect(status().isCreated());

        // Validate the ProcessMsgSubTask in the database
        List<ProcessMsgSubTask> processMsgSubTaskList = processMsgSubTaskRepository.findAll();
        assertThat(processMsgSubTaskList).hasSize(databaseSizeBeforeCreate + 1);
        ProcessMsgSubTask testProcessMsgSubTask = processMsgSubTaskList.get(processMsgSubTaskList.size() - 1);
        assertThat(testProcessMsgSubTask.getUseridList()).isEqualTo(DEFAULT_USERID_LIST);
        assertThat(testProcessMsgSubTask.getTaskId()).isEqualTo(DEFAULT_TASK_ID);
    }

    @Test
    @Transactional
    public void createProcessMsgSubTaskWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = processMsgSubTaskRepository.findAll().size();

        // Create the ProcessMsgSubTask with an existing ID
        processMsgSubTask.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProcessMsgSubTaskMockMvc.perform(post("/api/process-msg-sub-tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(processMsgSubTask)))
            .andExpect(status().isBadRequest());

        // Validate the ProcessMsgSubTask in the database
        List<ProcessMsgSubTask> processMsgSubTaskList = processMsgSubTaskRepository.findAll();
        assertThat(processMsgSubTaskList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllProcessMsgSubTasks() throws Exception {
        // Initialize the database
        processMsgSubTaskRepository.saveAndFlush(processMsgSubTask);

        // Get all the processMsgSubTaskList
        restProcessMsgSubTaskMockMvc.perform(get("/api/process-msg-sub-tasks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(processMsgSubTask.getId().intValue())))
            .andExpect(jsonPath("$.[*].useridList").value(hasItem(DEFAULT_USERID_LIST)))
            .andExpect(jsonPath("$.[*].taskId").value(hasItem(DEFAULT_TASK_ID.intValue())));
    }
    
    @Test
    @Transactional
    public void getProcessMsgSubTask() throws Exception {
        // Initialize the database
        processMsgSubTaskRepository.saveAndFlush(processMsgSubTask);

        // Get the processMsgSubTask
        restProcessMsgSubTaskMockMvc.perform(get("/api/process-msg-sub-tasks/{id}", processMsgSubTask.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(processMsgSubTask.getId().intValue()))
            .andExpect(jsonPath("$.useridList").value(DEFAULT_USERID_LIST))
            .andExpect(jsonPath("$.taskId").value(DEFAULT_TASK_ID.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingProcessMsgSubTask() throws Exception {
        // Get the processMsgSubTask
        restProcessMsgSubTaskMockMvc.perform(get("/api/process-msg-sub-tasks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProcessMsgSubTask() throws Exception {
        // Initialize the database
        processMsgSubTaskService.save(processMsgSubTask);

        int databaseSizeBeforeUpdate = processMsgSubTaskRepository.findAll().size();

        // Update the processMsgSubTask
        ProcessMsgSubTask updatedProcessMsgSubTask = processMsgSubTaskRepository.findById(processMsgSubTask.getId()).get();
        // Disconnect from session so that the updates on updatedProcessMsgSubTask are not directly saved in db
        em.detach(updatedProcessMsgSubTask);
        updatedProcessMsgSubTask
            .useridList(UPDATED_USERID_LIST)
            .taskId(UPDATED_TASK_ID);

        restProcessMsgSubTaskMockMvc.perform(put("/api/process-msg-sub-tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProcessMsgSubTask)))
            .andExpect(status().isOk());

        // Validate the ProcessMsgSubTask in the database
        List<ProcessMsgSubTask> processMsgSubTaskList = processMsgSubTaskRepository.findAll();
        assertThat(processMsgSubTaskList).hasSize(databaseSizeBeforeUpdate);
        ProcessMsgSubTask testProcessMsgSubTask = processMsgSubTaskList.get(processMsgSubTaskList.size() - 1);
        assertThat(testProcessMsgSubTask.getUseridList()).isEqualTo(UPDATED_USERID_LIST);
        assertThat(testProcessMsgSubTask.getTaskId()).isEqualTo(UPDATED_TASK_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingProcessMsgSubTask() throws Exception {
        int databaseSizeBeforeUpdate = processMsgSubTaskRepository.findAll().size();

        // Create the ProcessMsgSubTask

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProcessMsgSubTaskMockMvc.perform(put("/api/process-msg-sub-tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(processMsgSubTask)))
            .andExpect(status().isBadRequest());

        // Validate the ProcessMsgSubTask in the database
        List<ProcessMsgSubTask> processMsgSubTaskList = processMsgSubTaskRepository.findAll();
        assertThat(processMsgSubTaskList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProcessMsgSubTask() throws Exception {
        // Initialize the database
        processMsgSubTaskService.save(processMsgSubTask);

        int databaseSizeBeforeDelete = processMsgSubTaskRepository.findAll().size();

        // Delete the processMsgSubTask
        restProcessMsgSubTaskMockMvc.perform(delete("/api/process-msg-sub-tasks/{id}", processMsgSubTask.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProcessMsgSubTask> processMsgSubTaskList = processMsgSubTaskRepository.findAll();
        assertThat(processMsgSubTaskList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
