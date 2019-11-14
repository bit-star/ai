import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProcessTemplateMpAi } from 'app/shared/model/process-template-mp-ai.model';

type EntityResponseType = HttpResponse<IProcessTemplateMpAi>;
type EntityArrayResponseType = HttpResponse<IProcessTemplateMpAi[]>;

@Injectable({ providedIn: 'root' })
export class ProcessTemplateMpAiService {
  public resourceUrl = SERVER_API_URL + 'api/process-templates';

  constructor(protected http: HttpClient) {}

  create(processTemplate: IProcessTemplateMpAi): Observable<EntityResponseType> {
    return this.http.post<IProcessTemplateMpAi>(this.resourceUrl, processTemplate, { observe: 'response' });
  }

  update(processTemplate: IProcessTemplateMpAi): Observable<EntityResponseType> {
    return this.http.put<IProcessTemplateMpAi>(this.resourceUrl, processTemplate, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProcessTemplateMpAi>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProcessTemplateMpAi[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
