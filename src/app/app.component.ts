import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { debounceTime, distinctUntilChanged, filter } from "rxjs/operators";
import { copyToClipboard, ExcelToArrayParser, genModel, splitCells, splitRows, toCamel } from "./helpers/helpers";
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

  representJSON: { [field: string]: IValidationItem[] };
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
        let filteredRows: any = v;
        filteredRows = ExcelToArrayParser(v);
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
      const fieldFractmentVal = prop[9].trim();
      const fieldRequired = prop[12].trim();
      let rule: IValidationItem[] = []
      if (fieldRequired.length > 0) {
        rule.push(
          ruleRequired(fieldJP)
        )
      }

      if (fieldType.length > 0) {
        const dt = extractRuleDataType(fieldJP, fieldType, fieldMaxVal, fieldMinVal, fieldFractmentVal);
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

  clickModels() {
      if(!this.representJSON) {
        return;
      }

      const arrRw: [string, string][] = [];
      Object.keys(this.representJSON).forEach(field => {
          let typeDefault = 'string';
          const typeNum = this.representJSON[field].find(rule => {
            return rule.rule === ERROR.DECIMAL || rule.rule === ERROR.NUMBER
          })
          if (typeNum) {
            typeDefault = 'number';
          }
          arrRw.push([field, typeDefault]);
      });
      const model = genModel(arrRw, undefined, undefined, true);
       copyToClipboard(model);
  }
}

// const a = (formControlName="nursingStaff")|(formControlName="otherNursingStaff")|(formControlName="userRequest")|(formControlName="userFamilyRequest")|(formControlName="diseaseName")|(formControlName="onsetDate")|(formControlName="latestAdmissionDate")|(formControlName="latestDischargeDate")|(formControlName="progress")|(formControlName="complicationsControl")|(formControlName="implementationStatus")|(formControlName="managementSeatFlag")|(formControlName="muscleWeaknessStatus")|(formControlName="muscleWeaknessInterference")|(formControlName="muscleWeaknessFuture")|(formControlName="paralysisStatus")|(formControlName="paralysisInterference")|(formControlName="paralysisFuture")|(formControlName="sensoryDysfunctionStatus")|(formControlName="sensoryDysfunctionInterference")|(formControlName="sensoryDysfunctionFuture")|(formControlName="limitJointRangeStatus")|(formControlName="limitJointRangeInterference")|(formControlName="limitJointRangeFuture")|(formControlName="dysphagiaStatus")|(formControlName="dysphagiaInterference")|(formControlName="dysphagiaFuture")|(formControlName="alogiaDysarthriaStatus")|(formControlName="alogiaDysarthriaInterference")|(formControlName="alogiaDysarthriaFuture")|(formControlName="cognitiveDysfunctionStatus")|(formControlName="cognitiveDysfunctionInterference")|(formControlName="cognitiveDysfunctionFuture")|(formControlName="memoryProblemStatus")|(formControlName="memoryProblemInterference")|(formControlName="memoryProblemFuture")|(formControlName="otherDysfunction")|(formControlName="otherDysfunctionStatus")|(formControlName="otherDysfunctionInterference")|(formControlName="otherDysfunctionFuture")|(formControlName="nutritionDisorderStatus")|(formControlName="nutritionDisorderInterference")|(formControlName="nutritionDisorderFuture")|(formControlName="bedsoreStatus")|(formControlName="bedsoreInterference")|(formControlName="bedsoreFuture")|(formControlName="piercingPainStatus")|(formControlName="piercingPainInterference")|(formControlName="piercingPainFuture")|(formControlName="bpsdStatus")|(formControlName="bpsdInterference")|(formControlName="bpsdFuture")|(formControlName="familyFlag")|(formControlName="familyStatus")|(formControlName="livingWith")|(formControlName="welfareEquipmentFlag")|(formControlName="stickStatus")|(formControlName="hardnessStatus")|(formControlName="walkerStatus")|(formControlName="wheelchairStatus")|(formControlName="handrailStatus")|(formControlName="bedStatus")|(formControlName="portableToiletStatus")|(formControlName="familyAdjustStatus")|(formControlName="livingEnvironmentFlag")|(formControlName="livingHouse")|(formControlName="livingApartmentBuilding")|(formControlName="livingApartmentFloor")|(formControlName="livingStairs")|(formControlName="livingElevator")|(formControlName="livingHandrail")|(formControlName="livingHandrailLocation")|(formControlName="livingDinningOnSeat")|(formControlName="livingDinningOnTableChair")|(formControlName="toiletWesternStyle")|(formControlName="toiletJapaneseStyle")|(formControlName="portableToilet")|(formControlName="livingEnvironmentAdjustStatus")|(formControlName="houseCircumferenceFlag")|(formControlName="houseCircumference")|(formControlName="socialParticipationFlag")|(formControlName="socialParticipation")|(formControlName="transportationFlag")|(formControlName="transportationStatus")|(formControlName="transportation")|(formControlName="servicesFlag")|(formControlName="services")|(formControlName="otherEnvironmentFlag")|(formControlName="otherEnvironment")|(formControlName="dailyLifeIndependenceDegree")|(formControlName="dailyLifeIndependenceCriteria")|(formControlName="turningOverCurrentStatus")|(formControlName="turningOverFutureStatus")|(formControlName="getUpCurrentStatus")|(formControlName="getUpFutureStatus")|(formControlName="seatingCurrentStatus")|(formControlName="seatingFutureStatus")|(formControlName="risingFromChairCurrentStatus")|(formControlName="risingFromChairFutureStatus")|(formControlName="risingFromFloorCurrentStatus")|(formControlName="risingFromFloorFutureStatus")|(formControlName="keepStandingCurrentStatus")|(formControlName="keepStandingFutureStatus")|(formControlName="sixMinutesWalkingTestCurrentStatus")|(formControlName="sixMinutesWalkingTestFutureStatus")|(formControlName="timedUpGoTestCurrentStatus")|(formControlName="timedUpGoTestFutureStatus")|(formControlName="mmseCurrentStatus")|(formControlName="mmseFutureStatus")|(formControlName="hdsrCurrentStatus")|(formControlName="hdsrFutureStatus")|(formControlName="medicationManagementCurrentStatus")|(formControlName="medicationManagementFutureStatus")|(formControlName="communicationSituationCurrentStatus")|(formControlName="communicationSituationFutureStatus")|(formControlName="mealCurrentStatus")|(formControlName="mealFutureStatus")|(formControlName="transferCurrentStatus")|(formControlName="transferFutureStatus")|(formControlName="cosmesisCurrentStatus")|(formControlName="cosmesisFutureStatus")|(formControlName="toiletBehaviorCurrentStatus")|(formControlName="toiletBehaviorFutureStatus")|(formControlName="batheCurrentStatus")|(formControlName="batheFutureStatus")|(formControlName="walkingCurrentStatus")|(formControlName="walkingFutureStatus")|(formControlName="stairsCurrentStatus")|(formControlName="stairsFutureStatus")|(formControlName="dressingCurrentStatus")|(formControlName="dressingFutureStatus")|(formControlName="defecationCurrentStatus")|(formControlName="defecationFutureStatus")|(formControlName="urinationCurrentStatus")|(formControlName="urinationFutureStatus")