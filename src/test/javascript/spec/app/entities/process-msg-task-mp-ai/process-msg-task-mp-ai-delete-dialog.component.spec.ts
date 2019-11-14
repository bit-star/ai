import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { AiTestModule } from '../../../test.module';
import { ProcessMsgTaskMpAiDeleteDialogComponent } from 'app/entities/process-msg-task-mp-ai/process-msg-task-mp-ai-delete-dialog.component';
import { ProcessMsgTaskMpAiService } from 'app/entities/process-msg-task-mp-ai/process-msg-task-mp-ai.service';

describe('Component Tests', () => {
  describe('ProcessMsgTaskMpAi Management Delete Component', () => {
    let comp: ProcessMsgTaskMpAiDeleteDialogComponent;
    let fixture: ComponentFixture<ProcessMsgTaskMpAiDeleteDialogComponent>;
    let service: ProcessMsgTaskMpAiService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AiTestModule],
        declarations: [ProcessMsgTaskMpAiDeleteDialogComponent]
      })
        .overrideTemplate(ProcessMsgTaskMpAiDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProcessMsgTaskMpAiDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProcessMsgTaskMpAiService);
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
