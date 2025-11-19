
// Get input values through user
    function Userinput(value) {
    document.getElementById("display").value += value;
}
// Delete all input

    function Alldelete() {
    document.getElementById('display').value = " ";
}
// delete by one from last
function deleteLast() {
    const currentDisplay = document.getElementById('display').value;
    document.getElementById('display').value = currentDisplay.slice(0, -1);
}

function calculate() {
    const expression = document.getElementById('display').value;
    try {
        const result = eval(expression);
        document.getElementById('display').value = result;
    } catch {
        document.getElementById('display').value = 'Error';
    }
}

