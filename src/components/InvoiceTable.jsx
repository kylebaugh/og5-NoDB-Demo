import './InvoiceTable.css';
import axios from 'axios'

import AddButton from './AddButton.jsx';
import TableHeader from './TableHeader.jsx';
import TableRow from './TableRow.jsx'

import {useState, useEffect} from 'react'



const InvoiceTable = () => {
  // const {initialData} = props

  const [currentData, setCurrentData] = useState([])

  useEffect(() => {
    axios.get('/invoices')
      .then((res) => {
        console.log(res.data)

        setCurrentData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })

  }, [])



  const addRow = () => {

    axios.post('/invoice', {description: 'A really cool job'})
      .then((res) => {
        console.log(res.data)
        setCurrentData(res.data)
      })
      .catch((theseHands) => {
        console.log(theseHands)
      })

    // const dataCopy = [...currentData]

    // const newRow = {
    //     id: globalId,
    //     description: 'Description',
    //     rate: '',
    //     hours: ''
    // }

    // dataCopy.push(newRow)

    // setCurrentData(dataCopy)

    // globalId++
  }

  const deleteRow = (id) => {

    axios.delete(`/invoice/${id}`)
      .then((res) => {
        console.log(res.data)
        setCurrentData(res.data)
      })
      .catch((theseHands) => {
        console.log(theseHands)
      })

    // const filteredData = currentData.filter((row) => row.id !== id)
  }

  const rows = currentData.map((el) => <TableRow
    initialInvoiceData={el}
    initialEditMode={false}
    key={el.id}
    deleteRow={() => deleteRow(el.id)}
    currentData={currentData}
    setCurrentData={setCurrentData}
    />)


  return (
    <div>
        <table>
            <thead>
                <TableHeader />
            </thead>

            <tbody>
                {rows}
            </tbody>

            <tfoot>
                <AddButton addRow={addRow}/>
            </tfoot>
        </table>
    </div>
  )
}

export default InvoiceTable