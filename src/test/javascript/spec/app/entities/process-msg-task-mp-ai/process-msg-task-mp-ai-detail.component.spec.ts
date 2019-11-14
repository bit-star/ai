import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AiTestModule } from '../../../test.module';
import { ProcessMsgTaskMpAiDetailComponent } from 'app/entities/process-msg-task-mp-ai/process-msg-task-mp-ai-detail.component';
import { ProcessMsgTaskMpAi } from 'app/shared/model/process-msg-task-mp-ai.model';

describe('Component Tests', () => {
  describe('ProcessMsgTaskMpAi Management Detail Component', () => {
    let comp: ProcessMsgTaskMpAiDetailComponent;
    let fixture: ComponentFixture<ProcessMsgTaskMpAiDetailComponent>;
    const route = ({ data: of({ processMsgTask: new ProcessMsgTaskMpAi(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AiTestModule],
        declarations: [ProcessMsgTaskMpAiDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProcessMsgTaskMpAiDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProcessMsgTaskMpAiDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.processMsgTask).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
