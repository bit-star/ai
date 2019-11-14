import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AiTestModule } from '../../../test.module';
import { ProcessInstanceMpAiDetailComponent } from 'app/entities/process-instance-mp-ai/process-instance-mp-ai-detail.component';
import { ProcessInstanceMpAi } from 'app/shared/model/process-instance-mp-ai.model';

describe('Component Tests', () => {
  describe('ProcessInstanceMpAi Management Detail Component', () => {
    let comp: ProcessInstanceMpAiDetailComponent;
    let fixture: ComponentFixture<ProcessInstanceMpAiDetailComponent>;
    const route = ({ data: of({ processInstance: new ProcessInstanceMpAi(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AiTestModule],
        declarations: [ProcessInstanceMpAiDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProcessInstanceMpAiDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProcessInstanceMpAiDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.processInstance).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
