// 获取表单和按钮元素
const form = document.getElementById('character-sheet');
const saveButton = document.getElementById('save-button');
const exportButton = document.getElementById('export-button');

// 保存数据到 LocalStorage
function saveData() {
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    localStorage.setItem('characterData', JSON.stringify(data));
    alert('角色数据已保存！');
}

// 加载保存的数据
function loadData() {
    const savedData = localStorage.getItem('characterData');
    if (savedData) {
        const data = JSON.parse(savedData);
        for (const key in data) {
            if (form.elements[key]) {
                form.elements[key].value = data[key];
            }
        }
        alert('角色数据已加载！');
    }
}

// 导出数据为 TXT 文件
function exportData() {
    const savedData = localStorage.getItem('characterData');
    if (savedData) {
        const data = JSON.parse(savedData);
        let txtContent = '';

        // 将数据格式化为文本
        for (const key in data) {
            txtContent += `${key}: ${data[key]}\n`;
        }

        // 创建 Blob 并下载
        const blob = new Blob([txtContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'character_sheet.txt';
        a.click();
        URL.revokeObjectURL(url);
        alert('角色数据已导出为 TXT 文件！');
    } else {
        alert('没有保存的角色数据！');
    }
}

// 绑定事件
saveButton.addEventListener('click', saveData);
exportButton.addEventListener('click', exportData);

// 页面加载时自动加载数据
window.addEventListener('load', loadData);