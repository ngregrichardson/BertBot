var config;
$.get('/config', function (sentConfig) {
  config = sentConfig;
  if (config != undefined) {
    setup();
  } else {
    error('Sorry, the configuration could not be loaded. Please reload the page and try again.');
  }
});
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
var modOn = $("input[name='modOn']");
var mod = $("#mod");
var modCommandRoles = $("input[name='modCommandRoles']");
var meetingNotificationsOn = $("input[name='meetingNotificationsOn']");
var meetingNotifications = $("#meetingNotifications");
var meetingNotificationChannelId = $("input[name='meetingNotificationChannelId']");
var likeCounterOn = $("input[name='likeCounterOn']");
var blaiseWhitelistedChannelNames = $("input[name='blaiseWhitelistedChannelNames']");
var restrictedCommandRoles = $("input[name='restrictedCommandRoles']");
var saveButton = $("input[value='Save']");
var errorSpace = $("#error");

function setup() {
  botName.val(config.botName);
  teamNumber.val(config.teamNumber);
  discordServerId.val(config.discordServerId);
  if (config.trelloNotificationsOn == false) {
    trelloNotifications.hide();
    trelloNotificationsOn.prop('checked', false);
    trelloNotifications.find('*').attr('disabled', true);
  } else {
    trelloNotifications.show();
    trelloNotificationsOn.prop('checked', true);
    trelloNotifications.find('*').attr('disabled', false);
  }
  trelloNotificationChannelId.val(config.trelloNotificationChannelId);
  trelloPollInterval.val(config.trelloPollInterval);
  watchedTrelloBoardIds.val(config.watchedTrelloBoardIds);

  if (config.enabledTrelloNotifications.includes("cardCreated")) cardCreated.prop('checked', true);
  if (config.enabledTrelloNotifications.includes("cardDescriptionChanged")) cardDescriptionChanged.prop('checked', true);
  if (config.enabledTrelloNotifications.includes("cardDueDateChanged")) cardDueDateChanged.prop('checked', true);
  if (config.enabledTrelloNotifications.includes("cardPositionChanged")) cardPositionChanged.prop('checked', true);
  if (config.enabledTrelloNotifications.includes("cardListChanged")) cardListChanged.prop('checked', true);
  if (config.enabledTrelloNotifications.includes("cardNameChanged")) cardNameChanged.prop('checked', true);
  if (config.enabledTrelloNotifications.includes("memberAddedToCard") || config.enabledTrelloNotifications.includes("memberAddedToCardBySelf")) memberAddedToCard.prop('checked', true);
  if (config.enabledTrelloNotifications.includes("memberRemovedFromCard") || config.enabledTrelloNotifications.includes("memberRemovedFromCardBySelf")) memberRemovedFromCard.prop('checked', true);
  if (config.enabledTrelloNotifications.includes("checklistAddedToCard")) checklistAddedToCard.prop('checked', true);
  if (config.enabledTrelloNotifications.includes("checklistRemovedFromCard")) checklistRemovedFromCard.prop('checked', true);
  if (config.enabledTrelloNotifications.includes("cardDeleted")) cardDeleted.prop('checked', true);
  if (config.enabledTrelloNotifications.includes("cardUnarchived")) cardUnarchived.prop('checked', true);
  if (config.enabledTrelloNotifications.includes("cardArchived")) cardArchived.prop('checked', true);
  if (config.enabledTrelloNotifications.includes("attachmentAddedToCard")) attachmentAddedToCard.prop('checked', true);
  if (config.enabledTrelloNotifications.includes("attachmentRemovedFromCard")) attachmentRemovedFromCard.prop('checked', true);
  if (config.enabledTrelloNotifications.includes("commentAdded")) commentAdded.prop('checked', true);
  if (config.enabledTrelloNotifications.includes("commentEdited")) commentEdited.prop('checked', true);
  if (config.enabledTrelloNotifications.includes("listCreated")) listCreated.prop('checked', true);
  if (config.enabledTrelloNotifications.includes("listNameChanged")) listNameChanged.prop('checked', true);
  if (config.enabledTrelloNotifications.includes("listPositionChanged")) listPositionChanged.prop('checked', true);
  if (config.enabledTrelloNotifications.includes("listUnarchived")) listUnarchived.prop('checked', true);
  if (config.enabledTrelloNotifications.includes("listArchived")) listArchived.prop('checked', true);
  if (config.enabledTrelloNotifications.includes("checklistItemMarkedComplete")) checklistItemMarkedComplete.prop('checked', true);
  if (config.enabledTrelloNotifications.includes("checklistItemMarkedIncomplete")) checklistItemMarkedIncomplete.prop('checked', true);

  trelloPrefix.val(config.trelloPrefix);
  if (config.orderRequestEmailSystemOn == false) {
    orderRequestSystem.hide();
    orderRequestEmailSystemOn.prop('checked', false);
    orderRequestSystem.find('*').attr('disabled', true);
  } else {
    orderRequestSystem.show();
    orderRequestEmailSystemOn.prop('checked', true);
    orderRequestSystem.find('*').attr('disabled', false);
  }
  orderRequestBoardId.val(config.orderRequestBoardId);
  orderPlacedChecklistItemName.val(config.orderPlacedChecklistItemName);
  orderPlacedListName.val(config.orderPlacedListName);
  orderRequestedListName.val(config.orderRequestedListName);
  if (config.swearFilterOn == false) {
    swearFilter.hide();
    swearFilterOn.prop('checked', false);
    swearFilter.find('*').attr('disabled', true);
  } else {
    swearFilter.show();
    swearFilterOn.prop('checked', true);
    swearFilter.find('*').attr('disabled', false);
  }
  swearFilterWhitelistedChannelNames.val(config.swearFilterWhitelistedChannelNames);
  if (config.modOn == false) {
    mod.hide();
    modOn.prop('checked', false);
    mod.find('*').attr('disabled', true);
  } else {
    mod.show();
    modOn.prop('checked', true);
    mod.find('*').attr('disabled', false);
  }
  modCommandRoles.val(config.modCommandRoles);
  if (config.meetingNotificationsOn == false) {
    meetingNotifications.hide();
    meetingNotificationsOn.prop('checked', false);
    meetingNotifications.find('*').attr('disabled', true);
  } else {
    meetingNotifications.show();
    meetingNotificationsOn.prop('checked', true);
    meetingNotifications.find('*').attr('disabled', false);
  }
  likeCounterOn.prop('checked', config.likeCounterOn);
  meetingNotificationChannelId.val(config.meetingNotificationChannelId);
  blaiseWhitelistedChannelNames.val(config.blaiseWhitelistedChannelNames);
  restrictedCommandRoles.val(config.restrictedCommandRoles);
}

