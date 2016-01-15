// eve api data, need to have starbase access
// value with proper api key/vcode or give spreadhseet cordinates where this can be read using !<cordinate>
var eveapi_keyid = '!B1';
var eveapi_vcode = '!B2';

// spreadsheet name where moon list will be added
var RAWDATA_SHEET_NAME = 'raw-towers';

// json backend to get moon id to moon/system/region name
// best of my knowledge there no api that enables to query that info
// moonjson.php source code is up in git for self hosting if needed 
// https://github.com/eritikass/google_spreadsheet_eve_postracker/blob/master/moonjson.php
// tower info himself is hardcoded to script, check var POS_DATA, but there just 2 many moons to make it here :S
var MOON_JSON_BACKEND = 'http://eve.kassikas.net/json/moonjson.php';

// columns where what pos data will be show'n
// change if you want to updat order, make sure you don't miss anything or otherwise **** up
var COL_FUELLEFT = 'A';
var COL_POS_SYS = 'B';
var COL_POS_PLANET = 'C';
var COL_POS_MOON = 'D';
var COL_POS_REGION = 'E';
var COL_POS_TOWERTYPE = 'F';
var COL_DB_MOONID = 'H';
var COL_DB_TOWERID = 'G';;
var COL_DB_TIMESTAMP = 'I';
var COL_STAT = 'J';
var COL_FUELBLOCKS = 'K';

/// *** DO NOT CHAGNE AFTER THAT LINE *** ///

