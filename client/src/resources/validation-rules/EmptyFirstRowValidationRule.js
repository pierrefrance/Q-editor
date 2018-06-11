export default class EmptyFirstRowValidationRule {
  validate(data) {
    const validationResult = {
      showNotification: false,
      priority: {
        type: "medium",
        value: 10
      }
    };
    if (data[0][0]) {
      const totalValues = data[0][0].length;
      const nullValues = data[0][0].filter(entry => entry === null).length;
      validationResult.showNotification = nullValues === totalValues;
    }
    return validationResult;
  }
}
