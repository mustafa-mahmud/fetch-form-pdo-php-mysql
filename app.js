'use strict';

const myForm = document.getElementById('myForm');
const insertName = document.getElementById('insert-name');
const insertPassword = document.getElementById('insert-password');
const submit = document.querySelector('input[type="submit"]');
const msg = document.getElementById('msg');
const show = document.getElementById('show');
const container = document.querySelector('.container');

const insertData = async (e) => {
  e.preventDefault();
  const update = myForm.classList.contains('update');

  if (insertName.value !== '' && insertPassword.value !== '' && !update) {
    const formData = new FormData(myForm);

    const res = await fetch('insert.php', {
      method: 'post',
      body: formData,
    });

    const data = await res.text();
    msg.textContent = data;

    setTimeout(() => {
      msg.textContent = '';
    }, 1000);

    container.innerHTML = '';
    insertName.value = insertPassword.value = '';
  }

  if (insertName.value !== '' && insertPassword.value !== '' && update) {
    const params = {
      name: insertName.value,
      password: insertPassword.value,
      id: myForm.getAttribute('target-id'),
    };

    const res = await fetch('update.php', {
      method: 'post',
      body: JSON.stringify(params),
      headers: {
        'Content-type': 'application/json',
      },
    });

    const data = await res.text();

    if (data === 'Update Successfully!') {
      msg.textContent = data;
      setTimeout(() => {
        msg.textContent = '';
      }, 1000);

      showAll();

      myForm.className = '';
      myForm.removeAttribute('target-id');
      submit.value = 'Insert';
    }
    console.log(data);
  }
};

const updateFunc = (id, name, password) => {
  myForm.className = 'update';
  myForm.setAttribute('target-id', id);
  insertName.value = name;
  insertPassword.value = password;
  submit.value = 'Edit';
};

const deleteFunc = async (id) => {
  const res = await fetch('delete.php', {
    method: 'post',
    body: id,
    headers: {
      'Content-type': 'application/txt',
    },
  });

  const data = await res.text();

  if (data) {
    msg.textContent = data;
    showAll();
    setTimeout(() => {
      msg.textContent = '';
    }, 1000);
  }
};

const showAll = async () => {
  const res = await fetch('select.php');
  const datas = await res.json();

  container.innerHTML = '';
  insertName.value = insertPassword.value = '';

  datas.forEach((data) => {
    container.innerHTML += `
		<p style="cursor:pointer">
		<span>Name: ${data.name}</span>
		<i>Password: ${data.password}</i>
		<span id="edit" onclick="updateFunc(${data.id},'${data.name}','${data.password}')">##</span>
		<span id="del" onclick="deleteFunc(${data.id})">--</span>
		</p>
		`;
  });
};

/////////////////
myForm.addEventListener('submit', insertData);
show.addEventListener('click', showAll);
