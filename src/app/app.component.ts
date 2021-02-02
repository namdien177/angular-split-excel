import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  name = "Angular";
  initValue = `evaluate_date		評価日			Date		-	-	-			○	
record_staff_job_category		記録職員職種			String		-	3	-				
plan_create_date		計画作成日			Date		-	-	-				
doctor_name		医師名			String		-	50	-				
`;

  inputExcel: FormControl = new FormControl();

  representJSON;

  ngOnInit() {
    this.inputExcel.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged()
    ).subscribe(v => {
      let filteredRows: any = this.splitRows(v);
      filteredRows = this.splitCells(filteredRows);
      this.representJSON = filteredRows;
    });
    this.inputExcel.setValue(this.initValue);
  }

  createRule(arr: string[][]) {
    const rules: {[field: string]: RuleObject} = {}
    arr.forEach(prop => {
        const fieldName = this.toCamel(prop).trim();
        const fieldJP = prop[2].trim();
        const fieldType = prop[5].trim();
        const fieldMinVal = prop[7].trim();
        const fieldMaxVal = prop[8].trim();
        const fieldRequired = prop[12].trim();

        if(fieldRequired.length > 0) {

        }
    })
  }

  toCamel(s){
  if (s.match(/([0-9a-z][-_][a-z])/gi)) {
    return s.replace(/([-_][a-z])/gi, ($1) => {
      return $1.toUpperCase().replace("-", "").replace("_", "");
    });
  }
  return s;
};

  splitRows(value: string) {
    const rows = value.split(/\n/g);
    return rows.filter(
      cells => cells[0]?.trim().length !== 0
    )
  }

  splitCells(rows: string[]) {
    const separatedCellsRows = rows.map(
      cells => cells.split(/\t/g)
    );
    return separatedCellsRows;
  }

  ruleRequired(fieldName: string):RuleObject  {
    return {
      rule: ERROR.REQUIRED,
      message: `ERROR.REQUIRED_MESSAGE`,
      params: [fieldName]
    }
  }

  ruleMinMax(fieldName: string, min?: string, max?: string): RuleObject {
    // fieldName: string, fieldAsParams: string, min?: number, max?: number
    if (min?.trim().length > 0) {
      // MIN rule
      return {
          rule: ERROR.MIN_LENGTH,
          message: `ERROR.MIN_LENGTH_MESSAGE`,
          min: Number(min),
          params: [fieldName, min]
        }
    }

    return {
        rule: ERROR.MAX_LENGTH,
        message: `ERROR.MAX_LENGTH_MESSAGE`,
        max: Number(max),
        params: [fieldName, max]
      };
  }

}

interface RuleObject {
  rule: ERROR,
  message: string,
  min?: number,
  max?: number,
  params: string[]
}

enum ERROR {
  MAX_LENGTH,
  MIN_LENGTH,
  REQUIRED,
  DATE
}