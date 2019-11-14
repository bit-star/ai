import { IProcessInstanceMpAi } from 'app/shared/model/process-instance-mp-ai.model';

export interface IFormComponentValuesMpAi {
  id?: number;
  componentType?: string;
  value?: string;
  name?: string;
  extValue?: string;
  processInstance?: IProcessInstanceMpAi;
}

export class FormComponentValuesMpAi implements IFormComponentValuesMpAi {
  constructor(
    public id?: number,
    public componentType?: string,
    public value?: string,
    public name?: string,
    public extValue?: string,
    public processInstance?: IProcessInstanceMpAi
  ) {}
}
