import { Moment } from 'moment';
import { IProcessMsgTaskMpAi } from 'app/shared/model/process-msg-task-mp-ai.model';
import { DdMessageType } from 'app/shared/model/enumerations/dd-message-type.model';

export interface IDdMessageMpAi {
  id?: number;
  receivingDepartment?: string;
  receivingUser?: string;
  title?: string;
  json?: string;
  sendTime?: Moment;
  type?: DdMessageType;
  processMsgTask?: IProcessMsgTaskMpAi;
}

export class DdMessageMpAi implements IDdMessageMpAi {
  constructor(
    public id?: number,
    public receivingDepartment?: string,
    public receivingUser?: string,
    public title?: string,
    public json?: string,
    public sendTime?: Moment,
    public type?: DdMessageType,
    public processMsgTask?: IProcessMsgTaskMpAi
  ) {}
}
