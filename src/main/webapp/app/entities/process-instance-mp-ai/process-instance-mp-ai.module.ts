import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AiSharedModule } from 'app/shared/shared.module';
import { ProcessInstanceMpAiComponent } from './process-instance-mp-ai.component';
import { ProcessInstanceMpAiDetailComponent } from './process-instance-mp-ai-detail.component';
import { ProcessInstanceMpAiUpdateComponent } from './process-instance-mp-ai-update.component';
import {
  ProcessInstanceMpAiDeletePopupComponent,
  ProcessInstanceMpAiDeleteDialogComponent
} from './process-instance-mp-ai-delete-dialog.component';
import { processInstanceRoute, processInstancePopupRoute } from './process-instance-mp-ai.route';

const ENTITY_STATES = [...processInstanceRoute, ...processInstancePopupRoute];

@NgModule({
  imports: [AiSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ProcessInstanceMpAiComponent,
    ProcessInstanceMpAiDetailComponent,
    ProcessInstanceMpAiUpdateComponent,
    ProcessInstanceMpAiDeleteDialogComponent,
    ProcessInstanceMpAiDeletePopupComponent
  ],
  entryComponents: [ProcessInstanceMpAiDeleteDialogComponent]
})
export class AiProcessInstanceMpAiModule {}
