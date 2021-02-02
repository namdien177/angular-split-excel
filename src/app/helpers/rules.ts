import { ERROR, IValidationItem } from "./interface-obj";


export function extractRuleDataType(fieldName: string, dataType: string, maxNumber: string): IValidationItem {
    switch (dataType.toLowerCase()) {
        case 'dt':
            return ruleDate(fieldName);
        case 'number':
        case 'num':
            return ruleNumber(fieldName, maxNumber);
    }
    return null;
}

export function ruleDateTime(fieldName: string): IValidationItem {
    return {
        rule: ERROR.DATE_TIME,
        messageID: `ERROR.DATE_TIME_MESSAGE`,
        params: [fieldName]
    }
}

export function ruleDate(fieldName: string): IValidationItem {
    return {
        rule: ERROR.DATE,
        messageID: `WAR_VALIDATE_DATE_FORMAT_YMD`,
        params: [fieldName]
    }
}

export function ruleNumber(fieldName: string, maxNumber: string): IValidationItem {
    return {
        rule: ERROR.NUMBER,
        messageID: `WAR_VALIDATE_NUM_LEN_MAX`,
        params: [fieldName, Number(maxNumber)]
    }
}

export function ruleRequired(fieldName: string): IValidationItem {
    return {
        rule: ERROR.REQUIRED,
        messageID: `WAR_VALIDATE_VALUE_REQUIRED_INPUT`,
        params: [fieldName]
    }
}

export function ruleMin(fieldName: string, min: string): IValidationItem {
    // fieldName: string, fieldAsParams: string, min?: number, max?: number
    return {
        rule: ERROR.MIN_LENGTH,
        messageID: `WAR_VALIDATE_NUM_LEN_MIN`,
        min: Number(min),
        params: [fieldName, Number(min)]
    }
}

export function ruleMax(fieldName: string, max: string) {
    return {
        rule: ERROR.MAX_LENGTH,
        messageID: `WAR_VALIDATE_NUM_LEN_MAX`,
        max: Number(max),
        params: [fieldName, Number(max)]
    };
}