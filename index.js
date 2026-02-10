const authentication = require('./authentication');

// Triggers
const connectionListTrigger = require('./triggers/connectionList');
const analyticsCampaignsChartTrigger = require('./triggers/analytics_campaigns_chart');
const analyticsCampaignsTopTrigger = require('./triggers/analytics_campaigns_top');
const analyticsEarningsChargebacksTrigger = require('./triggers/analytics_earnings_chargebacks');
const analyticsEarningsChartTrigger = require('./triggers/analytics_earnings_chart');
const analyticsEarningsTransactionsTrigger = require('./triggers/analytics_earnings_transactions');
const analyticsMassMessagesChartTrigger = require('./triggers/analytics_mass_messages_chart');
const analyticsMassMessagesPurchasedTrigger = require('./triggers/analytics_mass_messages_purchased');
const analyticsPostsChartTrigger = require('./triggers/analytics_posts_chart');
const analyticsPostsTopTrigger = require('./triggers/analytics_posts_top');
const analyticsPromotionsChartTrigger = require('./triggers/analytics_promotions_chart');
const analyticsPromotionsTopTrigger = require('./triggers/analytics_promotions_top');
const analyticsStoriesChartTrigger = require('./triggers/analytics_stories_chart');
const analyticsStoriesTopTrigger = require('./triggers/analytics_stories_top');
const analyticsStreamsChartTrigger = require('./triggers/analytics_streams_chart');
const analyticsStreamsTopTrigger = require('./triggers/analytics_streams_top');
const analyticsTrialsChartTrigger = require('./triggers/analytics_trials_chart');
const analyticsTrialsTopTrigger = require('./triggers/analytics_trials_top');
const analyticsVisitorCountriesChartTrigger = require('./triggers/analytics_visitor_countries_chart');
const analyticsVisitorCountriesTopTrigger = require('./triggers/analytics_visitor_countries_top');
const chatsTrigger = require('./triggers/chats');

// Creates
const chatsMessagesPostCreate = require('./creates/chats_messages_post');
const massMessagesCreate = require('./creates/mass_messages');
const postsCreate = require('./creates/posts');
const promotionsCreate = require('./creates/promotions');
const promotionsStopPostCreate = require('./creates/promotions_stop_post');
const promotionsBundlesCreate = require('./creates/promotions_bundles');
const promotionsTrackingLinksCreate = require('./creates/promotions_tracking_links');
const promotionsTrackingLinksShareAccessCreate = require('./creates/promotions_tracking_links_share_access');
const promotionsTrialLinksCreate = require('./creates/promotions_trial_links');
const promotionsTrialLinksShareAccessCreate = require('./creates/promotions_trial_links_share_access');
const usersListsPostCreate = require('./creates/users_lists_post');
const usersRestrictPostCreate = require('./creates/users_restrict_post');
const usersListsCreate = require('./creates/users_lists');
const usersListsUsersPostCreate = require('./creates/users_lists_users_post');
const vaultListsCreate = require('./creates/vault_lists');
const vaultListsMediaPostCreate = require('./creates/vault_lists_media_post');
const connectionsImportCreate = require('./creates/connections_import');
const connectionsInvalidatePostCreate = require('./creates/connections_invalidate_post');
const v2DynamicRulesSignCreate = require('./creates/v2_dynamic_rules_sign');
const v2LinkInitCreate = require('./creates/v2_link_init');

