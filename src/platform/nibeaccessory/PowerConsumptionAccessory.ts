import { Characteristic, CharacteristicProps, Service } from 'hap-nodejs';
import {Data} from '../DataDomain';
import {AccessoryDefinition, AccessoryInstance, ServiceResolver} from '../AccessoryDomain';
import {Logger} from '../PlatformDomain';
import {Locale} from '../util/Locale';
import {PowerConsumptionCharacteristic} from '../custom/PowerConsumptionCharacteristic';

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
      this.log.debug(`Conditions not meet for accessory: [${this.buildIdentifier(data)}]`);
      return false;
    }

  update(platformAccessory: AccessoryInstance, data: Data) {
    const service = this.getOrCreateService('Sensor', platformAccessory);
    const parameter = this.findParameter(this.parameterId, data);

    if (service && parameter) {
      // Use your own logic to assign a temperature value
      const temperature = parameter.value;

      // Create or update your custom characteristic
      let customTempCharacteristic = service.getOptionalCharacteristics(PowerConsumptionCharacteristic);
      if (!customTempCharacteristic) {
        customTempCharacteristic = service.addOptionalCharacteristic(new PowerConsumptionCharacteristic());
      }

      // Update the value of your custom characteristic
      customTempCharacteristic.updateValue(temperature);

      this.updateOptionalCharacteristics(service, 'Name', this.name);
      super.update(platformAccessory, data);

      this.log.debug(`Accessory ${platformAccessory.context.accessoryId} updated to ${temperature}`);
    }
  }

  create(platformAccessory: AccessoryInstance, data: Data): void {
    super.create(platformAccessory, data);

    const service = this.getOrCreateService('Sensor', platformAccessory);

    const initialTemperature = 0; // Replace with initial value

    // Create or add your custom characteristic
    let customTempCharacteristic = service.getOptionalCharacteristics(PowerConsumptionCharacteristic);
    if (!customTempCharacteristic) {
      customTempCharacteristic = service.addOptionalCharacteristic(new CustomTemperatureCharacteristic());
    }

    customTempCharacteristic.updateValue(initialTemperature);
    this.updateOptionalCharacteristics(service, 'Name', this.name);
  }
}
