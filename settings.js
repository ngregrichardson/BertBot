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
var orderRequestBoardId = $("#orderRequestBoardId");
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
  botName.val(json.botName);
  teamNumber.val(json.teamNumber);
  discordServerId.val(json.discordServerId);
  trelloNotificationsOn.val(json.trelloNotificationsOn);
  if(json.trelloNotificationsOn == false) trelloNotifications.hide(); else trelloNotifications.show();
  trelloNotificationChannelId.val(json.trelloNotificationChannelId);
  trelloPollInterval.val(json.trelloPollInterval);
  watchedTrelloBoardIds.val(json.watchedTrelloBoardIds);
  
  if(json.enabledTrelloNotifications.includes("cardCreated")) cardCreated.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("cardDescriptionChanged")) cardDescriptionChanged.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("cardDueDateChanged")) cardDueDateChanged.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("cardPositionChanged")) cardPositionChanged.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("cardListChanged")) cardListChanged.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("cardNameChanged")) cardNameChanged.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("memberAddedToCard") || json.enabledTrelloNotifications.includes("memberAddedToCardBySelf")) memberAddedToCard.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("memberRemovedFromCard") || json.enabledTrelloNotifications.includes("memberRemovedFromCardBySelf")) memberRemovedFromCard.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("checklistAddedToCard")) checklistAddedToCard.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("checklistRemovedFromCard")) checklistRemovedFromCard.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("cardDeleted")) cardDeleted.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("cardUnarchived")) cardUnarchived.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("cardArchived")) cardArchived.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("attachmentAddedToCard")) attachmentAddedToCard.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("attachmentRemovedFromCard")) attachmentRemovedFromCard.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("commentAdded")) commentAdded.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("commentEdited")) commentEdited.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("listCreated")) listCreated.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("listNameChanged")) listNameChanged.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("listPositionChanged")) listPositionChanged.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("listUnarchived")) listUnarchived.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("listArchived")) listArchived.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("checklistItemMarkedComplete")) checklistItemMarkedComplete.prop('checked', true);
  if(json.enabledTrelloNotifications.includes("checklistItemMarkedIncomplete")) checklistItemMarkedIncomplete.prop('checked', true);

  trelloPrefix.val(json.trelloPrefix);
  orderRequestEmailSystemOn.val(json.orderRequestEmailSystemOn);
  if(json.orderRequestEmailSystemOn == false) orderRequestSystem.hide(); else orderRequestSystem.show();
  orderRequestBoardId.val(json.orderRequestBoardId);
  orderPlacedChecklistItemName.val(json.orderPlacedChecklistItemName);
  orderPlacedListName.val(json.orderPlacedListName);
  orderRequestedListName.val(json.orderRequestedListName);
  swearFilterOn.val(json.swearFilterOn);
  if(json.swearFilterOn == false) swearFilter.hide(); else swearFilter.show();
  swearFilterWhitelistedChannelNames.val(json.swearFilterWhitelistedChannelNames);
  blaiseWhitelistedChannelNames.val(json.blaiseWhitelistedChannelNames);
  restrictedCommandRoles.val(json.restrictedCommandRoles);
  
  if(getCheckboxValue(trelloNotificationsOn)) {
    trelloNotifications.find('*').attr('disabled', false);
  }else {
    trelloNotifications.find('*').attr('disabled', true);
  }
  
  if(getCheckboxValue(orderRequestEmailSystemOn)) {
    orderRequestSystem.find('*').attr('disabled', false);
  }else {
    orderRequestSystem.find('*').attr('disabled', true);
  }
  
  if(getCheckboxValue(swearFilterOn)) {
    swearFilter.find('*').attr('disabled', false);
  }else {
    swearFilter.find('*').attr('disabled', true);
  }
});

function toggleTrelloNotifications() {
  trelloNotifications.toggle();
  if(getCheckboxValue(trelloNotificationsOn)) {
    trelloNotifications.find('*').attr('disabled', false);
  }else {
    trelloNotifications.find('*').attr('disabled', true);
  }
}

function toggleOrderRequestSystem() {
  orderRequestSystem.toggle();
  if(getCheckboxValue(orderRequestEmailSystemOn)) {
    orderRequestSystem.find('*').attr('disabled', false);
  }else {
    orderRequestSystem.find('*').attr('disabled', true);
  }
}

function toggleSwearFilter() {
  swearFilter.toggle();
  if(getCheckboxValue(swearFilterOn)) {
    swearFilter.find('*').attr('disabled', false);
  }else {
    swearFilter.find('*').attr('disabled', true);
  }
}

