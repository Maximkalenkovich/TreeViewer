// Основная функция для вывода дерева на страницу
function displayTree(jsonData) {
    const treeContainer = document.getElementById('treeContainer');

    // Функция для построения дерева
    function buildTree(data, parentId, container) {
        // Фильтруем данные для текущего узла
        const children = data.filter(item => item.head === parentId);

        // Сортируем дочерние элементы по полю sorthead
        children.sort((a, b) => a.sorthead - b.sorthead);

        // Создаем элементы дерева внутри контейнера
        const ul = document.createElement('ul');
        ul.classList.add('list-group')


        children.forEach(child => {
            const li = document.createElement('li');
            li.classList.add('list-group-item')
            li.textContent = `${child.name} (${child.price})`;
            ul.appendChild(li);

            if (child.node === 1) {
                buildTree(data, child.id, li);
            }
        });

        container.appendChild(ul);
    }

    buildTree(jsonData.services, null, treeContainer);
}

// Асинхронный запрос к файлу data.json
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const jsonData = JSON.parse(xhr.responseText);
        displayTree(jsonData);
    }
};
xhr.open('GET', 'data.json', true);
xhr.send();
