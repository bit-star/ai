package com.lazulite.ai.web.rest;

import com.lazulite.ai.AiApp;
import com.lazulite.ai.domain.ProcessMsgTask;
import com.lazulite.ai.repository.ProcessMsgTaskRepository;
import com.lazulite.ai.service.ProcessMsgTaskService;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.lazulite.ai.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.lazulite.ai.domain.enumeration.DdMessageType;
import com.lazulite.ai.domain.enumeration.MessageStatus;
/**
 * Integration tests for the {@link ProcessMsgTaskResource} REST controller.
 */
@SpringBootTest(classes = AiApp.class)
public class ProcessMsgTaskResourceIT {

    private static final String DEFAULT_DEPT_ID_LIST = "AAAAAAAAAA";
    private static final String UPDATED_DEPT_ID_LIST = "BBBBBBBBBB";

    private static final String DEFAULT_USERID_LIST = "AAAAAAAAAA";
    private static final String UPDATED_USERID_LIST = "BBBBBBBBBB";

    private static final Boolean DEFAULT_TO_ALL_USER = false;
    private static final Boolean UPDATED_TO_ALL_USER = true;

    private static final String DEFAULT_MSG = "AAAAAAAAAA";
    private static final String UPDATED_MSG = "BBBBBBBBBB";

    private static final Instant DEFAULT_EXECUTE_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_EXECUTE_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Long DEFAULT_AGENT_ID = 1L;
    private static final Long UPDATED_AGENT_ID = 2L;

    private static final DdMessageType DEFAULT_TYPE = DdMessageType.Voice;
    private static final DdMessageType UPDATED_TYPE = DdMessageType.ActionCard;

    private static final MessageStatus DEFAULT_STATUS = MessageStatus.SentSuccessfully;
    private static final MessageStatus UPDATED_STATUS = MessageStatus.Sending;

    @Autowired
    private ProcessMsgTaskRepository processMsgTaskRepository;

    @Autowired
    private ProcessMsgTaskService processMsgTaskService;

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

    private MockMvc restProcessMsgTaskMockMvc;

