const ajax = new XMLHttpRequest();

function checkUserLogin() {
    const username = document.getElementById("username").value;
    ajax.open("GET", "checkUser.php?username=" + username);
    ajax.onreadystatechange = function() {
        if (ajax.readyState === 4 && ajax.status === 200) {
            if (!ajax.response) {
                document.getElementById("loginErrorMsg").innerText = "Користувача " + username + " не знайдено!";
            } else {
                document.getElementById("loginErrorMsg").innerText = "";
            }
        }
    };
    ajax.send();
}

function checkUserRegister() {
    const username = document.getElementById("username").value;
    ajax.open("GET", "checkUser.php?username=" + username);
    ajax.onreadystatechange = function() {
        if (ajax.readyState === 4 && ajax.status === 200) {
            if (ajax.response) {
                document.getElementById("registerErrorMsg").innerText = "Користувач " + ajax.response + " вже існує!";
            } else {
                document.getElementById("registerErrorMsg").innerText = "";
            }
        }
    };
    ajax.send();
}

function getStartNotes() {
    ajax.open("GET", "startNotes.php");
    ajax.onreadystatechange = function() {
        if (ajax.readyState === 4 && ajax.status === 200) {
            const res = JSON.parse(ajax.response);

            const yourRecordsHeader = document.getElementById('yourRecordsHeader');

            if (res.note) {
                const sortYourRecords = document.getElementById('sortYourRecords');
                const yourRecords = document.getElementById('yourRecords');

                yourRecordsHeader.innerText = "Ваші записи:";
                sortYourRecords.innerHTML = res.sort;
                yourRecords.innerHTML = res.note;
            } else {
                yourRecordsHeader.innerText = "Записів ще не було";
            }
        }
    };
    ajax.send();
}

function sortNotes() {
    const param = document.getElementById('selectParam').value;
    const sortByValue = document.getElementById('sortByValue');
    const inputValue = document.getElementById('inputValue');

    if (param !== "Обрати параметр") {
        sortByValue.hidden = false;
        inputValue.hidden = false;
    } else {
        sortByValue.hidden = true;
        inputValue.hidden = true;
    }

    ajax.open("GET", "sortNotes.php?param=" + param + "&value=" + inputValue.value);
    ajax.onreadystatechange = function() {
        if (ajax.readyState === 4 && ajax.status === 200) {
            const yourRecords = document.getElementById('yourRecords');
            yourRecords.innerHTML = ajax.response;
        }
    };
    ajax.send();
}

let c = 0;

const addNoteButton = document.getElementById("addNoteButton");
const paramInfo = document.getElementById("paramInfo");
const addFieldButton = document.getElementById("addFieldButton");
const submitNote = document.getElementById("submitNote");

function addNote() {
    addNoteButton.hidden = true;
    paramInfo.hidden = false;
    addFieldButton.hidden = false;
    submitNote.hidden = false;
    
    c = 1;

    let html = "";
    html += "<input type='button' value='Видалити поле' onclick='deleteStartField()'>";
    html += "<label for='inputParam" + c + "'> Введіть назву параметру </label>";
    html += "<input type='text' id='inputParam" + c + "'>";
    html += "<label for='inputValue" + c + "'> Введіть значення параметру </label>";
    html += "<input type='text' id='inputValue" + c + "'>";
    
    const brAfterInputDiv = document.createElement('br');
    
    const inputDiv = document.createElement('div');
    inputDiv.innerHTML = html;
    
    addNoteButton.parentElement.insertBefore(brAfterInputDiv, addFieldButton);
    addNoteButton.parentElement.insertBefore(inputDiv, brAfterInputDiv);
}

