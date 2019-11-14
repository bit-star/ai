import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { AiTestModule } from '../../../test.module';
import { ProcessInstanceMpAiDeleteDialogComponent } from 'app/entities/process-instance-mp-ai/process-instance-mp-ai-delete-dialog.component';
import { ProcessInstanceMpAiService } from 'app/entities/process-instance-mp-ai/process-instance-mp-ai.service';

describe('Component Tests', () => {
  describe('ProcessInstanceMpAi Management Delete Component', () => {
    let comp: ProcessInstanceMpAiDeleteDialogComponent;
    let fixture: ComponentFixture<ProcessInstanceMpAiDeleteDialogComponent>;
    let service: ProcessInstanceMpAiService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AiTestModule],
        declarations: [ProcessInstanceMpAiDeleteDialogComponent]
      })
        .overrideTemplate(ProcessInstanceMpAiDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProcessInstanceMpAiDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProcessInstanceMpAiService);
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
