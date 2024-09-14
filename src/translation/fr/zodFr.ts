import { ZodErrorMap, ZodIssueCode, ZodParsedType, util } from 'zod';

const errorMap: ZodErrorMap = (issue, _ctx) => {
  let message: string;

  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = 'Requis';
      } else {
        message = `doit être un(e) ${issue.expected}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Valeur littérale invalide, attendu ${JSON.stringify(
        issue.expected,
        util.jsonStringifyReplacer,
      )}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Clé(s) non reconnue(s) dans l'objet: ${util.joinValues(
        issue.keys,
        ', ',
      )}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Entrée invalide`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Valeur de discriminant invalide. Attendu ${util.joinValues(
        issue.options,
      )}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(
        issue.options,
      )}, reçu '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Arguments de fonction invalides`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Type de retour de fonction invalide`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Date invalide`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === 'object') {
        if ('includes' in issue.validation) {
          message = `Doit inclure "${issue.validation.includes}"`;

          if (typeof issue.validation.position === 'number') {
            message = `${message} à une ou plusieurs positions supérieures ou égales à ${issue.validation.position}`;
          }
        } else if ('startsWith' in issue.validation) {
          message = `Doit commencer par "${issue.validation.startsWith}"`;
        } else if ('endsWith' in issue.validation) {
          message = `Doit se terminer par "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== 'regex') {
        message = `Invalide ${issue.validation}`;
      } else {
        message = 'Invalide';
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === 'array')
        message = `Doit contenir ${
          issue.exact ? 'exactement' : issue.inclusive ? `au moins` : `plus de`
        } ${issue.minimum} element(s)`;
      else if (issue.type === 'string')
        if (issue.minimum === 1) {
          message = 'Required';
        } else {
          message = `Doit contenir ${
            issue.exact
              ? 'exactement'
              : issue.inclusive
              ? `au moins`
              : `plus de`
          } ${issue.minimum} character(s)`;
        }
      else if (issue.type === 'number')
        message = `Doit être ${
          issue.exact
            ? `exactement égal à `
            : issue.inclusive
            ? `supérieur ou égal à `
            : `supérieur à `
        }${issue.minimum}`;
      else if (issue.type === 'date')
        message = `Date must be ${
          issue.exact
            ? `exactement égal à `
            : issue.inclusive
            ? `supérieur ou égal à `
            : `supérieur à `
        }${new Date(Number(issue.minimum))}`;
      else message = 'Entrée invalide';
      break;
    case ZodIssueCode.too_big:
      if (issue.type === 'array')
        message = `Doit contenir ${
          issue.exact ? `exactement` : issue.inclusive ? `at most` : `less than`
        } ${issue.maximum} element(s)`;
      else if (issue.type === 'string')
        message = `Doit contenir ${
          issue.exact ? `exactement` : issue.inclusive ? `at most` : `under`
        } ${issue.maximum} character(s)`;
      else if (issue.type === 'number')
        message = `Doit être ${
          issue.exact
            ? `exactement`
            : issue.inclusive
            ? `inférieur ou égal à`
            : `inférieur à`
        } ${issue.maximum}`;
      else if (issue.type === 'bigint')
        message = `Doit être ${
          issue.exact
            ? `exactement`
            : issue.inclusive
            ? `inférieur ou égal à`
            : `inférieur à`
        } ${issue.maximum}`;
      else if (issue.type === 'date')
        message = `Date must be ${
          issue.exact
            ? `exactement`
            : issue.inclusive
            ? `plus petit ou égal à`
            : `plus petit que`
        } ${new Date(Number(issue.maximum))}`;
      else message = 'Entrée invalide';
      break;
    case ZodIssueCode.custom:
      message = `Entrée invalide`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Les résultats d'intersection n'ont pas pu être fusionnés`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Doit être un multiple de ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = 'Doit être fini';
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};

export default errorMap;
