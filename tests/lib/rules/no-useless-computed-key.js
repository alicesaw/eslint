/**
 * @fileoverview Tests for no-useless-computed-key rule.
 * @author Burak Yigit Kaya
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-useless-computed-key"),
    RuleTester = require("../../../lib/testers/rule-tester");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-useless-computed-key", rule, {
    valid: [
        { code: "({ 'a': 0, b(){} })", env: { es6: true } },
        { code: "({ [x]: 0 });", env: { es6: true } },
        { code: "({ a: 0, [b](){} })", env: { es6: true } }
    ],
    invalid: [
        {
            code: "({ ['0']: 0 })",
            output: "({ '0': 0 })",
            env: {es6: true},
            errors: [{
                message: "Unnecessarily computed property ['0'] found.", type: "Property"
            }]
        }, {
            code: "({ ['0+1,234']: 0 })",
            output: "({ '0+1,234': 0 })",
            env: {es6: true},
            errors: [{
                message: "Unnecessarily computed property ['0+1,234'] found.", type: "Property"
            }]
        }, {
            code: "({ [0]: 0 })",
            output: "({ 0: 0 })",
            env: {es6: true},
            errors: [{
                message: "Unnecessarily computed property [0] found.", type: "Property"
            }]
        }, {
            code: "({ ['x']: 0 })",
            output: "({ 'x': 0 })",
            env: {es6: true},
            errors: [{
                message: "Unnecessarily computed property ['x'] found.", type: "Property"
            }]
        }, {
            code: "({ ['x']() {} })",
            output: "({ 'x'() {} })",
            env: {es6: true},
            errors: [{
                message: "Unnecessarily computed property ['x'] found.", type: "Property"
            }]
        }, {
            code: "({ [/* this comment prevents a fix */ 'x']: 0 })",
            output: "({ [/* this comment prevents a fix */ 'x']: 0 })",
            env: {es6: true},
            errors: [{
                message: "Unnecessarily computed property ['x'] found.", type: "Property"
            }]
        }, {
            code: "({ ['x' /* this comment also prevents a fix */]: 0 })",
            output: "({ ['x' /* this comment also prevents a fix */]: 0 })",
            env: {es6: true},
            errors: [{
                message: "Unnecessarily computed property ['x'] found.", type: "Property"
            }]
        }, {
            code: "({ [('x')]: 0 })",
            output: "({ 'x': 0 })",
            env: {es6: true},
            errors: [{
                message: "Unnecessarily computed property ['x'] found.", type: "Property"
            }]
        }, {
            code: "({ *['x']() {} })",
            output: "({ *'x'() {} })",
            env: {es6: true},
            errors: [{
                message: "Unnecessarily computed property ['x'] found.", type: "Property"
            }]
        }, {
            code: "({ async ['x']() {} })",
            output: "({ async 'x'() {} })",
            parserOptions: { ecmaVersion: 8 },
            errors: [{
                message: "Unnecessarily computed property ['x'] found.", type: "Property"
            }]
        }
    ]
});
