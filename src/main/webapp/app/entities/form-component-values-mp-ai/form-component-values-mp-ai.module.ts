import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AiSharedModule } from 'app/shared/shared.module';
import { FormComponentValuesMpAiComponent } from './form-component-values-mp-ai.component';
import { FormComponentValuesMpAiDetailComponent } from './form-component-values-mp-ai-detail.component';
import { FormComponentValuesMpAiUpdateComponent } from './form-component-values-mp-ai-update.component';
import {
  FormComponentValuesMpAiDeletePopupComponent,
  FormComponentValuesMpAiDeleteDialogComponent
} from './form-component-values-mp-ai-delete-dialog.component';
import { formComponentValuesRoute, formComponentValuesPopupRoute } from './form-component-values-mp-ai.route';

const ENTITY_STATES = [...formComponentValuesRoute, ...formComponentValuesPopupRoute];

@NgModule({
  imports: [AiSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    FormComponentValuesMpAiComponent,
    FormComponentValuesMpAiDetailComponent,
    FormComponentValuesMpAiUpdateComponent,
    FormComponentValuesMpAiDeleteDialogComponent,
    FormComponentValuesMpAiDeletePopupComponent
  ],
  entryComponents: [FormComponentValuesMpAiDeleteDialogComponent]
})
export class AiFormComponentValuesMpAiModule {}
