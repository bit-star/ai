import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProcessMsgSubTaskMpAi } from 'app/shared/model/process-msg-sub-task-mp-ai.model';
import { ProcessMsgSubTaskMpAiService } from './process-msg-sub-task-mp-ai.service';
import { ProcessMsgSubTaskMpAiComponent } from './process-msg-sub-task-mp-ai.component';
import { ProcessMsgSubTaskMpAiDetailComponent } from './process-msg-sub-task-mp-ai-detail.component';
import { ProcessMsgSubTaskMpAiUpdateComponent } from './process-msg-sub-task-mp-ai-update.component';
import { ProcessMsgSubTaskMpAiDeletePopupComponent } from './process-msg-sub-task-mp-ai-delete-dialog.component';
import { IProcessMsgSubTaskMpAi } from 'app/shared/model/process-msg-sub-task-mp-ai.model';

@Injectable({ providedIn: 'root' })
export class ProcessMsgSubTaskMpAiResolve implements Resolve<IProcessMsgSubTaskMpAi> {
  constructor(private service: ProcessMsgSubTaskMpAiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProcessMsgSubTaskMpAi> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((processMsgSubTask: HttpResponse<ProcessMsgSubTaskMpAi>) => processMsgSubTask.body));
    }
    return of(new ProcessMsgSubTaskMpAi());
  }
}

export const processMsgSubTaskRoute: Routes = [
  {
    path: '',
    component: ProcessMsgSubTaskMpAiComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'aiApp.processMsgSubTask.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProcessMsgSubTaskMpAiDetailComponent,
    resolve: {
      processMsgSubTask: ProcessMsgSubTaskMpAiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aiApp.processMsgSubTask.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProcessMsgSubTaskMpAiUpdateComponent,
    resolve: {
      processMsgSubTask: ProcessMsgSubTaskMpAiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aiApp.processMsgSubTask.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProcessMsgSubTaskMpAiUpdateComponent,
    resolve: {
      processMsgSubTask: ProcessMsgSubTaskMpAiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aiApp.processMsgSubTask.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const processMsgSubTaskPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ProcessMsgSubTaskMpAiDeletePopupComponent,
    resolve: {
      processMsgSubTask: ProcessMsgSubTaskMpAiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aiApp.processMsgSubTask.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
