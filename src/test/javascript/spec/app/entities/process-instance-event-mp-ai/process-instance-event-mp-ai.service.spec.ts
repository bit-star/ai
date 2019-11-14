import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ProcessInstanceEventMpAiService } from 'app/entities/process-instance-event-mp-ai/process-instance-event-mp-ai.service';
import { IProcessInstanceEventMpAi, ProcessInstanceEventMpAi } from 'app/shared/model/process-instance-event-mp-ai.model';

describe('Service Tests', () => {
  describe('ProcessInstanceEventMpAi Service', () => {
    let injector: TestBed;
    let service: ProcessInstanceEventMpAiService;
    let httpMock: HttpTestingController;
    let elemDefault: IProcessInstanceEventMpAi;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(ProcessInstanceEventMpAiService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new ProcessInstanceEventMpAi(
        0,
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            finishTime: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a ProcessInstanceEventMpAi', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            finishTime: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            finishTime: currentDate
          },
          returnedFromService
        );
        service
          .create(new ProcessInstanceEventMpAi(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a ProcessInstanceEventMpAi', () => {
        const returnedFromService = Object.assign(
          {
            finishTime: currentDate.format(DATE_TIME_FORMAT),
            corpId: 'BBBBBB',
            eventType: 'BBBBBB',
            businessId: 'BBBBBB',
            title: 'BBBBBB',
            type: 'BBBBBB',
            url: 'BBBBBB',
            result: 'BBBBBB',
            createTime: 'BBBBBB',
            processCode: 'BBBBBB',
            bizCategoryId: 'BBBBBB',
            staffId: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            finishTime: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of ProcessInstanceEventMpAi', () => {
        const returnedFromService = Object.assign(
          {
            finishTime: currentDate.format(DATE_TIME_FORMAT),
            corpId: 'BBBBBB',
            eventType: 'BBBBBB',
            businessId: 'BBBBBB',
            title: 'BBBBBB',
            type: 'BBBBBB',
            url: 'BBBBBB',
            result: 'BBBBBB',
            createTime: 'BBBBBB',
            processCode: 'BBBBBB',
            bizCategoryId: 'BBBBBB',
            staffId: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            finishTime: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a ProcessInstanceEventMpAi', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
