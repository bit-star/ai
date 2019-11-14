import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProcessInstanceMpAi } from 'app/shared/model/process-instance-mp-ai.model';
import { ProcessInstanceMpAiService } from './process-instance-mp-ai.service';
import { ProcessInstanceMpAiComponent } from './process-instance-mp-ai.component';
import { ProcessInstanceMpAiDetailComponent } from './process-instance-mp-ai-detail.component';
import { ProcessInstanceMpAiUpdateComponent } from './process-instance-mp-ai-update.component';
import { ProcessInstanceMpAiDeletePopupComponent } from './process-instance-mp-ai-delete-dialog.component';
import { IProcessInstanceMpAi } from 'app/shared/model/process-instance-mp-ai.model';

@Injectable({ providedIn: 'root' })
export class ProcessInstanceMpAiResolve implements Resolve<IProcessInstanceMpAi> {
  constructor(private service: ProcessInstanceMpAiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProcessInstanceMpAi> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((processInstance: HttpResponse<ProcessInstanceMpAi>) => processInstance.body));
    }
    return of(new ProcessInstanceMpAi());
  }
}

export const processInstanceRoute: Routes = [
  {
    path: '',
    component: ProcessInstanceMpAiComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'aiApp.processInstance.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProcessInstanceMpAiDetailComponent,
    resolve: {
      processInstance: ProcessInstanceMpAiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aiApp.processInstance.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProcessInstanceMpAiUpdateComponent,
    resolve: {
      processInstance: ProcessInstanceMpAiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aiApp.processInstance.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProcessInstanceMpAiUpdateComponent,
    resolve: {
      processInstance: ProcessInstanceMpAiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aiApp.processInstance.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const processInstancePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ProcessInstanceMpAiDeletePopupComponent,
    resolve: {
      processInstance: ProcessInstanceMpAiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aiApp.processInstance.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
