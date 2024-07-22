document.addEventListener('DOMContentLoaded', (event) => {
    const today = new Date().toISOString().split('T')[0];
    const datePrevueElement = document.getElementById('Date-prévue');
    if (datePrevueElement) {
        datePrevueElement.value = today;
    }

    const table1 = document.getElementById('table-1');
    const table2 = document.getElementById('table-2');
    const table3 = document.getElementById('table-3');

    if (table1) {
        table1.addEventListener('click', function() {
            const sectionTable1 = document.getElementById('section-table-1');
            const sectionTable2 = document.getElementById('section-table-2');
            const sectionTable3 = document.getElementById('section-table-3');

            if (sectionTable1) sectionTable1.style.display = 'block';
            if (sectionTable2) sectionTable2.style.display = 'none';
            if (sectionTable3) sectionTable3.style.display = 'none';

            table1.classList.add('table-active');
            if (table2) table2.classList.remove('table-active');
            if (table3) table3.classList.remove('table-active');
        });
    }

    if (table2) {
        table2.addEventListener('click', function() {
            const sectionTable1 = document.getElementById('section-table-1');
            const sectionTable2 = document.getElementById('section-table-2');
            const sectionTable3 = document.getElementById('section-table-3');
            const navigationCard = document.getElementById('navigation-card');

            if (sectionTable1) sectionTable1.style.display = 'none';
            if (sectionTable2) sectionTable2.style.display = 'block';
            if (sectionTable3) sectionTable3.style.display = 'none';
            if (navigationCard) navigationCard.style.display = 'none';

            if (table1) table1.classList.remove('table-active');
            table2.classList.add('table-active');
            if (table3) table3.classList.remove('table-active');
        });
    }

    if (table3) {
        table3.addEventListener('click', function() {
            const sectionTable1 = document.getElementById('section-table-1');
            const sectionTable2 = document.getElementById('section-table-2');
            const sectionTable3 = document.getElementById('section-table-3');
            const navigationCard = document.getElementById('navigation-card');

            if (sectionTable1) sectionTable1.style.display = 'none';
            if (sectionTable2) sectionTable2.style.display = 'none';
            if (sectionTable3) sectionTable3.style.display = 'block';
            if (navigationCard) navigationCard.style.display = 'none';

            if (table1) table1.classList.remove('table-active');
            if (table2) table2.classList.remove('table-active');
            table3.classList.add('table-active');
        });
    }
});
