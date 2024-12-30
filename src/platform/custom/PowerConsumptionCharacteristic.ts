import { Characteristic, CharacteristicProps, Service } from 'hap-nodejs';

// Create a custom characteristic for temperature (or any other data)
class PowerConsumptionCharacteristic extends Characteristic {
  constructor() {
    super('PowerConsumptionCharacteristic', '1dc7fa25-0a30-4796-9f2e-a897a80a95bd',
    {
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