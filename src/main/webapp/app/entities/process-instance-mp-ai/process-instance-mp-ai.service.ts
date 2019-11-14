import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProcessInstanceMpAi } from 'app/shared/model/process-instance-mp-ai.model';

type EntityResponseType = HttpResponse<IProcessInstanceMpAi>;
type EntityArrayResponseType = HttpResponse<IProcessInstanceMpAi[]>;

@Injectable({ providedIn: 'root' })
export class ProcessInstanceMpAiService {
  public resourceUrl = SERVER_API_URL + 'api/process-instances';

  constructor(protected http: HttpClient) {}

  create(processInstance: IProcessInstanceMpAi): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(processInstance);
    return this.http
      .post<IProcessInstanceMpAi>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(processInstance: IProcessInstanceMpAi): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(processInstance);
    return this.http
      .put<IProcessInstanceMpAi>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProcessInstanceMpAi>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProcessInstanceMpAi[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(processInstance: IProcessInstanceMpAi): IProcessInstanceMpAi {
    const copy: IProcessInstanceMpAi = Object.assign({}, processInstance, {
      createTime: processInstance.createTime != null && processInstance.createTime.isValid() ? processInstance.createTime.toJSON() : null,
      finishTime: processInstance.finishTime != null && processInstance.finishTime.isValid() ? processInstance.finishTime.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createTime = res.body.createTime != null ? moment(res.body.createTime) : null;
      res.body.finishTime = res.body.finishTime != null ? moment(res.body.finishTime) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((processInstance: IProcessInstanceMpAi) => {
        processInstance.createTime = processInstance.createTime != null ? moment(processInstance.createTime) : null;
        processInstance.finishTime = processInstance.finishTime != null ? moment(processInstance.finishTime) : null;
      });
    }
    return res;
  }
}
