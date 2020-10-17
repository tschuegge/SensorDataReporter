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





    /***
     * 2. Werte auf SensorAPI übertragen (die Sensoren müssen vorgängig angelegt werden)
     * Doku von "SensorAPI": https://github.com/tschuegge/SensorAPI
     * 
     * Die Programmbibliothek "got" (zum Kommunizieren mit der REST API) wurde als "HttpClient" bereits importiert.
     * Doku von "got": https://github.com/sindresorhus/got
     * 
     * Beispiel wie ein HTTP-Request (PUT) abgesendet werden kann:
     * let payload = { id: null, name: "Test" };
     * HttpClient.put("http://demoapi.invalid.com/api", { json: payload });
     */




    console.log("...end");
  }
}

setTimeout( // ersetzen durch "setInterval" um die Werte regelmässig zu übertragen
  () => {
    Worker.doWork();
  },
  1000 // Intervall in dem Werte auf die SensorAPI gesendet werden
);

