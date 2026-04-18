function utf16toEntities(str) {
    const patt = /[\ud800-\udbff][\udc00-\udfff]/g;
    str = str.replace(patt, (char) => {
        let H;
        let L;
        let code;
        let s;

        if (char.length === 2) {
            H = char.charCodeAt(0);
            L = char.charCodeAt(1);
            code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00;
            s = `&#${code};`;
        } else {
            s = char;
        }

        return s;
    });

    return str;
}

function entitiestoUtf16(strObj) {
    const patt = /&#\d+;/g;
    const arr = strObj.match(patt) || [];

    let H;
    let L;
    let code;

    for (let i = 0; i < arr.length; i += 1) {
        code = arr[i];
        code = code.replace('&#', '').replace(';', '');
        H = Math.floor((code - 0x10000) / 0x400) + 0xD800;
        L = ((code - 0x10000) % 0x400) + 0xDC00;
        code = `&#${code};`;
        const s = String.fromCharCode(H, L);
        strObj = strObj.replace(code, s);
    }
    return strObj;
}

module.exports = {
    utf16toEntities,
    entitiestoUtf16
};
