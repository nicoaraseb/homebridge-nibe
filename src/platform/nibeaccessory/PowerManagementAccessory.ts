import { Data } from '../DataDomain';
import { AccessoryDefinition, AccessoryInstance, ServiceResolver } from '../AccessoryDomain';
import { Logger } from '../PlatformDomain';
import { Locale } from '../util/Locale';
import { TotalConsumptionCharacteristic } from '../customcharacteristics/TotalConsumptionCharacteristic';

export class PowerManagementAccessory extends AccessoryDefinition {

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
    const service = this.getOrCreateService('PowerManagement', platformAccessory);
    const parameter = this.findParameter(this.parameterId, data);

    if (service && parameter) {
      const totalCons = service.getCharacteristic('CurrentConsumption');
      if (totalCons) {
        totalCons.updateValue(parameter.value); // Update the custom characteristic value
      }

      super.update(platformAccessory, data);
      this.log.debug(`Accessory ${platformAccessory.context.accessoryId} updated with value: ${parameter.value}`);
    }
  }

  create(platformAccessory: AccessoryInstance, data: Data): void {
    super.create(platformAccessory, data);

    const service = this.getOrCreateService('PowerManagement', platformAccessory);
    this.updateCharacteristic(service, 'CurrentConsumption', 0);
    this.update(platformAccessory, data);
  }
}
