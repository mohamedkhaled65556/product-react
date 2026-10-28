import { useRef, useState } from "react";

export default function App() {
  const [products, setProducts] = useState([{ name: "iphone", price: 300, qty: 10 },
  { name: "iphone11", price: 400, qty: 10 },
  { name: "iphone12", price: 500, qty: 20 },
  ])

  let nameInput = useRef()
  let priceInput = useRef()
  let qtyInput = useRef()

  const AddNewPhone = () => {
    let copy = [...products]
    let newPhone = {
      name: nameInput.current.value,
      price: priceInput.current.value,
      qty: qtyInput.current.value,
    }
    copy.push(newPhone)
    setProducts(copy)
  }
  return (
    <>
      <div
        className="w-full h-dvh bg-red-800 p-5 font-semibold">
        <header className="text-amber-500 text-6xl font-bold text-center p-4  bg-red-700 drop-shadow-2xl border-5 border-dashed">Your Product</header>
        <div
          className="container"
        >
          <button
            className="btn btn-info my-3"
            onClick={() => document.getElementById("new_phone_modal").showModal()}
          >
            Add New Phone
          </button>
          <table
            className="table table-warning"
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
                          onClick={() => {
                            let isSure = confirm("Are you Sure ?")
                            if (isSure) {
                              let copy = [...products]
                              copy.splice(index, 1)
                              setProducts(copy);
                            }
                            else return;
                          }}>Remove</button>
                        <button className="btn btn-warning">Edit</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
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
    </>
  )
}
