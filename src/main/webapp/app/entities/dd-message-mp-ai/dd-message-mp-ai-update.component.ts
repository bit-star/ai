import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IDdMessageMpAi, DdMessageMpAi } from 'app/shared/model/dd-message-mp-ai.model';
import { DdMessageMpAiService } from './dd-message-mp-ai.service';
import { IProcessMsgTaskMpAi } from 'app/shared/model/process-msg-task-mp-ai.model';
import { ProcessMsgTaskMpAiService } from 'app/entities/process-msg-task-mp-ai/process-msg-task-mp-ai.service';

@Component({
  selector: 'jhi-dd-message-mp-ai-update',
  templateUrl: './dd-message-mp-ai-update.component.html'
})
export class DdMessageMpAiUpdateComponent implements OnInit {
  isSaving: boolean;

  processmsgtasks: IProcessMsgTaskMpAi[];

  editForm = this.fb.group({
    id: [],
    receivingDepartment: [],
    receivingUser: [],
    title: [],
    json: [],
    sendTime: [],
    type: [],
    processMsgTask: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected ddMessageService: DdMessageMpAiService,
    protected processMsgTaskService: ProcessMsgTaskMpAiService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ ddMessage }) => {
      this.updateForm(ddMessage);
    });
    this.processMsgTaskService
      .query()
      .subscribe(
        (res: HttpResponse<IProcessMsgTaskMpAi[]>) => (this.processmsgtasks = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(ddMessage: IDdMessageMpAi) {
    this.editForm.patchValue({
      id: ddMessage.id,
      receivingDepartment: ddMessage.receivingDepartment,
      receivingUser: ddMessage.receivingUser,
      title: ddMessage.title,
      json: ddMessage.json,
      sendTime: ddMessage.sendTime != null ? ddMessage.sendTime.format(DATE_TIME_FORMAT) : null,
      type: ddMessage.type,
      processMsgTask: ddMessage.processMsgTask
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const ddMessage = this.createFromForm();
    if (ddMessage.id !== undefined) {
      this.subscribeToSaveResponse(this.ddMessageService.update(ddMessage));
    } else {
      this.subscribeToSaveResponse(this.ddMessageService.create(ddMessage));
    }
  }

  private createFromForm(): IDdMessageMpAi {
    return {
      ...new DdMessageMpAi(),
      id: this.editForm.get(['id']).value,
      receivingDepartment: this.editForm.get(['receivingDepartment']).value,
      receivingUser: this.editForm.get(['receivingUser']).value,
      title: this.editForm.get(['title']).value,
      json: this.editForm.get(['json']).value,
      sendTime: this.editForm.get(['sendTime']).value != null ? moment(this.editForm.get(['sendTime']).value, DATE_TIME_FORMAT) : undefined,
      type: this.editForm.get(['type']).value,
      processMsgTask: this.editForm.get(['processMsgTask']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDdMessageMpAi>>) {
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

  trackProcessMsgTaskById(index: number, item: IProcessMsgTaskMpAi) {
    return item.id;
  }
}
