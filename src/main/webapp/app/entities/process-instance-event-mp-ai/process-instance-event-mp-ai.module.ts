import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AiSharedModule } from 'app/shared/shared.module';
import { ProcessInstanceEventMpAiComponent } from './process-instance-event-mp-ai.component';
import { ProcessInstanceEventMpAiDetailComponent } from './process-instance-event-mp-ai-detail.component';
import { ProcessInstanceEventMpAiUpdateComponent } from './process-instance-event-mp-ai-update.component';
import {
  ProcessInstanceEventMpAiDeletePopupComponent,
  ProcessInstanceEventMpAiDeleteDialogComponent
} from './process-instance-event-mp-ai-delete-dialog.component';
import { processInstanceEventRoute, processInstanceEventPopupRoute } from './process-instance-event-mp-ai.route';

const ENTITY_STATES = [...processInstanceEventRoute, ...processInstanceEventPopupRoute];

@NgModule({
  imports: [AiSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ProcessInstanceEventMpAiComponent,
    ProcessInstanceEventMpAiDetailComponent,
    ProcessInstanceEventMpAiUpdateComponent,
    ProcessInstanceEventMpAiDeleteDialogComponent,
    ProcessInstanceEventMpAiDeletePopupComponent
  ],
  entryComponents: [ProcessInstanceEventMpAiDeleteDialogComponent]
})
export class AiProcessInstanceEventMpAiModule {}
