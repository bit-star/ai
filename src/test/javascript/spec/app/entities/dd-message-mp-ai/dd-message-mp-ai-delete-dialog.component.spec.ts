import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { AiTestModule } from '../../../test.module';
import { DdMessageMpAiDeleteDialogComponent } from 'app/entities/dd-message-mp-ai/dd-message-mp-ai-delete-dialog.component';
import { DdMessageMpAiService } from 'app/entities/dd-message-mp-ai/dd-message-mp-ai.service';

describe('Component Tests', () => {
  describe('DdMessageMpAi Management Delete Component', () => {
    let comp: DdMessageMpAiDeleteDialogComponent;
    let fixture: ComponentFixture<DdMessageMpAiDeleteDialogComponent>;
    let service: DdMessageMpAiService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AiTestModule],
        declarations: [DdMessageMpAiDeleteDialogComponent]
      })
        .overrideTemplate(DdMessageMpAiDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DdMessageMpAiDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DdMessageMpAiService);
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
