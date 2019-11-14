import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFormComponentValuesMpAi } from 'app/shared/model/form-component-values-mp-ai.model';

type EntityResponseType = HttpResponse<IFormComponentValuesMpAi>;
type EntityArrayResponseType = HttpResponse<IFormComponentValuesMpAi[]>;

@Injectable({ providedIn: 'root' })
export class FormComponentValuesMpAiService {
  public resourceUrl = SERVER_API_URL + 'api/form-component-values';

  constructor(protected http: HttpClient) {}

  create(formComponentValues: IFormComponentValuesMpAi): Observable<EntityResponseType> {
    return this.http.post<IFormComponentValuesMpAi>(this.resourceUrl, formComponentValues, { observe: 'response' });
  }

  update(formComponentValues: IFormComponentValuesMpAi): Observable<EntityResponseType> {
    return this.http.put<IFormComponentValuesMpAi>(this.resourceUrl, formComponentValues, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFormComponentValuesMpAi>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFormComponentValuesMpAi[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
