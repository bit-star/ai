import { Moment } from 'moment';
import { IProcessMsgSubTaskMpAi } from 'app/shared/model/process-msg-sub-task-mp-ai.model';
import { IProcessInstanceMpAi } from 'app/shared/model/process-instance-mp-ai.model';
import { DdMessageType } from 'app/shared/model/enumerations/dd-message-type.model';
import { MessageStatus } from 'app/shared/model/enumerations/message-status.model';

export interface IProcessMsgTaskMpAi {
  id?: number;
  deptIdList?: string;
  useridList?: string;
  toAllUser?: boolean;
  msg?: string;
  executeTime?: Moment;
  agentId?: number;
  type?: DdMessageType;
  status?: MessageStatus;
  processMsgSubTasks?: IProcessMsgSubTaskMpAi[];
  processInstance?: IProcessInstanceMpAi;
}

export class ProcessMsgTaskMpAi implements IProcessMsgTaskMpAi {
  constructor(
    public id?: number,
    public deptIdList?: string,
    public useridList?: string,
    public toAllUser?: boolean,
    public msg?: string,
    public executeTime?: Moment,
    public agentId?: number,
    public type?: DdMessageType,
    public status?: MessageStatus,
    public processMsgSubTasks?: IProcessMsgSubTaskMpAi[],
    public processInstance?: IProcessInstanceMpAi
  ) {
    this.toAllUser = this.toAllUser || false;
  }
}
