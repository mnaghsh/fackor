(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-calk-calk-module~pages-report-report-module~pages-tracking-tracking-module"],{

/***/ "./node_modules/jalali-moment/jalali-moment.js":
/*!*****************************************************!*\
  !*** ./node_modules/jalali-moment/jalali-moment.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


module.exports = jMoment;

var moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");

/************************************
 Constants
 ************************************/

var formattingTokens = /(\[[^\[]*\])|(\\)?j(Mo|MM?M?M?|Do|DDDo|DD?D?D?|w[o|w]?|YYYYY|YYYY|YY|gg(ggg?)?|)|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g
    , localFormattingTokens = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g
    , parseTokenOneOrTwoDigits = /\d\d?/
    , parseTokenOneToThreeDigits = /\d{1,3}/
    , parseTokenThreeDigits = /\d{3}/
    , parseTokenFourDigits = /\d{1,4}/
    , parseTokenSixDigits = /[+\-]?\d{1,6}/
    , parseTokenWord = /[0-9]*["a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i
    , parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/i
    , parseTokenT = /T/i
    , parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/

    , unitAliases = {
        jm: "jmonth"
        , jmonths: "jmonth"
        , jy: "jyear"
        , jyears: "jyear"
    }

    , formatFunctions = {}

    , ordinalizeTokens = "DDD w M D".split(" ")
    , paddedTokens = "M D w".split(" ");

var formatTokenFunctions = {
    jM: function () {
        return this.jMonth() + 1;
    },
    jMMM: function (format) {
        return this.localeData().jMonthsShort(this, format);
    },
    jMMMM: function (format) {
        return this.localeData().jMonths(this, format);
    },
    jD: function () {
        return this.jDate();
    },
    jDDD: function () {
        return this.jDayOfYear();
    },
    jw: function () {
        return this.jWeek();
    },
    jYY: function () {
        return leftZeroFill(this.jYear() % 100, 2);
    },
    jYYYY: function () {
        return leftZeroFill(this.jYear(), 4);
    },
    jYYYYY: function () {
        return leftZeroFill(this.jYear(), 5);
    },
    jgg: function () {
        return leftZeroFill(this.jWeekYear() % 100, 2);
    },
    jgggg: function () {
        return this.jWeekYear();
    },
    jggggg: function () {
        return leftZeroFill(this.jWeekYear(), 5);
    }
};

function padToken(func, count) {
    return function (a) {
        return leftZeroFill(func.call(this, a), count);
    };
}
function ordinalizeToken(func, period) {
    return function (a) {
        return this.localeData().ordinal(func.call(this, a), period);
    };
}

(function () {
    var i;
    while (ordinalizeTokens.length) {
        i = ordinalizeTokens.pop();
        formatTokenFunctions["j" + i + "o"] = ordinalizeToken(formatTokenFunctions["j" + i], i);
    }
    while (paddedTokens.length) {
        i = paddedTokens.pop();
        formatTokenFunctions["j" + i + i] = padToken(formatTokenFunctions["j" + i], 2);
    }
    formatTokenFunctions.jDDDD = padToken(formatTokenFunctions.jDDD, 3);
}());

/************************************
 Helpers
 ************************************/

function extend(a, b) {
    var key;
    for (key in b)
        if (b.hasOwnProperty(key)){
            a[key] = b[key];
        }
    return a;
}

/**
 * return a string which length is as much as you need
 * @param {number} number input
 * @param {number} targetLength expected length
 * @example leftZeroFill(5,2) => 05
 **/
function leftZeroFill(number, targetLength) {
    var output = number + "";
    while (output.length < targetLength){
        output = "0" + output;
    }
    return output;
}

/**
 * determine object is array or not
 * @param input
 **/
function isArray(input) {
    return Object.prototype.toString.call(input) === "[object Array]";
}

/**
 * Changes any moment Gregorian format to Jalali system format
 * @param {string} format
 * @example toJalaliFormat("YYYY/MMM/DD") => "jYYYY/jMMM/jDD"
 **/
function toJalaliFormat(format) {
    for (var i = 0; i < format.length; i++) {
        if(!i || (format[i-1] !== "j" && format[i-1] !== format[i])) {
            if (format[i] === "Y" || format[i] === "M" || format[i] === "D" || format[i] === "g") {
                format = format.slice(0, i) + "j" + format.slice(i);
            }
        }
    }
    return format;
}

/**
 * Changes any moment Gregorian units to Jalali system units
 * @param {string} units
 * @example toJalaliUnit("YYYY/MMM/DD") => "jYYYY/jMMM/jDD"
 **/
function toJalaliUnit(units) {
    switch (units) {
        case "year" : return "jYear";
        case "month" : return "jMonth";
        case "months" : return "jMonths";
        case "monthName" : return "jMonthsShort";
        case "monthsShort" : return "jMonthsShort";
    }
    return units;
}

/**
 * normalize units to be comparable
 * @param {string} units
 **/
function normalizeUnits(units, momentObj) {
    if (isJalali(momentObj)) {
        units = toJalaliUnit(units);
    }
    if (units) {
        var lowered = units.toLowerCase();
        units = unitAliases[lowered] || lowered;
    }
    // TODO : add unit test
    if (units === "jday") units = "day";
    else if (units === "jd") units = "d";
    return units;
}

/**
 * set a gregorian date to moment object
 * @param {string} momentInstance
 * @param {string} year in gregorian system
 * @param {string} month in gregorian system
 * @param {string} day in gregorian system
 **/
function setDate(momentInstance, year, month, day) {
    var d = momentInstance._d;
    if (momentInstance._isUTC) {
        /*eslint-disable new-cap*/
        momentInstance._d = new Date(Date.UTC(year, month, day,
            d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds()));
        /*eslint-enable new-cap*/
    } else {
        momentInstance._d = new Date(year, month, day,
            d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
    }
}

function objectCreate(parent) {
    function F() {}
    F.prototype = parent;
    return new F();
}

function getPrototypeOf(object) {
    if (Object.getPrototypeOf){
        return Object.getPrototypeOf(object);
    }
    else if ("".__proto__){
        return object.__proto__;
    }
    else{
        return object.constructor.prototype;
    }
}

/************************************
 Languages
 ************************************/
extend(getPrototypeOf(moment.localeData()),
    { _jMonths: [ "Farvardin"
        , "Ordibehesht"
        , "Khordaad"
        , "Tir"
        , "Mordaad"
        , "Shahrivar"
        , "Mehr"
        , "Aabaan"
        , "Aazar"
        , "Dey"
        , "Bahman"
        , "Esfand"
    ]
        , jMonths: function (m) {
            if (m) {
                return this._jMonths[m.jMonth()];
            } else {
                return this._jMonths;
            }
    }

        , _jMonthsShort:  [ "Far"
        , "Ord"
        , "Kho"
        , "Tir"
        , "Amo"
        , "Sha"
        , "Meh"
        , "Aab"
        , "Aaz"
        , "Dey"
        , "Bah"
        , "Esf"
    ]
        , jMonthsShort: function (m) {
        if (m) {
            return this._jMonthsShort[m.jMonth()];
        } else {
            return this._jMonthsShort;
        }
    }

        , jMonthsParse: function (monthName) {
        var i
            , mom
            , regex;
        if (!this._jMonthsParse){
            this._jMonthsParse = [];
        }
        for (i = 0; i < 12; i += 1) {
            // Make the regex if we don"t have it already.
            if (!this._jMonthsParse[i]) {
                mom = jMoment([2000, (2 + i) % 12, 25]);
                regex = "^" + this.jMonths(mom, "") + "|^" + this.jMonthsShort(mom, "");
                this._jMonthsParse[i] = new RegExp(regex.replace(".", ""), "i");
            }
            // Test the regex.
            if (this._jMonthsParse[i].test(monthName)){
                return i;
            }
        }
    }
    }
);

/************************************
 Formatting
 ************************************/

function makeFormatFunction(format) {
    var array = format.match(formattingTokens)
        , length = array.length
        , i;

    for (i = 0; i < length; i += 1){
        if (formatTokenFunctions[array[i]]){
            array[i] = formatTokenFunctions[array[i]];
        }
    }
    return function (mom) {
        var output = "";
        for (i = 0; i < length; i += 1){
            output += array[i] instanceof Function ? "[" + array[i].call(mom, format) + "]" : array[i];
        }
        return output;
    };
}

/************************************
 Parsing
 ************************************/

function getParseRegexForToken(token, config) {
    switch (token) {
        case "jDDDD":
            return parseTokenThreeDigits;
        case "jYYYY":
            return parseTokenFourDigits;
        case "jYYYYY":
            return parseTokenSixDigits;
        case "jDDD":
            return parseTokenOneToThreeDigits;
        case "jMMM":
        case "jMMMM":
            return parseTokenWord;
        case "jMM":
        case "jDD":
        case "jYY":
        case "jM":
        case "jD":
            return parseTokenOneOrTwoDigits;
        case "DDDD":
            return parseTokenThreeDigits;
        case "YYYY":
            return parseTokenFourDigits;
        case "YYYYY":
            return parseTokenSixDigits;
        case "S":
        case "SS":
        case "SSS":
        case "DDD":
            return parseTokenOneToThreeDigits;
        case "MMM":
        case "MMMM":
        case "dd":
        case "ddd":
        case "dddd":
            return parseTokenWord;
        case "a":
        case "A":
            return moment.localeData(config._l)._meridiemParse;
        case "X":
            return parseTokenTimestampMs;
        case "Z":
        case "ZZ":
            return parseTokenTimezone;
        case "T":
            return parseTokenT;
        case "MM":
        case "DD":
        case "YY":
        case "HH":
        case "hh":
        case "mm":
        case "ss":
        case "M":
        case "D":
        case "d":
        case "H":
        case "h":
        case "m":
        case "s":
            return parseTokenOneOrTwoDigits;
        default:
            return new RegExp(token.replace("\\", ""));
    }
}
function isNull(variable) {
    return variable === null || variable === undefined;
}
function addTimeToArrayFromToken(token, input, config) {
    var a
        , datePartArray = config._a;

    switch (token) {
        case "jM":
        case "jMM":
            datePartArray[1] = isNull(input)? 0 : ~~input - 1;
            break;
        case "jMMM":
        case "jMMMM":
            a = moment.localeData(config._l).jMonthsParse(input);
            if (!isNull(a)){
                datePartArray[1] = a;
            }
            else{
                config._isValid = false;
            }
            break;
        case "jD":
        case "jDD":
        case "jDDD":
        case "jDDDD":
            if (!isNull(input)){
                datePartArray[2] = ~~input;
            }
            break;
        case "jYY":
            datePartArray[0] = ~~input + (~~input > 47 ? 1300 : 1400);
            break;
        case "jYYYY":
        case "jYYYYY":
            datePartArray[0] = ~~input;
    }
    if (isNull(input)) {
        config._isValid = false;
    }
}

function dateFromArray(config) {
    var g
        , j
        , jy = config._a[0]
        , jm = config._a[1]
        , jd = config._a[2];

    if (isNull(jy) && isNull(jm) && isNull(jd)){
        return [0, 0, 1];
    }
    jy = !isNull(jy) ? jy : 0;
    jm = !isNull(jm) ? jm : 0;
    jd = !isNull(jd) ? jd : 1;
    if (jd < 1 || jd > jMoment.jDaysInMonth(jy, jm) || jm < 0 || jm > 11){
        config._isValid = false;
    }
    g = toGregorian(jy, jm, jd);
    j = toJalali(g.gy, g.gm, g.gd);
    config._jDiff = 0;
    if (~~j.jy !== jy){
        config._jDiff += 1;
    }
    if (~~j.jm !== jm){
        config._jDiff += 1;
    }
    if (~~j.jd !== jd){
        config._jDiff += 1;
    }
    return [g.gy, g.gm, g.gd];
}

function makeDateFromStringAndFormat(config) {
    var tokens = config._f.match(formattingTokens)
        , string = config._i + ""
        , len = tokens.length
        , i
        , token
        , parsedInput;

    config._a = [];

    for (i = 0; i < len; i += 1) {
        token = tokens[i];
        parsedInput = (getParseRegexForToken(token, config).exec(string) || [])[0];
        if (parsedInput){
            string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
        }
        if (formatTokenFunctions[token]){
            addTimeToArrayFromToken(token, parsedInput, config);
        }
    }
    if (string){
        config._il = string;
    }
    return dateFromArray(config);
}

function makeDateFromStringAndArray(config, utc) {
    var len = config._f.length
        , i
        , format
        , tempMoment
        , bestMoment
        , currentScore
        , scoreToBeat;

    if (len === 0) {
        return makeMoment(new Date(NaN));
    }

    for (i = 0; i < len; i += 1) {
        format = config._f[i];
        currentScore = 0;
        tempMoment = makeMoment(config._i, format, config._l, config._strict, utc);

        if (!tempMoment.isValid()){
            continue;
        }

        // currentScore = compareArrays(tempMoment._a, tempMoment.toArray())
        currentScore += tempMoment._jDiff;
        if (tempMoment._il){
            currentScore += tempMoment._il.length;
        }
        if (isNull(scoreToBeat) || currentScore < scoreToBeat) {
            scoreToBeat = currentScore;
            bestMoment = tempMoment;
        }
    }

    return bestMoment;
}

function removeParsedTokens(config) {
    var string = config._i + ""
        , input = ""
        , format = ""
        , array = config._f.match(formattingTokens)
        , len = array.length
        , i
        , match
        , parsed;

    for (i = 0; i < len; i += 1) {
        match = array[i];
        parsed = (getParseRegexForToken(match, config).exec(string) || [])[0];
        if (parsed){
            string = string.slice(string.indexOf(parsed) + parsed.length);
        }
        if (!(formatTokenFunctions[match] instanceof Function)) {
            format += match;
            if (parsed){
                input += parsed;
            }
        }
    }
    config._i = input;
    config._f = format;
}

/************************************
 Week of Year
 ************************************/

function jWeekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
    var end = firstDayOfWeekOfYear - firstDayOfWeek
        , daysToDayOfWeek = firstDayOfWeekOfYear - mom.day()
        , adjustedMoment;

    if (daysToDayOfWeek > end) {
        daysToDayOfWeek -= 7;
    }
    if (daysToDayOfWeek < end - 7) {
        daysToDayOfWeek += 7;
    }
    adjustedMoment = jMoment(mom).add(daysToDayOfWeek, "d");
    return  { week: Math.ceil(adjustedMoment.jDayOfYear() / 7)
        , year: adjustedMoment.jYear()
    };
}

/************************************
 Top Level Functions
 ************************************/

function makeMoment(input, format, lang, strict, utc) {
    if (typeof lang === "boolean") {
        utc = strict;
        strict = lang;
        lang = undefined;
    }
    var itsJalaliDate = (isJalali(this));
    if(input && (typeof input === "string") && !format && itsJalaliDate) {
        input = input.replace(/\//g,"-");
        if(/\d{4}\-\d{2}\-\d{2}/.test(input)) {
            format = "jYYYY-jMM-jDD";
        } else if (/\d{4}\-\d{2}\-\d{1}/.test(input)) {
            format = "jYYYY-jMM-jD";
        } else if (/\d{4}\-\d{1}\-\d{1}/.test(input)) {
            format = "jYYYY-jM-jD";
        } else if (/\d{4}\-\d{1}\-\d{2}/.test(input)) {
            format = "jYYYY-jM-jDD";
        } else if (/\d{4}\-W\d{2}\-\d{2}/.test(input)) {
            format = "jYYYY-jW-jDD";
        } else if (/\d{4}\-\d{3}/.test(input)) {
            format = "jYYYY-jDDD";
        } else if (/\d{8}/.test(input)) {
            format = "jYYYYjMMjDD";
        } else if (/\d{4}W\d{2}\d{1}/.test(input)) {
            format = "jYYYYjWWjD";
        } else if (/\d{4}W\d{2}/.test(input)) {
            format = "jYYYYjWW";
        } else if (/\d{4}\d{3}/.test(input)) {
            format = "jYYYYjDDD";
        }
    }
    if (format && itsJalaliDate){
        format = toJalaliFormat(format);
    }
    if (format && typeof format === "string"){
        format = fixFormat(format, moment);
    }

    var config =
        { _i: input
            , _f: format
            , _l: lang
            , _strict: strict
            , _isUTC: utc
        }
        , date
        , m
        , jm
        , origInput = input
        , origFormat = format;
    if (format) {
        if (isArray(format)) {
            return makeDateFromStringAndArray(config, utc);
        } else {
            date = makeDateFromStringAndFormat(config);
            removeParsedTokens(config);
            format = "YYYY-MM-DD-" + config._f;
            input = leftZeroFill(date[0], 4) + "-"
                + leftZeroFill(date[1] + 1, 2) + "-"
                + leftZeroFill(date[2], 2) + "-"
                + config._i;
        }
    }
    if (utc){
        m = moment.utc(input, format, lang, strict);
    }
    else{
        m = moment(input, format, lang, strict);
    }
    if (config._isValid === false || (input && input._isAMomentObject && !input._isValid)){
        m._isValid = false;
    }
    m._jDiff = config._jDiff || 0;
    jm = objectCreate(jMoment.fn);
    extend(jm, m);
    if (strict && jm.isValid()) {
        jm._isValid = jm.format(origFormat) === origInput;
    }
    if (input && input.calSystem) {
        jm.calSystem = input.calSystem;
    }
    return jm;
}

function jMoment(input, format, lang, strict) {
    return makeMoment(input, format, lang, strict, false);
}

extend(jMoment, moment);
jMoment.fn = objectCreate(moment.fn);

jMoment.utc = function (input, format, lang, strict) {
    return makeMoment(input, format, lang, strict, true);
};

jMoment.unix = function (input) {
    return makeMoment(input * 1000);
};

/************************************
 jMoment Prototype
 ************************************/

function fixFormat(format, _moment) {
    var i = 5;
    var replace = function (input) {
        return _moment.localeData().longDateFormat(input) || input;
    };
    while (i > 0 && localFormattingTokens.test(format)) {
        i -= 1;
        format = format.replace(localFormattingTokens, replace);
    }
    return format;
}

jMoment.fn.format = function (format) {
    if (format) {
        if(isJalali(this)) {
            format = toJalaliFormat(format);
        }
        format = fixFormat(format, this);

        if (!formatFunctions[format]) {
            formatFunctions[format] = makeFormatFunction(format);
        }
        format = formatFunctions[format](this);
    }
    var formatted = moment.fn.format.call(this, format);
    return formatted;
};

jMoment.fn.year = function (input) {
    if (isJalali(this)) return jMoment.fn.jYear.call(this,input);
    else return moment.fn.year.call(this, input);
};
jMoment.fn.jYear = function (input) {
    var lastDay
        , j
        , g;
    if (typeof input === "number") {
        j = getJalaliOf(this);
        lastDay = Math.min(j.jd, jMoment.jDaysInMonth(input, j.jm));
        g = toGregorian(input, j.jm, lastDay);
        setDate(this, g.gy, g.gm, g.gd);
        moment.updateOffset(this);
        return this;
    } else {
        return getJalaliOf(this).jy;
    }
};

jMoment.fn.month = function (input) {
    if (isJalali(this)) return jMoment.fn.jMonth.call(this,input);
    else return moment.fn.month.call(this, input);
};
jMoment.fn.jMonth = function (input) {
    var lastDay
        , j
        , g;
    if (!isNull(input)) {
        if (typeof input === "string") {
            input = this.lang().jMonthsParse(input);
            if (typeof input !== "number"){
                return this;
            }
        }
        j = getJalaliOf(this);
        lastDay = Math.min(j.jd, jMoment.jDaysInMonth(j.jy, input));
        this.jYear(j.jy + div(input, 12));
        input = mod(input, 12);
        if (input < 0) {
            input += 12;
            this.jYear(this.jYear() - 1);
        }
        g = toGregorian(this.jYear(), input, lastDay);
        setDate(this, g.gy, g.gm, g.gd);
        moment.updateOffset(this);
        return this;
    } else {
        return getJalaliOf(this).jm;
    }
};

jMoment.fn.date = function (input) {
    if (isJalali(this)) return jMoment.fn.jDate.call(this,input);
    else return moment.fn.date.call(this, input);
};
function getJalaliOf (momentObj) {
    var d = momentObj._d;
    if (momentObj._isUTC) {
        return toJalali(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    } else {
        return toJalali(d.getFullYear(), d.getMonth(), d.getDate());
    }
}
jMoment.fn.jDate = function (input) {
    var j
        , g;
    if (typeof input === "number") {
        j = getJalaliOf(this);
        g = toGregorian(j.jy, j.jm, input);
        setDate(this, g.gy, g.gm, g.gd);
        moment.updateOffset(this);
        return this;
    } else {
        return getJalaliOf(this).jd;
    }
};

jMoment.fn.jDay = function (input) {
    if (typeof input === "number") {
        return moment.fn.day.call(this, input - 1);
    } else {
        return (moment.fn.day.call(this) + 1) % 7;
    }
};

jMoment.fn.dayOfYear = function (input) {
    if (isJalali(this)) return jMoment.fn.jDayOfYear.call(this,input);
    else return moment.fn.dayOfYear.call(this, input);
};
jMoment.fn.jDayOfYear = function (input) {
    var dayOfYear = Math.round((jMoment(this).startOf("day") - jMoment(this).startOf("jYear")) / 864e5) + 1;
    return isNull(input) ? dayOfYear : this.add(input - dayOfYear, "d");
};

jMoment.fn.week = function (input) {
    if (isJalali(this)) return jMoment.fn.jWeek.call(this,input);
    else return moment.fn.week.call(this, input);
};
jMoment.fn.jWeek = function (input) {
    var week = jWeekOfYear(this, 6, 12).week;
    return isNull(input) ? week : this.add((input - week) * 7, "d");
};
function isJalali (momentObj) {
    return momentObj.calSystem === 1 || (moment.justUseJalali && momentObj.calSystem !== 2);
}

jMoment.fn.weekYear = function (input) {
    if (isJalali(this)) return jMoment.fn.jWeekYear.call(this,input);
    else return moment.fn.weekYear.call(this, input);
};
jMoment.fn.jWeekYear = function (input) {
    var year = jWeekOfYear(this, 6, 12).year;
    return isNull(input) ? year : this.add(input - year, "jyear");
};

jMoment.fn.add = function (val, units) {
    var temp;
    if (!isNull(units) && !isNaN(+units)) {
        temp = val;
        val = units;
        units = temp;
    }
    units = normalizeUnits(units, this);
    if (units === "jyear") {
        this.jYear(this.jYear() + val);
    } else if (units === "jmonth") {
        this.jMonth(this.jMonth() + val);
    } else {
        moment.fn.add.call(this, val, units);
    }
    return this;
};

jMoment.fn.subtract = function (val, units) {
    var temp;
    if (!isNull(units) && !isNaN(+units)) {
        temp = val;
        val = units;
        units = temp;
    }
    units = normalizeUnits(units, this);
    if (units === "jyear") {
        this.jYear(this.jYear() - val);
    } else if (units === "jmonth") {
        this.jMonth(this.jMonth() - val);
    } else {
        moment.fn.subtract.call(this, val, units);
    }
    return this;
};

jMoment.fn.startOf = function (units) {
    units = normalizeUnits(units, this);
    if( units === "jweek"){
        return this.startOf("day").subtract(this.jDay() , "day");
    }
    if (units === "jyear" || units === "jmonth") {
        if (units === "jyear") {
            this.jMonth(0);
        }
        this.jDate(1);
        this.hours(0);
        this.minutes(0);
        this.seconds(0);
        this.milliseconds(0);
        return this;
    } else {
        return moment.fn.startOf.call(this, units);
    }
};

jMoment.fn.endOf = function (units) {
    units = normalizeUnits(units, this);
    if (units === undefined || units === "milisecond") {
        return this;
    }
    return this.startOf(units).add(1, (units === "isoweek" ? "week" : units)).subtract(1, "ms");
};

jMoment.fn.isSame = function (other, units) {
    units = normalizeUnits(units, this);
    if (units === "jyear" || units === "jmonth") {
        return moment.fn.isSame.call(this.clone().startOf(units), other.clone().startOf(units));
    }
    return moment.fn.isSame.call(this, other, units);
};

jMoment.fn.isBefore = function (other, units) {
    units = normalizeUnits(units, this);
    if (units === "jyear" || units === "jmonth") {
        return moment.fn.isBefore.call(this.clone().startOf(units), other.clone().startOf(units));
    }
    return moment.fn.isBefore.call(this, other, units);
};

jMoment.fn.isAfter = function (other, units) {
    units = normalizeUnits(units, this);
    if (units === "jyear" || units === "jmonth") {
        return moment.fn.isAfter.call(this.clone().startOf(units), other.clone().startOf(units));
    }
    return moment.fn.isAfter.call(this, other, units);
};

jMoment.fn.clone = function () {
    return jMoment(this);
};

jMoment.fn.doAsJalali = function () {
    this.calSystem = 1;
    return this;
};
jMoment.fn.doAsGregorian = function () {
    this.calSystem = 2;
    return this;
};

jMoment.fn.jYears = jMoment.fn.jYear;
jMoment.fn.jMonths = jMoment.fn.jMonth;
jMoment.fn.jDates = jMoment.fn.jDate;
jMoment.fn.jWeeks = jMoment.fn.jWeek;

jMoment.fn.daysInMonth = function() {
    if (isJalali(this)) {
        return this.jDaysInMonth();
    }
    return moment.fn.daysInMonth.call(this);
};
jMoment.fn.jDaysInMonth = function () {
    var month = this.jMonth();
    var year = this.jYear();
    if (month < 6) {
        return 31;
    } else if (month < 11) {
        return 30;
    } else if (jMoment.jIsLeapYear(year)) {
        return 30;
    } else {
        return 29;
    }
};

jMoment.fn.isLeapYear = function() {
    if (isJalali(this)) {
        return this.jIsLeapYear();
    }
    return moment.fn.isLeapYear.call(this);
};
jMoment.fn.jIsLeapYear = function () {
    var year = this.jYear();
    return isLeapJalaliYear(year);
};
jMoment.fn.locale = function(locale) {
    if (locale && moment.changeCalendarSystemByItsLocale) {
        if (locale === "fa") {
            this.doAsJalali();
        } else {
            this.doAsGregorian();
        }
    }
    return moment.fn.locale.call(this, locale);
};
/************************************
 jMoment Statics
 ************************************/
jMoment.locale = function(locale) {
    if (locale && moment.changeCalendarSystemByItsLocale) {
        if (locale === "fa") {
            this.useJalaliSystemPrimarily();
        } else {
            this.useJalaliSystemSecondary();
        }
    }
    return moment.locale.call(this, locale);
};

jMoment.from = function(date, locale, format) {
    var lastLocale = jMoment.locale();
    jMoment.locale(locale);
    var m = jMoment(date, format);
    m.locale(lastLocale);
    jMoment.locale(lastLocale);
    return m;
};

jMoment.bindCalendarSystemAndLocale = function () {
    moment.changeCalendarSystemByItsLocale = true;
};
jMoment.unBindCalendarSystemAndLocale = function () {
    moment.changeCalendarSystemByItsLocale = false;
};

jMoment.useJalaliSystemPrimarily = function () {
    moment.justUseJalali = true;
};
jMoment.useJalaliSystemSecondary = function () {
    moment.justUseJalali = false;
};

jMoment.jDaysInMonth = function (year, month) {
    year += div(month, 12);
    month = mod(month, 12);
    if (month < 0) {
        month += 12;
        year -= 1;
    }
    if (month < 6) {
        return 31;
    } else if (month < 11) {
        return 30;
    } else if (jMoment.jIsLeapYear(year)) {
        return 30;
    } else {
        return 29;
    }
};

jMoment.jIsLeapYear = isLeapJalaliYear;

moment.defineLocale("fa", {
        months: ("ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر").split("_")
        , monthsShort: ("ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر").split("_")
        , weekdays: ("یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_آدینه_شنبه").split("_")
        , weekdaysShort: ("یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_آدینه_شنبه").split("_")
        , weekdaysMin: "ی_د_س_چ_پ_آ_ش".split("_")
        , longDateFormat:
            { LT: "HH:mm"
                , L: "jYYYY/jMM/jDD"
                , LL: "jD jMMMM jYYYY"
                , LLL: "jD jMMMM jYYYY LT"
                , LLLL: "dddd، jD jMMMM jYYYY LT"
            }
        , calendar:
            { sameDay: "[امروز ساعت] LT"
                , nextDay: "[فردا ساعت] LT"
                , nextWeek: "dddd [ساعت] LT"
                , lastDay: "[دیروز ساعت] LT"
                , lastWeek: "dddd [ی پیش ساعت] LT"
                , sameElse: "L"
            }
        , relativeTime:
            { future: "در %s"
                , past: "%s پیش"
                , s: "چند ثانیه"
                , m: "1 دقیقه"
                , mm: "%d دقیقه"
                , h: "1 ساعت"
                , hh: "%d ساعت"
                , d: "1 روز"
                , dd: "%d روز"
                , M: "1 ماه"
                , MM: "%d ماه"
                , y: "1 سال"
                , yy: "%d سال"
            }
        , ordinal: "%dم"
        , week:
            { dow: 6 // Saturday is the first day of the week.
                , doy: 12 // The week that contains Jan 1st is the first week of the year.
            }
        , meridiem: function (hour) {
            return hour < 12 ? "ق.ظ" : "ب.ظ";
        }
        , jMonths: ("فروردین_اردیبهشت_خرداد_تیر_مرداد_شهریور_مهر_آبان_آذر_دی_بهمن_اسفند").split("_")
        , jMonthsShort: "فرو_ارد_خرد_تیر_مرد_شهر_مهر_آبا_آذر_دی_بهم_اسف".split("_")
    });
jMoment.bindCalendarSystemAndLocale();
moment.locale("en");

jMoment.jConvert =  { toJalali: toJalali
    , toGregorian: toGregorian
};

/************************************
 Jalali Conversion
 ************************************/

function toJalali(gy, gm, gd) {
    var j = convertToJalali(gy, gm + 1, gd);
    j.jm -= 1;
    return j;
}

function toGregorian(jy, jm, jd) {
    var g = convertToGregorian(jy, jm + 1, jd);
    g.gm -= 1;
    return g;
}

/*
 Utility helper functions.
 */

function div(a, b) {
    return ~~(a / b);
}

function mod(a, b) {
    return a - ~~(a / b) * b;
}

/*
 Converts a Gregorian date to Jalali.
 */
function convertToJalali(gy, gm, gd) {
    if (Object.prototype.toString.call(gy) === "[object Date]") {
        gd = gy.getDate();
        gm = gy.getMonth() + 1;
        gy = gy.getFullYear();
    }
    return d2j(g2d(gy, gm, gd));
}

/*
 Converts a Jalali date to Gregorian.
 */
function convertToGregorian(jy, jm, jd) {
    return d2g(j2d(jy, jm, jd));
}

/*
 Is this a leap year or not?
 */
function isLeapJalaliYear(jy) {
    return jalCal(jy).leap === 0;
}

/*
 This function determines if the Jalali (Persian) year is
 leap (366-day long) or is the common year (365 days), and
 finds the day in March (Gregorian calendar) of the first
 day of the Jalali year (jy).
 @param jy Jalali calendar year (-61 to 3177)
 @return
 leap: number of years since the last leap year (0 to 4)
 gy: Gregorian year of the beginning of Jalali year
 march: the March day of Farvardin the 1st (1st day of jy)
 @see: http://www.astro.uni.torun.pl/~kb/Papers/EMP/PersianC-EMP.htm
 @see: http://www.fourmilab.ch/documents/calendar/
 */
function jalCal(jy) {
    // Jalali years starting the 33-year rule.
    var breaks =  [ -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210
        , 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178
    ]
        , bl = breaks.length
        , gy = jy + 621
        , leapJ = -14
        , jp = breaks[0]
        , jm
        , jump
        , leap
        , leapG
        , march
        , n
        , i;

    if (jy < jp || jy >= breaks[bl - 1])
        throw new Error("Invalid Jalali year " + jy);

    // Find the limiting years for the Jalali year jy.
    for (i = 1; i < bl; i += 1) {
        jm = breaks[i];
        jump = jm - jp;
        if (jy < jm)
            break;
        leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4);
        jp = jm;
    }
    n = jy - jp;

    // Find the number of leap years from AD 621 to the beginning
    // of the current Jalali year in the Persian calendar.
    leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4);
    if (mod(jump, 33) === 4 && jump - n === 4)
        leapJ += 1;

    // And the same in the Gregorian calendar (until the year gy).
    leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150;

    // Determine the Gregorian date of Farvardin the 1st.
    march = 20 + leapJ - leapG;

    // Find how many years have passed since the last leap year.
    if (jump - n < 6)
        n = n - jump + div(jump + 4, 33) * 33;
    leap = mod(mod(n + 1, 33) - 1, 4);
    if (leap === -1) {
        leap = 4;
    }

    return  { leap: leap
        , gy: gy
        , march: march
    };
}

/*
 Converts a date of the Jalali calendar to the Julian Day number.
 @param jy Jalali year (1 to 3100)
 @param jm Jalali month (1 to 12)
 @param jd Jalali day (1 to 29/31)
 @return Julian Day number
 */
function j2d(jy, jm, jd) {
    var r = jalCal(jy);
    return g2d(r.gy, 3, r.march) + (jm - 1) * 31 - div(jm, 7) * (jm - 7) + jd - 1;
}

/*
 Converts the Julian Day number to a date in the Jalali calendar.
 @param jdn Julian Day number
 @return
 jy: Jalali year (1 to 3100)
 jm: Jalali month (1 to 12)
 jd: Jalali day (1 to 29/31)
 */
function d2j(jdn) {
    var gy = d2g(jdn).gy // Calculate Gregorian year (gy).
        , jy = gy - 621
        , r = jalCal(jy)
        , jdn1f = g2d(gy, 3, r.march)
        , jd
        , jm
        , k;

    // Find number of days that passed since 1 Farvardin.
    k = jdn - jdn1f;
    if (k >= 0) {
        if (k <= 185) {
            // The first 6 months.
            jm = 1 + div(k, 31);
            jd = mod(k, 31) + 1;
            return  { jy: jy
                , jm: jm
                , jd: jd
            };
        } else {
            // The remaining months.
            k -= 186;
        }
    } else {
        // Previous Jalali year.
        jy -= 1;
        k += 179;
        if (r.leap === 1)
            k += 1;
    }
    jm = 7 + div(k, 30);
    jd = mod(k, 30) + 1;
    return  { jy: jy
        , jm: jm
        , jd: jd
    };
}

/*
 Calculates the Julian Day number from Gregorian or Julian
 calendar dates. This integer number corresponds to the noon of
 the date (i.e. 12 hours of Universal Time).
 The procedure was tested to be good since 1 March, -100100 (of both
 calendars) up to a few million years into the future.
 @param gy Calendar year (years BC numbered 0, -1, -2, ...)
 @param gm Calendar month (1 to 12)
 @param gd Calendar day of the month (1 to 28/29/30/31)
 @return Julian Day number
 */
function g2d(gy, gm, gd) {
    var d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4)
        + div(153 * mod(gm + 9, 12) + 2, 5)
        + gd - 34840408;
    d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
    return d;
}

/*
 Calculates Gregorian and Julian calendar dates from the Julian Day number
 (jdn) for the period since jdn=-34839655 (i.e. the year -100100 of both
 calendars) to some millions years ahead of the present.
 @param jdn Julian Day number
 @return
 gy: Calendar year (years BC numbered 0, -1, -2, ...)
 gm: Calendar month (1 to 12)
 gd: Calendar day of the month M (1 to 28/29/30/31)
 */
function d2g(jdn) {
    var j
        , i
        , gd
        , gm
        , gy;
    j = 4 * jdn + 139361631;
    j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
    i = div(mod(j, 1461), 4) * 5 + 308;
    gd = div(mod(i, 153), 5) + 1;
    gm = mod(div(i, 153), 12) + 1;
    gy = div(j, 1461) - 100100 + div(8 - gm, 6);
    return  { gy: gy
        , gm: gm
        , gd: gd
    };
}

/***/ }),

