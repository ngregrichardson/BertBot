var config = $.getJSON('/config')
var botName = $("input[name='botName']");
var teamNumber = $("input[name='teamNumber']");
var discordServerId = $("input[name='discordServerId']");
var trelloNotificationsOn = $("input[name='trelloNotificationsOn']");
var trelloNotifications = $("#trelloNotifications");
var trelloNotificationChannelId = $("input[name='trelloNotificationChannelId']");
var trelloPollInterval = $("input[name='trelloPollInterval']");
var watchedTrelloBoardIds = $("input[name='watchedTrelloBoardIds']");
var cardCreated = $("input[name='cardCreated']");
var cardDescriptionChanged = $("input[name='cardDescriptionChanged']");
var cardDueDateChanged = $("input[name='cardDueDateChanged']");
var cardPositionChanged = $("input[name='cardPositionChanged']");
var cardListChanged = $("input[name='cardListChanged']");
var cardNameChanged = $("input[name='cardNameChanged']");
var memberAddedToCard = $("input[name='memberAddedToCard']");
var memberRemovedFromCard = $("input[name='memberRemovedFromCard']");
var checklistAddedToCard = $("input[name='checklistAddedToCard']");
var checklistRemovedFromCard = $("input[name='checklistRemovedFromCard']");
var cardDeleted = $("input[name='cardDeleted']");
var cardUnarchived = $("input[name='cardUnarchived']");
var cardArchived = $("input[name='cardArchived']");
var attachmentAddedToCard = $("input[name='attachmentAddedToCard']");
var attachmentRemovedFromCard = $("input[name='attachmentRemovedFromCard']");
var commentAdded = $("input[name='commentAdded']");
var commentEdited = $("input[name='commentEdited']");
var listCreated = $("input[name='listCreated']");
var listNameChanged = $("input[name='listNameChanged']");
var listPositionChanged = $("input[name='listPositionChanged']");
var listUnarchived = $("input[name='listUnarchived']");
var listArchived = $("input[name='listArchived']");
var checklistItemMarkedComplete = $("input[name='checklistItemMarkedComplete']");
var checklistItemMarkedIncomplete = $("input[name='checklistItemMarkedIcomplete']");
var trelloPrefix = $("input[name='trelloPrefix']");
var orderRequestEmailSystemOn = $("input[name='orderRequestEmailSystemOn']");
var orderRequestSystem = $("#orderRequestSystem");
var orderPlacedChecklistItemName = $("input[name='orderPlacedChecklistItemName']");
var orderPlacedListName = $("input[name='orderPlacedListName']");
var orderRequestedListName = $("input[name='orderRequestedListName']");
var swearFilterOn = $("input[name='swearFilterOn']");
var swearFilter = $("#swearFilter");
var swearFilterWhitelistedChannelNames = $("input[name='swearFilterWhitelistedChannelNames']");
var blaiseWhitelistedChannelNames = $("input[name='blaiseWhitelistedChannelNames']");
var restrictedCommandRoles = $("input[name='restrictedCommandRoles']");

$(function() {
  var json = config.responseJSON;
  console.log(json);
  botName.val(json.botName);
  teamNumber.val(json.teamNumber);
  discordServerId.val(json.discordServerId);
  trelloNotificationsOn.val(json.trelloNotificationsOn);
  trelloNotifications = $("#trelloNotifications");
  trelloNotificationChannelId.val(json.trelloNotificationChannelId);
  trelloPollInterval.val(json.trelloPollInterval);
  watchedTrelloBoardIds.val(json.watchedTrelloBoardIds);
  if(json.enabledTrelloNotifications.includes("cardCreated")) createCard.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("cardDescriptionChanged")) createCard.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("cardCreated")) createCard.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("cardCreated")) createCard.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("cardCreated")) createCard.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("cardCreated")) createCard.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("cardCreated")) createCard.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("cardCreated")) createCard.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("cardCreated")) createCard.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("cardCreated")) createCard.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("cardCreated")) createCard.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("cardCreated")) createCard.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("cardCreated")) createCard.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("cardCreated")) createCard.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("cardCreated")) createCard.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("cardCreated")) createCard.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("cardCreated")) createCard.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("cardCreated")) createCard.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("cardCreated")) createCard.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("cardCreated")) createCard.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("cardCreated")) createCard.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("cardCreated")) createCard.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("cardCreated")) createCard.prop('checked', true);

  trelloPrefix.val(json.trelloPrefix);
  orderRequestEmailSystemOn.val(json.orderRequestEmailSystemOn);
  orderRequestSystem = $("#orderRequestSystem");
  orderPlacedChecklistItemName.val(json.orderPlacedChecklistItemName);
  orderPlacedListName.val(json.orderPlacedListName);
  orderRequestedListName.val(json.orderRequestedListName);
  swearFilterOn.val(json.swearFilterOn);
  swearFilter = $("#swearFilter");
  swearFilterWhitelistedChannelNames.val(json.swearFilterWhitelistedChannelNames);
  blaiseWhitelistedChannelNames.val(json.blaiseWhitelistedChannelNames);
  restrictedCommandRoles.val(json.restrictedCommandRoles);
});

function toggleTrelloNotifications() {
  trelloNotifications.toggle();
}

function toggleOrderRequestSystem() {
  orderRequestSystem.toggle();
}

function toggleSwearFilter() {
  swearFilter.toggle();
}

function save() {

}