import { Moment } from 'moment';
import { IDdMessageMpAi } from 'app/shared/model/dd-message-mp-ai.model';
import { IProcessInstanceMpAi } from 'app/shared/model/process-instance-mp-ai.model';
import { MessageStatus } from 'app/shared/model/enumerations/message-status.model';

export interface IProcessMsgTaskMpAi {
  id?: number;
  receivingDepartment?: string;
  receivingUser?: string;
  title?: string;
  json?: string;
  executeTime?: Moment;
  status?: MessageStatus;
  ddMessages?: IDdMessageMpAi[];
  processInstance?: IProcessInstanceMpAi;
}

export class ProcessMsgTaskMpAi implements IProcessMsgTaskMpAi {
  constructor(
    public id?: number,
    public receivingDepartment?: string,
    public receivingUser?: string,
    public title?: string,
    public json?: string,
    public executeTime?: Moment,
    public status?: MessageStatus,
    public ddMessages?: IDdMessageMpAi[],
    public processInstance?: IProcessInstanceMpAi
  ) {}
}
