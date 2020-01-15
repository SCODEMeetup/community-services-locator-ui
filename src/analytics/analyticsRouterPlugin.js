import AnalyticsService from 'src/analytics/AnalyticsService';

export default function analyticsPlugin(router, deps) {
  return {
    onTransitionSuccess: (toState, fromState, opts) => {
      AnalyticsService.pageView(toState.path);
    },
  };
}
