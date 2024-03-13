import * as Sentry from "@sentry/vue"

export default defineNuxtPlugin(({ $config, vueApp }) => {
    const router = useRouter()

    Sentry.init({
        vueApp,
        dsn: $config.public.SENTRY_DSN || '',
        environment: $config.public.ENV || 'local',
        release: 'aws-frontend-donation-receiver@' + $config.public.CI_COMMIT_SHORT_SHA,
        integrations: [
            Sentry.browserTracingIntegration({ router }),
            Sentry.replayIntegration(),
        ],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,

        // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
        tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],

        // Capture Replay for 10% of all sessions,
        // plus for 100% of sessions with an error
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
    });

})
