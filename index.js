const authentication = require('./authentication');

// Triggers
const connectionListTrigger = require('./triggers/connectionList');
const whoamiTrigger = require('./triggers/whoami');
const connectionsTrigger = require('./triggers/connections');
const settingsTrigger = require('./triggers/settings');
const selfTrigger = require('./triggers/self');
const selfNotificationsTrigger = require('./triggers/self_notifications');
const selfReleaseFormsTrigger = require('./triggers/self_release_forms');
const selfTaggedFriendUsersTrigger = require('./triggers/self_tagged_friend_users');
const earningsChartTrigger = require('./triggers/earnings_chart');
const earningsTransactionsTrigger = require('./triggers/earnings_transactions');
const earningsChargebacksTrigger = require('./triggers/earnings_chargebacks');
const analyticsPostsChartTrigger = require('./triggers/analytics_posts_chart');
const analyticsPostsTopTrigger = require('./triggers/analytics_posts_top');
const analyticsStreamsChartTrigger = require('./triggers/analytics_streams_chart');
const analyticsStreamsTopTrigger = require('./triggers/analytics_streams_top');
const analyticsStoriesChartTrigger = require('./triggers/analytics_stories_chart');
const analyticsStoriesTopTrigger = require('./triggers/analytics_stories_top');
const analyticsMassMessagesChartTrigger = require('./triggers/analytics_mass_messages_chart');
const analyticsMassMessagesPurchasedTrigger = require('./triggers/analytics_mass_messages_purchased');
const analyticsPromotionsChartTrigger = require('./triggers/analytics_promotions_chart');
const analyticsPromotionsTopTrigger = require('./triggers/analytics_promotions_top');

// Creates
const connectionsInvalidatePostCreate = require('./creates/connections_invalidate_post');
const connectionsImportCreate = require('./creates/connections_import');
const postsCreate = require('./creates/posts');
const chatsMessagesPostCreate = require('./creates/chats_messages_post');
const massMessagesCreate = require('./creates/mass_messages');
const promotionsTrackingLinksCreate = require('./creates/promotions_tracking_links');
const promotionsTrackingLinksShareAccessCreate = require('./creates/promotions_tracking_links_share_access');
const promotionsTrialLinksCreate = require('./creates/promotions_trial_links');
const promotionsTrialLinksShareAccessCreate = require('./creates/promotions_trial_links_share_access');
const promotionsBundlesCreate = require('./creates/promotions_bundles');
const promotionsCreate = require('./creates/promotions');
const promotionsFinishPostCreate = require('./creates/promotions_finish_post');
const usersListsCreate = require('./creates/users_lists');
const usersListsUsersPostCreate = require('./creates/users_lists_users_post');
const usersListsPostCreate = require('./creates/users_lists_post');
const usersRestrictPostCreate = require('./creates/users_restrict_post');
const vaultListsCreate = require('./creates/vault_lists');
const vaultListsMediaPostCreate = require('./creates/vault_lists_media_post');
const v2LinkInitCreate = require('./creates/v2_link_init');
const v2DynamicRulesSignCreate = require('./creates/v2_dynamic_rules_sign');

// Searches
const connectionsSettingsSearch = require('./searches/connections_settings');
const analyticsPostsSearch = require('./searches/analytics_posts');
const analyticsMassMessagesBuyersSearch = require('./searches/analytics_mass_messages_buyers');
const posts2Search = require('./searches/posts_2');
const usersPostsSearch = require('./searches/users_posts');
const chatsMessagesSearch = require('./searches/chats_messages');
const massMessages2Search = require('./searches/mass_messages_2');
const chatsMediaSearch = require('./searches/chats_media');
const subscriptionsSearch = require('./searches/subscriptions');
const subscriptionsHistorySearch = require('./searches/subscriptions_history');

// Add API key to all requests
const addAuthHeader = (request, z, bundle) => {
  request.headers = request.headers || {};
  request.headers.apiKey = bundle.authData.apiKey;
  return request;
};

