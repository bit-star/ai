import { Moment } from 'moment';
import { IProcessInstanceMpAi } from 'app/shared/model/process-instance-mp-ai.model';

export interface IProcessInstanceEventMpAi {
  id?: number;
  finishTime?: Moment;
  corpId?: string;
  eventType?: string;
  businessId?: string;
  title?: string;
  type?: string;
  url?: string;
  result?: string;
  createTime?: string;
  processCode?: string;
  bizCategoryId?: string;
  staffId?: string;
  processInstance?: IProcessInstanceMpAi;
}

export class ProcessInstanceEventMpAi implements IProcessInstanceEventMpAi {
  constructor(
    public id?: number,
    public finishTime?: Moment,
    public corpId?: string,
    public eventType?: string,
    public businessId?: string,
    public title?: string,
    public type?: string,
    public url?: string,
    public result?: string,
    public createTime?: string,
    public processCode?: string,
    public bizCategoryId?: string,
    public staffId?: string,
    public processInstance?: IProcessInstanceMpAi
  ) {}
}
