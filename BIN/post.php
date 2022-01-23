<?php
$servername = "localhost";
$username = "root";
$password = "";
$db = "comments";
// Create connection
$conn = new mysqli($servername, $username, $password, $db);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";

$result = mysqli_query($conn,"SELECT * FROM comment");

echo "<table border='1'>
<tr>
<th>ID</th>
<th>Name</th>
<th>E-Mail</th>
<th>Subject</th>
<th>Date Time</th>
</tr>";

while($row = mysqli_fetch_array($result))
{
echo "<tr>";
echo "<td>" . $row['id'] . "</td>";
echo "<td>" . $row['name'] . "</td>";
echo "<td>" . $row['email'] . "</td>";
echo "<td>" . $row['subject'] . "</td>";
echo "<td>" . $row['date'] . "</td>";
echo "</tr>";
}
echo "</table>";

$today = date("Y-m-d H:i:s"); 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  
  // collect value of input field
  $name = $_REQUEST['nom'];
  $email = $_REQUEST['email'];
  $comment = $_REQUEST['commentaire'];


  $sql = "INSERT INTO comment  VALUES ('','$name', 
  '$email', '$comment', '$today')";

  if(mysqli_query($conn, $sql)){
      echo "<h3>data stored in a database successfully." 
          . " Please browse your localhost php my admin" 
          . " to view the updated data</h3>"; 

      echo nl2br("\n$name\n $email\n $comment");
  } else{
      echo "ERROR: Hush! Sorry $sql. " 
          . mysqli_error($conn);
  }
}



?>
