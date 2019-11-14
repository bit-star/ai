import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDdMessageMpAi } from 'app/shared/model/dd-message-mp-ai.model';

@Component({
  selector: 'jhi-dd-message-mp-ai-detail',
  templateUrl: './dd-message-mp-ai-detail.component.html'
})
export class DdMessageMpAiDetailComponent implements OnInit {
  ddMessage: IDdMessageMpAi;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ddMessage }) => {
      this.ddMessage = ddMessage;
    });
  }

  previousState() {
    window.history.back();
  }
}
