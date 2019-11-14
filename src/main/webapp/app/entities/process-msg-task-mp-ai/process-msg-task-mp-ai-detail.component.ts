import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProcessMsgTaskMpAi } from 'app/shared/model/process-msg-task-mp-ai.model';

@Component({
  selector: 'jhi-process-msg-task-mp-ai-detail',
  templateUrl: './process-msg-task-mp-ai-detail.component.html'
})
export class ProcessMsgTaskMpAiDetailComponent implements OnInit {
  processMsgTask: IProcessMsgTaskMpAi;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ processMsgTask }) => {
      this.processMsgTask = processMsgTask;
    });
  }

  previousState() {
    window.history.back();
  }
}
