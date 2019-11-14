import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProcessTemplateMpAi } from 'app/shared/model/process-template-mp-ai.model';
import { ProcessTemplateMpAiService } from './process-template-mp-ai.service';
import { ProcessTemplateMpAiComponent } from './process-template-mp-ai.component';
import { ProcessTemplateMpAiDetailComponent } from './process-template-mp-ai-detail.component';
import { ProcessTemplateMpAiUpdateComponent } from './process-template-mp-ai-update.component';
import { ProcessTemplateMpAiDeletePopupComponent } from './process-template-mp-ai-delete-dialog.component';
import { IProcessTemplateMpAi } from 'app/shared/model/process-template-mp-ai.model';

@Injectable({ providedIn: 'root' })
export class ProcessTemplateMpAiResolve implements Resolve<IProcessTemplateMpAi> {
  constructor(private service: ProcessTemplateMpAiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProcessTemplateMpAi> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((processTemplate: HttpResponse<ProcessTemplateMpAi>) => processTemplate.body));
    }
    return of(new ProcessTemplateMpAi());
  }
}

export const processTemplateRoute: Routes = [
  {
    path: '',
    component: ProcessTemplateMpAiComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'aiApp.processTemplate.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProcessTemplateMpAiDetailComponent,
    resolve: {
      processTemplate: ProcessTemplateMpAiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aiApp.processTemplate.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProcessTemplateMpAiUpdateComponent,
    resolve: {
      processTemplate: ProcessTemplateMpAiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aiApp.processTemplate.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProcessTemplateMpAiUpdateComponent,
    resolve: {
      processTemplate: ProcessTemplateMpAiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aiApp.processTemplate.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const processTemplatePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ProcessTemplateMpAiDeletePopupComponent,
    resolve: {
      processTemplate: ProcessTemplateMpAiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aiApp.processTemplate.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
