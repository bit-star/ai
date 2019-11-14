import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AiTestModule } from '../../../test.module';
import { DdMessageMpAiDetailComponent } from 'app/entities/dd-message-mp-ai/dd-message-mp-ai-detail.component';
import { DdMessageMpAi } from 'app/shared/model/dd-message-mp-ai.model';

describe('Component Tests', () => {
  describe('DdMessageMpAi Management Detail Component', () => {
    let comp: DdMessageMpAiDetailComponent;
    let fixture: ComponentFixture<DdMessageMpAiDetailComponent>;
    const route = ({ data: of({ ddMessage: new DdMessageMpAi(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AiTestModule],
        declarations: [DdMessageMpAiDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DdMessageMpAiDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DdMessageMpAiDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ddMessage).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
