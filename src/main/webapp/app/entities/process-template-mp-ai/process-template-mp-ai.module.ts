import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AiSharedModule } from 'app/shared/shared.module';
import { ProcessTemplateMpAiComponent } from './process-template-mp-ai.component';
import { ProcessTemplateMpAiDetailComponent } from './process-template-mp-ai-detail.component';
import { ProcessTemplateMpAiUpdateComponent } from './process-template-mp-ai-update.component';
import {
  ProcessTemplateMpAiDeletePopupComponent,
  ProcessTemplateMpAiDeleteDialogComponent
} from './process-template-mp-ai-delete-dialog.component';
import { processTemplateRoute, processTemplatePopupRoute } from './process-template-mp-ai.route';

const ENTITY_STATES = [...processTemplateRoute, ...processTemplatePopupRoute];

@NgModule({
  imports: [AiSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ProcessTemplateMpAiComponent,
    ProcessTemplateMpAiDetailComponent,
    ProcessTemplateMpAiUpdateComponent,
    ProcessTemplateMpAiDeleteDialogComponent,
    ProcessTemplateMpAiDeletePopupComponent
  ],
  entryComponents: [ProcessTemplateMpAiDeleteDialogComponent]
})
export class AiProcessTemplateMpAiModule {}
