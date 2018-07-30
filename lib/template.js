(function() {
    var root = this;
    var html2Entity = (function() {
        var escapeMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            '`': '&#x60;'
        };
        var escaper = function (match) {
            return escapeMap[match];
        };
        return function(string) {
            var source = "(" + Object.keys(escapeMap).join("|") + ")";
            var regexp = RegExp(source), regexpAll = RegExp(source, "g");
            return regexp.test(string) ? string.replace(regexpAll, escaper) : string;
        }
    }())
    var escapes = {
        '"': '"',
        "'": "'",
        "\\": "\\",
        '\n': 'n',
        '\r': 'r',
        '\u2028': 'u2028',
        '\u2029': 'u2029'
    }
    var escaper = /\\|'|"|\r|\n|\u2028|\u2029/g;
    var convertEscapes = function(match) {
        return "\\" + escapes[match];
    }
    var template = function(tpl, data, regexpSetting, settings) {
        var templateSettings = Object.assign({}, {
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g,
            evaluate: /<%([\s\S]+?)%>/g,
        }, regexpSetting);
        var matcher = RegExp(Object.keys(templateSettings).map(function(key) {
            return templateSettings[key].source
        }).join("|")+"|$", "g")
        var source = "", index = 0;
        tpl.replace(matcher, function(match, interpolate, escape, evaluate, offset) {
            source += "__p += '" + tpl.slice(index, offset).replace(escaper, convertEscapes) + "'\n";
            index = offset + match.length;
            if(evaluate) {
                source += evaluate + "\n"
            } else if(interpolate) {
                source += "__p += (" + interpolate + ") == null ? '' : "+interpolate+";\n"
            } else if(escape) {
                source += "__p += (" + escape + ") == null ? '' : "+ html2Entity(escape) + ";\n"
            }
            return match;
        })
        source = "var __p = '';" + source + 'return __p'
        if(!(settings && settings.variable)) source = "with(obj||{}) {\n" + source + "\n}"
        return new Function(settings.variable||"obj", source)(data);
    }
    root.templateY = template
}.call(this))