/***/ "./node_modules/ng2-jalali-date-picker/ng2-jalali-date-picker.es5.js":
/*!***************************************************************************!*\
  !*** ./node_modules/ng2-jalali-date-picker/ng2-jalali-date-picker.es5.js ***!
  \***************************************************************************/
/*! exports provided: ECalendarMode, ECalendarValue, DatePickerComponent, DatePickerDirective, DayCalendarComponent, DayTimeCalendarComponent, TimeSelectComponent, MonthCalendarComponent, DpDatePickerModule, ɵi, ɵa, ɵb, ɵg, ɵc, ɵf, ɵe, ɵh, ɵd */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ECalendarMode", function() { return ECalendarMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ECalendarValue", function() { return ECalendarValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatePickerComponent", function() { return DatePickerComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatePickerDirective", function() { return DatePickerDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DayCalendarComponent", function() { return DayCalendarComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DayTimeCalendarComponent", function() { return DayTimeCalendarComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimeSelectComponent", function() { return TimeSelectComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MonthCalendarComponent", function() { return MonthCalendarComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DpDatePickerModule", function() { return DpDatePickerModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵi", function() { return CalendarNavComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return DomHelper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵb", function() { return UtilsService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵg", function() { return DatePickerDirectiveService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵc", function() { return DatePickerService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵf", function() { return DayCalendarService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵe", function() { return DayTimeCalendarService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵh", function() { return MonthCalendarService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵd", function() { return TimeSelectService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var jalali_moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jalali-moment */ "./node_modules/jalali-moment/jalali-moment.js");
/* harmony import */ var jalali_moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jalali_moment__WEBPACK_IMPORTED_MODULE_3__);




var ECalendarMode = {};
ECalendarMode.Day = 0;
ECalendarMode.DayTime = 1;
ECalendarMode.Month = 2;
ECalendarMode.Time = 3;
ECalendarMode[ECalendarMode.Day] = "Day";
ECalendarMode[ECalendarMode.DayTime] = "DayTime";
ECalendarMode[ECalendarMode.Month] = "Month";
ECalendarMode[ECalendarMode.Time] = "Time";
var ECalendarValue = {};
ECalendarValue.Moment = 1;
ECalendarValue.MomentArr = 2;
ECalendarValue.String = 3;
ECalendarValue.StringArr = 4;
ECalendarValue[ECalendarValue.Moment] = "Moment";
ECalendarValue[ECalendarValue.MomentArr] = "MomentArr";
ECalendarValue[ECalendarValue.String] = "String";
ECalendarValue[ECalendarValue.StringArr] = "StringArr";
var DomHelper = (function () {
    function DomHelper() {
    }
    /**
     * @param {?} element
     * @param {?} container
     * @param {?} anchor
     * @param {?} drops
     * @return {?}
     */
    DomHelper.setYAxisPosition = function (element, container, anchor, drops) {
        var /** @type {?} */ anchorRect = anchor.getBoundingClientRect();
        var /** @type {?} */ containerRect = container.getBoundingClientRect();
        var /** @type {?} */ bottom = anchorRect.bottom - containerRect.top;
        var /** @type {?} */ top = anchorRect.top - containerRect.top;
        if (drops === 'down') {
            element.style.top = (bottom + 1 + 'px');
        }
        else {
            element.style.top = (top - 1 - element.scrollHeight) + 'px';
        }
    };
    /**
     * @param {?} element
     * @param {?} container
     * @param {?} anchor
     * @param {?} dimElem
     * @param {?} opens
     * @return {?}
     */
    DomHelper.setXAxisPosition = function (element, container, anchor, dimElem, opens) {
        var /** @type {?} */ anchorRect = anchor.getBoundingClientRect();
        var /** @type {?} */ containerRect = container.getBoundingClientRect();
        var /** @type {?} */ left = anchorRect.left - containerRect.left;
        if (opens === 'right') {
            element.style.left = left + 'px';
        }
        else {
            element.style.left = left - dimElem.offsetWidth + anchor.offsetWidth + 'px';
        }
    };
    /**
     * @param {?} el
     * @return {?}
     */
    DomHelper.isTopInView = function (el) {
        var top = el.getBoundingClientRect().top;
        return (top >= 0);
    };
    /**
     * @param {?} el
     * @return {?}
     */
    DomHelper.isBottomInView = function (el) {
        var bottom = el.getBoundingClientRect().bottom;
        return (bottom <= window.innerHeight);
    };
    /**
     * @param {?} el
     * @return {?}
     */
    DomHelper.isLeftInView = function (el) {
        var left = el.getBoundingClientRect().left;
        return (left >= 0);
    };
    /**
     * @param {?} el
     * @return {?}
     */
    DomHelper.isRightInView = function (el) {
        var right = el.getBoundingClientRect().right;
        return (right <= window.innerWidth);
    };
    /**
     * @param {?} config
     * @return {?}
     */
    DomHelper.prototype.appendElementToPosition = function (config) {
        var _this = this;
        var container = config.container, element = config.element;
        if (!container.style.position || container.style.position === 'static') {
            container.style.position = 'relative';
        }
        if (element.style.position !== 'absolute') {
            element.style.position = 'absolute';
        }
        element.style.visibility = 'hidden';
        setTimeout(function () {
            _this.setElementPosition(config);
            element.style.visibility = 'visible';
        });
    };
    /**
     * @param {?} __0
     * @return {?}
     */
    DomHelper.prototype.setElementPosition = function (_a) {
        var element = _a.element, container = _a.container, anchor = _a.anchor, dimElem = _a.dimElem, drops = _a.drops, opens = _a.opens;
        DomHelper.setYAxisPosition(element, container, anchor, 'down');
        DomHelper.setXAxisPosition(element, container, anchor, dimElem, 'right');
        if (drops !== 'down' && drops !== 'up') {
            if (DomHelper.isBottomInView(dimElem)) {
                DomHelper.setYAxisPosition(element, container, anchor, 'down');
            }
            else if (DomHelper.isTopInView(dimElem)) {
                DomHelper.setYAxisPosition(element, container, anchor, 'up');
            }
        }
        else {
            DomHelper.setYAxisPosition(element, container, anchor, drops);
        }
        if (opens !== 'left' && opens !== 'right') {
            if (DomHelper.isRightInView(dimElem)) {
                DomHelper.setXAxisPosition(element, container, anchor, dimElem, 'right');
            }
            else if (DomHelper.isLeftInView(dimElem)) {
                DomHelper.setXAxisPosition(element, container, anchor, dimElem, 'left');
            }
        }
        else {
            DomHelper.setXAxisPosition(element, container, anchor, dimElem, opens);
        }
    };
    return DomHelper;
}());
DomHelper.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] },
];
/**
 * @nocollapse
 */
DomHelper.ctorParameters = function () { return []; };
var moment = jalali_moment__WEBPACK_IMPORTED_MODULE_3__;
var UtilsService = (function () {
    function UtilsService() {
    }
    /**
     * @param {?} func
     * @param {?} wait
     * @return {?}
     */
    UtilsService.debounce = function (func, wait) {
        var /** @type {?} */ timeout;
        return function () {
            var /** @type {?} */ context = this, /** @type {?} */ args = arguments;
            timeout = clearTimeout(timeout);
            setTimeout(function () {
                func.apply(context, args);
            }, wait);
        };
    };
    ;
    /**
     * @param {?} size
     * @return {?}
     */
    UtilsService.prototype.createArray = function (size) {
        return new Array(size).fill(1);
    };
    /**
     * @param {?} date
     * @param {?} format
     * @param {?=} locale
     * @return {?}
     */
    UtilsService.prototype.convertToMoment = function (date, format, locale) {
        var /** @type {?} */ m;
        if (!date) {
            m = null;
        }
        else if (typeof date === 'string') {
            m = moment(date, format);
        }
        else {
            m = date.clone();
        }
        if (m && locale) {
            m.locale(locale);
        }
        return m;
    };
    /**
     * @param {?} date
     * @param {?} format
     * @param {?=} locale
     * @return {?}
     */
    UtilsService.prototype.isDateValid = function (date, format, locale) {
        if (date === '') {
            return true;
        }
        // return moment(date, format, true, locale).isValid();
        return moment(date, format, true).isValid();
    };
    /**
     * @param {?} current
     * @param {?} selected
     * @param {?} allowMultiSelect
     * @param {?} minDate
     * @param {?} locale
     * @return {?}
     */
    UtilsService.prototype.getDefaultDisplayDate = function (current, selected, allowMultiSelect, minDate, locale) {
        var /** @type {?} */ m = moment();
        if (current) {
            m = current.clone();
        }
        else if (minDate && minDate.isAfter(moment())) {
            m = minDate.clone();
        }
        else if (allowMultiSelect) {
            if (selected && selected[selected.length]) {
                m = selected[selected.length].clone();
            }
        }
        else if (selected && selected[0]) {
            m = selected[0].clone();
        }
        if (locale) {
            m.locale(locale);
        }
        return m;
    };
    /**
     * @param {?} value
     * @param {?} allowMultiSelect
     * @return {?}
     */
    UtilsService.prototype.getInputType = function (value, allowMultiSelect) {
        if (Array.isArray(value)) {
            if (!value.length) {
                return ECalendarValue.MomentArr;
            }
            else if (typeof value[0] === 'string') {
                return ECalendarValue.StringArr;
            }
            else if (moment.isMoment(value[0])) {
                return ECalendarValue.MomentArr;
            }
        }
        else {
            if (typeof value === 'string') {
                return ECalendarValue.String;
            }
            else if (moment.isMoment(value)) {
                return ECalendarValue.Moment;
            }
        }
        return allowMultiSelect ? ECalendarValue.MomentArr : ECalendarValue.Moment;
    };
    /**
     * @param {?} value
     * @param {?} format
     * @param {?} allowMultiSelect
     * @param {?} locale
     * @return {?}
     */
    UtilsService.prototype.convertToMomentArray = function (value, format, allowMultiSelect, locale) {
        switch (this.getInputType(value, allowMultiSelect)) {
            case (ECalendarValue.String):
                return value ? [moment(/** @type {?} */ (value), format, true).locale(locale)] : [];
            case (ECalendarValue.StringArr):
                return ((value)).map(function (v) { return v ? moment(v, format, true).locale(locale) : null; }).filter(Boolean);
            case (ECalendarValue.Moment):
                return value ? [((value)).clone().locale(locale)] : [];
            case (ECalendarValue.MomentArr):
                return ((value) || []).map(function (v) { return v.clone().locale(locale); });
            default:
                return [];
        }
    };
    /**
     * @param {?} format
     * @param {?} value
     * @param {?} convertTo
     * @param {?} locale
     * @return {?}
     */
    UtilsService.prototype.convertFromMomentArray = function (format, value, convertTo, locale) {
        switch (convertTo) {
            case (ECalendarValue.String):
                return value[0] && value[0].locale(locale).format(format);
            case (ECalendarValue.StringArr):
                return value.filter(Boolean).map(function (v) { return v.locale(locale).format(format); });
            case (ECalendarValue.Moment):
                return value[0] ? value[0].clone().locale(locale) : value[0];
            case (ECalendarValue.MomentArr):
                return value ? value.map(function (v) { return v.clone().locale(locale); }) : value;
            default:
                return value;
        }
    };
    /**
     * @param {?} value
     * @param {?} format
     * @param {?=} locale
     * @return {?}
     */
    UtilsService.prototype.convertToString = function (value, format, locale) {
        var _this = this;
        var /** @type {?} */ tmpVal;
        if (typeof value === 'string') {
            tmpVal = [value];
        }
        else if (Array.isArray(value)) {
            if (value.length) {
                tmpVal = ((value)).map(function (v) {
                    return _this.convertToMoment(v, format, locale).format(format);
                });
            }
            else {
                tmpVal = (value);
            }
        }
        else if (moment.isMoment(value)) {
            tmpVal = [value.format(format)];
        }
        else {
            return '';
        }
        return tmpVal.filter(Boolean).join(' | ');
    };
    /**
     * @template T
     * @param {?} obj
     * @return {?}
     */
    UtilsService.prototype.clearUndefined = function (obj) {
        if (!obj) {
            return obj;
        }
        Object.keys(obj).forEach(function (key) { return (obj[key] === undefined) && delete obj[key]; });
        return obj;
    };
    /**
     * @param {?} isMultiple
     * @param {?} currentlySelected
     * @param {?} date
     * @param {?=} granularity
     * @return {?}
     */
    UtilsService.prototype.updateSelected = function (isMultiple, currentlySelected, date, granularity) {
        if (granularity === void 0) { granularity = 'day'; }
        var /** @type {?} */ isSelected = !date.selected;
        if (isMultiple) {
            return isSelected
                ? currentlySelected.concat([date.date])
                : currentlySelected.filter(function (d) { return !d.isSame(date.date, granularity); });
        }
        else {
            return isSelected ? [date.date] : [];
        }
    };
    /**
     * @param {?} element
     * @param {?} selector
     * @return {?}
     */
    UtilsService.prototype.closestParent = function (element, selector) {
        if (!element) {
            return undefined;
        }
        var /** @type {?} */ match = (element.querySelector(selector));
        return match || this.closestParent(element.parentElement, selector);
    };
    /**
     * @param {?} m
     * @return {?}
     */
    UtilsService.prototype.onlyTime = function (m) {
        return m && moment.isMoment(m) && moment(m.format('HH:mm:ss'), 'HH:mm:ss');
    };
    /**
     * @param {?} calendarType
     * @return {?}
     */
    UtilsService.prototype.granularityFromType = function (calendarType) {
        switch (calendarType) {
            case 'time':
                return 'second';
            case 'daytime':
                return 'second';
            default:
                return calendarType;
        }
    };
    /**
     * @param {?} __0
     * @param {?} format
     * @param {?} calendarType
     * @param {?} locale
     * @return {?}
     */
    UtilsService.prototype.createValidator = function (_a, format, calendarType, locale) {
        var _this = this;
        var minDate = _a.minDate, maxDate = _a.maxDate, minTime = _a.minTime, maxTime = _a.maxTime;
        var /** @type {?} */ isValid;
        var /** @type {?} */ value;
        var /** @type {?} */ validators = [];
        var /** @type {?} */ granularity = this.granularityFromType(calendarType);
        if (minDate) {
            var /** @type {?} */ md_1 = this.convertToMoment(minDate, format, locale);
            validators.push({
                key: 'minDate',
                isValid: function () {
                    var /** @type {?} */ _isValid = value.every(function (val) { return val.isSameOrAfter(md_1, granularity); });
                    isValid = isValid ? _isValid : false;
                    return _isValid;
                }
            });
        }
        if (maxDate) {
            var /** @type {?} */ md_2 = this.convertToMoment(maxDate, format, locale);
            validators.push({
                key: 'maxDate',
                isValid: function () {
                    var /** @type {?} */ _isValid = value.every(function (val) { return val.isSameOrBefore(md_2, granularity); });
                    isValid = isValid ? _isValid : false;
                    return _isValid;
                }
            });
        }
        if (minTime) {
            var /** @type {?} */ md_3 = this.onlyTime(this.convertToMoment(minTime, format, locale));
            validators.push({
                key: 'minTime',
                isValid: function () {
                    var /** @type {?} */ _isValid = value.every(function (val) { return _this.onlyTime(val).isSameOrAfter(md_3); });
                    isValid = isValid ? _isValid : false;
                    return _isValid;
                }
            });
        }
        if (maxTime) {
            var /** @type {?} */ md_4 = this.onlyTime(this.convertToMoment(maxTime, format, locale));
            validators.push({
                key: 'maxTime',
                isValid: function () {
                    var /** @type {?} */ _isValid = value.every(function (val) { return _this.onlyTime(val).isSameOrBefore(md_4); });
                    isValid = isValid ? _isValid : false;
                    return _isValid;
                }
            });
        }
        return function (inputVal) {
            isValid = true;
            value = _this.convertToMomentArray(inputVal, format, true, locale).filter(Boolean);
            if (!value.every(function (val) { return val.isValid(); })) {
                return {
                    format: {
                        given: inputVal
                    }
                };
            }
            var /** @type {?} */ errors = validators.reduce(function (map, err) {
                if (!err.isValid()) {
                    map[err.key] = {
                        given: value
                    };
                }
                return map;
            }, {});
            return !isValid ? errors : null;
        };
    };
    /**
     * @param {?} value
     * @return {?}
     */
    UtilsService.prototype.datesStringToStringArray = function (value) {
        return (value || '').split('|').map(function (m) { return m.trim(); }).filter(Boolean);
    };
    /**
     * @param {?} value
     * @param {?} format
     * @param {?} locale
     * @return {?}
     */
    UtilsService.prototype.getValidMomentArray = function (value, format, locale) {
        var _this = this;
        return this.datesStringToStringArray(value)
            .filter(function (d) { return _this.isDateValid(d, format, locale); })
            .map(function (d) { return moment(d, format); });
    };
    /**
     * @param {?} showGoToCurrent
     * @param {?} mode
     * @param {?} min
     * @param {?} max
     * @return {?}
     */
    UtilsService.prototype.shouldShowCurrent = function (showGoToCurrent, mode, min, max) {
        return showGoToCurrent &&
            mode !== 'time' &&
            this.isDateInRange(moment(), min, max);
    };
    /**
     * @param {?} date
     * @param {?} from
     * @param {?} to
     * @return {?}
     */
    UtilsService.prototype.isDateInRange = function (date, from, to) {
        return date.isBetween(from, to, 'day', '[]');
    };
    /**
     * @param {?} obj
     * @param {?} format
     * @param {?} props
     * @param {?=} locale
     * @return {?}
     */
    UtilsService.prototype.convertPropsToMoment = function (obj, format, props, locale) {
        var _this = this;
        props.forEach(function (prop) {
            if (obj.hasOwnProperty(prop)) {
                obj[prop] = _this.convertToMoment(obj[prop], format, locale);
            }
        });
    };
    /**
     * @template T
     * @param {?} prevConf
     * @param {?} currentConf
     * @return {?}
     */
    UtilsService.prototype.shouldResetCurrentView = function (prevConf, currentConf) {
        if (prevConf && currentConf) {
            if (!prevConf.min && currentConf.min) {
                return true;
            }
            else if (prevConf.min && currentConf.min && !prevConf.min.isSame(currentConf.min, 'd')) {
                return true;
            }
            else if (!prevConf.max && currentConf.max) {
                return true;
            }
            else if (prevConf.max && currentConf.max && !prevConf.max.isSame(currentConf.max, 'd')) {
                return true;
            }
            return false;
        }
        return false;
    };
    /**
     * @param {?} elem
     * @return {?}
     */
    UtilsService.prototype.getNativeElement = function (elem) {
        if (!elem) {
            return null;
        }
        else if (typeof elem === 'string') {
            return (document.querySelector(elem));
        }
        else {
            return elem;
        }
    };
    return UtilsService;
}());
UtilsService.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] },
];
/**
 * @nocollapse
 */
UtilsService.ctorParameters = function () { return []; };
var moment$2 = jalali_moment__WEBPACK_IMPORTED_MODULE_3__;
var DayCalendarService = (function () {
    /**
     * @param {?} utilsService
     */
    function DayCalendarService(utilsService) {
        this.utilsService = utilsService;
        this.DAYS = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
        this.DEFAULT_CONFIG = {
            showNearMonthDays: true,
            showWeekNumbers: false,
            firstDayOfWeek: 'sa',
            weekDayFormat: 'dd',
            format: 'YYYY/M/D',
            monthFormat: 'MMMM YY',
            dayBtnFormat: 'D',
            allowMultiSelect: false,
            enableMonthSelector: true,
            locale: 'fa'
        };
        this.GREGORIAN_CONFIG_EXTENTION = {
            firstDayOfWeek: 'su',
            weekDayFormat: 'ddd',
            format: 'DD-MM-YYYY',
            monthFormat: 'MMM, YYYY',
            locale: 'en',
            dayBtnFormat: 'DD',
            unSelectOnClick: true
        };
    }
    /**
     * @param {?} currentMonth
     * @param {?} monthArray
     * @return {?}
     */
    DayCalendarService.prototype.removeNearMonthWeeks = function (currentMonth, monthArray) {
        if (monthArray[monthArray.length - 1].find(function (day) { return day.date.isSame(currentMonth, 'month'); })) {
            return monthArray;
        }
        else {
            return monthArray.slice(0, -1);
        }
    };
    /**
     * @param {?} config
     * @return {?}
     */
    DayCalendarService.prototype.getConfig = function (config) {
        var /** @type {?} */ _config = (Object.assign({}, this.DEFAULT_CONFIG, ((config && config.locale && config.locale !== 'fa') ? this.GREGORIAN_CONFIG_EXTENTION : {}), this.utilsService.clearUndefined(config)));
        this.utilsService.convertPropsToMoment(_config, _config.format, ['min', 'max'], _config.locale);
        // moment.locale(_config.locale);
        return _config;
    };
    /**
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    DayCalendarService.prototype.generateDaysMap = function (firstDayOfWeek) {
        var /** @type {?} */ firstDayIndex = this.DAYS.indexOf(firstDayOfWeek);
        var /** @type {?} */ daysArr = this.DAYS.slice(firstDayIndex, 7).concat(this.DAYS.slice(0, firstDayIndex));
        return daysArr.reduce(function (map, day, index) {
            map[day] = index;
            return map;
        }, /** @type {?} */ ({}));
    };
    /**
     * @param {?} config
     * @param {?} month
     * @param {?} selected
     * @return {?}
     */
    DayCalendarService.prototype.generateMonthArray = function (config, month, selected) {
        var _this = this;
        var /** @type {?} */ monthArray = [];
        var /** @type {?} */ firstDayOfWeekIndex = this.DAYS.indexOf(config.firstDayOfWeek);
        var /** @type {?} */ firstDayOfBoard = month.clone().startOf('month');
        for (var /** @type {?} */ i = 0; i < 8 && (firstDayOfBoard.day() !== firstDayOfWeekIndex); i++) {
            firstDayOfBoard.subtract(1, 'day');
            if (i === 7) {
                throw new Error('first day of Board has set Wrong');
            }
        }
        var /** @type {?} */ current = firstDayOfBoard.clone();
        var /** @type {?} */ prevMonth = month.clone().subtract(1, 'month');
        var /** @type {?} */ nextMonth = month.clone().add(1, 'month');
        var /** @type {?} */ today = moment$2();
        var /** @type {?} */ daysOfCalendar = this.utilsService.createArray(42)
            .reduce(function (array) {
            array.push({
                date: current.clone(),
                selected: !!selected.find(function (selectedDay) { return current.isSame(selectedDay, 'day'); }),
                currentMonth: current.isSame(month, 'month'),
                prevMonth: current.isSame(prevMonth, 'month'),
                nextMonth: current.isSame(nextMonth, 'month'),
                currentDay: current.isSame(today, 'day'),
                disabled: _this.isDateDisabled(current, config)
            });
            current.add(1, 'day');
            if (current.format('HH') !== '00') {
                current.startOf('day');
                if (array[array.length - 1].date.format('DD') === current.format('DD')) {
                    current.add(1, 'day');
                }
            }
            return array;
        }, []);
        daysOfCalendar.forEach(function (day, index) {
            var /** @type {?} */ weekIndex = Math.floor(index / 7);
            if (!monthArray[weekIndex]) {
                monthArray.push([]);
            }
            monthArray[weekIndex].push(day);
        });
        if (!config.showNearMonthDays) {
            monthArray = this.removeNearMonthWeeks(month, monthArray);
        }
        return monthArray;
    };
    /**
     * @param {?} firstDayOfWeek
     * @param {?=} locale
     * @return {?}
     */
    DayCalendarService.prototype.generateWeekdays = function (firstDayOfWeek, locale) {
        var /** @type {?} */ weekdayNames = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'].reduce(function (acc, d, i) {
            var /** @type {?} */ m = moment$2();
            if (locale) {
                m.locale(locale);
            }
            m.day(i);
            acc[d] = m;
            return acc;
        }, {});
        var /** @type {?} */ weekdays = [];
        var /** @type {?} */ daysMap = this.generateDaysMap(firstDayOfWeek);
        for (var /** @type {?} */ dayKey in daysMap) {
            if (daysMap.hasOwnProperty(dayKey)) {
                weekdays[daysMap[dayKey]] = weekdayNames[dayKey];
            }
        }
        return weekdays;
    };
    /**
     * @param {?} date
     * @param {?} config
     * @return {?}
     */
    DayCalendarService.prototype.isDateDisabled = function (date, config) {
        if (config.isDayDisabledCallback) {
            return config.isDayDisabledCallback(date);
        }
        if (config.min && date.isBefore(config.min, 'day')) {
            return true;
        }
        return !!(config.max && date.isAfter(config.max, 'day'));
    };
    /**
     * @param {?} config
     * @param {?} month
     * @return {?}
     */
    DayCalendarService.prototype.getHeaderLabel = function (config, month) {
        if (config.monthFormatter) {
            return config.monthFormatter(month);
        }
        month.locale(config.locale);
        return month.format(config.monthFormat);
    };
    /**
     * @param {?} min
     * @param {?} currentMonthView
     * @return {?}
     */
    DayCalendarService.prototype.shouldShowLeft = function (min, currentMonthView) {
        return min ? min.isBefore(currentMonthView, 'month') : true;
    };
    /**
     * @param {?} max
     * @param {?} currentMonthView
     * @return {?}
     */
    DayCalendarService.prototype.shouldShowRight = function (max, currentMonthView) {
        return max ? max.isAfter(currentMonthView, 'month') : true;
    };
    /**
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    DayCalendarService.prototype.generateDaysIndexMap = function (firstDayOfWeek) {
        var /** @type {?} */ firstDayIndex = this.DAYS.indexOf(firstDayOfWeek);
        var /** @type {?} */ daysArr = this.DAYS.slice(firstDayIndex, 7).concat(this.DAYS.slice(0, firstDayIndex));
        return daysArr.reduce(function (map, day, index) {
            map[index] = day;
            return map;
        }, /** @type {?} */ ({}));
    };
    /**
     * @param {?} componentConfig
     * @return {?}
     */
    DayCalendarService.prototype.getMonthCalendarConfig = function (componentConfig) {
        return this.utilsService.clearUndefined({
            min: componentConfig.min,
            max: componentConfig.max,
            format: componentConfig.format,
            isNavHeaderBtnClickable: true,
            allowMultiSelect: false,
            yearFormat: componentConfig.yearFormat,
            locale: componentConfig.locale,
            yearFormatter: componentConfig.yearFormatter,
            monthBtnFormat: componentConfig.monthBtnFormat,
            monthBtnFormatter: componentConfig.monthBtnFormatter,
            monthBtnCssClassCallback: componentConfig.monthBtnCssClassCallback,
            multipleYearsNavigateBy: componentConfig.multipleYearsNavigateBy,
            showMultipleYearsNavigation: componentConfig.showMultipleYearsNavigation,
            showGoToCurrent: componentConfig.showGoToCurrent
        });
    };
    /**
     * @param {?} config
     * @param {?} day
     * @return {?}
     */
    DayCalendarService.prototype.getDayBtnText = function (config, day) {
        if (config.dayBtnFormatter) {
            return config.dayBtnFormatter(day);
        }
        return day.format(config.dayBtnFormat);
    };
    /**
     * @param {?} config
     * @param {?} day
     * @return {?}
     */
    DayCalendarService.prototype.getDayBtnCssClass = function (config, day) {
        if (config.dayBtnCssClassCallback) {
            return config.dayBtnCssClassCallback(day);
        }
        return '';
    };
    return DayCalendarService;
}());
DayCalendarService.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] },
];
/**
 * @nocollapse
 */
