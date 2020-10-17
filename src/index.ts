import SysInfo from "systeminformation";
import HttpClient from "got";

class Worker {
  static async doWork(): Promise<void> {
    console.log("start...");

    /***
     * 1. Sensorwerte lesen
     * Lese die folgenden Werte aus dem System aus:
     * - Freier Arbeitsspeicher
     * - Anzahl laufende Prozesse
     * - Gesamttemperatur der CPU
     * - Restkapazität der Batterie in Prozent
     * 
     * Speichere diese Werte in einzelnen Variablen. Verwende den "async/await style".
     * Die Programmbibliothek "systeminformation" (zum Auslesen der Informationen) wurde als "SysInfo" bereits importiert.
     * Doku von "systeminformation": https://systeminformation.io
     * 
     * Beispiel, wie der Hersteller der CPU in die Konsole ausgegeben werden kann:
     * let cpuInfo = await SysInfo.cpu();
     * console.log(cpuInfo.manufacturer);
     */

    // Systeminfo-Objekte auslesen
    let memoryInfo = await SysInfo.mem();
    let processInfo = await SysInfo.processes();
    let cpuTempInfo = await SysInfo.cpuTemperature();
    let batteryInfo = await SysInfo.battery();

    // Einzelne Sensorwerte aus den Objekten auslesen
    let memoryFree = memoryInfo.free;
    let processCount = processInfo.running;
    let cpuTemp = cpuTempInfo.main;
    let capacityProcent = (batteryInfo.currentcapacity / batteryInfo.maxcapacity) * 100;



    /***
     * 2. Werte auf SensorAPI übertragen (die Sensoren müssen vorgängig angelegt werden)
     * Doku von "SensorAPI": https://github.com/tschuegge/SensorAPI
     * 
     * Die Programmbibliothek "got" (zum Kommunizieren mit der REST API) wurde als "HttpClient" bereits importiert.
     * Doku von "got": https://github.com/sindresorhus/got
     * 
     * Beispiel wie ein HTTP-Request (PUT) abgesendet werden kann:
     * let payload = { id: null, name: "Test" };
     * HttpClient.post("http://demoapi.invalid.com/api", { json: payload });
     */

    // URL des Endpunkts auf der SensorAPI
    let url = "https://sensorapi.juergdanuser.ch/api/TestUser/sensordata";

    // Free Memory
    let payloadMemoryFree = {
      id: null, // ID wird von der SensorAPI gesetzt
      data: memoryFree,
      timestamp: null, // Zeitstempel wird von der SensorAPI gesetzt
      sensorid: 11
    };
    HttpClient.post(url, { json: payloadMemoryFree });

    // Process Count
    let payloadProcessCount = {
      id: null,
      data: processCount,
      timestamp: null,
      sensorid: 10
    };
    HttpClient.post(url, { json: payloadProcessCount });

    // CPU Temperatur
    let payloadCpuTemp = {
      id: null,
      data: cpuTemp,
      timestamp: null,
      sensorid: 9
    };
    HttpClient.post(url, { json: payloadCpuTemp });

    // Battery Capacity
    let payloadCapacity = {
      id: null,
      data: capacityProcent,
      timestamp: null,
      sensorid: 12
    };
    HttpClient.post(url, { json: payloadCapacity });


    console.log("...end");
  }
}

setTimeout( // ersetzen durch "setInterval" um die Werte regelmässig zu übertragen
  () => {
    Worker.doWork();
  },
  1000 // Intervall in dem Werte auf die SensorAPI gesendet werden
);

