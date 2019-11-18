import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProcessMsgSubTaskMpAi } from 'app/shared/model/process-msg-sub-task-mp-ai.model';

@Component({
  selector: 'jhi-process-msg-sub-task-mp-ai-detail',
  templateUrl: './process-msg-sub-task-mp-ai-detail.component.html'
})
export class ProcessMsgSubTaskMpAiDetailComponent implements OnInit {
  processMsgSubTask: IProcessMsgSubTaskMpAi;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ processMsgSubTask }) => {
      this.processMsgSubTask = processMsgSubTask;
    });
  }

  previousState() {
    window.history.back();
  }
}
