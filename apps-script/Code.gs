const SHEET_NAME = 'Responses';
const HEADERS = [
  'Timestamp', 'Registration ID', 'Registration Type', 'Number of Participants', 'Total Amount',
  'Member 1 Name', 'Member 1 College', 'Member 1 Department', 'Member 1 Year', 'Member 1 Phone', 'Member 1 Email',
  'Member 2 Name', 'Member 2 College', 'Member 2 Department', 'Member 2 Year', 'Member 2 Phone', 'Member 2 Email',
  'Member 3 Name', 'Member 3 College', 'Member 3 Department', 'Member 3 Year', 'Member 3 Phone', 'Member 3 Email',
  'Event 1', 'Event 2', 'Event 3', 'Transaction ID', 'Payment Status', 'Payment Screenshot'
];

function doGet() {
  return HtmlService.createHtmlOutput('IMPERIOR registration endpoint is active.');
}

function doPost(request) {
  try {
    const data = JSON.parse(request.parameter.payload || request.postData.contents);
    validate_(data);
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const sheet = getSheet_();
      if (transactionExists_(sheet, data.transactionId)) throw new Error('This Transaction ID / UTR has already been submitted');
      const screenshotFile = saveScreenshot_(data.paymentScreenshot, data.transactionId);
      const registrationId = nextRegistrationId_(sheet);
      const row = [
        new Date(), registrationId, data.registrationType, data.numberOfParticipants, data.totalAmount,
        data.member1Name, data.member1College, data.member1Department, data.member1Year, data.member1Phone, data.member1Email,
        data.member2Name, data.member2College, data.member2Department, data.member2Year, data.member2Phone, data.member2Email,
        data.member3Name, data.member3College, data.member3Department, data.member3Year, data.member3Phone, data.member3Email,
        data.event1, data.event2, data.event3, data.transactionId, 'PENDING VERIFICATION', screenshotFile.getUrl()
      ];
      sheet.appendRow(row);
      return resultPage_({ ok: true, registrationId, paymentVerificationStatus: 'PENDING VERIFICATION' });
    } finally {
      lock.releaseLock();
    }
  } catch (error) {
    return resultPage_({ ok: false, error: error.message });
  }
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
  else sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  return sheet;
}

function nextRegistrationId_(sheet) {
  const existingIds = sheet.getLastRow() < 2 ? [] : sheet.getRange(2, 2, sheet.getLastRow() - 1, 1).getValues().flat();
  let registrationId;
  do {
    const timestampPart = String(Date.now()).slice(-6);
    const randomPart = String(Math.floor(Math.random() * 100)).padStart(2, '0');
    registrationId = 'IMP-2026-' + timestampPart + randomPart;
  } while (existingIds.includes(registrationId));
  return registrationId;
}

function validate_(data) {
  if (!['individual', 'team'].includes(data.registrationType)) throw new Error('Invalid registration type');
  if (![1, 2, 3].includes(Number(data.numberOfParticipants))) throw new Error('Invalid participant count');
  if (data.registrationType === 'individual' && Number(data.numberOfParticipants) !== 1) throw new Error('Individual registrations must have one participant');
  if ([1, 2, 3].some(index => !data['member' + index + 'Name'] && index <= Number(data.numberOfParticipants))) throw new Error('Member data is incomplete');
  if (!data.event1 || !data.event2 || !data.event3 || new Set([data.event1, data.event2, data.event3]).size !== 3) throw new Error('Exactly three different events are required');
  const transactionId = String(data.transactionId || '').trim().toUpperCase().replace(/\s+/g, '');
  if (transactionId.length < 6 || transactionId.length > 50 || /^(.)\1+$/.test(transactionId) || !/\d/.test(transactionId) || ['TEST', 'PAID', 'DONE', 'ABC', '123', '123456', '000000', 'AAAA', 'BBBB'].includes(transactionId) || /^(TEST|PAID|DONE|ABC)\d*$/.test(transactionId)) throw new Error('Invalid UPI Transaction ID / UTR');
  if (!data.paymentScreenshot || !/^data:image\/(jpeg|png);base64,/.test(data.paymentScreenshot)) throw new Error('Payment screenshot is required and must be JPG, JPEG, or PNG');
  if (Number(data.totalAmount) !== Number(data.numberOfParticipants) * 150) throw new Error('Invalid registration amount');
}

function transactionExists_(sheet, transactionId) {
  const values = sheet.getLastRow() < 2 ? [] : sheet.getRange(2, 27, sheet.getLastRow() - 1, 1).getValues();
  const normalized = String(transactionId).trim().toUpperCase().replace(/\s+/g, '');
  return values.some(row => String(row[0]).trim().toUpperCase().replace(/\s+/g, '') === normalized);
}

function saveScreenshot_(screenshot, transactionId) {
  const match = String(screenshot).match(/^data:(image\/(?:jpeg|png));base64,(.*)$/);
  if (!match) throw new Error('Invalid payment screenshot data');
  const bytes = Utilities.base64Decode(match[2]);
  if (bytes.length > 5 * 1024 * 1024) throw new Error('Payment screenshot must be 5 MB or smaller');
  const extension = match[1] === 'image/png' ? 'png' : 'jpg';
  return DriveApp.createFile(Utilities.newBlob(bytes, match[1], 'payment-' + transactionId + '.' + extension));
}

function json_(body, status) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}

function resultPage_(result) {
  const message = JSON.stringify({ source: 'imperior-registration' }).slice(0, -1) + ',' +
    JSON.stringify(result).slice(1);
  return HtmlService.createHtmlOutput('<script>var result = ' + message + '; window.parent.postMessage(result, "*"); window.top.postMessage(result, "*");</script>')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
