import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProcessMsgSubTaskMpAi } from 'app/shared/model/process-msg-sub-task-mp-ai.model';
import { ProcessMsgSubTaskMpAiService } from './process-msg-sub-task-mp-ai.service';

@Component({
  selector: 'jhi-process-msg-sub-task-mp-ai-delete-dialog',
  templateUrl: './process-msg-sub-task-mp-ai-delete-dialog.component.html'
})
export class ProcessMsgSubTaskMpAiDeleteDialogComponent {
  processMsgSubTask: IProcessMsgSubTaskMpAi;

  constructor(
    protected processMsgSubTaskService: ProcessMsgSubTaskMpAiService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.processMsgSubTaskService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'processMsgSubTaskListModification',
        content: 'Deleted an processMsgSubTask'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-process-msg-sub-task-mp-ai-delete-popup',
  template: ''
})
export class ProcessMsgSubTaskMpAiDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ processMsgSubTask }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ProcessMsgSubTaskMpAiDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.processMsgSubTask = processMsgSubTask;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/process-msg-sub-task-mp-ai', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/process-msg-sub-task-mp-ai', { outlets: { popup: null } }]);
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
