
var RAWDATA_SHEET_NAME = 'raw-towers';

// only minni listed
var TOWER_IDS = {
  // angel, domi, t1
  'large': [27539, 27540, 16214],
  'medium': [27607, 27609, 20065],
  'small': [27610, 27612, 20066],
};

var number = 0;

function eve_PosFuelLeft(system, planetMoon) {

  if (!system || !planetMoon) {
    return '';
  }
  
  var doc = SpreadsheetApp.getActive();
  var sheet_raw = doc.getSheetByName(RAWDATA_SHEET_NAME);
  
  var d = new Date();
  var timeStamp = d.getTime();

  if (!sheet_raw) {
    return 'no-raw-sheet';
  }

  var planet = planetMoon.trim().split(' ')[0].substr(1); 
  var moon = planetMoon.trim().split(' ')[1].substr(1); 
  
  Logger.log(planet+ "X" + moon);
  
  name = (system.trim() + " " + romanize(planet) + " - Moon " + moon);
  
  //return name;
  
  Logger.log(name);
  
  var cnt = 8;
  var dh = '???';
  do {
    cnt++;
    if (cnt > 1000) {
     break; 
    }
    
    var status = sheet_raw.getRange('A' + cnt).getValue();
    if (!status) {
      break;
    }
    if (status != 'ok') {
      continue; 
    }
    
    var name2 = sheet_raw.getRange('E' + cnt).getValue();
    if (name2.trim().toLocaleLowerCase() != name.trim().toLocaleLowerCase()) {
      continue; 
    }
    
    var fuelUntil = sheet_raw.getRange("I" + cnt).getValue();
    var dif_h = parseInt((fuelUntil - timeStamp)/1000/60/60);
    
    var h = dif_h%24;
    var d = (dif_h-h)/24;
    
    var dh = d + 'd ' + h + 'h';
    Logger.log("found(" + dh + ")>" + fuelUntil + " # " + dif_h);
    
    break;
  } while (true);
  
  return dh; // + " // " + name;
}