DayCalendarService.ctorParameters = function () { return [
    { type: UtilsService, },
]; };
var moment$4 = jalali_moment__WEBPACK_IMPORTED_MODULE_3__;
var FIRST_PM_HOUR = 12;
var TimeSelectService = (function () {
    /**
     * @param {?} utilsService
     */
    function TimeSelectService(utilsService) {
        this.utilsService = utilsService;
        this.DEFAULT_CONFIG = ({
            hours12Format: 'hh',
            hours24Format: 'HH',
            meridiemFormat: 'A',
            minutesFormat: 'mm',
            minutesInterval: 1,
            secondsFormat: 'ss',
            secondsInterval: 1,
            showSeconds: false,
            showTwentyFourHours: false,
            timeSeparator: ':',
            locale: 'fa'
        });
    }
    /**
     * @param {?} config
     * @return {?}
     */
    TimeSelectService.prototype.getConfig = function (config) {
        var /** @type {?} */ timeConfigs = {
            maxTime: this.utilsService.onlyTime(/** @type {?} */ ((config && config.maxTime))),
            minTime: this.utilsService.onlyTime(/** @type {?} */ ((config && config.minTime)))
        };
        var /** @type {?} */ _config = (Object.assign({}, this.DEFAULT_CONFIG, this.utilsService.clearUndefined(config), timeConfigs));
        // moment.locale(_config.locale);
        return _config;
    };
    /**
     * @param {?} config
     * @return {?}
     */
    TimeSelectService.prototype.getTimeFormat = function (config) {
        return (config.showTwentyFourHours ? config.hours24Format : config.hours12Format)
            + config.timeSeparator + config.minutesFormat
            + (config.showSeconds ? (config.timeSeparator + config.secondsFormat) : '')
            + (config.showTwentyFourHours ? '' : ' ' + config.meridiemFormat);
    };
    /**
     * @param {?} config
     * @param {?} t
     * @return {?}
     */
    TimeSelectService.prototype.getHours = function (config, t) {
        var /** @type {?} */ time = t || moment$4();
        return time && time.format(config.showTwentyFourHours ? config.hours24Format : config.hours12Format);
    };
    /**
     * @param {?} config
     * @param {?} t
     * @return {?}
     */
    TimeSelectService.prototype.getMinutes = function (config, t) {
        var /** @type {?} */ time = t || moment$4();
        return time && time.format(config.minutesFormat);
    };
    /**
     * @param {?} config
     * @param {?} t
     * @return {?}
     */
    TimeSelectService.prototype.getSeconds = function (config, t) {
        var /** @type {?} */ time = t || moment$4();
        return time && time.format(config.secondsFormat);
    };
    /**
     * @param {?} config
     * @param {?} time
     * @return {?}
     */
    TimeSelectService.prototype.getMeridiem = function (config, time) {
        if (config.locale) {
            time.locale(config.locale);
        }
        return time && time.format(config.meridiemFormat);
    };
    /**
     * @param {?} config
     * @param {?} time
     * @param {?} unit
     * @return {?}
     */
    TimeSelectService.prototype.decrease = function (config, time, unit) {
        var /** @type {?} */ amount = 1;
        switch (unit) {
            case 'minute':
                amount = config.minutesInterval;
                break;
            case 'second':
                amount = config.secondsInterval;
                break;
        }
        return time.clone().subtract(amount, unit);
    };
    /**
     * @param {?} config
     * @param {?} time
     * @param {?} unit
     * @return {?}
     */
    TimeSelectService.prototype.increase = function (config, time, unit) {
        var /** @type {?} */ amount = 1;
        switch (unit) {
            case 'minute':
                amount = config.minutesInterval;
                break;
            case 'second':
                amount = config.secondsInterval;
                break;
        }
        return time.clone().add(amount, unit);
    };
    /**
     * @param {?} time
     * @return {?}
     */
    TimeSelectService.prototype.toggleMeridiem = function (time) {
        if (time.hours() < FIRST_PM_HOUR) {
            return time.clone().add(12, 'hour');
        }
        else {
            return time.clone().subtract(12, 'hour');
        }
    };
    /**
     * @param {?} config
     * @param {?} time
     * @param {?} unit
     * @return {?}
     */
    TimeSelectService.prototype.shouldShowDecrease = function (config, time, unit) {
        if (!config.min && !config.minTime) {
            return true;
        }
        var /** @type {?} */ newTime = this.decrease(config, time, unit);
        return (!config.min || config.min.isSameOrBefore(newTime))
            && (!config.minTime || config.minTime.isSameOrBefore(this.utilsService.onlyTime(newTime)));
    };
    /**
     * @param {?} config
     * @param {?} time
     * @param {?} unit
     * @return {?}
     */
    TimeSelectService.prototype.shouldShowIncrease = function (config, time, unit) {
        if (!config.max && !config.maxTime) {
            return true;
        }
        var /** @type {?} */ newTime = this.increase(config, time, unit);
        return (!config.max || config.max.isSameOrAfter(newTime))
            && (!config.maxTime || config.maxTime.isSameOrAfter(this.utilsService.onlyTime(newTime)));
    };
    /**
     * @param {?} config
     * @param {?} time
     * @return {?}
     */
    TimeSelectService.prototype.shouldShowToggleMeridiem = function (config, time) {
        if (!config.min && !config.max && !config.minTime && !config.maxTime) {
            return true;
        }
        var /** @type {?} */ newTime = this.toggleMeridiem(time);
        return (!config.max || config.max.isSameOrAfter(newTime))
            && (!config.min || config.min.isSameOrBefore(newTime))
            && (!config.maxTime || config.maxTime.isSameOrAfter(this.utilsService.onlyTime(newTime)))
            && (!config.minTime || config.minTime.isSameOrBefore(this.utilsService.onlyTime(newTime)));
    };
    return TimeSelectService;
}());
TimeSelectService.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] },
];
/**
 * @nocollapse
 */