// pos data by id - name and fuel usage
var POS_DATA = {  
   "12235":{  
      "typeID":"12235",
      "typeName":"Amarr Control Tower",
      "fuel":{  
         "hour":40,
         "typeID":4247
      }
   },
   "20059":{  
      "typeID":"20059",
      "typeName":"Amarr Control Tower Medium",
      "fuel":{  
         "hour":20,
         "typeID":4247
      }
   },
   "20060":{  
      "typeID":"20060",
      "typeName":"Amarr Control Tower Small",
      "fuel":{  
         "hour":10,
         "typeID":4247
      }
   },
   "27539":{  
      "typeID":"27539",
      "typeName":"Angel Control Tower",
      "fuel":{  
         "hour":36,
         "typeID":4246
      }
   },
   "27607":{  
      "typeID":"27607",
      "typeName":"Angel Control Tower Medium",
      "fuel":{  
         "hour":18,
         "typeID":4246
      }
   },
   "27610":{  
      "typeID":"27610",
      "typeName":"Angel Control Tower Small",
      "fuel":{  
         "hour":9,
         "typeID":4246
      }
   },
   "27530":{  
      "typeID":"27530",
      "typeName":"Blood Control Tower",
      "fuel":{  
         "hour":36,
         "typeID":4247
      }
   },
   "27589":{  
      "typeID":"27589",
      "typeName":"Blood Control Tower Medium",
      "fuel":{  
         "hour":18,
         "typeID":4247
      }
   },
   "27592":{  
      "typeID":"27592",
      "typeName":"Blood Control Tower Small",
      "fuel":{  
         "hour":9,
         "typeID":4247
      }
   },
   "16213":{  
      "typeID":"16213",
      "typeName":"Caldari Control Tower",
      "fuel":{  
         "hour":40,
         "typeID":4051
      }
   },
   "20061":{  
      "typeID":"20061",
      "typeName":"Caldari Control Tower Medium",
      "fuel":{  
         "hour":20,
         "typeID":4051
      }
   },
   "20062":{  
      "typeID":"20062",
      "typeName":"Caldari Control Tower Small",
      "fuel":{  
         "hour":10,
         "typeID":4051
      }
   },
   "27532":{  
      "typeID":"27532",
      "typeName":"Dark Blood Control Tower",
      "fuel":{  
         "hour":32,
         "typeID":4247
      }
   },
   "27591":{  
      "typeID":"27591",
      "typeName":"Dark Blood Control Tower Medium",
      "fuel":{  
         "hour":16,
         "typeID":4247
      }
   },
   "27594":{  
      "typeID":"27594",
      "typeName":"Dark Blood Control Tower Small",
      "fuel":{  
         "hour":8,
         "typeID":4247
      }
   },
   "27540":{  
      "typeID":"27540",
      "typeName":"Domination Control Tower",
      "fuel":{  
         "hour":32,
         "typeID":4246
      }
   },
   "27609":{  
      "typeID":"27609",
      "typeName":"Domination Control Tower Medium",
      "fuel":{  
         "hour":16,
         "typeID":4246
      }
   },
   "27612":{  
      "typeID":"27612",
      "typeName":"Domination Control Tower Small",
      "fuel":{  
         "hour":8,
         "typeID":4246
      }
   },
   "27535":{  
      "typeID":"27535",
      "typeName":"Dread Guristas Control Tower",
      "fuel":{  
         "hour":32,
         "typeID":4051
      }
   },
   "27597":{  
      "typeID":"27597",
      "typeName":"Dread Guristas Control Tower Medium",
      "fuel":{  
         "hour":16,
         "typeID":4051
      }
   },
   "27600":{  
      "typeID":"27600",
      "typeName":"Dread Guristas Control Tower Small",
      "fuel":{  
         "hour":8,
         "typeID":4051
      }
   },
   "12236":{  
      "typeID":"12236",
      "typeName":"Gallente Control Tower",
      "fuel":{  
         "hour":40,
         "typeID":4312
      }
   },
   "20063":{  
      "typeID":"20063",
      "typeName":"Gallente Control Tower Medium",
      "fuel":{  
         "hour":20,
         "typeID":4312
      }
   },
   "20064":{  
      "typeID":"20064",
      "typeName":"Gallente Control Tower Small",
      "fuel":{  
         "hour":10,
         "typeID":4312
      }
   },
   "27533":{  
      "typeID":"27533",
      "typeName":"Guristas Control Tower",
      "fuel":{  
         "hour":36,
         "typeID":4051
      }
   },
   "27595":{  
      "typeID":"27595",
      "typeName":"Guristas Control Tower Medium",
      "fuel":{  
         "hour":18,
         "typeID":4051
      }
   },
   "27598":{  
      "typeID":"27598",
      "typeName":"Guristas Control Tower Small",
      "fuel":{  
         "hour":9,
         "typeID":4051
      }
   },
   "16214":{  
      "typeID":"16214",
      "typeName":"Minmatar Control Tower",
      "fuel":{  
         "hour":40,
         "typeID":4246
      }
   },
   "20065":{  
      "typeID":"20065",
      "typeName":"Minmatar Control Tower Medium",
      "fuel":{  
         "hour":20,
         "typeID":4246
      }
   },
   "20066":{  
      "typeID":"20066",
      "typeName":"Minmatar Control Tower Small",
      "fuel":{  
         "hour":10,
         "typeID":4246
      }
   },
   "27780":{  
      "typeID":"27780",
      "typeName":"Sansha Control Tower",
      "fuel":{  
         "hour":36,
         "typeID":4247
      }
   },
   "27782":{  
      "typeID":"27782",
      "typeName":"Sansha Control Tower Medium",
      "fuel":{  
         "hour":18,
         "typeID":4247
      }
   },
   "27784":{  
      "typeID":"27784",
      "typeName":"Sansha Control Tower Small",
      "fuel":{  
         "hour":9,
         "typeID":4247
      }
   },
   "27536":{  
      "typeID":"27536",
      "typeName":"Serpentis Control Tower",
      "fuel":{  
         "hour":36,
         "typeID":4312
      }
   },
   "27601":{  
      "typeID":"27601",
      "typeName":"Serpentis Control Tower Medium",
      "fuel":{  
         "hour":18,
         "typeID":4312
      }
   },
   "27604":{  
      "typeID":"27604",
      "typeName":"Serpentis Control Tower Small",
      "fuel":{  
         "hour":9,
         "typeID":4312
      }
   },
   "27538":{  
      "typeID":"27538",
      "typeName":"Shadow Control Tower",
      "fuel":{  
         "hour":32,
         "typeID":4312
      }
   },
   "27603":{  
      "typeID":"27603",
      "typeName":"Shadow Control Tower Medium",
      "fuel":{  
         "hour":16,
         "typeID":4312
      }
   },
   "27606":{  
      "typeID":"27606",
      "typeName":"Shadow Control Tower Small",
      "fuel":{  
         "hour":8,
         "typeID":4312
      }
   },
   "27786":{  
      "typeID":"27786",
      "typeName":"True Sansha Control Tower",
      "fuel":{  
         "hour":32,
         "typeID":4247
      }
   },
   "27788":{  
      "typeID":"27788",
      "typeName":"True Sansha Control Tower Medium",
      "fuel":{  
         "hour":16,
         "typeID":4247
      }
   },
   "27790":{  
      "typeID":"27790",
      "typeName":"True Sansha Control Tower Small",
      "fuel":{  
         "hour":8,
         "typeID":4247
      }
   }
}

