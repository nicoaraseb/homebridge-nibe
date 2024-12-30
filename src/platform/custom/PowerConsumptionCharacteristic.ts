import { Characteristic, CharacteristicProps, Service, UUIDGen } from 'hap-nodejs';

// Create a custom characteristic for temperature (or any other data)
class PowerConsumptionCharacteristic extends Characteristic {
  constructor() {
    super('PowerConsumptionCharacteristic', UUIDGen.generate('PowerConsumptionCharacteristic'));
    this.setProps({
      format: Characteristic.Formats.FLOAT,
      unit: 'kWh', // You can also use 'Fahrenheit' or other units
      minValue: -100, // Example minimum value
      maxValue: 100000, // Example max value
      stepValue: 1, // Step value
      perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY],
    });
    this.value = 0; // Default value
  }
}