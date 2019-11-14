import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ProcessMsgTaskMpAiService } from 'app/entities/process-msg-task-mp-ai/process-msg-task-mp-ai.service';
import { IProcessMsgTaskMpAi, ProcessMsgTaskMpAi } from 'app/shared/model/process-msg-task-mp-ai.model';
import { MessageStatus } from 'app/shared/model/enumerations/message-status.model';

describe('Service Tests', () => {
  describe('ProcessMsgTaskMpAi Service', () => {
    let injector: TestBed;
    let service: ProcessMsgTaskMpAiService;
    let httpMock: HttpTestingController;
    let elemDefault: IProcessMsgTaskMpAi;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(ProcessMsgTaskMpAiService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new ProcessMsgTaskMpAi(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', currentDate, MessageStatus.SentSuccessfully);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            executeTime: currentDate.format(DATE_TIME_FORMAT)
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

      it('should create a ProcessMsgTaskMpAi', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            executeTime: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            executeTime: currentDate
          },
          returnedFromService
        );
        service
          .create(new ProcessMsgTaskMpAi(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a ProcessMsgTaskMpAi', () => {
        const returnedFromService = Object.assign(
          {
            receivingDepartment: 'BBBBBB',
            receivingUser: 'BBBBBB',
            title: 'BBBBBB',
            json: 'BBBBBB',
            executeTime: currentDate.format(DATE_TIME_FORMAT),
            status: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            executeTime: currentDate
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

      it('should return a list of ProcessMsgTaskMpAi', () => {
        const returnedFromService = Object.assign(
          {
            receivingDepartment: 'BBBBBB',
            receivingUser: 'BBBBBB',
            title: 'BBBBBB',
            json: 'BBBBBB',
            executeTime: currentDate.format(DATE_TIME_FORMAT),
            status: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            executeTime: currentDate
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

      it('should delete a ProcessMsgTaskMpAi', () => {
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
