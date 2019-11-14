import { Moment } from 'moment';
import { IProcessInstanceEventMpAi } from 'app/shared/model/process-instance-event-mp-ai.model';
import { IFormComponentValuesMpAi } from 'app/shared/model/form-component-values-mp-ai.model';
import { IProcessMsgTaskMpAi } from 'app/shared/model/process-msg-task-mp-ai.model';
import { IProcessTemplateMpAi } from 'app/shared/model/process-template-mp-ai.model';

export interface IProcessInstanceMpAi {
  id?: number;
  attachedProcessInstanceIds?: string;
  bizAction?: string;
  businessId?: string;
  createTime?: Moment;
  finishTime?: Moment;
  operationRecords?: string;
  originatorDeptId?: string;
  originatorDeptName?: string;
  originatorUserid?: string;
  result?: string;
  status?: string;
  tasks?: string;
  title?: string;
  processInstanceEvents?: IProcessInstanceEventMpAi[];
  formComponentValues?: IFormComponentValuesMpAi[];
  processMsgTasks?: IProcessMsgTaskMpAi[];
  processTemplate?: IProcessTemplateMpAi;
}

export class ProcessInstanceMpAi implements IProcessInstanceMpAi {
  constructor(
    public id?: number,
    public attachedProcessInstanceIds?: string,
    public bizAction?: string,
    public businessId?: string,
    public createTime?: Moment,
    public finishTime?: Moment,
    public operationRecords?: string,
    public originatorDeptId?: string,
    public originatorDeptName?: string,
    public originatorUserid?: string,
    public result?: string,
    public status?: string,
    public tasks?: string,
    public title?: string,
    public processInstanceEvents?: IProcessInstanceEventMpAi[],
    public formComponentValues?: IFormComponentValuesMpAi[],
    public processMsgTasks?: IProcessMsgTaskMpAi[],
    public processTemplate?: IProcessTemplateMpAi
  ) {}
}
