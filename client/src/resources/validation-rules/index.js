import { inject } from "aurelia-framework";
import { I18N } from "aurelia-i18n";
import EmptyDataValidationRule from "./EmptyDataValidationRule.js";
import EmptyFirstRowValidationRule from "./EmptyFirstRowValidationRule.js";
import TooManyColumnsValidationRule from "./TooManyColumnsValidationRule.js";
import ToolEndpointValidationRule from "./ToolEndpointValidationRule.js";
import IsValueMissingValidationRule from "./IsValueMissingValidationRule.js";

@inject(
  I18N,
  EmptyDataValidationRule,
  EmptyFirstRowValidationRule,
  TooManyColumnsValidationRule,
  ToolEndpointValidationRule,
  IsValueMissingValidationRule
)
export default class ValidationRules {
  constructor(
    i18n,
    emptyDataValidationRule,
    emptyFirstRowValidationRule,
    tooManyColumnsValidationRule,
    toolEndpointValidationRule,
    isValueMissingValidationRule
  ) {
    this.i18n = i18n;
    this.emptyDataValidationRule = emptyDataValidationRule;
    this.emptyFirstRowValidationRule = emptyFirstRowValidationRule;
    this.tooManyColumnsValidationRule = tooManyColumnsValidationRule;
    this.toolEndpointValidationRule = toolEndpointValidationRule;
    this.isValueMissingValidationRule = isValueMissingValidationRule;
  }

  async validate(validationRule, data, tool, element) {
    if (validationRule.type === "IsValueMissing") {
      let validationResult = this.isValueMissingValidationRule.validate(
        element
      );
      return this.getNotification(validationResult, "", validationRule.type);
    } else if (validationRule.type === "EmptyData") {
      let validationResult = this.emptyDataValidationRule.validate(data);
      return this.getNotification(validationResult, "", validationRule.type);
    } else if (validationRule.type === "EmptyFirstRow") {
      let validationResult = this.emptyFirstRowValidationRule.validate(data);
      return this.getNotification(validationResult, "", validationRule.type);
    } else if (validationRule.type === "TooManyColumns") {
      let validationResult = this.tooManyColumnsValidationRule.validate(data);
      return this.getNotification(validationResult, "", validationRule.type);
    } else if (validationRule.type === "ToolEndpoint") {
      let validationResult = await this.toolEndpointValidationRule.validate(
        validationRule,
        data,
        tool
      );
      const validationNamespace = `${tool}:`;
      const validationType = validationRule.endpoint.replace("validate/", "");
      return this.getNotification(
        validationResult,
        validationNamespace,
        validationType
      );
    }
  }

  getNotification(validationResult, translationNamespace, validationType) {
    if (validationResult.showNotification) {
      const translationKey =
        validationType.charAt(0).toLowerCase() + validationType.slice(1);
      return {
        priority: validationResult.priority,
        message: {
          title: this.i18n.tr(
            `${translationNamespace}notifications.${translationKey}.title`
          ),
          body: this.i18n.tr(
            `${translationNamespace}notifications.${translationKey}.body`
          )
        }
      };
    }
    return {};
  }
}