TimeSelectService.ctorParameters = function () { return [
    { type: UtilsService, },
]; };
var moment$3 = jalali_moment__WEBPACK_IMPORTED_MODULE_3__;
var DAY_FORMAT = 'YYYYMMDD';
var TIME_FORMAT = 'HH:mm:ss';
var COMBINED_FORMAT = DAY_FORMAT + TIME_FORMAT;
var DayTimeCalendarService = (function () {
    /**
     * @param {?} utilsService
     * @param {?} dayCalendarService
     * @param {?} timeSelectService
     */
    function DayTimeCalendarService(utilsService, dayCalendarService, timeSelectService) {
        this.utilsService = utilsService;
        this.dayCalendarService = dayCalendarService;
        this.timeSelectService = timeSelectService;
        this.DEFAULT_CONFIG = {
            locale: 'fa'
        };
    }
    /**
     * @param {?} config
     * @return {?}
     */
    DayTimeCalendarService.prototype.getConfig = function (config) {
        var /** @type {?} */ _config = Object.assign({}, this.DEFAULT_CONFIG, this.timeSelectService.getConfig(config), this.dayCalendarService.getConfig(config));
        // moment.locale(config.locale);
        return _config;
    };
    /**
     * @param {?} current
     * @param {?} day
     * @param {?} config
     * @return {?}
     */
    DayTimeCalendarService.prototype.updateDay = function (current, day, config) {
        var /** @type {?} */ time = current ? current : moment$3();
        var /** @type {?} */ updated = moment$3.from(day.format(DAY_FORMAT) + time.format(TIME_FORMAT), day.locale(), COMBINED_FORMAT);
        if (config.min) {
            var /** @type {?} */ min = (config.min);
            updated = min.isAfter(updated) ? min : updated;
        }
        if (config.max) {
            var /** @type {?} */ max = (config.max);
            updated = max.isBefore(updated) ? max : updated;
        }
        return updated;
    };
    /**
     * @param {?} current
     * @param {?} time
     * @return {?}
     */
    DayTimeCalendarService.prototype.updateTime = function (current, time) {
        var /** @type {?} */ day = current ? current : moment$3();
        return moment$3.from(day.format(DAY_FORMAT) + time.format(TIME_FORMAT), day.locale(), COMBINED_FORMAT);
    };
    return DayTimeCalendarService;
}());
DayTimeCalendarService.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] },
];
/**
 * @nocollapse
 */
DayTimeCalendarService.ctorParameters = function () { return [
    { type: UtilsService, },
    { type: DayCalendarService, },
    { type: TimeSelectService, },
]; };
var DatePickerService = (function () {
    /**
     * @param {?} utilsService
     * @param {?} timeSelectService
     * @param {?} daytimeCalendarService
     */
    function DatePickerService(utilsService, timeSelectService, daytimeCalendarService) {
        this.utilsService = utilsService;
        this.timeSelectService = timeSelectService;
        this.daytimeCalendarService = daytimeCalendarService;
        this.onPickerClosed = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.defaultConfig = {
            closeOnSelect: true,
            closeOnSelectDelay: 100,
            format: 'YYYY-MM-D',
            openOnFocus: true,
            openOnClick: true,
            onOpenDelay: 0,
            disableKeypress: false,
            showNearMonthDays: true,
            showWeekNumbers: false,
            enableMonthSelector: true,
            showGoToCurrent: true,
            locale: 'fa',
            hideOnOutsideClick: true
        };
        this.gregorianExtensionConfig = {
            format: 'DD-MM-YYYY',
            locale: 'en'
        };
    }
    /**
     * @param {?} config
     * @param {?=} mode
     * @return {?}
     */
    DatePickerService.prototype.getConfig = function (config, mode) {
        if (mode === void 0) { mode = 'daytime'; }
        var /** @type {?} */ _config = (Object.assign({}, this.defaultConfig, ((config && config.locale && config.locale !== 'fa') ? this.gregorianExtensionConfig : {}), { format: this.getDefaultFormatByMode(mode, config) }, this.utilsService.clearUndefined(config)));
        this.utilsService.convertPropsToMoment(_config, _config.format, ['min', 'max'], _config.locale);
        if (config && config.allowMultiSelect && config.closeOnSelect === undefined) {
            _config.closeOnSelect = false;
        }
        // moment.locale(_config.locale);
        return _config;
    };
    /**
     * @param {?} pickerConfig
     * @return {?}
     */
    DatePickerService.prototype.getDayConfigService = function (pickerConfig) {
        return {
            min: pickerConfig.min,
            max: pickerConfig.max,
            isDayDisabledCallback: pickerConfig.isDayDisabledCallback,
            weekDayFormat: pickerConfig.weekDayFormat,
            showNearMonthDays: pickerConfig.showNearMonthDays,
            showWeekNumbers: pickerConfig.showWeekNumbers,
            firstDayOfWeek: pickerConfig.firstDayOfWeek,
            format: pickerConfig.format,
            allowMultiSelect: pickerConfig.allowMultiSelect,
            monthFormat: pickerConfig.monthFormat,
            monthFormatter: pickerConfig.monthFormatter,
            enableMonthSelector: pickerConfig.enableMonthSelector,
            yearFormat: pickerConfig.yearFormat,
            yearFormatter: pickerConfig.yearFormatter,
            dayBtnFormat: pickerConfig.dayBtnFormat,
            dayBtnFormatter: pickerConfig.dayBtnFormatter,
            dayBtnCssClassCallback: pickerConfig.dayBtnCssClassCallback,
            monthBtnFormat: pickerConfig.monthBtnFormat,
            monthBtnFormatter: pickerConfig.monthBtnFormatter,
            monthBtnCssClassCallback: pickerConfig.monthBtnCssClassCallback,
            multipleYearsNavigateBy: pickerConfig.multipleYearsNavigateBy,
            showMultipleYearsNavigation: pickerConfig.showMultipleYearsNavigation,
            locale: pickerConfig.locale,
            returnedValueType: pickerConfig.returnedValueType,
            showGoToCurrent: pickerConfig.showGoToCurrent,
            unSelectOnClick: pickerConfig.unSelectOnClick
        };
    };
    /**
     * @param {?} pickerConfig
     * @return {?}
     */
    DatePickerService.prototype.getDayTimeConfigService = function (pickerConfig) {
        return this.daytimeCalendarService.getConfig(pickerConfig);
    };
    /**
     * @param {?} pickerConfig
     * @return {?}
     */
    DatePickerService.prototype.getTimeConfigService = function (pickerConfig) {
        return this.timeSelectService.getConfig(pickerConfig);
    };
    /**
     * @return {?}
     */
    DatePickerService.prototype.pickerClosed = function () {
        this.onPickerClosed.emit();
    };
    /**
     * @param {?} value
     * @param {?} config
     * @return {?}
     */
    DatePickerService.prototype.isValidInputDateValue = function (value, config) {
        var _this = this;
        value = value ? value : '';
        var /** @type {?} */ datesStrArr = this.utilsService.datesStringToStringArray(value);
        return datesStrArr.every(function (date) { return _this.utilsService.isDateValid(date, config.format, config.locale); });
    };
    /**
     * @param {?} value
     * @param {?} config
     * @return {?}
     */
    DatePickerService.prototype.convertInputValueToMomentArray = function (value, config) {
        value = value ? value : '';
        var /** @type {?} */ datesStrArr = this.utilsService.datesStringToStringArray(value);
        return this.utilsService.convertToMomentArray(datesStrArr, config.format, config.allowMultiSelect, config.locale);
    };
    /**
     * @param {?} mode
     * @param {?} config
     * @return {?}
     */
    DatePickerService.prototype.getDefaultFormatByMode = function (mode, config) {
        var /** @type {?} */ dateFormat = 'YYYY-MM-DD';
        var /** @type {?} */ monthFormat = 'MMMM YY';
        var /** @type {?} */ timeFormat = 'HH:mm:ss';
        if (config && config.locale && config.locale !== 'fa') {
            dateFormat = 'DD-MM-YYYY';
            monthFormat = 'MMM, YYYY';
        }
        switch (mode) {
            case 'day':
                return dateFormat;
            case 'daytime':
                return dateFormat + ' ' + timeFormat;
            case 'time':
                return timeFormat;
            case 'month':
                return monthFormat;
        }
    };
    return DatePickerService;
}());
DatePickerService.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] },
];
/**
 * @nocollapse
 */
