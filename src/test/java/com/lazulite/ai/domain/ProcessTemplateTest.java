package com.lazulite.ai.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.lazulite.ai.web.rest.TestUtil;

public class ProcessTemplateTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProcessTemplate.class);
        ProcessTemplate processTemplate1 = new ProcessTemplate();
        processTemplate1.setId(1L);
        ProcessTemplate processTemplate2 = new ProcessTemplate();
        processTemplate2.setId(processTemplate1.getId());
        assertThat(processTemplate1).isEqualTo(processTemplate2);
        processTemplate2.setId(2L);
        assertThat(processTemplate1).isNotEqualTo(processTemplate2);
        processTemplate1.setId(null);
        assertThat(processTemplate1).isNotEqualTo(processTemplate2);
    }
}
