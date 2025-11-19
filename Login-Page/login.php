
<?php
$dbcon=new mysqli("localhost","root","","test");
if($dbcon->connect_error)
{
    echo " Not connect succesfully ! ";
}
else
{
if($_SERVER['REQUEST_METHOD']=="POST")
{
  
    $Email=$_POST['SEmail'];

    $Pass=$_POST['SPass'];

    $sqlcheck="SELECT *FROM SIGNUP
    WHERE EMAIL='$Email' AND PASSWORD='$Pass'";
    $response=$dbcon->query($sqlcheck);
    if($response->num_rows!=0)

    {   

        echo "login success!";
     }

    else
    {
        echo "Invalied user!";
    }
}

}
?>