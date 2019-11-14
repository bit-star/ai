import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProcessInstanceMpAi } from 'app/shared/model/process-instance-mp-ai.model';
import { ProcessInstanceMpAiService } from './process-instance-mp-ai.service';

@Component({
  selector: 'jhi-process-instance-mp-ai-delete-dialog',
  templateUrl: './process-instance-mp-ai-delete-dialog.component.html'
})
export class ProcessInstanceMpAiDeleteDialogComponent {
  processInstance: IProcessInstanceMpAi;

  constructor(
    protected processInstanceService: ProcessInstanceMpAiService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.processInstanceService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'processInstanceListModification',
        content: 'Deleted an processInstance'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-process-instance-mp-ai-delete-popup',
  template: ''
})
export class ProcessInstanceMpAiDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ processInstance }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ProcessInstanceMpAiDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.processInstance = processInstance;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/process-instance-mp-ai', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/process-instance-mp-ai', { outlets: { popup: null } }]);
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
