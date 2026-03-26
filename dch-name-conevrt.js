import React, { useState, useMemo } from "react";
import { Copy, Check, RefreshCcw, Trash2, ClipboardList } from "lucide-react";

// Comprehensive list of standard Mandarin Pinyin syllables
const PINYIN_SYLLABLES = [
  "a",
  "ai",
  "an",
  "ang",
  "ao",
  "ba",
  "bai",
  "ban",
  "bang",
  "bao",
  "bei",
  "ben",
  "beng",
  "bi",
  "bian",
  "biao",
  "bie",
  "bin",
  "bing",
  "bo",
  "bu",
  "ca",
  "cai",
  "can",
  "cang",
  "cao",
  "ce",
  "cen",
  "ceng",
  "cha",
  "chai",
  "chan",
  "chang",
  "chao",
  "che",
  "chen",
  "cheng",
  "chi",
  "chong",
  "chou",
  "chu",
  "chua",
  "chuai",
  "chuan",
  "chuang",
  "chui",
  "chun",
  "chuo",
  "ci",
  "cong",
  "cou",
  "cu",
  "cuan",
  "cui",
  "cun",
  "cuo",
  "da",
  "dai",
  "dan",
  "dang",
  "dao",
  "de",
  "dei",
  "den",
  "deng",
  "di",
  "dian",
  "diao",
  "die",
  "ding",
  "diu",
  "dong",
  "dou",
  "du",
  "duan",
  "dui",
  "dun",
  "duo",
  "e",
  "ei",
  "en",
  "er",
  "fa",
  "fan",
  "fang",
  "fei",
  "fen",
  "feng",
  "fo",
  "fou",
  "fu",
  "ga",
  "gai",
  "gan",
  "gang",
  "gao",
  "ge",
  "gei",
  "gen",
  "geng",
  "gong",
  "gou",
  "gu",
  "gua",
  "guai",
  "guan",
  "guang",
  "gui",
  "gun",
  "guo",
  "ha",
  "hai",
  "han",
  "hang",
  "hao",
  "he",
  "hei",
  "hen",
  "heng",
  "hong",
  "hou",
  "hu",
  "hua",
  "huai",
  "huan",
  "huang",
  "hui",
  "hun",
  "huo",
  "ji",
  "jia",
  "jian",
  "jiang",
  "jiao",
  "jie",
  "jin",
  "jing",
  "jiong",
  "jiu",
  "ju",
  "juan",
  "jue",
  "jun",
  "ka",
  "kai",
  "kan",
  "kang",
  "kao",
  "ke",
  "ken",
  "keng",
  "kong",
  "kou",
  "ku",
  "kua",
  "kuai",
  "kuan",
  "kuang",
  "kui",
  "kun",
  "kuo",
  "la",
  "lai",
  "lan",
  "lang",
  "lao",
  "le",
  "lei",
  "leng",
  "li",
  "lia",
  "lian",
  "liang",
  "liao",
  "lie",
  "lin",
  "ling",
  "liu",
  "long",
  "lou",
  "lu",
  "lv",
  "luan",
  "lue",
  "lun",
  "luo",
  "ma",
  "mai",
  "man",
  "mang",
  "mao",
  "me",
  "mei",
  "men",
  "meng",
  "mi",
  "mian",
  "miao",
  "mie",
  "min",
  "ming",
  "miu",
  "mo",
  "mou",
  "mu",
  "na",
  "nai",
  "nan",
  "nang",
  "nao",
  "ne",
  "nei",
  "nen",
  "neng",
  "ni",
  "nian",
  "niang",
  "niao",
  "nie",
  "nin",
  "ning",
  "niu",
  "nong",
  "nou",
  "nu",
  "nv",
  "nuan",
  "nue",
  "nun",
  "nuo",
  "o",
  "ou",
  "pa",
  "pai",
  "pan",
  "pang",
  "pao",
  "pei",
  "pen",
  "peng",
  "pi",
  "pian",
  "piao",
  "pie",
  "pin",
  "ping",
  "po",
  "pou",
  "pu",
  "qi",
  "qia",
  "qian",
  "qiang",
  "qiao",
  "qie",
  "qin",
  "qing",
  "qiong",
  "qiu",
  "qu",
  "quan",
  "que",
  "qun",
  "ran",
  "rang",
  "rao",
  "re",
  "ren",
  "reng",
  "ri",
  "rong",
  "rou",
  "ru",
  "ruan",
  "rui",
  "run",
  "ruo",
  "sa",
  "sai",
  "san",
  "sang",
  "sao",
  "se",
  "sen",
  "seng",
  "sha",
  "shai",
  "shan",
  "shang",
  "shao",
  "she",
  "shei",
  "shen",
  "sheng",
  "shi",
  "shou",
  "shu",
  "shua",
  "shuai",
  "shuan",
  "shuang",
  "shui",
  "shun",
  "shuo",
  "si",
  "song",
  "sou",
  "su",
  "suan",
  "sui",
  "sun",
  "suo",
  "ta",
  "tai",
  "tan",
  "tang",
  "tao",
  "te",
  "teng",
  "ti",
  "tian",
  "tiao",
  "tie",
  "ting",
  "tong",
  "tou",
  "tu",
  "tuan",
  "tui",
  "tun",
  "tuo",
  "wa",
  "wai",
  "wan",
  "wang",
  "wei",
  "wen",
  "weng",
  "wo",
  "wu",
  "xi",
  "xia",
  "xian",
  "xiang",
  "xiao",
  "xie",
  "xin",
  "xing",
  "xiong",
  "xiu",
  "xu",
  "xuan",
  "xue",
  "xun",
  "ya",
  "yan",
  "yang",
  "yao",
  "ye",
  "yi",
  "yin",
  "ying",
  "yo",
  "yong",
  "you",
  "yu",
  "yuan",
  "yue",
  "yun",
  "za",
  "zai",
  "zan",
  "zang",
  "zao",
  "ze",
  "zei",
  "zen",
  "zeng",
  "zha",
  "zhai",
  "zhan",
  "zhang",
  "zhao",
  "zhe",
  "zhei",
  "zhen",
  "zheng",
  "zhi",
  "zhong",
  "zhou",
  "zhu",
  "zhua",
  "zhuai",
  "zhuan",
  "zhuang",
  "zhui",
  "zhun",
  "zhuo",
  "zi",
  "zong",
  "zou",
  "zu",
  "zuan",
  "zui",
  "zun",
  "zuo",
].sort((a, b) => b.length - a.length);

