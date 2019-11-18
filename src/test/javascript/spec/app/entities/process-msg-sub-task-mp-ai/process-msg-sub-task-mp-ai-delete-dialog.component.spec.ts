import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { AiTestModule } from '../../../test.module';
import { ProcessMsgSubTaskMpAiDeleteDialogComponent } from 'app/entities/process-msg-sub-task-mp-ai/process-msg-sub-task-mp-ai-delete-dialog.component';
import { ProcessMsgSubTaskMpAiService } from 'app/entities/process-msg-sub-task-mp-ai/process-msg-sub-task-mp-ai.service';

describe('Component Tests', () => {
  describe('ProcessMsgSubTaskMpAi Management Delete Component', () => {
    let comp: ProcessMsgSubTaskMpAiDeleteDialogComponent;
    let fixture: ComponentFixture<ProcessMsgSubTaskMpAiDeleteDialogComponent>;
    let service: ProcessMsgSubTaskMpAiService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AiTestModule],
        declarations: [ProcessMsgSubTaskMpAiDeleteDialogComponent]
      })
        .overrideTemplate(ProcessMsgSubTaskMpAiDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProcessMsgSubTaskMpAiDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProcessMsgSubTaskMpAiService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
