/*
 *************************
 	Copyright 2023-2024
 		Nest Rocks
 *************************
*/

import { to } from 'await-to-js';
import { Request } from 'express';
import { dirname } from 'path';
import { v4 as uuidv4 } from 'uuid';

import { CONSTANTS } from 'src/shared/modules';

/**
 * @function cleanNullUndefinedFromArray
 * @description Cleans the array from NULL, UNDEFINED
 */
export const cleanNullUndefinedFromArray = <T>(array: T[]): T[] => [ array ].flat().filter((e) => e);

/**
 * @description Compares 2 string with caseInSensitivity
 * @example
 *      1. compareString('S1', 'S2', false) -> false
 *      2. compareString('S1', 's1', true) -> true
 * @param string1 String 1 to compare
 * @param string2 String 2 to compare
 * @param caseInSensitvity To check with caseinsensitivity, default is case in sensitive comparison,
 *                          means it is 'true'
 * @returns boolean
 * @type {(string1: string, string2: string, caseInSensitvity: boolean) => boolean}
 */
export const compareString = (string1: string, string2: string, caseInSensitvity = true): boolean => {
    if (isEmpty(string1) || isEmpty(string2)) return false;

    caseInSensitvity = setDefaultValue(caseInSensitvity, true);

    if (caseInSensitvity) {
        string1 = string1?.toLowerCase();
        string2 = string2?.toLowerCase();
    }

    return string1 === string2;
};

/**
 * @function generateUuid returns the uuid.
 * @param uuidLength Length of the uuid to generate
 * @returns returns a uuid
 */
export const generateUuid = (): string => {
    return uuidv4();
};

/**
 * @function concat concats multiple strings
 * @description Concats the strings
 * @param {string[]} values Values to concat
 * @returns {string} concatenated values
 */
export const concat = (...values: string[]): string => concatWIthCustomSeparator('', ...values);

/**
 * @function concatWIthCustomSeparator concats multiple strings with customseparator
 * @description Concats the strings with a custom separator
 * @param {string} separator Separator to use
 * @param {string[]} values Values to concat
 * @returns {string} concatenated values with separator
 */
export const concatWIthCustomSeparator = (separator = '', ...values: string[]): string => {
    separator = setDefaultValue(separator, '');

    if (isEmpty(values)) return separator;

    values = [ values ].flat().filter((e) => e);

    return values.join(separator);
};

/**
 * @function convertObjectToUrlEncodedValues
 * @description To convert {{params}} in url encoded format
 * @param {object} params Key value pair
 * @returns {string} string as urlencoded values
 */
export const convertObjectToUrlEncodedValues = (params: any): string => {
    params = setDefaultValue(params, {});

    return new URLSearchParams(params).toString();
};

/**
 * @function decodeFromBase64
 * @description Decodes the given {{base64Source}}
 * @param {string} base64Source source string
 * @returns {string}
 */
export const decodeFromBase64 = (base64Source: string): string => {
    if (isEmpty(base64Source)) return '';

    return Buffer.from(base64Source, 'base64').toString('ascii');
};

/**
 * @function encodeToBase64
 * @description Encodes the given {{source}} to base64
 * @param {string} source source string
 * @returns {string}
 */
export const encodeToBase64 = (source: string): string => {
    if (isEmpty(source)) return '';

    return Buffer.from(source).toString('base64');
};

/**
 * @function generateUuid returns the uuid.
 * @param uuidLength Length of the uuid to generate
 * @returns returns a uuid
 */
export const generateUuidV4 = (): string => {
    return uuidv4();
};

/**
 * @function getBaseDirectoryOfProject returns the string.
 * @returns returns the base directory of the project
 */
export const getBaseDirectoryOfProject = () :string => {
    return dirname(require.main.filename);
};

/**
 * @function getCorrelationIdFromRequest returns the value of correlation id passed in header in request.
 * @param request request object
 * @returns {string} header value
 */
export const getCorrelationIdFromRequest = (request: Request): string => {
    if(isEmpty(request)) return null;
    
    return getHeaderValueFromRequest(request, CONSTANTS.ENV.HEADERS.CORRELATION_ID.NAME);
};

/**
 * @function getHeaderValueFromRequest returns the value of passed in header in request.
 * @param {request} request object
 * @param {string} headerName string header whose value needs to be read
 * @returns {string} header value
 */
export const getHeaderValueFromRequest = (request: Request, headerName: string): string => {
    if(isEmpty(request) || isEmpty(headerName)) return null;
    
    return request.get(headerName);
};

