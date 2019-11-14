import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AiSharedModule } from 'app/shared/shared.module';
import { DdMessageMpAiComponent } from './dd-message-mp-ai.component';
import { DdMessageMpAiDetailComponent } from './dd-message-mp-ai-detail.component';
import { DdMessageMpAiUpdateComponent } from './dd-message-mp-ai-update.component';
import { DdMessageMpAiDeletePopupComponent, DdMessageMpAiDeleteDialogComponent } from './dd-message-mp-ai-delete-dialog.component';
import { ddMessageRoute, ddMessagePopupRoute } from './dd-message-mp-ai.route';

const ENTITY_STATES = [...ddMessageRoute, ...ddMessagePopupRoute];

@NgModule({
  imports: [AiSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DdMessageMpAiComponent,
    DdMessageMpAiDetailComponent,
    DdMessageMpAiUpdateComponent,
    DdMessageMpAiDeleteDialogComponent,
    DdMessageMpAiDeletePopupComponent
  ],
  entryComponents: [DdMessageMpAiDeleteDialogComponent]
})
export class AiDdMessageMpAiModule {}
