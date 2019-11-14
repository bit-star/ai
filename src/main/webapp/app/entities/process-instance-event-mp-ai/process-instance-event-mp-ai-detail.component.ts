import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProcessInstanceEventMpAi } from 'app/shared/model/process-instance-event-mp-ai.model';

@Component({
  selector: 'jhi-process-instance-event-mp-ai-detail',
  templateUrl: './process-instance-event-mp-ai-detail.component.html'
})
export class ProcessInstanceEventMpAiDetailComponent implements OnInit {
  processInstanceEvent: IProcessInstanceEventMpAi;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ processInstanceEvent }) => {
      this.processInstanceEvent = processInstanceEvent;
    });
  }

  previousState() {
    window.history.back();
  }
}
