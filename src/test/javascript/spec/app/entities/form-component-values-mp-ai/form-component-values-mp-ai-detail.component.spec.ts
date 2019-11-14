import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AiTestModule } from '../../../test.module';
import { FormComponentValuesMpAiDetailComponent } from 'app/entities/form-component-values-mp-ai/form-component-values-mp-ai-detail.component';
import { FormComponentValuesMpAi } from 'app/shared/model/form-component-values-mp-ai.model';

describe('Component Tests', () => {
  describe('FormComponentValuesMpAi Management Detail Component', () => {
    let comp: FormComponentValuesMpAiDetailComponent;
    let fixture: ComponentFixture<FormComponentValuesMpAiDetailComponent>;
    const route = ({ data: of({ formComponentValues: new FormComponentValuesMpAi(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AiTestModule],
        declarations: [FormComponentValuesMpAiDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(FormComponentValuesMpAiDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FormComponentValuesMpAiDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.formComponentValues).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
