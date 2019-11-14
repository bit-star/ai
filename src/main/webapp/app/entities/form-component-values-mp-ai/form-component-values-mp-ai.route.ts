import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormComponentValuesMpAi } from 'app/shared/model/form-component-values-mp-ai.model';
import { FormComponentValuesMpAiService } from './form-component-values-mp-ai.service';
import { FormComponentValuesMpAiComponent } from './form-component-values-mp-ai.component';
import { FormComponentValuesMpAiDetailComponent } from './form-component-values-mp-ai-detail.component';
import { FormComponentValuesMpAiUpdateComponent } from './form-component-values-mp-ai-update.component';
import { FormComponentValuesMpAiDeletePopupComponent } from './form-component-values-mp-ai-delete-dialog.component';
import { IFormComponentValuesMpAi } from 'app/shared/model/form-component-values-mp-ai.model';

@Injectable({ providedIn: 'root' })
export class FormComponentValuesMpAiResolve implements Resolve<IFormComponentValuesMpAi> {
  constructor(private service: FormComponentValuesMpAiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFormComponentValuesMpAi> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((formComponentValues: HttpResponse<FormComponentValuesMpAi>) => formComponentValues.body));
    }
    return of(new FormComponentValuesMpAi());
  }
}

export const formComponentValuesRoute: Routes = [
  {
    path: '',
    component: FormComponentValuesMpAiComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'aiApp.formComponentValues.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FormComponentValuesMpAiDetailComponent,
    resolve: {
      formComponentValues: FormComponentValuesMpAiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aiApp.formComponentValues.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FormComponentValuesMpAiUpdateComponent,
    resolve: {
      formComponentValues: FormComponentValuesMpAiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aiApp.formComponentValues.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FormComponentValuesMpAiUpdateComponent,
    resolve: {
      formComponentValues: FormComponentValuesMpAiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aiApp.formComponentValues.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const formComponentValuesPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: FormComponentValuesMpAiDeletePopupComponent,
    resolve: {
      formComponentValues: FormComponentValuesMpAiResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'aiApp.formComponentValues.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
