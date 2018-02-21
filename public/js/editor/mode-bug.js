ace.define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var DocCommentHighlightRules = function() {
    this.$rules = {
        "start" : [ {
            token : "comment.doc.tag",
            regex : "@[\\w\\d_]+" // TODO: fix email addresses
        },
        DocCommentHighlightRules.getTagRule(),
        {
            defaultToken : "comment.doc",
            caseInsensitive: true
        }]
    };
};

oop.inherits(DocCommentHighlightRules, TextHighlightRules);

DocCommentHighlightRules.getTagRule = function(start) {
    return {
        token : "comment.doc.tag.storage.type",
        regex : "\\b(?:TODO|FIXME|XXX|HACK)\\b"
    };
};

DocCommentHighlightRules.getStartRule = function(start) {
    return {
        token : "comment.doc", // doc comment
        regex : "\\/\\*(?=\\*)",
        next  : start
    };
};

DocCommentHighlightRules.getEndRule = function (start) {
    return {
        token : "comment.doc", // closing comment
        regex : "\\*\\/",
        next  : start
    };
};


exports.DocCommentHighlightRules = DocCommentHighlightRules;

});

ace.define("ace/mode/bug_highlight_rules",["require","exports","module","ace/lib/oop"], function(require, exports, module) {
    var oop = require("../lib/oop");
    var DocCommentHighlightRules = require("./doc_comment_highlight_rules").DocCommentHighlightRules;
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

    var BugHighlightRules = function() {
        var keywords = (
            "goto|if|then"
        );
        var builtinFunctions = (
            "emitPheromone|faceRandomDirection|rotateClockwise|rotateCounterClockwise|moveForward|bite|pickUpFood|dropFood|eatFood|generateRandomNumber|rememberPheromone"
        );
        var builtinConstants = ("i_smell_danger_in_front_of_me|i_smell_pheromone_1_in_front_of_me|i_smell_pheromone_2_in_front_of_me|i_smell_pheromone_3_in_front_of_me|i_smell_pheromone_in_front_of_me|i_was_bit|i_am_carrying_food|i_am_hungry|i_am_standing_on_my_anthill|i_am_standing_on_food|i_am_standing_with_an_enemy|i_was_blocked_from_moving|last_random_number_was_zero|last_pheromone_stronger|same_pheromone_type");

        var keywordMapper = this.createKeywordMapper({
            "keyword": keywords,
            "constant.language": builtinConstants,
            "support.function": builtinFunctions
        }, "");

        var stringEscapeRe = "\\\\(?:[0-7]{3}|x\\h{2}|u{4}|U\\h{6}|[abfnrtv'\"\\\\])".replace(/\\h/g, "[a-fA-F\\d]");

        this.$rules = {
            "start" : [
                {
                    token : "comment",
                    regex : "\\/\\/.*$"
                },
                {
                    token : "entity.name.function",
                    regex : "[A-z]+\\:"
                },{
                    token : "constant.numeric", // rune
                    regex : "'(?:[^\\'\uD800-\uDBFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|" + stringEscapeRe.replace('"', '')  + ")'"
                }, {
                    token : "constant.numeric", // hex
                    regex : "[0-9]+"
                },{
                    token : function(val) {
                        return keywordMapper(val) || "identifier";
                    },
                    regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b\\(?"
                }
            ]
        };
    };
    oop.inherits(BugHighlightRules, TextHighlightRules);

    exports.BugHighlightRules = BugHighlightRules;
});



ace.define("ace/mode/bug",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/bug_highlight_rules"], function(require, exports, module) {

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var BugHighlightRules = require("./bug_highlight_rules").BugHighlightRules;


var Mode = function() {
    this.HighlightRules = BugHighlightRules;
};
oop.inherits(Mode, TextMode);

(function() {

    this.lineCommentStart = "//";
    this.blockComment = {start: "/*", end: "*/"};

    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);

        var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;
        var endState = tokenizedLine.state;

        if (tokens.length && tokens[tokens.length-1].type == "comment") {
            return indent;
        }

        if (state == "start") {
            var match = line.match(/^.*[\{\(\[]\s*$/);
            if (match) {
                indent += tab;
            }
        }

        return indent;
    };//end getNextLineIndent


    this.$id = "ace/mode/bug";
}).call(Mode.prototype);

exports.Mode = Mode;
});
