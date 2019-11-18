import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AiTestModule } from '../../../test.module';
import { ProcessMsgSubTaskMpAiDetailComponent } from 'app/entities/process-msg-sub-task-mp-ai/process-msg-sub-task-mp-ai-detail.component';
import { ProcessMsgSubTaskMpAi } from 'app/shared/model/process-msg-sub-task-mp-ai.model';

describe('Component Tests', () => {
  describe('ProcessMsgSubTaskMpAi Management Detail Component', () => {
    let comp: ProcessMsgSubTaskMpAiDetailComponent;
    let fixture: ComponentFixture<ProcessMsgSubTaskMpAiDetailComponent>;
    const route = ({ data: of({ processMsgSubTask: new ProcessMsgSubTaskMpAi(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AiTestModule],
        declarations: [ProcessMsgSubTaskMpAiDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProcessMsgSubTaskMpAiDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProcessMsgSubTaskMpAiDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.processMsgSubTask).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
