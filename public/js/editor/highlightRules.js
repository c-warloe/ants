define(function(require, exports, module) {
    var oop = require("../lib/oop");
    var DocCommentHighlightRules = require("./doc_comment_highlight_rules").DocCommentHighlightRules;
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

    var highlightRules = function() {
        var keywords = (
            "goto|if|then"
        );
        var builtinFunctions = (
            "emitPheromone|faceRandomDirection|rotateClockwise|rotateCounterClockwise|moveForward|bite|pickUpFood|dropFood|eatFood|generateRandomNumber|rememberPheromone"
        );
        var builtinConstants = ("i_smell_danger_in_front_of_me|i_smell_pheromone_1_in_front_of_me|i_smell_pheromone_2_in_front_of_me|i_smell_pheromone_3_in_front_of_me|i_smell_pheromone_in_front_of_me|i_was_bit|i_am_carrying_food|i_am_hungry|i_am_standing_on_my_anthill|i_am_standing_on_food|i_am_standing_with_an_enemy|i_was_blocked_from_moving|last_random_number_was_zero");

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
    oop.inherits(highlightRules, TextHighlightRules);
    exports.highlightRules = highlightRules;
});
