import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
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
  initValue = `examination_and_treatment_progress_contents		　経過及び治療内容			String		-	200	-												-	
`;

  inputExcel: FormControl = new FormControl();

  representJSON;

  ngOnInit() {
    this.inputExcel.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged()
    ).subscribe(v => {
      let filteredRows: any = splitRows(v);
      filteredRows = splitCells(filteredRows);
      filteredRows = this.createRule(filteredRows);
      this.representJSON = filteredRows;

      // this.representJSON = v;
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

      rules[fieldName] = rule;
    });

    return rules;
  }

  clickCopy() {
    copyToClipboard(JSON.stringify(this.representJSON))
  }
}