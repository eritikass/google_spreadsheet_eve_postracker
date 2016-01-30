<?php

// include db config, have to define values
// $dbhost - db hostname
// $dbuser - db username
// $dbpasswd - db password
// $dbname_evedump - db database name
include dirname(dirname(dirname(__FILE__))) . '/ee/config.php';

$moonids = $json_out = array();

// get valid moon id's
foreach (preg_split("/[\s,;]+/", isset($_GET['moonIDs']) ? $_GET['moonIDs'] : '') as $moonId) {
	if (is_numeric($moonId)) {
		$moonids[(int)$moonId] = (int)$moonId;
	}
}

if (count($moonids) > 2048 ) {
	exit("sorry: max 2048 per request");
}

$outStrJson = '[]';
if ($moonids) {
	
	$cache_moonlist = dirname(__FILE__) . '/cache/moonjson/' . md5(json_encode($moonids)) . '.json';
	
	if (file_exists($cache_moonlist)) {
	    $outStrJson = file_get_contents($cache_moonlist);
		//touch($cache_moonlist);
	} else {
	
		// create connection
		$mysqli = new mysqli($dbhost, $dbuser, $dbpasswd, $dbname_evedump);
	
		/* check connection */
		if ($mysqli->connect_errno) {
			printf("Connect failed: %s\n", $mysqli->connect_error);
			exit();
		}
	
		// fetch moons
		// tables from old pos tracker db - i guess you can query same data also from eve dump with some effort
		$query = "SELECT m.moonID, m.moonName, m.systemID, m.systemName, m.regionID, m.regionName, pm.celestialIndex planet, pm.orbitIndex moon ".
			" FROM `evemoons` m ".
			" INNER JOIN tblmoons pm ON pm.itemID = m.moonID ".
			" WHERE m.moonID IN ('" . implode("', '", $moonids) . "') ".
			" ORDER BY m.regionName ASC, m.systemName ASC, m.moonName ASC ";
	
		$result = $mysqli->query($query);
		if ($result) {
			while($row = $result->fetch_array(MYSQLI_ASSOC))
			{
				$json_out[] = $row;
			}
			/* free result set */
			$result->close();
		}
	
		/* close connection */
		$mysqli->close();
	
		$outStrJson = json_encode($json_out);
		
		file_put_contents($cache_moonlist, $outStrJson);
	}
}


if (!empty($_GET['callback'])) {
	header("Content-type: text/javascript");
	echo $_GET['callback'] . '(' . $outStrJson . ');';
} else {
	header("Content-type: application/json");
	echo $outStrJson;
}
