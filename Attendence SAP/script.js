


document.getElementById('togglePassword').addEventListener('click', function() {
    const password = document.getElementById('password');
    if (password.type === 'password') {
        password.type = 'text';
    } else {
        password.type = 'password';
    }
});

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'Muhammad Yasir' && password === 'yasir123') {
        showModal('Admin login successful!', function() {
            window.location.href = 'register.html';
        });
    } else {
        showModal('Invalid username or password.');
    }
}

function registerStudent() {
    const student = {
        name: document.getElementById('name').value,
        rollNo: document.getElementById('rollno').value,
        class: document.getElementById('class').value,
        teacher: document.getElementById('teacher').value,
    };

    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));

    showModal('Student registered successfully!', function() {
        window.location.href = 'attendance.html';
    });
}

function submitAttendance() {
    const name = document.getElementById('attName').value;
    const rollNo = document.getElementById('attRollNo').value;

    let students = JSON.parse(localStorage.getItem('students')) || [];
    let student = students.find(s => s.name === name && s.rollNo === rollNo);

    if (student) {
        showModal('Your attendance has been generated.');
    } else {
        showModal('Your data is invalid.');
    }
}

function importExcel() {
    const file = document.getElementById('importExcel').files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const data = event.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });

        workbook.SheetNames.forEach(function(sheetName) {
            const rows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            localStorage.setItem('students', JSON.stringify(rows));
        });

        showModal('Data imported successfully!');
    };

    reader.readAsBinaryString(file);
}

function exportExcel() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const worksheet = XLSX.utils.json_to_sheet(students);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
    XLSX.writeFile(workbook, 'students.xlsx');
}

function showModal(message, callback) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    const closeBtn = document.getElementsByClassName('close')[0];

    modalMessage.textContent = message;
    modal.style.display = 'block';

    closeBtn.onclick = function() {
        modal.style.display = 'none';
        if (callback) callback();
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            if (callback) callback();
        }
    }
}
