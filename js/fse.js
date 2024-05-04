document.addEventListener("DOMContentLoaded", function() {
    const montantCells = document.querySelectorAll(".data-table td:nth-child(5)");
    const rembourserCells = document.querySelectorAll(".data-table td:nth-child(8)");
    const rembourseCells = document.querySelectorAll(".data-table td:nth-child(9)");
    const resteCells = document.querySelectorAll(".data-table td:nth-child(10)");
    const rembourser1Cells = document.querySelectorAll(".data-table td:nth-child(13)");
    const rembourse1Cells = document.querySelectorAll(".data-table td:nth-child(14)");
    const reste1Cells = document.querySelectorAll(".data-table td:nth-child(15)");

    // Calculate the sum of each column
    let totalMontant = 0;
    let totalRembourser = 0;
    let totalRembourse = 0;
    let totalReste = 0;
    let totalRembourser1 = 0;
    let totalRembourse1 = 0;
    let totalReste1 = 0;

    const addValueIfNumeric = (value, total) => {
        if (!isNaN(parseFloat(value))) {
            total += parseFloat(value);
        }
        return total;
    };

    montantCells.forEach(cell => {
        totalMontant = addValueIfNumeric(cell.textContent, totalMontant);
    });

    rembourserCells.forEach(cell => {
        totalRembourser = addValueIfNumeric(cell.textContent, totalRembourser);
    });

    rembourseCells.forEach(cell => {
        totalRembourse = addValueIfNumeric(cell.textContent, totalRembourse);
    });

    resteCells.forEach(cell => {
        totalReste = addValueIfNumeric(cell.textContent, totalReste);
    });

    rembourser1Cells.forEach(cell => {
        totalRembourser1 = addValueIfNumeric(cell.textContent, totalRembourser1);
    });

    rembourse1Cells.forEach(cell => {
        totalRembourse1 = addValueIfNumeric(cell.textContent, totalRembourse1);
    });

    reste1Cells.forEach(cell => {
        totalReste1 = addValueIfNumeric(cell.textContent, totalReste1);
    });

    console.log("Total Rembourser 1:", totalRembourser1);
    const totalRembourser1Element = document.querySelector(".total-a-rembourser-1");
    console.log("Total Rembourser 1 Element:", totalRembourser1Element);

    // for update the content of the spans
    document.querySelector(".total-montant").textContent = totalMontant.toFixed(2);
    document.querySelector(".total-a-rembourser").textContent = totalRembourser.toFixed(2);
    document.querySelector(".total-rembourse").textContent = totalRembourse.toFixed(2);
    document.querySelector(".total-reste").textContent = totalReste.toFixed(2);
    document.querySelector(".total-a-rembourser-1").textContent = totalRembourser1.toFixed(2);
    document.querySelector(".total-rembourse-1").textContent = totalRembourse1.toFixed(2);
    document.querySelector(".total-reste-1").textContent = totalReste1.toFixed(2);
});
