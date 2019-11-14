import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { AiTestModule } from '../../../test.module';
import { ProcessInstanceEventMpAiDeleteDialogComponent } from 'app/entities/process-instance-event-mp-ai/process-instance-event-mp-ai-delete-dialog.component';
import { ProcessInstanceEventMpAiService } from 'app/entities/process-instance-event-mp-ai/process-instance-event-mp-ai.service';

describe('Component Tests', () => {
  describe('ProcessInstanceEventMpAi Management Delete Component', () => {
    let comp: ProcessInstanceEventMpAiDeleteDialogComponent;
    let fixture: ComponentFixture<ProcessInstanceEventMpAiDeleteDialogComponent>;
    let service: ProcessInstanceEventMpAiService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AiTestModule],
        declarations: [ProcessInstanceEventMpAiDeleteDialogComponent]
      })
        .overrideTemplate(ProcessInstanceEventMpAiDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProcessInstanceEventMpAiDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProcessInstanceEventMpAiService);
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
