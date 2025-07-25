import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";

export const ItemCard = ({
  item_id,
  brand,
  type,
  model,
  horsepower,
  inverter,
  supplier_id,
  is_removed,
  suppliers, // This is the suppliers array passed from parent
  onEdit,
  onDelete
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [formData, setFormData] = useState({
    brand,
    type,
    model,
    horsepower,
    inverter,
    supplier_id
  });

  // Check if item is removed/disabled
  const isDisabled = is_removed === 1 || is_removed === true;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isDisabled) return; // Prevent submission if disabled
    // Include item_id in the data passed to onEdit
    onEdit({ ...formData, item_id });
    setIsOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (isDisabled) return; // Prevent deletion if disabled
    // Pass item_id to onDelete so parent knows which item to delete
    onDelete(item_id);
    setIsDeleteOpen(false);
  };

  // Reset form data when modal opens
  const handleEditOpen = () => {
    if (isDisabled) return; // Prevent edit if disabled
    setFormData({
      brand,
      type,
      model,
      horsepower,
      inverter,
      supplier_id
    });
    setIsOpen(true);
  };

  // Find supplier name by supplier_id
  const getSupplierName = (supplierId) => {
    const supplier = suppliers?.find(s => s.supplier_id === supplierId);
    return supplier ? supplier.company_name : 'Unknown Supplier';
  };

  return (
    <>
      <div className={`grid grid-cols-13 gap-2 p-3 border-b border-gray-200 text-sm justify-center ${
        isDisabled 
          ? 'bg-gray-100 opacity-60 cursor-not-allowed' 
          : 'hover:bg-gray-50'
      }`}>
        {/* Item ID */}
        <div className="col-span-2 flex items-center justify-center text-center">
          <p className={`text-lg font-alegreya-sans-sc ${
            isDisabled ? 'text-gray-400' : 'text-cbvt-blue'
          }`}>
            AC-{item_id}
            {isDisabled && <span className="text-xs text-red-500 ml-2">(REMOVED)</span>}
          </p>
        </div>
        {/* Brand */}
        <div className="col-span-3 flex items-center justify-center text-center">
          <p className={`font-carme ${
            isDisabled ? 'text-gray-400' : 'text-cbvt-dark-gray'
          }`}>{brand}</p>
        </div>
        {/* Type */}
        <div className="col-span-2 flex items-center justify-center text-center">
          <p className={`font-carme ${
            isDisabled ? 'text-gray-400' : 'text-cbvt-dark-gray'
          }`}>{type}</p>
        </div>
        {/* Model */}
        <div className="col-span-2 flex items-center justify-center text-center">
          <p className={`truncate font-carme ${
            isDisabled ? 'text-gray-400' : 'text-cbvt-dark-gray'
          }`}>{model}</p>
        </div>
        {/* Horsepower */}
        <div className="col-span-1 flex items-center justify-center text-center">
          <span className={`font-carme ${
            isDisabled ? 'text-gray-400' : 'text-cbvt-dark-gray'
          }`}>{horsepower}</span>
        </div>
        {/* Inverter */}
        <div className="col-span-1 flex items-center justify-center text-center">
          <span className={`font-carme ${
            isDisabled ? 'text-gray-400' : 'text-cbvt-hover-blue'
          }`}>{inverter ? 'Yes' : 'No'}</span>
        </div>
        {/* Actions */}
        <div className="col-span-2 flex items-center justify-center space-x-1 text-center">
          <button 
            className={`p-1 rounded-full ${
              isDisabled 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'hover:bg-gray-200 text-cbvt-dark-gray'
            }`}
            title={isDisabled ? "Cannot edit removed item" : "Edit"}
            onClick={handleEditOpen}
            disabled={isDisabled}
          >
            <Edit size={18} />
          </button>
          <button 
            className={`p-1 rounded-full ${
              isDisabled 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'hover:bg-gray-200 text-cbvt-dark-gray'
            }`}
            title={isDisabled ? "Cannot delete removed item" : "Delete"}
            onClick={() => !isDisabled && setIsDeleteOpen(true)}
            disabled={isDisabled}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Edit Modal - Only show if not disabled */}
      {isOpen && !isDisabled && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="overlay bg-black bg-opacity-30 absolute inset-0" onClick={() => setIsOpen(false)}></div>
          <div className="relative bg-white rounded-[24px] shadow-lg w-full max-w-4xl p-10 flex flex-col items-center gap-8">
            <button 
              onClick={() => setIsOpen(false)} 
              className='absolute top-4 right-4 text-gray-400 hover:text-cbvt-navy text-2xl font-bold focus:outline-none' 
              aria-label='Close'
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-cbvt-navy mb-6 self-start">Edit Item AC-{item_id}</h2>
            <form onSubmit={handleSubmit} className="flex flex-row gap-8 w-full">
              <div className="w-1/2 flex flex-col gap-4">
                <label className='font-carme text-cbvt-navy'>Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="border rounded-lg p-2"
                  required
                />
                <label className='font-carme text-cbvt-navy'>Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="border rounded-lg p-2"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Split AC">Split AC</option>
                  <option value="Window AC">Window AC</option>
                  <option value="Cassette">Cassette</option>
                  <option value="Portable">Portable</option>
                </select>
                <label className='font-carme text-cbvt-navy'>Horsepower</label>
                <select
                  name="horsepower"
                  value={formData.horsepower}
                  onChange={handleInputChange}
                  className="border rounded-lg p-2"
                  required
                >
                  <option value="">Select HP</option>
                  <option value="0.5">0.5 HP</option>
                  <option value="0.75">0.75 HP</option>
                  <option value="1.0">1.0 HP</option>
                  <option value="1.5">1.5 HP</option>
                  <option value="2.0">2.0 HP</option>
                  <option value="2.5">2.5 HP</option>
                  <option value="3.0">3.0 HP</option>
                  <option value="3.5">3.5 HP</option>
                  <option value="4.0">4.0 HP</option>
                  <option value="5.0">5.0 HP</option>
                </select>
              </div>
              <div className="w-1/2 flex flex-col gap-4">
                <label className='font-carme text-cbvt-navy'>Model</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  className="border rounded-lg p-2"
                  required
                />
                <label className='font-carme text-cbvt-navy'>Inverter</label>
                <select
                  name="inverter"
                  value={formData.inverter ? 'true' : 'false'}
                  onChange={e => handleInputChange({ target: { name: 'inverter', value: e.target.value === 'true' } })}
                  className="border rounded-lg p-2"
                  required
                >
                  <option value="">Inverter?</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                <label className='font-carme text-cbvt-navy'>Supplier</label>
                <select
                  name="supplier_id"
                  value={formData.supplier_id}
                  onChange={handleInputChange}
                  className="border rounded-lg p-2"
                  required
                >
                  <option value="">Select Supplier</option>
                  {suppliers?.map(supplier => (
                    <option key={supplier.supplier_id} value={supplier.supplier_id}>
                      {supplier.company_name}
                    </option>
                  ))}
                </select>
              </div>
            </form>
            <div className="bg-gray-50 px-4 py-3 flex justify-end gap-3 w-full">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-3xl shadow-md text-gray-700 hover:bg-gray-200 hover:cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button 
                type="button"
                onClick={handleSubmit}
                className="border w-[230px] h-[38px] rounded-3xl border-[rgb(15_40_81)] shadow-md p-1 flex justify-center bg-cbvt-navy text-white transition-all hover:!bg-white hover:cursor-pointer hover:text-[rgb(15_40_81)] focus:outline-none"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal - Only show if not disabled */}
      {isDeleteOpen && !isDisabled && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="overlay bg-black bg-opacity-30 absolute inset-0" onClick={() => setIsDeleteOpen(false)}></div>
          <div className="relative bg-white rounded-xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <button 
                onClick={() => setIsDeleteOpen(false)} 
                className='absolute top-4 right-4 text-gray-400 hover:text-cbvt-navy text-2xl font-bold focus:outline-none' 
                aria-label='Close'
              >
                ×
              </button>
              <h2 className="text-2xl font-bold text-cbvt-navy mb-6 text-center font-alegreya-sans-sc">
                Are you sure you want to delete this product?
              </h2>
              <div className="text-center mb-6">
                <p className="text-cbvt-dark-gray">Item: <span className="font-semibold">AC-{item_id}</span></p>
                <p className="text-cbvt-dark-gray">{brand} {model}</p>
                <p className="text-cbvt-dark-gray">Supplier: <span className="font-semibold">{getSupplierName(supplier_id)}</span></p>
              </div>
              <div className="bg-gray-50 px-4 py-3 flex justify-end gap-3">
                <button
                  onClick={() => setIsDeleteOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-3xl shadow-md text-gray-700 hover:bg-gray-200 hover:cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeleteConfirm}
                  className="border w-[230px] h-[38px] rounded-3xl border-red-600 shadow-md p-1 flex justify-center bg-red-600 text-white transition-all hover:!bg-white hover:cursor-pointer hover:text-red-600 focus:outline-none"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};