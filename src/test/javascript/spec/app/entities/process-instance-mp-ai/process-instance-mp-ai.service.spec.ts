import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ProcessInstanceMpAiService } from 'app/entities/process-instance-mp-ai/process-instance-mp-ai.service';
import { IProcessInstanceMpAi, ProcessInstanceMpAi } from 'app/shared/model/process-instance-mp-ai.model';

describe('Service Tests', () => {
  describe('ProcessInstanceMpAi Service', () => {
    let injector: TestBed;
    let service: ProcessInstanceMpAiService;
    let httpMock: HttpTestingController;
    let elemDefault: IProcessInstanceMpAi;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(ProcessInstanceMpAiService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new ProcessInstanceMpAi(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        currentDate,
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
            createTime: currentDate.format(DATE_TIME_FORMAT),
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

      it('should create a ProcessInstanceMpAi', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            createTime: currentDate.format(DATE_TIME_FORMAT),
            finishTime: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            createTime: currentDate,
            finishTime: currentDate
          },
          returnedFromService
        );
        service
          .create(new ProcessInstanceMpAi(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a ProcessInstanceMpAi', () => {
        const returnedFromService = Object.assign(
          {
            attachedProcessInstanceIds: 'BBBBBB',
            bizAction: 'BBBBBB',
            businessId: 'BBBBBB',
            createTime: currentDate.format(DATE_TIME_FORMAT),
            finishTime: currentDate.format(DATE_TIME_FORMAT),
            operationRecords: 'BBBBBB',
            originatorDeptId: 'BBBBBB',
            originatorDeptName: 'BBBBBB',
            originatorUserid: 'BBBBBB',
            result: 'BBBBBB',
            status: 'BBBBBB',
            tasks: 'BBBBBB',
            title: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            createTime: currentDate,
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

      it('should return a list of ProcessInstanceMpAi', () => {
        const returnedFromService = Object.assign(
          {
            attachedProcessInstanceIds: 'BBBBBB',
            bizAction: 'BBBBBB',
            businessId: 'BBBBBB',
            createTime: currentDate.format(DATE_TIME_FORMAT),
            finishTime: currentDate.format(DATE_TIME_FORMAT),
            operationRecords: 'BBBBBB',
            originatorDeptId: 'BBBBBB',
            originatorDeptName: 'BBBBBB',
            originatorUserid: 'BBBBBB',
            result: 'BBBBBB',
            status: 'BBBBBB',
            tasks: 'BBBBBB',
            title: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            createTime: currentDate,
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

      it('should delete a ProcessInstanceMpAi', () => {
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