DatePickerService.ctorParameters = function () { return [
    { type: UtilsService, },
    { type: TimeSelectService, },
    { type: DayTimeCalendarService, },
]; };
var moment$1 = jalali_moment__WEBPACK_IMPORTED_MODULE_3__;
var DatePickerComponent = (function () {
    /**
     * @param {?} dayPickerService
     * @param {?} domHelper
     * @param {?} elemRef
     * @param {?} renderer
     * @param {?} utilsService
     * @param {?} cd
     */
    function DatePickerComponent(dayPickerService, domHelper, elemRef, renderer, utilsService, cd) {
        this.dayPickerService = dayPickerService;
        this.domHelper = domHelper;
        this.elemRef = elemRef;
        this.renderer = renderer;
        this.utilsService = utilsService;
        this.cd = cd;
        this.isInitialized = false;
        this.mode = 'day';
        this.placeholder = '';
        this.disabled = false;
        this.open = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.close = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onGoToCurrent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onLeftNav = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onRightNav = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this._areCalendarsShown = false;
        this.hideStateHelper = false;
        this._selected = [];
        this.isFocusedTrigger = false;
        this.handleInnerElementClickUnlisteners = [];
        this.globalListnersUnlisteners = [];
        this.api = {
            open: this.showCalendars.bind(this),
            close: this.hideCalendar.bind(this),
            moveCalendarTo: this.moveCalendarTo.bind(this)
        };
    }
    Object.defineProperty(DatePickerComponent.prototype, "selected", {
        /**
         * @return {?}
         */
        get: function () {
            return this._selected;
        },
        /**
         * @param {?} selected
         * @return {?}
         */
        set: function (selected) {
            this._selected = selected;
            this.inputElementValue = ((this.utilsService
                .convertFromMomentArray(this.componentConfig.format, selected, ECalendarValue.StringArr, this.componentConfig.locale)))
                .join(' | ');
            var /** @type {?} */ val = this.processOnChangeCallback(selected);
            this.onChangeCallback(val, false);
            this.onChange.emit(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "areCalendarsShown", {
        /**
         * @return {?}
         */
        get: function () {
            return this._areCalendarsShown;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            if (value) {
                this.startGlobalListeners();
                this.domHelper.appendElementToPosition({
                    container: this.appendToElement,
                    element: this.calendarWrapper,
                    anchor: this.inputElementContainer,
                    dimElem: this.popupElem,
                    drops: this.componentConfig.drops,
                    opens: this.componentConfig.opens
                });
            }
            else {
                this.stopGlobalListeners();
                this.dayPickerService.pickerClosed();
            }
            this._areCalendarsShown = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "openOnFocus", {
        /**
         * @return {?}
         */
        get: function () {
            return this.componentConfig.openOnFocus;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "openOnClick", {
        /**
         * @return {?}
         */
        get: function () {
            return this.componentConfig.openOnClick;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "currentDateView", {
        /**
         * @return {?}
         */
        get: function () {
            return this._currentDateView;
        },
        /**
         * @param {?} date
         * @return {?}
         */
        set: function (date) {
            this._currentDateView = date;
            if (this.dayCalendarRef) {
                this.dayCalendarRef.moveCalendarTo(date);
            }
            if (this.monthCalendarRef) {
                this.monthCalendarRef.moveCalendarTo(date);
            }
            if (this.dayTimeCalendarRef) {
                this.dayTimeCalendarRef.moveCalendarTo(date);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.onClick = function () {
        if (!this.openOnClick) {
            return;
        }
        if (!this.isFocusedTrigger && !this.disabled) {
            this.hideStateHelper = true;
            if (!this.areCalendarsShown) {
                this.showCalendars();
            }
        }
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.onBodyClick = function () {
        if (this.componentConfig.hideOnOutsideClick) {
            if (!this.hideStateHelper && this.areCalendarsShown) {
                this.hideCalendar();
            }
            this.hideStateHelper = false;
        }
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.onScroll = function () {
        if (this.areCalendarsShown) {
            this.domHelper.setElementPosition({
                container: this.appendToElement,
                element: this.calendarWrapper,
                anchor: this.inputElementContainer,
                dimElem: this.popupElem,
                drops: this.componentConfig.drops,
                opens: this.componentConfig.opens
            });
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DatePickerComponent.prototype.writeValue = function (value) {
        if (this.inputValue === value) {
            return;
        }
        this.inputValue = value;
        if (value || value === '') {
            this.selected = this.utilsService
                .convertToMomentArray(value, this.componentConfig.format, this.componentConfig.allowMultiSelect, this.componentConfig.locale);
            this.currentDateView = this.selected.length
                ? this.utilsService.getDefaultDisplayDate(null, this.selected, this.componentConfig.allowMultiSelect, this.componentConfig.min, this.componentConfig.locale)
                : this.currentDateView;
            this.init();
        }
        else {
            this.selected = [];
        }
        this.cd.markForCheck();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DatePickerComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @param {?} _
     * @param {?} changedByInput
     * @return {?}
     */
    DatePickerComponent.prototype.onChangeCallback = function (_, changedByInput) {
    };
    ;
    /**
     * @param {?} fn
     * @return {?}
     */
    DatePickerComponent.prototype.registerOnTouched = function (fn) {
    };
    /**
     * @param {?} formControl
     * @return {?}
     */
    DatePickerComponent.prototype.validate = function (formControl) {
        return this.validateFn(formControl.value);
    };
    /**
     * @param {?} selected
     * @return {?}
     */
    DatePickerComponent.prototype.processOnChangeCallback = function (selected) {
        if (typeof selected === 'string') {
            return selected;
        }
        else {
            return this.utilsService.convertFromMomentArray(this.componentConfig.format, selected, this.componentConfig.returnedValueType || this.inputValueType, this.componentConfig.locale);
        }
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.initValidators = function () {
        this.validateFn = this.utilsService.createValidator({
            minDate: this.minDate,
            maxDate: this.maxDate,
            minTime: this.minTime,
            maxTime: this.maxTime
        }, this.componentConfig.format, this.mode, this.componentConfig.locale);
        this.onChangeCallback(this.processOnChangeCallback(this.selected), false);
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.ngOnInit = function () {
        this.isInitialized = true;
        this.init();
        this.initValidators();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    DatePickerComponent.prototype.ngOnChanges = function (changes) {
        if (this.isInitialized) {
            var minDate = changes.minDate, maxDate = changes.maxDate, minTime = changes.minTime, maxTime = changes.maxTime;
            this.init();
            if (minDate || maxDate || minTime || maxTime) {
                this.initValidators();
            }
        }
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.ngAfterViewInit = function () {
        this.setElementPositionInDom();
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    DatePickerComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.setElementPositionInDom = function () {
        this.calendarWrapper = (this.calendarContainer.nativeElement);
        this.setInputElementContainer();
        this.popupElem = this.elemRef.nativeElement.querySelector('.dp-popup');
        this.handleInnerElementClick(this.popupElem);
        var appendTo = this.componentConfig.appendTo;
        if (appendTo) {
            if (typeof appendTo === 'string') {
                this.appendToElement = (document.querySelector(/** @type {?} */ (appendTo)));
            }
            else {
                this.appendToElement = (appendTo);
            }
        }
        else {
            this.appendToElement = this.elemRef.nativeElement;
        }
        this.appendToElement.appendChild(this.calendarWrapper);
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.setInputElementContainer = function () {
        this.inputElementContainer = this.utilsService.getNativeElement(this.componentConfig.inputElementContainer)
            || this.elemRef.nativeElement.querySelector('.dp-input-container')
            || document.body;
    };
    /**
     * @param {?} element
     * @return {?}
     */
    DatePickerComponent.prototype.handleInnerElementClick = function (element) {
        var _this = this;
        this.handleInnerElementClickUnlisteners.push(this.renderer.listen(element, 'click', function () {
            _this.hideStateHelper = true;
        }));
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.init = function () {
        this.componentConfig = this.dayPickerService.getConfig(this.config, this.mode);
        this.currentDateView = this.displayDate
            ? this.utilsService.convertToMoment(this.displayDate, this.componentConfig.format, this.componentConfig.locale).clone()
            : this.utilsService
                .getDefaultDisplayDate(this.currentDateView, this.selected, this.componentConfig.allowMultiSelect, this.componentConfig.min, this.componentConfig.locale);
        this.inputValueType = this.utilsService.getInputType(this.inputValue, this.componentConfig.allowMultiSelect);
        this.dayCalendarConfig = this.dayPickerService.getDayConfigService(this.componentConfig);
        this.dayTimeCalendarConfig = this.dayPickerService.getDayTimeConfigService(this.componentConfig);
        this.timeSelectConfig = this.dayPickerService.getTimeConfigService(this.componentConfig);
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.inputFocused = function () {
        var _this = this;
        if (!this.openOnFocus) {
            return;
        }
        this.isFocusedTrigger = true;
        setTimeout(function () {
            _this.hideStateHelper = false;
            if (!_this.areCalendarsShown) {
                _this.showCalendars();
            }
            _this.isFocusedTrigger = false;
        }, this.componentConfig.onOpenDelay);
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.showCalendars = function () {
        this.hideStateHelper = true;
        this.areCalendarsShown = true;
        if (this.timeSelectRef) {
            this.timeSelectRef.api.triggerChange();
        }
        this.open.emit();
        this.cd.markForCheck();
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.hideCalendar = function () {
        this.areCalendarsShown = false;
        if (this.dayCalendarRef) {
            this.dayCalendarRef.api.toggleCalendarMode(ECalendarMode.Day);
        }
        this.close.emit();
        this.cd.markForCheck();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DatePickerComponent.prototype.onViewDateChange = function (value) {
        var /** @type {?} */ strVal = value ? this.utilsService.convertToString(value, this.componentConfig.format, this.componentConfig.locale) : '';
        if (this.dayPickerService.isValidInputDateValue(strVal, this.componentConfig)) {
            if (strVal && this.componentConfig.locale === 'fa') {
                // convert jalali to gregorian
                strVal = moment$1.from(strVal, 'fa', this.componentConfig.format).format(this.componentConfig.format);
            }
            this.selected = this.dayPickerService.convertInputValueToMomentArray(strVal, this.componentConfig);
            this.currentDateView = this.selected.length
                ? this.utilsService.getDefaultDisplayDate(null, this.selected, this.componentConfig.allowMultiSelect, this.componentConfig.min, this.componentConfig.locale)
                : this.currentDateView;
        }
        else {
            this._selected = this.utilsService
                .getValidMomentArray(strVal, this.componentConfig.format, this.componentConfig.locale);
            this.onChangeCallback(this.processOnChangeCallback(strVal), true);
        }
    };
    /**
     * @param {?} date
     * @param {?} granularity
     * @param {?=} ignoreClose
     * @return {?}
     */
    DatePickerComponent.prototype.dateSelected = function (date, granularity, ignoreClose) {
        this.selected = this.utilsService
            .updateSelected(this.componentConfig.allowMultiSelect, this.selected, date, granularity);
        if (!ignoreClose) {
            this.onDateClick();
        }
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.onDateClick = function () {
        if (this.componentConfig.closeOnSelect) {
            setTimeout(this.hideCalendar.bind(this), this.componentConfig.closeOnSelectDelay);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DatePickerComponent.prototype.onKeyPress = function (event) {
        switch (event.keyCode) {
            case (9):
            case (27):
                this.hideCalendar();
                break;
        }
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DatePickerComponent.prototype.moveCalendarTo = function (date) {
        var /** @type {?} */ momentDate = this.utilsService.convertToMoment(date, this.componentConfig.format, this.componentConfig.locale);
        this.currentDateView = momentDate;
    };
    /**
     * @param {?} change
     * @return {?}
     */
    DatePickerComponent.prototype.onLeftNavClick = function (change) {
        this.onLeftNav.emit(change);
    };
    /**
     * @param {?} change
     * @return {?}
     */
    DatePickerComponent.prototype.onRightNavClick = function (change) {
        this.onRightNav.emit(change);
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.startGlobalListeners = function () {
        var _this = this;
        this.globalListnersUnlisteners.push(this.renderer.listen(document, 'keydown', function (e) {
            _this.onKeyPress(e);
        }), this.renderer.listen(document, 'scroll', function () {
            _this.onScroll();
        }), this.renderer.listen(document, 'click', function () {
            _this.onBodyClick();
        }));
    };
    /**
     * @param {?} locale
     * @return {?}
     */
    DatePickerComponent.prototype.changeLocale = function (locale) {
        this.dayCalendarConfig = Object.assign({}, this.dayCalendarConfig, { locale: locale });
        this.dayTimeCalendarConfig = Object.assign({}, this.dayTimeCalendarConfig, { locale: locale });
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.stopGlobalListeners = function () {
        this.globalListnersUnlisteners.forEach(function (ul) { return ul(); });
        this.globalListnersUnlisteners = [];
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.ngOnDestroy = function () {
        this.handleInnerElementClickUnlisteners.forEach(function (ul) { return ul(); });
        if (this.appendToElement) {
            this.appendToElement.removeChild(this.calendarWrapper);
        }
    };
    return DatePickerComponent;
}());
DatePickerComponent.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                selector: 'dp-date-picker',
                template: "\n    <div [ngClass]=\"{'dp-open': areCalendarsShown}\">\n      <div class=\"dp-input-container\"\n           [hidden]=\"componentConfig.hideInputContainer\"\n           [attr.data-hidden]=\"componentConfig.hideInputContainer\">\n        <input type=\"text\"\n               class=\"dp-picker-input\"\n               [placeholder]=\"placeholder\"\n               [ngModel]=\"inputElementValue\"\n               (ngModelChange)=\"onViewDateChange($event)\"\n               (focus)=\"inputFocused()\"\n               [readonly]=\"componentConfig.disableKeypress\"\n               [disabled]=\"disabled\"/>\n      </div>\n      <div #container>\n        <div class=\"dp-popup {{theme}}\"\n             [ngSwitch]=\"mode\"\n             [hidden]=\"!_areCalendarsShown\"\n             [attr.data-hidden]=\"!_areCalendarsShown\">\n          <dp-day-calendar #dayCalendar\n                           *ngSwitchCase=\"'day'\"\n                           [config]=\"dayCalendarConfig\"\n                           [ngModel]=\"_selected\"\n                           [displayDate]=\"displayDate\"\n                           [theme]=\"theme\"\n                           (onSelect)=\"dateSelected($event, 'day')\"\n                           (onGoToCurrent)=\"onGoToCurrent.emit()\"\n                           (onLeftNav)=\"onLeftNavClick($event)\"\n                           (onRightNav)=\"onRightNavClick($event)\">\n          </dp-day-calendar>\n\n          <dp-month-calendar #monthCalendar\n                             *ngSwitchCase=\"'month'\"\n                             [config]=\"dayCalendarConfig\"\n                             [ngModel]=\"_selected\"\n                             [displayDate]=\"displayDate\"\n                             [theme]=\"theme\"\n                             (onSelect)=\"dateSelected($event, 'month')\"\n                             (onGoToCurrent)=\"onGoToCurrent.emit()\"\n                             (onLeftNav)=\"onLeftNavClick($event)\"\n                             (onRightNav)=\"onRightNavClick($event)\">\n          </dp-month-calendar>\n\n          <dp-time-select #timeSelect\n                          *ngSwitchCase=\"'time'\"\n                          [config]=\"timeSelectConfig\"\n                          [ngModel]=\"_selected && _selected[0]\"\n                          (onChange)=\"dateSelected($event, 'second', true)\"\n                          [theme]=\"theme\">\n          </dp-time-select>\n\n          <dp-day-time-calendar #daytimeCalendar\n                                *ngSwitchCase=\"'daytime'\"\n                                [config]=\"dayTimeCalendarConfig\"\n                                [displayDate]=\"displayDate\"\n                                [ngModel]=\"_selected && _selected[0]\"\n                                [theme]=\"theme\"\n                                (onChange)=\"dateSelected($event, 'second', true)\"\n                                (onGoToCurrent)=\"onGoToCurrent.emit()\"\n                                (onLeftNav)=\"onLeftNavClick($event)\"\n                                (onRightNav)=\"onRightNavClick($event)\">\n          </dp-day-time-calendar>\n        </div>\n      </div>\n    </div>\n  ",
                styles: ["\n    dp-date-picker {\n      display: inline-block;\n    }\n    dp-date-picker.dp-material .dp-picker-input {\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n      height: 30px;\n      width: 252px;\n      font-size: 13px;\n      outline: none;\n    }\n    dp-date-picker .dp-input-container {\n      position: relative;\n    }\n    dp-date-picker .dp-selected {\n      background: rgba(16, 108, 200, 0.5);\n      color: #FFFFFF;\n    }\n    .dp-popup {\n      position: relative;\n      background: #FFFFFF;\n      -webkit-box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.1);\n              box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.1);\n      border-left: 1px solid rgba(0, 0, 0, 0.1);\n      border-right: 1px solid rgba(0, 0, 0, 0.1);\n      border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n      z-index: 9999;\n      white-space: nowrap;\n    }\n  "],
                encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
                changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
                providers: [
                    DatePickerService,
                    DayTimeCalendarService,
                    DayCalendarService,
                    TimeSelectService,
                    {
                        provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALUE_ACCESSOR"],
                        useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return DatePickerComponent; }),
                        multi: true
                    },
                    {
                        provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALIDATORS"],
                        useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return DatePickerComponent; }),
                        multi: true
                    }
                ]
            },] },
];
/**
 * @nocollapse
 */
DatePickerComponent.ctorParameters = function () { return [
    { type: DatePickerService, },
    { type: DomHelper, },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer"], },
    { type: UtilsService, },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"], },
]; };
DatePickerComponent.propDecorators = {
    'config': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'mode': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'placeholder': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'disabled': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'displayDate': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'theme': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"], args: ['class',] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'minDate': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'maxDate': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'minTime': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'maxTime': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'open': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'close': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'onChange': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'onGoToCurrent': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'onLeftNav': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'onRightNav': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'calendarContainer': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['container',] },],
    'dayCalendarRef': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['dayCalendar',] },],
    'monthCalendarRef': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['monthCalendar',] },],
    'dayTimeCalendarRef': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['daytimeCalendar',] },],
    'timeSelectRef': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['timeSelect',] },],
    'onClick': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['click',] },],
    'onScroll': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['window:resize',] },],
};
var DatePickerDirectiveService = (function () {
    /**
     * @param {?} utilsService
     */
    function DatePickerDirectiveService(utilsService) {
        this.utilsService = utilsService;
    }
    /**
     * @param {?} attachTo
     * @param {?} baseElement
     * @return {?}
     */
    DatePickerDirectiveService.prototype.convertToHTMLElement = function (attachTo, baseElement) {
        if (typeof attachTo === 'string') {
            return this.utilsService.closestParent(baseElement, attachTo);
        }
        else if (attachTo) {
            return attachTo.nativeElement;
        }
        return undefined;
    };
    /**
     * @param {?=} config
     * @param {?=} baseElement
     * @param {?=} attachTo
     * @return {?}
     */
    DatePickerDirectiveService.prototype.getConfig = function (config, baseElement, attachTo) {
        if (config === void 0) { config = {}; }
        var /** @type {?} */ _config = Object.assign({}, config);
        _config.hideInputContainer = true;
        var /** @type {?} */ native;
        if (config.inputElementContainer) {
            native = this.utilsService.getNativeElement(config.inputElementContainer);
        }
        else {
            native = baseElement ? baseElement.nativeElement : null;
        }
        if (native) {
            _config.inputElementContainer = attachTo
                ? this.convertToHTMLElement(attachTo, native)
                : native;
        }
        return _config;
    };
    return DatePickerDirectiveService;
}());
DatePickerDirectiveService.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] },
];
/**
 * @nocollapse
 */
DatePickerDirectiveService.ctorParameters = function () { return [
    { type: UtilsService, },
]; };
var DatePickerDirective = (function () {
    /**
     * @param {?} viewContainerRef
     * @param {?} elemRef
     * @param {?} componentFactoryResolver
     * @param {?} service
     * @param {?} formControl
     * @param {?} utilsService
     */
    function DatePickerDirective(viewContainerRef, elemRef, componentFactoryResolver, service, formControl, utilsService) {
        this.viewContainerRef = viewContainerRef;
        this.elemRef = elemRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.service = service;
        this.formControl = formControl;
        this.utilsService = utilsService;
        this._mode = 'day';
        this.open = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.close = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onGoToCurrent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onLeftNav = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onRightNav = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    Object.defineProperty(DatePickerDirective.prototype, "config", {
        /**
         * @return {?}
         */
        get: function () {
            return this._config;
        },
        /**
         * @param {?} config
         * @return {?}
         */
        set: function (config) {
            this._config = this.service.getConfig(config, this.viewContainerRef.element, this.attachTo);
            this.updateDatepickerConfig();
            this.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerDirective.prototype, "attachTo", {
        /**
         * @return {?}
         */
        get: function () {
            return this._attachTo;
        },
        /**
         * @param {?} attachTo
         * @return {?}
         */
        set: function (attachTo) {
            this._attachTo = attachTo;
            this._config = this.service.getConfig(this.config, this.viewContainerRef.element, this.attachTo);
            this.updateDatepickerConfig();
            this.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerDirective.prototype, "theme", {
        /**
         * @return {?}
         */
        get: function () {
            return this._theme;
        },
        /**
         * @param {?} theme
         * @return {?}
         */
        set: function (theme) {
            this._theme = theme;
            if (this.datePicker) {
                this.datePicker.theme = theme;
            }
            this.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerDirective.prototype, "mode", {
        /**
         * @return {?}
         */
        get: function () {
            return this._mode;
        },
        /**
         * @param {?} mode
         * @return {?}
         */
        set: function (mode) {
            this._mode = mode;
            if (this.datePicker) {
                this.datePicker.mode = mode;
            }
            this.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerDirective.prototype, "minDate", {
        /**
         * @return {?}
         */
        get: function () {
            return this._minDate;
        },
        /**
         * @param {?} minDate
         * @return {?}
         */
        set: function (minDate) {
            this._minDate = minDate;
            if (this.datePicker) {
                this.datePicker.minDate = minDate;
                this.datePicker.ngOnInit();
            }
            this.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerDirective.prototype, "maxDate", {
        /**
         * @return {?}
         */
        get: function () {
            return this._maxDate;
        },
        /**
         * @param {?} maxDate
         * @return {?}
         */
        set: function (maxDate) {
            this._maxDate = maxDate;
            if (this.datePicker) {
                this.datePicker.maxDate = maxDate;
                this.datePicker.ngOnInit();
            }
            this.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerDirective.prototype, "minTime", {
        /**
         * @return {?}
         */
        get: function () {
            return this._minTime;
        },
        /**
         * @param {?} minTime
         * @return {?}
         */
        set: function (minTime) {
            this._minTime = minTime;
            if (this.datePicker) {
                this.datePicker.minTime = minTime;
                this.datePicker.ngOnInit();
            }
            this.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerDirective.prototype, "maxTime", {
        /**
         * @return {?}
         */
        get: function () {
            return this._maxTime;
        },
        /**
         * @param {?} maxTime
         * @return {?}
         */
        set: function (maxTime) {
            this._maxTime = maxTime;
            if (this.datePicker) {
                this.datePicker.maxTime = maxTime;
                this.datePicker.ngOnInit();
            }
            this.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerDirective.prototype, "displayDate", {
        /**
         * @return {?}
         */
        get: function () {
            return this._displayDate;
        },
        /**
         * @param {?} displayDate
         * @return {?}
         */
        set: function (displayDate) {
            this._displayDate = displayDate;
            this.updateDatepickerConfig();
            this.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DatePickerDirective.prototype.ngOnInit = function () {
        this.datePicker = this.createDatePicker();
        this.api = this.datePicker.api;
        this.updateDatepickerConfig();
        this.attachModelToDatePicker();
        this.datePicker.theme = this.theme;
    };
    /**
     * @return {?}
     */
    DatePickerDirective.prototype.createDatePicker = function () {
        var /** @type {?} */ factory = this.componentFactoryResolver.resolveComponentFactory(DatePickerComponent);
        return this.viewContainerRef.createComponent(factory).instance;
    };
    /**
     * @return {?}
     */
    DatePickerDirective.prototype.attachModelToDatePicker = function () {
        var _this = this;
        if (!this.formControl) {
            return;
        }
        this.datePicker.onViewDateChange(this.formControl.value);
        this.formControl.valueChanges.subscribe(function (value) {
            if (value !== _this.datePicker.inputElementValue) {
                var /** @type {?} */ strVal = _this.utilsService.convertToString(value, _this.datePicker.componentConfig.format, _this.datePicker.componentConfig.locale);
                _this.datePicker.onViewDateChange(strVal);
            }
        });
        var /** @type {?} */ setup = true;
        this.datePicker.registerOnChange(function (value, changedByInput) {
            if (value) {
                var /** @type {?} */ isMultiselectEmpty = setup && Array.isArray(value) && !value.length;
                if (!isMultiselectEmpty && !changedByInput) {
                    _this.formControl.control.setValue(_this.datePicker.inputElementValue);
                }
            }
            var /** @type {?} */ errors = _this.datePicker.validateFn(value);
            if (!setup) {
                _this.formControl.control.markAsDirty({
                    onlySelf: true
                });
            }
            else {
                setup = false;
            }
            if (errors) {
                if (errors.hasOwnProperty('format')) {
                    var given = errors['format'].given;
                    _this.datePicker.inputElementValue = given;
                    if (!changedByInput) {
                        _this.formControl.control.setValue(given);
                    }
                }
                _this.formControl.control.setErrors(errors);
            }
        });
    };
    /**
     * @return {?}
     */
    DatePickerDirective.prototype.onClick = function () {
        this.datePicker.onClick();
    };
    /**
     * @return {?}
     */
    DatePickerDirective.prototype.onFocus = function () {
        this.datePicker.inputFocused();
    };
    /**
     * @return {?}
     */
    DatePickerDirective.prototype.updateDatepickerConfig = function () {
        if (this.datePicker) {
            this.datePicker.minDate = this.minDate;
            this.datePicker.maxDate = this.maxDate;
            this.datePicker.minTime = this.minTime;
            this.datePicker.maxTime = this.maxTime;
            this.datePicker.mode = this.mode || 'day';
            this.datePicker.displayDate = this.displayDate;
            this.datePicker.config = this.config;
            this.datePicker.open = this.open;
            this.datePicker.close = this.close;
            this.datePicker.onChange = this.onChange;
            this.datePicker.onGoToCurrent = this.onGoToCurrent;
            this.datePicker.onLeftNav = this.onLeftNav;
            this.datePicker.onRightNav = this.onRightNav;
            this.datePicker.init();
            if (this.datePicker.componentConfig.disableKeypress) {
                this.elemRef.nativeElement.setAttribute('readonly', true);
            }
            else {
                this.elemRef.nativeElement.removeAttribute('readonly');
            }
        }
    };
    /**
     * @return {?}
     */
    DatePickerDirective.prototype.markForCheck = function () {
        if (this.datePicker) {
            this.datePicker.cd.markForCheck();
        }
    };
    return DatePickerDirective;
}());
DatePickerDirective.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
                exportAs: 'dpDayPicker',
                providers: [DatePickerDirectiveService],
                selector: '[dpDayPicker]'
            },] },
];
/**
 * @nocollapse
 */
DatePickerDirective.ctorParameters = function () { return [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"], },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], },
    { type: DatePickerDirectiveService, },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControl"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"] },] },
    { type: UtilsService, },
]; };
DatePickerDirective.propDecorators = {
    'config': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"], args: ['dpDayPicker',] },],
    'attachTo': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'theme': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'mode': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'minDate': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'maxDate': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'minTime': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'maxTime': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'displayDate': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'open': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'close': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'onChange': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'onGoToCurrent': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'onLeftNav': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'onRightNav': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'onClick': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['click',] },],
    'onFocus': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['focus',] },],
};
var moment$6 = jalali_moment__WEBPACK_IMPORTED_MODULE_3__;
var DayCalendarComponent = (function () {
    /**
     * @param {?} dayCalendarService
     * @param {?} utilsService
     * @param {?} cd
     */
    function DayCalendarComponent(dayCalendarService, utilsService, cd) {
        this.dayCalendarService = dayCalendarService;
        this.utilsService = utilsService;
        this.cd = cd;
        this.onSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onMonthSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onNavHeaderBtnClick = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onGoToCurrent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onLeftNav = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onRightNav = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.CalendarMode = ECalendarMode;
        this.isInited = false;
        this.currentCalendarMode = ECalendarMode.Day;
        this._shouldShowCurrent = true;
        this.api = {
            moveCalendarsBy: this.moveCalendarsBy.bind(this),
            moveCalendarTo: this.moveCalendarTo.bind(this),
            toggleCalendarMode: this.toggleCalendarMode.bind(this)
        };
    }
    Object.defineProperty(DayCalendarComponent.prototype, "selected", {
        /**
         * @return {?}
         */
        get: function () {
            return this._selected;
        },
        /**
         * @param {?} selected
         * @return {?}
         */
        set: function (selected) {
            this._selected = selected;
            this.onChangeCallback(this.processOnChangeCallback(selected));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayCalendarComponent.prototype, "currentDateView", {
        /**
         * @return {?}
         */
        get: function () {
            return this._currentDateView;
        },
        /**
         * @param {?} current
         * @return {?}
         */
        set: function (current) {
            this._currentDateView = current.clone();
            this.weeks = this.dayCalendarService
                .generateMonthArray(this.componentConfig, this._currentDateView, this.selected);
            this.navLabel = this.dayCalendarService.getHeaderLabel(this.componentConfig, this._currentDateView);
            this.showLeftNav = this.dayCalendarService.shouldShowLeft(this.componentConfig.min, this.currentDateView);
            this.showRightNav = this.dayCalendarService.shouldShowRight(this.componentConfig.max, this.currentDateView);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DayCalendarComponent.prototype.ngOnInit = function () {
        this.isInited = true;
        this.init();
        this.initValidators();
    };
    /**
     * @return {?}
     */
    DayCalendarComponent.prototype.init = function () {
        this.componentConfig = this.dayCalendarService.getConfig(this.config);
        this.selected = this.selected || [];
        this.currentDateView = this.displayDate
            ? this.utilsService.convertToMoment(this.displayDate, this.componentConfig.format, this.componentConfig.locale).clone()
            : this.utilsService
                .getDefaultDisplayDate(this.currentDateView, this.selected, this.componentConfig.allowMultiSelect, this.componentConfig.min, this.componentConfig.locale);
        this.weekdays = this.dayCalendarService
            .generateWeekdays(this.componentConfig.firstDayOfWeek, this.componentConfig.locale);
        this.inputValueType = this.utilsService.getInputType(this.inputValue, this.componentConfig.allowMultiSelect);
        this.monthCalendarConfig = this.dayCalendarService.getMonthCalendarConfig(this.componentConfig);
        this._shouldShowCurrent = this.shouldShowCurrent();
    };
    /**
     * @return {?}
     */
    DayCalendarComponent.prototype.isFarsi = function () {
        return this.componentConfig.locale === 'fa';
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    DayCalendarComponent.prototype.ngOnChanges = function (changes) {
        if (this.isInited) {
            var minDate = changes.minDate, maxDate = changes.maxDate, config = changes.config;
            this.handleConfigChange(config);
            this.init();
            if (minDate || maxDate) {
                this.initValidators();
            }
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DayCalendarComponent.prototype.writeValue = function (value) {
        if (value === this.inputValue
            || (this.inputValue
                && (moment$6.isMoment(this.inputValue)) && ((this.inputValue)).isSame(/** @type {?} */ (value)))) {
            return;
        }
        this.inputValue = value;
        if (value) {
            this.selected = this.utilsService
                .convertToMomentArray(value, this.componentConfig.format, this.componentConfig.allowMultiSelect, this.componentConfig.locale);
            this.inputValueType = this.utilsService
                .getInputType(this.inputValue, this.componentConfig.allowMultiSelect);
        }
        else {
            this.selected = [];
        }
        this.weeks = this.dayCalendarService
            .generateMonthArray(this.componentConfig, this.currentDateView, this.selected);
        this.cd.markForCheck();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DayCalendarComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @param {?} _
     * @return {?}
     */
    DayCalendarComponent.prototype.onChangeCallback = function (_) {
    };
    ;
    /**
     * @param {?} fn
     * @return {?}
     */
    DayCalendarComponent.prototype.registerOnTouched = function (fn) {
    };
    /**
     * @param {?} formControl
     * @return {?}
     */
    DayCalendarComponent.prototype.validate = function (formControl) {
        if (this.minDate || this.maxDate) {
            return this.validateFn(formControl.value);
        }
        else {
            return function () { return null; };
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DayCalendarComponent.prototype.processOnChangeCallback = function (value) {
        return this.utilsService.convertFromMomentArray(this.componentConfig.format, value, this.componentConfig.returnedValueType || this.inputValueType, this.componentConfig.locale);
    };
    /**
     * @return {?}
     */
    DayCalendarComponent.prototype.initValidators = function () {
        this.validateFn = this.utilsService.createValidator({ minDate: this.minDate, maxDate: this.maxDate }, this.componentConfig.format, 'day', this.componentConfig.locale);
        this.onChangeCallback(this.processOnChangeCallback(this.selected));
    };
    /**
     * @param {?} day
     * @return {?}
     */
    DayCalendarComponent.prototype.dayClicked = function (day) {
        if (day.selected && !this.componentConfig.unSelectOnClick) {
            return;
        }
        this.selected = this.utilsService
            .updateSelected(this.componentConfig.allowMultiSelect, this.selected, day);
        this.weeks = this.dayCalendarService
            .generateMonthArray(this.componentConfig, this.currentDateView, this.selected);
        this.onSelect.emit(day);
    };
    /**
     * @param {?} day
     * @return {?}
     */
    DayCalendarComponent.prototype.getDayBtnText = function (day) {
        return this.dayCalendarService.getDayBtnText(this.componentConfig, day.date);
    };
    /**
     * @param {?} day
     * @return {?}
     */
    DayCalendarComponent.prototype.getDayBtnCssClass = function (day) {
        var /** @type {?} */ cssClasses = {
            'dp-selected': day.selected,
            'dp-current-month': day.currentMonth,
            'dp-prev-month': day.prevMonth,
            'dp-next-month': day.nextMonth,
            'dp-current-day': day.currentDay
        };
        var /** @type {?} */ customCssClass = this.dayCalendarService.getDayBtnCssClass(this.componentConfig, day.date);
        if (customCssClass) {
            cssClasses[customCssClass] = true;
        }
        return cssClasses;
    };
    /**
     * @return {?}
     */
    DayCalendarComponent.prototype.onLeftNavClick = function () {
        var /** @type {?} */ from = this.currentDateView.clone();
        this.moveCalendarsBy(this.currentDateView, -1, 'month');
        var /** @type {?} */ to = this.currentDateView.clone();
        this.onLeftNav.emit({ from: from, to: to });
    };
    /**
     * @return {?}
     */
    DayCalendarComponent.prototype.onRightNavClick = function () {
        var /** @type {?} */ from = this.currentDateView.clone();
        this.moveCalendarsBy(this.currentDateView, 1, 'month');
        var /** @type {?} */ to = this.currentDateView.clone();
        this.onRightNav.emit({ from: from, to: to });
    };
    /**
     * @param {?} change
     * @return {?}
     */
    DayCalendarComponent.prototype.onMonthCalendarLeftClick = function (change) {
        this.onLeftNav.emit(change);
    };
    /**
     * @param {?} change
     * @return {?}
     */
    DayCalendarComponent.prototype.onMonthCalendarRightClick = function (change) {
        this.onRightNav.emit(change);
    };
    /**
     * @param {?} change
     * @return {?}
     */
    DayCalendarComponent.prototype.onMonthCalendarSecondaryLeftClick = function (change) {
        this.onRightNav.emit(change);
    };
    /**
     * @param {?} change
     * @return {?}
     */
    DayCalendarComponent.prototype.onMonthCalendarSecondaryRightClick = function (change) {
        this.onLeftNav.emit(change);
    };
    /**
     * @param {?} weekday
     * @return {?}
     */
    DayCalendarComponent.prototype.getWeekdayName = function (weekday) {
        if (this.componentConfig.weekDayFormatter) {
            return this.componentConfig.weekDayFormatter(weekday.day());
        }
        return weekday.format(this.componentConfig.weekDayFormat);
    };
    /**
     * @param {?} mode
     * @return {?}
     */
    DayCalendarComponent.prototype.toggleCalendarMode = function (mode) {
        if (this.currentCalendarMode !== mode) {
            this.currentCalendarMode = mode;
            this.onNavHeaderBtnClick.emit(mode);
        }
        this.cd.markForCheck();
    };
    /**
     * @param {?} month
     * @return {?}
     */
    DayCalendarComponent.prototype.monthSelected = function (month) {
        this.currentDateView = month.date.clone();
        this.currentCalendarMode = ECalendarMode.Day;
        this.onMonthSelect.emit(month);
    };
    /**
     * @param {?} current
     * @param {?} amount
     * @param {?=} granularity
     * @return {?}
     */
    DayCalendarComponent.prototype.moveCalendarsBy = function (current, amount, granularity) {
        if (granularity === void 0) { granularity = 'month'; }
        this.currentDateView = current.clone().add(amount, granularity);
        this.cd.markForCheck();
    };
    /**
     * @param {?} to
     * @return {?}
     */
    DayCalendarComponent.prototype.moveCalendarTo = function (to) {
        if (to) {
            this.currentDateView = this.utilsService.convertToMoment(to, this.componentConfig.format, this.componentConfig.locale);
        }
        this.cd.markForCheck();
    };
    /**
     * @return {?}
     */
    DayCalendarComponent.prototype.shouldShowCurrent = function () {
        return this.utilsService.shouldShowCurrent(this.componentConfig.showGoToCurrent, 'day', this.componentConfig.min, this.componentConfig.max);
    };
    /**
     * @return {?}
     */
    DayCalendarComponent.prototype.goToCurrent = function () {
        this.currentDateView = moment$6().locale(this.componentConfig.locale);
        this.onGoToCurrent.emit();
    };
    /**
     * @param {?} config
     * @return {?}
     */
    DayCalendarComponent.prototype.handleConfigChange = function (config) {
        if (config) {
            var /** @type {?} */ prevConf = this.dayCalendarService.getConfig(config.previousValue);
            var /** @type {?} */ currentConf = this.dayCalendarService.getConfig(config.currentValue);
            if (this.utilsService.shouldResetCurrentView(prevConf, currentConf)) {
                this._currentDateView = null;
            }
        }
    };
    return DayCalendarComponent;
}());
DayCalendarComponent.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                selector: 'dp-day-calendar',
                template: "\n    <div class=\"dp-day-calendar-container\" *ngIf=\"currentCalendarMode ===  CalendarMode.Day\">\n      <dp-calendar-nav\n          [label]=\"navLabel\"\n          [showLeftNav]=\"showLeftNav\"\n          [showRightNav]=\"showRightNav\"\n          [isLabelClickable]=\"componentConfig.enableMonthSelector\"\n          [showGoToCurrent]=\"_shouldShowCurrent\"\n          [theme]=\"theme\"\n          (onLeftNav)=\"onLeftNavClick()\"\n          (onRightNav)=\"onRightNavClick()\"\n          (onLabelClick)=\"toggleCalendarMode(CalendarMode.Month)\"\n          (onGoToCurrent)=\"goToCurrent()\">\n      </dp-calendar-nav>\n\n      <div class=\"dp-calendar-wrapper\"\n           [ngClass]=\"{'dp-hide-near-month': !componentConfig.showNearMonthDays,'rtl':isFarsi()}\">\n        <div class=\"dp-weekdays\">\n          <span class=\"dp-calendar-weekday\"\n                *ngFor=\"let weekday of weekdays\"\n                [innerText]=\"getWeekdayName(weekday)\">\n          </span>\n        </div>\n        <div class=\"dp-calendar-week\" *ngFor=\"let week of weeks\">\n          <span class=\"dp-week-number\"\n                *ngIf=\"componentConfig.showWeekNumbers\"\n                [innerText]=\"week[0].date.isoWeek()\">\n          </span>\n          <button type=\"button\"\n                  class=\"dp-calendar-day\"\n                  *ngFor=\"let day of week\"\n                  [attr.data-date]=\"day.date.format(componentConfig.format)\"\n                  (click)=\"dayClicked(day)\"\n                  [disabled]=\"day.disabled\"\n                  [ngClass]=\"getDayBtnCssClass(day)\"\n                  [innerText]=\"getDayBtnText(day)\">\n          </button>\n        </div>\n      </div>\n    </div>\n\n    <dp-month-calendar\n        *ngIf=\"currentCalendarMode ===  CalendarMode.Month\"\n        [config]=\"monthCalendarConfig\"\n        [displayDate]=\"_currentDateView\"\n        [theme]=\"theme\"\n        (onSelect)=\"monthSelected($event)\"\n        (onNavHeaderBtnClick)=\"toggleCalendarMode(CalendarMode.Day)\"\n        (onLeftNav)=\"onMonthCalendarLeftClick($event)\"\n        (onRightNav)=\"onMonthCalendarRightClick($event)\"\n        (onLeftSecondaryNav)=\"onMonthCalendarSecondaryLeftClick($event)\"\n        (onRightSecondaryNav)=\"onMonthCalendarSecondaryRightClick($event)\">\n    </dp-month-calendar>\n  ",
                styles: ["\n    dp-day-calendar {\n      display: inline-block;\n    }\n    dp-day-calendar .dp-day-calendar-container {\n      background: #FFFFFF;\n    }\n    dp-day-calendar .dp-calendar-wrapper {\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n    }\n    dp-day-calendar .dp-calendar-wrapper .dp-calendar-weekday:first-child {\n      border-left: none;\n    }\n    dp-day-calendar .dp-weekdays {\n      font-size: 15px;\n      margin-bottom: 5px;\n    }\n    dp-day-calendar .dp-calendar-weekday {\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n      display: inline-block;\n      width: 30px;\n      text-align: center;\n      border-left: 1px solid #000000;\n      border-bottom: 1px solid #000000;\n    }\n    dp-day-calendar .dp-calendar-day {\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n      width: 30px;\n      height: 30px;\n      cursor: pointer;\n    }\n    dp-day-calendar .dp-selected {\n      background: rgba(16, 108, 200, 0.5);\n      color: #FFFFFF;\n    }\n    dp-day-calendar .dp-prev-month,\n    dp-day-calendar .dp-next-month {\n      opacity: 0.5;\n    }\n    dp-day-calendar .dp-hide-near-month .dp-prev-month,\n    dp-day-calendar .dp-hide-near-month .dp-next-month {\n      visibility: hidden;\n    }\n    dp-day-calendar .dp-week-number {\n      position: absolute;\n      font-size: 9px;\n    }\n    dp-day-calendar.dp-material .dp-calendar-weekday {\n      height: 25px;\n      width: 30px;\n      line-height: 25px;\n      color: rgba(16, 108, 200, 0.5);\n      border: none;\n      font-size: 0.75rem;\n      opacity: 0.6;\n    }\n    dp-day-calendar.dp-material .dp-calendar-weekday:last-child {\n      color: red;\n    }\n    dp-day-calendar.dp-material .dp-calendar-wrapper {\n      padding: 20px;\n    }\n    dp-day-calendar.dp-material .dp-calendar-wrapper.rtl {\n      direction: rtl;\n    }\n    dp-day-calendar.dp-material .dp-calendar-month,\n    dp-day-calendar.dp-material .dp-calendar-day {\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n      background: #FFFFFF;\n      border-radius: 0%;\n      -webkit-transition: border-radius 0.1s ease;\n      transition: border-radius 0.1s ease;\n      border: none;\n      outline: none;\n      padding: 0;\n    }\n    dp-day-calendar.dp-material .dp-calendar-month:hover,\n    dp-day-calendar.dp-material .dp-calendar-day:hover {\n      background: #E0E0E0;\n      border-radius: 50%;\n    }\n    dp-day-calendar.dp-material .dp-selected {\n      border-radius: 50%;\n      background: rgba(16, 108, 200, 0.5);\n      color: #FFFFFF;\n    }\n    dp-day-calendar.dp-material .dp-selected:hover {\n      background: rgba(16, 108, 200, 0.5);\n    }\n    dp-day-calendar.dp-material .dp-current-day {\n      border-radius: 50%;\n      border: 1px solid rgba(16, 108, 200, 0.5);\n    }\n  "],
                encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
                changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
                providers: [
                    DayCalendarService,
                    {
                        provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALUE_ACCESSOR"],
                        useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return DayCalendarComponent; }),
                        multi: true
                    },
                    {
                        provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALIDATORS"],
                        useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return DayCalendarComponent; }),
                        multi: true
                    }
                ]
            },] },
];
/**
 * @nocollapse
 */
DayCalendarComponent.ctorParameters = function () { return [
    { type: DayCalendarService, },
    { type: UtilsService, },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"], },
]; };
DayCalendarComponent.propDecorators = {
    'config': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'displayDate': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'minDate': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'maxDate': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'theme': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"], args: ['class',] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'onSelect': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'onMonthSelect': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'onNavHeaderBtnClick': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'onGoToCurrent': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'onLeftNav': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'onRightNav': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
};
var moment$8 = jalali_moment__WEBPACK_IMPORTED_MODULE_3__;
var MonthCalendarService = (function () {
    /**
     * @param {?} utilsService
     */
    function MonthCalendarService(utilsService) {
        this.utilsService = utilsService;
        this.DEFAULT_CONFIG = {
            allowMultiSelect: false,
            yearFormat: 'YYYY',
            format: 'MMMM-YYYY',
            isNavHeaderBtnClickable: false,
            monthBtnFormat: 'MMMM',
            locale: 'fa',
            multipleYearsNavigateBy: 10,
            showMultipleYearsNavigation: false,
            unSelectOnClick: true
        };
        this.GREGORIAN_DEFAULT_CONFIG = {
            format: 'MM-YYYY',
            monthBtnFormat: 'MMM',
            locale: 'en'
        };
    }
    /**
     * @param {?} config
     * @return {?}
     */
    MonthCalendarService.prototype.getConfig = function (config) {
        var /** @type {?} */ _config = (Object.assign({}, this.DEFAULT_CONFIG, ((config && config.locale && config.locale !== 'fa') ? this.GREGORIAN_DEFAULT_CONFIG : {}), this.utilsService.clearUndefined(config)));
        this.utilsService.convertPropsToMoment(_config, _config.format, ['min', 'max'], _config.locale);
        // moment.locale(_config.locale);
        return _config;
    };
    /**
     * @param {?} config
     * @param {?} year
     * @param {?=} selected
     * @return {?}
     */
    MonthCalendarService.prototype.generateYear = function (config, year, selected) {
        var _this = this;
        if (selected === void 0) { selected = null; }
        var /** @type {?} */ index = year.clone().startOf('year');
        return this.utilsService.createArray(3).map(function () {
            return _this.utilsService.createArray(4).map(function () {
                var /** @type {?} */ date = index.clone();
                var /** @type {?} */ month = {
                    date: date,
                    selected: !!selected.find(function (s) { return index.isSame(s, 'month'); }),
                    currentMonth: index.isSame(moment$8(), 'month'),
                    disabled: _this.isMonthDisabled(date, config),
                    text: _this.getMonthBtnText(config, date)
                };
                index.add(1, 'month');
                return month;
            });
        });
    };
    /**
     * @param {?} date
     * @param {?} config
     * @return {?}
     */
    MonthCalendarService.prototype.isMonthDisabled = function (date, config) {
        if (config.min && date.isBefore(config.min, 'month')) {
            return true;
        }
        return !!(config.max && date.isAfter(config.max, 'month'));
    };
    /**
     * @param {?} min
     * @param {?} currentMonthView
     * @return {?}
     */
    MonthCalendarService.prototype.shouldShowLeft = function (min, currentMonthView) {
        return min ? min.isBefore(currentMonthView, 'year') : true;
    };
    /**
     * @param {?} max
     * @param {?} currentMonthView
     * @return {?}
     */
    MonthCalendarService.prototype.shouldShowRight = function (max, currentMonthView) {
        return max ? max.isAfter(currentMonthView, 'year') : true;
    };
    /**
     * @param {?} config
     * @param {?} year
     * @return {?}
     */
    MonthCalendarService.prototype.getHeaderLabel = function (config, year) {
        if (config.yearFormatter) {
            return config.yearFormatter(year);
        }
        year.locale(config.locale);
        return year.format(config.yearFormat);
    };
    /**
     * @param {?} config
     * @param {?} month
     * @return {?}
     */
    MonthCalendarService.prototype.getMonthBtnText = function (config, month) {
        if (config.monthBtnFormatter) {
            return config.monthBtnFormatter(month);
        }
        return month.format(config.monthBtnFormat);
    };
    /**
     * @param {?} config
     * @param {?} month
     * @return {?}
     */
    MonthCalendarService.prototype.getMonthBtnCssClass = function (config, month) {
        if (config.monthBtnCssClassCallback) {
            return config.monthBtnCssClassCallback(month);
        }
        return '';
    };
    return MonthCalendarService;
}());
MonthCalendarService.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] },
];
/**
 * @nocollapse
 */
MonthCalendarService.ctorParameters = function () { return [
    { type: UtilsService, },
]; };
var moment$7 = jalali_moment__WEBPACK_IMPORTED_MODULE_3__;
var MonthCalendarComponent = (function () {
    /**
     * @param {?} monthCalendarService
     * @param {?} utilsService
     * @param {?} cd
     */
    function MonthCalendarComponent(monthCalendarService, utilsService, cd) {
        this.monthCalendarService = monthCalendarService;
        this.utilsService = utilsService;
        this.cd = cd;
        this.onSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onNavHeaderBtnClick = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onGoToCurrent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onLeftNav = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onRightNav = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onLeftSecondaryNav = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onRightSecondaryNav = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.isInited = false;
        this._shouldShowCurrent = true;
        this.api = {
            toggleCalendar: this.toggleCalendarMode.bind(this),
            moveCalendarTo: this.moveCalendarTo.bind(this)
        };
    }
    Object.defineProperty(MonthCalendarComponent.prototype, "selected", {
        /**
         * @return {?}
         */
        get: function () {
            return this._selected;
        },
        /**
         * @param {?} selected
         * @return {?}
         */
        set: function (selected) {
            this._selected = selected;
            this.onChangeCallback(this.processOnChangeCallback(selected));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonthCalendarComponent.prototype, "currentDateView", {
        /**
         * @return {?}
         */
        get: function () {
            return this._currentDateView;
        },
        /**
         * @param {?} current
         * @return {?}
         */
        set: function (current) {
            this._currentDateView = current.clone();
            this.yearMonths = this.monthCalendarService
                .generateYear(this.componentConfig, this._currentDateView, this.selected);
            this.navLabel = this.monthCalendarService.getHeaderLabel(this.componentConfig, this.currentDateView);
            this.showLeftNav = this.monthCalendarService.shouldShowLeft(this.componentConfig.min, this._currentDateView);
            this.showRightNav = this.monthCalendarService.shouldShowRight(this.componentConfig.max, this.currentDateView);
            this.showSecondaryLeftNav = this.componentConfig.showMultipleYearsNavigation && this.showLeftNav;
            this.showSecondaryRightNav = this.componentConfig.showMultipleYearsNavigation && this.showRightNav;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MonthCalendarComponent.prototype.ngOnInit = function () {
        this.isInited = true;
        this.init();
        this.initValidators();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    MonthCalendarComponent.prototype.ngOnChanges = function (changes) {
        if (this.isInited) {
            var minDate = changes.minDate, maxDate = changes.maxDate, config = changes.config;
            this.handleConfigChange(config);
            this.init();
            if (minDate || maxDate) {
                this.initValidators();
            }
        }
    };
    /**
     * @return {?}
     */
    MonthCalendarComponent.prototype.init = function () {
        this.componentConfig = this.monthCalendarService.getConfig(this.config);
        this.selected = this.selected || [];
        this.currentDateView = this.displayDate
            ? this.displayDate
            : this.utilsService
                .getDefaultDisplayDate(this.currentDateView, this.selected, this.componentConfig.allowMultiSelect, this.componentConfig.min, this.componentConfig.locale);
        this.inputValueType = this.utilsService.getInputType(this.inputValue, this.componentConfig.allowMultiSelect);
        this._shouldShowCurrent = this.shouldShowCurrent();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MonthCalendarComponent.prototype.writeValue = function (value) {
        this.inputValue = value;
        if (value) {
            this.selected = this.utilsService
                .convertToMomentArray(value, this.componentConfig.format, this.componentConfig.allowMultiSelect, this.componentConfig.locale);
            this.yearMonths = this.monthCalendarService
                .generateYear(this.componentConfig, this.currentDateView, this.selected);
            this.inputValueType = this.utilsService.getInputType(this.inputValue, this.componentConfig.allowMultiSelect);
        }
        this.cd.markForCheck();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    MonthCalendarComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @param {?} _
     * @return {?}
     */
    MonthCalendarComponent.prototype.onChangeCallback = function (_) {
    };
    ;
    /**
     * @param {?} fn
     * @return {?}
     */
    MonthCalendarComponent.prototype.registerOnTouched = function (fn) {
    };
    /**
     * @param {?} formControl
     * @return {?}
     */
    MonthCalendarComponent.prototype.validate = function (formControl) {
        if (this.minDate || this.maxDate) {
            return this.validateFn(formControl.value);
        }
        else {
            return function () { return null; };
        }
    };
    /**
     * @return {?}
     */
    MonthCalendarComponent.prototype.isFarsi = function () {
        return this.componentConfig.locale === 'fa';
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MonthCalendarComponent.prototype.processOnChangeCallback = function (value) {
        return this.utilsService.convertFromMomentArray(this.componentConfig.format, value, this.componentConfig.returnedValueType || this.inputValueType, this.componentConfig.locale);
    };
    /**
     * @return {?}
     */
    MonthCalendarComponent.prototype.initValidators = function () {
        this.validateFn = this.validateFn = this.utilsService.createValidator({ minDate: this.minDate, maxDate: this.maxDate }, this.componentConfig.format, 'month', this.componentConfig.locale);
        this.onChangeCallback(this.processOnChangeCallback(this.selected));
    };
    /**
     * @param {?} month
     * @return {?}
     */
    MonthCalendarComponent.prototype.monthClicked = function (month) {
        if (month.selected && !this.componentConfig.unSelectOnClick) {
            return;
        }
        this.selected = this.utilsService
            .updateSelected(this.componentConfig.allowMultiSelect, this.selected, month, 'month');
        this.yearMonths = this.monthCalendarService
            .generateYear(this.componentConfig, this.currentDateView, this.selected);
        this.onSelect.emit(month);
    };
    /**
     * @return {?}
     */
    MonthCalendarComponent.prototype.onLeftNavClick = function () {
        var /** @type {?} */ from = this.currentDateView.clone();
        this.currentDateView = this.currentDateView.clone().subtract(1, 'year');
        var /** @type {?} */ to = this.currentDateView.clone();
        this.yearMonths = this.monthCalendarService.generateYear(this.componentConfig, this.currentDateView, this.selected);
        this.onLeftNav.emit({ from: from, to: to });
    };
    /**
     * @return {?}
     */
    MonthCalendarComponent.prototype.onLeftSecondaryNavClick = function () {
        var /** @type {?} */ navigateBy = this.componentConfig.multipleYearsNavigateBy;
        var /** @type {?} */ isOutsideRange = this.componentConfig.min &&
            this.currentDateView.year() - this.componentConfig.min.year() < navigateBy;
        if (isOutsideRange) {
            navigateBy = this.currentDateView.year() - this.componentConfig.min.year();
        }
        var /** @type {?} */ from = this.currentDateView.clone();
        this.currentDateView = this.currentDateView.clone().subtract(navigateBy, 'year');
        var /** @type {?} */ to = this.currentDateView.clone();
        this.onLeftSecondaryNav.emit({ from: from, to: to });
    };
    /**
     * @return {?}
     */
    MonthCalendarComponent.prototype.onRightNavClick = function () {
        var /** @type {?} */ from = this.currentDateView.clone();
        this.currentDateView = this.currentDateView.clone().add(1, 'year');
        var /** @type {?} */ to = this.currentDateView.clone();
        this.onRightNav.emit({ from: from, to: to });
    };
    /**
     * @return {?}
     */
    MonthCalendarComponent.prototype.onRightSecondaryNavClick = function () {
        var /** @type {?} */ navigateBy = this.componentConfig.multipleYearsNavigateBy;
        var /** @type {?} */ isOutsideRange = this.componentConfig.max &&
            this.componentConfig.max.year() - this.currentDateView.year() < navigateBy;
        if (isOutsideRange) {
            navigateBy = this.componentConfig.max.year() - this.currentDateView.year();
        }
        var /** @type {?} */ from = this.currentDateView.clone();
        this.currentDateView = this.currentDateView.clone().add(navigateBy, 'year');
        var /** @type {?} */ to = this.currentDateView.clone();
        this.onRightSecondaryNav.emit({ from: from, to: to });
    };
    /**
     * @return {?}
     */
    MonthCalendarComponent.prototype.toggleCalendarMode = function () {
        this.onNavHeaderBtnClick.emit();
    };
    /**
     * @param {?} month
     * @return {?}
     */
    MonthCalendarComponent.prototype.getMonthBtnCssClass = function (month) {
        var /** @type {?} */ cssClass = {
            'dp-selected': month.selected,
            'dp-current-month': month.currentMonth
        };
        var /** @type {?} */ customCssClass = this.monthCalendarService.getMonthBtnCssClass(this.componentConfig, month.date);
        if (customCssClass) {
            cssClass[customCssClass] = true;
        }
        return cssClass;
    };
    /**
     * @return {?}
     */
    MonthCalendarComponent.prototype.shouldShowCurrent = function () {
        return this.utilsService.shouldShowCurrent(this.componentConfig.showGoToCurrent, 'month', this.componentConfig.min, this.componentConfig.max);
    };
    /**
     * @return {?}
     */
    MonthCalendarComponent.prototype.goToCurrent = function () {
        this.currentDateView = moment$7().locale(this.componentConfig.locale);
        this.onGoToCurrent.emit();
    };
    /**
     * @param {?} to
     * @return {?}
     */
    MonthCalendarComponent.prototype.moveCalendarTo = function (to) {
        if (to) {
            this.currentDateView = this.utilsService.convertToMoment(to, this.componentConfig.format, this.componentConfig.locale);
            this.cd.markForCheck();
        }
    };
    /**
     * @param {?} config
     * @return {?}
     */
    MonthCalendarComponent.prototype.handleConfigChange = function (config) {
        if (config) {
            var /** @type {?} */ prevConf = this.monthCalendarService.getConfig(config.previousValue);
            var /** @type {?} */ currentConf = this.monthCalendarService.getConfig(config.currentValue);
            if (this.utilsService.shouldResetCurrentView(prevConf, currentConf)) {
                this._currentDateView = null;
            }
        }
    };
    return MonthCalendarComponent;
}());
MonthCalendarComponent.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                selector: 'dp-month-calendar',
                template: "\n    <div class=\"dp-month-calendar-container\">\n      <dp-calendar-nav\n          [label]=\"navLabel\"\n          [showLeftNav]=\"showLeftNav\"\n          [showLeftSecondaryNav]=\"showSecondaryLeftNav\"\n          [showRightNav]=\"showRightNav\"\n          [showRightSecondaryNav]=\"showSecondaryRightNav\"\n          [isLabelClickable]=\"componentConfig.isNavHeaderBtnClickable\"\n          [showGoToCurrent]=\"shouldShowCurrent()\"\n          [theme]=\"theme\"\n          (onLeftNav)=\"onLeftNavClick()\"\n          (onLeftSecondaryNav)=\"onLeftSecondaryNavClick()\"\n          (onRightNav)=\"onRightNavClick()\"\n          (onRightSecondaryNav)=\"onRightSecondaryNavClick()\"\n          (onLabelClick)=\"toggleCalendarMode()\"\n          (onGoToCurrent)=\"goToCurrent()\">\n      </dp-calendar-nav>\n\n      <div class=\"dp-calendar-wrapper\" [ngClass]=\"{'rtl':isFarsi()}\">\n        <div class=\"dp-months-row\" *ngFor=\"let monthRow of yearMonths\">\n          <button type=\"button\"\n                  class=\"dp-calendar-month\"\n                  *ngFor=\"let month of monthRow\"\n                  [attr.data-date]=\"month.date.format(componentConfig.format)\"\n                  [disabled]=\"month.disabled\"\n                  [ngClass]=\"getMonthBtnCssClass(month)\"\n                  (click)=\"monthClicked(month)\"\n                  [innerText]=\"month.text\">\n          </button>\n        </div>\n      </div>\n    </div>\n  ",
                styles: ["\n    dp-month-calendar {\n      display: inline-block;\n    }\n    dp-month-calendar .dp-month-calendar-container {\n      background: #FFFFFF;\n    }\n    dp-month-calendar .dp-calendar-wrapper.rtl {\n      direction: rtl;\n    }\n    dp-month-calendar .dp-calendar-month {\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n      width: 55px;\n      height: 55px;\n      cursor: pointer;\n    }\n    dp-month-calendar .dp-calendar-month.dp-selected {\n      background: rgba(16, 108, 200, 0.5);\n      color: #FFFFFF;\n    }\n    dp-month-calendar.dp-material .dp-calendar-weekday {\n      height: 25px;\n      width: 30px;\n      line-height: 25px;\n      background: #E0E0E0;\n      border: 1px solid #E0E0E0;\n    }\n    dp-month-calendar.dp-material .dp-calendar-wrapper {\n      padding: 15px;\n    }\n    dp-month-calendar.dp-material .dp-calendar-month {\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n      background: #FFFFFF;\n      border-radius: 0;\n      -webkit-transition: border-radius 0.1s ease;\n      transition: border-radius 0.1s ease;\n      border: none;\n      outline: none;\n      font-size: 0.7rem;\n    }\n    dp-month-calendar.dp-material .dp-calendar-month:hover {\n      border-radius: 50%;\n      background: #E0E0E0;\n    }\n    dp-month-calendar.dp-material .dp-selected {\n      background: rgba(16, 108, 200, 0.5);\n      color: #FFFFFF;\n      border-radius: 50%;\n    }\n    dp-month-calendar.dp-material .dp-selected:hover {\n      background: rgba(16, 108, 200, 0.5);\n    }\n    dp-month-calendar.dp-material .dp-current-month {\n      border-radius: 50%;\n      border: 1px solid rgba(16, 108, 200, 0.5);\n      padding: 0;\n    }\n  "],
                encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
                changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
                providers: [
                    MonthCalendarService,
                    {
                        provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALUE_ACCESSOR"],
                        useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return MonthCalendarComponent; }),
                        multi: true
                    },
                    {
                        provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALIDATORS"],
                        useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return MonthCalendarComponent; }),
                        multi: true
                    }
                ]
            },] },
];
/**
 * @nocollapse
 */
MonthCalendarComponent.ctorParameters = function () { return [
    { type: MonthCalendarService, },
    { type: UtilsService, },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"], },
]; };
MonthCalendarComponent.propDecorators = {
    'config': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'displayDate': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'minDate': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'maxDate': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'theme': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"], args: ['class',] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'onSelect': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'onNavHeaderBtnClick': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'onGoToCurrent': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'onLeftNav': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'onRightNav': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'onLeftSecondaryNav': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'onRightSecondaryNav': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
};
var moment$9 = jalali_moment__WEBPACK_IMPORTED_MODULE_3__;
var TimeSelectComponent = (function () {
    /**
     * @param {?} timeSelectService
     * @param {?} utilsService
     * @param {?} cd
     */
    function TimeSelectComponent(timeSelectService, utilsService, cd) {
        this.timeSelectService = timeSelectService;
        this.utilsService = utilsService;
        this.cd = cd;
        this.onChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.isInited = false;
        this.api = {
            triggerChange: this.emitChange.bind(this)
        };
    }
    Object.defineProperty(TimeSelectComponent.prototype, "selected", {
        /**
         * @return {?}
         */
        get: function () {
            return this._selected;
        },
        /**
         * @param {?} selected
         * @return {?}
         */
        set: function (selected) {
            this._selected = selected;
            this.calculateTimeParts(this.selected);
            this.showDecHour = this.timeSelectService.shouldShowDecrease(this.componentConfig, this._selected, 'hour');
            this.showDecMinute = this.timeSelectService.shouldShowDecrease(this.componentConfig, this._selected, 'minute');
            this.showDecSecond = this.timeSelectService.shouldShowDecrease(this.componentConfig, this._selected, 'second');
            this.showIncHour = this.timeSelectService.shouldShowIncrease(this.componentConfig, this._selected, 'hour');
            this.showIncMinute = this.timeSelectService.shouldShowIncrease(this.componentConfig, this._selected, 'minute');
            this.showIncSecond = this.timeSelectService.shouldShowIncrease(this.componentConfig, this._selected, 'second');
            this.showToggleMeridiem = this.timeSelectService.shouldShowToggleMeridiem(this.componentConfig, this._selected);
            this.onChangeCallback(this.processOnChangeCallback(selected));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    TimeSelectComponent.prototype.ngOnInit = function () {
        this.isInited = true;
        this.init();
        this.initValidators();
    };
    /**
     * @return {?}
     */
    TimeSelectComponent.prototype.init = function () {
        this.componentConfig = this.timeSelectService.getConfig(this.config);
        this.selected = this.selected || moment$9();
        this.inputValueType = this.utilsService.getInputType(this.inputValue, false);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    TimeSelectComponent.prototype.ngOnChanges = function (changes) {
        if (this.isInited) {
            var minDate = changes.minDate, maxDate = changes.maxDate, minTime = changes.minTime, maxTime = changes.maxTime;
            this.init();
            if (minDate || maxDate || minTime || maxTime) {
                this.initValidators();
            }
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    TimeSelectComponent.prototype.writeValue = function (value) {
        this.inputValue = value;
        if (value) {
            var /** @type {?} */ momentValue = this.utilsService
                .convertToMomentArray(value, this.timeSelectService.getTimeFormat(this.componentConfig), false, this.componentConfig.locale)[0];
            if (momentValue.isValid()) {
                this.selected = momentValue;
                this.inputValueType = this.utilsService
                    .getInputType(this.inputValue, false);
            }
        }
        this.cd.markForCheck();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    TimeSelectComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @param {?} _
     * @return {?}
     */
    TimeSelectComponent.prototype.onChangeCallback = function (_) {
    };
    ;
    /**
     * @param {?} fn
     * @return {?}
     */
    TimeSelectComponent.prototype.registerOnTouched = function (fn) {
    };
    /**
     * @param {?} formControl
     * @return {?}
     */
    TimeSelectComponent.prototype.validate = function (formControl) {
        if (this.minDate || this.maxDate || this.minTime || this.maxTime) {
            return this.validateFn(formControl.value);
        }
        else {
            return function () { return null; };
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    TimeSelectComponent.prototype.processOnChangeCallback = function (value) {
        return this.utilsService.convertFromMomentArray(this.timeSelectService.getTimeFormat(this.componentConfig), [value], this.componentConfig.returnedValueType || this.inputValueType, this.componentConfig.locale);
    };
    /**
     * @return {?}
     */
    TimeSelectComponent.prototype.initValidators = function () {
        this.validateFn = this.utilsService.createValidator({
            minDate: this.minDate,
            maxDate: this.maxDate,
            minTime: this.minTime,
            maxTime: this.maxTime
        }, undefined, 'day', this.componentConfig.locale);
        this.onChangeCallback(this.processOnChangeCallback(this.selected));
    };
    /**
     * @param {?} unit
     * @return {?}
     */
    TimeSelectComponent.prototype.decrease = function (unit) {
        this.selected = this.timeSelectService.decrease(this.componentConfig, this.selected, unit);
        this.emitChange();
    };
    /**
     * @param {?} unit
     * @return {?}
     */
    TimeSelectComponent.prototype.increase = function (unit) {
        this.selected = this.timeSelectService.increase(this.componentConfig, this.selected, unit);
        this.emitChange();
    };
    /**
     * @return {?}
     */
    TimeSelectComponent.prototype.toggleMeridiem = function () {
        this.selected = this.timeSelectService.toggleMeridiem(this.selected);
        this.emitChange();
    };
    /**
     * @return {?}
     */
    TimeSelectComponent.prototype.emitChange = function () {
        this.onChange.emit({ date: this.selected, selected: false });
        this.cd.markForCheck();
    };
    /**
     * @param {?} time
     * @return {?}
     */
    TimeSelectComponent.prototype.calculateTimeParts = function (time) {
        this.hours = this.timeSelectService.getHours(this.componentConfig, time);
        this.minutes = this.timeSelectService.getMinutes(this.componentConfig, time);
        this.seconds = this.timeSelectService.getSeconds(this.componentConfig, time);
        this.meridiem = this.timeSelectService.getMeridiem(this.componentConfig, time);
    };
    return TimeSelectComponent;
}());
TimeSelectComponent.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                selector: 'dp-time-select',
                template: "\n    <ul class=\"dp-time-select-controls\">\n      <li class=\"dp-time-select-control dp-time-select-control-hours\">\n        <button type=\"button\"\n                class=\"dp-time-select-control-up\"\n                [disabled]=\"!showIncHour\"\n                (click)=\"increase('hour')\">\n        </button>\n        <span class=\"dp-time-select-display-hours\"\n              [innerText]=\"hours\">\n        </span>\n        <button type=\"button\"\n                class=\"dp-time-select-control-down\"\n                [disabled]=\"!showDecHour\"\n                (click)=\"decrease('hour')\"></button>\n      </li>\n      <li class=\"dp-time-select-control dp-time-select-separator\"\n          [innerText]=\"componentConfig.timeSeparator\">\n      </li>\n      <li class=\"dp-time-select-control dp-time-select-control-minutes\">\n        <button type=\"button\"\n                class=\"dp-time-select-control-up\"\n                [disabled]=\"!showIncMinute\"\n                (click)=\"increase('minute')\"></button>\n        <span class=\"dp-time-select-display-minutes\"\n              [innerText]=\"minutes\">\n        </span>\n        <button type=\"button\"\n                [disabled]=\"!showDecMinute\" class=\"dp-time-select-control-down\"\n                (click)=\"decrease('minute')\"></button>\n      </li>\n      <ng-container *ngIf=\"componentConfig.showSeconds\">\n        <li class=\"dp-time-select-control dp-time-select-separator\"\n            [innerText]=\"componentConfig.timeSeparator\">\n        </li>\n        <li class=\"dp-time-select-control dp-time-select-control-seconds\">\n          <button type=\"button\"\n                  class=\"dp-time-select-control-up\"\n                  [disabled]=\"!showIncSecond\"\n                  (click)=\"increase('second')\"></button>\n          <span class=\"dp-time-select-display-seconds\"\n                [innerText]=\"seconds\">\n          </span>\n          <button type=\"button\"\n                  class=\"dp-time-select-control-down\"\n                  [disabled]=\"!showDecSecond\"\n                  (click)=\"decrease('second')\"></button>\n        </li>\n      </ng-container>\n      <li class=\"dp-time-select-control dp-time-select-control-meridiem\" *ngIf=\"!componentConfig.showTwentyFourHours\">\n        <button type=\"button\"\n                class=\"dp-time-select-control-up\"\n                [disabled]=\"!showToggleMeridiem\"\n                (click)=\"toggleMeridiem()\"></button>\n        <span class=\"dp-time-select-display-meridiem\"\n              [innerText]=\"meridiem\">\n        </span>\n        <button type=\"button\"\n                class=\"dp-time-select-control-down\"\n                [disabled]=\"!showToggleMeridiem\"\n                (click)=\"toggleMeridiem()\"></button>\n      </li>\n    </ul>\n  ",
                styles: ["\n    dp-time-select {\n      display: inline-block;\n    }\n    dp-time-select .dp-time-select-controls {\n      margin: 0;\n      padding: 0;\n      text-align: center;\n      line-height: normal;\n      background: #FFFFFF;\n    }\n    dp-time-select .dp-time-select-control {\n      display: inline-block;\n      margin: 0 auto;\n      vertical-align: middle;\n      font-size: inherit;\n      letter-spacing: 1px;\n    }\n    dp-time-select .dp-time-select-control-up,\n    dp-time-select .dp-time-select-control-down {\n      position: relative;\n      display: block;\n      width: 24px;\n      height: 24px;\n      margin: 3px auto;\n      cursor: pointer;\n      color: #E0E0E0;\n    }\n    dp-time-select .dp-time-select-control-up::before,\n    dp-time-select .dp-time-select-control-down::before {\n      position: relative;\n      content: '';\n      display: inline-block;\n      height: 8px;\n      width: 8px;\n      vertical-align: baseline;\n      border-style: solid;\n      border-width: 2px 2px 0 0;\n      -webkit-transform: rotate(0deg);\n              transform: rotate(0deg);\n    }\n    dp-time-select .dp-time-select-control-up::before {\n      -webkit-transform: rotate(-45deg);\n              transform: rotate(-45deg);\n      top: 4px;\n    }\n    dp-time-select .dp-time-select-control-down::before {\n      -webkit-transform: rotate(135deg);\n              transform: rotate(135deg);\n    }\n    dp-time-select .dp-time-select-separator {\n      width: 5px;\n    }\n    dp-time-select.dp-material .dp-time-select-control-up,\n    dp-time-select.dp-material .dp-time-select-control-down {\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n      background: transparent;\n      border: none;\n      outline: none;\n      border-radius: 50%;\n    }\n    dp-time-select.dp-material .dp-time-select-control-up::before,\n    dp-time-select.dp-material .dp-time-select-control-down::before {\n      left: 0;\n    }\n    dp-time-select.dp-material .dp-time-select-control-up:hover,\n    dp-time-select.dp-material .dp-time-select-control-down:hover {\n      background: #E0E0E0;\n      color: #FFFFFF;\n    }\n  "],
                encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
                changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
                providers: [
                    TimeSelectService,
                    {
                        provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALUE_ACCESSOR"],
                        useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return TimeSelectComponent; }),
                        multi: true
                    },
                    {
                        provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALIDATORS"],
                        useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return TimeSelectComponent; }),
                        multi: true
                    }
                ]
            },] },
];
/**
 * @nocollapse
 */
TimeSelectComponent.ctorParameters = function () { return [
    { type: TimeSelectService, },
    { type: UtilsService, },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"], },
]; };
TimeSelectComponent.propDecorators = {
    'config': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'displayDate': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'minDate': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'maxDate': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'minTime': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'maxTime': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'theme': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"], args: ['class',] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'onChange': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
};
var CalendarNavComponent = (function () {
    function CalendarNavComponent() {
        this.isLabelClickable = false;
        this.showLeftNav = true;
        this.showLeftSecondaryNav = false;
        this.showRightNav = true;
        this.showRightSecondaryNav = false;
        this.leftNavDisabled = false;
        this.leftSecondaryNavDisabled = false;
        this.rightNavDisabled = false;
        this.rightSecondaryNavDisabled = false;
        this.showGoToCurrent = true;
        this.onLeftNav = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onLeftSecondaryNav = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onRightNav = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onRightSecondaryNav = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onLabelClick = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onGoToCurrent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    /**
     * @return {?}
     */
    CalendarNavComponent.prototype.leftNavClicked = function () {
        this.onLeftNav.emit();
    };
    /**
     * @return {?}
     */
    CalendarNavComponent.prototype.leftSecondaryNavClicked = function () {
        this.onLeftSecondaryNav.emit();
    };
    /**
     * @return {?}
     */
    CalendarNavComponent.prototype.rightNavClicked = function () {
        this.onRightNav.emit();
    };
    /**
     * @return {?}
     */
    CalendarNavComponent.prototype.rightSecondaryNavClicked = function () {
        this.onRightSecondaryNav.emit();
    };
    /**
     * @return {?}
     */
    CalendarNavComponent.prototype.labelClicked = function () {
        this.onLabelClick.emit();
    };
    return CalendarNavComponent;
}());
CalendarNavComponent.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                selector: 'dp-calendar-nav',
                template: "\n    <div class=\"dp-calendar-nav-container\">\n      <div class=\"dp-nav-header\">\n        <span [hidden]=\"isLabelClickable\"\n              [attr.data-hidden]=\"isLabelClickable\"\n              [innerText]=\"label\">\n        </span>\n        <button type=\"button\"\n                class=\"dp-nav-header-btn\"\n                [hidden]=\"!isLabelClickable\"\n                [attr.data-hidden]=\"!isLabelClickable\"\n                (click)=\"labelClicked()\"\n                [innerText]=\"label\">\n        </button>\n      </div>\n\n      <div class=\"dp-nav-btns-container\">\n        <div class=\"dp-calendar-nav-container-left\">\n          <button type=\"button\"\n                  class=\"dp-calendar-secondary-nav-left\"\n                  *ngIf=\"showLeftSecondaryNav\"\n                  [disabled]=\"leftSecondaryNavDisabled\"\n                  (click)=\"leftSecondaryNavClicked()\">\n          </button>\n          <button type=\"button\"\n                  class=\"dp-calendar-nav-left\"\n                  [hidden]=\"!showLeftNav\"\n                  [attr.data-hidden]=\"!showLeftNav\"\n                  [disabled]=\"leftNavDisabled\"\n                  (click)=\"leftNavClicked()\">\n          </button>\n        </div>\n        <button type=\"button\"\n                class=\"dp-current-location-btn\"\n                *ngIf=\"showGoToCurrent\"\n                (click)=\"onGoToCurrent.emit()\">\n        </button>\n        <div class=\"dp-calendar-nav-container-right\">\n          <button type=\"button\"\n                  class=\"dp-calendar-nav-right\"\n                  [hidden]=\"!showRightNav\"\n                  [attr.data-hidden]=\"!showRightNav\"\n                  [disabled]=\"rightNavDisabled\"\n                  (click)=\"rightNavClicked()\">\n          </button>\n          <button type=\"button\"\n                  class=\"dp-calendar-secondary-nav-right\"\n                  *ngIf=\"showRightSecondaryNav\"\n                  [disabled]=\"rightSecondaryNavDisabled\"\n                  (click)=\"rightSecondaryNavClicked()\">\n          </button>\n        </div>\n      </div>\n    </div>\n  ",
                styles: ["\n    dp-calendar-nav .dp-calendar-nav-container {\n      position: relative;\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n      height: 25px;\n      border: 1px solid #000000;\n      border-bottom: none;\n    }\n    dp-calendar-nav .dp-nav-date-btn {\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n      height: 25px;\n      border: 1px solid #000000;\n      border-bottom: none;\n    }\n    dp-calendar-nav .dp-nav-btns-container {\n      position: absolute;\n      top: 50%;\n      -webkit-transform: translateY(-50%);\n              transform: translateY(-50%);\n      right: 5px;\n      display: inline-block;\n      direction: ltr;\n    }\n    dp-calendar-nav .dp-calendar-nav-container-left,\n    dp-calendar-nav .dp-calendar-nav-container-right {\n      display: inline-block;\n    }\n    dp-calendar-nav .dp-calendar-nav-left,\n    dp-calendar-nav .dp-calendar-nav-right,\n    dp-calendar-nav .dp-calendar-secondary-nav-left,\n    dp-calendar-nav .dp-calendar-secondary-nav-right {\n      position: relative;\n      width: 16px;\n      cursor: pointer;\n    }\n    dp-calendar-nav .dp-calendar-nav-left,\n    dp-calendar-nav .dp-calendar-nav-right {\n      line-height: 0;\n    }\n    dp-calendar-nav .dp-calendar-nav-left::before,\n    dp-calendar-nav .dp-calendar-nav-right::before {\n      position: relative;\n      content: '';\n      display: inline-block;\n      height: 8px;\n      width: 8px;\n      vertical-align: baseline;\n      border-style: solid;\n      border-width: 2px 2px 0 0;\n      -webkit-transform: rotate(45deg);\n              transform: rotate(45deg);\n    }\n    dp-calendar-nav .dp-calendar-secondary-nav-left,\n    dp-calendar-nav .dp-calendar-secondary-nav-right {\n      padding: 0;\n    }\n    dp-calendar-nav .dp-calendar-secondary-nav-left::before,\n    dp-calendar-nav .dp-calendar-secondary-nav-right::before,\n    dp-calendar-nav .dp-calendar-secondary-nav-left::after,\n    dp-calendar-nav .dp-calendar-secondary-nav-right::after {\n      position: relative;\n      content: '';\n      display: inline-block;\n      height: 8px;\n      width: 8px;\n      vertical-align: baseline;\n      border-style: solid;\n      border-width: 2px 2px 0 0;\n      -webkit-transform: rotate(45deg);\n              transform: rotate(45deg);\n    }\n    dp-calendar-nav .dp-calendar-secondary-nav-left::before,\n    dp-calendar-nav .dp-calendar-secondary-nav-right::before {\n      right: -10px;\n    }\n    dp-calendar-nav .dp-calendar-secondary-nav-right {\n      left: initial;\n      right: 5px;\n    }\n    dp-calendar-nav .dp-calendar-nav-left::before {\n      position: relative;\n      content: '';\n      display: inline-block;\n      height: 8px;\n      width: 8px;\n      vertical-align: baseline;\n      border-style: solid;\n      border-width: 2px 2px 0 0;\n      -webkit-transform: rotate(-135deg);\n              transform: rotate(-135deg);\n    }\n    dp-calendar-nav .dp-calendar-secondary-nav-left::before,\n    dp-calendar-nav .dp-calendar-secondary-nav-left::after {\n      position: relative;\n      content: '';\n      display: inline-block;\n      height: 8px;\n      width: 8px;\n      vertical-align: baseline;\n      border-style: solid;\n      border-width: 2px 2px 0 0;\n      -webkit-transform: rotate(-135deg);\n              transform: rotate(-135deg);\n    }\n    dp-calendar-nav .dp-calendar-secondary-nav-left::before {\n      right: -10px;\n    }\n    dp-calendar-nav .dp-nav-header {\n      position: absolute;\n      top: 50%;\n      -webkit-transform: translateY(-50%);\n              transform: translateY(-50%);\n      left: 5px;\n      display: inline-block;\n      font-size: 13px;\n    }\n    dp-calendar-nav .dp-nav-header-btn {\n      cursor: pointer;\n    }\n    dp-calendar-nav .dp-current-location-btn {\n      position: relative;\n      top: -1px;\n      height: 16px;\n      width: 16px;\n      vertical-align: middle;\n      background: rgba(0, 0, 0, 0.6);\n      border: 1px solid rgba(0, 0, 0, 0.6);\n      outline: none;\n      border-radius: 50%;\n      -webkit-box-shadow: inset 0 0 0 3px #FFFFFF;\n              box-shadow: inset 0 0 0 3px #FFFFFF;\n      cursor: pointer;\n    }\n    dp-calendar-nav .dp-current-location-btn:hover {\n      background: #000000;\n    }\n    dp-calendar-nav.dp-material .dp-calendar-nav-container {\n      height: 30px;\n      border: 1px solid #E0E0E0;\n    }\n    dp-calendar-nav.dp-material .dp-calendar-nav-left,\n    dp-calendar-nav.dp-material .dp-calendar-nav-right,\n    dp-calendar-nav.dp-material .dp-calendar-secondary-nav-left,\n    dp-calendar-nav.dp-material .dp-calendar-secondary-nav-right {\n      border: none;\n      background: #FFFFFF;\n      outline: none;\n      font-size: 16px;\n      padding: 0;\n    }\n    dp-calendar-nav.dp-material .dp-calendar-secondary-nav-left,\n    dp-calendar-nav.dp-material .dp-calendar-secondary-nav-right {\n      width: 20px;\n    }\n    dp-calendar-nav.dp-material .dp-nav-header-btn {\n      height: 20px;\n      width: 80px;\n      border: none;\n      background: #FFFFFF;\n      outline: none;\n    }\n    dp-calendar-nav.dp-material .dp-nav-header-btn:hover {\n      background: rgba(0, 0, 0, 0.05);\n    }\n    dp-calendar-nav.dp-material .dp-nav-header-btn:active {\n      background: rgba(0, 0, 0, 0.1);\n    }\n  "],
                encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
                changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush
            },] },
];
/**
 * @nocollapse
 */
CalendarNavComponent.ctorParameters = function () { return []; };
CalendarNavComponent.propDecorators = {
    'label': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'isLabelClickable': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'showLeftNav': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'showLeftSecondaryNav': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'showRightNav': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'showRightSecondaryNav': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'leftNavDisabled': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'leftSecondaryNavDisabled': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'rightNavDisabled': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'rightSecondaryNavDisabled': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'showGoToCurrent': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'theme': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"], args: ['class',] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'onLeftNav': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'onLeftSecondaryNav': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'onRightNav': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'onRightSecondaryNav': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'onLabelClick': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'onGoToCurrent': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
};
var DayTimeCalendarComponent = (function () {
    /**
     * @param {?} dayTimeCalendarService
     * @param {?} utilsService
     * @param {?} cd
     */
    function DayTimeCalendarComponent(dayTimeCalendarService, utilsService, cd) {
        this.dayTimeCalendarService = dayTimeCalendarService;
        this.utilsService = utilsService;
        this.cd = cd;
        this.onChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onGoToCurrent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onLeftNav = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onRightNav = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.isInited = false;
        this.api = {
            moveCalendarTo: this.moveCalendarTo.bind(this)
        };
    }
    Object.defineProperty(DayTimeCalendarComponent.prototype, "selected", {
        /**
         * @return {?}
         */
        get: function () {
            return this._selected;
        },
        /**
         * @param {?} selected
         * @return {?}
         */
        set: function (selected) {
            this._selected = selected;
            this.onChangeCallback(this.processOnChangeCallback(selected));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.ngOnInit = function () {
        this.isInited = true;
        this.init();
        this.initValidators();
    };
    /**
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.init = function () {
        this.componentConfig = this.dayTimeCalendarService.getConfig(this.config);
        this.inputValueType = this.utilsService.getInputType(this.inputValue, false);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.ngOnChanges = function (changes) {
        if (this.isInited) {
            var minDate = changes.minDate, maxDate = changes.maxDate;
            this.init();
            if (minDate || maxDate) {
                this.initValidators();
            }
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.writeValue = function (value) {
        this.inputValue = value;
        if (value) {
            this.selected = this.utilsService
                .convertToMomentArray(value, this.componentConfig.format, false, this.componentConfig.locale)[0];
            this.inputValueType = this.utilsService
                .getInputType(this.inputValue, false);
        }
        else {
            this.selected = null;
        }
        this.cd.markForCheck();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @param {?} _
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.onChangeCallback = function (_) {
    };
    ;
    /**
     * @param {?} fn
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.registerOnTouched = function (fn) {
    };
    /**
     * @param {?} formControl
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.validate = function (formControl) {
        if (this.minDate || this.maxDate) {
            return this.validateFn(formControl.value);
        }
        else {
            return function () { return null; };
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.processOnChangeCallback = function (value) {
        return this.utilsService.convertFromMomentArray(this.componentConfig.format, [value], this.componentConfig.returnedValueType || this.inputValueType, this.componentConfig.locale);
    };
    /**
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.initValidators = function () {
        this.validateFn = this.utilsService.createValidator({
            minDate: this.minDate,
            maxDate: this.maxDate
        }, undefined, 'daytime', this.componentConfig.locale);
        this.onChangeCallback(this.processOnChangeCallback(this.selected));
    };
    /**
     * @param {?} day
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.dateSelected = function (day) {
        this.selected = this.dayTimeCalendarService.updateDay(this.selected, day.date, this.config);
        this.emitChange();
    };
    /**
     * @param {?} time
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.timeChange = function (time) {
        this.selected = this.dayTimeCalendarService.updateTime(this.selected, time.date);
        this.emitChange();
    };
    /**
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.emitChange = function () {
        this.onChange.emit({ date: this.selected, selected: false });
    };
    /**
     * @param {?} to
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.moveCalendarTo = function (to) {
        if (to) {
            this.dayCalendarRef.moveCalendarTo(to);
        }
    };
    /**
     * @param {?} change
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.onLeftNavClick = function (change) {
        this.onLeftNav.emit(change);
    };
    /**
     * @param {?} change
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.onRightNavClick = function (change) {
        this.onRightNav.emit(change);
    };
    return DayTimeCalendarComponent;
}());
DayTimeCalendarComponent.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                selector: 'dp-day-time-calendar',
                template: "\n    <dp-day-calendar #dayCalendar\n                     [config]=\"componentConfig\"\n                     [ngModel]=\"_selected\"\n                     [theme]=\"theme\"\n                     [displayDate]=\"displayDate\"\n                     (onSelect)=\"dateSelected($event)\"\n                     (onGoToCurrent)=\"onGoToCurrent.emit()\"\n                     (onLeftNav)=\"onLeftNavClick($event)\"\n                     (onRightNav)=\"onRightNavClick($event)\">\n    </dp-day-calendar>\n    <dp-time-select #timeSelect\n                    [config]=\"componentConfig\"\n                    [ngModel]=\"_selected\"\n                    (onChange)=\"timeChange($event)\"\n                    [theme]=\"theme\">\n    </dp-time-select>\n  ",
                styles: ["\n    dp-day-time-calendar {\n      display: inline-block;\n    }\n    dp-day-time-calendar dp-time-select {\n      display: block;\n      border-top: 0;\n    }\n    dp-day-time-calendar.dp-material dp-time-select {\n      border-top: 0;\n    }\n  "],
                changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
                encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
                providers: [
                    DayTimeCalendarService,
                    DayCalendarService,
                    TimeSelectService,
                    {
                        provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALUE_ACCESSOR"],
                        useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return DayTimeCalendarComponent; }),
                        multi: true
                    },
                    {
                        provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALIDATORS"],
                        useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return DayTimeCalendarComponent; }),
                        multi: true
                    }
                ]
            },] },
];
/**
 * @nocollapse
 */
DayTimeCalendarComponent.ctorParameters = function () { return [
    { type: DayTimeCalendarService, },
    { type: UtilsService, },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"], },
]; };
DayTimeCalendarComponent.propDecorators = {
    'config': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'displayDate': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'minDate': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'maxDate': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'theme': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"], args: ['class',] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'onChange': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'onGoToCurrent': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'onLeftNav': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'onRightNav': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'dayCalendarRef': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['dayCalendar',] },],
};
var DpDatePickerModule = (function () {
    function DpDatePickerModule() {
    }
    return DpDatePickerModule;
}());
DpDatePickerModule.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                providers: [
                    DomHelper,
                    UtilsService
                ],
                declarations: [
                    DatePickerComponent,
                    DatePickerDirective,
                    DayCalendarComponent,
                    MonthCalendarComponent,
                    CalendarNavComponent,
                    TimeSelectComponent,
                    DayTimeCalendarComponent
                ],
                entryComponents: [
                    DatePickerComponent
                ],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"]
                ],
                exports: [
                    DatePickerComponent,
                    DatePickerDirective,
                    MonthCalendarComponent,
                    DayCalendarComponent,
                    TimeSelectComponent,
                    DayTimeCalendarComponent
                ]
            },] },
];
/**
 * @nocollapse
 */
DpDatePickerModule.ctorParameters = function () { return []; };
/**
 * Generated bundle index. Do not edit.
 */

//# sourceMappingURL=ng2-jalali-date-picker.es5.js.map


/***/ })

}]);
//# sourceMappingURL=pages-calk-calk-module~pages-report-report-module~pages-tracking-tracking-module.js.map