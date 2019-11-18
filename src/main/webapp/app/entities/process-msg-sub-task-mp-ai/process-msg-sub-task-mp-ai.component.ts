import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';

import { IProcessMsgSubTaskMpAi } from 'app/shared/model/process-msg-sub-task-mp-ai.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ProcessMsgSubTaskMpAiService } from './process-msg-sub-task-mp-ai.service';

@Component({
  selector: 'jhi-process-msg-sub-task-mp-ai',
  templateUrl: './process-msg-sub-task-mp-ai.component.html'
})
export class ProcessMsgSubTaskMpAiComponent implements OnInit, OnDestroy {
  processMsgSubTasks: IProcessMsgSubTaskMpAi[];
  error: any;
  success: any;
  eventSubscriber: Subscription;
  routeData: any;
  links: any;
  totalItems: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;

  constructor(
    protected processMsgSubTaskService: ProcessMsgSubTaskMpAiService,
    protected parseLinks: JhiParseLinks,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.reverse = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
    });
  }

  loadAll() {
    this.processMsgSubTaskService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IProcessMsgSubTaskMpAi[]>) => this.paginateProcessMsgSubTasks(res.body, res.headers));
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/process-msg-sub-task-mp-ai'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    });
    this.loadAll();
  }

  clear() {
    this.page = 0;
    this.router.navigate([
      '/process-msg-sub-task-mp-ai',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInProcessMsgSubTasks();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IProcessMsgSubTaskMpAi) {
    return item.id;
  }

  registerChangeInProcessMsgSubTasks() {
    this.eventSubscriber = this.eventManager.subscribe('processMsgSubTaskListModification', () => this.loadAll());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateProcessMsgSubTasks(data: IProcessMsgSubTaskMpAi[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.processMsgSubTasks = data;
  }
}
