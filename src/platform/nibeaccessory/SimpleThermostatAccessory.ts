import {Data} from '../DataDomain';
import {AccessoryDefinition, AccessoryInstance, ServiceResolver} from '../AccessoryDomain';
import {Logger} from '../PlatformDomain';
import {Locale} from '../util/Locale';

export class SimpleThermostatAccessory extends AccessoryDefinition {

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
    const service = this.getOrCreateService('Thermostat', platformAccessory);
    const parameter = this.findParameter(this.parameterId, data);
    if (service && parameter) {
      if (parameter === '50660') {
        this.updateCharacteristic(service, 'CurrentTemperature', parameter.value);
      }
      if (parameter === '47751') {
        this.updateCharacteristic(service, 'TargetTemperature', parameter.value);
      }
      super.update(platformAccessory, data);
      this.log.debug(`Accessory ${platformAccessory.context.accessoryId} updated to ${parameter.value}`);
    }
  }

  create(platformAccessory: AccessoryInstance, data: Data): void {
    super.create(platformAccessory, data);

    const service = this.getOrCreateService('Thermostat', platformAccessory);
    this.updateCharacteristic(service, 'Name', this.getText(this.name));
    this.updateCharacteristic(service, 'TargetTemperature', 22);

    // Listen for TargetTemperature changes
    service.getCharacteristic(Characteristic.TargetTemperature)
      .on('set', (value, callback) => {
        this.setTargetTemperature(value);
        callback(null);
      });

    this.update(platformAccessory, data);
  }

  setTargetTemperature(value) {
    this.platform.log(`Target temperature set to: ${value}`);
    // Implement logic to send the new temperature to the NIBE system
    this.sendToNibeSystem(value);
  }

  sendToNibeSystem(value) {
    // Placeholder for sending the new target temperature to the NIBE system
    this.platform.log(`Sending target temperature ${value} to the NIBE system.`);
    // Add actual implementation here
  }
}