import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { DdMessageMpAiService } from 'app/entities/dd-message-mp-ai/dd-message-mp-ai.service';
import { IDdMessageMpAi, DdMessageMpAi } from 'app/shared/model/dd-message-mp-ai.model';
import { DdMessageType } from 'app/shared/model/enumerations/dd-message-type.model';

describe('Service Tests', () => {
  describe('DdMessageMpAi Service', () => {
    let injector: TestBed;
    let service: DdMessageMpAiService;
    let httpMock: HttpTestingController;
    let elemDefault: IDdMessageMpAi;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(DdMessageMpAiService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new DdMessageMpAi(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', currentDate, DdMessageType.ActionCard);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            sendTime: currentDate.format(DATE_TIME_FORMAT)
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

      it('should create a DdMessageMpAi', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            sendTime: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            sendTime: currentDate
          },
          returnedFromService
        );
        service
          .create(new DdMessageMpAi(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a DdMessageMpAi', () => {
        const returnedFromService = Object.assign(
          {
            receivingDepartment: 'BBBBBB',
            receivingUser: 'BBBBBB',
            title: 'BBBBBB',
            json: 'BBBBBB',
            sendTime: currentDate.format(DATE_TIME_FORMAT),
            type: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            sendTime: currentDate
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

      it('should return a list of DdMessageMpAi', () => {
        const returnedFromService = Object.assign(
          {
            receivingDepartment: 'BBBBBB',
            receivingUser: 'BBBBBB',
            title: 'BBBBBB',
            json: 'BBBBBB',
            sendTime: currentDate.format(DATE_TIME_FORMAT),
            type: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            sendTime: currentDate
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

      it('should delete a DdMessageMpAi', () => {
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
