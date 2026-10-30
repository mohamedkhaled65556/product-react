import { useRef, useState } from "react";

export default function App() {
  const [products, setProducts] = useState([
    { name: "Iphone x", price: 300, qty: 10 },
    { name: "Iphone 11", price: 400, qty: 10 },
    { name: "Iphone 12", price: 500, qty: 20 },
  ]);

  const [copyProducts, setCopyProducts] = useState([...products])

  let nameInput = useRef();
  let priceInput = useRef();
  let qtyInput = useRef();
  let searchInput = useRef();
  const [list, setList] = useState(products)

  const [globalIndex, setGlobalIndex] = useState(null);
  let editNameInput = useRef();
  let editPriceInput = useRef();
  let editQtyInput = useRef();

  const AddNewPhone = () => {
    let copy = [...products];
    let newPhone = {
      name: nameInput.current.value,
      price: +priceInput.current.value,
      qty: +qtyInput.current.value,
    };
    let productsName = copy.filter((el) => {
      return (el.name.toLowerCase().replace(/\s/g, "") == newPhone.name.toLowerCase().replace(/\s/g, ""))
    })
    if (productsName.length == 0) {
      productsName = [{ name: "" }]
    }
    let isFound = productsName[0].name.toLowerCase().replace(/\s/g, "") == newPhone.name.toLowerCase().replace(/\s/g, "")
    if (!isFound) {
      if (newPhone.name === "") {
        alert("Name cannot be empty");
      } else if (newPhone.price === 0) {
        alert("Price cannot be empty");
      } else if (newPhone.qty === 0) {
        alert("Qty cannot be empty");
      } else {
        nameInput.current.value = "";
        priceInput.current.value = "";
        qtyInput.current.value = "";
        copy.push(newPhone);
        setProducts(copy);
        setCopyProducts(copy)
        setList(copy)
      }
    }
    else {
      if (newPhone.name === "") {
        alert("Name cannot be empty");
        return
      }
      alert("This Product is already ")
      nameInput.current.value = "";
      priceInput.current.value = "";
      qtyInput.current.value = "";
    }
  };

  const RemoveProduct = (index) => {
    let isSure = confirm("Are you Sure ?");
    if (isSure) {
      let copy = [...products];
      copy.splice(index, 1);
      setProducts(copy);
      setCopyProducts(copy)
      setList(copy)
    } else return;
  };

  const [change, setChange] = useState(null)
  const GetElement = (index) => {
    setGlobalIndex(index);
    editNameInput.current.value = products[index].name;
    editPriceInput.current.value = +products[index].price;
    editQtyInput.current.value = +products[index].qty;
    setChange({ name: products[index].name, price: +products[index].price, qty: products[index].qty })
  }

  const EditProduct = () => {
    if (editNameInput.current.value === "") {
      alert("Name cannot be empty");
    } else if (editPriceInput.current.value === "") {
      alert("Price cannot be empty");
    } else if (editQtyInput.current.value === "") {
      alert("Qty cannot be empty");
    } else {
      let copy = [...products];
      copy[globalIndex].name = editNameInput.current.value;
      copy[globalIndex].price = +editPriceInput.current.value;
      copy[globalIndex].qty = +editQtyInput.current.value;
      if (change.name === copy[globalIndex].name && change.price === copy[globalIndex].price && change.qty === copy[globalIndex].qty) {
        alert("بتختار ايديت ليه وانت مش عايز تغير حاجه😡😡")
      }
      setProducts(copy);
    }
  };

  return (
    <div className="w-150 h-[190vh] md:h-dvh lg:h-dvh md:w-full lg:w-full bg-red-800 p-10 font-semibold">
      <header className="text-amber-400 text-6xl font-bold text-center p-4  bg-red-700 drop-shadow-2xl border-5 border-dashed">
        Your Product
      </header>
      <div className="container mx-3 mt-[5%] xl:px-20">
        <div className="flex justify-between items-center">
          <button
            className="btn btn-warning my-3 mx-3"
            onClick={() => document.getElementById("new_phone_modal").showModal()}
          >
            Add New Phone
          </button>
          <button className="btn btn-circle m-3 p-6"
            onClick={() => {
              setProducts(copyProducts)
              searchInput.current.value = ""
            }}>Show All</button>
          <div>
            <input type="text" className="input rounded-2xl w-45 mr-1"
              placeholder="Enter Phone Name"
              ref={searchInput}
              list="search-list" />
            <datalist id="search-list"
              onClick={() => {
                setList(products.filter((el) => {
                  return el.name.toLowerCase().replace(/\s/g, "").includes(
                    searchInput.current.value.toLowerCase().replace(/\s/g, "")
                  );
                }))
              }}>
              {
                list.map((el, index) => {
                  return (
                    <option key={index} value={el.name}></option>
                  )
                })
              }
            </datalist>
            <button className="btn btn-error"
              onClick={() => {
                let result = products.filter((el) => {
                  return el.name.toLowerCase().replace(/\s/g, "").includes(
                    searchInput.current.value.toLowerCase().replace(/\s/g, "")
                  );
                });
                setProducts(result)
              }
              }>Search</button>
          </div>
        </div>
        <table className="table table-fixed w-110 md:w-150 lg:w-240 xl:w-350">
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
            {products.map((el, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{el.name}</td>
                  <td>{el.price}$</td>
                  <td>{el.qty}</td>
                  <td className="flex justify-center gap-4">
                    <button
                      className="btn btn-error"
                      onClick={() => RemoveProduct(index)}
                    >
                      Remove
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() => {
                        document.getElementById("edit_phone_modal").showModal();
                        GetElement(index);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
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
              <button className="btn btn-success" onClick={AddNewPhone}>
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
              <button className="btn btn-success" onClick={EditProduct}>
                Save
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
