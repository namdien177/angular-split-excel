(function () {
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"], {
    /***/
    0:
    /*!***************************!*\
      !*** multi ./src/main.ts ***!
      \***************************/

    /*! no static exports found */

    /***/
    function _(module, exports, __webpack_require__) {
      module.exports = __webpack_require__(
      /*! D:\2020B\Tools\angular-split-excel\src\main.ts */
      "zUnb");
      /***/
    },

    /***/
    "1VHI":
    /*!************************************!*\
      !*** ./src/app/hello.component.ts ***!
      \************************************/

    /*! exports provided: HelloComponent */

    /***/
    function VHI(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "HelloComponent", function () {
        return HelloComponent;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var HelloComponent = function HelloComponent() {
        _classCallCheck(this, HelloComponent);
      };

      HelloComponent.propDecorators = {
        name: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }]
      };
      HelloComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'hello',
        template: "<h1>Hello {{name}}!</h1>",
        styles: ["h1 { font-family: Lato; }"]
      })], HelloComponent);
      /***/
    },

    /***/
    "Lye8":
    /*!************************************!*\
      !*** ./src/app/helpers/helpers.ts ***!
      \************************************/

    /*! exports provided: copyToClipboard, cap, parse, snake, parseMinusPrefix, mapToText, toCamel, bdToCamel, splitRows, splitCells, ExcelToArrayParser */

    /***/
    function Lye8(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "copyToClipboard", function () {
        return copyToClipboard;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "cap", function () {
        return cap;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "parse", function () {
        return parse;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "snake", function () {
        return snake;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "parseMinusPrefix", function () {
        return parseMinusPrefix;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "mapToText", function () {
        return mapToText;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "toCamel", function () {
        return toCamel;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "bdToCamel", function () {
        return bdToCamel;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "splitRows", function () {
        return splitRows;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "splitCells", function () {
        return splitCells;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ExcelToArrayParser", function () {
        return ExcelToArrayParser;
      });

      function copyToClipboard(text) {
        var dummy = document.createElement("textarea"); // to avoid breaking orgain page when copying more words
        // cant copy when adding below this code
        // dummy.style.display = 'none'

        document.body.appendChild(dummy); //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard

        dummy.value = text;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
      }

      function cap(arr) {
        return arr.map(function (s) {
          // snake to pre-camel
          var camelRaw = s.replace(/\_./g, function (matched) {
            return matched.slice(1).toUpperCase();
          });
          var twoId = camelRaw.trim().slice(0, 2);
          var aft = camelRaw.trim().slice(3).trim().replace(/(_label)$/g, "");
          var thirdChar = camelRaw.trim().slice(2, 3);
          var twoIdMatched = false;

          switch (twoId) {
            case "ta":
              if (camelRaw.toLowerCase().startsWith("table")) {
                break;
              }

            case "tb":
            case "cb":
            case "rb":
            case "lb":
            case "sb":
              thirdChar = thirdChar.toUpperCase();
              twoIdMatched = true;
              break;
          }

          if (!twoIdMatched) {
            var threeId = camelRaw.trim().slice(0, 3);
            var forthChar = camelRaw.trim().slice(3, 4);
            var aftSpecial = camelRaw.trim().slice(4).trim().replace(/(_label)$/g, "");

            switch (threeId) {
              case "btn":
                forthChar = forthChar.toUpperCase();
                break;
            }

            return threeId + forthChar + aftSpecial;
          } else {
            return twoId + thirdChar + aft;
          }
        });
      }

      function parse(str) {
        var a = str.split("\n");
        a.pop();
        return a;
      } // camel to snake


      function snake(arr) {
        return arr.map(function (str) {
          return str.trim() // prevent pascal case
          .replace(/^[A-Z]/g, function (letter) {
            return "".concat(letter.toLowerCase());
          }) // Parse camel point
          .replace(/[A-Z]/g, function (letter) {
            return "_".concat(letter.toLowerCase());
          }) // in case number
          .replace(/\d\d/g, function (letter) {
            return "_".concat(letter.toLowerCase());
          });
        });
      }

      ;

      function parseMinusPrefix(str) {
        var rows = str.replace(/"(.|\n|\s)+"/g, function (text) {
          return text.slice(1, text.length - 1).replace(/(\n|\s)/g, "");
        }).split(/\n/);
        rows.pop();
        return rows.map(function (r) {
          var splitting = r.split(/\s+|\t+/).filter(function (s) {
            return s.trim().length > 0;
          });

          if (splitting.length === 1) {
            splitting.push("");
          }

          return splitting;
        });
      }

      function mapToText(ids) {
        var output = "";
        ids.forEach(function (pair, index) {
          var id = pair[0]; // string id;

          var text = pair[1]; // possible prefix;

          if (text.trim().length === 0 && id.startsWith("cb")) {
            var rmPf = id.slice(2); // pascal to camel

            var safe = rmPf.charAt(0).toLowerCase() + rmPf.slice(1);
            console.log("Find: ", safe);
            var label = document.querySelector("label[for='".concat(safe, "']"));

            if (label) {
              output += (label.innerText || "").replace(/\n/g, "").trim() + (index + 1 === ids.length ? "" : "\n");
            } else {
              var alter = document.querySelector("input[id='".concat(safe, "'] + div"));

              if (alter) {
                console.log("Alter: ", alter);
                output += (alter.innerText || "").replace(/\n/g, "").trim() + (index + 1 === ids.length ? "" : "\n");
              } else {
                output += "" + (index + 1 === ids.length ? "" : "\n");
              }
            }
          } else {
            output += text + (index + 1 === ids.length ? "" : "\n");
          }
        });
        return output;
      }

      function toCamel(s) {
        if (s.match(/([0-9a-z][-_][a-z])/gi)) {
          return s.replace(/([-_][a-z])/gi, function ($1) {
            return $1.toUpperCase().replace("-", "").replace("_", "");
          });
        }

        return s;
      }

      ;

      function bdToCamel(raw) {
        var a = raw.split("\n").map(function (s) {
          return s.trim();
        }).filter(function (s) {
          return s.length > 0;
        }).map(function (s) {
          return toCamel(s);
        });
        return a.join("\n");
      }

      function splitRows(value) {
        // const safeInline =
        var rows = value.split(/\t\n/g);
        return rows.filter(function (cells) {
          var _a;

          return ((_a = cells[0]) === null || _a === void 0 ? void 0 : _a.trim().length) !== 0;
        }).map(function (cells) {
          return cells.replace(/\n/g, '');
        }).filter(function (cells) {
          return cells.length > 0 && cells !== '―';
        });
      }

      function splitCells(rows) {
        var separatedCellsRows = rows.map(function (cells) {
          return cells.split(/\t/g);
        });
        return separatedCellsRows;
      }
      /**
       * Improved logic from https://gist.github.com/torjusb/7d6baf4b68370b4ef42f
       * @param raw
       * @constructor
       */


      function ExcelToArrayParser(raw) {
        var cells = raw.split("\t");
        var rows = [];
        var rowTemp = [];
        var maxCol = 0;
        cells.forEach(function (cell) {
          // if group cells (previous cell has new line)
          var matchNewLine = cell.replace(/\"\"/g, '\'') // prevent mis-match on multiple line/dual braces cause wrong row identify
          .match(/"((?:[^"]*(?:\r\n|\n\r|\n|\r))+[^"]+)"/gm);

          if (matchNewLine) {
            var posMatch = cell.indexOf(matchNewLine[0]) || matchNewLine[0].length;
            var innerCells = [cell.substring(0, posMatch), cell.substring(posMatch)].filter(function (s) {
              return s.length !== 0;
            });
            innerCells.forEach(function (ic) {
              if (ic.match(/^"(.+\n+.*)+"$/g)) {
                rowTemp.push(ic.match(/^"(.+\n+.*)+"$/g)[0].replace(/(^")|("$)/g, ""));
              } else {
                var posNewLine = ic.indexOf("\n");

                if (posNewLine !== -1) {
                  var _exceedCells = rowTemp.length - maxCol;

                  if (posNewLine === 0) {
                    if (_exceedCells > 0) {
                      maxCol = rowTemp.length;
                    } // push new line


                    rows.push(rowTemp);
                    rowTemp = [];
                    rowTemp.push(ic.replace(/\n/g, ""));
                  } else {
                    // is a cell at the end of a row
                    rowTemp.push(ic.replace(/\n/g, ""));

                    if (_exceedCells > 0) {
                      maxCol = rowTemp.length;
                    }

                    rows.push(rowTemp);
                    rowTemp = [];
                  }
                } else {
                  rowTemp.push(ic);
                }
              }
            });
          } else {
            if (cell.match(/^".+\n.+"$/g)) {
              // in case the cell has newline but not at first or last of the row
              var parsed = cell.match(/^".+\n.+"$/g)[0].replace(/(^")|("$)/g, "");
              rowTemp.push(parsed);
            } else {
              if (cell.indexOf("\n") !== -1) {
                // has newline
                var split = cell.split("\n"); // add col to row

                rowTemp.push(split[0]);

                var _exceedCells2 = rowTemp.length - maxCol;

                if (_exceedCells2 > 0) {
                  maxCol = rowTemp.length;
                } // push a complete row to collection


                rows.push(rowTemp); // reset row temp with the next split string as the first col

                rowTemp = [split[1]];
              } else {
                rowTemp.push(cell);
              }
            }
          }
        });
        var exceedCells = rowTemp.length - maxCol;

        if (rowTemp.length > 0 && rowTemp.length !== 1 && maxCol !== 1) {
          if (exceedCells > 0) {
            maxCol = rowTemp.length;
          }

          rows.push(rowTemp);
        }

        function fillEmptyCells() {
          var numberOfCells = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          var emptyCells = [];

          for (var i = 0; i < numberOfCells; i++) {
            emptyCells.push("");
          }

          return emptyCells;
        }

        console.log(rows);
        return rows.map(function (cells) {
          if (cells.length < maxCol) {
            cells.push.apply(cells, _toConsumableArray(fillEmptyCells(maxCol - cells.length)));
          }

          return cells;
        });
      }
      /***/

    },

    /***/
    "Sy1n":
    /*!**********************************!*\
      !*** ./src/app/app.component.ts ***!
      \**********************************/

    /*! exports provided: AppComponent */

    /***/
    function Sy1n(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppComponent", function () {
        return AppComponent;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_app_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./app.component.html */
      "VzVu");
      /* harmony import */


      var _app_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./app.component.scss */
      "ynWL");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/forms */
      "3Pt+");
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! rxjs/operators */
      "kU1M");
      /* harmony import */


      var _helpers_helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./helpers/helpers */
      "Lye8");
      /* harmony import */


      var _helpers_rules__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ./helpers/rules */
      "eKtH");

      var AppComponent = /*#__PURE__*/function () {
        function AppComponent() {
          _classCallCheck(this, AppComponent);

          this.name = "Angular";
          this.initValue = "";
          this.inputExcel = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]();
        }

        _createClass(AppComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this = this;

            this.inputExcel.valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["debounceTime"])(200), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["filter"])(function (s) {
              _this.errorMessage = null;

              if ((s === null || s === void 0 ? void 0 : s.trim().length) > 0) {
                return true;
              }

              _this.errorMessage = "Input empty";
              return false;
            })).subscribe(function (v) {
              _this.errorMessage = null;
              _this.representJSON = null;

              try {
                var filteredRows = v;
                filteredRows = Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_6__["ExcelToArrayParser"])(v);
                filteredRows = _this.createRule(filteredRows);
                _this.representJSON = filteredRows;
              } catch (e) {
                _this.errorMessage = e;
              }
            });
            this.inputExcel.setValue(this.initValue);
          }
        }, {
          key: "createRule",
          value: function createRule(arr) {
            var rules = {};
            arr.forEach(function (prop) {
              var fieldName = Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_6__["toCamel"])(prop[0]).trim();
              var fieldJP = prop[2].trim();
              var fieldType = prop[21].trim();
              var fieldMinVal = prop[7].trim();
              var fieldMaxVal = prop[8].trim();
              var fieldFractmentVal = prop[9].trim();
              var fieldRequired = prop[12].trim();
              var rule = [];

              if (fieldRequired.length > 0) {
                rule.push(Object(_helpers_rules__WEBPACK_IMPORTED_MODULE_7__["ruleRequired"])(fieldJP));
              }

              if (fieldType.length > 0) {
                var dt = Object(_helpers_rules__WEBPACK_IMPORTED_MODULE_7__["extractRuleDataType"])(fieldJP, fieldType, fieldMaxVal, fieldMinVal, fieldFractmentVal);

                if (dt) {
                  rule.push(dt);
                }
              }

              if (fieldMinVal.length > 0 && fieldMinVal !== '-') {
                rule.push(Object(_helpers_rules__WEBPACK_IMPORTED_MODULE_7__["ruleMin"])(fieldJP, fieldMinVal));
              }

              if (fieldMaxVal.length > 0 && fieldMaxVal !== '-') {
                rule.push(Object(_helpers_rules__WEBPACK_IMPORTED_MODULE_7__["ruleMax"])(fieldJP, fieldMaxVal));
              }

              if (rule.length > 0) {
                rules[fieldName] = rule;
              }
            });
            return rules;
          }
        }, {
          key: "clickCopy",
          value: function clickCopy() {
            Object(_helpers_helpers__WEBPACK_IMPORTED_MODULE_6__["copyToClipboard"])(JSON.stringify(this.representJSON));
          }
        }]);

        return AppComponent;
      }();

      AppComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: "my-app",
        template: _raw_loader_app_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_app_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], AppComponent); // const a = (formControlName="nursingStaff")|(formControlName="otherNursingStaff")|(formControlName="userRequest")|(formControlName="userFamilyRequest")|(formControlName="diseaseName")|(formControlName="onsetDate")|(formControlName="latestAdmissionDate")|(formControlName="latestDischargeDate")|(formControlName="progress")|(formControlName="complicationsControl")|(formControlName="implementationStatus")|(formControlName="managementSeatFlag")|(formControlName="muscleWeaknessStatus")|(formControlName="muscleWeaknessInterference")|(formControlName="muscleWeaknessFuture")|(formControlName="paralysisStatus")|(formControlName="paralysisInterference")|(formControlName="paralysisFuture")|(formControlName="sensoryDysfunctionStatus")|(formControlName="sensoryDysfunctionInterference")|(formControlName="sensoryDysfunctionFuture")|(formControlName="limitJointRangeStatus")|(formControlName="limitJointRangeInterference")|(formControlName="limitJointRangeFuture")|(formControlName="dysphagiaStatus")|(formControlName="dysphagiaInterference")|(formControlName="dysphagiaFuture")|(formControlName="alogiaDysarthriaStatus")|(formControlName="alogiaDysarthriaInterference")|(formControlName="alogiaDysarthriaFuture")|(formControlName="cognitiveDysfunctionStatus")|(formControlName="cognitiveDysfunctionInterference")|(formControlName="cognitiveDysfunctionFuture")|(formControlName="memoryProblemStatus")|(formControlName="memoryProblemInterference")|(formControlName="memoryProblemFuture")|(formControlName="otherDysfunction")|(formControlName="otherDysfunctionStatus")|(formControlName="otherDysfunctionInterference")|(formControlName="otherDysfunctionFuture")|(formControlName="nutritionDisorderStatus")|(formControlName="nutritionDisorderInterference")|(formControlName="nutritionDisorderFuture")|(formControlName="bedsoreStatus")|(formControlName="bedsoreInterference")|(formControlName="bedsoreFuture")|(formControlName="piercingPainStatus")|(formControlName="piercingPainInterference")|(formControlName="piercingPainFuture")|(formControlName="bpsdStatus")|(formControlName="bpsdInterference")|(formControlName="bpsdFuture")|(formControlName="familyFlag")|(formControlName="familyStatus")|(formControlName="livingWith")|(formControlName="welfareEquipmentFlag")|(formControlName="stickStatus")|(formControlName="hardnessStatus")|(formControlName="walkerStatus")|(formControlName="wheelchairStatus")|(formControlName="handrailStatus")|(formControlName="bedStatus")|(formControlName="portableToiletStatus")|(formControlName="familyAdjustStatus")|(formControlName="livingEnvironmentFlag")|(formControlName="livingHouse")|(formControlName="livingApartmentBuilding")|(formControlName="livingApartmentFloor")|(formControlName="livingStairs")|(formControlName="livingElevator")|(formControlName="livingHandrail")|(formControlName="livingHandrailLocation")|(formControlName="livingDinningOnSeat")|(formControlName="livingDinningOnTableChair")|(formControlName="toiletWesternStyle")|(formControlName="toiletJapaneseStyle")|(formControlName="portableToilet")|(formControlName="livingEnvironmentAdjustStatus")|(formControlName="houseCircumferenceFlag")|(formControlName="houseCircumference")|(formControlName="socialParticipationFlag")|(formControlName="socialParticipation")|(formControlName="transportationFlag")|(formControlName="transportationStatus")|(formControlName="transportation")|(formControlName="servicesFlag")|(formControlName="services")|(formControlName="otherEnvironmentFlag")|(formControlName="otherEnvironment")|(formControlName="dailyLifeIndependenceDegree")|(formControlName="dailyLifeIndependenceCriteria")|(formControlName="turningOverCurrentStatus")|(formControlName="turningOverFutureStatus")|(formControlName="getUpCurrentStatus")|(formControlName="getUpFutureStatus")|(formControlName="seatingCurrentStatus")|(formControlName="seatingFutureStatus")|(formControlName="risingFromChairCurrentStatus")|(formControlName="risingFromChairFutureStatus")|(formControlName="risingFromFloorCurrentStatus")|(formControlName="risingFromFloorFutureStatus")|(formControlName="keepStandingCurrentStatus")|(formControlName="keepStandingFutureStatus")|(formControlName="sixMinutesWalkingTestCurrentStatus")|(formControlName="sixMinutesWalkingTestFutureStatus")|(formControlName="timedUpGoTestCurrentStatus")|(formControlName="timedUpGoTestFutureStatus")|(formControlName="mmseCurrentStatus")|(formControlName="mmseFutureStatus")|(formControlName="hdsrCurrentStatus")|(formControlName="hdsrFutureStatus")|(formControlName="medicationManagementCurrentStatus")|(formControlName="medicationManagementFutureStatus")|(formControlName="communicationSituationCurrentStatus")|(formControlName="communicationSituationFutureStatus")|(formControlName="mealCurrentStatus")|(formControlName="mealFutureStatus")|(formControlName="transferCurrentStatus")|(formControlName="transferFutureStatus")|(formControlName="cosmesisCurrentStatus")|(formControlName="cosmesisFutureStatus")|(formControlName="toiletBehaviorCurrentStatus")|(formControlName="toiletBehaviorFutureStatus")|(formControlName="batheCurrentStatus")|(formControlName="batheFutureStatus")|(formControlName="walkingCurrentStatus")|(formControlName="walkingFutureStatus")|(formControlName="stairsCurrentStatus")|(formControlName="stairsFutureStatus")|(formControlName="dressingCurrentStatus")|(formControlName="dressingFutureStatus")|(formControlName="defecationCurrentStatus")|(formControlName="defecationFutureStatus")|(formControlName="urinationCurrentStatus")|(formControlName="urinationFutureStatus")

      /***/
    },

    /***/
    "VzVu":
    /*!**************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
      \**************************************************************************/

    /*! exports provided: default */

    /***/
    function VzVu(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<div class=\"flex flex-col\">\r\n\t<textarea [formControl]=\"inputExcel\"\r\n\t\tclass=\"border border-gray-500 outline-none shadow bg-gray-200 h-20 w-full\"></textarea>\r\n\t<hr class=\"my-2 border border-gray-200\">\r\n\t<button (click)=\"clickCopy()\" class=\"w-full border-none bg-green-600 text-white py-4\">\r\n\t\tParse and copy\r\n\t</button>\r\n\t<hr class=\"my-2 border border-gray-200\">\r\n\t<div *ngIf=\"errorMessage?.length > 0\" class=\"m-2 p-2 border-solid border-l-2 text-red-600 border-red-600 bg-red-100\">\r\n\t\t{{errorMessage}}\r\n\t</div>\r\n\t<pre>\r\n    {{representJSON | json}}\r\n  </pre>\r\n</div>";
      /***/
    },

    /***/
    "ZAI4":
    /*!*******************************!*\
      !*** ./src/app/app.module.ts ***!
      \*******************************/

    /*! exports provided: AppModule */

    /***/
    function ZAI4(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppModule", function () {
        return AppModule;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/platform-browser */
      "jhN1");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/forms */
      "3Pt+");
      /* harmony import */


      var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./app.component */
      "Sy1n");
      /* harmony import */


      var _hello_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./hello.component */
      "1VHI");

      var AppModule = function AppModule() {
        _classCallCheck(this, AppModule);
      };

      AppModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["BrowserModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"]],
        declarations: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"], _hello_component__WEBPACK_IMPORTED_MODULE_5__["HelloComponent"]],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
      })], AppModule);
      /***/
    },

    /***/
    "asXW":
    /*!******************************************!*\
      !*** ./src/app/helpers/interface-obj.ts ***!
      \******************************************/

    /*! exports provided: ERROR */

    /***/
    function asXW(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ERROR", function () {
        return ERROR;
      });

      var ERROR;

      (function (ERROR) {
        ERROR["REQUIRED"] = "required";
        ERROR["MAX_LENGTH"] = "maxlength";
        ERROR["MIN_LENGTH"] = "minlength";
        ERROR["NUMBER"] = "number";
        ERROR["ALP"] = "alp";
        ERROR["HAN_UP"] = "hanup";
        ERROR["HAN"] = "han";
        ERROR["HS_KATA"] = "hskata";
        ERROR["HS"] = "hs";
        ERROR["TB"] = "tb";
        ERROR["EMAIL"] = "email";
        ERROR["DATE_TIME"] = "datetime";
        ERROR["DATE"] = "date";
        ERROR["PASSWORD"] = "password";
        ERROR["PASSWORD_MATCH"] = "passwordmatch";
        ERROR["PASSWORD_DIFF"] = "passworddifferent";
        ERROR["GENDER"] = "gender";
        ERROR["PERIOD"] = "period";
        ERROR["BIRTHDAY"] = "birthday";
        ERROR["JOB_OTHER"] = "job_other_required";
        ERROR["GROUP_SET_REQUIRE"] = "group_set_require";
        ERROR["DECIMAL"] = "decimal";
        ERROR["CARE_PERIOD"] = "care_period";
        ERROR["NAME"] = "name";
        ERROR["SELECT"] = "select";
        ERROR["IME"] = "";
        ERROR["VALUE_IN_RANGE"] = "value_in_range";
        ERROR["FORM_FIELD_CHECK"] = "form_field_check";
      })(ERROR || (ERROR = {}));
      /***/

    },

    /***/
    "eKtH":
    /*!**********************************!*\
      !*** ./src/app/helpers/rules.ts ***!
      \**********************************/

    /*! exports provided: extractRuleDataType, ruleDateTime, ruleDate, ruleNumber, ruleDecimal, ruleRequired, ruleMin, ruleMax */

    /***/
    function eKtH(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "extractRuleDataType", function () {
        return extractRuleDataType;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ruleDateTime", function () {
        return ruleDateTime;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ruleDate", function () {
        return ruleDate;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ruleNumber", function () {
        return ruleNumber;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ruleDecimal", function () {
        return ruleDecimal;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ruleRequired", function () {
        return ruleRequired;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ruleMin", function () {
        return ruleMin;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ruleMax", function () {
        return ruleMax;
      });
      /* harmony import */


      var _interface_obj__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./interface-obj */
      "asXW");

      function extractRuleDataType(fieldName, dataType, maxNumber, minNumber, fracment) {
        switch (dataType.toLowerCase()) {
          case 'dt':
            return ruleDate(fieldName);

          case 'number':
          case 'num':
            return ruleNumber(fieldName, maxNumber);

          case 'decimal':
            return ruleDecimal(fieldName, maxNumber, fracment);
        }

        return null;
      }

      function ruleDateTime(fieldName) {
        return {
          rule: _interface_obj__WEBPACK_IMPORTED_MODULE_0__["ERROR"].DATE_TIME,
          messageID: "ERROR.DATE_TIME_MESSAGE",
          params: [fieldName]
        };
      }

      function ruleDate(fieldName) {
        return {
          rule: _interface_obj__WEBPACK_IMPORTED_MODULE_0__["ERROR"].DATE,
          messageID: "WAR_VALIDATE_DATE_FORMAT_YMD",
          params: [fieldName]
        };
      }

      function ruleNumber(fieldName, maxNumber) {
        return {
          rule: _interface_obj__WEBPACK_IMPORTED_MODULE_0__["ERROR"].NUMBER,
          messageID: "WAR_VALIDATE_NUM_LEN_MAX",
          params: [fieldName, Number(maxNumber)]
        };
      }

      function ruleDecimal(fieldName, max, fracment) {
        return {
          rule: _interface_obj__WEBPACK_IMPORTED_MODULE_0__["ERROR"].DECIMAL,
          messageID: 'WAR_VALIDATE_DECIMAL',
          params: [fieldName, max, fracment]
        };
      }

      function ruleRequired(fieldName) {
        return {
          rule: _interface_obj__WEBPACK_IMPORTED_MODULE_0__["ERROR"].REQUIRED,
          messageID: "WAR_VALIDATE_VALUE_REQUIRED_INPUT",
          params: [fieldName]
        };
      }

      function ruleMin(fieldName, min) {
        // fieldName: string, fieldAsParams: string, min?: number, max?: number
        return {
          rule: _interface_obj__WEBPACK_IMPORTED_MODULE_0__["ERROR"].MIN_LENGTH,
          messageID: "WAR_VALIDATE_NUM_LEN_MIN",
          min: Number(min),
          params: [fieldName, Number(min)]
        };
      }

      function ruleMax(fieldName, max) {
        return {
          rule: _interface_obj__WEBPACK_IMPORTED_MODULE_0__["ERROR"].MAX_LENGTH,
          messageID: "WAR_VALIDATE_NUM_LEN_MAX",
          max: Number(max),
          params: [fieldName, Number(max)]
        };
      }
      /***/

    },

    /***/
    "hN/g":
    /*!**************************!*\
      !*** ./src/polyfills.ts ***!
      \**************************/

    /*! no exports provided */

    /***/
    function hNG(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony import */


      var zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! zone.js/dist/zone */
      "pDpN");
      /* harmony import */


      var zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_0__);
      /**
       * This file includes polyfills needed by Angular and is loaded before the app.
       * You can add your own extra polyfills to this file.
       *
       * This file is divided into 2 sections:
       *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
       *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
       *      file.
       *
       * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
       * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
       * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
       *
       * Learn more in https://angular.io/docs/ts/latest/guide/browser-support.html
       */

      /***************************************************************************************************
       * BROWSER POLYFILLS
       */

      /** IE9, IE10 and IE11 requires all of the following polyfills. **/
      // import 'core-js/es6/symbol';
      // import 'core-js/es6/object';
      // import 'core-js/es6/function';
      // import 'core-js/es6/parse-int';
      // import 'core-js/es6/parse-float';
      // import 'core-js/es6/number';
      // import 'core-js/es6/math';
      // import 'core-js/es6/string';
      // import 'core-js/es6/date';
      // import 'core-js/es6/array';
      // import 'core-js/es6/regexp';
      // import 'core-js/es6/map';
      // import 'core-js/es6/set';

      /** IE10 and IE11 requires the following for NgClass support on SVG elements */
      // import 'classlist.js';  // Run `npm install --save classlist.js`.

      /** IE10 and IE11 requires the following to support `@angular/animation`. */
      // import 'web-animations-js';  // Run `npm install --save web-animations-js`.

      /** Evergreen browsers require these. **/
      // import 'core-js/es6/reflect';
      // import 'core-js/es7/reflect';

      /**
       * Web Animations `@angular/platform-browser/animations`
       * Only required if AnimationBuilder is used within the application and using IE/Edge or Safari.
       * Standard animation support in Angular DOES NOT require any polyfills (as of Angular 6.0).
       */
      // import 'web-animations-js';  // Run `npm install --save web-animations-js`.

      /***************************************************************************************************
       * Zone JS is required by Angular itself.
       */
      // Included with Angular CLI.

      /***************************************************************************************************
       * APPLICATION IMPORTS
       */

      /**
       * Date, currency, decimal and percent pipes.
       * Needed for: All but Chrome, Firefox, Edge, IE11 and Safari 10
       */
      // import 'intl';  // Run `npm install --save intl`.

      /***/

    },

    /***/
    "ynWL":
    /*!************************************!*\
      !*** ./src/app/app.component.scss ***!
      \************************************/

    /*! exports provided: default */

    /***/
    function ynWL(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "p {\n  font-family: Lato;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsaUJBQUE7QUFDRiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJwIHtcclxuICBmb250LWZhbWlseTogTGF0bztcclxufSJdfQ== */";
      /***/
    },

    /***/
    "zUnb":
    /*!*********************!*\
      !*** ./src/main.ts ***!
      \*********************/

    /*! no exports provided */

    /***/
    function zUnb(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony import */


      var _polyfills__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./polyfills */
      "hN/g");
      /* harmony import */


      var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/platform-browser-dynamic */
      "a3Wg");
      /* harmony import */


      var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./app/app.module */
      "ZAI4");

      Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"]).then(function (ref) {
        // Ensure Angular destroys itself on hot reloads.
        if (window['ngRef']) {
          window['ngRef'].destroy();
        }

        window['ngRef'] = ref; // Otherwise, log the boot error
      })["catch"](function (err) {
        return console.error(err);
      });
      /***/
    },

    /***/
    "zn8P":
    /*!******************************************************!*\
      !*** ./$$_lazy_route_resource lazy namespace object ***!
      \******************************************************/

    /*! no static exports found */

    /***/
    function zn8P(module, exports) {
      function webpackEmptyAsyncContext(req) {
        // Here Promise.resolve().then() is used instead of new Promise() to prevent
        // uncaught exception popping up in devtools
        return Promise.resolve().then(function () {
          var e = new Error("Cannot find module '" + req + "'");
          e.code = 'MODULE_NOT_FOUND';
          throw e;
        });
      }

      webpackEmptyAsyncContext.keys = function () {
        return [];
      };

      webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
      module.exports = webpackEmptyAsyncContext;
      webpackEmptyAsyncContext.id = "zn8P";
      /***/
    }
  }, [[0, "runtime", "vendor"]]]);
})();
//# sourceMappingURL=main-es5.js.map