import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { AiTestModule } from '../../../test.module';
import { ProcessInstanceEventMpAiUpdateComponent } from 'app/entities/process-instance-event-mp-ai/process-instance-event-mp-ai-update.component';
import { ProcessInstanceEventMpAiService } from 'app/entities/process-instance-event-mp-ai/process-instance-event-mp-ai.service';
import { ProcessInstanceEventMpAi } from 'app/shared/model/process-instance-event-mp-ai.model';

describe('Component Tests', () => {
  describe('ProcessInstanceEventMpAi Management Update Component', () => {
    let comp: ProcessInstanceEventMpAiUpdateComponent;
    let fixture: ComponentFixture<ProcessInstanceEventMpAiUpdateComponent>;
    let service: ProcessInstanceEventMpAiService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AiTestModule],
        declarations: [ProcessInstanceEventMpAiUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ProcessInstanceEventMpAiUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProcessInstanceEventMpAiUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProcessInstanceEventMpAiService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProcessInstanceEventMpAi(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProcessInstanceEventMpAi();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
