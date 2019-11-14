import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AiTestModule } from '../../../test.module';
import { ProcessInstanceEventMpAiDetailComponent } from 'app/entities/process-instance-event-mp-ai/process-instance-event-mp-ai-detail.component';
import { ProcessInstanceEventMpAi } from 'app/shared/model/process-instance-event-mp-ai.model';

describe('Component Tests', () => {
  describe('ProcessInstanceEventMpAi Management Detail Component', () => {
    let comp: ProcessInstanceEventMpAiDetailComponent;
    let fixture: ComponentFixture<ProcessInstanceEventMpAiDetailComponent>;
    const route = ({ data: of({ processInstanceEvent: new ProcessInstanceEventMpAi(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AiTestModule],
        declarations: [ProcessInstanceEventMpAiDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProcessInstanceEventMpAiDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProcessInstanceEventMpAiDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.processInstanceEvent).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