// Handle API errors
const handleErrors = (response, z, bundle) => {
  if (response.status >= 400) {
    let message = `HTTP ${response.status}`;
    try {
      const body = response.json;
      message = body.message || body.error || message;
    } catch (e) {}
    throw new z.errors.Error(message, 'ApiError', response.status);
  }
  return response;
};

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  
  authentication,
  
  beforeRequest: [addAuthHeader],
  afterResponse: [handleErrors],
  
  triggers: {
    [connectionListTrigger.key]: connectionListTrigger,
    [whoamiTrigger.key]: whoamiTrigger,
    [connectionsTrigger.key]: connectionsTrigger,
    [settingsTrigger.key]: settingsTrigger,
    [selfTrigger.key]: selfTrigger,
    [selfNotificationsTrigger.key]: selfNotificationsTrigger,
    [selfReleaseFormsTrigger.key]: selfReleaseFormsTrigger,
    [selfTaggedFriendUsersTrigger.key]: selfTaggedFriendUsersTrigger,
    [earningsChartTrigger.key]: earningsChartTrigger,
    [earningsTransactionsTrigger.key]: earningsTransactionsTrigger,
    [earningsChargebacksTrigger.key]: earningsChargebacksTrigger,
    [analyticsPostsChartTrigger.key]: analyticsPostsChartTrigger,
    [analyticsPostsTopTrigger.key]: analyticsPostsTopTrigger,
    [analyticsStreamsChartTrigger.key]: analyticsStreamsChartTrigger,
    [analyticsStreamsTopTrigger.key]: analyticsStreamsTopTrigger,
    [analyticsStoriesChartTrigger.key]: analyticsStoriesChartTrigger,
    [analyticsStoriesTopTrigger.key]: analyticsStoriesTopTrigger,
    [analyticsMassMessagesChartTrigger.key]: analyticsMassMessagesChartTrigger,
    [analyticsMassMessagesPurchasedTrigger.key]: analyticsMassMessagesPurchasedTrigger,
    [analyticsPromotionsChartTrigger.key]: analyticsPromotionsChartTrigger,
    [analyticsPromotionsTopTrigger.key]: analyticsPromotionsTopTrigger,
  },
  
  creates: {
    [connectionsInvalidatePostCreate.key]: connectionsInvalidatePostCreate,
    [connectionsImportCreate.key]: connectionsImportCreate,
    [postsCreate.key]: postsCreate,
    [chatsMessagesPostCreate.key]: chatsMessagesPostCreate,
    [massMessagesCreate.key]: massMessagesCreate,
    [promotionsTrackingLinksCreate.key]: promotionsTrackingLinksCreate,
    [promotionsTrackingLinksShareAccessCreate.key]: promotionsTrackingLinksShareAccessCreate,
    [promotionsTrialLinksCreate.key]: promotionsTrialLinksCreate,
    [promotionsTrialLinksShareAccessCreate.key]: promotionsTrialLinksShareAccessCreate,
    [promotionsBundlesCreate.key]: promotionsBundlesCreate,
    [promotionsCreate.key]: promotionsCreate,
    [promotionsFinishPostCreate.key]: promotionsFinishPostCreate,
    [usersListsCreate.key]: usersListsCreate,
    [usersListsUsersPostCreate.key]: usersListsUsersPostCreate,
    [usersListsPostCreate.key]: usersListsPostCreate,
    [usersRestrictPostCreate.key]: usersRestrictPostCreate,
    [vaultListsCreate.key]: vaultListsCreate,
    [vaultListsMediaPostCreate.key]: vaultListsMediaPostCreate,
    [v2LinkInitCreate.key]: v2LinkInitCreate,
    [v2DynamicRulesSignCreate.key]: v2DynamicRulesSignCreate,
  },
  
  searches: {
    [connectionsSettingsSearch.key]: connectionsSettingsSearch,
    [analyticsPostsSearch.key]: analyticsPostsSearch,
    [analyticsMassMessagesBuyersSearch.key]: analyticsMassMessagesBuyersSearch,
    [posts2Search.key]: posts2Search,
    [usersPostsSearch.key]: usersPostsSearch,
    [chatsMessagesSearch.key]: chatsMessagesSearch,
    [massMessages2Search.key]: massMessages2Search,
    [chatsMediaSearch.key]: chatsMediaSearch,
    [subscriptionsSearch.key]: subscriptionsSearch,
    [subscriptionsHistorySearch.key]: subscriptionsHistorySearch,
  },
};
