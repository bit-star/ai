import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { AiTestModule } from '../../../test.module';
import { ProcessTemplateMpAiUpdateComponent } from 'app/entities/process-template-mp-ai/process-template-mp-ai-update.component';
import { ProcessTemplateMpAiService } from 'app/entities/process-template-mp-ai/process-template-mp-ai.service';
import { ProcessTemplateMpAi } from 'app/shared/model/process-template-mp-ai.model';

describe('Component Tests', () => {
  describe('ProcessTemplateMpAi Management Update Component', () => {
    let comp: ProcessTemplateMpAiUpdateComponent;
    let fixture: ComponentFixture<ProcessTemplateMpAiUpdateComponent>;
    let service: ProcessTemplateMpAiService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AiTestModule],
        declarations: [ProcessTemplateMpAiUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ProcessTemplateMpAiUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProcessTemplateMpAiUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProcessTemplateMpAiService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProcessTemplateMpAi(123);
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
        const entity = new ProcessTemplateMpAi();
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