function deleteStartField() {
    const button = document.activeElement;
    const buttonParent = button.parentElement;

    const inputs = buttonParent.parentElement.querySelectorAll('input[type="text"]');

    if (inputs.length > 2) {
        buttonParent.parentElement.removeChild(buttonParent.nextElementSibling);
        buttonParent.parentElement.removeChild(buttonParent);
    } else {
        addNoteButton.hidden = false;
        paramInfo.hidden = true;

        buttonParent.parentElement.removeChild(buttonParent.nextElementSibling);
        buttonParent.parentElement.removeChild(buttonParent);

        addFieldButton.hidden = true;
        submitNote.hidden = true;
    }
}

function addNoteField() {
    let check = 1;

    const button = document.activeElement;

    const inputs = button.parentElement.querySelectorAll('input[type="text"]');

    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value.trim() === '') {
            check = 0;
        }
    }

    if (c > 1) {
        let checkArray = [];

        for (let i = 0; i < inputs.length; i++) {
            if (i % 2 == 0) {
                checkArray[i / 2] = inputs[i].value;
            }
        }
        
        for (let i = 1; i < checkArray.length; i++) {
            for (let j = 0; j < checkArray.length - 1; j++) {
                if (i != j) {
                    if (checkArray[i] == checkArray[j]) {
                        check = 0;
                    }
                }
            }
        }
    }

    if (check) {
        c++;
    
        let html = "";
        html += "<input type='button' value='Видалити поле' onclick='deleteStartField()'>";
        html += "<label for='inputParam" + c + "'> Введіть назву параметру </label>";
        html += "<input type='text' id='inputParam" + c + "'>";
        html += "<label for='inputValue" + c + "'> Введіть значення параметру </label>";
        html += "<input type='text' id='inputValue" + c + "'>";
    
        const brAfterInputDiv = document.createElement('br');
    
        const inputDiv = document.createElement('div');
        inputDiv.innerHTML = html;
    
        addNoteButton.parentElement.insertBefore(brAfterInputDiv, addFieldButton);
        addNoteButton.parentElement.insertBefore(inputDiv, brAfterInputDiv);
    }
}

function sendNote() {
    let check = 1;

    const button = document.activeElement;

    const inputs = button.parentElement.querySelectorAll('input[type="text"]');

    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value.trim() === '') {
            check = 0;
        }
    }

    if (c > 1) {
        let checkArray = [];

        for (let i = 0; i < inputs.length; i++) {
            if (i % 2 == 0) {
                checkArray[i / 2] = inputs[i].value;
            }
        }
        
        for (let i = 1; i < checkArray.length; i++) {
            for (let j = 0; j < checkArray.length - 1; j++) {
                if (i != j) {
                    if (checkArray[i] == checkArray[j]) {
                        check = 0;
                    }
                }
            }
        }
    }

    if (check) {
        let input = "";

        for (let i = 0; i < inputs.length; i++) {
            if (i % 2 == 0) {
                input += inputs[i].value + "="; 
            } else {
                input += inputs[i].value;
                if (inputs.length > 1 && i + 1 < inputs.length) {
                    input += "&";
                }
            }
        }

        const divs = button.parentElement.querySelectorAll('div');
        const brs = button.parentElement.querySelectorAll('br');

        for (let i = 0; i < divs.length; i++) {
            button.parentElement.removeChild(divs[i]);
            button.parentElement.removeChild(brs[i]);
        }

        addNoteButton.hidden = false;
        paramInfo.hidden = true;
        addFieldButton.hidden = true;
        submitNote.hidden = true;

        ajax.open("POST", "addNote.php");
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax.onreadystatechange = function() {
            if (ajax.readyState === 4 && ajax.status === 200) {
                const res = JSON.parse(ajax.response);

                const yourRecordsHeader = document.getElementById('yourRecordsHeader');
                const sortYourRecords = document.getElementById('sortYourRecords');
                const yourRecords = document.getElementById('yourRecords');
    
                yourRecordsHeader.innerText = "Ваші записи:";
                sortYourRecords.innerHTML = res.sort;
                yourRecords.innerHTML = res.note;
            }
        };
        ajax.send(input);
    }
}

