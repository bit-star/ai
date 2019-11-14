import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProcessInstanceMpAi } from 'app/shared/model/process-instance-mp-ai.model';

@Component({
  selector: 'jhi-process-instance-mp-ai-detail',
  templateUrl: './process-instance-mp-ai-detail.component.html'
})
export class ProcessInstanceMpAiDetailComponent implements OnInit {
  processInstance: IProcessInstanceMpAi;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ processInstance }) => {
      this.processInstance = processInstance;
    });
  }

  previousState() {
    window.history.back();
  }
}
