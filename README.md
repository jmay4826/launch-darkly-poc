# Launch Darkly Proof of Concept
## Summary

Overall, Launch Darkly provides a significantly better developer experience for our infrastructure compared to Split. This improved experience is driven primarily by:
1. the ability to use the official React SDK directly in Next.js
1. extensive, clearly organized documentation for each version of the SDK
1. fully-featured, robust examples for specific platforms, including Next.js and serverless environments

Although we have managed to create our own implementation of the Split SDK that works for our current needs, it will require 
developer resources to maintain, and only supports the most basic SDK features. Supporting additional features would require
additional developer resources and may cause breaking changes as we attempt to support additional features.

## Comparison

| Feature | Launch Darkly | Split |
| --- | --- | --- |
| React SDK support in Next.js | Y | N |
| User IDs added to dashboard automatically upon evaluation | Y | N |
| Unique, persistent IDs automatically randomly generated for anonymous users | Y | N |
| Robust documentation | Y | N |
| Clearly identifies whether the SDK client is connected and online | N | Y |

In terms of product features, Split and Launch Darkly appear to be pretty similar, so they are not included in the table above. However, adding support in our apps for additional features using Split will be more difficult than Launch Darkly because we are maintaining our own library. 

## FAQ
- Have you tested this with a SSR page to confirm everything works as expected for all types of Next.js rendering?
    - See `/pages/api/launch-darkly.ts`, `/pages/ssr.tsx`, and `/utils/launch-darkly-server.ts`. It was super easy to add these because of the fantastic documentation and example repo referenced in `/utils/launch-darkly-server.ts`. It also adds some nice logging automatically, including logging when an unknown flag is evaluated.

- Have you taken a look at how we would do feature flags for our backend code (services / graphql)? Mostly looking to understand if it’s equally as simple.
    - See above

- Any concerns you have with Launch Darkly other than us looking deeper into pricing?
    - With Launch Darkly, the "ready" event is emitted even if the client is initialized from localStorage, so there's no way to know if a user is getting a cached/bootstrapped value or a live value from the LD server. With Split, they have two separate "ready" events, one for cached values and one for live values. I think this should be easy to work around, but it's something we will have to keep in mind on pages that use flags.

- Any concerns getting LD to work for our legacy apps that are behind on React?
    - No concerns for legacy apps. They won't be able to use the official React SDK because it depends on React 16, but their existing feature flag implementations should be easy to convert to the Launch Darkly vanilla JS SDK
