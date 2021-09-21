import "../styles/globals.css";
import type { AppProps } from "next/app";
import { withLDProvider } from "launchdarkly-react-client-sdk";

function MyApp({ Component, pageProps }: AppProps) {
  // this should be able to go outside this function
  // but it does not play well with Typescript
  const Wrapper = withLDProvider({
    clientSideID: "613bb60cb19a8c259ad5a898",
    user: {
      // LD will automatically generate a unique key for
      // anonymous users if we do not provide it. It is unique
      // per user per browser until their localStorage is cleared.
      // if they log in later, we can use client.identify to update this
      anonymous: true
      // key: "anonymous",
      // name: "User Name",
      // email: "User@email.com",
    },
    options: {
      // we can set specific "default" values here
      // or use 'localStorage' to use the last fetched value
      bootstrap: {
        'ld_test_flag': 'yellow'
      }
    }
  })(() => <Component {...pageProps} />);
  return <Wrapper />;
}

export default MyApp;
