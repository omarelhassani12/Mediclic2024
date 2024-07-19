// for today date

document.addEventListener('DOMContentLoaded', (event) => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('Date-prévue').value = today;
});


// for buttons navigation
document.getElementById('table-1').addEventListener('click', function() {
    document.getElementById('section-table-1').style.display = 'block';
    document.getElementById('section-table-2').style.display = 'none';
    document.getElementById('section-table-3').style.display = 'none';
    
    document.getElementById('table-1').classList.add('table-active');
    document.getElementById('table-2').classList.remove('table-active');
    document.getElementById('table-3').classList.remove('table-active');
});

document.getElementById('table-2').addEventListener('click', function() {
    document.getElementById('section-table-1').style.display = 'none';
    document.getElementById('section-table-2').style.display = 'block';
    document.getElementById('section-table-3').style.display = 'none';
    document.getElementById('navigation-card').style.display = 'none';
    document.getElementById('table-1').classList.remove('table-active');
    document.getElementById('table-2').classList.add('table-active');
    document.getElementById('table-3').classList.remove('table-active');
});

document.getElementById('table-3').addEventListener('click', function() {
    document.getElementById('section-table-1').style.display = 'none';
    document.getElementById('section-table-2').style.display = 'none';
    document.getElementById('section-table-3').style.display = 'block';
    document.getElementById('navigation-card').style.display = 'none';
    document.getElementById('table-1').classList.remove('table-active');
    document.getElementById('table-2').classList.remove('table-active');
    document.getElementById('table-3').classList.add('table-active');
});
