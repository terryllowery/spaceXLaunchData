import {log} from './deps.ts';

async function downloadLaunchData() {
  log.info("cDownloading launch data...")
  const response = await fetch("https://api.spacexdata.com/v3/launches", {
    method: "GET",
  });
  if(!response.ok) {
    log.error("Couldn't download launch data...");
  }

  const launchData = await response.json();
  console.log(launchData);
}

await downloadLaunchData();

log.info("Finished")
log.critical("We are going down!!!!")
