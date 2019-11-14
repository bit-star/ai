import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AiSharedModule } from 'app/shared/shared.module';
import { ProcessMsgTaskMpAiComponent } from './process-msg-task-mp-ai.component';
import { ProcessMsgTaskMpAiDetailComponent } from './process-msg-task-mp-ai-detail.component';
import { ProcessMsgTaskMpAiUpdateComponent } from './process-msg-task-mp-ai-update.component';
import {
  ProcessMsgTaskMpAiDeletePopupComponent,
  ProcessMsgTaskMpAiDeleteDialogComponent
} from './process-msg-task-mp-ai-delete-dialog.component';
import { processMsgTaskRoute, processMsgTaskPopupRoute } from './process-msg-task-mp-ai.route';

const ENTITY_STATES = [...processMsgTaskRoute, ...processMsgTaskPopupRoute];

@NgModule({
  imports: [AiSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ProcessMsgTaskMpAiComponent,
    ProcessMsgTaskMpAiDetailComponent,
    ProcessMsgTaskMpAiUpdateComponent,
    ProcessMsgTaskMpAiDeleteDialogComponent,
    ProcessMsgTaskMpAiDeletePopupComponent
  ],
  entryComponents: [ProcessMsgTaskMpAiDeleteDialogComponent]
})
export class AiProcessMsgTaskMpAiModule {}
