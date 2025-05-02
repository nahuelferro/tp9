document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const list = document.getElementById("contactList");
    const contactId = document.getElementById("contactId");
  
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  
    function renderContacts() {
      list.innerHTML = "";
      contacts.forEach((contact, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <strong>${contact.name}</strong><br>
          ${contact.email} | ${contact.dob}<br>
          <button onclick="editContact(${index})">Editar</button>
          <button onclick="deleteContact(${index})">Eliminar</button>
        `;
        list.appendChild(li);
      });
    }
  
    function saveToServer(data, action) {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:3000/contact");
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onload = () => console.log("Servidor:", xhr.responseText);
      xhr.send(JSON.stringify({ ...data, action }));
    }
  
    window.editContact = (index) => {
      const c = contacts[index];
      contactId.value = index;
      form.name.value = c.name;
      form.email.value = c.email;
      form.dob.value = c.dob;
    };
  
    window.deleteContact = (index) => {
      const id = index;
      saveToServer({ id }, "delete");
      contacts.splice(index, 1);
      localStorage.setItem("contacts", JSON.stringify(contacts));
      renderContacts();
    };
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const dob = form.dob.value;
  
      if (!name || !email || !dob) return alert("Todos los campos son obligatorios.");
  
      const data = { name, email, dob };
  
      const id = contactId.value;
      if (id !== "") {
        // actualizar
        contacts[id] = data;
        saveToServer({ id, ...data }, "update");
        contactId.value = "";
      } else {
        // agregar
        contacts.push(data);
        saveToServer(data, "add");
      }
  
      localStorage.setItem("contacts", JSON.stringify(contacts));
      form.reset();
      renderContacts();
    });
  
    renderContacts();
  });
  