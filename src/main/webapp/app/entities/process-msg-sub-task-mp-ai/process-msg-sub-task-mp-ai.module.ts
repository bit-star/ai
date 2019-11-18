import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AiSharedModule } from 'app/shared/shared.module';
import { ProcessMsgSubTaskMpAiComponent } from './process-msg-sub-task-mp-ai.component';
import { ProcessMsgSubTaskMpAiDetailComponent } from './process-msg-sub-task-mp-ai-detail.component';
import { ProcessMsgSubTaskMpAiUpdateComponent } from './process-msg-sub-task-mp-ai-update.component';
import {
  ProcessMsgSubTaskMpAiDeletePopupComponent,
  ProcessMsgSubTaskMpAiDeleteDialogComponent
} from './process-msg-sub-task-mp-ai-delete-dialog.component';
import { processMsgSubTaskRoute, processMsgSubTaskPopupRoute } from './process-msg-sub-task-mp-ai.route';

const ENTITY_STATES = [...processMsgSubTaskRoute, ...processMsgSubTaskPopupRoute];

@NgModule({
  imports: [AiSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ProcessMsgSubTaskMpAiComponent,
    ProcessMsgSubTaskMpAiDetailComponent,
    ProcessMsgSubTaskMpAiUpdateComponent,
    ProcessMsgSubTaskMpAiDeleteDialogComponent,
    ProcessMsgSubTaskMpAiDeletePopupComponent
  ],
  entryComponents: [ProcessMsgSubTaskMpAiDeleteDialogComponent]
})
export class AiProcessMsgSubTaskMpAiModule {}
