import { useCallback, useRef, useState } from 'react';
import { Outlet, useFetcher } from 'react-router-dom';
import Sidebar from "../../components/Sidebar";
import { Plus, Search, Filter} from "lucide-react";
import { ItemCard } from '../../components/ItemCard';
import Modal from "react-modal";
import { useDropzone } from "react-dropzone"

const InventoryPage = () => {
  const [activeItem, setActiveItem] = useState('Inventory');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [form, setForm] = useState({
    supplier: '',
    model: '',
    type: '',
    inverter: '',
    horsepower: '',
    brand: '',
  });
  const [suppliers, setsuppliers] = useState([
    { id: '42', name: 'General Royal Global Industries' },
    { id: '17', name: 'Cebu Appliance Center' },
    { id: '89', name: 'X‑Tria Air Conditioning Solutions' },
  ])
  const [itemData, setItemData] = useState([
  {
    "item_id": 1001,
    "supplier_id": 42,
    "manager_id": 1,
    "model": "ArcticCool Pro X",
    "image_path": "/inventory/arcticcool_prox.jpg",
    "type": "Split AC",
    "inverter": true,
    "horsepower": 1.5,
    "brand": "ArcticCool",
    "is_removed": false
  },
  {
    "item_id": 1002,
    "supplier_id": 17,
    "manager_id": 1,
    "model": "FrostMaster Window",
    "image_path": "/inventory/frostmaster_window.jpg",
    "type": "Window AC",
    "inverter": false,
    "horsepower": 2.0,
    "brand": "Glacial",
    "is_removed": false
  },
  {
    "item_id": 1003,
    "supplier_id": 89,
    "manager_id": 1,
    "model": "EcoSilent Inverter",
    "image_path": "/inventory/ecosilent_inverter.jpg",
    "type": "Cassette",
    "inverter": true,
    "horsepower": 2.5,
    "brand": "BreezeTech",
    "is_removed": true
  }
]);
  const [editItem, setEditItem] = useState(null);

  const typeOptions = [
    { value: '', label: 'Select Type' },
    { value: 'Split AC', label: 'Split AC' },
    { value: 'Window AC', label: 'Window AC' },
    { value: 'Cassette', label: 'Cassette' },
  ];
  const inverterOptions = [
    { value: '', label: 'Inverter?' },
    { value: 'true', label: 'Yes' },
    { value: 'false', label: 'No' },
  ];
  const horsepowerOptions = [
    '', '0.5', '0.75', '1.0', '1.5', '2.0', '2.5', '3.0', '3.5', '4.0', '5.0'
  ];

  function handleFormChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function selectFile() {
    fileInputRef.current.click();
  }

  function onFileSelect(event) {
    const files = event.target.files;
    if (files.length === 0) return;
    // You can handle file selection here if needed, but dropzone is now primary
  }

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setUploadedFiles([
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      ]);
    }
    setIsDragging(false);
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    accept: { 'image/*': [] },
    onDrop,
    multiple: true,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  });

  function removeFile(file) {
    setUploadedFiles((files) => files.filter((f) => f !== file));
  }

  const handleLogout = () => {
    console.log('Logging out...');
  };

  // Handle edit from ItemCard component
  const handleEditFromCard = (updatedItemData) => {
    console.log('Edit called with:', updatedItemData);
    
    setItemData(prev =>
      prev.map(item =>
        item.item_id === updatedItemData.item_id 
          ? { 
              ...item, 
              brand: updatedItemData.brand,
              type: updatedItemData.type,
              model: updatedItemData.model,
              horsepower: updatedItemData.horsepower,
              inverter: updatedItemData.inverter,
              supplier_id: updatedItemData.supplier_id
            }
          : item
      )
    );
  };

  // Handle delete from ItemCard component
  const handleDeleteFromCard = (itemId) => {
    console.log('Delete called for item:', itemId);
    
    setItemData(prev =>
      prev.map(item =>
        item.item_id === itemId 
          ? { ...item, is_removed: true }
          : item
      )
    );
  };

  const handleCreateItem = (e) => {
    e.preventDefault(); 
  
    const newItem = {
      ...form,
      item_id: Date.now(),
      supplier_id: parseInt(form.supplier),
      inverter: form.inverter === 'true',
      horsepower: parseFloat(form.horsepower),
      manager_id: 1,
      is_removed: false,
      image_path: uploadedFiles[0]?.preview || "", 
    };
  
    setItemData(prev => [...prev, newItem]);
    setmodalIsOpen(false);
    setForm({ supplier: '', model: '', type: '', inverter: '', horsepower: '', brand: '' });
    setUploadedFiles([]);
  };

  const openEditModal = (item) => {
    setEditItem(item);
    setForm({
      supplier: item.supplier_id.toString(),
      model: item.model,
      type: item.type,
      inverter: item.inverter ? 'true' : 'false',
      horsepower: item.horsepower.toString(),
      brand: item.brand,
    });
    setmodalIsOpen(true);
  };

  const handleUpdateItem = (e) => {
    e.preventDefault();
    const updatedItem = {
      ...editItem,
      ...form,
      supplier_id: parseInt(form.supplier),
      inverter: form.inverter === 'true',
      horsepower: parseFloat(form.horsepower),
      brand: form.brand,
      model: form.model,
      type: form.type,
    };
    setItemData(prev =>
      prev.map(item =>
        item.item_id === updatedItem.item_id ? updatedItem : item
      )
    );
    setmodalIsOpen(false);
    setEditItem(null);
    setForm({ supplier: '', model: '', type: '', inverter: '', horsepower: '', brand: '' });
  };

  const closeModal = () => {
    setmodalIsOpen(false);
    setEditItem(null);
    setForm({ supplier: '', model: '', type: '', inverter: '', horsepower: '', brand: '' });
    setUploadedFiles([]);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        activeItem={activeItem}
        onItemChange={setActiveItem}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      
      <div className="flex-1 flex flex-col pb-8">
        {/* Header Section */}
        <div className="p-8 pb-0">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold font-alegreya-sans-sc text-cbvt-navy">
                {activeItem}
              </h1>
              <p className="text-cbvt-dark-gray mb-6">
                Manage product inventory.   
              </p> 
            </div>
            <button className='flex items-center bg-cbvt-navy h-[40px] px-4 rounded-2xl text-white mr-10 '>
              <Plus className='h-3 w-3 mr-2' />
              <button onClick={() => setmodalIsOpen(true)}>
                <span className='text-xs'>Create Item</span>
              </button>
            </button>
          </div>

          <div className='flex flex-row' > 
          {/* Search Bar */}
          <div className="mb-8">
            <div className='relative bg-white border border-gray-200 rounded-3xl h-[38px] w-full max-w-[382px]'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500'/>
              <input 
                type='text' 
                placeholder='Search inventory...' 
                className='w-full h-full pl-10 pr-4 rounded-3xl focus:outline-none'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className='h-[38px] w-[101px] bg-white border border-gray-200 ml-[17px] rounded-3xl p-1 flex items-center'>
            <Filter className='h-3 w-3 ml-3 text-gray-500'/>
            <p className='text-gray-500 ml-2'>Filter</p>
          </div>
          </div>
        </div>

        {/* Assignments Grid */}
        <div className='flex-1 overflow-y-auto p-5'>
          <div className='flex flex-col'>
            {/* List Header */}
            <div className="hidden md:grid grid-cols-13 gap-2 p-3 bg-gray-100 font-alegreya-sans-sc text-cbvt-navy text-center items-center font-semibold text-lg rounded-2xl">
              <div className="col-span-2">Item</div>
              <div className="col-span-3">Brand</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-2">Model</div>
              <div className="col-span-1">HP</div>
              <div className="col-span-1">Inverter</div>
              <div className="col-span-2">Actions</div>
            </div>
            
            {/* List Items */}
            {itemData.map((item) => (
              <ItemCard 
                key={item.item_id}
                item_id={item.item_id}
                supplier_id={item.supplier_id}
                model={item.model}                       
                manager_id={item.manager_id}
                price={item.price}
                image_path={item.image_path}
                type={item.type}
                inverter={item.inverter}
                horsepower={item.horsepower}
                brand={item.brand}
                is_removed={item.is_removed}
                onEdit={handleEditFromCard}
                onDelete={handleDeleteFromCard}
              />
            ))}
          </div>
        </div>

        {/*Modal*/}
        <Modal 
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="fixed inset-0 flex items-center justify-center p-4 z-50 border-none"
        >
          <div className='w-full max-w-4xl mx-auto bg-white rounded-[24px] p-10 flex flex-col items-center gap-8 shadow-2xl relative'>
            <button onClick={closeModal} className='absolute top-4 right-4 text-gray-400 hover:text-cbvt-navy text-2xl font-bold focus:outline-none' aria-label='Close'>×</button>
            <h2 className='font-alegreya-sans-sc text-cbvt-navy text-2xl font-semibold mb-6 self-start'>{editItem ? 'Edit Item' : 'Create Item'}</h2>
            <form id={editItem ? 'edit-item-form' : 'create-item-form'} className='flex flex-row gap-8 w-full' onSubmit={editItem ? handleUpdateItem : handleCreateItem}>
              <div className='col-span-2'>
                <div {...getRootProps()} className={`h-80 drag-area border border-dashed border-blue-500 p-4 rounded-4xl flex flex-col justify-center items-center font-carme text-cbvt-blue cursor-pointer transition ${isDragActive ? 'bg-blue-50 border-blue-400' : ''}`}> 
                  <input {...getInputProps()} />
                  {isDragActive || isDragging ? (
                    <span>Drop image here</span>
                  ) : (
                    <>
                      <span className='mb-2 text-sm'>Drag & drop an image here, or click to select a file</span>
                      <span className='select underline text-cbvt-navy' role='button'>Browse</span>
                    </>
                  )}
                  {uploadedFiles.length > 0 && (
                    <div className='flex flex-wrap gap-2 mt-4'>
                      {uploadedFiles.map((file, idx) => (
                        <div key={file.name + idx} className='relative group'>
                          <img src={file.preview} alt={file.name} className='w-20 h-20 object-cover rounded-lg border border-gray-200'/>
                          <button type='button' onClick={() => removeFile(file)} className='absolute top-0 right-0 bg-white bg-opacity-80 rounded-full p-1 text-xs text-red-600 opacity-0 group-hover:opacity-100 transition'>×</button>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className='text-xs text-gray-500 mt-4'>Only one image can be uploaded. Uploading another will replace the current image.</p>
                </div>
              </div>
              <div className='col-span-3'>
                <div className='grid grid-cols-2 gap-x-8 gap-y-6'>
                  {/* Column 1 */}
                  <div className='flex flex-col gap-4'>
                    <label className='font-carme text-cbvt-navy'>Supplier</label>
                    <select
                      name='supplier'
                      value={form.supplier}
                      onChange={handleFormChange}
                      className={`border rounded-lg p-2 ${form.supplier ? 'text-cbvt-navy' : 'text-gray-400'}`}
                      required
                    >
                      <option value="" className='text-gray-400'>Select Supplier</option>
                      {suppliers.map(supplier => (
                        <option key={supplier.id} value={supplier.id} className='text-cbvt-navy'>
                          {supplier.name}
                        </option>
                      ))}
                    </select>
                    <label className='font-carme text-cbvt-navy'>Type</label>
                    <select name='type' value={form.type} onChange={handleFormChange} className={`border rounded-lg p-2 ${form.type ? 'text-cbvt-navy' : 'text-gray-400'}`}>
                      {typeOptions.map(opt => <option key={opt.value} value={opt.value} className={opt.value ? 'text-cbvt-navy' : 'text-gray-400'}>{opt.label}</option>)}
                    </select>
                    <label className='font-carme text-cbvt-navy'>Horsepower</label>
                    <select name='horsepower' value={form.horsepower} onChange={handleFormChange} className={`border rounded-lg p-2 ${form.horsepower ? 'text-cbvt-navy' : 'text-gray-400'}`}>
                      {horsepowerOptions.map(opt => (
                        <option key={opt} value={opt} className={opt ? 'text-cbvt-navy' : 'text-gray-400'}>{opt ? opt + ' HP' : 'Select HP'}</option>
                      ))}
                    </select>
                  </div>
                  {/* Column 2 */}
                  <div className='flex flex-col gap-4'>
                    <label className='font-carme text-cbvt-navy'>Model</label>
                    <input
                      name='model'
                      value={form.model}
                      onChange={handleFormChange}
                      className={`border rounded-lg p-2 ${form.model ? 'text-cbvt-navy' : 'text-gray-400'}`}
                      placeholder='Model'
                    />
                    <label className='font-carme text-cbvt-navy'>Inverter</label>
                    <select name='inverter' value={form.inverter} onChange={handleFormChange} className={`border rounded-lg p-2 ${form.inverter ? 'text-cbvt-navy' : 'text-gray-400'}`}>
                      {inverterOptions.map(opt => <option key={opt.value} value={opt.value} className={opt.value ? 'text-cbvt-navy' : 'text-gray-400'}>{opt.label}</option>)}
                    </select>
                    <label className='font-carme text-cbvt-navy'>Brand</label>
                    <input name='brand' value={form.brand} onChange={handleFormChange} className={`border rounded-lg p-2 ${form.brand ? 'text-cbvt-navy' : 'text-gray-400'}`} placeholder='Brand'/>
                  </div>
                </div>
              </div>
            </form>
            <div className='flex justify-center w-full mt-4'>
              <button type='submit' form={editItem ? 'edit-item-form' : 'create-item-form'} className='bg-cbvt-navy text-white px-6 py-2 rounded-2xl font-semibold hover:bg-cbvt-blue transition'>
                {editItem ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default InventoryPage;