var ROW_START = 4;

function getFuelLeftTime(system, planet, moon) {
  if (!system && !moon & !planet) {
    return '';
  }
  
  if (!system || !moon || !planet) {
    return '?';
  }
  
  system = system.toString().trim().toLocaleLowerCase();
  planet = parseInt(planet, 10);
  moon = parseInt(moon, 10);
  
  var doc = SpreadsheetApp.getActive();
  var sheet_raw = doc.getSheetByName(RAWDATA_SHEET_NAME);
  
  var d = new Date();
  var timeStamp = d.getTime();

  if (!sheet_raw) {
    return 'no-raw-sheet';
  }
  
  var rowNumber = ROW_START+1; // init
  var errOk = 5;
  do {
    rowNumber++;
    
    var row_system = sheet_raw.getRange(COL_POS_SYS + rowNumber).getValue().toString().trim().toLocaleLowerCase();
    
    if (row_system == '') {
      errOk--;
      if (errOk < 0) {
        return 'not-found'; 
      } else {
        continue;
      }
    }
    
    if (row_system != system) {
      continue; 
    }
    
    var row_planet = parseInt(sheet_raw.getRange(COL_POS_PLANET + rowNumber).getValue(), 10);
    if (row_planet != planet) {
//return "ppp: " + planet + "@" + row_planet;
      continue; 
    }
    
    var row_moon = parseInt(sheet_raw.getRange(COL_POS_MOON + rowNumber).getValue(), 10);
    if (row_moon != moon) {
//return "mmm: " + moon + "@" + row_moon;
      continue; 
    }
    
    var valueOnlineUntil = sheet_raw.getRange(COL_DB_TIMESTAMP + rowNumber).getValue();
    //return valueOnlineUntil;
    
    
    var dateUntil = new Date(valueOnlineUntil);
    var timestamp_untilonline = Math.floor(dateUntil.getTime() / 1000);
        
    var d = new Date();
    var timestamp_now = Math.floor(d.getTime() / 1000);
    
    
    if (timestamp_now > timestamp_untilonline) {
       return 'offline'; 
    }
    
    var difsec = timestamp_untilonline - timestamp_now;
    var dif_h = parseInt(difsec/60/60, 10);
    
    var left_h = dif_h%24;
    var left_d = (dif_h-left_h)/24;
    
    return left_d + "d " + left_h + "h";
    
    //return timestamp_untilonline + " @ " + timestamp_now;
    
    
  } while (true);
  
  return 'err1';
}

