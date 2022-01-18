// テーブル幅の調整
const table1 = document.getElementById("table1");
const table2 = document.getElementById("table2");
const resizeObserver1 = new ResizeObserver((e) => {
    table2.rows[1].cells[2].style.width = e[0].contentRect.width;
    table2.rows[0].style.height = e[0].contentRect.height;

});
const resizeObserver2 = new ResizeObserver((e) => {
    table2.rows[1].cells[3].style.width = e[0].contentRect.width;
    table2.rows[0].style.height = e[0].contentRect.height;
});
resizeObserver1.observe(document.getElementById("textarea1"));
resizeObserver2.observe(document.getElementById("textarea2"));


// チェックボックスにイベントリスナーを付与する
const checkbox1 = document.getElementById("checkbox1");
checkbox1.addEventListener('change', (e) => {
    setValue(e);
});


// 10行追加する
const tbody1 = document.getElementById("tbody1");
const tbody2 = document.getElementById("tbody2");
const trsNum = tbody1.children.length; // 3行
let rowNum = 10;

for (let i = 1; i < rowNum; i++) {
    addNewRow(i);
}

function addNewRow(i) {
    for (let j = 0; j < trsNum; j++) {
        // 左側のテーブル
        let trs1 = tbody1.children[j].cloneNode(true);
        if (j == 0) {
            // 連番を振る
            trs1.children[1].textContent = i + 1;
            // チェックボックスにイベントリスナーを付与する
            trs1.children[0].children[0].addEventListener('change', (e) => {
                setValue(e);
            });
        }
        tbody1.appendChild(trs1);

        // 右側のテーブル
        let trs2 = tbody2.children[j].cloneNode(true);
        if (j == 0) trs2.children[1].textContent = i + 1;
        tbody2.appendChild(trs2);
    }
}

function removeRows(num) {
    for (let i = 0; i < num; i++) {
        for (let j = 0; j < trsNum; j++) {
            tbody1.lastChild.remove();
            tbody2.lastChild.remove();
        }
    }
}

// 行追加・行削除
let inputRowNum = 10;
const input1 = document.getElementById("input1");
input1.addEventListener('input', function(e) {
    inputRowNum = Number(e.target.value);
    if (Number.isInteger(inputRowNum) && inputRowNum > 0) { // 非負の整数なら
        if (rowNum < inputRowNum) { // 多いなら行追加
            for (let i = rowNum; i < inputRowNum; i++) {
                addNewRow(Number(i));
            }
        } else if (rowNum > inputRowNum) { // 少ないなら行削除
            removeRows(rowNum - inputRowNum);
        }
        rowNum = inputRowNum;
    }
});

// 表示・非表示
function setValue(e) {
    const cellNum = 3;
    // セルの行番号、列番号、値を抽出
    let ele = [
        e.target.parentNode.parentNode.children[2],
        e.target.parentNode.parentNode.nextElementSibling.nextElementSibling.children[0],
        e.target.parentNode.parentNode.children[3]
    ];
    let cells = [];
    for (let i = 0; i < cellNum; i++) {
        cells.push({
            rowNum: ele[i].parentNode.rowIndex,
            colNum: ele[i].cellIndex,
            value: ele[i].children[0].value
        })
    }
    console.log(cells);

    // 表示
    let flag = e.target.checked;
    if (flag) {
        for (let i = 0; i < cellNum; i++) {
            table2.rows[cells[i].rowNum].cells[cells[i].colNum].children[0].textContent =
                cells[i].value;
        }
    }
};