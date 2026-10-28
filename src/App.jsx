import { useRef, useState } from "react";

export default function App() {
  const [products, setProducts] = useState([{ name: "Iphone x", price: 300, qty: 10 },
  { name: "Iphone 11", price: 400, qty: 10 },
  { name: "Iphone 12", price: 500, qty: 20 },
  ])

  let nameInput = useRef()
  let priceInput = useRef()
  let qtyInput = useRef()

  const [globalIndex, setGlobalIndex] = useState(null)
  let editNameInput = useRef()
  let editPriceInput = useRef()
  let editQtyInput = useRef()

  const AddNewPhone = () => {
    let copy = [...products]
    let newPhone = {
      name: nameInput.current.value,
      price: priceInput.current.value,
      qty: qtyInput.current.value,
    }
    if (newPhone.name === "") {
      alert("Name cannot be empty")
    }
    else if (newPhone.price === '') {
      alert("Price cannot be empty")

    }
    else if (newPhone.qty === '') {
      alert("Qty cannot be empty")
    }
    else {
      nameInput.current.value = ''
      priceInput.current.value = ''
      qtyInput.current.value = ''
      copy.push(newPhone)
      setProducts(copy)
    }
  }

  const RemoveProduct = (index) => {
    let isSure = confirm("Are you Sure ?")
    if (isSure) {
      let copy = [...products]
      copy.splice(index, 1)
      setProducts(copy);
    }
    else return
  }

  const GetElement = (index) => {
    setGlobalIndex(index)
    editNameInput.current.value = products[index].name
    editPriceInput.current.value = products[index].price
    editQtyInput.current.value = products[index].qty
  }

  const EditProduct = () => {
    if (editNameInput.current.value === "") {
      alert("Name cannot be empty")
    }
    else if (editPriceInput.current.value === '') {
      alert("Price cannot be empty")

    }
    else if (editQtyInput.current.value === '') {
      alert("Qty cannot be empty")
    }
    else {
      let copy = [...products]
      copy[globalIndex].name = editNameInput.current.value
      copy[globalIndex].price = editPriceInput.current.value
      copy[globalIndex].qty = editQtyInput.current.value
      setProducts(copy)
    }
  }

  return (
    <div
      className="w-full h-dvh bg-red-800 p-10 font-semibold">
      <header className="text-amber-500 text-6xl font-bold text-center p-4  bg-red-700 drop-shadow-2xl border-5 border-dashed">Your Product</header>
      <div
        className="container p-20"
      >
        <button
          className="btn btn-info my-3"
          onClick={() => document.getElementById("new_phone_modal").showModal()}
        >
          Add New Phone
        </button>
        <table
          className="table table-fixed table-md"
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Qty</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              products.map((el, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{el.name}</td>
                    <td>{el.price}$</td>
                    <td>{el.qty}</td>
                    <td className="flex justify-center gap-4">
                      <button className="btn btn-error"
                        onClick={() => RemoveProduct(index)}>Remove</button>
                      <button className="btn btn-warning"
                        onClick={() => {
                          document.getElementById("edit_phone_modal").showModal()
                          GetElement(index);
                        }}>Edit</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      <dialog id="new_phone_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Phone</h3>
          <div className="modal-action">
            <form method="dialog" className="flex flex-col gap-3 w-full">
              <input
                type="text"
                placeholder="Enter new phone name"
                className="input w-full"
                ref={nameInput}
              />
              <input
                type="number"
                placeholder="Enter new phone price"
                className="input w-full"
                ref={priceInput}
              />
              <input
                type="number"
                placeholder="Enter new phone qty"
                className="input w-full"
                ref={qtyInput}
              />
              <button className="btn btn-success"
                onClick={AddNewPhone}>
                Save
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id="edit_phone_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Phone</h3>
          <div className="modal-action">
            <form method="dialog" className="flex flex-col gap-3 w-full">
              <input
                type="text"
                placeholder="Enter edited phone name"
                className="input w-full"
                ref={editNameInput}
              />
              <input
                type="number"
                placeholder="Enter edited phone price"
                className="input w-full"
                ref={editPriceInput}
              />
              <input
                type="number"
                placeholder="Enter edited phone qty"
                className="input w-full"
                ref={editQtyInput}
              />
              <button className="btn btn-success"
                onClick={EditProduct}>
                Save
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}