let startNote = "";

function changeNote() {
    const button = document.activeElement;

    const inputButtons = button.parentElement.querySelectorAll('input[type="button"]');

    let addFieldButton;
    let applyChangesButton;

    for (let i = 0; i < inputButtons.length; i++) {
        if (i == 2) {
            addFieldButton = inputButtons[i];
        }
        if (i == 3) {
            applyChangesButton = inputButtons[i];
        }
    }

    const params = button.parentElement.getElementsByTagName('strong');
    const values = button.parentElement.getElementsByTagName('em');

    button.hidden = true;
    button.nextElementSibling.hidden = true;

    const brBeforeAll = document.createElement('br');
    button.parentElement.insertBefore(brBeforeAll, button);

    for (let i = 0; i < params.length; i++) {
        const strongParent = params[i].parentElement;
        strongParent.hidden = true;

        let html = "";
        html += "<input type='button' value='Видалити поле' onclick='deleteField()'>";
        html += "<label for='inputParam" + (i + 1) + "'> Параметр : </label>";
        html += "<input type='text' id='inputParam" + (i + 1) + "' value='" + params[i].textContent + "'>";
        html += "<label for='inputValue" + (i + 1) + "'> Значення : </label>";
        html += "<input type='text' id='inputValue" + (i + 1) + "' value='" + values[i].textContent + "'>";

        const br = document.createElement('br');
    
        const div = document.createElement('div');
        div.innerHTML = html;
    
        button.parentElement.insertBefore(br, addFieldButton);
        button.parentElement.insertBefore(div, br);
    }

    addFieldButton.hidden = false;
    applyChangesButton.hidden = false;

    const breake = document.createElement('br');
    const brAfterCloseDiv = button.parentElement.nextElementSibling;
    brAfterCloseDiv.parentElement.insertBefore(breake, brAfterCloseDiv);

    const inputs = button.parentElement.querySelectorAll('input[type="text"]');

    startNote = "";

    for (let i = 0; i < inputs.length; i++) {
        if (i % 2 == 0) {
            startNote += inputs[i].value + "="; 
        } else {
            startNote += inputs[i].value;
            if (inputs.length > 1 && i + 1 < inputs.length) {
                startNote += "&";
            }
        }
    }
}

function deleteField() {
    const button = document.activeElement;
    const buttonParent = button.parentElement;

    buttonParent.parentElement.removeChild(buttonParent.nextElementSibling);
    buttonParent.parentElement.removeChild(buttonParent);
}

let count = 0;

function addField() {
    const button = document.activeElement;

    const inputs = button.parentElement.querySelectorAll('input[type="text"]');

    count = inputs.length / 2;

    let check = 1;

    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value.trim() === '') {
            check = 0;
        }
    }

    if (count > 1) {
        let checkArray = [];

        for (let i = 0; i < inputs.length; i++) {
            if (i % 2 == 0) {
                checkArray[i / 2] = inputs[i].value;
            }
        }
        
        for (let i = 1; i < checkArray.length; i++) {
            for (let j = 0; j < checkArray.length - 1; j++) {
                if (i != j) {
                    if (checkArray[i] == checkArray[j]) {
                        check = 0;
                    }
                }
            }
        }
    }

    if (check) {
        count++;

        let html = "";
        html += "<input type='button' value='Видалити поле' onclick='deleteField()'>";
        html += "<label for='inputParam" + count + "'> Параметр : </label>";
        html += "<input type='text' id='inputParam" + count + "'>";
        html += "<label for='inputValue" + count + "'> Значення : </label>";
        html += "<input type='text' id='inputValue" + count + "'>";

        const newDiv = document.createElement('div');
        newDiv.innerHTML = html;

        const br = document.createElement('br');

        button.parentElement.insertBefore(br, button);
        button.parentElement.insertBefore(newDiv, br);
    }
}

