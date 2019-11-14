import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import { FormComponentValuesMpAiService } from 'app/entities/form-component-values-mp-ai/form-component-values-mp-ai.service';
import { IFormComponentValuesMpAi, FormComponentValuesMpAi } from 'app/shared/model/form-component-values-mp-ai.model';

describe('Service Tests', () => {
  describe('FormComponentValuesMpAi Service', () => {
    let injector: TestBed;
    let service: FormComponentValuesMpAiService;
    let httpMock: HttpTestingController;
    let elemDefault: IFormComponentValuesMpAi;
    let expectedResult;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(FormComponentValuesMpAiService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new FormComponentValuesMpAi(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a FormComponentValuesMpAi', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .create(new FormComponentValuesMpAi(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a FormComponentValuesMpAi', () => {
        const returnedFromService = Object.assign(
          {
            componentType: 'BBBBBB',
            value: 'BBBBBB',
            name: 'BBBBBB',
            extValue: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of FormComponentValuesMpAi', () => {
        const returnedFromService = Object.assign(
          {
            componentType: 'BBBBBB',
            value: 'BBBBBB',
            name: 'BBBBBB',
            extValue: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
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

      it('should delete a FormComponentValuesMpAi', () => {
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
