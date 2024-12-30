import { Characteristic, Service } from 'hap-nodejs';
import { Data } from '../DataDomain';
import { AccessoryDefinition, AccessoryInstance, ServiceResolver } from '../AccessoryDomain';
import { Logger } from '../PlatformDomain';
import { Locale } from '../util/Locale';
import { PowerConsumptionCharacteristic } from '../custom/PowerConsumptionCharacteristic';

export class PowerConsumptionAccessory extends AccessoryDefinition {
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
    const service = this.getOrCreateService('Sensor', platformAccessory);
    const parameter = this.findParameter(this.parameterId, data);

    if (service && parameter) {
      // Get or add the custom characteristic
      let customTempCharacteristic = service.getCharacteristic(PowerConsumptionCharacteristic);
      if (!customTempCharacteristic) {
        customTempCharacteristic = service.addOptionalCharacteristic(PowerConsumptionCharacteristic);
      }

      // Use your own logic to assign a value (in this case, power consumption)
      const powerConsumption = parameter.value;

      // Update the value of your custom characteristic using setValue
      customTempCharacteristic.setValue(powerConsumption);

      this.updateCharacteristic(service, 'Name', this.name);
      super.update(platformAccessory, data);

      this.log.debug(`Accessory ${platformAccessory.context.accessoryId} updated to ${powerConsumption}`);
    }
  }

  create(platformAccessory: AccessoryInstance, data: Data): void {
    super.create(platformAccessory, data);

    const service = this.getOrCreateService('Sensor', platformAccessory);

    const initialPowerConsumption = 0; // Replace with initial value (e.g., 0 kWh)

    // Create or add your custom characteristic
    let customTempCharacteristic = service.getCharacteristic(PowerConsumptionCharacteristic);
    if (!customTempCharacteristic) {
      customTempCharacteristic = service.addOptionalCharacteristic(PowerConsumptionCharacteristic);
    }

    customTempCharacteristic.setValue(initialPowerConsumption);
    this.updateCharacteristic(service, 'Name', this.name);
  }
}
