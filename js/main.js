

function newElement() {
    let taskValue = document.getElementById("task").value.trim();

    if (taskValue == null || taskValue == "") {
        showToast("Lütfen bir görev giriniz!")
    } else {
        // Yeni bir li (list item) öğesi oluştur
        var li = document.createElement("li");
        li.className = "d-flex justify-content-between"

        // Li öğesine task'yu içeren bir text node ekleyin
        var textNode = document.createTextNode(taskValue);
        li.appendChild(textNode);

        // Div öğresi oluştur
        var buttonsDiv = document.createElement("div");

        // Düzenle butonu oluştur
        var editButton = document.createElement("button");
        editButton.className = "btn btn-warning btn-sm";
        editButton.textContent = "Düzenle";
        editButton.addEventListener("click", function () {
            editTask(li);
        });

        // Div öğesine edit butonunu ekle
        buttonsDiv.appendChild(editButton);

        // Tamamlandı butonu oluştur
        var doneButton = document.createElement("button");
        doneButton.className = "btn btn-success btn-sm  mx-2";
        doneButton.textContent = "Tamamlandı";
        doneButton.addEventListener("click", function () {
            doneTask(li);
        })

        // Div öğesine doneButton öğesini ekle
        buttonsDiv.appendChild(doneButton);

        // Sil butonunu oluştur
        var deleteButton = document.createElement("button");
        deleteButton.className = "btn btn-danger btn-sm";
        deleteButton.textContent = "Sil";
        deleteButton.addEventListener("click", function () {
            deleteTask(li);
        });

        // Div öğesine sil butonunu ekle
        buttonsDiv.appendChild(deleteButton);

        // Li öğresine div öğresini ekle
        li.appendChild(buttonsDiv)

        // Oluşturulan li öğesini listeye (ul elementine) ekle
        document.getElementById("list").appendChild(li);

        // Input'u temizle
        document.getElementById("task").value = "";

        // Ekleme işlemi tamamlandığında bilgi ver
        showToast("Yeni görev eklendi: " + taskValue);

        addToDoLocalStorage(taskValue)
    }

}

let todos = [];

function addToDoLocalStorage(taskValue) {
    todos.push(taskValue);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function editTask(taskEdit) {
    var currentText = taskEdit.firstChild.nodeValue.trim();
    var newText = prompt("Görevi düzenle:", currentText);

    if (newText !== null) {
        taskEdit.firstChild.nodeValue = newText;
        showToast("Görev düzenlendi: " + newText);
    }
}

function deleteTask(taskItem) {
    taskItem.parentNode.removeChild(taskItem);
    showToast("Görev silindi");
}

function doneTask(taskDone) {
    taskDone.className = "checked d-flex justify-content-between";
}

function showToast(message) {
    // Toast elementini seç
    var toast = document.getElementById("myToast");

    // Toast içeriğini güncelle
    toast.querySelector(".toast-body").innerText = message;

    // Bootstrap Toast'u göster
    var bootstrapToast = new bootstrap.Toast(toast);
    bootstrapToast.show();
}
