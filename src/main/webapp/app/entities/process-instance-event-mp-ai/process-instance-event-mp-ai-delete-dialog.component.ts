import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProcessInstanceEventMpAi } from 'app/shared/model/process-instance-event-mp-ai.model';
import { ProcessInstanceEventMpAiService } from './process-instance-event-mp-ai.service';

@Component({
  selector: 'jhi-process-instance-event-mp-ai-delete-dialog',
  templateUrl: './process-instance-event-mp-ai-delete-dialog.component.html'
})
export class ProcessInstanceEventMpAiDeleteDialogComponent {
  processInstanceEvent: IProcessInstanceEventMpAi;

  constructor(
    protected processInstanceEventService: ProcessInstanceEventMpAiService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.processInstanceEventService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'processInstanceEventListModification',
        content: 'Deleted an processInstanceEvent'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-process-instance-event-mp-ai-delete-popup',
  template: ''
})
export class ProcessInstanceEventMpAiDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ processInstanceEvent }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ProcessInstanceEventMpAiDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.processInstanceEvent = processInstanceEvent;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/process-instance-event-mp-ai', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/process-instance-event-mp-ai', { outlets: { popup: null } }]);
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
