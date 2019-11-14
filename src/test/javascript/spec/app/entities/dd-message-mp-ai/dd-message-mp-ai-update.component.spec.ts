import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { AiTestModule } from '../../../test.module';
import { DdMessageMpAiUpdateComponent } from 'app/entities/dd-message-mp-ai/dd-message-mp-ai-update.component';
import { DdMessageMpAiService } from 'app/entities/dd-message-mp-ai/dd-message-mp-ai.service';
import { DdMessageMpAi } from 'app/shared/model/dd-message-mp-ai.model';

describe('Component Tests', () => {
  describe('DdMessageMpAi Management Update Component', () => {
    let comp: DdMessageMpAiUpdateComponent;
    let fixture: ComponentFixture<DdMessageMpAiUpdateComponent>;
    let service: DdMessageMpAiService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AiTestModule],
        declarations: [DdMessageMpAiUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DdMessageMpAiUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DdMessageMpAiUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DdMessageMpAiService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DdMessageMpAi(123);
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
        const entity = new DdMessageMpAi();
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
