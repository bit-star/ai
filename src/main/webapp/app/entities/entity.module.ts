import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'process-template-mp-ai',
        loadChildren: () => import('./process-template-mp-ai/process-template-mp-ai.module').then(m => m.AiProcessTemplateMpAiModule)
      },
      {
        path: 'process-instance-event-mp-ai',
        loadChildren: () =>
          import('./process-instance-event-mp-ai/process-instance-event-mp-ai.module').then(m => m.AiProcessInstanceEventMpAiModule)
      },
      {
        path: 'process-instance-mp-ai',
        loadChildren: () => import('./process-instance-mp-ai/process-instance-mp-ai.module').then(m => m.AiProcessInstanceMpAiModule)
      },
      {
        path: 'form-component-values-mp-ai',
        loadChildren: () =>
          import('./form-component-values-mp-ai/form-component-values-mp-ai.module').then(m => m.AiFormComponentValuesMpAiModule)
      },
      {
        path: 'process-msg-task-mp-ai',
        loadChildren: () => import('./process-msg-task-mp-ai/process-msg-task-mp-ai.module').then(m => m.AiProcessMsgTaskMpAiModule)
      },
      {
        path: 'dd-message-mp-ai',
        loadChildren: () => import('./dd-message-mp-ai/dd-message-mp-ai.module').then(m => m.AiDdMessageMpAiModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class AiEntityModule {}
