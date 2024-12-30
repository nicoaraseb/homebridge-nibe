import { Characteristic, UUID } from 'hap-nodejs';

// Define a custom TotalConsumption characteristic
export class TotalConsumptionCharacteristic extends Characteristic {
  constructor() {
    super(
      'TotalConsumptionCharacteristic', // Name of the characteristic
      '48128b2d-0bf7-41f8-b30b-53f3a7ccf49b', // Unique UUID
      {
        format: Characteristic.Formats.FLOAT, // Data format (float)
        unit: 'kWh', // Unit of measurement (e.g., kilowatt-hours)
        minValue: 0, // Minimum value
        maxValue: 2000000, // Maximum value (adjust based on expected range)
        minStep: 1, // Step value for increments
        perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE], // Permissions (readable and writable)
      }
    );

    // Set the default value of the characteristic
    this.value = this.getDefaultValue();
  }

  // Default value for TotalConsumption (e.g., 0 kWh)
  getDefaultValue() {
    return 0; // Default value for consumption (in kWh)
  }
}
