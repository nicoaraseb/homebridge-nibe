import { Data } from '../DataDomain';
import { AccessoryDefinition, AccessoryInstance, ServiceResolver } from '../AccessoryDomain';
import { Logger } from '../PlatformDomain';
import { Locale } from '../util/Locale';

export class InfoTextAccessory extends AccessoryDefinition {

  constructor(
    private readonly parameterId: string,
    protected readonly name: string,
    protected readonly version: number,
    protected readonly locale: Locale,
    protected readonly serviceResolver: ServiceResolver,
    protected readonly log: Logger,
  ) {
    super(name, version, locale, serviceResolver, log);
  }

  isApplicable(data: Data) {
    const result = this.findParameter(this.parameterId, data);
    if (result) {
      return true;
    }
    this.log.debug(`Conditions not met for accessory: [${this.buildIdentifier(data)}]`);
    return false;
  }

  update(platformAccessory: AccessoryInstance, data: Data) {
    const service = this.getOrCreateService('AccessoryInformation', platformAccessory);
    const parameter = this.findParameter(this.parameterId, data);

    if (service && parameter) {
      // Update the accessory's display name or other characteristic
      this.updateCharacteristic(service, 'Name', this.getText(parameter.value));
      super.update(platformAccessory, data);
      this.log.debug(`Accessory ${platformAccessory.context.accessoryId} updated with text: ${parameter.value}`);
    }
  }

  create(platformAccessory: AccessoryInstance, data: Data): void {
    super.create(platformAccessory, data);

    const service = this.getOrCreateService('AccessoryInformation', platformAccessory);

    this.updateCharacteristic(service, 'Name', this.getText(this.name)); // Initial Name
    this.update(platformAccessory, data); // Populate with initial data
  }
}
