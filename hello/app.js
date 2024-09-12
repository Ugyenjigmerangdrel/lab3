const apiUrl = "http://172.19.23.109/students";

// Fetch and display students
function fetchStudents() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const studentsTableBody = document.getElementById("studentsTableBody");
      studentsTableBody.innerHTML = ""; // Clear the table before adding new data

      data.forEach((student) => {
        const row = document.createElement("tr");
        row.innerHTML = `
         
          <td>${student.name}</td>
          <td>${student.age}</td>
          <td>${student.email}</td>
          <td>${student.contact}</td>
        `;
        studentsTableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error fetching students:", error));
}

// Create a new student
document
  .getElementById("createStudentForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const email = document.getElementById("email").value;
    const contact = document.getElementById("contact").value;

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, age, email, contact }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Student created: " + JSON.stringify(data));
        fetchStudents(); // Refresh the table after creating a student
      })
      .catch((error) => console.error("Error:", error));
  });

// Load the students list when the page loads
window.onload = fetchStudents;