function romanize (num) {
    if (!+num)
        return false;
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

function contains(search, obj) {
  for (var i in obj) {
    if (obj[i] == search) {
     return true; 
    }
  }
  return false;
}

//function tower_up_hidd(arg) {
//  upadte_towerdata(true);
//  return arg;
//}

function upadte_towerdata(hide_message) {
  var doc = SpreadsheetApp.getActive();
  var sheet_raw = doc.getSheetByName(RAWDATA_SHEET_NAME);

  if (!sheet_raw) {
    if (!upadte_towerdata(hide_message)) {
      Browser.msgBox("can't find sheet named: " + RAWDATA_SHEET_NAME);
    }
    return;
  }
  
  var eveapi_keyid = sheet_raw.getRange('B1').getValue();
  var eveapi_vcode = sheet_raw.getRange('B2').getValue();
  
  if (!eveapi_keyid || !eveapi_vcode) {
    Browser.msgBox("check your api key config in " + RAWDATA_SHEET_NAME);
    return;
  }
 
  var d = new Date();
  var timeStamp = d.getTime(); // ms > time
  var last_time = sheet_raw.getRange('B6').getValue();
  
  // only update once after 6h
  if (timeStamp < (last_time + 6*60*60*1000)) {
      Logger.log("cached (" + timeStamp + "  @ " + last_time + ")...");
      return; 
  }
    
  sheet_raw.getRange('A6').setValue("towerlist-upa:");
  sheet_raw.getRange('B6').setValue(timeStamp);
  sheet_raw.getRange('C6').setValue(d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate() + ' ' + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() );
  
  var api_url = "http://api.eveonline.com/corp/StarbaseList.xml.aspx?keyID=" + eveapi_keyid + "&vCode=" + eveapi_vcode;
  Logger.log(api_url);
  var text = UrlFetchApp.fetch(api_url, {method : "get"}).getContentText();


  var document = XmlService.parse(text);
  var rowset = document.getRootElement().getChild('result').getChild('rowset');
  var rows = rowset.getChildren('row');
  
  var towers = {};
  var moonIds = [];
  var moon_tower_rel = {};
  
  var cnt = 0;
  for(var i in rows) {
    Logger.log("i:" + i);
    Logger.log(rows[i].getAttribute('itemID').getValue());
    
    var towerID = rows[i].getAttribute('itemID').getValue();
    var moonID = rows[i].getAttribute('moonID').getValue();
    
    var typeID = rows[i].getAttribute('typeID').getValue();
    var towerSize = '';
    var fuelH = 0;
        
    if (contains(typeID, TOWER_IDS.large)) {
      towerSize = 'large';
      fuelH = 40;
    } else if (contains(typeID, TOWER_IDS.medium)) {
      towerSize = 'medium';
      fuelH = 20;
    } else if (contains(typeID, TOWER_IDS.small)) {
      towerSize = 'small';
      fuelH = 10;
    }
    
    
    var tower = {
      'index': (9 + cnt++),
      'towerID': towerID,
      'moonID': moonID,
      'typeID': typeID,
      'towerSize': towerSize,
      'fuelH': fuelH,
      'locationID': rows[i].getAttribute('locationID').getValue(),
      'state': rows[i].getAttribute('state').getValue(), 
    };
    towers[towerID] = tower;
    moon_tower_rel[moonID] = towerID;
    
    sheet_raw.getRange('A' + tower.index + ':K' + tower.index).setValue("");
    
    sheet_raw.getRange('A' + tower.index).setValue('s1');
    sheet_raw.getRange('B' + tower.index).setValue(tower.towerID);
    sheet_raw.getRange('C' + tower.index).setValue(tower.moonID);
    sheet_raw.getRange('G' + tower.index).setValue(towerSize + " (" + fuelH + ")");

    moonIds.push(tower.moonID);
  }
  
  sheet_raw.getRange('A' + (9+cnt) + ':A' + (9+cnt+50)).setValue("");
  
  Logger.log("towers-listed");
  //Logger.log(towers);
  
  //XXX: is there a better way to get moonid to moon name?
  var moonjson_url = 'http://ee.kassikas.net/moonjson.php?moonIDs=' + moonIds.join(';');
  
  Logger.log(moonjson_url);
  
  var text = UrlFetchApp.fetch(moonjson_url, {method : "get"}).getContentText();
  
  Logger.log(text);
  
  var moonjson = JSON.parse(text);
  
  for (var moonID in moonjson) {
    var towerID = moon_tower_rel[moonID];
    if (!towerID) {
     continue; 
    }
    towers[towerID].moon = moonjson[moonID];
    var tower = towers[towerID];
        
    sheet_raw.getRange('A' + tower.index).setValue('s2');
    sheet_raw.getRange('D' + tower.index).setValue(tower.moon.systemName);
    sheet_raw.getRange('E' + tower.index).setValue(tower.moon.moonName);
    
    var api_url_posdata = "http://api.eveonline.com/corp/StarbaseDetail.xml.aspx?keyID=" + eveapi_keyid + "&vCode=" + eveapi_vcode + "&itemID=" + towerID;
    
    var text = UrlFetchApp.fetch(api_url_posdata, {method : "get"}).getContentText();

    var document = XmlService.parse(text);
    var rowset = document.getRootElement().getChild('result').getChild('rowset');
    var rows = rowset.getChildren('row');
    
    Logger.log(rowset);
    Logger.log(rows);
    
    var fuelblocks = 0;
    for (var i in rows) {
      Logger.log(rows[i]);
      Logger.log(rows[i].getText());
      var typeID = rows[i].getAttribute('typeID');
      
      Logger.log("IN:" + rows[i].getAttribute('typeID').getValue() + " @ S: " + rows[i].getAttribute('quantity').getValue())
      
      // 4246 - minni fuel
      if (rows[i].getAttribute('typeID').getValue() == '4246') {
        fuelblocks = rows[i].getAttribute('quantity').getValue();
      }
    }
    
    sheet_raw.getRange('F' + tower.index).setValue(fuelblocks);
    
    var fuelHLeft = parseInt(fuelblocks / tower.fuelH);
    sheet_raw.getRange('H' + tower.index).setValue(fuelHLeft);
    
    // TODO: FIXME - this should calcaulate fuel from date given in xml
    var fuelUntil_unix_ms = timeStamp + (60 * 60 * fuelHLeft * 1000);
    sheet_raw.getRange('I' + tower.index).setValue(fuelUntil_unix_ms);
    
    sheet_raw.getRange('A' + tower.index).setValue('ok');
  }
  
 // SpreadsheetApp.
 // SpreadsheetApp.getActiveSheet().getRange('G2').setValue('Hello');
  
}
