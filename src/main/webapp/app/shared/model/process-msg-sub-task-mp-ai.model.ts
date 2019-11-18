import { IProcessMsgTaskMpAi } from 'app/shared/model/process-msg-task-mp-ai.model';

export interface IProcessMsgSubTaskMpAi {
  id?: number;
  useridList?: string;
  taskId?: number;
  processMsgTask?: IProcessMsgTaskMpAi;
}

export class ProcessMsgSubTaskMpAi implements IProcessMsgSubTaskMpAi {
  constructor(public id?: number, public useridList?: string, public taskId?: number, public processMsgTask?: IProcessMsgTaskMpAi) {}
}
