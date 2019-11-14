import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { AiTestModule } from '../../../test.module';
import { ProcessTemplateMpAiDeleteDialogComponent } from 'app/entities/process-template-mp-ai/process-template-mp-ai-delete-dialog.component';
import { ProcessTemplateMpAiService } from 'app/entities/process-template-mp-ai/process-template-mp-ai.service';

describe('Component Tests', () => {
  describe('ProcessTemplateMpAi Management Delete Component', () => {
    let comp: ProcessTemplateMpAiDeleteDialogComponent;
    let fixture: ComponentFixture<ProcessTemplateMpAiDeleteDialogComponent>;
    let service: ProcessTemplateMpAiService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AiTestModule],
        declarations: [ProcessTemplateMpAiDeleteDialogComponent]
      })
        .overrideTemplate(ProcessTemplateMpAiDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProcessTemplateMpAiDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProcessTemplateMpAiService);
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
