// import { Characteristic, CharacteristicProps, Service } from 'hap-nodejs';
//
// // Create a custom characteristic for Power Consumption (or any other data)
// class PowerConsumptionCharacteristic extends Characteristic {
//     static readonly UUID = '1dc7fa25-0a30-4796-9f2e-a897a80a95bd';
//   constructor() {
//     super(
//       'PowerConsumptionCharacteristic',
//       PowerConsumptionCharacteristic.UUID, // Unique UUID
//       {
//         format: Characteristic.Formats.FLOAT,   // Data format (FLOAT)
//         unit: 'kWh',                           // Unit of measure (kWh)
//         minValue: -100,                        // Example minimum value
//         maxValue: 100000,                      // Example maximum value
//         perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY, Characteristic.Perms.WRITE], // Permissions
//       }
//     );
//     this.value = 0; // Default value
//   }
// }
//
// // Export the custom characteristic so it can be used elsewhere
// export { PowerConsumptionCharacteristic };
