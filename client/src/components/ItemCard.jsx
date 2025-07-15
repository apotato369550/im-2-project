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
    console.log('Updated data:', formData);
    onEdit(formData);
    setIsOpen(false);
  };

  const handleDeleteConfirm = () => {
    onDelete();
    setIsDeleteOpen(false);
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-2 p-4 items-center border-b border-gray-200 hover:bg-gray-50">
        {/* Item ID */}
        <div className="col-span-3">
          <p className="text-cbvt-navy font-alegreya-sans-sc font-semibold">AC-{item_id}</p>
        </div>
        
        {/* Brand/Type */}
        <div className="col-span-2">
          <p className="text-cbvt-dark-gray">
            {brand} • {type}
          </p>
        </div>
        
        {/* Model */}
        <div className="col-span-3">
          <p className="text-cbvt-dark-gray">{model}</p>
        </div>
        
        {/* Horsepower */}
        <div className="col-span-2">
          <div className="flex items-center">
            <div className="h-4 w-4 mr-1 ml-[-35px] text-gray-700" />
            <p>
              <span className="text-cbvt-dark-gray">HP: </span>
              <span className="text-cbvt-hover-blue">{horsepower}</span>
            </p>
          </div>
        </div>
        
        {/* Inverter */}
        <div className="col-span-1">
          <div className="flex items-center">
            <div className="h-4 w-4 mr-1 text-gray-700" />
            <p>
              <span className="text-cbvt-hover-blue">
                {inverter ? 'Yes' : 'No'}
              </span>
            </p>
          </div>
        </div>
        
        {/* Actions */}
        <div className="col-span-1 flex space-x-1">
          <button 
            className="p-1 rounded-full hover:bg-gray-200 text-cbvt-dark-gray"
            title="Edit"
            onClick={() => setIsOpen(true)}
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
          <div className="overlay"></div>
          <div className="relative bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-cbvt-navy mb-6">Edit Item AC-{item_id}</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-cbvt-dark-gray mb-2">Brand</label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-cbvt-dark-gray mb-2">Type</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      required
                    >
                      <option value="Split AC">Split AC</option>
                      <option value="Window AC">Window AC</option>
                      <option value="Cassette">Cassette</option>
                      <option value="Portable">Portable</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-cbvt-dark-gray mb-2">Model</label>
                    <input
                      type="text"
                      name="model"
                      value={formData.model}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-cbvt-dark-gray mb-2">Horsepower</label>
                    <input
                      type="number"
                      step="0.5"
                      name="horsepower"
                      value={formData.horsepower}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-cbvt-dark-gray mb-2">Supplier ID</label>
                    <input
                      type="text"
                      name="supplier_id"
                      value={formData.supplier_id}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="inverter"
                      name="inverter"
                      checked={formData.inverter}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-cbvt-navy rounded"
                    />
                    <label htmlFor="inverter" className="ml-2 text-cbvt-dark-gray">
                      Inverter
                    </label>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-4 py-3 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-3xl shadow-md text-gray-700 hover:bg-gray-200 hover:cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="border w-[230px] h-[38px] rounded-3xl border-[rgb(15_40_81)] shadow-md p-1 flex justify-center bg-cbvt-navy text-white transition-all hover:!bg-white hover:cursor-pointer hover:text-[rgb(15_40_81)] focus:outline-none"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="overlay"></div>
          <div className="relative bg-white rounded-xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-cbvt-navy mb-6 text-center font-alegreya-sans-sc">
                Are you sure you want to delete this product?
              </h2>
              <div className="bg-gray-50 px-4 py-3 flex justify-end gap-3">
                <button
                  onClick={() => setIsDeleteOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-3xl shadow-md text-gray-700 hover:bg-gray-200 hover:cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeleteConfirm}
                  className="border w-[230px] h-[38px] rounded-3xl border-[rgb(15_40_81)] shadow-md p-1 flex justify-center bg-cbvt-navy text-white transition-all hover:!bg-white hover:cursor-pointer hover:text-[rgb(15_40_81)] focus:outline-none"
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