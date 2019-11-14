import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFormComponentValuesMpAi } from 'app/shared/model/form-component-values-mp-ai.model';

@Component({
  selector: 'jhi-form-component-values-mp-ai-detail',
  templateUrl: './form-component-values-mp-ai-detail.component.html'
})
export class FormComponentValuesMpAiDetailComponent implements OnInit {
  formComponentValues: IFormComponentValuesMpAi;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ formComponentValues }) => {
      this.formComponentValues = formComponentValues;
    });
  }

  previousState() {
    window.history.back();
  }
}
