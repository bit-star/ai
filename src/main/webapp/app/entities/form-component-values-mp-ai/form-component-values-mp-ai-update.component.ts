import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IFormComponentValuesMpAi, FormComponentValuesMpAi } from 'app/shared/model/form-component-values-mp-ai.model';
import { FormComponentValuesMpAiService } from './form-component-values-mp-ai.service';
import { IProcessInstanceMpAi } from 'app/shared/model/process-instance-mp-ai.model';
import { ProcessInstanceMpAiService } from 'app/entities/process-instance-mp-ai/process-instance-mp-ai.service';

@Component({
  selector: 'jhi-form-component-values-mp-ai-update',
  templateUrl: './form-component-values-mp-ai-update.component.html'
})
export class FormComponentValuesMpAiUpdateComponent implements OnInit {
  isSaving: boolean;

  processinstances: IProcessInstanceMpAi[];

  editForm = this.fb.group({
    id: [],
    componentType: [],
    value: [],
    name: [],
    extValue: [],
    processInstance: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected formComponentValuesService: FormComponentValuesMpAiService,
    protected processInstanceService: ProcessInstanceMpAiService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ formComponentValues }) => {
      this.updateForm(formComponentValues);
    });
    this.processInstanceService
      .query()
      .subscribe(
        (res: HttpResponse<IProcessInstanceMpAi[]>) => (this.processinstances = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(formComponentValues: IFormComponentValuesMpAi) {
    this.editForm.patchValue({
      id: formComponentValues.id,
      componentType: formComponentValues.componentType,
      value: formComponentValues.value,
      name: formComponentValues.name,
      extValue: formComponentValues.extValue,
      processInstance: formComponentValues.processInstance
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const formComponentValues = this.createFromForm();
    if (formComponentValues.id !== undefined) {
      this.subscribeToSaveResponse(this.formComponentValuesService.update(formComponentValues));
    } else {
      this.subscribeToSaveResponse(this.formComponentValuesService.create(formComponentValues));
    }
  }

  private createFromForm(): IFormComponentValuesMpAi {
    return {
      ...new FormComponentValuesMpAi(),
      id: this.editForm.get(['id']).value,
      componentType: this.editForm.get(['componentType']).value,
      value: this.editForm.get(['value']).value,
      name: this.editForm.get(['name']).value,
      extValue: this.editForm.get(['extValue']).value,
      processInstance: this.editForm.get(['processInstance']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFormComponentValuesMpAi>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackProcessInstanceById(index: number, item: IProcessInstanceMpAi) {
    return item.id;
  }
}
