import { inject, LogManager } from "aurelia-framework";
import ToolEndpointChecker from "resources/ToolEndpointChecker.js";
import User from "resources/User.js";

const log = LogManager.getLogger("Q");

@inject(User, ToolEndpointChecker)
export default class ToolEndpointAvailabilityCheck {
  constructor(user, toolEndpointChecker) {
    this.user = user;
    this.toolEndpointChecker = toolEndpointChecker;
  }

  async isAvailable(availabilityCheck) {
    if (!availabilityCheck.endpoint) {
      log.error(
        "no endpoint defined for availabilityCheck checkToolEndpoint:",
        availabilityCheck
      );
      return false;
    }
    if (!availabilityCheck.withData) {
      const availability = await this.toolEndpointChecker.fetch(
        availabilityCheck.endpoint
      );
      return availability.available;
    }
    const availability = await this.toolEndpointChecker.fetchWithItem(
      availabilityCheck.endpoint
    );
    return availability.available;
  }
}
