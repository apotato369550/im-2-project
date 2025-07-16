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
  onEdit,
  onDelete
}) => {
  if (is_removed) return null;

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Include item_id in the data passed to onEdit
    onEdit({ ...formData, item_id });
    setIsOpen(false);
  };

  const handleDeleteConfirm = () => {
    // Pass item_id to onDelete so parent knows which item to delete
    onDelete(item_id);
    setIsDeleteOpen(false);
  };

  // Reset form data when modal opens
  const handleEditOpen = () => {
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

  return (
    <>
      <div className="grid grid-cols-13 gap-2 p-3 border-b border-gray-200 hover:bg-gray-50 text-sm justify-center">
        {/* Item ID */}
        <div className="col-span-2 flex items-center justify-center text-center">
          <p className="text-cbvt-blue text-lg font-alegreya-sans-sc">AC-{item_id}</p>
        </div>
        {/* Brand */}
        <div className="col-span-3 flex items-center justify-center text-center">
          <p className="text-cbvt-dark-gray font-carme">{brand}</p>
        </div>
        {/* Type */}
        <div className="col-span-2 flex items-center justify-center text-center">
          <p className="text-cbvt-dark-gray font-carme">{type}</p>
        </div>
        {/* Model */}
        <div className="col-span-2 flex items-center justify-center text-center">
          <p className="text-cbvt-dark-gray truncate font-carme">{model}</p>
        </div>
        {/* Horsepower */}
        <div className="col-span-1 flex items-center justify-center text-center">
          <span className="text-cbvt-dark-gray font-carme">{horsepower}</span>
        </div>
        {/* Inverter */}
        <div className="col-span-1 flex items-center justify-center text-center">
          <span className="text-cbvt-hover-blue font-carme">{inverter ? 'Yes' : 'No'}</span>
        </div>
        {/* Actions */}
        <div className="col-span-2 flex items-center justify-center space-x-1 text-center">
          <button 
            className="p-1 rounded-full hover:bg-gray-200 text-cbvt-dark-gray"
            title="Edit"
            onClick={handleEditOpen}
          >
            <Edit size={18} />
          </button>
          <button 
            className="p-1 rounded-full hover:bg-gray-200 text-cbvt-dark-gray"
            title="Delete"
            onClick={() => setIsDeleteOpen(true)}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isOpen && (
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
                  <option value="Split AC">Split AC</option>
                  <option value="Window AC">Window AC</option>
                  <option value="Cassette">Cassette</option>
                  <option value="Portable">Portable</option>
                </select>
                <label className='font-carme text-cbvt-navy'>Horsepower</label>
                <input
                  type="number"
                  step="0.5"
                  name="horsepower"
                  value={formData.horsepower}
                  onChange={handleInputChange}
                  className="border rounded-lg p-2"
                  required
                />
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
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                <label className='font-carme text-cbvt-navy'>Supplier ID</label>
                <input
                  type="text"
                  name="supplier_id"
                  value={formData.supplier_id}
                  onChange={handleInputChange}
                  className="border rounded-lg p-2"
                  required
                />
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

      {/* Delete Modal */}
      {isDeleteOpen && (
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