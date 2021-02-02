export enum ERROR {
  REQUIRED = 'required',
  MAX_LENGTH = 'maxlength',
  MIN_LENGTH = 'minlength',
  NUMBER = 'number',
  ALP = 'alp',
  HAN_UP = 'hanup',
  HAN = 'han',
  HS_KATA = 'hskata',
  HS = 'hs',
  TB = 'tb',
  EMAIL = 'email',
  DATE_TIME = 'datetime',
  DATE = 'date',
  PASSWORD = 'password',
  PASSWORD_MATCH = 'passwordmatch',
  PASSWORD_DIFF = 'passworddifferent',
  GENDER = 'gender',
  PERIOD = 'period',
  BIRTHDAY = 'birthday',
  JOB_OTHER = 'job_other_required',
  GROUP_SET_REQUIRE = 'group_set_require',
  DECIMAL = 'decimal',
  CARE_PERIOD = 'care_period',
  NAME = 'name',
  SELECT = 'select',
  IME = '',
  VALUE_IN_RANGE = 'value_in_range',
  FORM_FIELD_CHECK = 'form_field_check'
}

export type IValidationConfig = { [controlName: string]: IValidationItem[] };

export interface IValidationItem {
  rule: ERROR;
  max?: number;
  min?: number;
  messageID: string;
  params?: any[];
  prefix?: string;
}