function applyNoteChanges() {
    const button = document.activeElement;

    const inputs = button.parentElement.querySelectorAll('input[type="text"]');
    
    count = inputs.length / 2;

    let check = 1;
    
    if (inputs.length == 0) {
        ajax.open("POST", "deleteNote.php");
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax.onreadystatechange = function() {
            if (ajax.readyState === 4 && ajax.status === 200) {
                const res = JSON.parse(ajax.response);

                const yourRecordsHeader = document.getElementById('yourRecordsHeader');
    
                if (res.note) {
                    const sortYourRecords = document.getElementById('sortYourRecords');
                    const yourRecords = document.getElementById('yourRecords');
    
                    yourRecordsHeader.innerText = "Ваші записи:";
                    sortYourRecords.innerHTML = res.sort;
                    yourRecords.innerHTML = res.note;
                } else {
                    yourRecordsHeader.innerText = "Записів ще не було";
                }
            }
        };
        ajax.send(startNote);

        return;
    }

    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value.trim() === '') {
            check = 0;
        }
    }

    if (count > 1) {
        let checkArray = [];

        for (let i = 0; i < inputs.length; i++) {
            if (i % 2 == 0) {
                checkArray[i / 2] = inputs[i].value;
            }
        }
        
        for (let i = 1; i < checkArray.length; i++) {
            for (let j = 0; j < checkArray.length - 1; j++) {
                if (i != j) {
                    if (checkArray[i] == checkArray[j]) {
                        check = 0;
                    }
                }
            }
        }
    }

    if (check) {
        let note = "";

        for (let i = 0; i < inputs.length; i++) {
            if (i % 2 == 0) {
                note += inputs[i].value + "=";
            } else {
                note += inputs[i].value;
                if (inputs.length > 1 && i + 1 < inputs.length) {
                    note += "&";
                }
            }
        }

        ajax.open("POST", "addNoteFields.php?" + startNote);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax.onreadystatechange = function() {
            if (ajax.readyState === 4 && ajax.status === 200) {
                const res = JSON.parse(ajax.response);

                const yourRecordsHeader = document.getElementById('yourRecordsHeader');
    
                if (res.note) {
                    const sortYourRecords = document.getElementById('sortYourRecords');
                    const yourRecords = document.getElementById('yourRecords');
    
                    yourRecordsHeader.innerText = "Ваші записи:";
                    sortYourRecords.innerHTML = res.sort;
                    yourRecords.innerHTML = res.note;
                } else {
                    yourRecordsHeader.innerText = "Записів ще не було";
                }
            }
        };
        ajax.send(note);
    }
}

function deleteNote() {
    const button = document.activeElement;
    const buttonParent = button.parentElement;

    const params = buttonParent.getElementsByTagName('strong');
    const values = buttonParent.getElementsByTagName('em');

    let note = "";

    for (let i = 0; i < params.length; i++) {
        note += params[i].textContent + "=" + values[i].textContent;

        if (params.length > 1 && i + 1 < params.length) {
            note += "&";
        }
    }

    const nextElement = buttonParent.nextElementSibling;

    buttonParent.parentElement.removeChild(nextElement);
    buttonParent.parentElement.removeChild(buttonParent);

    ajax.open("POST", "deleteNote.php");
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.onreadystatechange = function() {
        if (ajax.readyState === 4 && ajax.status === 200) {
            const res = JSON.parse(ajax.response);

            const yourRecordsHeader = document.getElementById('yourRecordsHeader');

            if (res.note) {
                const sortYourRecords = document.getElementById('sortYourRecords');
                const yourRecords = document.getElementById('yourRecords');

                yourRecordsHeader.innerText = "Ваші записи:";
                sortYourRecords.innerHTML = res.sort;
                yourRecords.innerHTML = res.note;
            } else {
                yourRecordsHeader.innerText = "Записів ще не було";
            }
        }
    };
    ajax.send(note);
}