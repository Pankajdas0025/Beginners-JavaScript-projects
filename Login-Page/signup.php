
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
        $Fullname=$_POST['Fullname'];
        $Email=$_POST['Email'];
        $Password=$_POST['Password'];
        
        $check="SELECT EMAIL FROM SIGNUP WHERE EMAIL='$Email'";
        $response=$dbcon->query($check);
    if($response->num_rows!=0)
        {
            echo "This email is already registred !";
        }
        else
    {
        $sql="INSERT INTO SIGNUP
        values
        ('$Fullname','$Email','$Password')";
        if($dbcon->query($sql))
        {
            echo "succuss!";
        }
    }
    }

    else
    {
            echo "Something Wrong ! ";
    }  
}

?>
