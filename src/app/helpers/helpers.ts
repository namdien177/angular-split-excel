export function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    document.body.appendChild(dummy);
    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

export function cap(arr) {
    return arr.map((s) => {
        // snake to pre-camel
        const camelRaw = s.replace(/\_./g, (matched) =>
            matched.slice(1).toUpperCase()
        );
        const twoId = camelRaw.trim().slice(0, 2);
        const aft = camelRaw
            .trim()
            .slice(3)
            .trim()
            .replace(/(_label)$/g, "");
        let thirdChar = camelRaw.trim().slice(2, 3);
        let twoIdMatched = false;
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
            const threeId = camelRaw.trim().slice(0, 3);
            let forthChar = camelRaw.trim().slice(3, 4);
            const aftSpecial = camelRaw
                .trim()
                .slice(4)
                .trim()
                .replace(/(_label)$/g, "");
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

export function parse(str) {
    const a = str.split("\n");
    a.pop();
    return a;
}

// camel to snake
export function snake(arr) {
    return arr.map((str) => {
        return (
            str
                .trim()
                // prevent pascal case
                .replace(/^[A-Z]/g, (letter) => `${letter.toLowerCase()}`)
                // Parse camel point
                .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
                // in case number
                .replace(/\d\d/g, (letter) => `_${letter.toLowerCase()}`)
        );
    });
};

export function parseMinusPrefix(str) {
    const rows = str
        .replace(/"(.|\n|\s)+"/g, (text) =>
            text.slice(1, text.length - 1).replace(/(\n|\s)/g, "")
        )
        .split(/\n/);
    rows.pop();
    return rows.map((r) => {
        const splitting = r.split(/\s+|\t+/).filter((s) => s.trim().length > 0);
        if (splitting.length === 1) {
            splitting.push("");
        }
        return splitting;
    });
}

export function mapToText(ids) {
    let output = "";
    ids.forEach((pair, index) => {
        const id = pair[0]; // string id;
        const text = pair[1]; // possible prefix;
        if (text.trim().length === 0 && id.startsWith("cb")) {
            const rmPf = id.slice(2);
            // pascal to camel
            const safe = rmPf.charAt(0).toLowerCase() + rmPf.slice(1);
            console.log("Find: ", safe);
            const label: HTMLLabelElement = document.querySelector(`label[for='${safe}']`);
            if (label) {
                output +=
                    (label.innerText || "").replace(/\n/g, "").trim() +
                    (index + 1 === ids.length ? "" : "\n");
            } else {
                const alter: HTMLInputElement = document.querySelector(`input[id='${safe}'] + div`);
                if (alter) {
                    console.log("Alter: ", alter);
                    output +=
                        (alter.innerText || "").replace(/\n/g, "").trim() +
                        (index + 1 === ids.length ? "" : "\n");
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

export function toCamel(s: string) {
    if (s.match(/([0-9a-z][-_][a-z])/gi)) {
        return s.replace(/([-_][a-z])/gi, ($1) => {
            return $1.toUpperCase().replace("-", "").replace("_", "");
        });
    }
    return s;
};

export function bdToCamel(raw) {
    const a = raw
        .split("\n")
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
        .map((s) => toCamel(s));
    return a.join("\n");
}

export function splitRows(value: string) {
    // const safeInline =
    const rows = value.split(/\t\n/g);
    return rows.filter(
        cells => cells[0]?.trim().length !== 0
    ).map(
        cells => cells.replace(/\n/g, '')
    ).filter(cells => cells.length > 0 && cells !== '―');
}

export function splitCells(rows: string[]) {
    const separatedCellsRows = rows.map(
        cells => cells.split(/\t/g)
    );
    return separatedCellsRows;
}

/**
 * Improved logic from https://gist.github.com/torjusb/7d6baf4b68370b4ef42f
 * @param raw
 * @constructor
 */
export function ExcelToArrayParser(raw: string) {
  const cells: string[] = raw.split("\t");
  let rows: string[][] = [];
  let rowTemp: string[] = [];
  let maxCol: number = 0;
  cells.forEach((cell) => {
    // if group cells (previous cell has new line)
    const matchNewLine = cell.replace(/\"\"/g, '\'').match(/"((?:[^"]*(?:\r\n|\n\r|\n|\r))+[^"]+)"/gm);
    if (matchNewLine) {
      const posMatch = cell.indexOf(matchNewLine[0]) || matchNewLine[0].length;
      const innerCells = [
        cell.substring(0, posMatch),
        cell.substring(posMatch),
      ].filter((s) => s.length !== 0);
      innerCells.forEach((ic) => {
        if (ic.match(/^"(.+\n+.*)+"$/g)) {
          rowTemp.push(ic.match(/^"(.+\n+.*)+"$/g)[0].replace(/(^")|("$)/g, ""));
        } else {
          const posNewLine = ic.indexOf("\n");
          if (posNewLine !== -1) {
            const exceedCells = rowTemp.length - maxCol;
            if (posNewLine === 0) {
              if (exceedCells > 0) {
                maxCol = rowTemp.length;
              }
              // push new line
              rows.push(rowTemp);
              rowTemp = [];
              rowTemp.push(ic.replace(/\n/g, ""));
            } else {
              // is a cell at the end of a row
              rowTemp.push(ic.replace(/\n/g, ""));
              if (exceedCells > 0) {
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
        const parsed = cell.match(/^".+\n.+"$/g)[0].replace(/(^")|("$)/g, "");
        rowTemp.push(parsed);
      } else {
        if (cell.indexOf("\n") !== -1) {
          // has newline
          const split = cell.split("\n");
          // add col to row
          rowTemp.push(split[0]);
          const exceedCells = rowTemp.length - maxCol;
          if (exceedCells > 0) {
            maxCol = rowTemp.length;
          }
          // push a complete row to collection
          rows.push(rowTemp);
          // reset row temp with the next split string as the first col
          rowTemp = [split[1]];
        } else {
          rowTemp.push(cell);
        }
      }
    }
  });
  const exceedCells = rowTemp.length - maxCol;
  if (rowTemp.length > 0 && rowTemp.length !== 1 && maxCol !== 1) {
    if (exceedCells > 0) {
      maxCol = rowTemp.length;
    }
    rows.push(rowTemp);
  }

  function fillEmptyCells(numberOfCells: number = 0) {
    const emptyCells: string[] = [];
    for (let i = 0; i < numberOfCells; i++) {
      emptyCells.push("");
    }
    return emptyCells;
  }

  console.log(rows);
  return rows.map((cells) => {
    if (cells.length < maxCol) {
      cells.push(...fillEmptyCells(maxCol - cells.length));
    }
    return cells;
  });
}