var EqualPasswordValidator = (function () {
    function EqualPasswordValidator() {
    }
    EqualPasswordValidator.validate = function (firstField, secondField) {
        return function (c) {
            return (c.controls && c.controls[firstField].value == c.controls[secondField].value) ? null : {
                passwordsEqual: {
                    valid: false
                }
            };
        };
    };
    return EqualPasswordValidator;
}());
export { EqualPasswordValidator };
//# sourceMappingURL=equalPasswordValidator.js.map