function save() {
  $.post("/save", format, function(data, status) {
    console.log(status);
  });
}

function format() {
  var data = {
  "botName": botName.val(),
  "teamNumber": teamNumber.val(),
  "discordServerId": discordServerId.val(),
  "trelloNotificationsOn": getCheckboxValue(trelloNotificationsOn),
    "trelloNotificationChannelId": isEnabled(trelloNotificationsOn, trelloNotificationChannelId.val()),
    "trelloPollInterval": isEnabled(trelloNotificationsOn, trelloPollInterval.val()),
    "watchedTrelloBoardIds": isEnabled(trelloNotificationsOn, formatArray(watchedTrelloBoardIds)),
    "enabledTrelloNotifications": "",
    "trelloPrefix": isEnabled(trelloNotificationsOn, trelloPrefix.val()),
  "orderRequestEmailSystemOn": getCheckboxValue(orderRequestEmailSystemOn),
    "orderRequestBoardId": isEnabled(orderRequestEmailSystemOn, orderRequestBoardId.val()),
    "orderPlacedChecklistItemName": isEnabled(orderRequestEmailSystemOn, orderPlacedChecklistItemName.val()),
    "orderPlacedListName": isEnabled(orderRequestEmailSystemOn, orderPlacedListName.val()),
    "orderRequestedListName": isEnabled(orderRequestEmailSystemOn, orderRequestedListName.val()),
  "swearFilterOn": getCheckboxValue(swearFilterOn),
    "swearFilterWhitelistedChannelNames": isEnabled(swearFilterOn, formatArray(swearFilterWhitelistedChannelNames)),
  "blaiseWhitelistedChannelNames": formatArray(blaiseWhitelistedChannelNames),
  "restrictedCommandRoles": formatArray(restrictedCommandRoles),
  "userIDs": {
  },
  "contentString": ""
  };
}

function getCheckboxValue(checkbox) {
  if(checkbox.prop('checked')) {
    return true;   
  }else {
     return false;
  }
}

function isEnabled(parent, value) {
  if(getCheckboxValue(parent)) {
    return value;
  }else {
   return null; 
  }
}

function formatArray(value) {
  var array = value.split(',');
  for(var val in array) {
    val.trim();
  }
  return array;
}

function enabledTrelloNotifications() {
  var array = new Array();
  if(getCheckboxValue(trelloNotificationsOn)) {
    if(cardCreated.prop('checked')) array.push(cardCreated.attr('name'));
    if(cardDescriptionChanged.prop('checked')) array.push(cardDescriptionChanged.attr('name'));
    if(cardDueDateChanged.prop('checked')) array.push(cardDueDateChanged.attr('name'));
    if(cardPositionChanged.prop('checked')) array.push(cardPositionChanged.attr('name'));
    if(cardListChanged.prop('checked')) array.push(cardListChanged.attr('name'));
    if(cardNameChanged.prop('checked')) array.push(cardNameChanged.attr('name'));
    if(memberAddedToCard.prop('checked')) array.push(memberAddedToCard.attr('name'));
    if(memberRemovedFromCard.prop('checked')) array.push(memberRemovedFromCard.attr('name'));
    if(checklistAddedToCard.prop('checked')) array.push(checklistAddedToCard.attr('name'));
    if(checklistRemovedFromCard.prop('checked')) array.push(checklistRemovedFromCard.attr('name'));
    if(cardDeleted.prop('checked')) array.push(cardDeleted.attr('name'));
    if(cardUnarchived.prop('checked')) array.push(cardUnarchived.attr('name'));
    if(cardArchived.prop('checked')) array.push(cardArchived.attr('name'));
    if(attachmentAddedToCard.prop('checked')) array.push(attachmentAddedToCard.attr('name'));
    if(attachmentRemovedFromCard.prop('checked')) array.push(attachmentRemovedFromCard.attr('name'));
    if(commentAdded.prop('checked')) array.push(commentAdded.attr('name'));
    if(commentEdited.prop('checked')) array.push(commentEdited.attr('name'));
    if(listCreated.prop('checked'))
    if(listNameChanged.prop('checked'))
    if(listPositionChanged.prop('checked'))
    if(listUnarchived.prop('checked'))
    if(listArchived.prop('checked'))
    if(checklistItemMarkedComplete.prop('checked'))
    if(checklistItemMarkedIncomplete.prop('checked'))
  }
}