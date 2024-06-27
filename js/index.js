document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            console.log('Start Date Element:', document.getElementById('startDate'));
            console.log('End Date Element:', document.getElementById('endDate'));
            console.log('Status Element:', document.getElementById('status'));


            const startDateValue = document.getElementById('startDate').value;
            const endDateValue = document.getElementById('endDate').value;
            const statusValue = document.getElementById('status').value;

            console.log('Start Date:', startDateValue);
            console.log('End Date:', endDateValue);
            console.log('Status:', statusValue);
        });
    } else {
        console.log('searchBtn element not found');
    }
});

function toggleDropdown(contentId, iconId) {
    var dropdownContent = document.getElementById(contentId);
    var dropdownIcon = document.getElementById(iconId);

    if (dropdownContent && dropdownIcon) {
        dropdownContent.classList.toggle("active");

        if (dropdownContent.classList.contains("active")) {
            dropdownContent.style.display = "block";
            dropdownIcon.classList.add("rotate-icon");
        } else {
            dropdownContent.style.display = "none";
            dropdownIcon.classList.remove("rotate-icon");
        }
    } else {
        console.log('One or more elements not found');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pagesContainer = document.querySelector('.pages');
    const tableRows = document.querySelectorAll('#tableBody tr');
    const rowsPerPage = 10;
    let currentPage = 1;

    if (prevBtn && nextBtn && pagesContainer && tableRows) {
        function showPage(pageNumber) {
            const startIndex = (pageNumber - 1) * rowsPerPage;
            const endIndex = pageNumber * rowsPerPage;

            tableRows.forEach((row, index) => {
                if (index >= startIndex && index < endIndex) {
                    row.style.display = 'table-row';
                } else {
                    row.style.display = 'none';
                }
            });
        }

        function updatePagesNavigation(totalPages) {
            pagesContainer.innerHTML = '';

            const maxDisplayedPages = 5;
            const ellipsisThreshold = 2;
            let startPage = 1;
            let endPage = totalPages;

            if (totalPages > maxDisplayedPages) {
                endPage = Math.min(maxDisplayedPages - 1, totalPages); // Displaying first 4 pages
                if (currentPage > ellipsisThreshold) {
                    startPage = currentPage - ellipsisThreshold;
                    if (totalPages - startPage > maxDisplayedPages - 2) {
                        endPage = startPage + maxDisplayedPages - 2;
                    } else {
                        endPage = totalPages;
                        startPage = endPage - maxDisplayedPages + 3;
                    }
                }
            }

            for (let i = startPage; i <= endPage; i++) {
                const pageNumberElement = document.createElement('span');
                pageNumberElement.textContent = i;
                pageNumberElement.classList.add('page-number');
                if (i === currentPage) {
                    pageNumberElement.classList.add('current-page');
                }
                pagesContainer.appendChild(pageNumberElement);

                // Add event listener to the page number element
                pageNumberElement.addEventListener('click', () => {
                    const pageNumber = parseInt(pageNumberElement.textContent);
                    goToPage(pageNumber);
                });
            }

            if (endPage < totalPages) {
                const ellipsisElement2 = document.createElement('span');
                ellipsisElement2.textContent = '...';
                ellipsisElement2.classList.add('ellipsis');
                pagesContainer.appendChild(ellipsisElement2);

                const lastPageElement = document.createElement('span');
                lastPageElement.textContent = totalPages;
                lastPageElement.classList.add('page-number');
                pagesContainer.appendChild(lastPageElement);
            }

            if (currentPage === 1) {
                prevBtn.disabled = true;
                prevBtn.style.color = '#858C95';
            } else {
                prevBtn.disabled = false;
                prevBtn.style.color = '#3D8CEF';
            }

            if (currentPage === totalPages) {
                nextBtn.disabled = true;
                nextBtn.style.color = '#858C95';
            } else {
                nextBtn.disabled = false;
                nextBtn.style.color = '#3D8CEF';
            }
        }

        function goToPage(pageNumber) {
            currentPage = pageNumber;
            showPage(currentPage);
            updatePagesNavigation(Math.ceil(tableRows.length / rowsPerPage));
        }

        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                goToPage(currentPage - 1);
            }
        });

        nextBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(tableRows.length / rowsPerPage);
            if (currentPage < totalPages) {
                goToPage(currentPage + 1);
            }
        });

        updatePagesNavigation(Math.ceil(tableRows.length / rowsPerPage));
        showPage(currentPage);
    } else {
        console.log('One or more elements not found');
    }
});