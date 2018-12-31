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
var deleteAttachmentFromCard =$("input[name='deleteAttachmentFromCard']");
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
  botName = $("input[name='botName']");
  teamNumber = $("input[name='teamNumber']");
  discordServerId = $("input[name='discordServerId']");
  trelloNotificationsOn = $("input[name='trelloNotificationsOn']");
  trelloNotifications = $("#trelloNotifications");
  trelloNotificationChannelId = $("input[name='trelloNotificationChannelId']");
  trelloPollInterval = $("input[name='trelloPollInterval']");
  watchedTrelloBoardIds = $("input[name='watchedTrelloBoardIds']");
  createCard = $("input[name='createCard']");
  updateCard = $("input[name='updateCard']");
  deleteCard = $("input[name='deleteCard']");
  commentCard = $("input[name='commentCard']");
  addMemberToCard = $("input[name='addMemberToCard']");
  removeMemberFromCard = $("input[name='removeMemberFromCard']");
  createList = $("input[name='createList']");
  updateList = $("input[name='updateList']");
  addAttachmentToCard = $("input[name='addAttachmentToCard']");
  deleteAttachmentFromCard =$("input[name='deleteAttachmentFromCard']");
  addChecklistToCard = $("input[name='addChecklistToCard']");
  removeChecklistFromCard = $("input[name='removeChecklistFromCard']");
  updateCheckItemStateOnCard = $("input[name='updateCheckItemStateOnCard']");
  trelloPrefix = $("input[name='trelloPrefix']");
  orderRequestEmailSystemOn = $("input[name='orderRequestEmailSystemOn']");
  orderRequestSystem = $("#orderRequestSystem");
  orderPlacedChecklistItemName = $("input[name='orderPlacedChecklistItemName']");
  orderPlacedListName = $("input[name='orderPlacedListName']");
  orderRequestedListName = $("input[name='orderRequestedListName']");
  swearFilterOn = $("input[name='swearFilterOn']");
  swearFilter = $("#swearFilter");
  swearFilterWhitelistedChannelNames = $("input[name='swearFilterWhitelistedChannelNames']");
  blaiseWhitelistedChannelNames = $("input[name='blaiseWhitelistedChannelNames']");
  restrictedCommandRoles = $("input[name='restrictedCommandRoles']");
});

function toggleTrelloNotifications() {
  trelloNotifications.toggle();
  console.log("ran");
}

function toggleOrderRequestSystem() {
  orderRequestSystem.toggle();
}

function toggleSwearFilter() {
  swearFilter.toggle();
}

function save() {

}