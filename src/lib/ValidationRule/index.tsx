
import language from './language';

/* regex for validation */
const patternEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const patternPhone = /^08[0-9]+$/;
const patternLetterNumber = /^[0-9a-zA-Z]+$/;
const patternLetterNumberSp = /^[0-9a-zA-Z \n]+$/;
const patternDecimal = /^\d+(\.\d{1,3})?$/;
const patternNumber = /^[0-9]+$/;
const patternNumberSp = /^[0-9 ]+$/;
const patternDotComma = /^\d+(\.\d+)*$/;
const patternLetter = /^[a-zA-Z]+$/;
const patternLetterSp = /^[a-zA-Z ]+$/;
const patternNpwp = /^(\d{2})\.(\d{3})\.(\d{3})\.(\d{1})-(\d{3})\.(\d{3})$/i;
const patternPassword = /^(?=[^\s]*?[0-9])(?=[^\s]*?[a-zA-Z])[a-zA-Z0-9]*$/;
const patternNumberWithColon = /^[0-9,]+$/;
const patternStrictPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\s]).{0,}$/;
const patternAttribute = /^[a-z_]+$/;
const patternAlphaNumericSpChr = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
const patternNotASymbols = /^[a-zA-Z ]+[^\\!^&*_<>{}~`!''""?/:;,.()+=-[\]]+$/;
const patternNotASymbolsAnNotNumber = /^[a-zA-Z ]+[^\d.-]+[^\\!^&*_<>{}~`!''""?/:;,.()+=-[\]]+$/;

