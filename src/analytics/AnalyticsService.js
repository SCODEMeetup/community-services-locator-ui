export default class AnalyticsService {
  static trackEvent(category, action, value = null) {
    return (
      ga &&
      ga('send', {
        hitType: 'event',
        eventCategory: category,
        eventAction: action,
        eventValue: value,
      })
    );
  }

  static pageView(page = '/') {
    return (
      ga &&
      ga('send', {
        hitType: 'pageview',
        page,
      })
    );
  }
}
