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
    ).filter(cells => cells.length > 0)
}

export function splitCells(rows: string[]) {
    const separatedCellsRows = rows.map(
        cells => cells.split(/\t/g)
    );
    return separatedCellsRows;
}