const validationItem = (
  control: any,
  item: any,
  message: string
) => {
  let validation: any = [];
  let itemValidation: any = (item as string).match(/\[([^)]+)\]/);
  let itemName: any = (item as string).replace(itemValidation?.[0], "");
  let itemValue: any = itemValidation?.[1];
  const errorMessage = (type: string): string => {
    const langObj: any = language(parseFloat(itemValue));
    return langObj?.id?.[type]?.[0] ?? '';
  }; message = (message) ? message : errorMessage(itemName);

  switch (itemName) {
    case "required":
      validation = {
        required: (value: string) => {
          let error = false;
          if (value === null || value === undefined || value.length === 0) {
            error = true;
          }
          return !error || message;
        },
      }
      break;
    case "minValue":
      validation = {
        minValue: (value: any) => {
          let error = false;
          if (parseFloat(value) < (itemValue * 1) || isNaN(value)) {
            error = true;
          }
          return !error || message;
        }
      }
      break;
    case "maxValue":
      validation = {
        minValue: (value: any) => {
          let error = false;
          if ((parseFloat(value) > (itemValue * 1) || isNaN(value)) && value) {
            error = true;
          }
          return !error || message;
        }
      }
      break;
    case "length":
      validation = {
        minLength: (value: string) => {
          let error = false;
          if (value.length !== (itemValue * 1) && value) {
            error = true;
          }
          return !error || message;
        }
      }
      break;
    case "minLength":
      validation = {
        minLength: (value: string) => {
          let error = false;
          if (value.length < (itemValue * 1) && value) {
            error = true;
          }
          return !error || message;
        }
      }
      break;
    case "maxLength":
      validation = {
        maxLength: (value: string) => {
          let error = false;
          if (value.length > (itemValue * 1) && value) {
            error = true;
          }
          return !error || message;
        }
      }
      break;
    case "minThan":
      validation = {
        minThan: (value: string) => {
          let error = false;
          const resultValue: any = parseFloat(value.toString()?.replace(/\./g, '')?.replace(/,/g, '.').replaceAll(',', ''))
          const typeValue: any = parseFloat(itemValue)
          if (resultValue < typeValue) {
            error = true;
          }
          return !error || message;
        }
      }
      break;
    case "moreThan":
      validation = {
        moreThan: (value: string) => {
          let error = false;
          const resultValue: any = parseFloat(value.toString()?.replace(/\./g, '')?.replace(/,/g, '.').replaceAll(',', ''))
          const typeValue: any = parseFloat(itemValue) + 10000;
          if (parseFloat(resultValue) > parseFloat(typeValue)) {
            error = true;
          }
          return !error || message;
        }
      }
      break;
    case "moreThanCurrent":
      validation = {
        moreThanCurrent: (value: string) => {
          let error = false;
          const resultValue: any = parseFloat(value.toString()?.replace(/\./g, '')?.replace(/,/g, '.').replaceAll(',', ''))
          const typeValue: any = parseFloat(itemValue);
          if (parseFloat(resultValue) > parseFloat(typeValue)) {
            error = true;
          }
          return !error || message;
        }
      }
      break;
    case "moreThanCash":
      validation = {
        moreThanCash: (value: string) => {
          let error = false;
          const resultValue: any = parseFloat(value.toString()?.replace(/\./g, '')?.replace(/,/g, '.').replaceAll(',', ''))
          const typeValue: any = parseFloat(itemValue);
          if (parseFloat(resultValue) > parseFloat(typeValue)) {
            error = true;
          }
          return !error || message;
        }
      }
      break
    case "moreThanStandar":
      validation = {
        moreThanStandar: (value: string) => {
          let error = false;
          const resultValue: any = parseFloat(value.toString()?.replace(/\./g, '')?.replace(/,/g, '.').replaceAll(',', ''))
          const typeValue: any = parseFloat(itemValue);
          if (parseFloat(resultValue) > parseFloat(typeValue)) {
            error = true;
          }
          return !error || message;
        }
      }
      break;
    case "moreThanCurrently":
      validation = {
        moreThanCurrently: (value: string) => {
          let error = false;
          const resultValue: any = parseFloat(value.toString()?.replace(/\./g, '')?.replace(/,/g, '.').replaceAll(',', ''))
          const typeValue: any = parseFloat(itemValue)
          if (resultValue > (typeValue + 10000)) {
            error = true;
          }
          return !error || message;
        }
      }
      break;
    case "email":
      validation = {
        email: (value: string) => {
          let error = false;
          if (!patternEmail.test(value) && value) {
            error = true;
          }
          return !error || message;
        }
      }
      break;
    case "phone":
      validation = {
        phone: (value: string) => {
          let error = false;
          if (!patternPhone.test(value) && value) {
            error = true;
          }
          return !error || message;
        }
      }
      break;
    case "letterNumber":
      validation = {
        letterNumber: (value: string) => {
          let error = false;
          if (!patternLetterNumber.test(value) && value) {
            error = true;
          }
          return !error || message;
        }
      }
      break;
    case "letterNumberSp":
      validation = {
        letterNumber: (value: string) => {
          let error = false;
          if (!patternLetterNumberSp.test(value) && value) {
            error = true;
          }
          return !error || message;
        }
      }
      break;
    case "decimal":
      validation = {
        decimal: (value: string) => {
          let error = false;
          if (!patternDecimal.test(value) && value) {
            error = true;
          }
          return !error || message;
        }
      }
      break;
    case "number":
      validation = {
        number: (value: string) => {
          let error = false;
          if (!patternNumber.test(value) && value) {
            error = true;
          }
          return !error || message;
        }
      }
      break;
    case "numberSp":
      validation = {
        numberSp: (value: string) => {
          let error = false;
          if (!patternNumberSp.test(value) && value) {
            error = true;
          }
          return !error || message;
        }
      }
      break;
    case "letter":
      validation = {
        letter: (value: string) => {
          let error = false;
          if (!patternLetter.test(value) && value) {
            error = true;
          }
          return !error || message;
        }
      }
      break;
    case "letterSp":
      validation = {
        letterSp: (value: string) => {
          let error = false;
          if (!patternLetterSp.test(value) && value) {
            error = true;
          }
          return !error || message;
        }
      }
      break;
    case "npwp":
      validation = {
        letterNumber: (value: string) => {
          let error = false;
          if (!patternNpwp.test(value) && value) {
            error = true;
          }
          return !error || message;
        }
      }
      break;
    case "password":
      validation = {
        password: (value: string) => {
          let error = false;
          if (!(!patternPassword.test(value) && !patternLetterNumber.test(value))) {
            error = true;
          }
          return !error || message;
        }
      }
      break;
    case "numberColon":
      validation = {
        numberColon: (value: string) => {
          let error = false;
          if (!patternNumberWithColon.test(value) && value) {
            error = true;
          }
          return !error || message;
        }
      }
      break;
    case "strictPassword":
      validation = {
        strictPassword: (value: string) => {
          let error = false;
          if (value !== '' && !patternStrictPassword.test(value)) {
            error = true;
          }
          return !error || message;
        }
      }
      break;
    case "equals":
      validation = {
        equals: (value: string) => {
          let valueCompare = control(itemValue);
          return value === valueCompare || message;
        }
      };
      break;
    case "fileSize":
      validation = {
        fileSize: (value: any) => {
          let fileSize = value?.[0]?.['size'];
          let error = false;
          if ((fileSize > parseFloat(itemValue) * 1024) && value) {
            error = true;
          }
          return !error || message;
        }
      }
      break;
    case "fileType":
      validation = {
        fileType: (value: any) => {
          let ext = itemValue.split('|');
          let fileName = value?.[0]?.['name'];
          let fileType = fileName?.split('.')?.pop()?.toLowerCase() || '';
          let error = false;
          if ((ext.includes(fileType) && fileType) || !value) {
            error = true;
          }
          return error || message;
        }
      }
      break;
    case "attribute":
      validation = {
        attribute: (value: string) => {
          let error = false;
          if (!patternAttribute.test(value) && value) {
            error = true;
          }
          return !error || message;
        }
      }
      break;
    case "passwordWithCharacter":
      validation = {
        attribute: (value: string) => {
          let error = false
          if (!patternAlphaNumericSpChr.test(value) && value) {
            error = true;
          }
          return !error || message;
        }
      }
      break
    case "numberDot":
      validation = {
        attribute: (value: string) => {
          let error = false
          if (!patternDotComma.test(value) && value) {
            error = true;
          }
          return !error || message;
        }
      }
      break
    case "valueOfNoteKg":
      validation = {
        attribute: (value: string) => {
          let error = false
          if (value.length < 4) {
            error = true;
          }
          return !error || message;
        }
      }
      break
    case "valueOfNumber":
      validation = {
        attribute: (value: string) => {
          let error = false
          if (value.length < 7) {
            error = true;
          }
          return !error || message;
        }
      }
      break
    case "valueOfnull":
      validation = {
        attribute: (value: string) => {
          let error = false
          if (value === '0') {
            error = true;
          }
          return !error || message;
        }
      }
      break
    case "notSymbol":
      validation = {
        attribute: (value: string) => {
          let error = false;
          if (!patternNotASymbols.test(value) && value) {
            error = true;
          }
          return !error || message;
        }
      }
      break
    case "notSymbolNumber":
      validation = {
        attribute: (value: string) => {
          let error = false;
          if (!patternNotASymbolsAnNotNumber.test(value) && value) {
            error = true;
          }
          return !error || message;
        }
      }
      break
    case "notNull":
      validation = {
        attribute: (value: string) => {
          let error = false;
          if (parseFloat(value) === 0) {
            error = true;
          }
          return !error || message;
        }
      }
      break
    case "minLengthNumber":
      validation = {
        minLength: (value: string) => {
          const numeric = value.replaceAll('.', '');
          let error = false;
          if (numeric.length < (itemValue * 1) && numeric) {
            error = true;
          }
          return !error || message;
        }
      }
      break;
    default:
      break;
  }

  return validation;
}

