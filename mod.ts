import {log} from './deps.ts';

interface Launch {
  flightNumber: number;
  mission: string;
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
    const flightData = {
      flightNumber: launch["flight_number"],
      mission: launch["mission_name"],
    }
    launches.set(flightData.flightNumber, flightData) 
    log.info(JSON.stringify(flightData))

  }
}

await downloadLaunchData();

log.info("Finished")
