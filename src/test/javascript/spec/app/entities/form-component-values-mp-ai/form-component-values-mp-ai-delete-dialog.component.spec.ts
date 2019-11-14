import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { AiTestModule } from '../../../test.module';
import { FormComponentValuesMpAiDeleteDialogComponent } from 'app/entities/form-component-values-mp-ai/form-component-values-mp-ai-delete-dialog.component';
import { FormComponentValuesMpAiService } from 'app/entities/form-component-values-mp-ai/form-component-values-mp-ai.service';

describe('Component Tests', () => {
  describe('FormComponentValuesMpAi Management Delete Component', () => {
    let comp: FormComponentValuesMpAiDeleteDialogComponent;
    let fixture: ComponentFixture<FormComponentValuesMpAiDeleteDialogComponent>;
    let service: FormComponentValuesMpAiService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AiTestModule],
        declarations: [FormComponentValuesMpAiDeleteDialogComponent]
      })
        .overrideTemplate(FormComponentValuesMpAiDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FormComponentValuesMpAiDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FormComponentValuesMpAiService);
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
