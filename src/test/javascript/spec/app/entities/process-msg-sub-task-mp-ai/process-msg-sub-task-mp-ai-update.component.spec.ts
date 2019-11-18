import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { AiTestModule } from '../../../test.module';
import { ProcessMsgSubTaskMpAiUpdateComponent } from 'app/entities/process-msg-sub-task-mp-ai/process-msg-sub-task-mp-ai-update.component';
import { ProcessMsgSubTaskMpAiService } from 'app/entities/process-msg-sub-task-mp-ai/process-msg-sub-task-mp-ai.service';
import { ProcessMsgSubTaskMpAi } from 'app/shared/model/process-msg-sub-task-mp-ai.model';

describe('Component Tests', () => {
  describe('ProcessMsgSubTaskMpAi Management Update Component', () => {
    let comp: ProcessMsgSubTaskMpAiUpdateComponent;
    let fixture: ComponentFixture<ProcessMsgSubTaskMpAiUpdateComponent>;
    let service: ProcessMsgSubTaskMpAiService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AiTestModule],
        declarations: [ProcessMsgSubTaskMpAiUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ProcessMsgSubTaskMpAiUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProcessMsgSubTaskMpAiUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProcessMsgSubTaskMpAiService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProcessMsgSubTaskMpAi(123);
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
        const entity = new ProcessMsgSubTaskMpAi();
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
