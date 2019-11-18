import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IProcessMsgSubTaskMpAi, ProcessMsgSubTaskMpAi } from 'app/shared/model/process-msg-sub-task-mp-ai.model';
import { ProcessMsgSubTaskMpAiService } from './process-msg-sub-task-mp-ai.service';
import { IProcessMsgTaskMpAi } from 'app/shared/model/process-msg-task-mp-ai.model';
import { ProcessMsgTaskMpAiService } from 'app/entities/process-msg-task-mp-ai/process-msg-task-mp-ai.service';

@Component({
  selector: 'jhi-process-msg-sub-task-mp-ai-update',
  templateUrl: './process-msg-sub-task-mp-ai-update.component.html'
})
export class ProcessMsgSubTaskMpAiUpdateComponent implements OnInit {
  isSaving: boolean;

  processmsgtasks: IProcessMsgTaskMpAi[];

  editForm = this.fb.group({
    id: [],
    useridList: [],
    taskId: [],
    processMsgTask: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected processMsgSubTaskService: ProcessMsgSubTaskMpAiService,
    protected processMsgTaskService: ProcessMsgTaskMpAiService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ processMsgSubTask }) => {
      this.updateForm(processMsgSubTask);
    });
    this.processMsgTaskService
      .query()
      .subscribe(
        (res: HttpResponse<IProcessMsgTaskMpAi[]>) => (this.processmsgtasks = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(processMsgSubTask: IProcessMsgSubTaskMpAi) {
    this.editForm.patchValue({
      id: processMsgSubTask.id,
      useridList: processMsgSubTask.useridList,
      taskId: processMsgSubTask.taskId,
      processMsgTask: processMsgSubTask.processMsgTask
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const processMsgSubTask = this.createFromForm();
    if (processMsgSubTask.id !== undefined) {
      this.subscribeToSaveResponse(this.processMsgSubTaskService.update(processMsgSubTask));
    } else {
      this.subscribeToSaveResponse(this.processMsgSubTaskService.create(processMsgSubTask));
    }
  }

  private createFromForm(): IProcessMsgSubTaskMpAi {
    return {
      ...new ProcessMsgSubTaskMpAi(),
      id: this.editForm.get(['id']).value,
      useridList: this.editForm.get(['useridList']).value,
      taskId: this.editForm.get(['taskId']).value,
      processMsgTask: this.editForm.get(['processMsgTask']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProcessMsgSubTaskMpAi>>) {
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
