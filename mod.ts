import {log, _} from './deps.ts';

interface Launch {
  flightNumber: number;
  mission: string;
  rocket: string;
  customers: Array<string>;
}

const launches = new Map<number, Launch>();


async function downloadLaunchData() {
  log.info("cDownloading launch data...")
  const response = await fetch("https://api.spacexdata.com/v3/launches", {
    method: "GET",
  });
  if(!response.ok) {
    log.error("Couldn't download launch data...");
  }

  const launchData = await response.json();
 
  for (const launch of launchData) {
    const payloads = launch["rocket"]["second_stage"]["payloads"];
    const customers = _.flatMap(payloads, (payload : any) => {
      return payload["customers"]
    })

    const flightData = {
      flightNumber: launch["flight_number"],
      mission: launch["mission_name"],
      rocket: launch["rocket"]["rocket_name"],
      customers: customers,
    }
    launches.set(flightData.flightNumber, flightData) 
    log.info(JSON.stringify(flightData))

  }
}

await downloadLaunchData();

log.info("Finished")
