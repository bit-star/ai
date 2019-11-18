package com.lazulite.ai.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.lazulite.ai.web.rest.TestUtil;

public class ProcessMsgSubTaskTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProcessMsgSubTask.class);
        ProcessMsgSubTask processMsgSubTask1 = new ProcessMsgSubTask();
        processMsgSubTask1.setId(1L);
        ProcessMsgSubTask processMsgSubTask2 = new ProcessMsgSubTask();
        processMsgSubTask2.setId(processMsgSubTask1.getId());
        assertThat(processMsgSubTask1).isEqualTo(processMsgSubTask2);
        processMsgSubTask2.setId(2L);
        assertThat(processMsgSubTask1).isNotEqualTo(processMsgSubTask2);
        processMsgSubTask1.setId(null);
        assertThat(processMsgSubTask1).isNotEqualTo(processMsgSubTask2);
    }
}
