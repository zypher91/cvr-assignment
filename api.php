<?php

    include 'db.php';

    header("Content-Type: application/json");

    $method = $_SERVER['REQUEST_METHOD'];
    $input = json_decode(file_get_contents('php://input'), true);

    switch ($method) {
        case 'POST':
            $cvr = $input['cvr'];
            $name = $input['name'];
            $startdate = $input['startdate'];
            $address = $input['address'];
            $zipcode = $input['zipcode'];
            $city = $input['city'];
            $phone = $input['phone'];
            $conn -> query("INSERT INTO firms (cvr, name, startdate, address, zipcode, city, phone) VALUES ('$cvr', '$name', STR_TO_DATE('$startdate', '%d/%m - %Y'), '$address', '$zipcode', '$city', $phone)");
            echo json_encode(["message" => "User added successfully"]);
            break;

        case 'GET':
            $result = $conn -> query("SELECT * FROM firms");
            while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
                $data[] = $row;
            }
            echo json_encode($data);
            break;
        }
?>