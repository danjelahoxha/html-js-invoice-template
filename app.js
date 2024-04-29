//Add new row
const tBody = document.getElementById('table-body')

addNewRow = () => {
  const row = document.createElement('tr')
  const rowNum = tBody.querySelectorAll('tr').length

  row.className = 'single-row'
  row.id = `row-${rowNum}`
  row.innerHTML = `<td><input type="text" placeholder="Product name" class="product"  ></td>
                    <td><input type="number" placeholder="0" name="unit" class="unit"   onkeyup="getInput()"></td>
                    <td><input type="number" placeholder="0" name="price" class="price"  onkeyup="getInput()"></td>
                    <td><input type="number" placeholder="0" name="amount" class="amount" disabled></td>
                    <td style="text-align: right;"><span class="material-icons" action="delete">delete_outline</span></td>`

  tBody.insertBefore(row, tBody.lastElementChild.previousSibling)
}

document.getElementById('add-row').addEventListener('click', (e) => {
  e.preventDefault()
  addNewRow()
})

//GET INPUTS, MULTIPLY AND GET THE ITEM PRICE
getInput = () => {
  var rows = document.querySelectorAll('tr.single-row')
  rows.forEach((currentRow) => {
    var unit = currentRow.querySelector('.unit').value
    var price = currentRow.querySelector('.price').value

    amount = unit * price
    currentRow.querySelector('.amount').value = amount
    overallSum()
  })
}

//Get the overall sum/Total
overallSum = () => {
  var arr = document.getElementsByName('amount')
  var total = 0
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].value) {
      total += +arr[i].value
    }
    document.getElementById('total').value = total
  }
}

//Delete row from the table
tBody.addEventListener('click', (e) => {
  let el = e.target

  const deleteROW = e.target?.attributes?.action?.value
  if (deleteROW == 'delete') {
    delRow(el)
    overallSum()
  }
})

//Target row and remove from DOM;
delRow = (el) => {
  el.parentNode.parentNode.parentNode.removeChild(el.parentNode.parentNode)
}

document.getElementById('saveInvoice').addEventListener('click', (e) => {
  const saveButton = document.getElementById('saveInvoice')
  if (saveButton) {
    saveButton.addEventListener('click', saveInvoice)
  } else {
    console.error('Save button not found')
  }
})

function getCurrentYearSuffix() {
  const year = new Date().getFullYear()
  return year.toString().slice(-2)
}
function getNextInvoiceNumber() {
  const yearSuffix = getCurrentYearSuffix()
  const key = 'invoiceNumber-' + yearSuffix
  let lastNumber = parseInt(localStorage.getItem(key)) || 0
  lastNumber++ // Increment the number for new invoice
  // localStorage.setItem(key, lastNumber.toString()) // Save the updated number back to localStorage

  // Format the number as four digits (e.g., '0001')
  const formattedNumber = lastNumber.toString().padStart(4, '0')
  return `${yearSuffix}-${formattedNumber}`
}

function saveInvoice() {
  const invoiceNumber = document.querySelector('.invoice-number').textContent
  const date = document.querySelector('.date').textContent
  const products = []

  const yearSuffix = getCurrentYearSuffix()
  const key = 'invoiceNumber-' + yearSuffix
  let lastNumber = parseInt(localStorage.getItem(key)) || 0
  lastNumber++
  localStorage.setItem(key, lastNumber.toString())

  const rows = document.querySelectorAll('#table-body .single-row')
  rows.forEach((row) => {
    const product = row.querySelector('.product').value
    const unit = row.querySelector('.unit').value
    const price = row.querySelector('.price').value
    const amount = row.querySelector('.amount').value

    if (product && unit && price) {
      // Only save rows with complete data
      products.push({ product, unit, price, amount })
    }
  })

  const total = document.getElementById('total').value

  const invoice = {
    number: invoiceNumber,
    date: date,
    currency: 'EURO',
    total: total,
  }

  // Save to local storage
  let invoices = JSON.parse(localStorage.getItem('invoices')) || []
  invoices.push(invoice)
  localStorage.setItem('invoices', JSON.stringify(invoices))
  window.location.href = 'index.html'
}

document.addEventListener('DOMContentLoaded', function () {
  const invoiceNumber = getNextInvoiceNumber()
  document.getElementById('invoice-number').textContent = `${invoiceNumber}`
})
