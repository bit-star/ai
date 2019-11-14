import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DdMessageMpAi } from 'app/shared/model/dd-message-mp-ai.model';
import { DdMessageMpAiService } from './dd-message-mp-ai.service';
import { DdMessageMpAiComponent } from './dd-message-mp-ai.component';
import { DdMessageMpAiDetailComponent } from './dd-message-mp-ai-detail.component';
import { DdMessageMpAiUpdateComponent } from './dd-message-mp-ai-update.component';
import { DdMessageMpAiDeletePopupComponent } from './dd-message-mp-ai-delete-dialog.component';
import { IDdMessageMpAi } from 'app/shared/model/dd-message-mp-ai.model';

@Injectable({ providedIn: 'root' })
export class DdMessageMpAiResolve implements Resolve<IDdMessageMpAi> {
  constructor(private service: DdMessageMpAiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDdMessageMpAi> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((ddMessage: HttpResponse<DdMessageMpAi>) => ddMessage.body));
    }
    return of(new DdMessageMpAi());
  }
}

export const ddMessageRoute: Routes = [
  {
    path: '',
    component: DdMessageMpAiComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'aiApp.ddMessage.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DdMessageMpAiDetailComponent,
    resolve: {
      ddMessage: DdMessageMpAiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aiApp.ddMessage.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DdMessageMpAiUpdateComponent,
    resolve: {
      ddMessage: DdMessageMpAiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aiApp.ddMessage.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DdMessageMpAiUpdateComponent,
    resolve: {
      ddMessage: DdMessageMpAiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aiApp.ddMessage.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const ddMessagePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: DdMessageMpAiDeletePopupComponent,
    resolve: {
      ddMessage: DdMessageMpAiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aiApp.ddMessage.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
