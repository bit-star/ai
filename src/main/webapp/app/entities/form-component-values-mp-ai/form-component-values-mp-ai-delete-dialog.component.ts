import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFormComponentValuesMpAi } from 'app/shared/model/form-component-values-mp-ai.model';
import { FormComponentValuesMpAiService } from './form-component-values-mp-ai.service';

@Component({
  selector: 'jhi-form-component-values-mp-ai-delete-dialog',
  templateUrl: './form-component-values-mp-ai-delete-dialog.component.html'
})
export class FormComponentValuesMpAiDeleteDialogComponent {
  formComponentValues: IFormComponentValuesMpAi;

  constructor(
    protected formComponentValuesService: FormComponentValuesMpAiService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.formComponentValuesService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'formComponentValuesListModification',
        content: 'Deleted an formComponentValues'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-form-component-values-mp-ai-delete-popup',
  template: ''
})
export class FormComponentValuesMpAiDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ formComponentValues }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(FormComponentValuesMpAiDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.formComponentValues = formComponentValues;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/form-component-values-mp-ai', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/form-component-values-mp-ai', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