// Searches
const analyticsMassMessagesBuyersSearch = require('./searches/analytics_mass_messages_buyers');
const analyticsPostsSearch = require('./searches/analytics_posts');
const chatsMediaSearch = require('./searches/chats_media');
const chatsMessagesSearch = require('./searches/chats_messages');
const massMessages2Search = require('./searches/mass_messages_2');
const posts2Search = require('./searches/posts_2');
const promotionsBundles2Search = require('./searches/promotions_bundles_2');
const promotionsTrackingLinks2Search = require('./searches/promotions_tracking_links_2');
const promotionsTrackingLinksClaimersSearch = require('./searches/promotions_tracking_links_claimers');
const promotionsTrialLinks2Search = require('./searches/promotions_trial_links_2');

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
    [analyticsCampaignsChartTrigger.key]: analyticsCampaignsChartTrigger,
    [analyticsCampaignsTopTrigger.key]: analyticsCampaignsTopTrigger,
    [analyticsEarningsChargebacksTrigger.key]: analyticsEarningsChargebacksTrigger,
    [analyticsEarningsChartTrigger.key]: analyticsEarningsChartTrigger,
    [analyticsEarningsTransactionsTrigger.key]: analyticsEarningsTransactionsTrigger,
    [analyticsMassMessagesChartTrigger.key]: analyticsMassMessagesChartTrigger,
    [analyticsMassMessagesPurchasedTrigger.key]: analyticsMassMessagesPurchasedTrigger,
    [analyticsPostsChartTrigger.key]: analyticsPostsChartTrigger,
    [analyticsPostsTopTrigger.key]: analyticsPostsTopTrigger,
    [analyticsPromotionsChartTrigger.key]: analyticsPromotionsChartTrigger,
    [analyticsPromotionsTopTrigger.key]: analyticsPromotionsTopTrigger,
    [analyticsStoriesChartTrigger.key]: analyticsStoriesChartTrigger,
    [analyticsStoriesTopTrigger.key]: analyticsStoriesTopTrigger,
    [analyticsStreamsChartTrigger.key]: analyticsStreamsChartTrigger,
    [analyticsStreamsTopTrigger.key]: analyticsStreamsTopTrigger,
    [analyticsTrialsChartTrigger.key]: analyticsTrialsChartTrigger,
    [analyticsTrialsTopTrigger.key]: analyticsTrialsTopTrigger,
    [analyticsVisitorCountriesChartTrigger.key]: analyticsVisitorCountriesChartTrigger,
    [analyticsVisitorCountriesTopTrigger.key]: analyticsVisitorCountriesTopTrigger,
    [chatsTrigger.key]: chatsTrigger,
  },
  
  creates: {
    [chatsMessagesPostCreate.key]: chatsMessagesPostCreate,
    [massMessagesCreate.key]: massMessagesCreate,
    [postsCreate.key]: postsCreate,
    [promotionsCreate.key]: promotionsCreate,
    [promotionsStopPostCreate.key]: promotionsStopPostCreate,
    [promotionsBundlesCreate.key]: promotionsBundlesCreate,
    [promotionsTrackingLinksCreate.key]: promotionsTrackingLinksCreate,
    [promotionsTrackingLinksShareAccessCreate.key]: promotionsTrackingLinksShareAccessCreate,
    [promotionsTrialLinksCreate.key]: promotionsTrialLinksCreate,
    [promotionsTrialLinksShareAccessCreate.key]: promotionsTrialLinksShareAccessCreate,
    [usersListsPostCreate.key]: usersListsPostCreate,
    [usersRestrictPostCreate.key]: usersRestrictPostCreate,
    [usersListsCreate.key]: usersListsCreate,
    [usersListsUsersPostCreate.key]: usersListsUsersPostCreate,
    [vaultListsCreate.key]: vaultListsCreate,
    [vaultListsMediaPostCreate.key]: vaultListsMediaPostCreate,
    [connectionsImportCreate.key]: connectionsImportCreate,
    [connectionsInvalidatePostCreate.key]: connectionsInvalidatePostCreate,
    [v2DynamicRulesSignCreate.key]: v2DynamicRulesSignCreate,
    [v2LinkInitCreate.key]: v2LinkInitCreate,
  },
  
  searches: {
    [analyticsMassMessagesBuyersSearch.key]: analyticsMassMessagesBuyersSearch,
    [analyticsPostsSearch.key]: analyticsPostsSearch,
    [chatsMediaSearch.key]: chatsMediaSearch,
    [chatsMessagesSearch.key]: chatsMessagesSearch,
    [massMessages2Search.key]: massMessages2Search,
    [posts2Search.key]: posts2Search,
    [promotionsBundles2Search.key]: promotionsBundles2Search,
    [promotionsTrackingLinks2Search.key]: promotionsTrackingLinks2Search,
    [promotionsTrackingLinksClaimersSearch.key]: promotionsTrackingLinksClaimersSearch,
    [promotionsTrialLinks2Search.key]: promotionsTrialLinks2Search,
  },
};