function create_tower_list() {
  
  // get and validate sheet
  var doc = SpreadsheetApp.getActive();
  var sheet_raw = doc.getSheetByName(RAWDATA_SHEET_NAME);
  if (!sheet_raw) {
     Browser.msgBox("can't find sheet named: " + RAWDATA_SHEET_NAME);
     return;
  }
  
  var helper_date_to_str = function(d) {
    return d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate() + ' ' + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
  };
  
  var helper_contains = function(search, obj) {
    for (var i in obj) {
      if (obj[i] == search) {
        return true; 
      }
    }
    return false;
  };
  
  if (eveapi_keyid && eveapi_keyid.substr(0, 1) == '!') {
    eveapi_keyid = sheet_raw.getRange(eveapi_keyid.substr(1)).getValue();
  }
  if (eveapi_vcode && eveapi_vcode.substr(0, 1) == '!') {
    eveapi_vcode = sheet_raw.getRange(eveapi_vcode.substr(1)).getValue();
  }

  
  if (!eveapi_keyid || !eveapi_vcode) {
    Browser.msgBox("check your api key config in " + RAWDATA_SHEET_NAME);
    return;
  }
  
  var ROW_DATES = ROW_START;
  var ROW_COLS = ROW_START+1;
  
  var d = new Date();
  var timeStamp = d.getTime(); // ms > time
  var last_time = sheet_raw.getRange('C' + ROW_DATES).getValue();
  
  // only update once after 6h
  if (last_time && !isNaN(last_time) && (timeStamp < (last_time + 6*60*60*1000))) {
      Logger.log("cached (" + timeStamp + "  @ " + last_time + ")...");
      return; 
  }
  
  // update data
  sheet_raw.getRange('A' + ROW_DATES).setValue("updated:");
  sheet_raw.getRange('C' + ROW_DATES).setValue(timeStamp);
  sheet_raw.getRange('B' + ROW_DATES).setValue(helper_date_to_str(d));
 
  // table columns
  sheet_raw.getRange(COL_STAT + ROW_COLS).setValue("status");
  sheet_raw.getRange(COL_FUELLEFT + ROW_COLS).setValue("fuel left");
  
  sheet_raw.getRange(COL_POS_SYS + ROW_COLS).setValue("system");
  sheet_raw.getRange(COL_POS_MOON + ROW_COLS).setValue("moon");
  sheet_raw.getRange(COL_POS_PLANET + ROW_COLS).setValue("planet");
  sheet_raw.getRange(COL_POS_REGION + ROW_COLS).setValue("region");
  
  sheet_raw.getRange(COL_POS_TOWERTYPE + ROW_COLS).setValue("towerType");
  //sheet_raw.getRange(COL_POS_ONLINEUNTIL + ROW_COLS).setValue("online until");
  
  sheet_raw.getRange(COL_DB_MOONID + ROW_COLS).setValue("db:moonID");
  sheet_raw.getRange(COL_DB_TOWERID + ROW_COLS).setValue("db:towerID");
  sheet_raw.getRange(COL_DB_TIMESTAMP + ROW_COLS).setValue("timestamp:online");
  sheet_raw.getRange(COL_FUELBLOCKS + ROW_COLS).setValue("db:fuelblocks");
  
  
  
  var api_url = "http://api.eveonline.com/corp/StarbaseList.xml.aspx?keyID=" + eveapi_keyid + "&vCode=" + eveapi_vcode;
  
  var text = UrlFetchApp.fetch(api_url, {method : "get"}).getContentText();

  // NB! no need handle api errros (like wrong key/vcode) as it seems that api giving also http code that gives error anyway here!
  
  var document = XmlService.parse(text);
  var rowset = document.getRootElement().getChild('result').getChild('rowset');
  var rows = rowset.getChildren('row');

  var moonIds = []; // XXX
  var towers = {};
  for (var i in rows) {
    var towerID = rows[i].getAttribute('itemID').getValue();
    var moonID = rows[i].getAttribute('moonID').getValue();
    var typeID = rows[i].getAttribute('typeID').getValue();
    
    moonIds.push(moonID);
    
    towers[moonID] = {
      'towerID': towerID,
      'moonID': moonID,
      'typeID': typeID,
    };
  }
  
  //XXX: is there a better way to get moonid to moon name?
  var moonjson_url = MOON_JSON_BACKEND + '?moonIDs=' + moonIds.join(';');
  Logger.log(moonjson_url);
  var text = UrlFetchApp.fetch(moonjson_url, {method : "get"}).getContentText();
  
  var moonjson = JSON.parse(text);
  var rowNumber = ROW_START+1; // init
  for (var index in moonjson) {
    rowNumber++;
    
    sheet_raw.getRange(COL_POS_MOON + rowNumber).setValue(moonjson[index].moon);
    sheet_raw.getRange(COL_POS_PLANET + rowNumber).setValue(moonjson[index].planet);
    sheet_raw.getRange(COL_POS_SYS + rowNumber).setValue(moonjson[index].systemName);
    sheet_raw.getRange(COL_POS_REGION + rowNumber).setValue(moonjson[index].regionName);
    
    towers[moonjson[index].moonID].index = rowNumber;
    towers[moonjson[index].moonID].moon = moonjson[index];
    
  }
  
  for (var moonID in towers) {
    if (isNaN(towers[moonID].index)) {
      // incase json err
      towers[moonID].index = ++rowNumber;
      
      sheet_raw.getRange(COL_POS_MOON + towers[moonID].index).setValue('??');
      sheet_raw.getRange(COL_POS_PLANET + towers[moonID].index).setValue('???');
      sheet_raw.getRange(COL_POS_SYS + towers[moonID].index).setValue('???');
      sheet_raw.getRange(COL_POS_REGION + towers[moonID].index).setValue('???');
      continue;
    }
    
    var index = towers[moonID].index;
    sheet_raw.getRange(COL_DB_MOONID + index).setValue(moonID);
    sheet_raw.getRange(COL_DB_TOWERID + index).setValue(towers[moonID].towerID);
    
    
    if (!POS_DATA[towers[moonID].typeID]) {
      sheet_raw.getRange(COL_STAT + index).setValue("ERR");
      continue;
    }
    
    towers[moonID].pos = POS_DATA[towers[moonID].typeID];
    
    sheet_raw.getRange(COL_POS_TOWERTYPE + index).setValue(towers[moonID].pos.typeName);
    
    sheet_raw.getRange(COL_STAT + index).setValue("NEW");
    
    
    var api_url_posdata = "http://api.eveonline.com/corp/StarbaseDetail.xml.aspx?keyID=" + eveapi_keyid + "&vCode=" + eveapi_vcode + "&itemID=" + towers[moonID].towerID;
    
    var text = UrlFetchApp.fetch(api_url_posdata, {method : "get"}).getContentText();

    var document = XmlService.parse(text);
    var rowset = document.getRootElement().getChild('result').getChild('rowset');
    var rows = rowset.getChildren('row');
    
    Logger.log(rowset);
    Logger.log(rows);
    
    var fuelblocks = 0;
    for (var i in rows) {
      var typeID = rows[i].getAttribute('typeID');
      
      if (towers[moonID].pos.fuel.typeID == '4246') {
        fuelblocks = rows[i].getAttribute('quantity').getValue();
      }
    }
    
    sheet_raw.getRange(COL_FUELBLOCKS + index).setValue(fuelblocks);
    
    var fuelHLeft = parseInt(fuelblocks / towers[moonID].pos.fuel.hour);
    //sheet_raw.getRange(COL_FUELLEFT + index).setValue(fuelHLeft);
    
    // TODO: FIXME - this should calcaulate fuel from date given in xml
    var fuelUntil_unix_ms = timeStamp + (60 * 60 * fuelHLeft * 1000);
    sheet_raw.getRange(COL_DB_TIMESTAMP + index).setValue(new Date(fuelUntil_unix_ms));
    
    
    //var dateUntil = new Date(valueOnlineUntil);
    var timestamp_untilonline = Math.floor(fuelUntil_unix_ms / 1000);
        
    var d2 = new Date();
    var timestamp_now = Math.floor(d2.getTime() / 1000);


    var difsec = timestamp_untilonline - timestamp_now;
    var dif_h = parseInt(difsec/60/60, 10);
    
    var left_h = dif_h%24;
    var left_d = (dif_h-left_h)/24;
    
    sheet_raw.getRange(COL_FUELLEFT + index).setValue(left_d + "d " + left_h + "h");
    
    //sheet_raw.getRange(COL_FUELLEFT + index).setFormula("=getFuelLeftTime(" + COL_POS_SYS + index + "; " + COL_POS_PLANET + index + "; " + COL_POS_MOON + index + ")");
    
    sheet_raw.getRange(COL_STAT + index).setValue('ok');
    
    //break;
    
  }
  
  
}