    private ProcessMsgTask processMsgTask;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProcessMsgTaskResource processMsgTaskResource = new ProcessMsgTaskResource(processMsgTaskService);
        this.restProcessMsgTaskMockMvc = MockMvcBuilders.standaloneSetup(processMsgTaskResource)
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
    public static ProcessMsgTask createEntity(EntityManager em) {
        ProcessMsgTask processMsgTask = new ProcessMsgTask()
            .deptIdList(DEFAULT_DEPT_ID_LIST)
            .useridList(DEFAULT_USERID_LIST)
            .toAllUser(DEFAULT_TO_ALL_USER)
            .msg(DEFAULT_MSG)
            .executeTime(DEFAULT_EXECUTE_TIME)
            .agentId(DEFAULT_AGENT_ID)
            .type(DEFAULT_TYPE)
            .status(DEFAULT_STATUS);
        return processMsgTask;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProcessMsgTask createUpdatedEntity(EntityManager em) {
        ProcessMsgTask processMsgTask = new ProcessMsgTask()
            .deptIdList(UPDATED_DEPT_ID_LIST)
            .useridList(UPDATED_USERID_LIST)
            .toAllUser(UPDATED_TO_ALL_USER)
            .msg(UPDATED_MSG)
            .executeTime(UPDATED_EXECUTE_TIME)
            .agentId(UPDATED_AGENT_ID)
            .type(UPDATED_TYPE)
            .status(UPDATED_STATUS);
        return processMsgTask;
    }

    @BeforeEach
    public void initTest() {
        processMsgTask = createEntity(em);
    }

    @Test
    @Transactional
    public void createProcessMsgTask() throws Exception {
        int databaseSizeBeforeCreate = processMsgTaskRepository.findAll().size();

        // Create the ProcessMsgTask
        restProcessMsgTaskMockMvc.perform(post("/api/process-msg-tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(processMsgTask)))
            .andExpect(status().isCreated());

        // Validate the ProcessMsgTask in the database
        List<ProcessMsgTask> processMsgTaskList = processMsgTaskRepository.findAll();
        assertThat(processMsgTaskList).hasSize(databaseSizeBeforeCreate + 1);
        ProcessMsgTask testProcessMsgTask = processMsgTaskList.get(processMsgTaskList.size() - 1);
        assertThat(testProcessMsgTask.getDeptIdList()).isEqualTo(DEFAULT_DEPT_ID_LIST);
        assertThat(testProcessMsgTask.getUseridList()).isEqualTo(DEFAULT_USERID_LIST);
        assertThat(testProcessMsgTask.isToAllUser()).isEqualTo(DEFAULT_TO_ALL_USER);
        assertThat(testProcessMsgTask.getMsg()).isEqualTo(DEFAULT_MSG);
        assertThat(testProcessMsgTask.getExecuteTime()).isEqualTo(DEFAULT_EXECUTE_TIME);
        assertThat(testProcessMsgTask.getAgentId()).isEqualTo(DEFAULT_AGENT_ID);
        assertThat(testProcessMsgTask.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testProcessMsgTask.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createProcessMsgTaskWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = processMsgTaskRepository.findAll().size();

        // Create the ProcessMsgTask with an existing ID
        processMsgTask.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProcessMsgTaskMockMvc.perform(post("/api/process-msg-tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(processMsgTask)))
            .andExpect(status().isBadRequest());

        // Validate the ProcessMsgTask in the database
        List<ProcessMsgTask> processMsgTaskList = processMsgTaskRepository.findAll();
        assertThat(processMsgTaskList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllProcessMsgTasks() throws Exception {
        // Initialize the database
        processMsgTaskRepository.saveAndFlush(processMsgTask);

        // Get all the processMsgTaskList
        restProcessMsgTaskMockMvc.perform(get("/api/process-msg-tasks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(processMsgTask.getId().intValue())))
            .andExpect(jsonPath("$.[*].deptIdList").value(hasItem(DEFAULT_DEPT_ID_LIST)))
            .andExpect(jsonPath("$.[*].useridList").value(hasItem(DEFAULT_USERID_LIST)))
            .andExpect(jsonPath("$.[*].toAllUser").value(hasItem(DEFAULT_TO_ALL_USER.booleanValue())))
            .andExpect(jsonPath("$.[*].msg").value(hasItem(DEFAULT_MSG)))
            .andExpect(jsonPath("$.[*].executeTime").value(hasItem(DEFAULT_EXECUTE_TIME.toString())))
            .andExpect(jsonPath("$.[*].agentId").value(hasItem(DEFAULT_AGENT_ID.intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    
    @Test
    @Transactional
    public void getProcessMsgTask() throws Exception {
        // Initialize the database
        processMsgTaskRepository.saveAndFlush(processMsgTask);

        // Get the processMsgTask
        restProcessMsgTaskMockMvc.perform(get("/api/process-msg-tasks/{id}", processMsgTask.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(processMsgTask.getId().intValue()))
            .andExpect(jsonPath("$.deptIdList").value(DEFAULT_DEPT_ID_LIST))
            .andExpect(jsonPath("$.useridList").value(DEFAULT_USERID_LIST))
            .andExpect(jsonPath("$.toAllUser").value(DEFAULT_TO_ALL_USER.booleanValue()))
            .andExpect(jsonPath("$.msg").value(DEFAULT_MSG))
            .andExpect(jsonPath("$.executeTime").value(DEFAULT_EXECUTE_TIME.toString()))
            .andExpect(jsonPath("$.agentId").value(DEFAULT_AGENT_ID.intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingProcessMsgTask() throws Exception {
        // Get the processMsgTask
        restProcessMsgTaskMockMvc.perform(get("/api/process-msg-tasks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProcessMsgTask() throws Exception {
        // Initialize the database
        processMsgTaskService.save(processMsgTask);

        int databaseSizeBeforeUpdate = processMsgTaskRepository.findAll().size();

        // Update the processMsgTask
        ProcessMsgTask updatedProcessMsgTask = processMsgTaskRepository.findById(processMsgTask.getId()).get();
        // Disconnect from session so that the updates on updatedProcessMsgTask are not directly saved in db
        em.detach(updatedProcessMsgTask);
        updatedProcessMsgTask
            .deptIdList(UPDATED_DEPT_ID_LIST)
            .useridList(UPDATED_USERID_LIST)
            .toAllUser(UPDATED_TO_ALL_USER)
            .msg(UPDATED_MSG)
            .executeTime(UPDATED_EXECUTE_TIME)
            .agentId(UPDATED_AGENT_ID)
            .type(UPDATED_TYPE)
            .status(UPDATED_STATUS);

        restProcessMsgTaskMockMvc.perform(put("/api/process-msg-tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProcessMsgTask)))
            .andExpect(status().isOk());

        // Validate the ProcessMsgTask in the database
        List<ProcessMsgTask> processMsgTaskList = processMsgTaskRepository.findAll();
        assertThat(processMsgTaskList).hasSize(databaseSizeBeforeUpdate);
        ProcessMsgTask testProcessMsgTask = processMsgTaskList.get(processMsgTaskList.size() - 1);
        assertThat(testProcessMsgTask.getDeptIdList()).isEqualTo(UPDATED_DEPT_ID_LIST);
        assertThat(testProcessMsgTask.getUseridList()).isEqualTo(UPDATED_USERID_LIST);
        assertThat(testProcessMsgTask.isToAllUser()).isEqualTo(UPDATED_TO_ALL_USER);
        assertThat(testProcessMsgTask.getMsg()).isEqualTo(UPDATED_MSG);
        assertThat(testProcessMsgTask.getExecuteTime()).isEqualTo(UPDATED_EXECUTE_TIME);
        assertThat(testProcessMsgTask.getAgentId()).isEqualTo(UPDATED_AGENT_ID);
        assertThat(testProcessMsgTask.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testProcessMsgTask.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingProcessMsgTask() throws Exception {
        int databaseSizeBeforeUpdate = processMsgTaskRepository.findAll().size();

        // Create the ProcessMsgTask

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProcessMsgTaskMockMvc.perform(put("/api/process-msg-tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(processMsgTask)))
            .andExpect(status().isBadRequest());

        // Validate the ProcessMsgTask in the database
        List<ProcessMsgTask> processMsgTaskList = processMsgTaskRepository.findAll();
        assertThat(processMsgTaskList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProcessMsgTask() throws Exception {
        // Initialize the database
        processMsgTaskService.save(processMsgTask);

        int databaseSizeBeforeDelete = processMsgTaskRepository.findAll().size();

        // Delete the processMsgTask
        restProcessMsgTaskMockMvc.perform(delete("/api/process-msg-tasks/{id}", processMsgTask.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProcessMsgTask> processMsgTaskList = processMsgTaskRepository.findAll();
        assertThat(processMsgTaskList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