const App = () => {
  const [inputText, setInputText] = useState("");
  const [results, setResults] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const tokenizePinyin = (text) => {
    let remaining = text.toLowerCase().replace(/[^a-z]/g, "");
    const tokens = [];
    while (remaining.length > 0) {
      let found = false;
      for (const syllable of PINYIN_SYLLABLES) {
        if (remaining.startsWith(syllable)) {
          tokens.push(syllable);
          remaining = remaining.slice(syllable.length);
          found = true;
          break;
        }
      }
      if (!found) {
        tokens.push(remaining[0]);
        remaining = remaining.slice(1);
      }
    }
    return tokens;
  };

  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  const processConvert = () => {
    const lines = inputText.split("\n").filter((line) => line.trim() !== "");
    const processed = lines.map((line) => {
      try {
        const parts = line.split(",");
        if (parts.length < 2)
          return { original: line, error: "Invalid format" };

        const rawPinyin = parts[0].trim();
        const chineseName = parts[1].trim();
        const syllables = tokenizePinyin(rawPinyin);

        let surnameSyllable = "";
        let givenNameSyllables = [];

        // Assuming Last Name is the last syllable in the raw string (like yameisong)
        if (syllables.length >= 2) {
          surnameSyllable = syllables[syllables.length - 1];
          givenNameSyllables = syllables.slice(0, syllables.length - 1);
        } else {
          surnameSyllable = syllables[0] || "";
          givenNameSyllables = [];
        }

        const surnameUpper = surnameSyllable.toUpperCase();
        const surnameTitle = capitalize(surnameSyllable);

        // Request 1: Spaced Given Names + UPPERCASE SURNAME
        const givenTitleSpaced = givenNameSyllables
          .map((s) => capitalize(s))
          .join(" ");
        const format1 = `${givenTitleSpaced} ${surnameUpper} (${chineseName})`;

        // Request 2: Surname First + Joined Given Names (CamelCase)
        const givenTitleJoined = givenNameSyllables
          .map((s) => capitalize(s))
          .join("");
        const format2 = `${surnameTitle} ${givenTitleJoined}`;

        return { format1, format2, error: null };
      } catch (err) {
        return { original: line, error: "Processing error" };
      }
    });
    setResults(processed);
  };

  const handleCopy = (type) => {
    const textToCopy = results.map((r) => (r.error ? "" : r[type])).join("\n");
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      setCopiedIndex(type);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
    document.body.removeChild(textArea);
  };

  const clearAll = () => {
    setInputText("");
    setResults([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h1 className="text-2xl font-bold flex items-center gap-3 text-indigo-700">
            <RefreshCcw className="w-8 h-8" />
            Pinyin Name Formatter
          </h1>
          <p className="mt-2 text-slate-500">
            Convert pinyin data from Excel into standardized formats.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-semibold text-slate-600">
              Paste Data (Format:{" "}
              <code className="bg-slate-100 px-1 rounded text-pink-600">
                yameisong,宋亚梅
              </code>
              )
            </label>
            <span className="text-sm text-slate-400 font-medium">
              Total Count:{" "}
              {
                inputText.split("\n").filter((line) => line.trim() !== "")
                  .length
              }
            </span>
          </div>
          <textarea
            className="w-full h-40 p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none resize-none font-mono text-sm bg-slate-50"
            placeholder="yameisong,宋亚梅"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <div className="mt-4 flex gap-3">
            <button
              onClick={processConvert}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
            >
              <ClipboardList className="w-5 h-5" />
              Convert
            </button>
            <button
              onClick={clearAll}
              className="bg-white hover:bg-slate-50 text-slate-400 border border-slate-200 font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {results.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Column 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-700">
                  Format 1: "Ya Mei SONG (宋亚梅)"
                  <span className="ml-2 text-xs font-normal text-slate-400">
                    Total Count: {results.length}
                  </span>
                </h3>
                <button
                  onClick={() => handleCopy("format1")}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    copiedIndex === "format1"
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {copiedIndex === "format1" ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {copiedIndex === "format1" ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-100 p-4 max-h-[400px] overflow-y-auto space-y-2 font-mono text-sm">
                {results.map((res, i) => (
                  <div
                    key={i}
                    className={
                      res.error ? "text-red-400 italic" : "text-slate-700"
                    }
                  >
                    {res.error ? `Error: ${res.error}` : res.format1}
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-700">
                  Format 2: "Song YaMei"
                  <span className="ml-2 text-xs font-normal text-slate-400">
                    Total Count: {results.length}
                  </span>
                </h3>
                <button
                  onClick={() => handleCopy("format2")}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    copiedIndex === "format2"
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {copiedIndex === "format2" ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {copiedIndex === "format2" ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-100 p-4 max-h-[400px] overflow-y-auto space-y-2 font-mono text-sm">
                {results.map((res, i) => (
                  <div
                    key={i}
                    className={
                      res.error ? "text-red-400 italic" : "text-slate-700"
                    }
                  >
                    {res.error ? `Error: ${res.error}` : res.format2}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
