let dataList = [
  {
    studentId: "sv01",
    fullName: "Ngoc Duc",
    email: "duc@gmail.com",
    phone: "0987654329",
    address: "Japan",
    gender: "Male",
  },
];
let action = "create";
let indexNumber = 0;

document.addEventListener("DOMContentLoaded", renderData);

function renderData() {
  let tbody = document.getElementById("tbody");
  tbody.innerHTML = "";
  for (let i = 0; i < dataList.length; i++) {
    tbody.innerHTML += `
    <tr>
    <td>${i + 1}</td>
    <td>${dataList[i].studentId}</td>
    <td>${dataList[i].fullName}</td>
    <td>${dataList[i].email}</td>
    <td>${dataList[i].phone}</td>
    <td>${dataList[i].address}</td>
    <td>${dataList[i].gender}</td>
    <td>
      <button onclick="editForm(${i})">Edit</button>
      <button onclick="deleteForm(${i})">Delete</button>
    </td>
    </tr>
    `;
  }
}
function validateForm() {
  let studentId = document.getElementById("studentId").value;
  let fullName = document.getElementById("fullName").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("address").value;
  if (studentId == "") {
    alert("Please Enter a student Id ");
    return false;
  }
  if (fullName == "" || fullName.length < 6) {
    alert("Please Enter a full name ");
    return false;
  }
  let rexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email == "" || !rexEmail.test(email)) {
    alert("Please Enter email ");
    return false;
  }
  let rexPhone = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/;
  if (phone == "" || phone.length < 10 || !rexPhone.test(phone)) {
    alert("Please Enter phone ");
    return false;
  }
  if (address == "") {
    alert("Please Enter address ");
    return false;
  }
  return true;
}
function createUpdateForm() {
  let studentId = document.getElementById("studentId").value;
  let fullName = document.getElementById("fullName").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("address").value;
  let gender = document.querySelector("input[name=gender]:checked").value;
  if (action === "create") {
    let dataItem = {
      studentId: studentId,
      fullName: fullName,
      email: email,
      phone: phone,
      address: address,
      gender: gender,
    };
    dataList.push(dataItem);
  } else {
    dataList[indexNumber].studentId = studentId;
    dataList[indexNumber].fullName = fullName;
    dataList[indexNumber].email = email;
    dataList[indexNumber].phone = phone;
    dataList[indexNumber].address = address;
    dataList[indexNumber].gender = gender;
    btnSave.setAttribute("value", "save");
    action = "create";
    indexNumber = 0;
  }
  renderData();
  resetForm();
}
function resetForm() {
  document.getElementById("studentId").value = "";
  document.getElementById("studentId").readOnly = false;
  document.getElementById("fullName").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("address").value = "";
  document.querySelector("input[name=gender]").checked = true;
}
function editForm(index) {
  indexNumber = index;

  document.getElementById("studentId").value = dataList[index].studentId;
  document.getElementById("studentId").readOnly = true;
  document.getElementById("fullName").value = dataList[index].fullName;
  document.getElementById("email").value = dataList[index].email;
  document.getElementById("phone").value = dataList[index].phone;
  document.getElementById("address").value = dataList[index].address;
  document.querySelector(
    `input[name=gender][value=${dataList[index].gender}]`
  ).checked = true;
  btnSave.setAttribute("value", "update");
  action = "update";
}
function deleteForm(index) {
  dataList.splice(index, 1);
  renderData();
}
let btnSave = document.getElementById("btnsave");
btnSave.addEventListener("click", function (e) {
  e.preventDefault();
  if (validateForm()) {
    createUpdateForm();
  }
});
