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

if ($moonids) {

	// create connection
	$mysqli = new mysqli($dbhost, $dbuser, $dbpasswd, $dbname_evedump);

	/* check connection */
	if ($mysqli->connect_errno) {
		printf("Connect failed: %s\n", $mysqli->connect_error);
		exit();
	}

	// fetch moons
	$query = "SELECT moonID, moonName, systemID, systemName, regionID, regionName ".
		" FROM `evemoons` ".
		" WHERE moonID IN ('" . implode("', '", $moonids) . "') ".
		" ORDER BY regionName ASC, systemName ASC, moonName ASC ";

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

}


if (!empty($_GET['callback'])) {
	header("Content-type: text/javascript");
	echo $_GET['callback'] . '(' . json_encode($json_out) . ');';
} else {
	header("Content-type: application/json");
	echo json_encode($json_out);
}

