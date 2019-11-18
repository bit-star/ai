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
import { IProcessMsgTaskMpAi, ProcessMsgTaskMpAi } from 'app/shared/model/process-msg-task-mp-ai.model';
import { ProcessMsgTaskMpAiService } from './process-msg-task-mp-ai.service';
import { IProcessInstanceMpAi } from 'app/shared/model/process-instance-mp-ai.model';
import { ProcessInstanceMpAiService } from 'app/entities/process-instance-mp-ai/process-instance-mp-ai.service';

@Component({
  selector: 'jhi-process-msg-task-mp-ai-update',
  templateUrl: './process-msg-task-mp-ai-update.component.html'
})
export class ProcessMsgTaskMpAiUpdateComponent implements OnInit {
  isSaving: boolean;

  processinstances: IProcessInstanceMpAi[];

  editForm = this.fb.group({
    id: [],
    deptIdList: [],
    useridList: [],
    toAllUser: [],
    msg: [],
    executeTime: [],
    agentId: [],
    type: [],
    status: [],
    processInstance: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected processMsgTaskService: ProcessMsgTaskMpAiService,
    protected processInstanceService: ProcessInstanceMpAiService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ processMsgTask }) => {
      this.updateForm(processMsgTask);
    });
    this.processInstanceService
      .query()
      .subscribe(
        (res: HttpResponse<IProcessInstanceMpAi[]>) => (this.processinstances = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(processMsgTask: IProcessMsgTaskMpAi) {
    this.editForm.patchValue({
      id: processMsgTask.id,
      deptIdList: processMsgTask.deptIdList,
      useridList: processMsgTask.useridList,
      toAllUser: processMsgTask.toAllUser,
      msg: processMsgTask.msg,
      executeTime: processMsgTask.executeTime != null ? processMsgTask.executeTime.format(DATE_TIME_FORMAT) : null,
      agentId: processMsgTask.agentId,
      type: processMsgTask.type,
      status: processMsgTask.status,
      processInstance: processMsgTask.processInstance
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const processMsgTask = this.createFromForm();
    if (processMsgTask.id !== undefined) {
      this.subscribeToSaveResponse(this.processMsgTaskService.update(processMsgTask));
    } else {
      this.subscribeToSaveResponse(this.processMsgTaskService.create(processMsgTask));
    }
  }

  private createFromForm(): IProcessMsgTaskMpAi {
    return {
      ...new ProcessMsgTaskMpAi(),
      id: this.editForm.get(['id']).value,
      deptIdList: this.editForm.get(['deptIdList']).value,
      useridList: this.editForm.get(['useridList']).value,
      toAllUser: this.editForm.get(['toAllUser']).value,
      msg: this.editForm.get(['msg']).value,
      executeTime:
        this.editForm.get(['executeTime']).value != null ? moment(this.editForm.get(['executeTime']).value, DATE_TIME_FORMAT) : undefined,
      agentId: this.editForm.get(['agentId']).value,
      type: this.editForm.get(['type']).value,
      status: this.editForm.get(['status']).value,
      processInstance: this.editForm.get(['processInstance']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProcessMsgTaskMpAi>>) {
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
