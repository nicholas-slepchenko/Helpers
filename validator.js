/**
 * Validator for any value.
 *
 * Example:
 * Validator(someValue).notUndefined().notNull().isNumber().moreThan(0).lessThan(100);
 *
 * @param value
 * @constructor
 */
function Validator (value) {
    var value = value,
        status = true,
        result = function (boolean) {
            if (boolean !== null && boolean !== undefined) {
                status = status & boolean;
            }
        },
        
        methods = {
            array: function () { result(Array.isArray(value)); return methods; },
            boolean: function () { result(typeof value === 'boolean'); return methods; },
            equal: function (value) { result(value === value); return methods; },
            go: function (path) { result(value[path] !== undefined); if (status) value = value[path]; return methods; },
            lessOrEqual: function (number) { result(value <= number); return methods; },
            lessThan: function (number) { result(value < number); return methods; },
            moreOrEqual: function (number) { result(value >= number); return methods; },
            moreThan: function (number) { result(value > number); return methods; },
            notNull: function () { result(value !== null); return methods; },
            notUndefined: function () { result(value !== undefined); return methods; },
            number: function () { result(!isNaN(parseFloat(value)) && isFinite(value)); return methods; },
            object: function () { result(typeof value == 'object'); return methods; },
            onFail: function (callback) {  if (typeof callback != 'function') throw 'Callback isn\'t function'; if (!status) callback(value); return methods; },
            onSuccess: function (callback) { if (typeof callback != 'function') throw 'Callback isn\'t function'; if (status) callback(value); return methods; },
            string: function () { result(typeof value == 'string'); return methods; }
        };

    return methods;
}