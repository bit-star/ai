import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProcessTemplateMpAi } from 'app/shared/model/process-template-mp-ai.model';

@Component({
  selector: 'jhi-process-template-mp-ai-detail',
  templateUrl: './process-template-mp-ai-detail.component.html'
})
export class ProcessTemplateMpAiDetailComponent implements OnInit {
  processTemplate: IProcessTemplateMpAi;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ processTemplate }) => {
      this.processTemplate = processTemplate;
    });
  }

  previousState() {
    window.history.back();
  }
}
