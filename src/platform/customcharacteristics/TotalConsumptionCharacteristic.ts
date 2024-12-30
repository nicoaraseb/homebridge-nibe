import { Characteristic, CharacteristicProps, UUID } from 'hap-nodejs';

// Define a custom TransmitPower characteristic
export class TotalConsumptionCharacteristic extends Characteristic {
  constructor() {
    super('TotalConsumptionCharacteristic', '48128b2d-0bf7-41f8-b30b-53f3a7ccf49b', // Unique UUID
    this.setProps({
      format: Characteristic.Formats.FLOAT,
      unit: 'kWh',
      minValue: 0,
      maxValue: 2000000,
      stepValue: 1,
      perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE],
    }));
    this.value = this.getDefaultValue();
  }

  getDefaultValue() {
    return 0;
  }
}