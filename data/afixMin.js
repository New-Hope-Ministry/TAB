// Fix minified text
// :abcdefghijklmnopqrstuvwxyz
// :ABCDEFGHIJKLMNOPQRSTUVWXYZ
// [\u200B\u200C\u200D\u200E\u200F\uFEFF\u2028\u2029]

const fs = require('fs');
var versions = [
    {
        "ar": "ALB",
        "id": 1,
        "lid": 1,
        "rdl": 0,
        "sch": 1,
        "t": "Albanian Bible Shqip Bibla"
    },
    {
        "ar": "AVD",
        "id": 2,
        "lid": 2,
        "rdl": 0,
        "sch": 0,
        "t": "Arabic Smith Van Dyke (العربية)"
    },
    {
        "ar": "CUS",
        "id": 3,
        "lid": 7,
        "rdl": 0,
        "sch": 0,
        "t": "Chinese Union (Simplified)"
    },
    {
        "ar": "CUSS",
        "id": 4,
        "lid": 7,
        "rdl": 0,
        "sch": 0,
        "t": "Chinese Union (Simplified) w/Strong's - 中國聯合會（簡體）Zhōngguó liánhé huì (jiǎntǐ)"
    },
    {
        "ar": "CUT",
        "id": 5,
        "lid": 11,
        "rdl": 0,
        "sch": 0,
        "t": "Chinese Union (Traditional)"
    },
    {
        "ar": "CUTS",
        "id": 6,
        "lid": 11,
        "rdl": 0,
        "sch": 0,
        "t": "Chinese Union (Traditional) w/Strong's - 繁体中文聯合 Fántǐ zhōngwén liánhé"
    },
    {
        "ar": "CZK",
        "id": 7,
        "lid": 18,
        "rdl": 0,
        "sch": 1,
        "t": "Czech Bible Kralicka"
    },
    {
        "ar": "DSV",
        "id": 8,
        "lid": 22,
        "rdl": 0,
        "sch": 1,
        "t": "Dutch Staten Vertaling Statenbijbel"
    },
    {
        "ar": "AKJ",
        "id": 9,
        "lid": 34,
        "rdl": 0,
        "sch": 1,
        "t": "American King James Version"
    },
    {
        "ar": "ASV",
        "id": 10,
        "lid": 34,
        "rdl": 0,
        "sch": 1,
        "t": "American Standard Version"
    },
    {
        "ar": "ASVS",
        "id": 11,
        "lid": 34,
        "rdl": 0,
        "sch": 1,
        "t": "American Standard Version w/Strong's"
    },
    {
        "ar": "AKV",
        "id": 12,
        "lid": 34,
        "rdl": 0,
        "sch": 1,
        "t": "Authorized King James Version"
    },
    {
        "ar": "BSB",
        "id": 13,
        "lid": 34,
        "rdl": 0,
        "sch": 1,
        "t": "Berean Standard Bible"
    },
    {
        "ar": "BBE",
        "id": 14,
        "lid": 34,
        "rdl": 0,
        "sch": 1,
        "t": "Bible in Basic English"
    },
    {
        "ar": "DBY",
        "id": 15,
        "lid": 34,
        "rdl": 0,
        "sch": 1,
        "t": "Darby English Bible"
    },
    {
        "ar": "DRB",
        "id": 16,
        "lid": 34,
        "rdl": 0,
        "sch": 1,
        "t": "Douay-Rheims Bible"
    },
    {
        "ar": "ERV",
        "id": 17,
        "lid": 34,
        "rdl": 0,
        "sch": 1,
        "t": "English Revised Version"
    },
    {
        "ar": "FBV",
        "id": 18,
        "lid": 34,
        "rdl": 0,
        "sch": 1,
        "t": "Free Bible Version"
    },
    {
        "ar": "KJV",
        "id": 19,
        "lid": 34,
        "rdl": 0,
        "sch": 1,
        "t": "King James Version"
    },
    {
        "ar": "KJVS",
        "id": 20,
        "lid": 34,
        "rdl": 0,
        "sch": 1,
        "t": "King James Version w/Strong's"
    },
    {
        "ar": "LSV",
        "id": 21,
        "lid": 34,
        "rdl": 0,
        "sch": 1,
        "t": "Literal Standard Version"
    },
    {
        "ar": "NWB",
        "id": 22,
        "lid": 34,
        "rdl": 0,
        "sch": 1,
        "t": "Noah Webster's Bible"
    },
    {
        "ar": "SLT",
        "id": 23,
        "lid": 34,
        "rdl": 0,
        "sch": 1,
        "t": "Smith's Literal Translation"
    },
    {
        "ar": "T4T",
        "id": 24,
        "lid": 34,
        "rdl": 0,
        "sch": 1,
        "t": "Translation for Translators"
    },
    {
        "ar": "TWF",
        "id": 25,
        "lid": 34,
        "rdl": 1,
        "sch": 1,
        "t": "Twenty-First Century Version"
    },
    {
        "ar": "ULB",
        "id": 26,
        "lid": 34,
        "rdl": 0,
        "sch": 1,
        "t": "Unlocked Literal Bible"
    },
    {
        "ar": "WEB",
        "id": 27,
        "lid": 34,
        "rdl": 0,
        "sch": 1,
        "t": "World English Bible"
    },
    {
        "ar": "YLT",
        "id": 28,
        "lid": 34,
        "rdl": 0,
        "sch": 1,
        "t": "Young's Literal Translation"
    },
    {
        "ar": "FIN",
        "id": 29,
        "lid": 35,
        "rdl": 0,
        "sch": 1,
        "t": "Finnish Bible Version (1776) Biblia Vanha kirkkoraamattu"
    },
    {
        "ar": "FLB",
        "id": 30,
        "lid": 38,
        "rdl": 0,
        "sch": 1,
        "t": "French La Bible de l'Épée (2005)"
    },
    {
        "ar": "FLS",
        "id": 31,
        "lid": 38,
        "rdl": 0,
        "sch": 1,
        "t": "French Louis Segond Version (1910)"
    },
    {
        "ar": "FMT",
        "id": 32,
        "lid": 38,
        "rdl": 0,
        "sch": 1,
        "t": "French Martin Version (1744)"
    },
    {
        "ar": "FOS",
        "id": 33,
        "lid": 38,
        "rdl": 0,
        "sch": 1,
        "t": "French Ostervald Version (1996)"
    },
    {
        "ar": "GEL",
        "id": 34,
        "lid": 42,
        "rdl": 0,
        "sch": 1,
        "t": "German Elberfelder Version (1871)"
    },
    {
        "ar": "GER",
        "id": 35,
        "lid": 42,
        "rdl": 0,
        "sch": 1,
        "t": "German Elberfelder Version (1905)"
    },
    {
        "ar": "GLB",
        "id": 36,
        "lid": 42,
        "rdl": 0,
        "sch": 1,
        "t": "German Luther Bible (1545)"
    },
    {
        "ar": "GLU",
        "id": 37,
        "lid": 42,
        "rdl": 0,
        "sch": 1,
        "t": "German Luther Bible (1912)"
    },
    {
        "ar": "GSH",
        "id": 38,
        "lid": 42,
        "rdl": 0,
        "sch": 1,
        "t": "German Schlachter Bibel (1951)"
    },
    {
        "ar": "HIR",
        "id": 39,
        "lid": 48,
        "rdl": 0,
        "sch": 0,
        "t": "Hindi Indian Revised Version (2017/2018)"
    },
    {
        "ar": "HKV",
        "id": 40,
        "lid": 49,
        "rdl": 0,
        "sch": 1,
        "t": "Hungarian Karoli Version"
    },
    {
        "ar": "ITB",
        "id": 41,
        "lid": 52,
        "rdl": 0,
        "sch": 1,
        "t": "Indonesian Terjemahan Baru (1994)"
    },
    {
        "ar": "ITL",
        "id": 42,
        "lid": 52,
        "rdl": 0,
        "sch": 1,
        "t": "Indonesian Terjemahan Lama"
    },
    {
        "ar": "ITV",
        "id": 43,
        "lid": 53,
        "rdl": 0,
        "sch": 1,
        "t": "Italian Diodati Version (1649)"
    },
    {
        "ar": "JBY",
        "id": 44,
        "lid": 54,
        "rdl": 0,
        "sch": 0,
        "t": "Japanese Bungo-yaku: Taisho-kaiyaku (NT) (1950), Meiji-yaku (OT) (1950/1953)"
    },
    {
        "ar": "JKY",
        "id": 45,
        "lid": 54,
        "rdl": 0,
        "sch": 0,
        "t": "Japanese Kougo-yaku (1954/1955)"
    },
    {
        "ar": "KBQ",
        "id": 46,
        "lid": 55,
        "rdl": 0,
        "sch": 1,
        "t": "Kamano-Kafe Bible"
    },
    {
        "ar": "KBV",
        "id": 47,
        "lid": 58,
        "rdl": 0,
        "sch": 0,
        "t": "Korean Bible Version"
    },
    {
        "ar": "MAO",
        "id": 48,
        "lid": 62,
        "rdl": 0,
        "sch": 1,
        "t": "Maori Bible Version Te Paipera Tapu"
    },
    {
        "ar": "BBB",
        "id": 49,
        "lid": 68,
        "rdl": 0,
        "sch": 1,
        "t": "Bishop's Bible"
    },
    {
        "ar": "CBV",
        "id": 50,
        "lid": 68,
        "rdl": 0,
        "sch": 1,
        "t": "Coverdale Bible"
    },
    {
        "ar": "GNV",
        "id": 51,
        "lid": 68,
        "rdl": 0,
        "sch": 1,
        "t": "Geneva Bible"
    },
    {
        "ar": "OPT",
        "id": 52,
        "lid": 70,
        "rdl": 0,
        "sch": 0,
        "t": "Old Persian Translation (1895)"
    },
    {
        "ar": "PBN",
        "id": 53,
        "lid": 72,
        "rdl": 0,
        "sch": 1,
        "t": "Polish NOWEJ BIBLII GDANSKIEJ (2012)"
    },
    {
        "ar": "PBV",
        "id": 54,
        "lid": 72,
        "rdl": 0,
        "sch": 1,
        "t": "Polska Biblia Gdanska (1881)"
    },
    {
        "ar": "PTB",
        "id": 55,
        "lid": 73,
        "rdl": 0,
        "sch": 1,
        "t": "Portuguese Biblia Livre"
    },
    {
        "ar": "PTA",
        "id": 56,
        "lid": 73,
        "rdl": 0,
        "sch": 1,
        "t": "Portuguese Tradução de João Ferreira de Almeida (Versão Revista e Atualizada)"
    },
    {
        "ar": "PTC",
        "id": 57,
        "lid": 73,
        "rdl": 0,
        "sch": 1,
        "t": "Portuguese Tradução de João Ferreira de Almeida Revista e Corrigida"
    },
    {
        "ar": "RCV",
        "id": 58,
        "lid": 77,
        "rdl": 0,
        "sch": 1,
        "t": "Romanian Cornilescu Version"
    },
    {
        "ar": "RSB",
        "id": 59,
        "lid": 78,
        "rdl": 0,
        "sch": 0,
        "t": "Russian Synodal Bible (1876)"
    },
    {
        "ar": "SRV",
        "id": 60,
        "lid": 84,
        "rdl": 0,
        "sch": 1,
        "t": "Spanish Reina Valera (1909)"
    },
    {
        "ar": "SRG",
        "id": 61,
        "lid": 84,
        "rdl": 0,
        "sch": 1,
        "t": "Spanish Reina Valera Gómez (2004)"
    },
    {
        "ar": "SRZ",
        "id": 62,
        "lid": 84,
        "rdl": 0,
        "sch": 1,
        "t": "Spanish Reina Valera Gómez (2010)"
    },
    {
        "ar": "SRVS",
        "id": 63,
        "lid": 84,
        "rdl": 0,
        "sch": 1,
        "t": "Spanish Reina Valera w/Strong's - Reina Valera española (1909)"
    },
    {
        "ar": "SSE",
        "id": 64,
        "lid": 84,
        "rdl": 0,
        "sch": 1,
        "t": "Spanish Sagradas Escrituras (1569)"
    },
    {
        "ar": "TAB",
        "id": 65,
        "lid": 91,
        "rdl": 0,
        "sch": 1,
        "t": "Tagalog Ang Biblia (1905)"
    },
    {
        "ar": "TVB",
        "id": 66,
        "lid": 95,
        "rdl": 0,
        "sch": 1,
        "t": "Turkish Bible Version"
    },
    {
        "ar": "VCV",
        "id": 67,
        "lid": 99,
        "rdl": 0,
        "sch": 1,
        "t": "Vietnamese Cadman Version (1934)"
    }
];
//const idx =24; // TWF = 24
const idx = versions.findIndex(rec => rec.ar === 'TWF');
const abr= versions[idx].ar;
const fileName = `data\\${abr}\\${abr}Verses.json`;
const data = fs.readFileSync(fileName, 'utf8');
const jsonData = JSON.parse(data);

