import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProcessInstanceEventMpAi } from 'app/shared/model/process-instance-event-mp-ai.model';
import { ProcessInstanceEventMpAiService } from './process-instance-event-mp-ai.service';
import { ProcessInstanceEventMpAiComponent } from './process-instance-event-mp-ai.component';
import { ProcessInstanceEventMpAiDetailComponent } from './process-instance-event-mp-ai-detail.component';
import { ProcessInstanceEventMpAiUpdateComponent } from './process-instance-event-mp-ai-update.component';
import { ProcessInstanceEventMpAiDeletePopupComponent } from './process-instance-event-mp-ai-delete-dialog.component';
import { IProcessInstanceEventMpAi } from 'app/shared/model/process-instance-event-mp-ai.model';

@Injectable({ providedIn: 'root' })
export class ProcessInstanceEventMpAiResolve implements Resolve<IProcessInstanceEventMpAi> {
  constructor(private service: ProcessInstanceEventMpAiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProcessInstanceEventMpAi> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((processInstanceEvent: HttpResponse<ProcessInstanceEventMpAi>) => processInstanceEvent.body));
    }
    return of(new ProcessInstanceEventMpAi());
  }
}

export const processInstanceEventRoute: Routes = [
  {
    path: '',
    component: ProcessInstanceEventMpAiComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'aiApp.processInstanceEvent.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProcessInstanceEventMpAiDetailComponent,
    resolve: {
      processInstanceEvent: ProcessInstanceEventMpAiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aiApp.processInstanceEvent.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProcessInstanceEventMpAiUpdateComponent,
    resolve: {
      processInstanceEvent: ProcessInstanceEventMpAiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aiApp.processInstanceEvent.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProcessInstanceEventMpAiUpdateComponent,
    resolve: {
      processInstanceEvent: ProcessInstanceEventMpAiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aiApp.processInstanceEvent.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const processInstanceEventPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ProcessInstanceEventMpAiDeletePopupComponent,
    resolve: {
      processInstanceEvent: ProcessInstanceEventMpAiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aiApp.processInstanceEvent.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