function toggleTrelloNotifications() {
  trelloNotifications.toggle();
  if (getCheckboxValue(trelloNotificationsOn)) {
    trelloNotifications.find('*').attr('disabled', false);
  } else {
    trelloNotifications.find('*').attr('disabled', true);
  }
  changed();
}

function toggleOrderRequestSystem() {
  orderRequestSystem.toggle();
  if (getCheckboxValue(orderRequestEmailSystemOn)) {
    orderRequestSystem.find('*').attr('disabled', false);
  } else {
    orderRequestSystem.find('*').attr('disabled', true);
  }
  changed();
}

function toggleSwearFilter() {
  swearFilter.toggle();
  if (getCheckboxValue(swearFilterOn)) {
    swearFilter.find('*').attr('disabled', false);
  } else {
    swearFilter.find('*').attr('disabled', true);
  }
  changed();
}

function toggleMod() {
  mod.toggle();
  if (getCheckboxValue(modOn)) {
    mod.find('*').attr('disabled', false);
  } else {
    mod.find('*').attr('disabled', true);
  }
  changed();
}

function toggleMeetingNotifications() {
  meetingNotifications.toggle();
  if (getCheckboxValue(meetingNotificationsOn)) {
    meetingNotifications.find('*').attr('disabled', false);
  } else {
    meetingNotifications.find('*').attr('disabled', true);
  }
  changed();
}

function changed() {
  saveButton.css('color', 'red');
  saveButton.css('border-color', 'red');
}

function save() {
  $.post("/config", format(), function (data, status) {
    if (status == "200") {
      error('The configuration was saved. Restarting the bot.');
    }
  });
}

