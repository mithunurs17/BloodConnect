// main.js

document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('searchForm');
    const resultsDiv = document.getElementById('results');

    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(searchForm);
        const searchParams = new URLSearchParams(formData).toString();

        fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: searchParams,
        })
        .then(response => response.json())
        .then(data => {
            renderSearchResults(data);
        })
        .catch(error => {
            console.error('Error searching donors:', error);
            renderSearchResults([]);
        });
    });

    function renderSearchResults(results) {
        resultsDiv.innerHTML = '';
        if (results.length === 0) {
            resultsDiv.innerHTML = '<p class="no-results">No donors found matching your criteria.</p>';
            return;
        }

        const table = document.createElement('table');
        table.className = 'donor-table';
        
        // Create table header
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Name</th>
                <th>Blood Group</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
            </tr>
        `;
        table.appendChild(thead);

        // Create table body
        const tbody = document.createElement('tbody');
        results.forEach(donor => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${donor.firstName} ${donor.lastName}</td>
                <td>${donor.bloodGroup}</td>
                <td>${donor.phone}</td>
                <td>${donor.email}</td>
                <td>${donor.district}, ${donor.city}, ${donor.state}, ${donor.country}</td>
            `;
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        resultsDiv.appendChild(table);
    }
});
