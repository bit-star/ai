import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDdMessageMpAi } from 'app/shared/model/dd-message-mp-ai.model';

type EntityResponseType = HttpResponse<IDdMessageMpAi>;
type EntityArrayResponseType = HttpResponse<IDdMessageMpAi[]>;

@Injectable({ providedIn: 'root' })
export class DdMessageMpAiService {
  public resourceUrl = SERVER_API_URL + 'api/dd-messages';

  constructor(protected http: HttpClient) {}

  create(ddMessage: IDdMessageMpAi): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ddMessage);
    return this.http
      .post<IDdMessageMpAi>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(ddMessage: IDdMessageMpAi): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ddMessage);
    return this.http
      .put<IDdMessageMpAi>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDdMessageMpAi>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDdMessageMpAi[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(ddMessage: IDdMessageMpAi): IDdMessageMpAi {
    const copy: IDdMessageMpAi = Object.assign({}, ddMessage, {
      sendTime: ddMessage.sendTime != null && ddMessage.sendTime.isValid() ? ddMessage.sendTime.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.sendTime = res.body.sendTime != null ? moment(res.body.sendTime) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((ddMessage: IDdMessageMpAi) => {
        ddMessage.sendTime = ddMessage.sendTime != null ? moment(ddMessage.sendTime) : null;
      });
    }
    return res;
  }
}