/**
 * @param rule type Array of String, Example : [required, min[5.5]]
 * @param rule type Array of Object, Example : [{rule: 'required', errorMessage: 'Custom Error Message Required'}]
 * @param validationMessage type Array of String, Example : ['required[Wajib Diisi yaa]', 'minLength[jangan kepanjangan]']
 */

const validationRule: any = (
  { rule = [], validationMessage = [] },
  control: any,
) => {
  let validation: any = [];
  if (rule) {
    rule.forEach((item: any) => {
      let errorMessage: string | undefined | any = "";

      /* check custom error message */
      if (typeof (item) !== "function") {
        validationMessage.forEach(valueMessage => {
          /* mapping ruleName and ruleValue */
          let itemValidation: any = (item as string).match(/\[([^)]+)\]/);
          let itemName = (item as string).replace(itemValidation?.[0], "");

          /* mapping messageName and messageValue */
          let itemValidationMessage: any = (valueMessage as string).match(/\[([^)]+)\]/);
          let itemNameMessage = (valueMessage as string).replace(itemValidationMessage?.[0], "");
          let itemValueMessage = itemValidationMessage?.[1];

          /* set value error message */
          errorMessage = (itemNameMessage === itemName) ? itemValueMessage : errorMessage;
        })
      }

      /* check rule validation */
      if (typeof (item as any) === "string") {
        validation = { ...validation, ...validationItem(control, item, errorMessage) }
      } else if (typeof (item) === "object") {
        let rule = item.rule;
        let errorMessage: any = item.errorMessage;

        validation = { ...validation, ...validationItem(control, rule, errorMessage) }
      } else if (typeof (item) === "function") {
        validation = {
          ...validation,
          validate: item
        };
      }
    });
  }
  validation = { validate: { ...validation } };

  return validation;
}

export default validationRule;