import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProcessInstanceEventMpAi } from 'app/shared/model/process-instance-event-mp-ai.model';

type EntityResponseType = HttpResponse<IProcessInstanceEventMpAi>;
type EntityArrayResponseType = HttpResponse<IProcessInstanceEventMpAi[]>;

@Injectable({ providedIn: 'root' })
export class ProcessInstanceEventMpAiService {
  public resourceUrl = SERVER_API_URL + 'api/process-instance-events';

  constructor(protected http: HttpClient) {}

  create(processInstanceEvent: IProcessInstanceEventMpAi): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(processInstanceEvent);
    return this.http
      .post<IProcessInstanceEventMpAi>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(processInstanceEvent: IProcessInstanceEventMpAi): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(processInstanceEvent);
    return this.http
      .put<IProcessInstanceEventMpAi>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProcessInstanceEventMpAi>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProcessInstanceEventMpAi[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(processInstanceEvent: IProcessInstanceEventMpAi): IProcessInstanceEventMpAi {
    const copy: IProcessInstanceEventMpAi = Object.assign({}, processInstanceEvent, {
      finishTime:
        processInstanceEvent.finishTime != null && processInstanceEvent.finishTime.isValid()
          ? processInstanceEvent.finishTime.toJSON()
          : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.finishTime = res.body.finishTime != null ? moment(res.body.finishTime) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((processInstanceEvent: IProcessInstanceEventMpAi) => {
        processInstanceEvent.finishTime = processInstanceEvent.finishTime != null ? moment(processInstanceEvent.finishTime) : null;
      });
    }
    return res;
  }
}
