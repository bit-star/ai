import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProcessMsgTaskMpAi } from 'app/shared/model/process-msg-task-mp-ai.model';
import { ProcessMsgTaskMpAiService } from './process-msg-task-mp-ai.service';
import { ProcessMsgTaskMpAiComponent } from './process-msg-task-mp-ai.component';
import { ProcessMsgTaskMpAiDetailComponent } from './process-msg-task-mp-ai-detail.component';
import { ProcessMsgTaskMpAiUpdateComponent } from './process-msg-task-mp-ai-update.component';
import { ProcessMsgTaskMpAiDeletePopupComponent } from './process-msg-task-mp-ai-delete-dialog.component';
import { IProcessMsgTaskMpAi } from 'app/shared/model/process-msg-task-mp-ai.model';

@Injectable({ providedIn: 'root' })
export class ProcessMsgTaskMpAiResolve implements Resolve<IProcessMsgTaskMpAi> {
  constructor(private service: ProcessMsgTaskMpAiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProcessMsgTaskMpAi> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((processMsgTask: HttpResponse<ProcessMsgTaskMpAi>) => processMsgTask.body));
    }
    return of(new ProcessMsgTaskMpAi());
  }
}

export const processMsgTaskRoute: Routes = [
  {
    path: '',
    component: ProcessMsgTaskMpAiComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'aiApp.processMsgTask.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProcessMsgTaskMpAiDetailComponent,
    resolve: {
      processMsgTask: ProcessMsgTaskMpAiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aiApp.processMsgTask.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProcessMsgTaskMpAiUpdateComponent,
    resolve: {
      processMsgTask: ProcessMsgTaskMpAiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aiApp.processMsgTask.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProcessMsgTaskMpAiUpdateComponent,
    resolve: {
      processMsgTask: ProcessMsgTaskMpAiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aiApp.processMsgTask.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const processMsgTaskPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ProcessMsgTaskMpAiDeletePopupComponent,
    resolve: {
      processMsgTask: ProcessMsgTaskMpAiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aiApp.processMsgTask.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
