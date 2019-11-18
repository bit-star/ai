import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProcessMsgSubTaskMpAi } from 'app/shared/model/process-msg-sub-task-mp-ai.model';

type EntityResponseType = HttpResponse<IProcessMsgSubTaskMpAi>;
type EntityArrayResponseType = HttpResponse<IProcessMsgSubTaskMpAi[]>;

@Injectable({ providedIn: 'root' })
export class ProcessMsgSubTaskMpAiService {
  public resourceUrl = SERVER_API_URL + 'api/process-msg-sub-tasks';

  constructor(protected http: HttpClient) {}

  create(processMsgSubTask: IProcessMsgSubTaskMpAi): Observable<EntityResponseType> {
    return this.http.post<IProcessMsgSubTaskMpAi>(this.resourceUrl, processMsgSubTask, { observe: 'response' });
  }

  update(processMsgSubTask: IProcessMsgSubTaskMpAi): Observable<EntityResponseType> {
    return this.http.put<IProcessMsgSubTaskMpAi>(this.resourceUrl, processMsgSubTask, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProcessMsgSubTaskMpAi>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProcessMsgSubTaskMpAi[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
