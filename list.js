document.addEventListener('DOMContentLoaded', function () {
  loadInvoices()
})

function loadInvoices() {
  const tableBody = document.getElementById('table-body')

  // Load invoices from local storage
  const invoices = JSON.parse(localStorage.getItem('invoices')) || []
  console.log(invoices)
  // Clear existing rows in table body
  tableBody.innerHTML = ''

  // Create a table row for each invoice
  invoices.forEach((invoice, index) => {
    const row = document.createElement('tr')
    row.className = 'single-row'
    row.id = 'row-' + (index + 1)

    const numberCell = document.createElement('td')
    numberCell.textContent = invoice.number

    const dateCell = document.createElement('td')
    dateCell.textContent = invoice.date

    const currencyCell = document.createElement('td')
    currencyCell.textContent = invoice.currency

    const totalCell = document.createElement('td')
    totalCell.textContent = invoice.total

    const actionCell = document.createElement('td')
    actionCell.style.textAlign = 'right'

    const deleteIcon = document.createElement('span')
    deleteIcon.classList.add('material-icons')
    deleteIcon.textContent = 'delete_outline'
    deleteIcon.id = 'delete-row-' + (index + 1)
    deleteIcon.addEventListener('click', function () {
      deleteInvoice(index)
    })

    actionCell.appendChild(deleteIcon)

    row.appendChild(numberCell)
    row.appendChild(dateCell)
    row.appendChild(currencyCell)
    row.appendChild(totalCell)
    row.appendChild(actionCell)

    tableBody.appendChild(row)
  })
}

function deleteInvoice(index) {
  let invoices = JSON.parse(localStorage.getItem('invoices')) || []
  invoices.splice(index, 1) // Remove the invoice
  localStorage.setItem('invoices', JSON.stringify(invoices)) // Update local storage
  document.getElementById('row-' + (index + 1)).remove() // Remove the row from the table
}
