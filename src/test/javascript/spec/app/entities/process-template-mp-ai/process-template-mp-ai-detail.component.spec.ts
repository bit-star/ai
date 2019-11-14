import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AiTestModule } from '../../../test.module';
import { ProcessTemplateMpAiDetailComponent } from 'app/entities/process-template-mp-ai/process-template-mp-ai-detail.component';
import { ProcessTemplateMpAi } from 'app/shared/model/process-template-mp-ai.model';

describe('Component Tests', () => {
  describe('ProcessTemplateMpAi Management Detail Component', () => {
    let comp: ProcessTemplateMpAiDetailComponent;
    let fixture: ComponentFixture<ProcessTemplateMpAiDetailComponent>;
    const route = ({ data: of({ processTemplate: new ProcessTemplateMpAi(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AiTestModule],
        declarations: [ProcessTemplateMpAiDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProcessTemplateMpAiDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProcessTemplateMpAiDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.processTemplate).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
