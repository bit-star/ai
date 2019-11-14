package com.lazulite.ai.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.lazulite.ai.web.rest.TestUtil;

public class ProcessInstanceEventTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProcessInstanceEvent.class);
        ProcessInstanceEvent processInstanceEvent1 = new ProcessInstanceEvent();
        processInstanceEvent1.setId(1L);
        ProcessInstanceEvent processInstanceEvent2 = new ProcessInstanceEvent();
        processInstanceEvent2.setId(processInstanceEvent1.getId());
        assertThat(processInstanceEvent1).isEqualTo(processInstanceEvent2);
        processInstanceEvent2.setId(2L);
        assertThat(processInstanceEvent1).isNotEqualTo(processInstanceEvent2);
        processInstanceEvent1.setId(null);
        assertThat(processInstanceEvent1).isNotEqualTo(processInstanceEvent2);
    }
}
