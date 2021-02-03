import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { debounceTime, distinctUntilChanged, filter } from "rxjs/operators";
import { copyToClipboard, splitCells, splitRows, toCamel } from "./helpers/helpers";
import { ERROR, IValidationItem } from "./helpers/interface-obj";
import { ruleRequired, extractRuleDataType, ruleMin, ruleMax } from "./helpers/rules";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  name = "Angular";
  initValue = ``;

  inputExcel: FormControl = new FormControl();

  representJSON;
  errorMessage;

  ngOnInit() {
    this.inputExcel.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter(s => {
        this.errorMessage = null;
        if(s?.trim().length > 0) {
          return true;
        }
        this.errorMessage = "Input empty"
        return false;
      })
    ).subscribe(v => {
      this.errorMessage = null;
      this.representJSON = null;
      try {
        let filteredRows: any = splitRows(v);
        filteredRows = splitCells(filteredRows);
        filteredRows = this.createRule(filteredRows);
        this.representJSON = filteredRows;
      } catch (e) {
        this.errorMessage = e;
      }
    });
    this.inputExcel.setValue(this.initValue);
  }

  createRule(arr: string[][]) {
    const rules: { [field: string]: IValidationItem[] } = {}
    arr.forEach(prop => {
      const fieldName = toCamel(prop[0]).trim();
      const fieldJP = prop[2].trim();
      const fieldType = prop[21].trim();
      const fieldMinVal = prop[7].trim();
      const fieldMaxVal = prop[8].trim();
      const fieldRequired = prop[12].trim();
      let rule: IValidationItem[] = []
      if (fieldRequired.length > 0) {
        rule.push(
          ruleRequired(fieldJP)
        )
      }

      if (fieldType.length > 0) {
        const dt = extractRuleDataType(fieldJP, fieldType, fieldMaxVal);
        if (dt) {
          rule.push(dt);
        }
      }

      if (fieldMinVal.length > 0 && fieldMinVal !== '-') {
        rule.push(
          ruleMin(fieldJP, fieldMinVal)
        )
      }

      if (fieldMaxVal.length > 0 && fieldMaxVal !== '-') {
        rule.push(
          ruleMax(fieldJP, fieldMaxVal)
        )
      }
      if (rule.length > 0) {
        rules[fieldName] = rule;
      }
    });

    return rules;
  }

  clickCopy() {
    copyToClipboard(JSON.stringify(this.representJSON))
  }
}