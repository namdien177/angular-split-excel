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

  ruleRequired(rowCells: string[]):RuleObject  {
    const fieldName = rowCells[1];
    const required = rowCells[4];
    return {
      rule: ERROR.REQUIRED,
      message: `ERROR.REQUIRED_MESSAGE`,
      params: [fieldName]
    }
  }

  ruleMinMax(rowCells: string[]): RuleObject {
    // fieldName: string, fieldAsParams: string, min?: number, max?: number
    const fieldKey = rowCells[0];
    const fieldName = rowCells[1];
    const min = rowCells[2];
    const max = rowCells[3];
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