<?php

// include db config, have to define values
// $dbhost - db hostname
// $dbuser - db username
// $dbpasswd - db password
// $dbname_evedump - db database name
include dirname(dirname(dirname(__FILE__))) . '/ee/config.php';
// create connection
$mysqli = new mysqli($dbhost, $dbuser, $dbpasswd, $dbname_evedump);

/* check connection */
if ($mysqli->connect_errno) {
	printf("Connect failed: %s\n", $mysqli->connect_error);
	exit();
}

$json_out = array();

$query = "SELECT * FROM tower_static";
$result = $mysqli->query($query);
if ($result) {
	$sizes = array('3' => 'large', '2' => 'medium', '1' => 'small');
	$tiers = array('faction' => array(7, 9, 13, 8, 14), 'subfaction' => array(6, 10, 12, 11, 5), 't1' => array(1,2,3,4));
	$fuelUse = array(
		't1' 		=> array('large' => 40, 'medium' => 20, 'small' => 10),
		'subfaction'=> array('large' => 36, 'medium' => 18, 'small' => 9),
		'faction'	=> array('large' => 32, 'medium' => 16, 'small' => 8),
	);
	$fuelBlocks = array('Helium' => 4247, 'Oxygen' => 4312, 'Nitrogen' => 4051, 'Hydrogen' => 4246);
	
	while($row = $result->fetch_array(MYSQLI_ASSOC))
	{
		$size =  isset($sizes[$row['pos_size']]) ? $sizes[$row['pos_size']] : '';
		$tier = '?'; 
		
		foreach ($tiers as $tier_ => $races) {
			if (in_array($row['pos_race'], $races)) {
				$tier = $tier_;
				break;
			}
		}
		
		$json_out[$row['typeID']] = array(
			'typeID' => $row['typeID'],
			'typeName' => $row['typeName'],
			'fuel' => array(
				'hour' => $fuelUse[$tier][$size],
				'typeID'=> $fuelBlocks[$row['race_isotope']],
			),
	#		'fuelh' => $fuelUse[$tier][$size],
	#		'fuelId' => $fuelBlocks[$row['race_isotope']],
	#		'size' => $size,
	#		'tier' => $tier,
	#		'pos_race' => $row['pos_race'],
	#		'tmp' =>  $row,
		);
	}
	/* free result set */
	$result->close();
}

/* close connection */
$mysqli->close();

header("Content-type: application/json");
echo json_encode($json_out);