for (const item of jsonData) {
    item.vt = item.vt.replace(":a", ': a');
    item.vt = item.vt.replace(":b", ': b');
    item.vt = item.vt.replace(":c", ': c');
    item.vt = item.vt.replace(":d", ': d');
    item.vt = item.vt.replace(":e", ': e');
    item.vt = item.vt.replace(":f", ': f');
    item.vt = item.vt.replace(":g", ': g');
    item.vt = item.vt.replace(":h", ': h');
    item.vt = item.vt.replace(":i", ': i');
    item.vt = item.vt.replace(":j", ': j');
    item.vt = item.vt.replace(":k", ': k');
    item.vt = item.vt.replace(":l", ': l');
    item.vt = item.vt.replace(":m", ': m');
    item.vt = item.vt.replace(":n", ': n');
    item.vt = item.vt.replace(":o", ': o');
    item.vt = item.vt.replace(":p", ': p');
    item.vt = item.vt.replace(":q", ': q');
    item.vt = item.vt.replace(":r", ': r');
    item.vt = item.vt.replace(":s", ': s');
    item.vt = item.vt.replace(":t", ': t');
    item.vt = item.vt.replace(":u", ': u');
    item.vt = item.vt.replace(":v", ': v');
    item.vt = item.vt.replace(":w", ': w');
    item.vt = item.vt.replace(":x", ': x');
    item.vt = item.vt.replace(":y", ': y');
    item.vt = item.vt.replace(":z", ': z');
    item.vt = item.vt.replace(":A", ': A');
    item.vt = item.vt.replace(":B", ': B');
    item.vt = item.vt.replace(":C", ': C');
    item.vt = item.vt.replace(":D", ': D');
    item.vt = item.vt.replace(":E", ': E');
    item.vt = item.vt.replace(":F", ': F');
    item.vt = item.vt.replace(":G", ': G');
    item.vt = item.vt.replace(":H", ': H');
    item.vt = item.vt.replace(":I", ': I');
    item.vt = item.vt.replace(":J", ': J');
    item.vt = item.vt.replace(":K", ': K');
    item.vt = item.vt.replace(":L", ': L');
    item.vt = item.vt.replace(":M", ': M');
    item.vt = item.vt.replace(":N", ': N');
    item.vt = item.vt.replace(":O", ': O');
    item.vt = item.vt.replace(":P", ': P');
    item.vt = item.vt.replace(":Q", ': Q');
    item.vt = item.vt.replace(":R", ': R');
    item.vt = item.vt.replace(":S", ': S');
    item.vt = item.vt.replace(":T", ': T');
    item.vt = item.vt.replace(":U", ': U');
    item.vt = item.vt.replace(":V", ': V');
    item.vt = item.vt.replace(":W", ': W');
    item.vt = item.vt.replace(":X", ': X');
    item.vt = item.vt.replace(":Y", ': Y');
    item.vt = item.vt.replace(":Z", ': Z');

    item.vt = item.vt.replace(",\"a", ",\" a");
    item.vt = item.vt.replace(",\"b", ",\" b");
    item.vt = item.vt.replace(",\"c", ",\" c");
    item.vt = item.vt.replace(",\"d", ",\" d");
    item.vt = item.vt.replace(",\"e", ",\" e");
    item.vt = item.vt.replace(",\"f", ",\" f");
    item.vt = item.vt.replace(",\"g", ",\" g");
    item.vt = item.vt.replace(",\"h", ",\" h");
    item.vt = item.vt.replace(",\"i", ",\" i");
    item.vt = item.vt.replace(",\"j", ",\" j");
    item.vt = item.vt.replace(",\"k", ",\" k");
    item.vt = item.vt.replace(",\"l", ",\" l");
    item.vt = item.vt.replace(",\"m", ",\" m");
    item.vt = item.vt.replace(",\"n", ",\" n");
    item.vt = item.vt.replace(",\"o", ",\" o");
    item.vt = item.vt.replace(",\"p", ",\" p");
    item.vt = item.vt.replace(",\"q", ",\" q");
    item.vt = item.vt.replace(",\"r", ",\" r");
    item.vt = item.vt.replace(",\"s", ",\" s");
    item.vt = item.vt.replace(",\"t", ",\" t");
    item.vt = item.vt.replace(",\"u", ",\" u");
    item.vt = item.vt.replace(",\"v", ",\" v");
    item.vt = item.vt.replace(",\"w", ",\" w");
    item.vt = item.vt.replace(",\"x", ",\" x");
    item.vt = item.vt.replace(",\"y", ",\" y");
    item.vt = item.vt.replace(",\"z", ",\" z");
    item.vt = item.vt.replace(",\"A", ",\" A");
    item.vt = item.vt.replace(",\"B", ",\" B");
    item.vt = item.vt.replace(",\"C", ",\" C");
    item.vt = item.vt.replace(",\"D", ",\" D");
    item.vt = item.vt.replace(",\"E", ",\" E");
    item.vt = item.vt.replace(",\"F", ",\" F");
    item.vt = item.vt.replace(",\"G", ",\" G");
    item.vt = item.vt.replace(",\"H", ",\" H");
    item.vt = item.vt.replace(",\"I", ",\" I");
    item.vt = item.vt.replace(",\"J", ",\" J");
    item.vt = item.vt.replace(",\"K", ",\" K");
    item.vt = item.vt.replace(",\"L", ",\" L");
    item.vt = item.vt.replace(",\"M", ",\" M");
    item.vt = item.vt.replace(",\"N", ",\" N");
    item.vt = item.vt.replace(",\"O", ",\" O");
    item.vt = item.vt.replace(",\"P", ",\" P");
    item.vt = item.vt.replace(",\"Q", ",\" Q");
    item.vt = item.vt.replace(",\"R", ",\" R");
    item.vt = item.vt.replace(",\"S", ",\" S");
    item.vt = item.vt.replace(",\"T", ",\" T");
    item.vt = item.vt.replace(",\"U", ",\" U");
    item.vt = item.vt.replace(",\"V", ",\" V");
    item.vt = item.vt.replace(",\"W", ",\" W");
    item.vt = item.vt.replace(",\"X", ",\" X");
    item.vt = item.vt.replace(",\"Y", ",\" Y");
    item.vt = item.vt.replace(",\"Z", ",\" Z");

    item.vt = item.vt.replace(".\"a", ".\" a");
    item.vt = item.vt.replace(".\"b", ".\" b");
    item.vt = item.vt.replace(".\"c", ".\" c");
    item.vt = item.vt.replace(".\"d", ".\" d");
    item.vt = item.vt.replace(".\"e", ".\" e");
    item.vt = item.vt.replace(".\"f", ".\" f");
    item.vt = item.vt.replace(".\"g", ".\" g");
    item.vt = item.vt.replace(".\"h", ".\" h");
    item.vt = item.vt.replace(".\"i", ".\" i");
    item.vt = item.vt.replace(".\"j", ".\" j");
    item.vt = item.vt.replace(".\"k", ".\" k");
    item.vt = item.vt.replace(".\"l", ".\" l");
    item.vt = item.vt.replace(".\"m", ".\" m");
    item.vt = item.vt.replace(".\"n", ".\" n");
    item.vt = item.vt.replace(".\"o", ".\" o");
    item.vt = item.vt.replace(".\"p", ".\" p");
    item.vt = item.vt.replace(".\"q", ".\" q");
    item.vt = item.vt.replace(".\"r", ".\" r");
    item.vt = item.vt.replace(".\"s", ".\" s");
    item.vt = item.vt.replace(".\"t", ".\" t");
    item.vt = item.vt.replace(".\"u", ".\" u");
    item.vt = item.vt.replace(".\"v", ".\" v");
    item.vt = item.vt.replace(".\"w", ".\" w");
    item.vt = item.vt.replace(".\"x", ".\" x");
    item.vt = item.vt.replace(".\"y", ".\" y");
    item.vt = item.vt.replace(".\"z", ".\" z");
    item.vt = item.vt.replace(".\"A", ".\" A");
    item.vt = item.vt.replace(".\"B", ".\" B");
    item.vt = item.vt.replace(".\"C", ".\" C");
    item.vt = item.vt.replace(".\"D", ".\" D");
    item.vt = item.vt.replace(".\"E", ".\" E");
    item.vt = item.vt.replace(".\"F", ".\" F");
    item.vt = item.vt.replace(".\"G", ".\" G");
    item.vt = item.vt.replace(".\"H", ".\" H");
    item.vt = item.vt.replace(".\"I", ".\" I");
    item.vt = item.vt.replace(".\"J", ".\" J");
    item.vt = item.vt.replace(".\"K", ".\" K");
    item.vt = item.vt.replace(".\"L", ".\" L");
    item.vt = item.vt.replace(".\"M", ".\" M");
    item.vt = item.vt.replace(".\"N", ".\" N");
    item.vt = item.vt.replace(".\"O", ".\" O");
    item.vt = item.vt.replace(".\"P", ".\" P");
    item.vt = item.vt.replace(".\"Q", ".\" Q");
    item.vt = item.vt.replace(".\"R", ".\" R");
    item.vt = item.vt.replace(".\"S", ".\" S");
    item.vt = item.vt.replace(".\"T", ".\" T");
    item.vt = item.vt.replace(".\"U", ".\" U");
    item.vt = item.vt.replace(".\"V", ".\" V");
    item.vt = item.vt.replace(".\"W", ".\" W");
    item.vt = item.vt.replace(".\"X", ".\" X");
    item.vt = item.vt.replace(".\"Y", ".\" Y");
    item.vt = item.vt.replace(".\"Z", ".\" Z");

    item.vt = item.vt.replace("?\"a", "?\" a");
    item.vt = item.vt.replace("?\"b", "?\" b");
    item.vt = item.vt.replace("?\"c", "?\" c");
    item.vt = item.vt.replace("?\"d", "?\" d");
    item.vt = item.vt.replace("?\"e", "?\" e");
    item.vt = item.vt.replace("?\"f", "?\" f");
    item.vt = item.vt.replace("?\"g", "?\" g");
    item.vt = item.vt.replace("?\"h", "?\" h");
    item.vt = item.vt.replace("?\"i", "?\" i");
    item.vt = item.vt.replace("?\"j", "?\" j");
    item.vt = item.vt.replace("?\"k", "?\" k");
    item.vt = item.vt.replace("?\"l", "?\" l");
    item.vt = item.vt.replace("?\"m", "?\" m");
    item.vt = item.vt.replace("?\"n", "?\" n");
    item.vt = item.vt.replace("?\"o", "?\" o");
    item.vt = item.vt.replace("?\"p", "?\" p");
    item.vt = item.vt.replace("?\"q", "?\" q");
    item.vt = item.vt.replace("?\"r", "?\" r");
    item.vt = item.vt.replace("?\"s", "?\" s");
    item.vt = item.vt.replace("?\"t", "?\" t");
    item.vt = item.vt.replace("?\"u", "?\" u");
    item.vt = item.vt.replace("?\"v", "?\" v");
    item.vt = item.vt.replace("?\"w", "?\" w");
    item.vt = item.vt.replace("?\"x", "?\" x");
    item.vt = item.vt.replace("?\"y", "?\" y");
    item.vt = item.vt.replace("?\"z", "?\" z");
    item.vt = item.vt.replace("?\"A", "?\" A");
    item.vt = item.vt.replace("?\"B", "?\" B");
    item.vt = item.vt.replace("?\"C", "?\" C");
    item.vt = item.vt.replace("?\"D", "?\" D");
    item.vt = item.vt.replace("?\"E", "?\" E");
    item.vt = item.vt.replace("?\"F", "?\" F");
    item.vt = item.vt.replace("?\"G", "?\" G");
    item.vt = item.vt.replace("?\"H", "?\" H");
    item.vt = item.vt.replace("?\"I", "?\" I");
    item.vt = item.vt.replace("?\"J", "?\" J");
    item.vt = item.vt.replace("?\"K", "?\" K");
    item.vt = item.vt.replace("?\"L", "?\" L");
    item.vt = item.vt.replace("?\"M", "?\" M");
    item.vt = item.vt.replace("?\"N", "?\" N");
    item.vt = item.vt.replace("?\"O", "?\" O");
    item.vt = item.vt.replace("?\"P", "?\" P");
    item.vt = item.vt.replace("?\"Q", "?\" Q");
    item.vt = item.vt.replace("?\"R", "?\" R");
    item.vt = item.vt.replace("?\"S", "?\" S");
    item.vt = item.vt.replace("?\"T", "?\" T");
    item.vt = item.vt.replace("?\"U", "?\" U");
    item.vt = item.vt.replace("?\"V", "?\" V");
    item.vt = item.vt.replace("?\"W", "?\" W");
    item.vt = item.vt.replace("?\"X", "?\" X");
    item.vt = item.vt.replace("?\"Y", "?\" Y");
    item.vt = item.vt.replace("?\"Z", "?\" Z");

    item.vt = item.vt.replace("!\"a", "!\" a");
    item.vt = item.vt.replace("!\"b", "!\" b");
    item.vt = item.vt.replace("!\"c", "!\" c");
    item.vt = item.vt.replace("!\"d", "!\" d");
    item.vt = item.vt.replace("!\"e", "!\" e");
    item.vt = item.vt.replace("!\"f", "!\" f");
    item.vt = item.vt.replace("!\"g", "!\" g");
    item.vt = item.vt.replace("!\"h", "!\" h");
    item.vt = item.vt.replace("!\"i", "!\" i");
    item.vt = item.vt.replace("!\"j", "!\" j");
    item.vt = item.vt.replace("!\"k", "!\" k");
    item.vt = item.vt.replace("!\"l", "!\" l");
    item.vt = item.vt.replace("!\"m", "!\" m");
    item.vt = item.vt.replace("!\"n", "!\" n");
    item.vt = item.vt.replace("!\"o", "!\" o");
    item.vt = item.vt.replace("!\"p", "!\" p");
    item.vt = item.vt.replace("!\"q", "!\" q");
    item.vt = item.vt.replace("!\"r", "!\" r");
    item.vt = item.vt.replace("!\"s", "!\" s");
    item.vt = item.vt.replace("!\"t", "!\" t");
    item.vt = item.vt.replace("!\"u", "!\" u");
    item.vt = item.vt.replace("!\"v", "!\" v");
    item.vt = item.vt.replace("!\"w", "!\" w");
    item.vt = item.vt.replace("!\"x", "!\" x");
    item.vt = item.vt.replace("!\"y", "!\" y");
    item.vt = item.vt.replace("!\"z", "!\" z");
    item.vt = item.vt.replace("!\"A", "!\" A");
    item.vt = item.vt.replace("!\"B", "!\" B");
    item.vt = item.vt.replace("!\"C", "!\" C");
    item.vt = item.vt.replace("!\"D", "!\" D");
    item.vt = item.vt.replace("!\"E", "!\" E");
    item.vt = item.vt.replace("!\"F", "!\" F");
    item.vt = item.vt.replace("!\"G", "!\" G");
    item.vt = item.vt.replace("!\"H", "!\" H");
    item.vt = item.vt.replace("!\"I", "!\" I");
    item.vt = item.vt.replace("!\"J", "!\" J");
    item.vt = item.vt.replace("!\"K", "!\" K");
    item.vt = item.vt.replace("!\"L", "!\" L");
    item.vt = item.vt.replace("!\"M", "!\" M");
    item.vt = item.vt.replace("!\"N", "!\" N");
    item.vt = item.vt.replace("!\"O", "!\" O");
    item.vt = item.vt.replace("!\"P", "!\" P");
    item.vt = item.vt.replace("!\"Q", "!\" Q");
    item.vt = item.vt.replace("!\"R", "!\" R");
    item.vt = item.vt.replace("!\"S", "!\" S");
    item.vt = item.vt.replace("!\"T", "!\" T");
    item.vt = item.vt.replace("!\"U", "!\" U");
    item.vt = item.vt.replace("!\"V", "!\" V");
    item.vt = item.vt.replace("!\"W", "!\" W");
    item.vt = item.vt.replace("!\"X", "!\" X");
    item.vt = item.vt.replace("!\"Y", "!\" Y");
    item.vt = item.vt.replace("!\"Z", "!\" Z");

    item.vt = item.vt.replace(",´\"a", ",´\" a");
    item.vt = item.vt.replace(",´\"b", ",´\" b");
    item.vt = item.vt.replace(",´\"c", ",´\" c");
    item.vt = item.vt.replace(",´\"d", ",´\" d");
    item.vt = item.vt.replace(",´\"e", ",´\" e");
    item.vt = item.vt.replace(",´\"f", ",´\" f");
    item.vt = item.vt.replace(",´\"g", ",´\" g");
    item.vt = item.vt.replace(",´\"h", ",´\" h");
    item.vt = item.vt.replace(",´\"i", ",´\" i");
    item.vt = item.vt.replace(",´\"j", ",´\" j");
    item.vt = item.vt.replace(",´\"k", ",´\" k");
    item.vt = item.vt.replace(",´\"l", ",´\" l");
    item.vt = item.vt.replace(",´\"m", ",´\" m");
    item.vt = item.vt.replace(",´\"n", ",´\" n");
    item.vt = item.vt.replace(",´\"o", ",´\" o");
    item.vt = item.vt.replace(",´\"p", ",´\" p");
    item.vt = item.vt.replace(",´\"q", ",´\" q");
    item.vt = item.vt.replace(",´\"r", ",´\" r");
    item.vt = item.vt.replace(",´\"s", ",´\" s");
    item.vt = item.vt.replace(",´\"t", ",´\" t");
    item.vt = item.vt.replace(",´\"u", ",´\" u");
    item.vt = item.vt.replace(",´\"v", ",´\" v");
    item.vt = item.vt.replace(",´\"w", ",´\" w");
    item.vt = item.vt.replace(",´\"x", ",´\" x");
    item.vt = item.vt.replace(",´\"y", ",´\" y");
    item.vt = item.vt.replace(",´\"z", ",´\" z");


    item.vt = item.vt.replace("´\"a", "´\" a");
    item.vt = item.vt.replace("´\"b", "´\" b");
    item.vt = item.vt.replace("´\"c", "´\" c");
    item.vt = item.vt.replace("´\"d", "´\" d");
    item.vt = item.vt.replace("´\"e", "´\" e");
    item.vt = item.vt.replace("´\"f", "´\" f");
    item.vt = item.vt.replace("´\"g", "´\" g");
    item.vt = item.vt.replace("´\"h", "´\" h");
    item.vt = item.vt.replace("´\"i", "´\" i");
    item.vt = item.vt.replace("´\"j", "´\" j");
    item.vt = item.vt.replace("´\"k", "´\" k");
    item.vt = item.vt.replace("´\"l", "´\" l");
    item.vt = item.vt.replace("´\"m", "´\" m");
    item.vt = item.vt.replace("´\"n", "´\" n");
    item.vt = item.vt.replace("´\"o", "´\" o");
    item.vt = item.vt.replace("´\"p", "´\" p");
    item.vt = item.vt.replace("´\"q", "´\" q");
    item.vt = item.vt.replace("´\"r", "´\" r");
    item.vt = item.vt.replace("´\"s", "´\" s");
    item.vt = item.vt.replace("´\"t", "´\" t");
    item.vt = item.vt.replace("´\"u", "´\" u");
    item.vt = item.vt.replace("´\"v", "´\" v");
    item.vt = item.vt.replace("´\"w", "´\" w");
    item.vt = item.vt.replace("´\"x", "´\" x");
    item.vt = item.vt.replace("´\"y", "´\" y");
    item.vt = item.vt.replace("´\"z", "´\" z");

    item.vt = item.vt.replace("´\"A", "´\" A");
    item.vt = item.vt.replace("´\"B", "´\" B");
    item.vt = item.vt.replace("´\"C", "´\" C");
    item.vt = item.vt.replace("´\"D", "´\" D");
    item.vt = item.vt.replace("´\"E", "´\" E");
    item.vt = item.vt.replace("´\"F", "´\" F");
    item.vt = item.vt.replace("´\"G", "´\" G");
    item.vt = item.vt.replace("´\"H", "´\" H");
    item.vt = item.vt.replace("´\"I", "´\" I");
    item.vt = item.vt.replace("´\"J", "´\" J");
    item.vt = item.vt.replace("´\"K", "´\" K");
    item.vt = item.vt.replace("´\"L", "´\" L");
    item.vt = item.vt.replace("´\"M", "´\" M");
    item.vt = item.vt.replace("´\"N", "´\" N");
    item.vt = item.vt.replace("´\"O", "´\" O");
    item.vt = item.vt.replace("´\"P", "´\" P");
    item.vt = item.vt.replace("´\"Q", "´\" Q");
    item.vt = item.vt.replace("´\"R", "´\" R");
    item.vt = item.vt.replace("´\"S", "´\" S");
    item.vt = item.vt.replace("´\"T", "´\" T");
    item.vt = item.vt.replace("´\"U", "´\" U");
    item.vt = item.vt.replace("´\"V", "´\" V");
    item.vt = item.vt.replace("´\"W", "´\" W");
    item.vt = item.vt.replace("´\"X", "´\" X");
    item.vt = item.vt.replace("´\"Y", "´\" Y");
    item.vt = item.vt.replace("´\"Z", "´\" Z");

    item.vt = item.vt.replace(":'", ": '");
    item.vt = item.vt.replace(':"', ': "');
    item.vt = item.vt.replace(":‘", ": ‘");
    item.vt = item.vt.replace(":“", ": “");
    item.vt = item.vt.replace("  ", " ");
    item.vt = item.vt.replace("\"\"", "\" \"");
};

try {
    fs.writeFileSync(fileName, JSON.stringify(jsonData));
    console.log(`${abr}: Data written to file!`)
} catch (error) {
    console.log(`Write failed: ${fileName}`, error);
};