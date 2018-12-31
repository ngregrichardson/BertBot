var config = $.getJSON('/config')
var botName = $("input[name='botName']");
var teamNumber = $("input[name='teamNumber']");
var discordServerId = $("input[name='discordServerId']");
var trelloNotificationsOn = $("input[name='trelloNotificationsOn']");
var trelloNotifications = $("#trelloNotifications");
var trelloNotificationChannelId = $("input[name='trelloNotificationChannelId']");
var trelloPollInterval = $("input[name='trelloPollInterval']");
var watchedTrelloBoardIds = $("input[name='watchedTrelloBoardIds']");
var createCard = $("input[name='createCard']");
var updateCard = $("input[name='updateCard']");
var deleteCard = $("input[name='deleteCard']");
var commentCard = $("input[name='commentCard']");
var addMemberToCard = $("input[name='addMemberToCard']");
var removeMemberFromCard = $("input[name='removeMemberFromCard']");
var createList = $("input[name='createList']");
var updateList = $("input[name='updateList']");
var addAttachmentToCard = $("input[name='addAttachmentToCard']");
var deleteAttachmentFromCard = $("input[name='deleteAttachmentFromCard']");
var addChecklistToCard = $("input[name='addChecklistToCard']");
var removeChecklistFromCard = $("input[name='removeChecklistFromCard']");
var updateCheckItemStateOnCard = $("input[name='updateCheckItemStateOnCard']");
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
  updateCard.val(json.updateCard);
  deleteCard.val(json.deleteCard);
  commentCard.val(json.commentCard);
  addMemberToCard.val(json.addMemberToCard);
  removeMemberFromCard.val(json.removeMemberFromCard);
  createList.val(json.createList);
  updateList.val(json.updateList);
  addAttachmentToCard.val(json.addAttachmentToCard);
  deleteAttachmentFromCard.val(json.deleteAttachmentFromCard);
  addChecklistToCard.val(json.addChecklistToCard);
  removeChecklistFromCard.val(json.removeChecklistFromCard);
  updateCheckItemStateOnCard.val(json.updateCheckItemStateOnCard);
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