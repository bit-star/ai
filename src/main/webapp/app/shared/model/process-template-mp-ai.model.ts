import { IProcessInstanceMpAi } from 'app/shared/model/process-instance-mp-ai.model';

export interface IProcessTemplateMpAi {
  id?: number;
  name?: string;
  processCode?: string;
  processInstances?: IProcessInstanceMpAi[];
}

export class ProcessTemplateMpAi implements IProcessTemplateMpAi {
  constructor(public id?: number, public name?: string, public processCode?: string, public processInstances?: IProcessInstanceMpAi[]) {}
}
