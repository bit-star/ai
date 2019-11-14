import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { AiTestModule } from '../../../test.module';
import { ProcessMsgTaskMpAiUpdateComponent } from 'app/entities/process-msg-task-mp-ai/process-msg-task-mp-ai-update.component';
import { ProcessMsgTaskMpAiService } from 'app/entities/process-msg-task-mp-ai/process-msg-task-mp-ai.service';
import { ProcessMsgTaskMpAi } from 'app/shared/model/process-msg-task-mp-ai.model';

describe('Component Tests', () => {
  describe('ProcessMsgTaskMpAi Management Update Component', () => {
    let comp: ProcessMsgTaskMpAiUpdateComponent;
    let fixture: ComponentFixture<ProcessMsgTaskMpAiUpdateComponent>;
    let service: ProcessMsgTaskMpAiService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AiTestModule],
        declarations: [ProcessMsgTaskMpAiUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ProcessMsgTaskMpAiUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProcessMsgTaskMpAiUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProcessMsgTaskMpAiService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProcessMsgTaskMpAi(123);
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
        const entity = new ProcessMsgTaskMpAi();
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
