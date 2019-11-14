import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProcessMsgTaskMpAi } from 'app/shared/model/process-msg-task-mp-ai.model';
import { ProcessMsgTaskMpAiService } from './process-msg-task-mp-ai.service';

@Component({
  selector: 'jhi-process-msg-task-mp-ai-delete-dialog',
  templateUrl: './process-msg-task-mp-ai-delete-dialog.component.html'
})
export class ProcessMsgTaskMpAiDeleteDialogComponent {
  processMsgTask: IProcessMsgTaskMpAi;

  constructor(
    protected processMsgTaskService: ProcessMsgTaskMpAiService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.processMsgTaskService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'processMsgTaskListModification',
        content: 'Deleted an processMsgTask'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-process-msg-task-mp-ai-delete-popup',
  template: ''
})
export class ProcessMsgTaskMpAiDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ processMsgTask }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ProcessMsgTaskMpAiDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.processMsgTask = processMsgTask;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/process-msg-task-mp-ai', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/process-msg-task-mp-ai', { outlets: { popup: null } }]);
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
