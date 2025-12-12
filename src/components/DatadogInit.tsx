import { datadogRum } from "@datadog/browser-rum";

const DATACOMMONS = process.env.NEXT_PUBLIC_DATACOMMONS || "gen3.2_generic_datacommons";

datadogRum.init({
  applicationId: '25e9ac14-9635-4a8f-a0c1-519f2768c458',
  clientToken: 'pub05d4bcea8a70f1212d09ec166af53b62',
  site: 'ddog-gov.com',
  service: 'frontend-framework',
  env: `${DATACOMMONS}`,
  version: process.env.version || 'unknown',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 0,
  defaultPrivacyLevel: 'mask-user-input',
});

const DatadogInit = ()=>  {
  // Render nothing - this component is only included so that the init code
  // above will run client-side
  return null;
}

export default DatadogInit;
