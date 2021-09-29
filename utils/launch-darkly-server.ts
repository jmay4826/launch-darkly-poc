// lightly modified for TS from some amazing documentation for LD + Next.js
// https://github.com/remotesynth/ld-nextjs-basics
// https://docs.launchdarkly.com/guides/platform-specific/nextjs#integrating-launchdarklys-sdks-into-nextjs

import LaunchDarkly from "launchdarkly-node-server-sdk";

let launchDarklyClient: LaunchDarkly.LDClient | undefined;

async function initialize(){
    if (!process.env.LAUNCHDARKLY_SDK_KEY){
        throw new Error('no server sdk key')
    }
    const client = LaunchDarkly.init(process.env.LAUNCHDARKLY_SDK_KEY);
    await client.waitForInitialization();
    return client;
}

export async function getClient(){
    if (launchDarklyClient){
        return launchDarklyClient
    }
    launchDarklyClient = await initialize();
    return launchDarklyClient;
}