/**
 * @function isEmpty
 * @description To check whether the given string/object is empty
 * @param {string|object} value: Any object or string.
 * @returns {boolean} {{value}} is empty?
 */
export const isEmpty = (value: string | any): boolean => {
    if (!value) value = '';

    if (typeof value === 'string') {
        return value.trim().length === 0;
    }

    return [ Object, Array ].includes((value || {}).constructor) && !Object.entries(value || {}).length;
};

/**
 * @function isProperUrl
 * @description To check {{url}} validation
 * @param {string} url The string to be checked for the URL correctness
 * @returns {boolean} {{url}} is valid?
 */
export const isProperUrl = (url: string): boolean => {
    try {
        // tslint:disable-next-line: no-unused-expression
        new URL(url);

        return true;
    } catch (_e) {
        return false;
    }
};

export const MessageGenerator = {

    ModuleLifeCycle: {

        onModuleInit: (moduleName: string): string => {
            
            moduleName = setDefaultValue(moduleName, '');

            return `${moduleName} initiated`;
        },

        onModuleDestroy: (moduleName: string): string => {
            
            moduleName = setDefaultValue(moduleName, '');

            return `${moduleName} destroyed`;
        },
    },
    
};

/**
 * @function omit Omits 1 level keys only
 * @description To omit the {{blacklist}} keys from {{obj}} & returns the remaining object
 * @param {object} obj Object from which we want to omit/delete a key
 * @param {string[]} blackList Array of keys to be deleted from the Object
 * @returns {object} Object with {{blackList}} keys removed from {{oj}}
 */
export const omit = <T>(obj: any, blackList: string[]): T => {
    if (isEmpty(obj)) return obj;

    blackList = setDefaultValue(blackList, []);

    return Object.fromEntries(Object.entries(obj).filter(([ key ]) => !blackList.includes(key))) as unknown as T;
};

/**
 * @function pick Picks 1 level keys only
 * @description To pick the {{picklist}} keys from {{obj}} & returns the remaining object
 * @param {object} obj Object from which we want to pick/add a key
 * @param {string[]} pickList Array of keys to be included from the Object
 * @returns {object} Object with {{picked}} keys added to {{obj}}
 */
export const pick = <T>(obj: any, pickList: string[]): T => {
    if (isEmpty(obj)) return obj;

    pickList = setDefaultValue(pickList, []);

    return Object.fromEntries(Object.entries(obj).filter(([ key ]) => pickList.includes(key))) as unknown as T;
};

/**
 * @function setDefaultValue
 * @description Returns the default value, in case {{obj}} isEmpty
 * @param {T} obj anything
 * @returns {T}
 */
export const setDefaultValue = <T>(obj: T, defaultValue: T): T => {
    if (isEmpty(obj)) return defaultValue;

    return obj;
};

/**
 * @function startsWithIgnoreCase
 * @description To check whether {{source}} starts with {{patterns}}
 * @param {string} source   string in which we want to search
 * @param {string | string[]} patterns  {{patterns}} we are searching for in the {{source}} string
 * @returns {boolean}
 */
export const startsWithIgnoreCase = (source: string, ...patterns: string[]): boolean => {
    if (isEmpty(source)) return false;

    if (isEmpty(patterns)) return true;

    // Clean the array from null / undefined inputs
    patterns = cleanNullUndefinedFromArray(patterns);

    return patterns.filter((pattern) => source.toLowerCase().startsWith(pattern.toLowerCase())).length === patterns.length;
};

/**
 * @function tc
 * @description It takes promise as input and results value
 * @example // tc('<promise>');
 * @param {string} value
 * @returns {string}
 */
export const tc = async <T>(p: Promise<T>, errorExt?: any): Promise<[Error, T]> => to(p, errorExt);

/**
 * @function toUpperCase
 * @description Changes the case to lower case or return '' in case got a null or undefined
 * @example
 *      1. toLowerCase('DLT') -> dlt
 *      2. toLowerCase(null) -> ''
 * @param str string to change case to lowercase
 * @returns Lowercase string
 */
export const toLowerCase = (str: string): string => {
    str = setDefaultValue(str, '');
    
    return str.toLowerCase();
};

/**
 * @function toUpperCase Changes the case of the string to upper case
 * @description Changes the case to upper case or return '' in case got a null or undefined
 * @example
 *      1. toUpperCase('dlt') -> dlt
 *      2. toUpperCase(null) -> ''
 * @param str string to change case to uppercase
 * @returns Uppercase string
 */
export const toUpperCase = (str: string): string => setDefaultValue(str, '').toUpperCase();
