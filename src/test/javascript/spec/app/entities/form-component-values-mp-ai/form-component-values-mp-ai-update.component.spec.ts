import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { AiTestModule } from '../../../test.module';
import { FormComponentValuesMpAiUpdateComponent } from 'app/entities/form-component-values-mp-ai/form-component-values-mp-ai-update.component';
import { FormComponentValuesMpAiService } from 'app/entities/form-component-values-mp-ai/form-component-values-mp-ai.service';
import { FormComponentValuesMpAi } from 'app/shared/model/form-component-values-mp-ai.model';

describe('Component Tests', () => {
  describe('FormComponentValuesMpAi Management Update Component', () => {
    let comp: FormComponentValuesMpAiUpdateComponent;
    let fixture: ComponentFixture<FormComponentValuesMpAiUpdateComponent>;
    let service: FormComponentValuesMpAiService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AiTestModule],
        declarations: [FormComponentValuesMpAiUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(FormComponentValuesMpAiUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FormComponentValuesMpAiUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FormComponentValuesMpAiService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new FormComponentValuesMpAi(123);
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
        const entity = new FormComponentValuesMpAi();
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
