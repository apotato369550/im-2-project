import { useCallback, useEffect, useRef, useState } from 'react';
import { Outlet, useFetcher, useNavigate } from 'react-router-dom';
import Sidebar from "../../components/Sidebar";
import { Plus, Search, Filter } from "lucide-react";
import { ItemCard } from '../../components/ItemCard';
import Modal from "react-modal";
import { useDropzone } from "react-dropzone"
import axios from 'axios';
import SortingDropdown from '../../components/SortingDropdown';

const InventoryPage = () => {
  const [activeItem, setActiveItem] = useState('Inventory');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [form, setForm] = useState({
    supplier_id: '',
    model: '',
    price: '0',
    type: '',
    inverter: '',
    horsepower: '',
    brand: '',
  });

  const [data, setData] = useState([]);
  const [output, setOutput] = useState([]);

  // Filter function
  const [sortOption, setSortOption] = useState('default');

  const [suppliers, setSuppliers] = useState([])
  const [itemData, setItemData] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const userData = JSON.parse(localStorage.getItem("user_data"));
  const navigate = useNavigate();
  
  // Enhanced search function with priority scoring
  const performSearch = (items, query) => {
    if (!query.trim()) return items;
    
    const searchTerm = query.toLowerCase().trim();
    
    return items
      .map(item => {
        let score = 0;
        const brand = item.brand?.toLowerCase() || '';
        const model = item.model?.toLowerCase() || '';
        const type = item.type?.toLowerCase() || '';
        
        // Priority scoring system
        // Brand gets highest priority (score 4)
        if (brand.includes(searchTerm)) {
          score += 4;
          if (brand.startsWith(searchTerm)) score += 2; // Extra points for starts with
        }
        
        // Type gets second priority (score 3)
        if (type.includes(searchTerm)) {
          score += 3;
          if (type.startsWith(searchTerm)) score += 1;
        }
        
        // Model gets third priority (score 2)
        if (model.includes(searchTerm)) {
          score += 2;
          if (model.startsWith(searchTerm)) score += 1;
        }
        
        return { ...item, searchScore: score };
      })
      .filter(item => item.searchScore > 0) // Only include items with matches
      .sort((a, b) => b.searchScore - a.searchScore); // Sort by relevance score
  };

  // Enhanced sorting function
  const sortData = (data, option) => {
    const sorted = [...data];
    switch(option) {
      case 'name-asc':
      case 'a-z':
        return sorted.sort((a, b) => {
          // Primary sort by brand, fallback to model if brands are same
          const brandCompare = (a.brand || '').localeCompare(b.brand || '');
          if (brandCompare !== 0) return brandCompare;
          return (a.model || '').localeCompare(b.model || '');
        });
      case 'name-desc':
      case 'z-a':
        return sorted.sort((a, b) => {
          // Primary sort by brand (descending), fallback to model if brands are same
          const brandCompare = (b.brand || '').localeCompare(a.brand || '');
          if (brandCompare !== 0) return brandCompare;
          return (b.model || '').localeCompare(a.model || '');
        });
      case 'default':
      default:
        return data; // Return original order
    }
  };

  // Combined search and sort effect
  useEffect(() => {
    // Use all items (including removed ones)
    let results = searchQuery ? performSearch(itemData, searchQuery) : itemData;
    
    // Apply sorting (but preserve search relevance for search results)
    if (!searchQuery || sortOption !== 'default') {
      results = sortData(results, sortOption);
    }
    
    setOutput(results);
  }, [searchQuery, sortOption, itemData]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("http://localhost/im-2-project/api/items");
        setItemData(res.data);
        console.log("Items:", res.data);
      } catch (err) {
        console.error("Item fetch error:", err);
      }
    };

    const fetchSuppliers = async () => {
      try {
        const res = await axios.get("http://localhost/im-2-project/api/suppliers/fetch", {
          headers: { Authorization: "Bearer " + userData.token }
        });
        setSuppliers(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Supplier fetch error:", err);
      }
    };

    fetchItems();
    fetchSuppliers();
  }, []);

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

  const handleLogout = (e) => {
    localStorage.removeItem("user_data");
    navigate("/");
  }

  // Handle edit from ItemCard component
  const handleEditFromCard = (updatedItemData) => {
    console.log('Edit called with:', updatedItemData);
    
    // Update the item in the local state first
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

    // Send update request to backend
    axios.post(`http://localhost/im-2-project/api/items/edit-item/${updatedItemData.item_id}`, {
      brand: updatedItemData.brand,
      type: updatedItemData.type,
      model: updatedItemData.model,
      horsepower: parseFloat(updatedItemData.horsepower),
      inverter: updatedItemData.inverter,
      supplier_id: parseInt(updatedItemData.supplier_id)
    }, {
      headers: {
        Authorization: "Bearer " + userData.token,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log('Item updated successfully:', response.data);
    })
    .catch((err) => {
      console.error('Error updating item:', err);
      // Optionally revert the optimistic update if the API call fails
    });
  };

  // Handle delete from ItemCard component
  const handleDeleteFromCard = (itemId) => {
    console.log('Delete called for item:', itemId);

    axios.delete(`http://localhost/im-2-project/api/items/delete/${itemId}`, {
      headers: {
        Authorization: "Bearer " + userData.token
      }
    })
    .then(() => {
      setItemData(prev =>
        prev.map(item =>
          item.item_id === itemId 
            ? { ...item, is_removed: true }
            : item
        )
      );
    })
    .catch((err) => {
      console.log(err);
    })
  };

  const handleCreateItem = (e) => {
    e.preventDefault(); 
  
    const formData = new FormData();
    
    // Add form fields
    formData.append('supplier_id', form.supplier_id);
    formData.append('model', form.model);
    formData.append('price', form.price);
    formData.append('type', form.type);
    formData.append('inverter', form.inverter === 'true');
    formData.append('horsepower', parseFloat(form.horsepower));
    formData.append('brand', form.brand);
    formData.append('manager_id', 1);
    formData.append('is_removed', false);
    
    // Add image file
    if (uploadedFiles.length > 0) {
      formData.append('image', uploadedFiles[0]);
    }

    axios
      .post("http://localhost/im-2-project/api/items/create", formData, {
        headers: {
          Authorization: "Bearer " + userData.token,
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        const newItem = {
          ...form,
          ...response.data,
          inverter: form.inverter === 'true',
          horsepower: parseFloat(form.horsepower),
          manager_id: 1,
          is_removed: false,
        };
        // Add the response data to itemData instead of newItem
        setItemData(prev => [...prev, newItem]);
        setmodalIsOpen(false);
        setForm({ supplier_id: '', model: '', price: '0', type: '', inverter: '', horsepower: '', brand: '' });
        setUploadedFiles([]);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  const openEditModal = (item) => {
    setEditItem(item);
    setForm({
      supplier_id: item.supplier_id,
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
      supplier_id: parseInt(form.supplier_id),
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
    setForm({ supplier_id: '', model: '', type: '', inverter: '', horsepower: '', brand: '' });
  };

  const closeModal = () => {
    setmodalIsOpen(false);
    setEditItem(null);
    setForm({ supplier_id: '', model: '', type: '', inverter: '', horsepower: '', brand: '' });
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

          <div className='flex flex-row'> 
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
            <SortingDropdown 
              onSortChange={(sortValue) => setSortOption(sortValue)}
            />
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
            {output.length > 0 ? (
              output.map((item) => (
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
                  suppliers={suppliers}
                  onEdit={handleEditFromCard}
                  onDelete={handleDeleteFromCard}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                {searchQuery ? `No items found matching "${searchQuery}"` : 'No items available'}
              </div>
            )}
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
                      name='supplier_id'
                      value={form.supplier_id}
                      onChange={handleFormChange}
                      className={`border rounded-lg p-2 ${form.supplier_id ? 'text-cbvt-navy' : 'text-gray-400'}`}
                      required
                    >
                      <option value="" className='text-gray-400'>Select Supplier</option>
                      {suppliers.map(supplier => (
                        <option key={supplier.supplier_id} value={supplier.supplier_id} className='text-cbvt-navy'>
                          {supplier.company_name}
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