function format() {
  var data = {
    "botName": botName.val(),
    "teamNumber": teamNumber.val(),
    "discordServerId": discordServerId.val(),
    "trelloNotificationsOn": getCheckboxValue(trelloNotificationsOn),
    "trelloNotificationChannelId": isEnabled(trelloNotificationsOn, trelloNotificationChannelId.val()),
    "trelloPollInterval": isEnabled(trelloNotificationsOn, Number(trelloPollInterval.val())),
    "watchedTrelloBoardIds": isEnabled(trelloNotificationsOn, formatArray(watchedTrelloBoardIds)),
    "enabledTrelloNotifications": enabledTrelloNotifications(),
    "trelloPrefix": isEnabled(trelloNotificationsOn, trelloPrefix.val()),
    "orderRequestEmailSystemOn": getCheckboxValue(orderRequestEmailSystemOn),
    "orderRequestBoardId": isEnabled(orderRequestEmailSystemOn, orderRequestBoardId.val()),
    "orderPlacedChecklistItemName": isEnabled(orderRequestEmailSystemOn, orderPlacedChecklistItemName.val()),
    "orderPlacedListName": isEnabled(orderRequestEmailSystemOn, orderPlacedListName.val()),
    "orderRequestedListName": isEnabled(orderRequestEmailSystemOn, orderRequestedListName.val()),
    "swearFilterOn": getCheckboxValue(swearFilterOn),
    "swearFilterWhitelistedChannelNames": isEnabled(swearFilterOn, formatArray(swearFilterWhitelistedChannelNames)),
    "modOn": getCheckboxValue(modOn),
    "modCommandRoles": formatArray(modCommandRoles),
    "meetingNotificationsOn": getCheckboxValue(meetingNotificationsOn),
    "meetingNotificationChannelId": isEnabled(meetingNotificationsOn, meetingNotificationChannelId.val()),
    "likeCounterOn": getCheckboxValue(likeCounterOn),
    "blaiseWhitelistedChannelNames": formatArray(blaiseWhitelistedChannelNames),
    "restrictedCommandRoles": formatArray(restrictedCommandRoles),
    "userIDs": {},
    "contentString": ""
  };
  return JSON.stringify(data);
}

function getCheckboxValue(checkbox) {
  if (checkbox.prop('checked')) {
    return true;
  } else {
    return false;
  }
}

function isEnabled(parent, value) {
  if (getCheckboxValue(parent)) {
    return value;
  } else {
    return "";
  }
}

function formatArray(value) {
  var array = value.val().split(',');
  for (var val in array) {
    val.trim();
  }
  return array;
}

function enabledTrelloNotifications() {
  var array = new Array();
  if (getCheckboxValue(trelloNotificationsOn)) {
    if (cardCreated.prop('checked')) array.push(cardCreated.attr('name').toString());
    if (cardDescriptionChanged.prop('checked')) array.push(cardDescriptionChanged.attr('name').toString());
    if (cardDueDateChanged.prop('checked')) array.push(cardDueDateChanged.attr('name').toString());
    if (cardPositionChanged.prop('checked')) array.push(cardPositionChanged.attr('name').toString());
    if (cardListChanged.prop('checked')) array.push(cardListChanged.attr('name').toString());
    if (cardNameChanged.prop('checked')) array.push(cardNameChanged.attr('name').toString());
    if (memberAddedToCard.prop('checked')) array.push(memberAddedToCard.attr('name').toString());
    if (memberRemovedFromCard.prop('checked')) array.push(memberRemovedFromCard.attr('name').toString());
    if (checklistAddedToCard.prop('checked')) array.push(checklistAddedToCard.attr('name').toString());
    if (checklistRemovedFromCard.prop('checked')) array.push(checklistRemovedFromCard.attr('name').toString());
    if (cardDeleted.prop('checked')) array.push(cardDeleted.attr('name').toString());
    if (cardUnarchived.prop('checked')) array.push(cardUnarchived.attr('name')).toString();
    if (cardArchived.prop('checked')) array.push(cardArchived.attr('name').toString());
    if (attachmentAddedToCard.prop('checked')) array.push(attachmentAddedToCard.attr('name').toString());
    if (attachmentRemovedFromCard.prop('checked')) array.push(attachmentRemovedFromCard.attr('name').toString());
    if (commentAdded.prop('checked')) array.push(commentAdded.attr('name').toString());
    if (commentEdited.prop('checked')) array.push(commentEdited.attr('name').toString());
    if (listCreated.prop('checked')) array.push(listCreated.attr('name').toString());
    if (listNameChanged.prop('checked')) array.push(listNameChanged.attr('name').toString());
    if (listPositionChanged.prop('checked')) array.push(listPositionChanged.attr('name').toString());
    if (listUnarchived.prop('checked')) array.push(listUnarchived.attr('name').toString());
    if (listArchived.prop('checked')) array.push(listArchived.attr('name').toString());
    if (checklistItemMarkedComplete.prop('checked')) array.push(checklistItemMarkedComplete.attr('name').toString());
    if (checklistItemMarkedIncomplete.prop('checked')) array.push(checklistItemMarkedIncomplete.attr('name').toString());
    return array;
  } else {
    return "";
  }
}

function restart() {
  $.post("/restart", "restart", function (data, status) {});
}

function meetings() {
  window.location.replace('/meetings');
}

function error(error) {
  errorSpace.text(error);
}